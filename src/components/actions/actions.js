import { requestEvents, ticketsInformation, sceneInformation } from "../services";
import {DateUtils} from "react-day-picker";

const eventsLoaded = (events) => {
    return {
        type: 'FETCH_EVENTS_SUCCESS',
        payload: events
    };
};

const eventsReqeusted = () => {
    return {
        type: 'FETCH_EVENTS_REQUEST'
    };
};

const eventsError = (error) => {
    return {
        type: 'FETCH_EVENTS_FAILURE',
        payload: error
    };
};

const ticketsLoaded = (tickets) => {
    return {
        type: 'FETCH_TICKETS_SUCCESS',
        payload: tickets
    };
};

const ticketsRequested = () => {
    return {
        type: 'FETCH_TICKETS_REQUEST'
    };
};

const ticketsError = (error) => {
    return {
        type: 'FETCH_TICKETS_FAILURE',
        payload: error
    };
};

const sceneInfoLoaded = (tickets) => {
    return {
        type: 'FETCH_SCENE_INFO_SUCCESS',
        payload: tickets
    };
};

const sceneInfoRequested = () => {
    return {
        type: 'FETCH_SCENE_INFO_REQUEST'
    };
};

const sceneInfoError = (error) => {
    return {
        type: 'FETCH_SCENE_INFO_FAILURE',
        payload: error
    };
};

const fetchEvents = (dispatch) => {
    dispatch(eventsReqeusted());
    requestEvents()
        .then(data => {
            console.log(data);
            let arr = [];
            for(let i = 0; i < data.length; i++){
                arr.push(data[i]);
            }
            dispatch(eventsLoaded(arr));
        })
        .catch(error => {
            console.log(error);
            dispatch(eventsError(error.message));
        })
};

const fetchTickets = (dispatch, eventId) => {
    dispatch(ticketsRequested());
    ticketsInformation(eventId)
        .then(data => {
            dispatch(ticketsLoaded(data));
        })
        .catch(error => {
            console.log(error);
            dispatch(ticketsError(error.message));
        })
};

const fetchSceneInfo = (dispatch, eventId) => {
    dispatch(sceneInfoRequested());
    sceneInformation(eventId)
        .then(data => dispatch(sceneInfoLoaded(data)))
        .catch(error => dispatch(sceneInfoError(error)));
};

export const setRange = (range) => {
    return {
        type: 'SET_DATE_RANGE',
        payload: range
    };
};

export const rangeEventsSort = (range) => {
    return {
        type: 'RANGE_EVENTS_SORT',
        payload: range
    };
};

export const clearRangeEventsSort = () => {
    return {
        type: 'CLEAR_RANGE_EVENTS_SORT'
    };
};

export const updateTickets = (item, price, count, idx) => {
    if(idx > 0) {
        return {
            type: 'ADD_TICKET_TO_CART',
            payload: {
                item, price, count
            }
        };
    }else{
        return {
            type: 'DELETE_TICKET_FROM_CART',
            payload: {
                item, price, count
            }
        };
    }
};

export const clearCart = () => {
    return {
        type: 'CLEAR_CART'
    };
};

export const loadPayPal = (act) => {
    if(act === 'request') {
        console.log('request');
        return {
            type: 'LOAD_PAYPAL_REQUEST'
        };
    }else if(act === 'loaded') {
        console.log('loaded');
        return {
            type: 'LOAD_PAYPAL_SUCCESS'
        };
    } else if(act === 'success'){
        console.log('success');
        return {
            type: 'PAYING_PAYPAL_SUCCESS'
        };
    }else if(act === 'failure'){
        return {
            type: 'PAYING_PAYPAL_FAILURE'
        };
    }
};

export {
    fetchEvents,
    fetchTickets,
    fetchSceneInfo
};