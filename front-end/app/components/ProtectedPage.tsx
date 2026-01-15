"use client"

import { ReactNode, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { useRouter } from "next/navigation"

interface Props {
  children: ReactNode
  permission?: string
}

export default function ProtectedPage({ children, permission }: Props) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login") 
    }
    if (!loading && user && permission && !user.permissions.includes(permission)) {
      router.push("/unauthorized")
    }
  }, [loading, user, permission, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Redirecting...</p>
      </div>
    )
  }

  if (permission && !user.permissions.includes(permission)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Redirecting...</p>
      </div>
    )
  }

  return <>{children}</>
}
