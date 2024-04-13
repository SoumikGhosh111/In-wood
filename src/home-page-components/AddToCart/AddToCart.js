import React from 'react'; 
import "./AddToCart.css"

function AddToCart({onOrderClick}) {

  return (
    <div className='add-to-cart-wrapper'> 
      <div className='order-cart-cards'>

      </div>

      <button className='add-to-cart-button' onClick={onOrderClick}>PROCEED TO ORDER</button>
    </div>
  )
}

export default AddToCart