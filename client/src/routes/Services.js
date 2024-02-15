import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <div className="services-dropdown">
      <Link to="/booklist">Book List</Link>
      <Link to="/checkedoutbook">Checked Out Book</Link>
      <Link to="/checkin">Check in</Link>
      <Link to="/checkout">Check Out</Link>
    </div>
  );
};

export default Services;
