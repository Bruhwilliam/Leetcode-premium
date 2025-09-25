"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { getProblemsByCompany, companies } from "@/lib/problems"
import { Problem } from "@/lib/problems"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getDifficultyColor, getCompanyColor } from "@/lib/utils"
import { Building2, Users, Target, TrendingUp, Clock, Star, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CompanyPage() {
  const params = useParams()
  const [company, setCompany] = useState<string | null>(null)
  const [problems, setProblems] = useState<Problem[]>([])
  const [companyStats, setCompanyStats] = useState({
    totalProblems: 0,
    difficultyCount: { Easy: 0, Medium: 0, Hard: 0 },
    avgAcceptanceRate: 0,
    topCategories: [] as string[]
  })

  useEffect(() => {
    if (params.company) {
      const companyName = decodeURIComponent(params.company as string)
      setCompany(companyName)
      
      const companyProblems = getProblemsByCompany(companyName)
      setProblems(companyProblems)
      
      if (companyProblems.length > 0) {
        const difficultyCount = {
          Easy: companyProblems.filter(p => p.difficulty === "Easy").length,
          Medium: companyProblems.filter(p => p.difficulty === "Medium").length,
          Hard: companyProblems.filter(p => p.difficulty === "Hard").length,
        }
        
        const avgAcceptanceRate = companyProblems.reduce((sum, p) => sum + p.acceptanceRate, 0) / companyProblems.length
        
        const categoryCount: { [key: string]: number } = {}
        companyProblems.forEach(problem => {
          categoryCount[problem.category] = (categoryCount[problem.category] || 0) + 1
        })
        const topCategories = Object.entries(categoryCount)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 5)
          .map(([category]) => category)
        
        setCompanyStats({
          totalProblems: companyProblems.length,
          difficultyCount,
          avgAcceptanceRate: Math.round(avgAcceptanceRate * 10) / 10,
          topCategories
        })
      }
    }
  }, [params.company])

  if (!company) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Company not found</h1>
          <p className="text-muted-foreground mb-6">The company you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/companies">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Companies
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  if (problems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="outline" asChild className="mb-4">
            <Link href="/companies">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Companies
            </Link>
          </Button>
        </div>
        
        <div className="text-center">
          <div className={`h-16 w-16 rounded-lg mx-auto mb-4 flex items-center justify-center ${getCompanyColor(company)}`}>
            <Building2 className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold mb-2">{company}</h1>
          <p className="text-muted-foreground mb-6">
            No problems available for this company yet. Check back later!
          </p>
          <Button asChild>
            <Link href="/problems">
              Browse All Problems
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="outline" asChild className="mb-4">
          <Link href="/companies">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Companies
          </Link>
        </Button>
      </div>

      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className={`h-16 w-16 rounded-lg flex items-center justify-center ${getCompanyColor(company)}`}>
            <Building2 className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{company}</h1>
            <p className="text-muted-foreground">
              {companyStats.totalProblems} interview problems available
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{companyStats.totalProblems}</div>
              <div className="text-sm text-muted-foreground">Total Problems</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">{companyStats.difficultyCount.Easy}</div>
              <div className="text-sm text-muted-foreground">Easy</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-1">{companyStats.difficultyCount.Medium}</div>
              <div className="text-sm text-muted-foreground">Medium</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-red-600 mb-1">{companyStats.difficultyCount.Hard}</div>
              <div className="text-sm text-muted-foreground">Hard</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Average Acceptance Rate</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{companyStats.avgAcceptanceRate}%</div>
              <p className="text-sm text-muted-foreground mt-1">
                Average acceptance rate across all problems
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Top Categories</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {companyStats.topCategories.map((category) => (
                  <Badge key={category} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Interview Problems</h2>
        <p className="text-muted-foreground mb-6">
          Practice with real interview questions from {company}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {problems.map((problem) => (
          <Card key={problem.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">
                  <Link 
                    href={`/problems/${problem.id}`}
                    className="hover:text-primary transition-colors"
                  >
                    {problem.title}
                  </Link>
                </CardTitle>
                {problem.premium && (
                  <Badge variant="default" className="bg-gradient-to-r from-yellow-500 to-orange-500">
                    <Star className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Badge 
                  variant="outline" 
                  className={getDifficultyColor(problem.difficulty)}
                >
                  {problem.difficulty}
                </Badge>
                <Badge variant="outline">
                  {problem.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{problem.acceptanceRate}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {problem.companies.slice(0, 3).map((companyName) => (
                    <Badge
                      key={companyName}
                      variant="secondary"
                      className={`text-xs ${getCompanyColor(companyName)}`}
                    >
                      {companyName}
                    </Badge>
                  ))}
                  {problem.companies.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{problem.companies.length - 3} more
                    </Badge>
                  )}
                </div>
                
                <Button size="sm" className="w-full" asChild>
                  <Link href={`/problems/${problem.id}`}>
                    Solve Problem
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {problems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            No problems found for {company}
          </div>
          <Button asChild>
            <Link href="/problems">
              Browse All Problems
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}

