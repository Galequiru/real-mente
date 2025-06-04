import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './pages/home/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import Cadastro from './pages/cadastro/Cadastro'

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
    </Routes>
        </Router>
    )
}

export default App



