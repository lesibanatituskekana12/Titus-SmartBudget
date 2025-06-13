"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Target, Calendar, TrendingUp, Plus, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"

interface SavingsGoal {
  id: number
  title: string
  current: number
  target: number
  dueDate: string
  progress: number
  category: string
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<SavingsGoal[]>([
    {
      id: 1,
      title: "Laptop Fund",
      current: 5000,
      target: 10000,
      dueDate: "Dec 1, 2025",
      progress: 50,
      category: "Electronics",
    },
    {
      id: 2,
      title: "Spring Break Trip",
      current: 1200,
      target: 3000,
      dueDate: "Sep 15, 2025",
      progress: 40,
      category: "Travel",
    },
    {
      id: 3,
      title: "Emergency Fund",
      current: 2500,
      target: 5000,
      dueDate: "Mar 30, 2026",
      progress: 50,
      category: "Savings",
    },
    {
      id: 4,
      title: "New Phone",
      current: 800,
      target: 4000,
      dueDate: "Jul 10, 2025",
      progress: 20,
      category: "Electronics",
    },
  ])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Savings Goals</h1>
          <p className="text-muted-foreground">Track and manage your financial targets</p>
        </div>
        <Link href="/goals/add">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Goal
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Goals</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal) => (
              <Card key={goal.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-base font-medium">{goal.title}</CardTitle>
                    <CardDescription>{goal.category}</CardDescription>
                  </div>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-medium">{goal.progress}%</span>
                  </div>
                  <Progress
                    value={goal.progress}
                    aria-label={`${goal.progress}% progress towards ${goal.title} goal`}
                  />
                  <div className="flex justify-between text-sm">
                    <div className="flex flex-col">
                      <span className="text-muted-foreground">Current</span>
                      <span className="font-medium">R{goal.current.toFixed(2)}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-muted-foreground">Target</span>
                      <span className="font-medium">R{goal.target.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Due: {goal.dueDate}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Add Funds
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="active">
          <div className="text-center py-10">
            <p className="text-muted-foreground mb-4">
              This tab would display only active goals that haven't been completed yet.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="completed">
          <div className="text-center py-10">
            <p className="text-muted-foreground mb-4">This tab would display goals you've successfully completed.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
