import updateEvents from "./upcoming-events";
import sortEvents from "./sorted-events";
import updateTickets from "./tickets";

const reducer = (state, action) => {
    return {
        eventsList: updateEvents(state, action),
        sortedEvents: sortEvents(state, action),
        ticketsInfo: updateTickets(state, action)
    };
};

export default reducer;