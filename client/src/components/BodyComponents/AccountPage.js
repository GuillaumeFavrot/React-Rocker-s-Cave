import React from 'react'
import { useSelector } from 'react-redux'
import './../../styles/body/accountPage.css'
import AccountInformationPage from './AccountPageComponents/AccountInformationPage'
import LoginPage from './AccountPageComponents/LoginPage'
import RegistrationPage from './AccountPageComponents/RegistrationPage'

function AccountPage() {
       
    //State retrieval

    const state = useSelector((state) => state)

    return (
        <div className={state.appView.activePage ==="accountPage" ? "accountPage-container" : "accountPage-container hidden"}>
            <RegistrationPage/>
            <LoginPage/>
            <AccountInformationPage/>
        </div>
    )
}

export default AccountPage
