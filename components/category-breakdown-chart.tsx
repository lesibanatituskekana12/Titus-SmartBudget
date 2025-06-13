"use client"

import { useEffect, useRef } from "react"

export function CategoryBreakdownChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Sample data
    const categories = [
      { name: "Food", amount: 850, color: "#10b981" }, // emerald-500
      { name: "Transport", amount: 450, color: "#3b82f6" }, // blue-500
      { name: "Entertainment", amount: 350, color: "#8b5cf6" }, // violet-500
      { name: "Education", amount: 650, color: "#f59e0b" }, // amber-500
      { name: "Utilities", amount: 250, color: "#ef4444" }, // red-500
      { name: "Other", amount: 295.5, color: "#6b7280" }, // gray-500
    ]

    // Calculate total
    const total = categories.reduce((sum, category) => sum + category.amount, 0)

    // Draw pie chart
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 40

    let startAngle = 0
    categories.forEach((category) => {
      const sliceAngle = (2 * Math.PI * category.amount) / total

      // Draw slice
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
      ctx.closePath()
      ctx.fillStyle = category.color
      ctx.fill()

      // Draw slice label
      const labelAngle = startAngle + sliceAngle / 2
      const labelRadius = radius * 0.7
      const labelX = centerX + Math.cos(labelAngle) * labelRadius
      const labelY = centerY + Math.sin(labelAngle) * labelRadius

      const percentage = ((category.amount / total) * 100).toFixed(1)

      // Only draw label if slice is large enough
      if (sliceAngle > 0.2) {
        ctx.font = "bold 12px Inter, sans-serif"
        ctx.fillStyle = "#ffffff"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(`${percentage}%`, labelX, labelY)
      }

      startAngle += sliceAngle
    })

    // Draw center circle (donut hole)
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 0.5, 0, 2 * Math.PI)
    ctx.fillStyle = "#ffffff"
    ctx.fill()

    // Draw total in center
    ctx.font = "bold 16px Inter, sans-serif"
    ctx.fillStyle = "#111827" // gray-900
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(`R${total.toFixed(2)}`, centerX, centerY - 10)
    ctx.font = "12px Inter, sans-serif"
    ctx.fillStyle = "#6b7280" // gray-500
    ctx.fillText("Total Expenses", centerX, centerY + 10)

    // Draw legend
    const legendX = 20
    let legendY = canvas.height - 20 - categories.length * 25

    categories.forEach((category) => {
      // Draw color box
      ctx.fillStyle = category.color
      ctx.fillRect(legendX, legendY, 15, 15)

      // Draw category name and amount
      ctx.font = "12px Inter, sans-serif"
      ctx.fillStyle = "#111827" // gray-900
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"
      ctx.fillText(`${category.name}: R${category.amount.toFixed(2)}`, legendX + 25, legendY + 7.5)

      legendY += 25
    })
  }, [])

  return (
    <div className="w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        aria-label="Category breakdown pie chart showing expenses by category"
      ></canvas>
    </div>
  )
}
