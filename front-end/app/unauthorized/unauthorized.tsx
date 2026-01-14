"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "../context/AuthContext"

export default function UnauthorizedPage() {
  const router = useRouter()
  const { user } = useAuth()

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
          {/* Icon */}
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>

          {/* Content */}
          <h1 className="text-6xl font-bold text-gray-800 mb-4">403</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Access Denied</h2>
          <p className="text-gray-500 mb-6">
            You do not have permission to access this page. Please contact your administrator if you believe this is an error.
          </p>

          {/* User Info */}
          {user && (
            <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-100">
              <p className="text-sm text-gray-600 mb-1">Logged in as:</p>
              <p className="font-medium text-gray-800">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => router.back()}
              className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 rounded-lg transition-colors font-medium"
            >
              Go Back
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="flex-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
            >
              Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
