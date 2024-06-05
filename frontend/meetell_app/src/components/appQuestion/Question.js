import React, { useEffect, useRef, useState } from 'react';
import './Question.css';

function Question() {
    const bodyRef = useRef();
    const [state, setState] = useState(null);
    useEffect(() => {
        let rectBody = bodyRef.current.getBoundingClientRect();
        bodyRef.current.style.height = window.innerHeight - rectBody.y + "px";
        fetch('http://localhost:8000/faq')
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
                        <div class={"answ_" + item.id ===  show ? "que_block_answ":"que_block"}>
                            <div className='que_text'>{item.question}</div>
                            <button className='que_answ_button' onClick={() => setShow('answ_' + item.id )}>{"answ_" + item.id ===  show ? "Скрыть":"Подробнее"}</button>
                        </div>
                        {<div class={"answ_" + item.id ===  show ? "que_answ_show" : "que_answ_hidden"}>{item.answer}</div>}
                        {<button class={"answ"+ item.id === show ? "que_answ_button" : "que_answ_button_hidden"}>Скрыть</button>}
                    </div>
                ))}

            </div>
        )
    } else {
        return (
            <div ref={bodyRef} className="que_body">
                <h3>Частые вопросы:</h3>
            </div>
        )
    }



}
export default Question;
