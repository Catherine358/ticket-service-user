import React, { useState, useEffect } from "react";
import './upcomingEvents.less';
import ErrorIndicator from "../../error-indicator";
import Grid from "@material-ui/core/Grid";
import { requestEvents } from "../../services";
import Event from "./Event";
import Spinner from "../../loader/Loader";

const EventsAside = (props) => {
    const [events, setEvents] = useState([]);
    const [arr, setArr] = useState([]);
    const [error, setError] = useState('');
    let index = 0;

    useEffect(() => {
        async function fetchEvents() {
            await requestEvents()
                .then(data => {
                    let tmp = [];
                    for (let i = 0; i < data.length; i++) {
                        tmp.push(data[i]);
                    }
                    setEvents(tmp);
                })
                .catch(error => {
                    console.log(error);
                    setError(error.message);
                });
        }
        fetchEvents();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if(index + 3 <= events.length) {
                setArr(events.slice(index, index + 3));
                index++;
            }else{
                index = 0;
                setArr(events.slice(index, index + 3));
            }
        }, 3000);
        return () => clearInterval(interval);
    }, [events, index]);

    let newEvent = [];
    arr.forEach(data => {
         newEvent.push(<Event key={data.eventId} event={data}/>)
    });

    return (
        <Grid container direction="column">
            {error ? <ErrorIndicator error={error}/> : newEvent.length === 0 ? <Spinner/> : newEvent}
        </Grid>
    );
};

export default EventsAside;