import React, { useEffect, useState } from 'react';
import "./SelectedCard.css";
import pizzaImg from "../../assets/pizza_2.png";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, incrementQty, decrementQty } from '../../redux/slices/cartSlice';

function SelectedCard({ data, onCancelButtonClick, onOrderButtonClick }) {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cart); 
    const [itemData, setItemData] = useState(null); 

    const [sizeChange, setSizeChange] = useState(null);
    const [sizeSelected, setSizeSelected] = useState(false);

    const [selectedTopping, setSelectedTopping] = useState([]);
    const [isTopingsChecked, setIsToppingsChecked] = useState(false);


    console.log(cartItems)

    const [quantity, setQuantity] = useState(1); 
    useEffect(() => {
        setItemData(data);
    }, [data])

    const handleSizeChange = (size) => {
        setSizeSelected(true);
        setSizeChange(size);
        calculateTotalAmount(); 
    }

    const handleToppingChange = (topping, isChecked) => {
        if (isChecked) {
            setSelectedTopping([...selectedTopping, topping]);
            setIsToppingsChecked(true)
        } else {
            setSelectedTopping(selectedTopping.filter(item => item._id !== topping._id));
            setIsToppingsChecked(false); 
        }
    };

    const calculateTotalAmount = () => {
        let total = 0;
        // Add base price based on selected size
        if (sizeChange === 'small') {
            total += itemData.prices[0];
        } 
        
        // else if (sizeChange === 'medium') 
        // {
        //     total += itemData.prices[1];
        // } 
        // else if (sizeChange === 'large') 
        // {
        //     total += itemData.prices[2];
        // }
        // Add prices of selected toppings
        selectedTopping.forEach(topping => {
            total += topping.price;
        });
        return total.toFixed(2);
    };

    const handleIncrement = () => { 
        setQuantity(quantity + 1); 
    }

    const handleDecrement = () => { 
        setQuantity(quantity <= 1 ? 1 : quantity - 1); 
    }

    const handleOrderClick = () => {
        dispatch(addToCart({
            id: `${itemData._id}${selectedTopping.length > 0 && selectedTopping.map((toppings) => toppings._id)}${sizeChange}${itemData.productType}`,
            name: itemData.title,
            price: calculateTotalAmount(),
            qty: quantity,
            toppings: selectedTopping.length > 0 ? selectedTopping : null,
            // size: sizeChange !== null ? sizeChange : null
            size: itemData?.productType ? itemData?.productType : "Large", 
            img: itemData.img   
        }))

        orderReset(); 



        onOrderButtonClick();
    }

    const handleCancelButtonClick = () => { 
        onCancelButtonClick(); 
        orderReset(); 
    }

    // resetting the order card
    const orderReset = () => {
        setSizeChange(null);
        setSizeSelected(false);
        setSelectedTopping([]);
        setIsToppingsChecked(false);
        setQuantity(1); 
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
    }

    console.log(itemData);
    console.log("totalOrder", calculateTotalAmount())

    return (
        <div className='selected-card-wrapper'>
            {itemData !== null ? (
                <div className='selected-card-item'>
                    <div className='selected-card-title'>
                        <h1>{itemData.title}</h1>
                        <CancelRoundedIcon sx={{ fontSize: "40px", cursor: "pointer" }} onClick={handleCancelButtonClick} />
                    </div>
                    <div className='selected-card-item-img'>
                        <img src={itemData.img === '' ? pizzaImg : itemData.img} />
                        {/* <img src={itemData.img}/> */}
                    </div>
                    <div className='selected-card-item-body'>
                        <h3>Choose an Option</h3>
                        <div className='size-options'>
                            <div className='input'>
                                <input type='radio' name='size-options' onClick={() => handleSizeChange("small")} checked={sizeChange === "small"} />
                                &nbsp;<label htmlFor='size-options'>{itemData.productType ? itemData.productType : "Large"}</label>
                            </div>
                            <span>$ {itemData.prices[0]}</span>
                        </div>
                        <div className='selected-card-item-ver-line'></div>
                        {/* 
                        {itemData.prices.length > 1 ? (
                            <>
                                <div className='size-options'>
                                    <div className='input'>
                                        <input type='radio' name='size-options' onChange={() => handleSizeChange("medium")} checked={sizeChange === "medium"} />
                                        &nbsp;<label htmlFor='size-options'>Medium</label>
                                    </div>
                                    <span>$ {itemData.prices[2]}</span>
                                </div>
                                <div className='selected-card-item-ver-line'></div>
                            </>
                        ) : (
                            <></>
                        )}
                        <div className='selected-card-item-ver-line'></div>
                        {itemData.prices.length > 2 ? (
                            <>
                                <div className='size-options'>
                                    <div className='input'>
                                        <input type='radio' name='size-options' onChange={() => handleSizeChange("large")} checked={sizeChange === "large"} />
                                        <label htmlFor='size-options'>Large</label>
                                    </div>
                                    &nbsp;<span>$ {itemData.prices[2]}</span>
                                </div>
                                <div className='selected-card-item-ver-line'></div>
                            </>
                        ) : (
                            <></>
                        )} */}
                    </div>
                    <div className='selected-card-item-toppings'>
                        {itemData.extraOptions.length > 0 && <h3>ADD TOPPINGS</h3>}
                        {itemData.extraOptions.map((item) => (
                            <>
                                <div className='toppings-option'>
                                    <div className='input'>
                                        <input type='checkbox' name='size-options' onChange={(e) => handleToppingChange(item, e.target.checked)} disabled={!sizeSelected}  />
                                        &nbsp;<label htmlFor='size-options'>{item.text}</label>
                                        
                                    </div>
                                    <span>$ {item.price}</span>
                                </div>
                                <div className='selected-card-item-ver-line'></div>
                            </>

                        ))}
                    </div>

                    <div className='selected-card-item-place-order'>

                        <div className='selected-card-item-place-order-quantity'>
                            <button onClick={ handleDecrement} className='quantity-part inc-dec-button inc'>-</button>
                            <span className='quantity-part'>{quantity}</span>
                            <button onClick={handleIncrement} className='quantity-part inc-dec-button dec'>+</button>
                        </div>
                        <button className='selected-card-item-place-order-button'
                            onClick={() => handleOrderClick()}
                            disabled={calculateTotalAmount() <= 0}
                        >Add To Order ${(calculateTotalAmount() * quantity).toFixed(2)}</button>
                    </div>
                </div>
            ) : (<>Loading . . .</>)}
        </div>
    )
}

export default SelectedCard; 