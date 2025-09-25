"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Database, Zap, FileText } from "lucide-react"
import type { PerformanceData } from "@/app/page"

interface PerformanceDisplayProps {
  performance: PerformanceData
}

export function PerformanceDisplay({ performance }: PerformanceDisplayProps) {
  const getPerformanceColor = (timeMs: number) => {
    if (timeMs < 500) return "text-green-600"
    if (timeMs < 1000) return "text-yellow-600"
    return "text-red-600"
  }

  const getPerformanceBadgeVariant = (timeMs: number) => {
    if (timeMs < 500) return "default"
    if (timeMs < 1000) return "secondary"
    return "destructive"
  }

  return (
    <Card className="bg-muted/50">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            {/* Article Count */}
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {performance.articleCount} article{performance.articleCount !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Cache Status */}
            <div className="flex items-center gap-2">
              {performance.fromCache ? (
                <>
                  <Database className="h-4 w-4 text-green-600" />
                  <Badge variant="outline" className="text-green-700 border-green-200">
                    From Cache
                  </Badge>
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 text-blue-600" />
                  <Badge variant="outline" className="text-blue-700 border-blue-200">
                    Fresh API Call
                  </Badge>
                </>
              )}
            </div>
          </div>

          {/* Response Time */}
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Response time:</span>
            <Badge
              variant={getPerformanceBadgeVariant(performance.timeMs)}
              className={getPerformanceColor(performance.timeMs)}
            >
              {performance.timeMs}ms
            </Badge>
          </div>
        </div>

        {/* Performance Insight */}
        <div className="mt-3 pt-3 border-t">
          <p className="text-xs text-muted-foreground">
            {performance.fromCache
              ? "Data served from Redis cache for faster response times."
              : "Fresh data fetched from the news API and cached for future requests."}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
