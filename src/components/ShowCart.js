import React, { useState, useEffect }  from 'react'
import Cart from './Cart'
import axios from 'axios';

// Cart catalog function
function ShowCart({name, email, items, setItems, removeItem, setCart, Survey}) {
  // submit button disable
  const[isdisabled, setIsDisabled] = useState(false)


  const placeOrder = ()=>{
    // POST request for checkout
    axios.post('http://localhost:8080/api/order/checkout_order', {
      email: email,
    })
    .then(function (response) {
      if(response.status===200)
      {
        // Place cart as order
        alert("Order Placed")
        setItems([])
        setCart(false)
        Survey(name, email)
      }
      else
      {
        alert("Something went Wrong. Please try Again!!")
      }
    })
    .catch(function (error) {
      console.log(error)
      alert("Invalid email or password")
    });
  }

  useEffect(()=>{
    items.length===0?setIsDisabled(true):setIsDisabled(false)
  },[items])

  return (
    // Render whole cart catalog
    <div className="cart">
      {items.map((items)=>{return(
          <Cart key={items.id} item={items} removeItem={removeItem} />
      )})}
      <input className="verify" type="button" value="Place Order" disabled={isdisabled} onClick={placeOrder} />
    </div>
  )
}

export default ShowCart