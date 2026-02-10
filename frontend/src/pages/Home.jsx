import { useEffect } from "react"
import { useBookStore } from "../store/useBookStore"
import { CirclePlus, RefreshCw, BookOpen } from 'lucide-react'
import BookCard from "../components/BookCard"
import AddBookModal from "../components/AddBookModal"
import EditBookModal from "../components/EditBookModal"

function Home() {

  const { books, loading, error, fetchBooks } = useBookStore()

  useEffect(() => {
    fetchBooks()
  }, [fetchBooks])

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <button className="btn btn-primary rounded-3xl"
        onClick={() => document.getElementById("add-book-modal").showModal()}>
          <CirclePlus className="size-5" />
          <span className="font-comfortaa">Добавить книгу</span>
        </button>
        <button className="btn btn-ghost btn-circle" onClick={fetchBooks}>
          <RefreshCw className="size-5" />
        </button>
      </div>

      <AddBookModal />
      <EditBookModal />

      {error && <div className="alert alert-error mb-8">{error}</div>}
      
      {books.length === 0 && !loading && (
        <div className="flex flex-col justify-center items-center h-96 space-y-4">
          <div className="bg-base-100 rounded-full p-6">
            <BookOpen className="size-12" />
          </div>
          <div className="text-center space-y-2 font-comfortaa">
            <h3 className="text-2xl font-semibold ">Пока пусто</h3>
            <p className="text-gray-500 max-w-sm">
              Добавьте первую книгу в свой список
            </p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
        <div className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(books) && books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </main>
  )
}

export default Home
