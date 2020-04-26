import React from "react";
import { BASE_URL } from "../constants/Constants";

const requestEvents = () => {
    const response = fetch(`${BASE_URL}events/bydate/0/999`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                dateFrom: 1585688400000,
                dateTo: 1601499600000
            }
        )
    })
        .then(response => {
            if(response.status !== 200) {
                if (response.status === 400) {
                    throw new Error(`Input validation error, received ${response.status}`);
                } else {
                    throw new Error(`Could not fetch ${BASE_URL}, received ${response.status}`);
                }
            }
            return response.json();
        });
    return response;
};

const ticketsInformation = (eventId) => {
    const response = fetch(`${BASE_URL}events/rest/${eventId}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if(response.status !== 200){
                throw new Error(`Could not fetch data`);
            }
            return response.json();
        });
    return response;
};

const sceneInformation = (eventId) => {
    const response = fetch(`${BASE_URL}event/${eventId}/${false}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if(response.status !== 200){
                if(response.status === 404){
                    throw new Error(`Event with ${eventId} does not exist`);
                }
                throw new Error(`Could not fetch data`);
            }
            return response.json();
        });
    return response;
};

export { requestEvents, ticketsInformation, sceneInformation };