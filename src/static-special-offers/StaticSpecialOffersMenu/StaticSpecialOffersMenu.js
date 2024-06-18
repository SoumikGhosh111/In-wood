import React, { useState, useEffect } from 'react';
import { animate, useAnimate } from 'framer-motion';
import "../../home-page-components/MenuSection/MenuSection.css";
// import "./SpecialOffersMenu.css";
import AddToCart from '../../home-page-components/AddToCart/AddToCart';
import MobAddToCart from '../../home-page-components/MobAddToCart/MobAddToCart';
import Backdrop from '@mui/material/Backdrop';
// import SpecialCard from "../SpecialCard/SpecialCard"
import "./StaticSpecialOffersMenu.css"
import { baseUrl } from '../../functions/baseUrl';

import { useSelector, useDispatch } from 'react-redux';
import ComboOffer1 from '../ComboOffer1/ComboOffer1';
import ComboOffer2 from '../ComboOffer2/ComboOffer2';
import ComboOffer3 from '../ComboOffer3/ComboOffer3';
import ComboOffer4 from '../ComboOffer4/ComboOffer4';

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
    const [menu, setMenu] = useState(null);
    const [active, setActive] = useState('All');
    const [scope, animate1] = useAnimate();
    const [open, setOpen] = useState(false);

    const [catagoryMenu, setCatagoryMenu] = useState([]);
    const [selectedItems, setSelectedItems] = useState(null);
    const [activeClass, setActiveClass] = useState(1);



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




    return (
        <div className='menu-section-wrapper special-offres-page' ref={scope}>
            <div className='menu-cart special-menu-cart'>
                <ul className='special-menu-nav-bar'>
                    <li className={activeClass === 1 ? 'special-offers-active' : 'special-offer-unactive'} onClick={() => setActiveClass(1)}>Every Day Special</li>
                    <li className={activeClass === 2 ? 'special-offers-active' : 'special-offer-unactive'} onClick={() => setActiveClass(2)}>Game Day Core</li>
                    <li className={activeClass === 3 ? 'special-offers-active' : 'special-offer-unactive'} onClick={() => setActiveClass(3)}>Game Day Plus</li>
                    <li className={activeClass === 4 ? 'special-offers-active' : 'special-offer-unactive'} onClick={() => setActiveClass(4)}>Game Day Ultra</li>
                </ul>



                <div style={{ padding: '0rem 1rem' }}>
                    {activeClass === 1 && <ComboOffer1 />}
                </div>

                <div style={{ padding: '0rem 1rem' }}>
                    {activeClass === 2 && <ComboOffer2 />}
                </div>

                <div style={{ padding: '0rem 1rem' }}>
                    {activeClass === 3 && <ComboOffer3 />}
                </div>

                <div style={{ padding: '0rem 1rem' }}>
                    {activeClass === 4 && <ComboOffer4 />}
                </div>
            </div>

            
        </div>
    );
}

export default StaticSpecialOffersMenu;
