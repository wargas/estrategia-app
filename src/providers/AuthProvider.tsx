import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../libs/Api";

export const AuthContext = createContext({} as AuthProviderProps);
export type Usuario = {
    nome: string,
    email: string,
    image: string
}

export type AuthProviderProps = {
    usuario: Usuario | null | undefined,
    setToken: (token: string, redirectTo: string) => void,
    logout: () => void
}

export const AuthProvider = ({children}: any) => {

    const [loading, setLoading] = useState(false)
    const [usuario, setUsuario] = useState<Usuario>()
    const navigate = useNavigate()

    useEffect(() => {
        verifyLogin()
    }, [])

    async function verifyLogin(redirectTo = '/') {
        setLoading(true)
        const token = getToken()
        if(!token) {
            navigate('/login') 
        }

        const {data: perfil} = await Api.get<any>('perfil/detalhes')

        if(perfil.usuario) {
            setUsuario({
                nome: perfil.usuario.nome,
                email: perfil.usuario.email,
                image: perfil.imagem
            })

            navigate(redirectTo)
        } else {
            navigate('/login')
        }

        setLoading(false)
    }

    function setToken(token: string, redirectTo = '/') {
        localStorage.setItem('auth_token', token);

        verifyLogin(redirectTo)
    }

    function getToken() {
        return localStorage.getItem('auth_token')
    }

    function logout() {
        localStorage.removeItem('auth_token');
        verifyLogin()
    }

    if(loading) {
        return <p>Carregando</p>
    }

    return (
        <AuthContext.Provider value={{setToken, logout, usuario}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}