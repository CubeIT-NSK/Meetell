import React, { Fragment, useState, } from "react";
import Home from "../appHome/Home";
import Start from "../appStart/Start";

function Main({ setRate }) {
  const [touchStartY, setTouchStartY] = useState(0);
  const [style, setStyle] = useState({ display: 'block' })

  const handleClick = () => {
    if (style.display === 'block') {
      setStyle({ display: 'none' });
      console.log(style);
    } else {
      setStyle({ display: 'block' });
      console.log(style);
    }
  };

  const handleTouchStart = (event) => {
    setTouchStartY(event.touches[0].clientY);
  };

  const handleTouchEnd = (event) => {
    const touchEndY = event.changedTouches[0].clientY;
    const touchDifference = touchStartY - touchEndY;

    if (touchDifference > 50) {
        // Свайп вверх
        console.log('Swiped up');
        handleClick(); // Меняем стиль по свайпу вверх
    } else if (touchDifference < -50) {
        // Свайп вниз
        console.log('Swiped down');
        handleClick(); // Меняем стиль по свайпу вниз
    }
  };

  return (
    <Fragment>
      <Start style={style}/>
      <Home style={style} setRate={setRate} handleClick={handleClick} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}/>
    </Fragment>
  );
}

export default Main;