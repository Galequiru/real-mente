import React from 'react'
import './QuemSomos.css'
import liaImg from '../../assets/lia.jpg'
import gabrielImg from '../../assets/gabriel.png'
import linaImg from '../../assets/lina.jpg'

const membros = [
  {
    nome: 'Alice Lopes',
    descricao: 'descrição\nsobre a pessoa\nsei lá',
    cor: 'deeppink',
    imagem: liaImg,
  },
  {
    nome: 'Gabriel Leonardo',
    descricao: 'descrição\nsobre a pessoa\nsei lá',
    cor: 'darkorange',
    imagem: gabrielImg,
  },
  {
    nome: 'Angelina Durigan',
    descricao: 'descrição\nsobre a pessoa\nsei lá',
    cor: 'blueviolet',
    imagem: linaImg,
  },
]

const QuemSomos = () => {
  return (
    <div className = "quemSomos">
        <br />
        <br />
      <h1 className = "tituloQS">Quem Somos?</h1>
        <br />
        <br />
      <div className = "membros">
        {membros.map((membro, index) => (
          <div className = "cardMembro" key={index}>
            <img src = {membro.imagem} alt = {membro.nome} className = "avatarFoto" />
            <h2 style = {{ color: membro.cor }}>{membro.nome}</h2>
            <p className = "descricao">{membro.descricao}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuemSomos
