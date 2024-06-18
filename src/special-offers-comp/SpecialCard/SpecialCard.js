import React, { useEffect, useState } from 'react';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import pizzaImg from "../../assets/img_not_found.jpg";


function SpecialCard({ data, onCancelButtonClick, onOrderButtonClick, offerdata }) {
    const [itemData, setItemData] = useState(null);
    const [sizeChange, setSizeChange] = useState(null);
    const [sizeSelected, setSizeSelected] = useState(false);
    // const [size, setSize] = useState(null); 

    const [selectedTopping, setSelectedTopping] = useState([]);
    const [isTopingsChecked, setIsToppingsChecked] = useState(false);
    console.log(data);
    console.log(offerdata);

    const handleCancelButtonClick = () => {
        onCancelButtonClick();
        // orderReset();
    }
    useEffect(() => {
        setItemData(data);
    }, [data]); 

    const handleToppingChange = (topping, isChecked) => {
        if (isChecked) {
            setSelectedTopping([...selectedTopping, topping]);
            setIsToppingsChecked(true)
        } else {
            setSelectedTopping(selectedTopping.filter(item => item._id !== topping._id));
            setIsToppingsChecked(false);
        }
    };
    return (
        <div className='selected-card-wrapper'>
            {itemData !== null ?
                (<div className='selected-card-items'>
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
                        <button className='selected-card-item-place-order-button'
                        >Add To Order</button>
                    </div>
                </div>) : (<>Loading . . .</>)}

        </div>
    )
}

export default SpecialCard;