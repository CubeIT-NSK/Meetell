import React, { useEffect, useRef } from "react";
import { default as download } from '../../img/load.svg';
import './PreLoader.css';
import { loadTelegramWebApp } from "../telegram/telegram";

export default function PreLoader() {
  const parrentRef = useRef();
  useEffect(() => {
    loadTelegramWebApp().then(() => {
      if (window.Telegram && window.Telegram.WebApp) {
        const webApp = window.Telegram.WebApp;
        let rectParrent = parrentRef.current.getBoundingClientRect();
        parrentRef.current.style.height = webApp.viewportStableHeight - rectParrent.y + "px";
      }
    })

  }, []);

  useEffect(() => {
    let user_id = localStorage.getItem('user_id');
    let user_name = localStorage.getItem('username');
    fetch('api/user?id=' + user_id + "&username=" + user_name)
      .then((response) => response.json())
      .then((json) => {
        localStorage.setItem('user_info', JSON.stringify(json));
      });
    fetch('api/photo?id=' + user_id)
      .then((response) => response.json())
      .then((json) => {
        localStorage.setItem('user_photo', JSON.stringify(json));
      });
  }, [])

  const phrases = [
    ["Ищем для вас новые маршруты", <br></br>, "Это может занять какое-то время"],
    ["Чем больше маршрутов вы проходите,", <br></br>, "тем выше ваш уровень"],
    ["Приглашайте друзей на интересные вам маршруты,", <br></br>, "и заводите новых во время прогулки"]
  ];
  let loadText = Math.floor(Math.random() * 3);

  return (
    <div id='loaderScreen' className='loaderScreen' ref={parrentRef}>
      <img src={download} className="loader" alt="" />
      <p className="loadText">{phrases[loadText]}</p>
    </div>
  )

}