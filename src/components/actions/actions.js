import { requestEvents } from "../services";

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

export const rangeEventsSort = () => {

};

export {
    fetchEvents
};