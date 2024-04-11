import React from 'react';
import "./MenuSection.css";

import pizza1 from "../../assets/pizza_1.png";
import pizza2 from "../../assets/pizza_2.png";
import pizza3 from "../../assets/pizza_3.png";

function MenuSection() {
    return (
        <div className='menu-section-wrapper'>
            <span className='title'>Non Veg</span>
            <div className='menu-section-cards'>
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
                        <img src={pizza1} />
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


        </div>
    )
}

export default MenuSection