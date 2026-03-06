import { Navigate } from "react-router-dom"
import { useContext } from "react"
import { AutContext } from "./AutContext"

interface PropsChildren{
    children: React.ReactNode
}

export const AutenticacaoFront = ({children}:PropsChildren)=>{

    const context = useContext(AutContext)

    if(!context) return null

    if(context.Loading){
        return <div>Carregando...</div>
    }

    if(!context.Authenticated){
        return <Navigate to="/" replace/>
    }

    return children
}