import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTickets } from "../../../actions/actions";
import { Link } from "react-router-dom";
import './eventInfo.less';

const EventInfo = (props) => {
    const myEvent = JSON.parse(localStorage.getItem("myEvent"));
    const eventStart = myEvent.eventStart;
    const year = new Date(parseInt(eventStart)).getFullYear();
    const month = new Date(parseInt(eventStart)).toLocaleString('default', {month: 'long'});
    const day = new Date(parseInt(eventStart)).getDay();
    let hour = new Date(parseInt(eventStart)).getHours();
    if (hour < 10) {
        hour = "0" + hour;
    }
    let minute = new Date(parseInt(eventStart)).getMinutes();
    if (minute < 10) {
        minute = "0" + minute;
    }
    const date = day + " " + month + " " + year;
    const time = hour + ":" + minute;

    const ticketInfo = useSelector(state => state.ticketsInfo.ticketsInfo);
    const dispatch = useDispatch();
    useEffect(() => {
        fetchTickets(dispatch, myEvent.eventId)
    }, [dispatch, myEvent.eventId]);

    return (
        <div className="eventInfo">
            <div className="header">
                <h1>Events</h1>
            </div>
            <div className="preview">
                <div className="date">{day + " " + month}</div>
                <h1>{myEvent.artist}</h1>
                <h2>{myEvent.eventName}</h2>
                <img src={myEvent.images[0]} alt="poster"/>
            </div>
            <div className="info">
                <h1>{myEvent.artist}</h1>
                <div className="description">{myEvent.description}</div>
                <div className="dateAndTickets">
                    <span>Date: <span className="yellow">{date}</span> <span>{time}</span></span>
                    <span>Tickets available - <span className="yellow">{ticketInfo.restTick}</span></span>
                    <span>Price range: <span className="yellow">{ticketInfo.maxPrice} - {ticketInfo.minPrice}</span></span>
                </div>
                <Link to={`/${myEvent.eventId}/scene`}>
                    <span className="yellow">BUY TICKETS</span>
                </Link>
            </div>
        </div>
    )
};

export default EventInfo;