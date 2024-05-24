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
import { getUser, removeUser } from "./repository/credentials";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(getUser());

  const loginUser = (user) => {
    setUser(user);
  };

  const logoutUser = () => {
    removeUser();
    setUser(null);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <Header/>
        <Navbar user={user} logoutUser={logoutUser} />
        <main role="main">
          <div className="body">
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/login" element={<Login loginUser={loginUser} />} />
              <Route path="/signup" element={<SignUp loginUser={loginUser} />} />
              <Route path="/profile" element={<MyProfile loginUser={loginUser} logoutUser={logoutUser} user={user} />} />
              <Route path="/shoppingcart" element={<ShoppingCart user={user} />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    </div>
  );
}
