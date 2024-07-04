import React, { useState, useRef, useEffect, lazy, Suspense, memo } from 'react';
import "./HomePageHeroSection.css"
import mainSlice from "../../assets/main_slice_1.png";
import topSlice from "../../assets/top_left_slice_1.png";
import bottomSlice from "../../assets/bottom_left_slice_1.png";
import background from "../../assets/hero_background.png"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useAnimate, useInView } from "framer-motion";
import { motion, AnimatePresence } from 'framer-motion';
import maskot from "../../assets/maskot_logo_inwood.png"
import cheesePie from "../../assets/chesse_pie.png";
import offerBanner from "../../assets/inwood_offer_banner 2.jpg"
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import pizza from "../../assets/pizza.png"
import italianBG from "../../assets/italian_bg.jpg"

// slick carousel
import Slider from 'react-slick';

// banners
import banner1 from "../../assets/offer_banner_1.jpg";
import banner2 from "../../assets/offer_banner_2.jpg";
import banner3 from "../../assets/offer_banner_3.jpg";
import banner4 from "../../assets/offer_banner_4.jpg";
import banner5 from "../../assets/offer_banner_5.jpg";
import banner6 from "../../assets/offer_banner_6.jpg";

import specialBanner from "../../assets/independence_day_banner.jpg";

// redux file offer numeric
import { setOfferNumeric, deleteOfferNumeric } from '../../redux/slices/specialOffersSlice';
import { useDispatch, useSelector } from 'react-redux';

// import MenuSection from '../MenuSection/MenuSection';
// import Footer from '../../components/Footer/Footer';

const MenuSection = lazy(() => import("../MenuSection/MenuSection"));
const Footer = lazy(() => import("../../components/Footer/Footer"));

const MemoizedMenuSection = memo(MenuSection);
const MemoizedFooter = memo(Footer);

const carouselItems = [
    {
        bgImg: banner1,
    },

    {
        bgImg: banner2,
    },
    {
        bgImg: banner3,
    },
    {
        bgImg: banner4,
    },
    {
        bgImg: banner5,
    },
    {
        bgImg: banner6,
    },
];
function HomePageHeroSection() {
    const [scroll, setScroll] = useState(0);
    const [rotationAngle, setRotationAngle] = useState(null);
    const dispatch = useDispatch();
    const offerNumeric = useSelector((state) => state.specialoffer.offerNumeric);
    console.log(offerNumeric)
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

    var settings = {
        arrows: true,
        dots: true,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }

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

    const { bgImg } = carouselItems[currentIndex];

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

    const handleOffer1 = () => {
        dispatch(deleteOfferNumeric());
        dispatch(setOfferNumeric(4));
        window.location.href = '/special-offers';
    }
    const handleOffer2 = () => {
        dispatch(deleteOfferNumeric());
        dispatch(setOfferNumeric(2));
        window.location.href = '/special-offers';
    }

    const handleOffer3 = () => {
        dispatch(deleteOfferNumeric());
        dispatch(setOfferNumeric(3));
        window.location.href = '/special-offers';
    }

    // const handleOffer4 = () => {
    //     dispatch(deleteOfferNumeric());
    //     dispatch(setOfferNumeric(5));
    //     window.location.href = '/special-offers';
    // }


    // const handleOffer5 = () => {
    //     dispatch(deleteOfferNumeric()); 
    //     dispatch(setOfferNumeric(3));
    //     window.location.href = '/special-offers';
    // }

    const handleOffer6 = () => {
        dispatch(deleteOfferNumeric());
        dispatch(setOfferNumeric(5));
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
                <div className='rightBox' style={{ zIndex: scroll > window.innerHeight / 10 ? '0' : '1', }}>
                    <div className='home-page-slider-wrapper'>
                        <Slider {...settings}>
                            {/* {carouselItems?.map((banners, indx) => ( 
                            <div key={indx} className='home-pg-slider-items'>
                               <div style={{width: '100%', height: window.innerWidth < 769 ? '' : '100vh', cursor: 'pointer'}} onClick={handleSpecialOffersPage}> 
                                <img src={banners.bgImg} />
                               </div>
                            </div>  
                        ))} */}
                            <div className='home-pg-slider-items'>
                                <div style={{ width: '100%', height: window.innerWidth < 769 ? '' : '100vh', cursor: 'pointer' }} onClick={() => handleOffer3()}>
                                    <img src={specialBanner} />
                                </div>
                            </div>
                            
                            <div className='home-pg-slider-items'>
                                <div style={{ width: '100%', height: window.innerWidth < 769 ? '' : '100vh', cursor: 'pointer' }} onClick={() => handleOffer2()}>
                                    <img src={banner2} />
                                </div>
                            </div>

                            <div className='home-pg-slider-items'>
                                <div style={{ width: '100%', height: window.innerWidth < 769 ? '' : '100vh', cursor: 'pointer' }} onClick={() => handleOffer1()}>
                                    <img src={banner1} />
                                </div>
                            </div>

                            {/* <div className='home-pg-slider-items'>
                                <div style={{ width: '100%', height: window.innerWidth < 769 ? '' : '100vh', cursor: 'pointer' }} onClick={() => handleOffer4()}>
                                    <img src={banner4} />
                                </div>
                            </div> */}

                            {/* <div className='home-pg-slider-items'>
                                <div style={{ width: '100%', height: window.innerWidth < 769 ? '' : '100vh', cursor: 'pointer' }} onClick={() => handleOffer5()}>
                                    <img src={banner5} />
                                </div>
                            </div> */}

                            <div className='home-pg-slider-items'>
                                <div style={{ width: '100%', height: window.innerWidth < 769 ? '' : '100vh', cursor: 'pointer' }} onClick={() => handleOffer6()}>
                                    <img src={banner6} />
                                </div>
                            </div>

                        </Slider>
                    </div>
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


// < div className = "home-page-carousel" >
//                     <button className="home-page-carousel-btn left-btn" onClick={handlePrevClick} disabled={isTransitioning}>
//                         <ArrowCircleLeftOutlinedIcon />
//                     </button>
//                     <AnimatePresence initial={false} custom={transitionDirection}>
//                         <motion.div
//                             key={currentIndex}
//                             className={`home-page-carousel-content ${transitionDirection}`}
//                             custom={transitionDirection}
//                             initial={{ x: transitionDirection === 'right' ? 100 : -100, opacity: 0 }}
//                             animate={{ x: 0, opacity: 1 }}
//                             exit={{ x: transitionDirection === 'right' ? -100 : 100, opacity: 0 }}
//                             transition={{ duration: 0.3 }}
//                             style={{ width: '100%', background: 'transparent', cursor: 'pointer' }}
//                             onClick={handleSpecialOffersPage}
//                         >
//                             <img src={bgImg} className='home-page-carousel-bg' />
//                         </motion.div>
//                     </AnimatePresence>
//                     <button className="home-page-carousel-btn right-btn" onClick={handleNextClick} disabled={isTransitioning}>
//                         <ArrowCircleRightOutlinedIcon />
//                     </button>
//                 </div >