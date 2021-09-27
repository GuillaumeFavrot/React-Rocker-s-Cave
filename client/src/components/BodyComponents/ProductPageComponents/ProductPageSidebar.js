import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { requestActionCreators } from '../../../state/index'

import './../../../styles/body/productPageComponents/productPageSidebar.css'

function ProductPageSidebar({sidebarStatus}) {

    //State retrieval

    const state = useSelector((state) => state)
    const products = state.products.products

    //Action creator setup

    const dispatch = useDispatch()

    const {modifyRequest} = bindActionCreators(requestActionCreators, dispatch)

    //Determining available choices for the filters lists

    const [subTypeList, setSubTypeList] = useState([])
    const [brandList, setBrandList] = useState([])

    
    useEffect(() => {
        let uniqueAvailableSubTypes = []
        let uniqueAvailableBrands = [] 
        let availableSubTypes = []
        let availableBrands = []
        if(state.request.subType.length !== 0 || state.request.brand.length !== 0) {
            return
        }
        else {
            products.map(product => (
            availableSubTypes.push(product.subType)
            ));
            uniqueAvailableSubTypes = [...new Set(availableSubTypes)]

            setSubTypeList((subTypeList) => {
                subTypeList = uniqueAvailableSubTypes
                return subTypeList
            })

            products.map(product => (
            availableBrands.push(product.brand)
            ));
            uniqueAvailableBrands = [...new Set(availableBrands)]

            setBrandList((brandList) => {
                brandList = uniqueAvailableBrands
                return brandList
            })
        }   
    }, [products, state.request.subType.length, state.request.brand.length])

    //Modifying the DB request to match the user choices

    const filterSubType = () => {
        let selectedSubTypes= []
        let checkedCheckboxes = Array.from(document.querySelectorAll(".productPage-summary-sidebar-filters-availableSubTypes:checked"))
        checkedCheckboxes.map((subType)=>(
            selectedSubTypes.push(subType.value) 
        ))
        console.log(selectedSubTypes)
        if (selectedSubTypes.length === 0) {
            let updatedRequest = state.request
            updatedRequest.subType = ""
            modifyRequest(updatedRequest)
        }else {
            let updatedRequest = state.request
            updatedRequest.subType = selectedSubTypes
            modifyRequest(updatedRequest)
        }
    }

    const filterBrands = () => {
        let selectedBrands = []
        let checkedCheckboxes = Array.from(document.querySelectorAll(".productPage-summary-sidebar-filters-availableBrands:checked"))
        checkedCheckboxes.map((brand)=>(
            selectedBrands.push(brand.value) 
        ))
        if (selectedBrands.length === 0) {
            let updatedRequest = state.request
            updatedRequest.brand = ""
            modifyRequest(updatedRequest)
        }else {
            let updatedRequest = state.request
            updatedRequest.brand = selectedBrands
            modifyRequest(updatedRequest)
        }
    }

    useEffect(() => {
        let clearedArray = [] 
        setSubTypeList(subTypeList => subTypeList = clearedArray)
        setBrandList(brandList => brandList = clearedArray)
    }, [state.appView])

    return (
        <div className={sidebarStatus === "extended" ? "productPage-summary-sidebar active" : "productPage-summary-sidebar"}>
            <div className={sidebarStatus === "extended" ? "productPage-summary-sidebar-filters active" : "productPage-summary-sidebar-filters"}>
                <p>Types</p> 
                <ul onChange = {filterSubType}>
                    {subTypeList.map((subtype)=>(
                    <li key={subTypeList.indexOf(subtype)}><input className="productPage-summary-sidebar-filters-availableSubTypes" type="checkbox" id={subtype} name="subType" value={subtype}/>{subtype}</li>  
                    ))} 
                </ul>
                <p>Brands</p> 
                <ul onChange = {filterBrands}>
                    {brandList.map((brand)=>(
                    <li key={brandList.indexOf(brand)}><input className="productPage-summary-sidebar-filters-availableBrands" type="checkbox" id={brand} name="brand" value={brand}/>{brand}</li>  
                    ))} 
                </ul>
            </div>
        </div>
    )
}

export default ProductPageSidebar
