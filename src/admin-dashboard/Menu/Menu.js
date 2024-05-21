// import React, { useState, useEffect } from 'react';
// import "./Menu.css";

// function Menu() {

//   const [menu, setMenu] = useState(null)

//   const fetchMenu = async() => { 
//     const res = await fetch("http://localhost:8000/api/product/getAllFood/All"); 
//     const result = await res.json(); 
//     setMenu(result.data.food)

//   }
//   useEffect(() => {
//     // fetch("http://localhost:8000/api/product/getAllFood")
//     //   .then(res => res.json())
//     //   .then(data => setMenu(data))
//     //   .catch(err => console.log(err));
//     // console.log(menu, "this is menu");
//     fetchMenu(); 

//   }, []);


//   console.log(menu); 
//   return (

//     <div className='menu-wrapper'>
//       <h1>Menu</h1>
//       <div className='menu-table'>

//         <table>
//           <thead>
//             <tr>
//               <th>SL No.</th>
//               <th>Img</th>
//               <th>Name</th>
//               <th>Description</th>
//               <th>Extra Toppings</th>
//             </tr>
//           </thead>
//           <tbody>
//             {menu !== null ?
//               (<>
//                 {menu.map((item, indx) => (
//                   <tr>
//                     <td>{indx + 1}</td>
//                     <td>
//                       <img src={item.img} style={{width: "100px", height: "100px"}}/>
//                     </td>
//                     <td>
//                       {item.title}
//                     </td>
//                     <td>
//                       {item.desc}
//                     </td>
//                     <td>
//                       {item.extraOptions?.map((topping) => ( 
//                         <>
//                           <span>{topping.text}</span>
//                           <br/>
//                         </>
//                       ))}
//                     </td>
//                   </tr>
//                 ))}
//               </>) :
//               (<>Loading . . . </>)}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default Menu



import React, { useState, useEffect } from 'react';
import "./Menu.css";
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

import axios from 'axios';

//toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Menu() {
  const [menu, setMenu] = useState(null);
  const [editItemId, setEditItemId] = useState(null); // Track which item is being edited
  const [fileInputVisible, setFileInputVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchMenu = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/product/getAllFood/All");
      const result = await res.json();
      setMenu(result.data.food);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  }

  useEffect(() => {
    fetchMenu();
  }, []);

  // const handleImageUpload = async (itemId, file) => {
  //   try {
  //     // Upload image to Cloudinary
  //     const cloudinaryUrl = 'CLOUDINARY_UPLOAD_URL_HERE';
  //     const formData = new FormData();
  //     formData.append('file', file);
  //     formData.append('upload_preset', 'YOUR_CLOUDINARY_UPLOAD_PRESET');

  //     const response = await fetch(cloudinaryUrl, {
  //       method: 'POST',
  //       body: formData
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to upload image to Cloudinary');
  //     }

  //     const data = await response.json();
  //     const imageUrl = data.secure_url;

  //     // Now make an API call to update the image URL for the specific item
  //     const updateImageUrlApiUrl = `http://localhost:8000/api/product/updateImage/${itemId}`;
  //     const updateResponse = await fetch(updateImageUrlApiUrl, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ imageUrl })
  //     });

  //     if (!updateResponse.ok) {
  //       throw new Error('Failed to update image URL');
  //     }

  //     // If successful, fetch the updated menu
  //     fetchMenu();
  //     setEditItemId(null); // Reset editItemId after successful update
  //     setFileInputVisible(false); // Hide file input after upload
  //     setSelectedFile(null); // Reset selected file
  //   } catch (error) {
  //     console.error("Error updating image URL:", error);
  //   }
  // }



  const handleSubmitImage = () => {
    if (selectedFile && editItemId) {
      handleImageUpload(editItemId, selectedFile);
    } else {
      console.error("No file selected or item ID missing.");
    }
  }


  const handleImageUpload = async (id, file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const email = localStorage.getItem('userEmail'); 
      const token = localStorage.getItem('token'); 
      const { data } = await axios.post('http://localhost:8000/api/image/uploadImage', formData);


      const imageData = {
        img: data.url,
        id: id
      }

      const response = await fetch(`http://localhost:8000/api/product/productImage/${email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(imageData)
      })
      const result = await response.json();  

      console.log(data.url, "new URL");
      console.log(result, "imageData");

      fetchMenu(); 
      // console.log(image); 
      toast.success(`Image Uploaded Success fully `);
      setEditItemId(null);
      setFileInputVisible(false);
      setSelectedFile(null);
    }
    catch (err) {
      console.log(err);
      toast.error("Unable to upload image")
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
                          style={{ cursor: "pointer" }}
                          alt={item.title}
                          onClick={() => {
                            setEditItemId(item._id);
                            setFileInputVisible(true);
                          }}
                        />
                      </div>
                      {editItemId === item._id && fileInputVisible && (
                        <div className='menu-order-input-butttons'>
                          <input
                            type="file"
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                          />
                          <button onClick={handleSubmitImage}><DoneRoundedIcon sx={{ transform: "translateY(10%)" }} /></button>
                          <button onClick={() => setFileInputVisible(false)}><ClearRoundedIcon sx={{ transform: "translateY(10%)" }} /></button>
                        </div>
                      )}
                    </div>
                  </td>
                  <td>{item.title}</td>
                  <td>{item.desc}</td>
                  <td>
                    {item.extraOptions?.map((topping, index) => (
                      <span key={index}>{topping.text}<br /></span>
                    ))}
                  </td>
                </tr>
              )) :
              <tr>
                <td colSpan="5">Loading...</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Menu;


