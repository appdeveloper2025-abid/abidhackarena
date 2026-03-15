// Wireless Commands
const wirelessCommands = {
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

    'wash': () => `Wash v1.6.5 WiFi Protected Setup Scan Tool

BSSID                  Ch  dBm  WPS  Lck  Vendor    ESSID
--------------------------------------------------------------------------------
AA:BB:CC:DD:EE:FF       6  -30  2.0  No   Linksys   TargetNetwork
11:22:33:44:55:66      11  -45  1.0  No   Netgear   HomeWiFi
77:88:99:AA:BB:CC       1  -60  2.0  Yes  D-Link    OldRouter`,

    'aireplay-ng': (args) => {
        const attack = args.find(arg => args[args.indexOf(arg) - 1] === '--deauth') ? 'deauth' : 'injection';
        if (attack === 'deauth') {
            return `The interface MAC (AA:BB:CC:DD:EE:FF) doesn't match the specified MAC (-h).
	ifconfig wlan0mon hw ether AA:BB:CC:DD:EE:FF
10:30:15  Waiting for beacon frame (BSSID: AA:BB:CC:DD:EE:FF) on channel 6
10:30:16  Sending 64 directed DeAuth (code 7). STMAC: [12:34:56:78:90:AB] [0|0 ACKs]
10:30:17  Sending 64 directed DeAuth (code 7). STMAC: [12:34:56:78:90:AB] [0|0 ACKs]
10:30:18  Sending 64 directed DeAuth (code 7). STMAC: [12:34:56:78:90:AB] [0|0 ACKs]`;
        }
        return `The interface MAC (AA:BB:CC:DD:EE:FF) doesn't match the specified MAC (-h).
	ifconfig wlan0mon hw ether AA:BB:CC:DD:EE:FF
10:30:15  Waiting for beacon frame (BSSID: AA:BB:CC:DD:EE:FF) on channel 6
10:30:16  Saving ARP requests in replay_arp-0115-103016.cap
10:30:16  You should also start airodump-ng to capture replies.
10:30:17  Read 1 packet (got 1 ARP requests), sent 1 packets...`;
    },

    'wifite': () => `
 .;'                     ';,
,;'  ,;' ,;' ,;' ,;' ,;'  ';,
;'   ;'  ;'  ;'  ;'  ;'   ';
'    '   '   '   '   '    '
 WiFite v2.5.8

 [+] option: targeting WPA-encrypted networks
 [+] option: targeting WEP-encrypted networks  
 [+] option: targeting WPS-enabled networks

   NUM                      ESSID   CH  ENCR  POWER  WPS?  CLIENT
   ---  -------------------------  ---  ----  -----  ----  ------
     1                TargetNetwork    6  WPA2    30%   wps       
     2                     HomeWiFi   11  WPA2    45%    no       
     3                    OldRouter    1   WEP    60%    no       

 [+] select target(s) (1-3) separated by commas, dashes or all: `,

    'kismet': () => `Kismet 2022-08-R1 LINUX
Starting Kismet...
Configuring data sources...
Opening data source 'wlan0'
Detected chipset: Intel 8265
Starting channel hopping on wlan0
Web interface available at http://localhost:2501
Logging to kismet-20240115-103000.kismet
Found 3 networks, 2 clients
Capturing packets...`,

    'bettercap': () => `bettercap v2.32.0 (built for linux amd64 with go1.19.1)

[10:30:00] [sys.log] [inf] bettercap starting ...
[10:30:00] [wifi] [inf] WiFi interface wlan0 set to monitor mode
[10:30:00] [wifi] [inf] WiFi recon started
[10:30:01] [wifi] [inf] new AP AA:BB:CC:DD:EE:FF (TargetNetwork) detected on channel 6, encryption WPA2
[10:30:02] [wifi] [inf] new AP 11:22:33:44:55:66 (HomeWiFi) detected on channel 11, encryption WPA2
[10:30:03] [wifi] [inf] new client 12:34:56:78:90:AB associated to AA:BB:CC:DD:EE:FF

» help wifi`
};