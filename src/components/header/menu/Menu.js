import React from "react";
import './menuBurger.less';
import Grid from "@material-ui/core/Grid";
import logo from '../../../img/logo_white.svg';
import icon_yuotube from "../../../img/icons/white/icon-utube.png";
import icon_fb from "../../../img/icons/white/icon-fb.png";
import icon_tw from "../../../img/icons/white/icon-twitter.png";
import icon_inst from "../../../img/icons/white/icon-inst.png";
import icon_ok from "../../../img/icons/white/icon-classmates.png";
import icon_rss from "../../../img/icons/white/icon-rss.png";
import {Link} from "react-router-dom";

const Menu = (props) => {
    const { setMenu } = props;

    return (
        <Grid container direction="row" className="menu-burger">
            <Grid container item sm={3} className="menu-burger-logo">
                <img src={logo} alt="logo" className="menu-burger-logo-img"/>
            </Grid>
            <Grid container item sm={5} className="menu-burger-info">
                <Grid container direction="column">
                    <p className="menu-burger-name">Berlin City Hall | Events & Tickets</p>
                    <Grid container item justify="flex-start" className="menu-burger-icons">
                        <img className="menu-burger-icon" src={icon_yuotube} alt="youtube-icon"/>
                        <img className="menu-burger-icon" src={icon_fb} alt="fb-icon"/>
                        <img className="menu-burger-icon" src={icon_tw} alt="tw-icon"/>
                        <img className="menu-burger-icon" src={icon_inst} alt="insta-icon"/>
                        <img className="menu-burger-icon" src={icon_ok} alt="ok-icon"/>
                        <img className="menu-burger-icon" src={icon_rss} alt="rss-icon"/>
                    </Grid>
                    <span className="address">
                        Berlin City Hall
                        <br/>
                        Freudstasse 69, 10117 Berlin
                        <br/>
                        Tel.: 030 2223344
                        <br/>
                        Fax.: 030 2223355
                        <br/>
                        Email: info@bch.de
                    </span>
                </Grid>
            </Grid>
            <Grid container item sm={3} xs={9}>
                <Grid container direction="column">
                    <ul className="menu-list">
                        <li>
                            <Link to={"/login"}>
                                <span onClick={() => {
                                    setMenu(false);
                                }}>LOGIN/OUT</span>
                            </Link>
                            </li>
                        <li>
                            <Link to={"/"}>
                                <span onClick={() => {
                                    setMenu(false);
                                }}>EVENTS</span>
                            </Link>
                            </li>
                        <li>
                            <Link to={"/cart"}>
                                <span onClick={() => {
                                    setMenu(false);
                                }}>SHOPPING CART</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/halls-schemes"}>
                                <span onClick={() => {
                                    setMenu(false);
                                }}>HALLS SCHEME</span>
                            </Link>
                            </li>
                        <li>
                            <Link to={"/about"}>
                                <span onClick={() => {
                                    setMenu(false);
                                }}>ABOUT US</span>
                            </Link>
                        </li>
                    </ul>
                </Grid>
            </Grid>
            <Grid container item sm={1} xs={3}>
                    <span className="cross" onClick={() => {
                        setMenu(false);
                    }}>&times;</span>
            </Grid>
        </Grid>
    );
};

export default Menu;