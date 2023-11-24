import React, { useState, useEffect } from 'react';

function CheckOut() {
  const [books, setBooks] = useState([]);
<<<<<<< HEAD

  useEffect(() => {
    // Fetch the list of available books from the server
    fetch('http://localhost:5000/books?avail=true')
=======
  const arboretum='https://i.ibb.co/vHpkWtw/Nature-min.jpg';

  useEffect(() => {
    // Fetch the list of available books from the server
    fetch('http://localhost:5001/books?avail=true')
>>>>>>> d9a2421789625b1c2da298f81fa928f128bcbb7b
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching available books:', error));
  }, []);

  const handleCheckout = async (bookId) => {
    try {
      // Prompt the user for to enter the name.
      const who = prompt("Please enter your name or user ID:");
      const dueDate = prompt("Enter the date");
<<<<<<< HEAD
  
=======

>>>>>>> d9a2421789625b1c2da298f81fa928f128bcbb7b
      if (!who) {
        // User cancelled or entered an empty value
        alert('Checkout cancelled or invalid input.');
        return;
      }
<<<<<<< HEAD
  
      const response = await fetch(`http://localhost:5000/books/${bookId}`, {
=======

      const response = await fetch(`http://localhost:5001/books/${bookId}`, {
>>>>>>> d9a2421789625b1c2da298f81fa928f128bcbb7b
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
<<<<<<< HEAD
        setBooks(books =>books.map(book =>
          book.id === bookId ? { ...book, avail: false } : book));
          alert ('Book checked out successfully');
      } else {
        alert ('Failed to check out the book');
=======
        setBooks(books => books.map(book =>
          book.id === bookId ? { ...book, avail: false } : book));
        alert('Book checked out successfully');
      } else {
        alert('Failed to check out the book');
>>>>>>> d9a2421789625b1c2da298f81fa928f128bcbb7b
      }
    } catch (error) {
      console.error('Error checking out the book:', error);
    }
  };
  

  return (
    <div>
      {/* Display list of available books */}
      <div className="Welc-box">
<<<<<<< HEAD
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
=======
        <p>Below is a list of books that are currently available for checkout</p>
      </div>
      <div className='container'>
        <div className='left-section'>
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

        <div className='right-section'>
          <h2 style={{color: '#000'}}>Explore our collection of books in a serene environment, just like in an arboretum. 
            Take a moment to discover new worlds through reading.
          </h2>

          <img
            src={arboretum}
            alt= "Books"
            width="90%"
            height="700"
          />
        </div>
      </div>
>>>>>>> d9a2421789625b1c2da298f81fa928f128bcbb7b
    </div>
  );
}

export default CheckOut;