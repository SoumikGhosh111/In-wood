import React from 'react'; 
import "./DashboardContent.css"; 
import User from '../User/User';
import Orders from '../Orders/Orders';

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
          </>

        ) : (<></>)}
    </div>
  )
}

export default DashboardContent