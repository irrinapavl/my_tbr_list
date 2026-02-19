import { useBookStore } from "../store/useBookStore"

const StarRating = ({ book }) => {

  const { updateRating } = useBookStore()

  const handleRatingUpdate = (value) => {
    updateRating(book.id, value)
  }
  
  return (
    <div className="rating gap-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <input 
        key={value}
        type="radio"
        name={`${book.id}-rating`}
        value={value}
        className="mask mask-star-2 bg-primary"
        aria-label={`${value} star`}
        checked={book.rating === value}
        onChange={() => handleRatingUpdate(value)}/>
      ))}
    </div>
  )
}

export default StarRating