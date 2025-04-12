"use client"

import { useState } from "react"
import { Calendar, Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { DatePickerWithRange } from "@/components/date-range-picker"

// Sample news data
const newsArticles = [
  {
    id: 1,
    title: "Tesla Recalls 2 Million Vehicles Over Autopilot Safety Concerns",
    source: "Reuters",
    url: "#",
    date: "2025-04-11",
    sentiment: "negative",
    summary: "Tesla is recalling nearly 2 million vehicles due to safety concerns with its Autopilot system.",
    content:
      "Tesla is recalling nearly 2 million vehicles due to safety concerns with its Autopilot system. The recall affects Model S, Model X, Model 3, and Model Y vehicles from 2016 to 2024.",
    stocks: ["TSLA"],
    categories: ["Automotive", "Technology", "Recalls"],
  },
  {
    id: 2,
    title: "Apple Announces New AI Features for iPhone",
    source: "TechCrunch",
    url: "#",
    date: "2025-04-11",
    sentiment: "positive",
    summary: "Apple unveiled new AI features coming to iPhone in the next iOS update.",
    content:
      "Apple unveiled new AI features coming to iPhone in the next iOS update. The features include enhanced Siri capabilities, real-time translation, and advanced photo editing tools powered by on-device machine learning.",
    stocks: ["AAPL"],
    categories: ["Technology", "AI", "Mobile"],
  },
  {
    id: 3,
    title: "Microsoft Cloud Revenue Exceeds Expectations",
    source: "Bloomberg",
    url: "#",
    date: "2025-04-10",
    sentiment: "positive",
    summary: "Microsoft reported cloud revenue that exceeded analyst expectations for Q1 2025.",
    content:
      "Microsoft reported cloud revenue that exceeded analyst expectations for Q1 2025. Azure revenue grew 29% year-over-year, driven by increased adoption of AI services and enterprise cloud solutions.",
    stocks: ["MSFT"],
    categories: ["Technology", "Cloud", "Earnings"],
  },
  {
    id: 4,
    title: "Amazon Expands Same-Day Delivery to More Cities",
    source: "CNBC",
    url: "#",
    date: "2025-04-10",
    sentiment: "positive",
    summary: "Amazon announced the expansion of its same-day delivery service to 15 additional U.S. cities.",
    content:
      "Amazon announced the expansion of its same-day delivery service to 15 additional U.S. cities. The e-commerce giant is investing in local fulfillment centers to enable faster delivery times for Prime members.",
    stocks: ["AMZN"],
    categories: ["Retail", "E-commerce", "Logistics"],
  },
  {
    id: 5,
    title: "Fed Signals Potential Rate Cut in June",
    source: "Wall Street Journal",
    url: "#",
    date: "2025-04-09",
    sentiment: "positive",
    summary: "Federal Reserve minutes indicate a potential interest rate cut in June as inflation eases.",
    content:
      "Federal Reserve minutes indicate a potential interest rate cut in June as inflation eases. The central bank's officials expressed growing confidence that inflation is moving sustainably toward their 2% target.",
    stocks: ["SPY", "QQQ", "DIA"],
    categories: ["Economy", "Federal Reserve", "Interest Rates"],
  },
  {
    id: 6,
    title: "Oil Prices Rise Amid Middle East Tensions",
    source: "Financial Times",
    url: "#",
    date: "2025-04-09",
    sentiment: "negative",
    summary: "Oil prices rose 3% following escalating tensions in the Middle East.",
    content:
      "Oil prices rose 3% following escalating tensions in the Middle East. Brent crude futures climbed to $82 per barrel, raising concerns about potential supply disruptions.",
    stocks: ["XOM", "CVX", "USO"],
    categories: ["Energy", "Commodities", "Geopolitics"],
  },
]

export default function NewsExplorer() {
  const [selectedArticle, setSelectedArticle] = useState<(typeof newsArticles)[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sentimentFilter, setSentimentFilter] = useState<string | null>(null)
  const [sourceFilter, setSourceFilter] = useState<string[]>([])
  const [categoryFilter, setCategoryFilter] = useState<string[]>([])

  // Get unique sources and categories for filters
  const sources = Array.from(new Set(newsArticles.map((article) => article.source)))
  const categories = Array.from(new Set(newsArticles.flatMap((article) => article.categories)))

  // Filter articles based on search query and filters
  const filteredArticles = newsArticles.filter((article) => {
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.stocks.some((stock) => stock.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesSentiment = sentimentFilter === null || article.sentiment === sentimentFilter

    const matchesSource = sourceFilter.length === 0 || sourceFilter.includes(article.source)

    const matchesCategory =
      categoryFilter.length === 0 || article.categories.some((category) => categoryFilter.includes(category))

    return matchesSearch && matchesSentiment && matchesSource && matchesCategory
  })

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">News Explorer</h1>
        <p className="text-muted-foreground">Browse and analyze financial news affecting the markets</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by keyword, ticker, or company name..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Tabs
            defaultValue="all"
            className="w-[200px]"
            onValueChange={(value) => setSentimentFilter(value === "all" ? null : value)}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="positive">
                <span className="flex h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                Pos
              </TabsTrigger>
              <TabsTrigger value="negative">
                <span className="flex h-2 w-2 rounded-full bg-red-500 mr-1"></span>
                Neg
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Sources</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {sources.map((source) => (
                      <div key={source} className="flex items-center space-x-2">
                        <Checkbox
                          id={`source-${source}`}
                          checked={sourceFilter.includes(source)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSourceFilter([...sourceFilter, source])
                            } else {
                              setSourceFilter(sourceFilter.filter((s) => s !== source))
                            }
                          }}
                        />
                        <Label htmlFor={`source-${source}`} className="text-sm">
                          {source}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Categories</h4>
                  <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={categoryFilter.includes(category)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setCategoryFilter([...categoryFilter, category])
                            } else {
                              setCategoryFilter(categoryFilter.filter((c) => c !== category))
                            }
                          }}
                        />
                        <Label htmlFor={`category-${category}`} className="text-sm">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Date Range</h4>
                  <DatePickerWithRange />
                </div>
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSourceFilter([])
                      setCategoryFilter([])
                    }}
                  >
                    Reset Filters
                  </Button>
                  <Button size="sm">Apply Filters</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Select defaultValue="newest">
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="relevance">Relevance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article) => (
          <Card key={article.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between mb-1">
                <Badge variant="outline">{article.source}</Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {new Date(article.date).toLocaleDateString()}
                </div>
              </div>
              <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1 mb-2">
                {article.stocks.map((stock) => (
                  <Badge key={stock} variant="secondary" className="text-xs">
                    ${stock}
                  </Badge>
                ))}
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    article.sentiment === "positive"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-red-50 text-red-700 border-red-200"
                  }`}
                >
                  {article.sentiment === "positive" ? "Positive" : "Negative"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3">{article.summary}</p>
            </CardContent>
            <CardFooter className="pt-0">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full" onClick={() => setSelectedArticle(article)}>
                    Read Article
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{selectedArticle?.title}</DialogTitle>
                    <DialogDescription className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs">
                        <Badge variant="outline">{selectedArticle?.source}</Badge>
                        <span>{selectedArticle && new Date(selectedArticle.date).toLocaleDateString()}</span>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4 space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {selectedArticle?.stocks.map((stock) => (
                        <Badge key={stock} variant="secondary" className="text-xs">
                          ${stock}
                        </Badge>
                      ))}
                      {selectedArticle?.categories.map((category) => (
                        <Badge key={category} variant="outline" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-sm">{selectedArticle?.content}</div>
                    <div className="rounded-md bg-muted p-4">
                      <h4 className="font-medium mb-2">AI Analysis:</h4>
                      <p className="text-sm">
                        This article has a{" "}
                        <span
                          className={
                            selectedArticle?.sentiment === "positive"
                              ? "text-green-600 font-medium"
                              : "text-red-600 font-medium"
                          }
                        >
                          {selectedArticle?.sentiment}
                        </span>{" "}
                        sentiment and is likely to have a{" "}
                        {selectedArticle?.sentiment === "positive" ? "positive" : "negative"} impact on{" "}
                        {selectedArticle?.stocks.join(", ")}.
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-3">
            <Search className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-medium">No articles found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchQuery("")
              setSentimentFilter(null)
              setSourceFilter([])
              setCategoryFilter([])
            }}
          >
            Reset All Filters
          </Button>
        </div>
      )}
    </div>
  )
}
