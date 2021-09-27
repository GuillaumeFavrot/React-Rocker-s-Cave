import React from 'react'
import ProductCard from './ProductCard'
import { useSelector } from "react-redux"
import './../../../styles/body/productPageComponents/productSummaryPage.css'

function ProductSummaryPage() {

    const state = useSelector((state) => state)

    var products = state.products.products

    return (
        <div className="productPage-summary">
            <div className="productPage-summary-cardContainer">
                {products.map((products)=>(
                  <ProductCard key={products._id} products = {products}/>    
                ))}
            </div>
        </div>
    )
}

export default ProductSummaryPage
