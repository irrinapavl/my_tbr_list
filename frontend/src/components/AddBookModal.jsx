import { useBookStore } from "../store/useBookStore"
import { Book, UserRoundPen, BookImage, CirclePlus } from 'lucide-react';

function AddBookModal() {
    const { addBook, formData, setFormData, loading } = useBookStore()
    
    return (
        <dialog id="add-book-modal" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle 
                    btn-ghost absolute right-2 top-2">X</button>
                </form>

                <h3 className="font-bold font-comfortaa text-xl mb-5">
                    Добавить новую книгу в список
                </h3>

                <form onSubmit={addBook}>
                    <div className="grip gap-6 font-comfortaa">
                        <div className="form-conrol mb-3">
                            <label className="label">
                                <span className="label-text text-base font-medium">
                                    Название книги
                                </span>
                            </label>
                            <div className="relative mt-2">
                                <div className="absolute z-1 inset-y-0 left-0 pl-3 flex 
                                items-center pointer-events-none text-base-content/50">
                                    <Book className="size-5" />
                                </div>
                                <input 
                                    type="text"
                                    className="input input-bordered w-full pl-10 py-3 
                                    focus:input-primary transition-colors duration-200"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value })} />
                            </div>
                        </div>
                        <div className="form-conrol mb-3">
                            <label className="label">
                                <span className="label-text text-base font-medium">
                                    Автор
                                </span>
                            </label>
                            <div className="relative mt-2">
                                <div className="absolute z-1 inset-y-0 left-0 pl-3 flex 
                                items-center pointer-events-none text-base-content/50">
                                    <UserRoundPen className="size-5" />
                                </div>
                                <input 
                                    type="text"
                                    className="input input-bordered w-full pl-10 py-3 
                                    focus:input-primary transition-colors duration-200"
                                    value={formData.author}
                                    onChange={(e) => setFormData({...formData, author: e.target.value })} />
                            </div>
                        </div>
                        <div className="form-conrol mb-3">
                            <label className="label">
                                <span className="label-text text-base font-medium">
                                    Обложка
                                </span>
                            </label>
                            <div className="relative mt-2">
                                <div className="absolute z-1 inset-y-0 left-0 pl-3 flex 
                                items-center pointer-events-none text-base-content/50">
                                    <BookImage className="size-5" />
                                </div>
                                <input 
                                    type="text"
                                    placeholder="https://example.com/image.png"
                                    className="input input-bordered w-full pl-10 py-3 
                                    focus:input-primary transition-colors duration-200"
                                    value={formData.cover}
                                    onChange={(e) => setFormData({...formData, cover: e.target.value })} />
                            </div>
                        </div>
                    </div>
                    <div className="modal-action">
                        <button
                            type="submit"
                            className="btn btn-primary min-w-30"
                            disabled={ !formData.name || !formData.author || !formData.cover || loading }
                            >
                            {loading ? (
                                <span className="loading loading-spinner loading-sm" />
                            ) : (
                                <>
                                    <CirclePlus className="size-5 mr-2" />
                                    <span className="font-comfortaa">Добавить</span>
                                </>
                            )}    
                        </button>
                    </div>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

export default AddBookModal
