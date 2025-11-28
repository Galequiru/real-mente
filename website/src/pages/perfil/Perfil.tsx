import type { Usuario } from '../../types'
import './Perfil.css'
import { Link } from 'react-router-dom'

function Perfil({ usuario }: {
    usuario?: Usuario
}) {
    return(
        <div className = "perfil">
            {usuario == undefined
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
                <h2>Olá {usuario.nome}, seja bem vindo!</h2>
            <br />
                <p>{usuario.email}</p>
                <br />
                <br />
                <br />
            <div className = "containerInfo">
                <div className = "pendentes">
                    <h3>Pagamentos pendentes</h3>
                    <br />
                    <br />
                    {usuario.pendings.length === 0
                    ? <p>aqui irão aparecer os pagamentos pendentes, quando houver.</p>
                    : usuario.pendings.flatMap(pending => pending.products.map(product => <p>
                        {product}
                    </p>)
                    )}
                </div>
                <hr />
                <div className = "adquiridos">
                    <h3>Cenários Já adquiridos</h3>
                    <br />
                    <br />
                    {usuario.products.length === 0
                    ? <p>aqui irão aparecer os cenários que você já adquiriu anteriomente e que teve o pagamento aprovado</p>
                    : usuario.products.map(cenario => <p>
                        {cenario}
                    </p>)}
                </div>
            </div>
            </>}


        </div>
    )
}

export default Perfil