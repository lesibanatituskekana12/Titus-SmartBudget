"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Download, PieChart, LineChart, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { MonthlySpendingChart } from "@/components/monthly-spending-chart"
import { CategoryBreakdownChart } from "@/components/category-breakdown-chart"
import { SavingsProgressChart } from "@/components/savings-progress-chart"

export default function ReportsPage() {
  const [month, setMonth] = useState<Date>(new Date())
  const [reportType, setReportType] = useState<string>("monthly")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Financial Reports</h1>
        <p className="text-muted-foreground">Analyze your spending patterns and track your financial progress</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-col sm:flex-row gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("justify-start text-left font-normal w-[240px]", !month && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(month, "MMMM yyyy")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={month}
                onSelect={(date) => date && setMonth(date)}
                initialFocus
                captionLayout="dropdown-buttons"
                fromYear={2020}
                toYear={2030}
              />
            </PopoverContent>
          </Popover>

          <Select defaultValue={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Report Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly Overview</SelectItem>
              <SelectItem value="category">Category Breakdown</SelectItem>
              <SelectItem value="savings">Savings Progress</SelectItem>
              <SelectItem value="comparison">Month Comparison</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" size="icon">
          <Download className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="charts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="tables">Tables</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>
        <TabsContent value="charts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Monthly Spending Overview</CardTitle>
                <CardDescription>Your daily expenses for {format(month, "MMMM yyyy")}</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <MonthlySpendingChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Income vs. Expenses</CardTitle>
                <CardDescription>Summary for {format(month, "MMMM yyyy")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <ArrowUpRight className="mr-2 h-4 w-4 text-emerald-500" />
                      <span className="text-sm font-medium">Total Income</span>
                    </div>
                    <span className="font-bold">R3,500.00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <ArrowDownRight className="mr-2 h-4 w-4 text-rose-500" />
                      <span className="text-sm font-medium">Total Expenses</span>
                    </div>
                    <span className="font-bold">R2,845.50</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-px bg-border" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Net Savings</span>
                    <span className="font-bold text-emerald-600">R654.50</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Savings Rate</span>
                    <span className="font-bold">18.7%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Category Breakdown</CardTitle>
                  <CardDescription>Spending by category for {format(month, "MMMM yyyy")}</CardDescription>
                </div>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="h-80">
                <CategoryBreakdownChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Savings Progress</CardTitle>
                  <CardDescription>Your savings trend over time</CardDescription>
                </div>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="h-80">
                <SavingsProgressChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="tables">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Transaction Data</CardTitle>
              <CardDescription>View your financial data in tabular format</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-muted-foreground mb-4">
                  This tab would display detailed transaction tables with sorting and filtering options.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle>Financial Insights</CardTitle>
              <CardDescription>Smart analysis of your spending patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-muted-foreground mb-4">
                  This tab would display AI-generated insights about your spending habits and recommendations.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
