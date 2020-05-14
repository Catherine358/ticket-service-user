import React from "react";
import { useSelector } from "react-redux";
import "./ticket.less"
import {Link} from "react-router-dom";
import { findPrice } from "../../../utils/functions-for-shopping-cart";
import { PDFDownloadLink, Document, Page, View, Text, Image } from "@react-pdf/renderer";
import img from "../../../../img/TicketDesign.jpg";


const MyDocument = (props) => {
    const { myEvent, ticketsInCart, priceRanges } = props;
    const day = new Date(myEvent.eventStart).getDate();
    const month = new Date(myEvent.eventStart).toLocaleString('default', {month: 'long'});
    let hours = new Date(myEvent.eventStart).getHours();
    if(hours < 10){
        hours = "0" + hours;
    }
    let minutes = new Date(myEvent.eventStart).getMinutes();
    if(minutes < 10){
        minutes = "0" + minutes;
    }
    let ticket = ticketsInCart.map(data => {
        let arr = data.split("-");
        let price = findPrice(arr[0], priceRanges);
        return (
                <Page size="A4" style={{backgroundColor: '#f3f4f4', flexDirection: 'row'}}>
                    <View style={{width: '100%', color: '#868685'}}>
                        <Image src={img} style={{position: 'relative', top: '20%'}}/>
                        <View style={{marginLeft: '70px'}}>
                            <Text style={{fontSize: 22}}>{myEvent.artist}</Text>
                            <Text style={{marginTop: '50px', fontSize: 16}}>Row {arr[0]}               Seat {arr[1]}             &euro;{price}</Text>
                            <View style={{display: 'inline-block', width: '70px', marginTop: '30px', textAlign: 'center'}}>
                                <Text style={{fontSize: 22}}>{day}</Text>
                                <Text style={{fontSize: 14}}>{month}</Text>
                            </View>
                            <Text style={{position: 'relative', left: '240px', bottom: '25px'}}>{hours}:{minutes}</Text>
                        </View>
                    </View>
                </Page>
        );
    });
    let pages = [];
    pages.push(ticket);
    return (
        <Document>
            {pages}
        </Document>
    )
};

const Ticket = (props) => {
    const myEvent = JSON.parse(localStorage.getItem('myEvent'));
    const eventStart = new Date(myEvent.eventStart);
    const day = eventStart.getDate();
    const month = eventStart.toLocaleString('default', {month: 'long'});
    const year = eventStart.getFullYear();
    const date = day + " " + month + " " + year;

    const ticketsCount = useSelector(state => state.ticketsInCart.ticketsCount);
    const pricesSum = useSelector(state => state.ticketsInCart.pricesSum);
    const ticketsInCart = useSelector(state => state.ticketsInCart.ticketsInCart);
    const priceRanges = useSelector(state => state.ticketsInCart.priceRanges);

    return(
        <div className="ticket">
            <div className="ticket-header">
                <h1>SUCCESS</h1>
            </div>
            <div className="row w-100 border-ticket p-2 m-0 mr-2">
                <div>
                    <p className="border-ticket-header ml-md-3 mx-0 mt-0 text-md-left text-center">
                        {myEvent.artist} | {myEvent.eventName} | {date}
                    </p>
                    <p className="ticket-tickets">
                        <span className="mr-4">{ticketsCount} tickets</span>
                        <span>&euro; {pricesSum}</span>
                    </p>
                </div>
                <div>
                    <p className="light-blue">
                        Congratulations! You've successfuly payed. Your PDF ticket have been sent to your email. We wish you a pleasant time.
                    </p>
                    <Link to="/ticket-service-user">
                        <span className="d-block">Return to the main page</span>
                    </Link>
                    <PDFDownloadLink document={<MyDocument myEvent={myEvent} pricesSum={pricesSum} ticketsInCart={ticketsInCart}
                                                           priceRanges={priceRanges}/>}
                                     fileName="ticket.pdf">
                        <span className="mt-5 mb-5">Download your ticket <span className="far fa-file-pdf" /></span>
                    </PDFDownloadLink>
                </div>
            </div>
        </div>

    );
};

export default Ticket;