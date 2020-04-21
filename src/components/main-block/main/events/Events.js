import React from "react";
import Grid from "@material-ui/core/Grid";

const Events = (props) => {
    return (
        <div className="eventsList">
            <div className="header">
                <h1>Events</h1>
                <select>
                    <option>Stand Up</option>
                    <option>Concert</option>
                </select>
            </div>
            <div className="list">

            </div>
        </div>
    )
};

export default Events;