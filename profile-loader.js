// Universal Profile Loader - Load on all pages
(function() {
    function loadProfileAvatar() {
        const loggedIn = localStorage.getItem('abidhack_logged_in') === 'true';
        const profileDropdown = document.querySelector('.profile-dropdown');
        const loginBtn = document.querySelector('.login-btn');
        
        if (!profileDropdown) return;
        
        if (loggedIn) {
            if (loginBtn) loginBtn.style.display = 'none';
            profileDropdown.style.display = 'block';
            
            const userData = JSON.parse(localStorage.getItem('abidhack_user') || '{}');
            const savedPhoto = localStorage.getItem('profile_photo');
            const profileImage = document.getElementById('navProfileImage');
            const profileInitial = document.getElementById('navProfileInitial');
            const profileAvatar = document.getElementById('navProfileAvatar');
            
            if (profileAvatar) profileAvatar.style.display = 'flex';
            
            if (savedPhoto && profileImage) {
                profileImage.src = savedPhoto;
                profileImage.style.display = 'block';
                if (profileInitial) profileInitial.style.display = 'none';
            } else if (profileInitial) {
                profileInitial.textContent = (userData.username || 'H').charAt(0).toUpperCase();
            }
        } else {
            profileDropdown.style.display = 'none';
            if (loginBtn) loginBtn.style.display = 'inline-block';
        }
    }
    
    window.handleLogout = function() {
        localStorage.removeItem('abidhack_logged_in');
        localStorage.removeItem('abidhack_user');
        window.location.href = 'home.html';
    };
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadProfileAvatar);
    } else {
        loadProfileAvatar();
    }
})();
