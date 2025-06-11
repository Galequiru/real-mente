// components/MainLayout.jsx
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = (props) => {
  return (
    <>
      <Header usuario={props.usuario} />
      <main>
        <Outlet /> {/* Conteúdo das rotas filhas será renderizado aqui */}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;