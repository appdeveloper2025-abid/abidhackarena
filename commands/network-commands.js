// Network Commands
const networkCommands = {
    nmap: (args) => {
        const target = args.find(arg => arg.match(/\\d+\\.\\d+\\.\\d+\\.\\d+/)) || '10.10.10.50';
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

    masscan: (args) => {
        const target = args.find(arg => arg.match(/\\d+\\.\\d+\\.\\d+\\.\\d+/)) || '10.10.10.50';
        return `Starting masscan 1.3.2
Initiating SYN Stealth Scan
Scanning ${target} [65535 ports]
Discovered open port 22/tcp on ${target}
Discovered open port 80/tcp on ${target}
Discovered open port 443/tcp on ${target}
Discovered open port 3306/tcp on ${target}
Discovered open port 8080/tcp on ${target}`;
    },

    rustscan: (args) => {
        const target = args.find(arg => arg.match(/\\d+\\.\\d+\\.\\d+\\.\\d+/)) || '10.10.10.50';
        return `Open ${target}:22
Open ${target}:80
Open ${target}:443
Open ${target}:3306
Open ${target}:8080
[~] Starting Nmap
Nmap scan report for ${target}
Host is up (0.00050s latency)

PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
443/tcp  open  https
3306/tcp open  mysql
8080/tcp open  http-proxy`;
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

    nc: (args) => {
        if (args.length < 2) return 'Usage: nc <host> <port>';
        const host = args[0];
        const port = args[1];
        return `Connection to ${host} ${port} port [tcp/*] succeeded!
SSH-2.0-OpenSSH_7.4`;
    },

    netstat: () => `Active Internet connections (w/o servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State
tcp        0      0 10.10.10.100:22         10.10.10.1:54321        ESTABLISHED
tcp        0      0 10.10.10.100:80         10.10.10.50:12345       TIME_WAIT
tcp        0      0 10.10.10.100:443        10.10.10.50:23456       ESTABLISHED`,

    ss: () => `Netid  State      Recv-Q Send-Q Local Address:Port               Peer Address:Port
tcp    LISTEN     0      128          *:22                       *:*
tcp    LISTEN     0      80           *:80                       *:*
tcp    ESTAB      0      0      10.10.10.100:22              10.10.10.1:54321
tcp    ESTAB      0      0      10.10.10.100:443             10.10.10.50:23456`,

    arp: () => `Address                  HWtype  HWaddress           Flags Mask            Iface
10.10.10.1               ether   08:00:27:12:34:56   C                     eth0
10.10.10.50              ether   08:00:27:ab:cd:ef   C                     eth0
10.10.10.254             ether   08:00:27:98:76:54   C                     eth0`,

    route: () => `Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
default         10.10.10.1      0.0.0.0         UG    100    0        0 eth0
10.10.10.0      0.0.0.0         255.255.255.0   U     100    0        0 eth0
169.254.0.0     0.0.0.0         255.255.0.0     U     1000   0        0 eth0`,

    ifconfig: () => `eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 10.10.10.100  netmask 255.255.255.0  broadcast 10.10.10.255
        inet6 fe80::a00:27ff:fe4e:66a1  prefixlen 64  scopeid 0x20<link>
        ether 08:00:27:4e:66:a1  txqueuelen 1000  (Ethernet)
        RX packets 1234  bytes 567890 (554.5 KiB)
        TX packets 987  bytes 123456 (120.5 KiB)

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 0  bytes 0 (0.0 B)
        TX packets 0  bytes 0 (0.0 B)`,

    tcpdump: (args) => {
        const interface = args.find(arg => args[args.indexOf(arg) - 1] === '-i') || 'eth0';
        return `tcpdump: verbose output suppressed, use -v or -vv for full protocol decode
listening on ${interface}, link-type EN10MB (Ethernet), capture size 262144 bytes
10:30:15.123456 IP 10.10.10.100.22 > 10.10.10.1.54321: Flags [P.], seq 1:49, ack 1, win 229, length 48
10:30:15.234567 IP 10.10.10.1.54321 > 10.10.10.100.22: Flags [.], ack 49, win 256, length 0
10:30:15.345678 IP 10.10.10.100.80 > 10.10.10.50.12345: Flags [F.], seq 1024, ack 512, win 229, length 0`;
    },

    wget: (args) => {
        const url = args[0];
        if (!url) return 'Usage: wget <url>';
        
        return `--2024-01-15 10:30:00--  ${url}
Resolving ${url.split('/')[2]}... 10.10.10.50
Connecting to ${url.split('/')[2]}|10.10.10.50|:80... connected.
HTTP request sent, awaiting response... 200 OK
Length: 2048 (2.0K) [text/html]
Saving to: '${url.split('/').pop()}'

100%[===================>] 2,048       --.-K/s   in 0s

'${url.split('/').pop()}' saved [2048/2048]`;
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
    }
};