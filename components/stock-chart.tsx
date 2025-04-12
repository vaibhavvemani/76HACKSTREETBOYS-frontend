"use client"

import { useEffect, useRef } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Sample data for different timeframes
const generateData = (timeframe: string) => {
  const data = []
  let startPrice = 245
  const date = new Date()

  let points = 0
  switch (timeframe) {
    case "24h":
      points = 24
      break
    case "7d":
      points = 7
      break
    case "30d":
      points = 30
      break
    case "ytd":
      points = 12
      break
  }

  for (let i = points; i >= 0; i--) {
    const change = (Math.random() - 0.5) * 10
    startPrice += change

    let label = ""
    if (timeframe === "24h") {
      label = `${23 - i}:00`
    } else if (timeframe === "7d") {
      const d = new Date(date)
      d.setDate(d.getDate() - i)
      label = d.toLocaleDateString(undefined, { weekday: "short" })
    } else if (timeframe === "30d") {
      const d = new Date(date)
      d.setDate(d.getDate() - i)
      label = `${d.getMonth() + 1}/${d.getDate()}`
    } else if (timeframe === "ytd") {
      const d = new Date(date)
      d.setMonth(d.getMonth() - i)
      label = d.toLocaleDateString(undefined, { month: "short" })
    }

    data.push({
      name: label,
      price: Number.parseFloat(startPrice.toFixed(2)),
    })
  }

  return data
}

interface StockChartProps {
  timeframe: "24h" | "7d" | "30d" | "ytd"
}

export function StockChart({ timeframe }: StockChartProps) {
  const dataRef = useRef(generateData(timeframe))

  useEffect(() => {
    dataRef.current = generateData(timeframe)
  }, [timeframe])

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={dataRef.current}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
          <YAxis domain={["auto", "auto"]} axisLine={false} tickLine={false} tick={{ fontSize: 12 }} width={40} />
          <Tooltip
            formatter={(value) => [`$${value}`, "Price"]}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Line type="monotone" dataKey="price" stroke="#ef4444" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
