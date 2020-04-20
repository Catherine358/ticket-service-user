import React from 'react';
import './App.css';
import Header from "./components/header";
import Grid from '@material-ui/core/Grid';
import AsideBlock from "./components/aside-block";

const App = (props) => {
    return (
        <div className="wrapper">
            <header className="heading">
                <Header/>
            </header>
            <Grid container>
                <Grid container direction="row" className="main-container">
                    <Grid container item lg={3}>
                        <AsideBlock/>
                    </Grid>
                    <Grid container item lg={9}>

                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default App;
