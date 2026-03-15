// Basic Terminal Commands
const basicCommands = {
    help: () => `Available Commands:

Basic Commands:
  help - Show this help message
  ls - List directory contents
  cd <dir> - Change directory
  pwd - Print working directory
  cat <file> - Display file contents
  nano <file> - Edit file with nano editor
  vim <file> - Edit file with vim editor
  touch <file> - Create empty file
  rm <file> - Remove file
  mkdir <dir> - Create directory
  clear - Clear terminal
  history - Show command history
  whoami - Current user
  id - User ID information

File Operations:
  chmod <mode> <file> - Change file permissions
  chown <user> <file> - Change file ownership
  cp <src> <dest> - Copy file
  mv <src> <dest> - Move/rename file
  find <path> -name <file> - Find files
  grep <pattern> <file> - Search text patterns
  head <file> - Show first lines
  tail <file> - Show last lines
  wc <file> - Word count

System Information:
  ps - Show running processes
  top - Show system processes
  kill <pid> - Kill process
  df - Show disk usage
  du <path> - Show directory usage
  mount - Show mounted filesystems
  env - Show environment variables
  which <cmd> - Show command location
  uname - System information
  date - Current date and time
  uptime - System uptime`,

    ls: (args) => {
        const items = window.vfs.listDirectory();
        if (args.includes('-la') || args.includes('-al')) {
            let output = 'total ' + items.length + '\\n';
            output += 'drwxr-xr-x 6 root root 4096 Jan 15 10:30 .\\n';
            output += 'drwxr-xr-x 3 root root 4096 Jan 15 10:00 ..\\n';
            items.forEach(item => {
                const isDir = !item.includes('.');
                const permissions = isDir ? 'drwxr-xr-x' : '-rw-r--r--';
                const size = isDir ? '4096' : Math.floor(Math.random() * 10000);
                output += `${permissions} 1 root root ${size} Jan 15 10:30 ${item}\\n`;
            });
            return output;
        }
        return items.join('  ');
    },

    pwd: () => window.vfs.currentDir,

    whoami: () => 'root',

    id: () => 'uid=0(root) gid=0(root) groups=0(root)',

    clear: () => {
        document.getElementById('terminalOutput').innerHTML = '';
        return '';
    },

    cat: (args) => {
        const filename = args[0];
        if (!filename) return 'Usage: cat <filename>';
        
        const content = window.vfs.readFile(filename);
        return content || `cat: ${filename}: No such file or directory`;
    },

    touch: (args) => {
        const filename = args[0];
        if (!filename) return 'Usage: touch <filename>';
        
        window.vfs.createFile(filename, '');
        return `Created file: ${filename}`;
    },

    rm: (args) => {
        const filename = args[0];
        if (!filename) return 'Usage: rm <filename>';
        
        const content = window.vfs.readFile(filename);
        if (content === null) return `rm: cannot remove '${filename}': No such file or directory`;
        
        window.vfs.deleteFile(filename);
        return `Removed: ${filename}`;
    },

    mkdir: (args) => {
        const dirname = args[0];
        if (!dirname) return 'Usage: mkdir <dirname>';
        
        if (window.vfs.createDirectory(dirname)) {
            return `Created directory: ${dirname}`;
        } else {
            return `mkdir: cannot create directory '${dirname}': File exists`;
        }
    },

    cp: (args) => {
        if (args.length < 2) return 'Usage: cp <source> <destination>';
        
        const src = args[0];
        const dest = args[1];
        const content = window.vfs.readFile(src);
        
        if (content === null) return `cp: cannot stat '${src}': No such file or directory`;
        
        window.vfs.writeFile(dest, content);
        return `Copied ${src} to ${dest}`;
    },

    mv: (args) => {
        if (args.length < 2) return 'Usage: mv <source> <destination>';
        
        const src = args[0];
        const dest = args[1];
        const content = window.vfs.readFile(src);
        
        if (content === null) return `mv: cannot stat '${src}': No such file or directory`;
        
        window.vfs.writeFile(dest, content);
        window.vfs.deleteFile(src);
        return `Moved ${src} to ${dest}`;
    },

    head: (args) => {
        const filename = args[0];
        if (!filename) return 'Usage: head <filename>';
        
        const content = window.vfs.readFile(filename);
        if (!content) return `head: cannot open '${filename}' for reading: No such file or directory`;
        
        return content.split('\\n').slice(0, 10).join('\\n');
    },

    tail: (args) => {
        const filename = args[0];
        if (!filename) return 'Usage: tail <filename>';
        
        const content = window.vfs.readFile(filename);
        if (!content) return `tail: cannot open '${filename}' for reading: No such file or directory`;
        
        const lines = content.split('\\n');
        return lines.slice(-10).join('\\n');
    },

    wc: (args) => {
        const filename = args[0];
        if (!filename) return 'Usage: wc <filename>';
        
        const content = window.vfs.readFile(filename);
        if (!content) return `wc: ${filename}: No such file or directory`;
        
        const lines = content.split('\\n').length;
        const words = content.split(/\\s+/).length;
        const chars = content.length;
        
        return `${lines} ${words} ${chars} ${filename}`;
    },

    grep: (args) => {
        if (args.length < 2) return 'Usage: grep <pattern> <file>';
        
        const pattern = args[0];
        const filename = args[1];
        const content = window.vfs.readFile(filename);
        
        if (!content) return `grep: ${filename}: No such file or directory`;
        
        const matches = content.split('\\n').filter(line => line.includes(pattern));
        return matches.length > 0 ? matches.join('\\n') : '';
    },

    find: (args) => {
        if (args.length < 3 || args[1] !== '-name') return 'Usage: find <path> -name <pattern>';
        
        const pattern = args[2];
        const files = Object.keys(window.vfs.files);
        const matches = files.filter(f => f.includes(pattern));
        
        return matches.join('\\n');
    },

    chmod: (args) => {
        if (args.length < 2) return 'Usage: chmod <mode> <file>';
        return `Changed permissions of '${args[1]}' to ${args[0]}`;
    },

    chown: (args) => {
        if (args.length < 2) return 'Usage: chown <user> <file>';
        return `Changed ownership of '${args[1]}' to ${args[0]}`;
    },

    ps: () => `  PID TTY          TIME CMD
    1 ?        00:00:01 systemd
    2 ?        00:00:00 kthreadd
  123 ?        00:00:00 sshd
  456 ?        00:00:00 apache2
  789 ?        00:00:00 mysql
 1234 pts/0    00:00:00 bash
 5678 pts/0    00:00:00 ps`,

    top: () => `top - 10:30:15 up 2 days,  3:45,  1 user,  load average: 0.15, 0.10, 0.05
Tasks: 125 total,   1 running, 124 sleeping,   0 stopped,   0 zombie
%Cpu(s):  2.3 us,  1.2 sy,  0.0 ni, 96.2 id,  0.3 wa,  0.0 hi,  0.0 si,  0.0 st
MiB Mem :   4096.0 total,   2048.5 free,   1024.2 used,   1023.3 buff/cache

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
 1234 root      20   0  123456   12345   1234 S   2.3   0.3   0:01.23 nmap
 1235 root      20   0   98765    9876    987 S   1.2   0.2   0:02.34 python3`,

    kill: (args) => {
        const pid = args[0];
        if (!pid) return 'Usage: kill <pid>';
        return `Killed process ${pid}`;
    },

    df: () => `Filesystem     1K-blocks    Used Available Use% Mounted on
/dev/sda1       20971520 8388608  12582912  40% /
tmpfs            2097152       0   2097152   0% /dev/shm
/dev/sda2       10485760 1048576   9437184  10% /home`,

    du: (args) => {
        const path = args[0] || '.';
        return `4096    ${path}/Documents
8192    ${path}/Downloads
2048    ${path}/Desktop
16384   ${path}`;
    },

    mount: () => `/dev/sda1 on / type ext4 (rw,relatime)
tmpfs on /dev/shm type tmpfs (rw,nosuid,nodev)
/dev/sda2 on /home type ext4 (rw,relatime)`,

    env: () => `PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
HOME=/root
USER=root
SHELL=/bin/bash
TERM=xterm-256color
LANG=en_US.UTF-8
PWD=${window.vfs.currentDir}`,

    which: (args) => {
        const cmd = args[0];
        if (!cmd) return 'Usage: which <command>';
        
        const paths = {
            'nmap': '/usr/bin/nmap',
            'python3': '/usr/bin/python3',
            'bash': '/bin/bash',
            'nc': '/bin/nc',
            'curl': '/usr/bin/curl',
            'wget': '/usr/bin/wget',
            'grep': '/bin/grep',
            'find': '/usr/bin/find',
            'nano': '/bin/nano',
            'vim': '/usr/bin/vim'
        };
        
        return paths[cmd] || `${cmd}: not found`;
    },

    uname: (args) => {
        if (args.includes('-a')) {
            return 'Linux kali 5.10.0-kali7-amd64 #1 SMP Debian 5.10.28-1kali1 (2021-04-12) x86_64 GNU/Linux';
        }
        return 'Linux';
    },

    date: () => new Date().toString(),

    uptime: () => 'up 2 days, 3:45, 1 user, load average: 0.15, 0.10, 0.05'
};