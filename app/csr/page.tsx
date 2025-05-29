"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Monitor, Loader2, RefreshCw, User, Activity } from "lucide-react"

// Mock API functions to simulate client-side data fetching
const mockAPI = {
  getUserProfile: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))
    return {
      id: Math.floor(Math.random() * 1000),
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      avatar: "/placeholder.svg?height=64&width=64",
      joinDate: "2023-06-15",
      lastActive: new Date().toISOString(),
      preferences: {
        theme: "dark",
        notifications: true,
        language: "en",
      },
    }
  },

  getDashboardData: async () => {
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 800))
    return {
      tasks: {
        completed: Math.floor(Math.random() * 50) + 20,
        pending: Math.floor(Math.random() * 20) + 5,
        overdue: Math.floor(Math.random() * 5),
      },
      projects: [
        { id: 1, name: "Website Redesign", progress: Math.floor(Math.random() * 100), status: "active" },
        { id: 2, name: "Mobile App", progress: Math.floor(Math.random() * 100), status: "active" },
        { id: 3, name: "API Integration", progress: Math.floor(Math.random() * 100), status: "completed" },
      ],
      recentActivity: [
        { id: 1, action: "Completed task: Update homepage", time: "2 minutes ago" },
        { id: 2, action: "Started project: Mobile App", time: "1 hour ago" },
        { id: 3, action: "Commented on: API Documentation", time: "3 hours ago" },
      ],
    }
  },

  getAnalytics: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1200 + Math.random() * 800))
    return {
      visitors: Math.floor(Math.random() * 1000) + 500,
      pageViews: Math.floor(Math.random() * 5000) + 2000,
      bounceRate: (Math.random() * 30 + 20).toFixed(1),
      avgSession: `${Math.floor(Math.random() * 5) + 2}:${Math.floor(Math.random() * 60)
        .toString()
        .padStart(2, "0")}`,
    }
  },
}

export default function CSRPage() {
  const [userProfile, setUserProfile] = useState(null)
  const [dashboardData, setDashboardData] = useState(null)
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState({
    profile: true,
    dashboard: true,
    analytics: true,
  })
  const [refreshing, setRefreshing] = useState(false)

  const loadData = async () => {
    // Simulate loading different data sources
    Promise.all([
      mockAPI.getUserProfile().then((data) => {
        setUserProfile(data)
        setLoading((prev) => ({ ...prev, profile: false }))
      }),
      mockAPI.getDashboardData().then((data) => {
        setDashboardData(data)
        setLoading((prev) => ({ ...prev, dashboard: false }))
      }),
      mockAPI.getAnalytics().then((data) => {
        setAnalytics(data)
        setLoading((prev) => ({ ...prev, analytics: false }))
      }),
    ])
  }

  const refreshData = async () => {
    setRefreshing(true)
    setLoading({ profile: true, dashboard: true, analytics: true })
    await loadData()
    setRefreshing(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" scroll={true}>
            <Button variant="ghost" className="text-orange-400 hover:text-orange-300 mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Monitor className="h-8 w-8 text-orange-400" />
              <h1 className="text-3xl font-bold">Client-Side Rendering (CSR)</h1>
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">Client</Badge>
            </div>
            <Button
              onClick={refreshData}
              disabled={refreshing}
              className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border-orange-500/30"
            >
              {refreshing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
              Refresh Data
            </Button>
          </div>

          <p className="text-gray-300 text-lg mb-6">
            This page renders in the browser using JavaScript. Watch the loading states as different data sources are
            fetched asynchronously.
          </p>
        </div>

        {/* User Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-900/50 border-orange-500/30">
            <CardHeader>
              <CardTitle className="text-orange-400 flex items-center gap-2">
                <User className="h-5 w-5" />
                User Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading.profile ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-orange-400" />
                </div>
              ) : userProfile ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-orange-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">{userProfile.name}</div>
                      <div className="text-sm text-gray-400">{userProfile.email}</div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-400">User ID:</span>
                      <span className="ml-2 font-mono text-orange-300">#{userProfile.id}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Joined:</span>
                      <span className="ml-2 text-orange-300">
                        {new Date(userProfile.joinDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Last Active:</span>
                      <span className="ml-2 text-orange-300">
                        {new Date(userProfile.lastActive).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-blue-400">Task Overview</CardTitle>
            </CardHeader>
            <CardContent>
              {loading.dashboard ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
                </div>
              ) : dashboardData ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-400">{dashboardData.tasks.completed}</div>
                      <div className="text-xs text-gray-400">Completed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-400">{dashboardData.tasks.pending}</div>
                      <div className="text-xs text-gray-400">Pending</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-400">{dashboardData.tasks.overdue}</div>
                      <div className="text-xs text-gray-400">Overdue</div>
                    </div>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading.analytics ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
                </div>
              ) : analytics ? (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Visitors:</span>
                    <span className="font-mono text-purple-300">{analytics.visitors.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Page Views:</span>
                    <span className="font-mono text-purple-300">{analytics.pageViews.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Bounce Rate:</span>
                    <span className="font-mono text-purple-300">{analytics.bounceRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Avg Session:</span>
                    <span className="font-mono text-purple-300">{analytics.avgSession}</span>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>

        {/* Projects and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Active Projects</CardTitle>
              <CardDescription>Real-time project status</CardDescription>
            </CardHeader>
            <CardContent>
              {loading.dashboard ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-gray-700 rounded mb-2"></div>
                      <div className="h-2 bg-gray-800 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : dashboardData ? (
                <div className="space-y-4">
                  {dashboardData.projects.map((project) => (
                    <div key={project.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-white">{project.name}</span>
                        <Badge variant={project.status === "completed" ? "default" : "secondary"}>
                          {project.status}
                        </Badge>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-400">{project.progress}% complete</div>
                    </div>
                  ))}
                </div>
              ) : null}
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
              <CardDescription>Live activity feed</CardDescription>
            </CardHeader>
            <CardContent>
              {loading.dashboard ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse flex gap-3">
                      <div className="w-2 h-2 bg-gray-700 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="h-3 bg-gray-700 rounded mb-1"></div>
                        <div className="h-2 bg-gray-800 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : dashboardData ? (
                <div className="space-y-4">
                  {dashboardData.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                      <div>
                        <div className="text-white text-sm">{activity.action}</div>
                        <div className="text-gray-400 text-xs">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>

        {/* CSR Explanation */}
        <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Monitor className="h-6 w-6 text-orange-400" />
              <h3 className="text-lg font-semibold text-white">Client-Side Rendering</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-orange-400 mb-3">How it Works:</h4>
                <ol className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                      1
                    </span>
                    Browser loads minimal HTML + JS
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                      2
                    </span>
                    JavaScript executes in browser
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                      3
                    </span>
                    API calls fetch data asynchronously
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                      4
                    </span>
                    UI updates as data arrives
                  </li>
                </ol>
              </div>
              <div>
                <h4 className="font-semibold text-red-400 mb-3">Perfect For:</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full" />
                    Interactive dashboards
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full" />
                    Real-time applications
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full" />
                    User-specific content
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full" />
                    Complex user interactions
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
