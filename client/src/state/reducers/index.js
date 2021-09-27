import { combineReducers } from "redux"
import productReducer from './productReducer'
import requestReducer from "./requestReducer"
import appViewReducer from "./appViewReducer"
import authReducer from "./authReducer"
import errorReducer from "./errorReducer"
import usersReducer from "./usersReducer"
import checkoutStatusReducer from "./checkoutStatusReducer"
import ordersReducer from "./ordersReducer"
import reviewsReducer from "./reviewsReducer"

export default combineReducers({
    products: productReducer,
    request: requestReducer,
    appView: appViewReducer,
    auth: authReducer,
    error: errorReducer,
    users: usersReducer,
    checkoutStatus: checkoutStatusReducer,
    orders: ordersReducer,
    reviews: reviewsReducer
})