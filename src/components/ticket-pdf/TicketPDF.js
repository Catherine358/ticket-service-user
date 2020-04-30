import React from "react";
import {Page, Document, StyleSheet, View, Text} from "@react-pdf/renderer"

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
    },
    section: {
        margin: 10,
        backgroundImage: `url("../img/TicketDesign.jpg")`,
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

export default MyDocument;