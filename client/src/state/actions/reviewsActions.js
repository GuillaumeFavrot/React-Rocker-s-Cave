import axios from 'axios'
import {GET_REVIEWS, CREATE_REVIEW, MODIFY_REVIEW, REVIEWS_LOADING, DELETE_REVIEW, GET_REVIEW_BY_ID} from './types'
import { returnErrors } from './errorActions'

export const getAllReviews = (request) => (dispatch) => {
    dispatch(setReviewsLoading())
    axios
        .get(`/api/reviews`, {params: request})
        .then(res => 
            dispatch({
                type: GET_REVIEWS,
                payload: res.data
            })
        )
}

export const getReviewById = (id) => (dispatch, getState) => {
    dispatch(setReviewsLoading())
    axios
        .get(`/api/reviews/${id}`, tokenConfig(getState))
        .then(res => {
            dispatch(returnErrors(res.statusText, res.status)) 
            dispatch({
                type: GET_REVIEW_BY_ID,
                payload: res.data
            })
        })
}

export const createReview = (newReview) => (dispatch, getState) => {
    axios
        .post('/api/reviews', {params: newReview}, tokenConfig(getState))
        .then(res => 
            dispatch({
                type: CREATE_REVIEW,
                payload: res.data
            }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
        })
}

export const modifyReview = (id, modifications) => (dispatch, getState) => {
    dispatch(setReviewsLoading())
    axios
        .post(`/api/reviews/${id}`, {params: modifications}, tokenConfig(getState))
        .then(res => 
            dispatch({
                type: MODIFY_REVIEW,
                payload: res.data
            })
        )
}


export const deleteReview = (id) => (dispatch, getState) => {
    dispatch(setReviewsLoading())
    axios
        .delete(`/api/reviews/${id}`, tokenConfig(getState))
        .then(setTimeout(() => {
    axios
        .get(`/api/reviews`, tokenConfig(getState), {params: {}})
        .then(res => dispatch({
            type: DELETE_REVIEW,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
        })            
    }, 500))

}

export const setReviewsLoading = () => {
    return {
        type: REVIEWS_LOADING
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