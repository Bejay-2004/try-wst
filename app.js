document.getElementById('contactForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const notes = document.getElementById('notes').value;

    const contact = { name, email, phone, notes };

    try {
        const response = await fetch('/add-contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(contact)
        });

        if (response.ok) {
            alert('Contact added successfully');
            document.getElementById('contactForm').reset();
        } else {
            alert('Failed to add contact');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error adding contact');
    }
});
