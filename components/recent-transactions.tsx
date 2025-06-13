import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Coffee, ShoppingBag, Book, Bus } from "lucide-react"

export function RecentTransactions() {
  const transactions = [
    {
      id: 1,
      description: "Campus Café",
      amount: -45.5,
      date: "Today",
      category: "Food",
      icon: Coffee,
    },
    {
      id: 2,
      description: "Monthly Allowance",
      amount: 1500.0,
      date: "Yesterday",
      category: "Income",
      icon: ArrowUpRight,
    },
    {
      id: 3,
      description: "Campus Bookstore",
      amount: -350.75,
      date: "Jun 10",
      category: "Education",
      icon: Book,
    },
    {
      id: 4,
      description: "Bus Pass",
      amount: -200.0,
      date: "Jun 8",
      category: "Transport",
      icon: Bus,
    },
    {
      id: 5,
      description: "Grocery Shopping",
      amount: -320.25,
      date: "Jun 5",
      category: "Food",
      icon: ShoppingBag,
    },
  ]

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <div
              className={`p-2 rounded-full ${transaction.amount > 0 ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}
            >
              <transaction.icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium leading-none">{transaction.description}</p>
              <p className="text-xs text-muted-foreground">{transaction.date}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">{transaction.category}</Badge>
            <span className={`text-sm font-medium ${transaction.amount > 0 ? "text-emerald-600" : "text-rose-600"}`}>
              {transaction.amount > 0 ? "+" : ""}R{Math.abs(transaction.amount).toFixed(2)}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
