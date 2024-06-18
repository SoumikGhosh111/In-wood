import React, { useState } from 'react';
import './AddSpecialOffers.css';

export default function AddSpecialOffers() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [offerPrice, setOfferPrice] = useState('');
    const [bases, setBases] = useState([{ base: '', toppings: '', count: '' }]);
    const [addedItems, setAddedItems] = useState([{ item: '', count: '' }]);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const errors = {};
        if (!title) errors.title = 'Title is required';
        if (!description) errors.description = 'Description is required';
        if (!offerPrice) errors.offerPrice = 'Offer Price is required';

        bases.forEach((base, index) => {
            if (!base.base) errors[`base${index}`] = 'Base is required';
            if (!base.toppings || isNaN(base.toppings) || base.toppings <= 0) errors[`toppings${index}`] = 'Number of toppings must be a positive number';
            if (!base.count || isNaN(base.count) || base.count <= 0) errors[`count${index}`] = 'Count must be a positive number';
        });

        addedItems.forEach((item, index) => {
            if (!item.item) errors[`addedItem${index}`] = 'Added item is required';
            if (!item.count || isNaN(item.count) || item.count <= 0) errors[`addedItemCount${index}`] = 'Number of this added item must be a positive number';
        });

        return errors;
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission

        console.log({ title, description, bases, addedItems, offerPrice });
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            // Add your form submission logic here
        } else {
            setErrors(validationErrors);
        }
    };

    const handleBaseChange = (index, field, value) => {
        const newBases = [...bases];
        newBases[index][field] = value;
        setBases(newBases);
    };

    const handleAddedItemChange = (index, field, value) => {
        const newAddedItems = [...addedItems];
        newAddedItems[index][field] = value;
        setAddedItems(newAddedItems);
    };

    const addBase = () => {
        setBases([...bases, { base: '', toppings: '', count: '' }]);
    };

    const removeBase = (index) => {
        const updatedBases = [...bases];
        updatedBases.splice(index, 1);
        setBases(updatedBases);
    };

    const addAddedItem = () => {
        setAddedItems([...addedItems, { item: '', count: '' }]);
    };

    const removeAddedItem = (index) => {
        const updatedAddedItems = [...addedItems];
        updatedAddedItems.splice(index, 1);
        setAddedItems(updatedAddedItems);
    };

    return (
        <form className="special-offer-pizza-form" onSubmit={handleSubmit}>
            {/* Existing form groups */}
            <div className="special-offer-form-group">
                <label htmlFor="title" className="special-offer-form-label">Title:</label>
                <input
                    type="text"
                    id="title"
                    className="special-offer-form-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {errors.title && <p className="special-offer-error-message">{errors.title}</p>}
            </div>
            <div className="special-offer-form-group">
                <label htmlFor="description" className="special-offer-form-label">Description:</label>
                <textarea
                    id="description"
                    className="special-offer-form-textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {errors.description && <p className="special-offer-error-message">{errors.description}</p>}
            </div>

            {bases.map((base, index) => (
                <div key={index} className="special-offer-base-section">
                    <div className="special-offer-form-group">
                        <label htmlFor={`base${index}`} className="special-offer-form-label">Base {index + 1}:</label>
                        <select
                            id={`base${index}`}
                            className="special-offer-form-input"
                            value={base.base}
                            onChange={(e) => handleBaseChange(index, 'base', e.target.value)}
                        >
                            <option value="">Select a base</option>
                            <option value="Speciality Pizza">Speciality Pizza</option>
                            <option value="Pizza By Slice">Pizza By Slice</option>
                            <option value="Chicken Wings">Chicken Wings</option>
                            <option value="Deep Fried">Deep Fried</option>
                            <option value="Breads/Baked Goods">Breads/Baked Goods</option>
                            <option value="Cookies and Cream">Cookies and Cream</option>
                            <option value="Milk Shake">Shakes</option>
                            <option value="Drinks">Drinks</option>
                        </select>
                        {errors[`base${index}`] && <p className="special-offer-error-message">{errors[`base${index}`]}</p>}
                    </div>

                    <div className="special-offer-form-group">
                        <label htmlFor={`toppings${index}`} className="special-offer-form-label">Number of Toppings:</label>
                        <input
                            type="number"
                            id={`toppings${index}`}
                            className="special-offer-form-input"
                            value={base.toppings}
                            onChange={(e) => handleBaseChange(index, 'toppings', e.target.value)}
                        />
                        {errors[`toppings${index}`] && <p className="special-offer-error-message">{errors[`toppings${index}`]}</p>}
                    </div>

                    <div className="special-offer-form-group">
                        <label htmlFor={`count${index}`} className="special-offer-form-label">Count:</label>
                        <input
                            type="number"
                            id={`count${index}`}
                            className="special-offer-form-input"
                            value={base.count}
                            onChange={(e) => handleBaseChange(index, 'count', e.target.value)}
                        />
                        {errors[`count${index}`] && <p className="special-offer-error-message">{errors[`count${index}`]}</p>}
                    </div>

                    <button type="button" className="special-offer-form-button" onClick={() => removeBase(index)}>Remove Base</button>
                </div>
            ))}

            <button type="button" className="special-offer-form-button" onClick={addBase}>Add Base</button>

            {/* Added Items */}
            {addedItems.map((item, index) => (
                <div key={index} className="special-offer-added-item-section">
                    <div className="special-offer-form-group">
                        <label htmlFor={`addedItem${index}`} className="special-offer-form-label">Added Item {index + 1}:</label>
                        <select
                            id={`addedItem${index}`}
                            className="special-offer-form-input"
                            value={item.item}
                            onChange={(e) => handleAddedItemChange(index, 'item', e.target.value)}
                        >
                            <option value="">Select an added item</option>
                            <option value="Speciality Pizza">Speciality Pizza</option>
                            <option value="Pizza By Slice">Pizza By Slice</option>
                            <option value="Chicken Wings">Chicken Wings</option>
                            <option value="Deep Fried">Deep Fried</option>
                            <option value="Breads/Baked Goods">Breads/Baked Goods</option>
                            <option value="Cookies and Cream">Cookies and Cream</option>
                            <option value="Milk Shake">Shakes</option>
                            <option value="Drinks">Drinks</option>
                            {/* Other options */}
                        </select>
                        {errors[`addedItem${index}`] && <p className="special-offer-error-message">{errors[`addedItem${index}`]}</p>}
                    </div>
                    <div className="special-offer-form-group">
                        <label htmlFor={`addedItemCount${index}`} className="special-offer-form-label">Count:</label>
                        <input
                            type="number"
                            id={`addedItemCount${index}`}
                            className="special-offer-form-input"
                            value={item.count}
                            onChange={(e) => handleAddedItemChange(index, 'count', e.target.value)}
                        />
                        {errors[`addedItemCount${index}`] && <p className="special-offer-error-message">{errors[`addedItemCount${index}`]}</p>}
                    </div>
                    <button type="button" className="special-offer-form-button" onClick={() => removeAddedItem(index)}>Remove Added Item</button>
                </div>
            ))}

            <button type="button" className="special-offer-form-button" onClick={addAddedItem}>Add Added Item</button>

            {/* Offer Price */}
            <div className="special-offer-form-group">
                <label htmlFor="offerPrice" className="special-offer-form-label">Offer Price</label>
                <input
                    type='number'
                    id="offerPrice"
                    className="special-offer-form-input"
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(e.target.value)}
                />
                {errors.offerPrice && <p className="special-offer-error-message">{errors.offerPrice}</p>}
            </div>

            {/* Submit button */}
            <button type="submit" className="special-offer-form-button" >Submit</button>
        </form>
    );
}
