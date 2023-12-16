import express from "express";
import cors from "cors";
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import "./loadEnvironment.mjs";

dotenv.config();

const app = express();
app.use(cors());


let db;
let libraryBooks;
let libraryUsers;

async function start() {
  // Get a connection string from dotenv file
  const uri = process.env.MONGODB_URI;
  // Connect to MongoDB Atlas
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
  try {
    // Connects to the MongoDB Atlas cluster
    await client.connect();
    db = client.db("Library"); // specifies the database name
    libraryBooks = db.collection("books"); // specifies the collection name for Books
    libraryUsers = db.collection("User"); // specify the collection name for users

    console.log(`Listening on port 5001...`);
    app.listen(5001);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
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
      res.json(availableBooks.map(({ id, title, author, isbn }) => ({ id, title, author, isbn })));
    } else if (avail === 'false') {
      const checkedOutBooks = await libraryBooks.find({ avail: false }).toArray();
      res.json(checkedOutBooks.map(({ id, title, author,isbn, dueDate }) => ({ id, title, author, isbn, dueDate })));
    } else {
      const allBooks = await libraryBooks.find().toArray();
      res.json(allBooks.map(({ id, title, author, isbn, avail }) => ({ id, title, author, isbn, avail })));
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

// Allow user to create an account
app.post('/User', async (req, res) => {
  const newUser = req.body;
  try {
    const result = await libraryUsers.insertOne(newUser);
    res.status(201).json({ message: 'User signed up successfully', location: `/User/${result.insertedId}` });
  } catch (err) {
    res.status(400).json({ message: 'Bad Request' });
  }

});

// Login a user
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await libraryUsers.findOne({ email });

    if (user) {
      // Compare the provided password with the stored password 
      const passwordMatch = await compare(password, user.password);
      if (passwordMatch) {
        res.status(200).json({ message: 'User logged in successfully', user });
      } else {
        res.status(401).json({ message: 'Incorrect email or password!' });
      }
    } else {
      res.status(404).json({ message: 'Incorrect email/password' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Start the server and connect to MongoDB
start();