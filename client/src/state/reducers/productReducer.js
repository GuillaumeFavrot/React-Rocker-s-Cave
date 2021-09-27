import {GET_PRODUCTS, ADD_PRODUCT, DELETE_PRODUCT, PRODUCTS_LOADING, GET_PRODUCT_BY_ID, GET_PRODUCT_BY_ID_AND_UPDATE} from '../actions/types'

const initialState = {
    products: [],
    loading: false
}

const productReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false
            }
        case GET_PRODUCT_BY_ID:
            return {
                ...state,
                products: [action.payload],
                loading: false
            }
        case PRODUCTS_LOADING:
            return {
                ...state,
                loading: true
            }
        case ADD_PRODUCT:
            return state
        case GET_PRODUCT_BY_ID_AND_UPDATE:
            return {
                ...state,
                products: [action.payload],
                loading: false
                }
        case DELETE_PRODUCT:
            return state  
        default:
            return state
    }
}

export default productReducer