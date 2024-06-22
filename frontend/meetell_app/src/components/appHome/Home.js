import React, { useEffect, useRef, useState } from 'react';
import { useFooter } from '../appFooter/FooterContext';
import './Home.css';

const Home = () => {
    const parrentRef = useRef();
    const childrenRef = useRef();
    const scrollRef = useRef();
    const { setFooterVisible } = useFooter();
    const [history, setHistory] = useState([]);
    setFooterVisible(true);

    let user_info = JSON.parse(localStorage.getItem('user_info'));
    let remain_dist = user_info.level.max_distance - user_info.distance;

    useEffect(() => {

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

        let rectParrent = parrentRef.current.getBoundingClientRect();
        parrentRef.current.style.height = window.innerHeight - rectParrent.y + "px";
        let rectChildren = childrenRef.current.getBoundingClientRect();
        childrenRef.current.style.height = window.innerHeight - rectChildren.y - 20 + "px";
        let rectScroll = scrollRef.current.getBoundingClientRect();
        scrollRef.current.style.height = window.innerHeight - rectScroll.y - 20 + "px";
    }, []);
    return (
        <div ref={parrentRef} className="home_body">
            <div className='home_stat'>
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
                                    <button className='res_item_button result_about_button'>Подробнее</button>
                                ) : (
                                    null
                                )}
                                {item.state === 'Q' ? (
                                    <button className='res_item_button result_rate_button'>Оценить</button>
                                ) : (
                                    null
                                )}
                                {item.state === 'E' ? (
                                    <button className='res_item_button result_end_button'>Завершен</button>
                                ) : (
                                    null
                                )}

                            </div>
                        ))

                    )}
                </div>

            </div>

        </div>
    )
}

export default Home;