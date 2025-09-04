import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom';

/**
 * @typedef {Object} Cenario
 * @property {string} nome
 * @property {string} slug
 * @property {number} price
 */

/**
 * @typedef {Object} Materia
 * @property {string} nome
 * @property {string} slug
 * @property {Cenario[]} cenarios
 */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
)