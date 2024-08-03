import React, {useState, useEffect} from 'react';
import "./CreateCoupons.css";

function CreateCoupons() {

  const [formData, setFormData] = useState({
    code: '',
    discount: '',
    expirationDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      code: '',
      discount: '',
      expirationDate: ''
    });
  };


  return (
    <div className='create-coupon-wrapper'>
      <h2>Create Coupons </h2>
      <div className="coupon-form-container">
        <form onSubmit={handleSubmit}>
          <div className="coupon-form-group">
            <label htmlFor="code">Code:</label>
            <input
              type="text"
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
            />
          </div>
          <div className="coupon-form-group">
            <label htmlFor="discount">Discount (%):</label>
            <input
              type="number"
              id="discount"
              name="discount"
              value={formData.discount}
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
              value={formData.expirationDate}
              onChange={handleChange}
              required
            />
          </div>
          <button className='create-coupon-button' type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default CreateCoupons