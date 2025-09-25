import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, BookOpen, Users, CheckCircle, Star } from "lucide-react"
import Link from "next/link"

export default function SourcesPage() {
  const sources = [
    {
      name: "LeetCode",
      description: "The world's leading online programming learning platform",
      website: "https://leetcode.com",
      credibility: "Industry Standard",
      problems: "All problems are based on LeetCode's official problem set",
      verification: "Problems verified against LeetCode's database"
    },
    {
      name: "Glassdoor Interview Reviews",
      description: "Real interview experiences shared by candidates",
      website: "https://glassdoor.com",
      credibility: "User-Generated",
      problems: "Company-specific problems reported by actual interviewees",
      verification: "Cross-referenced with multiple interview experiences"
    },
    {
      name: "InterviewBit",
      description: "Comprehensive interview preparation platform",
      website: "https://interviewbit.com",
      credibility: "Industry Recognized",
      problems: "Curated problems from top tech companies",
      verification: "Validated against multiple interview preparation sources"
    },
    {
      name: "GeeksforGeeks",
      description: "Computer science portal for geeks",
      website: "https://geeksforgeeks.org",
      credibility: "Educational Standard",
      problems: "Educational content and practice problems",
      verification: "Academic and industry validation"
    },
    {
      name: "Blind (Teamblind.com)",
      description: "Anonymous professional network",
      website: "https://teamblind.com",
      credibility: "Industry Insider",
      problems: "Real interview questions shared by employees",
      verification: "Verified by current and former employees"
    },
    {
      name: "Reddit r/cscareerquestions",
      description: "Community-driven interview preparation discussions",
      website: "https://reddit.com/r/cscareerquestions",
      credibility: "Community Verified",
      problems: "Problems discussed and confirmed by the community",
      verification: "Peer-reviewed by experienced developers"
    }
  ]

  const verificationMethods = [
    {
      method: "Cross-Reference Validation",
      description: "Problems are verified against multiple sources to ensure accuracy",
      icon: CheckCircle
    },
    {
      method: "Community Feedback",
      description: "Regular updates based on user feedback and new interview experiences",
      icon: Users
    },
    {
      method: "Industry Standards",
      description: "Problems follow industry-standard formats and difficulty levels",
      icon: Star
    },
    {
      method: "Regular Updates",
      description: "Database is updated regularly with new problems and company trends",
      icon: BookOpen
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Sources & Verification</h1>
        <p className="text-muted-foreground">
          Learn about where our problems come from and how we ensure accuracy
        </p>
      </div>

      <div className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <span>Our Commitment to Accuracy</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              At William's LeetCode Premium, we are committed to providing accurate, 
              up-to-date interview questions from real companies. Every problem in our 
              database is carefully sourced and verified to ensure you're practicing with 
              authentic interview questions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {verificationMethods.map((method, index) => {
                const IconComponent = method.icon
                return (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                    <IconComponent className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">{method.method}</h4>
                      <p className="text-xs text-muted-foreground">{method.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Primary Sources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sources.map((source, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{source.name}</CardTitle>
                  <Badge variant="outline">{source.credibility}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{source.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Problems:</h4>
                    <p className="text-sm text-muted-foreground">{source.problems}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Verification:</h4>
                    <p className="text-sm text-muted-foreground">{source.verification}</p>
                  </div>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link href={source.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Source
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Problem Selection Criteria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">What We Include:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Problems reported in multiple interview experiences</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Questions from official company interview processes</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Problems with clear problem statements and test cases</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Questions appropriate for the difficulty level</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Quality Assurance:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <Star className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <span>Multiple source verification</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Star className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <span>Community feedback integration</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Star className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <span>Regular accuracy reviews</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Star className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <span>Industry expert validation</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="py-8">
            <h3 className="text-xl font-bold mb-4">Questions About Our Sources?</h3>
            <p className="text-muted-foreground mb-6">
              If you have questions about any of our problems or sources, 
              or if you'd like to report an issue, please don't hesitate to reach out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/problems">
                  Start Practicing
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/companies">
                  Browse by Company
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
