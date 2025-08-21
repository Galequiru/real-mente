import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/home/Home'
import Cadastro from './pages/cadastro/Cadastro'
import EscolhaDestino from './pages/escolhaDestino/EscolhaDestino'
import QuemSomos from './pages/quemSomos/QuemSomos'
import ComoFunciona from './pages/comoFunciona/ComoFunciona'
import Login from './pages/login/Login'
import MainLayout from './components/MainLayout'
import PlanosParaCompra from './pages/planosParaCompra/PlanosParaCompra'

function App() {
  const [usuario, setUsuario] = useState("")

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
      </Route>
      {/* Rotas para cadastro e login fora do layout principal */}
      <Route path="/cadastro" element={<Cadastro atualizarUsuario={setUsuario}/>} />
      <Route path="/login" element={<Login atualizarUsuario={setUsuario} />} />
    </Routes>
  )
}

export default App



