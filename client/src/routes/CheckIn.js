import React, { useState} from 'react';
import '../css/checkin.css';

function CheckIn() {
  const [bookInfo, setBookInfo] = useState({
    id: '',
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    avail: true, // Default to available, as it's a check-in operation
    who: '',
    dueDate: null,
  });

  const handleCheckIn = async () => {
    try {
      // Validate input
      if (!bookInfo.id || !bookInfo.title || !bookInfo.who) {
        alert ('Please fill in all required fields.');
        return;
      }
  
      // Serialize the bookInfo object to JSON
      const bookInfoJSON = JSON.stringify({
        id: bookInfo.id, // Ensure id is a number
        title: bookInfo.title,
        author: bookInfo.author,
        publisher: bookInfo.publisher,
        isbn: bookInfo.isbn,
        avail: bookInfo.avail,
        who: bookInfo.who,
        dueDate: bookInfo.dueDate,
      });
  
      // Send the POST request to the server for check-in
      const response = await fetch(`http://localhost:5001/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: bookInfoJSON,
      });
  
      // Check the specific status code for a successful request
      if (response.ok) {
        // Handle check-in success
        alert('Book checked in successfully');
        
        // Clear the form fields
        setBookInfo({
          id: '',
          title: '',
          author: '',
          publisher: '',
          isbn: '',
          avail: true,
          who: '',
          dueDate: '',
        });
        
      } else if (response.status === 404) {
        // Book not found or not checked out
        alert('Book not found or not checked out');
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
            Book ID:
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
            Checked in by:
            <input type="text" value={bookInfo.who} onChange={(e) => setBookInfo({ ...bookInfo, who: e.target.value })} />
          </label>

          <label>
            Due Date:
            <input
              type="text"
              value={bookInfo.dueDate}
              onChange={(e) => setBookInfo({ ...bookInfo, dueDate: e.target.value })}
              placeholder="Leave it empty if you are checking in"
            />
          </label>

          <button type="button" onClick={handleCheckIn}>Check In</button>
        </div>
      </div>
    </div>
  );
}

export default CheckIn;
