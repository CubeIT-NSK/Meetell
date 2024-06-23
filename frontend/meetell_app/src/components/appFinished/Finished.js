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
import back from '../../img/back.svg';
import { ReactComponent as Male } from '../../img/sex_male.svg';
import { ReactComponent as Female } from '../../img/sex_female.svg';


export default function Finished() {

    const parrentRef = useRef();

    useEffect(() => {
        let rectParrent = parrentRef.current.getBoundingClientRect();
        parrentRef.current.style.height = window.innerHeight - rectParrent.y + "px";
    }, []);

    return (
        <div className="Background" ref={parrentRef}>
            <div className='route_head'>
                <div className='route_header'>
                    <div className='route_close'>
                        <button className="close_button" onClick="">
                            <img src={back} alt='' />
                        </button>
                    </div>
                    <div className="route_info_content">
                        <p className='route_info_id'>Маршрут № 0002</p>
                        <p className='route_info_date'>11.04.2024, 18:00</p>
                        <h4>Название данного маршрута настолько длинное что не помещается в одну строку</h4>
                    </div>
                </div>
                <div className='route_info_blocks'>
                    <div className='route_info_block route_info_range'>10<span className='route_info_small'>км.</span></div>
                    <div className='route_info_block route_info_ages'>
                        <p>0-18</p>
                        <div className='route_info_sex'>
                            <Male fill={'#0912DB'} />
                            <Female fill={'#0912DB'} />
                        </div>
                    </div>
                    <div className='route_info_block route_info_time'>40<span className='route_info_small'>мин.</span></div>
                </div>
            </div>

            {/* посетил ли маршрут */}
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
            
            {/* не посетил маршрут */}
            {/* <div className="no-walk">
                <p>Этот маршрут не будет учитываться в вашем профиле</p>
                <img className="map" src={phone} />
            </div> */}

            {/* оценка в статусе */}
            {/* <div className="walk-assessment">
                <div className="title-text-assessment">
                    <p>Рады узнать!</p>
                    <p>Отметили этот маршрут в вашем профиле.</p>
                </div>
                <div className="thanks-for-gread">
                    <p>Спасибо за обратную связь!</p>
                    <p>Мы учтём вашу оченку при построении следующих маршрутов.</p>
                </div>
                <div className="grade-companions">
                    <p className="header-grade-companions">Оцените своих спутников :)</p>
                    <div className="full-data-companion">
                        <div className="grade-companions-faces">
                            <div className="grade-companions-logo" id="#">
                                <img className="companions-avatar" src={account} alt="avatar"></img>
                                <div className="companions-level">123</div>
                            </div>
                        </div>
                        <div className="user-data-position">
                            <div className="user-data-companion">
                                <p>Красный рейнджер</p>
                                <div className="user-age-sex">
                                    <p>15</p>
                                    <img src={sex} />
                                </div>
                            </div>
                            <div className="grade-faces-thanks">
                                <p>Спасибо за обратную связь!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* оценка не в статусе */}
            {/* <div className="walk-assessment">
                <div className="title-text-assessment">
                    <p>Рады узнать!</p>
                    <p>Отметили этот маршрут в вашем профиле.</p>
                </div>
               <div className="walk-grade">
                    <h3>Оцените как всё прошло:</h3>
                    <div className="grade-faces-big">
                        <img src={bad} />
                        <img src={sad} />
                        <img src={medium} />
                        <img src={good} />
                        <img src={funny} />
                    </div>
                    <button className="grade-submit">Оценить</button>
                </div>
                <div className="grade-companions">
                    <p className="header-grade-companions">Оцените своих спутников :)</p>
                    <div className="full-data-companion">
                        <div className="grade-companions-faces">
                            <div className="grade-companions-logo" id="#">
                                <img className="companions-avatar" src={account} alt="avatar"></img>
                                <div className="companions-level">123</div>
                            </div>
                        </div>
                        <div className="user-data-position">
                            <div className="user-data-companion">
                                <p>Красный рейнджер</p>
                                <div className="user-age-sex">
                                    <p>15</p>
                                    <img src={sex} />
                                </div>
                            </div>
                            <div className="grade-faces">
                                <img src={bad} />
                                <img className="face-states" src={sad} />
                                <img src={medium} />
                                <img src={good} />
                                <img src={funny} />
                            </div>
                        </div>
                    </div>
                </div> 
            </div>       */}

            
        </div>
    );

}

