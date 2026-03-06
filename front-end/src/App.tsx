import Conponents from "./Conponents/Conponentes"
import {BrowserRouter as Router, Route,Routes } from "react-router-dom"
import Login from "./Page/Login"
import Cadastro from "./Page/Cadastro"
import Links from './Conponents/Links'
import PerfilSenha from "./Page/Perfil/PerfilSenha"
import { useContext } from "react"
import { AutContext } from "./Conponents/AutContext"
import PerfilContatos from "./Page/Perfil/PerfiilContatos"
import LinkEditar from "./Page/Perfil/Link_Editar"
import CriarAnotacoes from "./Page/Anotacoes/CriarAnotacoes"

import { Navigate } from "react-router-dom"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import ListaAnotacoes from './Page/Anotacoes/ListaAnotacoes'
import PerfilDados from "./Page/Perfil/PerdilDados"

import { AutenticacaoFront } from "./Conponents/Autenticacao"

function App() {

    const context = useContext(AutContext)

  if (!context) {
    throw new Error("AutContext precisa estar dentro do AutProvider")
  }

  const { Authenticated } = context
  


  return (
  

    <Router>
      <Links  />


      <Routes>

        <Route path="/" element={

          <Conponents>
            <Login />
          </Conponents>

        } />

        <Route path="/cadastro" element={
          
          <Conponents>
            <Cadastro />
          </Conponents>

        } />

        <Route path="/perfilSenha" element={
          <Conponents>
            <AutenticacaoFront>
              <LinkEditar />
             <PerfilSenha />
           </AutenticacaoFront>
          </Conponents>
        } />

        <Route path="/PerfilContatos" element={
          <Conponents>
           <AutenticacaoFront>
              <LinkEditar />
              <PerfilContatos />
            </AutenticacaoFront>
          </Conponents>
        } />

        <Route path="/LinkEditar" element={
          <Conponents>
            <AutenticacaoFront>

               <LinkEditar />

            </AutenticacaoFront>           

          </Conponents>
        } />

        <Route path="/criarAnotacoes" element={
          <Conponents>
            <AutenticacaoFront>
          
              <CriarAnotacoes />

            </AutenticacaoFront>

          </Conponents>
        } />

        <Route path="/ListaProdutos" element={
          <Conponents>

            <AutenticacaoFront>

               <ListaAnotacoes/> 

            </AutenticacaoFront>
                        
          </Conponents>
        } />

        <Route path="/PerfilDados" element={
          <Conponents>
            <AutenticacaoFront>
              <LinkEditar />
              <PerfilDados />
            </AutenticacaoFront>
          </Conponents>
        } />


      </Routes>
      <ToastContainer
      position="top-right"
      autoClose={3000}
    />
      
    </Router>
      
    
  )
}

export default App
