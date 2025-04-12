"use client"

import { useState } from "react"
import { Calendar, Clock, ExternalLink } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Sample news data
const newsData = [
  {
    id: 1,
    title: "Tesla Recalls 2 Million Vehicles Over Autopilot Safety Concerns",
    source: "Reuters",
    url: "#",
    timestamp: "2025-04-11T09:30:00",
    sentiment: "negative",
    summary:
      "Tesla is recalling nearly 2 million vehicles due to safety concerns with its Autopilot system. The recall affects Model S, Model X, Model 3, and Model Y vehicles from 2016 to 2024.",
    content:
      "Tesla is recalling nearly 2 million vehicles due to safety concerns with its Autopilot system. The recall affects Model S, Model X, Model 3, and Model Y vehicles from 2016 to 2024.\n\nThe National Highway Traffic Safety Administration (NHTSA) said the recall comes after a two-year investigation into crashes that occurred while the Autopilot system was engaged. The agency found that the system's design may allow drivers to misuse the technology, leading to crashes.\n\nTesla will release an over-the-air software update to address the issue, which will include additional controls and alerts to ensure drivers remain attentive while using Autopilot. The company's stock fell 3.2% following the announcement.",
    relevantParagraph:
      "Tesla will release an over-the-air software update to address the issue, which will include additional controls and alerts to ensure drivers remain attentive while using Autopilot. The company's stock fell 3.2% following the announcement.",
  },
  {
    id: 2,
    title: "Tesla Q1 Deliveries Miss Analyst Expectations",
    source: "Bloomberg",
    url: "#",
    timestamp: "2025-04-11T08:15:00",
    sentiment: "negative",
    summary:
      "Tesla reported Q1 vehicle deliveries below analyst expectations, citing production challenges and logistics issues.",
    content:
      "Tesla reported first-quarter vehicle deliveries that fell short of analyst expectations on Tuesday, citing production challenges and logistics issues.\n\nThe electric vehicle maker delivered 422,875 vehicles in the first quarter, below the consensus estimate of 430,000 vehicles. The company produced 440,808 vehicles during the period.\n\nTesla cited ongoing supply chain challenges and brief factory shutdowns for upgrades as reasons for the shortfall. The company remains confident in achieving its annual delivery target of 1.8 million vehicles.\n\nAnalysts have expressed concerns about weakening demand for electric vehicles amid rising interest rates and economic uncertainty.",
    relevantParagraph:
      "Tesla reported first-quarter vehicle deliveries that fell short of analyst expectations on Tuesday, citing production challenges and logistics issues.",
  },
  {
    id: 3,
    title: "Competitor Launches New EV with Longer Range Than Tesla Model 3",
    source: "TechCrunch",
    url: "#",
    timestamp: "2025-04-10T14:45:00",
    sentiment: "negative",
    summary:
      "A major competitor has launched a new electric vehicle with a range exceeding Tesla's Model 3, intensifying competition in the EV market.",
    content:
      "A major competitor has launched a new electric vehicle with a range exceeding Tesla's Model 3, intensifying competition in the EV market.\n\nThe new vehicle boasts a range of 400 miles on a single charge, compared to the Model 3's 358 miles. It is priced competitively at $39,900, undercutting the Model 3's starting price of $42,990.\n\nAnalysts suggest this could put pressure on Tesla's market share in the mid-range EV segment, which has been dominated by the Model 3 since its launch.\n\nThe competitor's stock rose 5% following the announcement, while Tesla's stock declined.",
    relevantParagraph:
      "Analysts suggest this could put pressure on Tesla's market share in the mid-range EV segment, which has been dominated by the Model 3 since its launch.",
  },
]

interface NewsTimelineProps {
  symbol: string
}

export function NewsTimeline({ symbol }: NewsTimelineProps) {
  const [selectedArticle, setSelectedArticle] = useState<(typeof newsData)[0] | null>(null)

  return (
    <div className="space-y-4">
      {newsData.map((article) => (
        <div key={article.id} className="border-l-2 border-muted pl-4 relative">
          <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-primary" />
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <div className="flex items-center">
              <Calendar className="mr-1 h-3 w-3" />
              {new Date(article.timestamp).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-3 w-3" />
              {new Date(article.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
            <Badge variant="outline" className="text-xs">
              {article.source}
            </Badge>
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
          <h3 className="font-medium">{article.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{article.summary}</p>
          <div className="flex gap-2 mt-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-xs" onClick={() => setSelectedArticle(article)}>
                  Read Article
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{selectedArticle?.title}</DialogTitle>
                  <DialogDescription className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs">
                      <Badge variant="outline">{selectedArticle?.source}</Badge>
                      <span>{selectedArticle && new Date(selectedArticle.timestamp).toLocaleString()}</span>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="#" className="flex items-center gap-1 text-xs">
                        <ExternalLink className="h-3 w-3" />
                        View Original
                      </Link>
                    </Button>
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                  <div className="whitespace-pre-line text-sm">{selectedArticle?.content}</div>
                  <div className="rounded-md bg-muted p-4 text-sm">
                    <h4 className="font-medium mb-2">Key Insight:</h4>
                    <p className="italic">{selectedArticle?.relevantParagraph}</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="ghost" size="sm" className="text-xs">
              <ExternalLink className="mr-1 h-3 w-3" />
              Source
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
