import React from 'react'
import './Cadastro.css'

function Cadastro() {
  return (
    <div className = "card">
      <div className = "containerCadLog">
          <div className = "cad"> 
              <h2>CADASTRE-SE</h2>
              <label className = "usuario">Usuário:</label>
              
              <br />
              <input type = "text" className = "usuarioC" placeholder = "digite um usuário" required/>
              <br />
              <br />
              <label className = "email">Email:</label>
              <br />
              <input type = "text" className = "emailC" placeholder = "digite um email" required/>
              <br />
              <br />
              <label className = "cpf">CPF:</label>
              <br />
              <input type = "number" className = "cpfC" placeholder = "digite um CPF" required/>
              <br />
              <br />
              <label className = "telefone">Telefone:</label>
              <label className = "dataNasc">Data de Nascimento:</label>
              <br />
              <input type = "text" className = "telefoneC" placeholder = "(  ) _ _ _ _ _-_ _ _ _" required/>
              
              <input type = "date" className = "dataNascC" required/>
              <br />
              <br />
              <label className = "senha">Senha:</label>
              <br />
              <input type = "password" className = "senhaC" placeholder = "digite uma senha" required/>

              <hr />
              <button className = "cadastrarC">CADASTRAR</button>


          </div>

          <div className = "login">
            <h2>LOGIN</h2>
            <br />
            <br />
            <br />
            <br />
            <label className = "emailUsu">Email ou Usúario:</label>
            <br />
            <input type = "text" className = "emailUsuL" placeholder = "digite seu email" required/>
            <br />
            <br />
            
            <label className = "senha">Senha:</label>
            <br />
            <input type = "password" className = "senhaL" placeholder = "digite sua senha" required/>

            <hr />
            <button className = "loginC">LOGIN</button>

          </div>
      </div>
    </div>
  )
}

export default Cadastro