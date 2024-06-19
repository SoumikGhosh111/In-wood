import React, { useState, useEffect } from 'react';
import { baseUrl } from '../../functions/baseUrl';
import "./ComboOffer2.css";
import pizzaImg from "../../assets/banner-1.jpg";



// slick-carousel
import Slider from 'react-slick';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { addSpecialObject, deleteSpecialObject } from '../../redux/slices/specialOffersSlice';

function ComboOffer2() {
  const [baseData, setBaseData] = useState(null);
  const [addedData, setAddeddata] = useState(null);
  const[addedData2, setAddeddata2] = useState(null); 

  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedBaseItems, setSelectedBaseItems] = useState([]);
  const [selectedAddedItems, setSelectedAddedItems] = useState([]); 
  const [selectedAddedItems2, setSelectedAddedItems2] = useState([]); 
  const dispatch = useDispatch();
  const obj = useSelector(state => state.specialoffer.specialOrder);

  console.log(obj); 



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
  const fetchAddedData2 = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/product/getAllFood/Deep Fried`);
      const result = await response.json();
      setAddeddata2(result.data.food);
      console.log(result.data.food);
    } catch (err) {
      alert(err.message);
    }
  }

  useEffect(() => {
    fetchBaseData();
    fetchAddedData();
    fetchAddedData2(); 
    // handleSetQuantities(); 
    
  }, []);

  const handleToppingChange = (topping) => {
    const updatedToppings = selectedToppings.includes(topping)
      ? selectedToppings.filter(t => t !== topping)
      : [...selectedToppings, topping];

    if (updatedToppings.length <= 2) {
      setSelectedToppings(updatedToppings);
    } else {
      alert("You can only select up to 2 toppings.");
    }
  }

  const isToppingDisabled = (topping) => {
    return selectedToppings.length >= 2 && !selectedToppings.includes(topping);
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
      toppings:  []
    };

    if (selectedBaseItems?.length < 2) {
      setSelectedBaseItems([...selectedBaseItems, baseObject]);
    } else {
      alert("You can only select up to 2 base items.");
    }

    console.log(selectedBaseItems)
    
  }

  const handleAddedClick = (item) => {
    const addedItems = { 
      title: item.productType
    }
    if(selectedAddedItems.length < 1){ 
      setSelectedAddedItems([...selectedAddedItems, addedItems]); 
    }else{ 
      alert("You can only add one"); 
    }
  }

  const handleAddedClick2 = (item) => {
    const addedItems = { 
      title: item.productType
    }
    if(selectedAddedItems2.length < 1){ 
      setSelectedAddedItems2([...selectedAddedItems2, addedItems]); 
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

  const handleAddedItemsDelete2 = (indx) => { 
    let newAddedItems = selectedAddedItems2.filter((__,index)=> index !== indx); 
    setSelectedAddedItems2(newAddedItems); 
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
    if (selectedAddedItems.length !== 1) {
      alert("You must select exactly 1 item for 2Ltr of Soda.");
      return;
    }
    dispatch(deleteSpecialObject());  
    const specialOrder = {
      offerName: "Game Day Core", 
      pizza: selectedBaseItems,
      addedItems:[`${selectedAddedItems[0].title}(5Pcs)`, selectedAddedItems2[0].title],
      item: [selectedAddedItems[0].title, selectedAddedItems2[0].title],
      extraAdded: "",
      totalAmount: 24.99,
    };

    alert("Order Created"); 
    dispatch(addSpecialObject(specialOrder)); 
  }
  return (
    <div className='combo-offer-2'>
      <div className='static-special-offers-wrapper'>

        <h2>Two Medium Chees Pies of Your Choice</h2>
        <div className='combo-offer-2-basses'>
          <Slider {...settings}>
            {baseData !== null && baseData.map((item) => (
              <div key={item._id}>
                <div className='special-offers-carousel-inner'>
                  <img src={item.img} alt={item.title} />
                  <div>
                    <p>{item.productType}</p>
                    <span style={{ fontSize: '10px' }}>{item.desc}</span>
                   
                    
                    <button className='add-to-cart-special-offer' onClick={() => handleBase(item)}>
                      Select
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <h2>Five Pcs Wings of Your Choice</h2>
        <div className='combo-offers-2-added-items'>
          <Slider {...settings}>
            {addedData !== null && addedData.map((item) => (
              <div key={item._id}>
                <div className='special-offers-carousel-inner'>
                  <img src={item.img} alt={item.title} />
                  <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column' }}>
                    <p>{item.productType}</p>
                    <span style={{ fontSize: '10px' }}>{item.desc}</span>
                    <button className='add-to-cart-special-offer' onClick={() => handleAddedClick(item)}>
                      Select
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <h2>2Ltr Soda of your choice</h2>
        <div className='combo-offers-2-added-items'>
          <Slider {...settings}>
            {addedData2 !== null && addedData2.map((item) => (
              <div key={item._id}>
                <div className='special-offers-carousel-inner'>
                  <img src={item.img} alt={item.title} />
                  <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column' }}>
                    <p>{item.productType}</p>
                    <span style={{ fontSize: '10px' }}>{item.desc}</span>
                    <button className='add-to-cart-special-offer' onClick={() => handleAddedClick2(item)}>
                      Select
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
              <h3>Two Medium Chees Pies of Your Choice</h3>
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
              <h3>2Ltr Soda of Your Choice</h3>
              {selectedAddedItems2.length > 0 && selectedAddedItems2.map((item, indx) => ( 
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  {item.title}
                  <button onClick={() => (handleAddedItemsDelete2(indx))}>Delete</button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className='total-amnt-add-to-cart'><span >Total Amount: </span> <span style={{ fontWeight: '700' }}>$ 24.99</span></div>

            <button className='add-to-cart-button' onClick={handleOrder}>PROCEED TO ORDER</button>
          </div>
        </div>

      </div>
    </div>

  );
}

export default ComboOffer2;
