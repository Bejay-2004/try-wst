// Handle page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('Home page loaded');
});

// Handle contact page functionality
document.addEventListener('DOMContentLoaded', () => {
    loadContacts();
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleSubmit);
    }
});

// Load all contacts from the server
async function loadContacts() {
    try {
        const response = await fetch('/api/contacts');
        const contacts = await response.json();
        displayContacts(contacts);
    } catch (err) {
        console.error('Error loading contacts:', err);
        displayError('Failed to load contacts. Please try again later.');
    }
}

// Display contacts in the UI
function displayContacts(contacts) {
    const contactList = document.querySelector('.contact-list');
    if (!contactList) return;

    contactList.innerHTML = '<h2>Contact List</h2>';
    
    if (contacts.length === 0) {
        contactList.innerHTML += '<p>No contacts found. Add some!</p>';
        return;
    }
    
    contacts.forEach(contact => {
        const contactCard = document.createElement('div');
        contactCard.className = 'card contact-card';
        contactCard.innerHTML = `
            <h3>${contact.name}</h3>
            <p>Email: ${contact.email}</p>
            <p>Phone: ${contact.phone}</p>
            ${contact.notes ? `<p>Notes: ${contact.notes}</p>` : ''}
            <button onclick="deleteContact('${contact._id}')" class="btn">Delete</button>
        `;
        contactList.appendChild(contactCard);
    });
}

// Handle form submission for new contacts
async function handleSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        notes: document.getElementById('notes').value
    };

    try {
        const response = await fetch('/api/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Failed to create contact');
        }

        // Reset form and reload contacts on success
        e.target.reset();
        loadContacts();
        displaySuccess('Contact added successfully!');
    } catch (err) {
        console.error('Error creating contact:', err);
        displayError('Failed to add contact. Please try again.');
    }
}

// Delete a contact
async function deleteContact(id) {
    if (!confirm('Are you sure you want to delete this contact?')) {
        return;
    }

    try {
        const response = await fetch(`/api/contacts/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete contact');
        }

        loadContacts();
        displaySuccess('Contact deleted successfully!');
    } catch (err) {
        console.error('Error deleting contact:', err);
        displayError('Failed to delete contact. Please try again.');
    }
}

// Display success message
function displaySuccess(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success';
    alertDiv.textContent = message;
    
    const container = document.querySelector('.container');
    container.insertBefore(alertDiv, container.firstChild);
    
    setTimeout(() => alertDiv.remove(), 3000);
}

// Display error message
function displayError(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-error';
    alertDiv.textContent = message;
    
    const container = document.querySelector('.container');
    container.insertBefore(alertDiv, container.firstChild);
    
    setTimeout(() => alertDiv.remove(), 3000);
}

// Add some basic form validation
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!name || name.length < 2) {
        displayError('Name must be at least 2 characters long');
        return false;
    }

    if (!email || !email.includes('@')) {
        displayError('Please enter a valid email address');
        return false;
    }

    if (phone && !/^\d{10}$/.test(phone.replace(/[-\s]/g, ''))) {
        displayError('Please enter a valid 10-digit phone number');
        return false;
    }

    return true;
}