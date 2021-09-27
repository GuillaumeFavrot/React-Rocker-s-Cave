import {NEW_REQUEST, MODIFY_REQUEST, MODIFY_SORTING, CUSTOM_REQUEST} from '../actions/types'

const initialState = {
        customSearch: "",
        type: "",
        subType: "",
        brand: "",
        sorting:"ascending",
        onSale: ""
    }


const requestReducer = (state = initialState, action) => {
    switch(action.type) {
        case NEW_REQUEST:
            return {
                ...state,
                type: action.payload,
                customSearch: "",
                subType: "",
                brand: "",
                sorting:"ascending",
                onSale: ""
            }
        case CUSTOM_REQUEST:
            return {
                ...state,
                customSearch: action.payload,
                type: "",
                subType: "",
                brand: "",
                sorting:"ascending",
                onSale: ""
            }
        case MODIFY_REQUEST:
            return {
                ...state,
                subType: action.payload.subType,
                brand: action.payload.brand
            }
        case MODIFY_SORTING:
            return {
                ...state,
                sorting: action.payload
            }
        default:
            return state
    }
}

export default requestReducer