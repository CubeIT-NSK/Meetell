import React, { useState, useEffect, useRef } from "react";
import './Profile.css';
import '../appTrip/Trip.css';
import avatar from "../../img/profileIMG.svg";
import account from '../../img/account.svg';
import pencil from '../../img/pencil.svg';
import back from '../../img/back.svg';
import camera from '../../img/camera.svg';
import { ReactComponent as Male } from '../../img/sex_male.svg';
import { ReactComponent as Female } from '../../img/sex_female.svg';


export default function Profile() {

    const fileInputRef = useRef(null);
    const editButton = [
        'Заполнить анкету',
        'Редактировать',
    ];
    const [edit, setEdit] = useState(editButton[0]);
    const [selectedRoute, setSelectedRoute] = useState(true);
    const [style, setStyle] = useState({ display: 'none' });
    const [name, setName] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [isDataIncorrect, setIsDataIncorrect] = useState(false);
    const [isDataСorrect, setIsDataСorrect] = useState(false);
    const [fullYears, setFullYears] = useState(null);
    const [styleAgeAndSex, setStyleAgeAndSex] = useState({ display: 'none' });
    const [selectedSex, setSelectedSex] = useState(null);
    const [maleOpacity, setMaleOpacity] = useState('50%');
    const [femaleOpacity, setFemaleOpacity] = useState('50%');

// Не ебу мне это надо или нет, спиздил у тебя Никит для высоты блока
    const childrenRef = useRef(null);
    useEffect(() => {
        if (!childrenRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let rectChildren = childrenRef.current.getBoundingClientRect();
                    childrenRef.current.style.height = window.innerHeight - rectChildren.y + "px";
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
    }, [selectedRoute]);

// Определение значения для изменения input
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

// Кнопка назад
    const handleCloseClick = () => {
        setSelectedRoute(true);
        setEdit('Редактировать')
    };

//Добавление имени
    useEffect(() => {
        if (name === '') {
            setStyle({ display: 'none' });
        } else {
            setStyle({ display: 'block' });
        }
    }, [name]);

// Корректная дата рождения 

    useEffect(() => {
        if (fullYears === null) {
            setStyleAgeAndSex({ display: 'none' });
        } else {
            setStyleAgeAndSex({ display: 'flex' });
        }
    }, [fullYears]);

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
    
    const handleDayChange = (e) => {
        setSelectedDay(e.target.value);
        validateDate(selectedMonth, e.target.value, selectedYear);
    };
    
    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
        validateDate(e.target.value, selectedDay, selectedYear);
    };
    
    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
        validateDate(selectedMonth, selectedDay, e.target.value);
    };
    
    const validateDate = (month, day, year) => {
        const currentDate = new Date();
        const selectedDate = new Date(year, month - 1, day);
        if (selectedDate > currentDate || getAge(selectedDate) > 120) {
            setIsDataIncorrect(true);
            setIsDataСorrect(false);
        } else {
            setIsDataIncorrect(false);
            setIsDataСorrect(true);
            setFullYears(getAge(selectedDate));
        }
    };
    
    const getAge = (birthday) => {
        const today = new Date();
        const diff = today - birthday;
        const ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };
    
    const handleButtonClick = () => {
        if (!selectedRoute) {
            validateDate(selectedMonth, selectedDay, selectedYear);
            if (!isDataСorrect) {
                alert('Пожалуйста, заполните все поля корректно.');
                return
        } else {
                setIsDataIncorrect(false);
                setIsDataСorrect(true);
            } 
        } 
        if (!selectedRoute) {
            setSelectedRoute(true)
        } else {
            setSelectedRoute(false)
            setEdit(editButton[1])
        }
        setName(inputValue);
    };

// Загрузка файла
    const handleFileUpload = (event) => {
        const file = event.target.files[0]; // Получаем первый выбранный файл
        console.log('Выбранный файл:', file);
    }

    const downloadFile = () => {
        fileInputRef.current.click();
    };

