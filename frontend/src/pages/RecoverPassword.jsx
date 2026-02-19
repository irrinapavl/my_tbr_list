import validator from "email-validator"
import { useAuthStore } from "../store/useAuthStore"
import toast from "react-hot-toast"

const RecoverPassword = () => {

  const { formData, setFormData, sendRecoveryEmail, loading } = useAuthStore()

  const handleSubmit = async(e) => {
    e.preventDefault()
    if (validator.validate(formData.email)) {
      await sendRecoveryEmail(formData)
    } else {
      toast.error("Пожалуйста, проверьте адрес почты")
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 font-comfortaa flex flex-col items-center">
      <p className="text-xl/8 text-center text-primary w-200">
        Пожалуйста, введите адрес электронной почты, который указывали при регистрации —
        мы отправим Вам письмо с ссылкой для восстановления пароля
      </p>
      <form className="mt-5 flex flex-col items-center gap-3" onSubmit={handleSubmit}>
        <label className="label text-lg">Ваша почта</label>
        <input 
          type="email" 
          className="input" 
          value={formData.email} 
          onChange={(e) => setFormData({...formData, email: e.target.value })} />
        <button
          type="submit"
          className="btn btn-primary w-33 h-8 mt-1"
          disabled={ !formData.email || loading }>
          {loading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            <span>Отправить</span>
          )}    
        </button>
      </form>
    </main>
  )
}

export default RecoverPassword