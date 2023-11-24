import React, { useState, useEffect } from 'react';

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch the list of available books from my server
    fetch('http://localhost:5001/books?avail=true')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching available books:', error));
  }, []);

  return (
    <div>
      <div className="Welc-box">
        <p>Welcome to the Library Book-List Interface. Here, you can find available books</p>
      </div>
      <ol>
        {books.map((book, index) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ol>
    </div>
  );
}

export default BookList;
