"use client"

import { Button } from "@/components/ui/button"
import { Lightbulb, ThumbsUp, ThumbsDown } from "lucide-react"
import { useState } from "react"

export function FinancialTip() {
  const [rated, setRated] = useState<boolean>(false)
  const [helpful, setHelpful] = useState<boolean | null>(null)

  const tips = [
    {
      id: 1,
      content: "Buy textbooks second-hand or rent them to save up to 70% on course materials.",
      category: "Education",
    },
    {
      id: 2,
      content: "Cook meals in bulk on weekends and portion them out for the week to save money on takeout.",
      category: "Food",
    },
    {
      id: 3,
      content: "Use your student ID for discounts on software, entertainment, and transportation.",
      category: "Savings",
    },
  ]

  // For demo purposes, just show the first tip
  const tip = tips[0]

  const handleRating = (isHelpful: boolean) => {
    setHelpful(isHelpful)
    setRated(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <div className="bg-primary/10 p-2 rounded-full">
          <Lightbulb className="h-4 w-4 text-primary" />
        </div>
        <div>
          <p className="text-sm">{tip.content}</p>
          <span className="text-xs text-muted-foreground mt-1 inline-block">Category: {tip.category}</span>
        </div>
      </div>

      {!rated ? (
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Was this helpful?</span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => handleRating(true)}
              aria-label="Mark tip as helpful"
            >
              <ThumbsUp className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => handleRating(false)}
              aria-label="Mark tip as not helpful"
            >
              <ThumbsDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-xs text-muted-foreground text-center">
          {helpful
            ? "Thanks for your feedback! We'll show more tips like this."
            : "Thanks for your feedback! We'll improve our recommendations."}
        </div>
      )}
    </div>
  )
}
