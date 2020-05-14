const updateTicketsForAsideBlock = (state, action) => {
    if(state === undefined) {
        return {
            ticketsInfo: {},
            error: ''
        }
    }
    switch (action.type) {
        case 'FETCH_TICKETS_ASIDE_SUCCESS' :
            return {
                ticketsInfo: action.payload,
                error: ''
            };
        case 'FETCH_TICKETS_ASIDE_REQUEST' :
            return {
                ticketsInfo: {},
                error: ''
            };
        case 'FETCH_TICKETS_ASIDE_FAILURE' :
            return {
                ticketsInfo: {},
                error: action.payload
            };
        default:
            return state.ticketsInfoForAsideBlock;
    }
};

export default updateTicketsForAsideBlock;