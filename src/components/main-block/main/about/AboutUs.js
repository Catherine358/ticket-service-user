import React from "react";
import './aboutUs.less';

const AboutUs = (props) => {
    return (
        <div className="about justify-content-center w-100">
            <div className="header">
                <h1>About us</h1>
            </div>
            <p className="cover">
                <span className="about-title">
                    Berlin City Hall | Events & Tickets
                </span>
            </p>
            <p className="p-2">
                At Berlin City Hall | Events and Tickets, we strive to put fans first. Every day we're listening to your feedback and working to improve your experience before, during, and after events.
            </p>
            <p className="p-2">
                Berlin City Hall | Events and Tickets merged to create Berlin Entertainment. Now you have more options than ever to enjoy live events, and things are only getting better. We're making real changes and putting you first in everything we do. Here's just a taste of what we're up to...
            </p>
        </div>
    );
};

export default AboutUs;