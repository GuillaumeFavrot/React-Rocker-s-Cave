import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { requestActionCreators, appViewActionCreators } from '../../state/index'
import './../../styles/header/headerNavbar.css'

function HeaderNavbar() {

    //State retrieval

    const state = useSelector((state) => state)

    //Redux action creators call

    const dispatch = useDispatch()

    const {createNewRequest} = bindActionCreators(requestActionCreators, dispatch)

    const {modifyAppView} = bindActionCreators(appViewActionCreators, dispatch)

    //Product Page Request

    const onProductClick = (requestedProducts) => {
        createNewRequest(requestedProducts)
        toogleMenu()
        let pageRequest = {}
        switch (requestedProducts){
            case "Guitar":
                pageRequest ={
                    activePage : "Productpage",
                    activeProductPage : "Summary", 
                    activeSummary : "Guitars"
                }
                break
            case "Amp":
                pageRequest ={
                    activePage : "Productpage",
                    activeProductPage : "Summary", 
                    activeSummary : "Amps"
                }
                break
            case "Pedal":
                pageRequest ={
                    activePage : "Productpage",
                    activeProductPage : "Summary", 
                    activeSummary : "Pedals"
                }
                break
            case "Accessory":
                pageRequest ={
                    activePage : "Productpage",
                    activeProductPage : "Summary", 
                    activeSummary : "Accessories"
                }
                break
            default : break
        }
        modifyAppView(pageRequest)
    }
    
    //AccountPage request

    const accountPageRequest = () => {
        let pageRequest = {}
        if(state.auth.isAuthenticated) {
            pageRequest = {
                activePage: "accountPage",
                activeProductPage: "", 
                activeSummary: "",
                activeAccountPage: "accountInformationPage",
                activeAccountPageSection: "userInfo"
            }
        } else {
            pageRequest = {
                activePage: "accountPage",
                activeProductPage: "",
                activeSummary: "",
                activeAccountPage: "loginPage",
                activeAccountPageSection: ""
                
            }
        }
        modifyAppView(pageRequest)
    }

    //Main menu toogle function
    
    let [menuStatus, setMenuStatus] = useState(false)

    const toogleMenu = () => {
        let newMenuStatus
        if (menuStatus === false) {
            newMenuStatus = true 
        } else {
            newMenuStatus = false    
        }
        setMenuStatus(menuStatus = newMenuStatus)
    }

    return (
        <div>
            <div className ="headerNavbar-background">
                <div className="headerNavbar-background-1"><div></div></div>
                <span></span>
                <div className="headerNavbar-background-3"><div></div></div>
            </div>
            <div className="headerNavbar-contentContainer">
                <div className="headerNavbar-hamburgerMenu">
                    <label onClick={toogleMenu} className="headerNavbar-nav-toggle-label">
                        <span><i className="fa fa-bars"></i></span>
                    </label>
                </div>
                <input type="checkbox" className="headerNavbar-nav-toggle" id="nav-toggle"></input>
                <div className ={menuStatus === true ?"headerNavbar-mainMenu active" : "headerNavbar-mainMenu"}>
                    <nav>
                        <ul>
                            <li><button className ={menuStatus === true ? "headerNavbar-mainMenu-btn active" : "headerNavbar-mainMenu-btn"} onClick= {()=>onProductClick("Guitar")}>Guitars</button></li>
                            <li><button className ={menuStatus === true ? "headerNavbar-mainMenu-btn active" : "headerNavbar-mainMenu-btn"} onClick= {()=>onProductClick("Amp")}>Amplification</button></li>
                            <li><button className ={menuStatus === true ? "headerNavbar-mainMenu-btn active" : "headerNavbar-mainMenu-btn"} onClick= {()=>onProductClick("Pedal")}>Pedals</button></li>
                            <li><button className ={menuStatus === true ? "headerNavbar-mainMenu-btn active" : "headerNavbar-mainMenu-btn"} onClick= {()=>onProductClick("Accessory")}>Accessories</button></li>
                        </ul>
                    </nav>
                </div>  
                <div className="headerNavbar-accountManagement">
                    <button onClick={accountPageRequest}>{state.auth.isAuthenticated ? "Account" : "Log In"}</button>
                </div>
            </div>
        </div>
    )
}

export default HeaderNavbar
