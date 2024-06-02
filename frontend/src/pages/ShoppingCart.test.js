const alertMock = jest.spyOn(window, 'alert').mockImplementation();

import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";
import StoreItem from "./StoreItem";
import ShoppingCart from "./ShoppingCart"; 
import { getProductImages } from "../repository/products"; 
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

// Global data for tests.
let container;

test("Add To Cart, alert!", () => {
  
  const user = {
    username: "test2", 
    first_name: "test", 
    last_name: "two", 
    joining_date: "Sat May 07 2024", 
    curr_cart: 0, 
    blocked: false
  }

  const product = { 
    product_name: "Beef Rump Steak (300g)", 
    product_price: 9.75, 
    product_image: "../../../frontend/src/images/beefsteak.png", 
    is_special: true, 
    product_score: 0.0, 
    num_of_reviews: 0, 
    total_score: 0 
  }

  const utils = render(
    <BrowserRouter>
      <StoreItem user={user} product={product}/>
    </BrowserRouter>  
    );
  container = utils.container;
  const button_addToCart = screen.getByText("Add to Cart");

  fireEvent.click(button_addToCart); 
  expect(alertMock).toHaveBeenCalledTimes(0);

});

test("Looks like your cart is empty!", () => {
  
  const user = {
    username: "test2", 
    first_name: "test", 
    last_name: "two", 
    joining_date: "Sat May 07 2024", 
    curr_cart: 4, 
    blocked: false
  }

  const product = { 
    product_name: "Beef Rump Steak (300g)", 
    product_price: 9.75, 
    product_image: "../../../frontend/src/images/beefsteak.png", 
    is_special: true, 
    product_score: 0.0, 
    num_of_reviews: 0, 
    total_score: 0 
  }

  const utils = render(
    <BrowserRouter>
      <ShoppingCart user={user} />
    </BrowserRouter>  
    );
  container = utils.container;

  expect(screen.getByText("Looks like your cart is empty!", { exact: false })).toBeInTheDocument();

});

test("Go back to shopping? To Home Page.", () => {
  
  const user = {
    username: "test2", 
    first_name: "test", 
    last_name: "two", 
    joining_date: "Sat May 07 2024", 
    curr_cart: 0, 
    blocked: false
  }

  const product = { 
    product_name: "Beef Rump Steak (300g)", 
    product_price: 9.75, 
    product_image: "../../../frontend/src/images/beefsteak.png", 
    is_special: true, 
    product_score: 0.0, 
    num_of_reviews: 0, 
    total_score: 0 
  }

  const utils = render(
    <BrowserRouter>
      <ShoppingCart user={user} product={product}/>
    </BrowserRouter>  
    );
  container = utils.container;
  const button_shopping = screen.getByText("Go back to shopping?");

  fireEvent.click(button_shopping); 

  expect(alertMock).toHaveBeenCalledTimes(0);

});