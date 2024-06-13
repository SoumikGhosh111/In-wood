import React, { useEffect, useState } from 'react';
import "../../home-page-components/SelectedCard/SelectedCard.css";
import pizzaImg from "../../assets/img_not_found.jpg";
// import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, incrementQty, decrementQty } from '../../redux/slices/cartSlice';

function SpecialCard({ data, onCancelButtonClick }) {
    const [selectedWing, setSelectedWing] = useState(null);
    const [selectedToppings, setSelectedToppings] = useState([]);

    if (!Array.isArray(data) || data.length === 0) {
        return <div>Loading . . .</div>;
    }

    const itemData = data[0];

    const handleCancelButtonClick = () => {
        onCancelButtonClick();
        orderReset();
    }

    const handleWingChange = (event) => {
        setSelectedWing(event.target.value);
    }

    const handleToppingChange = (event) => {
        const topping = event.target.value;
        if (selectedToppings.includes(topping)) {
            setSelectedToppings(selectedToppings.filter(item => item !== topping));
        } else if (selectedToppings.length < itemData.quantityToppings) {
            setSelectedToppings([...selectedToppings, topping]);
        }
    }


    const orderReset = () => {
        setSelectedWing(null);
        setSelectedToppings([]);
    }
    return (
        <div className='selected-card-wrapper'>
            <div className='selected-card-item'>
                <div className='selected-card-title'>
                    <h1>{itemData.title}</h1>
                    <div className='cancel-bttn' onClick={handleCancelButtonClick}>
                        <ClearRoundedIcon sx={{ fontSize: "30px" }} />
                    </div>
                </div>
                <div className='selected-card-item-img'>
                    <img src={itemData.img === '' ? pizzaImg : itemData.img} alt={itemData.title} />
                </div>
                <div className='selected-card-desc'>
                    <h3>Description</h3>
                    <p>{itemData.desc}</p>
                </div>
                <div className='selected-card-item-body'>
                    {itemData.addedItems?.length > 0 && (
                        <>
                            <h3>Added Items</h3>
                            <span>Any 1 of your choice</span>
                            <div>
                                {itemData.addedItems.map((item) => (
                                    <div key={item.id}>
                                        <input
                                            type="radio"
                                            id={`wing-${item.id}`}
                                            name="wing"
                                            value={item.name}
                                            onChange={handleWingChange}
                                            checked={selectedWing === item.name}
                                        />
                                        <label htmlFor={`wing-${item.id}`}>{item.name}</label>
                                    </div>
                                ))}
                                
                            </div>
                        </>
                    )}
                    {/* {itemData.addedItems?.length > 0 && (
                        <>
                            <h3>Added Items</h3>
                            <span>Any 1 of your choice</span>
                            <div>
                                <select value={selectedWing} onChange={handleWingChange}>
                                    <option value="">Select an item</option>
                                    {itemData.addedItems.map((item) => (
                                        <option key={item.id} value={item.name}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )} */}
                    {itemData.extraOptions?.length > 0 && (
                        <>
                            <h3>Extra Toppings</h3>
                            <span>Select up to {itemData.quantityToppings} toppings</span>
                            <div>
                                {itemData.extraOptions.map((option) => (
                                    <div key={option._id}>
                                        <input
                                            type="checkbox"
                                            id={`topping-${option._id}`}
                                            value={option.text}
                                            onChange={handleToppingChange}
                                            checked={selectedToppings.includes(option.text)}
                                            disabled={!selectedToppings.includes(option.text) && selectedToppings.length >= itemData.quantityToppings}
                                        />
                                        <label htmlFor={`topping-${option._id}`}>{option.text}</label>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

            </div>
            <div className='selected-card-item-place-order'>


                <button className='selected-card-item-place-order-button'


                >Add To Order ${itemData.prices[0]}</button>
            </div>
        </div>
    )
}

export default SpecialCard;