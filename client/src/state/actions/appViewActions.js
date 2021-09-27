import {MODIFY_APP_VIEW} from './types'
import { clearErrors } from './errorActions'


export const modifyAppView = (pageRequest) => {
    return (dispatch) => {
        dispatch({
            type: MODIFY_APP_VIEW,
            payload: pageRequest
        })
        dispatch(clearErrors())
    }
}
