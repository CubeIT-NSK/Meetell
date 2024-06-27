import React, { useEffect, useRef, useState } from 'react';
// import { useNavigate, Link } from "react-router-dom";
import { useFooter } from '../appFooter/FooterContext';
import { Link } from 'react-router-dom';
import settings from '../../img/settings_trip.svg';
// import add from '../../img/add_trip.svg';
import TripRun from './TripRun';
import './Trip.css';



function Trip({ content, setContent }) {
    const [showFilters, setShowFilters] = useState(false);
    const parrentRef = useRef();
    const childrenRef = useRef();
    const filterRef = useRef(null);
    const tripRef = useRef(null);

    const today = new Date();
    const years = [today.getFullYear(), today.getFullYear() + 1];
    const [selectedYear, setSelectedYear] = useState(today.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
    const [selectedDay, setSelectedDay] = useState(today.getDate());
    const [selectedTimeSt, setselectedTimeSt] = useState(today.getHours() + ":00");
    const [selectedTimeEn, setselectedTimeEn] = useState("23:30");
    const [selectedAgeSt, setselectedAgeSt] = useState(0);
    const [selectedAgeEn, setselectedAgeEn] = useState(100);
    const [days, setDays] = useState([]);
    const [times, setTimes] = useState([]);
    const [ages, setAges] = useState([]);

    const [isDataIncorrect, setIsDataIncorrect] = useState(false);
    const [isDataСorrect, setIsDataСorrect] = useState(true);

    const [isTimeInCorrect, setIsTimeInCorrect] = useState(false);
    const [isTimeСorrect, setIsTimeСorrect] = useState(true);

    const [isAgeInCorrect, setIsAgeInCorrect] = useState(false);
    const [isAgeСorrect, setIsAgeСorrect] = useState(true);

    const [selectedSex, setSelectedSex] = useState('A');
    const [selectedTimeTrip, setSelectedTimeTrip] = useState('under_60');

    const [searchResult, setSearchResult] = useState(null);
    const [selectedRoute, setSelectedRoute] = useState(null);

    const { setFooterVisible } = useFooter();

    useEffect(() => {
        setFooterVisible(true);
        let rectParrent = parrentRef.current.getBoundingClientRect();
        parrentRef.current.style.height = window.innerHeight - rectParrent.y + "px";
    }, []);

    useEffect(() => {
        if (!childrenRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let rectChildren = childrenRef.current.getBoundingClientRect();
                    childrenRef.current.style.height = window.innerHeight - rectChildren.y - 20 + "px";
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 1.0,
            }
        );
        const currentRef = childrenRef.current;
        observer.observe(childrenRef.current);

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [searchResult]);

    useEffect(() => {
        if (!tripRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let rectParrent = parrentRef.current.getBoundingClientRect();
                    console.log(rectParrent);
                    tripRef.current.style.height = window.innerHeight - rectParrent.y + "px";
                    console.log("Элемент появился на экране");
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 1.0,
            }
        );
        const currentRef = tripRef.current;
        observer.observe(tripRef.current);

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [selectedRoute]);

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
        setSelectedDay(today.getDate());
        setSelectedMonth(today.getMonth() + 1);
        setSelectedYear(today.getFullYear());
        setselectedTimeSt(today.getHours() + ":00");
        setselectedTimeEn("23:30");
        setselectedAgeSt(0);
        setselectedAgeEn(100);
        setIsDataIncorrect(false);
        setIsTimeInCorrect(false);
        setIsAgeInCorrect(false);
        setIsDataСorrect(true);
        setIsTimeСorrect(true);
        setIsAgeСorrect(true);
        setSelectedSex('');
        setSelectedTimeTrip('');
    };

    useEffect(() => {
        updateDays(selectedYear, selectedMonth);
    }, [selectedYear, selectedMonth]);

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

    const checkValuesTime = (timeSt, timeEn) => {
        if (parseInt(timeSt.split(":")[0]) === parseInt(timeEn.split(":")[0])) {
            if (parseInt(timeSt.split(":")[1]) <= parseInt(timeEn.split(":")[1])) {
                setIsTimeСorrect(true);
                setIsTimeInCorrect(false);
            } else {
                setIsTimeСorrect(false);
                setIsTimeInCorrect(true);
            }
        }
        else if (parseInt(timeSt.split(":")[0]) < parseInt(timeEn.split(":")[0])) {
            setIsTimeСorrect(true);
            setIsTimeInCorrect(false);
        }
        else {
            setIsTimeСorrect(false);
            setIsTimeInCorrect(true);
        }
    };

    const handleYearChange = (e) => {
        setSelectedYear(parseInt(e.target.value, 10));
        checkValuesDate(parseInt(e.target.value, 10), selectedMonth, selectedDay);
    };

    const handleMonthChange = (e) => {
        setSelectedMonth(parseInt(e.target.value, 10));
        checkValuesDate(selectedYear, parseInt(e.target.value, 10), selectedDay);
    };

    const handleDayChange = (e) => {
        setSelectedDay(parseInt(e.target.value, 10));
        checkValuesDate(selectedYear, selectedMonth, parseInt(e.target.value, 10));
    };

    const handleTimeStChange = (e) => {
        setselectedTimeSt(e.target.value);
        checkValuesTime(e.target.value, selectedTimeEn);
    };

    const handleTimeEnChange = (e) => {
        setselectedTimeEn(e.target.value);
        checkValuesTime(selectedTimeSt, e.target.value);
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
    };

    const handleSexChange = (e) => {
        setSelectedSex(e.target.value);
    };

    const handleTimeTripChange = (e) => {
        setSelectedTimeTrip(e.target.value);
    };

    useEffect(() => {
        updateTimes();
    }, []);

    const updateTimes = () => {
        const times = Array.from({ length: 48 }, (_, i) => Math.floor(i / 2) + ":" + (i % 2 === 0 ? "00" : "30"));
        setTimes(times);
    };

    useEffect(() => {
        updateAges();
    }, []);

    const updateAges = () => {
        const ages = Array.from({ length: 101 }, (_, i) => i);
        setAges(ages);
    };

    const handleButtonClick = (route) => {
        setSelectedRoute(route);
        setFooterVisible(false);
    };

    const handleCloseClick = () => {
        setSelectedRoute(null);
        setFooterVisible(true);
    };

    const getAge = (birthday) => {
        const today = new Date();
        const diff = today - birthday;
        const ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    const handleSave = () => {
        const user_info = JSON.parse(localStorage.getItem('user_info'));
        const data = {
            city: 'spb',
            date: `${selectedYear}-${selectedMonth}-${selectedDay}`,
            timeStart: selectedTimeSt,
            timeEnd: selectedTimeEn,
            ageStart: selectedAgeSt,
            ageEnd: selectedAgeEn,
            sex: selectedSex,
            timeTrip: selectedTimeTrip,
            userAge: null,
            userSex: null
        };
        if (user_info.birthday) {
            let year_month_day = user_info.birthday.split('-');
            let year = parseInt(year_month_day[0]);
            let month = parseInt(year_month_day[1]);
            let day = parseInt(year_month_day[2]);
            let birthday = new Date(year, month - 1, day);
            data.userAge = getAge(birthday);
            data.userSex = user_info.sex;
        }
        console.log(data);
        fetch('api/trips', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) {
                    setSearchResult(null);
                } else {
                    setSearchResult(data);
                }
            })
            .catch(error => {
                setSearchResult(null);
            });
    };

    let user_info = localStorage.getItem('user_info');
    user_info = JSON.parse(user_info);
    const isDisabled = user_info.level.id === 1;

    // const handleJoinButton = (route) => {
    //     const user_id = localStorage.getItem('user_id');
    //     route.user_id = parseInt(user_id);
    //     fetch('api/trip', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(route),
    //     })
    //         .then(response => {
    //             loadTelegramWebApp().then(() => {
    //                 if (window.Telegram && window.Telegram.WebApp) {
    //                     const webApp = window.Telegram.WebApp;
    //                     webApp.close()
    //                 }
    //             })

    //         })
    // }

    return (
        <div ref={parrentRef} className="trip_body">
            <div className={`content ${showFilters ? 'blur-content' : ''}${selectedRoute ? 'block_none' : ''}`}>
                <div className='trip_filters'>
                    <img src={settings} alt='' onClick={toggleFilters} style={{ cursor: 'pointer' }} />
                    {/* <button className='trip_add'>
                        <span>Предложить маршрут</span>
                        <img src={add} alt='' />
                    </button> */}
                    {/* <Link to="/addTrip">
                        <button className='trip_add'>
                            <span>Предложить маршрут</span>
                            <img src={add} alt='' />
                        </button>
                    </Link> */}
                </div>

                <div className='trip_search'>
                    {searchResult ? (
                        searchResult.map(item => (
                            <div key={item.id} className="search_result_item">
                                <div className='result_item_left'>
                                    <span className='result_item_id'>Маршрут №{item.id}</span>
                                    <p>{item.date}</p>
                                    <h4>{item.name}</h4>
                                    <span className='result_item'>{item.distance} км. {item.time_sp} мин.</span>
                                </div>
                                <button className='trip_about_button' onClick={() => handleButtonClick(item)}>Подробнее</button>
                            </div>
                        ))
                    ) : (
                        <div ref={childrenRef} className="home_search_result">
                            <h2>По вашему запросу ничего не найдено</h2>
                            <p>Измените данные фильтра</p>
                        </div>
                    )}
                </div>
            </div>
            <div ref={filterRef} className={`filter_options ${showFilters ? 'slide-down' : 'slide-up'}`}>
                <div className='filter_header'>
                    <div className='filter_city'>
                        <select className='filter_city_select' value="spb">
                            <option value="spb">Санкт-Петербург</option>
                            <option value="kzn">Казань</option>
                            <option value="nsk">Новосибирск</option>
                        </select>
                    </div>
                </div>
                <p>Дата маршрута</p>
                <div className='filter_date_trip'>
                    <select
                        className='filter_date_select'
                        onChange={handleDayChange}
                        value={selectedDay}
                        style={{ backgroundColor: isDataСorrect ? '#FFFFFF' : '#FFF4F4' }}
                    >
                        {days.map(day => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </select>
                    <select
                        className='filter_date_select'
                        onChange={handleMonthChange}
                        value={selectedMonth}
                        style={{ backgroundColor: isDataСorrect ? '#FFFFFF' : '#FFF4F4' }}
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
                    <select
                        className='filter_date_select'
                        name='filter_year'
                        onChange={handleYearChange}
                        value={selectedYear}
                        style={{ backgroundColor: isDataСorrect ? '#FFFFFF' : '#FFF4F4' }}
                    >
                        {years.map(item => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}

                    </select>
                </div>
                <p>Время встречи</p>
                <div className='filter_time_trip'>
                    <select
                        className='filter_time_select'
                        onChange={handleTimeStChange}
                        value={selectedTimeSt}
                        style={{ backgroundColor: isTimeСorrect ? '#FFFFFF' : '#FFF4F4' }}
                    >
                        {times.map(time => (
                            <option key={time} value={time}>от {time}</option>
                        ))}
                    </select>
                    <select
                        className='filter_time_select'
                        onChange={handleTimeEnChange}
                        value={selectedTimeEn}
                        style={{ backgroundColor: isTimeСorrect ? '#FFFFFF' : '#FFF4F4' }}
                    >
                        {times.map(time => (
                            <option key={time} value={time}>до {time}</option>
                        ))}
                    </select>
                </div>
                <p>Компания</p>
                <div className='filter_sex_trip'>
                    <div className='filter_sex_btn'>
                        <input
                            id='sex_men'
                            type='checkbox'
                            value='M'
                            checked={selectedSex === 'M'}
                            onChange={handleSexChange} />
                        <label htmlFor="sex_men">
                            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M10.1055 0.000703182C9.75999 0.017228 9.49325 0.310728 9.50978 0.656264C9.5263 1.0018 9.8198 1.26854 10.1653 1.25202H13.033L8.22549 6.05588C7.37922 5.39801 6.32038 5.00232 5.16861 5.00232C2.41448 5.00232 0.166992 7.24613 0.166992 10.0003C0.166992 12.7545 2.41448 15.0019 5.16861 15.0019C7.92274 15.0019 10.1653 12.7544 10.1653 10.0003C10.1653 8.84853 9.76964 7.78848 9.11178 6.9422L13.9156 2.13466V5.00232C13.9156 5.34785 14.1957 5.62799 14.5413 5.62799C14.8869 5.62799 15.167 5.34789 15.167 5.00232V0.624543C15.1664 0.280726 14.8882 0.00199235 14.5444 0.000703182H10.1653C10.1454 -0.000234394 10.1255 -0.000234394 10.1055 0.000703182ZM5.16861 6.24879C7.24737 6.24879 8.91403 7.92158 8.91403 10.0003C8.91403 12.079 7.24737 13.7506 5.16861 13.7506C3.08985 13.7506 1.41709 12.0791 1.41709 10.0003C1.41709 7.92154 3.08985 6.24879 5.16861 6.24879Z" fill="#0A0930" />
                            </svg>
                            Мужская
                        </label>
                    </div>
                    <div className='filter_sex_btn'>
                        <input
                            id='sex_women'
                            type='checkbox'
                            value='W'
                            checked={selectedSex === 'W'}
                            onChange={handleSexChange} />
                        <label htmlFor="sex_women">
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
                            value='A'
                            checked={selectedSex === 'A'}
                            onChange={handleSexChange} />
                        <label htmlFor="sex_all">
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
                            Смешанная
                        </label>
                    </div>
                </div>
                <p>Возрастная группа</p>
                <div className='filter_time_trip'>
                    <select
                        className='filter_time_select'
                        onChange={handleAgeStChange}
                        value={selectedAgeSt}
                        style={{ backgroundColor: isAgeСorrect ? '#FFFFFF' : '#FFF4F4' }}
                    >
                        {ages.map(age => (
                            <option key={age} value={age}>от {age}</option>
                        ))}
                    </select>
                    <select
                        className='filter_time_select'
                        onChange={handleAgeEnChange}
                        value={selectedAgeEn}
                        style={{ backgroundColor: isAgeСorrect ? '#FFFFFF' : '#FFF4F4' }}
                    >
                        {ages.map(age => (
                            <option key={age} value={age}>до {age}</option>
                        ))}
                    </select>
                </div>
                <p>Время прогулки</p>
                <div className='filter_sex_trip'>
                    <div className='filter_sex_btn'>
                        <input
                            id='under_60'
                            type='checkbox'
                            value='under_60'
                            checked={selectedTimeTrip === 'under_60'}
                            onChange={handleTimeTripChange} />
                        <label htmlFor="under_60">до 60 мин</label>
                    </div>
                    <div className='filter_sex_btn'>
                        <input
                            id='under_120'
                            type='checkbox'
                            value='under_120'
                            checked={selectedTimeTrip === 'under_120'}
                            onChange={handleTimeTripChange} />
                        <label htmlFor="under_120">до 120 мин</label>
                    </div>
                    <div className='filter_sex_btn'>
                        <input
                            id='upper_120'
                            type='checkbox'
                            value='upper_120'
                            checked={selectedTimeTrip === 'upper_120'}
                            onChange={handleTimeTripChange} />
                        <label htmlFor="upper_120">от 120 мин</label>
                    </div>
                </div>
                <div className='filter_buttons'>
                    <button onClick={resetFilters} className='reset_button'>Сбросить</button>
                    {(isDataСorrect && isTimeСorrect && isAgeСorrect) && (
                        <button className='save_button' onClick={handleSave}>Сохранить</button>
                    )}
                    {(isDataIncorrect || isTimeInCorrect || isAgeInCorrect) && (
                        <button className='fail_button' id='fail_settings'>Некорректные данные поиска</button>
                    )}
                </div>
            </div>
            {selectedRoute && (
                <TripRun selectedRoute={selectedRoute} user_info={user_info} handleCloseClick={handleCloseClick} customClass=""/>
            )}
        </div >
    );
}

export default Trip;
