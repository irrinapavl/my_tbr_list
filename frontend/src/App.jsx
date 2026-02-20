import { Routes, Route } from "react-router-dom"
import { useThemeStore } from "./store/useThemeStore"
import { useAuthStore } from "./store/useAuthStore"
import Navbar from "./components/Navbar"
import TBR from "./pages/Home"
import Welcome from "./pages/Welcome"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Library from "./pages/Library"
import { Toaster } from 'react-hot-toast';
import { useEffect } from "react"
import VerifyEmail from "./pages/VerifyEmail"
import CheckInbox from "./pages/CheckInbox"
import ChangePassword from "./pages/ChangePassword"
import RecoverPassword from "./pages/RecoverPassword"
import SetNewPassword from "./pages/SetNewPassword"
import VerifyRecovery from "./pages/VerifyRecovery"

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
          <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/check-inbox" element={<CheckInbox /> } />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recover-password" element={<RecoverPassword /> } />
          <Route path="/verify-recovery" element={<VerifyRecovery /> } />
          <Route path="/set-new-password" element={<SetNewPassword /> } />
          <Route path="/my-tbr-list" element={<TBR /> } />
          <Route path="/library" element={<Library /> } />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="*" element={<Welcome />} />
        </Routes>
      <Toaster />
    </div>
  )
}

export default App
