import React, { useState, useRef, useEffect } from 'react';
import "./HomePageHeroSection.css"
import mainSlice from "../../assets/main_slice_1.png";
import topSlice from "../../assets/top_left_slice_1.png";
import bottomSlice from "../../assets/bottom_left_slice_1.png";
import background from "../../assets/hero_background.png"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useAnimate, useInView } from "framer-motion";
import Footer from '../../components/Footer/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import pizza from "../../assets/pizza.png"; 



import MenuSection from '../MenuSection/MenuSection';


function HomePageHeroSection() {
    const [scroll, setScroll] = useState(0);
    const [rotationAngle, setRotationAngle] = useState(null); 
    const [heroSentence, setHeroSentence] = useState('');   
    const ref1 = useRef(null);
    const ref2 = useRef(null);

    const homePageinView = useInView(ref1);
    const menuPageInView = useInView(ref2);


    const [isClicked, setIsClicked] = useState(false);
    const [scope, animate] = useAnimate();
    const handleClick = () => {
        // window.location.href = '#menu'
        const scrollPosition = window.innerHeight * 1; // 100% of the viewport height

        // Scroll to the calculated position
        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        });
        // animate("#pizza-3", { scale: 0.8, y: 180, x: -100, rotate: "50deg" }, { duration: 1 })
        // animate("#pizza-1", { y: -400, rotate: "40deg" }, { duration: 1 })
        // animate("#pizza-2", { x: -600, y: -10, rotate: "40deg" }, { duration: 1 })
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
        fetch('https://inwoodpizzallc.com/api/product/getAllFood/All')
        .then(res => res.json())
        .then(result=> console.log(result))
        .catch(err => console.log(err.message)); 
    }, []); 

    useEffect(() => {
        console.log(scroll)
        if (menuPageInView && scroll > window.innerHeight) {
            // animate("#pizza-3", { scale: 0.8, y: 180, x: -100, rotate: "50deg" }, { duration: 1 })
            // animate("#pizza-1", { y: -400, rotate: "40deg" }, { duration: 1 })
            // animate("#pizza-2", { x: -600, y: -10, rotate: "40deg" }, { duration: 1 })

        }
    }, [menuPageInView]);

    // Animation for when homePageInView is true
    useEffect(() => {

        if (homePageinView && scroll < window.innerHeight) {
            // animate("#pizza-3", { scale: 1, y: 0, x: 0, rotate: "0deg" }, { duration: 1 })
            // animate("#pizza-1", { y: 0, rotate: "0deg" }, { duration: 1 })
            // animate("#pizza-2", { x: 0, y: 0, rotate: "0deg" }, { duration: 1 })

        }
    }, [homePageinView]);

    useEffect(() => { 
        const handleScroll = () => {
            const newRotationAngle = window.scrollY * 0.2; // Adjust rotation speed here
            setRotationAngle(newRotationAngle);
          };
      
          window.addEventListener('scroll', handleScroll);
      
          return () => {
            window.removeEventListener('scroll', handleScroll);
          };
    }, []); 


    const sentenceArr = ["where every slice is a slice of heaven.", "where each bite brings you closer to paradise", "where every slice tells a delicious story.", "where every bite is a taste of bliss."]

   useEffect(() => { 
    let index = 0; 
    setHeroSentence(sentenceArr[index]); // Set initial sentence immediately for when the page gets load the sentence also laods 
    index++;
    const interval = setInterval(() => { 
        setHeroSentence(sentenceArr[index]); 
        index = (index + 1) % sentenceArr.length; 
    }, 5000 );

    return () => clearInterval(interval); 
   }, [])


    return (
        <div >
            <div className='homeBox' ref={ref1}>
                <span className='yumm'>Yumm</span>
                <img className="homeBg" src={background} alt="background image" />
                <div className='left-box-wraapper'>
                    <div className='leftBox'>
                        <span  >
                            Inwood Pizza, 
                            <br/> 
                            {/* Animating the text */}
                            <AnimatePresence mode='wait'>
                                <motion.div
                                
                                key={heroSentence} 
                                initial={{ opacity: 0, x: -50}}
                                animate={{ opacity: 1, x: 0}}
                                exit={{ opacity: 0, x: 50}}
                                transition={{ delay: 0 }}
                                >
                                    {heroSentence}
                                </motion.div>
                            </AnimatePresence>  
                        </span>
                        <button className='home-hero-order-button' onClick={handleClick}>
                            <ShoppingCartOutlinedIcon sx={{ fontSize: window.innerWidth > 768 ? "25px" : "16px", transform: "translateY(15%)", marginRight: "1rem" }} />
                            Order Now
                        </button>
                    </div>
                </div>
                <div className='rightBox' style={{zIndex: scroll > window.innerHeight / 10 ? '0' : '1'}}>
                        {/* <div id='pizza-1' ><img className='topSlice' src={topSlice} alt="topSlice" /></div>
                        <div id='pizza-2'><img className='bottomSlice' src={bottomSlice} alt="bottomSlice" /></div>
                        <div id='pizza-3'><img className='mainSlice' src={mainSlice} alt="mainSlice" /></div> */}
                    {/* <div style={{transform: `rotate(${rotationAngle}deg) `}} className='pizza-container-hero-section'> */}
                        <img src={pizza} alt = 'pizza bg img' className='pizza-png' style={{transform: `rotate(${rotationAngle}deg) `}}/>
                    {/* </div> */}
                </div>
            </div>
            <div id='menu' className='menu-section' ref={ref2} >
                <MenuSection />
            </div>
            <div >
                <Footer />
            </div>
        </div>
    )
}

