import React, { useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import './Page404.css';
import development from "../../img/development.svg";

export default function InProgress() {
    const navigate = useNavigate();
    const parrentRef = useRef();
    useEffect(() => {
        let rectParrent = parrentRef.current.getBoundingClientRect();
        parrentRef.current.style.height = window.innerHeight - rectParrent.y + "px";
    }, []);

    return (
        <div className="glassDevelopment" ref={parrentRef}>
            <div className="developmentCard">
                <div className="closeBlock">
                        <button className="closeDevelopment" onClick={() => navigate(-1)}></button>
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