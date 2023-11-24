import React, { useState, useEffect } from 'react';

function BookList() {
  const [books, setBooks] = useState([]);
  const natureImage='https://i.ibb.co/TcKDXNR/Naturepic-min.jpg';

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
    <div>
      <div className="Welc-box">
        <p>Welcome to the Library Book-List Interface. Below is our book collection</p>
      </div>
      <div className='container'>
        <div className='left-section'>
          <table style={{ color: '#000000' }}>
            <thead>
              <tr>
                <th className='nameColumn'>Book Title</th>
                <th className='authorColumn'>Author</th>
                <th className='dateColumn'>ISBN</th>
              </tr>
            </thead>

            <tbody>
              {books.map((book, index) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.isbn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='right-section'>
          <h2 style={{color: '#000'}}>Immerse yourself in the beauty of nature; 
            grab a book, find a peaceful spot, and let the captivating pages transport 
            you to new worlds as you enjoy the tranquility of the great outdoors.
          </h2>

          <img
            src={natureImage}
            alt= "Books"
            width="90%"
            height="700"
          />
        </div>
      </div>
    </div>
  );
}

export default BookList;
