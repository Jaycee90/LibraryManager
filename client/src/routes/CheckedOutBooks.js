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

  return (
    <div>
      <div className="Welc-box">
        <p>The following books are Checked out, we will notify you as soon as they are ready</p>
      </div>
      <div className='container'>
        <div className='left-section'>
          <table style={{color: '#000000'}}>
            <thead>
              <tr>
                <th className='nameColumn'>Book Name</th>
                <th className='authorColumn'>Author Name</th>
                <th className='dateColumn'>Due Date</th>
              </tr>
            </thead>

            <tbody>
              {checkedOutBooks.map((book, index) => (
                <tr key={book.id}>
                  <td>{book.title}</td> 
                  <td>{book.author}</td>
                  <td>{book.dueDate}</td> 
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
