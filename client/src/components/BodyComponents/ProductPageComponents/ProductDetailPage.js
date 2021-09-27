import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { appViewActionCreators, errorActionCreators, reviewsActionCreators, authActionCreators, productActionCreators } from '../../../state/index'
import NewProductForm from '../AccountPageComponents/ProductForm'
import {v4 as uuidv4} from 'uuid'

import './../../../styles/body/productPageComponents/productDetailPage.css'
import ProductDetailPageCommentCard from './ProductDetailPageCommentCard'

function ProductDetailPage({backToProductsList}) {

    //redux state setup

    const state = useSelector((state) => state)
    const products = state.products.products
    const reviews = state.reviews.reviews


    //Redux action creators call

    const dispatch = useDispatch()
        
    const {modifyAppView} = bindActionCreators(appViewActionCreators, dispatch)
    const {deleteProduct, getProductByIdAndUpdateAdmin} = bindActionCreators(productActionCreators, dispatch)
    const {clearErrors} = bindActionCreators(errorActionCreators, dispatch)
    const {updateUserInfo} = bindActionCreators(authActionCreators, dispatch)
    const {createReview, getAllReviews} = bindActionCreators(reviewsActionCreators, dispatch)

    //back to summary function

    const backToSummary = () => {
        let pageRequest = {
            activePage: "Productpage",
            activeProductPage: "Summary",
            activeSummary: ""
        }
        modifyAppView(pageRequest)
        backToProductsList()
    }

    //Creating the local state for product display
    const [displayedProduct, setdisplayedProduct] = useState({
        name: "",
        image: "",
        type: "",
        subType: "",
        brand: "",
        basePrice: "",
        effectivePrice: "",
        stock: "",
        warranty: "",
        shipping: "",
        productDescription : "",
        color:"" ,
        mics: "",
        frets:"" ,
        power: "",
        speakerConfig:"" ,
        ampType:""
    })

    useEffect(() => {
        if (products.length === 1 && state.appView.activeProductPage  === "ProductDetailPage" ) {
            let [newDisplayedProduct] = products
            setdisplayedProduct(displayedProduct => {
            displayedProduct = newDisplayedProduct
            return displayedProduct
        })
        }
        else return
    }, [products, state.appView.activeProductPage])

    //Product page / modification page display toggle

    const [detailPageView, setDetailPageView] = useState("detailPage")

    const detailPageToogle = () => {
        clearErrors()
        if(detailPageView === "detailPage"){
            setDetailPageView("productModificationForm")
        }else {
            setDetailPageView("detailPage")
        }
    }

    useEffect(() => {
        setDetailPageView("detailPage")
    }, [state.appView])

    //Product delete request

    const deleteRequest = (id) => {
        deleteProduct(id)
    }

    //Product Availability and price format

    const availability = displayedProduct.stock !== 0 ? "Available immediatly" : "Out of stock"
    
    let formatter = new Intl.NumberFormat('fr-EU', {
        style: 'currency',
        currency: 'EUR'
    })

    //Add to cart functions

    const [productQuantity, setProductQuatity] = useState(1)

    const onQuantityChange = (e) => {
        let number = parseInt(e.target.value, 10)
        setProductQuatity(number)
    }
    const addToCart = () => {
        if(state.auth.isAuthenticated) {
            let productToAddToCart = {
                productId : displayedProduct._id,
                cartItemId : uuidv4(),
                brand : displayedProduct.brand,
                name: displayedProduct.name,
                stock: displayedProduct.stock,
                quantity : productQuantity,
                image: displayedProduct.image,
                effectivePrice: displayedProduct.effectivePrice,
                totalPrice: displayedProduct.effectivePrice*productQuantity,
                shipping: displayedProduct.shipping
            }
            if (productToAddToCart.quantity <= displayedProduct.stock) {
                let newCart = {userCart : state.auth.user.userCart}
                newCart.userCart.push(productToAddToCart)
                updateUserInfo(state.auth.user._id, newCart)
                newCart = {}
                setProductQuatity(1)
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
            loginPageRequest()
        } 
}

    const loginPageRequest = () => {
        let pageRequest = {
            activePage: "accountPage",
            activeProductPage: "",
            activeSummary: "",
            activeAccountPage: "loginPage",
            activeAccountPageSection: ""   
        }
        modifyAppView(pageRequest)
    }

    //Product rating and reviewing functions

    const [starRating, setStarRating] = useState(0)

    const [selectedStarRating, setSelectedStarRating] = useState(0)

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
        let review = {
            rate: selectedStarRating,
            author: state.auth.user.userName,
            authorId: state.auth.user._id,
            productId: displayedProduct._id,
            productBrand: displayedProduct.brand,
            productName: displayedProduct.name,
            productImage: displayedProduct.image,
            reviewTitle: newReview.reviewTitle,
            reviewComment: newReview.reviewComment 
        }
        //Creating and posting the review on the DB
        createReview(review)
        getAllReviews({productId : displayedProduct._id})
        commentCancel()
        setStarRating(0)
        setSelectedStarRating(0)
    }

    const commentCancel = () => {
        setNewComment({
            rate: 0,
            author: "",
            authorId: "",
            productId: "",
            reviewTitle: "",
            reviewComment: "" 
        })
    }

    //Calculating product average rate

    const [averageRate, setAverageRate] = useState(0)

    useEffect(() => {
        setAverageRate(0)
        if(reviews.length > 0) {
            let rates = []
            reviews.map(review => (
                rates.push(review.rate)
            ))
            let total = 0
            rates.map(rate => (
                total = total + rate
            ))
            let average = Math.round(total / reviews.length)
            setAverageRate(average)
        }
    }, [reviews])

    //Onsale toogle

    const onSaleClick = () => {
        if(displayedProduct.onSale) {
            getProductByIdAndUpdateAdmin(displayedProduct._id, {onSale : false})
        }else {
            getProductByIdAndUpdateAdmin(displayedProduct._id, {onSale : true})
        }
    }
    return (
        <div className="productPage-detail-container">
            <div className={detailPageView === "detailPage" ? "productPage-detail-productSheet-container" : "productPage-detail-productSheet-container hidden"}>
                <div className="productPage-detail-productSheet-buttons">
                    <button name="back" className ="btn btn-aligned-top-left-square" onClick = {() => backToSummary()}>Back to the Summary</button>
                    <button className ={state.auth.user.userType === "admin" ? "btn onSaleButton" : " btn onSaleButton hidden"} onClick = {() => onSaleClick()}>
                        <span>On sale </span>
                        <span name="onSale" className ={displayedProduct.onSale ? "fa fa-star checked" : "fa fa-star"}></span>
                    </button> 

                    <button name="toModificationForm" className ={state.auth.user.userType === "admin" ? "btn btn-green edit" : "btn btn-green edit hidden"} onClick = {() => detailPageToogle()}>Edit product</button>
                    <button className ={state.auth.user.userType === "admin" ? "btn btn-red  btn-aligned-bottom-right-square " : "btn btn-red  btn-aligned-bottom-right-square hidden"} onClick = {() => {deleteRequest(displayedProduct._id)}}>Delete product</button>

                </div>
                <div className="productPage-detail-productSection">
                    <div className="productPage-detail-productSheet">
                        <img src={displayedProduct.image} alt="product"/>
                        <div className ="productPage-detail-productSheet-contentContainer">
                            <h3>Technical Sheet</h3>
                            <div><span>Product ref. :</span><p>{displayedProduct._id}</p></div>
                            <div><span>Type:</span><p>{displayedProduct.subType}</p></div>
                            <div><span>Brand: </span><p>{displayedProduct.brand}</p></div>
                            <div className={displayedProduct.color === "" ? "hidden" : ""}><span>Color: </span><p>{displayedProduct.color}</p></div>
                            <div className={displayedProduct.mics === "" ? "hidden" : ""}><span>Pick-up configuration: </span><p>{displayedProduct.mics}</p></div>
                            <div className={displayedProduct.frets === null ? "hidden" : ""}><span>Frets: </span><p>{displayedProduct.frets}</p></div>
                            <div className={displayedProduct.ampType === "" ? "hidden" : ""}><span>Amp type: </span><p>{displayedProduct.ampType}</p></div>
                            <div className={displayedProduct.power === null ? "hidden" : ""}><span>Power: </span><p>{displayedProduct.power} Watts</p></div>
                            <div className={displayedProduct.speakerConfig === "" ? "hidden" : ""}><span>Speaker configuration: </span><p>{displayedProduct.speakerConfig}</p></div>
                            <div className="productPage-detail-productSheet-productDescription"><span>Product description: </span><div>{displayedProduct.productDescription}</div></div>
                        </div>
                    </div>
                    <div className="productPage-detail-productBuyingInfo">
                        <div className="productPage-detail-productBuyingInfo-container1">
                            <div className ="productPage-detail-price">
                                <div className = "productPage-detail-effectivePrice">
                                        {formatter.format(displayedProduct.effectivePrice)}
                                </div>
                                <p>VAT  included</p>
                                <div className ={displayedProduct.basePrice !== displayedProduct.effectivePrice ? "productPage-detail-basePrice" :"productPage-detail-basePrice disabled"}>
                                    <p>Instead of :</p><span>{formatter.format(displayedProduct.basePrice)}</span>
                                    
                                </div>
                            </div>
                            <div className ="productPage-detail-rating">
                                <p>Ratings</p>
                                <div>
                                    <span className={averageRate >= 1 ? "fa fa-star checked" : "fa fa-star"}></span>
                                    <span className={averageRate >= 2 ? "fa fa-star checked" : "fa fa-star"}></span>
                                    <span className={averageRate >= 3 ? "fa fa-star checked" : "fa fa-star"}></span>
                                    <span className={averageRate >= 4 ? "fa fa-star checked" : "fa fa-star"}></span>
                                    <span className={averageRate >= 5 ? "fa fa-star checked" : "fa fa-star"}></span>
                                </div>
                            </div>
                            <div className="productPage-detail-productBuyingInfo-addToCart">
                                    <input type="string" value={productQuantity} onChange={(e) => onQuantityChange(e)}/>
                                    <button type="submit" onClick={() => addToCart()}>Add to cart</button>
                            </div>
                        </div>
                        <div className="productPage-detail-productBuyingInfo-container2">
                            <div className="productPage-detail-availability">
                                Availability
                                <div className ={displayedProduct.stock !== 0 ? "productPage-detail-availability true" : "productPage-detail-availability false"}>
                                    {availability}{displayedProduct.stock !== 0 ? <p className="stock-qty"> ({displayedProduct.stock} In stock)</p>: ""}
                                </div>
                            </div>
                            <div className="productPage-detail-shipping">
                                Shipping
                                <div>
                                    {displayedProduct.shipping === 0 ? "Free" : <span>{formatter.format(displayedProduct.shipping)}</span>} shipping
                                </div>
                            </div>
                            <div className="productPage-detail-warranty">
                                Warranty
                                <div>
                                    <span>{displayedProduct.warranty}</span> warranty
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="productPage-detail-commentSection">
                    <div className="productPage-detail-commentSection-form">
                        <span>Rate this product</span>
                        <div className={state.auth.isAuthenticated === false ? "authentification-verification" : "authentification-verification hidden"}>
                            <p className="success-message">You need to be connected to leave a comment</p>
                            <button className="btn btn-green" onClick={() => loginPageRequest()}>Log in</button>
                        </div>
                        <div className={state.auth.isAuthenticated === true ? "productPage-detail-commentSection-form-addRating" : "productPage-detail-commentSection-form-addRating hidden"}>
                            <div>
                                <span id={1} className={starRating >= 1 ? "fa fa-star checked" : "fa fa-star"} onMouseOver={(e)=>onStarHover(e)} onMouseLeave={()=>onStarLeave()} onClick={(e)=>onStarClick(e)}></span>
                                <span id={2} className={starRating >= 2 ? "fa fa-star checked" : "fa fa-star"} onMouseOver={(e)=>onStarHover(e)} onMouseLeave={()=>onStarLeave()} onClick={(e)=>onStarClick(e)}></span>
                                <span id={3} className={starRating >= 3 ? "fa fa-star checked" : "fa fa-star"} onMouseOver={(e)=>onStarHover(e)} onMouseLeave={()=>onStarLeave()} onClick={(e)=>onStarClick(e)}></span>
                                <span id={4} className={starRating >= 4 ? "fa fa-star checked" : "fa fa-star"} onMouseOver={(e)=>onStarHover(e)} onMouseLeave={()=>onStarLeave()} onClick={(e)=>onStarClick(e)}></span>
                                <span id={5} className={starRating >= 5 ? "fa fa-star checked" : "fa fa-star"} onMouseOver={(e)=>onStarHover(e)} onMouseLeave={()=>onStarLeave()} onClick={(e)=>onStarClick(e)}></span>
                            </div>
                        </div>
                        <div className={state.error.status === 200 ? "success-message review" : "success-message review hidden"}>Your reviews has been posted!</div>
                        <div className={state.auth.isAuthenticated === true ? "comment-form" : "comment-form hidden"}>
                            <span>Review title :</span>
                            <input type="text" name="reviewTitle" value={newReview.reviewTitle} onChange={(e) => onCommentFieldChange(e)}/>
                            <span>Comment :</span>
                            <textarea type="text" name="reviewComment" value={newReview.reviewComment} onChange={(e) => onCommentFieldChange(e)}/>
                            <div>
                                <button className="btn btn-red productPage-detail-commentSection-form-btn-cancel" onClick={() => commentCancel()}>Cancel</button>
                                <button className="btn btn-green productPage-detail-commentSection-form-btn-send" onClick={() => commentSubmit()}>Send</button>
                            </div>
                        </div>
                    </div>
                    <div className="productPage-detail-commentSection-comments">
                        {reviews.length !== 0 ? reviews.map((review)=>(
                        <ProductDetailPageCommentCard key={review._id} review = {review}/>    
                        )) : <p className="no-review">This product has no review yet.</p>} 
                    </div>
                </div>
            </div>
            <div className={detailPageView === "productModificationForm" ? "productPage-detail-productModificationForm-container" : "productPage-detail-productModificationForm-container hidden"}>
                <NewProductForm name = "Product modification Form" detailPageToogle={detailPageToogle} displayedProduct={displayedProduct}/>
            </div>
        </div>
    )
}

export default ProductDetailPage
