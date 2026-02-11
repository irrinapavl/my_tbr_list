import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:5000"

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const useAuthStore = create((set, get) => ({
    user: null,
    loading: false,
    error: null,
    formData: {
        username: "",
        email: "",
        password: ""
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
            set({ user: response.data.user })
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
            console.log('Not authenticated')
            set({ user: null })
        } finally {
            set({ loading: false })
        }
    }
}))
