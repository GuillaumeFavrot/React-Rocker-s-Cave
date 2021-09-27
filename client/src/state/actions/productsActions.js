import axios from 'axios'
import {GET_PRODUCTS, GET_PRODUCT_BY_ID, ADD_PRODUCT, DELETE_PRODUCT, PRODUCTS_LOADING, GET_PRODUCT_BY_ID_AND_UPDATE} from './types'
import { returnErrors } from './errorActions'

export const getProducts = (request) => dispatch => {
    dispatch(setProductsLoading())
    axios
        .get(`/api/products`, {params: request})
        .then(res => 
            dispatch({
                type: GET_PRODUCTS,
                payload: res.data
            })
        )
}

export const getProductById = (id) => dispatch => {
    dispatch(setProductsLoading())
    axios
        .get(`/api/products/${id}`)
        .then(res => 
            dispatch({
                type: GET_PRODUCT_BY_ID,
                payload: res.data
            })
        )
}

export const getProductByIdAndUpdate = (id, modifications) => (dispatch, getState) => {
    dispatch(setProductsLoading())
    axios
        .post(`/api/products/edit/${id}`, {params: modifications}, tokenConfig(getState))
        .then(res => 
            dispatch({
                type: GET_PRODUCT_BY_ID_AND_UPDATE,
                payload: res.data
            })
        )
}

export const getProductByIdAndUpdateAdmin = (id, modifications) => (dispatch, getState) => {
    dispatch(setProductsLoading())
    axios
        .post(`/api/products/adminedit/${id}`, {params: modifications}, tokenConfig(getState))
        .then(res => 
            dispatch({
                type: GET_PRODUCT_BY_ID_AND_UPDATE,
                payload: res.data
            })
        )
}

export const addProduct = (newProduct) => (dispatch, getState) => {
    axios
        .post('/api/products', {params: newProduct}, tokenConfig(getState))
        .then(res => {
            dispatch(returnErrors(res.statusText, res.status))})
        .then(dispatch({
            type: ADD_PRODUCT,
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
        })
}

export const deleteProduct = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/products/${id}`, tokenConfig(getState))
        .then(dispatch({
            type: DELETE_PRODUCT,
        }))
} 

export const setProductsLoading = () => {
    return {
        type: PRODUCTS_LOADING
    }
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