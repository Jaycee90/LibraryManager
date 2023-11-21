import React from "react";
//import Axios from "axios"; // used to send and receive request to the server
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from './components/footer';
import Home from './routes/Home'; 
import BookList from './routes/BookList';
import CheckedOutBooks from './routes/CheckedOutBooks';
import CheckIn from './routes/CheckIn';
import CheckOut from './routes/CheckOut';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/checkin" element={<CheckIn/>} />
          <Route path="/checkout" element={<CheckOut/>} />
          <Route path="/checkedoutbook" element={<CheckedOutBooks/>} />
          <Route path="/booklist" element={<BookList/>} />
        </Routes>
      <Footer />
    </BrowserRouter>
  );
 }
  
 export default App;