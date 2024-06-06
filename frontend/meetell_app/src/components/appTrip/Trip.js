import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import settings from '../../img/settings_trip.svg';
import add from '../../img/add_trip.svg'
import './Trip.css';


function Trip() {
    const parrentRef = useRef();
    const childrenRef = useRef();
    useEffect(() => {
        let rectParrent = parrentRef.current.getBoundingClientRect();
        parrentRef.current.style.height = window.innerHeight - rectParrent.y + "px";
        let rectChildren = childrenRef.current.getBoundingClientRect();
        childrenRef.current.style.height = window.innerHeight - rectChildren.y - 20 + "px";
    }, []);
    return (
        <div ref={parrentRef} className="trip_body">
            <div className='trip_search'>
                <div className='trip_filters'>
                    <img src={settings} alt='' />
                    <button className='trip_add'>
                        <span>Предложить маршрут</span>
                        <img src={add} alt='' />
                    </button>
                </div>
                <div ref={childrenRef} className='home_search_result'>
                    <h2>По вашему запросу ничего не найдено</h2>
                    <p>Измените данные фильтра</p>
                </div>
            </div>
        </div>
    )
}

export default Trip;