import React, { useState, useEffect } from 'react';
import { animate, useAnimate } from 'framer-motion';
import "../../home-page-components/MenuSection/MenuSection.css";
import "./SpecialOffersMenu.css";
import AddToCart from '../../home-page-components/AddToCart/AddToCart';
import MobAddToCart from '../../home-page-components/MobAddToCart/MobAddToCart';
import Backdrop from '@mui/material/Backdrop';
import SpecialCard from "../SpecialCard/SpecialCard"
import SelectedCard from "../../home-page-components/SelectedCard/SelectedCard"
import { baseUrl } from '../../functions/baseUrl';

import { useSelector, useDispatch } from 'react-redux';
import { addToCart, decrementQty } from '../../redux/slices/cartSlice';

import { MultiSelect } from 'primereact/multiselect';

import pizza1 from "../../assets/img_not_found.jpg";
import pizza2 from "../../assets/pizza_2.png";
import pizza3 from "../../assets/pizza_3.png";
import loadingGif from "../../assets/Pizza_sliced.gif";
import menuBG from "../../assets/pizza_img_menu.png"




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


function MenuSection() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cart);
    const [menu, setMenu] = useState(null);
    const [active, setActive] = useState('All');
    const [scope, animate1] = useAnimate();
    const [open, setOpen] = useState(false);
    const [itemData, setItemData] = useState(null);

    const [baseCategory, setCategory] = useState('Pizza large 18inch');
    const [addedItemCategory, setAddedItemsCategory] = useState(null);

    const [baseItems, setBaseItems] = useState(null);
    const [sampledata, setSampleData] = useState(null);
    const [addedItems, setAddedItemsData] = useState(null);

    const [catagoryMenu, setCatagoryMenu] = useState([]);
    const [selectedItems, setSelectedItems] = useState(null);



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
            setBaseItems(results);
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
        setAddedItemsData(results);
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

    const handleOpen = (id) => {
        fetch(`${baseUrl}/api/product/getFood/${id}`)
            .then(res => res.json())
            .then(data => setItemData(data.data.food))
            .catch(err => console.log(err));
        setSampleData(id);
        setOpen(true);
    };

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
            <div className='menu-cart'>
                {baseItems && baseItems.map((category, indx) => (
                    <div key={indx}>
                        <span className='title'>{`Any ${specialOffer.bases[indx].count} ${category.category} of Your Choice`}</span>
                        <div className='menu-section-cards' id='cards'>
                            {category?.data?.map((item, itemIndx) => (
                                <div className='menu-section-card-item' key={itemIndx}>
                                    <div onClick={() => handleOpen(item._id)} style={{ cursor: "pointer" }}>
                                        <div className='item-img'>
                                            <img src={item.img === '' ? pizza1 : item.img} alt={item.title} />
                                        </div>
                                        <div style={{ height: '10px', width: '100%' }}></div>
                                        <div className='item-name-wrapper'>
                                            <span className='item-name'>{item.title}</span>
                                        </div>
                                        <p className='item-desc'>{item.desc}</p>
                                        <div className='price-size-wrapper'>
                                            {item.prices.length > 0 && (
                                                <>
                                                    <div className='price'>${item.prices[item.prices.length - 1].price}</div>
                                                    <div className='size-param'>{item.prices[item.prices.length - 1].size}</div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className='quantity-buttons-wrapper'>
                                        <button className='quantity-buttons'
                                            onClick={() => handleOpen(item._id)}
                                        >
                                            Add To Cart
                                        </button>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                {addedItems && addedItems.map((category, indx) => (
                    <div key={indx}>
                        <span className='title'>{`Any ${specialOffer.addedItems[indx].count} ${category.category} of your Choice`}</span>
                        <div className='menu-section-cards' id='cards'>
                            {category?.data?.map((item, itemIndx) => (
                                <div className='menu-section-card-item' key={itemIndx}>
                                    <div onClick={() => handleOpen(item._id)} style={{ cursor: "pointer" }}>
                                        <div className='item-img'>
                                            <img src={item.img === '' ? pizza1 : item.img} alt={item.title} />
                                        </div>
                                        <div style={{ height: '10px', width: '100%' }}></div>
                                        <div className='item-name-wrapper'>
                                            <span className='item-name'>{item.title}</span>
                                        </div>
                                        <p className='item-desc'>{item.desc}</p>
                                        <div className='price-size-wrapper'>
                                            {item.prices.length > 0 && (
                                                <>
                                                    <div className='price'>${item.prices[item.prices.length - 1].price}</div>
                                                    <div className='size-param'>{item.prices[item.prices.length - 1].size}</div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className='quantity-buttons-wrapper'>
                                        <button className='quantity-buttons' onClick={() => handleOpen(item._id)}>Add To Cart</button>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <Backdrop
                    sx={{ color: '#000', zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: "rgba(0, 0, 0, 0.238)" }}
                    open={open}
                >
                    {/* <SelectedCard data={itemData} onCancelButtonClick={handleClose} onOrderButtonClick={goTocart}/> */}
                    <SpecialCard data={itemData} onCancelButtonClick={handleClose} onOrderButtonClick={goTocart} offerdata={specialOffer} />
                </Backdrop>
            </div>
            <div className='cart' id='order-cart'>
                <AddToCart />
            </div>
            <div className='mob-view-cart' id='order-cart-mob'>
                <div className='mob-view-cart-container' id='mob-add-to-cart'>
                    <MobAddToCart />
                </div>
            </div>
        </div>
    );
}

export default MenuSection;
