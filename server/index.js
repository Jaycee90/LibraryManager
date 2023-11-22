import express from "express";
import cors from "cors";
import { MongoClient } from 'mongodb';

const app = express();
app.use(cors());

// MongoDB Atlas connection string
const cs = "mongodb+srv://jnn56:Franklinjayce9@cluster0.4oefzyg.mongodb.net/?retryWrites=true&w=majority";

let db;
let libraryBooks;

async function start() {
    // Connect to MongoDB Atlas
    const client = new MongoClient(cs);

    // Connects to the MongoDB Atlas cluster
    await client.connect();
    db = client.db("Library"); // specifies the database name
    libraryBooks = db.collection("books"); // specifies the collection name

    console.log(`Listening on port 5000...`);
    app.listen(5000);
}

// Middleware to enable CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if (req.method === 'OPTIONS') res.sendStatus(200); // Preflight request handling
    else next();
});

// Middleware to parse request body as JSON
app.use(express.json());

// Generic error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// GET all books or filter by availability
app.get('/books', async (req, res) => {
    const avail = req.query.avail;
    try {
      if (avail === 'true') {
        const availableBooks = await libraryBooks.find({ avail: true }).toArray();
        res.json(availableBooks.map(({ id, title }) => ({ id, title })));
      } else if (avail === 'false') {
        const unavailableBooks = await libraryBooks.find({ avail: false }).toArray();
        res.json(unavailableBooks.map(({ id, title }) => ({ id, title })));
      } else {
        const allBooks = await libraryBooks.find().toArray();
        res.json(allBooks.map(({ id, title }) => ({ id, title })));
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
// GET a specific book by ID or return 404 if not found
app.get('/books/:id', async (req, res) => {
    try {
      const book = await libraryBooks.findOne({ id: req.params.id });
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});
  
// Add a new book to the library
app.post('/books', async (req, res) => {
    const newBook = req.body;
    try {
      const result = await libraryBooks.insertOne(newBook);
      res.status(201).json({ message: 'New book created', location: `/books/${result.insertedId}` });
    } catch (err) {
      res.status(400).json({ message: 'Bad Request' });
    }
  });
  
  // Update a book in the library
  app.put('/books/:id', async (req, res) => {
    try {
      const result = await libraryBooks.updateOne({ id: req.params.id }, { $set: req.body });
      if (result.modifiedCount > 0) {
        res.status(200).json({ message: `Book ${req.params.id} updated` });
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});
  
// Delete a book by ID
app.delete('/books/:id', async (req, res) => {
    try {
      const result = await libraryBooks.deleteOne({ id: req.params.id });
      if (result.deletedCount > 0) {
        res.status(200).json({ message: `Book ${req.params.id} deleted` });
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

// app.post('/books/checkin/:id', async (req, res) => {
//     const bookId = req.params.id;
  
//     try {
//       console.log('Received check-in request for book with ID:', bookId);
  
//       const result = await libraryBooks.updateOne(
//         { id: bookId, avail: false }, // Check if the book is checked out
//         { $set: { avail: true, checkedOutBy: '', dueDate: '' } }
//       );
  
//       if (result.modifiedCount > 0) {
//         res.status(200).json({ message: `Book ${bookId} checked in successfully` });
//       } else {
//         res.status(404).json({ message: 'Book not found or not checked out' });
//       }
//     } catch (err) {
//       console.error('Error during check-in:', err);
//       res.status(500).json({ message: err.message });
//     }
//   });
  


// // Update the availability status when checking out a book
// app.put('/books/checkout/:id', async (req, res) => {
//     const bookId = req.params.id;
//     const { checkedOutBy, dueDate } = req.body;

//     try {
//         const result = await libraryBooks.updateOne(
//             { id: bookId, avail: true }, // Check if the book is available
//             { $set: { avail: false, checkedOutBy, dueDate } }
//         );

//         if (result.modifiedCount > 0) {
//             res.status(200).json({ message: `Book ${bookId} checked out successfully` });
//         } else {
//             res.status(404).json({ message: 'Book not found or not available for check-out' });
//         }
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// Start the server and connect to MongoDB
start();