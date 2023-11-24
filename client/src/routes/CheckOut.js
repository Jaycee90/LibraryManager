import React, { useState, useEffect } from 'react';

function CheckOut() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch the list of available books from the server
    fetch('http://localhost:5001/books?avail=true')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching available books:', error));
  }, []);

  const handleCheckout = async (bookId) => {
    try {
      // Prompt the user for to enter the name.
      const who = prompt("Please enter your name or user ID:");
      const dueDate = prompt("Enter the date");
  
      if (!who) {
        // User cancelled or entered an empty value
        alert('Checkout cancelled or invalid input.');
        return;
      }
  
      const response = await fetch(`http://localhost:5001/books/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          who: who,
          avail: false,
          dueDate: dueDate,
        }),
      });
  
      if (response.ok) {
        // If checkout is successful, update the client-side state
        setBooks(books =>books.map(book =>
          book.id === bookId ? { ...book, avail: false } : book));
          alert ('Book checked out successfully');
      } else {
        alert ('Failed to check out the book');
      }
    } catch (error) {
      console.error('Error checking out the book:', error);
    }
  };
  

  return (
    <div>
      {/* Display list of available books */}
      <div className="Welc-box">
        <p>Below is a list of books that are currently available for checkout.</p>
      </div>
      <ul>
        {books.map((book, index) => (
          <li key={book.id}>
            {book.title}
            <button onClick={() => handleCheckout(book.id)}>Check Out</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CheckOut;
