import React, { useEffect, useState, useRef  } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import FileDisplay from './Profile.js';
import account from '../../img/account.svg';
import { ReactComponent as Male } from '../../img/sex_male.svg';
import { ReactComponent as Female } from '../../img/sex_female.svg';

function ProfileOther() {
    // const { userId } = useParams();
    // const navigate = useNavigate();
    // const [friend, setFriend] = useState(null);
    // const [fullProfile, setFullProfile] = useState(false);

    // useEffect(() => {
    //     if (!userId) {
    //         navigate('/home');
    //         return;
    //     }

    //     fetch(`/api/user?id=${userId}`)
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data);
    //             setFriend(data);

    //         })
    //         .catch(error => {
    //             console.error('Error fetching user data:', error);
    //             navigate('/home');
    //         });
    // }, [userId, navigate]);

    let user_photo = null;
    const { userId } = useParams();
    const [history, setHistory] = useState([]);
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
   
    const [selectedRoute, setSelectedRoute] = useState(true);
    const [style, setStyle] = useState({ display: 'none' });
    const [name, setName] = useState(user_info.name);
    const [fullYears, setFullYears] = useState(age);
    const [styleAgeAndSex, setStyleAgeAndSex] = useState({ display: 'none' });
    const [selectedSex, setSelectedSex] = useState(sex);


    // Не ебу мне это надо или нет, спиздил у тебя Никит для высоты блока
    const childrenRef = useRef(null);

    useEffect(() => {
        let user_info = JSON.parse(localStorage.getItem('user_info'));
        const fetchHistory = async () => {
            try {
                const response = await fetch('/api/history?id=' + user_info.tg_id);
                const data = await response.json();
                setHistory(data);
            } catch (error) {
                console.error('Error fetching history:', error);
            }
        };

        fetchHistory();
    });

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

    //Добавление имени
    useEffect(() => {
        if (name === '') {
            setStyle({ display: 'none' });
        } else {
            setStyle({ display: 'block' });
        }
    }, [name]);

    // const handleFocus = (sex) => {
    //     if (sex === 'male') {
    //         setMaleOpacity('100%');
    //     } else {
    //         setFemaleOpacity('100%');
    //     }
    // };

    // const handleBlur = (sex) => {
    //     if (sex === 'male' && selectedSex !== 'male') {
    //         setMaleOpacity('50%');
    //     } else if (sex === 'female' && selectedSex !== 'female') {
    //         setFemaleOpacity('50%');
    //     }
    // };

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
        // <>{friend && (
        //     <>
        <div className="profile">
        <div className="preview">
            <div className="ton"></div>
            {user_photo && user_photo.photo ?
                <FileDisplay file={user_photo.photo} /> :
                null
            }
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
        </div>
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
                    <p className="friends_text">Друзья:</p>
                <div className="friends_block" id="horizontal-scroller">
                    <div className="friends">
                    {user_info.friends ? user_info.friends.map(item => (
                        <Link to={`/profile/${item.tg_id}`} key={item.tg_id}>
                            <div className="friend" id="#">
                                <img className="friend_avatar" src={account} alt="avatar" />
                                <div className="friend_level">{item.level}</div>
                            </div>
                        </Link>
                    )) : null}
                    </div>
                </div>
                <div 
                    className='home_history'
                    style={{
                            width: '100%',
                            position: 'inherit',
                            padding: '0' 
                    }}>
                <h3>История маршрутов:</h3>
                <div  className='home_scroll'>
                    {history.length === 0 ? (
                        <div className='home_search_result'>

                            <h2>Ничего не найдено</h2>
                            <p>Посмотрите ближайшие маршруты во вкладке ниже</p>
                        </div>
                    ) : (

                        history.map(item => (
                            <div key={item.id} className="search_result_item">
                                <div className='result_item_left'>
                                    <span className='result_item_id'>Маршрут №{item.trip.id}</span>
                                    <p>{item.trip.date}</p>
                                    <h4>{item.trip.name}</h4>

                                    <span className='result_item'>{item.trip.distance} км. {item.trip.time_sp} мин.</span>
                                </div>
                                <button className='res_item_button result_end_button'>Завершен</button>
                            </div>
                        ))

                    )}
                </div>
            </div>
            </div>
    </div>
        //     </>
        // )}</>
    );
}

export default ProfileOther;
