import { useState } from "react"
import { Moon, Sun, Bell, Globe, Lock, BarChart2, Star, User, Users, Settings as SettingsIcon  } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Link } from "react-router-dom"
import { useTheme } from "@/components/ThemeProvider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { useAuth } from "../context/AuthContext.jsx";



type PrivacyMode = 'public' | 'private';
type Language = 'english' | 'spanish';

export default function Settings() {
  const { setTheme } = useTheme()
  const { logout } = useAuth()
  const [notifications, setNotifications] = useState<boolean>(true);
  const [language, setLanguage] = useState<Language>('english');
  const [privacyMode, setPrivacyMode] = useState<PrivacyMode>('public');

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <main className="flex-1 p-4 space-y-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">Settings</CardTitle>
            <CardDescription className="text-gray-300">Manage your app preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">Appearance</h3>
              <div className="flex items-center justify-start gap-4">
                <Label htmlFor="theme-toggle" className="text-gray-200">Theme</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      System
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">Notifications</h3>
              <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                  <Label htmlFor="notifications-toggle" className="text-gray-200">Enable Notifications</Label>
                  <Bell className="h-4 w-4 text-white" />
                </div>
                <Switch
                  id="notifications-toggle"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">Language</h3>
              <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-gray-200">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Español</SelectItem>
                  <SelectItem value="french">Français</SelectItem>
                  <SelectItem value="german">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">Privacy</h3>
              <RadioGroup value={privacyMode} onValueChange={(value) => setPrivacyMode(value as PrivacyMode)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="public" className="border-gray-400 text-blue-500" />
                  <Label htmlFor="public" className="text-gray-200">Public Profile</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="friends" id="friends" className="border-gray-400 text-blue-500" />
                  <Label htmlFor="friends" className="text-gray-200">Friends Only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="private" className="border-gray-400 text-blue-500" />
                  <Label htmlFor="private" className="text-gray-200">Private</Label>
                </div>
              </RadioGroup>
            </div>

            <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold">Save Changes</Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white">Account Settings</CardTitle>
            <CardDescription className="text-gray-300">Manage your account details and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full justify-start text-gray-400 border-gray-600 hover:bg-blue-500 hover:text-white hover:border-blue-600 transition-all"
            >
              <Lock className="mr-2 h-4 w-4" />
              Change Password
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start text-gray-400 border-gray-600 hover:bg-green-500 hover:text-white hover:border-green-600 transition-all"
              onClick={()=> logout()}
            >
              <Globe className="mr-2 h-4 w-4" />
              Log out
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start text-red-400 border-gray-600 hover:bg-red-600 hover:text-white hover:border-red-700 transition-all"
            >
              Delete Account
            </Button>
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
          <Button variant="ghost" size="icon">
            <Users className="h-6 w-6" />
          </Button>
        </Link>
        <Link to="/settings">
          <Button variant="ghost" size="icon" className="text-yellow-500">
            <SettingsIcon className="h-6 w-6" fill="currentColor" />
          </Button>
        </Link>
      </nav>
    </div>
  )
}