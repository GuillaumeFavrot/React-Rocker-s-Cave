import React, {useEffect, useState} from 'react'
import UserCartProductCards from './UserCartProductCards'
import {useDispatch,useSelector} from 'react-redux'
import { bindActionCreators } from 'redux'
import { authActionCreators, checkoutActionCreators, ordersActionCreators, appViewActionCreators, productActionCreators } from '../../../state/index'
import StripeCheckout from 'react-stripe-checkout'

import './../../../styles/body/accountPageComponents/userCartCard.css'

function UserCartCard() {

    let formatter = new Intl.NumberFormat('fr-EU', {
        style: 'currency',
        currency: 'EUR'
    })

    //Redux state setup

    const state = useSelector(state => state)

    let cart = state.auth.user.userCart


    //Redux action creators call

    const dispatch = useDispatch()

    const {updateUserInfo} = bindActionCreators(authActionCreators, dispatch)
    const {checkOutBackendRequest, resetCheckoutStatus} = bindActionCreators(checkoutActionCreators, dispatch)
    const {createOrder} = bindActionCreators(ordersActionCreators, dispatch)
    const {modifyAppView} = bindActionCreators(appViewActionCreators, dispatch)
    const {getProductByIdAndUpdate} = bindActionCreators(productActionCreators, dispatch)

    //Delete item from cart function

    const deleteItemFromCart = (id) => {
        let updatedCart = cart.filter((item) => {
            return item.cartItemId !== id
        })
        let newCart = {userCart : updatedCart}
        updateUserInfo(state.auth.user._id, newCart)
    }
    
    //Cart value and total items calculator

    const [cartTotal, setCartTotal] = useState(0)

    const [shippingFee, setShippingFee] = useState(0)

    const [amount, setAmount] = useState(0)

    const [cartItemsNumber, setCartItemsNumber] = useState(0)

    const cartCalculator = () => {
        if(cart && cart.length > 0) {
            cart.forEach(item => {
                let quantity = parseInt(item.quantity, 10)
                setCartTotal(cartTotal => cartTotal + item.totalPrice)
                setShippingFee(shippingFee => shippingFee+ item.shipping)
                setAmount(Math.trunc((cartTotal+shippingFee)*100))
                setCartItemsNumber(cartItemsNumber => cartItemsNumber + quantity)
            });
        }
    }

    useEffect(() => {
        setCartTotal(0)
        setAmount(0)
        setCartItemsNumber(0)
        setShippingFee(0)
        cartCalculator()

    }, [cart])

    //Stripe payment function

    const [cartView , setCartView] = useState("cart")

    const [token, setToken] = useState({})

    const handleToken = (token, addresses) => {
        let addressModification = {
            userShippingAddress : addresses.shipping_address_line1,
            userZipCode : addresses.shipping_address_zip,
            userCity : addresses.shipping_address_city,
            userCountry : addresses.shipping_address_country,
        }
        setToken(token)
        updateUserInfo( state.auth.user._id, addressModification)    
        checkOutBackendRequest(token, cartTotal)
    }

    useEffect(() => {
        if(state.checkoutStatus.status === 200) {
            let newOrder = {
                itemsList: cart,
                token : token,
                charge : state.checkoutStatus.charge,
                userId: state.auth.user._id,
                userName: state.auth.user.userName,
                orderStatus: "Payment received and order created"
            }
            setCartView("checkout")
            createOrder(newOrder)
            newOrder.itemsList.forEach((product) =>{
                let newStock = product.stock - product.quantity
                getProductByIdAndUpdate(product.productId, {stock: newStock})
            })
            let newCart = {userCart: []}
            updateUserInfo(state.auth.user._id, newCart)
            setToken({})
        }
    }, [state.checkoutStatus])

    useEffect(() => {
        resetCheckoutStatus()
    }, [state.appView])

    useEffect(() => {
        if(cartView === "checkout"){
            setTimeout(() => {
                const appView = {
                    activePage: "homepage",
                    activeProductPage: "",
                    activeSummary: ""
                }
                modifyAppView(appView)
                setCartView("cart")
            }, 10000)
        }
    }, [cartView])

    return (
        <div className="cart-section-container">
            <div className ="cart-header">
                <span className={state.checkoutStatus.status === null ? "message" : "message hidden"}>Your cart</span>
                <span className={state.checkoutStatus.status === 400 ? "message error-message" : "message error-message hidden"}>{state.checkoutStatus.msg}</span>
                <span className={state.checkoutStatus.status === 200 ? "message success-message" : "message success-message hidden"}>Thank you for your purchase!</span>
            </div>
            <div className = {cartView === "cart" ? "cart-productsCard-Container" : "cart-productsCard-Container hidden"}>
                {cart ? cart.map((item)=>(
                    <UserCartProductCards key={item.cartItemId} item = {item} deleteItemFromCart = {deleteItemFromCart}/>    
                )) : ""} 
            </div>
            <div className = {cartView === "checkout" ? "checkout-page" : "checkout-page hidden"}>
                <p>Your order has been created.</p>
                <p>Check your e-mails or your RC account section for further details.</p>
                <p>You will be redirected to the homepage in a few seconds.</p>
            </div>
            <div className="cart-footer">
                <div className={cartView === "cart" ? "cart-footer-content" : "cart-footer-content hidden"}>
                    <div className="cart-total">
                        <p>Your cart contains {cartItemsNumber} item{cartItemsNumber > 1 ? "s" : ""} for a total of {formatter.format(cartTotal)}</p>
                        <p>Shipping fees : {formatter.format(shippingFee)}</p>
                    </div>
                    <StripeCheckout
                    name="The Rocker's Cave"
                    locale="en"
                    currency="EUR"
                    stripeKey="pk_test_51JX0ufGq830Nvyi3MynymmlMP2WrKbcbbPFzpt4ycodoqxp5NMlu5URWoT2eIz1Vv182drsuuba85JT9GU73JFAx00YE7v92bg"
                    token={handleToken}
                    billingAddress
                    shippingAddress
                    amount = {amount}
                    />
                </div>
            </div>       
        </div>
    )
}

export default UserCartCard
