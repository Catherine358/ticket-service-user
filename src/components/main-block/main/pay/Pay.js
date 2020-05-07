import React  from "react";
import ReactDOM from "react-dom";
import "./pay.less"
import { connect } from "react-redux";
import scriptLoader from 'react-async-script-loader';
import Spinner from "../../../loader/Loader";
import { loadPayPal } from "../../../actions/actions";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import ErrorIndicator from "../../../error-indicator";

const CLIENT_ID = 'AYcAK925I-41dyDTXQ5ClviRB4gln7gPFzi1h26Tso9-4zm97cLpBh_Rq_MjjH0MfcB-tpntW5Fl08SS';
let PayPalButtons = null;

class PaySystem extends React.Component {

    componentWillReceiveProps({isScriptLoaded, isScriptLoadSucceed}, nextStep) {
        if(isScriptLoaded && !this.props.isScriptLoaded) {
            if(isScriptLoadSucceed) {
                PayPalButtons = window.paypal.Buttons.driver('react', {React, ReactDOM});
                this.props.loadPayPal('loaded');
            }
            else this.props.onError();
        }
    }

    componentDidMount() {
        const { isScriptLoaded, isScriptLoadedSucceed } = this.props;
        if(isScriptLoaded && isScriptLoadedSucceed) {
            PayPalButtons = window.paypal.Buttons.driver('react', {React, ReactDOM});
            this.props.loadPayPal('loaded');
        }
    }

    createOrder = (data, action, pricesSum) => {
        return action.order.create({
            purchase_units:[
                {
                    description: "My order",
                    amount: {
                        value: pricesSum.toString(),
                        currency_code: "USD"
                    }
                }
            ]
        });
    };

    onApprove = (data, action) => {
        action.order.capture()
            .then(details => {
                console.log('details', details);
                console.log('data', data);
                this.props.loadPayPal('success');
            })
            .catch(error => {
                console.log(error);
                this.props.loadPayPal('failure');
            });
    };

    render() {
        const myEvent = JSON.parse(localStorage.getItem("myEvent"));
        const eventStart = new Date(parseInt(myEvent.eventStart));
        const day = eventStart.getDate();
        const month = eventStart.toLocaleString('default', {month: 'long'});
        const year = eventStart.getFullYear();
        const date = day + " " + month + " " + year;

        const { pricesSum, ticketsCount, loading, paySuccess, payPalSystem, error } = this.props;

        return (
         <div className="pay">
            <div className="pay-header">
                <h1>PAYING</h1>
            </div>
             {error && <ErrorIndicator error={error}/>}
             {paySuccess && <div className="reserved-text row justify-content-start mt-5 mx-0">
                <div className="col-12 w-100 text-center text-md-left">
                    The tickets shown here have now been reserved for you for 10 minutes.
                </div>
            </div>}
             {loading && <Spinner/>}
             {paySuccess && <div className="row w-100 border-pay p-2 m-0 mr-2">
                <div>
                    <p className="border-pay-header ml-md-3 mx-0 mt-0 text-md-left text-center">
                        {myEvent.artist} | {myEvent.eventName} | {date}
                    </p>
                    <p className="pay-tickets">
                        <span className="mr-4">{ticketsCount} tickets</span>
                        <span>&euro; {pricesSum}</span>
                    </p>
                    <PayPalButtons
                        createOrder={(data, action) => this.createOrder(data, action, pricesSum)}
                        onApprove={this.onApprove}
                     />
                </div>
            </div>}
             {payPalSystem && <div className="row w-100 border-pay-success m-0 p-2 flex-wrap justify-content-center">
                 <p>PROCEED PAYING SUCCESS</p>
                 <div className="w-100" />
                 <Link to={"/ticket"}>
                    <Button variant="contained" className="get-ticket-btn">Get ticket</Button>
                 </Link>
             </div>}
        </div>
        );
    }
}

const mapStateToProps = ({ ticketsInCart: { pricesSum, ticketsCount }, payPalSystem: { loading, paySuccess, payPalSystem, error }}) => {
    return { pricesSum, ticketsCount, loading, paySuccess, payPalSystem, error };
};

 const mapDispatchToProps = (dispatch) => {
     return {
         loadPayPal: (act) => dispatch(loadPayPal(act))
     };
 };

export default connect(mapStateToProps, mapDispatchToProps)(scriptLoader(`https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}`)(PaySystem));