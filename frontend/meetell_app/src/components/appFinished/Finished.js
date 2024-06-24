import React, { useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useFooter } from '../appFooter/FooterContext';
import "./Finished.css";
import phone from '../../img/trip_page.svg';
import back from '../../img/back.svg';
import { ReactComponent as Male } from '../../img/sex_male.svg';
import { ReactComponent as Female } from '../../img/sex_female.svg';


export default function Finished({ rateRoute }) {

    const parrentRef = useRef();
    const navigate = useNavigate();
    const { setFooterVisible } = useFooter();
    setFooterVisible(false);
    useEffect(() => {
        let rectParrent = parrentRef.current.getBoundingClientRect();
        parrentRef.current.style.height = window.innerHeight - rectParrent.y + "px";
    }, []);

    useEffect(() => {
        if (rateRoute === null) {
            navigate('/home');
        }
    }, [rateRoute, navigate]);

    const handleCloseClick = () => {
        window.history.back();
    }

    return (

        <div className="Background" ref={parrentRef}>
            {rateRoute && (
                <div className='route_head'>
                    <div className='route_header'>
                        <div className='route_close'>
                            <button className="close_button" onClick={handleCloseClick}>
                                <img src={back} alt='' />
                            </button>
                        </div>
                        <div className="route_info_content">
                            <p className='route_info_id'>Маршрут №{rateRoute.id}</p>
                            <p className='route_info_date'>{rateRoute.trip.date}</p>
                            <h4>{rateRoute.trip.name}</h4>
                        </div>
                    </div>
                    <div className='route_info_blocks'>
                        <div className='route_info_block route_info_range'>{rateRoute.trip.distance} <span className='route_info_small'>км.</span></div>
                        <div className='route_info_block route_info_ages'>
                            {rateRoute.trip.year_st}-{rateRoute.trip.year_en}
                            {rateRoute.trip.sex === 'A' ?
                                (
                                    <div className='route_info_sex'>
                                        <Male fill={'#0912DB'} />
                                        <Female fill={'#0912DB'} />
                                    </div>
                                ) : null}
                            {rateRoute.trip.sex === 'M' ?
                                (
                                    <div className='route_info_sex'>
                                        <Male fill={'#0912DB'} />
                                    </div>
                                ) : null}

                            {rateRoute.trip.sex === 'W' ?
                                (
                                    <div className='route_info_sex'>
                                        <Female fill={'#0912DB'} />
                                    </div>
                                ) : null}
                        </div>
                        <div className='route_info_block route_info_time'>{rateRoute.trip.time_sp} <span className='route_info_small'>мин.</span></div>
                    </div>
                </div>
            )
            }
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
                <img className="map" src={phone} alt="" />
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

