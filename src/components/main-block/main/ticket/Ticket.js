import React from "react";
import { useSelector } from "react-redux";
import "./ticket.less"
import {Link} from "react-router-dom";
import ReactPDF from "@react-pdf/renderer";
import { PDFDownloadLink, Page, Document, StyleSheet, View, Text} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: 'blue',
        backgroundImage: "url('../src/img/TicketDesign.jpg')",
        backgroundSize: '100%',
    },
    section: {
        margin: 10,
        width: '100%',
        height: '30%',
        border: 'solid 1px black',
    }
});

const MyDocument = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>Lady Gaga</Text>
                <Text>Row 1 Seat 2R &euro;688</Text>
                <Text>22 апреля 19:00</Text>
            </View>
        </Page>
    </Document>
);

const Ticket = (props) => {
    const myEvent = JSON.parse(localStorage.getItem('myEvent'));
    const eventStart = new Date(myEvent.eventStart);
    const day = eventStart.getDate();
    const month = eventStart.toLocaleString('default', {month: 'long'});
    const year = eventStart.getFullYear();
    const date = day + " " + month + " " + year;

    const ticketsCount = useSelector(state => state.ticketsInCart.ticketsCount);
    const pricesSum = useSelector(state => state.ticketsInCart.pricesSum);

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
                    <Link to="/">
                        <span>Return to the main page</span>
                    </Link>
                    <PDFDownloadLink document={<MyDocument/>} fileName="ticket.pdf">
                        <span className="mt-5 mb-5">Download your ticket <span className="far fa-file-pdf" /></span>
                    </PDFDownloadLink>
                </div>
            </div>
        </div>

    );
};

export default Ticket;