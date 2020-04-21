import React, { useState, useEffect } from "react";
import './upcomingEvents.less';
import ErrorIndicator from "../../error-indicator";
import Grid from "@material-ui/core/Grid";
import { requestEvents } from "../../services";
import Event from "./Event";

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

    return (
        <Grid container direction="column">
            <Event events={events} soldPlacesPercentage={70}/>
        </Grid>
    );
};

export default EventsAside;