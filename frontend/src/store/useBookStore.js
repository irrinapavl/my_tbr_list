import { create } from 'zustand'
import axios from 'axios'
import toast from 'react-hot-toast'

const BASE_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const useBookStore = create((set, get) => ({
    books: [],
    loading: false,
    error: null,  
    formData: {
        name: "",
        author: "",
        cover: ""
    },

    setFormData: (formData) => set({ formData }),
    resetForm: () => set({ 
        formData: { 
            id: null,
            name: "", 
            author: "", 
            cover: "" 
        }
    }),

    addBook: async (e) => {
        e.preventDefault()
        set({ loading: true })
        try {
            const { formData } = get()
            await api.post(`/api/mybooks`, formData)
            await get().fetchBooks()
            get().resetForm()
            toast.success("Книга успешно добавлена в список!")
            document.getElementById("add-book-modal").close()
        } catch (err) {
            console.log("Error adding a book", err)
            toast.error("Извините, что-то пошло не так")
        } finally {
            set({ loading: false })
        }
    },

    editBook: async () => {
        set({ loading: true })
        try {
            const { formData } = get()
            await api.put(`/api/mybooks/${formData.id}`, formData)
            await get().fetchBooks()
            get().resetForm()
            toast.success("Книга успешно отредактирована!")
            document.getElementById("edit-book-modal").close()
        } catch (err) {
            console.log("Error editing a book", err)
            toast.error("Извините, что-то пошло не так")
        } finally {
            set({ loading: false })
        }
    },

    fetchBooks: async () => {
        set({ loading: true })
        try {
            const response = await api.get(`/api/mybooks`)
            set({ books: response.data.data, error: null })
        } catch (err) {
            if (err.status == 429) set({ error: "Rate limit exceeded", books: [] })
            else set({ error: "Извините, что-то пошло не так", books: [] })
        } finally {
            set({ loading: false })
        }
    },
    
    deleteBook: async (id) => {
        set({ loading: true })
        try {
            await api.delete(`/api/mybooks/${id}`)
            set((prev) => ({ books: prev.books.filter((book) => book.id !== id)}))
            toast.success("Книга успешно удалена из списка")
        } catch (err) {
            console.log("Error deleting a book", err)
            toast.error("Что-то пошло не так")
        } finally {
            set({ loading: false })
        }
    }
}))