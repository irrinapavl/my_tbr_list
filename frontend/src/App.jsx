import { Routes, Route } from "react-router-dom"
import { useThemeStore } from "./store/useThemeStore"
import { useAuthStore } from "./store/useAuthStore"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Default from "./pages/Default"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Library from "./pages/Library"
import { Toaster } from 'react-hot-toast';
import { useEffect } from "react"

function App() {
  const { theme } = useThemeStore()
  const { getUser } = useAuthStore()

  useEffect(() => {
    getUser()
  }, [getUser])

  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300" data-theme={ theme }>
      <Navbar />
        <Routes>
          <Route path="/" element={<Default />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mybooks" element={<Home /> } />
          <Route path="/library" element={<Library /> } />
          <Route path="*" element={<Default />} />
        </Routes>
      <Toaster />
    </div>
  )
}

export default App
