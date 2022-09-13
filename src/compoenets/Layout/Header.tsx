import { useNavigate } from "react-router-dom"
import { useAuth } from "../../providers/AuthProvider"

export default function Header() {
    const auth = useAuth()
    const navigate = useNavigate()
    
    return <div className="h-14 bg-primary-700 shadow flex">
        <div className="flex items-center px-5">
            <a className="text-white font-bold text-2xl" href="">APPEstratégia</a>
        </div>
        <div className="ml-auto text-white font-bold uppercase flex">
            <button onClick={() => navigate('/concursos')} className="text-sm px-4 hover:bg-primary-800">Concursos</button>
            <button onClick={() => navigate('/search')} className="text-sm px-4 hover:bg-primary-800">Pesquisar</button>
            <button onClick={() => auth.logout()} className="flex px-8 h-full bg-primary-900 gap-2 items-center text-sm text-white">
                <span className="hidden md:block">{auth?.usuario?.nome.split(' ')[0]}</span>
            </button>
        </div>
    </div>
}