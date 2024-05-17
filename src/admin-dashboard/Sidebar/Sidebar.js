import React, { useState } from 'react';
import "./Sidebar.css";
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import RestaurantMenuRoundedIcon from '@mui/icons-material/RestaurantMenuRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import axios from 'axios';

function Sidebar({ onSideBarItemClicked }) {
    const [activeClass, setActiveClass] = useState(1)
    const handleIconCLick = (indx) => {
        onSideBarItemClicked(indx);
        setActiveClass(indx)
    }
    const [storeStatus, setStoreStatus] = useState('open'); // State to manage store status

    // Function to handle change in store status
    const handleStatusChange = (status) => {
        setStoreStatus(status); // Update store status based on selected option
        handleStoreUpdate(status); 
    };

    const handleHomeClick = () => {
        window.location.href = '/';

        // Clearing the browser's history
        window.history.replaceState(null, '', '/');
    }

    // const handleStoreUpdate = async (status) => {
    //     console.log(status)
    //     try {
    //         const response = await fetch('http://localhost:8000/store/storeUpdate', {
    //             method: 'PUT',
    //             header: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: status
    //         });
    //         const result = await response.json();
    //         console.log(result);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }
    const handleStoreUpdate = async (status) => {
        console.log(status);
        try {
          const response = await axios.put('http://localhost:8000/store/storeUpdate', { status }, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
      
          const result = response.data;
          console.log(result);
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <aside id="sidebar" className=''>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    Inwood Pizza
                </div>
                <span className='icon close_icon'>X</span>
            </div>

            <ul className='sidebar-list'>
                <li className={activeClass === 1 ? 'active-sidebar sidebar-list-item' : 'sidebar-list-item'} onClick={() => handleIconCLick(1)}>
                    <a>
                        <SupervisedUserCircleIcon sx={{ transform: "translateY(20%)", marginRight: "1rem" }} />   Users
                    </a>
                </li>
                <li className={activeClass === 2 ? 'active-sidebar sidebar-list-item' : 'sidebar-list-item'} onClick={() => handleIconCLick(2)}>
                    <a>
                        <BorderColorRoundedIcon sx={{ transform: "translateY(20%)", marginRight: "1rem" }} />   Orders
                    </a>
                </li>
                <li className={activeClass === 3 ? 'active-sidebar sidebar-list-item' : 'sidebar-list-item'} onClick={() => handleIconCLick(3)}>
                    <a >
                        <RestaurantMenuRoundedIcon sx={{ transform: "translateY(20%)", marginRight: "1rem" }} />      Menu
                    </a>
                </li>
                <li className={activeClass === 4 ? 'active-sidebar sidebar-list-item' : 'sidebar-list-item'} onClick={() => handleIconCLick(4)}>
                    <a >
                        <AddRoundedIcon sx={{ transform: "translateY(20%)", marginRight: "1rem" }} />  Add to Menu
                    </a>
                </li>
                {/* <li className={activeClass === 5 ? 'active-sidebar sidebar-list-item' : 'sidebar-list-item'} onClick={() => handleIconCLick(5)}>
                    <a >
                        <AddRoundedIcon sx={{ transform: "translateY(20%)", marginRight: "1rem" }} />  Store (Open / Close)
                    </a>
                </li> */}
                {/*<li className='sidebar-list-item'>
                  <a href="">
                       Inventory
                  </a>
              </li>
              <li className='sidebar-list-item'>
                  <a href="">
                       Reports
                  </a>
              </li>
              <li className='sidebar-list-item'>
                  <a href="">
                       Setting
                  </a>
              </li> */}
            </ul>



            {/* <div className="store-container">
                <h1 className="store-title">Store</h1>
                <div className="status-buttons">
                    <button
                        className={`status-button ${storeStatus === 'open' ? 'active' : ''}`}
                        onClick={() => handleStatusChange('open')}
                    >
                        Open
                    </button>
                    <button
                        className={`status-button ${storeStatus === 'close' ? 'active' : ''}`}
                        onClick={() => handleStatusChange('close')}
                    >
                        Close
                    </button>
                </div>
               
            </div> */}

            <button className='back-to-home-side-bar' onClick={handleHomeClick}>Back to Home</button>
        </aside>
    )
}

export default Sidebar


//  