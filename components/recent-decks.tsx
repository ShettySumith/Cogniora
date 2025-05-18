"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useDeckStore } from "@/lib/store"

export function RecentDecks() {
  const decks = useDeckStore((state) => state.decks)

  // Sort decks by creation date and take the 3 most recent
  const recentDecks = [...decks]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3)

  if (decks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <p className="text-sm text-muted-foreground">No decks created yet.</p>
        <p className="text-sm text-muted-foreground">Create your first deck to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {recentDecks.map((deck) => (
        <div key={deck.id} className="flex items-center gap-4">
          <div className={`flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br ${deck.color}`}>
            <span className="text-sm font-bold text-white">
              {deck.title.substring(0, 2).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{deck.title}</p>
            <p className="text-xs text-muted-foreground">
              {deck.totalCards} cards • {deck.cardsToReview} due
            </p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/study?deck=${deck.id}`}>Study</Link>
          </Button>
        </div>
      ))}
    </div>
  )
}
