import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, RefreshCw, Clock, TrendingUp } from "lucide-react"

// Mock function to simulate ISR data fetching
// In a real app, this would be in getStaticProps with revalidate
function getISRData() {
  const now = new Date()
  const lastRevalidated = new Date(now.getTime() - Math.random() * 3600000) // Random time within last hour

  return {
    lastRevalidated: lastRevalidated.toISOString(),
    nextRevalidation: new Date(now.getTime() + 300000).toISOString(), // 5 minutes from now
    revalidateInterval: 300, // 5 minutes in seconds
    contentVersion: Math.floor(Date.now() / 300000), // Changes every 5 minutes
    newsArticles: [
      {
        id: 1,
        title: "Breaking: New Web Framework Released",
        summary: "A revolutionary new framework promises to change how we build web applications",
        publishedAt: new Date(now.getTime() - Math.random() * 86400000).toISOString(),
        views: Math.floor(Math.random() * 10000) + 1000,
        category: "Technology",
      },
      {
        id: 2,
        title: "Market Update: Tech Stocks Surge",
        summary: "Technology stocks see significant gains following positive earnings reports",
        publishedAt: new Date(now.getTime() - Math.random() * 86400000).toISOString(),
        views: Math.floor(Math.random() * 8000) + 500,
        category: "Finance",
      },
      {
        id: 3,
        title: "Climate Change: New Research Findings",
        summary: "Scientists discover new insights into climate patterns and their implications",
        publishedAt: new Date(now.getTime() - Math.random() * 86400000).toISOString(),
        views: Math.floor(Math.random() * 6000) + 800,
        category: "Science",
      },
    ],
    analytics: {
      totalPageViews: Math.floor(Math.random() * 100000) + 50000,
      uniqueVisitors: Math.floor(Math.random() * 20000) + 10000,
      avgTimeOnPage: `${Math.floor(Math.random() * 5) + 2}:${Math.floor(Math.random() * 60)
        .toString()
        .padStart(2, "0")}`,
      conversionRate: `${(Math.random() * 5 + 2).toFixed(2)}%`,
    },
  }
}

export default function ISRPage() {
  const data = getISRData()

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" scroll={true}>
            <Button variant="ghost" className="text-purple-400 hover:text-purple-300 mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <RefreshCw className="h-8 w-8 text-purple-400" />
            <h1 className="text-3xl font-bold">Incremental Static Regeneration (ISR)</h1>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Hybrid</Badge>
          </div>

          <p className="text-gray-300 text-lg mb-6">
            This page combines the best of SSG and SSR. It's statically generated but can be updated in the background
            without rebuilding the entire site.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900/50 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Revalidation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-400">Last Updated:</span>
                  <div className="font-mono text-purple-300">{new Date(data.lastRevalidated).toLocaleTimeString()}</div>
                </div>
                <div>
                  <span className="text-gray-400">Interval:</span>
                  <div className="font-mono text-purple-300">{data.revalidateInterval}s</div>
                </div>
                <div>
                  <span className="text-gray-400">Version:</span>
                  <div className="font-mono text-purple-300">#{data.contentVersion}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-blue-400">Page Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-300 mb-1">
                {data.analytics.totalPageViews.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">Total views</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400">Unique Visitors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-300 mb-1">
                {data.analytics.uniqueVisitors.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">This period</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-orange-500/30">
            <CardHeader>
              <CardTitle className="text-orange-400">Conversion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-300 mb-1">{data.analytics.conversionRate}</div>
              <div className="text-sm text-gray-400">Rate</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Latest News
                </CardTitle>
                <CardDescription>Content that updates automatically</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {data.newsArticles.map((article) => (
                    <div key={article.id} className="border-l-4 border-purple-500 pl-4 py-3">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-white text-lg">{article.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {article.category}
                        </Badge>
                      </div>
                      <p className="text-gray-300 mb-3">{article.summary}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                        <span>{article.views.toLocaleString()} views</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="bg-gray-900/50 border-gray-700 mb-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <RefreshCw className="h-5 w-5" />
                  How ISR Works
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-purple-400 mb-3">Process:</h3>
                    <ol className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                          1
                        </span>
                        Page served from cache
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                          2
                        </span>
                        Background revalidation triggered
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                          3
                        </span>
                        Fresh data fetched
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                          4
                        </span>
                        Cache updated silently
                      </li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Avg Time on Page:</span>
                    <span className="font-mono text-green-300">{data.analytics.avgTimeOnPage}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Cache Hit Rate:</span>
                    <span className="font-mono text-blue-300">98.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Revalidation Success:</span>
                    <span className="font-mono text-purple-300">99.9%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <RefreshCw className="h-6 w-6 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">ISR Benefits</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-purple-400 mb-3">Best of Both Worlds:</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full" />
                    Fast like SSG (cached pages)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full" />
                    Fresh like SSR (background updates)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full" />
                    No full site rebuilds needed
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-pink-400 mb-3">Perfect For:</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full" />
                    E-commerce product pages
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full" />
                    News and blog sites
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full" />
                    Marketing landing pages
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
