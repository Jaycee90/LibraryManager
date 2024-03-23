import React, { useState, useEffect } from 'react';
import '../css/BookList.css'; // Import the CSS file for book list styling

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch the list of all books from the server
    fetch('http://localhost:5001/books')
      .then(response => response.json())
      .then(data => {
        console.log('Books received from server: ', data);
        setBooks(data);
      })
      .catch(error => console.error('Error fetching available books:', error));
  }, []);

  return (
    <div className="booklist-container">
      <div className="welcome-message">
        <h1>Below is our books collection, grab some for your choice</h1>
      </div>
      <div className="book-list">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Book Title</th>
                <th>Author</th>
                <th>ISBN</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.isbn}</td>
                  <td><div className={book.avail ? 'available' : 'checked-out'}>{book.avail ? 'Available' : 'Checked out'}</div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BookList;
