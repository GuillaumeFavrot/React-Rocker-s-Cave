import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    UPDATE_USER_INFO
} from "./../actions/types"

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    user: {
        userType:"",
        userCart:[],
        userReviews:[],
        userPreviousOrders:[],
        _id:"",
        userName:"",
        email:"",
        registerDate:"",
        userShippingAddress:"",
        userZipCode:"",
        userCity:"",
        userCountry:""
    }
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }        
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
            }   
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
            }             
        case AUTH_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                user: initialState.user,
                isAuthenticated: false,
                isLoading: false,          
            }
        case LOGIN_FAIL:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                user: initialState.user,
                isAuthenticated: false,
                isLoading: false,          
            }
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                user: initialState.user,
                isAuthenticated: false,
                isLoading: false,          
            }
        case REGISTER_FAIL:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,          
            }
        case UPDATE_USER_INFO :
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }     
        default:
            return state
    }
}

export default authReducer