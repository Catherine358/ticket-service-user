import React from 'react';
import './App.css';
import Header from "./components/header";
import Grid from '@material-ui/core/Grid';
import AsideBlock from "./components/aside-block";
import Events from "./components/main-block/main/events";
import Footer from "./components/main-block/footer";

const App = (props) => {
    return (
        <div className="wrapper">
            <header className="heading">
                <Header/>
            </header>
            <Grid container direction="row" className="main-container">
                    <Grid container item sm={3}>
                        <AsideBlock/>
                    </Grid>
                    <Grid container item sm={9}>
                        <Grid container direction="column">
                            <Events/>
                            <Footer/>
                        </Grid>
                    </Grid>
            </Grid>
        </div>
    );
};

export default App;
