"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, ThumbsUp, Search, BookmarkPlus, Share2 } from "lucide-react"

interface Tip {
  id: number
  content: string
  category: string
  likes: number
  saved: boolean
}

export default function TipsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [tips, setTips] = useState<Tip[]>([
    {
      id: 1,
      content: "Buy textbooks second-hand or rent them to save up to 70% on course materials.",
      category: "Education",
      likes: 124,
      saved: false,
    },
    {
      id: 2,
      content: "Cook meals in bulk on weekends and portion them out for the week to save money on takeout.",
      category: "Food",
      likes: 98,
      saved: true,
    },
    {
      id: 3,
      content: "Use your student ID for discounts on software, entertainment, and transportation.",
      category: "Savings",
      likes: 156,
      saved: false,
    },
    {
      id: 4,
      content:
        "Set up automatic transfers to your savings account on payday to build savings without thinking about it.",
      category: "Savings",
      likes: 87,
      saved: false,
    },
    {
      id: 5,
      content: "Look for student housing with utilities included to make budgeting easier and potentially save money.",
      category: "Housing",
      likes: 65,
      saved: false,
    },
    {
      id: 6,
      content: "Use campus shuttle services instead of rideshare apps to save on transportation costs.",
      category: "Transport",
      likes: 42,
      saved: false,
    },
    {
      id: 7,
      content: "Take advantage of free campus events for entertainment instead of paying for movies or concerts.",
      category: "Entertainment",
      likes: 73,
      saved: false,
    },
    {
      id: 8,
      content: "Buy non-perishable items in bulk when they're on sale to save money over time.",
      category: "Food",
      likes: 91,
      saved: false,
    },
  ])

  const toggleSaved = (id: number) => {
    setTips(tips.map((tip) => (tip.id === id ? { ...tip, saved: !tip.saved } : tip)))
  }

  const likeTip = (id: number) => {
    setTips(tips.map((tip) => (tip.id === id ? { ...tip, likes: tip.likes + 1 } : tip)))
  }

  const filteredTips = tips.filter(
    (tip) =>
      tip.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const categories = ["All", "Food", "Transport", "Education", "Entertainment", "Housing", "Savings"]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Financial Tips</h1>
        <p className="text-muted-foreground">Discover practical advice to improve your financial habits</p>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tips..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Tabs defaultValue="All" className="space-y-4">
        <TabsList className="flex flex-wrap h-auto">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredTips
                .filter((tip) => category === "All" || tip.category === category)
                .map((tip) => (
                  <Card key={tip.id}>
                    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                      <div className="flex items-center space-x-2">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Lightbulb className="h-4 w-4 text-primary" />
                        </div>
                        <Badge variant="outline">{tip.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{tip.content}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center space-x-1"
                          onClick={() => likeTip(tip.id)}
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>{tip.likes}</span>
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleSaved(tip.id)}
                          aria-label={tip.saved ? "Remove from saved tips" : "Save tip"}
                        >
                          <BookmarkPlus className={`h-4 w-4 ${tip.saved ? "fill-primary" : ""}`} />
                        </Button>
                        <Button variant="ghost" size="sm" aria-label="Share tip">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
            </div>
            {filteredTips.filter((tip) => category === "All" || tip.category === category).length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No tips found. Try a different search or category.</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
