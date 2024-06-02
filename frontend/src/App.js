import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MyProfile from "./pages/MyProfile";
import ShoppingCart from "./pages/ShoppingCart";
import CheckOut from "./pages/CheckOut"; 
import Receipt from "./pages/Receipt"; 
import Review from "./pages/Review"; 
import EditReview from "./pages/EditReview"; 
import { getUser, removeUser } from "./repository/credentials";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(getUser());
  const [product, setProduct] = useState(); 
  const [review, setReview] = useState(); 

  const loginUser = (user) => {
    setUser(user);
  };

  const logoutUser = () => {
    removeUser();
    setUser(null);
  };

  const rateWhichProduct = (product) => {
    setProduct(product); 
  }

  const editWhichReview = (review) => {
    setReview(review); 
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <Header/>
        <Navbar user={user} logoutUser={logoutUser} />
        <main role="main">
          <div className="body">
            <Routes>
              <Route path="/" element={<Home loginUser={loginUser} user={user} rateWhichProduct={rateWhichProduct} />} />
              <Route path="/login" element={<Login loginUser={loginUser} />} />
              <Route path="/signup" element={<SignUp loginUser={loginUser} />} />
              <Route path="/profile" element={<MyProfile loginUser={loginUser} logoutUser={logoutUser} user={user} />} />
              <Route path="/shoppingcart" element={<ShoppingCart user={user} loginUser={loginUser}/>} />
              <Route path="/checkout" element={<CheckOut user={user} loginUser={loginUser}/>} />
              <Route path="/receipt" element={<Receipt user={user} loginUser={loginUser}/>} />
              <Route path="/review" element={<Review user={user} product={product} rateWhichProduct={rateWhichProduct} editWhichReview={editWhichReview} />} />
              <Route path="/editreview" element={<EditReview user={user} product={product} review={review} rateWhichProduct={rateWhichProduct} />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    </div>
  );
}
