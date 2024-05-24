import React, { useState, useEffect } from "react";
import { findUser, updateUserCart } from "../repository/credentials";
import { createCart, findCart, updateCart, createCartItem, findCartItem, updateCartItem } from "../repository/cart"; 

export default function StoreItem(props) {
  const [quantity, setQuantity] = useState(1); 
  // const [user, setUser] = useState();
  // const [isLoading, setIsLoading] = useState(true);
  // const [currQuantity, setCurrQuantity] = useState(0); 
  // const quantity = 1;
  // console.log(props.id); 
  // console.log(props.name);
  // console.log(props.username);

  // useEffect(() => {
  //   async function loadUser() {
  //     const currentUser = await findUser(props.user.username);

  //     setUser(currentUser);
  //     // console.log(currentProducts);
  //     setIsLoading(false);
  //   }

  //   loadUser();
  // }, []);

  const addQuantity = () => {
    setQuantity(quantity + 1);
  }

  const decreaseQuantity = () => {
    if(quantity > 1) {
      setQuantity(quantity - 1);
    }
  }
  
  // console.log(props.user.curr_cart);

  // const handleAddToCart = (event) => {
  //   addToCart(event, props.user.username, props.id, quantity, props.price); 
  // }

  // const addToCart = async (event, username, id, quantity, price) => {
  //   event.preventDefault(); 
    
  //   const verified = verifyItem(username, id); 
  //   console.log(verified);

  //   if(verified === false) {
  //     addItem(id, quantity, name, price, image);
  //     alert("Product added to cart! "); 
  //     return
  //   }

  //   updateItem(id, quantity);
  //   alert("Product added to cart! "); 

  //   // console.log(id); 
  //   // console.log(quantity);
  // }

  const handleAddToCart = async (event) => {
    const user = await findUser(props.user.username);    // Main purpose is to check curr_cart of user by getting the user info to know whether a cart already exists
    console.log(user);
    addToCart(event, user, props.id, quantity, props.price); 
  }

  const addToCart = async (event, user, id, quantity, price) => {
    event.preventDefault(); 
    // console.log(user); 
    console.log(id);
    
    //----------------------------------------------------------- No Cart yet --------------------------------------------------------------------------------------------------------------------

    if (user.curr_cart === 0) {   // If user has no cart
      const totalPrice = quantity * price; 
      // console.log(totalPrice);
      const cart = {
        total_price: totalPrice, 
        username: user.username
      }
      const cartInfo = await createCart(cart);    // Create a new cart
      console.log(cartInfo);
      const cartItem = {
        quantity: quantity, 
        price: price, 
        item_total_price: totalPrice, 
        cart_id: cartInfo.cart_id, 
        product_id: id
      }
      await createCartItem(cartItem);    // Create new item 
      const tempUser = {   // Set a tempUser to update curr_cart of user so that new cart won't be created til checked out
        username: user.username, 
        cart_id: cartInfo.cart_id
      }
      await updateUserCart(tempUser); 
      alert("Product added to cart! "); 
      return
    }

    //---------------------------------------------------------- Product not in Cart -------------------------------------------------------------------------------------------------------

    const cart = await findCart(user.curr_cart);    // Find the cart
    const currTotalPrice = parseFloat(cart.total_price); 

    const product = await findCartItem(user.curr_cart, id);    // Check if the added product is already in the cart
    console.log(product); 

    if (product === null) {    // If the product is not in cart
      const itemTotalPrice = quantity * price; 
      const cartItem = {
        quantity: quantity, 
        price: price, 
        item_total_price: itemTotalPrice, 
        cart_id: user.curr_cart, 
        product_id: id
      }
      await createCartItem(cartItem); 
      const totalPrice = currTotalPrice + itemTotalPrice; 
      // console.log(typeof currTotalPrice); 
      // console.log(typeof itemTotalPrice);
      console.log(totalPrice); 
      const tempCart = {
        cart_id: user.curr_cart, 
        total_price: totalPrice
      }
      await updateCart(tempCart);    // Update total price
      alert("Product added to cart! "); 
      return
    }
    
    // ----------------------------------------------------------- Product in Cart, add quantity -----------------------------------------------------------------------------------------------
    console.log(product.quantity);
    const newQuantity = quantity + product.quantity; 
    const itemTotalPrice = newQuantity * price; 
    const cartItem = {
      cart_id: user.curr_cart, 
      product_id: id,
      quantity: newQuantity, 
      item_total_price: itemTotalPrice 
    }
    await updateCartItem(cartItem); 
    const totalPrice = currTotalPrice - product.item_total_price + itemTotalPrice; 
    const tempCart = {
      cart_id: user.curr_cart, 
      total_price: totalPrice
    }
    await updateCart(tempCart);    // Update total price
    alert("Product added to cart! "); 
    console.log("end"); 


  }

  return (
    <div className="products" >   
      {/* id is loop index as image urls are hardcoded  */}
      <img src={props.image} className="productImage" ></img>   
      <br/><span className="productName">{props.name}</span> 
      <br/><span className="productPrice">${props.price}</span>
      <br/>{props.user !== null && 
        <>
          <button className="btn btn-secondary mr-2" onClick={decreaseQuantity}>-</button>
          <span className="mr-2">{quantity}</span>
          <button className="btn btn-secondary mr-2" onClick={addQuantity}>+</button>
          {/* <button className="btn btn-success mr-2">Add to Cart</button> */}
          <button className="btn btn-success mr-2" onClick={handleAddToCart}>Add to Cart</button>
        </>
      }
    </div>
  )
}