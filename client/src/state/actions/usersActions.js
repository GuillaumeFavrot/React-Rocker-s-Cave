import axios from 'axios'
import {GET_USERS, DELETE_USER, USERS_LOADING, GET_USER_BY_ID} from '../actions/types'
import { returnErrors } from './errorActions'


export const getUsers = () => (dispatch, getState) => {
    dispatch(setUsersLoading())
    axios
        .get(`/api/users`, tokenConfig(getState))
        .then(res => 
            dispatch({
                type: GET_USERS,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
        })
}

export const getUserById = (id) => (dispatch, getState) => {
    dispatch(setUsersLoading())
    axios
        .get(`/api/users/${id}`, tokenConfig(getState))
        .then(res => 
            dispatch({
                type: GET_USER_BY_ID,
                payload: res.data
            })
        )
}

export const deleteUser = (id) => (dispatch, getState) => {
    dispatch(setUsersLoading())
    axios
        .delete(`/api/users/${id}`, tokenConfig(getState))
        .then(setTimeout(() => {
        axios
        .get(`/api/users`, tokenConfig(getState))
        .then(res => dispatch({
            type: DELETE_USER,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
        })
    }, 500))
}

export const setUsersLoading = () => {
    return {
        type: USERS_LOADING
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