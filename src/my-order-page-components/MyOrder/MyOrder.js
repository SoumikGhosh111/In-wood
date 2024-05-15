import React, { useState, useEffect } from 'react';
import background from "../../assets/abc.jpg";
import bgGif from "../../assets/profile_page_demo.gif";
import emptyOrder from "../../assets/duck.jpg";
import "./MyOrder.css"
import staticImg from "../../assets/pizza_1.png";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import logo from "../../assets/maskot_logo_inwood.png";
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';

function MyOrder() {
    // const [userId, setUserId] = useState(null);
    const [orderDetails, setOrderDetails] = useState(null);
    const useremail = localStorage.getItem("userEmail");

    const getUserDetails = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/users/userDetails/${useremail}`);
            const result = await response.json();
            console.log(result, "this is result");
            // setUserId(result.data.user._id);
            getOrderDetails(result.data.user._id);
        } catch (err) {
            console.log(err);
        }
    };

    const getOrderDetails = async (userId) => { // Accept userId as a parameter
        try {
            const response = await fetch(`http://localhost:8000/api/users/orderDetails/${userId}`);
            const result = await response.json();
            setOrderDetails(result);
            console.log(result, "this is result lll");
        } catch (err) {
            console.log(err);
        }
    };

    const handleDownload = async (orderId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/invoice/pdf/${orderId}`, {
                method: 'GET', // Ensure method is explicitly set to GET
                headers: {
                    Accept: 'application/pdf', // Set Accept header to specify PDF response
                },
            });

            const blob = await response.blob();

            // Create a blob URL for the response data
            const url = window.URL.createObjectURL(blob);

            // Create a temporary anchor element to initiate download
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'invoice.pdf');
            document.body.appendChild(link);
            link.click();

            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading invoice:', error);
        }
    };

    useEffect(() => {
        getUserDetails();
    }, []);
    const handleBackToHome = () => {

        window.location.href = '/';

        // Clearing the browser's history
        window.history.replaceState(null, '', '/');
    }

    const handleRefresh = () => {
        window.location.reload();
    }
    return (
        <div className='my-order-wrapper' >
            {/* <img src={background} className='bgPizza' style={{zIndex: '-10'}}/> */}
            <div className='back-to-home-my-order-button-wrapper'>
                <button className='back-to-home-my-order' onClick={handleBackToHome}><ArrowBackIosRoundedIcon sx={{ transform: "translateY(10%)" }} /></button>
            </div>
            <div className='my-orders-divs'>
                <div className='my-orders'>
                    {orderDetails !== null ?
                        (<>
                            {orderDetails.length > 0 ?
                                (<>
                                    {orderDetails.map((item, indx) => (
                                        <>
                                            <div className='sl-no'>
                                                Order No. &nbsp; {orderDetails.length - indx}
                                            </div>
                                            <div className='my-order-order'>

                                                <div className='order-items-cont'>
                                                    {item.products?.map((product) => (
                                                        <>
                                                            <div className='order-items-my-order'>
                                                                <div className='item-img-my-order'>
                                                                    <img src={staticImg} alt='Item Images' />
                                                                </div>
                                                                <div className='product-qty'>
                                                                    <div className='product-qty-item-div'>
                                                                        QTY:&nbsp; {product.quantity}
                                                                    </div>
                                                                    <div className='product-name-my-order'>
                                                                        Name:&nbsp; {product.productName}
                                                                    </div>
                                                                    <div className='product-name-my-order'>
                                                                        Toppings: &nbsp; {product.description}
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            {/* <div className='product-name-my-order'>
                                                    Name:&nbsp; {product.productName}
                                                </div>
                                                <div className='product-name-my-order'>
                                                    Toppings: &nbsp; {product.description}
                                                </div> */}
                                                            {/* <div className='product-name-topping'>
                                                        <span className='product-name-topping-items'>{product.productName}</span>
                                                        Tpooings: &nbsp; <span className='product-name-topping-items'>{product.description}</span>
                                                    </div> */}
                                                            {/* <div className='ver-line-my-order'></div> */}
                                                        </>
                                                    ))}
                                                    <div className='delivery_status'>
                                                        <div className='status-myorder'>
                                                            {item.delivery_status}
                                                        </div>
                                                    </div>
                                                    <div className='delivery_status'>
                                                        {/* <div className='status-myorder'> */}
                                                        <button onClick={() => handleDownload(item._id)} className='invoice-button'>Generate Invoice</button>
                                                        {/* </div> */}
                                                    </div>
                                                </div>
                                                {/* */}

                                            </div>

                                        </>
                                    ))}
                                </>) :

                                (<div className='empty-orders'>
                                    <img src={emptyOrder} alt='quack' />
                                    <span>
                                        No Orders Found
                                    </span>
                                </div>)}

                        </>)
                        :
                        (<>Loading . . .</>)}
                </div>
                <div className='my-order-bg-gif'>
                    <img src={logo} alt='logo image' />
                    <span style={{ margin: '1rem 1rem' }}>At Inwood Pizza, we believe in transparency. <br /> Track your order in real-time.</span>
                    <button className='back-to-home-my-order refresh' onClick={handleRefresh}>Refresh &nbsp;  <RefreshRoundedIcon sx={{ transform: "translateY(0%)" }} /></button>
                </div>
            </div>

        </div>
    )
}

export default MyOrder