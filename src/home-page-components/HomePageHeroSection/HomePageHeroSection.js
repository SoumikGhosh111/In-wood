import React, {useState} from 'react';
import "./HomePageHeroSection.css"
import mainSlice from "../../assets/main_slice_1.png";
import topSlice from "../../assets/top_left_slice_1.png";
import bottomSlice from "../../assets/bottom_left_slice_1.png";
import background from "../../assets/hero_background.png"


import MenuSection from '../MenuSection/MenuSection';

function HomePageHeroSection() {
    const [isClicked, setIsClicked] = useState(false); 
    const handleClick = () => { 
        setIsClicked(true); 
    }
    
    return (
        <div>
            <div className='homeBox'>
                <img className="homeBg" src={background} alt="background image" style={{zIndex: isClicked ? 0 : 10, opacity: isClicked ? 0 : 1}}/>
                <div className='contentBox' >
                    <div className='leftBox' style={{zIndex: isClicked ? 0 : 10, opacity: isClicked ? 0 : 1}}>
                        <span>Enjoy Your Pizza</span>
                        <button className='home-hero-order-button' onClick={handleClick}>
                            {/* <RiShoppingCartLine size={24} style={{ marginLeft: '10px', marginRight: '14px', fontSize: "20px", fontWeight: 'bolder' }} /> */}

                            Order Now
                        </button>
                    </div>
                    <div className='rightBox'>
                        <div><img className='topSlice' src={topSlice} alt="topSlice" /></div>
                        <div><img className='bottomSlice' src={bottomSlice} alt="bottomSlice" /></div>
                        <div><img className='mainSlice' src={mainSlice} alt="mainSlice" /></div>
                    </div>
                </div>
                <div  id='menu' className='menu-section' style={{opacity: isClicked ? 1 : 0, zIndex: isClicked ? 10 : 0}}>
                    <MenuSection />
                </div>
            </div>
        </div>
    )
}

export default HomePageHeroSection


// style={{opacity: isClicked ? 1 : 0}}