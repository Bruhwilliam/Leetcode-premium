import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, ThumbsUp, Clock, User, Search, Plus } from "lucide-react"
import Link from "next/link"

export default function DiscussPage() {
  const discussions = [
    {
      id: "1",
      title: "Two Sum - Optimal Solution Explanation",
      author: "Anonymous User",
      time: "2 hours ago",
      likes: 15,
      replies: 8,
      problem: "Two Sum",
      difficulty: "Easy",
      tags: ["Hash Table", "Array"],
      content: "Can someone explain the optimal O(n) solution for Two Sum? I understand the brute force approach but want to understand the hash map solution better."
    },
    {
      id: "2", 
      title: "Amazon Interview Experience - System Design Round",
      author: "Anonymous User",
      time: "5 hours ago",
      likes: 23,
      replies: 12,
      problem: "System Design",
      difficulty: "Hard",
      tags: ["System Design", "Amazon"],
      content: "Just had my Amazon system design interview. They asked me to design a URL shortener. Here's how I approached it and what feedback I received..."
    },
    {
      id: "3",
      title: "Dynamic Programming Patterns - Climbing Stairs",
      author: "Anonymous User", 
      time: "1 day ago",
      likes: 31,
      replies: 15,
      problem: "Climbing Stairs",
      difficulty: "Easy",
      tags: ["Dynamic Programming", "Math"],
      content: "I'm trying to understand DP patterns. The climbing stairs problem seems like a Fibonacci sequence. Can anyone confirm this pattern?"
    },
    {
      id: "4",
      title: "Google Interview Prep - What to Focus On?",
      author: "Anonymous User",
      time: "2 days ago", 
      likes: 42,
      replies: 25,
      problem: "General",
      difficulty: "Medium",
      tags: ["Interview Prep", "Google"],
      content: "I have a Google interview in 2 weeks. What topics should I focus on? I've been practicing on this platform but want to make sure I'm covering the right areas."
    },
    {
      id: "5",
      title: "Maximum Subarray - Kadane's Algorithm",
      author: "Anonymous User",
      time: "3 days ago",
      likes: 28,
      replies: 11,
      problem: "Maximum Subarray", 
      difficulty: "Medium",
      tags: ["Array", "Dynamic Programming"],
      content: "Finally understood Kadane's algorithm! Here's a step-by-step breakdown for anyone struggling with this problem."
    }
  ]

  const popularTags = [
    "Hash Table", "Array", "Dynamic Programming", "Two Pointers", "String",
    "Tree", "Graph", "Sorting", "Binary Search", "Stack", "Queue",
    "Amazon", "Google", "Microsoft", "Meta", "Apple", "Interview Prep"
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Discussion Forum</h1>
        <p className="text-muted-foreground">
          Connect with other developers, share solutions, and discuss interview experiences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recent Discussions</h2>
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>New Post</span>
              </Button>
            </div>
            
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search discussions..."
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-4">
            {discussions.map((discussion) => (
              <Card key={discussion.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        <Link href={`/discuss/${discussion.id}`} className="hover:text-primary">
                          {discussion.title}
                        </Link>
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {discussion.content}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{discussion.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{discussion.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{discussion.replies} replies</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{discussion.likes}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {discussion.problem !== "General" && (
                          <Link href={`/problems/${discussion.problem.toLowerCase().replace(/\s+/g, '-')}`}>
                            <Badge variant="outline">{discussion.problem}</Badge>
                          </Link>
                        )}
                        <Badge 
                          variant="outline" 
                          className={
                            discussion.difficulty === "Easy" ? "text-green-600 bg-green-100" :
                            discussion.difficulty === "Medium" ? "text-yellow-600 bg-yellow-100" :
                            "text-red-600 bg-red-100"
                          }
                        >
                          {discussion.difficulty}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {discussion.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {discussion.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{discussion.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Be respectful and constructive</li>
                  <li>• Share your solutions and insights</li>
                  <li>• Help others learn and grow</li>
                  <li>• Report inappropriate content</li>
                  <li>• Follow the problem-solving guidelines</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Can't find what you're looking for? Start a new discussion or browse our problems.
                </p>
                <div className="space-y-2">
                  <Button size="sm" className="w-full" asChild>
                    <Link href="/problems">
                      Browse Problems
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" className="w-full">
                    Ask Question
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

