import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

const VerifyEmail = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { verifyEmail } = useAuthStore()
  const [status, setStatus] = useState('verifying')
  const verified = useRef(false)

  useEffect(() => {
    const controller = new AbortController()
    if (verified.current) return
    verified.current = true

    const token = searchParams.get('token')
    if (!token) {
      setStatus('error')
      return
    }

    verifyEmail(token, controller.signal)
      .then((success) => {
        if (success) {
          setStatus('success')
          setTimeout(() => navigate('/login'), 5000)
        } else {
          setStatus('error')
        }
      })
      .catch(() => setStatus('error'));
    return () => controller.abort()
  }, [searchParams, verifyEmail, navigate])

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 flex flex-col items-center font-comfortaa">
      <div className="card w-110 bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          {status === 'success' && (
            <>
            <div className="text-success text-6xl">✓</div>
            <h2 className="text-xl text-primary">Адрес электронной почты успешно подтвержден!</h2>
            <p className="text-lg mt-1 text-secondary">Перенаправляем Вас для входа в акканут...</p>
            </>
          )}
          {status === 'error' && (
          <>
          <div className="text-error text-6xl">✗</div>
          <h2 className="text-xl text-primary">Не удалось подтвердить адрес электронной почты</h2>
          <p className="text-lg mt-1 text-secondary">Ссылка недействительна</p>
          <button 
              className="btn btn-primary mt-4 h-8"
              onClick={() => navigate('/')}>
              На главную
          </button>
          </>
          )}
        </div>
      </div>
    </main>
  )
}

export default VerifyEmail