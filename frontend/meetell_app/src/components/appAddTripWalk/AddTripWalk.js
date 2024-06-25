import React, { useState, useEffect, useRef } from "react";
import { useFooter } from '../appFooter/FooterContext';
import "./AddTripWalk.css";

import BackButton from "../BackButton";
import back from '../../img/back.svg'

export default function AddTripWalk() {

    const [showFilters, setShowFilters] = useState(false);
    const childrenRef = useRef();
    const filterRef = useRef(null);
    const tripRef = useRef(null);
    const { setFooterVisible } = useFooter();
    setFooterVisible(false);

    const today = new Date();
    const years = [today.getFullYear(), today.getFullYear() + 1];
    const [selectedYear, setSelectedYear] = useState(today.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
    const [selectedDay, setSelectedDay] = useState(today.getDate());
    const [selectedAgeSt, setselectedAgeSt] = useState(0);
    const [selectedAgeEn, setselectedAgeEn] = useState(100);
    const [days, setDays] = useState([]);
    const [ages, setAges] = useState([]);

    const [isDataIncorrect, setIsDataIncorrect] = useState(false);
    const [isDataСorrect, setIsDataСorrect] = useState(true);

    const [isAgeInCorrect, setIsAgeInCorrect] = useState(false);
    const [isAgeСorrect, setIsAgeСorrect] = useState(true);

    const [selectedSex, setSelectedSex] = useState('');
    const [selectedRoute, setSelectedRoute] = useState(null);

    const [SelectedNameTrip, setNameTrip] = useState('');
    const [SelectedStartedTime, setStartTime] = useState('');
    const [SelectedCity, setCity] = useState('');

    const parrentRef = useRef();

    useEffect(() => {
        let rectParrent = parrentRef.current.getBoundingClientRect();
        parrentRef.current.style.height = window.innerHeight - rectParrent.y + "px";
    }, []);

    useEffect(() => {
        updateDays(selectedYear, selectedMonth);
    }, [selectedYear, selectedMonth]);

    const handleSexChange = (e) => {
        setSelectedSex(e.target.value);
        console.log(e.target.value);
    };

    useEffect(() => {
        updateAges();
    }, []);

    const updateAges = () => {
        const ages = Array.from({ length: 101 }, (_, i) => i);
        setAges(ages);
    };

    const updateDays = (year, month) => {
        const daysInMonth = new Date(year, month, 0).getDate();
        const newDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
        setDays(newDays);
    };

    const checkValuesDate = (year, month, day) => {
        const selectedDate = new Date(year, month - 1, day, 23, 59, 59);
        const isDateInvalid = selectedDate <= today;
        setIsDataIncorrect(isDateInvalid);
        setIsDataСorrect(!isDateInvalid);
    };

    const handleYearChange = (e) => {
        setSelectedYear(parseInt(e.target.value, 10));
        checkValuesDate(parseInt(e.target.value, 10), selectedMonth, selectedDay);
        console.log(e.target.value);
    };

    const handleMonthChange = (e) => {
        setSelectedMonth(parseInt(e.target.value, 10));
        checkValuesDate(selectedYear, parseInt(e.target.value, 10), selectedDay);
        console.log(e.target.value);
    };

    const handleDayChange = (e) => {
        setSelectedDay(parseInt(e.target.value, 10));
        checkValuesDate(selectedYear, selectedMonth, parseInt(e.target.value, 10));
        console.log(e.target.value);
    };

    const handleAgeStChange = (e) => {
        if (parseInt(e.target.value, 10) > parseInt(selectedAgeEn, 10)) {
            setIsAgeСorrect(false);
            setIsAgeInCorrect(true);
        } else {
            setIsAgeСorrect(true);
            setIsAgeInCorrect(false);
        }
        setselectedAgeSt(e.target.value);
        console.log(e.target.value);
    };

    const handleAgeEnChange = (e) => {
        if (parseInt(selectedAgeSt, 10) > parseInt(e.target.value, 10)) {
            setIsAgeСorrect(false);
            setIsAgeInCorrect(true);
        } else {
            setIsAgeСorrect(true);
            setIsAgeInCorrect(false);
        }
        setselectedAgeEn(e.target.value);
        console.log(e.target.value);
    };

    const handleNameTripChange = (e) => {
        setNameTrip(e.target.value);
        console.log(e.target.value);
    };
    
    const handleStartTimeChange = (e) => {
        setStartTime(e.target.value);
        console.log(e.target.value);
    };
    
    const handleCityChange = (e) => {
        setCity(e.target.value);
        console.log(e.target.value);
    };

    return (
        <div className="header-trip">
            <div className="header-trip-data">
                <BackButton setSelectedRoute={setSelectedRoute} />
                <p>Предложить маршрут</p>
            </div>
            <div className="background-trip" ref={parrentRef}>
                <div className="settings-data-trip">
                    <div className="large-frame">
                        <p>Название<br />маршрута:</p>
                        <input className="large-frame-data" placeholder="Название" onChange={handleNameTripChange} />
                        <p>Возрастная<br />группа:</p>
                        <div className='filter_time_add_trip'>
                            <select
                                className='filter_time_select_add_trip'
                                onChange={handleAgeStChange}
                                value={selectedAgeSt}
                                style={{ backgroundColor: isAgeСorrect ? '#FFFFFF' : '#FFF4F4' }}
                            >
                                {ages.map(age => (
                                    <option key={age} value={age}>от {age}</option>
                                ))}
                            </select>
                            <select
                                className='filter_time_select_add_trip'
                                onChange={handleAgeEnChange}
                                value={selectedAgeEn}
                                style={{ backgroundColor: isAgeСorrect ? '#FFFFFF' : '#FFF4F4' }}
                            >
                                {ages.map(age => (
                                    <option key={age} value={age}>до {age}</option>
                                ))}
                            </select>
                        </div>
                        <p>Компания:</p>
                        <div className='filter_sex_trip'>
                            <div className='filter_sex_btn_add_trip'>
                                <input
                                    id='sex_men'
                                    type='checkbox'
                                    value='men'
                                    checked={selectedSex === 'men'}
                                    onChange={handleSexChange} />
                                <label htmlFor="sex_men" className="sex-sex">
                                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M10.1055 0.000703182C9.75999 0.017228 9.49325 0.310728 9.50978 0.656264C9.5263 1.0018 9.8198 1.26854 10.1653 1.25202H13.033L8.22549 6.05588C7.37922 5.39801 6.32038 5.00232 5.16861 5.00232C2.41448 5.00232 0.166992 7.24613 0.166992 10.0003C0.166992 12.7545 2.41448 15.0019 5.16861 15.0019C7.92274 15.0019 10.1653 12.7544 10.1653 10.0003C10.1653 8.84853 9.76964 7.78848 9.11178 6.9422L13.9156 2.13466V5.00232C13.9156 5.34785 14.1957 5.62799 14.5413 5.62799C14.8869 5.62799 15.167 5.34789 15.167 5.00232V0.624543C15.1664 0.280726 14.8882 0.00199235 14.5444 0.000703182H10.1653C10.1454 -0.000234394 10.1255 -0.000234394 10.1055 0.000703182ZM5.16861 6.24879C7.24737 6.24879 8.91403 7.92158 8.91403 10.0003C8.91403 12.079 7.24737 13.7506 5.16861 13.7506C3.08985 13.7506 1.41709 12.0791 1.41709 10.0003C1.41709 7.92154 3.08985 6.24879 5.16861 6.24879Z" fill="#0A0930" />
                                    </svg>
                                    Мужская
                                </label>
                            </div>
                            <div className='filter_sex_btn_add_trip'>
                                <input
                                    id='sex_women'
                                    type='checkbox'
                                    value='women'
                                    checked={selectedSex === 'women'}
                                    onChange={handleSexChange} />
                                <label htmlFor="sex_women" className="sex-sex">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_408_1958)">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M12.8019 2.19498C11.0046 0.397619 8.07429 0.400806 6.27693 2.19817C4.61742 3.85768 4.49155 6.48048 5.89612 8.28817L4.23579 9.94849L3.01363 8.72634C3.0003 8.71153 2.9862 8.69743 2.97142 8.68412C2.72978 8.47568 2.36493 8.50262 2.15654 8.74426C1.95454 8.97843 1.97274 9.3301 2.19783 9.54219L3.41999 10.7643L0.30893 13.8091C-0.235097 14.3531 0.580727 15.1689 1.12475 14.6249L4.23581 11.5802L5.45876 12.8031C5.68905 13.0234 6.05429 13.0153 6.27458 12.785C6.488 12.5619 6.488 12.2104 6.27458 11.9873L5.05164 10.7643L6.71276 9.10322C8.52072 10.5053 11.1435 10.3817 12.802 8.7232C14.5993 6.92579 14.5993 3.99234 12.8019 2.19498ZM11.9861 3.0108C13.3427 4.36742 13.3427 6.55074 11.9861 7.90733C10.6295 9.26391 8.44694 9.26312 7.09036 7.90654C5.73377 6.54995 5.73614 4.3706 7.09275 3.01399C8.44937 1.65738 10.6295 1.65422 11.9861 3.0108Z" fill="#0A0930" />
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
                                <input
                                    id='sex_all'
                                    type='checkbox'
                                    value='all'
                                    checked={selectedSex === 'all'}
                                    onChange={handleSexChange} />
                                <label htmlFor="sex_all">
                                    <div className="two-sex-imgs">
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_408_1958)">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M12.8019 2.19498C11.0046 0.397619 8.07429 0.400806 6.27693 2.19817C4.61742 3.85768 4.49155 6.48048 5.89612 8.28817L4.23579 9.94849L3.01363 8.72634C3.0003 8.71153 2.9862 8.69743 2.97142 8.68412C2.72978 8.47568 2.36493 8.50262 2.15654 8.74426C1.95454 8.97843 1.97274 9.3301 2.19783 9.54219L3.41999 10.7643L0.30893 13.8091C-0.235097 14.3531 0.580727 15.1689 1.12475 14.6249L4.23581 11.5802L5.45876 12.8031C5.68905 13.0234 6.05429 13.0153 6.27458 12.785C6.488 12.5619 6.488 12.2104 6.27458 11.9873L5.05164 10.7643L6.71276 9.10322C8.52072 10.5053 11.1435 10.3817 12.802 8.7232C14.5993 6.92579 14.5993 3.99234 12.8019 2.19498ZM11.9861 3.0108C13.3427 4.36742 13.3427 6.55074 11.9861 7.90733C10.6295 9.26391 8.44694 9.26312 7.09036 7.90654C5.73377 6.54995 5.73614 4.3706 7.09275 3.01399C8.44937 1.65738 10.6295 1.65422 11.9861 3.0108Z" fill="#0A0930" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_408_1958">
                                                    <rect width="15" height="15" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.1055 0.000703182C9.75999 0.017228 9.49325 0.310728 9.50978 0.656264C9.5263 1.0018 9.8198 1.26854 10.1653 1.25202H13.033L8.22549 6.05588C7.37922 5.39801 6.32038 5.00232 5.16861 5.00232C2.41448 5.00232 0.166992 7.24613 0.166992 10.0003C0.166992 12.7545 2.41448 15.0019 5.16861 15.0019C7.92274 15.0019 10.1653 12.7544 10.1653 10.0003C10.1653 8.84853 9.76964 7.78848 9.11178 6.9422L13.9156 2.13466V5.00232C13.9156 5.34785 14.1957 5.62799 14.5413 5.62799C14.8869 5.62799 15.167 5.34789 15.167 5.00232V0.624543C15.1664 0.280726 14.8882 0.00199235 14.5444 0.000703182H10.1653C10.1454 -0.000234394 10.1255 -0.000234394 10.1055 0.000703182ZM5.16861 6.24879C7.24737 6.24879 8.91403 7.92158 8.91403 10.0003C8.91403 12.079 7.24737 13.7506 5.16861 13.7506C3.08985 13.7506 1.41709 12.0791 1.41709 10.0003C1.41709 7.92154 3.08985 6.24879 5.16861 6.24879Z" fill="#0A0930" />
                                        </svg>
                                    </div>
                                    Смешанная
                                </label>
                            </div>
                        </div>
                        <p>Город:</p>
                        <select name="select-city-data" onChange={handleCityChange}>
                            <option value="city-m">Москва</option>
                            <option value="city-p" selected>Санкт-Петербург</option>
                        </select>
                        <p>Дата:</p>
                        <div className="date-settings">
                            <select name="select-date-day"
                                onChange={handleDayChange}
                                value={selectedDay}
                            >
                                {days.map(day => (
                                    <option key={day} value={day}>{day}</option>
                                ))}
                            </select>
                            <select name="select-date-month"
                                onChange={handleMonthChange}
                                value={selectedMonth}
                            >
                                <option value={1}>Январь</option>
                                <option value={2}>Февраль</option>
                                <option value={3}>Март</option>
                                <option value={4}>Апрель</option>
                                <option value={5}>Май</option>
                                <option value={6}>Июнь</option>
                                <option value={7}>Июль</option>
                                <option value={8}>Август</option>
                                <option value={9}>Сентябрь</option>
                                <option value={10}>Октябрь</option>
                                <option value={11}>Ноябрь</option>
                                <option value={12}>Декабрь</option>
                            </select>
                            <select name="select-date-year"
                                onChange={handleYearChange}
                                value={selectedYear}
                            >
                                {years.map(item => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <p>Время встречи:</p>
                        <input className="time-data" placeholder="Время" onChange={handleStartTimeChange}/>
                    </div>
                </div>
                <button className="submit-build">Опубликовать</button>
            </div>
        </div>

    );
}
