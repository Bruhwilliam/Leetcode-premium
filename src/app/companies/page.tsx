"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getProblemsByCompany, companies } from "@/lib/problems"
import { getCompanyColor, getDifficultyColor } from "@/lib/utils"
import { Search, Building2, TrendingUp, Users, Target } from "lucide-react"
import Link from "next/link"

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCompanies = useMemo(() => {
    return companies.filter(company =>
      company.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  const getCompanyStats = (company: string) => {
    const problems = getProblemsByCompany(company)
    const difficultyCount = {
      Easy: problems.filter(p => p.difficulty === "Easy").length,
      Medium: problems.filter(p => p.difficulty === "Medium").length,
      Hard: problems.filter(p => p.difficulty === "Hard").length,
    }
    const totalProblems = problems.length
    const avgAcceptanceRate = problems.reduce((sum, p) => sum + p.acceptanceRate, 0) / totalProblems

    return {
      totalProblems,
      difficultyCount,
      avgAcceptanceRate: Math.round(avgAcceptanceRate * 10) / 10
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Companies</h1>
        <p className="text-muted-foreground">
          Practice problems from specific companies
        </p>
      </div>

      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((company) => {
          const stats = getCompanyStats(company)
          
          return (
            <Card key={company} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${getCompanyColor(company)}`}>
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{company}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {stats.totalProblems} problems
                    </p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-lg font-semibold text-green-600">
                        {stats.difficultyCount.Easy}
                      </div>
                      <div className="text-xs text-muted-foreground">Easy</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-yellow-600">
                        {stats.difficultyCount.Medium}
                      </div>
                      <div className="text-xs text-muted-foreground">Medium</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-red-600">
                        {stats.difficultyCount.Hard}
                      </div>
                      <div className="text-xs text-muted-foreground">Hard</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span>Avg. Acceptance: {stats.avgAcceptanceRate}%</span>
                    </div>
                  </div>

                  <Button className="w-full" asChild>
                    <Link href={`/companies/${company.toLowerCase()}`}>
                      View Problems
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredCompanies.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            No companies found matching your search
          </div>
          <Button onClick={() => setSearchTerm("")}>
            Clear search
          </Button>
        </div>
      )}
    </div>
  )
}
