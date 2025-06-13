"use client"

import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"

export function SpendingChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const spendingData = [
    { category: "Food", amount: 850, color: "#10b981" },
    { category: "Transport", amount: 450, color: "#3b82f6" },
    { category: "Entertainment", amount: 350, color: "#8b5cf6" },
    { category: "Education", amount: 650, color: "#f59e0b" },
    { category: "Utilities", amount: 250, color: "#ef4444" },
    { category: "Other", amount: 295.5, color: "#6b7280" },
  ]

  const totalSpending = spendingData.reduce((sum, item) => sum + item.amount, 0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Calculate total for percentages
    const total = spendingData.reduce((sum, item) => sum + item.amount, 0)

    // Draw pie chart
    let startAngle = 0
    spendingData.forEach((item) => {
      const sliceAngle = (2 * Math.PI * item.amount) / total

      ctx.beginPath()
      ctx.moveTo(canvas.width / 2, canvas.height / 2)
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        Math.min(canvas.width, canvas.height) / 2 - 10,
        startAngle,
        startAngle + sliceAngle,
      )
      ctx.closePath()

      ctx.fillStyle = item.color
      ctx.fill()

      startAngle += sliceAngle
    })

    // Draw center circle (donut hole)
    ctx.beginPath()
    ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) / 4, 0, 2 * Math.PI)
    ctx.fillStyle = "#ffffff"
    ctx.fill()

    // Add total in center
    ctx.font = "bold 16px Inter, sans-serif"
    ctx.fillStyle = "#000000"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(`R${total.toFixed(2)}`, canvas.width / 2, canvas.height / 2)
  }, [spendingData])

  return (
    <div className="flex flex-col md:flex-row items-center gap-6">
      <div className="relative w-48 h-48">
        <canvas ref={canvasRef} className="w-full h-full" aria-label="Spending by category pie chart"></canvas>
      </div>
      <div className="flex flex-col gap-2 w-full">
        {spendingData.map((item) => (
          <div
            key={item.category}
            className={`flex items-center justify-between p-2 rounded-md transition-colors ${
              activeCategory === item.category ? "bg-muted" : ""
            }`}
            onMouseEnter={() => setActiveCategory(item.category)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} aria-hidden="true"></div>
              <span>{item.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">R{item.amount.toFixed(2)}</span>
              <Badge variant="outline" className="text-xs">
                {((item.amount / totalSpending) * 100).toFixed(1)}%
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
