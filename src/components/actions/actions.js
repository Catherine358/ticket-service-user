import {requestEvents, ticketsInformation, sceneInformation, bookTicket} from "../services";

// Loading events

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

// Loading remained tickets

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

const ticketsLoadedAside = (tickets) => {
    return {
        type: 'FETCH_TICKETS_ASIDE_SUCCESS',
        payload: tickets
    };
};

const ticketsRequestedAside = () => {
    return {
        type: 'FETCH_TICKETS_ASIDE_REQUEST'
    };
};

const ticketsErrorAside = (error) => {
    return {
        type: 'FETCH_TICKETS_ASIDE_FAILURE',
        payload: error
    };
};

const fetchTicketsForAsideBlock = (dispatch, eventId) => {
    dispatch(ticketsRequestedAside());
    ticketsInformation(eventId)
        .then(data => {
            dispatch(ticketsLoadedAside(data));
        })
        .catch(error => {
            console.log(error);
            dispatch(ticketsErrorAside(error.message));
        })
};

// Loading price ranges

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

const fetchSceneInfo = (dispatch, eventId) => {
    dispatch(sceneInfoRequested());
    sceneInformation(eventId)
        .then(data => dispatch(sceneInfoLoaded(data)))
        .catch(error => dispatch(sceneInfoError(error)));
};

// Booking tickets

const ticketsBooked = () => {
    return {
        type: 'BOOK_TICKETS_SUCCESS',
        payload: true
    };
};

const ticketsBookRequested = () => {
    return {
        type: 'BOOK_TICKETS_REQUEST'
    };
};

const ticketsBookError = (error) => {
    return {
        type: 'BOOK_TICKETS_FAILURE',
        payload: error
    };
};

const fetchBookTickets = (dispatch, eventId, lockedSeats) => {
    dispatch(ticketsBookRequested());
    bookTicket(eventId, lockedSeats)
        .then(data => dispatch(ticketsBooked()))
        .catch(error => dispatch(ticketsBookError(error)));
};


// For sorting by date picker

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

// Work with shopping cart

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

// Work with Pay Pal

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
    fetchSceneInfo,
    fetchBookTickets,
    fetchTicketsForAsideBlock
};