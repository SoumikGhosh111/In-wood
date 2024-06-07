import React, { useState, useEffect } from 'react';
import { animate, useAnimate } from 'framer-motion';
import "./MenuSection.css";
import AddToCart from '../AddToCart/AddToCart';
import MobAddToCart from '../MobAddToCart/MobAddToCart';
import Backdrop from '@mui/material/Backdrop';
import SelectedCard from '../SelectedCard/SelectedCard';
import { baseUrl } from '../../functions/baseUrl';

import { useSelector, useDispatch } from 'react-redux';
import { addToCart, decrementQty } from '../../redux/slices/cartSlice';

import pizza1 from "../../assets/img_not_found.jpg";
import pizza2 from "../../assets/pizza_2.png";
import pizza3 from "../../assets/pizza_3.png";
import loadingGif from "../../assets/Pizza_sliced.gif"; 
import menuBG from "../../assets/pizza_img_menu.png"

function MenuSection() {

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cart);
    // console.log(cartItems, "this is form menu ")
    const [menu, setMenu] = useState(null);
    const [active, setActive] = useState('All');
    // const [isOpen, setIsOpen] = useState(false);
    const [scope, animate1] = useAnimate();
    const [open, setOpen] = useState(false);
    const [itemData, setItemData] = useState(null);

    const [pizza, setPizza] = useState(null);
    const [iceCream, setIceCream] = useState(null);
    const [milShake, setMilkShake] = useState(null);
    const [pizzaBySlice, setPizzaBySlice] = useState(null);
    const [inwoodFav, setInwoodFav] = useState(null);
    const [calzone, setCalZone] = useState(null);
    const [everyDaySpcl, setEveryDaySpcl] = useState(null);
    const [familySpcl, setFamilySpcl] = useState(null);
    const [drinks, setDrinks] = useState(null);



    // console.log(window.innerWidth);

    const [catagoryMenu, setCatagoryMenu] = useState([]);

    const increment = (item) => {
        // setCounts(prevCnt => ({ ...prevCnt, [item]: prevCnt[item] + 1 }));
        // setCounts(counts.find(item => (item + 1))); 
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
            // .then(data => setPizza(data.data.food.filter((item) => item.catagory === "Pizza")))
            .catch(err => console.log(err));

        // const pizza = menu.filter((item) => item.catagory === "Pizza"); 
        // setPizza(pizza); 
        console.log(pizza, "this is Pizza");
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
            const response = await fetch(`${baseUrl}/api/product/getAllFood/All`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();

            // Set the entire menu data
            // setMenu(data.data.food);

            // Filter out only items with category 'Pizza'
            const pizzaItems = data.data.food.filter(item => item.catagory === 'Pizza large 18inch');
            setPizza(pizzaItems);

            const bySlice = data.data.food.filter(item => item.catagory === 'Pizza by Slice');
            setPizzaBySlice(bySlice);

            const inwoodFavItems = data.data.food.filter(item => item.catagory === 'Inwood Favorites');
            setInwoodFav(inwoodFavItems);

            const familySpclItems = data.data.food.filter(item => item.catagory === 'Family Special');
            setFamilySpcl(familySpclItems);

            const everyDaySpclItems = data.data.food.filter(item => item.catagory === 'Everyday Special');
            setEveryDaySpcl(everyDaySpclItems);

            const calzoneItems = data.data.food.filter(item => item.catagory === 'Calzones');
            setCalZone(calzoneItems);

            const drinkItems = data.data.food.filter(item => item.catagory === 'Drinks');
            setDrinks(drinkItems);

            const icecreamItems = data.data.food.filter(item => item.catagory === 'Ice Cream');
            setIceCream(icecreamItems);

            const milkshake = data.data.food.filter(item => item.catagory === 'Milk Shake');
            setMilkShake(milkshake);



        } catch (error) {
            console.log('Error fetching food data:', error);
        }
    };
    useEffect(() => {


        // Call the fetchFoodData function when 'active' changes
        fetchFoodData();
    }, []);

    // console.log(pizza)
    // console.log(iceCream, "iceCream")
    // console.log(milShake, "milkSHake")
    // console.log(nonVeg, "nonVeg");


    // backdrop open close function
    const handleClose = () => {
        setOpen(false);
    };
    const goTocart = () => {
        setOpen(false);
        if (window.innerWidth < 993) {
            animate1("#order-cart-mob", { pointerEvents: "all", opacity: 1 }, { duration: 1 });
        }
        // console.log("I am Goto Cart");
    }

    // const directOrder = (item) => { 
    //     dispatch(
    //         addToCart({
    //             id: item._id, 
    //             name: item.title, 
    //             price: item.prices[item.prices.length - 1],  
    //             qty: 1
    //         })
    //     )
    //     goTocart(); 
    // }
    const handleOpen = (id) => {
        fetch(`${baseUrl}/api/product/getFood/${id}`)
            .then(res => res.json())
            .then(data => setItemData(data.data.food))
            .catch(err => console.log(err));
        setOpen(true);
    };
    // console.log(itemData)

    const handleActiveClassClick = (indx) => {
        setActive(indx);
        if (indx === 4) {
            //   setTipAmnt(0)
        } else {
            //   setTipPercent(indx)
        }

    }

    return (
        <div className='menu-section-wrapper' ref={scope}>
            <img src={menuBG} alt='bg menu Img' className='menu-bg'/>
            {/* <div className='menu-cart'>
                <span className='title'>Menu</span>
                <div className='filter-buttons'>
                    <ul className='filter-buttons-ul'>
                        <li className={active === 'All' ? 'active-tip' : ''} onClick={() => handleActiveClassClick('All')}>
                            All
                        </li>
                        <li className={active === 'Pizza' ? 'active-tip' : ''} onClick={() => handleActiveClassClick('Pizza')}>
                            Pizza
                        </li >
                        <li className={active === 'Ice Cream' ? 'active-tip' : ''} onClick={() => handleActiveClassClick('Ice Cream')}>
                            Ice Cream
                        </li>
                        <li className={active === 'Milk Shake' ? 'active-tip' : ''} onClick={() => handleActiveClassClick('Milk Shake')}>
                            Milk Shake
                        </li>
                        <li className={active === 'Non Veg Pizza' ? 'active-tip' : ''} onClick={() => handleActiveClassClick('Non Veg Pizza')}>
                            Non Veg Pizza
                        </li>
                    </ul>
                </div>

                {menu !== null ? (
                    // menu.map((item) => item.filter(()))

                    <div className='menu-section-cards' id='cards' >
                        {menu.map((item, indx) => (
                            <>

                                <div className='menu-section-card-item' >
                                    <div onClick={() => handleOpen(item._id)} style={{ cursor: "pointer" }}>
                                        <div className='item-img'>
                                            <img src={pizza1} />
                                        </div>

                                        <span className='item-name'>{item.title}</span>
                                        <p className='item-desc'>{item.desc}</p>
                                        <div className='size'>
                                            <div className='price'>
                                                ${item.prices[item.prices.length - 1]}
                                            </div>
                                            <div className='size-param'>
                                                {item.prices.length > 2 ? ("Large") : ("Medium") || item.prices.length === 1 && "Small"}
                                            </div>
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


                            </>

                        ))}

                    </div>
                ) : (<>Loading . . .</>)}
                <Backdrop
                    sx={{ color: '#000', zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: "rgba(0, 0, 0, 0.238)" }}
                    open={open}
                >
                    <SelectedCard data={itemData} onCancelButtonClick={handleClose} onOrderButtonClick={goTocart} />
                </Backdrop>

            </div> */}


            <div className='menu-cart'>
                <span className='title'>18" Large Pizza</span>


                {pizza !== null ? (
                    // menu.map((item) => item.filter(()))

                    <div className='menu-section-cards' id='cards' >
                        {pizza?.map((item, indx) => (
                            <>

                                <div className='menu-section-card-item' >
                                    <div onClick={() => handleOpen(item._id)} style={{ cursor: "pointer" }}>
                                        <div className='item-img'>
                                            <img src={item.img == '' ? pizza1 : item.img} />
                                        </div>
                                        <div style={{ height: '10px', width: '100%' }} ></div>
                                        <div className='item-name-wrapper'>
                                            <span className='item-name' >{item.title}</span>
                                        </div>
                                        {/* <div className='item-desc-'> */}
                                        <p className='item-desc'>{item.desc}</p>
                                        {/* </div> */}
                                        <div className='size'>
                                            <div className='price'>
                                                {/* ${item.prices[item.prices.length - 1]} */}
                                                ${item.prices[0]}
                                            </div>
                                            <div className='size-param'>
                                                {/* {item.prices.length > 2 ? ("Large") : ("Medium") || item.prices.length === 1 && "Small"} */}
                                                {item.productType ? item.productType : "Large"}
                                            </div>
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


                            </>

                        ))}

                    </div>
                ) :
                    (<>
                        Loading . . .

                    </>)}


                <span className='title'>Pizza By Slice</span>


                {pizzaBySlice !== null ? (
                    // menu.map((item) => item.filter(()))

                    <div className='menu-section-cards' id='cards' >
                        {pizzaBySlice?.map((item, indx) => (
                            <>

                                <div className='menu-section-card-item' >
                                    <div onClick={() => handleOpen(item._id)} style={{ cursor: "pointer" }}>
                                        <div className='item-img'>
                                            <img src={item.img == '' ? pizza1 : item.img} />
                                        </div>
                                        <div style={{ height: '10px', width: '100%' }} ></div>
                                        <div className='item-name-wrapper'>
                                            <span className='item-name' >{item.title}</span>
                                        </div>
                                        {/* <div className='item-desc-'> */}
                                        <p className='item-desc'>{item.desc}</p>
                                        {/* </div> */}
                                        <div className='size'>
                                            <div className='price'>
                                                {/* ${item.prices[item.prices.length - 1]} */}
                                                ${item.prices[0]}
                                            </div>
                                            <div className='size-param'>
                                                {/* {item.prices.length > 2 ? ("Large") : ("Medium") || item.prices.length === 1 && "Small"} */}
                                                {item.productType ? item.productType : "Large"}
                                            </div>
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


                            </>

                        ))}

                    </div>
                ) : (<>Loading . . .</>)}


                <span className='title'>Inwood Favorites</span>


                {inwoodFav !== null ? (
                    // menu.map((item) => item.filter(()))

                    <div className='menu-section-cards' id='cards' >
                        {inwoodFav?.map((item, indx) => (
                            <>

                                <div className='menu-section-card-item' >
                                    <div onClick={() => handleOpen(item._id)} style={{ cursor: "pointer" }}>
                                        <div className='item-img'>
                                            <img src={item.img == '' ? pizza1 : item.img} />
                                        </div>
                                        <div style={{ height: '10px', width: '100%' }} ></div>
                                        <div className='item-name-wrapper'>
                                            <span className='item-name' >{item.title}</span>
                                        </div>
                                        {/* <div className='item-desc-'> */}
                                        <p className='item-desc'>{item.desc}</p>
                                        {/* </div> */}
                                        <div className='size'>
                                            <div className='price'>
                                                {/* ${item.prices[item.prices.length - 1]} */}
                                                ${item.prices[0]}
                                            </div>
                                            <div className='size-param'>
                                                {/* {item.prices.length > 2 ? ("Large") : ("Medium") || item.prices.length === 1 && "Small"} */}
                                                {item.productType ? item.productType : "Large"}
                                            </div>
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


                            </>

                        ))}

                    </div>
                ) : (<>Loading . . .</>)}


                <span className='title'>Calzones</span>


                {calzone !== null ? (
                    // menu.map((item) => item.filter(()))

                    <div className='menu-section-cards' id='cards' >
                        {calzone?.map((item, indx) => (
                            <>

                                <div className='menu-section-card-item' >
                                    <div onClick={() => handleOpen(item._id)} style={{ cursor: "pointer" }}>
                                        <div className='item-img'>
                                            <img src={item.img == '' ? pizza1 : item.img} />
                                        </div>
                                        <div style={{ height: '10px', width: '100%' }} ></div>
                                        <div className='item-name-wrapper'>
                                            <span className='item-name' >{item.title}</span>
                                        </div>
                                        {/* <div className='item-desc-'> */}
                                        <p className='item-desc'>{item.desc}</p>
                                        {/* </div> */}
                                        <div className='size'>
                                            <div className='price'>
                                                {/* ${item.prices[item.prices.length - 1]} */}
                                                ${item.prices[0]}
                                            </div>
                                            <div className='size-param'>
                                                {/* {item.prices.length > 2 ? ("Large") : ("Medium") || item.prices.length === 1 && "Small"} */}
                                                {item.productType ? item.productType : "Large"}
                                            </div>
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


                            </>

                        ))}

                    </div>
                ) : (<>Loading . . .</>)}


                <span className='title'>Family Special</span>


                {familySpcl !== null ? (
                    // menu.map((item) => item.filter(()))

                    <div className='menu-section-cards' id='cards' >
                        {familySpcl?.map((item, indx) => (
                            <>

                                <div className='menu-section-card-item' >
                                    <div onClick={() => handleOpen(item._id)} style={{ cursor: "pointer" }}>
                                        <div className='item-img'>
                                            <img src={item.img == '' ? pizza1 : item.img} />
                                        </div>
                                        <div style={{ height: '10px', width: '100%' }} ></div>
                                        <div className='item-name-wrapper'>
                                            <span className='item-name' >{item.title}</span>
                                        </div>
                                        {/* <div className='item-desc-'> */}
                                        <p className='item-desc'>{item.desc}</p>
                                        {/* </div> */}
                                        <div className='size'>
                                            <div className='price'>
                                                {/* ${item.prices[item.prices.length - 1]} */}
                                                ${item.prices[0]}
                                            </div>
                                            <div className='size-param'>
                                                {/* {item.prices.length > 2 ? ("Large") : ("Medium") || item.prices.length === 1 && "Small"} */}
                                                {item.productType ? item.productType : "Large"}
                                            </div>
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


                            </>

                        ))}

                    </div>
                ) : (<>Loading . . .</>)}



                <span className='title'>Everyday Special</span>


                {everyDaySpcl !== null ? (
                    // menu.map((item) => item.filter(()))

                    <div className='menu-section-cards' id='cards' >
                        {everyDaySpcl?.map((item, indx) => (
                            <>

                                <div className='menu-section-card-item' >
                                    <div onClick={() => handleOpen(item._id)} style={{ cursor: "pointer" }}>
                                        <div className='item-img'>
                                            <img src={item.img == '' ? pizza1 : item.img} />
                                        </div>
                                        <div style={{ height: '10px', width: '100%' }} ></div>
                                        <div className='item-name-wrapper'>
                                            <span className='item-name' >{item.title}</span>
                                        </div>
                                        {/* <div className='item-desc-'> */}
                                        <p className='item-desc'>{item.desc}</p>
                                        {/* </div> */}
                                        <div className='size'>
                                            <div className='price'>
                                                {/* ${item.prices[item.prices.length - 1]} */}
                                                ${item.prices[0]}
                                            </div>
                                            <div className='size-param'>
                                                {/* {item.prices.length > 2 ? ("Large") : ("Medium") || item.prices.length === 1 && "Small"} */}
                                                {item.productType ? item.productType : "Large"}
                                            </div>
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


                            </>

                        ))}

                    </div>
                ) : (<>Loading . . .</>)}


                <span className='title'>Ice Cream</span>


                {iceCream !== null ? (
                    // menu.map((item) => item.filter(()))

                    <div className='menu-section-cards' id='cards' >
                        {iceCream?.map((item, indx) => (
                            <>

                                <div className='menu-section-card-item' >
                                    <div onClick={() => handleOpen(item._id)} style={{ cursor: "pointer" }}>
                                        <div className='item-img'>
                                            <img src={item.img == '' ? pizza1 : item.img} />
                                        </div>

                                        <div className='item-name-wrapper'>
                                            <span className='item-name' >{item.title}</span>
                                        </div>
                                        <p className='item-desc'>{item.desc}</p>
                                        <div className='size'>
                                            <div className='price'>
                                                {/* ${item.prices[item.prices.length - 1]} */}
                                                ${item.prices[item.prices.length - 1]}
                                            </div>
                                            <div className='size-param'>
                                                Large Cone
                                                {/* {item.catagory} */}
                                            </div>
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


                            </>

                        ))}

                    </div>
                ) : (<>Loading . . .</>)}

                <span className='title'>Milk Shake</span>


                {milShake !== null ? (
                    // menu.map((item) => item.filter(()))

                    <div className='menu-section-cards' id='cards' >
                        {milShake.map((item, indx) => (
                            <>

                                <div className='menu-section-card-item' >
                                    <div onClick={() => handleOpen(item._id)} style={{ cursor: "pointer" }}>
                                        <div className='item-img'>
                                            <img src={item.img == '' ? pizza1 : item.img} />
                                        </div>

                                        <div className='item-name-wrapper'>
                                            <span className='item-name' >{item.title}</span>
                                        </div>
                                        <p className='item-desc'>{item.desc}</p>
                                        <div className='size'>
                                            <div className='price'>
                                                {/* ${item.prices[item.prices.length - 1]} */}
                                                ${item.prices[item.prices.length - 1]}
                                            </div>
                                            <div className='size-param'>
                                                Large
                                                {/* {item.catagory} */}
                                            </div>
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


                            </>

                        ))}

                    </div>
                ) : (<>Loading . . .</>)}

                <span className='title'>Drinks</span>


                {drinks !== null ? (
                    // menu.map((item) => item.filter(()))

                    <div className='menu-section-cards' id='cards' >
                        {drinks.map((item, indx) => (
                            <>

                                <div className='menu-section-card-item' >
                                    <div onClick={() => handleOpen(item._id)} style={{ cursor: "pointer" }}>
                                        <div className='item-img'>
                                            <img src={item.img == '' ? pizza1 : item.img} />
                                        </div>

                                        <div className='item-name-wrapper'>
                                            <span className='item-name' >{item.title}</span>
                                        </div>
                                        <p className='item-desc'>{item.desc}</p>
                                        <div className='size'>
                                            <div className='price'>
                                                {/* ${item.prices[item.prices.length - 1]} */}
                                                ${item.prices[0]}
                                            </div>
                                            <div className='size-param'>
                                                {item.prices.length > 2 ? ("Large") : ("Medium") || item.prices.length === 1 && "Small"}
                                                {/* {item.catagory} */}
                                            </div>
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


                            </>

                        ))}

                    </div>
                ) : (<>Loading . . .</>)}
                <Backdrop
                    sx={{ color: '#000', zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: "rgba(0, 0, 0, 0.238)" }}
                    open={open}
                >
                    <SelectedCard data={itemData} onCancelButtonClick={handleClose} onOrderButtonClick={goTocart} />
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
    )
}

