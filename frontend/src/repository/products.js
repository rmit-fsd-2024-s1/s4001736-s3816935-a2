import axios from "axios";
import product0 from "../images/beefsteak.png";
import product1 from "../images/chickenthigh.png";
import product2 from "../images/apples.png";
import product3 from "../images/watermulon.png";
import product4 from "../images/beefmince.png";
import product5 from "../images/beefsausages.png";
import product6 from "../images/lambmince.png";
import product7 from "../images/chickendrumstick.png";
import product8 from "../images/bananas.png";
import product9 from "../images/pears.png";
import product10 from "../images/babyspinach.png";
import product11 from "../images/carrots.png";
import product12 from "../images/zucchini.png";
import product13 from "../images/broccoli.png";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
const PRODUCTS_KEY = "products";

function initProducts() {
  const productImages = [product0, product1, product2, product3, product4, product5, product6, product7, product8, product9, product10, 
    product11, product12, product13]; 
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(productImages));
}

function getProductImages() {
  const data = localStorage.getItem(PRODUCTS_KEY);
  
  return JSON.parse(data);
}

async function getProducts() {
  const response = await axios.get(API_HOST + "/api/products");
  
  return response.data;
}

async function updateProduct(product) {
  const response = await axios.put(API_HOST + "/api/products", product);   

  return response.data;
}

export {
  initProducts, 
  getProductImages, 
  getProducts, 
  updateProduct
}