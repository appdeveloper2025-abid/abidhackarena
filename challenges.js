// CTF Challenges functionality for AbidHack Arena

// Challenge data and solutions
const challenges = {
    'sql-basic': {
        flag: 'CYBER{admin_password_123}',
        xp: 50,
        title: 'SQL Injection Basic',
        category: 'web'
    },
    'xss-reflected': {
        flag: 'CYBER{xss_executed_successfully}',
        xp: 75,
        title: 'XSS Reflected',
        category: 'web'
    },
    'port-discovery': {
        flag: 'CYBER{hidden_service_8080}',
        xp: 40,
        title: 'Port Discovery',
        category: 'network'
    },
    'service-enum': {
        flag: 'CYBER{openssh_7_4}',
        xp: 60,
        title: 'Service Enumeration',
        category: 'network'
    },
    'caesar': {
        flag: 'CYBER{rot13_is_easy}',
        xp: 30,
        title: 'Caesar Cipher',
        category: 'crypto'
    },
    'hash': {
        flag: 'CYBER{hello}',
        xp: 80,
        title: 'Hash Cracking',
        category: 'crypto'
    },
    'domain': {
        flag: 'CYBER{namecheap}',
        xp: 35,
        title: 'Domain Investigation',
        category: 'osint'
    },
    'social': {
        flag: 'CYBER{42_security}',
        xp: 100,
        title: 'Social Media Intel',
        category: 'osint'
    }
};

