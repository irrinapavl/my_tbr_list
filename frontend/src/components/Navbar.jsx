import { Link } from 'react-router-dom'
import ThemeSelector from "./ThemeSelector.jsx";
import { useAuthStore } from '../store/useAuthStore.js';
import { BookOpenText, LibraryBig } from 'lucide-react';

function Navbar() {

  const { user, logout } = useAuthStore()

  return (
    <div className="bg-base-100/80 backdrop-blur-lg 
    border-b border-base-content sticky top-0 z-50">
      <div className="max-w-6xl mx-auto">
        <nav className="navbar px-4 min-h-16 justify-between">
          {/* LOGO */}
          <div className="flex-1 lg:flex-none">
            <Link to="/" className="hover:opacity-80 tranisiton-opacity">
              <div className="flex items-center gap-2">
                <BookOpenText className="size-9 text-primary me-1" />
                <span className="font-bold font-comfortaa text-2xl bg-clip-text text-transparent 
                bg-linear-to-r from-primary to-secondary">
                  Мой список книг
                </span>
              </div>
            </Link>
          </div>
          {/* RIGHT SECTION */}
          <div className="flex items-center gap-4">
            {user && (
              <button 
              className='btn btn-primary' 
              onClick={logout}>
                <Link to='/' className='font-comfortaa'>Выйти из аккаунта</Link>
              </button>
            )}
            <ThemeSelector />
            {user && (
              <div className="indicator">
                <div className="p-2 rounded-full hover:bg-base-200 
                transition-colors cursor-pointer">
                  <LibraryBig className="size-5 btn-ghost" />
                  <span className="badge badge-sm badge-primary indicator-item">0</span>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