export default HomePageHeroSection


// style={{opacity: isClicked ? 1 : 0}}
// style={{ opacity: isClicked ? 1 : 0, zIndex: isClicked ? 10 : 0 }}
// style={{ zIndex: isClicked ? 0 : 10, opacity: isClicked ? 0 : 1 }}



// .rightBox .mainSlice {
//     height: 450px;
//     width: 340px;
//     object-fit: cover;
//     /* position: absolute;
//     left: 30vw; */
// }

// .rightBox .topSlice {
//     height: 210px;
//     width: 230px;
//     object-fit: cover;
//     /* position: absolute; */
//     /* z-index: 1; */
//     /* transform: translate(140%, -50%) rotate(0deg); */
//     right: 17vw;
//     bottom: 49vh;

// }

// .rightBox .bottomSlice {
//     height: 210px;
//     width: 230px;
//     object-fit: cover;
//     /* position: absolute; */
//     /* z-index: 1; */
//     transform: translate(30%, 45%) rotate(0deg);
//     right: 18vw;
//     bottom: 21vh;

// }



// .pizza-container-hero-section{ 
//     /* border: 1px solid rebeccapurple; */
//     width: fit-content;
//     height: fit-content; 
//     position: relative;
// }


// .mainSlice {
//     height: 450px;
//     width: 340px;
//     object-fit: cover;
//     transform: translateY(-50%) rotate(0deg);
//     /* position: absolute !important; */
//     /* top: 0;  */
//     /* right: 0; */
//     /* position: absolute; */
//     /* left: 30vw; */
    
// }

// .bottomSlice{ 
//     height: 210px;
//     width: 230px;
//     object-fit: cover;
//     /* position: absolute !important; */
//     /* z-index: 1; */
//     transform: translate(-50%, 90%) rotate(0deg);
//     right: 18vw;
//     bottom: 21vh;
// }
// .topSlice{ 
//     height: 210px;
//     width: 230px;
//     object-fit: cover;
//     /* position: absolute !important; */
//     /* z-index: 1; */
//     transform: translate(-60%, 100%) rotate(0deg);
//     right: 17vw;
//     bottom: 49vh;
// }