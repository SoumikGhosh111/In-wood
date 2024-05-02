import React from 'react'; 
import "./DashboardContent.css"; 
import User from '../User/User';
import Orders from '../Orders/Orders';
import AddToMenu from '../AddToMenu/AddToMenu';
import Menu from '../Menu/Menu';

function DashboardContent({itemToRender}) {

  return (
    <div className='main-container'>
        {itemToRender ? (
          <>
            <div>
                {itemToRender === 1 && <User />}
            </div>
            <div>
                {itemToRender === 2 && <Orders />}
            </div>
            <div>
                {itemToRender === 3 && <Menu />}
            </div>
            <div>
                {itemToRender === 4 && <AddToMenu />}
            </div>
          </>

        ) : (<></>)}
    </div>
  )
}

export default DashboardContent