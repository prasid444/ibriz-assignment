import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { WagmiProvider } from 'wagmi';

import './App.css';

const queryClient = new QueryClient();
import { ContractPage } from 'features/contract/pages/ContractPage';
import { HomePage } from 'features/home/pages/HomePage';

import { config } from './config/wagmiconfig';

function App() {
  return (
    <BrowserRouter>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" Component={HomePage} />
            <Route path="/contract/:id" Component={ContractPage} />
            {/* TODO: To add redirection or no page found */}
            <Route path="*" Component={HomePage} />
          </Routes>
        </QueryClientProvider>
      </WagmiProvider>
    </BrowserRouter>
  );
}

export default App;
