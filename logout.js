// Global logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // Save current user data before logout
        const currentUser = JSON.parse(localStorage.getItem('abidhack_user') || '{}');
        if (currentUser.email) {
            const users = JSON.parse(localStorage.getItem('abidhack_users') || '{}');
            users[currentUser.email] = currentUser;
            localStorage.setItem('abidhack_users', JSON.stringify(users));
        }
        
        // Clear session
        localStorage.removeItem('abidhack_logged_in');
        localStorage.removeItem('abidhack_remember');
        
        // Redirect to index
        window.location.href = 'index.html';
    }
}
