import React from "react";
import { Link } from "react-router-dom";
import '../css/navbar.css';

export default function Navbar() {
 return (
   <div className="navbar-content" >
      <div class="navigation-bar">
        <a href="/" class="split">
          <img src="https://i.ibb.co/w7VMDhp/daria-nepriakhina-x-Y55b-L5m-ZAM-unsplash.jpg" 
            alt="Logo" 
            loading="lazy" 
            style={{ width:"200px", height:"80px"}} 
          />
        </a>

        <a href="booklist">Book List</a>
        <a href="checkedoutbook">Checked Out Book</a>
        <a href="checkin">Check in</a>
        <a href="checkout">Check Out</a> 
        <a href="home">Home</a> 

        <div className="welcome-dropdown">
          <Link to="#" className="welcome-link">
            Welcome!
          </Link>
          <div className="welcome-dropdown-content">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div> 
       
      </div>
    </div>
 );
}