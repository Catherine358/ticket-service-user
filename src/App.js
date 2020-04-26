import React from 'react';
import './App.css';
import Header from "./components/header";
import Grid from '@material-ui/core/Grid';
import AsideBlock from "./components/aside-block";
import Events from "./components/main-block/main/events";
import EventInfo from "./components/main-block/main/eventInfo";
import Footer from "./components/main-block/footer";
import { Switch, Route } from "react-router";
import Scene from "./components/main-block/main/scenes";
import ShoppingCart from "./components/main-block/main/shopping-cart";

const App = (props) => {
    return (
            <Switch>
                <Route exact path="/" render={props => (
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
                )}/>
                <Route exact path="/:id" render={props => {
                    const {id} = props.match.params;
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
                                        <EventInfo eventId={id}/>
                                        <Footer/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    );
                }}/>
                <Route exact path="/:id/scene" render={props => {
                    const { id } = props.match.params;
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
                                        <Scene eventId={id}/>
                                        <Footer/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    );
                }} />
                <Route exact path="/:id/cart" render={props => {
                    const { id } = props.match.params;
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
                                        <ShoppingCart eventId={id}/>
                                        <Footer/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    );
                }} />
            </Switch>
    );
};

export default App;
