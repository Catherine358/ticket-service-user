import React, { useState, useEffect } from "react";
import './events.less';
import Event from "./Event";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { fetchEvents } from "../../../actions/actions";
import { useSelector, useDispatch } from "react-redux";

const updatePage = (indexForPagination, quantity) => {
    return indexForPagination + 4 * quantity;
};

const Events = (props) => {
    const events = useSelector(state => state.eventsList.events);
    const [indexForPagination, setIndex] = useState(0);
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
            <div className="list">
                <Event arr={events} indexForPagination={indexForPagination}/>
                <Grid container direction="row" className="btn-page-container w-100">
                    <Grid container item justify="center">
                        <Button variant="contained" className="btn-page-prev" onClick={() => {
                            setIndex(updatePage(indexForPagination, -1));
                        }} disabled={indexForPagination === 0}>PREV</Button>
                        <Button variant="contained" className="btn-page-next" onClick={() => {
                            setIndex(updatePage(indexForPagination, 1));
                        }} disabled={indexForPagination + 4 >= events.length}>NEXT</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
};

export default Events;