import React, { useState, useRef, useEffect, lazy, Suspense, memo } from 'react';
import "./HomePageHeroSection.css"
import mainSlice from "../../assets/main_slice_1.png";
import topSlice from "../../assets/top_left_slice_1.png";
import bottomSlice from "../../assets/bottom_left_slice_1.png";
import background from "../../assets/hero_background.png"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useAnimate, useInView } from "framer-motion";
import { motion, AnimatePresence } from 'framer-motion';
import banner1 from "../../assets/banner-1.jpg";
import maskot from "../../assets/maskot_logo_inwood.png"
import cheesePie from "../../assets/chesse_pie.png";
import offerBanner from "../../assets/inwood_offer_banner 2.jpg"
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import inwoodOfferBanner from "../../assets/sample_banner.jpg";
import banner2 from "../../assets/banner_2.jpg";
import pizza from "../../assets/pizza.png"
import italianBG from "../../assets/italian_bg.jpg"



// import MenuSection from '../MenuSection/MenuSection';
// import Footer from '../../components/Footer/Footer';

const MenuSection = lazy(() => import("../MenuSection/MenuSection"));
const Footer = lazy(() => import("../../components/Footer/Footer"));

const MemoizedMenuSection = memo(MenuSection);
const MemoizedFooter = memo(Footer);

const carouselItems = [
    {
        bgImg: inwoodOfferBanner,
    },

    {
        bgImg: banner2,
    },
];
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


    const [currentIndex, setCurrentIndex] = useState(0);
    const [transitionDirection, setTransitionDirection] = useState('');
    const [isTransitioning, setIsTransitioning] = useState(false);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         if (!isTransitioning) {
    //             handleNextClick();
    //         }
    //     }, 3000); // 3000ms is the interval duration

    //     return () => clearInterval(interval);
    // }, [isTransitioning]);

    const handlePrevClick = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setTransitionDirection('left');
        setTimeout(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
            );
            setIsTransitioning(false);
        }, 300); // 300ms is the duration of the transition
    };

    const handleNextClick = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setTransitionDirection('right');
        setTimeout(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
            );
            setIsTransitioning(false);
        }, 300); // 300ms is the duration of the transition
    };

    const { bgImg} = carouselItems[currentIndex];

    const handleClick = () => {
        const scrollPosition = window.innerWidth < 769 ? window.innerHeight * 1.1 : window.innerHeight * 1;

        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        });
    };

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
            .then(result => console.log(result))
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

    useEffect(() => {
        if (homePageinView && scroll < window.innerHeight) {
            // animate("#pizza-3", { scale: 1, y: 0, x: 0, rotate: "0deg" }, { duration: 1 })
            // animate("#pizza-1", { y: 0, rotate: "0deg" }, { duration: 1 })
            // animate("#pizza-2", { x: 0, y: 0, rotate: "0deg" }, { duration: 1 })

        }
    }, [homePageinView]);

    useEffect(() => {
        const handleScroll = () => {
            const newRotationAngle = window.scrollY * 0.2;
            setRotationAngle(newRotationAngle);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const sentenceArr = ["where every slice is a slice of heaven", "where each bite brings you closer to paradise", "where every slice tells a delicious story", "where every bite is a taste of bliss"]

    useEffect(() => {
        let index = 0;
        setHeroSentence(sentenceArr[index]);
        index++;
        const interval = setInterval(() => {
            setHeroSentence(sentenceArr[index]);
            index = (index + 1) % sentenceArr.length;
        }, 5000);

        return () => clearInterval(interval);
    }, [])
    const handleSpecialOffersPage = () => { 
       window.location.href = '/special-offers'; 
    }
    return (
        <div >
            <div className='homeBox' ref={ref1}>
                <img className="homeBg" src={italianBG} alt="background image" />
                <div className='left-box-wraapper'>
                    <div className='leftBox'>
                        <span ref={ref1}>
                            Inwood Pizza,
                            <br />
                            {/* Animating the text */}
                            <AnimatePresence mode='wait'>
                                {homePageinView ?
                                    <>

                                        <motion.div

                                            key={heroSentence}
                                            initial={{ opacity: 0, x: -50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 50 }}
                                            transition={{ delay: 0 }}
                                        >
                                            {heroSentence}
                                        </motion.div>
                                    </> :
                                    <></>}
                            </AnimatePresence>
                        </span>
                        <button className='home-hero-order-button' onClick={handleClick}>
                            <ShoppingCartOutlinedIcon sx={{ fontSize: window.innerWidth > 768 ? "25px" : "16px", transform: "translateY(15%)", marginRight: "1rem" }} />
                            Explore Menu
                        </button>
                    </div>
                </div>
                <div className='rightBox' style={{ zIndex: scroll > window.innerHeight / 10 ? '0' : '1' }}>   
                </div>
            </div>
            <div id='menu' className='menu-section' ref={ref2} >
                <Suspense fallback={<div>Loading . . .</div>}>
                    <MemoizedMenuSection />
                </Suspense>
            </div>
            <div >
                <Suspense fallback={<div>Loading . . .</div>}>
                    <MemoizedFooter />
                </Suspense>
            </div>
        </div>
    )
}

export default HomePageHeroSection


{/* <div className="carousel">
                    <button className="carousel-btn left-btn" onClick={handlePrevClick} disabled={isTransitioning}>
                        <ArrowCircleLeftOutlinedIcon />
                    </button>
                    <AnimatePresence initial={false} custom={transitionDirection}>
                        <motion.div
                            key={currentIndex}
                            className={`carousel-content ${transitionDirection}`}
                            custom={transitionDirection}
                            initial={{ x: transitionDirection === 'right' ? 500 : -500, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: transitionDirection === 'right' ? -500 : 500, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ width: '100%', background: bgClr }}
                        >
                            <img src={bgImg} className='carousel-bg' style={{display: bgImg === '' ? 'none' : '', zIndex: zId}}/>
                            <div className="left-box">
                                <p>{text}</p>
                                <button className='home-hero-order-button' onClick={handleClick} style={{marginTop: text === '' ? '16rem': '0'}}>{buttonText}</button>
                            </div>
                            <div className="right-box">
                                <img src={imgSrc} />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    <button className="carousel-btn right-btn" onClick={handleNextClick} disabled={isTransitioning}>
                        <ArrowCircleRightOutlinedIcon/>
                    </button>
                </div> */}