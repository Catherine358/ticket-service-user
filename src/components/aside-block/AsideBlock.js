import React, { useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import EventsAside from "./events";
import DayPicker, { DateUtils } from "react-day-picker";
import './day-picker.less';
import { rangeEventsSort } from "../actions/actions";
import {useDispatch, useSelector} from "react-redux";
import { setRange } from "../actions/actions";

const handleDayClick = (day, range, dispatch) => {
    const res = DateUtils.addDayToRange(day, range);
    dispatch(setRange(res));
};

const AsideBlock = (props) => {
    const WEEKDAYS_SHORT = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const range = useSelector(state => state.dateRange);
    const modifiers = { start: range.from, end: range.to };
    const dispatch = useDispatch();
    useEffect(() => {
        if(range.from !== undefined) {
            dispatch(rangeEventsSort(range));
        }
    }, [dispatch, range]);

    return (
        <Grid container className="aside-container">
            <div className="title">
                <p>Calendar</p>
            <DayPicker className="Selectable" weekdaysShort={WEEKDAYS_SHORT} selectedDays={[range.from, range]}
                       modifiers={modifiers}
                       onDayClick={(day) => {
                           handleDayClick(day, range, dispatch);
            }}/>
            </div>
            <div className="title">
                <p>Upcoming events</p>
            <EventsAside/>
            </div>
        </Grid>
    );
};

export default AsideBlock;