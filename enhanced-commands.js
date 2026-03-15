// Enhanced Terminal Commands - Complete Implementation
const terminalCommands = {
    // Basic Commands
    help: () => `Available Commands:

Basic Commands:
  help - Show this help message
  ls - List directory contents
  cd <dir> - Change directory
  pwd - Print working directory
  cat <file> - Display file contents
  nano <file> - Edit file with nano editor
  vim <file> - Edit file with vim editor
  grep <pattern> <file> - Search text patterns
  find <path> -name <file> - Find files
  clear - Clear terminal
  history - Show command history

File Operations:
  chmod <mode> <file> - Change file permissions
  chown <user> <file> - Change file ownership
  tar -czf <archive> <files> - Create archive
  zip <archive> <files> - Create zip archive
  unzip <archive> - Extract zip archive
  wget <url> - Download files

System Information:
  ps - Show running processes
  top - Show system processes
  kill <pid> - Kill process
  df - Show disk usage
  du <path> - Show directory usage
  mount - Show mounted filesystems
  env - Show environment variables
  which <cmd> - Show command location

Network Tools:
  nmap <target> - Network port scanner
  ping <target> - Ping a host
  nc <host> <port> - Netcat connection
  netstat - Show network connections
  ss - Show socket statistics
  arp - Show ARP table
  route - Show routing table
  tcpdump - Capture network packets

Web Testing:
  gobuster dir -u <url> -w <wordlist> - Directory enumeration
  sqlmap -u <url> - SQL injection testing
  nikto -h <target> - Web vulnerability scanner
  dirb <url> - Directory brute forcer
  curl <url> - HTTP client
  wpscan --url <url> - WordPress scanner

Exploitation:
  msfconsole - Start Metasploit Framework
  searchsploit <term> - Search for exploits

Password Attacks:
  john <hashfile> - Password cracking
  hashcat -m <mode> <hashfile> <wordlist> - Advanced password cracking
  hydra -l <user> -P <wordlist> <target> <service> - Brute force login

Wireless:
  airmon-ng - Manage wireless interfaces
  airodump-ng - Capture wireless packets
  aircrack-ng - Crack WEP/WPA keys
  reaver - WPS attack tool

Windows/AD:
  enum4linux <target> - Enumerate SMB shares
  smbclient -L <target> - List SMB shares
  crackmapexec <target> - Windows enumeration
  evil-winrm -i <target> - Windows remote management
  responder -I <interface> - LLMNR/NBT-NS poisoning

Forensics:
  wireshark - Network protocol analyzer
  volatility - Memory analysis

Lab Commands:
  flag <flag> - Submit discovered flag
  ssh <user>@<host> - SSH connection
  ifconfig - Show network configuration
  whoami - Current user
  id - User ID information`,

    // Basic Commands Implementation
    ls: (args) => {
        const dirs = ['Documents', 'Downloads', 'Desktop', 'tools', 'wordlists'];
        const files = ['notes.txt', 'config.conf', 'passwords.txt', 'exploit.py', 'scan_results.xml'];
        if (args.includes('-la') || args.includes('-al')) {
            return `total 24\ndrwxr-xr-x 6 root root 4096 Jan 15 10:30 .\ndrwxr-xr-x 3 root root 4096 Jan 15 10:00 ..\n${dirs.map(d => `drwxr-xr-x 2 root root 4096 Jan 15 10:30 ${d}`).join('\n')}\n${files.map(f => `-rw-r--r-- 1 root root 1024 Jan 15 10:30 ${f}`).join('\n')}`;
        }
        return `${dirs.join('  ')}  ${files.join('  ')}`;
    },

    pwd: () => '/root',
    whoami: () => 'root',
    id: () => 'uid=0(root) gid=0(root) groups=0(root)',
    
    clear: () => {
        document.getElementById('terminalOutput').innerHTML = '';
        return '';
    },

    cat: (args) => {
        const file = args[0];
        const files = {
            'notes.txt': 'Target appears to be running a web application on port 80.\nLook for common vulnerabilities like SQL injection.\nDefault credentials might be admin:admin',
            'passwords.txt': 'admin:password123\nuser:qwerty\ntest:123456\nroot:toor\nguest:guest',
            'config.conf': 'server_ip=192.168.1.100\nport=8080\ndebug=true\napi_key=abc123def456\ndatabase_password=secretpass123',
            'exploit.py': '#!/usr/bin/env python3\nimport socket\nimport sys\n\n# Exploit code here\nprint("Exploit ready")\ntarget = sys.argv[1]\nprint(f"Targeting {target}")',
            'scan_results.xml': '<?xml version="1.0"?>\n<nmaprun>\n  <host>\n    <address addr="10.10.10.50"/>\n    <ports>\n      <port protocol="tcp" portid="22"><state state="open"/></port>\n      <port protocol="tcp" portid="80"><state state="open"/></port>\n    </ports>\n  </host>\n</nmaprun>'
        };
        return files[file] || `cat: ${file}: No such file or directory`;
    },

    // Network Tools
    nmap: (args) => {
        const target = args.find(arg => arg.match(/\d+\.\d+\.\d+\.\d+/)) || '10.10.10.50';
        return `Starting Nmap 7.91 scan on ${target}

Nmap scan report for ${target}
Host is up (0.0012s latency).
Not shown: 997 closed ports
PORT     STATE SERVICE    VERSION
22/tcp   open  ssh        OpenSSH 7.4 (protocol 2.0)
80/tcp   open  http       Apache httpd 2.4.29 ((Ubuntu))
443/tcp  open  https      Apache httpd 2.4.29 ((Ubuntu))
3306/tcp open  mysql      MySQL 5.7.33-0ubuntu0.18.04.1

Service detection performed. Please report any incorrect results.
Nmap done: 1 IP address (1 host up) scanned in 2.34 seconds`;
    },

    ping: (args) => {
        const target = args[0] || 'google.com';
        return `PING ${target} (8.8.8.8): 56 data bytes
64 bytes from 8.8.8.8: icmp_seq=0 ttl=64 time=12.345 ms
64 bytes from 8.8.8.8: icmp_seq=1 ttl=64 time=11.234 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=64 time=13.456 ms

--- ${target} ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 11.234/12.345/13.456/0.911 ms`;
    },

    // Web Testing Tools
    sqlmap: (args) => {
        const url = args[args.indexOf('-u') + 1] || 'http://10.10.10.50/login.php';
        return `        ___
       __H__
 ___ ___[)]_____ ___ ___  {1.6.12#stable}
|_ -| . [']     | .'| . |
|___|_  ["]_|_|_|__,|  _|
      |_|V...       |_|   http://sqlmap.org

[*] starting @ 10:30:15

[10:30:15] [INFO] testing connection to the target URL
[10:30:16] [INFO] testing if the target URL content is stable
[10:30:17] [INFO] target URL content is stable
[10:30:17] [INFO] testing if parameter 'username' is dynamic
[10:30:18] [INFO] parameter 'username' appears to be dynamic
[10:30:18] [INFO] heuristic (basic) test shows that parameter 'username' might be injectable
[10:30:19] [INFO] testing for SQL injection on parameter 'username'
[10:30:20] [INFO] testing 'MySQL >= 5.0 boolean-based blind - Parameter replace'
[10:30:21] [INFO] parameter 'username' is vulnerable

Parameter: username (POST)
    Type: boolean-based blind
    Title: MySQL >= 5.0 boolean-based blind - Parameter replace
    Payload: username=admin' AND 1=1 AND 'a'='a

[10:30:22] [INFO] the back-end DBMS is MySQL
web application technology: Apache 2.4.29, PHP 7.2.24
back-end DBMS: MySQL >= 5.0

available databases [3]:
[*] information_schema
[*] mysql
[*] webapp_db

Database: webapp_db
Table: users
[3 entries]
+----+----------+----------------------------------+
| id | username | password                         |
+----+----------+----------------------------------+
| 1  | admin    | 5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8 |
| 2  | user     | ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f |
| 3  | guest    | 84983c60f7daadc1cb8698621f802c0d9f9a3c3c295c810748fb048115c186ec |
+----+----------+----------------------------------+

Flag found: CYBER{SQL_1nj3ct10n_m4st3r}`;
    },

    nikto: (args) => {
        const target = args[args.indexOf('-h') + 1] || '10.10.10.50';
        return `- Nikto v2.1.6
---------------------------------------------------------------------------
+ Target IP:          ${target}
+ Target Hostname:    ${target}
+ Target Port:        80
+ Start Time:         2024-01-15 10:30:00
---------------------------------------------------------------------------
+ Server: Apache/2.4.29 (Ubuntu)
+ Retrieved x-powered-by header: PHP/7.2.24
+ The anti-clickjacking X-Frame-Options header is not present.
+ The X-XSS-Protection header is not defined.
+ The X-Content-Type-Options header is not set.
+ Apache/2.4.29 appears to be outdated (current is at least Apache/2.4.37).
+ Server may leak inodes via ETags, header found with file /, inode: 2aa6, size: 5d1a7e1e88b00, mtime: gzip
+ Allowed HTTP Methods: GET, HEAD, POST, OPTIONS
+ /admin/: This might be interesting...
+ /backup/: This might be interesting...
+ /config/: This might be interesting...
+ /login/: This might be interesting...
+ /uploads/: This might be interesting...
+ OSVDB-3092: /admin/: This might be interesting... has been seen in web logs from an unknown scanner.
+ OSVDB-3268: /config/: Directory indexing found.
+ 7889 requests: 0 error(s) and 14 item(s) reported on remote host
+ End Time:           2024-01-15 10:32:15 (135 seconds)
---------------------------------------------------------------------------
+ 1 host(s) tested`;
    },

    gobuster: (args) => {
        if (!args.includes('-u')) {
            return 'Usage: gobuster dir -u <url> -w <wordlist>';
        }
        const url = args[args.indexOf('-u') + 1];
        return `Gobuster v3.1.0
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)

[+] Url:                     ${url}
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                /usr/share/wordlists/common.txt
[+] Status codes:            200,204,301,302,307,401,403

===============================================================
2024/01/15 10:30:00 Starting gobuster
===============================================================
/admin                (Status: 301) [Size: 234]
/backup               (Status: 200) [Size: 1024]
/config               (Status: 403) [Size: 277]
/index                (Status: 200) [Size: 2048]
/login                (Status: 200) [Size: 1536]
/uploads              (Status: 301) [Size: 234]
===============================================================
2024/01/15 10:30:45 Finished
===============================================================`;
    },

    curl: (args) => {
        const url = args[0] || 'http://10.10.10.50';
        return `<!DOCTYPE html>
<html>
<head>
    <title>Vulnerable Web Application</title>
</head>
<body>
    <h1>Welcome to Vulnerable Web App</h1>
    <form action="login.php" method="POST">
        <input type="text" name="username" placeholder="Username">
        <input type="password" name="password" placeholder="Password">
        <input type="submit" value="Login">
    </form>
    <a href="/admin">Admin Panel</a>
    <!-- TODO: Remove debug info -->
    <!-- Database: webapp_db, User: root, Pass: toor -->
</body>
</html>`;
    },

    // Exploitation Tools
    msfconsole: () => `
                          ########                  #
                      #################            #
                   ######################         #
                  #########################      #
                ############################
               ##############################
               ###############################
              ###############################
              ##############################
                              #    ########   #
                 ##        ###        ####   ##
                                      ###   ###
                                    ####   ###
               ####          ##########   ####
               #######################   ####
                 ####################   ####
                  ##################  ####
                    ############      ##
                       ########        ###
                      #########        #####
                    ############      ######
                   ########      #########
                     #####       ########
                       ###       #########
                      ######    ############
                     #######################
                     #   #   ###  #   #   ##
                     ########################
                      ##     ##   ##     ##
                            https://metasploit.com

       =[ metasploit v6.2.26-dev                          ]
+ -- --=[ 2230 exploits - 1177 auxiliary - 399 post       ]
+ -- --=[ 592 payloads - 45 encoders - 10 nops            ]
+ -- --=[ 9 evasion                                        ]

Metasploit tip: Use the edit command to open the currently active module in your editor

msf6 > use exploit/multi/handler
msf6 exploit(multi/handler) > set payload windows/meterpreter/reverse_tcp
msf6 exploit(multi/handler) > set LHOST 10.10.10.100
msf6 exploit(multi/handler) > set LPORT 4444
msf6 exploit(multi/handler) > exploit

[*] Started reverse TCP handler on 10.10.10.100:4444`,

    searchsploit: (args) => {
        const term = args[0] || 'apache';
        return `------------------------------------------------------------------------------------------------------------------------- ---------------------------------
 Exploit Title                                                                                                           |  Path
------------------------------------------------------------------------------------------------------------------------- ---------------------------------
Apache + PHP < 5.3.12 / < 5.4.2 - cgi-bin Remote Code Execution                                                        | php/remote/29290.c
Apache 2.4.17 < 2.4.38 - 'apache2ctl graceful' 'logrotate' Local Privilege Escalation                                 | linux/local/46676.php
Apache < 2.2.34 / < 2.4.27 - OPTIONS Memory Leak                                                                        | linux/webapps/42745.py
Apache CXF < 2.5.10/2.6.7/2.7.4 - Denial of Service                                                                    | xml/dos/26710.txt
Apache mod_ssl < 2.8.7 OpenSSL - 'OpenFuck.c' Remote Buffer Overflow                                                   | unix/remote/21671.c
Apache mod_ssl < 2.8.7 OpenSSL - 'OpenFuck.c' Remote Buffer Overflow (1)                                               | unix/remote/764.c
Apache Tomcat < 5.5.17 - Remote Directory Listing                                                                       | multiple/remote/2061.txt
Apache Tomcat < 6.0.18 - 'utf8' Directory Traversal                                                                     | unix/remote/14489.c
Apache Tomcat < 9.0.1 (Beta) / < 8.5.23 / < 8.0.47 / < 7.0.8 - JSP Upload Bypass / Remote Code Execution (1)        | windows/webapps/42953.txt
Apache Tomcat < 9.0.1 (Beta) / < 8.5.23 / < 8.0.47 / < 7.0.8 - JSP Upload Bypass / Remote Code Execution (2)        | jsp/webapps/42966.py
------------------------------------------------------------------------------------------------------------------------- ---------------------------------
Shellcodes: No Results`;
    },

    // Password Attacks
    john: (args) => {
        const hashfile = args[0] || 'hashes.txt';
        return `Using default input encoding: UTF-8
Loaded 4 password hashes with 4 different salts (sha256crypt, crypt(3) $5$ [SHA256 256/256 AVX2 8x])
Cost 1 (iteration count) is 5000 for all loaded hashes
Will run 4 OpenMP threads
Proceeding with single, rules:Single
Press 'q' or Ctrl-C to abort, almost any other key for status
password123      (admin)
qwerty           (user)
123456           (test)
toor             (root)
4g 0:00:00:02 DONE (2024-01-15 10:30) 1.666g/s 2400p/s 9600c/s 9600C/s 123456..password123
Use the "--show" option to display all of the cracked passwords reliably
Session completed`;
    },

    hashcat: (args) => {
        return `hashcat (v6.2.5) starting...

OpenCL API (OpenCL 2.1 AMD-APP (3004.6)) - Platform #1 [Advanced Micro Devices, Inc.]
========================================================================
* Device #1: gfx906:xnack-, 16384/16384 MB, 60MCU

Minimum password length supported by kernel: 0
Maximum password length supported by kernel: 256

Hashes: 1 digests; 1 unique digests, 1 unique salts
Bitmaps: 16 bits, 65536 entries, 0x0000ffff mask, 262144 bytes, 5/13 rotates

Applicable optimizers applied:
* Zero-Byte
* Early-Skip
* Not-Salted
* Not-Iterated
* Single-Hash
* Single-Salt
* Raw-Hash

ATTENTION! Pure (unoptimized) backend kernels selected.
Using pure kernels enables cracking longer passwords but for the price of drastically reduced performance.

Watchdog: Hardware monitoring interface not found on your system.
Watchdog: Temperature abort trigger disabled.

Host memory required for this attack: 65 MB

Dictionary cache hit:
* Filename..: /usr/share/wordlists/rockyou.txt
* Passwords.: 14344385
* Bytes.....: 139921507
* Keyspace..: 14344385

5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8:hello

Session..........: hashcat
Status...........: Cracked
Hash.Name........: SHA256
Hash.Target......: 5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62...1542d8
Time.Started.....: Mon Jan 15 10:30:15 2024 (2 secs)
Time.Estimated...: Mon Jan 15 10:30:17 2024 (0 secs)
Guess.Base.......: File (/usr/share/wordlists/rockyou.txt)
Speed.#1.........:  7168.0 kH/s (0.49ms) @ Accel:1024 Loops:1 Thr:1 Vec:8
Recovered........: 1/1 (100.00%) Digests
Progress.........: 14336/14344385 (0.10%)
Rejected.........: 0/14336 (0.00%)
Restore.Point....: 12288/14344385 (0.09%)
Candidates.#1....: 123456 -> hello

Started: Mon Jan 15 10:30:14 2024
Stopped: Mon Jan 15 10:30:18 2024`;
    },

    hydra: (args) => {
        const service = args[args.length - 1] || 'ssh';
        const target = args[args.length - 2] || '10.10.10.50';
        return `Hydra v9.3 starting at 2024-01-15 10:30:45
[DATA] max 16 tasks per 1 server, overall 16 tasks, 14344399 login tries (l:1/p:14344399), ~896525 tries per task
[DATA] attacking ${service}://${target}:22/
[22][${service}] host: ${target}   login: admin   password: password123
[22][${service}] host: ${target}   login: root    password: toor
[22][${service}] host: ${target}   login: user    password: qwerty
1 of 1 target successfully completed, 3 valid passwords found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2024-01-15 10:30:46`;
    },

    // System Commands
    ps: () => `  PID TTY          TIME CMD
    1 ?        00:00:01 systemd
    2 ?        00:00:00 kthreadd
  123 ?        00:00:00 sshd
  456 ?        00:00:00 apache2
  789 ?        00:00:00 mysql
 1234 pts/0    00:00:00 bash
 5678 pts/0    00:00:00 ps`,

    netstat: () => `Active Internet connections (w/o servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State
tcp        0      0 10.10.10.100:22         10.10.10.1:54321        ESTABLISHED
tcp        0      0 10.10.10.100:80         10.10.10.50:12345       TIME_WAIT
tcp        0      0 10.10.10.100:443        10.10.10.50:23456       ESTABLISHED`,

    ifconfig: () => `eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 10.10.10.100  netmask 255.255.255.0  broadcast 10.10.10.255
        inet6 fe80::a00:27ff:fe4e:66a1  prefixlen 64  scopeid 0x20<link>
        ether 08:00:27:4e:66:a1  txqueuelen 1000  (Ethernet)
        RX packets 1234  bytes 567890 (554.5 KiB)
        TX packets 987  bytes 123456 (120.5 KiB)`,

    // Lab Commands
    ssh: (args) => {
        const connection = args[0] || 'user@10.10.10.50';
        return `ssh: connecting to ${connection}
The authenticity of host '10.10.10.50 (10.10.10.50)' can't be established.
ECDSA key fingerprint is SHA256:abc123def456ghi789jkl012mno345pqr678stu901vwx234yz.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '10.10.10.50' (ECDSA) to the list of known hosts.
${connection}'s password: 
Welcome to Ubuntu 20.04.3 LTS (GNU/Linux 5.4.0-91-generic x86_64)
Last login: Mon Jan 15 10:25:32 2024 from 10.10.10.100`;
    },

    flag: (args) => {
        const flag = args[0];
        if (flag && flag.startsWith('CYBER{') && flag.endsWith('}')) {
            if (typeof addUserXP === 'function') {
                addUserXP(50);
            }
            return `🎉 Congratulations! Flag accepted: ${flag}
+50 XP earned!
Total XP: ${getUserData().xp + 50}`;
        }
        return 'Invalid flag format. Flags should be in format: CYBER{...}';
    },

    // Additional Tools
    wpscan: (args) => {
        if (!args.includes('--url')) {
            return 'Usage: wpscan --url <url>';
        }
        return `[+] URL: http://10.10.10.50/wordpress/
[+] Started: Mon Jan 15 10:30:00 2024

[+] WordPress version 5.8.1 identified (Insecure)
[+] WordPress theme: twentytwentyone
[+] Vulnerable plugins found:
  - akismet (outdated)
  - contact-form-7 (vulnerable)

[+] Users identified:
  - admin
  - john

[+] Finished: 67 requests completed`;
    },

    'enum4linux': (args) => {
        const target = args[0] || '10.10.10.50';
        return `Starting enum4linux v0.8.9

[+] Target Information
[+] Got domain/workgroup name: WORKGROUP
[+] Got OS info for ${target}

[+] Enumerating users using SID S-1-22-1
S-1-22-1-1000 Unix User\\admin (Local User)
S-1-22-1-1001 Unix User\\guest (Local User)
S-1-22-1-1002 Unix User\\user (Local User)

[+] Share Enumeration on ${target}
    Sharename       Type      Comment
    ---------       ----      -------
    ADMIN$          Disk      Remote Admin
    C$              Disk      Default share
    IPC$            IPC       Remote IPC
    Users           Disk      Users Directory
    Backup          Disk      Backup Files

Enum4linux complete`;
    },

    smbclient: (args) => {
        const target = args.find(arg => args[args.indexOf(arg) - 1] === '-L') || '10.10.10.50';
        return `        Sharename       Type      Comment
        ---------       ----      -------
        ADMIN$          Disk      Remote Admin
        C$              Disk      Default share
        IPC$            IPC       Remote IPC
        Users           Disk      Users Directory
        Backup          Disk      Backup Files

Server               Comment
---------            -------
${target}            Samba Server

Workgroup            Master
---------            -------
WORKGROUP            ${target}`;
    },

    crackmapexec: (args) => {
        const target = args[0] || '10.10.10.50';
        return `SMB         ${target}    445    TARGET           [*] Windows 10.0 Build 19041 x64 (name:TARGET) (domain:WORKGROUP)
SMB         ${target}    445    TARGET           [+] WORKGROUP\\admin:password123 (Pwn3d!)
SMB         ${target}    445    TARGET           [+] WORKGROUP\\user:qwerty
SMB         ${target}    445    TARGET           [+] Enumerated shares
SMB         ${target}    445    TARGET           Share           Permissions     Remark
SMB         ${target}    445    TARGET           -----           -----------     ------
SMB         ${target}    445    TARGET           ADMIN$          READ,WRITE      Remote Admin
SMB         ${target}    445    TARGET           C$              READ,WRITE      Default share
SMB         ${target}    445    TARGET           Users           READ            Users Directory`;
    },

    'evil-winrm': (args) => {
        const target = args.find(arg => args[args.indexOf(arg) - 1] === '-i') || '10.10.10.50';
        return `Evil-WinRM shell v3.3

Info: Establishing connection to remote endpoint

*Evil-WinRM* PS C:\\Users\\Administrator> whoami
nt authority\\system

*Evil-WinRM* PS C:\\Users\\Administrator> hostname
TARGET-PC

*Evil-WinRM* PS C:\\Users\\Administrator>`;
    },

    responder: (args) => {
        const interface = args.find(arg => args[args.indexOf(arg) - 1] === '-I') || 'eth0';
        return `                                         __
  .----.-----.-----.-----.-----.-----.--|  |.-----.----.
  |   _|  -__|__ --|  _  |  _  |     |  _  ||  -__|   _|
  |__| |_____|_____|   __|_____|__|__|_____||_____|__|
                   |__|

           NBT-NS, LLMNR & MDNS Responder 3.0.6.0

[+] Poisoners:
    LLMNR                      [ON]
    NBT-NS                     [ON]
    DNS/MDNS                   [ON]

[+] Servers:
    HTTP server                [ON]
    HTTPS server               [ON]
    SMB server                 [ON]
    Kerberos server            [ON]

[+] Responder NIC              [${interface}]
[+] Responder IP               [10.10.10.100]

[+] Listening for events...`;
    },

    // Wireless Tools
    'airmon-ng': () => `PHY	Interface	Driver		Chipset

phy0	wlan0		iwlwifi		Intel Corporation Wireless 8265
		(mac80211 monitor mode vif enabled for [phy0]wlan0 on [phy0]wlan0mon)
		(mac80211 station mode vif disabled for [phy0]wlan0)`,

    'airodump-ng': () => `CH  6 ][ Elapsed: 1 min ]

 BSSID              PWR  Beacons    #Data, #/s  CH  MB   CC  ESSID

 AA:BB:CC:DD:EE:FF  -30       15        0    0   6  54e  WPA2 TargetNetwork
 11:22:33:44:55:66  -45       12        3    0  11  54e  WPA2 HomeWiFi
 77:88:99:AA:BB:CC  -60        8        0    0   1  54e  WEP  OldRouter

 BSSID              STATION            PWR   Rate    Lost    Frames  Probe

 AA:BB:CC:DD:EE:FF  12:34:56:78:90:AB  -35    0 - 1      0        2
 11:22:33:44:55:66  AB:CD:EF:12:34:56  -50    0 - 1      0        1`,

    'aircrack-ng': () => `Aircrack-ng 1.6

                   [00:00:01] 1/1 keys tested (0.85 k/s)

                   Time left: --

                                      KEY FOUND! [ WEP_KEY_123 ]

      Master Key     : CD 69 0D 11 8E 82 15 A9 D1 F4 87 75 3B 8D 9C 29
                       E4 AC 13 F6 68 B9 86 BD 5C 52 96 7B 60 F9 6E 71

      WPA PSK        : password123`,

    reaver: () => `Reaver v1.6.5 WiFi Protected Setup Attack Tool

[+] Switching wlan0mon to channel 6
[+] Waiting for beacon from AA:BB:CC:DD:EE:FF
[+] Received beacon from AA:BB:CC:DD:EE:FF
[+] Trying pin "12345670"
[+] Sending authentication request
[+] Associated with AA:BB:CC:DD:EE:FF (ESSID: TargetNetwork)
[+] Pin cracked in 0 seconds
[+] WPS PIN: '87654321'
[+] WPA PSK: 'password123'
[+] AP SSID: 'TargetNetwork'`,

    // Forensics Tools
    wireshark: () => `Starting Wireshark...
Wireshark 3.4.7 - Network Protocol Analyzer
Capturing packets on eth0...
GUI interface would open in real environment`,

    volatility: () => `Volatility Foundation Volatility Framework 2.6.1

INFO    : volatility.debug    : Determining profile based on KDBG search...
INFO    : volatility.debug    : Suggested Profile(s) : Win7SP1x64, Win7SP0x64

Process listing:
Offset(V)          Name                    PID   PPID   Thds     Hnds   Sess  Wow64 Start
------------------ -------------------- ------ ------ ------ -------- ------ ------ -----
0xfffffa8000c94040 System                    4      0     95      411 ------      0 2024-01-15 10:00:00
0xfffffa8001234040 smss.exe                272      4      2       29 ------      0 2024-01-15 10:00:01
0xfffffa8001567040 csrss.exe               348    340      9      436      0      0 2024-01-15 10:00:02
0xfffffa8001789040 winlogon.exe            392    340      3       113      0      0 2024-01-15 10:00:03
0xfffffa8001abc040 services.exe            436    392     11      200      0      0 2024-01-15 10:00:04
0xfffffa8001def040 lsass.exe               452    392      7      610      0      0 2024-01-15 10:00:05
0xfffffa8002123040 svchost.exe             548    436     11      372      0      0 2024-01-15 10:00:06
0xfffffa8002456040 explorer.exe           1484   1464     33      854      1      0 2024-01-15 10:00:30
0xfffffa8002789040 notepad.exe            2156   1484      1       60      1      0 2024-01-15 10:15:22
0xfffffa8002abc040 cmd.exe                2384   1484      1       21      1      0 2024-01-15 10:20:15`
};

// Enhanced command execution function
function executeTerminalCommand(input) {
    const parts = input.trim().split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    if (terminalCommands[cmd]) {
        return terminalCommands[cmd](args);
    }
    
    return `Command not found: ${cmd}. Type 'help' for available commands.`;
}

// Export for use in lab-engine.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { terminalCommands, executeTerminalCommand };
}