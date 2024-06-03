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
    if (state != null) {
        return (
            <div ref={bodyRef} className="que_body">
                <h3>Частые вопросы:</h3>
                {state.map(item => (
                    <div className='que_none'>
                        <div className='que_block'>
                            <div className='que_text'>{item.question}</div>
                            <div className='que_answ_button'>Подробнее</div>
                        </div>
                        <div className='que_answ'>{item.answer}</div>
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
