"use client"

import { AuthGuard } from "@/components/layout/AuthGuard"
import { UsersPage } from "@/components/users/UsersPage"

export default function Users() {
  return (
    <AuthGuard allowedRoles={["ADMIN"]}>
      <UsersPage />
    </AuthGuard>
  )
}
