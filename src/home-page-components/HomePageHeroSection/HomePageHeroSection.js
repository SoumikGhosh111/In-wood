import React, { useState, useRef, useEffect } from 'react';
import "./HomePageHeroSection.css"
import mainSlice from "../../assets/main_slice_1.png";
import topSlice from "../../assets/top_left_slice_1.png";
import bottomSlice from "../../assets/bottom_left_slice_1.png";
import background from "../../assets/hero_background.png"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useAnimate,  useInView  } from "framer-motion"



import MenuSection from '../MenuSection/MenuSection';

function HomePageHeroSection() {
    const [scroll, setScroll] = useState(0);
    const ref1 = useRef(null); 
    const ref2= useRef(null); 
    const homePageinView = useInView(ref1); 
    const menuPageInView = useInView(ref2); 

    const [isClicked, setIsClicked] = useState(false);
    const [scope, animate] = useAnimate();
    const handleClick = () => {
        // window.location.href = '#menu'
        const scrollPosition = window.innerHeight * 1.1; // 110% of the viewport height

        // Scroll to the calculated position
        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth' 
        }); 
        animate("#pizza-3", { scale: 0.8, y: 180, x: -100, rotate: "50deg" }, { duration: 1 })
        animate("#pizza-1", { y: -400, rotate: "40deg" }, { duration: 1 })
        animate("#pizza-2", { x: -600, y: -10, rotate: "40deg" }, { duration: 1 })
    }

   


    // getting the scroll height
    useEffect(() => {
        const handleScroll = () => {
          setScroll(window.scrollY);
        }
    
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        }
      }, []);
    
    
    useEffect(() => {
        console.log(scroll)
        if (menuPageInView && scroll > window.innerHeight) {
            animate("#pizza-3", { scale: 0.8, y: 180, x: -100, rotate: "50deg" }, { duration: 1 })
            animate("#pizza-1", { y: -400, rotate: "40deg" }, { duration: 1 })
            animate("#pizza-2", { x: -600, y: -10, rotate: "40deg" }, { duration: 1 })

        }
    }, [menuPageInView]);

    // Animation for when homePageInView is true
    useEffect(() => {

        if (homePageinView && scroll < window.innerHeight) {
            animate("#pizza-3", { scale: 1, y: 0, x: 0, rotate: "0deg" }, { duration: 1 })
            animate("#pizza-1", { y: 0, rotate: "0deg" }, { duration: 1 })
            animate("#pizza-2", { x: 0, y: 0, rotate: "0deg" }, { duration: 1 })
            
        }
    }, [homePageinView]);


    return (
        <div>
            <div className='homeBox' ref={ref1}
            >
                <img className="homeBg" src={background} alt="background image" />
                <div className='left-box-wraapper'>
                    <div className='leftBox'>
                        <span>Enjoy Your Pizza</span>
                        <button className='home-hero-order-button' onClick={handleClick}>
                            <ShoppingCartOutlinedIcon sx={{fontSize: window.innerWidth > 768 ? "25px" : "16px", transform: "translateY(15%)", marginRight: "1rem"}}/>
                            Order Now
                        </button>
                    </div>
                </div>
                <div className='rightBox' ref={scope}>
                    <div id='pizza-1'><img className='topSlice' src={topSlice} alt="topSlice" /></div>
                    <div id='pizza-2'><img className='bottomSlice' src={bottomSlice} alt="bottomSlice" /></div>
                    <div id='pizza-3'><img className='mainSlice' src={mainSlice} alt="mainSlice" /></div>
                </div>
            </div>
            <div id='menu' className='menu-section' ref={ref2}>
                <MenuSection />
            </div>
        </div>
    )
}

export default HomePageHeroSection


// style={{opacity: isClicked ? 1 : 0}}
// style={{ opacity: isClicked ? 1 : 0, zIndex: isClicked ? 10 : 0 }}
// style={{ zIndex: isClicked ? 0 : 10, opacity: isClicked ? 0 : 1 }}