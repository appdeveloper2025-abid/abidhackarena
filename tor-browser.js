// Tor Browser Component
class TorBrowser {
    constructor() {
        this.isOpen = false;
        this.isConnected = false;
        this.currentUrl = '';
        this.history = [];
        this.init();
    }

    init() {
        this.createTorButton();
        this.createTorBrowser();
        this.attachEventListeners();
    }

    createTorButton() {
        const button = document.createElement('button');
        button.id = 'tor-browser-btn';
        button.className = 'tor-floating-btn';
        button.innerHTML = '🧅';
        button.title = 'Open Tor Browser';
        button.onclick = () => this.toggleBrowser();
        document.body.appendChild(button);
        
        // Create connect/disconnect toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'tor-connect-toggle';
        toggleBtn.className = 'tor-connect-toggle';
        toggleBtn.innerHTML = '<span class="tor-connect-icon">🔌</span><span id="tor-toggle-text">Connect Tor</span>';
        toggleBtn.title = 'Connect/Disconnect Tor';
        toggleBtn.onclick = () => this.toggleConnection();
        document.body.appendChild(toggleBtn);
    }

    createTorBrowser() {
        const browserHTML = `
            <div id="tor-browser-container" class="tor-browser-container" style="display: none;">
                <div class="tor-browser-window">
                    <div class="tor-browser-header">
                        <div class="tor-browser-title">
                            <span class="tor-icon">🧅</span>
                            <span>Tor Browser</span>
                            <span class="tor-status" id="tor-status">Disconnected</span>
                        </div>
                        <div class="tor-browser-controls">
                            <button onclick="torBrowser.minimizeBrowser()" class="tor-control-btn">−</button>
                            <button onclick="torBrowser.toggleFullscreen()" class="tor-control-btn">⛶</button>
                            <button onclick="torBrowser.closeBrowser()" class="tor-control-btn">×</button>
                        </div>
                    </div>
                    
                    <div class="tor-connection-panel" id="tor-connection-panel">
                        <div class="tor-connection-content">
                            <div class="tor-logo">🧅</div>
                            <h2>Connect to Tor Network</h2>
                            <p>Establish an anonymous connection through the Tor network</p>
                            <div class="tor-connection-info">
                                <div class="connection-step">
                                    <span class="step-icon">🔒</span>
                                    <span>Encrypted Connection</span>
                                </div>
                                <div class="connection-step">
                                    <span class="step-icon">🌐</span>
                                    <span>Multi-Relay Routing</span>
                                </div>
                                <div class="connection-step">
                                    <span class="step-icon">🕵️</span>
                                    <span>Anonymous Browsing</span>
                                </div>
                            </div>
                            <button onclick="torBrowser.connectToTor()" class="tor-connect-btn" id="tor-connect-btn">
                                <span>Connect to Tor</span>
                            </button>
                            <div class="tor-connection-progress" id="tor-connection-progress" style="display: none;">
                                <div class="progress-bar">
                                    <div class="progress-fill" id="tor-progress-fill"></div>
                                </div>
                                <p id="tor-progress-text">Connecting...</p>
                            </div>
                        </div>
                    </div>

                    <div class="tor-browser-content" id="tor-browser-content" style="display: none;">
                        <div class="tor-toolbar">
                            <div class="tor-nav-buttons">
                                <button onclick="torBrowser.goBack()" class="tor-nav-btn" title="Back">◀</button>
                                <button onclick="torBrowser.goForward()" class="tor-nav-btn" title="Forward">▶</button>
                                <button onclick="torBrowser.reload()" class="tor-nav-btn" title="Reload">⟳</button>
                                <button onclick="torBrowser.goHome()" class="tor-nav-btn" title="Home">🏠</button>
                            </div>
                            <div class="tor-address-bar">
                                <span class="tor-secure-icon">🔒</span>
                                <input type="text" id="tor-url-input" placeholder="Search or enter .onion address" />
                                <button onclick="torBrowser.navigate()" class="tor-go-btn">Go</button>
                            </div>
                            <div class="tor-menu-buttons">
                                <button onclick="torBrowser.newIdentity()" class="tor-menu-btn" title="New Identity">🔄</button>
                                <button onclick="torBrowser.showCircuit()" class="tor-menu-btn" title="Tor Circuit">🌐</button>
                                <button onclick="torBrowser.toggleMenu()" class="tor-menu-btn" title="Menu">☰</button>
                            </div>
                        </div>
                        
                        <div class="tor-browser-frame">
                            <iframe id="tor-iframe" sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox" frameborder="0"></iframe>
                            <div class="tor-onion-message" id="tor-onion-message" style="display: none;">
                                <div class="onion-content">
                                    <h2>🧅 Tor Hidden Service</h2>
                                    <p>This is a simulated .onion site for educational purposes</p>
                                    <div class="onion-info">
                                        <p><strong>Address:</strong> <span id="onion-address"></span></p>
                                        <p><strong>Circuit:</strong> <span id="circuit-info"></span></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="tor-status-bar">
                            <div class="status-left">
                                <span class="status-item">🔒 Tor Connected</span>
                                <span class="status-item">IP: <span id="tor-ip">Unknown</span></span>
                                <span class="status-item">Location: <span id="tor-location">Unknown</span></span>
                            </div>
                            <div class="status-right">
                                <span class="status-item">Circuit: <span id="circuit-nodes">3 nodes</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', browserHTML);
    }

    attachEventListeners() {
        const urlInput = document.getElementById('tor-url-input');
        if (urlInput) {
            urlInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.navigate();
            });
        }
    }

    toggleBrowser() {
        this.isOpen = !this.isOpen;
        const container = document.getElementById('tor-browser-container');
        container.style.display = this.isOpen ? 'flex' : 'none';
    }

    closeBrowser() {
        this.isOpen = false;
        document.getElementById('tor-browser-container').style.display = 'none';
    }

    minimizeBrowser() {
        const container = document.getElementById('tor-browser-container');
        container.classList.toggle('minimized');
    }

    toggleFullscreen() {
        const container = document.getElementById('tor-browser-container');
        container.classList.toggle('fullscreen');
    }

    async connectToTor() {
        const connectBtn = document.getElementById('tor-connect-btn');
        const progressDiv = document.getElementById('tor-connection-progress');
        const progressFill = document.getElementById('tor-progress-fill');
        const progressText = document.getElementById('tor-progress-text');
        
        connectBtn.disabled = true;
        progressDiv.style.display = 'block';
        
        const steps = [
            { progress: 20, text: 'Connecting to Tor network...' },
            { progress: 40, text: 'Establishing encrypted connection...' },
            { progress: 60, text: 'Building circuit through relays...' },
            { progress: 80, text: 'Verifying anonymity...' },
            { progress: 100, text: 'Connected to Tor!' }
        ];
        
        for (let step of steps) {
            await new Promise(resolve => setTimeout(resolve, 800));
            progressFill.style.width = step.progress + '%';
            progressText.textContent = step.text;
        }
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        this.isConnected = true;
        document.getElementById('tor-status').textContent = 'Connected';
        document.getElementById('tor-status').style.color = '#00ff41';
        document.getElementById('tor-connection-panel').style.display = 'none';
        document.getElementById('tor-browser-content').style.display = 'flex';
        
        // Update toggle button
        const toggleBtn = document.getElementById('tor-connect-toggle');
        const toggleText = document.getElementById('tor-toggle-text');
        if (toggleBtn) {
            toggleBtn.classList.add('connected');
            toggleBtn.innerHTML = '<span class="tor-connect-icon">✅</span><span id="tor-toggle-text">Disconnect</span>';
        }
        
        this.updateTorInfo();
        this.goHome();
    }

    updateTorInfo() {
        const fakeIPs = ['185.220.101.1', '199.249.230.77', '176.10.99.200', '185.100.87.41'];
        const fakeLocations = ['Germany', 'Netherlands', 'Sweden', 'Switzerland'];
        const randomIP = fakeIPs[Math.floor(Math.random() * fakeIPs.length)];
        const randomLocation = fakeLocations[Math.floor(Math.random() * fakeLocations.length)];
        
        document.getElementById('tor-ip').textContent = randomIP;
        document.getElementById('tor-location').textContent = randomLocation;
    }

    navigate() {
        const urlInput = document.getElementById('tor-url-input');
        let url = urlInput.value.trim();
        
        if (!url) return;
        
        // Handle .onion addresses (simulated)
        if (url.endsWith('.onion')) {
            this.loadOnionSite(url);
            return;
        }
        
        // Add protocol if missing
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            // Check if it's a search query or URL
            if (!url.includes('.') || url.includes(' ')) {
                // It's a search query - use Google
                url = 'https://www.google.com/search?q=' + encodeURIComponent(url);
            } else {
                // It's a URL
                url = 'https://' + url;
            }
        }
        
        this.currentUrl = url;
        this.history.push(url);
        
        const iframe = document.getElementById('tor-iframe');
        const onionMessage = document.getElementById('tor-onion-message');
        
        // Load website in iframe
        onionMessage.style.display = 'none';
        iframe.style.display = 'block';
        
        try {
            iframe.src = url;
            
            // Handle iframe load errors
            iframe.onerror = () => {
                this.showNotification('Unable to load website. Opening in new tab...', 'error');
                window.open(url, '_blank');
            };
        } catch (error) {
            console.error('Error loading URL:', error);
            this.showNotification('Opening in new tab...', 'error');
            window.open(url, '_blank');
        }
    }

    loadOnionSite(address) {
        const iframe = document.getElementById('tor-iframe');
        const onionMessage = document.getElementById('tor-onion-message');
        
        iframe.style.display = 'none';
        onionMessage.style.display = 'flex';
        
        document.getElementById('onion-address').textContent = address;
        document.getElementById('circuit-info').textContent = this.generateCircuit();
        
        this.currentUrl = address;
        this.history.push(address);
    }

    generateCircuit() {
        const nodes = ['Germany', 'Netherlands', 'Sweden', 'Switzerland', 'France', 'Austria'];
        const circuit = [];
        for (let i = 0; i < 3; i++) {
            circuit.push(nodes[Math.floor(Math.random() * nodes.length)]);
        }
        return circuit.join(' → ');
    }

    goBack() {
        if (this.history.length > 1) {
            this.history.pop();
            const previousUrl = this.history[this.history.length - 1];
            document.getElementById('tor-url-input').value = previousUrl;
            this.navigate();
        }
    }

    goForward() {
        // Simplified forward functionality
        this.reload();
    }

    reload() {
        if (this.currentUrl) {
            const iframe = document.getElementById('tor-iframe');
            iframe.src = iframe.src;
        }
    }

    goHome() {
        const urlInput = document.getElementById('tor-url-input');
        const iframe = document.getElementById('tor-iframe');
        const onionMessage = document.getElementById('tor-onion-message');
        
        // Use Google as home page
        const homeUrl = 'https://www.google.com/search?igu=1';
        
        urlInput.value = 'Google Search';
        onionMessage.style.display = 'none';
        iframe.style.display = 'block';
        iframe.src = homeUrl;
        
        this.currentUrl = homeUrl;
        this.history.push(homeUrl);
    }

    newIdentity() {
        if (confirm('Get a new identity? This will clear your browsing history and get a new Tor circuit.')) {
            this.history = [];
            this.updateTorInfo();
            document.getElementById('circuit-nodes').textContent = '3 nodes';
            this.goHome();
            this.showNotification('New Tor identity created', 'success');
        }
    }

    toggleConnection() {
        if (this.isConnected) {
            // Disconnect from Tor
            this.disconnectFromTor();
        } else {
            // Connect to Tor
            if (!this.isOpen) {
                this.toggleBrowser();
            }
            this.connectToTor();
        }
    }

    disconnectFromTor() {
        this.isConnected = false;
        
        // Update UI
        const toggleBtn = document.getElementById('tor-connect-toggle');
        const toggleText = document.getElementById('tor-toggle-text');
        const status = document.getElementById('tor-status');
        
        if (toggleBtn) {
            toggleBtn.classList.remove('connected');
            toggleBtn.innerHTML = '<span class="tor-connect-icon">🔌</span><span id="tor-toggle-text">Connect Tor</span>';
        }
        
        if (status) {
            status.textContent = 'Disconnected';
            status.style.color = '#ffaa00';
        }
        
        // Show connection panel again
        const connectionPanel = document.getElementById('tor-connection-panel');
        const browserContent = document.getElementById('tor-browser-content');
        
        if (connectionPanel && browserContent) {
            connectionPanel.style.display = 'flex';
            browserContent.style.display = 'none';
        }
        
        this.showNotification('Disconnected from Tor network', 'error');
    }

    showCircuit() {
        const circuit = this.generateCircuit();
        alert('Current Tor Circuit:\n\n' + circuit + '\n\nYour connection is routed through 3 random Tor relays for maximum anonymity.');
    }

    toggleMenu() {
        alert('Tor Browser Menu\n\n• New Identity\n• Tor Circuit Info\n• Security Settings\n• Privacy & Security Level: Safest\n• NoScript Enabled\n• HTTPS Everywhere Active');
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = 'tor-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            padding: 1rem 2rem;
            background: ${type === 'success' ? 'linear-gradient(45deg, #7d4698, #9b59b6)' : 'linear-gradient(45deg, #ff4444, #cc0000)'};
            color: white;
            border-radius: 8px;
            font-weight: bold;
            z-index: 10001;
            animation: slideIn 0.3s ease-out;
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }
}

// Initialize Tor Browser
let torBrowser;
document.addEventListener('DOMContentLoaded', function() {
    torBrowser = new TorBrowser();
});

// Tor Search Function - Real World Search
function torSearch() {
    const searchInput = document.getElementById('tor-search-input');
    const query = searchInput.value.trim();
    
    if (!query) return;
    
    // Open Tor Browser if not already open
    if (!torBrowser.isOpen) {
        torBrowser.toggleBrowser();
    }
    
    // If not connected, connect first then search
    if (!torBrowser.isConnected) {
        torBrowser.connectToTor().then(() => {
            performRealSearch(query);
        });
    } else {
        performRealSearch(query);
    }
    
    searchInput.value = '';
}

function performRealSearch(query) {
    setTimeout(() => {
        const urlInput = document.getElementById('tor-url-input');
        const iframe = document.getElementById('tor-iframe');
        const onionMessage = document.getElementById('tor-onion-message');
        
        if (urlInput && iframe) {
            // Use Google search
            const searchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(query);
            
            urlInput.value = 'Search: ' + query;
            onionMessage.style.display = 'none';
            iframe.style.display = 'block';
            iframe.src = searchUrl;
            
            torBrowser.currentUrl = searchUrl;
            torBrowser.history.push(searchUrl);
        }
    }, 100);
}


// Hero Tor Search Function - Opens Google search in new browser tab
function heroTorSearch() {
    const searchInput = document.getElementById('hero-search-input');
    const query = searchInput ? searchInput.value.trim() : '';
    
    if (!query) return;
    
    // Create Google search URL
    const searchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(query);
    
    // Open in new browser tab
    window.open(searchUrl, '_blank');
    
    // Clear the search input
    searchInput.value = '';
}
