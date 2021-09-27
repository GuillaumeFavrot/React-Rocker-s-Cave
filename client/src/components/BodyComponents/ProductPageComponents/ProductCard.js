import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { productActionCreators, appViewActionCreators, authActionCreators, reviewsActionCreators } from '../../../state/index'
import {v4 as uuidv4} from 'uuid'

import './../../../styles/body/productPageComponents/productCard.css'

function ProductCard({products}) {

    const availability = products.stock !== 0 ? "In stock" : "Out of stock"
    
    let formatter = new Intl.NumberFormat('fr-EU', {
        style: 'currency',
        currency: 'EUR'
    })

    //State retrieval

    const state = useSelector((state) => state)

    //Redux action creators call

    const dispatch = useDispatch()

    const {getProductById} = bindActionCreators(productActionCreators, dispatch)
    const {modifyAppView} = bindActionCreators(appViewActionCreators, dispatch)
    const {updateUserInfo} = bindActionCreators(authActionCreators, dispatch)
    const {getAllReviews} = bindActionCreators(reviewsActionCreators, dispatch)

    //Product detail page call function

    const onProductCardClick = () => {
        let pageRequest = {
            activePage: "Productpage",
            activeProductPage: "ProductDetailPage",
        }
        modifyAppView(pageRequest)
        getProductById(products._id)
        getAllReviews({productId : products._id})
    }

    //Add to cart functions

    const [productQuantity, setProductQuantity] = useState(1)

    const onQuantityChange = (e) => {
        let number = parseInt(e.target.value, 10)
        setProductQuantity(number)
    }

    const addToCart = () => {
        if(state.auth.isAuthenticated) {
            let productToAddToCart = {
                productId : products._id,
                cartItemId : uuidv4(),
                brand : products.brand,
                name: products.name,
                quantity : productQuantity,
                stock: products.stock,
                image: products.image,
                effectivePrice: products.effectivePrice,
                totalPrice: products.effectivePrice*productQuantity,
                shipping: products.shipping
            }
            if (productToAddToCart.quantity <= products.stock) {
                let newCart = {userCart : state.auth.user.userCart}
                newCart.userCart.push(productToAddToCart)
                updateUserInfo(state.auth.user._id, newCart)
                newCart = {}
                setProductQuantity(1)
                let pageRequest = {
                    activePage: "accountPage",
                    activeProductPage: "", 
                    activeSummary: "",
                    activeAccountPage: "accountInformationPage",
                    activeAccountPageSection: "cart"
                }
                modifyAppView(pageRequest)
            } else {
                window.alert("Not enough items in stock")
            }
        } else {
            let pageRequest = {
                activePage: "accountPage",
                activeProductPage: "",
                activeSummary: "",
                activeAccountPage: "loginPage",
                activeAccountPageSection: ""   
            }
        modifyAppView(pageRequest)
        } 
}

    return (
        <div className ="productPage-card">
            <span onClick={() => onProductCardClick()} className="to-productDetailPage">
                <img src={products.image} alt="product"/>
                <div className ="productPage-card-name">
                    <h5><span>{products.brand}</span> {products.name}</h5>
                </div>
            </span>    
            <div className ="productPage-card-price">
            <div className = "productPage-card-effectivePrice">
                    {formatter.format(products.effectivePrice)}
                </div>
                <div className ={products.basePrice !== products.effectivePrice ? "productPage-card-basePrice" :"productPage-card-basePrice disabled"}>
                    Instead of : <span>{formatter.format(products.basePrice)}</span>
                </div>
            </div>
            <div className="productPage-card-stock-cart">
                <div className ={products.stock !== 0 ? "productPage-card-availability true" : "productPage-card-availability false"}>
                    {availability} {products.stock !== 0 ? <span>({products.stock})</span>: ""}
                </div>
                <div className="productPage-card-cart">
                    <input className="productPage-card-quantity" type="string" value={productQuantity} onChange={(e) => onQuantityChange(e)}></input>
                    <button className="productPage-card-addToCart" onClick={() => addToCart()}><i className="fa fa-shopping-cart"></i></button>
                </div>
            </div>
           
        </div>
    )
}

export default ProductCard
