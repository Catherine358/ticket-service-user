const sortEvents = (state, action) => {
    if(state === undefined){
        return {
            eventsFiltered: [],
            message: ''
        }
    }
    switch (action.type) {
        case 'RANGE_EVENTS_SORT':
            return {

            };
        default:
            return state.sortedEvents;
    }
};

export default sortEvents;