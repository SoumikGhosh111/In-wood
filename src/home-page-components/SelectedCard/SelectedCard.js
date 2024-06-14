import React, { useEffect, useState } from 'react';
import "./SelectedCard.css";
import pizzaImg from "../../assets/img_not_found.jpg";
// import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, incrementQty, decrementQty } from '../../redux/slices/cartSlice';

function SelectedCard({ data, onCancelButtonClick, onOrderButtonClick }) {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cart);
    const [itemData, setItemData] = useState(null);

    const [sizeChange, setSizeChange] = useState(null);
    const [sizeSelected, setSizeSelected] = useState(false);
    // const [size, setSize] = useState(null); 

    const [selectedTopping, setSelectedTopping] = useState([]);
    const [isTopingsChecked, setIsToppingsChecked] = useState(false);

    const iceCream = ['Sm Cup', 'Lg Cup', 'Sm Cone', 'Lg Cone'];
    const milkShake = ['Sm', 'Lg'];


    // console.log(cartItems)

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

        if (itemData && itemData.prices) {
            // Find the price based on the selected size
            const selectedPrice = itemData.prices.find(priceItem => priceItem.size === sizeChange);

            if (selectedPrice) {
                total += selectedPrice.price;
            }
        }

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
            size: sizeChange,
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
                        <div className='cancel-bttn' onClick={handleCancelButtonClick}>
                            {/* <CancelRoundedIcon sx={{ fontSize: "40px", cursor: "pointer" }} onClick={handleCancelButtonClick} /> */}
                            <ClearRoundedIcon sx={{ fontSize: "30px" }} />
                        </div>
                    </div>
                    <div className='selected-card-item-img'>
                        <img src={itemData.img === '' ? pizzaImg : itemData.img} />
                        {/* <img src={itemData.img}/> */}
                    </div>
                    <div className='selected-card-desc'>
                        <h3>Description</h3>
                        <p>{itemData.desc}</p>
                    </div>
                    <div className='selected-card-item-body'>
                        <h3>Choose an Option</h3>


                        {/* for Ice Creams only */}
                        {/* {itemData.catagory === 'Ice Cream' && (<>
                            {iceCream.map((iceCreams, indx) => (
                                <>
                                    <div className='size-options'>
                                        <div className='input'>
                                            <input type='radio' name='size-options' onClick={() => handleSizeChange(iceCreams)} checked={sizeChange === iceCreams} />
                                            &nbsp;<label htmlFor='size-options'>{iceCreams}</label>
                                        </div>
                                        <span>$ {itemData.prices[indx]}</span>
                                    </div>
                                    <div className='selected-card-item-ver-line'></div>
                                </>

                            ))}
                        </>)} */}

                        {/* for Milk shakes Only */}
                        {/* {itemData.catagory === 'Milk Shake' && (<>
                            {milkShake.map((milkShakes, indx) => (
                                <>
                                    <div className='size-options'>
                                        <div className='input'>
                                            <input type='radio' name='size-options' onClick={() => handleSizeChange(milkShakes)} checked={sizeChange === milkShakes} />
                                            &nbsp;<label htmlFor='size-options'>{milkShakes}</label>
                                        </div>
                                        <span>$ {itemData.prices[indx]}</span>
                                    </div>
                                    <div className='selected-card-item-ver-line'></div>
                                </>
                            ))}
                        </>)} */}

                        {/* for the rest of the items */}
                        <div className='size-options'>
                            {itemData.prices.map((priceItem, index) => (
                                <>
                                    <div key={index} className='selected-card-input'>
                                        <div>
                                            <input
                                                type='radio'
                                                name='size-options'
                                                onClick={() => handleSizeChange(priceItem.size)}
                                                checked={sizeChange === priceItem.size}
                                            />
                                            &nbsp;<label htmlFor='size-options'>{priceItem.size}</label>
                                        </div>
                                        <span>$ {priceItem.price}</span>
                                    </div>
                                    <div className='selected-card-item-ver-line'></div>
                                </>
                            ))}
                        </div>
                    </div>

                    <div className='selected-card-item-toppings'>

                        {itemData.extraOptions.length > 0 && <h3>ADD TOPPINGS</h3>}
                        {itemData.extraOptions.map((item) => (
                            <>
                                <div className='toppings-option'>
                                    <div className='input'>
                                        <input type='checkbox' name='size-options' onChange={(e) => handleToppingChange(item, e.target.checked)} disabled={!sizeSelected} />
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
                            <button onClick={handleDecrement} className='quantity-part inc-dec-button inc'>-</button>
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