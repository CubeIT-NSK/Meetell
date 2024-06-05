import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import home from '../../img/home_footer.svg'
import trip from '../../img/trip_footer.svg'
import invite from '../../img/invite_footer.svg'
import './Footer.css';

function Footer() {
    return (
        <div className='footer_block'>
            <Link to='/' className="no_underline_footer">
                <div className='footer_main'>
                    <img src={home} alt=''/>
                    <p>Главная</p>
                </div>
            </Link>
            <Link to='/' className="no_underline_footer">
                <div className='footer_trips'>
                    <img src={trip} alt=''/>
                    <p>Маршруты</p>
                </div>
            </Link>
            <Link to='/' className="no_underline_footer">
                <div className='footer_invite'>
                    <img src={invite} alt=''/>
                    <p>Пригласить</p>
                </div>
            </Link>
        </div>

    );
}

export default Footer;