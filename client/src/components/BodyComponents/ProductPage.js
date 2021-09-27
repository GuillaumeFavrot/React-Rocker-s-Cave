import React, {useState} from 'react'
import { useSelector } from 'react-redux'

import ProductDetailPage from './ProductPageComponents/ProductDetailPage'
import ProductPageHeader from './ProductPageComponents/ProductPageHeader'
import ProductPageSidebar from './ProductPageComponents/ProductPageSidebar'
import ProductSummaryPage from './ProductPageComponents/ProductSummaryPage'

import './../../styles/body/productPage.css'


function ProductPage({retrieveFormerProducts}) {
   
    //State retrieval

    const state = useSelector((state) => state)

    //Sidebar extenssion code

    const [sidebarStatus, setSidebarStatus] = useState("shrinked")
    
    //Toogle productPage/Productdetail page function

    const  backToProductsList = () => {
        retrieveFormerProducts()
    }

    //Sidebar extenssion function

    const toogleSidebarExtenssion = () => {

        let newSidebarStatus = ""

        if (sidebarStatus === "shrinked") {
            newSidebarStatus = "extended"
        }
        else {
            newSidebarStatus = "shrinked"
        }
        setSidebarStatus(sidebarStatus => {
            sidebarStatus = newSidebarStatus
            return sidebarStatus
        })
    }

    return (
        <div className={state.appView.activePage ==="Productpage" ? "productPage-container" : "productPage-container hidden"}>
            <ProductPageHeader toogleSidebarExtenssion = {toogleSidebarExtenssion}/>
            <div className="body-break"></div>
            <div className={state.appView.activeProductPage === "Summary" ? "productPage-detail hidden" : "productPage-detail"}>
                <ProductDetailPage backToProductsList ={backToProductsList}/>
            </div>
            <div className={state.appView.activeProductPage === "Summary" ? "productPage-summary" : "productPage-summary hidden"}>
                <ProductPageSidebar sidebarStatus = {sidebarStatus}/>
                <ProductSummaryPage/>
            </div>
        </div>
    )
}

export default ProductPage
