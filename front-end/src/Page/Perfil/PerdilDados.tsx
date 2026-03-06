import { useEffect, useState } from "react"

import Form from "../../Conponents/Form";
import Input from "../../Conponents/Input";
import Label from "../../Conponents/Label";
import Button from "../../Conponents/Button";
import axios from "axios";
import { api } from "../../Conponents/Api";

import { toast } from "react-toastify"

import  './Perfil.css'

function PerfilDados(){

    interface PropDados{
        nome: string
        cpf: string
}

    const [dados, setDadosEditar] = useState<PropDados>({
        nome: "",
        cpf: ""

    })

    async function EditarDadosUsuario(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        try{
            const token = localStorage.getItem("token")

            const resp = await axios.put(`${api}EditarDados`, dados, {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            const { msg } = resp.data
            toast.success(msg)

        }catch(err){
            console.log(err)
            toast.error("Erro ao editar dados")
        }
    }

    async function MostrarDados(){
        try{
            const token = localStorage.getItem("token")

            const resp = await axios.get(`${api}MostrarDados`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            const { dados } = resp.data
            setDadosEditar(dados)

        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        MostrarDados()
    },[])


    function PegarInputValor(e:React.ChangeEvent<HTMLInputElement>){
        setDadosEditar({
            ...dados,
            [e.target.name]: e.target.value
        })
    }

    return(
        <div className="perfilPai">
            <h1>Editar Dados</h1>
            <div className="perfil">

          

            <Form className="formEditar"  onSubmit={EditarDadosUsuario}>

                <Label htmlFor="nome">Nome</Label>
                <Input
                    type="text"
                    name="nome"
                    placeholder="Edite seu nome"
                    value={dados.nome || ""}
                    onChange={PegarInputValor}
                />

                <Label htmlFor="cpf">CPF</Label>
                <Input
                    type="text"
                    name="cpf"
                    placeholder="Edite seu CPF"
                    value={dados.cpf || ""}
                    onChange={PegarInputValor}
                />

                <br/>
                <Button className="button2" type="submit">Salvar</Button>

            </Form>
              </div>
        </div>
    )
}

export default PerfilDados