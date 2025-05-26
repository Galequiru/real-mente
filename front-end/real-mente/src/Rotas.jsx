import React from 'react'
import { Routes, Route } from 'react-router-dom' // Importando corretamente Routes e Route

import Home from './pages/home/Home'
import Cadastro from './pages/cadastro/Cadastro'

// Componente de rotas
function Rotas() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
    );
}

export default Rotas;