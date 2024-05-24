import React from "react";
import { Link } from "react-router-dom";
import cartButton from "../icons/shoppingcart.png";

export default function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li>
              <button class="hamburger-menu" aria-label="Toggle navigation">
                <span class="hamburger-menu-icon"></span>
              </button>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {props.user !== null &&
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">My Profile</Link>
                </li>
                {/* <li className="nav-item">
                  <Link className="nav-link" to="/review">Reviews</Link>
                </li> */}
              </>
            }
          </ul>
          <ul className="navbar-nav">
            
            {props.user === null ?
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              </>
              
              :
              <>
                <li className="nav-item">
                  <span className="nav-link text-light">Welcome, {props.user.username}</span>
                </li>
                <li>
                  <Link className="nav-link" to="/shoppingcart"><img src={cartButton} className="smallicon" alt="cart"/></Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={props.logoutUser}>Logout</Link>
                </li>
              </>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}
