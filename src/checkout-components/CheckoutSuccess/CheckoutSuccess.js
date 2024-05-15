import React, {useEffect} from 'react'
import { resetCart } from '../../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import "./CheckoutSuccess.css"

function CheckoutSuccess() {
const dispatch = useDispatch(); 
  useEffect(() => { 
    dispatch(resetCart()); 
    setTimeout(() => { 
      handleBackToHome(); 
    }, 3000); 
  }, []); 

  const handleBackToHome = () => { 
    window.location.href = '/my-order';

    // Clearing the browser's history
    window.history.replaceState(null, '', '/my-order');
  }
  return (
    <div>
      <>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"
          rel="stylesheet"
        />
        <link
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <title>Document</title>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-5">
              <div className="message-box _success">
                <i className="fa fa-check-circle" aria-hidden="true" />
                <h2> Your payment was successful </h2>
                <p>
                  {" "}
                  Thank you for your payment. we will <br />
                  be in contact with more details shortly{" "}
                </p>
              </div>
            </div>
          </div>
          {/*     <hr>
  
  
  <div class="row justify-content-center">
      <div class="col-md-5">
          <div class="message-box _success _failed">
               <i class="fa fa-times-circle" aria-hidden="true"></i>
              <h2> Your payment failed </h2>
       <p>  Try again later </p> 
   
      </div> 
  </div> 
    </div>  */}
        </div>
      </>

    </div>
  )
}

export default CheckoutSuccess