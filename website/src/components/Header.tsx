import { Link } from 'react-router-dom'
import './Header.css'
import logo from '../assets/logo.png'
import type { Usuario } from '../types'

function Header({ usuario }: {
    usuario?: Usuario
}) {
    return (
        <header className="header">
            <div className="loginCadastroH">
                {usuario == undefined
                ? <>
                    <Link to="/login"><button className="botaoLogH">ENTRAR</button></Link>
                    <Link to="/cadastro"><button className="botaoCadH">CADASTRE-SE</button></Link>
                </>
                : <>
                    <Link to = "perfil"><h1 style={{color: "white"}}>Olá, {usuario.nome}</h1></Link>
                </>}
            </div>
            <Link to="/">
            <img src={logo} alt="Logo" className="logo" />
            </Link>
            <div className='menuTelas'>
                <Link to="/quem-somos"><button className="botaoH">Quem somos?</button></Link>
                <Link to="/escolha-seu-destino"><button className="botaoH">Escolha seu destino</button></Link>
                <Link to="/planos-para-compra"><button className="botaoH">Planos para compra</button></Link>
                <Link to="/como-funciona"><button className="botaoH">Como funciona?</button></Link>
            </div>
            <hr className="linhaH" />
        </header>
    )
}

export default Header
