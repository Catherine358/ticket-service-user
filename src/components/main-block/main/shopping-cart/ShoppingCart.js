import React, {useEffect, useState} from "react";
import { withRouter } from "react-router";
import './shoppingCart.less';
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { bookTicket } from "../../../services";
import { useDispatch, useSelector } from "react-redux";
import { updateTickets, clearCart } from "../../../actions/actions";
import { addLockedSeats, findPrice } from "../../../utils/functions-for-shopping-cart";
import ErrorIndicator from "../../../error-indicator";

const TicketsInCart = ({ ticketsInCart, priceRanges, dispatch }) => {
    let ticket = ticketsInCart.map(data => {
        let arr = data.split("-");
        return (
            <div key={data} className="row justify-content-between seat-cart-row ml-0">
                <span className="seat-cart-font">{arr[0]}</span>
                <span className="seat-cart-font">{arr[1]}</span>
                <span className="seat-cart-cross" onClick={() => {
                    let price = findPrice(arr[0], priceRanges);
                    dispatch(updateTickets(data, price, 1, -1));
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
    const dispatch = useDispatch();

    const [error, setError] = useState('');

    useEffect(() => {
        async function bookSeats(eventId, lockedSeats) {
            await bookTicket(eventId, lockedSeats)
                .then(data => console.log(data))
                .catch(error => {
                    console.log(error);
                    setError(error.message);
                });
        }
        bookSeats(myEvent.eventId, lockedSeats);
    }, [myEvent.eventId, lockedSeats]);

    if(error){
        return (
        <div className="shopping-cart">
            <div className="shopping-cart-header">
                <h1>Shopping cart</h1>
            </div>
            <ErrorIndicator error={error}/>
        </div>
        );
    }

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

    const goToPay = (event) => {
        event.preventDefault();
        addLockedSeats({ ticketsInCart, ticketsCount, pricesSum }, priceRanges);
        props.history.push("/payment");
    };

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
                    <TicketsInCart ticketsInCart={ticketsInCart} priceRanges={priceRanges}
                                   dispatch={dispatch}/>
                    <PricesSum pricesSum={pricesSum} ticketsCount={ticketsCount}/>
                    <form onSubmit={goToPay}>
                        <Button type="submit" variant="contained" className="shopping-cart-btn col-md-4 col-12">PAY</Button>
                        <label form="agreement" className="label-for-checkbox pos-cart-agreement">
                            <input required type="checkbox" id="agreement" name="agreement" title="This is required" />
                            <span className="checkmark"/>
                            <span className="red-text">*</span>
                            I have read the
                            <Link to={"/terms"} target="_blank">
                                <span className="yellow-text"> Terms and Conditions </span>
                            </Link>
                            and fully agree with them.
                        </label>
                    </form>
                    <div className="clear-cart" onClick={() => {
                        dispatch(clearCart());
                    }}>Delete section</div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(ShoppingCart);