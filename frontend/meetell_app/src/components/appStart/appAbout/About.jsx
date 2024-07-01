import React from "react";
import './About.css';
import account from '../../../img/account.svg';

export default function About() {
    return (
        <div className="about">
            <div className="created">
            <p>Приложение разработано</p>
            <h1>CUBE <span>IT</span></h1>
            {/* <img src={account} alt="CubeIT" /> */}
            </div>
        </div>
    )
}