import React from "react";
import { Link } from "react-router-dom";
import '../css/navbar.css';

export default function Navbar() {

  return (
    <div className="navbar-content">
      <div className="Nav-logo">
        <Link to="/" className="split">
          <img src="https://i.ibb.co/w7VMDhp/daria-nepriakhina-x-Y55b-L5m-ZAM-unsplash.jpg" 
            alt="Logo" 
            loading="lazy" 
            style={{ width:"150px", height:"50px"}} // Adjusted logo size for responsiveness
          />
        </Link>
        <p>ReadHub</p>
      </div>
      <div className="Nav-menu">
        <Link to="/home" style={{ textDecoration: 'none' }}>Home</Link>
        <Link to="/booklist">BookList</Link>
        <Link to="/checkedoutbook">CheckedBook</Link>
        <Link to="/checkin">Check in</Link>
        <Link to="/checkout">Check Out</Link> 
        <Link to="/login">Login</Link>
        <Link to="/signup">SignUp</Link> 
      </div>
    </div>
  );
}
