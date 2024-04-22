import React from 'react';
import "./AddToCart.css";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementQty, decrementQty } from '../../redux/slices/cartSlice';

function AddToCart({ onOrderClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);
  console.log(cartItems);
  return (
    <div className='add-to-cart-wrapper'>
      <div className='order-items'>
        {cartItems.map((item) => (
          <div className='order-cart-cards'>
            <p>Name: {item.name}</p>
            <p>Qty: {item.qty}</p>
            <p>Price: ${(item.price * item.qty).toFixed(2)}</p>
            {item.size && 
              <p>Size: {item.size}</p>
            }
           {item.toppings  && 
              <p>Toppings: {item.toppings.map((topping) => topping.text).join(', ')}</p>
           }
            <button onClick={() => dispatch(removeFromCart({ id: item.id }))}>remove order</button><br />
            <button onClick={() => dispatch(incrementQty({ id: item.id }))}>inc</button>
            <button onClick={() => dispatch(decrementQty({ id: item.id }))}>dec</button>
          </div>
        ))}
      </div>

      <button className='add-to-cart-button' onClick={onOrderClick}>PROCEED TO ORDER</button>
    </div>
  )
}

export default AddToCart

{/**/ }