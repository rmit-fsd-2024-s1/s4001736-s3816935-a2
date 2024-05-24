import axios from "axios";

const API_HOST = "http://localhost:4000";

// --- User ---------------------------------------------------------------------------------------
// async function findItemInCart(username, product_id) {
//   const response = await axios.get(API_HOST + "/api/cartItem/findItem", { params: { username, product_id } });
//   const user = response.data;
  
//   // NOTE: In this example the login is also persistent as it is stored in local storage.
//   if(user !== null)
//     setUser(user);

//   return user;
// }

// async function findItem(id) {
//   const response = await axios.get(API_HOST + `/api/cart/select/${id}`);

//   return response.data;
// }

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

async function createCartItem(item) {
  const response = await axios.post(API_HOST + "/api/cartItem", item);

  return response.data;
}

async function findCartItem(cart_id, product_id) {
  const response = await axios.get(API_HOST + "/api/cartItem/findItem", { params: {cart_id, product_id} });

  return response.data;
}

async function updateCartItem(item) {
  const response = await axios.put(API_HOST + "/api/cartItem", item); 

  return response.data; 
}

// async function updateUser(user) {
//   console.log(user);
//   const response = await axios.put(API_HOST + "/api/users", user);   // Talk to routes "update a new user"

//   return response.data;
// }

// async function deleteUser(id) {
//   const response = await axios.delete(API_HOST + `/api/users/select/${id}`); 

//   return response.data;
// }



export {
  createCart, findCart, updateCart, createCartItem, findCartItem, updateCartItem
}
