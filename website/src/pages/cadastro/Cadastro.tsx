import { useState, type FormEvent } from 'react'
import './Cadastro.css'
import { Link, useNavigate } from 'react-router-dom'
import type { Usuario } from '../../types'

function Cadastro({
  atualizarUsuario
}: {
  atualizarUsuario: (usuario: Usuario) => void
}) {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleCadastrar = async (evento: FormEvent<Element>) => {
    evento.preventDefault();
    if (senha !== confirmarSenha) {
      alert("As duas senhas não coincidem :/");
      return;
    }

    const payload = {
      "nome": usuario,
      "email": email,
      "senha": senha
    };

    const response = await fetch("http://localhost:8000/auth/register", {
      method: "post",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.status === 409) {
      alert("Este email já está cadastrado, faça login");
      return navigate('/login');
    }
    atualizarUsuario({
      email: email,
      senha: senha,
      nome: usuario,
      pendings: [],
      products: [],
    });
    return navigate('/perfil');
  };

  return (
    <div className = "cadastro">
      <form onSubmit={handleCadastrar}>
        <div className = "cardCadastro">
          <br />
          <h2>CADASTRE-SE</h2>
          <br />
          <div className = "containsInfo">
          <label className = "usuario">Usuário:</label>
          <br />
          <input type = "text" className = "usuarioC"
            placeholder = "digite um usuário"
            onChange={(e) => setUsuario(e.target.value)}
            required/>
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
          <label className = "senha">Senha:</label>
          <br />
          <input type = "password" className = "senhaC"
            placeholder = "digite uma senha"
            onChange={(e) => setSenha(e.target.value)}
            required/>
          <br />
          <br />
          <label className = "confSenha"> Confirmar senha:</label>
          <br />
          <input type = "password" className = "confSenhaC"
            placeholder = "digite uma senha"
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required/>
          <br />
          </div>
          <br />
          <hr className = "linhaC" />
          <br />
          <button className = "cadastrarC">CADASTRAR</button>
          <br />
          <br />
          <Link to = "/login"><p className = "logC">já tem conta? entre aqui :)</p></Link>
        </div>
      </form>
    </div>
  )
}

export default Cadastro