import moment from "moment";

const sortRangeEvents = (state, range) => {
    const {eventsList: {events}} = state;
    let to = moment(range.to).format( "YYYY MM DD");
    let from = moment(range.from).format( "YYYY MM DD");
    let arr = [];
    for (let i = 0; i < events.length; i++) {
        let eventStart = moment(events[i].eventStart).format( "YYYY MM DD");
        if (eventStart === from || (eventStart >= from && eventStart <= to)) {
            arr.push(events[i]);
        }
    }
    if(arr.length > 0) {
        return arr;
    }else{
        return "There are no events planned in this range of time."
    }
};

const sortTypeEvents = (state, value) => {
    const {eventsList: {events}} = state;
    let arr = [];
    if(value === "0" || value === "1") {
        for (let i = 0; i < events.length; i++) {
            if (parseInt(value) === events[i].eventType) {
                arr.push(events[i]);
            }
        }
    }else{
        return [];
    }
    if(arr.length > 0) {
        return arr;
    }else{
        return "There are no events of such type."
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
        case 'TYPE_EVENTS_SORT':
            if(typeof sortRangeEvents(state, action.payload) === "string") {
                return {
                    eventsFiltered: [],
                    message: sortTypeEvents(state, action.payload)
                };
            }else {
                return {
                    eventsFiltered: sortTypeEvents(state, action.payload),
                    message: ''
                };
            }
        default:
            return state.sortedEvents;
    }
};

export default sortEvents;