import { useEffect,useState } from "react"


import Form from "../../Conponents/Form";
import Input from "../../Conponents/Input";
import Label from "../../Conponents/Label";
import Button from "../../Conponents/Button";
import axios from "axios";
import { api } from "../../Conponents/Api";

import { toast } from "react-toastify"

import  './Perfil.css'

function PerfilContatos(){

    interface PropContatos{
        email: string
        telefone:string
    }

    const [dadosEditarContatos,setdadosEditarContatos] = useState<PropContatos>({email:"",telefone:""})


    async function EditarContatosUsuario(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        try{
            const token = localStorage.getItem("token")
            const resp = await axios.post(`${api}EditarContatos`,dadosEditarContatos,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            const {msg} = resp.data

             toast.success(msg)

        }catch(err){
            console.log(err)

        } 
    }

    async function MostrarContatos(){
        try{
            const token = localStorage.getItem("token")
            const resp = await axios.get(`${api}MostrarContatos`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            const {dadosEditarContatos} = resp.data
            setdadosEditarContatos(dadosEditarContatos)

        }catch(err){
            console.log(err)
        }
        
    }

useEffect(()=>{
    MostrarContatos()
},[])

    function PegarInputValor(e:React.ChangeEvent<HTMLInputElement>){
        setdadosEditarContatos({
            ...dadosEditarContatos,
            [e.target.name]:e.target.value

        })
    }


    return(
        <div className="perfilPai">
            <h1>Editar Contatos</h1>
            <div className="perfil">

           


            <Form className="formEditar"  onSubmit={EditarContatosUsuario}>
                <Label htmlFor="email">Email</Label>
                <Input type="email" name="email" placeholder="Edite seu email" value={dadosEditarContatos.email || ""} onChange={PegarInputValor}  />

                <Label htmlFor="telefone">Telefone</Label>
                <Input type="tel" name="telefone" placeholder="Edite seu telefone" value={dadosEditarContatos.telefone || "" } onChange={PegarInputValor} />

                <br/>
                <Button className="button2" type="submit">Salvar</Button>

                
            </Form>
             </div>

        </div>
    )
}

export default PerfilContatos