"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export default function AddGoalPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [title, setTitle] = useState<string>("")
  const [targetAmount, setTargetAmount] = useState<string>("")
  const [initialAmount, setInitialAmount] = useState<string>("0")
  const [category, setCategory] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const categories = ["Education", "Electronics", "Travel", "Housing", "Savings", "Vehicle", "Other"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate form
      if (!title) {
        throw new Error("Please enter a goal title")
      }

      if (!targetAmount || Number.parseFloat(targetAmount) <= 0) {
        throw new Error("Please enter a valid target amount")
      }

      if (!date) {
        throw new Error("Please select a target date")
      }

      if (!category) {
        throw new Error("Please select a category")
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Savings goal created",
        description: `Your goal "${title}" has been created.`,
      })

      router.push("/goals")
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create goal",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Create Savings Goal</CardTitle>
          <CardDescription>Set a new financial target to work towards</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Goal Title</Label>
              <Input
                id="title"
                placeholder="e.g., New Laptop, Spring Break Trip"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetAmount">Target Amount (R)</Label>
              <Input
                id="targetAmount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="initialAmount">Initial Amount (R)</Label>
              <Input
                id="initialAmount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={initialAmount}
                onChange={(e) => setInitialAmount(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">If you've already saved some money towards this goal</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={setCategory} required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Target Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a target date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Why is this goal important to you?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Goal"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
