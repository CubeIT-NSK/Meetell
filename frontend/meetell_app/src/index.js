import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';

// Обновление высоты блоков
document.addEventListener("DOMContentLoaded", function(event) { 
  document.body.style.height = window.innerHeight + "px";
  var root_div = document.getElementById('root');
  root_div.style.height = window.innerHeight + "px";
  // var elem_start = document.getElementsByClassName('start_body');
  // let position_start = elem_start.offsetTop;
  // let height_start = elem_start.offsetHeight;
  // let height_home =  window.innerHeight - position_start - height_start - 70;
  // var elem_home = document.getElementsByClassName('home_body');
  // document.querySelector(".home_body").style.height = height_home + "px";
  // elem_home.style.height = height_home + "px";
  console.log("ready");
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
