import Conponents from "./Conponentes"
import { Link } from "react-router-dom"


import { useContext } from "react"
import { AutContext } from "./AutContext"
import Button from "../Conponents/Button"

import '../Page/Login.css'

import './Links.css'

function Links(){


    const context = useContext(AutContext)

    if (!context) {
    throw new Error("AutContext precisa estar dentro do AutProvider")
    }

    const { Authenticated, Logoute } = context

    return(
       <Conponents>
        
            <ul>{!Authenticated?  (
                <nav className="navBar">
                    <h1 className="Anotacoes">📒 Anotacoes</h1>
                    <div className="linkCadastroUsuario">
                    <li><Link to="/">Login</Link></li>
                    <li><Link to="/cadastro">Cadastro </Link></li>
                    </div>
                </nav>
            ):(
                

                    
                    <div className="LiksUsuarioLogado">
                        <div>
                          <h1 className="H1anotacoes">📒 Anotações </h1>
                        </div>
                    <div className="link">

                      <li><Link to="/linkEditar">Editar Perfil</Link></li>
                      <li><Link to="/criarAnotacoes">Criar anotacoes</Link></li>
                      <li><Link to="/ListaProdutos"> Lista de Anotações</Link></li>
                      <Button className="btn" type="submit" onClick={Logoute}>Sair</Button>
                    </div>

                    </div>
               
            )}
              
            </ul>
        </Conponents>


    )
}

export default Links


