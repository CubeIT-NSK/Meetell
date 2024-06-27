import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useFooter } from '../appFooter/FooterContext';
import TripRun from '../appTrip/TripRun';
import './Home.css';

function Home({ setRate, handleClick, style, handleTouchStart, handleTouchEnd }) {
    const parrentRef = useRef();
    const childrenRef = useRef();
    const scrollRef = useRef();
    const { setFooterVisible } = useFooter();
    const [history, setHistory] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(null);

    const navigate = useNavigate();

    

    let user_info = JSON.parse(localStorage.getItem('user_info'));
    let remain_dist = user_info.level.max_distance - user_info.distance;

    useEffect(() => {
        let user_info = JSON.parse(localStorage.getItem('user_info'));
        const fetchHistory = async () => {
            try {
                const response = await fetch('/api/history?id=' + user_info.tg_id);
                const data = await response.json();
                setHistory(data);
            } catch (error) {
                console.error('Error fetching history:', error);
            }
        };

        fetchHistory();
        setFooterVisible(true);

        const updateHeights = () => {
            if (parrentRef.current) {
                let rectParrent = parrentRef.current.getBoundingClientRect();
                parrentRef.current.style.height = window.innerHeight - rectParrent.y + "px";
            }
            if (childrenRef.current) {
                let rectChildren = childrenRef.current.getBoundingClientRect();
                childrenRef.current.style.height = window.innerHeight - rectChildren.y - 20 + "px";
            }
            if (scrollRef.current) {
                let rectScroll = scrollRef.current.getBoundingClientRect();
                scrollRef.current.style.height = window.innerHeight - rectScroll.y - 20 + "px";
            }
        };

        updateHeights();

        window.addEventListener('resize', updateHeights);
        return () => {
            window.removeEventListener('resize', updateHeights);
        };
    }, [style]);

    const handleEntry = (route) => {
        setRate(route);
        navigate('/rate_route');
    };

    const handleButtonClick = (route) => {
        console.log(route);
        setFooterVisible(false);
        setSelectedRoute(route.trip);
    };

    const handleCloseClick = () => {
        setSelectedRoute(null);
        setFooterVisible(true);
    };

    return (
        <div ref={parrentRef} className="home_body" onClick={handleClick} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <div className='home_stat' style={style}>
                <div className='home_level'>{user_info.level.name}</div>
                <div className='home_done'>
                    <div className='home_distanse_user'>{user_info.distance} км</div>
                    <div className='home_distanse_need'>Осталось {remain_dist} км</div>
                </div>
                <div className='home_progress'>
                    <progress value={user_info.distance} max={user_info.level.max_distance} />
                </div>
            </div>


            <div className='home_history'>
                <h3>История маршрутов:</h3>
                <div ref={scrollRef} className='home_scroll'>
                    {history.length === 0 ? (
                        <div ref={childrenRef} className='home_search_result'>

                            <h2>Ничего не найдено</h2>
                            <p>Посмотрите ближайшие маршруты во вкладке ниже</p>
                        </div>
                    ) : (

                        history.map(item => (
                            <div key={item.id} className="search_result_item">
                                <div className='result_item_left'>
                                    <span className='result_item_id'>Маршрут №{item.trip.id}</span>
                                    <p>{item.trip.date}</p>
                                    <h4>{item.trip.name}</h4>

                                    <span className='result_item'>{item.trip.distance} км. {item.trip.time_sp} мин.</span>
                                </div>
                                {item.state === 'W' ? (
                                    <button className='res_item_button result_about_button' onClick={() => handleButtonClick(item)}>Подробнее</button>
                                ) : (
                                    null
                                )}
                                {item.state === 'Q' || item.state === 'Y' || item.state === 'R' ? (
                                    <button className='res_item_button result_rate_button' onClick={() => handleEntry(item)}>Оценить</button>
                                ) : (
                                    null
                                )}
                                {item.state === 'E' || item.state === 'N' ? (
                                    <button className='res_item_button result_end_button'>Завершен</button>
                                ) : (
                                    null
                                )}

                            </div>
                        ))

                    )}
                </div>
            </div>
            {selectedRoute && (
                <TripRun selectedRoute={selectedRoute} user_info={user_info} handleCloseClick={handleCloseClick} customClass="custom-top-style"/>
            )}
        </div>
    )
}

export default Home;