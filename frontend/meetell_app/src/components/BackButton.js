import React from "react";
import { useLocation } from 'react-router-dom';
import './appProfile/Profile.css';

export default function BackButton({ setSelectedRoute, className, style }) {

    const location = useLocation();
    // Кнопка назад
    const handleCloseClick = () => {
        !(location.pathname !== '/profile') && location.pathname.startsWith('/profile') ? 
        setSelectedRoute(true)
        :
        window.history.back();
    };
    return (
        <svg
        onClick={handleCloseClick}
        className={className ? className : "back"}
        style={style}
        width="20" 
        height="15" 
        viewBox=" 0 20 15" 
        fill="#0A0930" 
        xmlns="http://www.w3.org/2000/svg" 
        >
        <path fill-rule="evenodd" 
        clip-rule="evenodd"
        d="M5.70898 1.16393C5.99824 0.897649 5.99824 0.465971 5.70898 0.199686C5.41968 -0.0665621 4.95066 -0.0665621 4.6614 0.199686L0.216943 4.29063C-0.0723145 4.55688 -0.0723145 4.9886 0.216943 5.25488L4.6614 9.34576C4.95066 9.61204 5.41968 9.61204 5.70898 9.34576C5.99824 9.07951 5.99824 8.64779 5.70898 8.38155L2.52905 5.45458H14.0741C15.2528 5.45458 16.3833 5.88557 17.2168 6.65278C18.0503 7.41996 18.5185 8.4605 18.5185 9.54549C18.5185 10.6305 18.0503 11.671 17.2168 12.4382C16.3833 13.2054 15.2528 13.6364 14.0741 13.6364H5.92593C5.51683 13.6364 5.18519 13.9417 5.18519 14.3182C5.18519 14.6947 5.51683 15 5.92593 15H14.0741C15.6457 15 17.153 14.4253 18.2643 13.4024C19.3757 12.3795 20 10.9921 20 9.54545C20 8.09879 19.3757 6.71143 18.2643 5.6885C17.153 4.66558 15.6457 4.0909 14.0741 4.0909H2.52901L5.70898 1.16393Z"/>
        </svg>

    )
}