// Выбор пола в редактировании профиля и передача его значения

        const handleSexClick = (sex) => {
            setSelectedSex(sex);
            if (sex === 'male') {
                setMaleOpacity('100%');
                setFemaleOpacity('50%');
              } else {
                setMaleOpacity('50%');
                setFemaleOpacity('100%');
              }
        };

        const handleFocus = (sex) => {
            if (sex === 'male') {
              setMaleOpacity('100%');
            } else {
              setFemaleOpacity('100%');
            }
          };

          const handleBlur = (sex) => {
            if (sex === 'male' && selectedSex !== 'male') {
              setMaleOpacity('50%');
            } else if (sex === 'female' && selectedSex !== 'female') {
              setFemaleOpacity('50%');
            }
          };

    return (
        <div className="profile">
            <div className="preview">
                <div className="ton"></div>
                <img className="avatar" src={avatar} alt="" />
                {selectedRoute ?
                    <div className="ageAndSex" style={styleAgeAndSex}>
                        <p className="age">
                            {fullYears}
                        </p>
                        {selectedSex && (
                            <div className="sex">
                            {selectedSex === 'male' ? (
                                <Male fill={'#0912DB'} style={{ opacity: '100%' }} />
                            ) : (
                                <Female fill={'#0912DB'} style={{ opacity: '100%' }} />
                            )}
                            </div>
                        )}
                    </div> 
                :
                    <form method="post" encType="multipart/form-data">
                        <input
                        type="file"
                        name="myVacationPhoto"
                        accept="image/*"
                        onChange={handleFileUpload}
                        ref={fileInputRef}
                        style={{ display: 'none' }} // Скрыть input
                        />
                        <button className="camera" onClick={downloadFile}>
                            <img src={camera} />
                        </button>
                    </form>
                }
            </div>
            {selectedRoute ? 
                <div ref={childrenRef} className="profile_body">
                    <div className="name_block">
                        <h1 id="profileName" className="profile_name" style={style}>{name}</h1>
                        <p className="telegram_username">@tg_username</p>
                    </div>
                    <div className='profile_route_info_blocks'>
                        <div className='route_info_block_profile route_info_range'>599 <span className='route_info_small'>кол.</span></div>
                        <div className='route_info_block_profile route_info_ages'>1 285 <span className='route_info_small span_small'>км.</span></div>
                        <div className='route_info_block_profile route_info_time'>156 <span className='route_info_small'>ч.</span></div>
                    </div>
                    <div className='profile_stat'>
                        <div className='home_level'>128 Уровень</div>
                        <div className='home_done'>
                            <div className='home_distanse_user'>1 285 км</div>
                            <div className='home_distanse_need'>Осталось 295 км</div>
                        </div>
                        <div className='home_progress'>
                            <progress className='home_progress' value={0.2} defaultValue={0} />
                        </div>
                    </div>
                    <div className="friends_block">
                        <p className="friends_text">Ваши друзья:</p>
                        <div className="friends">
                            <div className="friend" id="#">
                                <img className="friend_avatar" src={account} alt="avatar"></img>
                                <div className="friend_level">123</div>
                            </div>
                            <div className="friend" id="#">
                                <img className="friend_avatar" src={account} alt="avatar"></img>
                                <div className="friend_level">4</div>
                            </div>
                            <div className="friend" id="#">
                                <img className="friend_avatar" src={account} alt="avatar"></img>
                                <div className="friend_level">45</div>
                            </div>
                        </div>
                    </div>
                    <button className="edit_button" onClick={handleButtonClick}>
                        {edit}
                        <img src={pencil} alt="edit"></img>
                    </button>
                </div> 
                :
                <div ref={childrenRef} className="profile_body">
                    <div className="telegram">
                        <img src={back} className="back" onClick={handleCloseClick}/>
                        <p className="telegram_username">@tg_username</p>
                    </div>
                    <div className="input_block">
                        <div className="inputs">
                            <p className="input_name">Имя:</p>
                            <input
                            type="text" 
                            placeholder="Ваше имя" 
                            className="you_name"
                            value={inputValue}
                            onChange={handleInputChange}
                            />
                            <p className="input_name">Дата рождения*:</p>
                            <div className='filter_date_trip_profile'>

                                <select
                                    className='filter_date_select_profile'
                                    onChange={handleDayChange}
                                    value={selectedDay}
                                    style={{ backgroundColor: isDataСorrect ? '#FFFFFF' : '#FFF4F4' }}
                                >
                                    {days.map(day => (
                                        <option key={day} value={day}>{day}</option>
                                    ))}
                                </select>
                                <select
                                    className='filter_date_select_profile'
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
                                    className='filter_date_select_profile'
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
                            <p className="input_name">Пол*:</p>
                            <div className="change_sex">
                                <button className="button_sex active" 
                                 onClick={() => handleSexClick('male')}
                                 onFocus={() => handleFocus('male')}
                                 onBlur={() => handleBlur('male')}
                                >
                                    <Male fill={'#523DD8'} style={{ opacity: maleOpacity }} />
                                </button>
                                <button className="button_sex" 
                                onClick={() => handleSexClick('female')}
                                onFocus={() => handleFocus('female')}
                                onBlur={() => handleBlur('female')}
                                >
                                    <Female fill={'#523DD8'} style={{ opacity: femaleOpacity }} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <p className="ps">* - важные пункты, чтобы участвовать в маршрутах по конкретным возрастным и гендерным группам.</p>
                    <div className="bottom_button">
                        <button className="save_profile_button" onClick={handleButtonClick}>
                            Сохранить
                            <img src={pencil} alt="edit"></img>
                        </button>
                        <p className="ps">Нажимая клавишу сохранить, я соглашаюсь с <span>Правила пользования сайтом и обработки персональных данных</span> и <span>Публичной оферты</span></p>
                    </div>
                </div>
                }
        </div>
    )
}