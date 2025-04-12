"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

export function CauseEffectGraph() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove()

    // Set up dimensions
    const width = svgRef.current.clientWidth
    const height = 400
    const margin = { top: 20, right: 30, bottom: 30, left: 40 }

    // Create SVG
    const svg = d3.select(svgRef.current).attr("width", width).attr("height", height)

    // Sample data for Tesla stock price
    const stockData = [
      { date: "2025-04-04", price: 253.5 },
      { date: "2025-04-05", price: 255.2 },
      { date: "2025-04-06", price: 256.8 },
      { date: "2025-04-07", price: 258.3 },
      { date: "2025-04-08", price: 257.1 },
      { date: "2025-04-09", price: 253.4 },
      { date: "2025-04-10", price: 248.6 },
      { date: "2025-04-11", price: 245.1 },
    ]

    // News events
    const newsEvents = [
      { date: "2025-04-06", title: "Tesla Expands Factory", impact: 1.2, sentiment: "positive" },
      { date: "2025-04-09", title: "Competitor Launches New EV", impact: -2.5, sentiment: "negative" },
      { date: "2025-04-10", title: "Tesla Q1 Delivery Miss", impact: -3.1, sentiment: "negative" },
      { date: "2025-04-11", title: "Tesla Recalls 2M Vehicles", impact: -4.2, sentiment: "negative" },
    ]

    // Parse dates
    const parseDate = d3.timeParse("%Y-%m-%d")
    const stockDataParsed = stockData.map((d) => ({
      date: parseDate(d.date) as Date,
      price: d.price,
    }))

    const newsEventsParsed = newsEvents.map((d) => ({
      date: parseDate(d.date) as Date,
      title: d.title,
      impact: d.impact,
      sentiment: d.sentiment,
    }))

    // Set up scales
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(stockDataParsed, (d) => d.date) as [Date, Date])
      .range([margin.left, width - margin.right])

    const yScale = d3
      .scaleLinear()
      .domain([
        (d3.min(stockDataParsed, (d) => d.price) as number) - 5,
        (d3.max(stockDataParsed, (d) => d.price) as number) + 5,
      ])
      .range([height - margin.bottom, margin.top])

    // Create line generator
    const line = d3
      .line<{ date: Date; price: number }>()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.price))

    // Draw line
    svg
      .append("path")
      .datum(stockDataParsed)
      .attr("fill", "none")
      .attr("stroke", "hsl(var(--primary))")
      .attr("stroke-width", 2)
      .attr("d", line)

    // Add news event markers
    const eventGroups = svg
      .selectAll(".event")
      .data(newsEventsParsed)
      .enter()
      .append("g")
      .attr("class", "event")
      .attr(
        "transform",
        (d) =>
          `translate(${xScale(d.date)}, ${yScale(stockDataParsed.find((sd) => sd.date.getTime() === d.date.getTime())?.price || 0)})`,
      )

    // Add circles for events
    eventGroups
      .append("circle")
      .attr("r", 6)
      .attr("fill", (d) => (d.sentiment === "positive" ? "hsl(var(--success))" : "hsl(var(--destructive))"))
      .attr("stroke", "white")
      .attr("stroke-width", 2)

    // Add connecting lines for impact
    eventGroups
      .append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", (d) => -d.impact * 10)
      .attr("stroke", (d) => (d.sentiment === "positive" ? "hsl(var(--success))" : "hsl(var(--destructive))"))
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "4,4")

    // Add impact labels
    eventGroups
      .append("text")
      .attr("x", 0)
      .attr("y", (d) => -d.impact * 10 - 10)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", "currentColor")
      .text((d) => `${d.impact > 0 ? "+" : ""}${d.impact}%`)

    // Add event titles
    eventGroups
      .append("text")
      .attr("x", 0)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .attr("fill", "currentColor")
      .text((d) => (d.title.length > 15 ? d.title.substring(0, 15) + "..." : d.title))

    // Add axes
    const xAxis = d3.axisBottom(xScale)
    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(xAxis)

    const yAxis = d3.axisLeft(yScale)
    svg.append("g").attr("transform", `translate(${margin.left}, 0)`).call(yAxis)

    // Add grid lines
    svg
      .append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickSize(-(height - margin.top - margin.bottom))
          .tickFormat(() => ""),
      )
      .attr("stroke-opacity", 0.1)

    svg
      .append("g")
      .attr("class", "grid")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(-(width - margin.left - margin.right))
          .tickFormat(() => ""),
      )
      .attr("stroke-opacity", 0.1)
  }, [])

  return (
    <div className="w-full overflow-x-auto">
      <svg ref={svgRef} className="w-full" />
    </div>
  )
}
