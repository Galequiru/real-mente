import React from 'react';
import Header from '../components/Header';

const Home = () => {
  return (
    <div>
      <Header />
      <main className="p-4">
        <h2 className="text-xl font-semibold mb-2">Bem-vindo ao RealMente!</h2>
        <p className="text-gray-700">
          Este é um ambiente virtual para explorar conteúdos escolares em realidade virtual.
        </p>
      </main>
    </div>
  );
};

export default Home;