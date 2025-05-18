"use client"

import { SidebarGroupAction } from "@/components/ui/sidebar"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Brain, Home, BarChart3, Settings, Plus, BookOpen, Layers, Flame, Trophy, User, LogOut } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/sidebar-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader className="pb-0">
        <div className="flex items-center px-2 py-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 shadow-md overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/50 via-purple-600/50 to-blue-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Brain className="h-5 w-5 text-white transform rotate-12 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 rounded-md bg-white/10 backdrop-blur-sm"></div>
              <div className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center">
                <div className="absolute h-3 w-3 animate-ping rounded-full bg-indigo-400 opacity-75"></div>
                <div className="h-2 w-2 rounded-full bg-indigo-500 group-hover:bg-indigo-400 transition-colors duration-300"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-none tracking-tight group-hover:text-indigo-400 transition-colors duration-300">Cogniora</span>
              <span className="text-xs text-muted-foreground group-hover:text-indigo-500/70 transition-colors duration-300">Cognitive Learning</span>
            </div>
          </Link>
          <div className="ml-auto flex items-center gap-1">
            <SidebarTrigger />
          </div>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/"} tooltip="Dashboard">
                  <Link href="/">
                    <Home />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/study"} tooltip="Study">
                  <Link href="/study">
                    <BookOpen />
                    <span>Study</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuBadge className="bg-primary/20 text-primary-foreground">12</SidebarMenuBadge>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/decks"} tooltip="Decks">
                  <Link href="/decks">
                    <Layers />
                    <span>Decks</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/stats"} tooltip="Statistics">
                  <Link href="/stats">
                    <BarChart3 />
                    <span>Statistics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>My Decks</SidebarGroupLabel>
          <SidebarGroupAction title="Create Deck">
            <Plus />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="JavaScript">
                  <div className="flex h-4 w-4 items-center justify-center rounded-md bg-yellow-500/20">
                    <span className="text-xs font-bold text-yellow-500">JS</span>
                  </div>
                  <span>JavaScript</span>
                </SidebarMenuButton>
                <SidebarMenuBadge className="bg-yellow-500/20 text-yellow-500">8</SidebarMenuBadge>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="React Hooks">
                  <div className="flex h-4 w-4 items-center justify-center rounded-md bg-blue-500/20">
                    <span className="text-xs font-bold text-blue-500">R</span>
                  </div>
                  <span>React Hooks</span>
                </SidebarMenuButton>
                <SidebarMenuBadge className="bg-blue-500/20 text-blue-500">4</SidebarMenuBadge>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Spanish Vocabulary">
                  <div className="flex h-4 w-4 items-center justify-center rounded-md bg-green-500/20">
                    <span className="text-xs font-bold text-green-500">S</span>
                  </div>
                  <span>Spanish Vocabulary</span>
                </SidebarMenuButton>
                <SidebarMenuBadge className="bg-green-500/20 text-green-500">16</SidebarMenuBadge>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Achievements</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Streaks">
                  <Flame className="text-orange-500" />
                  <span>7 Day Streak</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Badges">
                  <Trophy className="text-yellow-500" />
                  <span>Badges</span>
                </SidebarMenuButton>
                <SidebarMenuBadge className="bg-yellow-500/20 text-yellow-500">3</SidebarMenuBadge>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/settings"} tooltip="Settings">
              <Link href="/settings">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="cursor-pointer">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span>John Doe</span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
