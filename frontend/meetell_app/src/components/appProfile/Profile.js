import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useParams } from 'react-router-dom';
import BackButton from '../BackButton.js'
import './Profile.css';
import '../appTrip/Trip.css';
import account from '../../img/account.svg';
import pencil from '../../img/pencil.svg';
import camera from '../../img/camera.svg';
import { ReactComponent as Male } from '../../img/sex_male.svg';
import { ReactComponent as Female } from '../../img/sex_female.svg';

// Загрузка файла
function FileUploader({ onFileSelect }) {
    const fileInputRef = useRef(null);

    const handleFileUpload = (event) => {
        const user_info = JSON.parse(localStorage.getItem('user_info'));
        let file = event.target.files[0];
        if (file.size> 2100000) {
            alert("Слишком большой размер фото");
            return
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            const data = {
                'user_id': user_info.tg_id,
                'file': reader.result
            }
            fetch('api/photo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem('user_photo', JSON.stringify(data));
                    window.location.reload()
                })
                .catch(error => {

                });
        };
        console.log('Выбранный файл:', file);
        onFileSelect(file);
    };

    const fileButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        // <form method="post" encType="multipart/form-data">
        <div>
            <input
                type="file"
                name="myVacationPhoto"
                accept="image/*"
                onChange={handleFileUpload}
                ref={fileInputRef}
                style={{ display: 'none' }} // Скрыть input
            />
            <button className="camera" onClick={fileButtonClick}>
                <img src={camera} alt="Загрузить фото" />
            </button>
        </div>
        // </form>
    );
}

// Показ файла
function FileDisplay({ file, defaultImage }) {
    return (
        <img
            className="avatar"
            src={file ? file : defaultImage}
            alt="avatar"
            style={{
                width: '100%',
            }}
        />
    );
}

