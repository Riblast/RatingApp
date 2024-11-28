import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BarChart2, Search, Star, User, UserPlus, Users, Settings } from "lucide-react"
import { Link } from "react-router-dom"

type Friend = {
  id: string
  name: string
  username: string
  avatar: string
}

type FriendRequest = {
  id: string
  name: string
  username: string
  avatar: string
}

export default function FriendsManagement() {
  const [friends, setFriends] = useState<Friend[]>([
    { id: "1", name: "John Doe", username: "@johnd", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "2", name: "Jane Smith", username: "@janes", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "3", name: "Bob Johnson", username: "@bobj", avatar: "/placeholder.svg?height=40&width=40" },
  ])

  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([
    { id: "4", name: "Alice Brown", username: "@aliceb", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "5", name: "Charlie Green", username: "@charlieg", avatar: "/placeholder.svg?height=40&width=40" },
  ])

  const [searchTerm, setSearchTerm] = useState("")

  const handleAcceptFriend = (request: FriendRequest) => {
    setFriends([...friends, request])
    setFriendRequests(friendRequests.filter(req => req.id !== request.id))
  }

  const handleRejectFriend = (requestId: string) => {
    setFriendRequests(friendRequests.filter(req => req.id !== requestId))
  }

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    friend.username.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <main className="flex-1 p-4 space-y-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">Friends Management</CardTitle>
            <CardDescription>View and manage your friends</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="friends">
              <TabsList className="grid w-full grid-cols-2 bg-[#2a3346]">
                <TabsTrigger value="friends" className="data-[state=active]:bg-[#3a4357] data-[state=active]:text-white">Friends</TabsTrigger>
                <TabsTrigger value="requests" className="data-[state=active]:bg-[#3a4357] data-[state=active]:text-white">Friend Requests</TabsTrigger>
              </TabsList>
              <TabsContent value="friends">
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground text-white" />
                    <Input
                      placeholder="Search friends..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 border-gray-600 text-gray-400"
                    />
                  </div>
                  <ScrollArea className="h-[300px]">
                    {filteredFriends.map(friend => (
                      <div key={friend.id} className="flex items-center justify-between py-2">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={friend.avatar} alt={friend.name} />
                            <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-white">{friend.name}</p>
                            <p className="text-sm text-gray-400">{friend.username}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-white">View Profile</Button>
                      </div>
                    ))}
                  </ScrollArea>
                </div>
              </TabsContent>
              <TabsContent value="requests">
                <ScrollArea className="h-[300px]">
                  {friendRequests.map(request => (
                    <div key={request.id} className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={request.avatar} alt={request.name} />
                          <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-white">{request.name}</p>
                          <p className="text-sm text-gray-400">{request.username}</p>
                        </div>
                      </div>
                      <div className="space-x-2">
                        <Button variant="default" size="sm" onClick={() => handleAcceptFriend(request)}>Accept</Button>
                        <Button variant="outline" size="sm" onClick={() => handleRejectFriend(request.id)}>Reject</Button>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Add New Friend</CardTitle>
            <CardDescription>Search for users to add as friends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input placeholder="Search by username or email" className="flex-grow border-gray-600" />
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Friend
              </Button>
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
          <Button variant="ghost" size="icon" className="text-yellow-500">
            <Users className="h-6 w-6" fill="currentColor" />
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