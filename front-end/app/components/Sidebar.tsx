"use client"

import { useAuth } from "../context/AuthContext"
import { useRouter, usePathname } from "next/navigation"
import { Permissions, Roles } from "../config/permissions"

export default function Sidebar() {
  const { user, logout, hasRole, hasPermission } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = async () => {
    await logout()
  }

  const isActive = (path: string) => pathname === path

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <p className="text-sm text-gray-400 mt-1">Pella Group</p>
      </div>

      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-semibold">
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{user?.name}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1">
          {user?.roles.map((role) => {
            const roleName = typeof role === 'string' ? role : role.name
            const roleId = typeof role === 'string' ? role : role.id
            return (
              <span
                key={roleId}
                className="px-2 py-1 bg-gray-700 text-xs rounded"
              >
                {roleName}
              </span>
            )
          })}
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {hasPermission(Permissions.DASHBOARD_VIEW) && (
            <button
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                isActive("/dashboard")
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => router.push("/dashboard")}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Dashboard</span>
            </button>
          )}

          {hasPermission(Permissions.USERS_VIEW) && (
            <button
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                isActive("/users")
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => router.push("/users")}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>Users</span>
            </button>
          )}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center justify-center gap-2"
          onClick={handleLogout}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
