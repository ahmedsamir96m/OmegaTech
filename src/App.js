import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { commerce } from './lib/commerce'
import { Navbar, Products, Cart } from './components'

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data)
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve())
  }
  
  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity)
    setCart(item.cart)
  }

  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])

  return (
    <Router>
      <div>
        <Navbar cartTotalItems={cart.total_items}/>
        <Routes>
          <Route exact path='/' element={<Products products={products} handleAddToCart={handleAddToCart}/>}/>
          <Route exact path='/cart' element={<Cart cart={cart} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