export default function Profile() {
    const { userId } = useParams();
    // console.log(userId);
    const getAge = (birthday) => {
        const today = new Date();
        const diff = today - birthday;
        const ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    const user_info = JSON.parse(localStorage.getItem('user_info'));
    let day = 1;
    let month = 1;
    let year = 2024;
    let remain_dist = user_info.level.max_distance - user_info.distance;
    let age = null;
    let sex = false;
    let maleOpac = '50%';
    let femaleOpac = '50%';
    if (user_info.birthday) {
        let year_month_day = user_info.birthday.split('-');
        year = parseInt(year_month_day[0]);
        month = parseInt(year_month_day[1]);
        day = parseInt(year_month_day[2]);
        let birthday = new Date(year, month - 1, day);
        age = getAge(birthday)
        if (user_info.sex === "M"){
            sex = 'male';
            maleOpac = '100%';
        } else {
            sex = 'female';
            femaleOpac = '100%'
        }
    }

    const location = useLocation();
    const editButton = [
        'Заполнить анкету',
        'Редактировать',
    ];
    const [edit, setEdit] = useState(editButton[0]);
    const [selectedRoute, setSelectedRoute] = useState(true);
    const [style, setStyle] = useState({ display: 'none' });
    const [name, setName] = useState(user_info.name);
    const [inputValue, setInputValue] = useState(user_info.name);
    const [selectedDay, setSelectedDay] = useState(day);
    const [selectedMonth, setSelectedMonth] = useState(month);
    const [selectedYear, setSelectedYear] = useState(year);
    const [isDataСorrect, setIsDataСorrect] = useState(true);
    const [fullYears, setFullYears] = useState(age);
    const [styleAgeAndSex, setStyleAgeAndSex] = useState({ display: 'none' });
    const [selectedSex, setSelectedSex] = useState(sex);
    const [maleOpacity, setMaleOpacity] = useState(maleOpac);
    const [femaleOpacity, setFemaleOpacity] = useState(femaleOpac);
    const [selectedFile, setSelectedFile] = useState(null);
    const [upDate, setUpDate] = useState(false);
    const [saveInfo, setSaveInfo] = useState(false);

    // Для передачи файла с загрузки 
    const handleFileSelect = (file) => {
        setSelectedFile(file);
    };

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

    //Добавление имени
    useEffect(() => {
        if (name === '') {
            setStyle({ display: 'none' });
        } else {
            setStyle({ display: 'block' });
        }
    }, [name]);

    // Корректная дата рождения и обязательный выбор для даты и пола

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
            setIsDataСorrect(false);
        } else {
            setIsDataСorrect(true);
            setFullYears(getAge(selectedDate));
        }
    };

    const handleButtonClick = () => {
        if (selectedRoute) {
            setSelectedRoute(false)
        }
    };

    const handleButtonClickSave = () => {
        if (!saveInfo) {
            if (!selectedRoute) {
                validateDate(selectedMonth, selectedDay, selectedYear);
                if (!(isDataСorrect && selectedSex)) {
                    alert('Пожалуйста, заполните все поля корректно.');
                    return
                } else {
                    setIsDataСorrect(true);
                    setUpDate(true);
                    setEdit(editButton[1])
                }
            }

            setName(inputValue);
            const data = {
                user_id: user_info.tg_id,
                name: inputValue,
                birthday: `${selectedYear}-${selectedMonth}-${selectedDay}`,
                sex: selectedSex,
            };
            console.log(data);
            fetch('api/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem('user_info', JSON.stringify(data));
                    setSaveInfo(true);
                    if (selectedRoute) {
                        setSelectedRoute(false)
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    // Выбор пола в редактировании профиля и передача его значения

    const handleSexClick = (sex) => {
        setSelectedSex(sex);
        if (sex === 'male') {
            setMaleOpacity('100%');
            setFemaleOpacity('50%');
        } else if (sex === 'female') {
            setMaleOpacity('50%');
            setFemaleOpacity('100%');
        } else if (sex === null) {

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

    // Горизонтальная прокрутка
    useEffect(() => {
        if (selectedRoute) {
            document.getElementById("horizontal-scroller").addEventListener('wheel', function(event) {
                if (event.deltaMode === event.DOM_DELTA_PIXEL) {
                    var modifier = 1;
                    // иные режимы возможны в Firefox
                } else if (event.deltaMode === event.DOM_DELTA_LINE) {
                  var modifier = parseInt(getComputedStyle(this).lineHeight);
                    } else if (event.deltaMode === event.DOM_DELTA_PAGE) {
                    var modifier = this.clientHeight;
                    }
                
                if (event.deltaY !== 0) {
                    // замена вертикальной прокрутки горизонтальной
                    this.scrollLeft += modifier * event.deltaY;
                    event.preventDefault();
                }
    
            })};
    }, [selectedRoute]);

    return (
        <div className="profile">
            <div className="preview">
                <div className="ton"></div>
                {user_photo && user_photo.photo ?
                    <FileDisplay file={user_photo.photo} /> :
                    null
                }
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
                    <FileUploader onFileSelect={handleFileSelect} />
                }
            </div>
            {selectedRoute ?
                <div ref={childrenRef} className="profile_body">
                    <div className="name_block">
                        <h1 id="profileName" className="profile_name" style={style}>{name}</h1>
                        <p className="telegram_username">@{user_info.user_name}</p>
                    </div>
                    <div className='profile_route_info_blocks'>
                        <div className='route_info_block_profile route_info_range'>{user_info.trip_count} <span className='route_info_small'>кол.</span></div>
                        <div className='route_info_block_profile route_info_ages'>{user_info.distance} <span className='route_info_small span_small'>км.</span></div>
                        <div className='route_info_block_profile route_info_time'>{user_info.total_time_sp} <span className='route_info_small'>ч.</span></div>
                    </div>
                    <div className='profile_stat'>
                        <div className='home_level'>{user_info.level.name}</div>
                        <div className='home_done'>
                            <div className='home_distanse_user'>{user_info.distance} км</div>
                            <div className='home_distanse_need'>Осталось {remain_dist} км</div>
                        </div>
                        <div className='home_progress'>
                            <progress className='home_progress' value={user_info.distance} max={user_info.level.max_distance} />
                        </div>
                    </div>
                    
                    {!(location.pathname !== '/profile') && location.pathname.startsWith('/profile') ?
                        <p className="friends_text">Ваши друзья:</p>
                        :
                        <p className="friends_text">Друзья:</p>
                    }
                    <div className="friends_block" id="horizontal-scroller">
                        <div className="friends">
                        {user_info.friends ? user_info.friends.map(item => (
                            <Link to={`/profile/${item.tg_id}`} key={item.tg_id}>
                                <div className="friend" id="#">
                                    <img className="friend_avatar" src={account} alt="avatar"></img>
                                    <div className="friend_level">{item.level}</div>
                                </div>
                            </Link>
                        )) : null}
                        </div>
                    </div>
                    {!(location.pathname !== '/profile') && location.pathname.startsWith('/profile') ?
                        <button className="edit_button" onClick={handleButtonClick}>
                            {edit}
                            <img src={pencil} alt="edit"></img>
                        </button>
                        :
                        null
                    }
                </div>
                :
                <div ref={childrenRef} className="profile_body">
                    <div className="telegram">
                        <BackButton setSelectedRoute={setSelectedRoute} />
                        <p className="telegram_username">@{user_info.user_name}</p>
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
                                    {days && days.map(day => (
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
                                    {years && years.map(item => (
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
                        <div className="update_button" style={{ display: upDate ? 'flex' : 'none' }}>Данные обновлены</div>
                        <button className="save_profile_button" style={{ backgroundColor: upDate ? '#AFAFB5' : '#523DD8' }} onClick={handleButtonClickSave}>
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