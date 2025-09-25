"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { FilterPanel } from "@/components/filter-panel"
import { PerformanceDisplay } from "@/components/perfomance-display"
import { ArticleList } from "@/components/article-list"


export interface Article {
  article_id: string
  title: string
  description: string
  pubDate: string
  source_name: string
  source_icon?: string
  link: string
  country: string
  language: string
  category: string []
}

export interface FilterState {
  country: string
  language: string
  category: string
  cached: boolean
}

export interface PerformanceData {
  articleCount: number
  fromCache: boolean
  timeMs: number
}

export default function NewsExplorer() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [performance, setPerformance] = useState<PerformanceData | null>(null)

  const handleFetchArticles = async (filters: FilterState) => {
    setLoading(true)
    setError(null)

    const startTime = Date.now()

    try {
      const params = new URLSearchParams({
        country: filters.country,
        language: filters.language,
        category: filters.category,
        cached: filters.cached.toString(),
      })

      const response = await fetch(`http://localhost:8000/latest-news?${params}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const endTime = Date.now()

      setArticles(data.articles || data || [])
      setPerformance({
        articleCount: (data.articles || data || []).length,
        fromCache: filters.cached,
        timeMs: endTime - startTime,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch articles")
      setArticles([])
      setPerformance(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground text-center">FastNews Explorer (Next.js + FastAPI + Redis)</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Filter Panel */}
          <Card className="p-6">
            <FilterPanel onFetch={handleFetchArticles} loading={loading} />
          </Card>

          {/* Performance Display */}
          {performance && <PerformanceDisplay performance={performance} />}

          {/* Error Display */}
          {error && (
            <Card className="p-6 border-destructive">
              <p className="text-destructive font-medium">Error: {error}</p>
            </Card>
          )}

          {/* Articles */}
          <ArticleList articles={articles} loading={loading} />
        </div>
      </main>
    </div>
  )
}
