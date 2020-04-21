import React from "react";
import Grid from "@material-ui/core/Grid";

const Event = ({events, soldPlacesPercentage}) => {
    let arr = events.slice(0, 3);
    let newEvent = arr.map(data => {
        let res = data.eventStart;
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
        let preview = data.images[data.images.length - 1];
        return (
            <aside key={data.eventId}>
                <div className="event"
                     style={{backgroundImage: `url(${preview})`, backgroundSize: "210px", backgroundPosition: "top"}}>
                    <p className="event-name">{data.eventName}</p>
                </div>
                <Grid container direction="row" justify="space-between" className="event-date">
                    <p>{date}</p>
                    <p>{time}</p>
                    {soldPlacesPercentage >= 100 ?
                        <p className="event-sold">SOLD OUT</p>
                        : <p className="event-buy">BUY</p>}
                </Grid>
            </aside>
        );
    });
    return newEvent;
};

export default Event;