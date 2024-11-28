import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { User, BarChart2, Star, Users, Settings, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom"

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("All")

  const ratings = [
    { id: 1, name: "Cumple Gonza", date: "16/04/2023", category: "Event", status: "Open" },
    { id: 2, name: "Movie Night", date: "20/04/2023", category: "Entertainment", status: "Closed" },
    { id: 3, name: "New Restaurant", date: "25/04/2023", category: "Food", status: "Open" },
  ]

  const filteredRatings = ratings.filter(
    (rating) =>
      rating.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter === "All" || rating.category === filter)
  )

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <main className="flex-1 p-4 space-y-4">
        <Link to="/newrating">
          <Button className="w-full bg-green-600 hover:bg-green-700 h-16 text-white font-semibold py-3 rounded-lg text-lg">
            Create new rating
          </Button>
        </Link>
        <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 rounded-lg text-lg">
          Join to rate
        </Button>
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Search ratings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow text-gray-400 border-gray-700"
          >
          </Input>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setFilter("All")}>All</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setFilter("Event")}>Event</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setFilter("Entertainment")}>Entertainment</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setFilter("Food")}>Food</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <ScrollArea className="h-[calc(100vh-320px)]">
          {filteredRatings.map((rating) => (
            <Card key={rating.id} className="bg-gray-800 mb-2 border-gray-700">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <span className="font-medium text-white">{rating.name}</span>
                  <Badge variant={rating.status === "Open" ? "default" : "secondary"} className="ml-2">
                    {rating.status}
                  </Badge>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-400 block">{rating.date}</span>
                  <span className="text-xs text-gray-500">{rating.category}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      </main>
      <nav className="flex justify-around items-center bg-gray-800 p-4">
        <Link to="/profile">
          <Button variant="ghost" size="icon">
            <User className="h-6 w-6" />
          </Button>
        </Link>
        <Link to="/statistics">
          <Button variant="ghost" size="icon">
            <BarChart2 className="h-6 w-6" />
          </Button>
        </Link>
        <Link to="/">
          <Button variant="ghost" size="icon" className="text-yellow-500">
            <Star className="h-6 w-6" fill="currentColor" />
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