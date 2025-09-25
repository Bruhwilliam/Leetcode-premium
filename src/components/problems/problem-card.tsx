"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Problem } from "@/lib/problems"
import { getDifficultyColor, getCompanyColor } from "@/lib/utils"
import { Clock, Users, Star } from "lucide-react"

interface ProblemCardProps {
  problem: Problem
}

export function ProblemCard({ problem }: ProblemCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold mb-2">
              <Link 
                href={`/problems/${problem.id}`}
                className="hover:text-blue-600 transition-colors"
              >
                {problem.title}
              </Link>
            </CardTitle>
            <div className="flex items-center space-x-2 mb-3">
              <Badge 
                variant="outline" 
                className={getDifficultyColor(problem.difficulty)}
              >
                {problem.difficulty}
              </Badge>
              <Badge variant="outline">
                {problem.category}
              </Badge>
              {problem.premium && (
                <Badge variant="default" className="bg-gradient-to-r from-yellow-500 to-orange-500">
                  <Star className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{problem.acceptanceRate}%</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{problem.companies.length} companies</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {problem.companies.slice(0, 3).map((company) => (
              <Badge
                key={company}
                variant="secondary"
                className={`text-xs ${getCompanyColor(company)}`}
              >
                {company}
              </Badge>
            ))}
            {problem.companies.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{problem.companies.length - 3} more
              </Badge>
            )}
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="text-sm text-muted-foreground">
              {problem.relatedTopics.slice(0, 2).join(", ")}
              {problem.relatedTopics.length > 2 && "..."}
            </div>
            <Link 
              href={`/problems/${problem.id}`}
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-1.5 rounded transition-colors"
            >
              Solve
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
