'use client'

import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'

interface ProtectedRouteProps {
  children: ReactNode
  role?: string
  permission?: string
}

export default function ProtectedRoute({ children, role, permission }: ProtectedRouteProps) {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) return
    // Role-based redirect
    if (role && !user.roles.includes(role)) {
      router.push('/unauthorized')
    }
    // Permission-based redirect
    if (permission && !user.permissions.includes(permission)) {
      router.push('/unauthorized')
    }
  }, [user, role, permission, router])

  if (!user) return null

  return <>{children}</>
}
