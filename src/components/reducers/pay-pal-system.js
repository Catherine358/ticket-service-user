const loadPayPal = (state, action) => {
    if(state === undefined){
        return {
            loading: true,
            paySuccess: false,
            payPalSystem: false
        }
    }
    switch (action.type) {
        case 'LOAD_PAYPAL_REQUEST':
            return {
                loading: true,
                paySuccess: false,
                payPalSystem: false
            };
        case 'LOAD_PAYPAL_SUCCESS':
            return {
                loading: false,
                paySuccess: false,
                payPalSystem: true
            };
        default:
            return state.payPalSystem;
    }
};

export default loadPayPal;