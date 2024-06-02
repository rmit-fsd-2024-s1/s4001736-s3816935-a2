import React, { useState, useEffect} from "react";
import { getProducts, getProductImages } from "../repository/products";
import StoreItems from "./StoreItem";

export default function Home(props) {
  const [products, setProducts] = useState([]); 
  const productImages = getProductImages(); 

  useEffect(() => {
    async function loadProducts() {
      const currentProducts = await getProducts();

      setProducts(currentProducts);
      // console.log(currentProducts);
      // setIsLoading(false);
    }

    loadProducts();
  }, []);

  // console.log(props.user); 

  return (
    <div>
      <h1>Home</h1>
      {props.user !== null && <h4><strong>Hello {props.user.first_name} {props.user.last_name}!</strong></h4>}
      <div class="homepage-headings">
        <h2>Weekly Specials</h2>
      </div>
      <div class="homepage-sections">
        {products.map((item, index) => {
          // console.log(item)
          if (item.is_special === true) {
            return <StoreItems product={item} image={productImages[index]} loginUser={props.loginUser} user={props.user} rateWhichProduct={props.rateWhichProduct}/>
            // return <StoreItems id={item.product_id} name={item.product_name} price={item.product_price} image={productImages[index]} score={item.product_score} loginUser={props.loginUser} user={props.user}/>
          }
        })}
      </div>
      <div class="homepage-headings">
        <h2>Organic Products</h2>
      </div>
      <div class="homepage-sections">
        {products.map((item, index) => {
          // console.log(item)
          if (item.is_special === false) {
            return <StoreItems product={item} image={productImages[index]} loginUser={props.loginUser} user={props.user} rateWhichProduct={props.rateWhichProduct}/>
            // return <StoreItems id={item.product_id} name={item.product_name} price={item.product_price} image={productImages[index]} score={item.product_score} loginUser={props.loginUser} user={props.user}/>
          }
        })}
      </div>
    </div>
  );
}
