import React from 'react';
import "./Footer.css"

function Footer() {
    return (
        <div className='body'>
            <footer className="footer">
                <div className="footer-container">
                    <div className="about">
                        <h2>About Us</h2>
                        <p style={{ textAlign: 'justify' }}>
                        Inwood Pizza, located on Sherman Avenue since 2020, is where pizza craftsmanship meets creativity. Our dedicated pizza artisans blend time-honored traditions with unique twists to create classic New York-style pies. From hand-kneading the dough to simmering our signature tomato sauce, each slice tells its own flavorful story. Whether you’re satisfying late-night cravings or sharing cozy moments, Inwood Pizza is more than a place to eat; it’s a community cornerstone. Our regulars aren’t just patrons; they’re family, celebrating birthdays, graduations, proposals, and more with us. Hungry for a slice? Order online, and our speedy delivery team will bring the warmth of our brick oven straight to your door. Whether it’s game night or a family dinner, we’ve got you covered. Follow the tantalizing aroma of oregano, the buzz of happy chatter, and the irresistible allure of melted cheese. At Inwood Pizza, we’re not just a pizzeria; we’re a slice of life.  🍕


                        </p>
                        {/* <p>
                            webblogoverflow is completely creative, clean &amp; 100% responsive
                            website. Put your business into next level with Webublogoverflow.
                        </p> */}

                        <div className="footer-section social">
                            <h2>Social Links</h2>
                            <div className="social-links">
                                <p>
                                    <a href=" https://www.facebook.com/InwoodPizza/">Facebook</a>
                                </p>
                                <p>
                                    <span />
                                    <a href=" https://www.instagram.com/inwoodpizza/ ">Instagram</a>
                                </p>
                                {/* <p>
                                    <a href="#">Pinterest</a>
                                </p>
                                <p>
                                    <a href="#">YouTube</a>
                                </p>
                                <p>
                                    <a href="#">LinkedIn</a>
                                </p> */}
                            </div>
                        </div>
                    </div>
                    <div className="footer-section links">
                        <h2>Important Links</h2>
                        <ul>
                            <li>
                                <a >Terms &amp; Conditions</a>
                            </li>
                            <li>
                                <a >About Licences</a>
                            </li>
                            {/* <li>
                                <a href="#">Help &amp; Support</a>
                            </li> */}
                            <li>
                                <a >Privacy Policy</a>
                            </li>
                            {/* <li>
                                <a href="#">Community &amp; Forum</a>
                            </li> */}
                        </ul>
                    </div>
                    <div className="footer-section contact" >
                        <h2>Quick Contact</h2>
                        <p>
                            Phone:
                            <br />

                            <a href='tel:+1 (646) 642-9432'>+1 (646) 642-9432</a>
                        </p>
                        <br />
                        <p>
                            Email:
                            <br />
                            <a href="mailto:info@inwiodpizzallc.com">
                                info@inwiodpizzallc.com
                            </a>
                        </p>
                    </div>
                    {/* <div className="footer-section social">
                        <h2>Social Links</h2>
                        <div className="social-links">
                            <p>
                                <a href="#">Facebook</a>
                            </p>
                            <p>
                                <span />
                                <a href="#">Twitter</a>
                            </p>
                            <p>
                                <a href="#">Pinterest</a>
                            </p>
                            <p>
                                <a href="#">YouTube</a>
                            </p>
                            <p>
                                <a href="#">LinkedIn</a>
                            </p>
                        </div>
                    </div> */}
                </div>
            </footer>
            <div className="footer-bottom">
                <p style={{ textAlign: "center" }}>
                    © All Rights Reserved by inwoodpizzallc.com
                </p>
            </div>
        </div>

    )
}

export default Footer