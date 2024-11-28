import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "@/api/auth"
import Cookies from 'js-cookie'

export const AuthContext = createContext()

export const useAuth = () =>{
  const context = useContext(AuthContext)
  if(!context) {
    throw new Error("useAuth error")
  }
  return context
}

export const AuthProvider = ({children}) => {
  const [ user,setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(true)


  const signup = async (user) =>{
    try {
      const res = await registerRequest(user)
      console.log(res);
      
    setUser(res.data)
    setIsAuthenticated(true)
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  const signin = async (user) => {
    try {
      const res = await loginRequest(user)
      setUser(res.data)
      setIsAuthenticated(true)
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  const logout = async () => {
    Cookies.remove('access_token')
    setIsAuthenticated(false)
    setLoading(false)
    return setUser(null)
  }

  useEffect(()=> {
    if (errors.length > 0){
      const timer = setTimeout(()=>{
        setErrors([])
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [errors])

  useEffect(()=>{
    async function checkLogin(){
      const cookies = Cookies.get()
      if(!cookies.access_token){
        setIsAuthenticated(false)
        setLoading(false)
        return setUser(null)
      }
        try {
          const res = await verifyTokenRequest(cookies.access_token)
          if(!res.data){
            setIsAuthenticated(false)
            setLoading(false)
          }
          setIsAuthenticated(true)
          setUser(res.data)
          setLoading(false)
        } catch (error) {
          setIsAuthenticated(false)
          setUser(null)
          setLoading(false)
        }
    }
    checkLogin()
  }, [])

  return (
    <AuthContext.Provider value={{
      signup,
      signin,
      user,
      isAuthenticated,
      errors,
      loading,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}