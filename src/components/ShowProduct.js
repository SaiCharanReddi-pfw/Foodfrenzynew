import React, { useState, useEffect } from 'react'
import ShowNavBar from './ShowNavBar'
import ShowProductCatalog from './ShowProductCatalog'
import ShowCart from './ShowCart'
import axios from 'axios'

// Product catalog function
function ShowProduct({ LogIn, userName, email, Survey}) {
  // states catId, products, cart items and show cart
  const [catId, setCatId] = useState("1")
  const [products, setProducts] = useState([])
  const [items, setItems] = useState([])
  const [cart, setCart] = useState(false)

  // logout function
  const logOut = () => {
    LogIn()
  }

  const addItem = (data) => {
    // post request to add items to the cart
    axios.post('http://localhost:8080/api/addtocart/addProduct', {
        productId: data.id,
        email : email,
        qty : "1"
      })
      .then(function (response) {
        if(response.status===200)
        {
          setItems(response.data)
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

  const removeItem = (id) => {
    // post request to remove items from cart
    axios.post('http://localhost:8080/api/addtocart/removeProductFromCart', {
      cartId: id,
      email : email
      })
      .then(function (response) {
        if(response.status===200)
        {
          setItems(response.data)
        }
        else
        {
          alert("Something went Wrong. Please try Again!!")
        }
      })
      .catch(function (error) {
        alert("Invalid email or password")
      });
  }

  const body = ()=>{
    // show cart or product catalog
    if(!cart){
      return <ShowProductCatalog products={products} items={items} addItem={addItem} removeItem={removeItem} getProducts={getProducts} />
    }else{
      return <ShowCart name={userName} email={email} items={items} setItems={setItems} removeItem={removeItem} setCart={setCart} Survey={Survey} />
    }
  }

  const Cart = () =>{
    setCart((prev)=>(!prev))
  }

  useEffect(()=>{
    // post request to get products based on category whenever catId is changed
    axios.post('http://localhost:8080/api/product/getProductsByCategory', {
        cat_id: catId,
      })
      .then(function (response) {
        if(response.status===200)
        {
          setProducts(response.data)
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
  },[catId])

  useEffect(()=>{
    // post request to get cart initially based on email
    axios.post('http://localhost:8080/api/addtocart/getCartsByUserId', {
      email: email,
    })
    .then(function (response) {
      if(response.status===200)
      {
        setItems(response.data)
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
  },[email])

  const getProducts = (id)=>{
    setCatId(id)
  }

  return (
    // render products page
    <div className='product'>
      <ShowNavBar logOut={logOut} Cart={Cart} userName={userName} />
      {body()}
    </div>
  )
}

export default ShowProduct