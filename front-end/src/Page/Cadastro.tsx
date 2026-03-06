import { useState } from "react"

import axios from "axios"
import Form from "../Conponents/Form"

import Input from "../Conponents/Input"
import Label from "../Conponents/Label"

import Button from "../Conponents/Button"
import { api } from '../Conponents/Api'

import Loading from "../Conponents/Loading"
import { useNavigate } from "react-router-dom"

import './Cadastro.css'

interface PropsDados{
    nome: string
    email: string
    senha:string
    telefone: string
    cpf: string
}

function Cadastro(){

    const [dadosUsuario,setDadosUsuarios] = useState<PropsDados>({nome:"",email:"",senha:"",telefone:"",cpf:""})

    const [Message,setMessage] = useState<string>("")

    const [loading,setLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    async function CadastroUsuario(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        setLoading(true)
        try{

            const resp = await axios.post(`${api}cadastrausuario`,dadosUsuario)
            setMessage(resp.data.msg)
            navigate("/")

        }catch(err){
            
            console.log(err)

        } finally{
            setLoading(false)
        }   
    }

    function PegarInput(e:React.ChangeEvent<HTMLInputElement>){
        setDadosUsuarios({
            ...dadosUsuario,
            [e.target.name]:e.target.value
        })
    }
    
    return(
        <section className="cadastro">
            { Message && <p>{Message}</p> }
            { loading && <Loading /> }
            <div className="form">
                 <h1 className="icone">👤</h1>
                 <h2>Cadastro de Usuario</h2>

                <Form onSubmit={CadastroUsuario}>

                    <Label htmlFor="nome">Nome</Label>
                    <Input type="text" name="nome" placeholder="Digite seu nome:" value={dadosUsuario.nome} onChange={PegarInput} />
                    <br/>

                    <Label htmlFor="email">Email</Label>
                    <Input type="email" name="email" placeholder="Digite seu email:" value={dadosUsuario.email} onChange={PegarInput} />
                    <br/>

                    <Label htmlFor="senha">Senha</Label>
                    <Input type="password" name="senha" placeholder="Digite seu senha:" value={dadosUsuario.senha} onChange={PegarInput} />
                    <br/>

                    <Label htmlFor="telefone">Telefone</Label>
                    <Input type="text" name="telefone" placeholder="Digite seu telefone:" value={dadosUsuario.telefone} onChange={PegarInput} />
                    <br/>

                    <Label htmlFor="cpf">CPF</Label>
                    <Input type="text" name="cpf" placeholder="Digite seu cpf:" value={dadosUsuario.cpf} onChange={PegarInput} />
                    <br/>
                    
                    <Button className="button" type="submit">Cadatrar</Button>
                    <br/>
                                
                </Form>
            </div>

        </section>
    )
}


export default Cadastro