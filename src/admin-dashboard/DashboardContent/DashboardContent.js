import React from 'react'; 
import "./DashboardContent.css"; 
import User from '../User/User';
import Orders from '../Orders/Orders';
import AddToMenu from '../AddToMenu/AddToMenu';
import Menu from '../Menu/Menu';
import AddSpecialOffers from '../AddSpecialOffers/AddSpecialOffers';
import SpecialMenu from '../SpecialMenu/SpecialMenu';
function DashboardContent({itemToRender}) {

  return (
    <div className='main-container'>
        {itemToRender ? (
          <>
            <div>
                {itemToRender === 1 && <Orders />}
            </div>
            <div>
                {itemToRender === 2 && <User />}
            </div>
            <div>
                {itemToRender === 3 && <Menu />}
            </div>
            <div>
                {itemToRender === 4 && <AddToMenu />}
            </div>
            <div>
                {itemToRender === 5 && <AddSpecialOffers />}
            </div>

            <div>
                {itemToRender === 6 && <SpecialMenu />}
            </div>
          </>

        ) : (<></>)}
    </div>
  )
}

export default DashboardContent