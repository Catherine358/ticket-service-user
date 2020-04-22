import React, { useState, useEffect } from "react";
import './events.less';
import { requestEvents } from "../../../services";
import Event from "./Event";

const Events = (props) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        async function fetchEvents() {
            await requestEvents()
                .then(data => {
                    console.log(data);
                    let arr = [];
                    for (let i = 0; i < data.length; i++) {
                        arr.push(data[i]);
                    }
                    setEvents(arr);
                })
                .catch(error => console.log(error));
        }
        fetchEvents();
    }, []);

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
                <Event arr={events} indexForPagination={0}/>
            </div>
        </div>
    )
};

export default Events;