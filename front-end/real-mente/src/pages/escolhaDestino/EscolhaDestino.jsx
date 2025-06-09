import React, { useRef } from 'react'
import './EscolhaDestino.css'

const EscolhaDestino = () => {
  const cardsRef = useRef(null)

  const scrollLeft = () => {
    cardsRef.current.scrollBy({ left: -250, behavior: 'smooth' })
  }

  const scrollRight = () => {
    cardsRef.current.scrollBy({ left: 250, behavior: 'smooth' })
  }

  return (
    <div className="escolhaDestino">
      <label htmlFor="materia" className="selecaoDest">Selecione um módulo:</label>

      <select id="materia" className="selecaoDestInput" defaultValue="modulos">
        <option value="modulos" disabled>Módulos</option>
        <option value="humanas">Humanas</option>
        <option value="exatas">Exatas</option>
        <option value="biologicas">Biológicas</option>
        <option value="arte">Arte</option>
      </select>
        <br />
        <br />
      <label className="subtitulo">Cenários Recomendados:</label>
      <br />
      <br />
      <br />
      <div className="carrossel">
        <button className="arrow" onClick={scrollLeft}>❮</button>
        <div className="cardsDest" ref={cardsRef}>
          <div className="cardDest">Cenário 1</div>
          <div className="cardDest">Cenário 2</div>
          <div className="cardDest">Cenário 3</div>
          <div className="cardDest">Cenário 4</div>
          <div className="cardDest">Cenário 5</div>
        </div>
        <button className="arrow" onClick={scrollRight}>❯</button>
      </div>
    </div>
  )
}

export default EscolhaDestino

