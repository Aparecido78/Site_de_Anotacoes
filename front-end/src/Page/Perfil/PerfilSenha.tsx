import { useState } from "react"
import axios from "axios"

import Form from "../../Conponents/Form"
import Input from "../../Conponents/Input"
import Label from "../../Conponents/Label"
import Button from "../../Conponents/Button"
import LoadingFun from "../../Conponents/Loading"

import { api } from "../../Conponents/Api"
import { toast } from "react-toastify"

import  './Senha.css'

function PerfilSenha(){

    interface PropsSenha{
        senhaSenha:string
        repetir_senha:string
    }

    const [senhas,setSenhas] = useState<PropsSenha>({senhaSenha:"",repetir_senha:""})

    const [Loading,setLoading] = useState<boolean>(false)

   

    async function EditarSenha(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        try{
            setLoading(true)
            
            const token = localStorage.getItem("token")
            const resp = await axios.post(`${api}EditarSenha`,senhas,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            const {msg} = resp.data

           toast.success(msg)
            

        }catch(err){

            console.log(err)
        }finally{
            setLoading(true)
        }
        
    }

    function PegarInput(e:React.ChangeEvent<HTMLInputElement>){
        setSenhas({
            ...senhas,
            [e.target.name]:e.target.value
        })
    }
    return(
        <div className="perfilsenhaPai">
            <h1>Editar senhas</h1>

         

            {Loading &&  <LoadingFun />}
            <div className="perfilSenha">

                
         

            <Form className="formEditar"  onSubmit={EditarSenha}>
                <Label htmlFor="senhaSenha">Nome:</Label>
                <Input type="password" name="senhaSenha" placeholder="Nova senha" value={senhas.senhaSenha} onChange={PegarInput} />
                <br/>
                <Label htmlFor="repetir_senha">Repetir senha</Label>
                <Input type="password" name="repetir_senha" placeholder="Digite sua nova senha" value={senhas.repetir_senha} onChange={PegarInput} />
                <br/>
                <Button className="button2" type="submit">Salvar</Button>
            </Form>
               </div>



        </div>
    )
}

export default  PerfilSenha
