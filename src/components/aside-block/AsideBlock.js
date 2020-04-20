import React from "react";
import Calendar from "./calendar";
import Grid from '@material-ui/core/Grid';

const AsideBlock = (props) => {
    return (
        <Grid container direction="column" justify="center">
            <div className="title">Calendar</div>
            <Calendar/>
            <div className="title">Upcoming events</div>
        </Grid>
    );
};

export default AsideBlock;