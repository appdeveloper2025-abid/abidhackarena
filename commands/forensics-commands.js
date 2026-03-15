// Forensics Commands
const forensicsCommands = {
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
0xfffffa8002abc040 cmd.exe                2384   1484      1       21      1      0 2024-01-15 10:20:15`,

    autopsy: () => `Autopsy 4.19.3 - Digital Forensics Platform
Starting Autopsy...
Creating new case...
Adding data source...
Running ingest modules...
- File Type Identification
- Extension Mismatch Detector
- Embedded File Extractor
- EXIF Parser
- Hash Lookup
- Keyword Search
- Email Parser
- Recent Activity
Analysis complete. Results available in GUI.`,

    binwalk: (args) => {
        const file = args[0] || 'firmware.bin';
        return `DECIMAL       HEXADECIMAL     DESCRIPTION
--------------------------------------------------------------------------------
0             0x0             uImage header, header size: 64 bytes, header CRC: 0x12345678, created: 2024-01-15 10:30:00, image size: 2097152 bytes, Data Address: 0x80000000, Entry Point: 0x80000000, data CRC: 0x87654321, OS: Linux, CPU: MIPS, image type: OS Kernel Image, compression type: lzma, image name: "Linux Kernel Image"
64            0x40            LZMA compressed data, properties: 0x5D, dictionary size: 33554432 bytes, uncompressed size: 4194304 bytes
1048576       0x100000        Squashfs filesystem, little endian, version 4.0, compression:xz, size: 1048576 bytes, 256 inodes, blocksize: 131072 bytes, created: 2024-01-15 10:30:00`;
    },

    strings: (args) => {
        const file = args[0] || 'binary';
        return `admin
password
root
/bin/bash
/etc/passwd
127.0.0.1
localhost
HTTP/1.1
Content-Type
application/json
secret_key_123
database_password
config.ini
debug_mode=true
api_endpoint=https://api.example.com
user_agent=Mozilla/5.0`;
    },

    hexdump: (args) => {
        const file = args[0] || 'data.bin';
        return `00000000  7f 45 4c 46 02 01 01 00  00 00 00 00 00 00 00 00  |.ELF............|
00000010  02 00 3e 00 01 00 00 00  60 10 40 00 00 00 00 00  |..>.....`.@.....|
00000020  40 00 00 00 00 00 00 00  88 1f 00 00 00 00 00 00  |@...............|
00000030  00 00 00 00 40 00 38 00  09 00 40 00 1e 00 1b 00  |....@.8...@.....|
00000040  06 00 00 00 05 00 00 00  40 00 00 00 00 00 00 00  |........@.......|
00000050  40 00 40 00 00 00 00 00  40 00 40 00 00 00 00 00  |@.@.....@.@.....|
00000060  f8 01 00 00 00 00 00 00  f8 01 00 00 00 00 00 00  |................|
00000070  08 00 00 00 00 00 00 00  03 00 00 00 04 00 00 00  |................|`;
    },

    'file': (args) => {
        const filename = args[0] || 'unknown';
        const extensions = {
            '.exe': 'PE32 executable (console) Intel 80386, for MS Windows',
            '.pdf': 'PDF document, version 1.4',
            '.jpg': 'JPEG image data, JFIF standard 1.01',
            '.png': 'PNG image data, 1920 x 1080, 8-bit/color RGBA, non-interlaced',
            '.zip': 'Zip archive data, at least v2.0 to extract',
            '.txt': 'ASCII text',
            '.bin': 'data'
        };
        
        const ext = filename.substring(filename.lastIndexOf('.'));
        return `${filename}: ${extensions[ext] || 'data'}`;
    },

    exiftool: (args) => {
        const file = args[0] || 'image.jpg';
        return `ExifTool Version Number         : 12.40
File Name                       : ${file}
Directory                       : /root
File Size                       : 2.1 MiB
File Modification Date/Time     : 2024:01:15 10:30:00-05:00
File Access Date/Time           : 2024:01:15 10:30:00-05:00
File Creation Date/Time         : 2024:01:15 10:30:00-05:00
File Permissions                : rw-r--r--
File Type                       : JPEG
File Type Extension             : jpg
MIME Type                       : image/jpeg
Image Width                     : 1920
Image Height                    : 1080
Encoding Process                : Baseline DCT, Huffman coding
Bits Per Sample                 : 8
Color Components                : 3
Y Cb Cr Sub Sampling            : YCbCr4:2:0 (2 2)
Camera Make                     : Canon
Camera Model Name               : EOS 5D Mark IV
Create Date                     : 2024:01:15 10:30:00
GPS Latitude                    : 40 deg 45' 0.00" N
GPS Longitude                   : 73 deg 59' 0.00" W
GPS Position                    : 40 deg 45' 0.00" N, 73 deg 59' 0.00" W`;
    },

    foremost: (args) => {
        const file = args[0] || 'disk.img';
        return `Foremost version 1.5.7 by Jesse Kornblum, Kris Kendall, and Nick Mikus
Audit File

Foremost started at Mon Jan 15 10:30:00 2024
Invocation: foremost -i ${file}
Output directory: /root/output
Configuration file: /etc/foremost.conf
------------------------------------------------------------------
File: ${file}
Start: Mon Jan 15 10:30:00 2024
Length: 1 GB (1073741824 bytes)

Num	 Name (bs=512)	       Size	 File Offset	 Comment 

0:	00000001.jpg	      45 KB 	        512 	 
1:	00000002.pdf	     156 KB 	      92672 	 
2:	00000003.zip	     234 KB 	     411648 	 
3:	00000004.doc	      89 KB 	     890880 	 

Finish: Mon Jan 15 10:30:15 2024

4 FILES EXTRACTED
	
jpg:= 1
pdf:= 1  
zip:= 1
doc:= 1
------------------------------------------------------------------`;
    },

    'bulk_extractor': (args) => {
        const image = args[0] || 'disk.img';
        return `bulk_extractor version: 1.6.0
Input file: ${image}
Output directory: /root/bulk_out
Disk Size: 1073741824
Threads: 4

Phase 1: Scanning...
Phase 2: Extracting features...

=== FEATURE FILES CREATED ===
ccn.txt - Credit card numbers (12 found)
email.txt - Email addresses (45 found)  
ip.txt - IP addresses (23 found)
telephone.txt - Phone numbers (8 found)
url.txt - URLs (156 found)
wordlist.txt - Dictionary words (2341 found)

=== SUMMARY ===
Total features extracted: 2585
Processing time: 15 seconds
Extraction complete.`;
    }
};