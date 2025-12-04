// components/MainLayout.jsx
import './MainLayout.css';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import type { ReactElement } from 'react';
import type { Usuario } from '../types';

const MainLayout = ({ usuario, children, onLogout }: {
  usuario?: Usuario,
  children?: ReactElement,
  onLogout: () => void
}) => {
  return (
    <>
      <Header usuario={usuario} onLogout={onLogout} />
      <main>
        <section className='mainContent'>
        {children
        ? children

        // Conteúdo das rotas filhas será renderizado aqui
        : <Outlet />}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;