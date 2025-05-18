"use client"

import { useEffect, useState } from "react"

export function StudyHeatmap() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-[200px] w-full animate-pulse rounded-md bg-muted"></div>
  }

  // Generate fake data for the heatmap
  // In a real app, this would come from an API
  const today = new Date()
  const startDate = new Date(today)
  startDate.setDate(today.getDate() - 120) // Go back 120 days

  const days = []
  const currentDate = new Date(startDate)

  while (currentDate <= today) {
    days.push({
      date: new Date(currentDate),
      count: Math.floor(Math.random() * 10), // Random activity count
    })
    currentDate.setDate(currentDate.getDate() + 1)
  }

  // Group by month for labels
  const months = []
  let currentMonth = -1

  days.forEach((day) => {
    const month = day.date.getMonth()
    if (month !== currentMonth) {
      months.push({
        month,
        label: day.date.toLocaleString("default", { month: "short" }),
        x: months.length * 30, // Approximate position
      })
      currentMonth = month
    }
  })

  // Group by week for rendering
  const weeks = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }

  // Color scale for the heatmap
  const getColor = (count) => {
    if (count === 0) return "bg-muted/30"
    if (count < 3) return "bg-purple-900/30"
    if (count < 5) return "bg-purple-700/40"
    if (count < 8) return "bg-purple-500/60"
    return "bg-purple-400/80"
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-start space-x-1 overflow-hidden px-2 pb-2">
        {months.map((month, i) => (
          <div key={i} className="text-xs text-muted-foreground" style={{ marginLeft: i === 0 ? 0 : `${month.x}px` }}>
            {month.label}
          </div>
        ))}
      </div>

      <div className="flex h-[150px] space-x-1 overflow-x-auto px-2">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col space-y-1">
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`h-3 w-3 rounded-sm ${getColor(day.count)}`}
                title={`${day.date.toLocaleDateString()}: ${day.count} cards studied`}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-end space-x-2 px-2">
        <div className="text-xs text-muted-foreground">Less</div>
        <div className="h-2 w-2 rounded-sm bg-muted/30"></div>
        <div className="h-2 w-2 rounded-sm bg-purple-900/30"></div>
        <div className="h-2 w-2 rounded-sm bg-purple-700/40"></div>
        <div className="h-2 w-2 rounded-sm bg-purple-500/60"></div>
        <div className="h-2 w-2 rounded-sm bg-purple-400/80"></div>
        <div className="text-xs text-muted-foreground">More</div>
      </div>
    </div>
  )
}
