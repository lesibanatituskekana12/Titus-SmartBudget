import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Target, Calendar, TrendingUp } from "lucide-react"

interface SavingsGoalCardProps {
  title: string
  current: number
  target: number
  dueDate: string
  progress: number
}

export function SavingsGoalCard({ title, current, target, dueDate, progress }: SavingsGoalCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          <CardDescription>Savings Goal</CardDescription>
        </div>
        <Target className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Progress</span>
          <span className="text-sm font-medium">{progress}%</span>
        </div>
        <Progress value={progress} aria-label={`${progress}% progress towards ${title} goal`} />
        <div className="flex justify-between text-sm">
          <div className="flex flex-col">
            <span className="text-muted-foreground">Current</span>
            <span className="font-medium">R{current.toFixed(2)}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-muted-foreground">Target</span>
            <span className="font-medium">R{target.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          <span>Due: {dueDate}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          <TrendingUp className="mr-2 h-4 w-4" />
          Add Funds
        </Button>
      </CardFooter>
    </Card>
  )
}
