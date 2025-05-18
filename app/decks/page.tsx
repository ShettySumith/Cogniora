import { Suspense } from "react"
import Link from "next/link"
import { ArrowUpDown, Download, Layers, MoreHorizontal, Plus, Search, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/sidebar-provider"

export default function DecksPage() {
  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-6">
        <SidebarTrigger className="md:hidden" />
        <div className="flex flex-1 items-center justify-between">
          <h1 className="text-xl font-semibold">Decks</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Upload className="h-3.5 w-3.5" />
              <span className="hidden sm:inline-block">Import</span>
            </Button>
            <Button size="sm" className="h-8 gap-1">
              <Plus className="h-3.5 w-3.5" />
              <span>New Deck</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 space-y-4 p-4 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search decks..." className="w-full pl-8" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-1">
                  <ArrowUpDown className="h-3.5 w-3.5" />
                  <span>Sort</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Name (A-Z)</DropdownMenuItem>
                <DropdownMenuItem>Name (Z-A)</DropdownMenuItem>
                <DropdownMenuItem>Recently updated</DropdownMenuItem>
                <DropdownMenuItem>Oldest</DropdownMenuItem>
                <DropdownMenuItem>Card count (high to low)</DropdownMenuItem>
                <DropdownMenuItem>Card count (low to high)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Suspense fallback={<DecksSkeleton />}>
            <DecksList />
          </Suspense>
        </div>
      </main>
    </div>
  )
}

function DecksList() {
  // In a real app, this would fetch data from an API
  const decks = [
    {
      id: "javascript",
      name: "JavaScript",
      description: "Core JavaScript concepts and patterns",
      cardCount: 28,
      color: "yellow",
      lastStudied: "2 hours ago",
    },
    {
      id: "react",
      name: "React Hooks",
      description: "Modern React with hooks and functional components",
      cardCount: 42,
      color: "blue",
      lastStudied: "Yesterday",
    },
    {
      id: "spanish",
      name: "Spanish Vocabulary",
      description: "Essential Spanish words and phrases",
      cardCount: 156,
      color: "green",
      lastStudied: "3 days ago",
    },
    {
      id: "css",
      name: "CSS Grid",
      description: "Modern CSS layout techniques",
      cardCount: 18,
      color: "purple",
      lastStudied: "1 week ago",
    },
    {
      id: "algorithms",
      name: "Algorithms",
      description: "Common algorithms and data structures",
      cardCount: 64,
      color: "red",
      lastStudied: "2 weeks ago",
    },
    {
      id: "design-patterns",
      name: "Design Patterns",
      description: "Software design patterns and principles",
      cardCount: 36,
      color: "orange",
      lastStudied: "1 month ago",
    },
  ]

  const getColorClasses = (color) => {
    switch (color) {
      case "yellow":
        return {
          bg: "bg-yellow-500/20",
          text: "text-yellow-500",
          border: "border-yellow-500/20",
        }
      case "blue":
        return {
          bg: "bg-blue-500/20",
          text: "text-blue-500",
          border: "border-blue-500/20",
        }
      case "green":
        return {
          bg: "bg-green-500/20",
          text: "text-green-500",
          border: "border-green-500/20",
        }
      case "purple":
        return {
          bg: "bg-purple-500/20",
          text: "text-purple-500",
          border: "border-purple-500/20",
        }
      case "red":
        return {
          bg: "bg-red-500/20",
          text: "text-red-500",
          border: "border-red-500/20",
        }
      case "orange":
        return {
          bg: "bg-orange-500/20",
          text: "text-orange-500",
          border: "border-orange-500/20",
        }
      default:
        return {
          bg: "bg-gray-500/20",
          text: "text-gray-500",
          border: "border-gray-500/20",
        }
    }
  }

  return (
    <>
      {decks.map((deck) => {
        const colors = getColorClasses(deck.color)

        return (
          <Card key={deck.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-md ${colors.bg}`}>
                    <span className={`text-xs font-bold ${colors.text}`}>{deck.name.substring(0, 1)}</span>
                  </div>
                  <CardTitle>{deck.name}</CardTitle>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      <span>Export</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription>{deck.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Layers className="h-4 w-4 text-muted-foreground" />
                  <span>{deck.cardCount} cards</span>
                </div>
                <div className="text-muted-foreground">{deck.lastStudied}</div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <Link href={`/decks/${deck.id}`}>
                  <span>Edit</span>
                </Link>
              </Button>
              <Button size="sm" className="flex-1" asChild>
                <Link href={`/study?deck=${deck.id}`}>
                  <span>Study</span>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </>
  )
}

function DecksSkeleton() {
  return (
    <>
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <Card key={i} className="animate-pulse overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-md bg-muted"></div>
                  <div className="h-5 w-24 rounded bg-muted"></div>
                </div>
                <div className="h-8 w-8 rounded-full bg-muted"></div>
              </div>
              <div className="mt-1 h-4 w-full rounded bg-muted"></div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center justify-between">
                <div className="h-4 w-20 rounded bg-muted"></div>
                <div className="h-4 w-16 rounded bg-muted"></div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2 pt-2">
              <div className="h-9 w-full rounded bg-muted"></div>
              <div className="h-9 w-full rounded bg-muted"></div>
            </CardFooter>
          </Card>
        ))}
    </>
  )
}
