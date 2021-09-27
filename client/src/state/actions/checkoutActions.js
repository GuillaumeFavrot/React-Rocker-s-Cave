import {GET_CHECKOUT_STATUS, RESET_CHECKOUT_STATUS} from './types'
import axios from 'axios'

export const checkOutBackendRequest = (token, cartTotal) => (dispatch, getState) => {
    axios.post('api/checkout', {token, cartTotal}, tokenConfig(getState))
        .then(res =>
            dispatch(
                checkoutResponseHandler(res.status, res.data.msg, res.data.charge)
            ))
} 

export const checkoutResponseHandler = (status, msg, charge) => {
    let res = { status : status, msg : msg, charge : charge }
    return (dispatch) => {
        dispatch({
            type: GET_CHECKOUT_STATUS,
            payload: res
        })
    } 
}


export const resetCheckoutStatus = () => {
    return (dispatch) => {
        dispatch({
            type: RESET_CHECKOUT_STATUS,
        })
    }
}

export const tokenConfig = getState => {
    //Get token from local storage
    const token = getState().auth.token

    //Headers setup
    const config = {
        headers: {
            "Content-type" : "application/json"
        }
    }
    
    //If token, add to headers
    if(token) {
        config.headers['x-auth-token'] = token
    }

    return config
}