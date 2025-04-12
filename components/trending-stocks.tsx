"use client"

import { useRef } from "react"
import { ArrowLeft, ArrowRight, TrendingDown, TrendingUp } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Sample trending stocks data
const trendingStocks = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    change: 2.4,
    price: 187.68,
    positive: true,
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    change: 1.8,
    price: 378.92,
    positive: true,
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    change: -3.2,
    price: 245.12,
    positive: false,
  },
  {
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
    change: 1.2,
    price: 142.56,
    positive: true,
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    change: -0.8,
    price: 142.14,
    positive: false,
  },
  {
    symbol: "META",
    name: "Meta Platforms, Inc.",
    change: 2.1,
    price: 472.22,
    positive: true,
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    change: 3.5,
    price: 824.18,
    positive: true,
  },
]

export function TrendingStocks() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = direction === "left" ? -300 : 300
      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <div className="relative">
      <div className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 md:left-0">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-background shadow-md"
          onClick={() => scroll("left")}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Scroll left</span>
        </Button>
      </div>
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto pb-4 pt-2 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {trendingStocks.map((stock) => (
          <Link href={`/stock/${stock.symbol}`} key={stock.symbol} className="shrink-0">
            <Card className="w-[220px] hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold">{stock.symbol}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[140px]">{stock.name}</div>
                    </div>
                    <div className={`flex items-center ${stock.positive ? "text-green-500" : "text-red-500"}`}>
                      {stock.positive ? (
                        <TrendingUp className="mr-1 h-4 w-4" />
                      ) : (
                        <TrendingDown className="mr-1 h-4 w-4" />
                      )}
                      <span className="font-medium">
                        {stock.positive ? "+" : ""}
                        {stock.change}%
                      </span>
                    </div>
                  </div>
                  <div className="text-lg font-bold">${stock.price.toFixed(2)}</div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <div className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 md:right-0">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-background shadow-md"
          onClick={() => scroll("right")}
        >
          <ArrowRight className="h-4 w-4" />
          <span className="sr-only">Scroll right</span>
        </Button>
      </div>
    </div>
  )
}
