import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { findUser, updateUserCart } from "../repository/credentials";
import { createCart, findCart, updateCart, createCartItem, findCartItem, updateCartItem } from "../repository/cart"; 
import { Rating } from 'react-simple-star-rating'; 

export default function StoreItem(props) {
  const [quantity, setQuantity] = useState(1); 
  const navigate = useNavigate();
  const score = parseFloat(props.product.product_score); 
  const scoreDec = score.toFixed(1); 
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

  const toRateProduct = (product) => {
    // console.log(movieID);
    props.rateWhichProduct(product);
    // console.log(movie);
    navigate("/review");
  }

  const handleAddToCart = async (event) => {
    // const user = await findUser(props.user.username);    
    console.log(props.user);
    addToCart(event, props.user, props.product, quantity); 
  }

  const addToCart = async (event, user, product, quantity) => {
    event.preventDefault(); 
    // console.log(user); 
    console.log(props.user);
    
    //----------------------------------------------------------- No Cart yet --------------------------------------------------------------------------------------------------------------------

    if (user.curr_cart === 0) {   // If user has no cart
      const totalPrice = quantity * product.product_price; 
      // console.log(totalPrice);
      const cart = {
        total_price: totalPrice, 
        username: user.username
      }
      const cartInfo = await createCart(cart);    // Create a new cart
      console.log(cartInfo);
      const cartItem = {
        quantity: quantity, 
        // price: price, 
        // item_total_price: totalPrice, 
        cart_id: cartInfo.cart_id, 
        product_id: product.product_id
      }
      await createCartItem(cartItem);    // Create new item 
      const tempUser = {   // Set a tempUser to update curr_cart of user so that new cart won't be created til checked out
        username: user.username, 
        curr_cart: cartInfo.cart_id
      }
      const updatedUser = await updateUserCart(tempUser); 
      console.log(updatedUser); 
      props.loginUser(updatedUser); 
      alert("Product added to cart! "); 
      return
    }

    //---------------------------------------------------------- Product not in Cart -------------------------------------------------------------------------------------------------------

    const cart = await findCart(user.curr_cart);    // Find the cart
    const currTotalPrice = parseFloat(cart.total_price); 

    const item = await findCartItem(user.curr_cart, product.product_id);    // Check if the added product is already in the cart
    console.log(item); 

    if (item === null) {    // If the product is not in cart
      const itemTotalPrice = quantity * product.product_price; 
      const cartItem = {
        quantity: quantity, 
        // price: price, 
        // item_total_price: itemTotalPrice, 
        cart_id: user.curr_cart, 
        product_id: product.product_id
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
    console.log(item.quantity);
    const newQuantity = quantity + item.quantity; 
    const itemTotalPrice = newQuantity * product.product_price; 
    const oldTotalPrice = item.quantity * product.product_price; 
    const cartItem = {
      cart_id: user.curr_cart, 
      product_id: product.product_id,
      quantity: newQuantity 
      // item_total_price: itemTotalPrice 
    }
    await updateCartItem(cartItem); 
    const totalPrice = currTotalPrice - oldTotalPrice + itemTotalPrice; 
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
      <br/><span>{props.product.product_name}</span> 
      <br/><span className="productPrice">${props.product.product_price}</span>
      <br/><span className="rating">{scoreDec}</span> <Rating initialValue={props.product.product_score} readonly/>
      <br/><span className="numberOfReviews">{props.product.num_of_reviews} review(s)</span>
      <br/><a href="#" onClick={() => toRateProduct(props.product)}>Reviews</a>
      <br/>
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