import React, { useState, useEffect } from 'react';
import { animate, useAnimate } from 'framer-motion';
import "./MenuSection.css";
import AddToCart from '../AddToCart/AddToCart';
import MobAddToCart from '../MobAddToCart/MobAddToCart';

import pizza1 from "../../assets/pizza_1.png";
import pizza2 from "../../assets/pizza_2.png";
import pizza3 from "../../assets/pizza_3.png";

function MenuSection() {
    const [counts, setCounts] = useState({
        "pizza1": 0,
        "pizza2": 0,
        "pizza3": 0,
        "pizza4": 0
    })
    const [isOpen, setIsOpen] = useState(false); 
    const [scope, animate1] = useAnimate();
    console.log(window.innerWidth);

    const increment = (item) => {
        setCounts(prevCnt => ({ ...prevCnt, [item]: prevCnt[item] + 1 }));
        // setCounts(counts.find(item => (item + 1))); 
        if (window.innerWidth > 768) {
            animate1("#order-cart", { x: "0" }, { duration: 0.5 });
            animate1("#cards", { width: "60%" }, { duration: 0.5 });
        }
        if (window.innerWidth < 768) {
            animate1("#order-cart-mob", {pointerEvents: "all", opacity: 1}, {duration: 1})
        }
    }

    const decrement = (item) => {
        setCounts(prevCnt => ({ ...prevCnt, [item]: prevCnt[item] > 0 ? prevCnt[item] - 1 : 0 }));
    }


    const handleOrder = () => {
        animate1("#order-cart", { x: "100vw" }, { duration: 0.5 });
        animate1("#cards", { width: "80%" }, { duration: 0.5 });
    }

    const handleMobClick = () => { 
        console.log("I am Clicked")
    }
    return (
        <div className='menu-section-wrapper' ref={scope}>
            <div className='menu-cart'>
                <span className='title'>Non Veg</span>
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
                    </div>
                </div>
                <div className='cart' id='order-cart'>
                    <AddToCart onOrderClick={handleOrder} />
                </div>
            </div>



            <div className='mob-view-cart' id='order-cart-mob'>
                <div className='mob-view-cart-container' id='mob-add-to-cart'>
                    <MobAddToCart />
                </div>
            </div>
        </div>
    )
}

export default MenuSection