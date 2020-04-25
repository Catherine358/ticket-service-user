import React from "react";
import {Link} from "react-router-dom";

const Event = ({ arr, indexForPagination }) => {
    let arrTmp = [];
    if(indexForPagination + 4 > arr.length){
        arrTmp = arr.slice(indexForPagination, arr.length);
    }else {
        arrTmp = arr.slice(indexForPagination, indexForPagination + 4);
    }
    let myEvents = [];
        arrTmp.forEach((data) => {
            const res = new Date(parseInt(data.eventStart));
            const month = res.toLocaleString('default', {month: 'long'});
            const day = res.getDate();
            const date = day + " " + month;
            myEvents.push(
                <Link to={`/${data.eventId}`}>
                    <article className="event" onClick={() => {
                        localStorage.setItem("myEvent", JSON.stringify(data));
                    }}>
                        <div className="date">{date}</div>
                        <h1>{data.artist}</h1>
                        <h2>{data.eventName}</h2>
                        <img src={data.images[0]} alt="poster"/>
                    </article>
                </Link>
            );
        });
    return myEvents;
};

export default Event;