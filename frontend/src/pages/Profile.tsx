import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { BarChart2, Edit, Star, User, Users, Settings } from "lucide-react"
import { Link } from "wouter"

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
        <Card className="bg-gray-800">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <div className="flex flex-col space-y-1 flex-1">
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.username}</CardDescription>
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
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    value={user.name}
                    onChange={(e) => setUser({...user, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username" 
                    value={user.username}
                    onChange={(e) => setUser({...user, username: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    value={user.bio}
                    onChange={(e) => setUser({...user, bio: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                  />
                </div>
                <Button type="submit">Save</Button>
              </form>
            ) : (
              <>
                <p className="mb-4">{user.bio}</p>
                <Button onClick={() => setIsEditing(true)} className="w-full">
                  <Edit className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="stats">Stats</TabsTrigger>
            <TabsTrigger value="ratings">Ratings</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>
          <TabsContent value="stats">
            <Card className="bg-gray-800">
              <CardHeader>
                <CardTitle>User Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
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
            <Card className="bg-gray-800">
              <CardHeader>
                <CardTitle>Recent Ratings</CardTitle>
              </CardHeader>
              <CardContent>
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
            <Card className="bg-gray-800">
              <CardHeader>
                <CardTitle>User Achievements</CardTitle>
              </CardHeader>
              <CardContent>
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
        <Link href="/profile">
          <Button variant="ghost" size="icon" className="text-yellow-500">
            <User className="h-6 w-6" fill="currentColor" />
          </Button>
        </Link>
        <Link href="/statistics">
          <Button variant="ghost" size="icon">
            <BarChart2 className="h-6 w-6" />
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
