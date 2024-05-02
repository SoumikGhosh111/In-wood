import React, {useState} from 'react'; 
import "./Sidebar.css"; 

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
                       Users
                  </a>
              </li>
              <li className='sidebar-list-item' onClick={() => handleIconCLick(2)}>
                  <a>
                       Orders
                  </a>
              </li>
              <li className='sidebar-list-item' onClick={() => handleIconCLick(3)}>
                  <a >
                      Menu
                  </a>
              </li>
               <li className='sidebar-list-item' onClick={() => handleIconCLick(4)}>
                  <a >
                      Add to Menu
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