// Windows/Active Directory Commands
const windowsCommands = {
    'enum4linux': (args) => {
        const target = args[0] || '10.10.10.50';
        return `Starting enum4linux v0.8.9

[+] Target Information
[+] Got domain/workgroup name: WORKGROUP
[+] Got OS info for ${target}

[+] Enumerating users using SID S-1-22-1
S-1-22-1-1000 Unix User\\\\admin (Local User)
S-1-22-1-1001 Unix User\\\\guest (Local User)
S-1-22-1-1002 Unix User\\\\user (Local User)

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
SMB         ${target}    445    TARGET           [+] WORKGROUP\\\\admin:password123 (Pwn3d!)
SMB         ${target}    445    TARGET           [+] WORKGROUP\\\\user:qwerty
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

*Evil-WinRM* PS C:\\\\Users\\\\Administrator> whoami
nt authority\\\\system

*Evil-WinRM* PS C:\\\\Users\\\\Administrator> hostname
TARGET-PC

*Evil-WinRM* PS C:\\\\Users\\\\Administrator>`;
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

    bloodhound: () => `BloodHound 4.2.0

Starting BloodHound...
Neo4j database connection established
Loading collectors...
SharpHound collector ready
PowerView collector ready
Web interface available at http://localhost:7474
GUI interface would open in real environment

Ready to analyze Active Directory relationships`,

    mimikatz: () => `  .#####.   mimikatz 2.2.0 (x64) #19041 Sep 19 2022 17:44:08
 .## ^ ##.  "A La Vie, A L'Amour" - (oe.eo)
 ## / \\ ##  /*** Benjamin DELPY \`gentilkiwi\` ( benjamin@gentilkiwi.com )
 ## \\ / ##       > https://blog.gentilkiwi.com/mimikatz
 '## v ##'       Vincent LE TOUX             ( vincent.letoux@gmail.com )
  '#####'        > https://pingcastle.com / https://mysmartlogon.com ***/

mimikatz # privilege::debug
Privilege '20' OK

mimikatz # sekurlsa::logonpasswords

Authentication Id : 0 ; 996 (00000000:000003e4)
Session           : Service from 0
User Name         : NETWORK SERVICE
Domain            : NT AUTHORITY
Logon Server      : (null)
Logon Time        : 1/15/2024 10:00:00 AM
SID               : S-1-5-20
	msv :
	tspkg :
	wdigest :
		* Username : (null)
		* Domain   : (null)
		* Password : (null)
	kerberos :
	ssp :
	credman :

Authentication Id : 0 ; 997 (00000000:000003e5)
Session           : Service from 0
User Name         : LOCAL SERVICE
Domain            : NT AUTHORITY
Logon Server      : (null)
Logon Time        : 1/15/2024 10:00:00 AM
SID               : S-1-5-19

Authentication Id : 0 ; 47104 (00000000:0000b800)
Session           : Interactive from 1
User Name         : Administrator
Domain            : TARGET-PC
Logon Server      : TARGET-PC
Logon Time        : 1/15/2024 10:15:32 AM
SID               : S-1-5-21-1234567890-1234567890-1234567890-500
	msv :
		[00000003] Primary
		* Username : Administrator
		* Domain   : TARGET-PC
		* NTLM     : aad3b435b51404eeaad3b435b51404ee
		* SHA1     : da39a3ee5e6b4b0d3255bfef95601890afd80709
	tspkg :
	wdigest :
		* Username : Administrator
		* Domain   : TARGET-PC
		* Password : P@ssw0rd123!
	kerberos :
		* Username : Administrator
		* Domain   : TARGET-PC.LOCAL
		* Password : P@ssw0rd123!
	ssp :
	credman :

mimikatz #`,

    rpcclient: (args) => {
        const target = args[0] || '10.10.10.50';
        return `rpcclient $> enumdomusers
user:[Administrator] rid:[0x1f4]
user:[Guest] rid:[0x1f5]
user:[krbtgt] rid:[0x1f6]
user:[DefaultAccount] rid:[0x1f7]
user:[WDAGUtilityAccount] rid:[0x1f8]
user:[admin] rid:[0x3e8]
user:[user] rid:[0x3e9]

rpcclient $> enumdomgroups
group:[Enterprise Read-only Domain Controllers] rid:[0x1f2]
group:[Domain Admins] rid:[0x200]
group:[Domain Users] rid:[0x201]
group:[Domain Guests] rid:[0x202]
group:[Domain Computers] rid:[0x203]
group:[Domain Controllers] rid:[0x204]

rpcclient $>`;
    },

    'impacket-psexec': (args) => {
        const target = args[0] || 'admin@10.10.10.50';
        return `Impacket v0.10.0 - Copyright 2022 SecureAuth Corporation

[*] Requesting shares on 10.10.10.50.....
[*] Found writable share ADMIN$
[*] Uploading file nkYjGWDZ.exe
[*] Opening SVCManager on 10.10.10.50.....
[*] Creating service BTOB on 10.10.10.50.....
[*] Starting service BTOB.....
[!] Press help for extra shell commands
Microsoft Windows [Version 10.0.19041.1415]
(c) Microsoft Corporation. All rights reserved.

C:\\\\Windows\\\\system32>whoami
nt authority\\\\system

C:\\\\Windows\\\\system32>`;
    },

    'impacket-secretsdump': (args) => {
        const target = args[0] || 'admin@10.10.10.50';
        return `Impacket v0.10.0 - Copyright 2022 SecureAuth Corporation

[*] Service RemoteRegistry is in stopped state
[*] Starting service RemoteRegistry
[*] Target system bootKey: 0x12345678901234567890123456789012
[*] Dumping local SAM hashes (uid:rid:lmhash:nthash)
Administrator:500:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
DefaultAccount:503:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
WDAGUtilityAccount:504:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
admin:1000:aad3b435b51404eeaad3b435b51404ee:5fbc3d5fec8206a30f4b6c473d68ae76:::
user:1001:aad3b435b51404eeaad3b435b51404ee:64f12cddaa88057e06a81b54e73b949b:::
[*] Dumping cached domain logon information (domain/username:hash)
[*] Dumping LSA Secrets
[*] DPAPI_SYSTEM 
dpapi_machinekey:0x1234567890abcdef1234567890abcdef12345678
dpapi_userkey:0xabcdef1234567890abcdef1234567890abcdef12
[*] NL$KM 
 0000   12 34 56 78 90 AB CD EF  12 34 56 78 90 AB CD EF   .4Vx....4Vx....
[*] Cleaning up...`;
    }
};