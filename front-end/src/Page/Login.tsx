import{ useState,useContext } from "react"
import { useNavigate } from "react-router-dom"

import { toast } from "react-toastify"

import axios from "axios"
import Form from "../Conponents/Form"

import Input from "../Conponents/Input"
import Label from "../Conponents/Label"

import Button from "../Conponents/Button"
import { api } from '../Conponents/Api'

import { AutContext } from "../Conponents/AutContext"

import LoadingCarr from "../Conponents/Loading"



import './Login.css'


function Login(){

    interface PropsDados{
        email:string
        senha:string
    }

    interface PropsLogin{
        msg:string
        token: string
    }

    const aut = useContext(AutContext)

    const [dadosLogin,setDadosLogin] = useState<PropsDados>({email:"",senha:""})

    const [Loading,setLoading] = useState<boolean>(false)

    const navigate = useNavigate()

    async function LoginUsuario(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()

           setDadosLogin({email:"",senha:""})
        try{
            setLoading(true)
            
            const resp = await axios.post<PropsLogin>(`${api}login`,dadosLogin)
            const {token, msg} = resp.data

            aut?.loginUser(token)

            toast.success(msg)

            navigate("/ListaProdutos")
         

        }catch(error){
            console.log(error)
            toast.error("Senha incorreta")
              
        } finally{
            setLoading(false)
            setDadosLogin({email:"",senha:""})
        }
    }

    function PegarInput(e:React.ChangeEvent<HTMLInputElement>){
        setDadosLogin({
            ...dadosLogin,
            [e.target.name]:e.target.value
        })
    }

    return(
        <div className="Login">
          
           {Loading && <LoadingCarr />}
           <div className="form">
             <h1 className="icone">👤</h1>
             <h2>Login</h2>

            <Form onSubmit={LoginUsuario}>
                
                <Label htmlFor="email">Email</Label>
                <br/>  <br/>
                <div className="email">
                  <p>👤</p>
                  <Input className="input" type="email" name="email" placeholder="Digite seu email" value={dadosLogin.email} onChange={PegarInput} />
                </div>

                <br/>  

                
                <Label htmlFor="senha">Senha</Label>
                  <br/>  
                  
                <div className="senha">
                    <p>🔒</p>
                  <Input className="input" type="password" name="senha" placeholder="Digite sua senha" value={dadosLogin.senha} onChange={PegarInput} />
                </div>
                <br/>  

                <Button className="button" type="submit">Entrar</Button>

            </Form>
            </div>


        </div>
    )


}
export default Login