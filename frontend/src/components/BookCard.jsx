import { SquarePen, Trash2, Check, Undo2 } from 'lucide-react';
import StarRating from './StarRating.jsx';
import { useBookStore } from '../store/useBookStore';
import { useResolvedPath } from 'react-router-dom';

function BookCard({ book }) {

  const { pathname } = useResolvedPath()
  const isLibrary = pathname === "/library"
  const { deleteBook, moveToLib, moveToHome, setFormData, getLibCount } = useBookStore()

  const handleEditClick = () => {
    setFormData({
      id: book.id,
      name: book.name,
      author: book.author,
      cover: book.cover
    })
    document.getElementById("edit-book-modal").showModal()
  }

  const handleMoveToLib = async () => {
    await moveToLib(book.id)
    await getLibCount()
  }

  const handleMoveToHome = async () => {
    await moveToHome(book.id)
    await getLibCount()
  }

  const handleDeleteBook = async () => {
    await deleteBook(book.id)
    await getLibCount()
  }

  return (
    <div className="card bg-base-100 w-70">

      <figure>
        <img 
        src={book.cover} 
        alt={book.name}
        className="h-105 w-70"/>
      </figure>

      <div className="flex flex-col justify-center items-center text-center p-3 mt-4">
        <h2 className="text-4xl font-caveat font-bold">{book.name}</h2>
        <p className="text-xl font-bold font-comfortaa text-primary mt-3">{book.author}</p>
        <div className="my-3">
          {isLibrary && (
            <StarRating book={book} />
          )}
        </div>
      </div>

      <div className="card-actions justify-between pb-3 px-3 mt-auto">
        <div className="justify-end">
          {isLibrary ? (
          <div 
            className="tooltip tooltip-primary tooltip-bottom font-comfortaa" 
            data-tip="Вернуть в список">
              <button className="btn btn-sm btn-primary btn-outline">
                <Undo2 className="size-4" onClick={handleMoveToHome}/>
              </button>
          </div>
          ) : (
          <div 
            className="tooltip tooltip-success tooltip-bottom font-comfortaa" 
            data-tip="Переместить в библиотеку">
              <button className="btn btn-sm btn-success btn-outline">
                <Check className="size-4" onClick={handleMoveToLib}/>
              </button>
          </div>
          )}
          <div 
            className="tooltip tooltip-info tooltip-bottom font-comfortaa ms-2" 
            data-tip="Редактировать">
              <button className="btn btn-sm btn-info btn-outline">
                <SquarePen className="size-4" onClick={handleEditClick}/>
              </button>
          </div>
        </div>
        <div 
          className="tooltip tooltip-error tooltip-bottom font-comfortaa" 
          data-tip="Удалить">
            <button className='btn btn-sm btn-error btn-outline'>
              <Trash2 className='size-4' onClick={handleDeleteBook} />
            </button>
        </div>
      </div>

    </div>
  )
}

export default BookCard
