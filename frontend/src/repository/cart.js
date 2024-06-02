import axios from "axios";

const API_HOST = "http://localhost:4000";
const RECEIPT_KEY = "receipt"; 
const SUMMARYPRICE_KEY = "summaryPrice"; 

// ------------------------------------------------------------------- Cart -----------------------------------------------------------------------------------------------------------------

async function createCart(cart) {
  const response = await axios.post(API_HOST + "/api/cart", cart);

  return response.data;
}

async function findCart(id) {
  const response = await axios.get(API_HOST + `/api/cart/select/${id}`); 

  return response.data;
}

async function updateCart(cart) {
  const response = await axios.put(API_HOST + "/api/cart", cart); 

  return response.data; 
}

async function deleteCart(id) {
  const response = await axios.delete(API_HOST + `/api/cart/select/${id}`); 

  return response.data;
}

// ------------------------------------------------------------------ Items in Cart ---------------------------------------------------------------------------------------------------------

async function createCartItem(item) {    // exports.create
  const response = await axios.post(API_HOST + "/api/cartItem", item);

  return response.data;
}

// Find all items in a cart (for shopping cart page)
async function findAllItems(cart_id) {    // exports.findAll
  const response = await axios.get(API_HOST + "/api/cartItem", { params: {cart_id}});

  return response.data;
}

// Find a specific item in a cart
async function findCartItem(cart_id, product_id) {    // exports.findOne
  const response = await axios.get(API_HOST + "/api/cartItem/findItem", { params: {cart_id, product_id} });

  return response.data;
}

// Update the quantity of an item in cart
async function updateCartItem(item) {    // exports.update
  const response = await axios.put(API_HOST + "/api/cartItem", item); 

  return response.data; 
}

async function deleteItem(id) {
  const response = await axios.delete(API_HOST + `/api/cartItem/select/${id}`); 

  return response.data;
}

//----------------------------------------------------------------- Local Storage ------------------------------------------------------------------------------------------------------

function setReceipt(items) {
  localStorage.setItem(RECEIPT_KEY, JSON.stringify(items));
}

function getReceipt() {
  const data = localStorage.getItem(RECEIPT_KEY);
  
  return JSON.parse(data);
}

function setSummaryPrice(price) {
  localStorage.setItem(SUMMARYPRICE_KEY, JSON.stringify(price));
}

function getSummaryPrice() {
  const data = localStorage.getItem(SUMMARYPRICE_KEY);
  
  return JSON.parse(data);
}

export {
  createCart, findCart, updateCart, deleteCart, 
  createCartItem, findAllItems, findCartItem, updateCartItem, deleteItem, 
  setReceipt, getReceipt, setSummaryPrice, getSummaryPrice
}
