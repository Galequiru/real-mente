import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './pages/home/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import Cadastro from './pages/cadastro/Cadastro'
import EscolhaDestino from './pages/escolhaDestino/EscolhaDestino'
import QuemSomos from './pages/quemSomos/QuemSomos'

function App() {
    return(
        <Router>
            <Routes>

      <Route path="/" element={<Cadastro />} />
      <Route path="/home" element={
        <>
          <Header />
          <Home />
          
          <Footer />
          </>
          } />
          
         <Route path="/escolha-seu-destino" element={
              <>
                <Header />
                <EscolhaDestino />
                
                <Footer />
              </>
          } />

         <Route path="/quem-somos" element={
                <>
                  <Header />
                  <QuemSomos />
                  
                  <Footer />
                </>
          } />


    </Routes>
        </Router>
    )
}

export default App



