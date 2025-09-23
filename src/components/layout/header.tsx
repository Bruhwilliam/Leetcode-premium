"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu, User, Trophy, BookOpen } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LeetCode Premium
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/problems" className="text-sm font-medium hover:text-primary transition-colors">
              Problems
            </Link>
            <Link href="/companies" className="text-sm font-medium hover:text-primary transition-colors">
              Companies
            </Link>
            <Link href="/contests" className="text-sm font-medium hover:text-primary transition-colors">
              Contests
            </Link>
            <Link href="/discuss" className="text-sm font-medium hover:text-primary transition-colors">
              Discuss
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:block relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search problems..."
              className="pl-10 w-64"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Trophy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search problems..."
                className="pl-10 w-full"
              />
            </div>
            <nav className="flex flex-col space-y-2">
              <Link href="/problems" className="text-sm font-medium hover:text-primary transition-colors py-2">
                Problems
              </Link>
              <Link href="/companies" className="text-sm font-medium hover:text-primary transition-colors py-2">
                Companies
              </Link>
              <Link href="/contests" className="text-sm font-medium hover:text-primary transition-colors py-2">
                Contests
              </Link>
              <Link href="/discuss" className="text-sm font-medium hover:text-primary transition-colors py-2">
                Discuss
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
