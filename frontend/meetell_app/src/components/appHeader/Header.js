import { Link, useLocation } from 'react-router-dom';
import BackButton from '../BackButton.js'
import './Header.css';
import account from '../../img/account.svg'

const Header = ({ setSelectedRoute }) => {
    const location = useLocation();
    let user_info = localStorage.getItem('user_info');
    user_info = JSON.parse(user_info);
    return (
        <div className={`header_block ${location.pathname === '/' ? 'active' : ''}`}>
            { location.pathname !== '/profile' && location.pathname.startsWith('/profile') ?
            <BackButton setSelectedRoute={setSelectedRoute} className={'header_logo'} style={{fill: '#fff'}} />
            :
            <Link to='/home'>
                <div className="header_logo">
                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.8609 19.4237H17.4197C17.5937 19.4237 17.7606 19.355 17.8837 19.2327C18.0068 19.1104 18.0759 18.9445 18.0759 18.7715V10.6197L18.4447 10.886C18.5144 10.9363 18.5935 10.9725 18.6773 10.9925C18.7611 11.0125 18.848 11.0159 18.9331 11.0025C19.0182 10.9891 19.0999 10.9592 19.1733 10.9144C19.2468 10.8697 19.3107 10.811 19.3614 10.7417L20.8746 8.67191C20.9253 8.60262 20.9617 8.52409 20.9818 8.44081C21.002 8.35753 21.0054 8.27113 20.9919 8.18654C20.9784 8.10195 20.9483 8.02082 20.9033 7.9478C20.8582 7.87478 20.7992 7.81128 20.7295 7.76094L10.8857 0.653468C10.7736 0.572526 10.6386 0.528931 10.5 0.528931C10.3614 0.528931 10.2264 0.572526 10.1143 0.653468L0.270693 7.76082C0.20094 7.81115 0.141847 7.87464 0.0967904 7.94767C0.0517335 8.0207 0.021595 8.10183 0.00809653 8.18644C-0.00540197 8.27104 -0.00199605 8.35746 0.0181198 8.44076C0.0382356 8.52406 0.0746671 8.6026 0.125334 8.67191L1.63881 10.7418C1.74111 10.8818 1.89515 10.9756 2.06705 11.0026C2.23895 11.0297 2.41462 10.9878 2.55543 10.8861L2.92424 10.6199V18.7716C2.92424 18.9446 2.99338 19.1105 3.11645 19.2328C3.23952 19.3551 3.40644 19.4238 3.58049 19.4238H8.13909C8.31314 19.4238 8.48006 19.3551 8.60313 19.2328C8.7262 19.1105 8.79534 18.9446 8.79534 18.7716V13.7162H12.2046V18.7715C12.2046 18.9445 12.2738 19.1104 12.3969 19.2327C12.5199 19.355 12.6868 19.4237 12.8609 19.4237ZM2.31475 9.44742L1.5729 8.43272L10.5 1.98712L19.4271 8.43272L18.6853 9.44742L10.8855 3.81594C10.7734 3.735 10.6384 3.6914 10.4998 3.6914C10.3612 3.6914 10.2262 3.735 10.1141 3.81594L2.31475 9.44742ZM8.13897 12.4119C7.96492 12.4119 7.798 12.4806 7.67493 12.6029C7.55186 12.7252 7.48272 12.8911 7.48272 13.0641V18.1193H4.23658V9.6721L10.5 5.14968L16.7634 9.67206V18.1193H13.5171V13.0641C13.5171 12.8911 13.448 12.7252 13.3249 12.6029C13.2019 12.4806 13.0349 12.4119 12.8609 12.4119H8.13897Z" fill="white" />
                    </svg>
                </div>
            </Link>
            }
            <div className='filter_city'>
                <select className='filter_city_select' value="spb">
                    <option value="spb">Санкт-Петербург</option>
                    <option value="kzn">Казань</option>
                    <option value="nsk">Новосибирск</option>
                </select>
            </div>
            <Link to='/profile'>
                <div className="header_user">
                    <div className='first'>
                        <span className="header_bold">{user_info.level.id}</span><br />Уровень
                    </div>
                    <div className='second'>
                        <img src={account} alt="user" />
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Header;