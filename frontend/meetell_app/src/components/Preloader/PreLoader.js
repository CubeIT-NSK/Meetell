import React from "react";
import { default as download } from '../assets/load.svg'



export default function PreLoader() {
    const phrases = [
        ["Ищем для вас новые маршруты",<br></br>,"Это может занять какое-то время"],
        ["Чем больше маршрутов вы проходите,",<br></br>,"тем выше ваш уровень"],
        ["Приглашайте друзей на интересные вам маршруты,",<br></br>,"и заводите новых во время прогулки"]
    ];
    let loadText = Math.floor(Math.random() * 3);

  return (
      <div id='loaderScreen' className='loaderScreen'>
        <img src={download} className="loader" alt="" />
        <p className="loadText">{phrases[loadText]}</p>
      </div>
  )
    
}