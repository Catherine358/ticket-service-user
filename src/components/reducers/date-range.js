const setDateRange = (state, action) => {
    if(state === undefined){
        return {
            from: undefined,
            to: undefined
        }
    }
    switch (action.type) {
        case 'SET_DATE_RANGE':
            return action.payload;
        case 'CLEAR_RANGE_EVENTS_SORT':
            return {
                from: undefined,
                to: undefined
            };
        default:
            return state.dateRange;
    }
};

export default setDateRange;