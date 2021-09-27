import React from 'react'
import './../../styles/footer/footerNavbar.css'

function FooterNavbar({setActiveTab}, activeTab) {

    const onTabClick = (tab) => {
        setActiveTab(tab)
    }

    return (
        <div>
            <div className ="footerNavbar">
                <div className ={activeTab === "socialMedia" ? "footerNavbar-findUs activeFooterTab" : "footerNavbar-findUs"} onClick= {()=>onTabClick("findUs")}>
                    <span>Find us</span>
                </div>
                <div className ={activeTab === "socialMedia" ? "footerNavbar-contactUs activeFooterTab" : "footerNavbar-contactUs"} onClick= {()=>onTabClick("contactUs")}>
                    <span>Contact us</span>
                </div>
                <div className ={activeTab === "socialMedia" ? "footerNavbar-socialMedia activeFooterTab" : "footerNavbar-socialMedia"} onClick= {()=>onTabClick("socialMedia")}>
                    <span>Social Media</span>
                </div>
            </div>
        </div>
    )
}

export default FooterNavbar
