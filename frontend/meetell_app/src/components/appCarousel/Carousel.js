import React, { useState } from "react";
import "./Carousel.css";
import {default as rocket} from "../../img/rocketInSpace.svg";
import handles from "../../img/handles.svg";
import book from "../../img/book.svg";
import { Link } from "react-router-dom";


const slidesData = [
  {
    id: 0,
    topText: "Исследуй новые места",
    botText: "Узнавай новое о достопримечательностях своего города"
  },
  {
    id: 1,
    topText: "Заведи новых друзей",
    botText: "Находи единомышленников рядом с домом"
  },
  {
    id: 2,
    topText: "Улучшай самочувствие",
    botText: "Доказано что прогулки положительно влияют на физическое и ментальное здоровье"
  }
];

const NavDots = ({ activeIndex, handleClick }) => (
  <div className="navDots">
    {slidesData.map((_, index) => (
      <button
        key={index}
        className={`dot ${index === activeIndex ? "active-dot" : ""}`}
        onClick={() => handleClick(index)}
      >
        <svg
          width="6"
          height="6"
          viewBox="0 0 6 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="3"
            cy="3"
            r="2"
            stroke="#523DD8"
            fill={index === activeIndex ? "#523DD8" : "none"}
          />
        </svg>
      </button>
    ))}
  </div>
);

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [style, setStyle] = useState({});
  function closeSlider () {
    setStyle({
      display: 'none'
    });
  } 
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slidesData.length);
  };

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="sliderBackground" style={style}>
      <div className="slider">
      <Link to='/home'>
      <button className="closeSlider"></button>
      </Link>
        {slidesData.map((slide, index) => (
          <div
            key={slide.id}
            className={`carouselCard ${index === activeIndex ? "" : "nonactive-card"}`}
            onClick={handleNext}
          >
          {
          (slide.id === 0) ? <img className="carouselSvg" src={rocket} alt="" /> :
           (slide.id === 1) ? <img className="carouselSvg" src={handles} alt="" /> :
           (slide.id === 2) ? <img className="carouselSvg" src={book} alt="" /> :
           null
          }
            <NavDots activeIndex={activeIndex} handleClick={handleClick} />
            <h1 className="carouselTopText">{slide.topText}</h1>
            <p className="carouselBotText">{slide.botText}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
