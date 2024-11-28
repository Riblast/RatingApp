import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { BarChart2, Star, User, TrendingUp, Users, Settings } from "lucide-react"
import { Link } from "react-router-dom"

// Mock data for the graph
const mockData = [
  { month: "Jan", totalRatings: 10, averageRating: 3.5, helpfulnessScore: 70 },
  { month: "Feb", totalRatings: 15, averageRating: 3.7, helpfulnessScore: 75 },
  { month: "Mar", totalRatings: 22, averageRating: 3.9, helpfulnessScore: 80 },
  { month: "Apr", totalRatings: 28, averageRating: 4.1, helpfulnessScore: 82 },
  { month: "May", totalRatings: 35, averageRating: 4.3, helpfulnessScore: 85 },
  { month: "Jun", totalRatings: 42, averageRating: 4.5, helpfulnessScore: 88 },
]

export default function StatsGraph() {
  return (
    <div className="flex flex-col space-y-4 bg-[#1a1f2e] min-h-screen text-gray-100">
      <main className="flex-1 p-4 space-y-4">
        <Card className="bg-[#232a3b] border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-white">Stats Improvement</CardTitle>
            <CardDescription className="text-gray-400">Track your progress over time</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="totalRatings" className="space-y-4">
              <div className="flex justify-between items-center">
                <TabsList className="bg-[#2a3346]">
                  <TabsTrigger value="totalRatings" className="data-[state=active]:bg-[#3a4357] data-[state=active]:text-white">Total Ratings</TabsTrigger>
                  <TabsTrigger value="averageRating" className="data-[state=active]:bg-[#3a4357] data-[state=active]:text-white">Average Rating</TabsTrigger>
                  <TabsTrigger value="helpfulnessScore" className="data-[state=active]:bg-[#3a4357] data-[state=active]:text-white">Helpfulness Score</TabsTrigger>
                </TabsList>
                <Select defaultValue="lastMonth">
                  <SelectTrigger className="w-[180px] bg-[#2a3346] border-gray-600 text-white">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2a3346] border-gray-600">
                    <SelectItem value="lastMonth" className="text-white">Last Month</SelectItem>
                    <SelectItem value="last3Months" className="text-white">Last 3 Months</SelectItem>
                    <SelectItem value="last6Months" className="text-white">Last 6 Months</SelectItem>
                    <SelectItem value="lastYear" className="text-white">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <TabsContent value="totalRatings" className="space-y-4">
                <ChartContainer
                  config={{
                    totalRatings: {
                      label: "Total Ratings",
                      color: "rgb(59, 130, 246)",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockData}>
                      <XAxis 
                        dataKey="month" 
                        stroke="#4b5563" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false} 
                      />
                      <YAxis 
                        stroke="#4b5563" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false} 
                        tickFormatter={(value) => `${value}`} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="totalRatings" 
                        strokeWidth={2} 
                        dot={false}
                        stroke="rgb(59, 130, 246)" 
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="bg-[#232a3b] border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white">Key Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2 text-green-400">
              <TrendingUp className="h-5 w-5" />
              <span>Your total ratings have increased by 320% in the last 6 months.</span>
            </div>
            <div className="flex items-center space-x-2 text-yellow-400">
              <Star className="h-5 w-5" />
              <span>Your average rating has improved from 3.5 to 4.5 stars.</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-400">
              <User className="h-5 w-5" />
              <span>Your helpfulness score has grown by 18 points.</span>
            </div>
          </CardContent>
        </Card>
      </main>

      <nav className="flex justify-around items-center bg-gray-800 p-4">
        <Link to="/profile">
          <Button variant="ghost" size="icon">
            <User className="h-6 w-6" />
          </Button>
        </Link>
        <Link to="/statistics">
          <Button variant="ghost" size="icon" className="text-yellow-500">
            <BarChart2 className="h-6 w-6" fill="currentColor" />
          </Button>
        </Link>
        <Link to="/">
          <Button variant="ghost" size="icon">
            <Star className="h-6 w-6" />
          </Button>
        </Link>
        <Link to="/friends">
          <Button variant="ghost" size="icon">
            <Users className="h-6 w-6" />
          </Button>
        </Link>
        <Link to="/settings">
          <Button variant="ghost" size="icon">
            <Settings className="h-6 w-6" />
          </Button>
        </Link>
      </nav>
    </div>
  )
}