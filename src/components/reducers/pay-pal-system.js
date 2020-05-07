const loadPayPal = (state, action) => {
    if(state === undefined){
        return {
            loading: true,
            paySuccess: false,
            payPalSystem: false,
            error: ''
        }
    }
    switch (action.type) {
        case 'LOAD_PAYPAL_REQUEST':
            return {
                loading: true,
                paySuccess: false,
                payPalSystem: false,
                error: ''
            };
        case 'LOAD_PAYPAL_SUCCESS':
            return {
                loading: false,
                paySuccess: false,
                payPalSystem: true,
                error: ''
            };
        case 'PAYING_PAYPAL_SUCCESS':
            return {
                loading: false,
                paySuccess: true,
                payPalSystem: false,
                error: ''
            };
        case 'PAYING_PAYPAL_FAILURE':
            return {
                loading: false,
                paySuccess: false,
                payPalSystem: false,
                error: 'Something went wrong, please, try again later.'
            };
        default:
            return state.payPalSystem;
    }
};

export default loadPayPal;