import React, { useEffect } from "react";
import './scene.less';
import SmallScene from "./SmallScene";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import BigScene from "./BigScene";
import {Link} from "react-router-dom";
import { fetchSceneInfo, updateTickets } from "../../../actions/actions";
import { findPrice, addLockedSeats } from "../../../utils/functions-for-shopping-cart";

const PriceRanges = ({priceRanges}) => {
    let priceRange;
    if(priceRanges !== undefined) {
       priceRange  = priceRanges.map(data => {
            return (
                <div key={data.price + data.color} className="priceCategories w-100">
                    <span className="d-inline-block w-100"
                          style={{backgroundColor: `${data.color}`}}><span>&#8364;</span> {data.price}</span>
                </div>
            )
        });
    }
    let priceCategories = [];
    priceCategories.push(priceRange);
    return priceCategories;
};

const TicketsInCart = ({ ticketsInCart, priceRanges, dispatch }) => {
  let ticket = ticketsInCart.map(data => {
      let arr = data.split("-");
      return (
        <div key={data} className="row justify-content-between seat-cart-row">
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

const PricesSum = ({pricesSum, ticketsCount}) => {
    return (
        <div className="row w-100 justify-content-between mt-2 mr-0 ml-0">
            <span className="seat-cart">{ticketsCount} tickets</span>
            <span className="seat-cart">&#8364; {pricesSum}</span>
        </div>
    );
};

const Scene = (props) => {
    const myEvent = JSON.parse(localStorage.getItem("myEvent"));
    const eventStart = myEvent.eventStart;
    const year = new Date(parseInt(eventStart)).getFullYear();
    const month = new Date(parseInt(eventStart)).toLocaleString('default', {month: 'long'});
    const day = new Date(parseInt(eventStart)).getDate();
    const date = day + " " + month + " " + year;
    const priceRanges = useSelector(state => state.ticketsInCart.priceRanges);
    const ticketsInCart = useSelector(state => state.ticketsInCart.ticketsInCart);
    const pricesSum = useSelector(state => state.ticketsInCart.pricesSum);
    const ticketsCount = useSelector(state => state.ticketsInCart.ticketsCount);
    const sceneType = myEvent.hall === 0 ? "big" : "small";
    const dispatch = useDispatch();

    useEffect(() => {
       fetchSceneInfo(dispatch, myEvent.eventId);
    }, [dispatch, myEvent.eventId]);

    return (
        <div className="scene">
            <div className="scene-header">
                <h1>Tickets</h1>
            </div>
            <Grid container direction="row" className="scene-main-section">
                <div className="scene-main-section-header">
                    <p>{myEvent.artist} | {myEvent.eventName} | {date}</p>
                </div>
                <Grid container item sm={9}>
                    <Grid container direction="row" justify="center">
                        <p className="buhne">BÜHNE</p>
                        <div className="w-100"/>
                        <div className="d-flex justify-content-between row title-hall-row w-100">
                            <span className="notausgang">Notausgang</span>
                            {sceneType === "big" && <span className="mid-title-hall-2">Mittelparkett</span>}
                            <span className="notausgang">Notausgang</span>
                        </div>
                        {sceneType === "small" ? <SmallScene priceRanges={priceRanges} dispatch={dispatch}/>
                        : <BigScene priceRanges={priceRanges} dispatch={dispatch}/>}
                        {sceneType === "small" ? <p className="hall-1-title mt-5">KLEINER SAAL</p>
                            : <p className="hall-1-title mt-5">GROSSER SAAL</p>}
                        <div className="d-flex justify-content-between row title-hall-row w-100">
                            <span className="hall-1-side-title">Linke Seite</span>
                            <span className="hall-1-side-title">Rechte Seite</span>
                            {sceneType === "big" && <div className="w-100"/>}
                            {sceneType === "big" && <span className="hall-2-natau">
                                                    Eingang
                                                    <br/>
                                                    Ausgang
                                                    </span>}
                            {sceneType === "big" &&<span className="hall-2-natau">
                                                    Eingang
                                                    <br/>
                                                    Ausgang
                                                    </span>}
                        </div>
                    </Grid>
                </Grid>
                <Grid container item sm={3} className="w-100 cart-container">
                    <div className="ml-2 mb-4 scene-main-section-prices w-100">
                        <div>Price range:</div>
                        <PriceRanges priceRanges={priceRanges.priceRanges}/>
                    </div>
                    <div className="row justify-content-between w-100">
                        <div className="col-md-9 col-7 d-flex justify-content-between">
                            <span>Row</span>
                            <span>Place</span>
                        </div>
                    </div>
                    <div className="col-12">
                        {ticketsInCart.length > 0 && <TicketsInCart ticketsInCart={ticketsInCart}
                                                                    priceRanges={priceRanges}
                        dispatch={dispatch}/>}
                    </div>
                    <PricesSum pricesSum={pricesSum} ticketsCount={ticketsCount}/>
                    <Link to={'/cart'}>
                        <Button variant="contained" className="cart-btn w-100 mt-2 pt-2" onClick={() => {
                            addLockedSeats(ticketsInCart, ticketsCount, pricesSum, priceRanges);
                        }}>TO THE CART</Button>
                    </Link>
                </Grid>
            </Grid>
        </div>
    );
};

export default Scene;