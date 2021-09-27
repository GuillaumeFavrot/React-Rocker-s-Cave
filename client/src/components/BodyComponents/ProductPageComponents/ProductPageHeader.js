import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { requestActionCreators } from '../../../state/index'

import './../../../styles/body/productPageComponents/productPageHeader.css'

function ProductPageHeader({toogleSidebarExtenssion}) {
    
    //Redux state import

        const state = useSelector ((state) => state)
        const products = state.products.products

    //Filters menu extenssion function
    const onFiltersButtonClick = () => {
        toogleSidebarExtenssion()
    }

    //Sorting menu extenssion function
    let [sortingMenuStatus, setSortingMenuStatus] = useState(false)

    const toogleSortingMenu = () => {
        let newSortingMenuStatus
        if (sortingMenuStatus === false) {
            newSortingMenuStatus = true 
        } else {
            newSortingMenuStatus = false    
        }
        setSortingMenuStatus(sortingMenuStatus = newSortingMenuStatus)
    }

    //Product sorting modification functions

    const dispatch = useDispatch()

    const {modifySorting} = bindActionCreators(requestActionCreators, dispatch)

    const sortingSelection = (input) => {
        toogleSortingMenu()
        modifySorting(input)
    }

    //Product detail page name display

    const [productName, setProductName] = useState("")
    const [summaryTitle, setSummaryTitle] = useState("")

    useEffect(() => {
        if(state.appView.activeProductPage === "ProductDetailPage") {
            let [product] = products
            let displayedProductName = `${product.brand} ${product.name}`
            setProductName(productName => {
                productName = displayedProductName
                return productName
            })
        } else if (state.appView.activeProductPage === "Summary"){
            let newSummaryName = ""
            if(state.request.type === "Guitar") {newSummaryName = "Guitars"}
            else if(state.request.type === "Amp" ) {newSummaryName = "Amps"}
            else if(state.request.type === "Pedal") {newSummaryName = "Pedals"}
            else if(state.request.type === "Accessory") {newSummaryName = "Accessories"}
            setSummaryTitle(summaryTitle => {
                summaryTitle = newSummaryName
                return summaryTitle
            })
        }
    }, [products, state.appView.activeProductPage, state.request.type])

    return (
        <div className="productPage-header">
            <div className="productPage-header-title"><h2>{state.appView.activeProductPage === "Summary" ? summaryTitle : productName}</h2></div>
            <div className={state.appView.activeProductPage === "Summary" ? "productPage-header-btns": "productPage-header-btns hidden"}>
                <button 
                    className="btn btn-aligned-bottom-left-square productPage-header-btn-filters"
                    onClick={() => onFiltersButtonClick()}
                >
                Filters
                </button>
                <div className ="productPage-header-sorting">
                    <button 
                        className="btn  btn-aligned-bottom-right-square productPage-header-btn-sorting"
                        onClick={toogleSortingMenu}
                    >
                    Sorting
                    </button>
                    <ul className={sortingMenuStatus === true ?"active" : ""}>
                        <li><button 
                        className={sortingMenuStatus === true ?"active" : ""} 
                        onClick= {()=>sortingSelection("ascending")}
                        >Price : ascending</button></li>
                        <li><button 
                        className={sortingMenuStatus === true ?"active" : ""}
                        onClick= {()=>sortingSelection("descending")}
                        >Price : descending</button></li>
                    </ul>
                </div>
                
            </div>
        </div>
    )
}

export default ProductPageHeader
