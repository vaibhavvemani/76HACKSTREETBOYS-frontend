import { BarChart3, LineChart, PieChart } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CauseEffectGraph } from "@/components/cause-effect-graph"

export default function InsightsPage() {
  return (
    <div className="container py-6 ">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Explainability Insights</h1>
        <p className="text-muted-foreground">
          Understand the cause-effect relationships between news and market movements
        </p>
      </div>

      <Tabs defaultValue="stocks" className="space-y-6">
        <TabsList>
          <TabsTrigger value="stocks">Stocks</TabsTrigger>
          <TabsTrigger value="etfs">ETFs</TabsTrigger>
          <TabsTrigger value="funds">Mutual Funds</TabsTrigger>
          <TabsTrigger value="sectors">Sectors</TabsTrigger>
        </TabsList>

        <TabsContent value="stocks" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Top Positive News Impact</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold">AAPL</div>
                      <div className="text-xs text-muted-foreground">Apple Inc.</div>
                    </div>
                    <div className="text-green-500 font-medium">+2.4%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold">MSFT</div>
                      <div className="text-xs text-muted-foreground">Microsoft Corp.</div>
                    </div>
                    <div className="text-green-500 font-medium">+1.8%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold">NVDA</div>
                      <div className="text-xs text-muted-foreground">NVIDIA Corp.</div>
                    </div>
                    <div className="text-green-500 font-medium">+3.5%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Top Negative News Impact</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold">TSLA</div>
                      <div className="text-xs text-muted-foreground">Tesla, Inc.</div>
                    </div>
                    <div className="text-red-500 font-medium">-3.2%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold">GOOGL</div>
                      <div className="text-xs text-muted-foreground">Alphabet Inc.</div>
                    </div>
                    <div className="text-red-500 font-medium">-0.8%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold">XOM</div>
                      <div className="text-xs text-muted-foreground">Exxon Mobil</div>
                    </div>
                    <div className="text-red-500 font-medium">-1.5%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">News Volume by Sentiment</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-4">
                  <div className="flex items-center gap-8">
                    <div className="flex flex-col items-center">
                      <div className="text-2xl font-bold text-green-500">62%</div>
                      <div className="text-xs text-muted-foreground">Positive</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-2xl font-bold text-red-500">38%</div>
                      <div className="text-xs text-muted-foreground">Negative</div>
                    </div>
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-2 rounded-full bg-green-500" style={{ width: "62%" }}></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Cause-Effect Analysis: TSLA</CardTitle>
              <CardDescription>
                Visualizing the relationship between news events and stock price movement
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <CauseEffectGraph />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI-Generated Summary</CardTitle>
              <CardDescription>Comprehensive explanation of market movements based on news analysis</CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <h3>Tesla (TSLA) -3.2%</h3>
              <p>Tesla's stock declined 3.2% today primarily due to three key factors:</p>
              <ol>
                <li>
                  <strong>Vehicle Recall Announcement:</strong> The company announced a recall of 2 million vehicles due
                  to Autopilot safety concerns following an NHTSA investigation. This represents a significant portion
                  of Tesla's fleet and raises questions about the company's autonomous driving technology, which has
                  been a key differentiator and growth driver.
                </li>
                <li>
                  <strong>Q1 Delivery Miss:</strong> Tesla reported Q1 vehicle deliveries of 422,875, below the
                  consensus estimate of 430,000. While the company cited production challenges and logistics issues,
                  this has raised concerns about potential demand softening in the competitive EV market.
                </li>
                <li>
                  <strong>Increased Competition:</strong> A major competitor launched a new EV with longer range (400
                  miles vs. Tesla's 358) and lower price point ($39,900 vs. $42,990), directly challenging Tesla's Model
                  3. Analysts suggest this could pressure Tesla's market share in the mid-range EV segment.
                </li>
              </ol>
              <p>
                These factors combined to create negative sentiment around Tesla, with 15 news articles published in the
                last 24 hours carrying predominantly negative tone. The broader EV sector was also down 1.2%, suggesting
                some industry-wide headwinds, but Tesla's decline was more pronounced due to the company-specific issues
                outlined above.
              </p>
              <p>
                Trading volume was 32% above the 30-day average, indicating significant investor reaction to these
                developments. Options activity showed increased put buying, suggesting some investors are hedging
                against further downside.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="etfs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ETF Insights</CardTitle>
              <CardDescription>Analysis of ETF performance based on news events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Select an ETF to analyze</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Choose an ETF from the list to see detailed cause-effect analysis
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="funds" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mutual Fund Insights</CardTitle>
              <CardDescription>Analysis of mutual fund performance based on news events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Select a mutual fund to analyze</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Choose a mutual fund from the list to see detailed cause-effect analysis
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sectors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sector Insights</CardTitle>
              <CardDescription>Analysis of sector performance based on news events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Select a sector to analyze</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Choose a sector from the list to see detailed cause-effect analysis
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
