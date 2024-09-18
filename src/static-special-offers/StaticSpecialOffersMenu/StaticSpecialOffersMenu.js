import React, { useState, useEffect, useRef } from 'react';
import { animate, transform, useAnimate } from 'framer-motion';
import "../../home-page-components/MenuSection/MenuSection.css";
// import "./SpecialOffersMenu.css";
import AddToCart from '../../home-page-components/AddToCart/AddToCart';
import MobAddToCart from '../../home-page-components/MobAddToCart/MobAddToCart';
import Backdrop from '@mui/material/Backdrop';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
// import SpecialCard from "../SpecialCard/SpecialCard"
import "./StaticSpecialOffersMenu.css"
import { baseUrl } from '../../functions/baseUrl';

import { useSelector, useDispatch } from 'react-redux';
import { deleteOfferNumeric } from '../../redux/slices/specialOffersSlice';

import EveryDaySpecial1 from '../EveryDaySpecial1/EveryDaySpecial1';
import EveryDaySpecial2 from '../EveryDaySpecial2/EveryDaySpecial2';
import ComboOffer2 from '../ComboOffer2/ComboOffer2';
import ComboOffer3 from '../ComboOffer3/ComboOffer3';
import ComboOffer4 from '../ComboOffer4/ComboOffer4';
import LunchSpecial from '../LunchSpecial/LunchSpecial';


// importing toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Usa flag 
import usaFlag from "../../assets/usa_flag.png";

const specialOffer = {
    title: "Game Day Special",
    description: "Game Day Special",
    offerPrice: "24.99",
    addedItems: [
        {
            count: "1",
            item: "Chicken Wings"
        }
    ],
    bases: [
        {
            base: "Speciality Pizza",
            count: "2",
            toppings: ""
        }
    ]
};


