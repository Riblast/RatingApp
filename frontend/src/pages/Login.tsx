import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Lock, Mail } from "lucide-react"
import { useForm, SubmitHandler } from "react-hook-form"
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom"

type FormValues = {
  username: string
  email: string
  password: string
}


export default function AuthView() {
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: {
    errors
  } } = useForm<FormValues>()

  const { register: registerLogin, handleSubmit: handleSubmitLogin, formState: {
    errors: errorsLogin
  } } = useForm<FormValues>()

  const { signup, signin, isAuthenticated, errors: AuthErrors } = useAuth()

  const navigate = useNavigate()
  
  useEffect(() => {
    if(isAuthenticated) navigate('/')
  }, [isAuthenticated, navigate]);

  const handleLogin: SubmitHandler<FormValues> = (data) => {
    setIsLoading(true)
    signin(data)
    setIsLoading(false)
  }

  const handleRegister: SubmitHandler<FormValues> = (data) => {
    setIsLoading(true)
    signup(data)
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a1f2e] text-gray-100 p-4">
      {
        AuthErrors.map((error, i)=>(
          <div className="bg-red-500 p-2 text-white m-2" key={i}>
            {error}
          </div>
        ))
      }
      <Card className="w-full max-w-md bg-[#232a3b] border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Welcome to Rating App</CardTitle>
          <CardDescription className="text-center">Login or create an account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleSubmitLogin(handleLogin)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10 bg-[#1a1f2e] border-gray-600"
                      { ...registerLogin('email', { required: true })}
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  {
                    errorsLogin.email && (
                      <p className="text-red-600 text-sm font-extralight">Email is required</p>
                    )
                  }
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      className="pl-10 bg-[#1a1f2e] border-gray-600"
                      { ...registerLogin("password", { required: true })}
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  {
                    errorsLogin.password && (
                      <p className="text-red-600 text-sm font-extralight">Password is required</p>
                    )
                  }
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-username">Username</Label>
                  <div className="relative">
                    <Input
                      id="register-username"
                      type="text"
                      placeholder="Choose a username"
                      className="pl-10 bg-[#1a1f2e] border-gray-600"
                      { ...register('username', { required: true })}
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  {
                    errors.username && (
                      <p className="text-red-600 text-sm font-extralight">Username is required</p>
                    )
                  }
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <div className="relative">
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10 bg-[#1a1f2e] border-gray-600"
                      { ...register('email', { required: true })}
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  {
                    errors.email && (
                      <p className="text-red-600 text-sm font-extralight">Email is required</p>
                    )
                  }
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="Choose a strong password"
                      className="pl-10 bg-[#1a1f2e] border-gray-600"
                      { ...register("password", { required: true })}
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  {
                    errors.password && (
                      <p className="text-red-600 text-sm font-extralight">Password is required</p>
                    )
                  }
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Registering..." : "Register"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-400">
            By using this service, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}