import React, { useState } from 'react'

function ShowNavBar({logOut, Cart, userName}) {
  // Top nav bar label state
  const [label, setLabel] = useState(["Product", "Go to Cart"])

  // Change labels
  const labelSelect = () =>{
    label[1]==="Go to Cart"?setLabel(()=>["Cart", "Products"]):setLabel(()=>["Products", "Go to Cart"])
    Cart()
  }

  return (
    // Render product nav bar
    <ul>
      <li><a className="active" href="#home" style={{width: "280px"}}>{userName}</a></li>
      <li style={{marginLeft: "30%"}}><a href="#about">{label[0]}</a></li>
      <li style={{float: "right"}} onClick={labelSelect}><a href="#about">{label[1]}</a></li>
      <li style={{float: "right"}} onClick={logOut}><a href="#about">Log Out</a></li>
    </ul>
  )
}

export default ShowNavBar