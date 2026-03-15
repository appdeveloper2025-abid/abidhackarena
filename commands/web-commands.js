// Web Testing Commands
const webCommands = {
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

    dirb: (args) => {
        const url = args[0] || 'http://10.10.10.50';
        return `-----------------
DIRB v2.22    
By The Dark Raver
-----------------

START_TIME: Mon Jan 15 10:55:00 2024
URL_BASE: ${url}/
WORDLIST_FILES: /usr/share/dirb/wordlists/common.txt

-----------------

GENERATED WORDS: 4612                                                          

---- Scanning URL: ${url}/ ----
+ ${url}/admin (CODE:301|SIZE:234)                                                                                                                                                          
+ ${url}/backup (CODE:200|SIZE:1024)                                                                                                                                                        
+ ${url}/config (CODE:403|SIZE:277)                                                                                                                                                         
+ ${url}/index (CODE:200|SIZE:2048)                                                                                                                                                         
+ ${url}/login (CODE:200|SIZE:1536)                                                                                                                                                         
+ ${url}/uploads (CODE:301|SIZE:234)                                                                                                                                                        
                                                                                                                                                                                             
---- Entering directory: ${url}/admin/ ----
+ ${url}/admin/config (CODE:200|SIZE:512)                                                                                                                                                   
+ ${url}/admin/index (CODE:200|SIZE:1024)                                                                                                                                                   
                                                                                                                                                                                             
---- Entering directory: ${url}/uploads/ ----
                                                                                                                                                                                             
-----------------
END_TIME: Mon Jan 15 10:57:30 2024
DOWNLOADED: 13836 - FOUND: 6`;
    },

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

    burpsuite: () => `Starting Burp Suite Professional...
Burp Suite Professional v2023.10.3.4
Loading project...
Proxy listening on 127.0.0.1:8080
Scanner ready
Intruder ready
Repeater ready
GUI interface would open in real environment`,

    'owasp-zap': () => `OWASP ZAP 2.12.0
Starting ZAP...
Proxy listening on localhost:8080
Spider ready
Active Scanner ready
Passive Scanner ready
GUI interface would open in real environment`,

    dirb: (args) => {
        const url = args[0] || 'http://10.10.10.50';
        return `-----------------
DIRB v2.22    
By The Dark Raver
-----------------

START_TIME: Mon Jan 15 10:55:00 2024
URL_BASE: ${url}/
WORDLIST_FILES: /usr/share/dirb/wordlists/common.txt

-----------------

GENERATED WORDS: 4612                                                          

---- Scanning URL: ${url}/ ----
+ ${url}/admin (CODE:301|SIZE:234)                                                                                                                                                          
+ ${url}/backup (CODE:200|SIZE:1024)                                                                                                                                                        
+ ${url}/config (CODE:403|SIZE:277)                                                                                                                                                         
+ ${url}/index (CODE:200|SIZE:2048)                                                                                                                                                         
+ ${url}/login (CODE:200|SIZE:1536)                                                                                                                                                         
+ ${url}/uploads (CODE:301|SIZE:234)                                                                                                                                                        
                                                                                                                                                                                             
---- Entering directory: ${url}/admin/ ----
+ ${url}/admin/config (CODE:200|SIZE:512)                                                                                                                                                   
+ ${url}/admin/index (CODE:200|SIZE:1024)                                                                                                                                                   
                                                                                                                                                                                             
---- Entering directory: ${url}/uploads/ ----
                                                                                                                                                                                             
-----------------
END_TIME: Mon Jan 15 10:57:30 2024
DOWNLOADED: 13836 - FOUND: 6`;
    }
};