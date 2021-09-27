import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { authActionCreators, appViewActionCreators, errorActionCreators } from '../../../state/index'

import './../../../styles/body/accountPageComponents/userInformationCard.css'

function UserInformationCard() {

    //State retrieval

    const state = useSelector((state) => state)

    const user = state.auth.user

    //Redux action creators set-up

    const dispatch = useDispatch()

    const {userLogout, updateUserInfo} = bindActionCreators(authActionCreators, dispatch)
    const {modifyAppView} = bindActionCreators(appViewActionCreators, dispatch)
    const {clearErrors} = bindActionCreators(errorActionCreators, dispatch)

    //Username state and modification function

    const [newUsername, setNewUsername] = useState({
        userName: ""
    })

    const usernameChange = (e) => {
        setNewUsername(newUsername => ({...newUsername, [e.target.name] : e.target.value}))
    }

    const onNewUsernameSubmit = async () => {
        clearErrors()
        updateUserInfo( user._id, newUsername)
        setNewUsername({
            userName: ""
        })
    }

    //Username state and modification function

    const [newEmail, setNewEmail] = useState({
        email: ""
    })

    const emailChange = (e) => {
        setNewEmail(newEmail => ({...newEmail, [e.target.name] : e.target.value}))
    }
    
    const onNewEmailSubmit = () => {
        clearErrors()
        updateUserInfo( user._id, newEmail)
        setNewEmail({
            email: ""
        })
    }

    //User address state and modification function

    const [newAddress, setNewAddress] = useState({
        userShippingAddress: "",
        userZipCode: "",
        userCity: "",
        userCountry: ""
    })

    const addressChange = (e) => {

        setNewAddress(newAddress => ({...newAddress, [e.target.name] : e.target.value}))
    }
    
    const onAddressSubmit = () => {
        clearErrors()
        let addressModification = {}
        if (newAddress.userShippingAddress !== ""){
            addressModification.userShippingAddress = newAddress.userShippingAddress
        }
        if (newAddress.userZipCode !== ""){
            addressModification.userZipCode = newAddress.userZipCode
        }
        if (newAddress.userCity !== ""){
            addressModification.userCity = newAddress.userCity
        }
        if (newAddress.userCountry !== ""){
            addressModification.userCountry = newAddress.userCountry
        }
        updateUserInfo( user._id, addressModification)
        setNewAddress({
            userShippingAddress: "",
            userZipCode: "",
            userCity: "",
            userCountry: ""
        })
    }

    //User password state and modification function

    const [newPassword, setNewPassword] = useState({
        password: "",
        newPassword: "",
        newPasswordVerif: "",
    })
    
    const passwordChange = (e) => {
        setNewPassword(newPassword => ({...newPassword, [e.target.name] : e.target.value}))
    }
        
    const onPasswordSubmit = () => {
        clearErrors()
        updateUserInfo( user._id, newPassword)
        setNewPassword({
            password: "",
            newPassword: "",
            newPasswordVerif: "",
        })
    }

    //Logout function

    const logout = async () => {
        userLogout()
    }

    useEffect(() => {
        if (state.auth.isAuthenticated === false) {
            const appView = {
            activePage: "homepage",
            activeProductPage: "",
            activeSummary: ""
            }
            modifyAppView(appView)
        } else return
    }, [state.auth.isAuthenticated])


    return (
        <div className ="accountInformationPage-userInfomationCard-container">
            <div className ="userInfomationCard-sectionContainer headerSection">
                <p>Hi {user.userName} !</p>
                <p className={state.error.status === 200 ? "success-message" : "success-message hidden"}>Modification successful</p>
            </div>
            <div className ="userInfomationCard-sectionContainer userNameSection">
                <p className="userInfomationCard-sectionHeader">Username</p>
                <p className={state.error.msg.msg === "A user is already registered with this Username" ? "error-message" : "error-message hidden"}>{state.error.msg.msg}</p>
                <div className="userInfomationCard-sectionContent">
                    <span>Current username : </span>
                    <input className="formInput" name="userName" value={newUsername.userName} onChange={(e)=> usernameChange(e)} placeholder={user.userName}></input>
                    <button className="btn btn-green btn-aligned-top-right userInfoSubmit" onClick={() => onNewUsernameSubmit()}>Update</button>
                </div>
            </div>
            <div className ="userInfomationCard-sectionContainer emailSection">
                <p className="userInfomationCard-sectionHeader">E-mail</p>
                <p className={state.error.msg.msg === "A user is already registered with this E-mail" ? "error-message" : "error-message hidden"}>{state.error.msg.msg}</p>
                <div className="userInfomationCard-sectionContent">
                    <span>Current E-mail : </span>
                    <input className="formInput" name="email" value={newEmail.email} onChange={(e)=> emailChange(e)} placeholder={user.email}></input>
                    <button className="btn btn-green btn-aligned-top-right userInfoSubmit" onClick={() => onNewEmailSubmit()}>Update</button>
                </div>
            </div>
            <div className ="userInfomationCard-sectionContainer shippingInformationSection">
                <p className="userInfomationCard-sectionHeader">Shipping information</p>
                <div className="userInfomationCard-sectionContent multipleLineForm">
                    <span>Shipping address : </span>
                    <input className="formInput" name="userShippingAddress" value={newAddress.userShippingAddress} onChange={(e)=> addressChange(e)} placeholder={user.userShippingAddress ? user.userShippingAddress : ""}></input>
                    <span>Zip code : </span>
                    <input className="formInput" name="userZipCode" value={newAddress.userZipCode} onChange={(e)=> addressChange(e)} placeholder={user.userZipCode ? user.userZipCode : ""}></input>
                    <span>City : </span>
                    <input className="formInput" name="userCity" value={newAddress.userCity} onChange={(e)=> addressChange(e)} placeholder={user.userCity ? user.userCity : ""}></input>
                    <span>Country : </span>
                    <input className="formInput" name="userCountry" value={newAddress.userCountry} onChange={(e)=> addressChange(e)} placeholder={user.userCountry ? user.userCountry : ""}></input>
                    <div>
                        <div>
                            <button className="btn btn-green btn-aligned-top-right userInfoSubmit" onClick={() => onAddressSubmit()}>Update</button>
                        </div> 
                    </div>
                    
                </div>    
            </div>
            <div className ="userInfomationCard-sectionContainer passwordSection">
                <p className="userInfomationCard-sectionHeader">Passwords</p>
                <p className={state.error.msg.msg === "Please complete all fields" ? "error-message" : "error-message hidden"}>{state.error.msg.msg}</p>
                <p className={state.error.msg.msg === "Passwords do not match" ? "error-message" : "error-message hidden"}>{state.error.msg.msg}</p>
                <p className={state.error.msg.msg === "Invalid credentials" ? "error-message" : "error-message hidden"}>{state.error.msg.msg}</p>
                <div className="userInfomationCard-sectionContent multipleLineForm">
                    <span>Current password : </span>
                    <input className="formInput" type="password" name="password" value={newPassword.password} onChange={(e)=> passwordChange(e)}></input>
                    <span>New password : </span>
                    <input className="formInput" type="password" name="newPassword" value={newPassword.newPassword} onChange={(e)=> passwordChange(e)}></input>
                    <span>Verify password : </span>
                    <input className="formInput" type="password" name="newPasswordVerif" value={newPassword.newPasswordVerif} onChange={(e)=> passwordChange(e)}></input>
                    <div>
                        <div>
                            <button className="btn btn-green btn-aligned-top-right userInfoSubmit" onClick={() => onPasswordSubmit()}>Update</button>
                        </div> 
                    </div>
                </div>       
            </div>
            <div className ="userInfomationCard-sectionContainer footerSection">
                <p className="userInfomationCard-sectionHeader footerSection"> </p>
                    <button className="btn btn-red" onClick={logout}>Log Out</button>   
            </div>
            
        </div>
    )
}

export default UserInformationCard
