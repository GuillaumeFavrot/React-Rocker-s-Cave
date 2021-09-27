import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { appViewActionCreators, authActionCreators, errorActionCreators } from './../../../state/index'

import './../../../styles/body/accountPageComponents/loginPage.css'

function LoginPage() {

    //State retrieval

    const state = useSelector((state) => state)

    //Redux action creators call

    const dispatch = useDispatch()

    const {login} = bindActionCreators(authActionCreators, dispatch)
    const {clearErrors} = bindActionCreators(errorActionCreators, dispatch)
    const {modifyAppView} = bindActionCreators(appViewActionCreators, dispatch)

    //LocalState

    let initialState = {
        email: "",
        password: "",
    }

    const [loginInformations, setLoginInformations] = useState({
        email: "",
        password: "",
    })
    
    //login information modification function

    const onChange = (e) => {
        setLoginInformations(loginInformations => ({...loginInformations, [e.target.name]: e.target.value}))
    }    
    
    //Login submit function

    const loginSubmit = async (e) => {
        e.preventDefault()
        clearErrors()
        login(loginInformations)
        setLoginInformations(loginInformations => loginInformations = initialState)
    }

    useEffect(() => {
        if (state.auth.isAuthenticated === true) {
            const appView = {
            activePage: "homepage",
            activeProductPage: "",
            activeSummary: ""
            }
            modifyAppView(appView)
        } else return
    }, [state.auth.isAuthenticated])

    //RegistrationPage request

    const registrationPageRequest = () => {
        const appView = {
            activePage: "accountPage",
            activeProductPage: "",
            activeAccountPage: "registrationPage",
            activeSummary: ""
        }
        modifyAppView(appView)
    }

    return (
        <div className={state.appView.activeAccountPage ==="loginPage" ? "loginPage-container" : "loginPage-container hidden"}>
            <div className="loginPage-form-container">
                <p>Login</p>
                <div className={state.error.status === 400 ? "error-message" : "error-message hidden"}>{state.error.msg.msg}</div>
                <form onSubmit = {(e) => loginSubmit(e)}>
                    <p>Email:</p>
                    <input type="string" value={loginInformations.email} name="email" onChange ={(e) => onChange(e)}/>
                    <p>Password:</p>
                    <input type="password" value={loginInformations.password} name="password" onChange ={(e) => onChange(e)}/>
                    <button className="btn btn-green" type="submit">Log in</button>
                </form>
                
            </div>
            <div className="loginPage-toRegistrationPage-container">
                <p>New to the Rocker's Cave ?</p>
                <button onClick={registrationPageRequest} className="btn">Register now!</button>
            </div>
        </div>
    )
}

export default LoginPage
