import React from "react";
import Calendar from "./calendar";
import Grid from '@material-ui/core/Grid';
import EventsAside from "./events";

const AsideBlock = (props) => {
    return (
        <Grid container direction="column" justify="center" className="aside-container">
            <div className="title">Calendar</div>
            <Calendar/>
            <div className="title">Upcoming events</div>
            <EventsAside/>
        </Grid>
    );
};

export default AsideBlock;