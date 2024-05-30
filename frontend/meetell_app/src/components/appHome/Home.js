import React, { useEffect, useRef } from 'react';
import './Home.css';

const Home = () => {
    const parrentRef = useRef();
    const childrenRef = useRef();
    useEffect(() => {
        console.log(parrentRef);
        console.log(childrenRef);
        let rectParrent = parrentRef.current.getBoundingClientRect();
        parrentRef.current.style.height = window.innerHeight - rectParrent.y + "px";
        let rectChildren = childrenRef.current.getBoundingClientRect();
        console.log(rectChildren);
        childrenRef.current.style.height = window.innerHeight - rectChildren.y - 20 + "px";
    }, []);
    return (
        <div ref={parrentRef} className="home_body">
            <div className='home_stat'>
                <div className='home_level'>1 Уровень</div>
                <div className='home_done'>
                    <div className='home_distanse_user'>0 км</div>
                    <div className='home_distanse_need'>Осталось 1 км</div>
                </div>
                <div className='home_progress'>
                    <progress value={0.6} />
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