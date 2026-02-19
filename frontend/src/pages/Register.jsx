import validator from "email-validator"
import toast from "react-hot-toast"
import { useAuthStore } from "../store/useAuthStore"
import { useNavigate, Link } from "react-router-dom"

const Register = () => {

  const { formData, setFormData, register, loading } = useAuthStore()
  const navigate = useNavigate()
  const emailInput = document.getElementById("emailInput")

  const handleSubmit = async(e) => {
    e.preventDefault()
    if (validator.validate(formData.email)) {
      const success = await register(formData)
      if (success) {
        navigate('/check-inbox',  { state: { email: formData.email } })
      }
    } else {
      emailInput.classList.add("input-error")
      toast.error("Пожалуйста, проверьте адрес почты")
      setTimeout(() => {
        emailInput.classList.remove("input-error")
      }, 4000)
    }
  }

  return (

    <main className="max-w-6xl mx-auto px-4 py-8 font-comfortaa flex justify-center">
      <form onSubmit={handleSubmit}>
        <div className="form-conrol mb-3">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend text-2xl">Регистрация</legend>

            <label className="label text-lg">Имя</label>
            <input 
            type="text" 
            className="input" 
            placeholder="Как к Вам обращаться?"
            value={formData.username} 
            onChange={(e) => setFormData({...formData, username: e.target.value })}/>

            <label className="label text-lg">Почта</label>
            <input 
            type="email" 
            className="input"
            id="emailInput" 
            placeholder="vasyapupkin@yandex.ru"
            value={formData.email} 
            onChange={(e) => setFormData({...formData, email: e.target.value })} />

            <label className="label text-lg">Пароль</label>
            <input 
            type="password" 
            className="input" 
            placeholder="Ваш список — только Ваш"
            value={formData.password} 
            onChange={(e) => setFormData({...formData, password: e.target.value })} />
          </fieldset>
        </div>
        <div className="form-conrol mb-3 flex flex-col items-center">
          <button
              type="submit"
              className="btn btn-primary min-w-30"
              disabled={ !formData.username || !formData.email || !formData.password || loading }
              >
              {loading ? (
                  <span className="loading loading-spinner loading-sm" />
              ) : (
                  <span>Зарегистрироваться</span>
              )}    
          </button>
          <p className="mt-4">
            Уже есть аккаунт?
            <Link to="/login"> 
              <span className="link ms-2 hover:opacity-80 tranisiton-opacity">
                Войти
              </span>
            </Link>
          </p>
        </div>
      </form>
    </main>
  )
}

export default Register
