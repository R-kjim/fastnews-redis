"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Calendar, Building } from "lucide-react"
import type { Article } from "@/app/page"

interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  const handleClick = () => {
    window.open(article.link, "_blank", "noopener,noreferrer")
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch {
      return dateString
    }
  }

  return (
    <Card
      className="h-full cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] group"
      onClick={handleClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-3">
            {article.title}
          </h3>
          <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">{article.description}</p>

        {/* Source and Date */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            {article.source_icon ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={article.source_icon || "/placeholder.svg"}
                alt={article.source_name}
                className="h-4 w-4 rounded-sm"
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                }}
              />
            ) : (
              <Building className="h-4 w-4" />
            )}
            <span className="font-medium">{article.source_name}</span>
          </div>

          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(article.pubDate)}</span>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-1">
  {article.category &&
    article.category
      .map((cat, idx) => (
        <Badge key={idx} variant="secondary" className="text-xs">
          {cat.trim()}
        </Badge>
      ))}

  <Badge variant="outline" className="text-xs">
    {article.language}
  </Badge>
</div>

      </CardContent>
    </Card>
  )
}
