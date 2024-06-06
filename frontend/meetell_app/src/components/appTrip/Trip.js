import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import settings from '../../img/settings_trip.svg';
import add from '../../img/add_trip.svg';
import './Trip.css';

function Trip() {
    const [showFilters, setShowFilters] = useState(false);
    const parrentRef = useRef();
    const childrenRef = useRef();
    const filterRef = useRef(null);

    useEffect(() => {
        let rectParrent = parrentRef.current.getBoundingClientRect();
        parrentRef.current.style.height = window.innerHeight - rectParrent.y + "px";
        let rectChildren = childrenRef.current.getBoundingClientRect();
        childrenRef.current.style.height = window.innerHeight - rectChildren.y - 20 + "px";
        if (filterRef.current) {
            let rectFilter = filterRef.current.getBoundingClientRect();
            filterRef.current.style.top = -rectFilter.y + "px";
        }
    }, []);

    const toggleFilters = () => {
        setShowFilters(prevState => !prevState);
    };

    const resetFilters = () => {
        // Логика для сброса фильтров
        console.log("Фильтры сброшены");
    };

    return (
        <div ref={parrentRef} className="trip_body">
            <div className='trip_search'>
                <div className='trip_filters'>
                    <img src={settings} alt='' onClick={toggleFilters} style={{ cursor: 'pointer' }} />
                    <button className='trip_add'>
                        <span>Предложить маршрут</span>
                        <img src={add} alt='' />
                    </button>
                </div>
                {showFilters && (
                    <div ref={filterRef} className='filter_options'>
                        <div className='filter_buttons'>
                            <button onClick={resetFilters} className='reset_button'>Сбросить</button>
                            <button onClick={toggleFilters} className='close_button'>Закрыть фильтры</button>
                        </div>
                        {/* Здесь добавьте ваши элементы фильтров */}
                        <p>Фильтры</p>
                    </div>
                )}
                <div ref={childrenRef} className='home_search_result'>
                    <h2>По вашему запросу ничего не найдено</h2>
                    <p>Измените данные фильтра</p>
                </div>
            </div>
        </div>
    );
}

export default Trip;
