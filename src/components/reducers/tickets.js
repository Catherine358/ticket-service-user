const updateTickets = (state, action) => {
    if(state === undefined) {
        return {
            ticketsInfo: {},
            error: ''
        }
    }
    switch (action.type) {
        case 'FETCH_TICKETS_SUCCESS' :
            return {
                ticketsInfo: action.payload,
                error: ''
            };
        case 'FETCH_TICKETS_REQUEST' :
            return {
                ticketsInfo: {},
                error: ''
            };
        case 'FETCH_TICKETS_FAILURE' :
            return {
                ticketsInfo: {},
                error: action.payload
            };
        default:
            return state.ticketsInfo;
    }
};

export default updateTickets;