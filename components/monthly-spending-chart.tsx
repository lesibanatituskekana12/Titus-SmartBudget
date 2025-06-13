"use client"

import { useEffect, useRef } from "react"

export function MonthlySpendingChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Sample data for the month
    const days = Array.from({ length: 30 }, (_, i) => i + 1)
    const expenses = [
      120, 85, 65, 210, 90, 75, 45, 180, 95, 110, 70, 65, 95, 220, 85, 60, 40, 75, 90, 105, 80, 95, 110, 70, 85, 95, 65,
      75, 90, 100,
    ]

    // Calculate chart dimensions
    const padding = 40
    const chartWidth = canvas.width - padding * 2
    const chartHeight = canvas.height - padding * 2
    const maxExpense = Math.max(...expenses)
    const barWidth = chartWidth / expenses.length - 2

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
      const value = (i / yLabelCount) * maxExpense
      ctx.fillText(`R${value.toFixed(0)}`, padding - 10, y)

      // Draw horizontal grid lines
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(canvas.width - padding, y)
      ctx.strokeStyle = "#e5e7eb" // gray-200
      ctx.stroke()
    }

    // Draw x-axis labels (every 5th day)
    ctx.textAlign = "center"
    ctx.textBaseline = "top"
    days.forEach((day, i) => {
      if (day % 5 === 0 || day === 1 || day === days.length) {
        const x = padding + i * (chartWidth / (expenses.length - 1))
        ctx.fillText(day.toString(), x, canvas.height - padding + 10)
      }
    })

    // Draw bars
    expenses.forEach((expense, i) => {
      const day = days[i] // Declare the day variable here
      const x = padding + i * (chartWidth / (expenses.length - 1)) - barWidth / 2
      const barHeight = (expense / maxExpense) * chartHeight
      const y = canvas.height - padding - barHeight

      // Create gradient for bars
      const gradient = ctx.createLinearGradient(x, y, x, canvas.height - padding)
      gradient.addColorStop(0, "#3b82f6") // blue-500
      gradient.addColorStop(1, "#60a5fa") // blue-400

      ctx.fillStyle = gradient
      ctx.fillRect(x, y, barWidth, barHeight)

      // Add hover effect (simplified version)
      canvas.addEventListener("mousemove", (event) => {
        const rect = canvas.getBoundingClientRect()
        const mouseX = event.clientX - rect.left
        const mouseY = event.clientY - rect.top

        if (mouseX >= x && mouseX <= x + barWidth && mouseY >= y && mouseY <= canvas.height - padding) {
          // Redraw this specific bar with highlight
          ctx.fillStyle = "#2563eb" // blue-600
          ctx.fillRect(x, y, barWidth, barHeight)

          // Show tooltip
          ctx.fillStyle = "#1f2937" // gray-800
          ctx.fillRect(mouseX - 60, mouseY - 40, 120, 30)
          ctx.fillStyle = "#ffffff"
          ctx.textAlign = "center"
          ctx.fillText(`Day ${day}: R${expense.toFixed(2)}`, mouseX, mouseY - 20)
        }
      })
    })

    // Add title
    ctx.font = "16px Inter, sans-serif"
    ctx.fillStyle = "#111827" // gray-900
    ctx.textAlign = "center"
    ctx.fillText("Daily Expenses", canvas.width / 2, 20)
  }, [])

  return (
    <div className="w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        aria-label="Monthly spending bar chart showing daily expenses"
      ></canvas>
    </div>
  )
}
