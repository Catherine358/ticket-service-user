import React, { useState } from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import "./pay.less"
import { useSelector, connect } from "react-redux";
import scriptLoader from 'react-async-script-loader';
import Spinner from "../../../loader/Loader";

const CLIENT_ID = 'Acmwh7Sap7muPMPZ0-06wBMIyV6_Q9Qv5MM44d2s1l_Z5z4AGQVbD6lbBAu1ZAc3hohsbJTzPLVZFpJB';
let PayPalButtons = null;

class PaySystem extends React.Component {
    state = (
        loading: true
    );
    componentWillReceiveProps({isScriptLoaded, isScriptLoadSucceed}, nextStep) {
        if(isScriptLoaded && !this.props.isScriptLoaded) {
            if(isScriptLoadSucceed) {
                PayPalButtons = window.paypal.Buttons.driver('react', {React, ReactDOM});
            }
            else this.props.onError();
        }
    }

    componentDidMount() {
        const { isScriptloaded, isScriptLoadedSucceed } = this.props;
        if(isScriptloaded && isScriptLoadedSucceed) {
            console.log('componentDidMount','Loaded');
        }
    }
    render() {
        const myEvent = JSON.parse(localStorage.getItem("myEvent"));
        const eventStart = new Date(parseInt(myEvent.eventStart));
        const day = eventStart.getDate();
        const month = eventStart.toLocaleString('default', {month: 'long'});
        const year = eventStart.getFullYear();
        const date = day + " " + month + " " + year;

         const { pricesSum, ticketsCount } = this.props;

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
             {this.state.loading ? <Spinner/> : <div className="row w-100 border-pay p-2 m-0 mr-2">
                <div>
                    <p className="border-pay-header ml-md-3 mx-0 mt-0 text-md-left text-center">
                        {myEvent.artist} | {myEvent.eventName} | {date}
                    </p>
                    <p className="pay-tickets">
                        <span className="mr-4">{ticketsCount} tickets</span>
                        <span>&euro; {pricesSum}</span>
                    </p>
                    {/*<form className="d-flex flex-wrap align-items-center">*/}
                    {/*    <input type="checkbox" id="pp" name="pp" value="pp" className="mr-2"/>*/}
                    {/*    <label htmlFor="pp"/>*/}
                    {/*    <div className="element-wrapper w-100"/>*/}
                    {/*    <Button variant="contained" className="pay-btn col-md-4 col-12">PAY</Button>*/}
                    {/*</form>*/}
                    <PayPalButtons/>
                </div>
            </div>}
        </div>
        );
    }
}

const mapStateToProps = ({ticketsInCart: { pricesSum, ticketsCount }}) => {
    return { pricesSum, ticketsCount };
};

// const mapDispatchToProps = (dispatch) => {
//     return
// }

export default connect(mapStateToProps)(scriptLoader(`https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}`)(PaySystem));