import moment from "moment";

const sortRangeEvents = (state, range) => {
    console.log(range)
    const {eventsList: {events}} = state;
    let to = moment(range.to).format( "YYYY MM DD");
    let from = moment(range.from).format( "YYYY MM DD");
    let arr = [];
    for (let i = 0; i < events.length; i++) {
        let eventStart = moment(events[i].eventStart).format( "YYYY MM DD");
        if ((eventStart >= from && eventStart <= to) || (eventStart >= from && to === undefined) || eventStart === from) {
            arr.push(events[i]);
        }
    }
    if(arr.length > 0) {
        return arr;
    }else{
        return "There are no events planned in this range of time."
    }
};

const sortEvents = (state, action) => {
    if(state === undefined){
        return {
            eventsFiltered: [],
            message: ''
        }
    }
    switch (action.type) {
        case 'RANGE_EVENTS_SORT':
            if(typeof sortRangeEvents(state, action.payload) === "string") {
                return {
                    eventsFiltered: [],
                    message: sortRangeEvents(state, action.payload)
                };
            }else{
                return {
                    eventsFiltered: sortRangeEvents(state, action.payload),
                    message: ''
                };
            }
        case 'CLEAR_RANGE_EVENTS_SORT':
            return {
                eventsFiltered: [],
                message: ''
            };
        default:
            return state.sortedEvents;
    }
};

export default sortEvents;