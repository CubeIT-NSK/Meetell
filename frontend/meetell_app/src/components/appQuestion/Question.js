import React, { useEffect, useRef, useState } from 'react';
import { default as download } from '../../img/load.svg';
import './Question.css';

function Question() {
    const bodyRef = useRef();
    const [state, setState] = useState(null);
    useEffect(() => {
        let rectBody = bodyRef.current.getBoundingClientRect();
        bodyRef.current.style.height = window.innerHeight - rectBody.y + "px";
        fetch('http://192.168.1.103:8000/faq')
            .then((response) => response.json())
            .then((json) => setState(json));
    }, []);
    const [show, setShow] = useState("que_answ_hidden");
    if (state != null) {
        return (
            <div ref={bodyRef} className="que_body">
                <h3>Частые вопросы:</h3>
                {state.map(item => (
                    <div className='que_none'>
                        <div class={"answ_" + item.id === show ? "que_block_answ" : "que_block"}>
                            <div className='que_text'>{item.question}</div>
                            <button className='que_answ_button' onClick={() => setShow('answ_' + item.id)}>{"answ_" + item.id === show ? "Скрыть" : "Подробнее"}</button>
                        </div>
                        {<div class={"answ_" + item.id === show ? "que_answ_show" : "que_answ_hidden"}>{item.answer}</div>}
                        {<button class={"answ" + item.id === show ? "que_answ_button" : "que_answ_button_hidden"}>Скрыть</button>}
                    </div>
                ))}

            </div>
        )
    } else {
        return (
            <div ref={bodyRef} className="que_body">
                <h3>Частые вопросы:</h3>
                <div className='server_wait'>
                    <svg width="50" height="60" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M45.5625 10.8051C40.8917 4.0378 33.1993 -0.0011736 24.9834 2.558e-07C11.1705 0.0149995 -0.0149653 11.239 1.50294e-05 25.0694C0.0139533 37.9493 9.78348 48.7183 22.5867 49.9666L18.3515 54.2061C17.9375 54.6065 17.926 55.267 18.3259 55.6815C18.7258 56.096 19.3855 56.1074 19.7995 55.707C19.8082 55.6987 19.8167 55.6901 19.825 55.6815L25.7192 49.7798C25.8165 49.6827 25.8933 49.567 25.9453 49.4397C26.0507 49.1844 26.0507 48.8978 25.9453 48.6425C25.8933 48.5152 25.8165 48.3995 25.7192 48.3023L19.825 42.4007C19.411 42.0003 18.7512 42.0118 18.3515 42.4263C17.9614 42.8306 17.9614 43.4717 18.3515 43.8761L22.3115 47.8411C9.74388 46.3595 0.755545 34.9573 2.23534 22.3738C3.71514 9.79035 15.1029 0.790527 27.6705 2.27232C40.2381 3.75412 49.2266 15.1562 47.7467 27.7396C46.9771 34.2842 43.434 40.1812 38.0203 43.9283C37.5395 44.245 37.4062 44.892 37.7225 45.3734C38.0389 45.8549 38.685 45.9883 39.1658 45.6716C39.1795 45.6626 39.1929 45.6532 39.2062 45.6437C50.5697 37.7807 53.4155 22.183 45.5625 10.8051Z" fill="#523DD8" />
                    </svg>
                </div>
            </div>
        )
    }



}
export default Question;
