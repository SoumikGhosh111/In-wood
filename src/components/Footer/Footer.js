import React,{useState} from 'react';
import "./Footer.css"; 
import Backdrop from '@mui/material/Backdrop';
import PolicyPopup from '../PolicyPopup/PolicyPopup';

function Footer() {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(''); 

    const termsAndServices = `Terms and Conditions for Inwood Pizza LLC
    1. Introduction

    Welcome to Inwood Pizza LLC ("Website"). These terms and conditions ("Terms") govern 
    your use of our Website and the services provided by Inwood Pizza LLC ("we," "us," "our"). 
    By accessing or using our Website, you agree to comply with and be bound by these Terms. 
    If you do not agree with these Terms, please do not use our Website.


    2. Use of the Website

    You must be at least 18 years old to use this Website. By using this Website, you warrant 
    that you have the right, authority, and capacity to enter into these Terms and abide by all of 
    the terms and conditions set forth herein.


    3. Ordering and Payment

    Order Placement: Orders can be placed through our Website or via phone. You are 
    responsible for ensuring the accuracy of your order.
    Pricing: All prices listed on our Website are in USD and are subject to change without 
    notice. Prices include applicable taxes unless stated otherwise.
    Payment: Payment must be made at the time of ordering using the provided payment 
    methods. We accept Apple Pay, Google Pay, Visa, MasterCard, PayPal, and other major 
    credit and debit cards.
    Confirmation: Upon receiving your order, we will send a confirmation email. If you do not 
    receive a confirmation, please contact us immediately.


    4. Delivery and Pickup

    Delivery Area: We deliver within a specific area, as listed on our Website. Orders outside 
    this area may not be accepted.
    Delivery Time: Estimated delivery times are provided at the time of order. While we strive to 
    meet these times, we are not liable for any delays.
    Pickup: You may choose to pick up your order at our designated location. Please bring a 
    copy of your order confirmation.


    5. Cancellation and Refunds

    Cancellation Policy: Orders can be canceled within 30 minutes of placing the order for a 
    full refund. After this period, cancellations may not be possible.
    Refunds: Refunds will be processed for canceled orders, incorrect orders, or if the product 
    delivered is not as described. Refunds will be issued to the original payment method within 
    5 business days.


    6. Allergens and Dietary Requirements

    Allergen Information: We provide information about allergens present in our products on 
    our Website. It is your responsibility to review this information if you have any food 
    allergies.
    Dietary Requirements: While we strive to accommodate dietary preferences, we cannot 
    guarantee that our products are free from cross-contamination.


    7. Intellectual Property

    Ownership: All content on our Website, including text, graphics, logos, images, and 
    software, is the property of Inwood Pizza LLC or its licensors.
    License: We grant you a limited, non-exclusive, non-transferable license to access and use 
    the Website for personal and non-commercial purposes.


    8. Limitation of Liability

    Disclaimer: The Website and services are provided "as is" without any warranties of any 
    kind, either express or implied.
    Limitation: To the maximum extent permitted by law, Inwood Pizza LLC shall not be liable 
    for any indirect, incidental, or consequential damages arising from the use of our Website 
    or services.


    9. Privacy Policy

    Data Collection: We collect personal information in accordance with our Privacy Policy. By 
    using our Website, you consent to such data collection and usage.
    Cookies: Our Website uses cookies to enhance user experience. By using our Website, you 
    agree to our use of cookies.


    10. Governing Law

    These Terms shall be governed by and construed in accordance with the laws of the State 
    of New York, without regard to its conflict of law principles.


    11. Changes to Terms

    We reserve the right to modify these Terms at any time. Any changes will be effective 
    immediately upon posting on our Website. Your continued use of the Website constitutes 
    acceptance of the modified Terms.


    12. Contact Us

    If you have any questions about these Terms, please contact us at:
    Inwood Pizza LLC
    179 Sherman Ave.
    New York, NY 10034
    646-372-2047
    May 22, 2024
    By using our Website, you acknowledge that you have read, understood, and agree to be 
    bound by these Terms and Conditions.
    Inwood Pizza LLC
    179 Sherman Ave.
    New York, NY 10034
    646-372-2047
    May 22, 2024`

    const privacyPolicy = `Privacy Policy for Inwood Pizza LLC
    Introduction

    Inwood Pizza LLC ("we," "us," "our") values your privacy. This Privacy Policy explains how 
    we collect, use, disclose, and protect your personal information when you visit our website 
    ("Website"), place orders, or otherwise interact with us. By using our Website or services, 
    you agree to the collection and use of information in accordance with this policy.


    1. Information We Collect

    We collect various types of information in connection with the services we provide, 
    including:
    Personal Information:
    Name
    Address
    Email address
    Phone number
    Payment information (e.g., credit card details)
    Non-Personal Information:
    Browser type
    IP address
    Operating system
    Pages visited on our Website
    Time and date of visits
    Referring website addresses


    2. How We Use Your Information

    We use the information we collect for various purposes, including to:
    Process and fulfill your orders
    Communicate with you regarding your orders, including order confirmations and delivery 
    updates
    Improve our products, services, and customer service
    Send you promotional materials and offers, with your consent
    Analyze Website usage and trends to enhance your experience
    Prevent fraudulent transactions and monitor against theft


    3. Sharing Your Information

    We may share your personal information with third parties in the following circumstances:
    Service Providers: We may share your information with trusted third-party service providers 
    who assist us in operating our Website, conducting our business, or servicing you, so long 
    as those parties agree to keep this information confidential.
    Legal Requirements: We may disclose your information if required to do so by law or in 
    response to valid requests by public authorities (e.g., a court or a government agency).
    Business Transfers: In the event of a merger, acquisition, or sale of all or a portion of our 
    assets, your personal information may be transferred to the acquiring entity.


    4. Cookies and Tracking Technologies

    We use cookies and similar tracking technologies to track activity on our Website and store 
    certain information. Cookies are files with a small amount of data which may include an 
    anonymous unique identifier. You can instruct your browser to refuse all cookies or to 
    indicate when a cookie is being sent. However, if you do not accept cookies, you may not 
    be able to use some portions of our Website.


    5. Data Security

    We implement a variety of security measures to maintain the safety of your personal 
    information. However, please be aware that no method of transmission over the internet or 
    method of electronic storage is 100% secure. While we strive to use commercially 
    acceptable means to protect your personal information, we cannot guarantee its absolute 
    security.


    6. Your Choices

    Opt-Out: You may opt out of receiving promotional emails from us by following the 
    unsubscribe instructions provided in those emails.
    Access and Update: You have the right to access and update your personal information. If 
    you wish to review or update your information, please contact us at the information 
    provided below.
    Do Not Track: Our Website does not currently respond to "Do Not Track" signals.


    7. Children's Privacy

    Our services are not intended for individuals under the age of 13. We do not knowingly 
    collect personal information from children under 13. If we become aware that we have 
    inadvertently received personal information from a visitor under the age of 13, we will 
    delete the information from our records.


    8. Changes to This Privacy Policy
    
    We may update our Privacy Policy from time to time. We will notify you of any changes by 
    posting the new Privacy Policy on this page and updating the "Effective Date" at the bottom 
    of this policy. You are advised to review this Privacy Policy periodically for any changes.


    9. Contact Us
    
    If you have any questions about this Privacy Policy, please contact us:
    Inwood Pizza LLC
    179 Sherman Ave.
    New York, NY 10034
    Phone: 646-372-2047
    Email: [Your Email Address]
    Effective Date: May 22, 2024
    By using our Website, you acknowledge that you have read, understood, and agree to be 
    bound by this Privacy Policy.`
    const handleOpen = (id) => { 
        setOpen(true); 
        if(id === 1){ 
            setData(termsAndServices); 
        }
        if(id === 2){ 
            setData(privacyPolicy); 
        }
    }
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
                                < a className='abled' onClick={() => handleOpen(1)}>Terms &amp; Conditions</a>
                            </li>
                            <li>
                                <a className='disabled'>About Licences</a>
                            </li>
                            {/* <li>
                                <a href="#">Help &amp; Support</a>
                            </li> */}
                            <li>
                                <a className='abled' onClick={() => handleOpen(2)}>Privacy Policy</a>
                            </li>
                            {/* <li>
                                <a href="#">Community &amp; Forum</a>
                            </li> */}
                            <Backdrop
                                sx={{ color: '#000', zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: "rgba(0, 0, 0, 0.238)" }}
                                open={open}
                                onClick ={() => setOpen(false)}
                            >
                                <PolicyPopup data={data}  />
                            </Backdrop>
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