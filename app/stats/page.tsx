import { Suspense } from "react"
import { Calendar, Clock, Download, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarTrigger } from "@/components/sidebar-provider"
import { StatsOverview } from "@/components/stats-overview"

export default function StatsPage() {
  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-6">
        <SidebarTrigger className="md:hidden" />
        <div className="flex flex-1 items-center justify-between">
          <h1 className="text-xl font-semibold">Statistics</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span className="hidden sm:inline-block">Last 30 days</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline-block">Export</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 space-y-4 p-4 md:p-6">
        <Suspense fallback={<StatsOverviewSkeleton />}>
          <StatsOverview />
        </Suspense>

        <Tabs defaultValue="performance" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="time">Study Time</TabsTrigger>
              <TabsTrigger value="decks">Decks</TabsTrigger>
            </TabsList>
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Filter className="h-3.5 w-3.5" />
                <span>Filter</span>
              </Button>
            </div>
          </div>

          <TabsContent value="performance" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Retention Rate</CardTitle>
                  <CardDescription>How well you remember cards over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full rounded-md border p-4">
                    <div className="flex h-full w-full items-center justify-center">
                      <p className="text-sm text-muted-foreground">Retention rate chart will appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance by Deck</CardTitle>
                  <CardDescription>Accuracy rates for each deck</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full rounded-md border p-4">
                    <div className="flex h-full w-full items-center justify-center">
                      <p className="text-sm text-muted-foreground">Performance by deck chart will appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="time" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Study Time Distribution</CardTitle>
                  <CardDescription>Hours spent studying by day of week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full rounded-md border p-4">
                    <div className="flex h-full w-full items-center justify-center">
                      <p className="text-sm text-muted-foreground">Study time distribution chart will appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Study Sessions</CardTitle>
                  <CardDescription>Recent study activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">
                                {i === 0 ? "Today" : i === 1 ? "Yesterday" : `${i} days ago`}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {Math.floor(Math.random() * 60) + 10} minutes
                              </div>
                            </div>
                          </div>
                          <div className="text-sm">{Math.floor(Math.random() * 30) + 5} cards</div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="decks" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Cards by Deck</CardTitle>
                  <CardDescription>Distribution of cards across decks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full rounded-md border p-4">
                    <div className="flex h-full w-full items-center justify-center">
                      <p className="text-sm text-muted-foreground">Cards by deck chart will appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Deck Activity</CardTitle>
                  <CardDescription>Most and least studied decks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="mb-2 text-sm font-medium">Most Studied</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-yellow-500/20">
                              <span className="text-xs font-bold text-yellow-500">J</span>
                            </div>
                            <span className="text-sm">JavaScript</span>
                          </div>
                          <span className="text-sm">128 reviews</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-green-500/20">
                              <span className="text-xs font-bold text-green-500">S</span>
                            </div>
                            <span className="text-sm">Spanish</span>
                          </div>
                          <span className="text-sm">96 reviews</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-2 text-sm font-medium">Least Studied</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-500/20">
                              <span className="text-xs font-bold text-purple-500">C</span>
                            </div>
                            <span className="text-sm">CSS Grid</span>
                          </div>
                          <span className="text-sm">12 reviews</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-orange-500/20">
                              <span className="text-xs font-bold text-orange-500">D</span>
                            </div>
                            <span className="text-sm">Design Patterns</span>
                          </div>
                          <span className="text-sm">8 reviews</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function StatsOverviewSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-5 w-16 rounded bg-muted"></div>
              <div className="h-8 w-8 rounded-full bg-muted"></div>
            </CardHeader>
            <CardContent>
              <div className="h-7 w-20 rounded bg-muted"></div>
              <div className="mt-2 h-4 w-32 rounded bg-muted"></div>
            </CardContent>
          </Card>
        ))}
    </div>
  )
}
