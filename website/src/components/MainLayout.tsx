// components/MainLayout.jsx
import './MainLayout.css';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import type { ReactElement } from 'react';

const MainLayout = ({ usuario, children }: {
  usuario: string,
  children?: ReactElement
}) => {
  return (
    <>
      <Header usuario={usuario} />
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