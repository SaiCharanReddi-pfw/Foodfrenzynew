import React from 'react'

// function takes items in cart and remove cart item function
function Cart({item, removeItem}) {
    // Remove item with given id from cart
    const remove = () =>{
        removeItem(item.id)
    }
    return (
        // Cart render
        <div className="cart-container">
            <b style={{width: "100px"}}>{item.productName}</b><div className='qty'>Qty: 1</div><input className='edit' type="button" value="Remove" onClick={remove} style={{float: "right", borderRadius: "10px",padding: "5px 10px"}} />
        </div>
  )
}

export default Cart