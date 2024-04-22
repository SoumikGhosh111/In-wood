import React, { useEffect, useState } from 'react';
import "./SelectedCard.css";
import pizzaImg from "../../assets/pizza_2.png";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';

function SelectedCard({ data, onCancelButtonClick, onOrderButtonClick }) {
    const dispatch = useDispatch();
    const [itemData, setItemData] = useState(null)

    const [sizeChange, setSizeChange] = useState(null);
    const [sizeSelected, setSizeSelected] = useState(false); 

    const [selectedTopping, setSelectedTopping] = useState([]);
    useEffect(() => {
        setItemData(data);
    }, [data])

    const handleSizeChange = (size) => {
        setSizeSelected(true); 
        setSizeChange(size);
    }

    const handleToppingChange = (topping, isChecked) => {
        if (isChecked) {
            setSelectedTopping([...selectedTopping, topping]);
        } else {
            setSelectedTopping(selectedTopping.filter(item => item._id !== topping._id));
        }
    };

    const calculateTotalAmount = () => {
        let total = 0;
        // Add base price based on selected size
        if (sizeChange === 'small') {
            total += itemData.prices[0];
        } else if (sizeChange === 'medium') {
            total += itemData.prices[1];
        } else if (sizeChange === 'large') {
            total += itemData.prices[2];
        }
        // Add prices of selected toppings
        selectedTopping.forEach(topping => {
            total += topping.price;
        });
        // Subtract prices of unselected toppings
        // itemData.extraOptions.forEach(topping => {
        //     if (!selectedTopping.includes(topping)) {
        //         total -= topping.price;
        //     }
        // });
        return total.toFixed(2);
    };

    const handleOrderClick = () => {
        dispatch(addToCart({
            id: `${itemData._id}${selectedTopping.length > 0 && selectedTopping.map((toppings) => toppings._id)}${sizeChange}`,
            name: itemData.title,
            price: calculateTotalAmount(),
            qty: 1,
            toppings: selectedTopping.length > 0 ? selectedTopping : null,
            size: sizeChange !== null ? sizeChange : null 
        }))

        setSizeChange(null); 
        setSizeSelected(false); 
        setSelectedTopping([]); 

        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });

        onOrderButtonClick(); 
    }


    console.log(itemData);
    console.log("totalOrder", calculateTotalAmount())

    return (
        <div className='selected-card-wrapper'>
            {itemData !== null ? (
                <div className='selected-card-item'>
                    <div className='selected-card-title'>
                        <h1>{itemData.title}</h1>
                        <CancelRoundedIcon sx={{ fontSize: "40px", cursor: "pointer" }} onClick={onCancelButtonClick} />
                    </div>
                    <div className='selected-card-item-img'>
                        <img src={pizzaImg} />
                    </div>
                    <div className='selected-card-item-body'>
                        <h3>Choose an Option</h3>
                        <div className='size-options'>
                            <div className='input'>
                                <input type='radio' name='size-options' onChange={() => handleSizeChange("small")} checked={sizeChange === "small"} />
                                <label htmlFor='size-options'>Small</label>
                            </div>
                            <span>${itemData.prices[0]}</span>
                        </div>
                        <div className='selected-card-item-ver-line'></div>
                        <div className='size-options'>
                            <div className='input'>
                                <input type='radio' name='size-options' onChange={() => handleSizeChange("medium")} checked={sizeChange === "medium"} />
                                <label htmlFor='size-options'>Meduim</label>
                            </div>
                            <span>${itemData.prices[1]}</span>
                        </div>
                        <div className='selected-card-item-ver-line'></div>
                        {itemData.prices.length > 2 ? (
                            <>
                                <div className='size-options'>
                                    <div className='input'>
                                        <input type='radio' name='size-options' onChange={() => handleSizeChange("large")} checked={sizeChange === "large"} />
                                        <label htmlFor='size-options'>Large</label>
                                    </div>
                                    <span>${itemData.prices[2]}</span>
                                </div>
                                <div className='selected-card-item-ver-line'></div>
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className='selected-card-item-toppings'>
                        <h3>ADD TOPPINGS</h3>
                        {itemData.extraOptions.map((item) => (
                            <>
                                <div className='toppings-option'>
                                    <div className='input'>
                                        <input type='checkbox' name='size-options' onChange={(e) => handleToppingChange(item, e.target.checked)} disabled = {!sizeSelected}/>
                                        <label htmlFor='size-options'>{item.text}</label>
                                    </div>
                                    <span>${item.price}</span>
                                </div>
                                <div className='selected-card-item-ver-line'></div>
                            </>

                        ))}
                    </div>

                    <div className='selected-card-item-place-order'>
                        <button className='selected-card-item-place-order-button'
                            onClick={() => handleOrderClick()}
                            disabled = {calculateTotalAmount() <= 0}
                        >Add To Order ${calculateTotalAmount()}</button>
                    </div>
                </div>
            ) : (<>Loading . . .</>)}
        </div>
    )
}

export default SelectedCard; 