'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar, Clock, BookOpen, CheckCircle2 } from "lucide-react"
import { ScrollArea } from "./ui/scroll-area"

export function TodayActivityDialog() {
  const [open, setOpen] = useState(false)

  // Mock data - Replace with actual data from your backend
  const todayActivities = {
    cardsStudied: 45,
    timeSpent: "1h 30m",
    completedDecks: ["JavaScript", "React Hooks"],
    activities: [
      {
        time: "10:30 AM",
        action: "Completed JavaScript deck review",
        cards: 20,
        accuracy: "85%"
      },
      {
        time: "2:15 PM",
        action: "Studied React Hooks",
        cards: 15,
        accuracy: "92%"
      },
      {
        time: "4:45 PM",
        action: "Quick review of Spanish Vocabulary",
        cards: 10,
        accuracy: "78%"
      }
    ]
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="default" className="gap-2 transition-all hover:scale-105">
          <Calendar className="h-4 w-4" />
          <span className="hidden sm:inline-block">Today</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Today's Activity</DialogTitle>
          <DialogDescription>
            Your learning progress for {new Date().toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center justify-center rounded-lg bg-secondary/50 p-3">
            <BookOpen className="mb-2 h-5 w-5 text-primary" />
            <div className="text-xl font-bold">{todayActivities.cardsStudied}</div>
            <div className="text-xs text-muted-foreground">Cards Studied</div>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg bg-secondary/50 p-3">
            <Clock className="mb-2 h-5 w-5 text-primary" />
            <div className="text-xl font-bold">{todayActivities.timeSpent}</div>
            <div className="text-xs text-muted-foreground">Time Spent</div>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg bg-secondary/50 p-3">
            <CheckCircle2 className="mb-2 h-5 w-5 text-primary" />
            <div className="text-xl font-bold">{todayActivities.completedDecks.length}</div>
            <div className="text-xs text-muted-foreground">Decks Completed</div>
          </div>
        </div>
        <ScrollArea className="mt-4 max-h-[300px] rounded-md border p-4">
          <div className="space-y-4">
            {todayActivities.activities.map((activity, index) => (
              <div key={index} className="flex items-start justify-between border-b pb-3 last:border-0">
                <div className="space-y-1">
                  <div className="text-sm font-medium">{activity.action}</div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {activity.time}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{activity.cards} cards</div>
                  <div className="text-xs text-muted-foreground">Accuracy: {activity.accuracy}</div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
} 