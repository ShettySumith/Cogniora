'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Loader2, Check } from "lucide-react"
import { Textarea } from "./ui/textarea"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDeckStore } from "@/lib/store"

const DECK_CATEGORIES = [
  { value: "programming", label: "Programming" },
  { value: "language", label: "Language Learning" },
  { value: "science", label: "Science" },
  { value: "math", label: "Mathematics" },
  { value: "other", label: "Other" }
]

const DECK_COLORS = [
  { value: "purple", label: "Purple", class: "from-purple-600 to-blue-600" },
  { value: "blue", label: "Blue", class: "from-blue-600 to-cyan-600" },
  { value: "green", label: "Green", class: "from-green-600 to-emerald-600" },
  { value: "yellow", label: "Yellow", class: "from-yellow-600 to-orange-600" },
  { value: "red", label: "Red", class: "from-red-600 to-pink-600" }
]

export function NewDeckDialog() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    color: "purple"
  })

  const addDeck = useDeckStore((state) => state.addDeck)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Add the new deck to the store
      addDeck({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        color: formData.color,
      })
      
      // Show success state
      setIsSuccess(true)
      toast.success("Deck created successfully!")
      
      // Reset and close after delay
      setTimeout(() => {
        setOpen(false)
        setIsSuccess(false)
        setFormData({
          title: "",
          description: "",
          category: "",
          color: "purple"
        })
      }, 1000)
    } catch (error) {
      toast.error("Failed to create deck. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const selectedColor = DECK_COLORS.find(c => c.value === formData.color)?.class || DECK_COLORS[0].class

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          size="default" 
          className={`gap-2 bg-gradient-to-r ${selectedColor} transition-all hover:scale-105 hover:opacity-90 cursor-pointer`}
        >
          <Plus className="h-4 w-4" />
          <span>New Deck</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Deck</DialogTitle>
            <DialogDescription>
              Create a new flashcard deck to start learning.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title" className="cursor-pointer">Title</Label>
              <Input
                id="title"
                placeholder="Enter deck title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                minLength={3}
                maxLength={50}
                className="cursor-text focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="category" className="cursor-pointer">Category</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData({ ...formData, category: value })}
                required
              >
                <SelectTrigger className="cursor-pointer">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {DECK_CATEGORIES.map((category) => (
                    <SelectItem 
                      key={category.value} 
                      value={category.value}
                      className="cursor-pointer"
                    >
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="color" className="cursor-pointer">Color Theme</Label>
              <Select 
                value={formData.color} 
                onValueChange={(value) => setFormData({ ...formData, color: value })}
              >
                <SelectTrigger className="cursor-pointer">
                  <SelectValue placeholder="Choose a color" />
                </SelectTrigger>
                <SelectContent>
                  {DECK_COLORS.map((color) => (
                    <SelectItem 
                      key={color.value} 
                      value={color.value}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <div className={`h-4 w-4 rounded-full bg-gradient-to-r ${color.class}`} />
                        {color.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description" className="cursor-pointer">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter deck description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="cursor-text focus:outline-none focus:ring-2 focus:ring-purple-600 min-h-[100px] resize-y"
                maxLength={500}
              />
              <div className="text-xs text-muted-foreground text-right">
                {formData.description.length}/500
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="submit"
              variant="default"
              disabled={isLoading || isSuccess || !formData.title || !formData.category}
              className={`bg-gradient-to-r ${selectedColor} hover:opacity-90 transition-all cursor-pointer hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSuccess && <Check className="mr-2 h-4 w-4" />}
              {isLoading ? "Creating..." : isSuccess ? "Created!" : "Create Deck"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 