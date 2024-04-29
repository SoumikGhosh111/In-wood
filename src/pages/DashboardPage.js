import React, {useState} from 'react'; 
import Sidebar from '../admin-dashboard/Sidebar/Sidebar';
import DashboardContent from '../admin-dashboard/DashboardContent/DashboardContent';


function DashboardPage() {

  const [currentItem, setCurrentItem] = useState(1); 
  const handleIconCLick = (indx) => { 
      setCurrentItem(indx); 
  } 
  return (
    <div className='grid-container'>
        <Sidebar onSideBarItemClicked = {handleIconCLick}/>
        <DashboardContent itemToRender = {currentItem}/>
    </div>
  )
}

export default DashboardPage