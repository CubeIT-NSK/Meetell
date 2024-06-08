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
        // if (filterRef.current) {
        //     let rectFilter = filterRef.current.getBoundingClientRect();
        //     filterRef.current.style.top = -rectFilter.y + "px";
        // }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setShowFilters(false);
            }
        };

        if (showFilters) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showFilters]);

    const toggleFilters = () => {
        setShowFilters(prevState => !prevState);
    };

    const resetFilters = () => {
        // Логика для сброса фильтров
        console.log("Фильтры сброшены");
    };

    return (
        <div ref={parrentRef} className="trip_body">
            <div className={`content ${showFilters ? 'blur-content' : ''}`}>
                <div className='trip_search'>
                    <div className='trip_filters'>
                        <img src={settings} alt='' onClick={toggleFilters} style={{ cursor: 'pointer' }} />
                        <button className='trip_add'>
                            <span>Предложить маршрут</span>
                            <img src={add} alt='' />
                        </button>
                    </div>
                </div>
                <div ref={childrenRef} className='home_search_result'>
                    <h2>По вашему запросу ничего не найдено</h2>
                    <p>Измените данные фильтра</p>
                </div>
            </div>
            <div ref={filterRef} className={`filter_options ${showFilters ? 'slide-down' : 'slide-up'}`}>
                <div className='filter_header'>
                    <div className='filter_city'>
                        <select className='filter_city_select'>
                            <option selected value="spb">Санкт-Петербург</option>
                            <option value="spb">Казань</option>
                            <option value="spb">Новосибирск</option>
                        </select>
                    </div>
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
                <div className='filter_time_trip'>
                    <select className='filter_time_select'>
                        <option selected value="spb">от 10:00</option>
                        <option value="spb">от 10:30</option>
                        <option value="spb">от 11:00</option>
                    </select>
                    <select className='filter_time_select'>
                        <option selected value="spb">до 20:00</option>
                        <option value="spb">до 20:30</option>
                        <option value="spb">до 21:00</option>
                    </select>
                </div>
                <p>Компания</p>
                <div className='filter_sex_trip'>
                    <div className='filter_sex_btn'>
                        <input id='sex_men' type='checkbox' value='men' />
                        <label for="sex_men">Мужская</label>
                    </div>
                    <div className='filter_sex_btn'>
                        <input id='sex_women' type='checkbox' value='men' />
                        <label for="sex_women">Женская</label>
                    </div>
                    <div className='filter_sex_btn'>
                        <input id='sex_all' type='checkbox' value='men' />
                        <label for="sex_all">Смешанная</label>
                    </div>
                </div>
                <p>Возрастная группа</p>
                <div className='filter_time_trip'>
                    <select className='filter_time_select'>
                        <option selected value="spb">от 0</option>
                        <option value="spb">от 1</option>
                        <option value="spb">от 2</option>
                    </select>
                    <select className='filter_time_select'>
                        <option selected value="spb">до 100</option>
                        <option value="spb">до 99</option>
                        <option value="spb">до 98</option>
                    </select>
                </div>
                <p>Время прогулки</p>
                <div className='filter_sex_trip'>
                    <div className='filter_sex_btn'>
                        <input id='under_60' type='checkbox' value='men' />
                        <label for="under_60">до 60 мин</label>
                    </div>
                    <div className='filter_sex_btn'>
                        <input id='under_120' type='checkbox' value='men' />
                        <label for="under_120">до 120 мин</label>
                    </div>
                    <div className='filter_sex_btn'>
                        <input id='upper_120' type='checkbox' value='men' />
                        <label for="upper_120">от 120 мин</label>
                    </div>
                </div>
                <div className='filter_buttons'>
                    <button onClick={resetFilters} className='reset_button'>Сбросить</button>
                    <button className='save_button'>Сохранить</button>
                </div>
            </div>
        </div >
    );
}

export default Trip;
