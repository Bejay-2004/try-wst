# Contact Manager Dynamic Website

A simple dynamic website for managing contacts, built with a front-end interface to add, update, and delete contacts, and a back-end server that connects to a MySQL database for storing, updating, and deleting contact information.

## Features

- **Add Contact**: Add new contacts with name, email, phone number, and address.
- **Update Contact**: Modify contact details.
- **Delete Contact**: Remove contacts from the system.
- **Database Integration**: All contact information is stored in a MySQL database.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **API**: RESTful APIs for CRUD operations (Create, Read, Update, Delete)

## Installation

### 1. Clone or Download the Project
Copy the project to your local machine.

### 2. Install Dependencies
Navigate to the project directory and install required dependencies:

```bash
cd contact-manager
npm install
```

### 3. Setup the Database
Create a MySQL database and set up the required table:

```sql
CREATE DATABASE contact_manager;

USE contact_manager;

CREATE TABLE contacts (
    ContactID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Phone VARCHAR(20),
    Address TEXT
);
```

### 4. Configure Database Connection
Update the database connection settings in the **`config.js`** file with your MySQL database credentials.

Example:

```js
module.exports = {
    host: 'localhost',
    user: 'root',
    password: 'GARINBELLYJOE@2004',
    database: 'bellyr'
};
```

### 5. Run the App
Start the server with:

```bash
npm start
```

The website will be accessible at `http://localhost:3000` in your browser.

## API Endpoints

### 1. Get All Contacts
`GET /api/contacts`

Returns a list of all contacts stored in the database.

### 2. Add a New Contact
`POST /api/contacts`

Adds a new contact with the following data:

```json
{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "1234567890",
    "notes": "hello this is me"
}
```

### 3. Update a Contact
`PUT /api/contacts/:id`

Updates an existing contact by `id` with the new data:

```json
{
    "name": "John Doe",
    "email": "john.doe@newemail.com",
    "phone": "0987654321",
    "notes": "Hello this is me"
}
```

### 4. Delete a Contact
`DELETE /api/contacts/:id`

Deletes a contact by `id`.

## Usage

### Adding a Contact
1. Navigate to the **Add Contact** page.
2. Fill in the contact's details (name, email, phone, and address).
3. Click **Save** to add the contact to the database.

### Updating a Contact
1. Go to the contact list.
2. Select a contact to edit.
3. Modify the contact's details and click **Update**.

### Deleting a Contact
1. In the contact list, click **Delete** next to the contact you want to remove.
2. Confirm the deletion.

## License

This project is licensed under the MIT License.

---

This version should be suitable for sharing with colleagues, team members, or for personal use without being posted on GitHub. Let me know if you need further adjustments!