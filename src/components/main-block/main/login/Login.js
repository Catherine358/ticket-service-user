import React from "react";
import Button from "@material-ui/core/Button";
import "./login.less"

const Login = (props) => {
    return (
        <div className="login">
            <div className="header">
                <h1>Login</h1>
            </div>
            <div className="login-forms">
                <div className="already-user">
                    <h2>I am already a customer</h2>
                    <form>
                        <input type="email" id="login" name="login" placeholder="Email"/>
                        <input type="password" id="password" name="login" placeholder="Password"/>
                        <p className="forgot">Forgotten password?</p>
                        <Button type="submit" variant="contained" className="login-btn">Login</Button>
                    </form>
                </div>
                <div className="new-user">
                    <h2>New customer</h2>
                    <Button variant="contained" className="registration-btn">Register</Button>
                </div>
            </div>
        </div>
    );
};

export default Login;