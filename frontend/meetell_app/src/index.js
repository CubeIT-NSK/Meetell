import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import { BrowserRouter } from 'react-router-dom';

const Main = () => {
  let user_info = localStorage.getItem('user_info');
  if (user_info === null) {
    localStorage.setItem('user_info',
      '{"tg_id":666,"user_name":"user666","level":{"id":1,"name":"1 Уровень","max_distance":1.0},"distance":0.0,"birthday":null,"sex":"A","ratting":0.0}');
  }
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
