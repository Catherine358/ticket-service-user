import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import "./pay.less"
import {useSelector} from "react-redux";

const Pay = (propps) => {
    const myEvent = JSON.parse(localStorage.getItem("myEvent"));
    const eventStart = new Date(parseInt(myEvent.eventStart));
    const day = eventStart.getDate();
    const month = eventStart.toLocaleString('default', {month: 'long'});
    const year = eventStart.getFullYear();
    const date = day + " " + month + " " + year;

    const pricesSum = useSelector(state => state.ticketsInCart.pricesSum);
    const ticketsCount = useSelector(state => state.ticketsInCart.ticketsCount);

    return (
        <div className="pay">
            <div className="pay-header">
                <h1>PAYING</h1>
            </div>
            <div className="reserved-text row justify-content-start mt-5 mx-0">
                <div className="col-12 w-100 text-center text-md-left">
                    The tickets shown here have now been reserved for you for 10 minutes.
                </div>
            </div>
            <div className="row w-100 border-pay p-2 m-0 mr-2">
                <div>
                    <p className="border-pay-header ml-md-3 mx-0 mt-0 text-md-left text-center">
                        {myEvent.artist} | {myEvent.eventName} | {date}
                    </p>
                    <p className="pay-tickets">
                        <span className="mr-4">{ticketsCount} tickets</span>
                        <span>&euro; {pricesSum}</span>
                    </p>
                    <form className="d-flex flex-wrap align-items-center">
                        <input type="checkbox" id="paypal" name="paypal" value="paypal" className="mr-2"/>
                        <label for="paypal" />
                        <div className="element-wrapper w-100" />
                        <Button variant="contained" className="pay-btn col-md-4 col-12">PAY</Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Pay;