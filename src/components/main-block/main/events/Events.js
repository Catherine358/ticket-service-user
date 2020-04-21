import React from "react";
import './events.less'

const Events = (props) => {
    return (
        <div className="eventsList">
            <div className="header">
                <h1>Events</h1>
                <select>
                    <option>Concert</option>
                    <option>Stand Up</option>
                </select>
            </div>
            <div className="list">
                <article className="event">
                    <div className="date">30 February</div>
                    <h1>Lady Gaga</h1>
                    <h2>World Tour 2020</h2>
                    <img src="https://sun9-58.userapi.com/c857520/v857520709/1af604/9c2d0fLcoaU.jpg" />
                </article>

                <article className="event">
                    <div className="date">30 February</div>
                    <h1>Lady Gaga</h1>
                    <h2>World Tour 2020</h2>
                    <img src="https://sun9-58.userapi.com/c857520/v857520709/1af604/9c2d0fLcoaU.jpg" />
                </article>

                <article className="event">
                    <div className="date">30 February</div>
                    <h1>Lady Gaga</h1>
                    <h2>World Tour 2020</h2>
                    <img src="https://sun9-58.userapi.com/c857520/v857520709/1af604/9c2d0fLcoaU.jpg" />
                </article>

                <article className="event">
                    <div className="date">30 February</div>
                    <h1>Lady Gaga</h1>
                    <h2>World Tour 2020</h2>
                    <img src="https://sun9-58.userapi.com/c857520/v857520709/1af604/9c2d0fLcoaU.jpg" />
                </article>
            </div>
        </div>
    )
};

export default Events;