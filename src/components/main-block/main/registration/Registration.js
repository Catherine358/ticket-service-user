import React from "react";
import './registration.less'
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

const Registration = () => {
    return (
        <div className="registration">
            <div className="header">
                <h1>Registration</h1>
            </div>
            <form>
                <div className="salutation">
                    <select id="salut">
                        <option>Mr.</option>
                        <option>Ms.</option>
                        <option>Mrs.</option>
                        <option>Брат</option>
                    </select>
                    <input type="text" id="name" placeholder="Name*" required/>
                    <input type="text" id="surname" placeholder="Surname*" required/>
                    <input type="text" id="company" placeholder="Company"/>
                    <input type="text" id="street" placeholder="Street"/>
                    <input type="text" id="house" placeholder="House"/>
                    <input type="text" id="adInfo" placeholder="Additional info"/>
                    <input type="number" id="postcode" placeholder="Postcode"/>
                    <input type="text" id="city" placeholder="City"/>
                    <input type="text" id="country" placeholder="Country"/>
                </div>
                <div className="contact">
                    <input type="email" id="email" placeholder="Email" required/>
                    <input type="password" id="password" placeholder="Password" required/>
                    <input type="password" id="confirmPassword" placeholder="Confirm password" required/>
                    <input type="tel" id="tel" placeholder="Phone number*" required/>
                    <input type="tel" id="adTel" placeholder="Additional phone number"/>
                    {/*<div className="agreements">*/}
                        <label form="agreement_first" className="label-for-checkbox pos-agreement">
                            <input required type="checkbox" id="agreement_first" name="agreement_first" title="This is required" />
                            <span className="checkmark"/>
                            <span className="red-text">*</span>
                            I have read the notice on
                            <Link to={"/terms"} target="_blank">
                                <span className="yellow-text"> data protection </span>
                            </Link>
                            and the content of the
                            <Link to={"/terms"} target="_blank">
                                <span className="yellow-text"> Standard Terms of Business </span>
                            </Link>
                            and agree to the storage of my personal data.
                        </label>
                        <label form="agreement_second" className="label-for-checkbox pos-agreement">
                            <input required type="checkbox" id="agreement_second" name="agreement_second" title="This is required" />
                            <span className="checkmark"/>
                            <span className="red-text">*</span>
                            I agree to get notifications on my Email and phone.
                        </label>
                    {/*</div>*/}
                </div>
                <div />
                <Button type="submit" variant="contained" className="registration-btn col-md-4 col-12">Register</Button>
            </form>
        </div>
    );
};

export default Registration;