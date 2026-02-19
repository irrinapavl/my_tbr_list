import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:5000"

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: false,
  error: null,
  formData: {
    username: "",
    email: "",
    password: "",
    oldPass: "",
    newPass: "",
    newPass2: ""
  },

  setFormData: (formData) => set({ formData }),
  resetForm: () => set({ 
    formData: { 
      username: "", 
      email: "", 
      password: "" 
    }
  }),

  register: async (userData) => {
    set({ loading: true, error: null })
    try {
      const response = await api.post(`/api/auth/register`, userData)
      set({ user: response.data.data })
      get().resetForm()
      toast.success('Регистрация прошла успешно!')
      return true
    } catch (err) {
      set({ error: err.message })
      toast.error( 'К этой почте уже привязан аккаунт')
      return false
    } finally {
      set({ loading: false })
    }
  },

  login: async (credentials) => {
    set({ loading: true, error: null })
    try {
      const response = await api.post(`/api/auth/login`, credentials)
      set({ user: response.data.user })
      get().resetForm()
      toast.success('Вход выполнен!')
      return true
    } catch (err) {
      set({ error: err.message })
      toast.error( 'Не удалось войти в аккаунт')
      return false
    } finally {
      set({ loading: false })
    }
  },

  logout: async () => {
    try {
      await api.post('api/auth/logout')
      set({ user: null })
      toast.success('Вы успешно вышли из аккаунта!')
    } catch (err) {
      console.error(err)
    }
  },

  getUser: async () => {
    set({ loading: true })
    try {
      const response = await api.get(`/api/auth/me`)
      set({ user: response.data })
    } catch (err) {
      console.log('Not authenticated', err)
      set({ user: null })
    } finally {
      set({ loading: false })
    }
  },

  verifyEmail: async (token) => {
    set({ loading: true, error: null });
    try {
      await api.get(`/api/auth/verify-email?token=${token}`)
      return true
    } catch (err) {
      if (axios.isCancel(err)) return false
      set({ error: err.message })
      return false
    } finally {
      set({ loading: false })
    }
  },

  resendVerification: async (email) => {
    set({ loading: true, error: null });
    try {
      await api.post('/api/auth/resend-verification', email)
      toast.success('Письмо успешно отправлено')
      return true
    } catch (err) {
      set({ error: err.message })
      toast.error("Не удалось отправить письмо")
      return false
    } finally {
      set({ loading: false })
    }
  },

  changePass: async (passwordData) => {
    set({ loading: true, error: null })
    try {
      await api.put('/api/auth/change-password', passwordData)
      return true
    } catch (err) {
      set({ error: err.message })
      return false
    } finally {
      set({ loading: false })
    }
  },

  sendRecoveryEmail: async (email) => {
    set({ loading: true, error: null });
    try {
      await api.post('/api/auth/send-recovery-email', email)
      toast.success('Письмо успешно отправлено!')
      get().resetForm()
      return true
    } catch (err) {
      set({ error: err.message })
      toast.error("Пользователь не найден")
      return false
    } finally {
      set({ loading: false })
    }
  },

  verifyRecovery: async (token) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`/api/auth/verify-recovery?token=${token}`)
      return response.data.user
    } catch (err) {
      if (axios.isCancel(err)) return false
      set({ error: err.message })
      return null
    } finally {
      set({ loading: false })
    }
  },

  setNewPassword: async ({ token, newPass }) => {
    set({ loading: true, error: null })
    try {
      await api.post('/api/auth/set-new-password', { token, newPass })
      return true
    } catch (err) {
      set({ error: err.message })
      return false
    } finally {
      set({ loading: false })
    }
  }
}))
