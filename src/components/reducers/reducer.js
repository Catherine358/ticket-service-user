import updateEvents from "./upcoming-events";
import sortEvents from "./sorted-events";

const reducer = (state, action) => {
    return {
        eventsList: updateEvents(state, action),
        sortedEvents: sortEvents(state, action)
    };
};

export default reducer;