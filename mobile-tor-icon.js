// Mobile Tor Icon Functionality
function openMobileTor() {
    document.getElementById('mobileTorModal').classList.add('active');
    document.getElementById('mobileTorInput').focus();
}

function closeMobileTor() {
    document.getElementById('mobileTorModal').classList.remove('active');
}

function mobileTorSearch() {
    const query = document.getElementById('mobileTorInput').value;
    if (query.trim()) {
        torSearch(query);
        closeMobileTor();
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('mobileTorModal');
    if (modal && event.target === modal) {
        closeMobileTor();
    }
});
