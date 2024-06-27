import React, { useState } from 'react';
import { ReactComponent as BadIcon } from '../../img/bad_grade.svg';
import { ReactComponent as SadIcon } from '../../img/sad_grade.svg';
import { ReactComponent as MediumIcon } from '../../img/medium_grade.svg';
import { ReactComponent as GoodIcon } from '../../img/good_grade.svg';
import { ReactComponent as FunnyIcon } from '../../img/funny_grade.svg';

const Feedback = () => {
    const [userRate, setUserRate] = useState(false);

    const handleUserRate = () => {
        setUserRate(true);
    }

    return (
        !userRate ? (
            <div className="grade-faces">
                <BadIcon
                    onClick={handleUserRate} 
                    className="icon_small"
                />
                <SadIcon
                    onClick={handleUserRate}
                    className="icon_small" 
                />
                <MediumIcon
                    onClick={handleUserRate}
                    className="icon_small" 
                />
                <GoodIcon
                    onClick={handleUserRate}
                    className="icon_small" 
                />
                <FunnyIcon
                    onClick={handleUserRate}
                    className="icon_small" 
                />
            </div>
        ) : (
            <p className="feedback">Спасибо за обратную связь!</p>
        )
    );
}

export default Feedback;