import React, { useState, useEffect } from 'react'

// this function takes products with those on cart and adds and calls function to edit items on cart
function Product( {product, items, addItem, removeItem} ) {
    // states for button value and cartId of items in cart
    const [selected, setSelected] = useState("Add")
    const [cartId, setCartId] = useState(-1)
    
    // handle add and remove change initially
    useEffect(()=>{
        for (let index = 0; index < items.length; index++) {
            if(items[index].productName === product.name){
                setSelected(()=>("Remove"))
                setCartId(()=>(items[index].id))
            }
        }
    },[items, product.name])

    // handle add and remove change
    const editCart = ()=>{
        if(selected==="Add"){
            addItem(product)
            setSelected("Remove")
        }else{
            removeItem(cartId)
            setSelected("Add")
        }
    }

    return (
        // render each product render
        <div className="card">
            <div className="container">
                <h4><b>{product.name}</b></h4>
                <input type="button" value={selected} onClick={editCart} style={{width:"100px"}} />
            </div>
        </div>
  )
}

export default Product