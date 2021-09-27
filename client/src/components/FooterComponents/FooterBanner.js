import React from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { appViewActionCreators } from '../../state/index'
import './../../styles/footer/footerBanner.css'

function FooterBanner() {

    //Redux action creators import
  
    const dispatch = useDispatch()

    const {modifyAppView} = bindActionCreators(appViewActionCreators, dispatch)

    //HomePage Request on Home button click

    const homePageRequest = () => {
        const appView = {
            activePage: "homepage",
            activeProductPage: "",
            activeSummary: ""
        }
        modifyAppView(appView)
    }

    return (
        <div>
            <div className="footerBanner-background">
                <div className="footerBanner-background-1"><div></div></div>
                <div></div>
                <div className="footerBanner-background-3"><div></div></div>
            </div>
            <div className="footerBanner-contentContainer">
                <div className="footerBanner-logo">
                    <button onClick= {()=>homePageRequest()}><img src="img/Logo2.PNG" alt="logo"/></button>
                </div>
                <div className="footerBanner-legalMentions">
                    <span><a href="/">Terms of service</a></span>
                    <p>2021 - The Rocker's Cave</p>
                </div>
                <div></div>
            </div>
        </div>
        
    )
}

export default FooterBanner
