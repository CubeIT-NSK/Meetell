import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useFooter } from '../appFooter/FooterContext';
import "./Finished.css";
import phone from '../../img/trip_page.svg';
import back from '../../img/back.svg';
import account from '../../img/account.svg';
import { ReactComponent as BadIcon } from '../../img/bad_grade.svg';
import { ReactComponent as SadIcon } from '../../img/sad_grade.svg';
import { ReactComponent as MediumIcon } from '../../img/medium_grade.svg';
import { ReactComponent as GoodIcon } from '../../img/good_grade.svg';
import { ReactComponent as FunnyIcon } from '../../img/funny_grade.svg';
import { ReactComponent as Male } from '../../img/sex_male.svg';
import { ReactComponent as Female } from '../../img/sex_female.svg';
import Feedback from './Feedback.jsx';


export default function Finished({ rateRoute }) {

    const [userRate, setUserRate] = useState(false);
    const parrentRef = useRef();
    const navigate = useNavigate();
    const { setFooterVisible } = useFooter();
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [selectedRateTrip, setSelectedRateTrip] = useState(null);
    setFooterVisible(false);

    const handleUserRate = () => {
        setUserRate(true);
    }
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

    const getAge = (birthday) => {
        let year_month_day = birthday.split('-');
        let year = parseInt(year_month_day[0]);
        let month = parseInt(year_month_day[1]);
        let day = parseInt(year_month_day[2]);
        const birthdat_date = new Date(year, month - 1, day);
        const today = new Date();
        const diff = today - birthdat_date;
        const ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    const handleUpdateTrip = (rateRoute, state) => {
        const updateTrip = async () => {
            try {
                const user_info = localStorage.getItem('user_info')
                let route = {
                    user_id: user_info.tg_id,
                    trip_id: rateRoute.trip.id,
                    trip_user_id: rateRoute.id,
                    state: state,
                    rate_user: rateRoute.user_rate
                }
                const response = await fetch('api/update_trip', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(route),
                });
                const data = await response.json();
                console.log(data);
                if (data.message === 'ok') {
                    if (state === 'N') {
                        navigate('/home');
                    } else {
                        setSelectedRoute(state);
                        rateRoute.state = state;
                    }
                }
            } catch (error) {
                console.error('Error fetching history:', error);
            }
        };

        updateTrip();
    }

    const handleImageClick = (rate) => {
        setSelectedRateTrip(rate);
        rateRoute.rate_user = rate;
        console.log(rateRoute);
    };

    const handleUpdateRate = (rateRoute) => {
        const updateTrip = async () => {
            try {
                const user_info = localStorage.getItem('user_info')
                let route = {
                    user_id: user_info.tg_id,
                    trip_id: rateRoute.trip.id,
                    trip_user_id: rateRoute.id,
                    state: 'R'
                }
                const response = await fetch('api/update_trip', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(route),
                });
                const data = await response.json();
                console.log(data);
                if (data.message === 'ok') {
                    navigate('/home');
                }
            } catch (error) {
                console.error('Error fetching history:', error);
            }
        };

        updateTrip();
    }

    console.log(rateRoute);
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
                            <p className='route_info_id'>Маршрут №{rateRoute.trip.id}</p>
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
                                        <Male fill={'#0912DB'} width={'16px'} />
                                        <Female fill={'#0912DB'} width={'16px'} />
                                    </div>
                                ) : null}
                            {rateRoute.trip.sex === 'M' ?
                                (
                                    <div className='route_info_sex'>
                                        <Male fill={'#0912DB'}  width={'16px'} />
                                    </div>
                                ) : null}

                            {rateRoute.trip.sex === 'W' ?
                                (
                                    <div className='route_info_sex'>
                                        <Female fill={'#0912DB'}  width={'16px'} />
                                    </div>
                                ) : null}
                        </div>
                        <div className='route_info_block route_info_time'>{rateRoute.trip.time_sp} <span className='route_info_small'>мин.</span></div>
                    </div>
                </div>
            )
            }
            {rateRoute && rateRoute.state === 'Q' && (
                <div className="Feedback-content">
                    <div className="Title-text">
                        <h3>Удалось ли посетить данный маршрут?</h3>
                        <p>Поделиться маршрутом</p>
                    </div>
                    <div className="choose-feedback-message">
                        <button className="Yes" onClick={() => handleUpdateTrip(rateRoute, 'Y')}>Да</button>
                        <button className="No" onClick={() => handleUpdateTrip(rateRoute, 'N')}>Нет</button>
                    </div>
                    <img className="map" src={phone} alt="" />
                </div>
            )}

            {rateRoute && (rateRoute.state === 'Y' || rateRoute.state === 'R') && (

                <div className="walk-assessment">
                    <div className="title-text-assessment">
                        <p>Рады узнать!</p>
                        <p>Отметили этот маршрут в вашем профиле.</p>
                    </div>
                    <div className="walk-grade">
                        <h3>Оцените как всё прошло:</h3>
                        <div className="grade-faces-big">
                            <BadIcon
                                onClick={() => handleImageClick(1)}
                                className={selectedRateTrip === 1 ? 'rate-1' : ''}
                            />
                            <SadIcon
                                onClick={() => handleImageClick(2)}
                                className={selectedRateTrip === 2 ? 'rate-2' : ''}
                            />
                            <MediumIcon
                                onClick={() => handleImageClick(3)}
                                className={selectedRateTrip === 3 ? 'rate-3' : ''}
                            />
                            <GoodIcon
                                onClick={() => handleImageClick(4)}
                                className={selectedRateTrip === 4 ? 'rate-4' : ''}
                            />
                            <FunnyIcon
                                onClick={() => handleImageClick(5)}
                                className={selectedRateTrip === 5 ? 'rate-5' : ''}
                            />
                        </div>
                        <button className="grade-submit" onClick={() => handleUpdateRate(rateRoute)}>Оценить</button>
                    </div>
                    {rateRoute.trip.registered_users.length !== 0 && (
                        <div className="grade-companions">
                            <p className="header-grade-companions">Оцените своих спутников :)</p>
                            {rateRoute.trip.registered_users.map(item => (
                                <div className="full-data-companion">
                                    <div className="grade-companions-faces">
                                        <div className="grade-companions-logo" id="#">
                                            <img className="companions-avatar" src={account} alt="avatar"></img>
                                            <div className="companions-level">{item.user.level}</div>
                                        </div>
                                    </div>
                                    <div className="user-data-position">
                                        <div className="user-data-companion">
                                            <p>{item.user.name}</p>
                                            <div className="user-age-sex">
                                                <p>{getAge(item.user.birthday)}</p>
                                                {item.user.sex === 'M' ?
                                                    (
                                                        <Male fill={'#0912DB'} width={'10px'} />
                                                    ) :
                                                    (
                                                        <Female fill={'#0912DB'} width={'10px'}/>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <Feedback />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            )
            }
        </div >


    );

}

