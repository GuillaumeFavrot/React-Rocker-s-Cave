import axios from 'axios'
import { returnErrors } from './errorActions'

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

// Check token & load user

export const loadUser = () => (dispatch, getState) => {
    //User loading
    dispatch({ type: USER_LOADING })
    axios.get('api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR
            })
        })
}

//Register user

export const register = (registrationInformation) => dispatch => {

    axios.post('/api/users', {params: registrationInformation})
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
            dispatch({
                type: REGISTER_FAIL
            })
        })
} 

//User login

export const login = (loginInformations) => dispatch => {
    axios.post('/api/auth', {params: loginInformations})
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
            dispatch({
                type: LOGIN_FAIL
            })
        })
} 

//User log out

export const userLogout = () => dispatch => {
    //User loading
    dispatch({ type: LOGOUT_SUCCESS })
}

//Update user info

export const updateUserInfo = (id, newUserInfo) => (dispatch, getState) => {
    dispatch({ type: USER_LOADING })
    axios
        .post(`/api/users/${id}`, {params: newUserInfo}, tokenConfig(getState))
        .then(res => {
        dispatch(returnErrors(res.statusText, res.status))
        dispatch({
            type: UPDATE_USER_INFO,
            payload: res.data
        })})
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
        })
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