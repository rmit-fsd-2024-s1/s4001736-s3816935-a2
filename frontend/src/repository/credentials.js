import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
const USER_KEY = "user";

// --- User ---------------------------------------------------------------------------------------
async function verifyUser(username, password) {
  const response = await axios.get(API_HOST + "/api/users/login", { params: { username, password } });
  const user = response.data;
  
  // NOTE: In this example the login is also persistent as it is stored in local storage.
  if(user !== null)
    setUser(user);

  return user;
}

async function findUser(id) {
  const response = await axios.get(API_HOST + `/api/users/select/${id}`);

  return response.data;
}

async function createUser(user) {
  const response = await axios.post(API_HOST + "/api/users", user);

  return response.data;
}

async function updateUserName(user) {
  console.log(user);
  const response = await axios.put(API_HOST + "/api/users/name", user);   // Talk to routes "update a new user"

  return response.data;
}

async function updatePassword(user) {
  console.log(user);
  const response = await axios.put(API_HOST + "/api/users/password", user);   // Talk to routes "update a new user"

  return response.data;
}

async function updateUserCart(user) {
  // console.log(cart_id);
  const response = await axios.put(API_HOST + "/api/users/cart", user);   

  return response.data;
}

async function deleteUser(id) {
  const response = await axios.delete(API_HOST + `/api/users/select/${id}`); 

  return response.data;
}

// --- Post ---------------------------------------------------------------------------------------
async function getPosts() {
  const response = await axios.get(API_HOST + "/api/posts");

  return response.data;
}

async function createPost(post) {
  const response = await axios.post(API_HOST + "/api/posts", post);

  return response.data;
}

// --- Helper functions to interact with local storage --------------------------------------------
function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

async function getProducts() {
  const response = await axios.get(API_HOST + "/api/products");
  
  return response.data;
}

export {
  verifyUser, findUser, createUser, 
  updateUserName, updatePassword, updateUserCart, deleteUser, getPosts, 
  createPost, setUser, getUser, removeUser, getProducts
}
