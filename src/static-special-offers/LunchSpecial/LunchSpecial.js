import React, { useState, useEffect } from 'react';
import "./LunchSpecial.css";
import { baseUrl } from '../../functions/baseUrl';
import pizzaImg from "../../assets/banner-1.jpg";
import borderRadius from "../../assets/special-offer-drawer-border.svg"; 
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; 

// slider
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

// toastify
import { toast } from 'react-toastify';

function LunchSpecial() {
  const Navigate = useNavigate();
  const [baseData, setBaseData] = useState(null);
  const [addedData, setAddeddata] = useState(null);

  const [selectedBaseItems, setSelectedBaseItems] = useState([]);
  const [selectedAddedItems, setSelectedAddedItems] = useState([]);

  const [isFull2, setIsFull2] = useState(false);
  const [isFull3, setIsFull3] = useState(false);

  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();
  const obj = useSelector(state => state.specialoffer.specialOrder);

  console.log(obj);

  const requiredPies = 1; //not

  const fetchAddedData = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/combo/allComboFood/Can Soda`);  //
      const result = await response.json();
      setAddeddata(result.data.food);
      console.log(result.data.food);
    } catch (err) {
      alert(err.message);
    }
  }


  useEffect(() => {
    // fetchBaseData();
    fetchAddedData();
    const baseObject = {
      title: '2 Slices of Cheese Pizza',
      baseImg: 'https://res.cloudinary.com/ddhhackni/image/upload/v1727500465/ns3hj1mxwqpfjmzj0ieb.jpg',
      desc: 'Our classic cheese pizza features a generous layer of melted mozzarella on a perfectly baked crust. Simple yet irresistible',
      toppings: []
    };

    setSelectedBaseItems([baseObject]); 

  }, []);


  useEffect(() => {   
    setIsFull2(selectedAddedItems.length === 1 ? true : false); 
  }, [selectedAddedItems]); 


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


  const handleAddedClick = (item) => {
    const addedItems = {
      title: item.title,
      addedItemImg: item.img,
      desc: item.desc,
    }
    if (selectedAddedItems.length < 1) {
      setSelectedAddedItems([...selectedAddedItems, addedItems]);
    } else {
      // alert("You can only add one");
      toast.error("You can only add one"); 
    }
  }

  const handleAddedItemsDelete = (indx) => {
    let newAddedItems = selectedAddedItems.filter((__, index) => index !== indx);
    setSelectedAddedItems(newAddedItems);
  }

  const handleOrder = () => {
    if (selectedBaseItems.length !== 1) {
      // alert("You must select exactly 2 base items.");
      return;
    }
    if (selectedAddedItems.length !== 1) {
      // alert("You must select exactly 1 item for 5pcs chicken wings.");
      toast.error("You must select exactly 1 item for 5pcs chicken wings"); 
      return;
    }
    dispatch(deleteSpecialObject());
    const specialOrder = {
      offerName: "Lunch Special",
      pizza: selectedBaseItems,
      addedItems: [`12 oz (about 354.88ml) ${selectedAddedItems[0].title}`],
      item: [selectedAddedItems[0].title],
      extraAdded: "",
      totalAmount: 4.99,
    };

    dispatch(addSpecialObject(specialOrder));
    toast.success("Order Created!")
    setTimeout(() => { 
      Navigate("/checkout");
    }, 1000); 
  }

  const handleMobCartClose = () => {
    setOpen(!isOpen);
  }

  return (
    <div className='combo-offer-2 '>
      <div className='static-special-offers-wrapper'>

        <h2>2 Slices of Cheese Pizza </h2>
        <div className='combo-offer-2-basses static-bases'>
          {/* <Slider {...settings}>
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
          </Slider> */}
          <div className='extra-items-special-offer evryday-special-1-static'>
              <div className='special-offers-carousel-inner'>
                <img src='https://res.cloudinary.com/ddhhackni/image/upload/v1727500465/ns3hj1mxwqpfjmzj0ieb.jpg' alt='yess' />
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column' }}>
                  <h4>Cheesy Perfection</h4>
                  <div style={{ fontSize: '10px', margin: '1rem 0rem' }}>Our classic cheese pizza features a generous layer of melted mozzarella on a perfectly baked crust. Simple yet irresistible</div>
                  <button className='add-to-cart-special-offer disabled'>
                    Selected
                  </button>
                </div>
              </div>
            </div>
        </div>

        <h2>1 Can Soda <span style={{fontSize: '15px'}}>(of your choice)</span></h2>
        <div className='combo-offers-2-added-items'>
          <Slider {...settings}>
            {addedData !== null && addedData.map((item) => (
              <div key={item._id}>
                <div className='special-offers-carousel-inner'>
                  <img src={item.img} alt={item.title} />
                  <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column' }}>
                    <h4>{item.title}</h4>
                    <div style={{ fontSize: '10px', margin: '1rem 0rem' }}>{item.desc}</div>
                    <button className={`add-to-cart-special-offer ${isFull2 ? 'disabled' : ''}`} onClick={() => handleAddedClick(item)}>
                       {isFull2 ? 'Selected' : 'Select'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        





        <div className='add-to-cart-wrapper special-offers-cart'>
          <div className='order-cart-cards'>
            <div>
              <h3>2 Slices of Cheese Pizza</h3>
              {/* {selectedBaseItems.length > 0 ?
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
                )} */}
                  <div >
              
              <div className='special-cart-item-containers'>
                <div className='special-cart-item-containers-img-info'>
                  <img src='https://res.cloudinary.com/ddhhackni/image/upload/v1727500465/ns3hj1mxwqpfjmzj0ieb.jpg' alt={pizzaImg} style={{ width: '100px', height: 'auto' }} />
                  <div className='special-cart-item-containers-info'>
                    <div style={{ fontWeight: '700' }}>Cheesy Perfection</div>
                    <div style={{ fontSize: '10px', marginTop: '0.5rem' }}>
                    Our classic cheese pizza features a generous layer of melted mozzarella on a perfectly baked crust. Simple yet irresistible
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
            <div>
              <h3>1 Can Soda <span style={{fontSize: '13px'}}>(of your choice)</span></h3>


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
            
          </div>
          <div className='special-offer-cart-button'>
            <div className='total-amnt-add-to-cart'><span >Total Amount: </span> <span style={{ fontWeight: '700' }}>$ 4.99</span></div>

            <button className='add-to-cart-button ' style={{ backgroundColor: 'black', color: 'white' }} onClick={handleOrder}>PROCEED TO ORDER</button>
          </div>
        </div>

        <div className=''>

        </div>

        <button className='special-offer-mob-cart' onClick={() => setOpen(true)}><ShoppingCartIcon sx={{ transform: 'translateY(10%)' }} /> <span style={{fontSize: '15px', fontWeight: '700', transform: 'translateY(10%)'}}>$4.99</span></button>


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
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '5px'}}>
            <img src={borderRadius} style={{width: '30%', height: 'auto'}}/>
          </div>

          <div style={{ padding: '1rem 1rem' }}>

          <div>
              <h3>2 Slices of Cheese Pizza</h3>
              {/* {selectedBaseItems.length > 0 ?
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
                )} */}
                  <div >
              
              <div className='special-cart-item-containers'>
                <div className='special-cart-item-containers-img-info'>
                  <img src='https://res.cloudinary.com/ddhhackni/image/upload/v1727500465/ns3hj1mxwqpfjmzj0ieb.jpg' alt={pizzaImg} style={{ width: '100px', height: 'auto' }} />
                  <div className='special-cart-item-containers-info'>
                    <div style={{ fontWeight: '700' }}>Cheesy Perfection</div>
                    <div style={{ fontSize: '10px', marginTop: '0.5rem' }}>
                    Our classic cheese pizza features a generous layer of melted mozzarella on a perfectly baked crust. Simple yet irresistible
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            </div>
            <div>
              <h3>1 Can Soda <span style={{fontSize: '13px'}}>(of your choice)</span> </h3>


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


            <div className='special-offer-cart-button'>
              <div className='total-amnt-add-to-cart'><span >Total Amount: </span> <span style={{ fontWeight: '700' }}>$ 4.99</span></div>

              <button className='add-to-cart-button ' style={{ backgroundColor: 'black', color: 'white' }} onClick={handleOrder}>PROCEED TO ORDER</button>
            </div>
          </div>


          {/* </div> */}




        </Drawer>
      </div >
    </div >
  )
}

export default LunchSpecial