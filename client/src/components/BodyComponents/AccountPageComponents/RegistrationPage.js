import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { authActionCreators, errorActionCreators, appViewActionCreators } from '../../../state/index'

import './../../../styles/body/accountPageComponents/registrationPage.css'

function RegistrationPage() {

    //State retrieval

    const state = useSelector((state) => state)
    
    //Redux action creators call

    const dispatch = useDispatch()
        
    const {register} = bindActionCreators(authActionCreators, dispatch)
    const {clearErrors} = bindActionCreators(errorActionCreators, dispatch)
    const {modifyAppView} = bindActionCreators(appViewActionCreators, dispatch)
    
    //LocalState

    const initialState = {
        userName: "",
        email: "",
        password: "",
        passwordVerif: ""
    }

    const [registrationInformations, setRegisterInformations] = useState({
        userName: "",
        email: "",
        password: "",
        passwordVerif: ""
    })

    //Registration information modification function

    const onChange = (e) => {
        setRegisterInformations(registrationInformations => ({...registrationInformations, [e.target.name]: e.target.value}))
    }   

    //Form submission function

    const formSubmit = (e) => {
        e.preventDefault()
        clearErrors()
        register(registrationInformations)
        setRegisterInformations(registrationInformations => registrationInformations = initialState)
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

    return (
        <div className={state.appView.activeAccountPage ==="registrationPage" ? "registrationPage-container" : "registrationPage-container hidden"}>
            <div className="registrationPage-form-container">
                <p className="registrationPage-form-title">Registration</p>
                <div className={state.error.status === 400 ? "error-message" : "error-message hidden"}>{state.error.msg.msg}</div>
                <form onSubmit={(e) => formSubmit(e)}>
                    <p>Email:</p>
                    <input type="string" value={registrationInformations.email} name="email" onChange ={(e) => onChange(e)}/>
                    <p>Username:</p>
                    <input type="string" value={registrationInformations.userName} name="userName" onChange ={(e) => onChange(e)}/>
                    <p>Password:</p>
                    <input type="password" value={registrationInformations.password} name="password" onChange ={(e) => onChange(e)}/>
                    <p>Verify your password:</p>
                    <input type="password" value={registrationInformations.passwordVerif} name="passwordVerif" onChange ={(e) => onChange(e)}/>
                    <button className="btn btn-green" type="submit">Submit</button>  
                </form>
            </div>
        </div>
    )
}

export default RegistrationPage
