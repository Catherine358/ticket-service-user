import { requestEvents, ticketsInformation } from "../services";

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

export {
    fetchEvents,
    fetchTickets
};