import React from 'react'
import HomePage from './BodyComponents/HomePage'
import ProductPage from './BodyComponents/ProductPage'
import AccountPage from './BodyComponents/AccountPage'

import './../styles/body/body.css'

function Body({makeRequestApp}) {

    const retrieveFormerProducts = () => {
        makeRequestApp()
    }

    return (
        <div className="content">
            <div className="starting-break"/>
            <HomePage/>
            <ProductPage retrieveFormerProducts={retrieveFormerProducts}/>
            <AccountPage/>
            <div className="body-break"/>
        </div>
    )
}

export default Body
