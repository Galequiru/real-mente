import { useRef, useState } from 'react'
import './EscolhaDestino.css'
import CardDestino from '../../components/CardDestino'

/**
 * @import { Materia } from '../../index'
 * @param {{
 *  materias: Materia[]
 * }}
 */
const EscolhaDestino = ({
  materias
}) => {
  const cardsRef = useRef(null)

  const scrollLeft = () => {
    cardsRef.current.scrollBy({ left: -250, behavior: 'smooth' })
  }

  const scrollRight = () => {
    cardsRef.current.scrollBy({ left: 250, behavior: 'smooth' })
  }

  const [materia, setMateria] = useState('');
  const materiaSelecionada = materias.find(m => m.nome === materia);

  const cenarios = materiaSelecionada
  ? materiaSelecionada.cenarios.map(c => ({ ...c, materiaSlug: materiaSelecionada.slug}))
  : materias.flatMap(m => m.cenarios.map(c => ({ ...c, materiaSlug: m.slug})))

  return (
    <div className="escolhaDestino">
      <label htmlFor="materia" className="selecaoDest">Selecione uma Matéria:</label>

      <select id="materia" className="selecaoDestInput" defaultValue=""
        onChange={(e) => setMateria(e.target.value)}
      >
        <option value="">Todas</option>
        {materias.map((materia) => // cria uma option no select para cada matéria
          <option key={materia.slug} value={materia['nome']}>{materia['nome']}</option>
        )}
      </select>
        <br />
        <br />
      <p className="subtitulo">Cenários presentes:</p>
      <div className="carrossel">
        <button className="arrow" onClick={scrollLeft}>❮</button>
        <div className="cardsDest" ref={cardsRef}>
          {cenarios.map(cenario =>
            <CardDestino key={cenario.slug} cenario={cenario}/>
          )}
        </div>
        <button className="arrow" onClick={scrollRight}>❯</button>
      </div>
    </div>
  )
}

export default EscolhaDestino

