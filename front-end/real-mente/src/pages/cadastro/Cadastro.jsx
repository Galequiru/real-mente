import React from 'react'
import './Cadastro.css'

function Cadastro() {
  return (
    <div className = "containerCadLog">
        <div className = "cad"> 
            <h2>Cadastre-se</h2>
            <label className = "usuario">Usuário:</label>
            <br />
            <input type = "text" className = "usuarioC" required/>
            <br />
            <br />
            <label className = "email">Email:</label>
            <br />
            <input type = "text" className = "emailC" required/>
            <br />
            <br />
            <label className = "cpf">CPF:</label>
            <br />
            <input type = "number" className = "cpfC" required/>
            <br />
            <br />
            <label className = "telefone">Telefone:</label>
            <label className = "dataNasc">Data de Nascimento:</label>
            <br />
            <input type = "text" className = "telefoneC" required/>
            
            <input type = "date" className = "dataNascC" required/>
            <br />
            <br />
            <label className = "senha">Senha:</label>
            <input type = "password" className = "senhaC" required/>

            <hr />
            <button className = "cadastrarC">Cadastrar</button>


        </div>

        <div className = "login">
          <h2>Login</h2>
          <label className = "emailUsu">Email ou Usúario:</label>
          <br />
          <input type = "text" className = "emailUsuL" required/>
          <br />
          <br />
           
          <label className = "senhaL">Senha:</label>
          <input type = "password" className = "senhaC" required/>

          <hr />
          <button className = "cadastrarC">Cadastrar</button>

        </div>
    </div>
  )
}

export default Cadastro