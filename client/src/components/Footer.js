import React, { useState } from 'react'
import FooterBanner from './FooterComponents/FooterBanner'
import FooterBody from './FooterComponents/FooterBody'
import FooterNavbar from './FooterComponents/FooterNavbar'
import './../styles/footer/footer.css'

function Footer() {

    const [activeTab, setActiveTab] = useState('findUs')

    return (
        <div>
            <footer>
                <FooterNavbar setActiveTab={setActiveTab} activeTab={activeTab}/>
                <FooterBody activeTab={activeTab}/>
                <FooterBanner/>
            </footer> 
        </div>
    )
}

export default Footer
