import React, { useState, useEffect, useRef } from "react";
import "./Finished.css";
import account from '../../img/account.svg';
import phone from '../../img/trip_page.svg';
import bad from '../../img/bad_grade.svg';
import sad from '../../img/sad_grade.svg';
import medium from '../../img/medium_grade.svg';
import good from '../../img/good_grade.svg';
import funny from '../../img/funny_grade.svg';
import sex from '../../img/sex_male.svg';


export default function Finished() {

    const parrentRef = useRef();

    useEffect(() => {
        let rectParrent = parrentRef.current.getBoundingClientRect();
        parrentRef.current.style.height = window.innerHeight - rectParrent.y + "px";
    }, []);

    return (
        <div className="Background" ref={parrentRef}>
            <div className="Feedback-content">
                <div className="Title-text">
                    <h3>Удалось ли посетить данный маршрут?</h3>
                    <p>Поделиться маршрутом</p>
                </div>
                <div className="choose-feedback-message">
                    <button className="Yes">Да</button>
                    <button className="No">Нет</button>
                </div>
                <img className="map" src={phone} />
            </div>
            <div className="walk-assessment">
                <div className="title-text-assessment">
                    <p>Рады узнать!</p>
                    <p>Отметили этот маршрут в вашем профиле.</p>
                </div>
                <div className="walk-grade">
                    <h3>Оцените как всё прошло:</h3>
                    <div className="grade-faces">
                        <img src={bad} />
                        <img src={sad} />
                        <img src={medium} />
                        <img src={good} />
                        <img src={funny} />
                    </div>
                    <button className="grade-submit">Оценить</button>
                </div>
                <div className="grade-companions">
                    <p>Оцените своих спутников :)</p>
                    <div className="grade-companions-faces">
                        <div className="grade-companions-logo" id="#">
                            <img className="companions-avatar" src={account} alt="avatar"></img>
                            <div className="companions-level">123</div>
                        </div>
                        <p>Красный рейнджер</p>
                        <div className="user-age-sex">
                            <p>15</p>
                            <img src={sex} />
                        </div>
                        <div className="grade-faces">
                            <img src={bad} />
                            <img src={sad} />
                            <img src={medium} />
                            <img src={good} />
                            <img src={funny} />
                        </div>
                    </div>
                    
                </div>
            </div>            
        </div>
        
    );

}

