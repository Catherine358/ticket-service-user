import React from "react";
import './shoppingCart.less';
import Button from "@material-ui/core/Button";

const ShoppingCart = (props) => {
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
                        Lady Gaga | World tour 2020 | 14 June 2019
                    </p>
                    <div className="col-7 pl-0 d-flex justify-content-between">
                        <span>Row</span>
                        <span>Place</span>
                    </div>
                    <div className="row ml-0 mr-0 justify-content-between seat-cart-row">
                        <span className="seat-cart-font">8</span>
                        <span className="seat-cart-font">11R</span>
                        <span className="seat-cart-cross">&times;</span>
                    </div>
                    <div className="row w-100 justify-content-between mt-2 mr-0 ml-0">
                        <span className="seat-cart">0 tickets</span>
                        <span className="seat-cart">&#8364; 0</span>
                    </div>
                    <Button variant="contained" className="shopping-cart-btn col-md-4 col-12">PAY</Button>
                    <label form="agreement" className="label-for-checkbox pos-cart-agreement">
                        <input required type="checkbox" id="agreement" name="agreement" title="This is required"/>
                        <span className="checkmark"/>
                        <span className="red-text">*</span>
                        I have read the
                        <span className="yellow-text"> Terms and Conditions </span>
                        and fully agree with them.
                    </label>
                    <div className="clear-cart">Delete section</div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;