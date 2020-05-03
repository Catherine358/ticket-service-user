import updateEvents from "./upcoming-events";
import sortEvents from "./sorted-events";
import updateTickets from "./tickets";
import ticketsInCart from "./tickets-in-cart";
import loadPayPal from "./pay-pal-system";
import setDateRange from "./date-range";

const reducer = (state, action) => {
    return {
        eventsList: updateEvents(state, action),
        sortedEvents: sortEvents(state, action),
        ticketsInfo: updateTickets(state, action),
        ticketsInCart: ticketsInCart(state, action),
        payPalSystem: loadPayPal(state, action),
        dateRange: setDateRange(state, action)
    };
};

export default reducer;