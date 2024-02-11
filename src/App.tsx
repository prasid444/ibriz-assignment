import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';

import { ContractPage } from './features/contract/pages/ContractPage';
import { HomePage } from './features/home/pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/contract" Component={ContractPage} />
        {/* TODO: To add redirection or no page found */}
        <Route path="*" Component={HomePage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
