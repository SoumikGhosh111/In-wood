import React, { useState, useEffect } from 'react';
import "./Menu.css";
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { baseUrl } from '../../functions/baseUrl';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import DeleteIcon from '@mui/icons-material/Delete';
//toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Menu() {
  const [menu, setMenu] = useState(null);
  const [editItemId, setEditItemId] = useState(null); // Track which item is being edited
  const [fileInputVisible, setFileInputVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [deletedName, setDeletedName] = useState('');
  const [productDetails, setProductDetails] = useState({
    img: '',
    title: '',
    desc: '',
    catagory: '',
    prices: [],
    extraOptions: [{ text: '', price: '' }]
  });
  const [open, setOpen] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')

  const fetchMenu = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/product/getAllFood/All`);
      const result = await res.json();
      setMenu(result.data.food);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  }

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleEditButtonClick = (item) => {
    setEditItemId(item._id);
    setProductDetails({
      img: item.img,
      title: item.title,
      desc: item.desc,
      catagory: item.catagory,
      prices: item.prices,
      extraOptions: item.extraOptions
    });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({
      ...productDetails,
      [name]: value
    });
  }

  const handleCatagoryChange = (e) => {
    const { value } = e.target;
    setProductDetails(prevState => ({
      ...prevState,
      catagory: value
    }));
  };


  // handle prices array 
  const handlePriceChange = (index, value) => {
    const newPrices = [...productDetails.prices];
    newPrices[index] = value;
    setProductDetails({
      ...productDetails,
      prices: newPrices
    });
  }

  // const handlePriceChange = (index, value) => {
  //   // converting the number from text to number
  //   const newValue = Number(value);

  //   const newPrices = [...productDetails.prices];
  //   newPrices[index] = newValue;

  //   setProductDetails({
  //    ...productDetails,
  //     prices: newPrices
  //   });
  // };



  // handle extra toppings array
  const handleExtraOptionChange = (index, type, value) => {
    // creating a deep copy
    const newOptions = productDetails.extraOptions.map(option => ({ ...option }));

    if (type === 'text') {
      newOptions[index].text = value;
    } else if (type === 'price') {
      newOptions[index].price = value;
    }

    setProductDetails({
      ...productDetails,
      extraOptions: newOptions
    });
  };

  const handleAddExtraOption = () => {
    setProductDetails({
      ...productDetails,
      extraOptions: [...productDetails.extraOptions, '']
    });
  }

  const handleRemoveExtraOption = (index) => {
    const newOptions = productDetails.extraOptions.filter((_, i) => i !== index);
    setProductDetails({
      ...productDetails,
      extraOptions: newOptions
    });
  }


  const handleImageUpload = async (e) => {
    const file = e.target.files[0]; // Get the first selected file
    // setImage(file);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await axios.post(`${baseUrl}/api/image/uploadImage`, formData);

      setUploadedImageUrl(data.url);

      productDetails.img = data.url;
      // console.log(image); 
    }
    catch (err) {
      console.log(err);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const token = localStorage.getItem('token')
      const email = localStorage.getItem('userEmail');
      const response = await fetch(`${baseUrl}/api/product/productDetails/${email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id: editItemId, ...productDetails })
      });

      const result = await response.json();
      console.log(result);
      if (result.success) {
        toast.success("Product details updated successfully");
        setOpen(false);
        fetchMenu();
        setEditItemId(null);
      } else {
        toast.error("Failed to update product details");
      }
    } catch (error) {
      console.error("Error updating product details:", error);
      toast.error(error.message);
    }


  }

  const handleMenuItemDelete = async (id) => {
    try {
      const email = localStorage.getItem('userEmail');
      const token = localStorage.getItem('token');
      const response = await fetch(`${baseUrl}/api/product/productDelete/${id}/${email}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const result = await response.json();
      // console.log(result);
      setOpenPopUp(false);
      fetchMenu();
      toast.success(result.message);
      setDeleteId('');
    } catch (err) {

    }
  }




  return (
    <div className='menu-wrapper'>
      <h1>Menu</h1>
      <div className='menu-table'>
        <table>
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Img</th>
              <th>Name</th>
              <th>Description</th>
              <th>Extra Toppings</th>
              <th>Category</th>
              <th>Prices</th>
              <th>Modify Menu</th>
            </tr>
          </thead>
          <tbody>
            {menu !== null ?
              menu.map((item, indx) => (
                <tr key={item._id}>
                  <td>{indx + 1}</td>
                  <td>
                    <div className='admin-menu-img'>
                      <div className='admin-menu-img-img'>
                        <img
                          src={item.img}
                          alt="No Img"
                        />
                      </div>
                    </div>
                  </td>
                  <td>{item.title}</td>
                  <td style={{ width: '200px' }}>{item.desc}</td>
                  <td style={{ textAlign: 'left' }}>
                    {item.extraOptions?.map((topping, index) => (
                      <span key={index}>{topping.text} &nbsp; ${topping.price}<br /></span>
                    ))}
                  </td>
                  <td>{item.catagory}</td>
                  <td>{item.prices.map((price) => (<div key={price}>$&nbsp; {price}</div>))}</td>
                  <td>
                    <button onClick={() => { handleEditButtonClick(item); setOpen(true) }} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}><BorderColorRoundedIcon /></button> &nbsp;&nbsp;
                    <button onClick={() => { setOpenPopUp(true); setDeleteId(item._id); setDeletedName(item.title) }} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}><DeleteIcon /></button>
                  </td>
                </tr>
              )) :
              <tr>
                <td colSpan="8">Loading...</td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <Backdrop
        sx={{ color: '#000', zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: "rgba(0, 0, 0, 0.238)" }}
        open={open}
      >

        {editItemId && (
          <div className="edit-form">
            <div className='edit-form-header'>
              <h2 style={{ marginLeft: '1rem' }}>Edit Product</h2>
              <div className='cancel-bttn' onClick={() => setOpen(false)}>
                <ClearRoundedIcon sx={{ fontSize: "30px" }} />
              </div>
            </div>
            <div style={{ padding: '20px 20px' }}>
              <div className="form-group">
                <label>Title:</label>
                <input type="text" name="title" value={productDetails.title} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <input type="text" name="desc" value={productDetails.desc} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Category:</label>
                <select name="category" value={productDetails.catagory} onChange={(e) => handleCatagoryChange(e)}>
                  {/* <option value="">Select a category</option> */}
                  <option value="Speciality Pizza">Speciality Pizza</option>
                  <option value="Pizza By Slice">Pizza By Slice</option>
                  <option value="Chicken Wings">Chicken Wings</option>
                  <option value="Deep Fried">Deep Fried</option>
                  <option value="Breads/Baked Goods">Breads/Baked Goods</option>
                  <option value="Cookies and Cream">Cookies and Cream</option>
                  <option value="Milk Shake">Shakes</option>
                  <option value="Drinks">Drinks</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="img">Image URL:</label>
                <input
                  type="text"
                  id="img"
                  name="img"
                  value={productDetails.img}

                  disabled
                />
                <br /><br />

                <label htmlFor="uploadImage">Upload Image:</label>
                <input
                  type="file"
                  id="uploadImage"
                  accept="image/"
                  onChange={(e) => handleImageUpload(e)}
                />
              </div>

              <div className="form-group">
                <label>Prices:</label>
                {productDetails.prices.map((price, index) => (
                  <div key={index} className="price-input">
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => handlePriceChange(index, e.target.value)}
                    />
                  </div>
                ))}
              </div>
              <div className="form-group">
                <label>Extra Options:</label>
                {productDetails.extraOptions.map((option, index) => (
                  <div key={index} className="option-input">
                    <input
                      type="text"
                      placeholder="Option Text"
                      value={option.text}
                      onChange={(e) => handleExtraOptionChange(index, 'text', e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Option Price"
                      value={option.price}
                      onChange={(e) => handleExtraOptionChange(index, 'price', e.target.value)}
                    />
                    <button type="button" onClick={() => handleRemoveExtraOption(index)}>Remove</button>
                  </div>
                ))}
                <button className='add-toppings' type="button" onClick={handleAddExtraOption}>Add Option</button>
              </div>
              <div className="form-actions">
                <button className="update-btn" onClick={handleUpdateProduct}>Update</button>
                <button className="cancel-btn" onClick={() => { setEditItemId(null); setOpen(false) }}>Cancel</button>
              </div>
            </div>
          </div>
        )}

      </Backdrop>


      <Backdrop
        sx={{ color: '#000', zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: "rgba(0, 0, 0, 0.238)" }}
        open={openPopUp}
      >
        <div className="popup-overlay">
          <div className="popup">
            <h2>Do you want to Delete <br /> item Name: {deletedName} </h2>
            <div className="popup-buttons">
              <button className="popup-button save" onClick={() => handleMenuItemDelete(deleteId)}>Delete</button>
              <button className="popup-button cancel" onClick={() => setOpenPopUp(false)}>Cancel</button>
            </div>
          </div>
        </div>
      </Backdrop>
      <ToastContainer />
    </div>
  );
}

export default Menu;

