# Library Management System

## Overview

The Library Management System is a web application designed to manage the borrowing and returning of books in a library. It provides functionalities such as checking out books, returning books, displaying available books, and managing the library inventory.

## Features

- **Check Out Books:** Users can check out books by providing their name or user ID, marking the book as unavailable, and setting a due date.

- **Return Books:** Users can return borrowed books by entering their name or user ID. The system updates the book's availability and clears the due date.

- **Display Available Books:** The system allows users to view the list of available books in the library.

- **Display Checked Out Books:** Users can see a list of books that are currently checked out, along with the due dates.

- **Check In Books (New!):** Librarians can add new books to the library collection using the "Check In" feature. Fill out the form with the book's title, author, and ISBN, and click "Add Book."

## Technologies Used

- **Frontend:** React (JavaScript, JSX)
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas
- **Communication:** Fetch API

## Project Structure

- **`client/`**: Contains the React frontend application.
- **`server/`**: Houses the Node.js backend server.

## Setup Instructions

1. Clone the repository:

    ```bash
    git clone <repository_url>
    ```

2. Install dependencies:

    ```bash
    cd client
    npm install

    cd ../server
    npm install
    ```

3. Run the application:

    ```bash
    # In the client directory
    npm start

    # In the server directory
    npm start
    ```

4. Access the application in your web browser at `http://localhost:3000`.

## Contributors

- Jayce Turambe



