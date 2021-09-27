import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import useWindowDimensions from '../../customHooks/WindowSizeHook'
import Sales from './HomePageComponents/Sales'
import Shop from './HomePageComponents/Shop'
import Staff from './HomePageComponents/Staff'
import './../../styles/body/homePage.css'

function HomePage() {

    //Redux state

    const state = useSelector((state) => state)

    //determining the number of reverb promotions to display

    const { width } = useWindowDimensions();

    const [promoToDisplay, setPromoToDiplay] = useState(2)

    useEffect(() => {
        if (width <= 450) {
            setPromoToDiplay(promoToDisplay => {
                promoToDisplay = 1
                return promoToDisplay
            }) 
        }
        else if (width <= 550) {
            setPromoToDiplay(promoToDisplay => {
                promoToDisplay = 2
                return promoToDisplay
            })   
        }
        else if (width <= 650) {
            setPromoToDiplay(promoToDisplay => {
                promoToDisplay = 3
                return promoToDisplay
            })
        }
        else if (width <= 750) {
            setPromoToDiplay(promoToDisplay => {
                promoToDisplay = 4
                return promoToDisplay
            })
        }
        else if (width <= 850) {
            setPromoToDiplay(promoToDisplay => {
                promoToDisplay = 5
                return promoToDisplay
            })
        }
        else if (width <= 950) {
            setPromoToDiplay(promoToDisplay => {
                promoToDisplay = 6
                return promoToDisplay
            })
        }
    }, [promoToDisplay, width])

    return (
        <div className={state.appView.activePage ==="homepage" ? "homepage-container" : "homepage-container hidden"}>
            <Sales/>
            <div className="homepage-break">
                <p className="quote">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor."</p>
                <p className="author"> - Eric Clapton</p>
            </div>
            <Shop/>
            <div className="homepage-break">
                <p className="quote">"Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim."</p>
                <p className="author"> - Les Paul</p>
            </div>
            <Staff/>
            <div className = "reverb">
                <p>Looking for used gear? Check out our partner!</p>
                <a href="https://reverb.com/"><img src="img/reverb2.png" className="img" alt="reverb"></img></a>
            </div>
            <div
            data-reverb-embed-handpicked
            data-reverb-collection-name="deals"
            data-reverb-search-per-page={Math.round(width/300)}
            data-reverb-currency="USD"
            className="reverb-offers">
            </div>
        </div>
    )
}

export default HomePage
