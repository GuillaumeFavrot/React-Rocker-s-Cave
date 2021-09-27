import React, { useEffect, useState } from 'react'
import ProductForm from './ProductForm'
import UserCartCard from './UserCartCard'
import PagedItemList from './PagedItemList'
import PagedItemOverview from './PagedItemOverview'
import UserInformationCard from './UserInformationCard'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { appViewActionCreators, errorActionCreators, usersActionCreators, ordersActionCreators, reviewsActionCreators } from '../../../state/index'

import './../../../styles/body/accountPageComponents/accountInformationPage.css'



function AccountInformationPage() {

    //State retrieval

    const state = useSelector((state) => state)
    
    const users = state.users.users
    const orders = state.orders.orders
    const reviews = state.reviews.reviews


    //Redux action creators set-up

    const dispatch = useDispatch()
    
    const {modifyAppView} = bindActionCreators(appViewActionCreators, dispatch)
    const {clearErrors} = bindActionCreators(errorActionCreators, dispatch)
    const {getUsers, getUserById} = bindActionCreators(usersActionCreators, dispatch)
    const {getOrders, getOrderById, getOrdersByCustomer} = bindActionCreators(ordersActionCreators, dispatch)
    const {getAllReviews, getReviewById} = bindActionCreators(reviewsActionCreators, dispatch)

    //local State

    const [accountInformationPageView, setAccountInformationPageView] = useState({
        userInfo: true,
        cart: false,
        orders: false,
        userReviews: false,
        adminUserList: false,
        adminNewProductForm: false
    })

    //user information page section toogle function

    const onSectionSelection = (section) => {
        clearErrors()
        const appView = {
            activePage: "accountPage",
            activeProductPage: "", 
            activeSummary: "",
            activeAccountPage: "accountInformationPage",
            activeAccountPageSection: section
        }
        modifyAppView(appView)
    }

    useEffect(()=> {
        let newAccountInformationPageView = {
            userInfo: false,
            cart: false,
            orders: false,
            userReviews: false,
            adminUserList: false,
            adminOrderList: false,
            adminNewProductForm: false
        } 
            if (state.appView.activeAccountPageSection === "userInfo"){
                newAccountInformationPageView.userInfo = true
            }
            if (state.appView.activeAccountPageSection === "cart"){
                newAccountInformationPageView.cart =  true
            }
            if (state.appView.activeAccountPageSection === "orders"){
                newAccountInformationPageView.orders = true
            }
            if (state.appView.activeAccountPageSection === "userReviews"){
                newAccountInformationPageView.userReviews = true
            }
            if (state.appView.activeAccountPageSection === "adminUserList"){
                newAccountInformationPageView.adminUserList = true
            }
            if (state.appView.activeAccountPageSection === "adminOrderList"){
                newAccountInformationPageView.adminOrderList = true
            }           
            if (state.appView.activeAccountPageSection === "adminNewProductForm"){
                newAccountInformationPageView.adminNewProductForm = true
            }
            setAccountInformationPageView(accountInformationPageView => {
            accountInformationPageView = newAccountInformationPageView
            return accountInformationPageView
            })
    }, [state.appView])

    //Admin UsersList functions

        //DB querys on account page section selection

    useEffect(() => {
        if (state.appView.activeAccountPageSection === "adminUserList") {
            getUsers()
        }else if (state.appView.activeAccountPageSection === "adminOrderList") {
            getOrders({})
        }else if (state.appView.activeAccountPageSection === "orders") {
            getOrdersByCustomer(state.auth.user._id)
        }else if (state.appView.activeAccountPageSection === "userReviews") {
            getAllReviews({authorId : state.auth.user._id})
        }else return
    }, [state.appView.activeAccountPageSection])

    //Detail / list toggle

    const [listItemOverviewToogle, setListItemOverviewToogle] = useState("list")

    const listItemViewToggle = (id) => {
        if(listItemOverviewToogle === "list") {
            setListItemOverviewToogle("overview")
            if (state.appView.activeAccountPageSection === "adminUserList") {
            getUserById(id)
            } else if (state.appView.activeAccountPageSection === "adminOrderList") {
            getOrderById(id)
            }else if (state.appView.activeAccountPageSection === "orders") {
            getOrderById(id)
            }else if (state.appView.activeAccountPageSection === "userReviews") {
            getReviewById(id)
            }
        } else {
            setListItemOverviewToogle("list")
            if (state.appView.activeAccountPageSection === "adminOrderList") {
                getOrders({})
            }else if (state.appView.activeAccountPageSection === "adminUserList") {
                getUsers()
            }else if (state.appView.activeAccountPageSection === "orders") {
                getOrdersByCustomer(state.auth.user._id)
            }else if (state.appView.activeAccountPageSection === "userReviews") {
                getAllReviews({authorId : state.auth.user._id})   
            }      
        }
    }

    useEffect(() => {
        setListItemOverviewToogle("list")
    }, [state.appView])

    return (
        <div className={state.appView.activeAccountPage ==="accountInformationPage" ? "accountInformationPage-container" : "accountInformationPage-container hidden"}>
            <div className="accountInformationPage-section-container">
                <div className="accountInformationPage-section-header" onClick ={() => onSectionSelection("userInfo")}>
                    <div className="arrow-container">
                        <i className={accountInformationPageView.userInfo === true ? "arrow down" : "arrow right"}></i>
                    </div>
                    <div>
                        <p>User information</p>
                    </div>
                    <div className="arrow-container">
                        <i className={accountInformationPageView.userInfo === true ? "arrow down" : "arrow left"}></i>
                    </div>
                </div>
                <div className={accountInformationPageView.userInfo === true ? "accountInformationPage-section-content userInfo-container": "accountInformationPage-section-content userInfo-container shrinked"}>
                    <UserInformationCard/>
                </div>
            </div>
            <div className={state.auth.user.userType === "customer" ? "accountInformationPage-section-container" : "accountInformationPage-section-container hidden"}>
                <div className="accountInformationPage-section-header" onClick ={() => onSectionSelection("cart")}>
                    <div className="arrow-container">
                        <i className={accountInformationPageView.cart === true ? "arrow down" : "arrow right"}></i>
                    </div>
                    <div>
                        <p>Your cart</p>
                    </div>
                    <div className="arrow-container">
                        <i className={accountInformationPageView.cart === true ? "arrow down" : "arrow left"}></i>
                    </div>
                </div>
                <div className={accountInformationPageView.cart === true ? "accountInformationPage-section-content cart-container": "accountInformationPage-section-content cart-container shrinked"}>
                    <UserCartCard/>
                </div>
            </div>
            <div className={state.auth.user.userType === "customer" ? "accountInformationPage-section-container" : "accountInformationPage-section-container orders hidden"}>
                <div className="accountInformationPage-section-header" onClick ={() => onSectionSelection("orders")}>
                    <div className="arrow-container">
                        <i className={accountInformationPageView.orders === true ? "arrow down" : "arrow right"}></i>
                    </div>
                    <div>
                        <p>Your orders</p>
                    </div>
                    <div className="arrow-container">
                        <i className={accountInformationPageView.orders === true ? "arrow down" : "arrow left"}></i>
                    </div>
                </div>
                <div className={accountInformationPageView.orders === true ? "accountInformationPage-section-content orders-container": "accountInformationPage-section-content  orders-container shrinked"}>
                    <div className={listItemOverviewToogle === "overview" ? "hidden" : ""}>
                        <PagedItemList items = {orders} listItemViewToggle={listItemViewToggle} numberOfItemsPerPage={5}/>
                    </div>
                    <div className={listItemOverviewToogle === "overview" ? "" : "hidden"}>
                        <PagedItemOverview items = {orders} listItemViewToggle={listItemViewToggle} listItemOverviewToogle={listItemOverviewToogle}/>
                    </div>
                </div>
            </div>
            <div className={state.auth.user.userType === "customer" ? "accountInformationPage-section-container" : "accountInformationPage-section-container hidden"}>
                <div className="accountInformationPage-section-header" onClick ={() => onSectionSelection("userReviews")}>
                    <div className="arrow-container">
                        <i className={accountInformationPageView.userReviews === true ? "arrow down" : "arrow right"}></i>
                    </div>
                    <div>
                        <p>Your reviews</p>
                    </div>
                    <div className="arrow-container">
                        <i className={accountInformationPageView.userReviews === true ? "arrow down" : "arrow left"}></i>
                    </div>
                </div>
                <div className={accountInformationPageView.userReviews === true ? "accountInformationPage-section-content userReviews-container": "accountInformationPage-section-content userReviews-container shrinked"}>
                    <div className={listItemOverviewToogle === "overview" ? "hidden" : ""}>
                        <PagedItemList items = {reviews} listItemViewToggle={listItemViewToggle} numberOfItemsPerPage={5}/>
                    </div>
                    <div className={listItemOverviewToogle === "overview" ? "" : "hidden"}>
                        <PagedItemOverview items = {reviews} listItemViewToggle={listItemViewToggle} listItemOverviewToogle={listItemOverviewToogle}/>
                    </div>
                </div>
            </div>
            <div className={state.auth.user.userType === "admin" ? "accountInformationPage-section-container" : "accountInformationPage-section-container hidden"}>
                <div className="accountInformationPage-section-header" onClick ={() => onSectionSelection("adminOrderList")}>
                    <div className="arrow-container">
                       <i className={accountInformationPageView.adminOrderList === true ? "arrow down" : "arrow right"}></i>
                    </div>
                    <div>
                        <p>RC's orders list</p>
                    </div>
                    <div className="arrow-container">
                        <i className={accountInformationPageView.adminOrderList === true ? "arrow down" : "arrow left"}></i>
                    </div>
                </div>
                <div className={accountInformationPageView.adminOrderList === true ? "accountInformationPage-section-content adminOrdersList-container": "accountInformationPage-section-content adminOrdersList-container shrinked"}>
                    <div className={listItemOverviewToogle === "overview" ? "hidden" : ""}>
                        <PagedItemList items = {orders} listItemViewToggle={listItemViewToggle} numberOfItemsPerPage={5}/>
                    </div>
                    <div className={listItemOverviewToogle === "overview" ? "" : "hidden"}>
                        <PagedItemOverview items = {orders} listItemViewToggle={listItemViewToggle} listItemOverviewToogle={listItemOverviewToogle}/>
                    </div>
                </div>
            </div>
            <div className={state.auth.user.userType === "admin" ? "accountInformationPage-section-container" : "accountInformationPage-section-container hidden"}>
                <div className="accountInformationPage-section-header" onClick ={() => onSectionSelection("adminUserList")}>
                    <div className="arrow-container">
                       <i className={accountInformationPageView.adminUserList === true ? "arrow down" : "arrow right"}></i>
                    </div>
                    <div>
                        <p>RC's users list</p>
                    </div>
                    <div className="arrow-container">
                        <i className={accountInformationPageView.adminUserList === true ? "arrow down" : "arrow left"}></i>
                    </div>
                </div>
                <div className={accountInformationPageView.adminUserList === true ? "accountInformationPage-section-content adminUserList-container": "accountInformationPage-section-content adminUserList-container shrinked"}>
                <div className={listItemOverviewToogle === "overview" ? "hidden" : ""}>
                        <PagedItemList items = {users} listItemViewToggle={listItemViewToggle} numberOfItemsPerPage={5}/>
                    </div>
                    <div className={listItemOverviewToogle === "overview" ? "" : "hidden"}>
                        <PagedItemOverview items = {users} listItemViewToggle={listItemViewToggle} listItemOverviewToogle={listItemOverviewToogle}/>
                    </div>
                </div>
            </div>
            <div className={state.auth.user.userType === "admin" ? "accountInformationPage-section-container" : "accountInformationPage-section-container hidden"}>
                <div className="accountInformationPage-section-header" onClick ={() => onSectionSelection("adminNewProductForm")}>
                    <div className="arrow-container">
                        <i className={accountInformationPageView.adminNewProductForm === true ? "arrow down" : "arrow right"}></i>
                    </div>
                    <div>
                        <p>New product form</p>
                    </div>
                    <div className="arrow-container">
                        <i className={accountInformationPageView.adminNewProductForm === true ? "arrow down" : "arrow left"}></i>
                    </div>
                </div>
                <div className={accountInformationPageView.adminNewProductForm === true ? "accountInformationPage-section-content  adminNewProductForm-container": "accountInformationPage-section-content  adminNewProductForm-container shrinked"}>
                    <ProductForm name = "New product form"/>
                </div>
            </div>
        </div>
    )
}

export default AccountInformationPage
