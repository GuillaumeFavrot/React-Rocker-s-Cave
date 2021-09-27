import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { productActionCreators, errorActionCreators } from '../../../state/index'

import './../../../styles/body/accountPageComponents/productForm.css'

function ProductForm({name, detailPageToogle, displayedProduct}) {

    //Redux state import

    const state = useSelector((state) => state)

    //Redux action creators set-up

    const dispatch = useDispatch()
        
    const {addProduct, getProductByIdAndUpdateAdmin} = bindActionCreators(productActionCreators, dispatch)
    const {clearErrors} = bindActionCreators(errorActionCreators, dispatch)

    //Product from initial state

    let initialState = {
        name: "",
        image: "",
        type: "",
        subType: "",
        brand: "",
        basePrice: "",
        effectivePrice: "",
        stock: "",
        shipping: "",
        warranty: "",
        productDescription: "",
        color: "",
        mics: "",
        frets: "",
        power: "",
        speakerConfig: "",
        ampType: ""
    }

    const [newProduct, setNewProduct] = useState({
        name: "",
        image: "",
        type: "",
        subType: "",
        brand: "",
        basePrice: "",
        effectivePrice: "",
        stock: "",
        shipping: "",
        warranty: "",
        productDescription: "",
        color: "",
        mics: "",
        frets: "",
        power: "",
        speakerConfig: "",
        ampType: ""
    })

    //Product modifications state
    
    const [productModifications, setProductModifications] = useState({
    })

    //On input change handler

    const onChange = (e) => {
        setNewProduct(newProduct => ({...newProduct, [e.target.name]: e.target.value}))
        setProductModifications(productModifications => ({...productModifications, [e.target.name]: e.target.value}))
    }

    //New product submission

    const onSubmit = () => {
        clearErrors()
        addProduct(newProduct)
        setNewProduct(newProduct => {
            newProduct = initialState
            return newProduct
        })
    }

    //Modification submission

    const onEdit = async () => {
        clearErrors()
        await getProductByIdAndUpdateAdmin(displayedProduct._id, productModifications)
        setNewProduct(newProduct => {
            newProduct = initialState
            return newProduct
        })
        detailPageToogle()
    }

    //Detail page toogle

    const onCancelClick = () => {
        detailPageToogle()
        setNewProduct(newProduct => {
            newProduct = initialState
            return newProduct
        })
    }

    return (
        <div className ="accountInformationPage-newProductForm-container">
            <div className ="accountInformationPage-newProductForm-header">
                <h4>{name}</h4>
                <div className={state.error.status === 400 ? "error-message" : "error-message hidden"}>{state.error.msg.msg ? state.error.msg.msg : ""}</div>
                <div className={state.error.status === 200 ? "success-message" : "success-message hidden"}>Product successfuly created!</div>
            </div>
            <div className ="accountInformationPage-newProductForm">
                <div className = "newProductForm-productType">
                    <span>Product type : </span>
                    <select name="type" className="formInput" onChange ={e => onChange(e)}>
                        <option></option>
                        <option>Guitar</option>
                        <option>Amp</option>
                        <option>Pedal</option>
                        <option>Accessory</option>
                    </select>
                </div>            
                <div className = "newProductForm-productName">
                    <span>Product name : </span>
                    <input className="formInput" value={newProduct.name} name="name"  placeholder={displayedProduct ? displayedProduct.name : ""} onChange ={e => onChange(e)}></input>
                </div>
                <div className = "newProductForm-productImage">
                    <span>Product image link : </span>
                    <input className="formInput" value={newProduct.image} name="image" placeholder={displayedProduct ? displayedProduct.image : ""} onChange ={e => onChange(e)}></input>
                </div>
                <div className = "newProductForm-productSubType">
                    <span>Product sub-type : </span>
                    <input className="formInput" value={newProduct.subType} name="subType" placeholder={displayedProduct ? displayedProduct.subType : ""} onChange ={e => onChange(e)}></input>
                </div>
                <div className = "newProductForm-productBrand">
                    <span>Product brand : </span>
                    <input className="formInput" value={newProduct.brand} name="brand" placeholder={displayedProduct ? displayedProduct.brand : ""} onChange ={e => onChange(e)}></input>
                </div>
                <div className = {newProduct.type ==="Guitar" ? "newProductForm-guitarColor" : "newProductForm-guitarColor hidden"}>
                    <span>Color : </span>
                    <input className="formInput" value={newProduct.color} name="color" placeholder={displayedProduct ? displayedProduct.color : ""} onChange ={e => onChange(e)}></input>
                </div>
                <div className = {newProduct.type ==="Guitar" ? "newProductForm-pickupConfig" : "newProductForm-pickupConfig hidden"}>
                    <span>Pick-up config. : </span>
                    <input className="formInput" value={newProduct.mics} name="mics" placeholder={displayedProduct ? displayedProduct.mics : ""} onChange ={e => onChange(e)}></input>
                </div>
                <div className = {newProduct.type ==="Guitar" ? "newProductForm-numberOfFrets" : "newProductForm-numberOfFrets hidden"}>
                    <span>Number of frets : </span>
                    <input className="formInput" value={newProduct.frets} name="frets" placeholder={displayedProduct ? displayedProduct.frets : ""} onChange ={e => onChange(e)}></input>
                </div>
                <div className = {newProduct.type ==="Amp" ? "newProductForm-ampType" : "newProductForm-ampType hidden"}>
                    <span>Amp type : </span>
                    <input className="formInput" value={newProduct.ampType} name="ampType" placeholder={displayedProduct ? displayedProduct.ampType : ""} onChange ={e => onChange(e)}></input>
                </div>
                <div className = {newProduct.type ==="Amp" ? "newProductForm-ampPower" : "newProductForm-ampPower hidden"}>
                    <span>Power : </span>
                    <input className="formInput" value={newProduct.power} name="power" placeholder={displayedProduct ? displayedProduct.power : ""} onChange ={e => onChange(e)}></input>
                </div>
                <div className = {newProduct.type ==="Amp" ? "newProductForm-speakerConfig" : "newProductForm-speakerConfig hidden"}>
                    <span>Speaker config. : </span>
                    <input className="formInput" value={newProduct.speakerConfig} name="speakerConfig" placeholder={displayedProduct ? displayedProduct.speakerConfig : ""} onChange ={e => onChange(e)}></input>
                </div>
                <div className = "newProductForm-productBasePrice">
                    <span>Base price : </span>
                    <input className="formInput" value={newProduct.basePrice} name="basePrice" placeholder={displayedProduct ? displayedProduct.basePrice : ""} onChange ={e => onChange(e)}></input>
                </div>
                <div className = "newProductForm-productEffectivePrice">
                    <span>Effective price : </span>
                    <input className="formInput" value={newProduct.effectivePrice} name="effectivePrice" placeholder={displayedProduct ? displayedProduct.effectivePrice : ""} onChange ={e => onChange(e)}></input>
                </div>
                <div className = "newProductForm-productStock">
                    <span>Available stock : </span>
                    <input className="formInput" value={newProduct.stock} name="stock" placeholder={displayedProduct ? displayedProduct.stock : ""} onChange ={e => onChange(e)}></input>
                </div>
                <div className = "newProductForm-productWarranty">
                    <span>Product warranty : </span>
                    <input className="formInput" value={newProduct.warranty} name="warranty" placeholder={displayedProduct ? displayedProduct.warranty : ""} onChange ={e => onChange(e)}></input>
                </div>
                <div className = "newProductForm-shippingCost">
                    <span>Shipping cost : </span>
                    <input className="formInput" value={newProduct.shipping} name="shipping" placeholder={displayedProduct ? displayedProduct.shipping : ""} onChange ={e => onChange(e)}></input>
                </div>
                <div className = "newProductForm-productDescription">
                    <span>Product description : </span>
                    <textarea className="formInput" value={newProduct.productDescription} name="productDescription" placeholder={displayedProduct ? displayedProduct.productDescription : ""} onChange ={e => onChange(e)}></textarea>
                </div> 
            </div>            
            <div className = "newProductForm-button-container">
                <button className={name === "New product form" ? "btn btn-red hidden" : "btn btn-red"} onClick = {() => onCancelClick()}>Cancel</button>
                <button className={name === "Product modification Form" ? "btn btn-green submit" : "btn btn-green submit hidden"} onClick={() => onEdit()}>Edit</button>
                <button className={name === "New product form" ? "btn btn-green submit" : "btn btn-green submit hidden"} onClick={() => onSubmit()}>Submit</button>
            </div>
        </div>
    )
}

export default ProductForm
