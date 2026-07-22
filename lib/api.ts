const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api"

export class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE) {
    this.baseUrl = baseUrl
  }

  private getToken(): string | null {
    if (typeof window === "undefined") return null
    return localStorage.getItem("agentpay_token")
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
    opts?: { stream?: boolean; signal?: AbortSignal }
  ): Promise<T> {
    const token = this.getToken()
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    }
    if (token) headers["Authorization"] = `Bearer ${token}`

    const res = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal: opts?.signal,
    })

    if (res.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("agentpay_token")
      window.location.href = "/login"
      throw new Error("Session expired")
    }

    if (opts?.stream) return res as unknown as T

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: res.statusText }))
      throw new Error(err.message ?? "Request failed")
    }

    return res.json()
  }

  get<T>(path: string, signal?: AbortSignal) {
    return this.request<T>("GET", path, undefined, { signal })
  }

  post<T>(path: string, body?: unknown, signal?: AbortSignal) {
    return this.request<T>("POST", path, body, { signal })
  }

  patch<T>(path: string, body?: unknown) {
    return this.request<T>("PATCH", path, body)
  }

  delete<T>(path: string) {
    return this.request<T>("DELETE", path)
  }

  streamChat(
    path: string,
    body: unknown,
    onChunk: (text: string) => void,
    onDone: () => void,
    signal?: AbortSignal
  ) {
    const token = this.getToken()
    const headers: Record<string, string> = { "Content-Type": "application/json" }
    if (token) headers["Authorization"] = `Bearer ${token}`

    return fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      signal,
    }).then(async (res) => {
      if (!res.ok) throw new Error("Chat request failed")
      if (!res.body) return

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })

        const lines = buffer.split("\n")
        buffer = lines.pop() ?? ""

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6)
            if (data === "[DONE]") {
              onDone()
              return
            }
            try {
              const parsed = JSON.parse(data)
              if (parsed.text) onChunk(parsed.text)
            } catch { /* skip malformed */ }
          }
        }
      }
      onDone()
    })
  }
}

export const api = new ApiClient()
