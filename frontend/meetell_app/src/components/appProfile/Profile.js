import React, { useEffect, useRef } from "react";
import './Profile.css';
import '../appTrip/Trip.css';
import {default as avatar} from "../../img/profileIMG.svg";
import sex from "../../img/sex_male.svg";

export default function Profile() {
    // const parrentRef = useRef();
    // const childrenRef = useRef();
    // useEffect(() => {
    //     let rectParrent = parrentRef.current.getBoundingClientRect();
    //     parrentRef.current.style.height = window.innerHeight - rectParrent.y + "px";
    //     let rectChildren = childrenRef.current.getBoundingClientRect();
    //     childrenRef.current.style.height = window.innerHeight - rectChildren.y + "px";
    // }, []);
    return (
        <div className="profile">
            <div>
                <div className="preview">
                <img className="avatar" src={avatar} alt="" />
                    <div className="ageAndSex">
                        <p className="age">
                            18
                        </p>
                        <img src={sex} alt="sex"/>
                    </div>
                </div>
            </div>
            <div className="profile_body">
                <h1>Алина Супер Конфетка</h1>
                <p>@tg_username</p>
                <div className='route_info_blocks'>
                    <div className='route_info_block route_info_range'>599 <span className='route_info_small'>кол.</span></div>
                    <div className='route_info_block route_info_ages'>1 285 <span className='route_info_small'>км.</span></div>
                    <div className='route_info_block route_info_time'>156 <span className='route_info_small'>ч.</span></div>
                </div>
            </div>
        </div>
    )
}