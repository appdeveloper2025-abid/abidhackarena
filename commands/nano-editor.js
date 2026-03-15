// Nano Editor Implementation
class NanoEditor {
    constructor() {
        this.isOpen = false;
        this.currentFile = '';
        this.content = '';
        this.originalContent = '';
        this.modified = false;
    }

    open(filename, labEngine) {
        if (this.isOpen) return;
        
        this.isOpen = true;
        this.currentFile = filename;
        this.labEngine = labEngine;
        
        // Read existing file or create new
        const existingContent = window.vfs.readFile(filename);
        this.content = existingContent || '';
        this.originalContent = this.content;
        this.modified = false;
        
        this.createEditor();
    }

    createEditor() {
        const terminalBody = document.getElementById('terminalBody');
        terminalBody.innerHTML = `
            <div class="nano-editor">
                <div class="nano-header">
                    <div class="nano-title">GNU nano 4.8 - ${this.currentFile}</div>
                    <div class="nano-status">${this.modified ? 'Modified' : 'Saved'}</div>
                </div>
                <div class="nano-content">
                    <textarea id="nanoTextarea" class="nano-textarea" spellcheck="false">${this.content}</textarea>
                </div>
                <div class="nano-footer">
                    <div class="nano-shortcuts">
                        <span>^X Exit</span>
                        <span>^O Write Out</span>
                        <span>^R Read File</span>
                        <span>^W Where Is</span>
                        <span>^K Cut Text</span>
                        <span>^U Paste Text</span>
                    </div>
                </div>
            </div>
        `;

        const textarea = document.getElementById('nanoTextarea');
        textarea.focus();
        
        // Handle keyboard shortcuts
        textarea.addEventListener('keydown', (e) => {
            if (e.ctrlKey) {
                switch(e.key.toLowerCase()) {
                    case 'x':
                        e.preventDefault();
                        this.exit();
                        break;
                    case 'o':
                        e.preventDefault();
                        this.writeOut();
                        break;
                    case 's':
                        e.preventDefault();
                        this.writeOut();
                        break;
                }
            }
        });

        // Track modifications
        textarea.addEventListener('input', () => {
            this.content = textarea.value;
            this.modified = this.content !== this.originalContent;
            this.updateStatus();
        });
    }

    writeOut() {
        window.vfs.writeFile(this.currentFile, this.content);
        this.originalContent = this.content;
        this.modified = false;
        this.updateStatus();
        this.showMessage(`[ Wrote ${this.content.split('\\n').length} lines to ${this.currentFile} ]`);
    }

    updateStatus() {
        const status = document.querySelector('.nano-status');
        if (status) {
            status.textContent = this.modified ? 'Modified' : 'Saved';
            status.className = `nano-status ${this.modified ? 'modified' : 'saved'}`;
        }
    }

    showMessage(msg) {
        const footer = document.querySelector('.nano-footer');
        const msgDiv = document.createElement('div');
        msgDiv.className = 'nano-message';
        msgDiv.textContent = msg;
        footer.appendChild(msgDiv);
        setTimeout(() => msgDiv.remove(), 2000);
    }

    exit() {
        if (this.modified) {
            const save = confirm(`Save modified buffer (ANSWERING "No" WILL DESTROY CHANGES) ?`);
            if (save) {
                this.writeOut();
            }
        }
        
        this.isOpen = false;
        this.restoreTerminal();
    }

    restoreTerminal() {
        const terminalBody = document.getElementById('terminalBody');
        terminalBody.innerHTML = `
            <div class="terminal-output" id="terminalOutput"></div>
            <div class="terminal-input-line">
                <span class="terminal-prompt" id="terminalPrompt">root@kali:${window.vfs.currentDir}# </span>
                <input type="text" class="terminal-input" id="terminalInput" autocomplete="off" spellcheck="false">
            </div>
        `;
        
        // Restore terminal functionality
        this.labEngine.initializeTerminal();
        this.labEngine.addOutput(`File ${this.currentFile} ${this.modified ? 'saved' : 'closed'}`, 'success');
    }
}

// Global nano editor instance
window.nanoEditor = new NanoEditor();