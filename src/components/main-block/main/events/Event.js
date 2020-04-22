import React from "react";

const Event = ({ arr, indexForPagination }) => {
    let arrTmp = [];
    if(indexForPagination + 4 > arr.length){
        arrTmp = arr.slice(indexForPagination, arr.length);
    }else {
        arrTmp = arr.slice(indexForPagination, indexForPagination + 4);
    }
    let myEvents = [];
        arrTmp.forEach((data) => {
        let res = data.eventStart;
        let date2 = new Date(parseInt(res)).toLocaleString('default', {month: 'long'});
        let day = new Date(parseInt(res)).getDate();
        let date = day + " " + date2;
        myEvents.push(
            <article className="event">
                <div className="date">{date}</div>
                <h1>{data.artist}</h1>
                <h2>{data.eventName}</h2>
                <img src={data.images[0]} alt="poster"/>
            </article>
        );
    });
    return myEvents;
};

export default Event;