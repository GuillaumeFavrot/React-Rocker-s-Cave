import {GET_REVIEWS, CREATE_REVIEW, MODIFY_REVIEW, REVIEWS_LOADING, DELETE_REVIEW, GET_REVIEW_BY_ID} from '../actions/types'

const initialState = {
    reviews: [],
    loading: false
}

const reviewsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_REVIEWS:
            return {
                ...state,
                reviews: action.payload,
                loading: false
            }
        case GET_REVIEW_BY_ID:
            return {
                ...state,
                reviews: [action.payload],
                loading: false
            }
        case CREATE_REVIEW:
            return  {
                ...state,
                reviews: [action.payload],
            }
        case MODIFY_REVIEW:
            return {
                ...state,
                reviews: [action.payload],
                loading: false
            }
        case REVIEWS_LOADING:
            return {
                ...state,
                loading: true
            }
        case DELETE_REVIEW:
            return {
                ...state,
                reviews: action.payload,
                loading: false
            }
        default:
            return state
    }
}

export default reviewsReducer