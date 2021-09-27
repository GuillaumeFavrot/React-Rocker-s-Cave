import {GET_CHECKOUT_STATUS, RESET_CHECKOUT_STATUS} from '../actions/types'

const initialState = {
        status: null,
        msg: "",
        charge: {}
    }

const checkoutStatusReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_CHECKOUT_STATUS:
            return {
                ...state,
                status: action.payload.status,
                msg: action.payload.msg,
                charge: action.payload.charge
            }
        case RESET_CHECKOUT_STATUS:
            return {
                ...state,
                status: null,
                msg: "",
            }        
        default:
            return state
    }
}

export default checkoutStatusReducer