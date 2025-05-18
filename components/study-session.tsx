"use client"

import { useState } from "react"
import { Check, ChevronLeft, ChevronRight, Lightbulb, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// In a real app, this would come from an API or database
const flashcards = [
  {
    id: 1,
    front: "What is a closure in JavaScript?",
    back: "A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment). In JavaScript, closures are created every time a function is created, at function creation time.",
  },
  {
    id: 2,
    front: "Explain the difference between `let`, `const`, and `var` in JavaScript.",
    back: "- `var`: Function-scoped, can be redeclared and updated\n- `let`: Block-scoped, can be updated but not redeclared\n- `const`: Block-scoped, cannot be updated or redeclared",
  },
  {
    id: 3,
    front: "What is the event loop in JavaScript?",
    back: "The event loop is a mechanism that allows JavaScript to perform non-blocking operations despite being single-threaded. It monitors the call stack and the callback queue, and when the call stack is empty, it takes the first event from the queue and pushes it to the call stack, which effectively runs it.",
  },
  {
    id: 4,
    front: "What is the difference between `==` and `===` in JavaScript?",
    back: "- `==` (loose equality): Compares values after converting them to a common type\n- `===` (strict equality): Compares both values and types without conversion",
  },
  {
    id: 5,
    front: "What is a Promise in JavaScript?",
    back: "A Promise is an object representing the eventual completion or failure of an asynchronous operation. It allows you to associate handlers with an asynchronous action's eventual success or failure. A Promise is in one of these states: pending, fulfilled, or rejected.",
  },
]

export function StudySession() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [studiedCards, setStudiedCards] = useState<number[]>([])

  const currentCard = flashcards[currentCardIndex]
  const progress = (studiedCards.length / flashcards.length) * 100

  const handleFlip = () => {
    setFlipped(!flipped)
    setShowHint(false)
  }

  const handleNext = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
      setFlipped(false)
      setShowHint(false)
    }
  }

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1)
      setFlipped(false)
      setShowHint(false)
    }
  }

  const handleResponse = (remembered: boolean) => {
    // In a real app, this would update the spaced repetition algorithm
    if (!studiedCards.includes(currentCard.id)) {
      setStudiedCards([...studiedCards, currentCard.id])
    }

    handleNext()
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Card {currentCardIndex + 1} of {flashcards.length}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowHint(!showHint)} className="h-8 gap-1">
            <Lightbulb className="h-3.5 w-3.5" />
            <span>Hint</span>
          </Button>
        </div>
      </div>

      <Progress value={progress} className="h-1" />

      <div className={`flip-card ${flipped ? "flipped" : ""} h-[400px] cursor-pointer`} onClick={handleFlip}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <Card className="flex h-full flex-col items-center justify-center p-6">
              <div className="max-w-lg text-center">
                <h3 className="mb-4 text-xl font-medium">Question</h3>
                <p className="text-lg">{currentCard.front}</p>

                {showHint && (
                  <div className="mt-8 rounded-md bg-muted/50 p-4 text-sm">
                    <p className="text-muted-foreground">Hint: Think about function scope and variable access...</p>
                  </div>
                )}

                <div className="mt-8 text-sm text-muted-foreground">Click to reveal answer</div>
              </div>
            </Card>
          </div>
          <div className="flip-card-back">
            <Card className="flex h-full flex-col items-center justify-center p-6">
              <div className="max-w-lg text-center">
                <h3 className="mb-4 text-xl font-medium">Answer</h3>
                <p className="whitespace-pre-line text-lg">{currentCard.back}</p>

                <div className="mt-8 text-sm text-muted-foreground">Click to see question</div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={currentCardIndex === 0}
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleResponse(false)}
            className="gap-1 border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-600"
          >
            <X className="h-4 w-4" />
            <span>Forgot</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleResponse(true)}
            className="gap-1 border-green-500/20 bg-green-500/10 text-green-500 hover:bg-green-500/20 hover:text-green-600"
          >
            <Check className="h-4 w-4" />
            <span>Remembered</span>
          </Button>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={currentCardIndex === flashcards.length - 1}
          className="gap-1"
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
