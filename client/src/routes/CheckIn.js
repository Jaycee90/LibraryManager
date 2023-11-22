import React, { useState } from 'react';
import '../css/checkin.css';

function CheckIn() {
  const [bookInfo, setBookInfo] = useState({
    id: '',
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    status: 'available', // Default to available, as it's a check-in operation
    checkedOutBy: '',
    dueDate: '',
  });

  const handleCheckIn = async () => {
    try {
      // Validate input
      if (!bookInfo.id || !bookInfo.title || !bookInfo.checkedOutBy || !bookInfo.dueDate) {
        console.error('Please fill in all required fields.');
        return;
      }
  
      // Serialize the bookInfo object to JSON
      const bookInfoJSON = JSON.stringify({
        id: bookInfo.id,
        title: bookInfo.title,
        author: bookInfo.author,
        publisher: bookInfo.publisher,
        isbn: bookInfo.isbn,
        status: bookInfo.status,
        checkedOutBy: bookInfo.checkedOutBy,
        dueDate: bookInfo.dueDate,
      });
  
      // Send the PUT request to the server for check-in
      const response = await fetch(`http://localhost:5000/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: bookInfoJSON,
      });
  
      // Check the specific status code for a successful request
      if (response.ok) {
        // Handle check-in success
        console.log('Book checked in successfully');
        // You can add logic to clear the form or show a success message to the user
      } else if (response.status === 404) {
        // Book not found or not checked out
        console.error('Book not found or not checked out');
      } else {
        // Handle other error cases
        console.error('Failed to check in book');
      }
    } catch (error) {
      console.error('Error checking in book:', error);
    }
  };
  

  return (
    <div>
      <div className="Welc-box">
        <p>Welcome to the Library Check-In Interface. Here, you can check in books that are currently available for checkout.</p>
      </div>

      <div className="container">
        <div className="left-section">
        <label>
            id:
            <input type="text" value={bookInfo.id} onChange={(e) => setBookInfo({ ...bookInfo, id: e.target.value })} />
          </label>
          <label>
            Title:
            <input type="text" value={bookInfo.title} onChange={(e) => setBookInfo({ ...bookInfo, title: e.target.value })} />
          </label>
          <label>
            Author:
            <input type="text" value={bookInfo.author} onChange={(e) => setBookInfo({ ...bookInfo, author: e.target.value })} />
          </label>
          <label>
            Publisher:
            <input type="text" value={bookInfo.publisher} onChange={(e) => setBookInfo({ ...bookInfo, publisher: e.target.value })} />
          </label>
        </div>
        
        <div className="right-section">
          <label>
            ISBN:
            <input type="text" value={bookInfo.isbn} onChange={(e) => setBookInfo({ ...bookInfo, isbn: e.target.value })} />
          </label>
          <label>
            Checked out by:
            <input type="text" value={bookInfo.checkedOutBy} onChange={(e) => setBookInfo({ ...bookInfo, checkedOutBy: e.target.value })} />
          </label>
          <label>
            Due Date:
            <input type="text" value={bookInfo.dueDate} onChange={(e) => setBookInfo({ ...bookInfo, dueDate: e.target.value })} />
          </label>
          <button type="button" onClick={handleCheckIn}>Check In</button>
        </div>
      </div>
    </div>
  );
}

export default CheckIn;
