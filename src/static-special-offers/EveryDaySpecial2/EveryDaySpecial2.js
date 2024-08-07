import React, { useState, useEffect } from 'react';
import { baseUrl } from '../../functions/baseUrl';

import pizzaImg from "../../assets/banner-1.jpg";
import borderRadius from "../../assets/special-offer-drawer-border.svg"
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


// slick-carousel
import Slider from 'react-slick';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { addSpecialObject, deleteSpecialObject } from '../../redux/slices/specialOffersSlice';
import { useNavigate } from 'react-router-dom';

// loading cart image
import loadingCartImg from "../../assets/cartLoading.svg";

// importing drawer
import { Drawer } from '@mui/material';

// toasify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Cheese Pizza Object 
const CHEESE_PIZZA = {
  title: "Cheesy Perfection",
  img: "https://res.cloudinary.com/ddhhackni/image/upload/v1718311121/rac963fvplplanams1mi.png",
  desc: "Our classic cheese pizza features a generous layer of melted mozzarella on a perfectly baked crust. Simple yet irresistible"
}


function EveryDaySpecial2() {
  const [baseData, setBaseData] = useState(null);

  const [selectedToppings, setSelectedToppings] = useState([]);  //for toppings
  const [selectedBaseItems, setSelectedBaseItems] = useState([]); //for base specialy for 1 or 2 pizzas 

  const [isFull, setIsFull] = useState(false);


  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();
  const obj = useSelector(state => state.specialoffer.specialOrder);
  const Navigate = useNavigate();

  const requiredPies = 1;

  const fetchBaseData = async () => {   //this thing will not be needed
    try {
      const response = await fetch(`${baseUrl}/api/combo/allComboFood/Medium Pie`);
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

  useEffect(() => {
    setIsFull(selectedBaseItems.length === 1 ? true : false);
  }, [selectedBaseItems]);

  const handleToppingChange = (topping) => {   // this thing will be same as it is now
    const updatedToppings = selectedToppings.includes(topping)
      ? selectedToppings.filter(t => t !== topping)
      : [...selectedToppings, topping];

    if (updatedToppings.length <= 1) {
      setSelectedToppings(updatedToppings);
    } else {
      // alert("You can only select up to 2 toppings.");
      toast.error("You can only select up to 2 toppings");
    }
  }

  const isToppingDisabled = (topping) => {
    return selectedToppings.length >= 1 && !selectedToppings.includes(topping);
  }

  var settings = {   //not needed 
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  const handleBase = (item) => {    //changes required
    const baseObject = {
      title: item.title,
      toppings: selectedToppings,
      baseImg: item.img,
    };

    if (selectedBaseItems.length < 1) {
      setSelectedBaseItems([...selectedBaseItems, baseObject]);
    } else {
      // alert("You can only select up to 1 base items.");
      toast.error("You can only select up to 1 base items.")
    }

    // console.log(selectedBaseItems); 
    setSelectedToppings([]);
  }


  const handleBasedelete = (indx) => {
    let newBaseItems = selectedBaseItems.filter((__, index) => index !== indx)
    setSelectedBaseItems(newBaseItems);
  }

  const handleOrder = () => {

    if (selectedBaseItems.length !== 1) {
      // alert("You must select exactly 1 base item.");
      toast.error("You must select exactly 1 base item.")
      return;
    }

    dispatch(deleteSpecialObject());
    const specialOrder = {
      offerName: "Every Day Special 2",
      pizza: selectedBaseItems,
      addedItems: [],
      item: [],
      extraAdded: "",
      totalAmount: 7.99,
    };
    dispatch(addSpecialObject(specialOrder));
    console.log("Order placed:", specialOrder);
    // Here you can dispatch an action to add the order to the cart or perform any other action
    // dispatch(addToSpecialCart(order));
    toast.success("Order Created!")
    setTimeout(() => {
      Navigate("/checkout");
    }, 1000);
  }

  const handleMobCartClose = () => {
    setOpen(!isOpen);
  }


  return (
    <div className='combo-offer-2'>
      <div className='static-special-offers-wrapper'>
        <h2>1 Medium Cheese Pie - 1 topping <span style={{ fontSize: '15px' }}>(of your choice)</span></h2>
        {/* <div className='combo-offer-2-basses'>
          <Slider {...settings}>
            {baseData !== null && baseData.map((item) => (
              <div key={item._id}>
                <div className='special-offers-carousel-inner'>
                  <img src={item.img} alt={item.title} />
                   <div>
                    <h3>{item.title}</h3>
                    <div style={{ fontSize: '10px', margin: '1rem 0rem' }}>{item.desc}</div>
                    <h4 style={{ marginBottom: '0.5rem' }}>Select 2 toppings <span style={{ fontSize: '10px' }}>(of your choice)</span></h4>
                    {["Jalapenos", "Sausage", "Corn", "Onions & Peppers", "Ground Beef", "Chicken", "Olives", "Mushrooms", "Cheese", "Ham", "Bacon", "Pepperoni", "Extra Cheese"].map(topping => (
                      <div key={topping}>
                        <input
                          type='checkbox'
                          id={topping}
                          checked={selectedToppings.includes(topping)}
                          disabled={isToppingDisabled(topping)}
                          onChange={() => handleToppingChange(topping)}
                        />
                        <label htmlFor={topping}>{topping}</label>
                      </div>
                    ))}
                    <button className={`add-to-cart-special-offer ${isFull ? 'disabled' : ''}`} onClick={() => handleBase(item)}>
                      {isFull ? 'Selected' : 'Select'}
                    </button>
                  </div>    
                </div>
              </div>
            ))}
          </Slider>
        </div> */}


        {/* As per Clients requirement the initial items were changed to only Cheese Pizzas other than that every thing is same and the initial items are commented out */}

        <div className='combo-offer-2-basses'>
          <div className='special-offers-carousel-inner'>
            <img src='https://res.cloudinary.com/ddhhackni/image/upload/v1718311121/rac963fvplplanams1mi.png' alt='Cheese Pizza Image' />
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column' }}>
              <h4>Cheesy Perfection</h4>
              <div style={{ fontSize: '10px', margin: '1rem 0rem' }}>Our classic cheese pizza features a generous layer of melted mozzarella on a perfectly baked crust. Simple yet irresistible</div>

              <h4 style={{ marginBottom: '0.5rem' }}>Select 2 toppings <span style={{ fontSize: '10px' }}>(of your choice)</span></h4>
              {["Jalapenos", "Sausage", "Corn", "Onions & Peppers", "Ground Beef", "Chicken", "Olives", "Mushrooms", "Cheese", "Ham", "Bacon", "Pepperoni", "Extra Cheese"].map(topping => (
                <div key={topping}>
                  <input
                    type='checkbox'
                    id={topping}
                    checked={selectedToppings.includes(topping)}
                    disabled={isToppingDisabled(topping)}
                    onChange={() => handleToppingChange(topping)}
                  />
                  <label htmlFor={topping}>{topping}</label>
                </div>
              ))}

              <button className={`add-to-cart-special-offer ${isFull ? 'disabled' : ''}`} onClick={() => handleBase(CHEESE_PIZZA)}>
                {isFull ? 'Selected' : 'Select'}
              </button>
            </div>
          </div>
        </div>




        <div className='add-to-cart-wrapper special-offers-cart every-day-special'>
          <div className='order-cart-cards'>
            <div>
              <h3>1 Medium Cheese Pie - 1 topping <span style={{ fontSize: '13px' }}>(of your choice)</span> </h3>
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
                              {item.toppings.length > 0 && item.toppings.map((topping) => (
                                <div>
                                  {topping}
                                </div>
                              ))}
                              {/* {item.desc} */}
                            </div>
                          </div>
                        </div>
                        <button onClick={() => handleBasedelete(indx)} style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}  ><DeleteIcon /></button>
                      </div>
                    ))}
                    {
                      Array.from({ length: requiredPies - selectedBaseItems.length }).map((__, indx) => (
                        <div key={`loading-${indx}`}>
                          <img src={loadingCartImg} />
                        </div>
                      ))
                    }
                  </>
                ) :
                (
                  <>
                    {
                      Array.from({ length: requiredPies }).map((__, indx) => (
                        <div key={`loading-${indx}`}>
                          <img src={loadingCartImg} />
                        </div>
                      ))
                    }
                  </>
                )}
            </div>


          </div>
          <div className='special-offer-cart-button'>
            <div className='total-amnt-add-to-cart'><span >Total Amount: </span> <span style={{ fontWeight: '700' }}>$ 7.99</span></div>

            <button className='add-to-cart-button' style={{ backgroundColor: 'black', color: 'white' }} onClick={handleOrder}>PROCEED TO ORDER</button>
          </div>
        </div>


        <button className='special-offer-mob-cart' onClick={() => setOpen(true)}><ShoppingCartIcon sx={{ transform: 'translateY(10%)' }} /><span style={{ fontSize: '15px', fontWeight: '700', transform: 'translateY(10%)' }}>$7.99</span></button>


        <Drawer
          anchor={"bottom"}
          open={isOpen}
          onClose={handleMobCartClose}
          sx={{ zIndex: "999", WebkitBackdropFilter: "blur(5px)", backdropFilter: "blur(5px)" }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '5px' }}>
            <img src={borderRadius} style={{ width: '30%', height: 'auto' }} />
          </div>
          <div style={{ padding: '1rem 1rem' }}>
            {/* <div style={{minHeight: '100px'}}>
              <h3>Two Medium Pies - 2 toppings of your choice </h3>
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
                  <button onClick={() => handleBasedelete(indx)} style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}><DeleteIcon /></button>
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


            <div  style={{minHeight: '100px'}}>
              <h3>9pcs of Zepoles </h3>
              Zepolis
            </div>
            <button className='add-to-cart-button' style={{ backgroundColor: 'black', color: 'white' }} onClick={handleOrder}>PROCEED TO ORDER</button> */}
            <div>
              <h3><h2>1 Medium Cheese Pie - 1 topping <span style={{ fontSize: '13px' }}>(of your choice)</span></h2></h3>
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
                              {item.toppings.length > 0 && item.toppings.map((topping) => (
                                <div>
                                  {topping}
                                </div>
                              ))}
                              {/* {item.desc} */}
                            </div>
                          </div>
                        </div>
                        <button onClick={() => handleBasedelete(indx)} style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}  ><DeleteIcon /></button>
                      </div>
                    ))}
                    {
                      Array.from({ length: requiredPies - selectedBaseItems.length }).map((__, indx) => (
                        <div key={`loading-${indx}`}>
                          <img src={loadingCartImg} />
                        </div>
                      ))
                    }
                  </>
                ) :
                (
                  <>
                    {
                      Array.from({ length: requiredPies }).map((__, indx) => (
                        <div key={`loading-${indx}`}>
                          <img src={loadingCartImg} />
                        </div>
                      ))
                    }
                  </>
                )}
            </div>


            <div className='special-offer-cart-button'>
              <div className='total-amnt-add-to-cart'><span >Total Amount: </span> <span style={{ fontWeight: '700' }}>$ 7.99</span></div>

              <button className='add-to-cart-button' style={{ backgroundColor: 'black', color: 'white' }} onClick={handleOrder}>PROCEED TO ORDER</button>
            </div>
          </div>


          {/* </div> */}


        </Drawer>
      </div>
    </div>
  )
}

export default EveryDaySpecial2;


// className='extra-items-special-offer evryday-special-1-static'