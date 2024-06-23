import React, { useState, useEffect, useRef } from "react";
import "./AddTripWalk.css";


export default function AddTripWalk() {

    const parrentRef = useRef();

    useEffect(() => {
        let rectParrent = parrentRef.current.getBoundingClientRect();
        parrentRef.current.style.height = window.innerHeight - rectParrent.y + "px";
    }, []);

    return (
        <div className="background-trip" ref={parrentRef}>
            <div className="header-trip-data">
            </div>
            <div className="settings-trip-data">
            </div>
        </div>
    );
}