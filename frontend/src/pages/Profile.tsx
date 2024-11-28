import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { BarChart2, Edit, Star, User, Users, Settings } from "lucide-react"
import { Link } from "react-router-dom"

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState({
    name: "Alice Johnson",
    username: "@alice_j",
    bio: "Passionate about honest reviews and great experiences!",
    email: "alice.johnson@example.com",
  })

  const handleSave = () => {
    // Here you would typically send the updated user data to your backend
    setIsEditing(false)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <main className="flex-1 p-4 space-y-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <div className="flex flex-col space-y-1 flex-1">
              <CardTitle className="text-white">{user.name}</CardTitle>
              <CardDescription className="text-gray-400">{user.username}</CardDescription>
            </div>
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder.svg?height=80&width=80" alt={user.name} />
              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white">Name</Label>
                  <Input 
                    id="name" 
                    value={user.name}
                    onChange={(e) => setUser({...user, name: e.target.value})}
                    className="text-gray-400 border-gray-700"
                  />
                </div>
                <div>
                  <Label htmlFor="username" className="text-white">Username</Label>
                  <Input 
                    id="username" 
                    value={user.username}
                    onChange={(e) => setUser({...user, username: e.target.value})}
                    className="text-gray-400 border-gray-700"
                  />
                </div>
                <div>
                  <Label htmlFor="bio" className="text-white">Bio</Label>
                  <Textarea 
                    id="bio" 
                    value={user.bio}
                    onChange={(e) => setUser({...user, bio: e.target.value})}
                    className="text-gray-400 border-gray-700"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    className="text-gray-400 border-gray-700"
                  />
                </div>
                <Button type="submit">Save</Button>
              </form>
            ) : (
              <>
                <p className="mb-4 text-white">{user.bio}</p>
                <Button onClick={() => setIsEditing(true)} className="w-full">
                  <Edit className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-[#2a3346]">
            <TabsTrigger value="stats" className="data-[state=active]:bg-[#3a4357] data-[state=active]:text-white">Stats</TabsTrigger>
            <TabsTrigger value="ratings" className="data-[state=active]:bg-[#3a4357] data-[state=active]:text-white">Ratings</TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-[#3a4357] data-[state=active]:text-white">Achievements</TabsTrigger>
          </TabsList>
          <TabsContent value="stats">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">User Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-white">
                <div className="flex justify-between">
                  <span>Total Ratings:</span>
                  <span>42</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Rating:</span>
                  <span>4.7</span>
                </div>
                <div className="flex justify-between">
                  <span>Helpfulness Score:</span>
                  <span>92%</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="ratings">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Ratings</CardTitle>
              </CardHeader>
              <CardContent className="text-white">
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Local Cafe</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                      <span>4.5</span>
                    </div>
                  </li>
                  <li className="flex justify-between">
                    <span>City Park</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                      <span>5.0</span>
                    </div>
                  </li>
                  <li className="flex justify-between">
                    <span>Downtown Theater</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                      <span>4.0</span>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="achievements">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">User Achievements</CardTitle>
              </CardHeader>
              <CardContent className="text-white">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Star className="h-5 w-5 fill-yellow-500 text-yellow-500 mr-2" />
                    <span>Top Reviewer</span>
                  </li>
                  <li className="flex items-center">
                    <BarChart2 className="h-5 w-5 text-blue-500 mr-2" />
                    <span>Data Enthusiast</span>
                  </li>
                  <li className="flex items-center">
                    <User className="h-5 w-5 text-green-500 mr-2" />
                    <span>Community Pillar</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <nav className="flex justify-around items-center bg-gray-800 p-4">
        <Link to="/profile">
          <Button variant="ghost" size="icon" className="text-yellow-500">
            <User className="h-6 w-6" fill="currentColor" />
          </Button>
        </Link>
        <Link to="/statistics">
          <Button variant="ghost" size="icon">
            <BarChart2 className="h-6 w-6" />
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
