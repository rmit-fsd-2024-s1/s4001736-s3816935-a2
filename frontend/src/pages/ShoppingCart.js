import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom"
import { getProductImages} from "../repository/products";
import { findCart, findAllItems, deleteItem, updateCart, deleteCart } from "../repository/cart";
import { updateUserCart } from "../repository/credentials"; 
import deleteButton from "../icons/deleteicon.png";

export default function ShoppingCart(props){
  const [isEmpty, setIsEmpty] = useState(true);
  const [totalPrice, setTotalPrice] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const productImages = getProductImages(); 
  const navigate = useNavigate();

  useEffect(() => {
    async function loadCart() {
      if (props.user.curr_cart === 0) {
        return
      }
      const cartInfo = await findCart(props.user.curr_cart);
      setTotalPrice(cartInfo.total_price); 
      // console.log(totalPrice);
      // console.log(cartInfo);
      const cart = await findAllItems(props.user.curr_cart); 
      setCartItems(cart); 
      // console.log(cartItems);
        
      setIsEmpty(false);
      
    }

    loadCart();
  }, []);

  const handleCheckOut = (event) => {
    event.preventDefault();
    navigate("/checkout");
  }

  const removeItem = async (id, itemTotalPrice) => {
    // event.preventDefault();
    console.log(id); 
    await deleteItem(id); 
    console.log(id); 
    const newTotalPrice = totalPrice - itemTotalPrice; 
    if (newTotalPrice === 0) {    // Delete the cart 
      const tempUser = {
        username: props.user.username, 
        curr_cart: 0
      }
      await deleteCart(props.user.curr_cart); 
      const updatedUser = await updateUserCart(tempUser); 
      props.loginUser(updatedUser); 
      setIsEmpty(true);
      alert("Item removed from cart!");
      navigate("/shoppingcart");
      return
    }
    setTotalPrice(newTotalPrice); 
    const newCart = {
      cart_id: props.user.curr_cart, 
      total_price: newTotalPrice
    }
    await updateCart(newCart); 
    const cart = await findAllItems(props.user.curr_cart); 
    setCartItems(cart); 
    alert("Item removed from cart!");
    navigate("/shoppingcart"); 
  }

  const handleGoBack = () => {
    //event.preventDefault();
    navigate("/");
  }

  return (
    <div>
      <h1>Shopping Cart</h1>
      <div>
        {isEmpty ? 
        <div className="emptyCart">
          <h4 className="emptyCart">Looks like your cart is empty!</h4>
          <a href="#" onClick={handleGoBack}>Go back to shopping?</a>
        </div>
        :
        <div className="main">
          <h4>Subtotal: ${totalPrice}</h4>
          
          {cartItems.map((item) => {
              const itemTotalPrice = (item.product.product_price * item.quantity).toFixed(2); // Always return 2 decimal places
              return (
                <div className="cartItem">
                  <br/><img src={productImages[item.product_id-1]} className="cartItemImage" ></img>
                  <br/>{item.product.product_name}
                  <br/>${item.product.product_price}
                  <br/>x{item.quantity}
                  <br/><span className="productPrice">Total: ${itemTotalPrice}</span>
                  <br/><button onClick={() => removeItem(item.id, itemTotalPrice)}><img src={deleteButton} className="smallicon" alt="delete"/>Remove from cart</button>
                </div>
              )
          })}
          <button className="btn btn-success mr-2" onClick={handleCheckOut}>Check out</button>
        </div>
        
        }
        
      </div>
    </div>
  );
}

/*
   
In general, the concept to keep in mind is this: Props flow down to children, events flow up to parents. 

Child component can pass parameter to parent as well, as an example:

function App(){
  const [name, setName] = React.useState("Emery"); 
  return <div>
      <AppChild name={name} onChangeName={(newName)=>{setName(newName)}}/>
    </div>
}

function AppChild(props){
  return <span>
      My name is {props.name}
      <button onClick={()=>props.onChangeName("Maple")}>Change Name</button>
    </span>
}

*/
