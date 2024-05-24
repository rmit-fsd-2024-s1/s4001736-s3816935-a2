import React, { useState, useEffect } from "react";

// import { useNavigate } from "react-router-dom"
// import { getProducts} from "../repository/products";
// import { getCart, getTotalPrice, removeItem } from "../repository/cart";
// import deleteButton from "../icons/deleteicon.png";

export default function ShoppingCart(props){
  // const [user, setUser] = useState(); 
  // const [isLoading, setIsLoading] = useState(true);
  // // const products = getProducts();
  // // const cart = getCart(); 
  // // // const [totalPrice, setTotalPrice] = React.useState(0); 
  // // const navigate = useNavigate();
  // // const totalPrice = getTotalPrice(); 
  // // // const [totalPrice, setTotalPrice] = useState(0); 

  // useEffect(() => {
  //   async function loadUser() {
  //     const currentUser = await findUser(props.user.username);

  //     setUser(currentUser);
  //     // console.log(currentProducts);
  //     setIsLoading(false);
  //   }

  //   loadUser();
  // }, []);

  // // const updateTotalPrice = (price) => {
  // //   setTotalPrice(price); 
  // //   console.log(price);
  // // }

  // const handleCheckOut = (event) => {
  //   event.preventDefault();
  //   navigate("/checkout");
  // }

  // const deleteItem = (id) => {
  //   removeItem(id); 
  //   alert("Item removed from cart!");
  //   navigate("/shoppingcart"); 
  // }

  // const handleGoBack = () => {
  //   //event.preventDefault();
  //   navigate("/");
  // }
  

  // if (totalPrice == 0) {
  //   return <div className="emptyCart">
  //     <h4 className="emptyCart">Looks like your cart is empty!</h4>
  //     <a href="#" onClick={handleGoBack}>Go back to shopping?</a>
  //     </div>
    
  //   ;
  // }

  // else {
  return (
    <div className="main">
      <h1>Shopping Cart</h1>
      {props.user.curr_cart}

      {/* <h4>Subtotal: ${totalPrice}</h4>
      {cart.length !== 0 && 
        cart.map((item, index) => { 
          const currPrice = item.itemPrice * item.itemQuantity; return (   // Loop through products using map, display each product based on index
        // <CartItems updateTotalPrice={updateTotalPrice} totalPrice={totalPrice} id={item.itemID} quantity={item.itemQuantity} />
          <div className="cartItem" >   
            <img src={item.itemImage} className="cartItemImage" ></img>   
            <br/><span className="productName">{item.itemName}</span> 
            <br/><span>x{item.itemQuantity}</span>
            <br/><span className="productPrice">${currPrice}</span>
            <br/><button onClick={() => deleteItem(item.itemID)}><img src={deleteButton} className="smallicon" alt="delete"/>Remove from cart</button>
          </div>
      )})
      } 
      <button className="btn btn-success mr-2" onClick={handleCheckOut}>Check out</button> */}
      
    </div>
  );
    // }

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
