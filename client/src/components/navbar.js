import React from "react";
import '../css/navbar.css';

export default function Navbar() {
 return (
   <div className="navbar-content" >
      <div class="navigation-bar">
        <a href="/" class="split"><img src="https://i.ibb.co/w7VMDhp/daria-nepriakhina-x-Y55b-L5m-ZAM-unsplash.jpg" alt="Logo" loading="lazy" style={{ width:"200px", height:"80px"}} /></a>
        
        {/*FIXME!!!*/} 
        {/* <a> 
        <form action="/test">
          <input 
            type="text" 
            placeholder="Search for venues... "
            style={{ backgroundColor:"#fff" , color:'#747474', paddingBottom:'10px', marginTop:'0px', borderRadius:'10px'}}
            inputProps={{ style: { backgroundColor: "#fff", color:'#747474'} }}
            />
        </form>
        </a> */}
        <a href="booklist">Book List</a>
        <a href="checkedoutbook">Checked Out Book</a>
        <a href="checkin">Check in</a>
        <a href="checkout">Check Out</a> 
        <a href="home">Home</a>    
       
      </div>
    </div>
 );
}