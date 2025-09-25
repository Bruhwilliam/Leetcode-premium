import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Trophy, Users, Calendar, Star } from "lucide-react"
import Link from "next/link"

export default function ContestsPage() {
  const upcomingContests = [
    {
      id: "weekly-contest-1",
      name: "William's Weekly Contest #1",
      date: "2024-01-15",
      time: "14:00 UTC",
      duration: "90 minutes",
      problems: 4,
      participants: 0,
      difficulty: "Medium",
      description: "Test your skills with our weekly coding challenge featuring problems from top tech companies."
    },
    {
      id: "company-focus-amazon",
      name: "Amazon Interview Prep Contest",
      date: "2024-01-22",
      time: "16:00 UTC", 
      duration: "120 minutes",
      problems: 5,
      participants: 0,
      difficulty: "Hard",
      description: "Focus on Amazon interview questions. Perfect for those preparing for Amazon interviews."
    },
    {
      id: "beginner-friendly",
      name: "Beginner Friendly Contest",
      date: "2024-01-29",
      time: "18:00 UTC",
      duration: "60 minutes",
      problems: 3,
      participants: 0,
      difficulty: "Easy",
      description: "Perfect for beginners! Easy to medium difficulty problems to build confidence."
    }
  ]

  const pastContests = [
    {
      id: "warm-up-contest",
      name: "Warm-up Contest",
      date: "2024-01-01",
      participants: 127,
      winner: "Anonymous User",
      description: "Our first contest to test the platform"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Coding Contests</h1>
        <p className="text-muted-foreground">
          Participate in timed coding challenges and compete with other developers
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Upcoming Contests</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingContests.map((contest) => (
            <Card key={contest.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{contest.name}</CardTitle>
                  <Badge 
                    variant="outline" 
                    className={
                      contest.difficulty === "Easy" ? "text-green-600 bg-green-100" :
                      contest.difficulty === "Medium" ? "text-yellow-600 bg-yellow-100" :
                      "text-red-600 bg-red-100"
                    }
                  >
                    {contest.difficulty}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{contest.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{contest.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{contest.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Trophy className="h-4 w-4 text-muted-foreground" />
                      <span>{contest.problems} problems</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{contest.participants} registered</span>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                      <span>Duration: {contest.duration}</span>
                    </div>
                    <Button className="w-full" disabled>
                      Register (Coming Soon)
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Past Contests</h2>
        <div className="space-y-4">
          {pastContests.map((contest) => (
            <Card key={contest.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{contest.name}</h3>
                    <p className="text-sm text-muted-foreground">{contest.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                      <span>Date: {contest.date}</span>
                      <span>Participants: {contest.participants}</span>
                      <span>Winner: {contest.winner}</span>
                    </div>
                  </div>
                  <Button variant="outline" disabled>
                    View Results
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="py-8">
            <h3 className="text-xl font-bold mb-4">Want to Practice Before Contests?</h3>
            <p className="text-muted-foreground mb-6">
              Sharpen your skills with our curated problem sets and company-specific questions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/problems">
                  Practice Problems
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