function StaticSpecialOffersMenu() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cart);
    const offerNumeric = useSelector((state) => state.specialoffer.offerNumeric);
    const [menu, setMenu] = useState(null);
    const [active, setActive] = useState('All');
    const [scope, animate1] = useAnimate();
    const [open, setOpen] = useState(false);

    const [catagoryMenu, setCatagoryMenu] = useState([]);
    const [selectedItems, setSelectedItems] = useState(null);
    const [activeClass, setActiveClass] = useState(offerNumeric ? offerNumeric : 1);


    console.log(offerNumeric);

    const itemRefs = useRef([]);

    useEffect(() => {
        if (offerNumeric && itemRefs.current[offerNumeric]) {
            itemRefs.current[offerNumeric].scrollIntoView({ behavior: 'smooth' });
        }
    }, [offerNumeric]);



    const increment = (item) => {
        if (window.innerWidth > 768) {
            // animate1("#order-cart", { x: "7vw" }, { duration: 0.5 });
            // animate1("#cards", { width: "80%" }, { duration: 0.5 });
        }
        if (window.innerWidth < 768) {
            animate1("#order-cart-mob", { pointerEvents: "all", opacity: 1 }, { duration: 1 })
        }
    }

    const handleMobClick = () => {
        // console.log("I am Clicked")
    }

    // fetching the data
    useEffect(() => {
        fetch(`${baseUrl}/api/product/getAllFood/${active}`)
            .then(res => res.json())
            .then((data) => setMenu(data.data.food))
            .catch(err => console.log(err));

        if (menu !== null) {
            const uniqueCategories = [
                ...new Set(menu.map((food) => food.catagory)),
            ];
            console.log(catagoryMenu, "This is catagory");
            setCatagoryMenu(uniqueCategories);
        }
    }, [active]);

    const fetchFoodData = async () => {
        try {
            const base = specialOffer.bases;
            const promises = base.map(async (item) => {
                const response = await fetch(`${baseUrl}/api/product/getAllFood/${item.base}`)
                const data = await response.json();
                return { category: item.base, data: data.data.food }
            })

            const results = await Promise.all(promises);
            // setBaseItems(results);
        } catch (error) {
            console.log('Error fetching food data:', error);
        }
    };

    useEffect(() => {
        fetchFoodData();
    }, []);

    const fetchAddedItems = async () => {
        const addedItems = specialOffer.addedItems;
        const promises = addedItems.map(async (item) => {
            const response = await fetch(`${baseUrl}/api/product/getAllFood/${item.item}`);
            const data = await response.json();
            return { category: item.item, data: data.data.food };
        });

        const results = await Promise.all(promises);
        // setAddedItemsData(results);
    };

    useEffect(() => {
        fetchAddedItems();
    }, [])

    const handleClose = () => {
        setOpen(false);
    };

    const goTocart = () => {
        setOpen(false);
        if (window.innerWidth < 993) {
            animate1("#order-cart-mob", { pointerEvents: "all", opacity: 1 }, { duration: 1 });
        }
    }

    // const handleOpen = (id) => {
    //     fetch(`${baseUrl}/api/product/getFood/${id}`)
    //         .then(res => res.json())
    //         .then(data => setItemData(data.data.food))
    //         .catch(err => console.log(err));
    //     setSampleData(id);
    //     setOpen(true);
    // };

    const handleActiveClassClick = (indx) => {
        setActive(indx);
        if (indx === 4) {
            //   setTipAmnt(0)
        } else {
            //   setTipPercent(indx)
        }
    }




    const handleSelectionChange = (e, index) => {
        const updatedSelectedItems = [...selectedItems];
        updatedSelectedItems[index] = e.value;
        setSelectedItems(updatedSelectedItems);
    };

    const handleBackToHome = () => {
        dispatch(deleteOfferNumeric());

        window.location.href = '/';

        // Clearing the browser's history
        window.history.replaceState(null, '', '/');
    }


    return (
        <div className='menu-section-wrapper special-offres-page' ref={scope}>
            <div className='menu-cart special-menu-cart'>
                <div className='special-menu-nav-wrapper' >
                    <ul className='special-menu-nav-bar'>
                        <li className='special-offers-padding' onClick={handleBackToHome}><HomeRoundedIcon sx={{ transform: 'translateY(5%)' }} /></li>
                        <li ref={el => itemRefs.current[6] = el} className={activeClass === 6 ? 'special-offers-active special-offers-padding' : 'special-offer-unactive special-offers-padding'} onClick={() => setActiveClass(6)}>Lunch Special</li>
                        <li ref={el => itemRefs.current[1] = el} className={activeClass === 1 ? 'special-offers-active special-offers-padding' : 'special-offer-unactive special-offers-padding'} onClick={() => setActiveClass(1)}>Every Day Special 1</li>
                        <li ref={el => itemRefs.current[2] = el} className={activeClass === 2 ? 'special-offers-active special-offers-padding' : 'special-offer-unactive special-offers-padding'} onClick={() => setActiveClass(2)}>Every Day Special 2</li>
                        <li ref={el => itemRefs.current[3] = el} className={activeClass === 3 ? 'special-offers-active special-offers-padding' : 'special-offer-unactive special-offers-padding'} onClick={() => setActiveClass(3)}>Game Day Core</li>
                        <li ref={el => itemRefs.current[4] = el} className={activeClass === 4 ? 'special-offers-active special-offers-padding' : 'special-offer-unactive special-offers-padding'}  onClick={() => setActiveClass(4)}>
                            Game Day Plus
                        </li>
                        <li ref={el => itemRefs.current[5] = el} className={activeClass === 5 ? 'special-offers-active special-offers-padding' : 'special-offer-unactive special-offers-padding'} onClick={() => setActiveClass(5)}>Game Day Ultra</li>
                    </ul>
                </div>




                <div style={{ padding: '0rem 0.5rem' }}>
                    {activeClass === 1 && <EveryDaySpecial1 />}
                </div>
                <div style={{ padding: '0rem 0.5rem' }}>
                    {activeClass === 2 && <EveryDaySpecial2 />}
                </div>



                <div style={{ padding: '0rem 0.5rem' }}>
                    {activeClass === 3 && <ComboOffer2 />}
                </div>

                <div style={{ padding: '0rem 0.5rem' }}>
                    {activeClass === 4 && <ComboOffer3 />}
                </div>

                <div style={{ padding: '0rem 0.5rem' }}>
                    {activeClass === 5 && <ComboOffer4 />}
                </div>

                <div style={{ padding: '0rem 0.5rem' }}>
                    {activeClass === 6 && <LunchSpecial />}
                </div>
            </div>

            <ToastContainer
                position='top-center'
                className={'toast-container-center'}
            />
        </div>
    );
}

export default StaticSpecialOffersMenu;
