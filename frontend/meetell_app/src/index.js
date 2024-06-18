import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import { BrowserRouter } from 'react-router-dom';
import { loadTelegramWebApp } from './components/telegram/telegram';

const Main = () => {

  useEffect(() => {
    loadTelegramWebApp()
      .then(() => {
        console.log('Telegram Web App script loaded successfully');
        if (window.Telegram && window.Telegram.WebApp) {
          window.Telegram.WebApp.ready();
          window.Telegram.WebApp.expand();
          window.Telegram.WebApp.setHeaderColor("#172563");
          setTimeout(() => {
            document.body.style.overflow = 'hidden'; 
            document.body.style.height = window.Telegram.WebApp.viewportHeight + 'px'; 
          }, 1000);
          console.log('Telegram WebApp expanded');
        } else {
          console.error('Telegram WebApp not available');
          document.body.style.overflow = ''; 
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Main />,
  document.getElementById('root')
);
