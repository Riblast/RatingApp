import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { BarChart2, Star, User, TrendingUp, Users, Settings } from "lucide-react"
import { Link } from "wouter"

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
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <main className="flex-1 p-4 space-y-4">
        <Card className="bg-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Stats Improvement</CardTitle>
            <CardDescription>Track your progress over time</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="totalRatings">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="totalRatings">Total Ratings</TabsTrigger>
                  <TabsTrigger value="averageRating">Average Rating</TabsTrigger>
                  <TabsTrigger value="helpfulnessScore">Helpfulness Score</TabsTrigger>
                </TabsList>
                <Select defaultValue="6months">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">Last Month</SelectItem>
                    <SelectItem value="3months">Last 3 Months</SelectItem>
                    <SelectItem value="6months">Last 6 Months</SelectItem>
                    <SelectItem value="1year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <TabsContent value="totalRatings">
                <ChartContainer
                  config={{
                    totalRatings: {
                      label: "Total Ratings",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockData}>
                      <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                      <Line type="monotone" dataKey="totalRatings" strokeWidth={2} dot={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </TabsContent>
              <TabsContent value="averageRating">
                <ChartContainer
                  config={{
                    averageRating: {
                      label: "Average Rating",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockData}>
                      <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} domain={[0, 5]} />
                      <Line type="monotone" dataKey="averageRating" strokeWidth={2} dot={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </TabsContent>
              <TabsContent value="helpfulnessScore">
                <ChartContainer
                  config={{
                    helpfulnessScore: {
                      label: "Helpfulness Score",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockData}>
                      <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} domain={[0, 100]} />
                      <Line type="monotone" dataKey="helpfulnessScore" strokeWidth={2} dot={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="bg-gray-800">
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                <span>Your total ratings have increased by 320% in the last 6 months.</span>
              </li>
              <li className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-2" />
                <span>Your average rating has improved from 3.5 to 4.5 stars.</span>
              </li>
              <li className="flex items-center">
                <User className="h-5 w-5 text-blue-500 mr-2" />
                <span>Your helpfulness score has grown by 18 points.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>

      <nav className="flex justify-around items-center bg-gray-800 p-4">
        <Link href="/profile">
          <Button variant="ghost" size="icon">
            <User className="h-6 w-6" />
          </Button>
        </Link>
        <Link href="/statistics">
          <Button variant="ghost" size="icon" className="text-yellow-500">
            <BarChart2 className="h-6 w-6" fill="currentColor" />
          </Button>
        </Link>
        <Link href="/">
          <Button variant="ghost" size="icon">
            <Star className="h-6 w-6" />
          </Button>
        </Link>
        <Link href="/friends">
          <Button variant="ghost" size="icon">
            <Users className="h-6 w-6" />
          </Button>
        </Link>
        <Link href="/settings">
          <Button variant="ghost" size="icon">
            <Settings className="h-6 w-6" />
          </Button>
        </Link>
      </nav>
    </div>
  )
}