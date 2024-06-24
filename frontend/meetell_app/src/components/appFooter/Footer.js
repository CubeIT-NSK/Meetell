import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFooter } from './FooterContext';
import invite from '../../img/invite_footer.svg'
import './Footer.css';

function Footer() {
    const location = useLocation();

    const { isFooterVisible } = useFooter();

    if (!isFooterVisible) {
        return null;
    }

    return (
        <div className={`footer_block ${location.pathname === '/' || location.pathname === '/addTrip' || location.pathname === '/finish' ? 'active' : ''}`}>
            <Link to='/home' className="no_underline_footer">
                <div className={`footer_main ${location.pathname === '/home' ? 'active' : ''}`}>
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_2137_274)">
                            <path d="M15.4776 24.8094H20.9047C21.1119 24.8094 21.3106 24.7235 21.4571 24.5706C21.6036 24.4177 21.6859 24.2104 21.6859 23.9941V13.8044L22.125 14.1372C22.208 14.2002 22.3021 14.2454 22.4018 14.2704C22.5016 14.2954 22.6051 14.2997 22.7064 14.2829C22.8078 14.2662 22.9049 14.2287 22.9924 14.1728C23.0799 14.1169 23.1559 14.0435 23.2162 13.9569L25.0178 11.3696C25.0781 11.283 25.1214 11.1849 25.1454 11.0808C25.1693 10.9767 25.1734 10.8687 25.1573 10.7629C25.1413 10.6572 25.1054 10.5558 25.0518 10.4645C24.9982 10.3732 24.9279 10.2939 24.8449 10.2309L13.1262 1.34659C12.9927 1.24541 12.832 1.19092 12.667 1.19092C12.502 1.19092 12.3413 1.24541 12.2078 1.34659L0.489246 10.2308C0.406206 10.2937 0.335858 10.3731 0.282219 10.4643C0.22858 10.5556 0.192701 10.657 0.176631 10.7628C0.160561 10.8686 0.164616 10.9766 0.188563 11.0807C0.212511 11.1848 0.255882 11.283 0.316199 11.3696L2.11796 13.957C2.23974 14.1319 2.42313 14.2492 2.62777 14.283C2.8324 14.3169 3.04154 14.2645 3.20917 14.1374L3.64823 13.8046V23.9943C3.64823 24.2105 3.73054 24.4179 3.87705 24.5707C4.02357 24.7236 4.22228 24.8095 4.42948 24.8095H9.85638C10.0636 24.8095 10.2623 24.7236 10.4088 24.5707C10.5553 24.4179 10.6376 24.2105 10.6376 23.9943V17.675H14.6963V23.9941C14.6963 24.2104 14.7786 24.4177 14.9251 24.5706C15.0717 24.7235 15.2704 24.8094 15.4776 24.8094ZM2.92264 12.339L2.03949 11.0707L12.667 3.01366L23.2945 11.0707L22.4114 12.339L13.126 5.29968C12.9925 5.1985 12.8318 5.14401 12.6668 5.14401C12.5018 5.14401 12.3411 5.1985 12.2076 5.29968L2.92264 12.339ZM9.85624 16.0446C9.64904 16.0446 9.45032 16.1305 9.30381 16.2834C9.1573 16.4363 9.07499 16.6436 9.07499 16.8598V23.1789H5.21053V12.6199L12.667 6.96685L20.1234 12.6198V23.1789H16.2588V16.8598C16.2588 16.6436 16.1765 16.4363 16.03 16.2834C15.8835 16.1305 15.6848 16.0446 15.4776 16.0446H9.85624Z" fill="#797984" />
                        </g>
                        <defs>
                            <clipPath id="clip0_2137_274">
                                <rect width="25" height="25" fill="white" transform="translate(0.166992 0.5)" />
                            </clipPath>
                        </defs>
                    </svg>
                    <p>Главная</p>
                </div>
            </Link>
            <Link to='/trips' className="no_underline_footer">
                <div className={`footer_trips ${location.pathname === '/trips' ? 'active' : ''}`}>
                    <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.9449 25.4955C15.2393 25.512 15.5349 25.4806 15.8146 25.4031C16.0943 25.3256 16.3527 25.2035 16.575 25.0439C16.7973 24.8843 16.9793 24.6902 17.1104 24.4727C17.2415 24.2553 17.3193 24.0187 17.3392 23.7766L17.4379 22.5795L13.0651 20.9718L12.8546 23.5268C12.815 24.0157 13.0129 24.4975 13.4048 24.8666C13.7966 25.2357 14.3505 25.4618 14.9449 25.4955Z" fill="#797984" />
                        <path d="M13.3663 18.1462L17.9976 19.9388L19.497 15.524C20.5702 11.4624 19.9066 8.42761 17.676 7.19693C16.3678 6.47495 14.9518 6.62204 14.1289 7.08823C14.1196 7.09357 14.11 7.09843 14.1002 7.10303C14.0937 7.10602 13.355 7.46159 12.7071 8.24916C11.8433 9.29872 11.5376 10.5842 11.7978 12.0702L13.3663 18.1462Z" fill="#797984" />
                        <path d="M6.91555 14.7789L2.53906 16.3801L2.63473 17.5774C2.65414 17.8196 2.73136 18.0563 2.86199 18.274C2.99262 18.4916 3.1741 18.686 3.39607 18.8459C3.61804 19.0059 3.87615 19.1284 4.15567 19.2063C4.43518 19.2842 4.73063 19.3161 5.02514 19.3002C5.31964 19.2842 5.60745 19.2207 5.87211 19.1133C6.13678 19.0059 6.37312 18.8566 6.56765 18.6741C6.76217 18.4915 6.91107 18.2793 7.00585 18.0494C7.10063 17.8196 7.13942 17.5766 7.12002 17.3344L6.91555 14.7789Z" fill="#797984" />
                        <path d="M1.98379 13.7387L6.61917 11.9532L8.20176 5.87934C8.46513 4.39377 8.16214 3.10785 7.30102 2.05696C6.6549 1.26837 5.9168 0.911626 5.90946 0.908154C5.90037 0.903828 5.89043 0.898647 5.88179 0.893786C5.06004 0.426424 3.64444 0.277082 2.33446 0.997033C0.10101 2.22441 -0.569344 5.2582 0.494544 9.32147L1.98379 13.7387Z" fill="#797984" />
                    </svg>
                    <p>Маршруты</p>
                </div>
            </Link>
            <InviteLink />
        </div>

    );
}

function InviteLink() {
    const [showNotification, setShowNotification] = useState(false);
    
    const copyInviteLink = async () => {
        const user_info = JSON.parse(localStorage.getItem('user_info'));
        const inviteLink = 'https://t.me/meetell_bot?start=' + user_info.tg_id;
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(inviteLink);
            } else {
                // Фоллбэк для старых браузеров
                const tempInput = document.createElement('textarea');
                tempInput.style.zIndex = 100;
                tempInput.style.position = 'absolute';
                tempInput.style.top = '20px';
                tempInput.value = inviteLink;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
            }
            // Показать уведомление
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
            }, 2000); // Уведомление будет отображаться в течение 2 секунд
        } catch (err) {
            console.error('Failed to copy the text to clipboard: ', err);
        }
    };
return (
    <div>
        <div onClick={copyInviteLink} className="no_underline_footer">
            <div className='footer_invite'>
                <img src={invite} alt='Invite' />
                <p>Пригласить</p>
            </div>
        </div>
        {showNotification && (
            <div className="notification">
                Ссылка скопирована в буфер обмена!
            </div>
        )}
    </div>
);
}

export default Footer;