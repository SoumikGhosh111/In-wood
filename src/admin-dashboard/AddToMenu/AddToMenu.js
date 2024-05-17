import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddToMenu.css';

function AddToMenu() {
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    img: uploadedImageUrl,
    catagory: '',
    productType: '',
    prices: '',
    extraOptions: [],
  });

  useEffect(() => {
    setFormData({
      ...formData,
      img: uploadedImageUrl
    })
  }, [uploadedImageUrl]);

  const [topping, setTopping] = useState({
    text: '',
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]; // Get the first selected file
    // setImage(file);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await axios.post('http://localhost:8000/api/image/uploadImage', formData);

      setUploadedImageUrl(data.url);
      // console.log(image); 


    }
    catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); 
      const email = localStorage.getItem('userEmail'); 
      const response = await fetch(`http://localhost:8000/api/product/addfood/${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Send the JWT token in the Authorization header
        },
        body: JSON.stringify(formData),
      });
      console.log(formData)
      const result = response.json(); 
      console.log('Food created:', result);
      setFormData({
        title: '',
        desc: '',
        img: '',
        catagory: '',
        productType: '',
        prices: '',
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
          required
          disabled
        /><br /><br />

        <label htmlFor="uploadImage">Upload Image:</label><br />
        <input
          type="file"
          id="uploadImage"
          accept="image/"
          onChange={(e) => handleImageUpload(e)}
        /><br /><br />
        {/* <button onClick={handleImageUpload}>Up Load Img</button> */}
        <label htmlFor="productType">Product Type:</label><br />
        <input
          type="text"
          id="productType"
          name="productType"
          value={formData.productType}
          onChange={handleChange}
          required
        // disabled
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
          <option value="Pizza">Pizza</option>
          <option value="Ice Cream">Ice Cream</option>
          <option value="Milk Shake">Milk Shake</option>
          <option value="Non Veg Pizza">Non Veg Pizza</option>
        </select><br /><br />

        <label htmlFor="prices">Prices (comma-separated list):</label><br />
        <input
          type="number"
          id="prices"
          name="prices"
          value={formData.prices}
          onChange={handleChange}
          required
        /><br /><br />

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
          <div key={index} className='toppings-add-to-menu'>
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

        <button type="submit">Create Food</button>
      </form>
    </div>
  );
}

export default AddToMenu;



// import React, { useState } from 'react';
// import axios from 'axios';
// import './AddToMenu.css';

// function AddToMenu() {
//   const [uploadedImageUrl, setUploadedImageUrl] = useState('');
//   const [formData, setFormData] = useState({
//     title: '',
//     desc: '',
//     img: uploadedImageUrl,
//     catagory: '',
//     prices: '',
//     extraOptions: [],
//   });

//   const [topping, setTopping] = useState({
//         text: '',
//         price: '',
//       });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleToppingChange = (e, index) => {
//     const { name, value } = e.target;
//     const updatedToppings = [...formData.extraOptions];
//     updatedToppings[index][name] = value;
//     setFormData({ ...formData, extraOptions: updatedToppings });
//   };

//   const addTopping = () => {
//     if (topping.text.trim() !== '' && topping.price.trim() !== '') {
//       const newTopping = { text: topping.text, price: parseFloat(topping.price) };
//       setFormData({
//         ...formData,
//         extraOptions: [...formData.extraOptions, newTopping],
//       });
//       setTopping({ text: '', price: '' }); // Reset topping input after adding
//     } else {
//       alert('Please enter both topping name and price.');
//     }
//   };

//   const removeTopping = (indexToRemove) => {
//     const updatedToppings = formData.extraOptions.filter((_, index) => index !== indexToRemove);
//     setFormData({ ...formData, extraOptions: updatedToppings });
//   };

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', 'your_cloudinary_upload_preset'); // Replace with your Cloudinary upload preset

//     try {
//       const {data} = await axios.post('http://localhost:8000/api/image/uploadImage', formData);
//       setUploadedImageUrl(data.url); // Store the secure URL
//     } catch (error) {
//       console.error('Error uploading image:', error);
//       alert('Failed to upload image. Please try again.');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const updatedFormData = {
//       ...formData,
//       img: uploadedImageUrl || formData.img // Use uploaded image URL if available
//     };

//     try {
//       const response = await axios.post('http://localhost:8000/api/product/addfood', updatedFormData);
//       console.log('Food created:', response.data.data.food);
//       setFormData({
//         title: '',
//         desc: '',
//         img: '',
//         catagory: '',
//         prices: '',
//         extraOptions: [],
//       });
//       setUploadedImageUrl(''); // Clear uploaded image URL
//       alert('Food Successfully Added!');
//     } catch (error) {
//       console.error('Error creating food:', error);
//       alert('Failed to add food. Please try again.');
//     }
//   };

//   return (
//     <div className="add-to-menu-wrapper">
//       <h1>Create New Food Item</h1>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="title">Title:</label><br />
//         <input
//           type="text"
//           id="title"
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//           required
//           maxLength="60"
//         /><br /><br />

//         <label htmlFor="desc">Description:</label><br />
//         <textarea
//           id="desc"
//           name="desc"
//           value={formData.desc}
//           onChange={handleChange}
//           required
//           maxLength="200"
//         ></textarea><br /><br />

//         <label htmlFor="img">Image URL:</label><br />
//         <input
//           type="text"
//           id="img"
//           name="img"
//           value={uploadedImageUrl || formData.img}
//           onChange={handleChange}
//           disabled
//         /><br /><br />

//         <label htmlFor="uploadImage">Upload Image:</label><br />
//         <input
//           type="file"
//           id="uploadImage"
//           accept="image/*"
//           onChange={handleImageUpload}
//         /><br /><br />

//         <label htmlFor="category">Category:</label><br />
//         <select
//           id="catagory"
//           name="catagory"
//           value={formData.catagory}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select a category</option>
//           <option value="Pizza">Pizza</option>
//           <option value="Ice Cream">Ice Cream</option>
//           <option value="Milk Shake">Milk Shake</option>
//           <option value="Non Veg Pizza">Non Veg Pizza</option>
//         </select><br /><br />

//         <label htmlFor="prices">Prices (comma-separated list):</label><br />
//         <input
//           type="text"
//           id="prices"
//           name="prices"
//           value={formData.prices}
//           onChange={handleChange}
//           required
//         /><br /><br />

//         {formData.extraOptions.map((topping, index) => (
//           <div key={index} className='toppings-add-to-menu'>
//             <input
//               type="text"
//               name="text"
//               value={topping.text}
//               onChange={(e) => handleToppingChange(e, index)}
//             />
//             <input
//               type="number"
//               name="price"
//               value={topping.price}
//               onChange={(e) => handleToppingChange(e, index)}
//             />
//              <button
//               type="button"
//               onClick={() => removeTopping(index)}
//               className="delete-button"
//             >Delete</button>
//           </div>
//         ))}

//         <button type="submit">Create Food</button>
//       </form>
//     </div>
//   );
// }

// export default AddToMenu;

