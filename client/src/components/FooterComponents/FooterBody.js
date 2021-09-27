import React from 'react'
import './../../styles/footer/footerBody.css'
import GoogleMaps from './GoogleMaps'

function FooterBody({activeTab}) {
    return (
        <div className ="footerBody">
            <span className={activeTab === "findUs" ? "footerBody-findUs footerBody-contentContainer activeFooterContent" : "footerBody-findUs footerBody-contentContainer"}>
                <div className="footerBody-content">
                    <div className="footerbody-container findUs">
                        <div className="footerbody-findUs-container">
                            <div>
                                <GoogleMaps/>
                            </div>
                            <div className="footerbody-address-container">
                                <h3>Store address</h3>
                                <p>22 Accacia Avenue</p>
                                <p>67000 Strasbourg</p>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
            <div className={activeTab === "contactUs" ? "footerBody-contactUs footerBody-contentContainer activeFooterContent" : "footerBody-contactUs footerBody-contentContainer"}>
                <div className="footerBody-content">
                    <div className="footerbody-container">
                        <div className="footerbody-contactUs-container">
                            <h3>Any questions? Feel free to contact us!</h3>
                            <a href="tel:+33 3 00 00 00 00">Phone : +33 3 00 00 00 00</a>
                            <a href="mailto:willy2.favrot@gmail.com">Send us an e-mail</a>
                        </div>
                    </div>
                </div>
            </div>
            <div  className={activeTab === "socialMedia" ? "footerBody-socialMedia footerBody-contentContainer activeFooterContent" : "footerBody-socialMedia footerBody-contentContainer"}>
                <div className="footerBody-content">
                    <div className="footerbody-container">
                        <div className="footerbody-socialMedia-container">
                            <h3>Follow us on social media!</h3>
                            <p><a href='https://www.facebook.com/'><img src="img/facebook.png" alt="facebook"/><span>Facebook</span></a></p>
                            <p><a href='https://www.twitter.com/'><img src="img/twitter.png" alt="twitter"/><span>Twitter</span></a></p>
                            <p><a href='https://www.instagram.com/'><img src="img/instagram.png" alt="instagram"/><span>Instagram</span></a></p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FooterBody
