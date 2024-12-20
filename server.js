const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your DB user
    password: 'GARINBELLYJOE@2004', // Replace with your DB password
    database: 'belly' // Replace with your DB name
});

db.connect(err => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('Connected to database');
});

// Serve static files (e.g., your HTML file)
app.use(express.static('public'));

// Handle form submissions
app.post('/add-contact', (req, res) => {
    console.log('Received data:', req.body);

    const { name, email, phone, notes } = req.body;

    const sql = 'INSERT INTO contacts (name, email, phone, notes) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, phone, notes], (err, result) => {
        if (err) {
            console.error('Error inserting contact:', err);
            res.status(500).send('Failed to add contact');
            return;
        }
        res.status(200).send('Contact added successfully');
    });
});

// Fetch all contacts
app.get('/contacts', (req, res) => {
    const sql = 'SELECT id, name, email, phone FROM contacts';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching contacts:', err);
            res.status(500).send('Failed to retrieve contacts');
            return;
        }
        res.json(results);
    });
});

// Delete contact by ID
app.delete('/contacts/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM contacts WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting contact:', err);
            res.status(500).send('Failed to delete contact');
            return;
        }
        res.status(200).send('Contact deleted successfully');
    });
});

// Update contact by ID
app.put('/contacts/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const sql = 'UPDATE contacts SET name = ?, email = ?, phone = ? WHERE id = ?';
    db.query(sql, [name, email, phone, id], (err, result) => {
        if (err) {
            console.error('Error updating contact:', err);
            res.status(500).send('Failed to update contact');
            return;
        }
        res.status(200).send('Contact updated successfully');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
