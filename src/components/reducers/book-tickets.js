const bookTickets = (state, action) => {
    if(state === undefined){
        return {
            bookSuccess: false,
            error: ''
        }
    }
    switch (action.type) {
        case 'BOOK_TICKETS_FAILURE':
            return {
                bookSuccess: false,
                error: action.payload
            };
        case 'BOOK_TICKETS_SUCCESS':
            return {
                bookSuccess: action.payload,
                error: ''
            };
        default:
            return state.bookTickets;
    }
};

export default bookTickets;