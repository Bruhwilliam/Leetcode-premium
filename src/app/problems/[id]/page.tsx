"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { getProblemById } from "@/lib/problems"
import { Problem } from "@/lib/problems"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getDifficultyColor, getCompanyColor } from "@/lib/utils"
import { Play, RotateCcw, CheckCircle, XCircle, Clock, Star } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <div className="h-96 bg-muted animate-pulse rounded-md" />
})

interface TestResult {
  input: any
  expectedOutput: any
  actualOutput: any
  passed: boolean
  runtime?: number
}

export default function ProblemPage() {
  const params = useParams()
  const [problem, setProblem] = useState<Problem | null>(null)
  const [code, setCode] = useState("")
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [activeTab, setActiveTab] = useState<"description" | "solutions">("description")

  useEffect(() => {
    if (params.id) {
      const foundProblem = getProblemById(params.id as string)
      if (foundProblem) {
        setProblem(foundProblem)
        // Initialize with default solution if available
        if (foundProblem.solutions.length > 0) {
          setCode(foundProblem.solutions[0].code)
        }
      }
    }
  }, [params.id])

  const runTests = async () => {
    if (!problem) return

    setIsRunning(true)
    setTestResults([])

    // Simulate running tests (in a real app, this would call your backend)
    const results: TestResult[] = []
    
    for (const testCase of problem.testCases) {
      try {
        const startTime = Date.now()
        
        // Try to execute the user's code with the test case
        let actualOutput: any
        let passed = false
        
        try {
          // Create a safe execution context
          const func = new Function('return ' + code)()
          
          // Extract input parameters based on the problem
          let result: any
          if (problem.id === 'two-sum') {
            const { nums, target } = testCase.input
            result = func(nums, target)
          } else if (problem.id === 'add-two-numbers') {
            // For linked list problems, we'd need more complex handling
            result = "Linked list execution not supported in demo"
          } else if (problem.id === 'longest-substring-without-repeating-characters') {
            result = func(testCase.input.s)
          } else if (problem.id === 'median-of-two-sorted-arrays') {
            result = func(testCase.input.nums1, testCase.input.nums2)
          } else if (problem.id === 'longest-palindromic-substring') {
            result = func(testCase.input.s)
          } else if (problem.id === 'zigzag-conversion') {
            result = func(testCase.input.s, testCase.input.numRows)
          } else if (problem.id === 'reverse-integer') {
            result = func(testCase.input.x)
          } else if (problem.id === 'valid-parentheses') {
            result = func(testCase.input.s)
          } else if (problem.id === 'climbing-stairs') {
            result = func(testCase.input.n)
          } else if (problem.id === 'maximum-subarray') {
            result = func(testCase.input.nums)
          } else {
            // Generic handling for other problems
            result = "Demo mode - execution not fully implemented"
          }
          
          actualOutput = result
          
          // Compare outputs (handle different data types)
          if (Array.isArray(result) && Array.isArray(testCase.expectedOutput)) {
            passed = JSON.stringify(result.sort()) === JSON.stringify(testCase.expectedOutput.sort())
          } else {
            passed = result === testCase.expectedOutput
          }
          
        } catch (execError) {
          actualOutput = `Runtime Error: ${execError}`
          passed = false
        }
        
        const runtime = Date.now() - startTime
        
        results.push({
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput,
          passed,
          runtime
        })
      } catch (error) {
        results.push({
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: "Error",
          passed: false
        })
      }
    }

    setTestResults(results)
    setIsRunning(false)
  }

  const resetCode = () => {
    if (problem && problem.solutions.length > 0) {
      setCode(problem.solutions[0].code)
    } else {
      setCode("")
    }
  }

  if (!problem) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Problem not found</h1>
          <p className="text-muted-foreground">The problem you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Problem Description */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <h1 className="text-2xl font-bold">{problem.title}</h1>
              <Badge 
                variant="outline" 
                className={getDifficultyColor(problem.difficulty)}
              >
                {problem.difficulty}
              </Badge>
              {problem.premium && (
                <Badge variant="default" className="bg-gradient-to-r from-yellow-500 to-orange-500">
                  <Star className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {problem.companies.slice(0, 5).map((company) => (
                <Badge
                  key={company}
                  variant="secondary"
                  className={getCompanyColor(company)}
                >
                  {company}
                </Badge>
              ))}
              {problem.companies.length > 5 && (
                <Badge variant="secondary">
                  +{problem.companies.length - 5} more
                </Badge>
              )}
            </div>

            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
              <span>Acceptance: {problem.acceptanceRate}%</span>
              <span>Category: {problem.category}</span>
            </div>
          </div>

          <div className="flex space-x-2 border-b">
            <Button
              variant={activeTab === "description" ? "default" : "ghost"}
              onClick={() => setActiveTab("description")}
            >
              Description
            </Button>
            <Button
              variant={activeTab === "solutions" ? "default" : "ghost"}
              onClick={() => setActiveTab("solutions")}
            >
              Solutions
            </Button>
          </div>

          {activeTab === "description" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Problem Statement</h3>
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-wrap">{problem.description}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Examples</h3>
                <div className="space-y-4">
                  {problem.examples.map((example, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div>
                            <strong>Input:</strong>
                            <pre className="bg-muted p-2 rounded mt-1 text-sm">
                              {example.input}
                            </pre>
                          </div>
                          <div>
                            <strong>Output:</strong>
                            <pre className="bg-muted p-2 rounded mt-1 text-sm">
                              {example.output}
                            </pre>
                          </div>
                          {example.explanation && (
                            <div>
                              <strong>Explanation:</strong>
                              <p className="text-sm text-muted-foreground mt-1">
                                {example.explanation}
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Constraints</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {problem.constraints.map((constraint, index) => (
                    <li key={index} className="text-muted-foreground">
                      {constraint}
                    </li>
                  ))}
                </ul>
              </div>

              {problem.hints.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Hints</h3>
                  <div className="space-y-2">
                    {problem.hints.map((hint, index) => (
                      <div key={index} className="p-3 bg-muted rounded-lg text-sm">
                        {hint}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "solutions" && (
            <div className="space-y-4">
              {problem.solutions.map((solution, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {solution.language} Solution
                    </CardTitle>
                    <div className="flex space-x-4 text-sm text-muted-foreground">
                      <span>Time: {solution.timeComplexity}</span>
                      <span>Space: {solution.spaceComplexity}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                      <code>{solution.code}</code>
                    </pre>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Code Editor and Test Results */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Code Editor</h3>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetCode}
                  disabled={isRunning}
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Reset
                </Button>
                <Button
                  onClick={runTests}
                  disabled={isRunning}
                >
                  <Play className="h-4 w-4 mr-1" />
                  {isRunning ? "Running..." : "Run Tests"}
                </Button>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <MonacoEditor
                height="400px"
                language="javascript"
                value={code}
                onChange={(value) => setCode(value || "")}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: "on",
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
          </div>

          {/* Test Results */}
          {testResults.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Test Results</h3>
              <div className="space-y-3">
                {testResults.map((result, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Test Case {index + 1}</span>
                        <div className="flex items-center space-x-2">
                          {result.passed ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-600" />
                          )}
                          <span className={`text-sm ${result.passed ? 'text-green-600' : 'text-red-600'}`}>
                            {result.passed ? 'Passed' : 'Failed'}
                          </span>
                          {result.runtime && (
                            <span className="text-xs text-muted-foreground">
                              {result.runtime}ms
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong>Input:</strong>
                          <pre className="bg-muted p-2 rounded mt-1 text-xs">
                            {JSON.stringify(result.input)}
                          </pre>
                        </div>
                        <div>
                          <strong>Expected:</strong>
                          <pre className="bg-muted p-2 rounded mt-1 text-xs">
                            {JSON.stringify(result.expectedOutput)}
                          </pre>
                        </div>
                        <div className="md:col-span-2">
                          <strong>Actual:</strong>
                          <pre className="bg-muted p-2 rounded mt-1 text-xs">
                            {JSON.stringify(result.actualOutput)}
                          </pre>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
