import React, { useState } from 'react'
import './Cadastro.css'
import { Link } from 'react-router-dom'

function Cadastro() {
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleCadastrar = async (evento) => {
    evento.preventDefault();
    if (senha !== confirmarSenha) {
      alert("As duas senhas não coincidem :/");
      return;
    }

    const payload = {
      "nome": usuario,
      "email": email,
      "senha": senha
    }

    await fetch("localhost:8000/auth/register", {
      method: "post",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
  };

  return (
    <div className = "cadastro">
      <form onSubmit={handleCadastrar} method="post">
        <div className = "cardCadastro"> 
          <br />
          <h2>CADASTRE-SE</h2>
          <label className = "usuario">Usuário:</label>
          <br />
          <input type = "text" className = "usuarioC" 
            placeholder = "digite um usuário" 
            onChange={(e) => setUsuario(e.target.value)}
            required/>
          <br />
          <br />
          <br />
          <label className = "email">Email:</label>
          <br />
          <input type = "email" className = "emailC" 
            placeholder = "digite um email" 
            onChange={(e) => setEmail(e.target.value)}
            required/>
          <br />
          <br />
          <br />
          <label className = "senha">Senha:</label>
          <br />
          <input type = "password" className = "senhaC"
            placeholder = "digite uma senha"
            onChange={(e) => setSenha(e.target.value)}
            required/>
          <br />
          <br />
          <label className = "confSenha"> Comfirmar senha:</label>
          <br />
          <input type = "password" className = "confSenhaC" 
            placeholder = "digite uma senha"
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required/>
          <br />
          <br />
          <hr className = "linhaC" />
          <br />
          <button className = "cadastrarC">CADASTRAR</button>

          <Link to = "/login"><p className = "logC">já tem conta? entre aqui :)</p></Link> 
        </div>
      </form>
    </div>
  )
}

export default Cadastro