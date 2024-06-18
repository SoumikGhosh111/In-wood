import React, { useState, useEffect } from 'react';
import { baseUrl } from '../../functions/baseUrl';
import "./ComboOffer4.css";
import pizzaImg from "../../assets/banner-1.jpg";



// slick-carousel
import Slider from 'react-slick';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { addToSpecialCart, deleteFromSpecialCart, checkQty, setQuantities } from '../../redux/slices/specialOffersSlice';

function ComboOffer4() {
  const [baseData, setBaseData] = useState(null);
  const [addedData, setAddeddata] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedBaseItems, setSelectedBaseItems] = useState([]);
  const [selectedAddedItems, setSelectedAddedItems] = useState([]); 
  const dispatch = useDispatch();
  const { baseQty, addedQty, base, addedItems } = useSelector(state => state.specialoffer);



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

  const fetchAddedData = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/product/getAllFood/Chicken Wings`);
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
    console.log({ baseQty, addedQty, base, addedItems });
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
      title: item.title,
      toppings: selectedToppings,
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
      title: item.title
    }
    if(selectedAddedItems.length < 1){ 
      setSelectedAddedItems([...selectedAddedItems, addedItems]); 
    }else{ 
      alert("You can only add one"); 
    }
  }

  const handleBasedelete = (indx) => { 
    let newBaseItems = selectedBaseItems.filter((__, index) => index!== indx)
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
    const order = {
      baseItems: selectedBaseItems,
      addedItems:`10pcs of ${selectedAddedItems[0].title}`,
      item: selectedAddedItems[0].title,
      zepolis:" 6pcs of zepolis",
      canolis:" 6pcs of Canolis",
      totalAmount: 39.99,
    };

    console.log("Order placed:", order);
    // Here you can dispatch an action to add the order to the cart or perform any other action
    // dispatch(addToSpecialCart(order));
    alert("Order placed successfully!");
  }
  return (
    <div className='combo-offer-2'>
      <div className='static-special-offers-wrapper'>

        <h2>Two Medium pies - 2 Toppings of Your Choice</h2>
        <div className='combo-offer-2-basses'>
          <Slider {...settings}>
            {baseData !== null && baseData.map((item) => (
              <div key={item._id}>
                <div className='special-offers-carousel-inner'>
                  <img src={item.img} alt={item.title} />
                  <div>
                    <p>{item.title}</p>
                    <span style={{ fontSize: '10px' }}>{item.desc}</span>
                    <h3>Select 3 Toppings of Your Choice</h3>
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
                      Add To Cart
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
                    <p>{item.title}</p>
                    <span style={{ fontSize: '10px' }}>{item.desc}</span>
                    <button className='add-to-cart-special-offer' onClick={() => handleAddedClick(item)}>
                      Add To Cart
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
              <p>6 pcs of Zepolis</p>
              <span style={{ fontSize: '10px' }}>The classic pepperoni pizza is typically prepared with mozzarella cheese, tomato sauce, and a generous layer of pepperoni slices ...See more</span>
              <button className='add-to-cart-special-offer disabled'>
                Add To Cart
              </button>
            </div>
          </div>
        </div>

        <div className='extra-items-special-offer'>
          <h2>6 pcs of Canolis</h2>
          <div className='special-offers-carousel-inner'>
            <img src={pizzaImg} alt='yess' />
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column' }}>
              <p>6 pcs of Zepolis</p>
              <span style={{ fontSize: '10px' }}>The classic pepperoni pizza is typically prepared with mozzarella cheese, tomato sauce, and a generous layer of pepperoni slices ...See more</span>
              <button className='add-to-cart-special-offer disabled'>
                Add To Cart
              </button>
            </div>
          </div>
        </div>





        <div className='add-to-cart-wrapper special-offers-cart'>
          <div className='order-cart-cards'>
            <div>
              <h3>Two Medium Pies - 3 toppings of your choice </h3>
              {selectedBaseItems.length > 0 && selectedBaseItems.map((item, indx) => ( 
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div>
                    {item.title}
                    {item.toppings.length > 0 && item.toppings.map((topping) => ( 
                      <div>
                        {topping}
                      </div>
                    ))}
                    </div>
                    <button onClick={() => handleBasedelete(indx)}>Delete</button>
                </div>
              ))}
            </div>
            <div>
              <h3>5pcs of Chicken wings of your Choice </h3>
              {selectedAddedItems.length > 0 && selectedAddedItems.map((item, indx) => ( 
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  {item.title}
                  <button onClick={() => (handleAddedItemsDelete(indx))}>Delete</button>
                </div>
              ))}
            </div>
            <div>
              <h3>6 pcs of Zepoles </h3>
              Zepolis
            </div>
            <div>
              <h3>6 pcs of Canoles </h3>
              Canolis
            </div>
          </div>
          <div>
            <div className='total-amnt-add-to-cart'><span >Total Amount: </span> <span style={{ fontWeight: '700' }}>$ 39.99</span></div>

            <button className='add-to-cart-button' onClick={handleOrder}>PROCEED TO ORDER</button>
          </div>
        </div>

      </div>
    </div>

  );
}

export default ComboOffer4;
