import React from 'react'

function ShowCategoryBar({ getProducts }) {
  // Functions to fetch products according to category
  const category1Product = () => {
    getProducts("1");
  }

  const category2Product = () => {
    getProducts("2");
  }

  const category3Product = () => {
    getProducts("3")
  }

  const category4Product = () => {
    getProducts("4")
  }

  return (
    <ul>
      <li><a href="#home" onClick={category1Product}>Canned Food</a></li>
      <li><a href="#news" onClick={category2Product}>Dairy products</a></li>
      <li><a href="#contact" onClick={category3Product}>Meat</a></li>
      <li><a href="#about" onClick={category4Product}>Vegetables</a></li>
    </ul>
  )
}

export default ShowCategoryBar