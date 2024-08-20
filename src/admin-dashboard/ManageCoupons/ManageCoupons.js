import React, {useState, useEffect} from 'react';
import { baseUrl } from '../../functions/baseUrl';
import "./ManageCoupons.css";
import { redableTimeStamp } from '../../functions/readbleTimeFormat';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import Backdrop from '@mui/material/Backdrop';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ManageCoupons() {  
  const [allCoupons, setAllCoupons] = useState(null); 

  const [openPopUp, setOpenPopUp] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [deletedName, setDeletedName] = useState('');

  useEffect(() => {
    fetchALLCoupons();
  }, []);
  const fetchALLCoupons = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/coupon/getAllCoupon`);
      const result = await response.json();
      setAllCoupons(result);
      console.log(result); 
    } catch (e) {
      console.log(e.message);
    }
  }


  const handleMenuItemDelete = async (id) => {
    try {
      const email = localStorage.getItem('userEmail');
      const token = localStorage.getItem('token');
      const response = await fetch(`${baseUrl}/api/coupon/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      setOpenPopUp(false);
      fetchALLCoupons(); 
      toast.success(result.message);
      setDeleteId('');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='manage-coupon-wrapper'>
        <h2>Manage Coupons</h2>
        <table className='admin-coupon-table'>
          <thead>
            <th>Code</th>
            <th>Expiration Date</th>
            <th>Discount</th>
            <th>Modify Coupons</th>
          </thead>
          <tbody>
            {allCoupons?.map((item, indx)=> ( 
              <tr key={item._id}>
                <td>{item.code}</td>
                <td>{redableTimeStamp(item.expirationDate)}</td>
                <td>{item.discount}</td>
                <td><BorderColorRoundedIcon sx={{cursor: 'pointer'}}/> &nbsp;&nbsp; <DeleteIcon sx={{cursor: 'pointer'}} onClick={() => { setOpenPopUp(true); setDeleteId(item._id); setDeletedName(item.code) }}/></td>
              </tr>
            ))}
          </tbody>
        </table>


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
  )
}

export default ManageCoupons