export default MenuSection;


{/* <button className='quantity-buttons-minus quantity-buttons-item' onClick={() => dispatch(decrementQty({id: item._id}))}>-</button>
                                            <div className='hor-line'></div>
                                            <span className='quantity-buttons-item quantity'>
                                               {cartItems.filter((cartItem) => item._id === cartItem.id).qty}
                                            </span>
                                            <div className='hor-line'></div>
                                            <button className='quantity-buttons-plus quantity-buttons-item' onClick={() => dispatch(addToCart({id: item._id, name: item.title, price: item.prices[item.prices.length - 1],  qty: 1}))}>+</button> */}


{/* <div className='menu-section-card-item'>
                        <div className='item-img'>
                            <img src={pizza3} />
                        </div>

                        <span className='item-name'>Pepparoni Pizza</span>
                        <p className='item-desc'>The classic pepperoni pizza is typically prepared with mozzarella cheese, tomato sauce, and a generous layer of pepperoni slices ...See more</p>
                        <div className='quantity-buttons-wrapper'>
                            <div className='quantity-buttons'>
                                <button className='quantity-buttons-minus quantity-buttons-item' onClick={() => decrement(pizza1)}>-</button>
                                <div className='hor-line'></div>
                                <span className='quantity-buttons-item quantity'>{counts.pizza1}</span>
                                <div className='hor-line'></div>
                                <button className='quantity-buttons-plus quantity-buttons-item' onClick={() => increment(pizza1)}>+</button>
                            </div>
                        </div>
                    </div>

                    <div className='menu-section-card-item'>
                        <div className='item-img'>
                            <img src={pizza1} />
                        </div>

                        <span className='item-name'>Pepparoni Pizza</span>
                        <p className='item-desc'>The classic pepperoni pizza is typically prepared with mozzarella cheese, tomato sauce, and a generous layer of pepperoni slices ...See more</p>
                        <div className='quantity-buttons-wrapper'>
                            <div className='quantity-buttons'>
                                <button className='quantity-buttons-minus quantity-buttons-item' >-</button>
                                <div className='hor-line'></div>
                                <span className='quantity-buttons-item quantity'></span>
                                <div className='hor-line'></div>
                                <button className='quantity-buttons-plus quantity-buttons-item'>+</button>
                            </div>
                        </div>
                    </div>


                    <div className='menu-section-card-item'>
                        <div className='item-img'>
                            <img src={pizza3} />
                        </div>

                        <span className='item-name'>Pepparoni Pizza</span>
                        <p className='item-desc'>The classic pepperoni pizza is typically prepared with mozzarella cheese, tomato sauce, and a generous layer of pepperoni slices ...See more</p>
                        <div className='quantity-buttons-wrapper'>
                            <div className='quantity-buttons'>
                                <button className='quantity-buttons-minus quantity-buttons-item'>-</button>
                                <div className='hor-line'></div>
                                <span className='quantity-buttons-item quantity'>0</span>
                                <div className='hor-line'></div>
                                <button className='quantity-buttons-plus quantity-buttons-item'>+</button>
                            </div>
                        </div>
                    </div>


                    <div className='menu-section-card-item'>
                        <div className='item-img'>
                            <img src={pizza3} />
                        </div>

                        <span className='item-name'>Pepparoni Pizza</span>
                        <p className='item-desc'>The classic pepperoni pizza is typically prepared with mozzarella cheese, tomato sauce, and a generous layer of pepperoni slices ...See more</p>
                        <div className='quantity-buttons-wrapper'>
                            <div className='quantity-buttons'>
                                <button className='quantity-buttons-minus quantity-buttons-item'>-</button>
                                <div className='hor-line'></div>
                                <span className='quantity-buttons-item quantity'>0</span>
                                <div className='hor-line'></div>
                                <button className='quantity-buttons-plus quantity-buttons-item'>+</button>
                            </div>
                        </div>
                    </div>
                    <div className='menu-section-card-item'>
                        <div className='item-img'>
                            <img src={pizza3} />
                        </div>

                        <span className='item-name'>Pepparoni Pizza</span>
                        <p className='item-desc'>The classic pepperoni pizza is typically prepared with mozzarella cheese, tomato sauce, and a generous layer of pepperoni slices ...See more</p>
                        <div className='quantity-buttons-wrapper'>
                            <div className='quantity-buttons'>
                                <button className='quantity-buttons-minus quantity-buttons-item'>-</button>
                                <div className='hor-line'></div>
                                <span className='quantity-buttons-item quantity'>0</span>
                                <div className='hor-line'></div>
                                <button className='quantity-buttons-plus quantity-buttons-item'>+</button>
                            </div>
                        </div>
                    </div>
                    <div className='menu-section-card-item'>
                        <div className='item-img'>
                            <img src={pizza3} />
                        </div>

                        <span className='item-name'>Pepparoni Pizza</span>
                        <p className='item-desc'>The classic pepperoni pizza is typically prepared with mozzarella cheese, tomato sauce, and a generous layer of pepperoni slices ...See more</p>
                        <div className='quantity-buttons-wrapper'>
                            <div className='quantity-buttons'>
                                <button className='quantity-buttons-minus quantity-buttons-item'>-</button>
                                <div className='hor-line'></div>
                                <span className='quantity-buttons-item quantity'>0</span>
                                <div className='hor-line'></div>
                                <button className='quantity-buttons-plus quantity-buttons-item'>+</button>
                            </div>
                        </div>
                    </div>
                </div>
                <span className='title'>Pure Veg</span>
                <div className='menu-section-cards' id='cards'>
                    <div className='menu-section-card-item'>
                        <div className='item-img'>
                            <img src={pizza3} />
                        </div>

                        <span className='item-name'>Pepparoni Pizza</span>
                        <p className='item-desc'>The classic pepperoni pizza is typically prepared with mozzarella cheese, tomato sauce, and a generous layer of pepperoni slices ...See more</p>
                        <div className='quantity-buttons-wrapper'>
                            <div className='quantity-buttons'>
                                <button className='quantity-buttons-minus quantity-buttons-item' onClick={() => decrement(pizza1)}>-</button>
                                <div className='hor-line'></div>
                                <span className='quantity-buttons-item quantity'>{counts.pizza1}</span>
                                <div className='hor-line'></div>
                                <button className='quantity-buttons-plus quantity-buttons-item' onClick={() => increment(pizza1)}>+</button>
                            </div>
                        </div>
                    </div>

                    <div className='menu-section-card-item'>
                        <div className='item-img'>
                            <img src={pizza1} />
                        </div>

                        <span className='item-name'>Pepparoni Pizza</span>
                        <p className='item-desc'>The classic pepperoni pizza is typically prepared with mozzarella cheese, tomato sauce, and a generous layer of pepperoni slices ...See more</p>
                        <div className='quantity-buttons-wrapper'>
                            <div className='quantity-buttons'>
                                <button className='quantity-buttons-minus quantity-buttons-item' >-</button>
                                <div className='hor-line'></div>
                                <span className='quantity-buttons-item quantity'></span>
                                <div className='hor-line'></div>
                                <button className='quantity-buttons-plus quantity-buttons-item'>+</button>
                            </div>
                        </div>
                    </div>


                    <div className='menu-section-card-item'>
                        <div className='item-img'>
                            <img src={pizza3} />
                        </div>

                        <span className='item-name'>Pepparoni Pizza</span>
                        <p className='item-desc'>The classic pepperoni pizza is typically prepared with mozzarella cheese, tomato sauce, and a generous layer of pepperoni slices ...See more</p>
                        <div className='quantity-buttons-wrapper'>
                            <div className='quantity-buttons'>
                                <button className='quantity-buttons-minus quantity-buttons-item'>-</button>
                                <div className='hor-line'></div>
                                <span className='quantity-buttons-item quantity'>0</span>
                                <div className='hor-line'></div>
                                <button className='quantity-buttons-plus quantity-buttons-item'>+</button>
                            </div>
                        </div>
                    </div>


                    <div className='menu-section-card-item'>
                        <div className='item-img'>
                            <img src={pizza3} />
                        </div>

                        <span className='item-name'>Pepparoni Pizza</span>
                        <p className='item-desc'>The classic pepperoni pizza is typically prepared with mozzarella cheese, tomato sauce, and a generous layer of pepperoni slices ...See more</p>
                        <div className='quantity-buttons-wrapper'>
                            <div className='quantity-buttons'>
                                <button className='quantity-buttons-minus quantity-buttons-item'>-</button>
                                <div className='hor-line'></div>
                                <span className='quantity-buttons-item quantity'>0</span>
                                <div className='hor-line'></div>
                                <button className='quantity-buttons-plus quantity-buttons-item'>+</button>
                            </div>
                        </div>
                    </div>
                    <div className='menu-section-card-item'>
                        <div className='item-img'>
                            <img src={pizza3} />
                        </div>

                        <span className='item-name'>Pepparoni Pizza</span>
                        <p className='item-desc'>The classic pepperoni pizza is typically prepared with mozzarella cheese, tomato sauce, and a generous layer of pepperoni slices ...See more</p>
                        <div className='quantity-buttons-wrapper'>
                            <div className='quantity-buttons'>
                                <button className='quantity-buttons-minus quantity-buttons-item'>-</button>
                                <div className='hor-line'></div>
                                <span className='quantity-buttons-item quantity'>0</span>
                                <div className='hor-line'></div>
                                <button className='quantity-buttons-plus quantity-buttons-item'>+</button>
                            </div>
                        </div>
                    </div>
                    <div className='menu-section-card-item'>
                        <div className='item-img'>
                            <img src={pizza3} />
                        </div>

                        <span className='item-name'>Pepparoni Pizza</span>
                        <p className='item-desc'>The classic pepperoni pizza is typically prepared with mozzarella cheese, tomato sauce, and a generous layer of pepperoni slices ...See more</p>
                        <div className='quantity-buttons-wrapper'>
                            <div className='quantity-buttons'>
                                <button className='quantity-buttons-minus quantity-buttons-item'>-</button>
                                <div className='hor-line'></div>
                                <span className='quantity-buttons-item quantity'>0</span>
                                <div className='hor-line'></div>
                                <button className='quantity-buttons-plus quantity-buttons-item'>+</button>
                            </div>
                        </div>
                    </div> */}












