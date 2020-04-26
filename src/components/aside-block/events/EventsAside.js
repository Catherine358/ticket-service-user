import React, { useState, useEffect } from "react";
import './upcomingEvents.less';
import ErrorIndicator from "../../error-indicator";
import Grid from "@material-ui/core/Grid";
import { requestEvents } from "../../services";
import Event from "./Event";
import Spinner from "../../loader/Loader";

const EventsAside = (props) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        async function fetchEvents() {
            await requestEvents()
                .then(data => {
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

    let arr = events.slice(0, 3);
    let newEvent = [];
    arr.forEach(data => {
         newEvent.push(<Event key={data.eventId} event={data}/>)
    });

    return (
        <Grid container direction="column">
            {newEvent.length === 0 ? <Spinner/> : newEvent}
        </Grid>
    );
};

export default EventsAside;