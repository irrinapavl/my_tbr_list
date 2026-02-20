import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ThemeSelector from "./ThemeSelector.jsx"
import { useAuthStore } from '../store/useAuthStore.js'
import { BookOpenText, LibraryBig, KeyRound } from 'lucide-react'
import { useResolvedPath } from 'react-router-dom'
import { useBookStore } from '../store/useBookStore.js'

function Navbar() {

  const { pathname } = useResolvedPath()
  const isLibrary = pathname === "/library"
  const isCheckInbox = pathname === "/check-inbox"
  const isVerifyEmail = pathname === "/verify-email"
  const isChangePassword = pathname === "/change-password"
  const { user, logout } = useAuthStore()
  const { libCount, getLibCount } = useBookStore()

  useEffect(() => {
    getLibCount()
  }, [getLibCount])

  return (
    <div className="bg-base-100/80 backdrop-blur-lg 
    border-b border-base-content sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <nav className="navbar px-4 min-h-16 justify-between">
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
          {(isLibrary || isChangePassword) && (
            <button className='btn btn-primary btn-outline ms-7'>
              <Link to='/my-tbr-list' className='font-comfortaa'>К списку книг</Link>
            </button>
          )}
          <div className="flex gap-4">
            {(user && !isChangePassword) && (
              <div className="indicator">
                <div 
                  className="p-2 rounded-full hover:bg-base-200 transition-colors 
                  cursor-pointer tooltip tooltip-primary tooltip-left font-comfortaa"
                  data-tip="Изменить пароль">
                    <Link to='/change-password'>
                      <KeyRound className="btn-ghost"/>
                    </Link>
                </div>
              </div>
              )}
            {(user &&
              <button 
              className='btn btn-secondary btn-outline' 
              onClick={logout}>
                <Link to='/' className='font-comfortaa'>Выйти из аккаунта</Link>
              </button>
            )}
            <ThemeSelector />
            {(user && !isLibrary && !isCheckInbox && !isVerifyEmail) && (
              <div className="indicator">
                <div 
                  className="p-2 rounded-full hover:bg-base-200 transition-colors 
                  cursor-pointer tooltip tooltip-primary tooltip-right font-comfortaa"
                  data-tip="Библиотека прочитанного">
                    <Link to='/library'><LibraryBig className="btn-ghost" /></Link>
                  <span className="badge badge-sm badge-primary indicator-item">{libCount}</span>
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
