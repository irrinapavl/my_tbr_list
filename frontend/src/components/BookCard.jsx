import { Link } from 'react-router-dom'
import { SquarePen, Trash2 } from 'lucide-react';
import { useBookStore } from '../store/useBookStore';

function BookCard({ book }) {

  const { deleteBook, setFormData } = useBookStore()

  const handleEditClick = () => {
    setFormData({
      id: book.id,
      name: book.name,
      author: book.author,
      cover: book.cover
    })
    document.getElementById("edit-book-modal").showModal()
  }

  return (
    <div className="card bg-base-100 shadow-xl 
    hover:shadow-2-xl transition-shadow duration-300">

      <figure className="relative bg-white h-96">
        <img 
        src={book.cover} 
        alt={book.name}
        className="absoulte top-0 left-0 h-80 object-contain" />
      </figure>

      <div className="card-body flex-col items-center text-center">
        <h2 className="card-title text-5xl font-caveat">{book.name}</h2>
        <p className="text-2xl font-bold font-comfortaa text-primary mt-3">{book.author}</p>
      </div>

      <div className="card-actions justify-end pe-4 pb-4">
        <div 
        className="tooltip tooltip-info tooltip-bottom font-comfortaa me-1" 
        data-tip="Редактировать">
          <button className="btn btn-sm btn-info btn-outline">
            <SquarePen className="size-4" onClick={handleEditClick}/>
        </button>
        </div>
        <div 
        className="tooltip tooltip-error tooltip-bottom font-comfortaa me-1" 
        data-tip="Удалить">
          <button className='btn btn-sm btn-error btn-outline'>
            <Trash2 className='size-4' onClick={() => deleteBook(book.id)} />
        </button>
        </div>
      </div>

    </div>
  )
}

export default BookCard
