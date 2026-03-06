import React, { createContext,useState,useEffect } from "react";
import { jwtDecode } from 'jwt-decode'

interface TokenPayload {
   exp: number
}

interface PropsAutcontext{
    Authenticated:boolean
    Loading:boolean
    Logoute: ()=> void
    loginUser: (token:string)=> void

}

interface PropsChildren{
    children:React.ReactNode

}

export const AutContext = createContext<PropsAutcontext | null>(null)

export const AutProvider = ({children}:PropsChildren)=>{

    const [Authenticated,setAuthenticated] = useState<boolean>(false)

    const [Loading,setLoading] = useState<boolean>(true)

   useEffect(()=>{
    const token = localStorage.getItem("token")

    if(token){
        try {
            const decoded = jwtDecode<TokenPayload>(token)

            if(decoded.exp * 1000 > Date.now()){
                setAuthenticated(true)
            } else {
                localStorage.removeItem("token")
                setAuthenticated(false)
            }
        } catch {
            localStorage.removeItem("token")
            setAuthenticated(false)
        }
    }

    setLoading(false)
},[])

    const loginUser = (token:string)=>{
        localStorage.setItem("token",token)  
        setAuthenticated(true)        

    }

    const Logoute = ()=>{
        localStorage.removeItem("token")
        setAuthenticated(false)
    }
   return(  
   <AutContext.Provider value={{
        Authenticated,
        Loading,
        loginUser,
        Logoute
    }}>
        {children}

    </AutContext.Provider>
   )


}