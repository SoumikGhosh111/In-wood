import React, { useEffect, useState } from 'react';
import "./Orders.css";

import { redableTimeStamp } from '../../functions/readbleTimeFormat';

function Orders() {

  const [allOrders, setAllOrders] = useState(null)
  const fetchAllOrders = async () => {
    try {
      // Assuming you have a valid JWT token stored in localStorage
      const token = localStorage.getItem('token'); // Get the JWT token from localStorage

      if (!token) {
        throw new Error('Token not found');
      }

      const response = await fetch('http://localhost:8000/api/stripe/allOrder', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Send the JWT token in the Authorization header
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch orders');
      }

      const orders = await response.json();
      // console.log(orders.data.order);
      // if (allOrders && allOrders.data && allOrders.data.order) {
        // const reversedOrders = [...orders.data.order].reverse();
        // setAllOrders({ ...allOrders, data: { ...allOrders.data, order: reversedOrders } });
      // }
      setAllOrders(orders);
      // Handle the orders data here...

    } catch (error) {
      console.error('Error fetching orders:', error.message);
      // Handle error cases here...
    }
  };

if(allOrders!== null){ 
  console.log(allOrders.data.order.reverse(), "this is  reversed data")
} 
  useEffect(() => {
    fetchAllOrders();
  }, []); 




  const reverseOrders = () => {
    
  };
  return (
    <>
    <div className='orders-wrapper'>
    <h2 style={{color: "black"}}>Orders</h2> 
      
      <div className='all-orders'>
        {allOrders !== null ? (
          <>
            <table>
              <thead>
                <th>SL no.</th>
                <th>Order Details</th>
                <th>Customer Details</th>
                <th>Order & Payment Status</th>
                <th>Ordered at</th>
              </thead>
              <tbody>
                {allOrders.data.order.map((item, index) => (
                  <tr>
                    <td>
                      {index + 1}
                    </td>
                    <td>
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
                    </td>

                    <td>
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
                    </td>


                    <td>
                      <div className='order-payment-stts'>
                        <span>Payment: {item.payment_status}</span>
                        <span>Delivery Status</span>
                        <select>
                          <option>{item.delivery_status}</option>
                          <option>Order Preparing</option>
                          <option>Order Prepared</option>
                          <option>Out For Delivery</option>
                          <option>Delivered</option>

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