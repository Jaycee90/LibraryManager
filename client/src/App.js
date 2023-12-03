import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from './components/footer';
import Home from './routes/Home'; 
import BookList from './routes/BookList';
import CheckedOutBooks from './routes/CheckedOutBooks';
import CheckIn from './routes/CheckIn';
import CheckOut from './routes/CheckOut';
import Login from "./routes/login";
import SignUp from "./routes/signUp.js";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/home" element={<Home />} />
          <Route path="/checkin" element={<CheckIn/>} />
          <Route path="/checkout" element={<CheckOut/>} />
          <Route path="/checkedoutbook" element={<CheckedOutBooks/>} />
          <Route path="/booklist" element={<BookList/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
        </Routes>
      <Footer />
    </BrowserRouter>
  );
 }
  
 export default App;