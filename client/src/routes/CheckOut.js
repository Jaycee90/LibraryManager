import React, { useState, useEffect } from 'react';
import '../css/Checkout.css'; // Import CSS file for styling

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
      // Prompt the user to enter their name.
      const who = prompt("Please enter your name or user ID:");
      const dueDate = prompt("Enter the date");
      if (!who) {
        // User canceled or entered an empty value
        alert('Checkout canceled or invalid input.');
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
        // If checkout is successful, fetch the updated list of available books
        const updatedResponse = await fetch('http://localhost:5001/books?avail=true');
        const updatedData = await updatedResponse.json();
  
        if (updatedResponse.ok) {
          // If the updated list is fetched successfully, update the client-side state
          setBooks(updatedData);
          alert('Book checked out successfully');
        } else {
          alert('Failed to fetch the updated list of books');
        }
      } else {
        alert('Failed to check out the book');
      }
    } catch (error) {
      console.error('Error checking out the book:', error);
    }
  };

  return (
    <div>
      {/* Display list of available books */}
      <div className="Welc-box">
        <p>
          Below is a list of books that are currently available for checkout.
          Explore our collection of books in a serene environment, just like in an arboretum. 
          Take a moment to discover new worlds through reading.
        </p>
      </div>
      <div className='container'>
        <div className='left-section'>
          <div className="table-container"> {/* Container for the table */}
            <table style={{ color: '#000000' }}>
              <thead>
                <tr>
                  <th className='nameColumn'>Book Title</th>
                  <th className='authorColumn'>Author</th>
                  <th className='authorColumn'>ISBN</th>
                  <th className='dateColumn'>Action</th>
                </tr>
              </thead>

              <tbody>
                {books.map((book, index) => (
                  <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.isbn}</td>
                    <td><button onClick={() => handleCheckout(book.id)}>Check Out</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
