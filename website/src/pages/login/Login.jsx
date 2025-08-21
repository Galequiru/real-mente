import { useState } from "react"
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'

function Login(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async (evento) => {
    evento.preventDefault();

    const payload = {
      "email": email,
      "senha": senha
    };

    const response = await fetch("http://localhost:8000/auth/login", {
      method: "post",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (response.status === 400) {
      alert("Não foi possível fazer login");
      return;
    }
    if (response.status === 200) {
      const user = (await response.json())['data'];
      props.atualizarUsuario(user.nome);
      navigate("/");
    }
  };

  return (
    <div className = "login">
      <form onSubmit={handleLogin}>
        <div className = "cardLogin">
          <br />
          <h2>LOGIN</h2>
          <br />
          <label className = "emailUsu">Email:</label>
          <br />
          <input type = "text" className = "emailUsuL"
            placeholder = "digite seu email"
            onChange={(e) => setEmail(e.target.value)}
            required/>
          <br />
          <br />
          <br />
          <label className = "senhal">Senha:</label>
          <br />
          <input type = "password" className = "senhaL"
            placeholder = "digite sua senha"
            onChange={(e) => setSenha(e.target.value)}
            required/>
          <br />
          <br />
          <hr className = "linhaL" />
          <br />
          <button className = "loginL">LOGIN</button>
          <Link to = "/cadastro"><p className = "cadL">não tem conta ainda? :( crie uma conta aqui</p></Link> 
        </div>
      </form>
    </div>
  )
}

export default Login