"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Loader2 } from "lucide-react"
import type { FilterState } from "@/app/page"
import { categories, countries, languages } from "@/lib/utils"

interface FilterPanelProps {
  onFetch: (filters: FilterState) => void
  loading: boolean
}

export function FilterPanel({ onFetch, loading }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>({
    country: "ke",
    language: "en",
    category: "technology",
    cached: true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onFetch(filters)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 justify-between">
        {/* Country Dropdown */}
        <div className="space-y-2 w-auto">
          <Label htmlFor="country">Country</Label>
          <Select
            value={filters.country}
            onValueChange={(value) => setFilters((prev) => ({ ...prev, country: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Language Dropdown */}
        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Select
            value={filters.language}
            onValueChange={(value) => setFilters((prev) => ({ ...prev, language: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language.value} value={language.value}>
                  {language.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category Dropdown */}
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={filters.category}
            onValueChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Cache Toggle */}
      <div className="flex items-center space-x-4">
        <Label htmlFor="cache-mode" className="text-sm font-medium">
          Fetch Mode:
        </Label>
        <div className="flex items-center space-x-2">
          <Label htmlFor="cache-toggle" className="text-sm text-muted-foreground">
            Non-Cached
          </Label>
          <Switch
            id="cache-toggle"
            checked={filters.cached}
            onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, cached: checked }))}
          />
          <Label htmlFor="cache-toggle" className="text-sm text-muted-foreground">
            Cached
          </Label>
        </div>
      </div>

      {/* Fetch Button */}
      <Button type="submit" disabled={loading} className="w-full md:w-auto">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Fetching Articles...
          </>
        ) : (
          "Fetch Articles"
        )}
      </Button>
    </form>
  )
}
