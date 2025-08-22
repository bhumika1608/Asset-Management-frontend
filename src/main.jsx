import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { AssetProvider } from './context/AssetContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <AssetProvider>
          <App />
        </AssetProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
