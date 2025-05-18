import { Suspense } from "react"
import Link from "next/link"
import { BarChart3, BookOpen, Calendar, Clock, Flame, Layers, Plus, Sparkles, Trophy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarTrigger } from "@/components/sidebar-provider"
import { DashboardStats } from "@/components/dashboard-stats"
import { StudyHeatmap } from "@/components/study-heatmap"
import { RecentDecks } from "@/components/recent-decks"
import { NewDeckDialog } from "@/components/new-deck-dialog"
import { TodayActivityDialog } from "@/components/today-activity-dialog"

export default function Dashboard() {
  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-8">
        <SidebarTrigger className="md:hidden" />
        <div className="flex flex-1 items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <div className="flex items-center gap-3">
            <TodayActivityDialog />
            <NewDeckDialog />
          </div>
        </div>
      </header>
      <main className="flex-1 space-y-6 p-6 md:p-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Suspense fallback={<DashboardStatsSkeleton />}>
            <DashboardStats />
          </Suspense>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="bg-background/50 backdrop-blur p-1">
              <TabsTrigger value="overview" className="px-6 py-2 transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600/20 data-[state=active]:to-blue-600/20">Overview</TabsTrigger>
              <TabsTrigger value="analytics" className="px-6 py-2 transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600/20 data-[state=active]:to-blue-600/20">Analytics</TabsTrigger>
              <TabsTrigger value="achievements" className="px-6 py-2 transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600/20 data-[state=active]:to-blue-600/20">Achievements</TabsTrigger>
            </TabsList>
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="outline" size="default" className="gap-2 transition-all hover:scale-105">
                <Clock className="h-4 w-4" />
                Last 30 days
              </Button>
            </div>
          </div>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4 backdrop-blur transition-all hover:shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-lg font-medium">Study Activity</CardTitle>
                </CardHeader>
                <CardContent className="px-2">
                  <div className="h-[250px] w-full">
                    <Suspense fallback={<div className="h-[250px] w-full animate-pulse rounded-md bg-muted"></div>}>
                      <StudyHeatmap />
                    </Suspense>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-3 backdrop-blur transition-all hover:shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-lg font-medium">Recent Decks</CardTitle>
                  <Button variant="ghost" size="sm" asChild className="transition-all hover:scale-105">
                    <Link href="/decks">View all</Link>
                  </Button>
                </CardHeader>
                <CardContent className="px-4">
                  <Suspense fallback={<RecentDecksSkeleton />}>
                    <RecentDecks />
                  </Suspense>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="backdrop-blur transition-all hover:shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-lg font-medium">Due Today</CardTitle>
                  <Button variant="ghost" size="icon" className="h-9 w-9 transition-all hover:scale-110 hover:text-yellow-500">
                    <Sparkles className="h-5 w-5 text-yellow-500" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-yellow-400 to-yellow-600 transition-all group-hover:scale-105">
                          <span className="text-sm font-bold text-white">JS</span>
                        </div>
                        <div>
                          <div className="text-base font-medium">JavaScript</div>
                          <div className="text-sm text-muted-foreground">8 cards due</div>
                        </div>
                      </div>
                      <Button variant="outline" size="default" asChild className="transition-all hover:scale-105 hover:bg-yellow-500/10">
                        <Link href="/study?deck=javascript">Study</Link>
                      </Button>
                    </div>

                    <div className="flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-blue-400 to-blue-600 transition-all group-hover:scale-105">
                          <span className="text-sm font-bold text-white">R</span>
                        </div>
                        <div>
                          <div className="text-base font-medium">React Hooks</div>
                          <div className="text-sm text-muted-foreground">4 cards due</div>
                        </div>
                      </div>
                      <Button variant="outline" size="default" asChild className="transition-all hover:scale-105 hover:bg-blue-500/10">
                        <Link href="/study?deck=react">Study</Link>
                      </Button>
                    </div>

                    <div className="flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-green-400 to-green-600 transition-all group-hover:scale-105">
                          <span className="text-sm font-bold text-white">S</span>
                        </div>
                        <div>
                          <div className="text-base font-medium">Spanish Vocabulary</div>
                          <div className="text-sm text-muted-foreground">16 cards due</div>
                        </div>
                      </div>
                      <Button variant="outline" size="default" asChild className="transition-all hover:scale-105 hover:bg-green-500/10">
                        <Link href="/study?deck=spanish">Study</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-4">
                  <Button className="w-full h-11 bg-gradient-to-r from-purple-600 to-blue-600 transition-all hover:scale-105 hover:opacity-90" asChild>
                    <Link href="/study">
                      <BookOpen className="mr-2 h-5 w-5" />
                      Study All
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="backdrop-blur transition-all hover:shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-lg font-medium">Learning Progress</CardTitle>
                  <Button variant="ghost" size="icon" className="h-9 w-9 transition-all hover:scale-110 hover:text-blue-500">
                    <BarChart3 className="h-5 w-5 text-blue-500" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="group">
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <div className="font-medium">JavaScript</div>
                      <div className="text-muted-foreground">68%</div>
                    </div>
                    <Progress value={68} className="h-2 transition-all group-hover:h-3" indicatorClassName="bg-gradient-to-r from-yellow-400 to-yellow-600" />
                  </div>

                  <div className="group">
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <div className="font-medium">React Hooks</div>
                      <div className="text-muted-foreground">42%</div>
                    </div>
                    <Progress value={42} className="h-2 transition-all group-hover:h-3" indicatorClassName="bg-gradient-to-r from-blue-400 to-blue-600" />
                  </div>

                  <div className="group">
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <div className="font-medium">Spanish Vocabulary</div>
                      <div className="text-muted-foreground">89%</div>
                    </div>
                    <Progress value={89} className="h-2 transition-all group-hover:h-3" indicatorClassName="bg-gradient-to-r from-green-400 to-green-600" />
                  </div>

                  <div className="group">
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <div className="font-medium">CSS Grid</div>
                      <div className="text-muted-foreground">23%</div>
                    </div>
                    <Progress value={23} className="h-2 transition-all group-hover:h-3" indicatorClassName="bg-gradient-to-r from-purple-400 to-purple-600" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full transition-all hover:scale-105" asChild>
                    <Link href="/stats">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      View Detailed Stats
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-lg font-medium">Achievements</CardTitle>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-red-600 p-2 shadow-md">
                        <Flame className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">7 Day Streak</div>
                        <div className="text-xs text-muted-foreground">Keep it going!</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-600 p-2 shadow-md">
                        <Layers className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">Deck Master</div>
                        <div className="text-xs text-muted-foreground">Created 5+ decks</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600 p-2 shadow-md">
                        <Trophy className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">Perfect Recall</div>
                        <div className="text-xs text-muted-foreground">100% accuracy on a deck</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/achievements">
                      <Trophy className="mr-2 h-4 w-4" />
                      View All Achievements
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Learning Performance</CardTitle>
                  <CardDescription>Your retention rate over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full rounded-md border p-4">
                    <div className="flex h-full w-full items-center justify-center">
                      <p className="text-sm text-muted-foreground">Performance chart will appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Study Efficiency</CardTitle>
                  <CardDescription>Cards reviewed per minute</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full rounded-md border p-4">
                    <div className="flex h-full w-full items-center justify-center">
                      <p className="text-sm text-muted-foreground">Efficiency chart will appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Streaks</CardTitle>
                  <CardDescription>Your consistent learning journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-red-600 p-2 shadow-md">
                        <Flame className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">Current Streak: 7 days</div>
                        <Progress value={70} className="h-2 w-32" />
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Your best streak was 14 days. Keep going to beat your record!
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Badges</CardTitle>
                  <CardDescription>Achievements unlocked</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-600 p-2 shadow-md">
                        <Layers className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-xs">Deck Master</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600 p-2 shadow-md">
                        <Trophy className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-xs">Perfect Recall</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 p-2 shadow-md opacity-40">
                        <Sparkles className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-xs text-muted-foreground">Locked</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Milestones</CardTitle>
                  <CardDescription>Your learning journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span className="text-sm">100 cards reviewed</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Completed</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span className="text-sm">Create 5 decks</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Completed</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                        <span className="text-sm">500 cards reviewed</span>
                      </div>
                      <span className="text-xs text-muted-foreground">In progress (342/500)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-muted"></div>
                        <span className="text-sm">30 day streak</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Not started</span>
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

function DashboardStatsSkeleton() {
  return (
    <>
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
    </>
  )
}

function RecentDecksSkeleton() {
  return (
    <div className="space-y-4">
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex animate-pulse items-center gap-4">
            <div className="h-10 w-10 rounded-md bg-muted"></div>
            <div className="space-y-2">
              <div className="h-4 w-24 rounded bg-muted"></div>
              <div className="h-3 w-16 rounded bg-muted"></div>
            </div>
            <div className="ml-auto h-8 w-16 rounded bg-muted"></div>
          </div>
        ))}
    </div>
  )
}
