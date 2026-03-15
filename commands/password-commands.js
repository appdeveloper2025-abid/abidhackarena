// Password Attack Commands
const passwordCommands = {
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

    medusa: (args) => {
        const target = args.find(arg => args[args.indexOf(arg) - 1] === '-h') || '10.10.10.50';
        const service = args.find(arg => args[args.indexOf(arg) - 1] === '-M') || 'ssh';
        return `Medusa v2.2 [http://www.foofus.net] (C) JoMo-Kun / Foofus Networks <jmk@foofus.net>

ACCOUNT CHECK: [${service}] Host: ${target} (1 of 1, 0 complete) User: admin (1 of 1, 0 complete) Password: password123 (1 of 14344399 complete)
ACCOUNT FOUND: [${service}] Host: ${target} User: admin Password: password123 [SUCCESS]
ACCOUNT CHECK: [${service}] Host: ${target} (1 of 1, 0 complete) User: admin (1 of 1, 1 complete) Password: admin (2 of 14344399 complete)
ACCOUNT CHECK: [${service}] Host: ${target} (1 of 1, 0 complete) User: admin (1 of 1, 1 complete) Password: root (3 of 14344399 complete)
ACCOUNT FOUND: [${service}] Host: ${target} User: root Password: toor [SUCCESS]`;
    },

    crunch: (args) => {
        const min = args[0] || '4';
        const max = args[1] || '6';
        const charset = args[2] || 'abcdefghijklmnopqrstuvwxyz0123456789';
        
        return `Crunch will now generate the following amount of data: ${Math.pow(charset.length, parseInt(max))} bytes
0 MB
0 GB
0 TB
0 PB
Crunch will now generate the following number of lines: ${Math.pow(charset.length, parseInt(max))}

aaaa
aaab
aaac
aaad
...
[Output truncated - generating wordlist]
zzzz
zzz0
zzz1
...
999999

Crunch wordlist generation completed`;
    },

    cewl: (args) => {
        const url = args[0] || 'http://10.10.10.50';
        return `CeWL 5.4.8 (Inclusion) Robin Wood (robin@digi.ninja) (https://digi.ninja/)
Spidering ${url}, to depth 2, return words with a minimum of 3 characters

admin
login
password
username
welcome
security
system
database
config
backup
upload
download
contact
about
home
index
search
profile
settings
logout`;
    },

    'hash-identifier': (args) => {
        const hash = args[0] || '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8';
        return `   #########################################################################
   #     __  __                     __           ______    _____           #
   #    /\\ \\/\\ \\                   /\\ \\         /\\__  _\\  /\\  _ \`\\         #
   #    \\ \\ \\_\\ \\     __      ____ \\ \\ \\___     \\/_/\\ \\/  \\ \\ \\/\\ \\        #
   #     \\ \\  _  \\  /'__\`\\   /',__\\ \\ \\  _ \`\\      \\ \\ \\   \\ \\ \\ \\ \\       #
   #      \\ \\ \\ \\ \\/\\ \\L\\.\\_/\\__, \`\\ \\ \\ \\ \\ \\      \\_\\ \\__ \\ \\ \\_\\ \\      #
   #       \\ \\_\\ \\_\\ \\__/.\\_\\/\\____/  \\ \\_\\ \\_\\     /\\_____\\ \\ \\____/      #
   #        \\/_/\\/_/\\/__/\\/_/\\/___/    \\/_/\\/_/     \\/_____/  \\/___/  v1.2 #
   #                                                             By Zion3R #
   #                                                    www.Blackploit.com #
   #                                                   Root@Blackploit.com #
   #########################################################################
--------------------------------------------------

Possible Hashs:
[+] SHA-256
[+] Haval-256

Least Possible Hashs:
[+] GOST R 34.11-94
[+] RipeMD-256
[+] SNEFRU-256
[+] SHA-256(HMAC)
[+] Haval-256(HMAC)
[+] RipeMD-256(HMAC)
[+] SNEFRU-256(HMAC)
[+] SHA-256(md5(\$pass))
[+] SHA-256(sha1(\$pass))
--------------------------------------------------`;
    }
};