// Practical Labs JavaScript - AbidHack Arena

// VM and Lab Management
let selectedVM = 'kali';
let labProgress = {
    completedLabs: 0,
    vmLaunches: 0,
    toolsMastered: 0,
    totalLabs: 20,
    totalVMs: 4,
    totalTools: 60
};

// VM Configuration
const vmConfigs = {
    'kali': {
        name: 'Kali Linux',
        icon: '🐉',
        bootTime: 3000,
        bootMessages: [
            'Initializing Kali Linux kernel...',
            'Loading penetration testing tools...',
            'Starting network services...',
            'Kali Linux ready for penetration testing!'
        ]
    },
    'parrot': {
        name: 'Parrot Security OS',
        icon: '🦜',
        bootTime: 3000,
        bootMessages: [
            'Booting Parrot Security OS...',
            'Loading security modules...',
            'Starting Tor network services...',
            'Parrot OS ready for secure operations!'
        ]
    },
    'windows': {
        name: 'Windows Server 2019',
        icon: '🪟',
        bootTime: 3000,
        bootMessages: [
            'Starting Windows Server 2019...',
            'Loading Active Directory services...',
            'Initializing IIS web server...',
            'Windows Server ready for testing!'
        ]
    },
    'ubuntu': {
        name: 'Ubuntu Server',
        icon: '🐧',
        bootTime: 3000,
        bootMessages: [
            'Booting Ubuntu Server...',
            'Starting Apache web server...',
            'Initializing MySQL database...',
            'Ubuntu Server ready for exploitation!'
        ]
    }
};

// Lab Scenarios Configuration
const labScenarios = {
    'webapp': {
        name: 'Web Application Security Lab',
        icon: '🌐',
        difficulty: 'Intermediate',
        xpReward: 25,
        estimatedTime: '45 minutes'
    },
    'network': {
        name: 'Network Penetration Testing Lab',
        icon: '🔍',
        difficulty: 'Advanced',
        xpReward: 35,
        estimatedTime: '60 minutes'
    },
    'forensics': {
        name: 'Digital Forensics Lab',
        icon: '🔬',
        difficulty: 'Intermediate',
        xpReward: 30,
        estimatedTime: '50 minutes'
    },
    'ics': {
        name: 'Industrial Control Systems Lab',
        icon: '🏭',
        difficulty: 'Expert',
        xpReward: 50,
        estimatedTime: '90 minutes'
    },
    'mobile': {
        name: 'Mobile Application Security Lab',
        icon: '📱',
        difficulty: 'Intermediate',
        xpReward: 28,
        estimatedTime: '40 minutes'
    },
    'crypto': {
        name: 'Cryptography & Steganography Lab',
        icon: '🔐',
        difficulty: 'Beginner',
        xpReward: 20,
        estimatedTime: '35 minutes'
    }
};

// Launch lab scenario
function launchScenario(scenarioType) {
    if (!labScenarios[scenarioType]) {
        console.error('Unknown scenario type:', scenarioType);
        return;
    }
    
    const scenario = labScenarios[scenarioType];
    
    // Show launch confirmation
    const confirmMessage = `Launching: ${scenario.name}\nDifficulty: ${scenario.difficulty}\nEstimated Time: ${scenario.estimatedTime}\nXP Reward: ${scenario.xpReward}\n\nProceed to lab environment?`;
    
    if (confirm(confirmMessage)) {
        // Store scenario info
        localStorage.setItem('current_scenario', JSON.stringify(scenario));
        
        // Show loading animation
        showScenarioLoading(scenario);
        
        // Redirect to lab
        setTimeout(() => {
            window.location.href = 'lab.html';
        }, 2000);
    }
}

// Show scenario loading animation
function showScenarioLoading(scenario) {
    const loadingDiv = document.createElement('div');
    loadingDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        backdrop-filter: blur(10px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 3000;
        color: #00ff41;
        font-family: 'Orbitron', monospace;
    `;
    
    loadingDiv.innerHTML = `
        <div style="font-size: 4rem; margin-bottom: 2rem; animation: pulse 2s infinite;">${scenario.icon}</div>
        <h2 style="margin-bottom: 1rem; color: #00ff41;">Initializing ${scenario.name}</h2>
        <div style="width: 300px; height: 4px; background: rgba(0, 255, 65, 0.2); border-radius: 2px; overflow: hidden;">
            <div style="height: 100%; background: linear-gradient(90deg, #00ff41, #0066ff); width: 0%; animation: loadingBar 2s ease-out forwards;"></div>
        </div>
        <p style="margin-top: 1rem; color: #ccc;">Setting up lab environment...</p>
    `;
    
    document.body.appendChild(loadingDiv);
    
    setTimeout(() => {
        if (document.body.contains(loadingDiv)) {
            document.body.removeChild(loadingDiv);
        }
    }, 2000);
}

// Add CSS animations
const labAnimationStyles = document.createElement('style');
labAnimationStyles.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.8; }
    }
    
    @keyframes loadingBar {
        0% { width: 0%; }
        100% { width: 100%; }
    }
`;
document.head.appendChild(labAnimationStyles);

// Export functions for global access
window.launchScenario = launchScenario;

console.log('Practical Labs JavaScript loaded successfully!');
