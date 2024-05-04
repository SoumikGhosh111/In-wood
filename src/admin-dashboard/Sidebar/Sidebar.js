import React, {useState} from 'react'; 
import "./Sidebar.css"; 
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import RestaurantMenuRoundedIcon from '@mui/icons-material/RestaurantMenuRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

function Sidebar({onSideBarItemClicked}) {
    const handleIconCLick = (indx) => { 
        onSideBarItemClicked(indx); 
    }

    return (
      <aside id="sidebar" className=''>
          <div className='sidebar-title'>
              <div className='sidebar-brand'>
                   Inwood Pizza
              </div>
              <span className='icon close_icon'>X</span>
          </div>
  
          <ul className='sidebar-list'>
              <li className='sidebar-list-item' onClick={() => handleIconCLick(1)}>
                  <a>
                        <SupervisedUserCircleIcon  sx={{transform: "translateY(20%)", marginRight: "1rem"}}/>   Users
                  </a>
              </li>
              <li className='sidebar-list-item' onClick={() => handleIconCLick(2)}>
                  <a>
                        <BorderColorRoundedIcon  sx={{transform: "translateY(20%)", marginRight: "1rem"}}/>   Orders
                  </a>
              </li>
              <li className='sidebar-list-item' onClick={() => handleIconCLick(3)}>
                  <a >
                        <RestaurantMenuRoundedIcon  sx={{transform: "translateY(20%)", marginRight: "1rem"}}/>      Menu
                  </a>
              </li>
               <li className='sidebar-list-item' onClick={() => handleIconCLick(4)}>
                  <a >
                        <AddRoundedIcon  sx={{transform: "translateY(20%)", marginRight: "1rem"}}/>  Add to Menu
                  </a>
              </li>
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
      </aside>
    )
  }
  
  export default Sidebar


//  