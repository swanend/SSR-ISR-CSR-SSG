"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Server, Clock, RefreshCwIcon as Refresh } from "lucide-react"

// Mock API call that simulates server-side data fetching
async function getServerData() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  return {
    timestamp: new Date().toISOString(),
    serverInfo: {
      region: "us-east-1",
      nodeVersion: "18.17.0",
      memory: "512MB",
    },
    userData: {
      id: Math.floor(Math.random() * 1000),
      name: "John Doe",
      lastLogin: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    },
    metrics: {
      activeUsers: Math.floor(Math.random() * 1000) + 500,
      requestsPerSecond: Math.floor(Math.random() * 100) + 50,
      responseTime: Math.floor(Math.random() * 50) + 10,
    },
  }
}

import { useEffect } from "react"
import { useClient } from "next/client"

function ScrollToTop() {
  useClient()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return null
}

export default async function SSRPage() {
  // This runs on the server for every request
  const data = await getServerData()

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <ScrollToTop />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" scroll={true}>
            <Button variant="ghost" className="text-blue-400 hover:text-blue-300 mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <Server className="h-8 w-8 text-blue-400" />
            <h1 className="text-3xl font-bold">Server-Side Rendering (SSR)</h1>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Dynamic</Badge>
          </div>

          <p className="text-gray-300 text-lg mb-6">
            This page is rendered on the server for every request. The data below is fetched fresh each time you visit
            or refresh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-900/50 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Request Info
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-400">Rendered at:</span>
                  <div className="font-mono text-blue-300">{new Date(data.timestamp).toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-gray-400">Server Region:</span>
                  <div className="font-mono text-blue-300">{data.serverInfo.region}</div>
                </div>
                <div>
                  <span className="text-gray-400">Node Version:</span>
                  <div className="font-mono text-blue-300">{data.serverInfo.nodeVersion}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400">User Data</CardTitle>
              <CardDescription>Fresh from the database</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-400">User ID:</span>
                  <div className="font-mono text-green-300">#{data.userData.id}</div>
                </div>
                <div>
                  <span className="text-gray-400">Name:</span>
                  <div className="text-green-300">{data.userData.name}</div>
                </div>
                <div>
                  <span className="text-gray-400">Last Login:</span>
                  <div className="text-green-300">{new Date(data.userData.lastLogin).toLocaleString()}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400">Live Metrics</CardTitle>
              <CardDescription>Real-time server data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-400">Active Users:</span>
                  <div className="font-mono text-purple-300">{data.metrics.activeUsers.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-gray-400">Requests/sec:</span>
                  <div className="font-mono text-purple-300">{data.metrics.requestsPerSecond}</div>
                </div>
                <div>
                  <span className="text-gray-400">Response Time:</span>
                  <div className="font-mono text-purple-300">{data.metrics.responseTime}ms</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Server className="h-5 w-5" />
              How SSR Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-blue-400 mb-3">Process Flow:</h3>
                <ol className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                      1
                    </span>
                    User requests the page
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                      2
                    </span>
                    Server fetches fresh data from APIs/database
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                      3
                    </span>
                    Server renders the complete HTML
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                      4
                    </span>
                    HTML is sent to the browser
                  </li>
                </ol>
              </div>
              <div>
                <h3 className="font-semibold text-green-400 mb-3">Benefits:</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    Always fresh data
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    SEO friendly
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    User-specific content
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    Server-side authentication
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-blue-300 text-sm">
                <Refresh className="inline h-4 w-4 mr-1" />
                Try refreshing this page to see how the data changes with each request!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
