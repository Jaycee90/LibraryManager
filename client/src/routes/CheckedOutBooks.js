import React, { useState, useEffect } from 'react';

function CheckedOutBooks() {
  const [checkedOutBooks, setCheckedOutBooks] = useState([]);
  const myImage = "https://i.ibb.co/xmyYbfZ/LLLP-poetry-competition-image-003.jpg";

  useEffect(() => {
    // Fetch the list of checked-out books from my server
    fetch('http://localhost:5001/books?avail=false') 
      .then(response => response.json())
      .then(data => setCheckedOutBooks(data))
      .catch(error => console.error('Error fetching checked-out books:', error));
  }, []);

  const handleReturn = async (bookId) => {
    try {
      // Prompt the user for their name or user ID
      const who = prompt("Please enter your name or user ID:");
  
      if (!who) {
        // User cancelled or entered an empty value
        alert('Return cancelled or invalid input.');
        return;
      }
  
      // Send a PUT request to update book information and mark it as available
      const returnResponse = await fetch(`http://localhost:5001/books/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          who: null,
          avail: true,
          dueDate: '', // clear the date for return
        }),
      });
      console.log('PUT Response:', returnResponse);
  
      if (returnResponse.ok) {
        // If the return is successful, update the client-side state immediately
        setCheckedOutBooks(books => books.filter(book => book.id !== bookId));
        alert('Book returned successfully');
      } else {
        alert('Failed to return the book');
      }
    } catch (error) {
      console.error('Error returning the book:', error);
    }
  };  
  
  return (
    <div>
      <div className="Welc-box">
        <p>The following books are Checked out, we will notify you as soon as they are ready</p>
      </div>
      <div className='container'>
        <div className='left-section'>
          <table style={{ color: '#000000' }}>
            <thead>
              <tr>
                <th className='nameColumn'>Book Name</th>
                <th className='authorColumn'>Author Name</th>
                <th className='isbnColumn'>ISBN</th>
                <th className='dateColumn'>Due Date</th>
                <th className='returnColumn'>Return</th>
              </tr>
            </thead>

            <tbody>
              {checkedOutBooks.map((book, index) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.isbn}</td>
                  <td>{book.dueDate}</td>
                  <td>
                    <button onClick={() => handleReturn(book.id)}>Return</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='right-section'>
          <p>Our readers have turned book checkouts into coffee-fueled skyscrapers. Sip, read, repeat!</p>
          <img
            src={myImage}
            alt= "Books"
            width="100%"
            height="500"
          />
        </div>
      </div>
    </div>
  );
}

export default CheckedOutBooks;