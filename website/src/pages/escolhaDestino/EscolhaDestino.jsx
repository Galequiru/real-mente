import React, { useRef, useState, useEffect } from 'react'
import './EscolhaDestino.css'
import CardDestino from '../../components/CardDestino'

/**
 * @typedef {Object} Cenario
 * @property {string} nome
 * @property {string} slug
 */

const EscolhaDestino = () => {
  const cardsRef = useRef(null)

  const scrollLeft = () => {
    cardsRef.current.scrollBy({ left: -250, behavior: 'smooth' })
  }

  const scrollRight = () => {
    cardsRef.current.scrollBy({ left: 250, behavior: 'smooth' })
  }

  const [materia, setMateria] = useState('');
  const [materias, setMaterias] = useState([]);   // store the API response
  const [loading, setLoading] = useState(true);  // show loading state
  const [error, setError] = useState(null);  // store errors

  useEffect(() => {
    // make the request when the page loads
    fetch("http://localhost:8000/materias/get/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((json) => {
        setMaterias(json['data']);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // empty dependency array means run once on mount

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  /**
   * @type {Cenario[]}
   */
  const cenarios = materia === ''
  ? materias.flatMap(m => m['cenarios'])
  : materias.find(m => m['nome'] === materia)['cenarios'] || []

  return (
    <div className="escolhaDestino">
      <label htmlFor="materia" className="selecaoDest">Selecione uma Matéria:</label>

      <select id="materia" className="selecaoDestInput" defaultValue=""
        onChange={(e) => setMateria(e.target.value)}
      >
        <option value="">Todas</option>
        {materias.map((materia) => // cria uma option no select para cada matéria
          <option value={materia['nome']}>{materia['nome']}</option>
        )}
      </select>
        <br />
        <br />
      <p className="subtitulo">Cenários presentes:</p>
      <div className="carrossel">
        <button className="arrow" onClick={scrollLeft}>❮</button>
        <div className="cardsDest" ref={cardsRef}>
          {cenarios.map(cenario =>
            <CardDestino cenario={cenario}/>
          )}
        </div>
        <button className="arrow" onClick={scrollRight}>❯</button>
      </div>
    </div>
  )
}

export default EscolhaDestino

