// Main JavaScript functionality for AbidHack Arena

// User data management
let userData = {
    username: 'Hacker',
    xp: 0,
    level: 1,
    completedLabs: 0,
    solvedChallenges: 0,
    toolsUsed: 0,
    timeSpent: 0,
    badges: ['🎯 First Steps'],
    joinDate: new Date().toISOString()
};

// XP thresholds for levels
const levelThresholds = [
    0,     // Level 1
    100,   // Level 2
    250,   // Level 3
    500,   // Level 4
    1000,  // Level 5
    2000,  // Level 6
    3500,  // Level 7
    5500,  // Level 8
    8000,  // Level 9
    12000, // Level 10
    17000, // Level 11
    23000, // Level 12
    30000, // Level 13
    38000, // Level 14
    47000  // Level 15
];

// Rank names based on level
const rankNames = {
    1: 'Beginner',
    2: 'Novice',
    3: 'Apprentice',
    4: 'Intermediate',
    5: 'Advanced',
    6: 'Expert',
    7: 'Professional',
    8: 'Specialist',
    9: 'Master',
    10: 'Elite',
    11: 'Legend',
    12: 'Grandmaster',
    13: 'Champion',
    14: 'Overlord',
    15: 'Cyber God'
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    initializeTypingEffect();
    initializeMatrixBackground();
    
    // Page-specific initialization
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'dashboard.html':
            updateDashboard();
            break;
        case 'challenges.html':
            loadCompletedChallenges();
            break;
        case 'leaderboard.html':
            loadLeaderboard();
            break;
    }
});

// User data functions
function loadUserData() {
    const saved = localStorage.getItem('abidhack_user');
    if (saved) {
        userData = { ...userData, ...JSON.parse(saved) };
    }
    updateUserDisplay();
}

function saveUserData() {
    localStorage.setItem('abidhack_user', JSON.stringify(userData));
}

function getUserData() {
    return userData;
}

function updateUserDisplay() {
    // Update username displays
    const usernameElements = document.querySelectorAll('#username, #display-username, #user-display-name');
    usernameElements.forEach(el => {
        if (el) el.textContent = userData.username;
    });
    
    // Update XP displays
    const xpElements = document.querySelectorAll('#user-xp, #user-xp-display');
    xpElements.forEach(el => {
        if (el) el.textContent = userData.xp.toLocaleString();
    });
    
    // Update level displays
    const levelElements = document.querySelectorAll('#user-level, #user-level-display');
    levelElements.forEach(el => {
        if (el) el.textContent = userData.level;
    });
    
    // Update rank badge
    const rankElement = document.getElementById('rank-badge');
    if (rankElement) {
        rankElement.textContent = rankNames[userData.level] || 'Beginner';
        rankElement.className = `rank-badge level-${userData.level}`;
    }
    
    // Update progress bar
    updateProgressBar();
    
    // Update statistics
    updateStatistics();
}

function updateProgressBar() {
    const progressBar = document.getElementById('xp-progress');
    if (!progressBar) return;
    
    const currentLevelXP = levelThresholds[userData.level - 1] || 0;
    const nextLevelXP = levelThresholds[userData.level] || levelThresholds[levelThresholds.length - 1];
    
    const progress = ((userData.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
    progressBar.style.width = `${Math.min(progress, 100)}%`;
}

function updateStatistics() {
    const stats = {
        'completed-labs': userData.completedLabs,
        'solved-challenges': userData.solvedChallenges,
        'tools-used': userData.toolsUsed,
        'time-spent': `${Math.floor(userData.timeSpent / 60)}h`,
        'user-ctfs-display': userData.solvedChallenges
    };
    
    Object.entries(stats).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    });
}

function addUserXP(amount) {
    userData.xp += amount;
    
    // Check for level up
    const newLevel = calculateLevel(userData.xp);
    if (newLevel > userData.level) {
        userData.level = newLevel;
        showLevelUpNotification(newLevel);
        checkForNewBadges();
    }
    
    saveUserData();
    updateUserDisplay();
    
    // Show XP gain notification
    showXPNotification(amount);
}

function calculateLevel(xp) {
    for (let i = levelThresholds.length - 1; i >= 0; i--) {
        if (xp >= levelThresholds[i]) {
            return i + 1;
        }
    }
    return 1;
}

