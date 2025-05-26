import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import logo from '../assets/logo.png';

function Header() {
    return (
        <div className = "header">
           <Link to = "/">
                <img src = {logo} alt = "Logo" className = "logo" />
            </Link>  
            <br />
            <Link to = "/quem-somos"><button className = "botaoH">Quem somos?</button></Link> 
            <Link to = "/escolha-seu-destino"><button className = "botaoH">Escolha seu destino</button></Link> 
            <Link to = "/planos-para-compra"><button className = "botaoH">Planos para compra</button></Link> 
            <Link to = "/como-funciona"><button className = "botaoH">Como funciona?</button></Link> 
            <hr />
        </div>
    )
}

export default Header
