import React, { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loadTelegramWebApp } from "../telegram/telegram";
import './Trip.css';
import back from '../../img/back.svg';
// import phone from '../../img/trip_page.svg';
import account from '../../img/account.svg';
import share from '../../img/share.svg'
import { ReactComponent as Male } from '../../img/sex_male.svg';
import { ReactComponent as Female } from '../../img/sex_female.svg';

export default function TripRun({ selectedRoute, user_info, handleCloseClick, customClass }) {
    const tripRef = useRef(null);
    const navigate = useNavigate();
    let registr = false;

    if (user_info.birthday) {
        registr = true;
    } else {
        registr = false;
    }

    // const handleChangeContent = () => {
    //     setContent(!content);
    //     console.log(content)
    // }

    const handleRegistrButton = () => {
        navigate('/profile');
    }


    const handleJoinButton = (route) => {
        const user_id = localStorage.getItem('user_id');
        route.user_id = parseInt(user_id);
        fetch('api/trip', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(route),
        })
            .then(response => {
                loadTelegramWebApp().then(() => {
                    if (window.Telegram && window.Telegram.WebApp) {
                        const webApp = window.Telegram.WebApp;
                        webApp.close()
                    }
                })

            })
    }

    // Горизонтальная прокрутка
    useEffect(() => {
        if (selectedRoute) {
            document.getElementById("horizontal-scroller").addEventListener('wheel', function(event) {
                if (event.deltaMode === event.DOM_DELTA_PIXEL) {
                    // let modifier = 1;
                    // иные режимы возможны в Firefox
                } else if (event.deltaMode === event.DOM_DELTA_LINE) {
                  var modifier = parseInt(getComputedStyle(this).lineHeight);
                    } else if (event.deltaMode === event.DOM_DELTA_PAGE) {
                    modifier = this.clientHeight;
                    }
                
                if (event.deltaY !== 0) {
                    // замена вертикальной прокрутки горизонтальной
                    this.scrollLeft += modifier * event.deltaY;
                    event.preventDefault();
                }
    
            })};
    }, [selectedRoute]);

    // Горизонтальная прокрутка
    useEffect(() => {
        if (selectedRoute) {
            document.getElementById("horizontal-scroller").addEventListener('wheel', function(event) {
                if (event.deltaMode === event.DOM_DELTA_PIXEL) {
                    // let modifier = 1;
                    // иные режимы возможны в Firefox
                } else if (event.deltaMode === event.DOM_DELTA_LINE) {
                  var modifier = parseInt(getComputedStyle(this).lineHeight);
                    } else if (event.deltaMode === event.DOM_DELTA_PAGE) {
                    modifier = this.clientHeight;
                    }
                
                if (event.deltaY !== 0) {
                    // замена вертикальной прокрутки горизонтальной
                    this.scrollLeft += modifier * event.deltaY;
                    event.preventDefault();
                }
    
            })};
    }, [selectedRoute]);

    console.log(selectedRoute);
    return (
    <div ref={tripRef} className={`route_info_slide_in ${customClass}`}>
        <div className='route_head'>
            <div className='route_header'>
                <div className='route_close'>
                    <button className="close_button" onClick={handleCloseClick}>
                        <img src={back} alt='' />
                    </button>
                </div>
                <div className="route_info_content">
                    <p className='route_info_id'>Маршрут №{selectedRoute.id}</p>
                    <p className='route_info_date'>{selectedRoute.date}</p>
                    <h4>{selectedRoute.name}</h4>
                </div>
            </div>
            <div className='route_info_blocks'>
                <div className='route_info_block route_info_range'>{selectedRoute.distance} <span className='route_info_small'>км.</span></div>
                <div className='route_info_block route_info_ages'>
                    {selectedRoute.year_st}-{selectedRoute.year_en}
                    {selectedRoute.sex === 'A' ?
                        (
                            <div className='route_info_sex'>
                                <Male fill={'#0912DB'} width={'15px'}/>
                                <Female fill={'#0912DB'} width={'15px'}/>
                            </div>
                        ) : null}
                    {selectedRoute.sex === 'M' ?
                        (
                            <div className='route_info_sex'>
                                <Male fill={'#0912DB'} />
                            </div>
                        ) : null}

                        {selectedRoute.sex === 'W' ?
                            (
                                <div className='route_info_sex'>
                                    <Female fill={'#0912DB'} />
                                </div>
                            ) : null}
                    </div>
                    <div className='route_info_block route_info_time'>{selectedRoute.time_sp} <span className='route_info_small'>мин.</span></div>
                </div>
            </div>
            <div className='route_img'>
                {/* <img src={phone} alt='' /> */}
                <a href="https://yandex.ru/maps/?um=constructor%3A6e3dca864c766510bf6e3faf979864e2734079597aae16e2ce7cadd8f0ffd821&amp;source=constructorStatic" target="_blank"><img src="https://api-maps.yandex.ru/services/constructor/1.0/static/?um=constructor%3A6e3dca864c766510bf6e3faf979864e2734079597aae16e2ce7cadd8f0ffd821&amp;width=500&amp;height=400&amp;lang=ru_RU" alt="" /></a>
            </div>
            <div className='route_bottom'>
                {selectedRoute.registered_users.length !== 0 && (
                    <div className='route_travelers'>
                        <h4>Ваши спутники: </h4>
                        <div className="friends">
                            {selectedRoute.registered_users.map(item => (
                                <Link to={`/profile/${item.user.tg_id}`} key={item.user.tg_id}>
                                    <div className="friend" id="#">
                                        <img className="friend_avatar" src={account} alt="avatar"></img>
                                        <div className="friend_level">{item.user.level}</div>
                                    </div>
                                </Link>
                            ))}
                            {/* <div className="friend" id="#">
                                <img className="friend_avatar" src={account} alt="avatar"></img>
                                <div className="friend_level">123</div>
                            </div>
                            <div className="friend" id="#">
                                <img className="friend_avatar" src={account} alt="avatar"></img>
                                <div className="friend_level">4</div>
                            </div>
                            <div className="friend" id="#">
                                <img className="friend_avatar" src={account} alt="avatar"></img>
                                <div className="friend_level">45</div>
                            </div> */}
                        </div>
                    </div>
                )}
                <div className="footer_nav">
                    {registr && (
                        <div className='route_button_chat'>
                            <button className='button_chat' onClick={() => handleJoinButton(selectedRoute)}>Перейти в чат</button>
                        </div>
                    )}
                    {!registr && (
                        <div className='route_button_chat'>
                            <button className='button_registr' onClick={handleRegistrButton}>Заполнить профиль</button>
                            <p className='route_register_text'>Заполните небольшую анкету чтобы мы могли предлагать вам только подходящие маршруты.</p>
                        </div>

                    )}
                    <div className='route_share'>
                        <img src={share} alt='share' />
                        Поделиться маршрутом
                    </div>
                </div>
            </div>
        </div>
        
    )
}