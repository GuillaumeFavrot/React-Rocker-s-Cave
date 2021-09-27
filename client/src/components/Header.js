import React from 'react'
import HeaderBanner from './HeaderComponents/HeaderBanner'
import HeaderNavbar from './HeaderComponents/HeaderNavbar'
import './../styles/header/header.css'

function Header() {
    
    return (
        <div>
            <header>
                <HeaderBanner/>
                <HeaderNavbar/>
            </header>  
        </div>
        
    )
}

export default Header
