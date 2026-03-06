
import { useState } from "react";
import axios from "axios";



import Form from "../../Conponents/Form";
import Input from "../../Conponents/Input";

import Label from "../../Conponents/Label";
import Button from "../../Conponents/Button";

import { api } from "../../Conponents/Api";
import {toast} from 'react-toastify'

import LoadingCarr   from "../../Conponents/Loading";

import './CriarAnotacoes.css'


function CriarAnotacoes() {
  interface PropsAnotacoes{
    titulo:string
    texto:string

  }

  const [Anotacoes,setAnotacoes] = useState<PropsAnotacoes>({titulo:"",texto:""})

  const [Loading,setLoading] = useState<boolean>(false)

  async function CriarAnotacoesUsuario(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try{
      setLoading(true)

    const token = localStorage.getItem("token")
    const resp = await axios.post(`${api}CriarAnotacoesUsuario`,Anotacoes,{
      headers:{
        Authorization:`Bearer ${token}`
      }

    })
    const {msg} = resp.data
    
    toast.success(msg)

    }catch(err){

      console.log(err)

    }finally{
      setLoading(false)
    }
  }

  function PegarInputAnotacao(e:React.ChangeEvent<HTMLInputElement>){
    setAnotacoes({
      ...Anotacoes,
      [e.target.name]:e.target.value
    })
  }

  return (
    <div className="divCriarAnotacoes">
      <h1>Criar anotacoes</h1>
      { Loading && <LoadingCarr /> }

        <div className="formAnotacoes">

          <Form onSubmit={CriarAnotacoesUsuario}>
            

             <Label htmlFor="titulo2">Titulo</Label>
             <Input type="text" name="titulo" placeholder="Digite seu titulo" value={Anotacoes.titulo} onChange={PegarInputAnotacao} />
            
            <br/>
          
             <Label htmlFor="texto">Texto</Label>
             <Input type="text" name="texto" placeholder="Digite seu texto" value={Anotacoes.texto} onChange={PegarInputAnotacao} />
          
            <br/>
            <Button className="btnCriar" type="submit">Criar</Button>

          </Form>

        </div>
      
    </div>
  );
}
export default CriarAnotacoes;