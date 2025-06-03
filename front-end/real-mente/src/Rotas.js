import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Cadastro from './pages/cadastro/Cadastro'
import App from './App'
import Home from './pages/home/Home'

function Rotas() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Home />} />
        
        <Route path="/cadastro" element={<Cadastro />} />
       
        <Route path="/app/*" element={<App />} />
      </Routes>
    </Router>
  )
}

export default Rotas



