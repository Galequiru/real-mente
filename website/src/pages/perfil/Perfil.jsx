import './Perfil.css'
import { Link } from 'react-router-dom'

function Perfil({usuario}) {
    return(
        <div className = "perfil">
            {usuario === ""
            ? <>
                <h2>huuuummm, percebi que você ainda não está logado :/
                    faça seu login ou cadastro aqui:
                    <br />
                    <br />
                    <div className = "botoes">
                   <Link to="/login"><button className="botaoLog">ENTRAR</button></Link>
                   <Link to="/cadastro"><button className="botaoCad">CADASTRE-SE</button></Link>
                   </div>
                </h2>
            </>
            : <>
                <h2>Olá {usuario}, seja bem vindo!</h2>
            <br />
                <p>email@gmail.com</p>
                <br />
                <br />
                <br />
            <div className = "containerInfo">
                <div className = "pendentes">
                    <h3>Pagamentos pendentes</h3>
                    <br />
                    <br />
                    <p>aqui irá aparecer os pagamentos pendentes, quando houver.</p>
                </div>
                <hr />
                <div className = "adquiridos">
                    <h3>Cenários Já adquiridos</h3>
                    <br />
                    <br />
                    <p>aqui irá aparecer os cenários que você já adquirio anteriomente e que teve o pagamento aprovado</p>


                </div>
            </div>
            </>}

            
        </div>
    )
}

export default Perfil