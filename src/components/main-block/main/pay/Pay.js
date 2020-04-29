import React  from "react";
import ReactDOM from "react-dom";
import "./pay.less"
import { connect } from "react-redux";
import scriptLoader from 'react-async-script-loader';
import Spinner from "../../../loader/Loader";
import { loadPayPal } from "../../../actions/actions";

const CLIENT_ID = 'Acmwh7Sap7muPMPZ0-06wBMIyV6_Q9Qv5MM44d2s1l_Z5z4AGQVbD6lbBAu1ZAc3hohsbJTzPLVZFpJB';
let PayPalButtons = null;

class PaySystem extends React.Component {

    componentWillReceiveProps({isScriptLoaded, isScriptLoadSucceed}, nextStep) {
        if(isScriptLoaded && !this.props.isScriptLoaded) {
            if(isScriptLoadSucceed) {
                PayPalButtons = window.paypal.Buttons.driver('react', {React, ReactDOM});
                this.props.loadPayPal(false);
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

         const { pricesSum, ticketsCount, loading, paySuccess, payPalSystem } = this.props;

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
             {loading && <Spinner/>}
             {payPalSystem && <div className="row w-100 border-pay p-2 m-0 mr-2">
                <div>
                    <p className="border-pay-header ml-md-3 mx-0 mt-0 text-md-left text-center">
                        {myEvent.artist} | {myEvent.eventName} | {date}
                    </p>
                    <p className="pay-tickets">
                        <span className="mr-4">{ticketsCount} tickets</span>
                        <span>&euro; {pricesSum}</span>
                    </p>
                    <PayPalButtons/>
                </div>
            </div>}
        </div>
        );
    }
}

const mapStateToProps = ({ ticketsInCart: { pricesSum, ticketsCount }, payPalSystem: { loading, paySuccess, payPalSystem }}) => {
    return { pricesSum, ticketsCount, loading, paySuccess, payPalSystem };
};

 const mapDispatchToProps = (dispatch) => {
     return {
         loadPayPal: (act) => dispatch(loadPayPal(act))
     };
 };

export default connect(mapStateToProps, mapDispatchToProps)(scriptLoader(`https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}`)(PaySystem));