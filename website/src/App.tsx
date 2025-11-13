import { useState, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import type { Materia } from "./types"
import MainLayout from './components/MainLayout';
import Cadastro from './pages/cadastro/Cadastro';
import Login from './pages/login/Login';
import ComoFunciona from './pages/comoFunciona/ComoFunciona';
import EscolhaDestino from './pages/escolhaDestino/EscolhaDestino';
import Home from './pages/home/Home';
import PaginaCenario from './pages/paginaCenario/PaginaCenario';
import PaginaMateria from './pages/paginaMateria/PaginaMateria';
import Perfil from './pages/perfil/Perfil';
import PlanosParaCompra from './pages/planosParaCompra/PlanosParaCompra';
import QuemSomos from './pages/quemSomos/QuemSomos';

function App() {
  const [usuario, setUsuario] = useState("")
  const [materias, setMaterias] = useState<Materia[]>([]); // guarda a resposta da API
  const [carregando, setCarregando] = useState(true);     // mostra status do carga
  const [error, setError] = useState<any>(null);         // guarda possivel erro

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
          <EscolhaDestino materias={materias} />
        } />
        <Route path='/planos-para-compra' element={
          <PlanosParaCompra materias={materias} />
        } />
        <Route path="/quem-somos" element={
          <QuemSomos />
        } />
        <Route path="/como-funciona" element={
          <ComoFunciona />
        } />
        <Route path="/perfil" element={
          <Perfil usuario={usuario} />
        } />
        {
        // criando rotas automaticamente atravez da resposta da api
        materias.map(materia =>
          <Route key={materia.slug} path={`/${materia.slug}`} >
            <Route index element={
              <PaginaMateria materia={materia} />
            } />
            {
            // cada cenario tem seu link aninhado em sua materia
            materia.cenarios.map(cenario =>
              <Route key={cenario.slug} path={`/${materia.slug}/${cenario.slug}`} element={
                <PaginaCenario materia={materia} cenario={cenario} />
              } />
            )}
          </Route>
        )}
      </Route>
      {/* Rotas para cadastro e login fora do layout principal */}
      <Route path="/cadastro" element={<Cadastro atualizarUsuario={setUsuario}/>} />
      <Route path="/login" element={<Login atualizarUsuario={setUsuario} />} />
      <Route path='*' element={<Navigate to={"/"} replace />} />
    </Routes>
  )
}

export default App
