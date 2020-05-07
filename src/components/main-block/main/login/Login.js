import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import "./login.less"
import { Link } from "react-router-dom";
import { handleSubmitLogin, recoverPassword } from "../../../services";
import ErrorIndicator from "../../../error-indicator";

const login = (event, setMessage, setError) => {
    event.preventDefault();
    const email = event.target.login.value;
    const password = event.target.password.value;
    handleSubmitLogin(email, password)
        .then(response => {
            localStorage.setItem("token", response.token);
            setMessage("You have successfully logged in!")
        })
        .catch(error => {
            console.log(error);
            setError(error.message);
        });
};

const passwordRecovery = (email, setMessage, setError) => {
    recoverPassword(email)
        .then(response => {
            setTimeout(() => setMessage(response), 1000);
        })
        .catch(error => setError(error.message))
};

const handleChange = (event, setEmail) => {
    setEmail(event.target.value);
};

const resetEmail = (setEmail) => {
    setEmail('');
};

const resetPassword = (setPassword) => {
    setPassword('');
};

const Login = (props) => {
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    return (
        <div className="login">
            <div className="header">
                <h1>Login</h1>
            </div>
            {error? <ErrorIndicator error={error}/> : message !== '' ? <p>{message}</p> :
                <div className="login-forms">
                    <div className="already-user">
                        <h2>I am already a customer</h2>
                        <form onSubmit={(event) => login(event, setMessage, setError)}>
                            <label>
                                <input type="email" id="login" name="login" placeholder="Email"
                                   onChange={(event) => handleChange(event, setEmail)}/>
                                <button type="reset" className="btn-reset" onClick={() => resetEmail(setEmail)}>&times;</button>
                            </label>
                            <label>
                                <input type="password" id="password" name="password" placeholder="Password"/>
                                <button type="reset" className="btn-reset" onClick={() => resetPassword(setPassword)}>&times;</button>
                            </label>
                            <span className="forgot" onClick={() => passwordRecovery(email, setMessage, setError)}>Forgotten password?</span>
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