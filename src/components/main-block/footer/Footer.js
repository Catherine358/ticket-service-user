import React from "react";
import './footer.less';
import logo from "../../../img/logo_col.svg";
import Grid from "@material-ui/core/Grid";
import icon_yuotube from "../../../img/icons/icon-utube.png";
import icon_fb from "../../../img/icons/icon-fb.png";
import icon_tw from "../../../img/icons/icon-twitter.png";
import icon_inst from "../../../img/icons/icon-inst.png";
import icon_ok from "../../../img/icons/icon-classmates.png";
import icon_rss from "../../../img/icons/icon-rss.png";

const Footer = (props) => {
    return (
        <Grid container direction="row" className="footer">
            <Grid container item sm={4}>
                <img src={logo} alt="logo" className="footer-logo"/>
            </Grid>
            <Grid container item sm={5}>
                <span className="footer-address">
                    Berlin City Hall
                    <br/>
                    Freudstasse 69, 10117 Berlin
                    <br/>
                    Tel.: 030 2223344
                </span>
            </Grid>
            <Grid container item sm={3}>
                <span className="footer-address">
                    Fax.: 030 2223355
                    <br/>
                    Email: info@bch.de
                    <Grid container item justify="space-between" className="footer-menu-icons">
                    <img className="footer-menu-icon" src={icon_yuotube} alt="youtube-icon"/>
                    <img className="footer-menu-icon" src={icon_fb} alt="fb-icon"/>
                    <img className="footer-menu-icon" src={icon_tw} alt="tw-icon"/>
                    <img className="footer-menu-icon" src={icon_inst} alt="insta-icon"/>
                    <img className="footer-menu-icon" src={icon_ok} alt="ok-icon"/>
                    <img className="footer-menu-icon" src={icon_rss} alt="rss-icon"/>
                </Grid>
                </span>
            </Grid>
        </Grid>
    );
};

export default Footer;