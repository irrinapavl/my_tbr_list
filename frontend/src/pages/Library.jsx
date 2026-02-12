import { useEffect } from "react"
import { useBookStore } from "../store/useBookStore"
import BookCard from "../components/BookCard"
import { BookOpen } from "lucide-react"
import EditBookModal from "../components/EditBookModal"

const Library = () => {

    const { books, loading, getLibBooks } = useBookStore()

    useEffect(() => {
        getLibBooks()
    }, [getLibBooks])

    return (
        <main className="max-w-6xl mx-auto px-4 py-8">
            {books.length === 0 && !loading && (
            <div className="flex flex-col justify-center items-center h-96 space-y-4">
                <div className="bg-base-100 rounded-full p-6">
                    <BookOpen className="size-12" />
                </div>
                <div className="text-center space-y-2 font-comfortaa">
                    <h3 className="text-2xl font-semibold ">Пока пусто</h3>
                    <p className="text-xl text-gray-500 max-w-md">
                        Добавляйте сюда прочитанные книги из списка запланированных!
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
            <EditBookModal />
        </main>
    )
}

export default Library