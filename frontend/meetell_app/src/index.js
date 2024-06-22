import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import { BrowserRouter } from 'react-router-dom';

const Main = () => {
  let user_info = localStorage.getItem('user_info');
  if (user_info === null) {
    localStorage.setItem('user_info',
      '{"tg_id":515551867,"level":{"id":1,"name":"1 Уровень","max_distance":1.0},"birthday":"1999-01-01","trip_count":0,"total_time_sp":0,"user_name":"userTest","distance":0.0,"name":"Тестировщик","sex":"M","ratting":0.0}');
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
root.render(<Main />);