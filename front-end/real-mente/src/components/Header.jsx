import React from 'react';

const Header = () => {
  return (
    <header className = "">
      <h1 className = "">RealMente</h1>
      <nav className = "">
        <ul className = "">
          <li><a href = "/" className="hover:underline">Início</a></li>
          <li><a href = "/sobre" className="hover:underline">Sobre</a></li>
          <li><a href = "/contato" className="hover:underline">Contato</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;