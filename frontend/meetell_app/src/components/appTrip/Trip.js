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

    const today = new Date();
    const years = [{"year" : today.getFullYear(), "selected": true},{"year" : today.getFullYear() + 1, "selected": false}]
    console.log(years);

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
                    <select className='filter_date_select' name='filter_year'>
                    {years.map(item => ( 
                        <option {item.selected === true ? selected: null} value={item}>{item.year}</option>
                    ))}
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
                        <label for="sex_men">
                            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.1055 0.000703182C9.75999 0.017228 9.49325 0.310728 9.50978 0.656264C9.5263 1.0018 9.8198 1.26854 10.1653 1.25202H13.033L8.22549 6.05588C7.37922 5.39801 6.32038 5.00232 5.16861 5.00232C2.41448 5.00232 0.166992 7.24613 0.166992 10.0003C0.166992 12.7545 2.41448 15.0019 5.16861 15.0019C7.92274 15.0019 10.1653 12.7544 10.1653 10.0003C10.1653 8.84853 9.76964 7.78848 9.11178 6.9422L13.9156 2.13466V5.00232C13.9156 5.34785 14.1957 5.62799 14.5413 5.62799C14.8869 5.62799 15.167 5.34789 15.167 5.00232V0.624543C15.1664 0.280726 14.8882 0.00199235 14.5444 0.000703182H10.1653C10.1454 -0.000234394 10.1255 -0.000234394 10.1055 0.000703182ZM5.16861 6.24879C7.24737 6.24879 8.91403 7.92158 8.91403 10.0003C8.91403 12.079 7.24737 13.7506 5.16861 13.7506C3.08985 13.7506 1.41709 12.0791 1.41709 10.0003C1.41709 7.92154 3.08985 6.24879 5.16861 6.24879Z" fill="#0A0930" />
                            </svg>
                            Мужская
                        </label>
                    </div>
                    <div className='filter_sex_btn'>
                        <input id='sex_women' type='checkbox' value='men' />
                        <label for="sex_women">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_408_1958)">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.8019 2.19498C11.0046 0.397619 8.07429 0.400806 6.27693 2.19817C4.61742 3.85768 4.49155 6.48048 5.89612 8.28817L4.23579 9.94849L3.01363 8.72634C3.0003 8.71153 2.9862 8.69743 2.97142 8.68412C2.72978 8.47568 2.36493 8.50262 2.15654 8.74426C1.95454 8.97843 1.97274 9.3301 2.19783 9.54219L3.41999 10.7643L0.30893 13.8091C-0.235097 14.3531 0.580727 15.1689 1.12475 14.6249L4.23581 11.5802L5.45876 12.8031C5.68905 13.0234 6.05429 13.0153 6.27458 12.785C6.488 12.5619 6.488 12.2104 6.27458 11.9873L5.05164 10.7643L6.71276 9.10322C8.52072 10.5053 11.1435 10.3817 12.802 8.7232C14.5993 6.92579 14.5993 3.99234 12.8019 2.19498ZM11.9861 3.0108C13.3427 4.36742 13.3427 6.55074 11.9861 7.90733C10.6295 9.26391 8.44694 9.26312 7.09036 7.90654C5.73377 6.54995 5.73614 4.3706 7.09275 3.01399C8.44937 1.65738 10.6295 1.65422 11.9861 3.0108Z" fill="#0A0930" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_408_1958">
                                        <rect width="15" height="15" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            Женская
                        </label>
                    </div>
                    <div className='filter_sex_btn'>
                        <input id='sex_all' type='checkbox' value='men' />
                        <label for="sex_all">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_408_1958)">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.8019 2.19498C11.0046 0.397619 8.07429 0.400806 6.27693 2.19817C4.61742 3.85768 4.49155 6.48048 5.89612 8.28817L4.23579 9.94849L3.01363 8.72634C3.0003 8.71153 2.9862 8.69743 2.97142 8.68412C2.72978 8.47568 2.36493 8.50262 2.15654 8.74426C1.95454 8.97843 1.97274 9.3301 2.19783 9.54219L3.41999 10.7643L0.30893 13.8091C-0.235097 14.3531 0.580727 15.1689 1.12475 14.6249L4.23581 11.5802L5.45876 12.8031C5.68905 13.0234 6.05429 13.0153 6.27458 12.785C6.488 12.5619 6.488 12.2104 6.27458 11.9873L5.05164 10.7643L6.71276 9.10322C8.52072 10.5053 11.1435 10.3817 12.802 8.7232C14.5993 6.92579 14.5993 3.99234 12.8019 2.19498ZM11.9861 3.0108C13.3427 4.36742 13.3427 6.55074 11.9861 7.90733C10.6295 9.26391 8.44694 9.26312 7.09036 7.90654C5.73377 6.54995 5.73614 4.3706 7.09275 3.01399C8.44937 1.65738 10.6295 1.65422 11.9861 3.0108Z" fill="#0A0930" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_408_1958">
                                        <rect width="15" height="15" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.1055 0.000703182C9.75999 0.017228 9.49325 0.310728 9.50978 0.656264C9.5263 1.0018 9.8198 1.26854 10.1653 1.25202H13.033L8.22549 6.05588C7.37922 5.39801 6.32038 5.00232 5.16861 5.00232C2.41448 5.00232 0.166992 7.24613 0.166992 10.0003C0.166992 12.7545 2.41448 15.0019 5.16861 15.0019C7.92274 15.0019 10.1653 12.7544 10.1653 10.0003C10.1653 8.84853 9.76964 7.78848 9.11178 6.9422L13.9156 2.13466V5.00232C13.9156 5.34785 14.1957 5.62799 14.5413 5.62799C14.8869 5.62799 15.167 5.34789 15.167 5.00232V0.624543C15.1664 0.280726 14.8882 0.00199235 14.5444 0.000703182H10.1653C10.1454 -0.000234394 10.1255 -0.000234394 10.1055 0.000703182ZM5.16861 6.24879C7.24737 6.24879 8.91403 7.92158 8.91403 10.0003C8.91403 12.079 7.24737 13.7506 5.16861 13.7506C3.08985 13.7506 1.41709 12.0791 1.41709 10.0003C1.41709 7.92154 3.08985 6.24879 5.16861 6.24879Z" fill="#0A0930" />
                            </svg>
                            Смешанная
                        </label>
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
