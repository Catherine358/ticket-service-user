import React, {useEffect, useState} from "react";
import Grid from '@material-ui/core/Grid';
import EventsAside from "./events";
import DayPicker, { DateUtils } from "react-day-picker";
import './day-picker.less';
import { rangeEventsSort } from "../actions/actions";
import { useDispatch } from "react-redux";

const handleDayClick = (day, range, setRange) => {
    const res = DateUtils.addDayToRange(day, range);
    setRange(res);
};

const AsideBlock = (props) => {
    const WEEKDAYS_SHORT = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const [range, setRange] = useState({
        from: undefined,
        to: undefined
    });
    const modifiers = { start: range.from, end: range.to };
    const dispatch = useDispatch();
    useEffect(() => {
        if(range.from !== undefined) {
            dispatch(rangeEventsSort(range));
        }
    }, [range]);

    return (
        <Grid container direction="column" justify="center" className="aside-container">
            <div className="title">Calendar</div>
            <DayPicker className="Selectable" weekdaysShort={WEEKDAYS_SHORT} selectedDays={[range.from, range]}
                       modifiers={modifiers}
                       onDayClick={(day) => {
                           handleDayClick(day, range, setRange);
            }}/>
            <div className="title">Upcoming events</div>
            <EventsAside/>
        </Grid>
    );
};

export default AsideBlock;