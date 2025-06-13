"use client"

import { useEffect, useRef } from "react"

export function SavingsProgressChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Sample data - 6 months of savings
    const months = ["January", "February", "March", "April", "May", "June"]
    const savings = [350, 425, 375, 550, 625, 654.5]
    const savingsGoal = 600

    // Calculate chart dimensions
    const padding = 50
    const chartWidth = canvas.width - padding * 2
    const chartHeight = canvas.height - padding * 2
    const maxSavings = Math.max(...savings, savingsGoal) * 1.2 // Add 20% headroom

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, canvas.height - padding)
    ctx.lineTo(canvas.width - padding, canvas.height - padding)
    ctx.strokeStyle = "#d1d5db" // gray-300
    ctx.stroke()

    // Draw y-axis labels
    ctx.font = "12px Inter, sans-serif"
    ctx.fillStyle = "#6b7280" // gray-500
    ctx.textAlign = "right"
    ctx.textBaseline = "middle"

    const yLabelCount = 5
    for (let i = 0; i <= yLabelCount; i++) {
      const y = canvas.height - padding - (i / yLabelCount) * chartHeight
      const value = (i / yLabelCount) * maxSavings
      ctx.fillText(`R${value.toFixed(0)}`, padding - 10, y)

      // Draw horizontal grid lines
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(canvas.width - padding, y)
      ctx.strokeStyle = "#e5e7eb" // gray-200
      ctx.stroke()
    }

    // Draw x-axis labels
    ctx.textAlign = "center"
    ctx.textBaseline = "top"
    months.forEach((month, i) => {
      const x = padding + i * (chartWidth / (months.length - 1))
      ctx.fillText(month.substring(0, 3), x, canvas.height - padding + 10)
    })

    // Draw savings goal line
    const goalY = canvas.height - padding - (savingsGoal / maxSavings) * chartHeight
    ctx.beginPath()
    ctx.moveTo(padding, goalY)
    ctx.lineTo(canvas.width - padding, goalY)
    ctx.strokeStyle = "#f59e0b" // amber-500
    ctx.setLineDash([5, 5])
    ctx.stroke()
    ctx.setLineDash([])

    // Label the goal line
    ctx.font = "12px Inter, sans-serif"
    ctx.fillStyle = "#f59e0b" // amber-500
    ctx.textAlign = "right"
    ctx.textBaseline = "bottom"
    ctx.fillText("Monthly Goal: R" + savingsGoal.toFixed(2), canvas.width - padding, goalY - 5)

    // Draw savings line
    ctx.beginPath()
    savings.forEach((saving, i) => {
      const x = padding + i * (chartWidth / (savings.length - 1))
      const y = canvas.height - padding - (saving / maxSavings) * chartHeight

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.strokeStyle = "#3b82f6" // blue-500
    ctx.lineWidth = 3
    ctx.stroke()

    // Draw data points
    savings.forEach((saving, i) => {
      const x = padding + i * (chartWidth / (savings.length - 1))
      const y = canvas.height - padding - (saving / maxSavings) * chartHeight

      // Draw point
      ctx.beginPath()
      ctx.arc(x, y, 6, 0, 2 * Math.PI)
      ctx.fillStyle = "#ffffff"
      ctx.fill()
      ctx.strokeStyle = "#3b82f6" // blue-500
      ctx.lineWidth = 3
      ctx.stroke()

      // Draw value above point
      ctx.font = "12px Inter, sans-serif"
      ctx.fillStyle = "#111827" // gray-900
      ctx.textAlign = "center"
      ctx.textBaseline = "bottom"
      ctx.fillText(`R${saving.toFixed(0)}`, x, y - 10)
    })

    // Fill area under the line
    ctx.beginPath()
    ctx.moveTo(padding, canvas.height - padding)
    savings.forEach((saving, i) => {
      const x = padding + i * (chartWidth / (savings.length - 1))
      const y = canvas.height - padding - (saving / maxSavings) * chartHeight
      ctx.lineTo(x, y)
    })
    ctx.lineTo(padding + chartWidth, canvas.height - padding)
    ctx.closePath()

    // Create gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, "rgba(59, 130, 246, 0.2)") // blue-500 with opacity
    gradient.addColorStop(1, "rgba(59, 130, 246, 0.05)")
    ctx.fillStyle = gradient
    ctx.fill()
  }, [])

  return (
    <div className="w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        aria-label="Savings progress line chart showing monthly savings compared to goal"
      ></canvas>
    </div>
  )
}
