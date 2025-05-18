'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()

  const handleReset = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.clear()
      toast.success("All data has been reset")
      setTimeout(() => window.location.reload(), 1000)
    }
  }

  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-8">
        <div className="flex flex-1 items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        </div>
      </header>
      
      <main className="flex-1 space-y-4 p-4 md:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how the app looks and feels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger id="theme" className="w-full">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configure your notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="daily-reminder">Daily study reminder</Label>
                <Switch id="daily-reminder" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="due-cards">Due cards notifications</Label>
                <Switch id="due-cards" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="achievements">Achievement notifications</Label>
                <Switch id="achievements" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Study Preferences</CardTitle>
              <CardDescription>
                Customize your learning experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-play">Auto-advance cards</Label>
                <Switch id="auto-play" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cards-per-session">Cards per session</Label>
                <Select defaultValue="20">
                  <SelectTrigger id="cards-per-session" className="w-full">
                    <SelectValue placeholder="Select amount" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 cards</SelectItem>
                    <SelectItem value="20">20 cards</SelectItem>
                    <SelectItem value="30">30 cards</SelectItem>
                    <SelectItem value="50">50 cards</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>
                Manage your app data and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-destructive">Danger Zone</Label>
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={handleReset}
                >
                  Reset All Data
                </Button>
              </div>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
              This will delete all your decks and settings
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
} 