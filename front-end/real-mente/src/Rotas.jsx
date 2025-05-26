import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Cadastro from './pages/cadastro/Cadastro'

function Rotas() {
    return(
        <Router>
            <Routes>
                <Route path="/cadastro" element={<Cadastro />} />
            </Routes>
        </Router>
    )
}

export default Rotas