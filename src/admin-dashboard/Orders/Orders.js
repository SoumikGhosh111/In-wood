import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../functions/baseUrl';
import { redableTimeStamp } from '../../functions/readbleTimeFormat';
import './Orders.css';


// arrow
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

// bell sound
import bell from "../../assets/bell_sound.mp3"


function Orders() {
  const [allOrders, setAllOrders] = useState(null);
  const [status, setStatus] = useState([
    "Pending",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);

  const [pickUpStatus, setPickUpStatus] = useState([
    "Pending",
    " Order is Preparing",
    "Ready for Pickup",
    "Completed",
    "Cancel",
  ]);



  useEffect(() => {
    fetchAllOrders();

    // Setup SSE
    const eventSource = new EventSource(`${baseUrl}/api/sse/orders`);
    const bellAudio = new Audio(bell);

    eventSource.onmessage = (event) => {
      try {
        const newOrder = JSON.parse(event.data);
        console.log('New order received:', newOrder);


        // here will be the bell notification sound
        fetchAllOrders(); // Update orders list when new order arrives
        bellAudio.play().catch((err) => {
          alert("Error Playing audio due to user inactivity, One new order has arrived.");
        });

      } catch (error) {
        console.error('Error parsing SSE message:', error);
      }
    };

    eventSource.onerror = (error) => {
      console.log('EventSource failed:', error);
      // alert('EventSource failed:', error.message)
    };

    return () => {
      eventSource.close(); // Clean up EventSource connection when component unmounts
    };
  }, []);

  const fetchAllOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('userEmail');

      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.get(`${baseUrl}/api/stripe/allOrder/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data.success) {
        console.error('API response:', response.data);
        throw new Error(response.data.error || 'Failed to fetch orders');
      }

      setAllOrders(response.data.data.order);
      console.log(response.data.data.order);
    } catch (error) {
      console.error('Error fetching orders:', error.message);
      // Handle error cases here...
    }
  };

  // const handleChange = async (orderId, value) => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     const response = await axios.put(
  //       `${baseUrl}/api/admin/order-status/${orderId}`,
  //       { delivery_status: value },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (!response.data.success) {
  //       throw new Error(response.data.error || 'Failed to update order status');
  //     }

  //     // Update local state or refetch orders after successful update
  //     fetchAllOrders();
  //   } catch (error) {
  //     console.error('Error updating order status:', error.message);
  //     // Handle error cases here...
  //   }
  // };


  // const handleChange = async (orderId, value) => {
  //   // console.log(orderId);
  //   // console.log(value);
  //   try {
  //     const { data } = await axios.put(`${baseUrl}/api/admin/order-status/${orderId}`, {
  //       status: value
  //     });
      
  //     fetchAllOrders();
  //     // console.log(data)
  //   } catch (error) {
  //     alert(error);
  //   }
  // };


  // const handleChange = async (orderId, status) => {
  //   // console.log(orderId);
  //   // console.log(value);
  //   try {
  //     // const { data } = await axios.put(`${baseUrl}/api/admin/order-status/${orderId}`, {
  //     //   status: status
  //     // });
  //     const response = await fetch(`${baseUrl}/api/admin/order-status/${orderId}`, { 
  //       method: 'PUT', 
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({status})
  //     }); 

  //     console.log(response); 
      
  //     fetchAllOrders();
  //     // console.log(data)
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };
  const handleChange = async (orderId, status) => {
    try {
      const response = await fetch(`${baseUrl}/api/admin/order-status/${orderId}`, { 
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        // status should be wrapped in an object
        body: JSON.stringify({ status })
      }); 

      fetchAllOrders();
    } catch (error) {
      alert(error.message);
    }
};

  // const handleChange = async (orderId, value) => {
  //   try {
  //     const response = await axios.put(`${baseUrl}/api/admin/order-status/${orderId}`, {
  //       status: value,
  //     });
  //     console.log(response.data, "status is ");
  //     fetchAllOrders();
  //   } catch (error) {
  //     console.error('Error updating order status:', error);
  //     alert('Failed to update order status. Please try again.');
  //   }
  // };


  const stripeRedirect = (transId) => { 
    // window.location.href = `https://dashboard.stripe.com/payments/${transId}`;
    window.open(`https://dashboard.stripe.com/payments/${transId}`); 
  }

  return (
    <div className='orders-wrapper'>
      <h2>Orders</h2>
      <div className='all-orders'>
        {allOrders ? (
          <table>
            <thead>
              <tr>
                <th>Order No.</th>
                <th>Order Details</th>
                <th>Customer Details</th>
                <th>Order & Payment Status</th>
                <th>Ordered at</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((item, index) => (
                <tr key={item._id}>
                  <td>{allOrders.length - index}</td>
                  <td>
                    <div className='order-details'>
                      {item.products && (
                        <>
                          <div className='order-subtitle'>Regular Orders:</div>
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
                              {item.products.map((product, productIdx) => (
                                <tr key={product.productId}>
                                  <td>{productIdx + 1}</td>
                                  <td>{product.productName}</td>
                                  <td>{product.quantity}</td>
                                  <td>{product.extraTopings}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </>
                      )}
                      <br />
                      {item.combo && (
                        <>
                          <div className='order-subtitle'>Special Offers:</div>
                          <table className='order-details-table'>
                            <thead>
                              <tr>
                                <th>Offer Name</th>
                                <th>Added Items</th>
                                <th>Extra Added</th>
                                <th>Main Course</th>
                              </tr>
                            </thead>
                            <tbody>
                              {item.combo.map((combo, comboIdx) => (
                                <tr key={`combo-${comboIdx}`}>
                                  <td>{combo.offerName}</td>
                                  <td>{combo.addedItems}</td>
                                  <td>{combo.extraAdded}</td>
                                  <td>
                                    <table>
                                      <thead>
                                        <tr>
                                          <th>Pizza</th>
                                          <th>Toppings</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {combo.pizzas.map((pizza, pizzaIdx) => (
                                          <tr key={`pizza-${pizzaIdx}`}>
                                            <td>{pizza.title}</td>
                                            <td>{pizza.toppings}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className='customer-details'>
                      <span><b>Name:</b> {item.shipping.name}</span>
                      <span><b>Email:</b> {item.shipping.email}</span>
                      <span><b>Phone:</b> {item.shipping.phone}</span>
                      <span><b>Country:</b> {item.shipping.address.country}</span>
                      <span><b>City:</b> {item.shipping.address.city}</span>
                      <span><b>State:</b> {item.shipping.address.state}</span>
                      <span><b>Line 1:</b> {item.shipping.address.line1}</span>
                      <span><b>Line 2:</b> {item.shipping.address.line2}</span>
                      <span><b>Postal Code:</b> {item.shipping.address.postal_code}</span>
                      <span><b>Order ID:</b> {item._id}</span>
                      <span><b>User ID:</b> {item.userId}</span>
                      <span><b>Transaction ID:</b> {item.transactionId}</span>
                      <a style={{color: 'red', textDecoration: 'underline', marginTop: '2rem', cursor: 'pointer', width: 'fit-content'}} onClick={() => stripeRedirect(item.transactionId)}>Initiate Refund <ArrowForwardRoundedIcon sx={{transform: 'translate(-20%, 20%)', fontSize: '20px'}}/></a>
                    </div>
                  </td>
                  <td>
                    <div className='order-payment-status'>
                      <span><b>Delivery Type:</b> {item.deliveryType === 'Pickup' ? item.deliveryType : 'Home Delivery'}</span><br />
                      <span><b>Payment:</b> {item.payment_status}</span><br />
                      <span><b>Total Amount:</b> ${item.total}</span><br />
                      <span><b>Delivery Status:</b></span><br />
                      {item.deliveryType === 'Pickup' ? 
                        
                        (<select
                          value={item.takeaway_status}
                          onChange={(e) => handleChange(item._id, e.target.value)}
                        >
                          {pickUpStatus.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>) : 
                        (<select
                          value={item.delivery_status}
                          onChange={(e) => handleChange(item._id, e.target.value)}
                        >
                          {status.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>)
                      }

                     




                    </div>
                  </td>



                  <td>{redableTimeStamp(item.createdAt)}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
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