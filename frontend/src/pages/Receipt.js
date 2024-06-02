import React, { useEffect } from "react";

// import { initCart, getReceipt, getSummaryPrice } from "../repository/cart";
import { updateUserCart } from "../repository/credentials"; 
import { getProductImages} from "../repository/products";
import { getReceipt, getSummaryPrice } from "../repository/cart"; 

export default function Receipt(props){
  // initCart(); 
  const productImages = getProductImages();
  const summary = getReceipt(); 
  const totalPrice = getSummaryPrice();

  useEffect(() => {
    async function updateUser() {
      const newUser = {
        username: props.user.username, 
        password_hash: props.user.password_hash, 
        first_name: props.user.first_name, 
        last_name: props.user.last_name, 
        joining_date: props.user.joining_date,  
        curr_cart: 0
      }
    
      await updateUserCart(newUser); 
      props.loginUser(newUser); 
      
    }

    updateUser();
  }, []);

  

  return (
    <div className="main">
      <h1>Order Summary</h1>
      <h4>Subtotal: ${totalPrice}</h4>
      
        {summary.map((item) => { 
          const itemTotalPrice = (item.product.product_price * item.quantity).toFixed(2); 
          return (   
            <div className="cartItem">
            <br/><img src={productImages[item.product_id-1]} className="cartItemImage" ></img>
            <br/>{item.product.product_name}
            <br/>${item.product.product_price}
            <br/>x{item.quantity}
            <br/><span className="productPrice">Total: ${itemTotalPrice}</span>
            
          </div>
      )})
      } 
      
      
    </div>
  );
}
