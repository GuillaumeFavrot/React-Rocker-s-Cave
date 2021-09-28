import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ordersActionCreators, reviewsActionCreators, usersActionCreators } from '../../../state/index'

import './../../../styles/body/accountPageComponents/pagedItemOverview.css'

function PagedItemOverview({listItemViewToggle, listItemOverviewToogle}) {


    //Redux state setup

    const state = useSelector(state => state)

    const orders = state.orders.orders
    const users = state.users.users
    const reviews = state.reviews.reviews
    const page = state.appView.activeAccountPageSection

    //Redux action creators call

    const dispatch = useDispatch()
        
    const {modifyReview} = bindActionCreators(reviewsActionCreators, dispatch)
    const {deleteUser} = bindActionCreators(usersActionCreators, dispatch)
    const {modifyOrder, deleteOrder} = bindActionCreators(ordersActionCreators, dispatch)
    

    //Displayed item local state

    const [displayedOrder, setDisplayedOrder] = useState({})

    const [displayedOrderItems, setdisplayedOrderItems] = useState([])
    
    useEffect(() => {
        if (orders.length === 1 && listItemOverviewToogle === "overview") {
            let [newDisplayedOrder] = orders
            setDisplayedOrder(displayedOrder => {
                displayedOrder = newDisplayedOrder
            return displayedOrder
        })
        }
        else return
    }, [orders, listItemOverviewToogle])

    useEffect(() => {
        if(displayedOrder.itemsList) {
            let itemsList = displayedOrder.itemsList
            setdisplayedOrderItems(itemsList)
        }
    }, [displayedOrder])

    useEffect(() => {
        setdisplayedOrderItems([])
    }, [state.appView])

    const [displayedUser, setDisplayedUser] = useState({})

    useEffect(() => {
        if (users.length === 1 && listItemOverviewToogle === "overview" ) {
            let [newDisplayedUser] = users
            setDisplayedUser(displayedUser => {
                displayedUser = newDisplayedUser
            return displayedUser
        })
        }
        else return
    }, [users, listItemOverviewToogle])

    const [displayedReview, setDisplayedReview] = useState({})

    useEffect(() => {
        if (reviews.length === 1 && listItemOverviewToogle === "overview" ) {
            let [newDisplayedReview] = reviews
            setDisplayedReview(displayedReview => {
                displayedReview = newDisplayedReview
            return displayedReview
        })
        }
        else return
    }, [reviews, listItemOverviewToogle])

    useEffect(() => {
        setDisplayedOrder({})
        setDisplayedReview({})
        setDisplayedUser({})
    }, [state.appView.activeAccountPageSection])

    //Return button function

    const onReturnClick = () => {
        listItemViewToggle()
    }

    //Currency formatting function

    let formatter = new Intl.NumberFormat('fr-EU', {
        style: 'currency',
        currency: 'EUR'
    })

    //Date formatting function

    let date = new Date(displayedUser.registerDate)
    let formatedDate = date.toLocaleDateString('Fr-fr')

    let date2 = new Date(displayedReview.createdAt)
    let formatedDate2 = date2.toLocaleDateString('Fr-fr')

    let date3 = new Date(displayedReview.updatedAt)
    let formatedDate3 = date3.toLocaleDateString('Fr-fr')

    //Order status modification function

    const [status, setStatus] = useState("")

    const onChange = (e) => {
        let newStatus = {orderStatus: e.target.value}
        setStatus(newStatus)
    }

    const onSave = () => {
        modifyOrder(displayedOrder._id, status)
        setStatus("")
    }

    //Product rating and reviewing functions

    const [starRating, setStarRating] = useState(0)

    const [selectedStarRating, setSelectedStarRating] = useState(null)

    const onStarHover = (e) => {
        setStarRating(e.target.id)
    }

    const onStarLeave = () => {
        if(selectedStarRating !== null){
            setStarRating(selectedStarRating)
        }else {
            setStarRating(0)
        }
    }

    const onStarClick = (e) => {
        setSelectedStarRating(e.target.id)
    }

    //Review creation and posting function

    const [newReview, setNewComment] = useState({
        reviewTitle: "",
        reviewComment: ""
    })

    const onCommentFieldChange = (e) => {
        setNewComment(newReview => ({...newReview, [e.target.name]: e.target.value}))
    }

    const commentSubmit = () => {
        let updatedReview = displayedReview
        if (newReview.reviewTitle !== "") {
            updatedReview.reviewTitle = newReview.reviewTitle
        }
        if (newReview.reviewComment !== "") {
            updatedReview.reviewComment = newReview.reviewComment
        }
        if (selectedStarRating !== null) {
            updatedReview.rate = selectedStarRating
        }
        //Creating and posting the review on the DB
        console.log(updatedReview)
        modifyReview(displayedReview._id, updatedReview)
        commentCancel()
        setSelectedStarRating(null)  
    }
        
        const commentCancel = () => {
            setNewComment({
                reviewTitle: "",
                reviewComment: "" 
            })
        }
    
    //Page to display function

    const [pageToDisplay, setPageToDisplay] = useState("")

    useEffect(() => {
        if(page === "adminOrderList" || page === "orders") {
            setPageToDisplay("orders")
        }else if(page === "adminUserList") {
            setPageToDisplay("users")
        }else if(page === "userReviews") {
            setPageToDisplay("reviews")
        } else {
            setPageToDisplay("")
        }
    }, [state.appView])

    //Card deletion function

    const cardDeletionRequest = (e) => {
        e.stopPropagation()
        if(displayedUser.userType) {
            deleteUser(displayedUser._id)
            onReturnClick()
        }
        else if(displayedOrder.itemsList) {
            deleteOrder(displayedOrder._id)
            onReturnClick()
        } 
    }

    return (
        <div className="PagedItemOverview-container">
            <div className="PagedItemOverview-topButtons">
                <button className="btn btn-aligned-top-left-square" onClick={() => onReturnClick()}>Back to the list</button>
                <button className={state.auth.user.userType === "customer" ? "btn btn-red btn-aligned-top-right-square hidden" : "btn btn-red btn-aligned-top-right-square"} onClick = {(e) => cardDeletionRequest(e)}>Delete</button> 
            </div>
            <div className = { pageToDisplay === "orders" ? "PagedItemOverview-content-container order" : "PagedItemOverview-content-container order hidden"}>
                <h5><span>Order ID N°: </span>{displayedOrder._id}</h5>
                <div className="PagedItemOverview-order-status">
                    <h6>Order status</h6>
                    <div className="PagedItemOverview-order-status-current">
                        <span>Current status : </span>
                        <p className = { displayedOrder.orderStatus === "Payment received and order created" ? "order-status orange" : "order-status hidden" }>{displayedOrder.orderStatus}</p>
                        <p className = { displayedOrder.orderStatus === "Order processed and ready for shipping" ? "order-status yellow" : "order-status hidden" }>{displayedOrder.orderStatus}</p>
                        <p className = { displayedOrder.orderStatus === "Order handed off to the delivery service" ? "order-status green" : "order-status hidden" }>{displayedOrder.orderStatus}</p>
                    </div>
                    <div className={state.auth.user.userType === "customer" ? "PagedItemOverview-order-status-new hidden" : "PagedItemOverview-order-status-new"}>
                        <span>New status : </span>
                        <select name="orderStatus" onChange ={e => onChange(e)}>
                            <option>Payment received and order created</option>
                            <option>Order processed and ready for shipping</option>
                            <option>Order handed off to the delivery service</option>
                        </select>
                    </div>
                </div>
                <div className="PagedItemOverview-order-customer">
                    <h6>Customer information</h6>
                    <div className="PagedItemOverview-order-customer-id">
                        {state.auth.user.userType === "customer" ? <span>Your customer ID : </span>: <span>Customer ID : </span>}
                        <p>{displayedOrder.userId}</p>
                    </div>
                    <div className="PagedItemOverview-order-customer-userName">
                    {state.auth.user.userType === "customer" ? <span>Your Username : </span>: <span>Customer Username : </span>}
                        <p>{displayedOrder.userName}</p>
                    </div>
                    <div className="PagedItemOverview-order-customer-email">
                    {state.auth.user.userType === "customer" ? <span>Your E-mail : </span>: <span>Customer E-mail : </span>}
                        {displayedOrder.token ? <p>{displayedOrder.token.email}</p> : ""}
                    </div>
                </div>
                <div className="PagedItemOverview-order-shipping">
                    <h6>Shipping information</h6>
                    <div className="PagedItemOverview-order-shipping-adress">
                        <span>Address : </span>
                        {displayedOrder.token ? <p>{displayedOrder.token.card.address_line1}</p> : ""}
                    </div>
                    <div className="PagedItemOverview-order-shipping-zip">
                        <span>Zip code : </span>
                        {displayedOrder.token ? <p>{displayedOrder.token.card.address_zip}</p> : ""}
                    </div>
                    <div className="PagedItemOverview-order-shipping-city">
                        <span>City : </span>
                        {displayedOrder.token ? <p>{displayedOrder.token.card.address_city}</p> : ""}
                    </div>
                    <div className="PagedItemOverview-order-shipping-country">
                        <span>Country : </span>
                        {displayedOrder.token ? <p>{displayedOrder.token.card.address_country}</p> : ""}
                    </div>
                </div>
                <div className="PagedItemOverview-order-cart">
                    <h6>Ordered items</h6>
                    {displayedOrderItems.length === 0 ? "" : displayedOrderItems.map((item)=>(
                    <div className="PagedItemOverview-order-ordered-items">
                        <span>- {item.quantity} x </span>
                        <p>{item.brand} {item.name}</p>
                    </div>
                    ))}
                    <div className="PagedItemOverview-order-total">
                        <span>Total : </span>
                        {displayedOrder.charge ? <p>{formatter.format(displayedOrder.charge.amount / 100)}</p>: ""}
                    </div>
                </div>
                <div className="PagedItemOverview-buttons">
                    <button className={state.auth.user.userType === "customer" ? "btn btn-green hidden" : "btn btn-green"} onClick={() => onSave()}>Save</button>
                </div>
            </div>
            <div className = { pageToDisplay === "users" ? "PagedItemOverview-content-container user" : "PagedItemOverview-content-container user hidden" }>
                <h5><span>User ID N°: </span>{displayedUser._id}</h5>
                <div>
                    <h6>User Information</h6>
                    <div className="PagedItemOverview-user-address">
                        <span>User ID : </span>
                        <p>{displayedUser._id}</p>
                    </div>
                    <div className="PagedItemOverview-user-zip">
                        <span>Username : </span>
                        <p>{displayedUser.userName}</p>
                    </div>
                    <div className="PagedItemOverview-user-city">
                        <span>Email : </span>
                        <p>{displayedUser.email}</p>
                    </div>
                    <div className="PagedItemOverview-user-country">
                        <span>Registered since : </span>
                        <p>{formatedDate}</p>
                    </div>
                </div>
                <div>
                    <h6>User address</h6>
                    <div className="PagedItemOverview-user-address">
                        <span>Address : </span>
                        <p>{displayedUser.userShippingAddress}</p>
                    </div>
                    <div className="PagedItemOverview-user-zip">
                        <span>Zip code : </span>
                        <p>{displayedUser.userZipCode}</p>
                    </div>
                    <div className="PagedItemOverview-user-city">
                        <span>City : </span>
                        <p>{displayedUser.userCity}</p>
                    </div>
                    <div className="PagedItemOverview-user-country">
                        <span>Country : </span>
                        <p>{displayedUser.userCountry}</p>
                    </div>
                </div>
            </div>
            <div className = { pageToDisplay === "reviews" ? "PagedItemOverview-content-container review" : "PagedItemOverview-content-container review hidden" }>
                <h5><span>Review ID N°: </span>{displayedReview._id}</h5>
                <div>
                    <h6>Reviewed product</h6>
                    <div className="PagedItemOverview-review-product">
                        <div>
                            <img src={displayedReview.productImage} alt="product"/>
                            <div>
                                <div>
                                    <span>Product ID : </span>
                                    <p>{displayedReview.productId}</p>
                                </div>
                                <div>
                                    <span>Product Brand : </span>
                                    <p>{displayedReview.productBrand}</p>
                                </div>
                                <div>
                                    <span>Product Name : </span>
                                    <p>{displayedReview.productName}</p>
                                </div>
                            </div>
                        </div>    
                    </div>
                    <h6>Rate</h6>
                    <div className="PagedItemOverview-review-currentRate">
                        <span>Current rate : </span>
                        <div>
                            <span className={displayedReview.rate >= 1 ? "fa fa-star checked" : "fa fa-star"}></span>
                            <span className={displayedReview.rate >= 2 ? "fa fa-star checked" : "fa fa-star"}></span>
                            <span className={displayedReview.rate >= 3 ? "fa fa-star checked" : "fa fa-star"}></span>
                            <span className={displayedReview.rate >= 4 ? "fa fa-star checked" : "fa fa-star"}></span>
                            <span className={displayedReview.rate >= 5 ? "fa fa-star checked" : "fa fa-star"}></span>
                        </div>
                    </div>
                    <div className="PagedItemOverview-review-newRate">
                        <span>New rate : </span>
                        <div>
                            <span id={1} className={starRating >= 1 ? "fa fa-star checked" : "fa fa-star"} onMouseOver={(e)=>onStarHover(e)} onMouseLeave={()=>onStarLeave()} onClick={(e)=>onStarClick(e)}></span>
                            <span id={2} className={starRating >= 2 ? "fa fa-star checked" : "fa fa-star"} onMouseOver={(e)=>onStarHover(e)} onMouseLeave={()=>onStarLeave()} onClick={(e)=>onStarClick(e)}></span>
                            <span id={3} className={starRating >= 3 ? "fa fa-star checked" : "fa fa-star"} onMouseOver={(e)=>onStarHover(e)} onMouseLeave={()=>onStarLeave()} onClick={(e)=>onStarClick(e)}></span>
                            <span id={4} className={starRating >= 4 ? "fa fa-star checked" : "fa fa-star"} onMouseOver={(e)=>onStarHover(e)} onMouseLeave={()=>onStarLeave()} onClick={(e)=>onStarClick(e)}></span>
                            <span id={5} className={starRating >= 5 ? "fa fa-star checked" : "fa fa-star"} onMouseOver={(e)=>onStarHover(e)} onMouseLeave={()=>onStarLeave()} onClick={(e)=>onStarClick(e)}></span>
                        </div>
                    </div>
                    <h6>Review title</h6>
                    <div className="PagedItemOverview-review-currentTitle">
                        <span>Current title : </span>
                        <p>{displayedReview.reviewTitle}</p>
                    </div>
                    <div className="PagedItemOverview-review-newTitle">
                        <span>New title : </span>
                        <input type="text" name="reviewTitle" value={newReview.reviewTitle} onChange={(e) => onCommentFieldChange(e)}/>
                    </div>
                    <h6>Comment</h6>
                    <div className="PagedItemOverview-review-currentComment">
                        <span>Current comment : </span>
                        <p>{displayedReview.reviewComment}</p>
                    </div>
                    <div className="PagedItemOverview-review-newComment">
                        <span>New comment : </span>
                        <textarea type="text" name="reviewComment" value={newReview.reviewComment} onChange={(e) => onCommentFieldChange(e)}/>
                    </div>
                    <h6>Post Date</h6>
                    <div className="PagedItemOverview-review-postDate">
                        <span>Original post date : </span>
                        <p>{formatedDate2}</p>
                    </div>
                    <div className="PagedItemOverview-review-updateDate">
                        <span>Last updated on : </span>
                        <p>{formatedDate3}</p>
                    </div>
                </div>
                <div className="PagedItemOverview-buttons">
                    <button className="btn btn-red discard" onClick={() => commentCancel()}>Discard changes</button>
                    <button className="btn btn-green" onClick={() => commentSubmit()}>Submit changes</button>
                </div>
            </div>
        </div>
    )
}

export default PagedItemOverview
