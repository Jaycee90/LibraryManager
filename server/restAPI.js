// ********************************************************************** 
// *** This is a modified Express Library book server that stores     ***
// *** the library book data in a MongoDB-Atlas (cloud) database.     ***
// ***                  Programmer: Jayce Turambe                     ***
// ***                                                                ***
// ***                Runs on http://localhost:3000                   ***
// **********************************************************************

const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const PORT = 3000;

let db;
let libraryBooks;

// MongoDB Atlas connection string
const cs = "mongodb+srv://jnn56:Franklinjayce9@cluster0.4oefzyg.mongodb.net/?retryWrites=true&w=majority";

async function start() {
    // Connect to MongoDB Atlas
    const client = new MongoClient(cs);

    // Connects to the MongoDB Atlas cluster
    await client.connect();
    db = client.db("Library"); //specifies the database name
    libraryBooks = db.collection("books");//specifies the collection name

    console.log(`Listening on port ${PORT}...`)
    app.listen(3000);
    
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

// A simple landing page 
app.get('/', async(req, res) => {
  res.send("Welcome to the book library!");
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

// Start the server and connect to MongoDB
start();