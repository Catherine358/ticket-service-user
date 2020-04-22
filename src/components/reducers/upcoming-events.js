const updateEvents = (state, action) => {
    if(state === undefined){
        return {
            events: [],
            error: ''
        }
    }
    switch (action.type) {
        case 'FETCH_EVENTS_SUCCESS':
            return {
                events: action.payload,
                error: ''
            };
        case 'FETCH_EVENTS_REQUEST':
            return {
                events: [],
                error: ''
            };
        case 'FETCH_EVENTS_FAILURE':
            return {
                events: [],
                error: action.payload
            };
        default:
            return state.eventsList;
    }
};

export default updateEvents;