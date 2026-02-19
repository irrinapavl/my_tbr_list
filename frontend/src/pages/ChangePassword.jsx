import { useAuthStore } from "../store/useAuthStore"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const ChangePassword = () => {

  const { formData, setFormData, changePass, loading } = useAuthStore()
  const navigate = useNavigate()
  const oldPassRef = useRef(null)
  const newPassRef = useRef(null)
  const newPassRef2 = useRef(null)

  const handleSubmit = async(e) => {
    e.preventDefault();

    [oldPassRef, newPassRef, newPassRef2].forEach(ref => {
      ref.current?.classList.remove('input-error')
    })

    if (formData.newPass !== formData.newPass2) {
      newPassRef.current?.classList.add('input-error')
      newPassRef2.current?.classList.add('input-error')
      toast.error('Пароли не совпадают')
      setTimeout(() => {
        [newPassRef, newPassRef2].forEach(ref => {
          ref.current?.classList.remove('input-error')
        })
      }, 4000)
      return
    }

    const success = await changePass({
      oldPass: formData.oldPass,
      newPass: formData.newPass
    })

    if (success) {
      toast.success('Пароль успешно изменен!')
      setFormData({...formData, oldPass: '', newPass: '', newPass2: ''})
    } else {
      toast.error('Неверный старый пароль')
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 font-comfortaa flex flex-col items-center">
      <form onSubmit={handleSubmit}>
        <div className="form-conrol mb-3">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend text-2xl">Изменить пароль</legend>

            <label className="label text-lg">Старый пароль</label>
            <input 
            type="password" 
            className="input text-lg"
            ref={oldPassRef}
            value={formData.oldPass} 
            onChange={(e) => setFormData({...formData, oldPass: e.target.value })} />

            <label className="label text-lg">Новый пароль</label>
            <input 
            type="password" 
            className="input text-lg"
            ref={newPassRef}
            value={formData.newPass} 
            onChange={(e) => setFormData({...formData, newPass: e.target.value })} />

            <label className="label text-lg">Повторите новый пароль</label>
            <input 
            type="password" 
            className="input text-lg"
            ref={newPassRef2}
            value={formData.newPass2} 
            onChange={(e) => setFormData({...formData, newPass2: e.target.value })} />

          </fieldset>
        </div>
        <div className="form-conrol mb-3 flex flex-col items-center">
          <button
              type="submit"
              className="btn btn-primary w-35"
              disabled={ !formData.oldPass || !formData.newPass || !formData.newPass2 || loading }
              >
              {loading ? (
                  <span className="loading loading-spinner loading-sm" />
              ) : (
                  <span>Готово</span>
              )}    
          </button>
        </div>
      </form>
      <button 
          className="btn btn-primary btn-outline w-35"
          onClick={() => navigate('/')}>
            На главную
      </button>
    </main>
  )
}

export default ChangePassword