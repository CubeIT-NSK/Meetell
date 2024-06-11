import React, { useEffect, useRef } from "react";
import { default as download } from '../../img/load.svg';
import './PreLoader.css';

export default function PreLoader() {
  const parrentRef = useRef();
  useEffect(() => {
    let rectParrent = parrentRef.current.getBoundingClientRect();
    parrentRef.current.style.height = window.innerHeight - rectParrent.y + "px";
  }, []);

    const phrases = [
        ["Ищем для вас новые маршруты",<br></br>,"Это может занять какое-то время"],
        ["Чем больше маршрутов вы проходите,",<br></br>,"тем выше ваш уровень"],
        ["Приглашайте друзей на интересные вам маршруты,",<br></br>,"и заводите новых во время прогулки"]
    ];
    let loadText = Math.floor(Math.random() * 3);

  return (
      <div id='loaderScreen' className='loaderScreen' ref={parrentRef}>
        <img src={download} className="loader" alt="" />
        <p className="loadText">{phrases[loadText]}</p>
      </div>
  )
    
}