// Show specific challenge category
function showCategory(category) {
    // Hide all categories
    document.querySelectorAll('.challenge-category').forEach(cat => {
        cat.style.display = 'none';
    });
    
    // Show selected category
    const selectedCategory = document.getElementById(`${category}-challenges`);
    if (selectedCategory) {
        selectedCategory.style.display = 'block';
    }
    
    // Update active tab
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// SQL Injection simulation
function testSQLInjection() {
    const username = document.getElementById('sql-username').value;
    const password = document.getElementById('sql-password').value;
    const response = document.getElementById('sql-response');
    
    if (!username || !password) {
        response.innerHTML = '<span style="color: #ff5f56;">Error: Please enter both username and password</span>';
        return;
    }
    
    // Check for SQL injection patterns
    const sqlPatterns = [
        "' OR '1'='1",
        "' OR 1=1--",
        "admin'--",
        "' UNION SELECT",
        "' OR 'a'='a"
    ];
    
    const isSQLInjection = sqlPatterns.some(pattern => 
        username.toLowerCase().includes(pattern.toLowerCase()) || 
        password.toLowerCase().includes(pattern.toLowerCase())
    );
    
    if (isSQLInjection) {
        response.innerHTML = `
            <span style="color: #00ff41;">SQL Injection Successful!</span><br>
            <span style="color: #ccc;">Database query executed:</span><br>
            <code>SELECT * FROM users WHERE username='${username}' AND password='${password}'</code><br>
            <span style="color: #0066ff;">Admin credentials found: admin / admin_password_123</span><br>
            <span style="color: #ffbd2e;">Flag: CYBER{admin_password_123}</span>
        `;
        
        // Add XP for discovering the vulnerability
        addUserXP(25);
    } else {
        response.innerHTML = '<span style="color: #ff5f56;">Login failed: Invalid credentials</span>';
    }
}

// XSS simulation
function testXSS() {
    const input = document.getElementById('xss-input').value;
    const response = document.getElementById('xss-response');
    
    if (!input) {
        response.innerHTML = '<span style="color: #ff5f56;">Error: Please enter a search query</span>';
        return;
    }
    
    // Check for XSS patterns
    const xssPatterns = [
        '<script>',
        'javascript:',
        'onerror=',
        'onload=',
        'alert(',
        '<img src=x onerror='
    ];
    
    const isXSS = xssPatterns.some(pattern => 
        input.toLowerCase().includes(pattern.toLowerCase())
    );
    
    if (isXSS) {
        response.innerHTML = `
            <span style="color: #00ff41;">XSS Vulnerability Detected!</span><br>
            <span style="color: #ccc;">Your payload would execute:</span><br>
            <code>${escapeHtml(input)}</code><br>
            <span style="color: #0066ff;">Reflected XSS confirmed!</span><br>
            <span style="color: #ffbd2e;">Flag: CYBER{xss_executed_successfully}</span>
        `;
        
        // Add XP for discovering the vulnerability
        addUserXP(35);
    } else {
        response.innerHTML = `
            <span style="color: #ccc;">Search results for: "${escapeHtml(input)}"</span><br>
            <span style="color: #666;">No results found.</span>
        `;
    }
}

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Flag submission handler
function submitFlag(challengeId, correctFlag, xpReward) {
    const inputId = `flag-${challengeId}`;
    const input = document.getElementById(inputId);
    
    if (!input) {
        console.error(`Input element not found: ${inputId}`);
        return;
    }
    
    const submittedFlag = input.value.trim();
    
    if (!submittedFlag) {
        showFeedback('Please enter a flag', 'error');
        return;
    }
    
    if (submittedFlag === correctFlag) {
        // Correct flag submitted
        showSuccessModal(challengeId, xpReward);
        markChallengeCompleted(challengeId);
        addUserXP(xpReward);
        
        // Clear the input
        input.value = '';
        
        // Disable the challenge
        const challengeCard = input.closest('.challenge-card');
        if (challengeCard) {
            challengeCard.classList.add('completed');
            challengeCard.style.opacity = '0.7';
            
            // Add completed badge
            const header = challengeCard.querySelector('.challenge-header');
            if (header && !header.querySelector('.completed-badge')) {
                const badge = document.createElement('span');
                badge.className = 'completed-badge';
                badge.textContent = '✓ Completed';
                badge.style.cssText = `
                    background: rgba(39, 202, 63, 0.2);
                    color: #27ca3f;
                    padding: 0.3rem 0.8rem;
                    border-radius: 15px;
                    font-size: 0.8rem;
                    font-weight: bold;
                    border: 1px solid #27ca3f;
                `;
                header.appendChild(badge);
            }
        }
        
    } else {
        showFeedback('Incorrect flag. Try again!', 'error');
        
        // Add visual feedback
        input.style.borderColor = '#ff5f56';
        input.style.boxShadow = '0 0 10px rgba(255, 95, 86, 0.5)';
        
        setTimeout(() => {
            input.style.borderColor = '#0066ff';
            input.style.boxShadow = 'none';
        }, 2000);
    }
}

// Show success modal
function showSuccessModal(challengeId, xpReward) {
    const modal = document.getElementById('success-modal');
    const message = document.getElementById('success-message');
    
    const challenge = challenges[challengeId];
    const challengeTitle = challenge ? challenge.title : 'Challenge';
    
    message.textContent = `You've successfully completed "${challengeTitle}" and earned ${xpReward} XP!`;
    
    modal.style.display = 'block';
    
    // Add celebration animation
    const animation = document.querySelector('.success-animation');
    animation.style.animation = 'none';
    setTimeout(() => {
        animation.style.animation = 'bounce 1s ease-in-out';
    }, 10);
}

// Close success modal
function closeSuccessModal() {
    const modal = document.getElementById('success-modal');
    modal.style.display = 'none';
}

// Show feedback message
function showFeedback(message, type) {
    // Create feedback element
    const feedback = document.createElement('div');
    feedback.className = `feedback ${type}`;
    feedback.textContent = message;
    feedback.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 1000;
        font-weight: bold;
        animation: slideIn 0.3s ease-out;
        ${type === 'error' ? 
            'background: rgba(255, 95, 86, 0.2); color: #ff5f56; border: 1px solid #ff5f56;' : 
            'background: rgba(39, 202, 63, 0.2); color: #27ca3f; border: 1px solid #27ca3f;'
        }
    `;
    
    document.body.appendChild(feedback);
    
    // Remove after 3 seconds
    setTimeout(() => {
        feedback.style.animation = 'fadeOut 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(feedback);
        }, 300);
    }, 3000);
}

// Mark challenge as completed
function markChallengeCompleted(challengeId) {
    let completedChallenges = JSON.parse(localStorage.getItem('completedChallenges') || '[]');
    
    if (!completedChallenges.includes(challengeId)) {
        completedChallenges.push(challengeId);
        localStorage.setItem('completedChallenges', JSON.stringify(completedChallenges));
        
        // Update user stats
        updateUserStats();
        
        // Add to activity log
        addActivity(`Completed CTF: ${challenges[challengeId]?.title || challengeId}`);
    }
}

// Load completed challenges on page load
function loadCompletedChallenges() {
    const completedChallenges = JSON.parse(localStorage.getItem('completedChallenges') || '[]');
    
    completedChallenges.forEach(challengeId => {
        const inputId = `flag-${challengeId}`;
        const input = document.getElementById(inputId);
        
        if (input) {
            const challengeCard = input.closest('.challenge-card');
            if (challengeCard) {
                challengeCard.classList.add('completed');
                challengeCard.style.opacity = '0.7';
                
                // Add completed badge
                const header = challengeCard.querySelector('.challenge-header');
                if (header && !header.querySelector('.completed-badge')) {
                    const badge = document.createElement('span');
                    badge.className = 'completed-badge';
                    badge.textContent = '✓ Completed';
                    badge.style.cssText = `
                        background: rgba(39, 202, 63, 0.2);
                        color: #27ca3f;
                        padding: 0.3rem 0.8rem;
                        border-radius: 15px;
                        font-size: 0.8rem;
                        font-weight: bold;
                        border: 1px solid #27ca3f;
                    `;
                    header.appendChild(badge);
                }
                
                // Disable input and button
                input.disabled = true;
                input.placeholder = 'Challenge completed!';
                
                const button = challengeCard.querySelector('.flag-submission button');
                if (button) {
                    button.disabled = true;
                    button.textContent = 'Completed';
                    button.style.opacity = '0.5';
                }
            }
        }
    });
}

// Initialize challenges page
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('challenges.html')) {
        loadCompletedChallenges();
        
        // Show web challenges by default
        showCategory('web');
    }
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('success-modal');
    if (event.target === modal) {
        closeSuccessModal();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Close modal with Escape key
    if (event.key === 'Escape') {
        closeSuccessModal();
    }
});

// Add CSS for feedback animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    .challenge-card.completed {
        position: relative;
    }
    
    .challenge-card.completed::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, transparent 40%, rgba(39, 202, 63, 0.1) 50%, transparent 60%);
        pointer-events: none;
        border-radius: 15px;
    }
`;
document.head.appendChild(style);

// Export functions for global use
window.showCategory = showCategory;
window.testSQLInjection = testSQLInjection;
window.testXSS = testXSS;
window.submitFlag = submitFlag;
window.closeSuccessModal = closeSuccessModal;