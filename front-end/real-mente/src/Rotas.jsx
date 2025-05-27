import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './pages/home/Home'
import Header from './components/Header'

import Cadastro from './pages/cadastro/Cadastro'


function App(){
    return(
        <>
            <Header />
            <Routes>
                <Route path = "/home" element = {<Home/>}/>
            </Routes>
        </>
    )
}

function Rotas() {
    return(
        <Router>
            <Routes>
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/app/*" element={<App />} />
            </Routes>
        </Router>
    )
}

export default Rotas



