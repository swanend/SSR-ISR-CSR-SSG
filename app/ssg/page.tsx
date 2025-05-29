import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Zap, Clock, Database } from "lucide-react"

// This would normally fetch data at build time
// For demo purposes, we'll simulate static data
function getStaticData() {
  return {
    buildTime: "2024-01-15T10:30:00.000Z", // Simulated build time
    version: "1.2.3",
    totalPosts: 42,
    totalUsers: 1337,
    featuredPosts: [
      {
        id: 1,
        title: "Understanding Static Site Generation",
        excerpt: "Learn how SSG can make your website lightning fast",
        author: "Jane Smith",
        publishedAt: "2024-01-10T09:00:00.000Z",
        readTime: "5 min read",
      },
      {
        id: 2,
        title: "Next.js Performance Optimization",
        excerpt: "Tips and tricks to optimize your Next.js application",
        author: "Mike Johnson",
        publishedAt: "2024-01-08T14:30:00.000Z",
        readTime: "8 min read",
      },
      {
        id: 3,
        title: "The Future of Web Development",
        excerpt: "Exploring upcoming trends and technologies",
        author: "Sarah Wilson",
        publishedAt: "2024-01-05T11:15:00.000Z",
        readTime: "6 min read",
      },
    ],
    stats: {
      pageViews: 125000,
      bounceRate: "32%",
      avgSessionDuration: "4:23",
    },
  }
}

export default function SSGPage() {
  // This data would be fetched at build time in a real SSG setup
  const data = getStaticData()

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" scroll={true}>
            <Button variant="ghost" className="text-green-400 hover:text-green-300 mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <Zap className="h-8 w-8 text-green-400" />
            <h1 className="text-3xl font-bold">Static Site Generation (SSG)</h1>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Static</Badge>
          </div>

          <p className="text-gray-300 text-lg mb-6">
            This page was pre-rendered at build time. All the content below was generated when the site was built,
            making it incredibly fast to load.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-900/50 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Build Info
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-400">Built at:</span>
                  <div className="font-mono text-green-300">{new Date(data.buildTime).toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-gray-400">Version:</span>
                  <div className="font-mono text-green-300">v{data.version}</div>
                </div>
                <div>
                  <span className="text-gray-400">Status:</span>
                  <div className="text-green-300">✅ Static</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Database className="h-5 w-5" />
                Site Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-400">Total Posts:</span>
                  <div className="font-mono text-blue-300">{data.totalPosts}</div>
                </div>
                <div>
                  <span className="text-gray-400">Total Users:</span>
                  <div className="font-mono text-blue-300">{data.totalUsers.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-gray-400">Page Views:</span>
                  <div className="font-mono text-blue-300">{data.stats.pageViews.toLocaleString()}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400">Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-400">Bounce Rate:</span>
                  <div className="font-mono text-purple-300">{data.stats.bounceRate}</div>
                </div>
                <div>
                  <span className="text-gray-400">Avg Session:</span>
                  <div className="font-mono text-purple-300">{data.stats.avgSessionDuration}</div>
                </div>
                <div>
                  <span className="text-gray-400">Load Time:</span>
                  <div className="font-mono text-purple-300">⚡ Instant</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Featured Posts</CardTitle>
              <CardDescription>Content generated at build time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.featuredPosts.map((post) => (
                  <div key={post.id} className="border-l-4 border-green-500 pl-4 py-2">
                    <h3 className="font-semibold text-white mb-1">{post.title}</h3>
                    <p className="text-gray-300 text-sm mb-2">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span>By {post.author}</span>
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="h-5 w-5" />
                How SSG Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-green-400 mb-3">Build Process:</h3>
                  <ol className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                        1
                      </span>
                      Data is fetched at build time
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                        2
                      </span>
                      HTML pages are pre-generated
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                        3
                      </span>
                      Static files are deployed to CDN
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                        4
                      </span>
                      Users get instant page loads
                    </li>
                  </ol>
                </div>

                <div>
                  <h3 className="font-semibold text-blue-400 mb-3">Benefits:</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      Lightning fast performance
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      Excellent SEO
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      CDN cacheable
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      Lower server costs
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="h-6 w-6 text-green-400" />
              <h3 className="text-lg font-semibold text-white">SSG Performance</h3>
            </div>
            <p className="text-gray-300 mb-4">
              This page loads instantly because it was pre-built. No server processing time, no database queries, just
              pure HTML served from a CDN.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-gray-900/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-400">~0ms</div>
                <div className="text-sm text-gray-400">Server Processing</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-400">~50ms</div>
                <div className="text-sm text-gray-400">CDN Response</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-400">100%</div>
                <div className="text-sm text-gray-400">Cache Hit Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
