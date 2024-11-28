import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserProfile from "./pages/Profile";
import StatsGraph from "./pages/Statistics";
import FriendsManagement from "./pages/Friends";
import Settings from "./pages/Settings";
import CreateNewRating from "./pages/CreateNewRating";
import Login from "./pages/Login"
import { ThemeProvider } from "@/components/ThemeProvider"
import { AuthProvider } from "@/context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute";
import 'react-toastify/dist/ReactToastify.css';
const App = () => (
  <ThemeProvider>
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
      <Route element={<ProtectedRoute/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/newrating" element={<CreateNewRating/>}/>
        <Route path="/profile" element={<UserProfile/>} />
        <Route path="/statistics" element={<StatsGraph/>}/>
        <Route path="/friends" element={<FriendsManagement/>}/>
        <Route path="/settings" element={<Settings/>}/>
      </Route>
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  </ThemeProvider>
);

export default App
