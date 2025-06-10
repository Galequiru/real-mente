import React from "react"
import './Login.css'
import { Link } from 'react-router-dom'

function Login(){
    return(
        <div className = "login">
          <div className = "cardLogin">
            <br />
            <h2>LOGIN</h2>
            <br />
            <label className = "emailUsu">Email ou Usúario:</label>
            <br />
            <input type = "text" className = "emailUsuL" placeholder = "digite seu email" required/>
            <br />
            <br />
            <br />
            <label className = "senhal">Senha:</label>
            <br />
            <input type = "password" className = "senhaL" placeholder = "digite sua senha" required/>
            <br />
            <br />
            <hr className = "linhaL" />
            <br />
            <button className = "loginL">LOGIN</button>
            <Link to = "/cadastro"><p className = "cadL">não tem conta ainda? :( crie uma conta aqui</p></Link> 
          </div>
    </div>
    )
}

export default Login