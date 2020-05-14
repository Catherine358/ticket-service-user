import React, { useState, useEffect } from "react";
import './events.less';
import Event from "./Event";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { fetchEvents, clearRangeEventsSort } from "../../../../actions/actions";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../../loader/Loader";
import ErrorIndicator from "../../../error-indicator";

const updatePage = (indexForPagination, quantity) => {
    return indexForPagination + 4 * quantity;
};

const Events = (props) => {
    const events = useSelector(state => state.eventsList.events);
    const eventsSorted = useSelector(state => state.sortedEvents.eventsFiltered);
    const message = useSelector(state => state.sortedEvents.message);
    const [indexForPagination, setIndex] = useState(0);
    const error = useSelector(state => state.eventsList.error);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchEvents(dispatch);
    }, [dispatch]);

    return (
        <div className="eventsList">
            <div className="header">
                <h1>Events</h1>
                <select>
                    <option>Concert</option>
                    <option>Stand Up</option>
                </select>
            </div>
            {error ? <ErrorIndicator error={error}/> :
                message ? <p>{message}</p> :
                        (events.length > 0 || eventsSorted.length > 0 ?
            <div className="list">

                        <Event arr={eventsSorted.length > 0 && !message ? eventsSorted: events} indexForPagination={indexForPagination}/>

                <Grid container direction="row" className="btn-page-container w-100">
                    <Grid container item justify="center">
                        {(!message && eventsSorted.length === 0) &&
                        <Button variant="contained" className="btn-page-prev" onClick={() => {
                            setIndex(updatePage(indexForPagination, -1));
                        }} disabled={indexForPagination === 0}>PREV</Button>}
                        {(!message && eventsSorted.length === 0) &&
                        <Button variant="contained" className="btn-page-next" onClick={() => {
                            setIndex(updatePage(indexForPagination, 1));
                        }} disabled={indexForPagination + 4 >= events.length}>NEXT</Button>}
                        {(eventsSorted.length > 0 || message) && <Button variant="contained" className="btn-page-next"
                        onClick={() => {
                            dispatch(clearRangeEventsSort());
                        }}>
                            RESET</Button>}
                    </Grid>
                </Grid>
            </div> : <Spinner/>)}
        </div>
    )
};

export default Events;