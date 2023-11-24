import React, { useState, useEffect } from 'react';

function CheckedOutBooks() {
  const [checkedOutBooks, setCheckedOutBooks] = useState([]);

  useEffect(() => {
    // Fetch the list of checked-out books from my server
    fetch('http://localhost:5001/books?avail=false') 
      .then(response => response.json())
      .then(data => setCheckedOutBooks(data))
      .catch(error => console.error('Error fetching checked-out books:', error));
  }, []);

  return (
    <div>
      <div className="Welc-box">
        <p>The following books are Checked out, we will notify you as soon as they are ready</p>
      </div>
      <ul>
        {checkedOutBooks.map((book, index) => (
          <li key={book.id}>
            <strong>{book.title}</strong> by {book.author} (Due Date: {book.dueDate})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CheckedOutBooks;
