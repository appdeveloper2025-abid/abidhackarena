// Virtual File System for Terminal
class VirtualFileSystem {
    constructor() {
        this.files = this.loadFiles();
        this.directories = {
            '/root': ['Desktop', 'Documents', 'Downloads', 'tools', 'wordlists'],
            '/root/Desktop': [],
            '/root/Documents': [],
            '/root/Downloads': [],
            '/root/tools': ['nmap', 'gobuster', 'sqlmap', 'metasploit'],
            '/root/wordlists': ['common.txt', 'rockyou.txt']
        };
        this.currentDir = '/root';
    }

    loadFiles() {
        const saved = localStorage.getItem('vfs_files');
        return saved ? JSON.parse(saved) : {
            '/root/notes.txt': 'Target appears to be running a web application on port 80.\nLook for common vulnerabilities like SQL injection.\nDefault credentials might be admin:admin',
            '/root/passwords.txt': 'admin:password123\nuser:qwerty\ntest:123456\nroot:toor\nguest:guest',
            '/root/config.conf': 'server_ip=192.168.1.100\nport=8080\ndebug=true\napi_key=abc123def456\ndatabase_password=secretpass123',
            '/root/wordlists/common.txt': 'admin\nlogin\nindex\ntest\nconfig\nbackup\nuploads',
            '/root/wordlists/rockyou.txt': 'password\n123456\npassword123\nadmin\nqwerty\nletmein'
        };
    }

    saveFiles() {
        localStorage.setItem('vfs_files', JSON.stringify(this.files));
        localStorage.setItem('vfs_dirs', JSON.stringify(this.directories));
    }

    createFile(path, content = '') {
        const fullPath = this.resolvePath(path);
        this.files[fullPath] = content;
        this.addToDirectory(fullPath);
        this.saveFiles();
    }

    writeFile(path, content) {
        const fullPath = this.resolvePath(path);
        this.files[fullPath] = content;
        this.addToDirectory(fullPath);
        this.saveFiles();
    }

    readFile(path) {
        const fullPath = this.resolvePath(path);
        return this.files[fullPath] || null;
    }

    deleteFile(path) {
        const fullPath = this.resolvePath(path);
        delete this.files[fullPath];
        this.removeFromDirectory(fullPath);
        this.saveFiles();
    }

    listDirectory(path = this.currentDir) {
        const fullPath = this.resolvePath(path);
        const dirs = this.directories[fullPath] || [];
        const files = Object.keys(this.files).filter(f => 
            f.startsWith(fullPath + '/') && 
            !f.substring(fullPath.length + 1).includes('/')
        ).map(f => f.split('/').pop());
        return [...dirs, ...files];
    }

    resolvePath(path) {
        if (path.startsWith('/')) return path;
        return this.currentDir === '/' ? '/' + path : this.currentDir + '/' + path;
    }

    addToDirectory(filePath) {
        const dir = filePath.substring(0, filePath.lastIndexOf('/'));
        const filename = filePath.split('/').pop();
        if (!this.directories[dir]) this.directories[dir] = [];
        if (!this.directories[dir].includes(filename)) {
            this.directories[dir].push(filename);
        }
    }

    removeFromDirectory(filePath) {
        const dir = filePath.substring(0, filePath.lastIndexOf('/'));
        const filename = filePath.split('/').pop();
        if (this.directories[dir]) {
            this.directories[dir] = this.directories[dir].filter(f => f !== filename);
        }
    }

    changeDirectory(path) {
        if (!path || path === '~') {
            this.currentDir = '/root';
            return true;
        }
        if (path === '..') {
            const parts = this.currentDir.split('/');
            parts.pop();
            this.currentDir = parts.join('/') || '/';
            return true;
        }
        const newPath = this.resolvePath(path);
        if (this.directories[newPath]) {
            this.currentDir = newPath;
            return true;
        }
        return false;
    }

    createDirectory(path) {
        const fullPath = this.resolvePath(path);
        if (!this.directories[fullPath]) {
            this.directories[fullPath] = [];
            
            // Add to parent directory
            const parentPath = fullPath.substring(0, fullPath.lastIndexOf('/')) || '/';
            const dirName = fullPath.split('/').pop();
            if (this.directories[parentPath] && !this.directories[parentPath].includes(dirName)) {
                this.directories[parentPath].push(dirName);
            }
            
            this.saveFiles();
            return true;
        }
        return false;
    }
}

// Global file system instance
window.vfs = new VirtualFileSystem();