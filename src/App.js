import React from 'react';
import './App.css';
import Header from "./components/header";

const App = (props) => {
    return (
        <div className="wrapper">
            <header className="heading">
                <Header/>
            </header>
            <p>Hello!</p>
        </div>
    );
};

export default App;
