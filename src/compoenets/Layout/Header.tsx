import { useNavigate } from "react-router-dom"
import { useAuth } from "../../providers/AuthProvider"

export default function Header() {
    const auth = useAuth()
    
    return <div className="h-16 bg-white shadow flex items-center px-5">
        <div>
            <a className="text-primary-700 font-bold text-2xl" href="">APPEstratégia</a>
        </div>
        <div className="ml-auto">
            <button onClick={() => auth.logout()} className="flex gap-2 text-sm text-gray-600">
                {auth?.usuario?.nome}
                <img src={auth?.usuario?.image} className="w-6 h-6 rounded-full" alt="" />
            </button>
        </div>
    </div>
}