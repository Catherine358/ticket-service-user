const updateTickets = (state, item, idx) => {
    const { ticketsInCart: { ticketsInCart } } = state;
    if(idx === -1) {
        return [
            ...ticketsInCart,
            item
        ];
    }else{
        let index = ticketsInCart.findIndex(itm => itm === item);
        return [
            ...ticketsInCart.slice(0, index),
            ...ticketsInCart.slice(index + 1)
        ];
    }
};

const updatePricesSum = (state, price, idx) => {
    const { ticketsInCart: { pricesSum } } = state;
    if(idx === -1){
        return pricesSum - price;
    }else{
        return pricesSum + price;
    }
};

const updateCount = (state, count, idx) => {
    const { ticketsInCart: { ticketsCount } } = state;
    if(idx === -1){
        return ticketsCount - count;
    }else{
        return ticketsCount + count;
    }
};


const ticketsInCart = (state, action) => {
    if(state === undefined){
        return {
            priceRanges: {},
            ticketsInCart: [],
            pricesSum: 0,
            ticketsCount: 0,
            error: ''
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
            return {
                priceRanges: state.ticketsInCart.priceRanges,
                ticketsInCart: updateTickets(state, action.payload, -1),
                pricesSum: state.ticketsInCart.pricesSum,
                ticketsCount: state.ticketsInCart.ticketsCount,
                error: ''
            };
        case 'DELETE_TICKET_FROM_CART':
            return {
                priceRanges: state.ticketsInCart.priceRanges,
                ticketsInCart: updateTickets(state, action.payload, 1),
                pricesSum: state.ticketsInCart.pricesSum,
                ticketsCount: state.ticketsInCart.ticketsCount,
                error: ''
            };
        case 'INCREASE_PRICE':
            return {
                priceRanges: state.ticketsInCart.priceRanges,
                ticketsInCart: state.ticketsInCart.ticketsInCart,
                pricesSum: updatePricesSum(state, action.payload, 1),
                ticketsCount: state.ticketsInCart.ticketsCount,
                error: ''
            };
        case 'DECREASE_PRICE':
            return {
                priceRanges: state.ticketsInCart.priceRanges,
                ticketsInCart: state.ticketsInCart.ticketsInCart,
                pricesSum: updatePricesSum(state, action.payload, -1),
                ticketsCount: state.ticketsInCart.ticketsCount,
                error: ''
            };
        case 'INCREASE_COUNT':
            return {
                priceRanges: state.ticketsInCart.priceRanges,
                ticketsInCart: state.ticketsInCart.ticketsInCart,
                pricesSum: state.ticketsInCart.pricesSum,
                ticketsCount: updateCount(state, action.payload, 1),
                error: ''
            };
        case 'DECREASE_COUNT':
            return {
                priceRanges: state.ticketsInCart.priceRanges,
                ticketsInCart: state.ticketsInCart.ticketsInCart,
                pricesSum: state.ticketsInCart.pricesSum,
                ticketsCount: updateCount(state, action.payload, -1),
                error: ''
            };
        default:
            return state.ticketsInCart;
    }
};

export default ticketsInCart;