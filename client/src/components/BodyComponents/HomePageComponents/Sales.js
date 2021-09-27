import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import HomePageCard from './HomePageCard'

function Sales() {

    //redux state setup

    const state = useSelector((state) => state)

    const [cardContent, setCardContent] = useState({
        cardStatus:"shrinked",
        cardTitle: "Featured Sales",
        cardDescription: "Check out our limited time sales!",
        cardData: "",
        cardContentAlignment:"right",
        cardButtonName:"sales",
        cardButtonText:"View Featured Sales"
    })
    const [count, setCount] = useState(1)

    const toogleExtenssion = (name) => {

        if (name === "sales" || count) {
            
            let newCardStatus, newButtonText

            cardContent.cardStatus === "shrinked" ? newCardStatus = "extended" : newCardStatus = "shrinked"
            cardContent.cardStatus === "shrinked" ? newButtonText = "Collapse" : newButtonText = "View Featured Sales" 
            
            let newCardContent = cardContent
            newCardContent.cardStatus = newCardStatus
            newCardContent.cardButtonText = newButtonText

            setCardContent(cardContent =>{
                cardContent = newCardContent
                return cardContent
            })
            setCount(count => count +1 )
        }
        else return
    }

    useEffect(() => {
        setCardContent(cardContent =>{
            let newCardContent = cardContent
            newCardContent.cardStatus = "shrinked"
            newCardContent.cardButtonText = "Read More"
            cardContent = newCardContent
            return cardContent
        })
    }, [state.appView])


    return (
        <div className="homepage-section-container" style={{ backgroundImage: "url('/img/wall_of_guitars.jpg')"}}>
            <div className="homepage-section-cardContainer">
                <HomePageCard 
                cardContent = {cardContent}
                toogleExtenssion = {toogleExtenssion}
                />
            </div>
        </div>
    )
}

export default Sales
