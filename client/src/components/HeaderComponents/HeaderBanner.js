import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { appViewActionCreators, requestActionCreators } from '../../state/index'
import './../../styles/header/headerBanner.css'

function HeaderBanner() {
    
    //Redux state setup

    const state = useSelector((state) => state)

    //Redux action creators import
  
    const dispatch = useDispatch()

    const {modifyAppView} = bindActionCreators(appViewActionCreators, dispatch)
    const {createCustomRequest} = bindActionCreators(requestActionCreators, dispatch)

    //HomePage Request on Home button click

    const homePageRequest = () => {
        const appView = {
            activePage: "homepage",
            activeProductPage: "",
            activeSummary: ""
        }
        modifyAppView(appView)
    }

    //user information page section toogle function

    const onSectionSelection = () => {
        if(state.auth.isAuthenticated) {
            const appView = {
                activePage: "accountPage",
                activeProductPage: "", 
                activeSummary: "",
                activeAccountPage: "accountInformationPage",
                activeAccountPageSection: "cart"
            }
            modifyAppView(appView)
        }
        else {
            const appView = {
                activePage: "accountPage",
                activeProductPage: "", 
                activeSummary: "",
                activeAccountPage: "loginPage",
                activeAccountPageSection: ""
            }
            modifyAppView(appView)  
        }
    }

    //SearchBar function

    const [requestedString, setRequestedString] = useState("")

    const onChange = (e) => {
        setRequestedString(e.target.value)
    }

    const onClick = (e) => {
        e.preventDefault()
        const appView = {
            activePage: "Productpage",
            activeProductPage: "Summary", 
            activeSummary: "",
            activeAccountPage: "",
            activeAccountPageSection: ""
        }
        modifyAppView(appView)
        createCustomRequest(requestedString)
        setRequestedString("")
    }

    return (
        <div>
            <div className ="headerBanner-background">
                <div className = "headerBanner-background-1"><div></div></div>
                <div></div>
                <div className = "headerBanner-background-3"><div></div></div>
            </div>
            <div className ="headerBanner-contentContainer">
                <div className="headerBanner-logo">
                    <button onClick= {()=>homePageRequest()}><img src="img/Logo2.PNG" alt="logo"/></button>
                </div>
                <div className="headerBanner-searchBar">
                    <form action="POST">
                        <input type="text" name="search" placeholder="What are you looking for?" value={requestedString} onChange={(e) => onChange(e)}/>
                        <button type="submit" onClick = {(e) => onClick(e)}><i className="fa fa-search"></i></button>
                    </form>
                </div>
                <div className="headerBanner-cart">
                    <button onClick= {()=>onSectionSelection()}>
                        <i className="fa fa-shopping-cart"></i>
                    </button>
                </div>
            </div>

        </div>
        
    )
}

export default HeaderBanner
