import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import TAAccountAdministration from './pages/TAAccountAdministration';
import TokenReport from './pages/TokenReport';
//import AuthHandler from './auth/AuthHandler';

const App = () => {
  /*
  return (
    <>
      <Header />
      <AuthHandler />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </>
  );
  */
  
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/TAAccountAdmin" element={<TAAccountAdministration />} />
        <Route path="/Report" element={<TokenReport />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
