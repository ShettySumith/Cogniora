'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface Deck {
  id: string
  title: string
  description: string
  category: string
  color: string
  createdAt: Date
  totalCards: number
  cardsToReview: number
}

interface DeckStore {
  decks: Deck[]
  addDeck: (deck: Omit<Deck, 'id' | 'createdAt' | 'totalCards' | 'cardsToReview'>) => void
  removeDeck: (id: string) => void
  updateDeck: (id: string, deck: Partial<Deck>) => void
}

export const useDeckStore = create<DeckStore>()(
  persist(
    (set) => ({
      decks: [],
      addDeck: (newDeck) => 
        set((state) => ({
          decks: [
            ...state.decks,
            {
              ...newDeck,
              id: crypto.randomUUID(),
              createdAt: new Date(),
              totalCards: 0,
              cardsToReview: 0,
            },
          ],
        })),
      removeDeck: (id) =>
        set((state) => ({
          decks: state.decks.filter((deck) => deck.id !== id),
        })),
      updateDeck: (id, updatedDeck) =>
        set((state) => ({
          decks: state.decks.map((deck) =>
            deck.id === id ? { ...deck, ...updatedDeck } : deck
          ),
        })),
    }),
    {
      name: 'deck-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
) 