import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { usersActionCreators, ordersActionCreators } from '../../../state/index'

import './../../../styles/body/accountPageComponents/pagedItemCard.css'

function PagedItemCard({item, overviewPageRequest}) {

    //Redux state setup

    const state = useSelector(state => state)

    //Redux action creators set-up

    const dispatch = useDispatch()
        
    const {deleteUser} = bindActionCreators(usersActionCreators, dispatch)
    const {deleteOrder} = bindActionCreators(ordersActionCreators, dispatch)

    //Date formatting function

    let date = new Date(item.createdAt ? item.createdAt : item.registerDate)
    let formatedDate = date.toLocaleDateString('Fr-fr')
    let formatedTime = date.toLocaleTimeString('Fr-fr')

    //Card deletion function

    const cardDeletionRequest = (e) => {
        e.stopPropagation()
        if(item.userType) {
            deleteUser(item._id)
        }
        else if(item.itemsList) {
            deleteOrder(item._id)
        } 
    }

    const onCardClick = (id) => {
        overviewPageRequest(id)
    }

    return (
        <div className ="accountInformationPage-pagedItem-card" onClick = {() => onCardClick(item._id)}>
            <div className ="accountInformationPage-pagedItem-card-header">
                <div className = {item.registerDate ? "card-title" : "card-title hidden"}><span>User : </span>{item.userName}</div>
                <div className = {item.itemsList ? "card-title" : "card-title hidden"}><span>Order ID : </span>{item._id}</div>
                <div className = {item.author ? "card-title" : "card-title hidden"}><span>Review ID : </span>{item._id}</div>
                <button className={state.auth.user.userType === "customer" ? "btn btn-red btn-aligned-top-right hidden" : "btn btn-red btn-aligned-top-right"} onClick = {(e) => cardDeletionRequest(e)}>Delete</button>
            </div>
            <div className ="accountInformationPage-pagedItem-card-content">
                <div className = {item.userType ? "pagedItem-card-content users" : "pagedItem-card-content users hidden"}>
                    <span><p>User ID : </p>{item._id}</span>
                    <span><p>User type : </p>{item.userType}</span>
                    <span><p>User E-mail : </p>{item.email}</span>
                    <span><p>Registered since : </p>{formatedDate}</span>
                </div>
                {item.token ?
                <div className = {item.token ? "pagedItem-card-content orders" : "pagedItem-card-content orders hidden"}>
                    <span className = {item.orderStatus === "Payment received and order created" ? "order-status orange" : "order-status hidden" }><p>Order status : </p>{item.orderStatus}</span>
                    <span className = {item.orderStatus === "Order processed and ready for shipping" ? "order-status yellow" : "order-status hidden" }><p>Order status : </p>{item.orderStatus}</span>
                    <span className = {item.orderStatus === "Order handed off to the delivery service" ? "order-status green" : "order-status hidden" }><p>Order status : </p>{item.orderStatus}</span>
                    <span>{state.auth.user.userType === "customer" ? <p>Your E-mail : </p>: <p>Customer E-mail : </p>}{item.token.email}</span>
                    <span>{state.auth.user.userType === "customer" ? <p>Your customer ID : </p>: <p>Customer ID : </p>}{item.userId}</span>
                    <span><p>Order creation : </p>{formatedDate}<p> at : </p>{formatedTime}</span>
                </div>
                : ""}
                <div className = {item.author ? "pagedItem-card-content reviews" : "pagedItem-card-content reviews hidden"}>
                    <span><p>Reviewed Product : </p>{item.productBrand} {item.productName}</span>
                    <span><p>Review Title : </p>{item.reviewTitle}</span>
                    <span>
                        <p>Rate : </p>
                        <div>
                            <span className={item.rate >= 1 ? "fa fa-star checked" : "fa fa-star"}></span>
                            <span className={item.rate >= 2 ? "fa fa-star checked" : "fa fa-star"}></span>
                            <span className={item.rate >= 3 ? "fa fa-star checked" : "fa fa-star"}></span>
                            <span className={item.rate >= 4 ? "fa fa-star checked" : "fa fa-star"}></span>
                            <span className={item.rate >= 5 ? "fa fa-star checked" : "fa fa-star"}></span>
                        </div>
                    </span>
                    <span><p>Post date : </p>{formatedDate}</span>
                </div>
            </div>
            
        </div>
    )
}

export default PagedItemCard
