import {GET_USERS, DELETE_USER, USERS_LOADING, GET_USER_BY_ID} from '../actions/types'

const initialState = {
    users: [],
    loading: false
}

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case GET_USER_BY_ID:
            return {
                ...state,
                users: [action.payload],
                loading: false
            }
        case DELETE_USER:
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case USERS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}

export default usersReducer