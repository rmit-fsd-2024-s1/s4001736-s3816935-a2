import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";

async function getProducts() {
  const response = await axios.get(API_HOST + "/api/products");
  
  return response.data;
}

export {
  getProducts
}