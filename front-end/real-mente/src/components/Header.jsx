import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import logo from '../assets/logo.png';

function Header() {
    return (
        <div className = "header">
           <Link to = "/">
                <img src={logo} alt="Logo" className="logo" />
            </Link>  
            <br />
            <Link to = "/quem-somos"><button>Quem somos?</button></Link> 
            <Link to = "/escolha-seu-destino"><button>Escolha seu destino</button></Link> 
            <Link to = "/planos-para-compra"><button>Planos para compra</button></Link> 
            <Link to = "/como-funciona"><button>Como funciona?</button></Link> 
            <h1>teste</h1>
        </div>
    )
}

export default Header
