import {GET_ORDERS, CREATE_ORDER, MODIFY_ORDER, ORDERS_LOADING, DELETE_ORDER, GET_ORDER_BY_ID} from '../actions/types'

const initialState = {
    orders: [],
    loading: false
}

const ordersReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ORDERS:
            return {
                ...state,
                orders: action.payload,
                loading: false
            }
        case GET_ORDER_BY_ID:
            return {
                ...state,
                orders: [action.payload],
                loading: false
            }
        case CREATE_ORDER:
            return state
        case MODIFY_ORDER:
            return {
                ...state,
                orders: [action.payload],
                loading: false
            }
        case ORDERS_LOADING:
            return {
                ...state,
                loading: true
            }
        case DELETE_ORDER:
                return {
                    ...state,
                    orders: action.payload,
                    loading: false
                }
        default:
            return state
    }
}

export default ordersReducer