import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, User, BarChart2, Star, Users, Settings } from "lucide-react"
import { Link } from "wouter"

export default function CreateNewRating() {
  const [category, setCategory] = useState("event")

  return (
    <div className="flex flex-col min-h-screen bg-[#1a1f2e] text-gray-100">
      <header className="flex items-center p-4 bg-[#232a3b]">
        <Link to="/">
          <Button variant="ghost" size="icon" className="mr-2">
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-2xl font-semibold">Create New Rating</h1>
      </header>

      <main className="flex-1 p-4 space-y-4 overflow-y-auto">
        <Card className="bg-[#232a3b] border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white">Rating Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-white">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter rating title" className="bg-[#1a1f2e] border-gray-600" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category" className="bg-[#1a1f2e] border-gray-600">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-[#232a3b] border-gray-600 text-white">
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Enter rating description" 
                className="bg-[#1a1f2e] border-gray-600 min-h-[100px] resize-none" 
              />
            </div>

            <div className="space-y-2">
              <Label>Visibility</Label>
              <RadioGroup defaultValue="public" className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="public" className="border-gray-400 text-green-500" />
                  <Label htmlFor="public">Public</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="private" className="border-gray-400 text-green-500" />
                  <Label htmlFor="private">Private</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
          Create Rating
        </Button>
      </main>

      <nav className="flex justify-around items-center bg-gray-800 p-4">
        <Link href="/profile">
          <Button variant="ghost" size="icon">
            <User className="h-6 w-6" />
          </Button>
        </Link>
        <Link href="/statistics">
          <Button variant="ghost" size="icon">
            <BarChart2 className="h-6 w-6" />
          </Button>
        </Link>
        <Link href="/">
          <Button variant="ghost" size="icon" className="text-yellow-500">
            <Star className="h-6 w-6" fill="currentColor" />
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