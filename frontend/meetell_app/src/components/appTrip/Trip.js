import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import settings from '../../img/settings_trip.svg';
import add from '../../img/add_trip.svg';
import close from '../../img/filter_close.svg';
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
                        <div className='filter_header'>
                            <div className='filter_city'>
                                <select className='filter_city_select'>
                                    <option selected value="spb">Санкт-Петербург</option>
                                    <option value="spb">Казань</option>
                                    <option value="spb">Новосибирск</option>
                                </select>
                            </div>
                        </div>
                        <div className='filter_close'>
                            <button onClick={toggleFilters} className='close_button'>
                                <img src={close} alt='' />
                            </button>
                        </div>
                        <p>Дата маршрута</p>
                        <div className='filter_date_trip'>
                            <select className='filter_date_select'>
                                <option selected value="spb">11</option>
                                <option value="spb">12</option>
                                <option value="spb">13</option>
                            </select>
                            <select className='filter_date_select'>
                                <option selected value="spb">сентябрь</option>
                                <option value="spb">октябрь</option>
                                <option value="spb">ноябрь</option>
                            </select>
                            <select className='filter_date_select'>
                                <option selected value="spb">2024</option>
                                <option value="spb">2025</option>
                                <option value="spb">2026</option>
                            </select>
                        </div>
                        <p>Время встречи</p>
                        <div className='filter_date_trip'>
                            <select className='filter_date_select'>
                                <option selected value="spb">11</option>
                                <option value="spb">12</option>
                                <option value="spb">13</option>
                            </select>
                            <select className='filter_date_select'>
                                <option selected value="spb">сентябрь</option>
                                <option value="spb">октябрь</option>
                                <option value="spb">ноябрь</option>
                            </select>
                            <select className='filter_date_select'>
                                <option selected value="spb">2024</option>
                                <option value="spb">2025</option>
                                <option value="spb">2026</option>
                            </select>
                        </div>


                        <div className='filter_buttons'>
                            <button onClick={resetFilters} className='reset_button'>Сбросить</button>
                        </div>
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
