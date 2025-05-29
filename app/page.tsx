import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Server, Zap, RefreshCw, Monitor } from "lucide-react"

export default function HomePage() {
  const renderingMethods = [
    {
      title: "Server-Side Rendering (SSR)",
      description: "Pages are rendered on the server for each request",
      icon: Server,
      href: "/ssr",
      color: "bg-blue-500/20 border-blue-500/30",
      badge: "Dynamic",
      features: ["Fresh data on every request", "SEO friendly", "Slower initial load"],
    },
    {
      title: "Static Site Generation (SSG)",
      description: "Pages are pre-rendered at build time",
      icon: Zap,
      href: "/ssg",
      color: "bg-green-500/20 border-green-500/30",
      badge: "Static",
      features: ["Lightning fast", "CDN cacheable", "Build-time data"],
    },
    {
      title: "Incremental Static Regeneration (ISR)",
      description: "Static pages that can be updated after deployment",
      icon: RefreshCw,
      href: "/isr",
      color: "bg-purple-500/20 border-purple-500/30",
      badge: "Hybrid",
      features: ["Best of both worlds", "Background regeneration", "Stale-while-revalidate"],
    },
    {
      title: "Client-Side Rendering (CSR)",
      description: "Pages are rendered in the browser using JavaScript",
      icon: Monitor,
      href: "/csr",
      color: "bg-orange-500/20 border-orange-500/30",
      badge: "Client",
      features: ["Interactive UIs", "App-like experience", "Loading states"],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Next.js Rendering Strategies Demo
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore the four main rendering approaches in Next.js and understand when to use each one
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {renderingMethods.map((method) => {
            const IconComponent = method.icon
            return (
              <Link key={method.href} href={method.href} scroll={true}>
                <Card
                  className={`${method.color} bg-gray-900/50 border-2 hover:scale-105 transition-all duration-300 cursor-pointer h-full`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <IconComponent className="h-8 w-8 text-white" />
                      <Badge variant="secondary" className="bg-gray-800 text-white">
                        {method.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-white text-xl">{method.title}</CardTitle>
                    <CardDescription className="text-gray-300">{method.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {method.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-300">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-white">Understanding the Differences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="font-semibold text-blue-400 mb-2">When to use SSR:</h3>
                <p className="text-gray-300 text-sm">User-specific content, real-time data, authentication required</p>
              </div>
              <div>
                <h3 className="font-semibold text-green-400 mb-2">When to use SSG:</h3>
                <p className="text-gray-300 text-sm">
                  Marketing pages, blogs, documentation, content that rarely changes
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-purple-400 mb-2">When to use ISR:</h3>
                <p className="text-gray-300 text-sm">E-commerce, news sites, content that updates periodically</p>
              </div>
              <div>
                <h3 className="font-semibold text-orange-400 mb-2">When to use CSR:</h3>
                <p className="text-gray-300 text-sm">Dashboards, admin panels, highly interactive applications</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
