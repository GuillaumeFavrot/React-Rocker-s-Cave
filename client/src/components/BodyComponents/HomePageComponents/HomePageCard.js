import React, { useState, useEffect } from 'react'
import Button from '../../UtilityComponents/Button'
import ProductCard from './../ProductPageComponents/ProductCard'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { productActionCreators } from '../../../state/index'
import useWindowDimensions from '../../../customHooks/WindowSizeHook'
import './../../../styles/body/homePageComponents/homePageCards.css'

function HomePageCard({cardContent, toogleExtenssion}) {

    //redux state setup

    const state = useSelector((state) => state)
    const products = state.products.products   

    //Redux action creators call

    const dispatch = useDispatch()
        
    const {getProducts} = bindActionCreators(productActionCreators, dispatch)

    //On button click function

    const onButtonClick = (name) => {
        toogleExtenssion(name)
        if(name === "sales") {
            let request = {
                customSearch: '',
                type: '',
                subType: '',
                brand: '',
                sorting: 'ascending',
                onSale: true
                }
            getProducts(request)
        }
    }

    //Card content display function

    const [cardContentDisplay, setCardContentDisplay] = useState(false)
    const [cardContentVisibility, setCardContentVisibility] = useState(false)

    useEffect(() => {
        if(cardContent.cardStatus === "extended") {
            setTimeout(()=> {
                setCardContentDisplay(true)
                setTimeout(()=> {
                    setCardContentVisibility(true)
                }, 50)
            }, 1000)
        }else if (cardContent.cardStatus === "shrinked")
                setCardContentDisplay(false)
                setTimeout(()=> {
                    setCardContentVisibility(false)
                }, 50)
    }, [cardContent.cardStatus])

    //Definning products to display in the sale card

    const [productsToDisplay, setProductsToDisplay] = useState([])

    const [numberOfProducts, setNumberOfProducts] = useState(2)

    const { width } = useWindowDimensions();

    useEffect(() => {
        if (width <= 550) {
            setNumberOfProducts(2)
            let newArray = products.slice(0, numberOfProducts)   
            setProductsToDisplay(newArray)
        }
        else if (width <= 750) {
            setNumberOfProducts(3)
            let newArray = products.slice(0, numberOfProducts)   
            setProductsToDisplay(newArray)
        }
        else if (width <= 950) {
            setNumberOfProducts(4)
            let newArray = products.slice(0, numberOfProducts)   
            setProductsToDisplay(newArray)
        }
        else if (width <= 1150) {
            setNumberOfProducts(5)
            let newArray = products.slice(0, numberOfProducts)   
            setProductsToDisplay(newArray)
        }
        else if (width <= 1350) {
            setNumberOfProducts(6)
            let newArray = products.slice(0, numberOfProducts)   
            setProductsToDisplay(newArray)
        }
        else if (width > 1350) {
            setNumberOfProducts(7)
            let newArray = products.slice(0, numberOfProducts)   
            setProductsToDisplay(newArray)
        }
    }, [width, cardContentDisplay])

    return (
        <div className={cardContent.cardStatus === "extended" ? "homePage-card extended" : "homePage-card shrinked"}>
            <div className= {cardContent.cardContentAlignment === "left" ? "homePage-card-contentContainer aligned-left-flex" : "homePage-card-contentContainer"}>
                <div className="homePage-card-cardContent">
                    <h3 className="homePage-card-cardTitle">{cardContent.cardTitle}</h3>
                    <div className={cardContentDisplay === true ? "homePage-card-cardDescription-container hidden" : "homePage-card-cardDescription-container"}>
                        <h5 className={cardContentVisibility === true ? "homePage-card-cardDescription" : "homePage-card-cardDescription visible"}>
                                {cardContent.cardDescription}
                        </h5>
                    </div>
                    <div className={cardContentDisplay === true ? "homePage-card-cardData" : "homePage-card-cardData hidden"}>
                        <div className={cardContentVisibility === true ? "homePage-card-cardText visible" : "homePage-card-cardText"}>
                            {cardContent.cardData}
                        
                            <div className={cardContent.cardTitle === "Featured Sales" ? "featured-products-cards" : "featured-products-cards hidden"}>
                                {productsToDisplay.map((products)=>(
                                <ProductCard key={products._id} products = {products}/>    
                                ))}
                            </div>
                        </div>
                    </div>                
                </div>
                <Button 
                alignment={cardContent.cardContentAlignment} 
                buttonText={cardContent.cardButtonText} 
                buttonName={cardContent.cardButtonName}
                onButtonClick={onButtonClick}
                />
            </div>
        </div>
    )
}

export default HomePageCard
