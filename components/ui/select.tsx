"use client"

import { Root, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@radix-ui/react-select"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export function Select({ children, value, onValueChange, ...props }: { children: React.ReactNode; value?: string; onValueChange?: (value: string) => void }) {
  return (
    <Root value={value} onValueChange={onValueChange} {...props}>
      {children}
    </Root>
  )
}

export { SelectTrigger, SelectContent, SelectItem, SelectValue }
