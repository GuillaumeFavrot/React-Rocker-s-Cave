import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import HomePageCard from './HomePageCard'

function Staff() {

    //redux state setup

    const state = useSelector((state) => state)

    const [cardContent, setCardContent] = useState({
        cardStatus:"shrinked",
        cardTitle: "Our Staff",
        cardDescription: "Cras vestibulum bibendum augue. Praesent egestas leo in pede.",
        cardData: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
        cardContentAlignment:"right",
        cardButtonName:"staff",
        cardButtonText:"Read More"
    })

    const [count, setCount] = useState(0)

    const toogleExtenssion = (name) => {

        if (name === "staff"  || count) {

            let newCardStatus, newButtonText

            cardContent.cardStatus === "shrinked" ? newCardStatus = "extended" : newCardStatus = "shrinked"
            cardContent.cardStatus === "shrinked" ? newButtonText = "Collapse" : newButtonText = "Read More" 

            setCardContent(cardContent =>{
                let newCardContent = cardContent
                newCardContent.cardStatus = newCardStatus
                newCardContent.cardButtonText = newButtonText
                return newCardContent
            })
            setCount(count => count +1)
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
        <div className="homepage-section-container" style={{ backgroundImage: "url('/img/staff.jpeg')"}}>
            <div className="homepage-section-cardContainer">
                <HomePageCard 
                cardContent = {cardContent} 
                toogleExtenssion = {toogleExtenssion}
                />
            </div>
        </div>
    )
}

export default Staff
