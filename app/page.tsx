"use client"
import Link from "next/link"
import { Search, TrendingUp, TrendingDown, ArrowRight, BarChart3 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingStocks } from "@/components/trending-stocks"

import ChatBox from "@/components/chat-bot";

import { useState } from "react"

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState("");


  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("query", query);

      const response = await fetch("http://127.0.0.1:5000/retreive_data", {
        method: "POST",
        body: formData,
      });

      const data = await response.text();
      setResults(data);
    } catch (error) {
      console.error("❌ Error fetching:", error);
    }
  };
  return (
    <div className="flex w-screen min-h-screen flex-col justify-center items-center">
      <header className="min-w-800 z-10 border-b flex justify-between items-center gap-10
       bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">NewsSense</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-primary">
              Dashboard
            </Link>
            <Link href="/news" className="text-sm font-medium text-muted-foreground hover:text-primary">
              News Explorer
            </Link>
            <Link href="/insights" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Insights
            </Link>
          </nav>
          <Button variant="outline" size="sm" className="hidden md:flex">
            Sign In
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-8 md:py-12">
          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
              Understand <span className="text-primary">why</span> markets move
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
              NewsSense explains the reasons behind stock or fund movements by analyzing financial news in real-time.
            </p>
            <div className="w-full max-w-2xl">
              <ChatBox />
            </div>
          </div>
        </section>

        <section className="container py-8">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">Trending Now</h2>
          <TrendingStocks />
        </section>

        <section className="container py-8">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">Market Insights</h2>
          <Tabs defaultValue="stocks" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="stocks">Stocks</TabsTrigger>
              <TabsTrigger value="etfs">ETFs</TabsTrigger>
              <TabsTrigger value="funds">Mutual Funds</TabsTrigger>
            </TabsList>
            <TabsContent value="stocks" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">AAPL</CardTitle>
                      <div className="flex items-center text-green-500">
                        <TrendingUp className="mr-1 h-4 w-4" />
                        <span className="font-medium">+2.4%</span>
                      </div>
                    </div>
                    <CardDescription>Apple Inc.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                        <span>Positive Sentiment</span>
                      </div>
                      <span className="text-muted-foreground">12 articles</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Link href="/stock/AAPL" className="flex items-center text-sm text-primary">
                      View insights <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">MSFT</CardTitle>
                      <div className="flex items-center text-green-500">
                        <TrendingUp className="mr-1 h-4 w-4" />
                        <span className="font-medium">+1.8%</span>
                      </div>
                    </div>
                    <CardDescription>Microsoft Corporation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                        <span>Positive Sentiment</span>
                      </div>
                      <span className="text-muted-foreground">8 articles</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Link href="/stock/MSFT" className="flex items-center text-sm text-primary">
                      View insights <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">TSLA</CardTitle>
                      <div className="flex items-center text-red-500">
                        <TrendingDown className="mr-1 h-4 w-4" />
                        <span className="font-medium">-3.2%</span>
                      </div>
                    </div>
                    <CardDescription>Tesla, Inc.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <span className="inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                        <span>Negative Sentiment</span>
                      </div>
                      <span className="text-muted-foreground">15 articles</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Link href="/stock/TSLA" className="flex items-center text-sm text-primary">
                      View insights <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardFooter>
                </Card>
              </div>
              <div className="flex justify-center">
                <Button variant="outline">View All Stocks</Button>
              </div>
            </TabsContent>
            <TabsContent value="etfs" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">QQQ</CardTitle>
                      <div className="flex items-center text-green-500">
                        <TrendingUp className="mr-1 h-4 w-4" />
                        <span className="font-medium">+1.5%</span>
                      </div>
                    </div>
                    <CardDescription>Invesco QQQ Trust</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                        <span>Positive Sentiment</span>
                      </div>
                      <span className="text-muted-foreground">7 articles</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Link href="/etf/QQQ" className="flex items-center text-sm text-primary">
                      View insights <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="funds" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">VFIAX</CardTitle>
                      <div className="flex items-center text-green-500">
                        <TrendingUp className="mr-1 h-4 w-4" />
                        <span className="font-medium">+0.8%</span>
                      </div>
                    </div>
                    <CardDescription>Vanguard 500 Index Fund</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                        <span>Positive Sentiment</span>
                      </div>
                      <span className="text-muted-foreground">5 articles</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Link href="/fund/VFIAX" className="flex items-center text-sm text-primary">
                      View insights <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} NewsSense. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:underline">
              Terms
            </Link>
            <Link href="#" className="hover:underline">
              Privacy
            </Link>
            <Link href="#" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
