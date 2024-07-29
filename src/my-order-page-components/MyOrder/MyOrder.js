import React, { useState, useEffect } from 'react';
import background from "../../assets/abc.jpg";
import bgGif from "../../assets/profile_page_demo.gif";
import emptyOrder from "../../assets/duck.jpg";
import "./MyOrder.css"
import staticImg from "../../assets/pizza_1.png";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import logo from "../../assets/maskot_logo_inwood.png";
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import { formatReadableDate } from '../../functions/readbleTimeFormat';
import { baseUrl } from '../../functions/baseUrl';

function MyOrder() {
    const [orderDetails, setOrderDetails] = useState(null);
    const useremail = localStorage.getItem("userEmail");
    const [openDropDowns, setOpenDropDowns] = useState({});

    const getUserDetails = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/users/userDetails/${useremail}`);
            const result = await response.json();
            getOrderDetails(result.data.user._id);
        } catch (err) {
            console.log(err);
        }
    };

    const getOrderDetails = async (userId) => {
        try {
            const response = await fetch(`${baseUrl}/api/users/orderDetails/${userId}`);
            const result = await response.json();
            setOrderDetails(result);
            console.log(result);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDownload = async (orderId) => {

        console.log(orderId);
        try {
            const response = await fetch(`${baseUrl}/api/invoice/pdf/${orderId}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/pdf',
                },
            });
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'invoice.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    const handleBackToHome = () => {
        window.location.href = '/';
        window.history.replaceState(null, '', '/');
    }

    const handleRefresh = () => {
        window.location.reload();
    }

    const statusColor = (status) => {
        switch (status) {
            case "deliverd":
            case "Shipped":
                return "#71b422";
            case "cancel":
                return "#e92028";
            default:
                return "#f7b500";
        }
    } // as of the new enums in the delivery status they will be added as case. . . 

    const toggleDropDown = (orderIndex, comboIndex) => {
        const key = `${orderIndex}-${comboIndex}`;
        setOpenDropDowns(prevState => ({
            ...prevState,
            [key]: !prevState[key]
        }));
    }

    return (
        <div className='my-order-wrapper'>
            <div className='back-to-home-my-order-button-wrapper'>
                <button className='back-to-home-my-order' onClick={handleBackToHome}><ArrowBackIosRoundedIcon sx={{ transform: "translateY(10%)" }} /></button>
            </div>
            <div className='my-orders-divs'>
                <div className='my-orders'>
                    {orderDetails !== null ? (
                        <>
                            {orderDetails.length > 0 ? (
                                <>
                                    {orderDetails.map((item, indx) => (
                                        <div className='order-container' key={indx}>
                                            <div className='slNo-delv-type'>
                                                <div>
                                                    <div className='sl-no'>
                                                        Order No. &nbsp; {orderDetails.length - indx}
                                                    </div>
                                                    <div className='sl-no'>
                                                        Date. &nbsp; {formatReadableDate(item.createdAt)}
                                                    </div>
                                                </div>
                                                <div className='delivery-type'>
                                                    {item.deliveryType}
                                                </div>
                                            </div>
                                            <div className='my-order-order'>
                                                <div className='order-items-cont'>
                                                    {item.products?.map((product, productIndex) => (
                                                        <div className='order-items-my-order' key={productIndex}>
                                                            <div className='item-img-my-order'>
                                                                <img src={product.imageUrl} alt='Item Images' />
                                                            </div>
                                                            <div className='product-qty'>
                                                                <div className='product-qty-item-div'>
                                                                    QTY:&nbsp; {product.quantity}
                                                                </div>
                                                                <div className='product-name-my-order'>
                                                                    Name:&nbsp; {product.productName}
                                                                </div>
                                                                <div className='product-name-my-order'>
                                                                    Toppings: &nbsp; {product.extraTopings}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {item.combo && (
                                                        <div>
                                                            {item.combo?.map((combos, comboIndx) => {
                                                                const key = `${indx}-${comboIndx}`;
                                                                return (
                                                                    <div className='combo-offers-wraper' key={comboIndx}>
                                                                        <div className='drop-down-container-wrapper my-order-dropdown-container-wrapper'>
                                                                            <div className='drop-down-container'>
                                                                                <div className='drop-down-offer-name'>
                                                                                    <div>Special Offer {combos.offerName}</div>
                                                                                </div>
                                                                                <button onClick={() => toggleDropDown(indx, comboIndx)} style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
                                                                                    {openDropDowns[key] ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
                                                                                </button>
                                                                            </div>
                                                                            <div className={`dropdown-info ${openDropDowns[key] ? 'open-dropdown' : 'close-dropdown'} my-order-drop-down-info`}>
                                                                                {combos?.pizzas?.map((item, pizzaIndx) => (
                                                                                    <div key={pizzaIndx}>
                                                                                        <div style={{ fontWeight: '700' }}>{item.title}</div>
                                                                                        <div>{item.toppings}</div>
                                                                                    </div>
                                                                                ))}
                                                                                <div style={{ fontWeight: '700' }}>{combos.addedItems}</div>
                                                                                {combos?.extraAdded && <div style={{ fontWeight: '700' }}>{combos.extraAdded}</div>}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                    <div className='delivery_status'>
                                                        <div className='status-myorder' style={{ backgroundColor: statusColor(item.delivery_status), color: 'white' }}>
                                                            {item.delivery_status}
                                                        </div>
                                                        <div className='total-ammnt-my-order'>
                                                            Total Amount: ${item.total}
                                                        </div>
                                                    </div>
                                                    <div className='delivery_status'>
                                                        <button onClick={() => handleDownload(item._id)} className='invoice-generate-button'>Generate invoice</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <div className='empty-orders'>
                                    <span>No Orders Found</span>
                                </div>
                            )}
                        </>
                    ) : (
                        <>Loading . . .</>
                    )}
                </div>
                <div className='my-order-bg-gif'>
                    {/* <img src={logo} alt='logo image' /> */}
                    <span style={{ margin: '1rem 1rem' }}>At Inwood Pizza, we believe in transparency. <br /> Track your order in real-time.</span>
                    <button className='back-to-home-my-order refresh' onClick={handleRefresh}>Refresh &nbsp; <RefreshRoundedIcon sx={{ transform: "translateY(0%)" }} /></button>
                </div>
            </div>
        </div>
    )
}

export default MyOrder;
