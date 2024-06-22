import React, { useState, useEffect } from 'react';
import { baseUrl } from '../../functions/baseUrl';

import pizzaImg from "../../assets/banner-1.jpg";
import borderRadius from "../../assets/special-offer-drawer-border.svg";
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import "./EveryDaySpecial1.css"



// slick-carousel
import Slider from 'react-slick';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { addSpecialObject, deleteSpecialObject } from '../../redux/slices/specialOffersSlice';

// react-router-dom
import { useNavigate } from 'react-router-dom';

// loading image 
import loadingCartImg from "../../assets/cartLoading.svg";

// importting mui drawer
import Drawer from '@mui/material/Drawer';

function EveryDaySpecial1() {
  const Navigate = useNavigate();
  const [baseData, setBaseData] = useState(null);



  const [selectedBaseItems, setSelectedBaseItems] = useState([]);


  const requiredPies = 1;

  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();
  const obj = useSelector(state => state.specialoffer.specialOrder);
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }


  const fetchBaseData = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/product/getAllFood/Speciality Pizza`);
      const result = await response.json();
      setBaseData(result.data.food);
      console.log(result.data.food);
    } catch (err) {
      alert(err.message);
    }
  }


  useEffect(() => {
    fetchBaseData();

  }, []);


  const handleBase = (item) => {
    const baseObject = {
      title: item.productType,
      baseImg: item.img,
      desc: item.desc,
      toppings: []
    };

    if (selectedBaseItems?.length < 1) {
      setSelectedBaseItems([...selectedBaseItems, baseObject]);
    } else {
      alert("You can only select up to 1 base item.");
    }

    console.log(selectedBaseItems)

  }


  const handleBasedelete = (indx) => {
    let newBaseItems = selectedBaseItems.filter((__, index) => index !== indx)
    setSelectedBaseItems(newBaseItems);
  }
  const handleOrder = () => {
    if (selectedBaseItems.length !== 1) {
      alert("You must select exactly 1 base item.");
      return;
    }

    dispatch(deleteSpecialObject());
    const specialOrder = {
      offerName: "Every Day Special",
      pizza: selectedBaseItems,
      addedItems: [],
      item: [],
      extraAdded: "",
      totalAmount: 6.99,
    };

    alert("Order Created");
    dispatch(addSpecialObject(specialOrder));
    Navigate("/checkout")
  }

  const handleMobCartClose = () => {
    setOpen(!isOpen);
  }

  return (
    <div className='combo-offer-2'>
      <div className='static-special-offers-wrapper'>

        <h2>1 Medium Chese Pie of Your Choice</h2>
        <div className='combo-offer-2-basses'>
          <Slider {...settings}>
            {baseData !== null && baseData.map((item) => (
              <div key={item._id}>
                <div className='special-offers-carousel-inner'>
                  <img src={item.img} alt={item.title} />
                  <div>
                    <h4>{item.productType}</h4>
                    <div style={{ fontSize: '10px', margin: '1rem 0rem' }}>{item.desc}</div>


                    <button className='add-to-cart-special-offer' onClick={() => handleBase(item)}>
                      Select
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>




        <div className='add-to-cart-wrapper special-offers-cart every-day-special'>
          <div className='order-cart-cards'>
            <div>
              <h3>Two Medium Chese Pies of Your Choice</h3>
              {selectedBaseItems.length > 0 ?
                (
                  <>
                    {selectedBaseItems.map((item, indx) => (
                      <div className='special-cart-item-containers'>
                        <div className='special-cart-item-containers-img-info'>
                          <img src={item.baseImg} alt={item.baseImg} style={{ width: '100px', height: 'auto' }} />
                          <div className='special-cart-item-containers-info'>
                            <div style={{ fontWeight: '700' }}>{item.title}</div>
                            <div style={{ fontSize: '10px', marginTop: '0.5rem' }}>
                              {/* {item.toppings.length > 0 && item.toppings.map((topping) => (
                              <div>
                                {topping}
                              </div>
                            ))} */}
                              {item.desc}
                            </div>
                          </div>
                        </div>
                        <button onClick={() => handleBasedelete(indx)} style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}  ><DeleteIcon /></button>
                      </div>
                    ))}
                    {Array.from({ length: requiredPies - selectedBaseItems.length }).map((__, indx) => (
                      <div key={`combo-2-loading${indx}`}>
                        <img src={loadingCartImg} />
                      </div>
                    ))}
                  </>
                ) :
                (
                  <>
                    {Array.from({ length: requiredPies - selectedBaseItems.length }).map((__, indx) => (
                      <div key={`combo-2-loading${indx}`}>
                        <img src={loadingCartImg} />
                      </div>
                    ))}
                  </>
                )}
            </div>


          </div>
          <div className='special-offer-cart-button'>
            <div className='total-amnt-add-to-cart'><span >Total Amount: </span> <span style={{ fontWeight: '700' }}>$ 6.99</span></div>

            <button className='add-to-cart-button ' style={{ backgroundColor: 'black', color: 'white' }} onClick={handleOrder}>PROCEED TO ORDER</button>
          </div>
        </div>



        <button className='special-offer-mob-cart' onClick={() => setOpen(true)}><ShoppingCartIcon sx={{ transform: 'translateY(10%)' }} /></button>


        <Drawer
          anchor={"bottom"}
          open={isOpen}
          onClose={handleMobCartClose}
          sx={{ zIndex: "999", WebkitBackdropFilter: "blur(5px)", backdropFilter: "blur(5px)" }}
        >
          {/* <div style={{padding: '1rem 1rem'}}>
            <div style={{minHeight: '100px'}}>
              <h3>Two Medium Chese Pies of Your Choice</h3>
              {selectedBaseItems.length > 0 && selectedBaseItems.map((item, indx) => (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    {item.title}
                    {item.toppings.length > 0 && item.toppings.map((topping) => (
                      <div>
                        {topping}
                      </div>
                    ))}
                  </div>
                  <button onClick={() => handleBasedelete(indx)} style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}  ><DeleteIcon /></button>
                </div>
              ))}
            </div>

            <div style={{minHeight: '100px'}}>
              <h3>5pcs of Chicken wings of your Choice </h3>
              {selectedAddedItems.length > 0 && selectedAddedItems.map((item, indx) => (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {item.title}
                  <button onClick={() => (handleAddedItemsDelete(indx))} style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}><DeleteIcon /></button>
                </div>
              ))}
            </div>


            <div style={{minHeight: '100px'}}>
              <h3>2Ltr Soda of Your Choice</h3>
              {selectedAddedItems2.length > 0 && selectedAddedItems2.map((item, indx) => (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {item.title}
                  <button onClick={() => (handleAddedItemsDelete2(indx))} style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}><DeleteIcon /></button>
                </div>
              ))}
            </div>

            <button className='add-to-cart-button' style={{ backgroundColor: 'black', color: 'white' }} onClick={handleOrder}>PROCEED TO ORDER</button>


          </div> */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '5px' }}>
            <img src={borderRadius} style={{ width: '30%', height: 'auto' }} />
          </div>

          <div style={{ padding: '1rem 1rem' }}>

            <div>
              <h3>1 Medium Chese Pie of Your Choice</h3>
              {selectedBaseItems.length > 0 ?
                (
                  <>
                    {selectedBaseItems.map((item, indx) => (
                      <div className='special-cart-item-containers'>
                        <div className='special-cart-item-containers-img-info'>
                          <img src={item.baseImg} alt={item.baseImg} style={{ width: '100px', height: '90%' }} />
                          <div className='special-cart-item-containers-info'>
                            <div style={{ fontWeight: '700' }}>{item.title}</div>
                            <div style={{ fontSize: '10px', marginTop: '0.5rem' }}>
                              {/* {item.toppings.length > 0 && item.toppings.map((topping) => (
                              <div>
                                {topping}
                              </div>
                            ))} */}
                              {item.desc}
                            </div>
                          </div>
                        </div>
                        <button onClick={() => handleBasedelete(indx)} style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}  ><DeleteIcon /></button>
                      </div>
                    ))}
                    {Array.from({ length: requiredPies - selectedBaseItems.length }).map((__, indx) => (
                      <div key={`combo-2-loading${indx}`}>
                        <img src={loadingCartImg} />
                      </div>
                    ))}
                  </>
                ) :
                (
                  <>
                    {Array.from({ length: requiredPies - selectedBaseItems.length }).map((__, indx) => (
                      <div key={`combo-2-loading${indx}`}>
                        <img src={loadingCartImg} />
                      </div>
                    ))}
                  </>
                )}
            </div>
            
        


            <div className='special-offer-cart-button'>
              <div className='total-amnt-add-to-cart'><span >Total Amount: </span> <span style={{ fontWeight: '700' }}>$ 6.99</span></div>

              <button className='add-to-cart-button ' style={{ backgroundColor: 'black', color: 'white' }} onClick={handleOrder}>PROCEED TO ORDER</button>
            </div>
          </div>


          {/* </div> */}




        </Drawer>
      </div>
    </div>
  )
}

export default EveryDaySpecial1