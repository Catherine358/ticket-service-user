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
import TermsAndConditions from "./components/main-block/main/terms-&-conditions";
import PaySystem from "./components/main-block/main/pay/Pay";
import Ticket from "./components/main-block/main/ticket";
import Registration from "./components/main-block/main/registration";
import Login from "./components/main-block/main/login";
import AboutUs from "./components/main-block/main/about";
import HallScheme from "./components/main-block/main/hall-scheme";

const App = (props) => {
    return (
            <Switch>
                <Route exact path="/ticket-service-user" render={props => (
                    <div className="wrapper">
                        <header className="heading">
                            <Header {...props}/>
                        </header>
                        <Grid container direction="row" className="main-container">
                            <Grid container item md={3}>
                                <AsideBlock {...props}/>
                            </Grid>
                            <Grid container item md={9}>
                                <Grid container direction="column">
                                    <Events {...props}/>
                                    <Footer/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                )}/>
                <Route exact path="/ticket-service-user/terms" render={props => (
                    <div className="wrapper">
                        <header className="heading">
                            <Header {...props}/>
                        </header>
                        <Grid container direction="row" className="main-container">
                            <Grid container item sm={3}>
                                <AsideBlock {...props}/>
                            </Grid>
                            <Grid container item sm={9}>
                                <Grid container direction="column">
                                    <TermsAndConditions {...props}/>
                                    <Footer/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                )}
                />
                <Route exact path="/ticket-service-user/cart" render={props =>
                    (
                        <div className="wrapper">
                            <header className="heading">
                                <Header {...props}/>
                            </header>
                            <Grid container direction="row" className="main-container">
                                <Grid container item sm={3}>
                                    <AsideBlock {...props}/>
                                </Grid>
                                <Grid container item sm={9}>
                                    <Grid container direction="column">
                                        <ShoppingCart {...props} />
                                        <Footer/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    )
                } />
                <Route exact path="/ticket-service-user/payment" render={props =>
                    (
                        <div className="wrapper">
                            <header className="heading">
                                <Header {...props}/>
                            </header>
                            <Grid container direction="row" className="main-container">
                                <Grid container item sm={3}>
                                    <AsideBlock {...props}/>
                                </Grid>
                                <Grid container item sm={9}>
                                    <Grid container direction="column">
                                        <PaySystem {...props} />
                                        <Footer/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    )
                } />
                <Route exact path="/ticket-service-user/ticket" render={props =>
                    (
                        <div className="wrapper">
                            <header className="heading">
                                <Header {...props}/>
                            </header>
                            <Grid container direction="row" className="main-container">
                                <Grid container item sm={3}>
                                    <AsideBlock {...props}/>
                                </Grid>
                                <Grid container item sm={9}>
                                    <Grid container direction="column">
                                        <Ticket {...props} />
                                        <Footer/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    )
                } />
                <Route exact path="/ticket-service-user/login" render={props =>
                    (
                        <div className="wrapper">
                            <header className="heading">
                                <Header {...props}/>
                            </header>
                            <Grid container direction="row" className="main-container">
                                <Grid container item sm={3}>
                                    <AsideBlock {...props}/>
                                </Grid>
                                <Grid container item sm={9}>
                                    <Grid container direction="column">
                                        <Login {...props} />
                                        <Footer/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    )
                } />
                <Route exact path="/ticket-service-user/registration" render={props =>
                    (
                        <div className="wrapper">
                            <header className="heading">
                                <Header {...props}/>
                            </header>
                            <Grid container direction="row" className="main-container">
                                <Grid container item sm={3}>
                                    <AsideBlock {...props}/>
                                </Grid>
                                <Grid container item sm={9}>
                                    <Grid container direction="column">
                                        <Registration {...props} />
                                        <Footer/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    )
                } />
                <Route exact path="/ticket-service-user/about" render={props =>
                    (
                        <div className="wrapper">
                            <header className="heading">
                                <Header {...props}/>
                            </header>
                            <Grid container direction="row" className="main-container">
                                <Grid container item sm={3}>
                                    <AsideBlock {...props}/>
                                </Grid>
                                <Grid container item sm={9}>
                                    <Grid container direction="column">
                                        <AboutUs {...props} />
                                        <Footer/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    )
                } />
                <Route exact path="/ticket-service-user/halls-schemes" render={props =>
                    (
                        <div className="wrapper">
                            <header className="heading">
                                <Header {...props}/>
                            </header>
                            <Grid container direction="row" className="main-container">
                                <Grid container item sm={3}>
                                    <AsideBlock {...props}/>
                                </Grid>
                                <Grid container item sm={9}>
                                    <Grid container direction="column">
                                        <HallScheme {...props} />
                                        <Footer/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    )
                } />
                <Route exact path="/ticket-service-user/:id" render={props => {
                    const {id} = props.match.params;
                    return (
                        <div className="wrapper">
                            <header className="heading">
                                <Header {...props}/>
                            </header>
                            <Grid container direction="row" className="main-container">
                                <Grid container item sm={3}>
                                    <AsideBlock {...props}/>
                                </Grid>
                                <Grid container item sm={9}>
                                    <Grid container direction="column">
                                        <EventInfo {...props} eventId={id}/>
                                        <Footer/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    );
                }}/>
                <Route exact path="/ticket-service-user/:id/scene" render={props => {
                    const { id } = props.match.params;
                    return (
                        <div className="wrapper">
                            <header className="heading">
                                <Header {...props}/>
                            </header>
                            <Grid container direction="row" className="main-container">
                                <Grid container item sm={3}>
                                    <AsideBlock {...props}/>
                                </Grid>
                                <Grid container item sm={9}>
                                    <Grid container direction="column">
                                        <Scene {...props} eventId={id}/>
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
