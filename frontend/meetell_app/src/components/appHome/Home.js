import React, { useEffect, useRef } from 'react';
import { useFooter } from '../appFooter/FooterContext';
import './Home.css';

const Home = () => {
    const parrentRef = useRef();
    const childrenRef = useRef();
    const { setFooterVisible } = useFooter();
    setFooterVisible(true);
    let user_info = JSON.parse(localStorage.getItem('user_info'));
    let remain_dist = user_info.level.max_distance - user_info.distance;
    useEffect(() => {
        let rectParrent = parrentRef.current.getBoundingClientRect();
        parrentRef.current.style.height = window.innerHeight - rectParrent.y + "px";
        let rectChildren = childrenRef.current.getBoundingClientRect();
        childrenRef.current.style.height = window.innerHeight - rectChildren.y - 20 + "px";
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
                    <progress value={user_info.distance} max={user_info.level.max_distance}/>
                </div>
            </div>

            <div className='home_history'>
                <h3>История маршрутов:</h3>
                <div ref={childrenRef} className='home_search_result'>
                    <h2>Ничего не найдено</h2>
                    <p>Посмотрите ближайшие маршруты во вкладке ниже</p>
                </div>
            </div>
        </div>
    )
}

export default Home;