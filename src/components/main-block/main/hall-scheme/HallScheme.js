import React, { useState } from "react";
import './hallScheme.less';
import scheme1 from "../../../../img/big_hall.png";
import scheme2 from "../../../../img/small_hall.png";

const HallScheme = (props) => {
    const [indexImg, setIndex] = useState(0);

    return (
        <div className="hall-scheme">
            <div className="hall-scheme-header">
                <h1>Halls schemes</h1>
            </div>
            <div className="d-flex">
                <button className="prev-btn" onClick={() => {
                    setIndex(0);
                }} disabled={indexImg === 0}>&#10094;</button>
                <div className="scheme">
                    {indexImg === 0 ? <img src={scheme1} alt="scheme"/>
                    : <img src={scheme2} alt="scheme"/>}
                </div>
                <button className="next-btn" onClick={() => {
                    setIndex(1);
                }} disabled={indexImg === 1}>&#10094;</button>
            </div>
        </div>
    );
};

export default HallScheme;