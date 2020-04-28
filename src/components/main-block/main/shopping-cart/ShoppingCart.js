import React, { useEffect, useState } from "react";
import './shoppingCart.less';
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import { bookTicket } from "../../../services";

const TicketsInCart = ({lockedSeats}) => {
    let ticket;
    let tickets = [];
        lockedSeats.forEach(data => {
        ticket = data.seats.map(seat => {
            return (
                <div key={data.row + seat} className="row ml-0 mr-0 justify-content-between seat-cart-row">
                    <span className="seat-cart-font">{data.row}</span>
                    <span className="seat-cart-font">{seat}</span>
                    <span className="seat-cart-cross">&times;</span>
                </div>
            );
        });
        tickets.push(ticket);
    });
    return tickets;
};

const PricesSum = (props) => {
    const { pricesSum, ticketsCount } = props;
    return (
        <div className="row w-100 justify-content-between mt-2 mr-0 ml-0">
            <span className="seat-cart">{ticketsCount} tickets</span>
            <span className="seat-cart">&#8364; {pricesSum}</span>
        </div>
    );
};

const ShoppingCart = (props) => {
    const lockedSeats = JSON.parse(localStorage.getItem("lockedSeats")) !== null ?
        JSON.parse(localStorage.getItem("lockedSeats")).lockedSeats : null;
    const pricesSum = JSON.parse(localStorage.getItem("lockedSeats")) !== null ?
        JSON.parse(localStorage.getItem("lockedSeats")).pricesSum : 0;
    const ticketsCount = JSON.parse(localStorage.getItem("lockedSeats")) !== null ?
        JSON.parse(localStorage.getItem("lockedSeats")).ticketsCount : 0;
    const myEvent = JSON.parse(localStorage.getItem("myEvent"));
    const eventStart = myEvent.eventStart;
    const year = new Date(parseInt(eventStart)).getFullYear();
    const month = new Date(parseInt(eventStart)).toLocaleString('default', {month: 'long'});
    const day = new Date(parseInt(eventStart)).getDate();
    const date = day + " " + month + " " + year;
    const [section, setSection] = useState();
    const [pricesSumary, setPrices] = useState(pricesSum);

    useEffect(() => {
        async function bookSeats(eventId, lockedSeats) {
            await bookTicket(eventId, lockedSeats)
                .then(data => console.log(data))
                .catch(error => console.log(error));
        }
        bookSeats(myEvent.eventId, lockedSeats);
    }, [myEvent.eventId, lockedSeats]);

    if(ticketsCount === 0){
        return (
            <div className="shopping-cart">
                <div className="shopping-cart-header">
                    <h1>Shopping cart</h1>
                </div>
                <div className="row w-100 border-cart p-2 m-0 mr-2">
                    <p className="border-cart-header ml-md-3 mx-0 mt-0 text-md-left text-center">
                        Your shopping cart is empty.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="shopping-cart">
            <div className="shopping-cart-header">
                <h1>Shopping cart</h1>
            </div>
            <div className="reserved-text row justify-content-start mt-5 mx-0">
                <div className="col-12 w-100 text-center text-md-left">
                    The tickets shown here have now been reserved for you for 10 minutes.
                </div>
            </div>
            <div className="row w-100 border-cart p-2 m-0 mr-2">
                <div>
                    <p className="border-cart-header ml-md-3 mx-0 mt-0 text-md-left text-center">
                        {myEvent.artist} | {myEvent.eventName} | {date}
                    </p>
                    <div className="col-7 pl-0 d-flex justify-content-between">
                        <span>Row</span>
                        <span>Place</span>
                    </div>
                    <TicketsInCart lockedSeats={lockedSeats}/>
                    <PricesSum pricesSum={pricesSumary} ticketsCount={ticketsCount}/>
                    <Button variant="contained" className="shopping-cart-btn col-md-4 col-12">PAY</Button>
                    <label form="agreement" className="label-for-checkbox pos-cart-agreement">
                        <input required type="checkbox" id="agreement" name="agreement" title="This is required"/>
                        <span className="checkmark"/>
                        <span className="red-text">*</span>
                        I have read the
                        <Link to={"/terms"}>
                            <span className="yellow-text"> Terms and Conditions </span>
                        </Link>
                        and fully agree with them.
                    </label>
                    <div className="clear-cart" onClick={() => {
                        localStorage.removeItem("lockedSeats");
                        setSection(0);
                    }}>Delete section</div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;