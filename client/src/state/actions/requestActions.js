import { NEW_REQUEST, MODIFY_REQUEST, MODIFY_SORTING, CUSTOM_REQUEST } from "./types";

export const createNewRequest = (requestedProduct) => {
    return (dispatch) => {
        dispatch({
            type: NEW_REQUEST,
            payload: requestedProduct
        })
    }
}

export const createCustomRequest = (requestedProduct) => {
    return (dispatch) => {
        dispatch({
            type: CUSTOM_REQUEST,
            payload: requestedProduct
        })
    }
}

export const modifyRequest = (updatedRequest) => {
    return (dispatch) => {
        dispatch({
            type: MODIFY_REQUEST,
            payload: updatedRequest
        })
    }
}

export const modifySorting = (newSorting) => {
    return (dispatch) => {
        dispatch({
            type: MODIFY_SORTING,
            payload: newSorting
        })
    }
}