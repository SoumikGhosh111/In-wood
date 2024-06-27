import React, { useState, useEffect } from 'react';
import { baseUrl } from '../../functions/baseUrl';
import "./ComboOffer4.css";
import pizzaImg from "../../assets/banner-1.jpg";
import borderRadius from "../../assets/special-offer-drawer-border.svg"
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';



// slick-carousel
import Slider from 'react-slick';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { addSpecialObject, deleteSpecialObject } from '../../redux/slices/specialOffersSlice';

// loading cart img
import loadingCartImg from "../../assets/cartLoading.svg";

// importing drawer
import { Drawer } from '@mui/material';

function ComboOffer4() {
  const Navigate = useNavigate();
  const [baseData, setBaseData] = useState(null);
  const [addedData, setAddeddata] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedBaseItems, setSelectedBaseItems] = useState([]);
  const [selectedAddedItems, setSelectedAddedItems] = useState([]);

  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();
  const obj = useSelector(state => state.specialoffer.specialOrder);
  const requiredPies = 2;


  const fetchBaseData = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/combo/allComboFood/Medium Pie`);
      const result = await response.json();
      setBaseData(result.data.food);
      console.log(result.data.food);
    } catch (err) {
      alert(err.message);
    }
  }

  const fetchAddedData = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/combo/allComboFood/Chicken Wings 5Pcs`);
      const result = await response.json();
      setAddeddata(result.data.food);
      console.log(result.data.food);
    } catch (err) {
      alert(err.message);
    }
  }

  useEffect(() => {
    fetchBaseData();
    fetchAddedData();
    // handleSetQuantities();
  }, []);

  const handleToppingChange = (topping) => {
    const updatedToppings = selectedToppings.includes(topping)
      ? selectedToppings.filter(t => t !== topping)
      : [...selectedToppings, topping];

    if (updatedToppings.length <= 3) {
      setSelectedToppings(updatedToppings);
    } else {
      alert("You can only select up to 2 toppings.");
    }
  }

  const isToppingDisabled = (topping) => {
    return selectedToppings.length >= 3 && !selectedToppings.includes(topping);
  }

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }


  const handleBase = (item) => {
    const baseObject = {
      title: item.productType,
      toppings: selectedToppings,
      baseImg: item.img,
    };

    if (selectedBaseItems.length < 2) {
      setSelectedBaseItems([...selectedBaseItems, baseObject]);
    } else {
      alert("You can only select up to 2 base items.");
    }
    setSelectedToppings([])

    console.log(selectedBaseItems)

  }

  const handleAddedClick = (item) => {
    const addedItems = {
      title: item.productType,
      addedItemImg: item.img,
      desc: item.desc,
    }
    if (selectedAddedItems.length < 1) {
      setSelectedAddedItems([...selectedAddedItems, addedItems]);
    } else {
      alert("You can only add one");
    }
  }

  const handleBasedelete = (indx) => {
    let newBaseItems = selectedBaseItems.filter((__, index) => index !== indx)
    setSelectedBaseItems(newBaseItems);
  }

  const handleAddedItemsDelete = (indx) => {
    let newAddedItems = selectedAddedItems.filter((__, index) => index !== indx);
    setSelectedAddedItems(newAddedItems);
  }

  // const handleSetQuantities = () => {

  //   dispatch(setQuantities({ baseQty: 2, addedQty: 1 }));

  // }

  const handleOrder = () => {
    if (selectedBaseItems.length !== 2) {
      alert("You must select exactly 2 base items.");
      return;
    }
    if (selectedAddedItems.length !== 1) {
      alert("You must select exactly 1 item for 5pcs chicken wings.");
      return;
    }
    dispatch(deleteSpecialObject());
    const specialOrder = {
      offerName: "Game Day Ultra",
      pizza: selectedBaseItems,
      addedItems: [`${selectedAddedItems[0].title}(10Pcs)`],
      item: [selectedAddedItems[0].title],
      extraAdded: "Zepolis(6pcs) Canolis(6Pcs)",
      totalAmount: 39.99,
    };

    dispatch(addSpecialObject(specialOrder));

    // console.log("Order placed:", specialOrder);
    // Here you can dispatch an action to add the order to the cart or perform any other action
    // dispatch(addToSpecialObject(order));
    alert("Order placed successfully!");

    Navigate("/checkout")


  }

  const handleMobCartClose = () => {
    setOpen(!isOpen);
  }
  return (
    <div className='combo-offer-2'>
      <div className='static-special-offers-wrapper'>

        <h2>Two Medium pies - 3 Toppings of Your Choice</h2>
        <div className='combo-offer-2-basses'>
          <Slider {...settings}>
            {baseData !== null && baseData.map((item) => (
              <div key={item._id}>
                <div className='special-offers-carousel-inner'>
                  <img src={item.img} alt={item.title} />
                  <div>
                    <h3>{item.productType}</h3>
                    <div style={{ fontSize: '10px', margin: '1rem 0rem' }}>{item.desc}</div>
                    <h4 style={{ marginBottom: '0.5rem' }}>Select 3 Toppings of Your Choice</h4>
                    {["Topping 1", "Topping 2", "Topping 3", "Topping 4", "Topping 5", "Topping 6"].map(topping => (
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
                    <button className='add-to-cart-special-offer' onClick={() => handleBase(item)}>
                      Select
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <h2>Ten Pcs Wings of Your Choice</h2>
        <div className='combo-offers-2-added-items'>
          <Slider {...settings}>
            {addedData !== null && addedData.map((item) => (
              <div key={item._id}>
                <div className='special-offers-carousel-inner'>
                  <img src={item.img} alt={item.title} />
                  <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column' }}>
                    <h4>{item.productType}</h4>
                    <div style={{ fontSize: '10px', margin: '1rem 0rem' }}>{item.desc}</div>
                    <button className='add-to-cart-special-offer' onClick={() => handleAddedClick(item)}>
                      Select
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <div className='extra-items-special-offer'>
          <h2>6 pcs of Zepolis</h2>
          <div className='special-offers-carousel-inner'>
            <img src={pizzaImg} alt='yess' />
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column' }}>
              <h4>6 pcs of Zepolis</h4>
              <div style={{ fontSize: '10px', margin: '1rem 0rem' }}>The classic pepperoni pizza is typically prepared with mozzarella cheese, tomato sauce, and a generous layer of pepperoni slices ...See more</div>
              <button className='add-to-cart-special-offer disabled'>
                Select
              </button>
            </div>
          </div>
        </div>

        <div className='extra-items-special-offer'>
          <h2>6 pcs of Canolis</h2>
          <div className='special-offers-carousel-inner'>
            <img src={pizzaImg} alt='yess' />
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column' }}>
              <h4>6 pcs of Canolis</h4>
              <div style={{ fontSize: '10px', margin: '1rem 0rem' }}>The classic pepperoni pizza is typically prepared with mozzarella cheese, tomato sauce, and a generous layer of pepperoni slices ...See more</div>
              <button className='add-to-cart-special-offer disabled'>
                Select
              </button>
            </div>
          </div>
        </div>





        <div className='add-to-cart-wrapper special-offers-cart combo-4'>
          <div className='order-cart-cards'>
            <div>
              <h3>Two Medium Pies - 3 toppings of your choice </h3>
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
            <div>
              <h3>10pcs of Chicken wings of your Choice </h3>
              {selectedAddedItems.length > 0 ? (
                <>
                  {selectedAddedItems.map((item, indx) => (
                    <div className='special-cart-item-containers'>
                      <div className='special-cart-item-containers-img-info'>
                        <img src={item.addedItemImg} alt={item.addedItemImg} style={{ width: '100px', height: 'auto' }} />
                        <div className='special-cart-item-containers-info'>
                          <div style={{ fontWeight: '700' }}>{item.title}</div>
                          <div style={{ fontSize: '10px', marginTop: '0.5rem' }}>
                            {item.desc}
                          </div>
                        </div>
                      </div>
                      <button onClick={() => handleAddedItemsDelete(indx)} style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}  ><DeleteIcon /></button>
                    </div>
                  ))}
                </>
              ) :
                (
                  <>
                    <img src={loadingCartImg} />
                  </>
                )}
            </div>
            <div>
              <h3>6 pcs of Zepoles </h3>
              <div className='special-cart-item-containers'>
                <div className='special-cart-item-containers-img-info'>
                  <img src={pizzaImg} alt={pizzaImg} style={{ width: '100px', height: 'auto' }} />
                  <div className='special-cart-item-containers-info'>
                    <div style={{ fontWeight: '700' }}>Zepolis</div>
                    <div style={{ fontSize: '10px', marginTop: '0.5rem' }}>
                      Light and fluffy fried dough balls, generously dusted with powdered sugar. A sweet delight!
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3>6 pcs of Canoles </h3>
              <div className='special-cart-item-containers'>
                <div className='special-cart-item-containers-img-info'>
                  <img src={pizzaImg} alt={pizzaImg} style={{ width: '100px', height: 'auto' }} />
                  <div className='special-cart-item-containers-info'>
                    <div style={{ fontWeight: '700' }}>Canolis</div>
                    <div style={{ fontSize: '10px', marginTop: '0.5rem' }}>
                      Crispy pastry shells filled with a rich and creamy ricotta filling, topped with chocolate chips or a hint of citrus
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='special-offer-cart-button'>
            <div className='total-amnt-add-to-cart'><span >Total Amount: </span> <span style={{ fontWeight: '700' }}>$ 39.99</span></div>

            <button className='add-to-cart-button' style={{ backgroundColor: 'black', color: 'white' }} onClick={handleOrder}>PROCEED TO ORDER</button>
          </div>
        </div>



        <button className='special-offer-mob-cart' onClick={() => setOpen(true)}><ShoppingCartIcon sx={{ transform: 'translateY(10%)' }} /></button>


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
            <div>
              <h3>Two Medium Pies - 3 toppings of your choice </h3>
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
            <div>
              <h3>10pcs of Chicken wings of your Choice </h3>
              {selectedAddedItems.length > 0 ? (
                <>
                  {selectedAddedItems.map((item, indx) => (
                    <div className='special-cart-item-containers'>
                      <div className='special-cart-item-containers-img-info'>
                        <img src={item.addedItemImg} alt={item.addedItemImg} style={{ width: '100px', height: 'auto' }} />
                        <div className='special-cart-item-containers-info'>
                          <div style={{ fontWeight: '700' }}>{item.title}</div>
                          <div style={{ fontSize: '10px', marginTop: '0.5rem' }}>
                            {item.desc}
                          </div>
                        </div>
                      </div>
                      <button onClick={() => handleAddedItemsDelete(indx)} style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}  ><DeleteIcon /></button>
                    </div>
                  ))}
                </>
              ) :
                (
                  <>
                    <img src={loadingCartImg} />
                  </>
                )}
            </div>
            <div>
              <h3>6 pcs of Zepolis </h3>
              <div className='special-cart-item-containers'>
                <div className='special-cart-item-containers-img-info'>
                  <img src={pizzaImg} alt={pizzaImg} style={{ width: '100px', height: 'auto' }} />
                  <div className='special-cart-item-containers-info'>
                    <div style={{ fontWeight: '700' }}>Zepolis</div>
                    <div style={{ fontSize: '10px', marginTop: '0.5rem' }}>
                      Light and fluffy fried dough balls, generously dusted with powdered sugar. A sweet delight!
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3>6 pcs of Canolis </h3>
              <div className='special-cart-item-containers'>
                <div className='special-cart-item-containers-img-info'>
                  <img src={pizzaImg} alt={pizzaImg} style={{ width: '100px', height: 'auto' }} />
                  <div className='special-cart-item-containers-info'>
                    <div style={{ fontWeight: '700' }}>Canolis</div>
                    <div style={{ fontSize: '10px', marginTop: '0.5rem' }}>
                      Crispy pastry shells filled with a rich and creamy ricotta filling, topped with chocolate chips or a hint of citrus
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className='special-offer-cart-button'>
              <div className='total-amnt-add-to-cart'><span >Total Amount: </span> <span style={{ fontWeight: '700' }}>$ 39.99</span></div>

              <button className='add-to-cart-button' style={{ backgroundColor: 'black', color: 'white' }} onClick={handleOrder}>PROCEED TO ORDER</button>
            </div>
          </div>



        </Drawer>
      </div>
    </div>

  );
}

export default ComboOffer4;
