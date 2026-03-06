import { Link } from "react-router-dom"
import Conponents from "../../Conponents/Conponentes"
import './LinkEditar.css'

function LinkEditar(){
    return(
        <div>

            <Conponents>
                <div className="perfilLinks">
                    <ul>

                      <li><Link to="/perfilSenha">Perfil Senha</Link></li>
                      <li><Link to="/PerfilContatos">Perfil Contatos</Link></li>
                      <li><Link to="/PerfilDados">Perfil Dados</Link></li>
                   </ul>

                </div>
              
            </Conponents>

        </div>
    )
}



export default LinkEditar