import React from "react";
import Button from "@material-ui/core/Button";

const Login = (props) => {
    return (
        <div className="login">
            <div className="already-user">
                <h2>I am already a customer</h2>
                <form>

                </form>
            </div>
            <div className="new-user">
                <h2>New customer</h2>
                <Button>Register</Button>
            </div>
        </div>
    );
};

export default Login;