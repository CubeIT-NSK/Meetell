import React, { useEffect, useRef } from "react";
import './Profile.css';
import '../appTrip/Trip.css';
import {default as avatar} from "../../img/profileIMG.svg";
import account from '../../img/account.svg';
import pencil from '../../img/pencil.svg';

export default function Profile() {
    // const parrentRef = useRef();
    const childrenRef = useRef();
    useEffect(() => {
        // let rectParrent = parrentRef.current.getBoundingClientRect();
        // parrentRef.current.style.height = window.innerHeight - rectParrent.y + "px";
        let rectChildren = childrenRef.current.getBoundingClientRect();
        childrenRef.current.style.height = window.innerHeight - rectChildren.y + "px";
    }, []);
    return (
        <div className="profile">
            <div className="preview">
            <div className="ton"></div>
            <img className="avatar" src={avatar} alt="" />
                <div className="ageAndSex">
                    <p className="age">
                        18
                    </p>
                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.1055 0.000703182C9.75999 0.017228 9.49325 0.310728 9.50978 0.656264C9.5263 1.0018 9.8198 1.26854 10.1653 1.25202H13.033L8.22549 6.05588C7.37922 5.39801 6.32038 5.00232 5.16861 5.00232C2.41448 5.00232 0.166992 7.24613 0.166992 10.0003C0.166992 12.7545 2.41448 15.0019 5.16861 15.0019C7.92274 15.0019 10.1653 12.7544 10.1653 10.0003C10.1653 8.84853 9.76964 7.78848 9.11178 6.9422L13.9156 2.13466V5.00232C13.9156 5.34785 14.1957 5.62799 14.5413 5.62799C14.8869 5.62799 15.167 5.34789 15.167 5.00232V0.624543C15.1664 0.280726 14.8882 0.00199235 14.5444 0.000703182H10.1653C10.1454 -0.000234394 10.1255 -0.000234394 10.1055 0.000703182ZM5.16861 6.24879C7.24737 6.24879 8.91403 7.92158 8.91403 10.0003C8.91403 12.079 7.24737 13.7506 5.16861 13.7506C3.08985 13.7506 1.41709 12.0791 1.41709 10.0003C1.41709 7.92154 3.08985 6.24879 5.16861 6.24879Z" fill="#0912DB"/>
                    </svg>
                </div>
            </div>
            <div ref={childrenRef} className="profile_body">
                <h1 className="profile_name">Алина Супер Конфетка</h1>
                <p className="telegram_username">@tg_username</p>
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
                        <progress className='home_progress' value={0.2} />
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
                <button className="edit_button">
                    Редактировать
                    <img src={pencil} alt="edit"></img>
                </button>
            </div>
        </div>
    )
}