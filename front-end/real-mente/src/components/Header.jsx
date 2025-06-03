import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import logo from '../assets/logo.png';

function Header() {
    return (
        <div className = "header">
           <Link to = "/app/">
                <img src = {logo} alt = "Logo" className = "logo" />
            </Link>  
            <br />
            <Link to = "/app/quem-somos"><button className = "botaoH">Quem somos?</button></Link> 
            <Link to = "/app/escolha-seu-destino"><button className = "botaoH">Escolha seu destino</button></Link> 
            <Link to = "/app/planos-para-compra"><button className = "botaoH">Planos para compra</button></Link> 
            <Link to = "/app/como-funciona"><button className = "botaoH">Como funciona?</button></Link> 
            <hr />
        </div>
    )
}

export default Header
