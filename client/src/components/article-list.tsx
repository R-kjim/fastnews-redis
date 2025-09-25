"use client"

import { ArticleCard } from "@/components/article-card"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Newspaper } from "lucide-react"
import type { Article } from "@/app/page"

interface ArticleListProps {
  articles: Article[]
  loading: boolean
}

function ArticleSkeleton() {
  return (
    <Card className="h-full">
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-16 w-full" />
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-12" />
        </div>
      </div>
    </Card>
  )
}

export function ArticleList({ articles, loading }: ArticleListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ArticleSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <Card className="p-12">
        <CardContent className="flex flex-col items-center justify-center text-center space-y-4">
          <Newspaper className="h-16 w-16 text-muted-foreground" />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">No articles found</h3>
            <p className="text-muted-foreground">Try adjusting your filters and fetch articles to see results here.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        Found {articles.length} article{articles.length !== 1 ? "s" : ""}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in-50 duration-500">
        {articles.map((article, index) => (
          <div
            key={article.article_id}
            className="animate-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ArticleCard article={article} />
          </div>
        ))}
      </div>
    </div>
  )
}
