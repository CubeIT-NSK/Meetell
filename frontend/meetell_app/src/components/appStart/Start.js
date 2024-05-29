import './Start.css'
import question from '../../img/question.svg'
import rules from '../../img/rules.svg'
import manual from '../../img/manual.svg'
import smartphone from '../../img/smartphone.svg'



const Start = () => {
    return (
        <div className="start_body">
            <div className="start_hello">Привет, @НикТГ</div>
            <div className="start_menu">
                <div className="start_btn_question">
                    <img src={question} alt=''/>
                    <p>Частые<br/>вопросы</p>
                </div>
                <div className="start_btn_rules">
                    <img src={rules} alt=''/>
                    <p>Правила</p>
                </div>
                <div className="start_btn_instruction">
                    <img src={manual} alt=''/>
                    <p>Инструкция</p>
                </div>
                <div className="start_btn_info">
                    <img src={smartphone} alt=''/>
                    <p>О приложении</p>
                </div>
            </div>
        </div>
    )
}

export default Start;