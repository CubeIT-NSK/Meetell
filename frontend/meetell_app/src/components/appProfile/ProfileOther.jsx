import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import FileDisplay from './Profile.js';
import account from '../../img/account.svg';
import { ReactComponent as Male } from '../../img/sex_male.svg';
import { ReactComponent as Female } from '../../img/sex_female.svg';

function ProfileOther() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState(null);
    const [user_name, setUserName] = useState(null);
    const [friend, setFriend] = useState(null);
    const [fullYears, setFullYears] = useState(null);
    const [level, setLevel] = useState(null);
    const [stat, setStat] = useState(null);
    const [styleAgeAndSex, setStyleAgeAndSex] = useState({ display: 'none' });
    const [selectedSex, setSelectedSex] = useState("M");
    const [photo, setPhoto] = useState(null);

    const getAge = (birthday) => {
        let year_month_day = birthday.split('-');
        let year = parseInt(year_month_day[0]);
        let month = parseInt(year_month_day[1]);
        let day = parseInt(year_month_day[2]);
        const birthdat_date = new Date(year, month - 1, day);
        const today = new Date();
        const diff = today - birthdat_date;
        const ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    useEffect(() => {
        if (!userId) {
            navigate('/home');
            return;
        }

        fetch(`/api/user?id=${userId}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setUserName(data.user_name);
                if (data.birthday !== null) {
                    let age = getAge(data.birthday);
                    setFullYears(age);
                    setFriend(data);
                    setName(data.name);
                    let level_data = {
                        level_name: data.level.name,
                        level_max: data.level.max_distance,
                        level_need: data.level.max_distance - data.distance,
                        level_dist: data.distance,
                    };
                    setLevel(level_data);
                    let stat_data = {
                        count: data.trip_count,
                        dist: data.distance,
                        time: data.total_time_sp,
                    }
                    setStat(stat_data);
                    setStyleAgeAndSex({ display: 'flex' })
                    setPhoto(data.photo);
                }

            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                navigate('/home');
            });
    }, [userId]);

    const [history, setHistory] = useState([]);

    const [selectedRoute, setSelectedRoute] = useState(true);
    const [style, setStyle] = useState({ display: 'none' });





    // Не ебу мне это надо или нет, спиздил у тебя Никит для высоты блока
    const childrenRef = useRef(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch('/api/history?id=' + userId);
                const data = await response.json();
                setHistory(data);
            } catch (error) {
                console.error('Error fetching history:', error);
            }
        };

        fetchHistory();
    }, []);

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


    // Горизонтальная прокрутка
    useEffect(() => {
        if (selectedRoute) {
            document.getElementById("horizontal-scroller").addEventListener('wheel', function (event) {
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

            })
        };
    }, [selectedRoute]);

    return (
        <div className="profile">
            <div className="preview">
                <div className="ton"></div>
                    {photo ?
                        <img
                            className="avatar"
                            src={photo}
                            alt="avatar"
                            style={{
                                width: '100%',
                            }}
                        /> :
                        null
                    }
                
                <div className="ageAndSex" style={styleAgeAndSex}>
                    <p className="age">
                        {fullYears}
                    </p>
                    {selectedSex && (
                        <div className="sex">
                            {selectedSex === 'M' ? (
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
                    <p className="telegram_username">@{user_name}</p>
                </div>
                {stat === null ? (
                    <div className='profile_route_info_blocks'>
                        <div className='route_info_block_profile route_info_range'>0 <span className='route_info_small'>кол.</span></div>
                        <div className='route_info_block_profile route_info_ages'>0 <span className='route_info_small span_small'>км.</span></div>
                        <div className='route_info_block_profile route_info_time'>0 <span className='route_info_small'>ч.</span></div>
                    </div>
                ) : (
                    <div className='profile_route_info_blocks'>
                        <div className='route_info_block_profile route_info_range'>{stat.count} <span className='route_info_small'>кол.</span></div>
                        <div className='route_info_block_profile route_info_ages'>{stat.dist} <span className='route_info_small span_small'>км.</span></div>
                        <div className='route_info_block_profile route_info_time'>{stat.time} <span className='route_info_small'>ч.</span></div>
                    </div>
                )}
                {level === null ? (
                    <div className='profile_stat'>
                        <div className='home_level'>1 Уровень</div>
                        <div className='home_done'>
                            <div className='home_distanse_user'>0 км</div>
                            <div className='home_distanse_need'>Осталось 1 км</div>
                        </div>
                        <div className='home_progress'>
                            <progress className='home_progress' value={0} max={1} />
                        </div>
                    </div>
                ) : (
                    <div className='profile_stat'>
                        <div className='home_level'>{level.level_name}</div>
                        <div className='home_done'>
                            <div className='home_distanse_user'>{level.level_dist} км</div>
                            <div className='home_distanse_need'>Осталось {level.level_need} км</div>
                        </div>
                        <div className='home_progress'>
                            <progress className='home_progress' value={level.level_dist} max={level.level_max} />
                        </div>
                    </div>
                )}
                <div className='friends_contain'>
                    <p className="friends_text">Друзья:</p>
                    <div className="friends_block" id="horizontal-scroller">
                        <div className="friends">
                            {friend && friend.friends ? friend.friends.map(item => (
                                <Link to={`/profile/${item.tg_id}`} key={item.tg_id}>
                                    <div className="friend" id="#">
                                        {item.photo_low ? (
                                            <img className="friend_avatar" src={item.photo_low} alt="avatar" />
                                        ): (
                                            <img className="friend_avatar" src={account} alt="avatar" />
                                        )}
                                        <div className="friend_level">{item.level}</div>
                                    </div>
                                </Link>
                            )) : null}
                        </div>
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
                    <div className='home_scroll'>
                        {history.length === 0 ? (
                            <div className='home_search_result'>
                                <h2>Ничего не найдено</h2>
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