function showXPNotification(amount) {
    const notification = document.createElement('div');
    notification.className = 'xp-notification';
    notification.textContent = `+${amount} XP`;
    notification.style.cssText = `
        position: fixed;
        top: 120px;
        right: 20px;
        background: linear-gradient(45deg, #00ff41, #0066ff);
        color: #000;
        padding: 0.5rem 1rem;
        border-radius: 25px;
        font-weight: bold;
        z-index: 1000;
        animation: xpFloat 2s ease-out forwards;
        pointer-events: none;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 2000);
}

function showLevelUpNotification(newLevel) {
    const notification = document.createElement('div');
    notification.className = 'levelup-notification';
    notification.innerHTML = `
        <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">🎉</div>
        <div>Level Up!</div>
        <div>You are now level ${newLevel}</div>
        <div style="font-size: 0.9rem; margin-top: 0.5rem;">${rankNames[newLevel]}</div>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(10px);
        border: 2px solid #00ff41;
        border-radius: 15px;
        padding: 2rem;
        text-align: center;
        z-index: 2000;
        animation: levelUpPulse 3s ease-out forwards;
        color: #00ff41;
        font-weight: bold;
        box-shadow: 0 0 30px rgba(0, 255, 65, 0.5);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}

function checkForNewBadges() {
    const newBadges = [];
    
    // XP-based badges
    if (userData.xp >= 100 && !userData.badges.includes('💯 Century Club')) {
        newBadges.push('💯 Century Club');
    }
    if (userData.xp >= 500 && !userData.badges.includes('🚀 Rising Star')) {
        newBadges.push('🚀 Rising Star');
    }
    if (userData.xp >= 1000 && !userData.badges.includes('⭐ Elite Hacker')) {
        newBadges.push('⭐ Elite Hacker');
    }
    
    // Challenge-based badges
    if (userData.solvedChallenges >= 5 && !userData.badges.includes('🏆 CTF Solver')) {
        newBadges.push('🏆 CTF Solver');
    }
    if (userData.solvedChallenges >= 10 && !userData.badges.includes('🎯 Challenge Master')) {
        newBadges.push('🎯 Challenge Master');
    }
    
    // Level-based badges
    if (userData.level >= 5 && !userData.badges.includes('🔥 Advanced User')) {
        newBadges.push('🔥 Advanced User');
    }
    if (userData.level >= 10 && !userData.badges.includes('👑 Elite Member')) {
        newBadges.push('👑 Elite Member');
    }
    
    // Add new badges
    newBadges.forEach(badge => {
        userData.badges.push(badge);
        showBadgeNotification(badge);
    });
    
    if (newBadges.length > 0) {
        updateBadgeDisplay();
    }
}

function showBadgeNotification(badge) {
    const notification = document.createElement('div');
    notification.className = 'badge-notification';
    notification.innerHTML = `
        <div style="font-size: 2rem; margin-bottom: 0.5rem;">🏅</div>
        <div>New Badge Earned!</div>
        <div style="margin-top: 0.5rem;">${badge}</div>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        background: rgba(0, 102, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 2px solid #0066ff;
        border-radius: 15px;
        padding: 1.5rem;
        text-align: center;
        z-index: 2000;
        animation: badgeSlide 4s ease-out forwards;
        color: #0066ff;
        font-weight: bold;
        box-shadow: 0 0 20px rgba(0, 102, 255, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 4000);
}

function updateBadgeDisplay() {
    const badgeContainer = document.getElementById('user-badges');
    if (!badgeContainer) return;
    
    badgeContainer.innerHTML = '';
    userData.badges.forEach(badge => {
        const badgeElement = document.createElement('span');
        badgeElement.className = 'badge';
        badgeElement.textContent = badge;
        badgeContainer.appendChild(badgeElement);
    });
}

// Activity logging
function addActivity(activity) {
    let activities = JSON.parse(localStorage.getItem('abidhack_activities') || '[]');
    
    const newActivity = {
        text: activity,
        timestamp: new Date().toLocaleString(),
        time: 'Just now'
    };
    
    activities.unshift(newActivity);
    activities = activities.slice(0, 10); // Keep only last 10 activities
    
    localStorage.setItem('abidhack_activities', JSON.stringify(activities));
    updateActivityDisplay();
}

function updateActivityDisplay() {
    const activityList = document.getElementById('activity-list');
    if (!activityList) return;
    
    const activities = JSON.parse(localStorage.getItem('abidhack_activities') || '[]');
    
    activityList.innerHTML = '';
    
    if (activities.length === 0) {
        activityList.innerHTML = '<div class="activity-item"><span class="activity-time">Just now</span><span class="activity-text">Logged into AbidHack Arena</span></div>';
        return;
    }
    
    activities.forEach(activity => {
        const item = document.createElement('div');
        item.className = 'activity-item';
        item.innerHTML = `
            <span class="activity-time">${activity.time}</span>
            <span class="activity-text">${activity.text}</span>
        `;
        activityList.appendChild(item);
    });
}

// Dashboard functions
function updateDashboard() {
    updateUserDisplay();
    updateActivityDisplay();
    updateBadgeDisplay();
}

function updateUserStats() {
    const completedChallenges = JSON.parse(localStorage.getItem('completedChallenges') || '[]');
    userData.solvedChallenges = completedChallenges.length;
    saveUserData();
    updateStatistics();
}

function updateLabStats() {
    userData.completedLabs++;
    userData.toolsUsed = Math.max(userData.toolsUsed, 5); // Assume 5 tools used in lab
    saveUserData();
    updateStatistics();
    addActivity('Completed virtual lab session');
}

// Typing effect for hero section
function initializeTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const text = typingElement.getAttribute('data-text');
    if (!text) return;
    
    typingElement.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            typingElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(typeWriter, 1000);
}

// Matrix background animation
function initializeMatrixBackground() {
    const matrixBg = document.querySelector('.matrix-bg');
    if (!matrixBg) return;
    
    // Create floating particles
    for (let i = 0; i < 20; i++) {
        createMatrixParticle(matrixBg);
    }
}

function createMatrixParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: #00ff41;
        border-radius: 50%;
        opacity: 0.7;
        animation: matrixFloat ${5 + Math.random() * 10}s linear infinite;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        box-shadow: 0 0 6px #00ff41;
    `;
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation
    setTimeout(() => {
        container.removeChild(particle);
        createMatrixParticle(container);
    }, (5 + Math.random() * 10) * 1000);
}

