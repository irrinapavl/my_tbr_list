import { useBookStore } from "../store/useBookStore"
import { Check } from 'lucide-react';

function CommentBookModal() {
    
  const { commentBook, commentData, setCommentData, loading } = useBookStore()

  return (
    <dialog id="comment-book-modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle 
          btn-ghost absolute right-2 top-2">X</button>
        </form>

        <h3 className="font-bold font-comfortaa text-xl mb-5">
          Ваш отзыв о книге
        </h3>

        <form onSubmit={(e) => {
          e.preventDefault()
          commentBook()
          }}>
          <div className="grip gap-6 font-comfortaa">
            <div className="form-conrol mb-3">
              <textarea 
                type="text"
                className="input input-bordered w-full h-96 py-3 
                focus:input-primary transition-colors duration-200"
                value={commentData.comment ?? ""}
                onChange={(e) => setCommentData({ ...commentData, comment: e.target.value })} />
            </div>
          </div>
          <div className="modal-action">
            <button
              type="submit"
              className="btn btn-primary min-w-30"
              disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                <Check className="size-5" />
                <span className="font-comfortaa">Сохранить</span>
                </>
              )}    
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button></button>
      </form>
    </dialog>
  )
}

export default CommentBookModal
