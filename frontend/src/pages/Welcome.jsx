import { useEffect } from "react"
import { useBookStore } from "../store/useBookStore"
import { BookOpen, BookCheck, ScrollText, Pencil } from "lucide-react"
import { useAuthStore } from "../store/useAuthStore"
import { useNavigate } from "react-router-dom"

const Welcome = () => {

  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { getLibCount } = useBookStore()

  useEffect(() => {
    getLibCount()
  }, [getLibCount])

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 font-comfortaa">
      {user ? (
        <div className="flex flex-col items-center p-4">
          <div className="bg-base-100 rounded-full p-6">
            <BookOpen className="size-12" />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold mt-5">
              Добро пожаловать, {user.username}!
            </h1>
            <button className="btn btn-primary btn-lg mt-3" 
                    onClick={() => navigate('/my-tbr-list')}>
              Перейти к списку книг
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col text-center items-center">
            <h1 className="text-4xl mt-2">Добро пожаловать!</h1>
            <p className="text-2xl mt-5">
              Составьте интерактивный список всех книг,<br />
              которые давно хотите прочитать!
            </p>
            <BookCheck className="size-13 mt-3"/>
          </div>
          <div className="flex flex-col gap-4 items-center mt-5">
            <div className="flex">
              <button className="btn btn-primary btn-lg" 
                      onClick={() => navigate('/login')}>
                Войдите в аккаунт, чтобы увидеть свой список книг
                <ScrollText />
              </button>
            </div>
            <p>Нет аккаунта? Ничего страшного!</p>
            <div className="flex">
              <button className="btn btn-primary btn-lg"
                      onClick={() => navigate('/register')}>
                Зарегистрируйтесь, чтобы начать составлять свой список
                <Pencil />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default Welcome
