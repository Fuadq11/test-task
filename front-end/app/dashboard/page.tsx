"use client"

import ProtectedPage from "../components/ProtectedPage"
import Sidebar from "../components/Sidebar"
import { useAuth } from "../context/AuthContext"

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <ProtectedPage permission="dashboard.view">
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome back, {user?.name}!</p>
            </div>
          </div>
        </main>
      </div>
    </ProtectedPage>
  )
}
