import React, {useState, useEffect} from 'react';
import { baseUrl } from '../../functions/baseUrl';
import "./ManageCoupons.css";


function ManageCoupons() {  
  const [allCoupons, setAllCoupons] = useState(null); 

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
  return (
    <div className='manage-coupon-wrapper'>
        <h2>Manage Coupons</h2>
        <table>
          <thead>
            <th>Code</th>
            <th>Expiration Date</th>
            <th>Discount</th>
          </thead>
          <tbody>
            {allCoupons?.map((item, indx)=> ( 
              <tr key={item._id}>
                <td>{item.code}</td>
                <td>{item.expirationDate}</td>
                <td>{item.discount}</td>
              </tr>
            ))}
          </tbody>
        </table>

    </div>
  )
}

export default ManageCoupons