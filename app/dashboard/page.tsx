"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Wallet,
  Target,
  PlusCircle,
  BarChart3,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"
import { RecentTransactions } from "@/components/recent-transactions"
import { SpendingChart } from "@/components/spending-chart"
import { SavingsGoalCard } from "@/components/savings-goal-card"
import { FinancialTip } from "@/components/financial-tip"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, John! Here's an overview of your finances.</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="goals">Savings Goals</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R5,231.89</div>
                <p className="text-xs text-muted-foreground">+R350.65 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R3,500.00</div>
                <p className="text-xs text-muted-foreground">Part-time job + Allowance</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
                <ArrowDownRight className="h-4 w-4 text-rose-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R2,845.50</div>
                <p className="text-xs text-muted-foreground">-R120.30 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18.7%</div>
                <p className="text-xs text-muted-foreground">+2.3% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Spending Overview</CardTitle>
                <CardDescription>Your spending by category for the current month</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <SpendingChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest financial activities</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentTransactions />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <SavingsGoalCard title="Laptop Fund" current={5000} target={10000} dueDate="Dec 1, 2025" progress={50} />
            <SavingsGoalCard
              title="Spring Break Trip"
              current={1200}
              target={3000}
              dueDate="Sep 15, 2025"
              progress={40}
            />
            <Card>
              <CardHeader>
                <CardTitle>Financial Tip</CardTitle>
                <CardDescription>Personalized advice for your situation</CardDescription>
              </CardHeader>
              <CardContent>
                <FinancialTip />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="col-span-2 md:col-span-2 lg:col-span-4">
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks to manage your finances</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4">
                  <Link href="/transactions/add">
                    <Button variant="outline" className="w-full h-24 flex flex-col gap-2 items-center justify-center">
                      <PlusCircle className="h-6 w-6" />
                      <span>Add Transaction</span>
                    </Button>
                  </Link>
                  <Link href="/goals/add">
                    <Button variant="outline" className="w-full h-24 flex flex-col gap-2 items-center justify-center">
                      <Target className="h-6 w-6" />
                      <span>New Savings Goal</span>
                    </Button>
                  </Link>
                  <Link href="/reports">
                    <Button variant="outline" className="w-full h-24 flex flex-col gap-2 items-center justify-center">
                      <BarChart3 className="h-6 w-6" />
                      <span>View Reports</span>
                    </Button>
                  </Link>
                  <Link href="/tips">
                    <Button variant="outline" className="w-full h-24 flex flex-col gap-2 items-center justify-center">
                      <Lightbulb className="h-6 w-6" />
                      <span>Browse Tips</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>A complete history of your financial activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-muted-foreground mb-4">
                  This tab would display a complete transaction history with filtering options.
                </p>
                <Link href="/transactions">
                  <Button>View All Transactions</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Savings Goals</CardTitle>
              <CardDescription>Track progress toward your financial targets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-muted-foreground mb-4">
                  This tab would display all your savings goals with detailed progress tracking.
                </p>
                <Link href="/goals">
                  <Button>Manage Savings Goals</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
