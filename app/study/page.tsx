import { Suspense } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, Flame, Layers, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarTrigger } from "@/components/sidebar-provider"
import { StudySession } from "@/components/study-session"

export default function StudyPage() {
  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-6">
        <SidebarTrigger className="md:hidden" />
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-xl font-semibold">Study Session</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Settings className="h-3.5 w-3.5" />
              <span className="hidden sm:inline-block">Settings</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 space-y-4 p-4 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex flex-col gap-4 md:w-64">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-yellow-500/20">
                    <span className="text-xs font-bold text-yellow-500">JS</span>
                  </div>
                  <div>
                    <div className="font-medium">JavaScript</div>
                    <div className="text-xs text-muted-foreground">28 cards total</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">8/28</span>
                </div>
                <Progress value={28} className="h-2" />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="flex flex-col items-center rounded-md border p-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="mt-1 text-xs font-medium">12:45</span>
                  <span className="text-xs text-muted-foreground">Time</span>
                </div>
                <div className="flex flex-col items-center rounded-md border p-2">
                  <Flame className="h-4 w-4 text-orange-500" />
                  <span className="mt-1 text-xs font-medium">7</span>
                  <span className="text-xs text-muted-foreground">Streak</span>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-medium">Study Options</h3>
              <Tabs defaultValue="all" className="mt-2">
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="due" className="flex-1">
                    Due
                  </TabsTrigger>
                  <TabsTrigger value="new" className="flex-1">
                    New
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-2 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Total cards</span>
                    <span className="font-medium">28</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Due today</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>New cards</span>
                    <span className="font-medium">4</span>
                  </div>
                </TabsContent>
                <TabsContent value="due" className="mt-2 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Due today</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Overdue</span>
                    <span className="font-medium">2</span>
                  </div>
                </TabsContent>
                <TabsContent value="new" className="mt-2 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>New cards</span>
                    <span className="font-medium">4</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Limit per day</span>
                    <span className="font-medium">10</span>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full gap-1">
                  <Layers className="h-3.5 w-3.5" />
                  <span>Change Deck</span>
                </Button>
              </div>
            </Card>
          </div>

          <div className="flex-1">
            <Suspense fallback={<StudySessionSkeleton />}>
              <StudySession />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  )
}

function StudySessionSkeleton() {
  return (
    <div className="flex h-[500px] animate-pulse items-center justify-center rounded-lg border">
      <div className="text-center">
        <div className="mx-auto h-16 w-16 rounded-full bg-muted"></div>
        <div className="mt-4 h-6 w-32 rounded bg-muted"></div>
        <div className="mt-2 h-4 w-48 rounded bg-muted"></div>
      </div>
    </div>
  )
}
