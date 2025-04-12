"use client"

import { BarChart3, TrendingDown } from "lucide-react"

interface ExplanationPanelProps {
  symbol: string
}

export function ExplanationPanel({ symbol }: ExplanationPanelProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-lg bg-red-50 p-4 text-red-800">
        <div className="flex items-center gap-2 font-medium mb-2">
          <TrendingDown className="h-5 w-5" />
          <span>Negative Sentiment Detected</span>
        </div>
        <p className="text-sm">
          Based on 15 news articles from the past 24 hours, the overall sentiment for {symbol} is negative.
        </p>
      </div>

      <div>
        <h3 className="font-medium mb-2">Top 3 Reasons {symbol} Fell Today:</h3>
        <ol className="space-y-3 text-sm">
          <li className="flex gap-2">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
              1
            </div>
            <div>
              <strong>Vehicle Recall Announcement:</strong> Tesla announced a recall of 2 million vehicles due to
              Autopilot safety concerns, affecting investor confidence.
            </div>
          </li>
          <li className="flex gap-2">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
              2
            </div>
            <div>
              <strong>Q1 Delivery Miss:</strong> Tesla reported Q1 vehicle deliveries below analyst expectations,
              raising concerns about demand.
            </div>
          </li>
          <li className="flex gap-2">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
              3
            </div>
            <div>
              <strong>Increased Competition:</strong> A major competitor launched a new EV with longer range and lower
              price than Tesla's Model 3.
            </div>
          </li>
        </ol>
      </div>

      <div>
        <h3 className="font-medium mb-2">Impact Analysis:</h3>
        <div className="space-y-2">
          <div>
            <div className="flex items-center justify-between text-sm">
              <span>Recall Impact</span>
              <span>High</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div className="h-2 rounded-full bg-red-500" style={{ width: "80%" }}></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-sm">
              <span>Delivery Miss Impact</span>
              <span>Medium</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div className="h-2 rounded-full bg-red-500" style={{ width: "50%" }}></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-sm">
              <span>Competition Impact</span>
              <span>Low</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div className="h-2 rounded-full bg-red-500" style={{ width: "30%" }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-muted p-4">
        <div className="flex items-center gap-2 font-medium mb-2">
          <BarChart3 className="h-5 w-5" />
          <span>Market Context</span>
        </div>
        <p className="text-sm">
          The broader EV sector is down 1.2% today, with most competitors also showing negative performance. This
          suggests some industry-wide factors are also at play.
        </p>
      </div>
    </div>
  )
}
