import React from 'react'
import Product from './Product'
import ShowCategoryBar from './ShowCategoryBar'

function ShowProductCatalog({products, items, addItem, removeItem, getProducts}) {
  return (
    // render products page body
    <div className='product-body'>
        <ShowCategoryBar getProducts={getProducts} />
        <div className="grid-container">
            {products.map((products) => <Product key={products.id} product={products} items={items} addItem={addItem} removeItem={removeItem} />)}
        </div>
    </div>
  )
}

export default ShowProductCatalog