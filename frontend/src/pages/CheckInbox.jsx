import { Mail } from "lucide-react"
import { useLocation } from "react-router-dom"
import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore"
import toast from "react-hot-toast"


const CheckInbox = () => {
  const location = useLocation()
  const email = location.state?.email
  const { resendVerification, loading } = useAuthStore()
  const [resent, setResent] = useState(false)

  const handleResend = async () => {
    if (!email) {
      toast.error('Email не найден')
      return
    }
    const success = await resendVerification(email)
    if (success) {
      setResent(true)
      setTimeout(() => setResent(false), 60000)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col 
    items-center font-comfortaa">
        <div className="card w-150 bg-base-100 shadow-xl">
          <div className="p-3 flex flex-col items-center">
            <p className="text-xl/8 text-center text-primary">
              Спасибо за регистрацию!<br />
              Мы отправили Вам письмо для подтверждения 
              адреса электронной почты {email} — пожалуйста, 
              проверьте Ваш ящик</p>
              <Mail className="size-10 mt-3 text-secondary" />
          </div>
          <div className="flex flex-col items-center pb-3">
            <p>
            Не пришло письмо? 
            </p>
            <button
              className="btn btn-primary mt-1"
              onClick={handleResend}
              disabled={loading || resent}>
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : resent ? (
                'Письмо отправлено'
              ) : (
                'Отправить снова'
              )}
            </button>
          </div>
        </div>
    </div>
  )
}

export default CheckInbox