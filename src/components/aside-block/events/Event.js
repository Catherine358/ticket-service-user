import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { ticketsInformation } from "../../services/Server";

const Event = ({event}) => {
    const [ticketsRemained, setTickets] = useState(0);
    useEffect(() => {
        async function fetchTickets(eventId) {
            await ticketsInformation(eventId)
                .then(data => {
                    console.log(data);
                    setTickets(data.restTick);
                })
        }
        fetchTickets(event.eventId);
        }, [event.eventId]);

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
            <div className="event"
                 style={{backgroundImage: `url(${preview})`, backgroundSize: "210px", backgroundPosition: "top"}}>
                <p className="event-name">{event.eventName}</p>
            </div>
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