// Modal functions
function showLearning() {
    const modal = document.getElementById('learning-modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeLearning() {
    const modal = document.getElementById('learning-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Reset progress function
function resetProgress() {
    if (confirm('Are you sure you want to reset all progress? This action cannot be undone.')) {
        localStorage.clear();
        userData = {
            username: 'Hacker',
            xp: 0,
            level: 1,
            completedLabs: 0,
            solvedChallenges: 0,
            toolsUsed: 0,
            timeSpent: 0,
            badges: ['🎯 First Steps'],
            joinDate: new Date().toISOString()
        };
        saveUserData();
        location.reload();
    }
}

// Profile management
function loadUserProfile() {
    loadUserData();
    
    // Set username if not set
    if (userData.username === 'Hacker') {
        const username = prompt('Enter your hacker name:', 'CyberNinja');
        if (username && username.trim()) {
            userData.username = username.trim();
            saveUserData();
        }
    }
    
    updateUserDisplay();
}

// Add CSS animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes xpFloat {
        0% { transform: translateY(0); opacity: 1; }
        100% { transform: translateY(-50px); opacity: 0; }
    }
    
    @keyframes levelUpPulse {
        0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
        50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
    }
    
    @keyframes badgeSlide {
        0% { transform: translateX(100%) translateY(-50%); opacity: 0; }
        20% { transform: translateX(0) translateY(-50%); opacity: 1; }
        80% { transform: translateX(0) translateY(-50%); opacity: 1; }
        100% { transform: translateX(100%) translateY(-50%); opacity: 0; }
    }
    
    @keyframes matrixFloat {
        0% { transform: translateY(0) rotate(0deg); opacity: 0; }
        10% { opacity: 0.7; }
        90% { opacity: 0.7; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
    
    .level-1, .level-2 { background: linear-gradient(45deg, #666, #999); }
    .level-3, .level-4 { background: linear-gradient(45deg, #00ff41, #00cc33); }
    .level-5, .level-6 { background: linear-gradient(45deg, #0066ff, #0044cc); }
    .level-7, .level-8 { background: linear-gradient(45deg, #ff6600, #cc4400); }
    .level-9, .level-10 { background: linear-gradient(45deg, #ff0066, #cc0044); }
    .level-11, .level-12 { background: linear-gradient(45deg, #6600ff, #4400cc); }
    .level-13, .level-14 { background: linear-gradient(45deg, #ffff00, #cccc00); }
    .level-15 { background: linear-gradient(45deg, #ff00ff, #cc00cc); }
`;
document.head.appendChild(animationStyles);

// Export functions for global use
window.addUserXP = addUserXP;
window.getUserData = getUserData;
window.updateUserStats = updateUserStats;
window.updateLabStats = updateLabStats;
window.addActivity = addActivity;
window.loadUserProfile = loadUserProfile;
window.updateDashboard = updateDashboard;
window.showLearning = showLearning;
window.closeLearning = closeLearning;
window.resetProgress = resetProgress;