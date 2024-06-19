import { Link } from 'react-router-dom';

import './Start.css'
import question from '../../img/question.svg'
import rules from '../../img/rules.svg'
import manual from '../../img/manual.svg'
import smartphone from '../../img/smartphone.svg'

const Start = () => {
    let username = localStorage.getItem('username');
    return (
        <div className="start_body">
            <div className="start_hello">Привет, @{username}</div>
                <div className="start_menu">
                    <Link to='/question' className="no-underline">
                        <div className="start_btn_question">
                            <img src={question} alt='' />
                            <p>Частые<br />вопросы</p>
                        </div>
                    </Link>
                    <Link to='/rules' className="no-underline">
                        <div className="start_btn_rules">
                            <img src={rules} alt='' />
                            <p>Правила</p>
                        </div>
                    </Link>
                    <Link to='/instruction' className="no-underline">
                        <div className="start_btn_instruction">
                            <img src={manual} alt='' />
                            <p>Инструкция</p>
                        </div>
                    </Link>
                    <Link to='/info' className="no-underline">
                        <div className="start_btn_info">
                            <img src={smartphone} alt='' />
                            <p>О приложении</p>
                        </div>
                    </Link>
                </div>
        </div>
    )
}

export default Start;