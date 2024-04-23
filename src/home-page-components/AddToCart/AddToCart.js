import React from 'react';
import "./AddToCart.css";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementQty, decrementQty } from '../../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

import { getUser } from '../../functions/veifyUser';

function AddToCart({ onOrderClick }) {
  const Navigate = useNavigate(); 
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);
  const totalAmnt = cartItems.reduce((total, item) => 
    total + item.qty * item.price,
    0
  )
  console.log(cartItems);

  const handleOrderClick = async () => { 
    const isValid = await getUser(); 

    if(!isValid){ 
      alert("Not logged in, Need to Login")
      Navigate("/login")
    }else if(isValid) { 
      alert("logged in"); 
    }
  }
  return (
    <div className='add-to-cart-wrapper'>
      <div className='order-items'>
        {cartItems.map((item) => (
          <div className='order-cart-cards'>
            <div className='item-name-qty-price'>
              <div className='item-qty-name'>
                <span className='item-qty a'>{item.qty}X</span>
                <span className='item-name'>
                  {item.name}
                </span>
              </div>
              <DeleteIcon onClick = {() => dispatch(removeFromCart({id: item.id}))} sx={{cursor: "pointer"}}/>
            </div>
            {item.size && 
              <div className='item-size-price'>
                <p>{item.size}</p>
                <p>${(item.price * item.qty).toFixed(2)}</p>
              </div>
            }

            {item.toppings  && 
            <div className='item-topping'>
              {item.toppings.map((toping) => ( 
                <p>{toping.text}</p>
              ))}
            </div>
            }
          </div>
        ))}
      </div>  
      <div>Total Amount: ${(totalAmnt).toFixed(2)}</div>

      <button className='add-to-cart-button' onClick={handleOrderClick}>PROCEED TO ORDER</button>
    </div>
  )
}

export default AddToCart

{/*<button onClick={() => dispatch(removeFromCart({ id: item.id }))}>remove order</button><br />
            <button onClick={() => dispatch(incrementQty({ id: item.id }))}>inc</button>
            <button onClick={() => dispatch(decrementQty({ id: item.id }))}>dec</button>*/ }

          //   <p>Name: {item.name}</p>
          //   <p>Qty: {item.qty}</p>
          //   <p>Price: ${(item.price * item.qty).toFixed(2)}</p>
          //   {item.size && 
          //     <p>Size: {item.size}</p>
          //   }
          //  {item.toppings  && 
          //     <p>Toppings: {item.toppings.map((topping) => topping.text).join(', ')}</p>
          //  }

            