import React, {useState, useEffect} from "react";
// https://www.npmjs.com/package/validator
// https://www.tutorialspoint.com/how-to-validate-a-credit-card-number-in-reactjs
// npm i validator
import validator from "validator";
import { useNavigate } from "react-router-dom"
import { findCart, findAllItems, setReceipt, setSummaryPrice } from "../repository/cart";

export default function CheckOut(props) {
  const [isEmpty, setIsEmpty] = useState(true);
  const [totalPrice, setTotalPrice] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  let [cardNumber, setCardNumber] = useState("");
  let [messageOfNumber, setMessageOfNumber] = useState("");
  let [numberError, setNumberError] = useState(true);
  let [cardDate, setCardDate] = useState("");
  let [messageOfDate, setMessageOfDate] = useState("");
  let [dateError, setDateError] = useState(true); 

  useEffect(() => {
    async function loadCart() {
      const cartInfo = await findCart(props.user.curr_cart);
      setTotalPrice(cartInfo.total_price); 
      console.log(totalPrice);
      // console.log(cartInfo);
      const cart = await findAllItems(props.user.curr_cart); 
      setCartItems(cart); 
      // console.log(cartItems);
        
      setIsEmpty(false);      
    }
    loadCart();
  }, []);

  function handleCreditCardNumber(event) {
    let value = event.target.value;
    setCardNumber(value);
    if(validator.isCreditCard(value)) {  // check if the string is a credit card number.
      setMessageOfNumber("is a valid credit card number");
      setNumberError(false);
    } else {
      setMessageOfNumber("is NOT a valid credit card number"); 
    }
  }

  function handleCreditCardExpiryDate(event) {
    let value = event.target.value;
    setCardDate(value);
    const mmyy = value.split("/");
    const mm_expiry = Number(mmyy[0]);
    const yy_expiry = Number("20" + mmyy[1]);

    const today = new Date();
    const mm_now = today.getMonth() + 1; // Months start at 0!
    const yy_now = today.getFullYear();

    // Format must be mm/yy, mm_expiry shouldn't be 00, mm_expiry should be greater than 12, expiry date must be after this month.
    if(!value.match(/\d{2}\/\d{2}/) || mm_expiry === 0 || mm_expiry > 12 || yy_now > yy_expiry || (yy_now === yy_expiry && mm_now > mm_expiry)) {
      setMessageOfDate("is NOT a valid credit card expiry date");
      setDateError(false);
    } else {
      setMessageOfDate("is a valid credit card expiry date");
    }
  }

  const handleCheckOut = (event) => {
    event.preventDefault();
     
    if(numberError === false && dateError === false) {
      setReceipt(cartItems); 
      setSummaryPrice(totalPrice); 
      alert("Check out successful! "); 
      navigate("/receipt");
      return // <><Receipt user={props.user} cartItems={cartItems} totalPrice={totalPrice} loginUser={props.loginUser}/></>
    }
    alert("Please input valid credit card information. ");
  }

  return (
    <div className="main">
      <h1>Check Out</h1>
      {isEmpty === false &&
        <h4>Subtotal: ${totalPrice}</h4>
      }
      <h4>
        {" "}
        Please input credit card number: {""}
      </h4>
      <input type="number" value={cardNumber} onChange={handleCreditCardNumber} />
      <p>
        {" "}
        {cardNumber} {messageOfNumber}
      </p>
      <h4>
        {" "}
        Please input credit card expiry date: {""}
      </h4>
      <input type="string" placeholder="mm/yy" value={cardDate} onChange={handleCreditCardExpiryDate} />
      <p>
        {" "}
        {cardDate} {messageOfDate}
      </p>
      <button className="btn btn-success mr-2" onClick={handleCheckOut}>Confirm</button>
    </div>
  );
}
