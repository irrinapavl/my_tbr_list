import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore"
import { useNavigate, Link } from "react-router-dom"

const Login = () => {

  const { login, loading } = useAuthStore()
  const navigate = useNavigate()
  const [form,  setForm] = useState({ email: '', password: '' })

  const handleSubmit = async(e) => {
    e.preventDefault()
    const success = await login(form)
    if (success) navigate('/')
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 font-comfortaa flex justify-center">
      <form onSubmit={handleSubmit}>
        <div className="form-conrol mb-3">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend text-2xl">Вход в аккаунт</legend>

            <label className="label text-lg">Почта</label>
            <input 
            type="email" 
            className="input" 
            value={form.email} 
            onChange={(e) => setForm({...form, email: e.target.value })} />

            <label className="label text-lg mt-2">Пароль</label>
            <input 
            type="password" 
            className="input" 
            value={form.password} 
            onChange={(e) => setForm({...form, password: e.target.value })} />
          </fieldset>
        </div>
        <div className="form-conrol flex flex-col items-center">
          <button
              type="submit"
              className="btn btn-primary min-w-30"
              disabled={ !form.email || !form.password || loading }
              >
              {loading ? (
                  <span className="loading loading-spinner loading-sm" />
              ) : (
                  <span>Войти</span>
              )}    
          </button>
        </div>
        <div className="flex flex-col items-center">
          <p className="mt-4">
          Нет аккаунта? 
          <Link to="/register">
            <span className="link ms-2 hover:opacity-80 tranisiton-opacity">
              Регистрация
            </span>
          </Link>
          </p>
          <button 
            type="button"
            className="btn btn-primary btn-outline h-7 mt-2"
            onClick={() => navigate('/recover-password')}>
              Забыли пароль?
          </button>
        </div>
      </form>
    </main>
  )
}

export default Login
