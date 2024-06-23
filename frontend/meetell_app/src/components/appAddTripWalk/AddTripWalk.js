import React, { useState, useEffect, useRef } from "react";
import "./AddTripWalk.css";

import BackButton from "../BackButton";
import back from '../../img/back.svg'

export default function AddTripWalk() {

    const [selectedRoute, setSelectedRoute] = useState(true);

    const parrentRef = useRef();

    useEffect(() => {
        let rectParrent = parrentRef.current.getBoundingClientRect();
        parrentRef.current.style.height = window.innerHeight - rectParrent.y + "px";
    }, []);

    return (
        <div className="header-trip">
            <div className="header-trip-data">
                <BackButton setSelectedRoute={setSelectedRoute} />
                <p>Предложить маршрут</p>
            </div>
            <div className="background-trip" ref={parrentRef}>
                <div className="settings-data-trip">
                    <div className="large-frame">
                        <p>Название<br />маршрута:</p>
                        <input className="large-frame-data" />
                        <p>Возрастная<br />группа:</p>
                        <select name="select-age-group">
                            <option value="value1">Значение 1</option>
                            <option value="value2" selected>Не имеет значения</option>
                            <option value="value3">Значение 3</option>
                        </select>
                        <p>Пол:</p>
                        <select name="select-sex-data">
                            <option value="sex-male">Мужской</option>
                            <option value="sex-other" selected>Не имеет значения</option>
                            <option value="sex-female">Женский</option>
                        </select>
                        <p>Город:</p>
                        <select name="select-sex-data">
                            <option value="sex-male">Мужской</option>
                            <option value="sex-other" selected>Не имеет значения</option>
                            <option value="sex-female">Женский</option>
                        </select>
                        <p>Дата:</p>
                        <div className="date-settings">
                            <select name="select-sex-data">
                                <option value="sex-male">Мужской</option>
                                <option value="sex-other" selected>Не имеет значения</option>
                                <option value="sex-female">Женский</option>
                            </select>
                            <select name="select-sex-data">
                                <option value="sex-male">Мужской</option>
                                <option value="sex-other" selected>Не имеет значения</option>
                                <option value="sex-female">Женский</option>
                            </select>
                            <select name="select-sex-data">
                                <option value="sex-male">Мужской</option>
                                <option value="sex-other" selected>Не имеет значения</option>
                                <option value="sex-female">Женский</option>
                            </select>
                        </div>
                        <p>Время встречи:</p>
                        <input className="time-data" placeholder="10:00" />
                    </div>
                </div>
            </div>
        </div>

    );
}