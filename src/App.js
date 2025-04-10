import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import TAAccountAdministration from './pages/TAAccountAdministration';
import TokenReport from './pages/TokenReport';
//import AuthHandler from './auth/AuthHandler';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<TokenReport />} />
        <Route path="/TAAccountAdmin" element={<TAAccountAdministration />} />
        <Route path="/TokenReport" element={<TokenReport />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
