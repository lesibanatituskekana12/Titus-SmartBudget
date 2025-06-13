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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export default function AddTransactionPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [date, setDate] = useState<Date>(new Date())
  const [type, setType] = useState<"expense" | "income">("expense")
  const [amount, setAmount] = useState<string>("")
  const [category, setCategory] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const expenseCategories = [
    "Food",
    "Transport",
    "Education",
    "Entertainment",
    "Housing",
    "Utilities",
    "Clothing",
    "Health",
    "Other",
  ]

  const incomeCategories = ["Salary", "Allowance", "Gift", "Scholarship", "Bursary", "Freelance", "Other"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate form
      if (!amount || Number.parseFloat(amount) <= 0) {
        throw new Error("Please enter a valid amount")
      }

      if (!category) {
        throw new Error("Please select a category")
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Transaction added",
        description: `Your ${type} of R${amount} has been recorded.`,
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add transaction",
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
          <CardTitle>Add Transaction</CardTitle>
          <CardDescription>Record a new expense or income in your budget</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Transaction Type</Label>
              <RadioGroup
                defaultValue="expense"
                className="grid grid-cols-2 gap-4"
                onValueChange={(value) => setType(value as "expense" | "income")}
              >
                <div>
                  <RadioGroupItem value="expense" id="expense" className="peer sr-only" />
                  <Label
                    htmlFor="expense"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <span>Expense</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="income" id="income" className="peer sr-only" />
                  <Label
                    htmlFor="income"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <span>Income</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount (R)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={setCategory} required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {(type === "expense" ? expenseCategories : incomeCategories).map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter details about this transaction"
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
              {isSubmitting ? "Adding..." : "Add Transaction"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
