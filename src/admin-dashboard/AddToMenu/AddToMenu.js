import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddToMenu.css';
import { baseUrl } from '../../functions/baseUrl';

function AddToMenu() {
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    img: uploadedImageUrl,
    catagory: '',
    productType: '',
    prices: [],
    extraOptions: [],
  });

  useEffect(() => {
    setFormData({
      ...formData,
      img: uploadedImageUrl,
    });
  }, [uploadedImageUrl]);

  const [topping, setTopping] = useState({
    text: '',
    price: '',
  });

  const [priceInput, setPriceInput] = useState({
    size: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleToppingChange = (e, index) => {
    const { name, value } = e.target;
    const updatedToppings = [...formData.extraOptions];
    updatedToppings[index][name] = value;
    setFormData({ ...formData, extraOptions: updatedToppings });
  };

  const addTopping = () => {
    if (topping.text.trim() !== '' && topping.price.trim() !== '') {
      const newTopping = { text: topping.text, price: parseFloat(topping.price) };
      setFormData({
        ...formData,
        extraOptions: [...formData.extraOptions, newTopping],
      });
      setTopping({ text: '', price: '' }); // Reset topping input after adding
    } else {
      alert('Please enter both topping name and price.');
    }
  };

  const removeTopping = (indexToRemove) => {
    const updatedToppings = formData.extraOptions.filter((_, index) => index !== indexToRemove);
    setFormData({ ...formData, extraOptions: updatedToppings });
  };

  const addPrice = () => {
    if (priceInput.size.trim() !== '' && priceInput.price.trim() !== '') {
      const newPrice = { size: priceInput.size, price: parseFloat(priceInput.price) };
      setFormData({
        ...formData,
        prices: [...formData.prices, newPrice],
      });
      setPriceInput({ size: '', price: '' }); // Reset price input after adding
    } else {
      alert('Please enter both size and price.');
    }
  };

  const handlePriceChange = (e, index) => {
    const { name, value } = e.target;
    const updatedPrices = [...formData.prices];
    updatedPrices[index][name] = name === 'price' ? parseFloat(value) : value;
    setFormData({ ...formData, prices: updatedPrices });
  };

  const removePrice = (indexToRemove) => {
    const updatedPrices = formData.prices.filter((_, index) => index !== indexToRemove);
    setFormData({ ...formData, prices: updatedPrices });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const { data } = await axios.post(`${baseUrl}/api/image/uploadImage`, formData);
      setUploadedImageUrl(data.url);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('userEmail');
      const response = await fetch(`${baseUrl}/api/product/addfood/${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Send the JWT token in the Authorization header
        },
        body: JSON.stringify(formData),
      });
      console.log(formData);
      const result = await response.json();
      console.log('Food created:', result);
      setFormData({
        title: '',
        desc: '',
        img: '',
        catagory: '',
        productType: '',
        prices: [],
        extraOptions: [],
      });
      setUploadedImageUrl('');
      setTopping({ text: '', price: '' });
      alert('Food Successfully Added!');
    } catch (error) {
      console.error('Error creating food:', error);
      alert('Failed to add food. Please try again.');
    }
  };

  return (
    <div className="add-to-menu-wrapper">
      <h1>Create New Food Item</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label><br />
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          maxLength="60"
        /><br /><br />

        <label htmlFor="desc">Description:</label><br />
        <textarea
          id="desc"
          name="desc"
          value={formData.desc}
          onChange={handleChange}
          required
          maxLength="200"
        ></textarea><br /><br />

        <label htmlFor="img">Image URL:</label><br />
        <input
          type="text"
          id="img"
          name="img"
          value={formData.img}
          onChange={handleChange}
          disabled
        /><br /><br />

        <label htmlFor="uploadImage">Upload Image:</label><br />
        <input
          type="file"
          id="uploadImage"
          accept="image/*"
          onChange={handleImageUpload}
        /><br /><br />

        <label htmlFor="productType">Product Type:</label><br />
        <input
          type="text"
          id="productType"
          name="productType"
          value={formData.productType}
          onChange={handleChange}
        /><br /><br />

        <label htmlFor="category">Category:</label><br />
        <select
          id="catagory"
          name="catagory"
          value={formData.catagory}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          <option value="Speciality Pizza">Speciality Pizza</option>
          <option value="Pizza By Slice">Pizza By Slice</option>
          <option value="Chicken Wings">Chicken Wings</option>
          <option value="Deep Fried">Deep Fried</option>
          <option value="Breads/Baked Goods">Breads/Baked Goods</option>
          <option value="Cookies and Cream">Cookies and Cream</option>
          {/* <option value="Milk Shake">Shakes</option> */}
          <option value="Drinks">Drinks</option>
        </select><br /><br />

        <label htmlFor="prices">Prices:</label><br />
        <input
          type="text"
          id="size"
          name="size"
          placeholder="Size"
          value={priceInput.size}
          onChange={(e) => setPriceInput({ ...priceInput, size: e.target.value })}
        />
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Price"
          value={priceInput.price}
          onChange={(e) => setPriceInput({ ...priceInput, price: e.target.value })}
        />
        <button type="button" onClick={addPrice}>Add Price</button><br /><br />
        {formData.prices.map((priceObj, index) => (
          <div key={index} className='prices-add-to-menu'>
            <input
              type="text"
              name="size"
              value={priceObj.size}
              onChange={(e) => handlePriceChange(e, index)}
            />
            <input
              type="number"
              name="price"
              value={priceObj.price}
              onChange={(e) => handlePriceChange(e, index)}
            />
            <button
              type="button"
              onClick={() => removePrice(index)}
              className="delete-button"
            >Delete</button>
          </div>
        ))}

        <div>
          <label htmlFor="toppingText">Topping Name:</label>
          <input
            type="text"
            id="toppingText"
            name="text"
            value={topping.text}
            onChange={(e) => setTopping({ ...topping, text: e.target.value })}
          /><br />
          <label htmlFor="toppingPrice">Topping Price: </label>
          <input
            type="number"
            id="toppingPrice"
            name="price"
            value={topping.price}
            onChange={(e) => setTopping({ ...topping, price: e.target.value })}
          /><br />
          <button type="button" onClick={addTopping}>Add Topping</button><br /><br />
        </div>

        {formData.extraOptions.map((topping, index) => (
          <div key={index}>
            <input
              type="text"
              name="text"
              value={topping.text}
              onChange={(e) => handleToppingChange(e, index)}
            />
            <input
              type="number"
              name="price"
              value={topping.price}
              onChange={(e) => handleToppingChange(e, index)}
            />
            <button
              type="button"
              onClick={() => removeTopping(index)}
              className="delete-button"
            >Delete</button>
          </div>
        ))}
        
        <br />
        <button type="submit" className='btn btn-primary'>Create New Food Item</button>
      </form>
    </div>
  );
}

export default AddToMenu;
