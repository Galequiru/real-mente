import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/home/Home'
import Cadastro from './pages/cadastro/Cadastro'
import EscolhaDestino from './pages/escolhaDestino/EscolhaDestino'
import QuemSomos from './pages/quemSomos/QuemSomos'
import ComoFunciona from './pages/comoFunciona/ComoFunciona'
import Login from './pages/login/Login'
import MainLayout from './components/MainLayout'
import PlanosParaCompra from './pages/planosParaCompra/PlanosParaCompra'
import Materia from './pages/materia/Materia'
import Cenario from './pages/cenario/Cenario'

/**
 * @typedef {Object} Cenario
 * @property {string} nome
 * @property {string} slug
 */

/**
 * @typedef {Object} Materia
 * @property {string} nome
 * @property {string} slug
 * @property {Cenario[]} cenarios
 */

function App() {
  const [usuario, setUsuario] = useState("")
  /** @type {[Materia[], React.Dispatch<React.SetStateAction<Materia[]>>]} */
  const [materias, setMaterias] = useState([]);        // guarda a resposta da API
  const [carregando, setCarregando] = useState(true); // mostra status do carga
  const [error, setError] = useState(null);          // guarda possivel erro

  useEffect(() => {
    // faz a chamada no carregamenteo da página
    fetch("http://localhost:8000/materias/get/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((json) => {
        setMaterias(json['data']);
        setCarregando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCarregando(false);
      });
  }, []); // pegando dados da api uma vez no processo de mount

  if (carregando || error != null) return <MainLayout usuario={usuario}>
    {carregando
    ? <p>Carregando...</p>
    : <p>Error: {error}</p>}
  </MainLayout>;

  return (
    <Routes>
      <Route element={
        <MainLayout usuario={usuario} />
      }>
        <Route path="/" element={
          <Home />
        } />
        <Route path="/escolha-seu-destino" element={
          <EscolhaDestino />
        } />
        <Route path='/planos-para-compra' element={
          <PlanosParaCompra />
        } />
        <Route path="/quem-somos" element={
          <QuemSomos />
        } />
        <Route path="/como-funciona" element={
          <ComoFunciona />
        } />
        { // criando rotas automaticamente atravez da resposta da api
        materias.map(materia =>
          <Route key={materia.slug} path={`/${materia.slug}`} >
            <Route index element={
              <Materia materia={materia} />
            } />
            { // cada cenario tem seu link aninhado em sua materia
            materia.cenarios.map(cenario =>
              <Route key={cenario.slug} path={`/${materia.slug}/${cenario.slug}`} element={
                <Cenario materia={materia} cenario={cenario} />
              } />
            )}
          </Route>
        )}
      </Route>
      {/* Rotas para cadastro e login fora do layout principal */}
      <Route path="/cadastro" element={<Cadastro atualizarUsuario={setUsuario}/>} />
      <Route path="/login" element={<Login atualizarUsuario={setUsuario} />} />
    </Routes>
  )
}

export default App



