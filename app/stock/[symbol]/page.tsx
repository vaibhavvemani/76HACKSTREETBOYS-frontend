import Link from "next/link"
import { ArrowLeft, TrendingDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { StockChart } from "@/components/stock-chart"
import { NewsTimeline } from "@/components/news-timeline"
import { ExplanationPanel } from "@/components/explanation-panel"

export default function StockPage({ params }: { params: { symbol: string } }) {
  const { symbol } = params

  return (
    <div className="container py-6">
      <div className="mb-6">
        <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">{symbol}</h1>
                <p className="text-muted-foreground">Tesla, Inc.</p>
              </div>
              <div className="flex items-center text-red-500">
                <TrendingDown className="mr-1 h-5 w-5" />
                <span className="text-xl font-bold">-3.2%</span>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="outline">Automotive</Badge>
              <Badge variant="outline">Technology</Badge>
              <Badge variant="outline">S&P 500</Badge>
            </div>
          </div>

          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle>Price Movement</CardTitle>
              <CardDescription>
                Last updated: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="24h">
                <TabsList className="mb-4">
                  <TabsTrigger value="24h">24h</TabsTrigger>
                  <TabsTrigger value="7d">7d</TabsTrigger>
                  <TabsTrigger value="30d">30d</TabsTrigger>
                  <TabsTrigger value="ytd">YTD</TabsTrigger>
                </TabsList>
                <TabsContent value="24h">
                  <StockChart timeframe="24h" />
                </TabsContent>
                <TabsContent value="7d">
                  <StockChart timeframe="7d" />
                </TabsContent>
                <TabsContent value="30d">
                  <StockChart timeframe="30d" />
                </TabsContent>
                <TabsContent value="ytd">
                  <StockChart timeframe="ytd" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>News Timeline</CardTitle>
              <CardDescription>Recent news articles affecting {symbol}</CardDescription>
            </CardHeader>
            <CardContent>
              <NewsTimeline symbol={symbol} />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Why {symbol} Fell Today</CardTitle>
              <CardDescription>AI-generated explanation based on news analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ExplanationPanel symbol={symbol} />
              <div className="mt-6">
                <Button className="w-full">View Detailed Analysis</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
