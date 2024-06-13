import React, { useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import './InProgress.css';
import development from "../../img/development.svg";

export default function InProgress() {
    const parrentRef = useRef();
    useEffect(() => {
    let rectParrent = parrentRef.current.getBoundingClientRect();
    parrentRef.current.style.height = window.innerHeight - rectParrent.y + "px";
    }, []);

    return (
        <div className="glassDevelopment" ref={parrentRef}>
            <div className="developmentCard">
            <div className="closeBlock">
            <Link to='/home'>
            <button className="closeDevelopment"></button>
            </Link>
            </div>
            <div className="inCard">
                <img className="developmentSvg" src={development} alt="" />
            </div>
                <div className="developmentText">
                    <h1 className="developmentTopText">Страница в разработке</h1>
                    <p className="developmentBotText">Данная функция не доступна, мы работаем над улучшением нашего приложение.</p>
            </div>
            </div>
        </div>
    )
}