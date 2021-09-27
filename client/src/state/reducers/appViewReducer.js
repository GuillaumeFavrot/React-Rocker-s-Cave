import {MODIFY_APP_VIEW} from '../actions/types'

const initialState = {
        activePage: "homepage",
        activeProductPage: "",
        activeSummary: "",
        activeAccountPage: "",
        activeAccountPageSection: ""
    }

const appViewReducer = (state = initialState, action) => {
    switch(action.type) {
        case MODIFY_APP_VIEW:
            return {
                ...state,
                activePage: action.payload.activePage,
                activeProductPage: action.payload.activeProductPage,
                activeAccountPage: action.payload.activeAccountPage,
                activeSummary: action.payload.activeSummary,
                activeAccountPageSection: action.payload.activeAccountPageSection
            }
        default:
            return state
    }
}

export default appViewReducer