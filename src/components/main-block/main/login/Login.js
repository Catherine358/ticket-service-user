import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import "./login.less"
import { Link } from "react-router-dom";
import { handleSubmitLogin, recoverPassword } from "../../../services";
import ErrorIndicator from "../../../error-indicator";

const login = (event, setState) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    handleSubmitLogin(email, password)
        .then(response => {
            localStorage.setItem("token", response.token);
            setState({...initialState, message: "You have successfully logged in!"});
        })
        .catch(error => {
            console.log(error);
            setState({...initialState, error: error.message});
        });
};

const passwordRecovery = (email, setState) => {
    recoverPassword(email)
        .then(response => {
            setTimeout(() => setState({...initialState, message: response}), 1000);
        })
        .catch(error => setState({...initialState, error: error.message}))
};

const handleChangeEmail = (event, setState, password) => {
    setState({...initialState, email: event.target.value, password: password});
};

const handleChangePassword = (event, setState, email) => {
    setState({...initialState, password: event.target.value, email: email});
};

const resetEmail = (setState, password) => {
    setState({...initialState, password: password});
};

const resetPassword = (setState, email) => {
    setState({...initialState, email: email});
};

const initialState = {
    email: "",
    password: "",
    message: "",
    error: ""
};

const Login = (props) => {
    const [{
        email,  password, message, error
    }, setState] = useState(initialState);

    return (
        <div className="login">
            <div className="header">
                <h1>Login</h1>
            </div>
            {error? <ErrorIndicator error={error}/> : message !== '' ? <p>{message}</p> :
                <div className="login-forms">
                    <div className="already-user">
                        <h2>I am already a customer</h2>
                        <form onSubmit={(event) => login(event, setState)}>
                            <label>
                                <input type="email" id="email" name="email" placeholder="Email"
                                   onChange={(event) => handleChangeEmail(event, setState, password)}
                                defaultValue={email}/>
                                <button type="reset" className="btn-reset" onClick={() => resetEmail(setState, password)}>&times;</button>
                            </label>
                            <label>
                                <input type="password" id="password" name="password" placeholder="Password"
                                       onChange={(event) => handleChangePassword(event, setState, email)}
                                defaultValue={password}/>
                                <button type="reset" className="btn-reset" onClick={() => resetPassword(setState, email)}>&times;</button>
                            </label>
                            <span className="forgot" onClick={() => passwordRecovery(email, setState)}>Forgotten password?</span>
                            <Button type="submit" variant="contained" className="login-btn">Login</Button>
                        </form>
                    </div>
                    <div className="new-user">
                        <h2>New customer</h2>
                        <Link to={"/registration"}>
                            <Button variant="contained" className="registration-btn">Register</Button>
                        </Link>
                    </div>
                </div>
            }
        </div>
    );
};

export default Login;