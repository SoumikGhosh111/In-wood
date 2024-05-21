import React from 'react';
import "./Footer.css"

function Footer() {
    return (
        <div className='body'>
            <footer className="footer">
                <div className="footer-container">
                    <div className="about">
                        <h2>About Us</h2>
                        <p>
                            It includes rich features &amp; contents. It's designed &amp;
                            developed based on One Page/ Multi-page Layout, blog themes, world
                            press themes, and blogspot. You can use any layout from any demo
                            anywhere.
                        </p>
                        <p>
                            webblogoverflow is completely creative, clean &amp; 100% responsive
                            website. Put your business into next level with Webublogoverflow.
                        </p>

                        <div className="footer-section social">
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
                        </div>
                    </div>
                    <div className="footer-section links">
                        <h2>Important Links</h2>
                        <ul>
                            <li>
                                <a href="#">Terms &amp; Conditions</a>
                            </li>
                            <li>
                                <a href="#">About Licences</a>
                            </li>
                            <li>
                                <a href="#">Help &amp; Support</a>
                            </li>
                            <li>
                                <a href="#">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#">Community &amp; Forum</a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-section contact">
                        <h2>Quick Contact</h2>
                        <p>
                            Phone:
                            <br />
                            <br /> <br />
                            +255 789 54 50 40
                            <br /> +2255 766 90 94 00
                        </p>
                        <br />
                        <p>
                            Email:
                            <br /> <br />
                            <a href="mailto:support@webblogoverflow.com">
                                support@webblogoverflow.com
                            </a>{" "}
                            <a href="mailto:luckmoshy@gmail.com">luckmoshy@gmail.com</a>
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
                    © All Rights Reserved by inwoodpizza.com - (with all love)
                </p>
            </div>
        </div>

    )
}

export default Footer