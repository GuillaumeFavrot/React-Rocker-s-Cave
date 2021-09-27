import axios from 'axios'
import {GET_ORDERS, CREATE_ORDER, MODIFY_ORDER, ORDERS_LOADING, DELETE_ORDER, GET_ORDER_BY_ID} from './types'
import { returnErrors } from './errorActions'

export const getOrders = (request) => (dispatch, getState) => {
    dispatch(setOrdersLoading())
    axios
        .get(`/api/orders`, tokenConfig(getState), {params: request})
        .then(res => 
            dispatch({
                type: GET_ORDERS,
                payload: res.data
            })
        )
}

export const getOrdersByCustomer = (id) => (dispatch, getState) => {
    dispatch(setOrdersLoading())
    axios
        .get(`/api/orders/user/${id}`, tokenConfig(getState))
        .then(res => 
            dispatch({
                type: GET_ORDERS,
                payload: res.data
            })
        )
}

export const getOrderById = (id) => (dispatch, getState) => {
    dispatch(setOrdersLoading())
    axios
        .get(`/api/orders/${id}`, tokenConfig(getState))
        .then(res => 
            dispatch({
                type: GET_ORDER_BY_ID,
                payload: res.data
            })
        )
}

export const createOrder = (newOrder) => (dispatch, getState) => {
    axios
        .post('/api/orders', {params: newOrder}, tokenConfig(getState))
        .then(res => {
            dispatch(returnErrors(res.statusText, res.status))})
        .then(dispatch({
            type: CREATE_ORDER,
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
        })
}

export const modifyOrder = (id, modifications) => (dispatch, getState) => {
    dispatch(setOrdersLoading())
    axios
        .post(`/api/orders/${id}`, {params: modifications}, tokenConfig(getState))
        .then(res => 
            dispatch({
                type: MODIFY_ORDER,
                payload: res.data
            })
        )
}

export const setOrdersLoading = () => {
    return {
        type: ORDERS_LOADING
    }
}

export const deleteOrder = (id) => (dispatch, getState) => {
    dispatch(setOrdersLoading())
    axios
        .delete(`/api/orders/${id}`, tokenConfig(getState))
        .then(setTimeout(() => {
    axios
        .get(`/api/orders`, tokenConfig(getState), {params: {}})
        .then(res => dispatch({
            type: DELETE_ORDER,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
        })            
    }, 500))

}

//Setup config/headers and token

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