"use client"

import { useState, useMemo } from "react"
import { ProblemCard } from "@/components/problems/problem-card"
import { ProblemFilters } from "@/components/problems/problem-filters"
import { problems } from "@/lib/problems"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Grid, List } from "lucide-react"

export default function ProblemsPage() {
  // Add error boundary
  if (typeof window !== 'undefined') {
    window.addEventListener('error', (e) => {
      console.error('Problems page error:', e.error)
    })
  }
  const [filters, setFilters] = useState({
    search: "",
    difficulty: "",
    category: "",
    company: ""
  })
  const [sortBy, setSortBy] = useState("title")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredProblems = useMemo(() => {
    try {
      return problems.filter(problem => {
        const matchesSearch = problem.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                             problem.description.toLowerCase().includes(filters.search.toLowerCase())
        const matchesDifficulty = !filters.difficulty || problem.difficulty === filters.difficulty
        const matchesCategory = !filters.category || problem.category === filters.category
        const matchesCompany = !filters.company || problem.companies.includes(filters.company)

        return matchesSearch && matchesDifficulty && matchesCategory && matchesCompany
      })
    } catch (error) {
      console.error("Error filtering problems:", error)
      return []
    }
  }, [filters])

  const sortedProblems = useMemo(() => {
    try {
      return [...filteredProblems].sort((a, b) => {
        let comparison = 0
        
        switch (sortBy) {
          case "title":
            comparison = a.title.localeCompare(b.title)
            break
          case "difficulty":
            const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 }
            comparison = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
            break
          case "acceptanceRate":
            comparison = a.acceptanceRate - b.acceptanceRate
            break
          case "companies":
            comparison = a.companies.length - b.companies.length
            break
          default:
            comparison = 0
        }
        
        return sortOrder === "asc" ? comparison : -comparison
      })
    } catch (error) {
      console.error("Error sorting problems:", error)
      return filteredProblems
    }
  }, [filteredProblems, sortBy, sortOrder])

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Problems</h1>
        <p className="text-muted-foreground">
          Practice coding problems from top tech companies
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <ProblemFilters onFiltersChange={setFilters} />
        </div>

        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                {sortedProblems.length} problems found
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1 border rounded-md text-sm"
                >
                  <option value="title">Title</option>
                  <option value="difficulty">Difficulty</option>
                  <option value="acceptanceRate">Acceptance Rate</option>
                  <option value="companies">Companies</option>
                </select>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSortOrder}
                >
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-1 border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className={
            viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 gap-4" 
              : "space-y-4"
          }>
            {sortedProblems.map((problem) => (
              <ProblemCard key={problem.id} problem={problem} />
            ))}
          </div>

          {sortedProblems.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                No problems found matching your criteria
              </div>
              <Button onClick={() => setFilters({ search: "", difficulty: "", category: "", company: "" })}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
