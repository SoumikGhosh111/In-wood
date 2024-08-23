import React, { useState } from 'react';
import "./CreateCoupons.css";
import { baseUrl } from "../../functions/baseUrl";

function CreateCoupons() {

  const [formData, setFormData] = useState({
    code: '',
    discountPercentage: '',
    expirationDate: '',
    description: '',
    minSpend: '',
    maxDiscountValue: '', 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    console.log(formData, "this is form data");
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const {code, discountPercentage, expirationDate, description, minSpend, maxDiscountValue} = formData; 
      const response = await fetch(`${baseUrl}/api/coupon/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({code, discountPercentage, expirationDate, description, minSpend, maxDiscountValue})
      });
  
      const data = await response.json();
      alert('Coupon created successfully:', data);
      setFormData({
        code: '',
        discountPercentage: '',
        expirationDate: '',
        description: '',
        minSpend: '',
        maxDiscountValue: ''
      });
    } catch (e) {
      alert('Error creating coupon:', e.message);
    }
  
    console.log(formData, "this is form data");
  };
  
  
  return (
    <div className='create-coupon-wrapper'>
      <h2>Create Coupons</h2>
      <div className="coupon-form-container">
        <form >
          <div className="coupon-form-group">
            <label htmlFor="code">Coupon Code:</label>
            <input
              type="text"
              id="code"
              name="code"
              placeholder='Enter Coupon Code'
              value={formData.code}
              onChange={handleChange}
              required
            />
          </div>
          <div className="coupon-form-group">
            <label htmlFor="discountPercentage">Discount (%):</label>
            <input
              type="number"
              id="discountPercentage"
              name="discountPercentage"
              placeholder='Enter Discount Percentage'
              value={formData.discountPercentage}
              onChange={handleChange}
              required
            />
          </div>
          <div className="coupon-form-group">
            <label htmlFor="expirationDate">Expiration Date:</label>
            <input
              type="date"
              id="expirationDate"
              name="expirationDate"
              placeholder='Enter Expiration Date'
              value={formData.expirationDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="coupon-form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              placeholder='Enter Coupon Description'
              name='description'
              required
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="coupon-form-group">
            <label htmlFor="minSpend">Minimum Amount to Execute ($):</label>
            <input
              type='number'
              placeholder='Enter Amount'
              name='minSpend'
              required
              value={formData.minSpend}
              onChange={handleChange}
            />
          </div>
          <div className="coupon-form-group">
            <label htmlFor="maxDiscountValue">Maximu Discount Amount ($):</label>
            <input
              type='number'
              placeholder='Enter Amount'
              name='maxDiscountValue'
              required
              value={formData.maxDiscountValue}
              onChange={handleChange}
            />
          </div>
          <button className='create-coupon-button' type="submit" onClick={(e)=> handleSubmit(e)}>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default CreateCoupons;
