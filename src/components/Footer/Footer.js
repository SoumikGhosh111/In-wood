import React from 'react';
import "./Footer.css"

function Footer() {
    return (
        // <div>
        //     {/*Important link source from https://bootsnipp.com/snippets/X2XOv*/}
        //     <link
        //         href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
        //         rel="stylesheet"
        //         id="bootstrap-css"
        //     />
        //     {/*---- Include the above in your HEAD tag --------*/}
        //     {/*footer*/}
        //     <footer className="kilimanjaro_area">
        //         {/* Top Footer Area Start */}
        //         <div className="foo_top_header_one section_padding_100_70" >
        //             <div className="container">
        //                 <div className="row">
        //                     <div className="col-12 col-md-6 col-lg-6">
        //                         <div className="kilimanjaro_part">
        //                             <h5>About Us</h5>
        //                             <p style={{textAlign: "justify"}}>
        //                                 It includes rich features &amp; contents. It's designed &amp;
        //                                 developed based on One Page/ Multi-page Layout,blog themes,world
        //                                 press themes and blogspot. You can use any layout from any demo
        //                                 anywhere.
        //                             </p>
        //                             <p>
        //                                 webblogoverflow is completely creative, clean &amp; 100%
        //                                 responsive website. Put your business into next level with
        //                                 Webublogoverflow.
        //                             </p>
        //                         </div>
        //                         <div className="kilimanjaro_part m-top-15">
        //                             <h5>Social Links</h5>
        //                             <ul className="kilimanjaro_social_links">
        //                                 <li>
        //                                     <a href="#">
        //                                         <i className="fa fa-facebook" aria-hidden="true" /> Facebook
        //                                     </a>
        //                                 </li>&nbsp;
        //                                 <li>
        //                                     <a href="#">
        //                                         <i className="fa fa-twitter" aria-hidden="true" /> Twitter
        //                                     </a>
        //                                 </li>&nbsp;
        //                                 <li>
        //                                     <a href="#">
        //                                         <i className="fa fa-pinterest" aria-hidden="true" />{" "}
        //                                         Pinterest
        //                                     </a>
        //                                 </li>&nbsp;
        //                                 <li>
        //                                     <a href="#">
        //                                         <i className="fa fa-youtube" aria-hidden="true" /> YouTube
        //                                     </a>
        //                                 </li>&nbsp;
        //                                 <li>
        //                                     <a href="#">
        //                                         <i className="fa fa-linkedin" aria-hidden="true" /> Linkedin
        //                                     </a>
        //                                 </li>
        //                             </ul>
        //                         </div>
        //                     </div>
        //                     <div className="col-12 col-md-6 col-lg-3">
        //                         {/* <div className="kilimanjaro_part">
        //                             <h5>Tags Widget</h5>
        //                             <ul className=" kilimanjaro_widget">
        //                                 <li>
        //                                     <a href="#">Classy</a>
        //                                 </li>
        //                                 <li>
        //                                     <a href="#">Blog</a>
        //                                 </li>
        //                                 <li>
        //                                     <a href="#">Creative</a>
        //                                 </li>
        //                                 <li>
        //                                     <a href="#">One Page</a>
        //                                 </li>
        //                                 <li>
        //                                     <a href="#">Multipurpose</a>
        //                                 </li>
        //                                 <li>
        //                                     <a href="#">Minimal</a>
        //                                 </li>
        //                                 <li>
        //                                     <a href="#">Classic</a>
        //                                 </li>
        //                                 <li>
        //                                     <a href="#">Medical</a>
        //                                 </li>
        //                             </ul>
        //                         </div> */}
        //                         <div className="kilimanjaro_part m-top-0">
        //                             <h5>Important Links</h5>
        //                             <ul className="kilimanjaro_links">
        //                                 <li>
        //                                     <a href="#">
        //                                         <i className="fa fa-angle-right" aria-hidden="true" />
        //                                         Terms &amp; Conditions
        //                                     </a>
        //                                 </li>
        //                                 <li>
        //                                     <a href="#">
        //                                         <i className="fa fa-angle-right" aria-hidden="true" />
        //                                         About Licences
        //                                     </a>
        //                                 </li>
        //                                 <li>
        //                                     <a href="#">
        //                                         <i className="fa fa-angle-right" aria-hidden="true" />
        //                                         Help &amp; Support
        //                                     </a>
        //                                 </li>

        //                                 <li>
        //                                     <a href="#">
        //                                         <i className="fa fa-angle-right" aria-hidden="true" />
        //                                         Privacy Policy
        //                                     </a>
        //                                 </li>
        //                                 <li>
        //                                     <a href="#">
        //                                         <i className="fa fa-angle-right" aria-hidden="true" />
        //                                         Community &amp; Forum
        //                                     </a>
        //                                 </li>
        //                             </ul>
        //                         </div>
        //                     </div>
        //                     {/* <div className="col-12 col-md-6 col-lg-3">
        //                         <div className="kilimanjaro_part">
        //                             <h5>Latest News</h5>
        //                             <div className="kilimanjaro_blog_area">
        //                                 <div className="kilimanjaro_thumb">
        //                                     <img
        //                                         className="img-fluid"
        //                                         src="https://3.bp.blogspot.com/--C1wpaf_S4M/W7V__10nRoI/AAAAAAAAK24/1NSfapuYSIY0f0wzXY9NgoH0FjQLT07YACKgBGAs/s1600/maxresdefault.jpg"
        //                                         alt=""
        //                                     />
        //                                 </div>
        //                                 <a href="#">Your Blog Title Goes Here</a>
        //                                 <p className="kilimanjaro_date">21 Jan 2018</p>
        //                                 <p>Lorem ipsum dolor sit amet, consectetur</p>
        //                             </div>
        //                             <div className="kilimanjaro_blog_area">
        //                                 <div className="kilimanjaro_thumb">
        //                                     <img
        //                                         className="img-fluid"
        //                                         src="https://3.bp.blogspot.com/--C1wpaf_S4M/W7V__10nRoI/AAAAAAAAK24/1NSfapuYSIY0f0wzXY9NgoH0FjQLT07YACKgBGAs/s1600/maxresdefault.jpg"
        //                                         alt=""
        //                                     />
        //                                 </div>
        //                                 <a href="#">Your Blog Title Goes Here</a>
        //                                 <p className="kilimanjaro_date">21 Jan 2018</p>
        //                                 <p>Lorem ipsum dolor sit amet, consectetur</p>
        //                             </div>
        //                             <div className="kilimanjaro_blog_area">
        //                                 <div className="kilimanjaro_thumb">
        //                                     <img
        //                                         className="img-fluid"
        //                                         src="https://3.bp.blogspot.com/--C1wpaf_S4M/W7V__10nRoI/AAAAAAAAK24/1NSfapuYSIY0f0wzXY9NgoH0FjQLT07YACKgBGAs/s1600/maxresdefault.jpg"
        //                                         alt=""
        //                                     />
        //                                 </div>
        //                                 <a href="#">Your Blog Title Goes Here</a>
        //                                 <p className="kilimanjaro_date">21 Jan 2018</p>
        //                                 <p>Lorem ipsum dolor sit amet, consectetur</p>
        //                             </div>
        //                         </div>
        //                     </div> */}
        //                     <div className="col-12 col-md-6 col-lg-3">
        //                         <div className="kilimanjaro_part">
        //                             <h5>Quick Contact</h5>
        //                             <div className="kilimanjaro_single_contact_info">
        //                                 <h5>Phone:</h5>
        //                                 <p>
        //                                     +255 789 54 50 40 <br /> +2255 766 90 94 00
        //                                 </p>
        //                             </div>
        //                             <div className="kilimanjaro_single_contact_info">
        //                                 <h5>Email:</h5>
        //                                 <p>
        //                                     support@webblogoverflow.com <br /> luckmoshy@gmail.com
        //                                 </p>
        //                             </div>
        //                         </div>
        //                         {/* <div className="kilimanjaro_part">
        //                             <h5>Latest Works</h5>
        //                             <div className="kilimanjaro_works">
        //                                 <a className="kilimanjaro_works_img" href="img/gallery/1.jpg">
        //                                     <img src="img/gallery/1.jpg" alt="" />
        //                                 </a>
        //                                 <a className="kilimanjaro_works_img" href="img/gallery/4.jpg">
        //                                     <img src="img/gallery/4.jpg" alt="" />
        //                                 </a>
        //                                 <a className="kilimanjaro_works_img" href="img/gallery/5.jpg">
        //                                     <img src="img/gallery/5.jpg" alt="" />
        //                                 </a>
        //                                 <a className="kilimanjaro_works_img" href="img/gallery/7.jpg">
        //                                     <img src="img/gallery/7.jpg" alt="" />
        //                                 </a>
        //                                 <a className="kilimanjaro_works_img" href="img/gallery/10.jpg">
        //                                     <img src="img/gallery/10.jpg" alt="" />
        //                                 </a>
        //                                 <a className="kilimanjaro_works_img" href="img/gallery/11.jpg">
        //                                     <img src="img/gallery/11.jpg" alt="" />
        //                                 </a>
        //                             </div>
        //                         </div> */}
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //         {/* Footer Bottom Area Start */}
        //         <div className=" kilimanjaro_bottom_header_one section_padding_50 text-center">
        //             <div className="container">
        //                 <div className="row">
        //                     <div className="col-12">
        //                         <p style={{color: 'white'}}>
        //                             © All Rights Reserved by{" "}
        //                             <a href="#">
        //                                 Webublogoverflow.blogspot -(with all love)
        //                                 <i className="fa fa-love" />
        //                             </a>
        //                         </p>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </footer>
        // </div>
        <div className="footer">
            <div className="column">
                <h2>About Us</h2>
                <p>
                    It includes rich features &amp; contents. It's designed &amp;
                    developed based on One Page/ Multi-page Layout,blog themes,world
                    press themes and blogspot. You can use any layout from any demo
                    anywhere.


                    webblogoverflow is completely creative, clean &amp; 100%
                    responsive website. Put your business into next level with
                    Webublogoverflow.

                </p>
            </div>
            <div className="column">
                <h2>Important Links</h2>
                {/* <p>Links to important resources...</p> */}
                <ul className="kilimanjaro_links">
                    <li>
                        <a href="#">
                            <i className="fa fa-angle-right" aria-hidden="true" />
                            Terms &amp; Conditions
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fa fa-angle-right" aria-hidden="true" />
                            About Licences
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fa fa-angle-right" aria-hidden="true" />
                            Help &amp; Support
                        </a>
                    </li>

                    <li>
                        <a href="#">
                            <i className="fa fa-angle-right" aria-hidden="true" />
                            Privacy Policy
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fa fa-angle-right" aria-hidden="true" />
                            Community &amp; Forum
                        </a>
                    </li>
                </ul>
            </div>
            <div className="column">
                <h2>Quick Contacts</h2>
                {/* <p>Your contact information...</p> */}
                <div className="kilimanjaro_single_contact_info">
                    <h5>Phone:</h5>
                    <p>
                        +255 789 54 50 40 <br /> +2255 766 90 94 00
                    </p>
                </div>
                <div className="kilimanjaro_single_contact_info">
                    <h5>Email:</h5>
                    <p>
                        support@webblogoverflow.com <br /> luckmoshy@gmail.com
                    </p>
                </div>
            </div>
        </div>
        // </div >




    )
}

export default Footer