// components/MainLayout.jsx
import './MainLayout.css';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = (props) => {
  return (
    <>
      <Header usuario={props.usuario} />
      <main>
        <section className='mainContent'>
        <Outlet /> {/* Conteúdo das rotas filhas será renderizado aqui */}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;