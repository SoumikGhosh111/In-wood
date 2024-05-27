import React, { useEffect, useState } from 'react';
import "./Orders.css";
import axios from "axios";
import staticImg from "../../assets/pizza_1.png"

import { redableTimeStamp } from '../../functions/readbleTimeFormat';
import { baseUrl } from '../../functions/baseUrl';

function Orders() {

  const [allOrders, setAllOrders] = useState(null);
  const userEmail = localStorage.getItem("userEmail");
  const token = localStorage.getItem("token");
  const [status, setStatus] = useState([
    "Pending",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [changeStatus, setCHangeStatus] = useState("");

  const fetchAllOrders = async () => {
    try {
      // Assuming you have a valid JWT token stored in localStorage
      const token = localStorage.getItem('token'); // Get the JWT token from localStorage
      const email = localStorage.getItem('userEmail');

      if (!token) {
        throw new Error('Token not found');
      }

      const response = await fetch(`${baseUrl}/api/stripe/allOrder/${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Send the JWT token in the Authorization header
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch orders');
      }

      const orders = await response.json();
      setAllOrders(orders);
      // Handle the orders data here...

    } catch (error) {
      console.error('Error fetching orders:', error.message);
      // Handle error cases here...
    }
  };




  if (allOrders !== null) {
    console.log(allOrders.data.order, "this is  reversed data")
  }
  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handleChange = async (orderId, value) => {
    console.log(orderId);
    console.log(value);
    try {
      const { data } = await axios.put(`${baseUrl}/api/admin/order-status/${orderId}`, {
        delivery_status: value,
      });
      fetchAllOrders();
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <>
      <div className='orders-wrapper'>
        <h2 style={{ color: "black" }}>Orders</h2>

        <div className='all-orders'>
          {allOrders !== null ? (
            <>
              <table >
                <thead>
                  <th>Order_No.</th>
                  <th>Order Details</th>
                  <th>Customer Details</th>
                  <th>Order & Payment Status</th>
                  <th>Ordered at</th>

                </thead>
                <tbody>
                  {allOrders.data.order.map((item, index) => (
                    <tr>
                      <td>
                        {allOrders.data.order.length - index}
                      </td>
                      <td>
                        <div className='order-details'>
                          <table className='order-details-table'>
                            <thead>
                              <tr>
                                <th>Sl No.</th>
                                <th>Name</th>
                                <th>Qty</th>
                                <th>Toppings</th>
                              </tr>
                            </thead>
                            <tbody>
                              {item.products && item.products.map((product, productIDX) => (
                                <tr>
                                  <td>
                                    {productIDX + 1}
                                  </td>

                                  <td>
                                    {product.productName}
                                  </td>
                                  <td>
                                    {product.quantity}
                                  </td>
                                  <td>
                                    {product.extraTopings}
                                  </td>

                                </tr>
                              ))}
                            </tbody>
                          </table>

                        </div>
                      </td>

                      <td>
                        <div className='customer-details'>
                          <span><span className='customer-details-title'>Name:</span> {item.shipping.name}</span>
                          <span><span className='customer-details-title'>Email:</span> {item.shipping.email}</span>
                          <span><span className='customer-details-title'>Ph:</span> {item.shipping.phone}</span>
                          <span><span className='customer-details-title'>Country:</span> {item.shipping.address.country}</span>
                          <span><span className='customer-details-title'>City:</span> {item.shipping.address.city}</span>
                          <span><span className='customer-details-title'>State:</span> {item.shipping.address.state}</span>
                          <span><span className='customer-details-title'>Line1:</span> {item.shipping.address.line1}</span>
                          <span><span className='customer-details-title'>Line2:</span> {item.shipping.address.line2}</span>
                          <span><span className='customer-details-title'>Postal Code:</span> {item.shipping.address.postal_code}</span>
                          <span><span className='customer-details-title'>Order_Id:</span> {item._id}</span>
                          <span><span className='customer-details-title'>User_Id:</span> {item.userId}</span>
                        </div>
                      </td>


                      <td>
                        <div className='order-payment-stts'>
                          <span><span className='customer-details-title'>Payment:</span> {item.payment_status}</span>
                          <span><span className='customer-details-title'>Total Amount:</span> ${item.total}</span><br/>
                          <span><span className='customer-details-title'>Delivery Status</span></span>
                          <select
                            bordered={false}
                            onChange={(e) => handleChange(item._id, e.target.value)}
                            defaultValue={item?.delivery_status}
                          >
                            {/* <option>{item.delivery_status}</option>
                            <option>Order Preparing</option>
                            <option>Order Prepared</option>
                            <option>Out For Delivery</option>
                            <option>Delivered</option> */}
                            {status.map((s, i) => (
                              <option key={i} value={s}>
                                {s}
                              </option>
                            ))}

                          </select>
                        </div>
                      </td>

                      <td>
                        {redableTimeStamp(item.createdAt)}
                      </td>
                    </tr>

                  ))}
                </tbody>
              </table>
            </>
          ) :
            (
              <>
                Loading . . .
              </>
            )}

        </div>
      </div>
    </>
  )
}

export default Orders;




{/* <div className='order-cart'>
                <div className='order-details'>
                  {item.products && item.products.map((product, productIDX) => (
                    <div className='order-name-toppings'>
                      <span>{productIDX + 1}.</span>
                      <span> Name: {product.productName}</span>
                      <span> Qty: {product.quantity}</span>
                      <span >Toppings: 
                        <div className='product-toppings'>
                          <span>Extra cheese</span><span>Extra Peparoni</span>
                        </div>
                      </span>
                    </div>
                  ))}
                </div>
                <div className='customer-details'>
                  <span>Name: {item.shipping.name}</span>
                  <span>Email: {item.shipping.email}</span>
                  <span>Ph: {item.shipping.phone}</span>
                  <span>Country: {item.shipping.address.country}</span>
                  <span>City: {item.shipping.address.city}</span>
                  <span>State: {item.shipping.address.state}</span>
                  <span>Line1: {item.shipping.address.line1}</span>
                  <span>Line2: {item.shipping.address.line2}</span>
                  <span>Postal Code: {item.shipping.address.postal_code}</span>

                </div>
                <div className='order-payment-stts'>
                  <span>Payment: {item.payment_status}</span>
                  <select>
                    <option>{item.delivery_status}</option>
                    <option>Order Preparing</option>
                    <option>Order Prepared</option>
                    <option>Out For Delivery</option>
                    <option>Delivered</option>

                  </select>
                </div>
              </div> */}






// <div className='order-name-toppings'>
//                     <div className='name-sl-no'>
//                       {/* <h2>Name: </h2> */}
//                       <div>
//                         <span>{productIDX + 1}.</span>
//                         <span>{product.productName}</span>
//                       </div>
//                     </div>
//                     <span> Qty: {product.quantity}</span>
//                     <span >Toppings:
//                       <div className='product-toppings'>
//                         <span>{product.description}</span>
//                       </div>
//                     </span>
//                   </div>