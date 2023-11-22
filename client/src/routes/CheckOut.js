import React, { useState } from 'react';

function CheckOut() {
  const [bookInfo, setBookInfo] = useState({
    title: '',
    author: '',
    isbn: '',
  });

  // eslint-disable-next-line
  const [selectedBookId, setSelectedBookId] = useState('');

  const handleCheckOut = async () => {
    try {
      // Use the dynamically obtained book ID
      const bookId = selectedBookId;

      // Send a request to the server to check out the book with the provided information
      const response = await fetch(`http://localhost:5000/books/checkout/${bookId}`, {
        method: 'PUT', // Use PUT for check-out
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookInfo),
      });

      if (response.ok) {
        // Handle check out success 
        console.log('Book checked out successfully');
      } else {
        // Handle check out error 
        console.error('Failed to check out book');
      }
    } catch (error) {
      console.error('Error checking out book:', error);
    }
  };

  return (
    <div>
      <div className="Welc-box">
        <p>Here you can check out a book</p>
      </div>
      <form>
        {/* Assume you have a way to set the selected book ID */}
        <input type="hidden" value={selectedBookId} />

        <label>
          Title:
          <input type="text" value={bookInfo.title} onChange={(e) => setBookInfo({ ...bookInfo, title: e.target.value })} />
        </label>
        <label>
          Author:
          <input type="text" value={bookInfo.author} onChange={(e) => setBookInfo({ ...bookInfo, author: e.target.value })} />
        </label>
        <label>
          ISBN:
          <input type="text" value={bookInfo.isbn} onChange={(e) => setBookInfo({ ...bookInfo, isbn: e.target.value })} />
        </label>
        <button type="button" onClick={handleCheckOut}>Check Out</button>
      </form>
    </div>
  );
}

export default CheckOut;
