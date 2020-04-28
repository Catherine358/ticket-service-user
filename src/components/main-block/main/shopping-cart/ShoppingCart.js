import React, { useEffect, useState } from "react";
import './shoppingCart.less';
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import { bookTicket } from "../../../services";
import { useDispatch, useSelector } from "react-redux";
import { updateTickets, updatePriceSum, updateCount } from "../../../actions/actions";

const findPrice = (row, priceRanges) => {
    for(let i = 0; i < priceRanges.length; i++){
        if(priceRanges[i].rows.includes(row.toString())){
            return priceRanges[i].price;
        }
    }
    return null;
};

const TicketsInCart = ({ lockedSeats, priceRanges, dispatch }) => {
    let ticket = lockedSeats.map(data => {
        let arr = data.split("-");
        return (
            <div key={data} className="row justify-content-between seat-cart-row">
                <span className="seat-cart-font">{arr[0]}</span>
                <span className="seat-cart-font">{arr[1]}</span>
                <span className="seat-cart-cross" onClick={() => {
                    dispatch(updateTickets(data, -1));
                    let price = findPrice(arr[0], priceRanges);
                    dispatch(updatePriceSum(price, -1));
                    dispatch(updateCount(1, -1));
                }}>&times;</span>
            </div>
        )
    });
    let ticketsArr = [];
    ticketsArr.push(ticket);
    return ticketsArr;
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
    const pricesSum = useSelector(state => state.ticketsInCart.pricesSum);
    const ticketsCount = useSelector(state => state.ticketsInCart.ticketsCount);
    const priceRanges = useSelector(state => state.ticketsInCart.priceRanges);
    const ticketsInCart = useSelector(state => state.ticketsInCart.ticketsInCart);
    const myEvent = JSON.parse(localStorage.getItem("myEvent"));
    const eventStart = myEvent.eventStart;
    const year = new Date(parseInt(eventStart)).getFullYear();
    const month = new Date(parseInt(eventStart)).toLocaleString('default', {month: 'long'});
    const day = new Date(parseInt(eventStart)).getDate();
    const date = day + " " + month + " " + year;
    const [section, setSection] = useState();
    const dispatch = useDispatch();

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
                    <TicketsInCart lockedSeats={ticketsInCart} priceRanges={priceRanges.priceRanges}
                                   dispatch={dispatch}/>
                    <PricesSum pricesSum={pricesSum} ticketsCount={ticketsCount}/>
                    <Link to={"/payment"}>
                        <Button variant="contained" className="shopping-cart-btn col-md-4 col-12" onClick={() => {
                            let lockedSeats = [];
                            let map = new Map();
                            ticketsInCart.forEach(data => {
                                let arr = data.split("-");
                                if(map.get(arr[0]) === undefined){
                                    let seats = [];
                                    seats.push(arr[1]);
                                    map.set(arr[0], seats);
                                }else{
                                    let tmp = map.get(arr[0]);
                                    tmp.push(arr[1]);
                                    map.set(arr[0], tmp);
                                }
                            });
                            map.forEach((value, key) => {
                                lockedSeats.push({
                                    row: key.toString(),
                                    seats: value
                                });
                            });
                            localStorage.setItem("lockedSeats", JSON.stringify(lockedSeats));
                        }}>PAY</Button>
                    </Link>
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