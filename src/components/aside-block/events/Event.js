import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { fetchTicketsForAsideBlock } from "../../actions/actions";
import {Link} from "react-router-dom";

const Event = ({event}) => {
    const ticketsRemained = useSelector(state => state.ticketsInfoForAsideBlock.ticketsInfo.restTick);
    const dispatch = useDispatch();
    useEffect(() => {
        fetchTicketsForAsideBlock(dispatch, event.eventId);
        }, [dispatch, event.eventId]);

    let res = event.eventStart;
    let date2 = new Date(parseInt(res)).toLocaleString('default', {month: 'long'});
    let day = new Date(parseInt(res)).getDate();
    let date = day + " " + date2;
    let hours = new Date(parseInt(res)).getHours();
    if(hours < 10){
        hours = "0" + hours;
    }
    let minutes = new Date(parseInt(res)).getMinutes();
    if(minutes < 10){
        minutes = "0" + minutes;
    }
    let time = hours + ":" + minutes;
    let preview = event.images[event.images.length - 1];
    return (
        <aside key={event.eventId}>
            <Link to={`/ticket-service-user/${event.eventId}`}>
                <div className="event" onClick={() => {
                    localStorage.setItem("myEvent", JSON.stringify(event));
                }} style={{backgroundImage: `url(${preview})`, backgroundSize: "210px", backgroundPosition: "top"}}>
                    <div style={{width: "0", height: "60px", display: "inline-block"}}/>
                    <p className="event-name">{event.eventName}</p>
                </div>
            </Link>
            <Grid container direction="row" justify="space-between" className="event-date">
                <p>{date}</p>
                <p>{time}</p>
                {ticketsRemained === 0 ?
                    <p className="event-sold">SOLD OUT</p>
                    : <p className="event-buy">BUY</p>}
            </Grid>
        </aside>
    );
};

export default Event;