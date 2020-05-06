import React, { useState } from "react";
import './header.less';
import logo from "../../img/logo_white.svg";
import icon_fb from "../../img/icons/icon-fb.png";
import icon_yuotube from "../../img/icons/icon-utube.png";
import icon_tw from "../../img/icons/icon-twitter.png";
import icon_inst from "../../img/icons/icon-inst.png";
import icon_ok from "../../img/icons/icon-classmates.png";
import icon_rss from "../../img/icons/icon-rss.png";
import Grid from '@material-ui/core/Grid';
import Menu from "./menu";
import {Link} from "react-router-dom";

const Header = (props) => {
    const [menu, setMenu] = useState(false);

    if(menu){
        return (
            <Menu menu={menu} setMenu={setMenu}/>
        );
    }

    return (
        <Grid className="header-layout" container direction="row" justify="space-around" alignItems="flex-start">
            <Grid container item  sm={4} className="logo">
                <Link to={"/"}>
                    <img src={logo} alt="logo" className="logo-img"/>
                </Link>
            </Grid>
            <Grid  container item sm={4} className="info-header">
                <Grid container direction="column" className="middle-sec-header">
                    <p>Berlin City Hall | Events & Tickets</p>
                    <Link to={'/login'}>
                        <span>LOGIN</span>
                    </Link>
                </Grid>
            </Grid>
            <Grid container item sm={4} className="menu">
                <Grid container direction="row">
                    <Grid container item justify="flex-end" className="menu-icons">
                        <img className="menu-icon" src={icon_yuotube} alt="youtube-icon"/>
                        <img className="menu-icon" src={icon_fb} alt="fb-icon"/>
                        <img className="menu-icon" src={icon_tw} alt="tw-icon"/>
                        <img className="menu-icon" src={icon_inst} alt="insta-icon"/>
                        <img className="menu-icon" src={icon_ok} alt="ok-icon"/>
                        <img className="menu-icon" src={icon_rss} alt="rss-icon"/>
                    </Grid>
                    <Grid container item justify="flex-end" className="menu-burger-btn">
                        <span className="burger" onClick={() => {
                            setMenu(true);
                        }}>&#9776;</span>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Header;