// Sample data - in a real app, this would come from a DB or API
let users = [
    { id: '1', name: 'John Doe', address: '123 Main St', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', address: '456 Oak Ave', email: 'jane@example.com' }
];

// DOM elements
const userForm = document.getElementById('userForm');
const userTableBody = document.getElementById('userTableBody');

// Initialize the table
function renderUserTable() {
    userTableBody.innerHTML = '';
    
    users.forEach(user => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.address}</td>
            <td>${user.email}</td>
            <td>
                <button class="btn btn-sm btn-edit btn-action" data-id="${user.id}">Edit</button>
                <button class="btn btn-sm btn-delete btn-action" data-id="${user.id}">Delete</button>
            </td>
        `;
        
        userTableBody.appendChild(row);
    });
    
    // Add event listeners to action buttons
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', handleEdit);
    });
    
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', handleDelete);
    });
}

// Handle form submission
userForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const id = document.getElementById('userId').value;
    const name = document.getElementById('userName').value;
    const address = document.getElementById('userAddress').value;
    const email = document.getElementById('userEmail').value;
    
    // Check if we're editing an existing user
    const existingUserIndex = users.findIndex(user => user.id === id);
    
    if (existingUserIndex !== -1) {
        // Update existing user
        users[existingUserIndex] = { id, name, address, email };
    } else {
        // Add new user
        users.push({ id, name, address, email });
    }
    
    // Reset form
    userForm.reset();
    
    // Refresh table
    renderUserTable();
});

// Handle edit action
function handleEdit(e) {
    const userId = e.target.getAttribute('data-id');
    const user = users.find(user => user.id === userId);
    
    if (user) {
        document.getElementById('userId').value = user.id;
        document.getElementById('userName').value = user.name;
        document.getElementById('userAddress').value = user.address;
        document.getElementById('userEmail').value = user.email;
    }
}

// Handle delete action
function handleDelete(e) {
    const userId = e.target.getAttribute('data-id');
    
    if (confirm('Are you sure you want to delete this user?')) {
        users = users.filter(user => user.id !== userId);
        renderUserTable();
    }
}

// Initialize the page
renderUserTable();

// For API integration (example using JSONPlaceholder)
/*
async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        users = data.map(user => ({
            id: user.id.toString(),
            name: user.name,
            address: `${user.address.street}, ${user.address.city}`,
            email: user.email
        }));
        renderUserTable();
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// Uncomment to fetch from API
// fetchUsers();
*/