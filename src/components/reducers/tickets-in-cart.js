import { addLockedSeats } from "../utils/functions-for-shopping-cart";

const updateTickets = (state, item, idx, price, count) => {
    const { ticketsInCart: { ticketsInCart, pricesSum, ticketsCount } } = state;
    if(ticketsInCart.indexOf(item) >= 0 && idx === -1){
        return {
            ticketsInCart: ticketsInCart,
            pricesSum: pricesSum,
            ticketsCount: ticketsCount
        };
    }else {
        if (idx === -1) {
            return {
                ticketsInCart: [
                    ...ticketsInCart,
                    item
                ],
                pricesSum: pricesSum + price,
                ticketsCount: ticketsCount + count
            };
        } else {
            let index = ticketsInCart.findIndex(itm => itm === item);
            return {
                ticketsInCart: [
                    ...ticketsInCart.slice(0, index),
                    ...ticketsInCart.slice(index + 1)
                ],
                pricesSum: pricesSum - price,
                ticketsCount: ticketsCount - count
            };
        }
    }
};

const ticketsInCart = (state, action) => {
    if(state === undefined){
        if(JSON.parse(localStorage.getItem("lockedSeats")) !== null){
            return {
                priceRanges: JSON.parse(localStorage.getItem("lockedSeats")).priceRanges,
                ticketsInCart: JSON.parse(localStorage.getItem("lockedSeats")).ticketsInCart,
                pricesSum:  JSON.parse(localStorage.getItem("lockedSeats")).pricesSum,
                ticketsCount: JSON.parse(localStorage.getItem("lockedSeats")).ticketsCount,
                error: ''
            };
        } else {
            return {
                priceRanges: {},
                ticketsInCart: [],
                pricesSum: 0,
                ticketsCount: 0,
                error: ''
            };
        }
    }
    switch (action.type) {
        case 'FETCH_SCENE_INFO_REQUEST':
            return {
                priceRanges: {},
                ticketsInCart: [],
                pricesSum: 0,
                ticketsCount: 0,
                error: ''
            };
        case 'FETCH_SCENE_INFO_SUCCESS':
            return {
                priceRanges: action.payload,
                ticketsInCart: state.ticketsInCart.ticketsInCart,
                pricesSum: state.ticketsInCart.pricesSum,
                ticketsCount: state.ticketsInCart.ticketsCount,
                error: ''
            };
        case 'FETCH_SCENE_INFO_FAILURE':
            return {
                priceRanges: {},
                ticketsInCart: [],
                pricesSum: 0,
                ticketsCount: 0,
                error: action.payload
            };
        case 'ADD_TICKET_TO_CART':
            const newTickets = updateTickets(state, action.payload.item, -1, action.payload.price, action.payload.count);
            return {
                priceRanges: state.ticketsInCart.priceRanges,
                ticketsInCart: newTickets.ticketsInCart,
                pricesSum: newTickets.pricesSum,
                ticketsCount: newTickets.ticketsCount,
                error: ''
            };
        case 'DELETE_TICKET_FROM_CART':
            const newTickets2 = updateTickets(state, action.payload.item, 1, action.payload.price, action.payload.count);
            if(JSON.parse(localStorage.getItem("lockedSeats")) !== null){
                addLockedSeats(newTickets2, state.ticketsInCart.priceRanges);
            }
            return {
                priceRanges: state.ticketsInCart.priceRanges,
                ticketsInCart: newTickets2.ticketsInCart,
                pricesSum: newTickets2.pricesSum,
                ticketsCount: newTickets2.ticketsCount,
                error: ''
            };
        case 'CLEAR_CART':
            localStorage.removeItem("lockedSeats");
            return {
                priceRanges: {},
                ticketsInCart: [],
                pricesSum: 0,
                ticketsCount: 0,
                error: ''
            };
        default:
            return state.ticketsInCart;
    }
};

export default ticketsInCart;