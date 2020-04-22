import React from "react";
import Grid from '@material-ui/core/Grid';
import EventsAside from "./events";
import DayPicker from "react-day-picker";
import './day-picker.less';

const AsideBlock = (props) => {
    const WEEKDAYS_SHORT = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    return (
        <Grid container direction="column" justify="center" className="aside-container">
            <div className="title">Calendar</div>
            <DayPicker weekdaysShort={WEEKDAYS_SHORT}/>
            <div className="title">Upcoming events</div>
            <EventsAside/>
        </Grid>
    );
};

export default AsideBlock;