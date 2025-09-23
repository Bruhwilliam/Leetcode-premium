import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { problems, companies, difficulties } from "@/lib/problems"
import { getDifficultyColor, getCompanyColor } from "@/lib/utils"
import { 
  BookOpen, 
  Trophy, 
  Users, 
  Target, 
  Zap, 
  Star,
  ArrowRight,
  CheckCircle,
  Clock,
  TrendingUp
} from "lucide-react"

export default function HomePage() {
  const stats = {
    totalProblems: problems.length,
    companies: companies.length,
    easyProblems: problems.filter(p => p.difficulty === "Easy").length,
    mediumProblems: problems.filter(p => p.difficulty === "Medium").length,
    hardProblems: problems.filter(p => p.difficulty === "Hard").length,
  }

  const featuredProblems = problems.slice(0, 6)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Master Coding Interviews
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Practice with real interview questions from top tech companies. 
              Build confidence and land your dream job.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/problems">
                  Start Practicing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/companies">
                  Browse by Company
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stats.totalProblems}</div>
              <div className="text-muted-foreground">Problems</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{stats.companies}</div>
              <div className="text-muted-foreground">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{stats.easyProblems}</div>
              <div className="text-muted-foreground">Easy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">{stats.mediumProblems}</div>
              <div className="text-muted-foreground">Medium</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Platform?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide everything you need to succeed in technical interviews
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Real Interview Questions</CardTitle>
                <CardDescription>
                  Practice with actual questions asked by top tech companies
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Instant Feedback</CardTitle>
                <CardDescription>
                  Get immediate results and detailed explanations for your solutions
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Track Progress</CardTitle>
                <CardDescription>
                  Monitor your improvement with detailed analytics and statistics
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Problems */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Problems</h2>
            <p className="text-muted-foreground">
              Start with these popular problems from top companies
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProblems.map((problem) => (
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
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="h-4 w-4" />
                        <span>{problem.acceptanceRate}%</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{problem.companies.length} companies</span>
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
                          +{problem.companies.length - 3}
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
          
          <div className="text-center mt-8">
            <Button size="lg" asChild>
              <Link href="/problems">
                View All Problems
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Ace Your Next Interview?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of developers who have landed their dream jobs
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/problems">
              Get Started Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}