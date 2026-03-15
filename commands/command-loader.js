// Command Loader - Integrates all command modules
class CommandLoader {
    constructor() {
        this.commands = {};
        this.loadAllCommands();
        console.log('CommandLoader initialized with', Object.keys(this.commands).length, 'commands');
    }

    loadAllCommands() {
        // Check if command objects exist
        if (typeof basicCommands !== 'undefined') {
            Object.assign(this.commands, basicCommands);
            console.log('Loaded basic commands');
        }
        if (typeof networkCommands !== 'undefined') {
            Object.assign(this.commands, networkCommands);
            console.log('Loaded network commands');
        }
        if (typeof webCommands !== 'undefined') {
            Object.assign(this.commands, webCommands);
            console.log('Loaded web commands');
        }
        if (typeof exploitCommands !== 'undefined') {
            Object.assign(this.commands, exploitCommands);
            console.log('Loaded exploit commands');
        }
        if (typeof passwordCommands !== 'undefined') {
            Object.assign(this.commands, passwordCommands);
            console.log('Loaded password commands');
        }
        if (typeof wirelessCommands !== 'undefined') {
            Object.assign(this.commands, wirelessCommands);
            console.log('Loaded wireless commands');
        }
        if (typeof windowsCommands !== 'undefined') {
            Object.assign(this.commands, windowsCommands);
            console.log('Loaded windows commands');
        }
        if (typeof forensicsCommands !== 'undefined') {
            Object.assign(this.commands, forensicsCommands);
            console.log('Loaded forensics commands');
        }

        // Add special commands
        this.commands.nano = this.handleNano.bind(this);
        this.commands.vim = this.handleVim.bind(this);
        this.commands.vi = this.handleVim.bind(this);
        this.commands.cd = this.handleCd.bind(this);
        this.commands.flag = this.handleFlag.bind(this);
        this.commands.history = this.handleHistory.bind(this);
        
        console.log('All commands loaded:', Object.keys(this.commands));
    }

    executeCommand(cmd, args, labEngine) {
        this.labEngine = labEngine;
        
        if (this.commands[cmd]) {
            return this.commands[cmd](args);
        }
        
        return `Command not found: ${cmd}. Type 'help' for available commands.`;
    }

    handleNano(args) {
        const filename = args[0];
        if (!filename) return 'Usage: nano <filename>';
        
        window.nanoEditor.open(filename, this.labEngine);
        return '';
    }

    handleVim(args) {
        const filename = args[0];
        if (!filename) return 'Usage: vim <filename>';
        
        // Simple vim simulation
        const content = window.vfs.readFile(filename) || `# New file: ${filename}\n# Add your content here`;
        window.vfs.writeFile(filename, content);
        
        return `Vim - Vi IMproved 8.2
Opening ${filename}...
File saved successfully (simulated)
Use nano for full editor experience`;
    }

    handleCd(args) {
        const path = args[0];
        const success = window.vfs.changeDirectory(path);
        
        if (success) {
            // Update terminal prompt
            const prompt = document.getElementById('terminalPrompt');
            if (prompt) {
                prompt.textContent = `root@kali:${window.vfs.currentDir}# `;
            }
            return '';
        } else {
            return `cd: ${path}: No such file or directory`;
        }
    }

    handleFlag(args) {
        const flag = args[0];
        if (!flag) return 'Usage: flag <flag_value>';
        
        const validFlags = [
            'CYBER{SQL_1nj3ct10n_m4st3r}',
            'CYBER{d1r3ct0ry_tr4v3rs4l}',
            'CYBER{w3b_4pp_pwn3d}',
            'CYBER{r00t_4cc3ss_gr4nt3d}',
            'CYBER{p4ssw0rd_cr4ck3d}',
            'CYBER{n3tw0rk_pwn3d}',
            'CYBER{w1r3l3ss_cr4ck3d}',
            'CYBER{f0r3ns1cs_m4st3r}'
        ];
        
        if (validFlags.includes(flag)) {
            if (typeof addUserXP === 'function') {
                addUserXP(50);
            }
            
            // Check objectives if lab engine is available
            if (this.labEngine && this.labEngine.checkObjective) {
                this.labEngine.checkObjective('flag_capture');
            }
            
            return `✅ Correct flag submitted: ${flag}\n🎉 You earned 50 XP!`;
        } else {
            return `❌ Incorrect flag: ${flag}\nKeep trying! Check your enumeration results.`;
        }
    }

    handleHistory() {
        if (this.labEngine && this.labEngine.terminalHistory) {
            let output = 'Command History:\n';
            this.labEngine.terminalHistory.forEach((cmd, index) => {
                output += `${index + 1}  ${cmd}\n`;
            });
            return output;
        }
        return 'No command history available';
    }

    getAvailableCommands() {
        return Object.keys(this.commands).sort();
    }

    getCommandHelp(cmd) {
        if (cmd === 'help') {
            return this.commands.help();
        }
        
        const helpTexts = {
            'nano': 'nano <filename> - Edit file with nano editor (full featured)',
            'vim': 'vim <filename> - Edit file with vim editor (basic)',
            'cd': 'cd <directory> - Change current directory',
            'flag': 'flag <flag> - Submit discovered flag for points',
            'nmap': 'nmap <target> - Network port scanner',
            'sqlmap': 'sqlmap -u <url> - SQL injection testing tool',
            'gobuster': 'gobuster dir -u <url> -w <wordlist> - Directory enumeration',
            'hydra': 'hydra -l <user> -P <wordlist> <target> <service> - Brute force login',
            'john': 'john <hashfile> - Password cracking with John the Ripper',
            'hashcat': 'hashcat -m <mode> <hashfile> <wordlist> - Advanced password cracking',
            'wireshark': 'wireshark - Network protocol analyzer',
            'msfconsole': 'msfconsole - Start Metasploit Framework'
        };
        
        return helpTexts[cmd] || `No help available for command: ${cmd}`;
    }
}

// Global command loader instance - Initialize after all scripts load
window.addEventListener('load', function() {
    window.commandLoader = new CommandLoader();
    console.log('Command loader initialized on window load');
});