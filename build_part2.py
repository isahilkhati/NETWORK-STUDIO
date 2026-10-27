# -*- coding: utf-8 -*-
import json

def get_ch07_to_ch14():
    return [
        # CH 07
        {
            "id": "07",
            "module": "02 / MODELS AND THE LOCAL LINK",
            "title": "L1 & L2: the local wire",
            "desc": "Explore MAC addresses, Ethernet frames, ARP, and local network attacks.",
            "screensCount": 7,
            "sourceRange": "SOURCE 30-36",
            "simulator": "arp-poisoning-sim",
            "badge": "Local Wire Security",
            "screens": [
                {
                    "screenNumber": 1,
                    "globalSource": 30,
                    "title": "MAC Addresses: Hardware Identity",
                    "summary": "48 bits, Organizationally Unique Identifier (OUI), and why physical addresses are easily spoofed.",
                    "concept": "A Media Access Control (MAC) address is a 48-bit (6-byte) hexadecimal identifier burned into a Network Interface Card (NIC), e.g., 00:1A:2B:3C:4D:5E:\n- First 24 bits (3 bytes): Organizationally Unique Identifier (OUI) assigned by IEEE to the manufacturer (e.g., Apple, Intel, Cisco).\n- Last 24 bits (3 bytes): Network Interface Controller specific serial assigned by the vendor.\n- MAC addresses operate strictly within the local Layer 2 broadcast domain.",
                    "cyberLens": {
                        "offensive": "MAC Spoofing: Attackers spoof legitimate device MACs (such as an approved corporate laptop or VoIP phone) to bypass 802.1X Network Access Control (NAC) or captive portal authentication filters.",
                        "defensive": "Enterprise 802.1X uses certificate-based EAP-TLS authentication rather than trusting raw MAC addresses."
                    },
                    "keyPoints": [
                        "MAC addresses are physically etched on NICs, but operating systems can overwrite them in RAM at will.",
                        "OUIs reveal the vendor and hardware type during passive network reconnaissance.",
                        "MAC address filtering is not a security boundary; it is merely a minor speed bump."
                    ],
                    "quiz": {
                        "question": "What part of a 48-bit MAC address identifies the manufacturer of the network hardware?",
                        "options": [
                            "The last 24 bits",
                            "The first 24 bits (Organizationally Unique Identifier / OUI)",
                            "The default gateway IP",
                            "The CRC checksum"
                        ],
                        "answer": 1,
                        "explanation": "The first 3 bytes (24 bits) are the OUI allocated by the IEEE to identify the specific hardware manufacturer."
                    }
                },
                {
                    "screenNumber": 2,
                    "globalSource": 31,
                    "title": "The Ethernet II Frame Anatomy",
                    "summary": "Preamble, SFD, Destination MAC, Source MAC, EtherType, Payload, and FCS.",
                    "concept": "The standard Ethernet II frame consists of:\n1. Preamble (7 bytes) & Start Frame Delimiter (1 byte): Synchronizes receiver clock.\n2. Destination MAC (6 bytes): Where the frame goes on the local link.\n3. Source MAC (6 bytes): Who sent the frame.\n4. EtherType (2 bytes): Identifies upper-layer protocol (0x0800 = IPv4, 0x86DD = IPv6, 0x0806 = ARP).\n5. Payload (46 to 1500 bytes): The MTU containing the L3 IP packet.\n6. Frame Check Sequence (FCS) / CRC32 (4 bytes): Mathematical integrity verification.",
                    "cyberLens": {
                        "offensive": "Frame Padding Leakage: If an Ethernet payload is smaller than 46 bytes, the OS pads it. Vulnerable legacy operating systems padded with uninitialized kernel RAM, leaking memory contents onto the wire.",
                        "defensive": "Switches drop frames with FCS CRC errors before forwarding them, preventing corrupted packets from wasting bandwidth."
                    },
                    "keyPoints": [
                        "Minimum Ethernet frame size is 64 bytes (including 14B header + 46B payload + 4B FCS).",
                        "Standard Maximum Transmission Unit (MTU) is 1500 bytes.",
                        "EtherType lets the OS multiplex multiple L3 protocols across the same physical NIC."
                    ],
                    "quiz": {
                        "question": "What is the standard maximum payload size (MTU) for a default Ethernet II frame without Jumbo Frames enabled?",
                        "options": [
                            "64 bytes",
                            "1500 bytes",
                            "9000 bytes",
                            "65535 bytes"
                        ],
                        "answer": 1,
                        "explanation": "Standard Ethernet has an MTU of 1500 bytes. Datagrams exceeding 1500 bytes must be fragmented at Layer 3 or use Jumbo Frames (up to 9000 bytes) in data centers."
                    }
                },
                {
                    "screenNumber": 3,
                    "globalSource": 32,
                    "title": "Address Resolution Protocol (ARP) Deep Dive",
                    "summary": "Mapping Layer 3 IP addresses to Layer 2 MAC addresses on the local wire.",
                    "concept": "Computers communicate using IP addresses, but physical network switches only understand MAC addresses. ARP bridges this gap:\n1. ARP Request: 'Who has 192.168.1.1? Tell 192.168.1.50' sent as a Layer 2 Broadcast (FF:FF:FF:FF:FF:FF).\n2. Every host on the subnet receives the broadcast.\n3. The host owning 192.168.1.1 responds with an ARP Reply: '192.168.1.1 is at 00:0c:29:ab:cd:ef' sent as a Layer 2 Unicast.\n4. Both hosts cache the mapping in their local ARP Table (viewable with `arp -a`).",
                    "cyberLens": {
                        "offensive": "Gratuitous ARP: Devices can broadcast an unsolicited ARP reply to announce their MAC. Attackers abuse gratuitous ARPs to inject fake entries into victims' caches without any prior request.",
                        "defensive": "Dynamic ARP Inspection (DAI) on managed switches inspects ARP packets against a trusted DHCP Snooping binding database, dropping forged ARP replies."
                    },
                    "keyPoints": [
                        "ARP operates between Layer 2 and Layer 3.",
                        "ARP requests are broadcast; ARP replies are unicast.",
                        "ARP has NO authentication; devices trust whatever reply arrives last."
                    ],
                    "quiz": {
                        "question": "Why is an ARP Request sent as a broadcast frame (FF:FF:FF:FF:FF:FF)?",
                        "options": [
                            "Because the sender does not yet know the destination MAC address.",
                            "Because the router requires all packets to be broadcasts.",
                            "Because ARP is an encrypted protocol.",
                            "Because Wi-Fi does not support unicast."
                        ],
                        "answer": 0,
                        "explanation": "The entire reason for sending an ARP request is that the sender only knows the IP address and needs to discover the corresponding MAC address. Therefore, it must broadcast to all nodes."
                    }
                },
                {
                    "screenNumber": 4,
                    "globalSource": 33,
                    "title": "ARP Cache Poisoning & Man-in-the-Middle (MITM)",
                    "summary": "The devastating vulnerability at the heart of local area networks.",
                    "concept": "Because ARP is stateless and unauthenticated, a device accepts any ARP reply even if it never sent an ARP request:\n1. Attacker sends forged ARP reply to Victim: 'Gateway 192.168.1.1 is at Attacker MAC'.\n2. Attacker sends forged ARP reply to Gateway: 'Victim 192.168.1.50 is at Attacker MAC'.\n3. Victim's traffic to Internet flows through Attacker.\n4. Gateway's traffic to Victim flows through Attacker.\n5. Attacker enables IP forwarding (`sysctl -w net.ipv4.ip_forward=1`), inspects/modifies packets, and forwards them unnoticed.",
                    "cyberLens": {
                        "offensive": "Tools like `arpspoof`, `bettercap`, and `Ettercap` automate bidirectional ARP poisoning in seconds, enabling credential sniffing, session hijacking, and DNS redirection.",
                        "defensive": "Enable Dynamic ARP Inspection (DAI) and DHCP Snooping on all access switch ports. Configure static ARP entries for critical servers."
                    },
                    "keyPoints": [
                        "ARP poisoning turns a switched network into an eavesdropper's hub.",
                        "Victims show duplicate MAC addresses for both the router and the attacker in `arp -a`.",
                        "Combined with SSL stripping, ARP poisoning can downgrade HTTPS to cleartext HTTP."
                    ],
                    "quiz": {
                        "question": "What command-line observation on a victim machine strongly indicates an ongoing ARP poisoning attack?",
                        "options": [
                            "The CPU usage drops to 0%.",
                            "Running `arp -a` reveals that two different IP addresses (e.g. Default Gateway and a workstation) share the exact same MAC address.",
                            "The DNS server address changes to 127.0.0.1.",
                            "The ping command returns 'host unreachable'."
                        ],
                        "answer": 1,
                        "explanation": "When an attacker poisons the ARP cache, both the default gateway IP and the attacker's own IP will map to the attacker's single physical MAC address."
                    }
                },
                {
                    "screenNumber": 5,
                    "globalSource": 34,
                    "title": "MAC Flooding & CAM Table Exhaustion",
                    "summary": "Forcing intelligent switches into 'fail-open' broadcast mode.",
                    "concept": "Switch Content Addressable Memory (CAM) tables have finite capacity (typically 8,000 to 128,000 entries):\n1. Attacker runs `macof` to generate tens of thousands of fake Ethernet frames with random source MACs every second.\n2. The CAM table fills to capacity within seconds.\n3. When new legitimate frames arrive, the switch has no memory space to learn their ports or find destinations.\n4. Fail-Open Behavior: The switch reverts to hub-like behavior, flooding all incoming unicast traffic out every port, allowing the attacker to passively sniff all conversations on the switch.",
                    "cyberLens": {
                        "offensive": "CAM exhaustion disables the microsegmentation benefit of switches without needing to target specific host IPs.",
                        "defensive": "Cisco Port Security: Limit MAC count per port (e.g. `switchport port-security maximum 2`) with violation mode set to `restrict` or `shutdown`."
                    },
                    "keyPoints": [
                        "CAM table maps MAC -> Port.",
                        "Overflow causes unknown unicast flooding.",
                        "Port security shuts down the port when an anomaly is detected."
                    ],
                    "quiz": {
                        "question": "Which switch security feature is specifically designed to neutralize MAC flooding attacks?",
                        "options": [
                            "Spanning Tree Protocol (STP)",
                            "Port Security with MAC address limits",
                            "Jumbo Frame enablement",
                            "VLAN Trunking Protocol (VTP)"
                        ],
                        "answer": 1,
                        "explanation": "Port Security enforces a strict limit on how many MAC addresses can be learned on a single physical switch port, disabling the port if thousands of random MACs arrive."
                    }
                },
                {
                    "screenNumber": 6,
                    "globalSource": 35,
                    "title": "VLANs & VLAN Hopping Attacks",
                    "summary": "Logical subnetting at Layer 2 with 802.1Q tags and trunk encapsulation exploitation.",
                    "concept": "Virtual Local Area Networks (VLANs) logically segment a physical switch into multiple isolated broadcast domains:\n- Access Ports: Carry untagged frames belonging to one specific VLAN.\n- Trunk Ports: Carry frames for multiple VLANs using IEEE 802.1Q tags (inserting a 4-byte tag with a 12-bit VLAN ID, supporting up to 4094 VLANs).\nVLAN Hopping Exploits:\n1. Switch Spoofing: Attacker configures host NIC to negotiate DTP (Dynamic Trunking Protocol) as a trunk, gaining access to all VLANs.\n2. Double Tagging: Attacker sends frame with two 802.1Q tags. First switch strips native VLAN tag; second switch sees internal tag and forwards to victim VLAN (unidirectional).",
                    "cyberLens": {
                        "offensive": "VLAN hopping allows an attacker in an untrusted Guest Wi-Fi VLAN to jump into a protected Management or Payment Card (PCI-DSS) VLAN.",
                        "defensive": "Disable DTP on all user ports (`switchport nonegotiate`), set all user ports to `mode access`, and assign an unused non-default Native VLAN."
                    },
                    "keyPoints": [
                        "VLAN 1 is the default native VLAN on Cisco switches and must never be used for user data.",
                        "Double tagging only works if the attacker belongs to the native VLAN of the trunk link.",
                        "Trunk links must only connect switch-to-switch or switch-to-router."
                    ],
                    "quiz": {
                        "question": "How does an attacker prevent switch spoofing on user-facing switch ports?",
                        "options": [
                            "Set the port mode explicitly to access and disable Dynamic Trunking Protocol (DTP).",
                            "Increase the cable length.",
                            "Use fiber instead of copper.",
                            "Disable IPv6."
                        ],
                        "answer": 0,
                        "explanation": "By explicitly configuring `switchport mode access` and `switchport nonegotiate`, the switch will reject any attempt by an attacker to negotiate an 802.1Q trunk link."
                    }
                },
                {
                    "screenNumber": 7,
                    "globalSource": 36,
                    "title": "Layer 2 Hardening: The Defensive Blueprint",
                    "summary": "Integrating Port Security, DHCP Snooping, DAI, and 802.1X into an impenetrable Layer 2 defense.",
                    "concept": "To completely eliminate local link attacks, modern enterprise switches employ a synchronized 4-pillar defense:\n1. 802.1X Network Access Control (NAC): No device gets network access without authenticating via RADIUS.\n2. DHCP Snooping: Distinguishes trusted uplink ports from untrusted user ports, preventing rogue DHCP servers and building an IP-MAC-Port binding database.\n3. Dynamic ARP Inspection (DAI): Uses the DHCP Snooping database to validate every ARP frame; forged ARPs are dropped instantly.\n4. IP Source Guard (IPSG): Drops any IP packet whose source IP does not match the learned DHCP Snooping binding table.",
                    "cyberLens": {
                        "offensive": "Red teams running initial drop boxes or plugging into office wall jacks are immediately neutralized if 802.1X and DAI are active.",
                        "defensive": "This four-layer defense (802.1X + Snooping + DAI + IPSG) shuts down ARP poisoning, MAC flooding, rogue DHCP servers, and IP spoofing permanently."
                    },
                    "keyPoints": [
                        "Layer 2 defenses must be deployed together; DAI requires DHCP Snooping to function.",
                        "Never leave unused switch ports active; administratively shut them down and place in a dead VLAN.",
                        "Real-world cyber defense starts at the physical switch port."
                    ],
                    "quiz": {
                        "question": "Which security feature provides the database of valid IP-to-MAC bindings required for Dynamic ARP Inspection (DAI) to work?",
                        "options": [
                            "DHCP Snooping",
                            "Spanning Tree Protocol",
                            "DNS Forwarder",
                            "BGP"
                        ],
                        "answer": 0,
                        "explanation": "DAI inspects ARP packets against the DHCP Snooping binding database. Without DHCP Snooping enabled, DAI does not know which IP legitimately belongs to which MAC."
                    }
                }
            ]
        },

        # CH 08
        {
            "id": "08",
            "module": "03 / ADDRESSING AND TRANSPORT",
            "title": "L3: IP addressing",
            "desc": "Build an IPv4 address from bits and recognise public, private, and special ranges.",
            "screensCount": 5,
            "sourceRange": "SOURCE 37-41",
            "simulator": "ip-binary-converter",
            "badge": "Logical Addressing",
            "screens": [
                {
                    "screenNumber": 1,
                    "globalSource": 37,
                    "title": "IPv4 Structure & The Binary Reality",
                    "summary": "32 bits, 4 octets, positional notation, and converting between binary and dotted-decimal.",
                    "concept": "An IPv4 address is a 32-bit binary number divided into four 8-bit groups called octets:\n`11000000 . 10101000 . 00000001 . 00000001` -> `192.168.1.1`\nEach octet has 8 bit positions with decimal values: 128, 64, 32, 16, 8, 4, 2, 1.\nTotal IPv4 address space is 2^32 = 4,294,967,296 addresses.",
                    "cyberLens": {
                        "offensive": "IP Obfuscation: Web browsers and command-line tools can parse IPv4 addresses formatted as pure integers (`http://2130706433` = `127.0.0.1`), hex (`0x7f000001`), or octal (`0177.0.0.1`) to bypass naive regex security filters.",
                        "defensive": "Security filters and SIEM rules must normalize alternative IP representations into standard canonical dotted-decimal format before evaluation."
                    },
                    "keyPoints": [
                        "Computers process IP addresses purely as 32-bit unsigned integers.",
                        "Dotted-decimal notation is strictly for human readability.",
                        "Understanding binary bit values is essential for subnetting."
                    ],
                    "quiz": {
                        "question": "What is the decimal equivalent of the binary octet 11001000?",
                        "options": [
                            "192",
                            "200",
                            "216",
                            "224"
                        ],
                        "answer": 1,
                        "explanation": "Bit weights: 128(1) + 64(1) + 32(0) + 16(0) + 8(1) + 4(0) + 2(0) + 1(0) = 128 + 64 + 8 = 200."
                    }
                },
                {
                    "screenNumber": 2,
                    "globalSource": 38,
                    "title": "Historical Classful Addressing (A, B, C, D, E)",
                    "summary": "The legacy system that divided the internet before CIDR took over.",
                    "concept": "Originally, IP was divided into five rigid classes determined by leading bits:\n- Class A: 0.0.0.0 to 127.255.255.255 (Leading bit `0`). Default mask `/8` (255.0.0.0). 16,777,214 hosts per network.\n- Class B: 128.0.0.0 to 191.255.255.255 (Leading bits `10`). Default mask `/16` (255.255.0.0). 65,534 hosts.\n- Class C: 192.0.0.0 to 223.255.255.255 (Leading bits `110`). Default mask `/24` (255.255.255.0). 254 hosts.\n- Class D: 224.0.0.0 to 239.255.255.255 (Leading bits `1110`). Multicast groups.\n- Class E: 240.0.0.0 to 255.255.255.255 (Leading bits `1111`). Experimental/Reserved.",
                    "cyberLens": {
                        "offensive": "Early organizations (like IBM, Apple, MIT) were assigned entire Class A blocks (/8), meaning a single company owned 16.7 million public IPs, creating massive target surfaces.",
                        "defensive": "Classful routing is obsolete; modern networks use Classless Inter-Domain Routing (CIDR) to allocate address blocks with arbitrary prefix lengths."
                    },
                    "keyPoints": [
                        "Classful addressing wasted billions of addresses, leading to rapid IPv4 exhaustion.",
                        "Class D multicast addresses (224.0.0.0/4) are used for routing updates and streaming.",
                        "Leading bits determine the legacy class."
                    ],
                    "quiz": {
                        "question": "Which legacy class does the IP address 172.20.10.5 belong to?",
                        "options": [
                            "Class A",
                            "Class B",
                            "Class C",
                            "Class D"
                        ],
                        "answer": 1,
                        "explanation": "Class B spans from 128.0.0.0 to 191.255.255.255. Therefore, 172.x.x.x is a legacy Class B address."
                    }
                },
                {
                    "screenNumber": 3,
                    "globalSource": 39,
                    "title": "RFC 1918 Private IP Ranges",
                    "summary": "Non-routable internal IP blocks and the cornerstone of enterprise security.",
                    "concept": "RFC 1918 reserved three private address blocks for internal networks that are NEVER routed over the public Internet:\n1. 10.0.0.0/8 (10.0.0.0 to 10.255.255.255): 1 single Class A equivalent (16.7M addresses). Standard for large enterprise data centers.\n2. 172.16.0.0/12 (172.16.0.0 to 172.31.255.255): 16 contiguous Class B equivalents (1M addresses).\n3. 192.168.0.0/16 (192.168.0.0 to 192.168.255.255): 256 contiguous Class C equivalents (65,536 addresses). Standard for home and SOHO networks.",
                    "cyberLens": {
                        "offensive": "Internal Reconnaissance: If an attacker compromises a web application that interacts with internal services (SSRF - Server-Side Request Forgery), targeting RFC 1918 IPs (e.g., `http://10.0.0.1/admin`) accesses unauthenticated internal microservices.",
                        "defensive": "Bogon Filtering: Perimeter edge routers must drop any inbound traffic claiming a source IP from RFC 1918 ranges, as these represent IP spoofing attacks."
                    },
                    "keyPoints": [
                        "Internet Service Providers (ISPs) drop RFC 1918 packets by design.",
                        "Private networks require Network Address Translation (NAT) to access the public Internet.",
                        "Bogon / Martian filters protect enterprise borders from fake internal traffic."
                    ],
                    "quiz": {
                        "question": "Which of the following IP addresses is a publicly routable Internet IP and NOT an RFC 1918 private address?",
                        "options": [
                            "10.50.100.1",
                            "172.25.1.99",
                            "192.168.10.1",
                            "172.35.10.5"
                        ],
                        "answer": 3,
                        "explanation": "RFC 1918 covers 172.16.0.0 through 172.31.255.255. The address 172.35.10.5 is outside this range and is therefore a public Internet IP address."
                    }
                },
                {
                    "screenNumber": 4,
                    "globalSource": 40,
                    "title": "Special-Purpose & Reserved IPv4 Ranges",
                    "summary": "Loopback, APIPA, Broadcast, Carrier-Grade NAT, and multicast definitions.",
                    "concept": "- 127.0.0.0/8 (Loopback): Routes internally inside the host kernel without touching the physical network card (`127.0.0.1` = `localhost`).\n- 169.254.0.0/16 (APIPA / Link-Local): Auto-assigned by OS when DHCP server fails to respond.\n- 100.64.0.0/10 (Shared Address Space / CGNAT): Used by ISPs for Carrier-Grade NAT.\n- 0.0.0.0/0: Represents 'any IP' or default route in routing tables.\n- 255.255.255.255: Limited broadcast address (stays within local link).",
                    "cyberLens": {
                        "offensive": "Cloud Metadata API Exploitation: Cloud providers (AWS, GCP, Azure, DigitalOcean) host local instance metadata services at `http://169.254.169.254`. An SSRF vulnerability targeting this link-local IP allows attackers to steal cloud IAM credentials and tokens!",
                        "defensive": "Enforce IMDSv2 (requiring token-based headers) and configure host egress firewall rules to block non-root access to `169.254.169.254`."
                    },
                    "keyPoints": [
                        "APIPA (169.254.x.x) means DHCP failed and the device cannot reach the gateway.",
                        "169.254.169.254 is the most famous link-local IP in cloud security.",
                        "The entire 127.0.0.0/8 block (16.7M IPs) loops back to local host."
                    ],
                    "quiz": {
                        "question": "Why is the IP address 169.254.169.254 of immense interest to cybersecurity penetration testers targeting AWS cloud environments?",
                        "options": [
                            "It is the main Google search engine IP.",
                            "It hosts the AWS Instance Metadata Service (IMDS), which can leak temporary IAM role access keys via SSRF.",
                            "It is the default password for all Cisco routers.",
                            "It shuts down the cloud datacenter."
                        ],
                        "answer": 1,
                        "explanation": "In AWS EC2, querying http://169.254.169.254/latest/meta-data/iam/security-credentials/ returns AWS IAM role secret keys if SSRF is present."
                    }
                },
                {
                    "screenNumber": 5,
                    "globalSource": 41,
                    "title": "Public IP Allocation & The RIR System",
                    "summary": "How IANA, ARIN, RIPE, APNIC, AFRINIC, and LACNIC manage global IP space and ASN numbers.",
                    "concept": "The Internet Assigned Numbers Authority (IANA) allocates large IP blocks to five Regional Internet Registries (RIRs):\n- ARIN: North America\n- RIPE NCC: Europe, Middle East, Central Asia\n- APNIC: Asia-Pacific\n- AFRINIC: Africa\n- LACNIC: Latin America & Caribbean\nOrganizations receive Autonomous System Numbers (ASNs) to announce their IP prefixes via Border Gateway Protocol (BGP).",
                    "cyberLens": {
                        "offensive": "OSINT & Attack Surface Mapping: WHOIS queries, ARIN lookups, and ASN IP range enumeration (e.g., using `amass` or `bgp.he.net`) reveal all public IP blocks owned by an enterprise target.",
                        "defensive": "Resource Public Key Infrastructure (RPKI): Cryptographically signs BGP route origin authorizations (ROAs) to prevent unauthorized ASNs from hijacking enterprise IP prefixes."
                    },
                    "keyPoints": [
                        "IANA delegates IP blocks to regional RIRs.",
                        "An ASN is required to participate in global BGP routing.",
                        "WHOIS and ASN mapping are the first steps of reconnaissance."
                    ],
                    "quiz": {
                        "question": "Which regional registry (RIR) manages IP address allocations for Europe, the Middle East, and parts of Central Asia?",
                        "options": [
                            "ARIN",
                            "APNIC",
                            "RIPE NCC",
                            "LACNIC"
                        ],
                        "answer": 2,
                        "explanation": "RIPE NCC (Réseaux IP Européens Network Coordination Centre) is the RIR for Europe, the Middle East, and parts of Central Asia."
                    }
                }
            ]
        },

        # CH 09
        {
            "id": "09",
            "module": "03 / ADDRESSING AND TRANSPORT",
            "title": "L3: subnetting & CIDR",
            "desc": "Use prefix lengths to find network boundaries, host ranges, and scan scope.",
            "screensCount": 6,
            "sourceRange": "SOURCE 42-47",
            "simulator": "cidr-subnet-calc",
            "badge": "Subnetting Master",
            "screens": [
                {
                    "screenNumber": 1,
                    "globalSource": 42,
                    "title": "The Purpose of Subnetting",
                    "summary": "Controlling broadcast domains, conserving address space, and creating security boundaries.",
                    "concept": "Subnetting divides a single large network into smaller, logically isolated sub-networks:\n1. Performance: Restricts broadcast traffic to smaller domains, preventing network congestion.\n2. Security: Isolates sensitive databases, servers, and payment processors into separate subnets from guest Wi-Fi and general user workstations.\n3. Routing Efficiency: Enables route summarization (aggregation), reducing the size of global routing tables.",
                    "cyberLens": {
                        "offensive": "Subnet Enumeration: Attackers use ping sweeps (`nmap -sn 192.168.1.0/24`) to identify active hosts in a subnet before scanning open ports.",
                        "defensive": "Microsegmentation: Placing high-value systems in isolated /28 or /29 subnets with firewall inspection rules governing inter-subnet traffic."
                    },
                    "keyPoints": [
                        "Subnetting turns a flat network into a structured hierarchy.",
                        "Inter-subnet traffic MUST pass through a Layer 3 router or firewall.",
                        "Shrinking subnets limits lateral movement of malware."
                    ],
                    "quiz": {
                        "question": "Why does placing servers and workstations on separate subnets enhance network security?",
                        "options": [
                            "It makes computer screens turn off faster.",
                            "Traffic between different subnets must pass through a router/firewall, where access control lists (ACLs) can filter and inspect packets.",
                            "Subnetting makes Wi-Fi passwords obsolete.",
                            "Workstations cannot send IP packets."
                        ],
                        "answer": 1,
                        "explanation": "Because packets crossing subnet boundaries must be routed, security teams can place firewalls between subnets to enforce strict ACLs and inspect all inter-subnet communications."
                    }
                },
                {
                    "screenNumber": 2,
                    "globalSource": 43,
                    "title": "Classless Inter-Domain Routing (CIDR) Notation",
                    "summary": "Prefix lengths, subnet masks, and counting contiguous network bits.",
                    "concept": "CIDR notation specifies the number of leading binary '1' bits in the subnet mask:\n- `/24` = `11111111.11111111.11111111.00000000` = `255.255.255.0` (24 network bits, 8 host bits).\n- `/16` = `11111111.11111111.00000000.00000000` = `255.255.0.0` (16 network bits, 16 host bits).\n- `/28` = `11111111.11111111.11111111.11110000` = `255.255.255.240` (28 network bits, 4 host bits).",
                    "cyberLens": {
                        "offensive": "Scope Determination: A pen-testing Scope of Work defines authorized targets via CIDR (e.g. `10.20.0.0/22`). Scanning an IP outside the authorized CIDR prefix is a criminal violation (CFAA).",
                        "defensive": "Firewall rules use CIDR prefixes to define security zones (e.g., allow `10.10.5.0/24` to access `10.20.1.10/32` on port 443)."
                    },
                    "keyPoints": [
                        "CIDR prefix `/n` indicates the number of locked network bits.",
                        "Remaining `32 - n` bits are available for host addressing.",
                        "Total addresses in a `/n` prefix = 2^(32-n)."
                    ],
                    "quiz": {
                        "question": "What is the dotted-decimal subnet mask representation of a /26 CIDR prefix?",
                        "options": [
                            "255.255.255.0",
                            "255.255.255.128",
                            "255.255.255.192",
                            "255.255.255.224"
                        ],
                        "answer": 2,
                        "explanation": "A /26 prefix has 26 ones. The fourth octet has two ones: 11000000 in binary = 128 + 64 = 192. So the mask is 255.255.255.192."
                    }
                },
                {
                    "screenNumber": 3,
                    "globalSource": 44,
                    "title": "The Golden Subnetting Math Formula",
                    "summary": "Calculating Total Hosts, Usable Hosts, Network Address, and Broadcast Address.",
                    "concept": "For any subnet with `H` host bits (where H = 32 - prefix length):\n- Total Addresses = 2^H\n- Usable Host Addresses = 2^H - 2\nWhy minus 2?\n1. First address (all host bits 0) = Network ID (identifies the subnet itself).\n2. Last address (all host bits 1) = Broadcast Address (sends to all hosts on the subnet).\nExample for `/27`:\n- H = 32 - 27 = 5 host bits.\n- Total IPs = 2^5 = 32.\n- Usable Hosts = 32 - 2 = 30.",
                    "cyberLens": {
                        "offensive": "Reconnaissance Scope Math: Knowing CIDR math allows red teams to quickly estimate target size: `/24` = 254 hosts, `/20` = 4,094 hosts, `/16` = 65,534 hosts.",
                        "defensive": "Point-to-point router links use `/31` (RFC 3021, saves IPs without broadcast) or `/30` (4 IPs, 2 usable) to conserve valuable public addresses."
                    },
                    "keyPoints": [
                        "Network ID has all 0s in host portion.",
                        "Broadcast IP has all 1s in host portion.",
                        "Usable host range spans strictly between Network ID and Broadcast IP."
                    ],
                    "quiz": {
                        "question": "How many usable host IP addresses are available in a /28 subnet?",
                        "options": [
                            "16",
                            "14",
                            "30",
                            "6"
                        ],
                        "answer": 1,
                        "explanation": "In a /28 subnet: Host bits H = 32 - 28 = 4. Total IPs = 2^4 = 16. Usable hosts = 16 - 2 = 14."
                    }
                },
                {
                    "screenNumber": 4,
                    "globalSource": 45,
                    "title": "The Bitwise ANDing Operation: Local vs Remote",
                    "summary": "How a host determines whether to send to a local MAC or forward to the Default Gateway.",
                    "concept": "When Host A sends a packet to Destination IP, it must decide:\nIs Destination on my local subnet, or on a remote network?\nHow the kernel decides:\n1. Computes: `(My IP) AND (My Subnet Mask)` = My Network ID.\n2. Computes: `(Destination IP) AND (My Subnet Mask)` = Destination's Network ID in my mask.\n3. Comparison:\n   - If Match: Destination is LOCAL. Host sends ARP request for Destination's MAC.\n   - If Mismatch: Destination is REMOTE. Host sends ARP request for Default Gateway's MAC.",
                    "cyberLens": {
                        "offensive": "Subnet Mask Misconfiguration Exploits: If an administrator configures an overly broad mask (e.g., `/16` instead of `/24`), the host assumes remote hosts are local, sending ARP requests for remote public IPs and failing to communicate with the gateway.",
                        "defensive": "Host-level verification: Troubleshooting connectivity begins with verifying `ipconfig` or `ip a` subnet mask matches gateway configuration."
                    },
                    "keyPoints": [
                        "Bitwise AND rule: 1 AND 1 = 1, any other combination = 0.",
                        "Gateways are only used when the destination is outside the local subnet.",
                        "Local delivery uses destination MAC; remote delivery uses gateway MAC."
                    ],
                    "quiz": {
                        "question": "If Host A (192.168.1.10/24) wants to send a packet to 192.168.2.20, what destination MAC address does Host A place on the Layer 2 Ethernet frame?",
                        "options": [
                            "The MAC address of 192.168.2.20",
                            "The MAC address of Host A's Default Gateway router",
                            "FF:FF:FF:FF:FF:FF",
                            "00:00:00:00:00:00"
                        ],
                        "answer": 1,
                        "explanation": "Through bitwise ANDing, Host A sees that 192.168.2.20 is on a different subnet. Therefore, it must forward the frame to its Default Gateway's MAC address."
                    }
                },
                {
                    "screenNumber": 5,
                    "globalSource": 46,
                    "title": "Subnet Boundary & Magic Number Trick",
                    "summary": "The ultra-fast mental math method to calculate subnet ranges in seconds.",
                    "concept": "The 'Magic Number' is the increment (block size) between subnets:\n1. Identify interesting octet (the one where the mask is neither 255 nor 0).\n2. Magic Number = `256 - (Subnet Mask in interesting octet)`.\nExample for `192.168.1.75/26`:\n- Subnet mask: `255.255.255.192`.\n- Interesting octet is 4th octet: 192.\n- Magic Number = `256 - 192 = 64`.\n- Subnet blocks start at multiples of 64: 0, 64, 128, 192.\n- 75 falls between 64 and 127:\n  - Network Address: `192.168.1.64`\n  - First Usable Host: `192.168.1.65`\n  - Last Usable Host: `192.168.1.126`\n  - Broadcast Address: `192.168.1.127`.",
                    "cyberLens": {
                        "offensive": "Fast scope calculation during CTFs and live engagements allows you to immediately identify boundary IPs without waiting for subnet calculators.",
                        "defensive": "Prevent IP overlap: Overlapping subnets cause routing table conflicts and silent packet drops in enterprise routing."
                    },
                    "keyPoints": [
                        "Magic Number = 256 minus the mask octet value.",
                        "Subnet networks always begin at exact multiples of the Magic Number.",
                        "Broadcast is always one less than the next subnet network ID."
                    ],
                    "quiz": {
                        "question": "What is the broadcast address for the subnet containing host 10.0.0.50/29 (mask 255.255.255.248)?",
                        "options": [
                            "10.0.0.55",
                            "10.0.0.63",
                            "10.0.0.56",
                            "10.0.0.51"
                        ],
                        "answer": 0,
                        "explanation": "Magic number = 256 - 248 = 8. Multiples of 8: 0, 8, 16, 24, 32, 40, 48, 56. 50 falls in the block starting at 48. Next subnet starts at 56, so broadcast is 10.0.0.55."
                    }
                },
                {
                    "screenNumber": 6,
                    "globalSource": 47,
                    "title": "Subnetting for Enterprise Security Zones",
                    "summary": "Designing DMZs, Management VLANs, User subnets, and Zero-Trust microsegments.",
                    "concept": "A battle-tested enterprise subnet architecture isolates tiers:\n- DMZ (Demilitarized Zone) Subnet: Public-facing web/mail servers. Inbound from Internet allowed; outbound to internal strictly blocked.\n- Internal Server Subnet: Databases, Active Directory, application backends. Accessible only from DMZ via specific authorized ports.\n- Corporate Workstations Subnet: Employee laptops. Inbound from Internet blocked; outbound filtered via web proxy.\n- Management VLAN / Subnet: SSH/RDP/SNMP to switches, routers, firewalls. Isolated behind jump boxes and VPNs with MFA.",
                    "cyberLens": {
                        "offensive": "Pivot Attacks: If an attacker compromises a web server in the DMZ, a well-segmented network prevents direct connection to internal domain controllers.",
                        "defensive": "Egress Filtering: Blocking outbound connections from database subnets prevents reverse shell callbacks even if remote code execution (RCE) occurs."
                    },
                    "keyPoints": [
                        "Never mix public-facing servers and internal databases on the same subnet.",
                        "Management interfaces must live on a dedicated out-of-band subnet.",
                        "Default-deny firewall rules between all subnets enforce least privilege."
                    ],
                    "quiz": {
                        "question": "Why should a public-facing web server in a DMZ be strictly prohibited from initiating new outbound connections into the internal database subnet?",
                        "options": [
                            "Because web servers cannot send SQL queries.",
                            "If the web server is compromised, restricting outbound initiation prevents the attacker from pivoting laterally into the internal core network.",
                            "Because DMZ cables are one-way only.",
                            "To save internet bandwidth."
                        ],
                        "answer": 1,
                        "explanation": "By only allowing the database to respond to established sessions, or restricting connections strictly to the DB port from specific IPs, an attacker who obtains a shell on the DMZ web server cannot scan or pivot into the internal network."
                    }
                }
            ]
        },

        # CH 10
        {
            "id": "10",
            "module": "03 / ADDRESSING AND TRANSPORT",
            "title": "L3: header, ICMP & routing",
            "desc": "Read the IPv4 header and follow a packet through routing and fragmentation.",
            "screensCount": 5,
            "sourceRange": "SOURCE 48-52",
            "simulator": "ipv4-header-dissector",
            "badge": "Header & Routing",
            "screens": [
                {
                    "screenNumber": 1,
                    "globalSource": 48,
                    "title": "The IPv4 Header Bit-by-Bit",
                    "summary": "Dissecting the 20-byte standard header: Version, IHL, DSCP, Length, TTL, Protocol, and Checksum.",
                    "concept": "The standard IPv4 header contains minimum 20 bytes (up to 60 with options):\n1. Version (4 bits): Always 4 (0100) for IPv4.\n2. IHL (4 bits): Internet Header Length in 32-bit words (default 5 = 20 bytes).\n3. DSCP/ECN (8 bits): Quality of Service (QoS) and congestion notification.\n4. Total Length (16 bits): Entire packet size (header + data) in bytes (max 65,535).\n5. Identification (16 bits): Unique ID for reassembling fragmented packets.\n6. Flags (3 bits): Reserved (0), Don't Fragment (DF), More Fragments (MF).\n7. Fragment Offset (13 bits): Position of fragment in original datagram (in 8-byte units).\n8. Time to Live (TTL, 8 bits): Hop limit to prevent infinite loops (decremented by 1 at each router).\n9. Protocol (8 bits): Upper-layer protocol (1 = ICMP, 6 = TCP, 17 = UDP).\n10. Header Checksum (16 bits): Error checking for the header only.\n11. Source IP (32 bits) & Destination IP (32 bits).",
                    "cyberLens": {
                        "offensive": "TTL Fingerprinting: Operating systems set distinct initial TTL values (Linux/Android = 64, Windows = 128, Cisco/BSD = 255). Attackers determine victim OS remotely by observing TTL in ICMP/TCP replies.",
                        "defensive": "TTL Normalization / Scrubbing: Firewalls overwrite outgoing TTLs to standard values to prevent remote OS fingerprinting."
                    },
                    "keyPoints": [
                        "Minimum IPv4 header is 20 bytes (when IHL = 5).",
                        "Protocol field tells the OS whether to pass payload to TCP (6), UDP (17), or ICMP (1).",
                        "TTL decrements at every hop; at TTL = 0, the packet is discarded."
                    ],
                    "quiz": {
                        "question": "What is the Protocol field value in the IPv4 header for a TCP segment?",
                        "options": [
                            "1",
                            "6",
                            "17",
                            "80"
                        ],
                        "answer": 1,
                        "explanation": "Protocol numbers: 1 = ICMP, 6 = TCP, 17 = UDP. (80 is a TCP port number, not an IP protocol number)."
                    }
                },
                {
                    "screenNumber": 2,
                    "globalSource": 49,
                    "title": "Packet Fragmentation & Attack Exploits",
                    "summary": "Splitting datagrams across smaller MTUs and security evasion via tiny fragments.",
                    "concept": "When an IP packet exceeds the outgoing link MTU and the DF (Don't Fragment) flag is 0:\n1. The router fragments the packet into multiple smaller packets.\n2. Each fragment carries the same Identification number.\n3. The More Fragments (MF) flag is set to 1 for all fragments except the final one.\n4. Fragment Offset specifies the exact data offset (divided by 8).\n5. The destination host reassembles the fragments before passing to L4.",
                    "cyberLens": {
                        "offensive": "Fragmentation Evasion & Teardrop Attacks: Attackers craft overlapping or out-of-order fragment offsets to bypass stateless IDS/IPS or crash legacy OS kernels (Teardrop attack). Tiny Fragments split TCP headers across packets to hide port numbers.",
                        "defensive": "Virtual Reassembly: Modern Next-Gen Firewalls reassemble all IP fragments in memory before inspecting and forwarding them."
                    },
                    "keyPoints": [
                        "Fragmentation happens on routers; reassembly happens ONLY at the final destination.",
                        "If any single fragment is dropped, the entire packet must be retransmitted.",
                        "Path MTU Discovery (PMTUD) uses DF=1 to find the lowest MTU on the path."
                    ],
                    "quiz": {
                        "question": "What happens if a router needs to forward a 1500-byte packet onto an interface with an MTU of 1400 bytes, but the packet has the DF (Don't Fragment) flag set to 1?",
                        "options": [
                            "The router fragments the packet anyway.",
                            "The router drops the packet and sends an ICMP 'Destination Unreachable - Fragmentation Needed' message back to the sender.",
                            "The router increases its physical cable MTU.",
                            "The packet is converted to UDP."
                        ],
                        "answer": 1,
                        "explanation": "When DF=1, the router is explicitly forbidden from fragmenting. It drops the packet and notifies the sender using ICMP Type 3 Code 4 (Fragmentation Needed), enabling Path MTU Discovery."
                    }
                },
                {
                    "screenNumber": 3,
                    "globalSource": 50,
                    "title": "Internet Control Message Protocol (ICMP)",
                    "summary": "Diagnostics, error reporting, Ping, and how Traceroute uses TTL expiration.",
                    "concept": "ICMP (Protocol 1) reports network errors and diagnostic conditions:\n- Type 8, Code 0: Echo Request (Ping query).\n- Type 0, Code 0: Echo Reply (Ping response).\n- Type 3: Destination Unreachable (Code 0: Net, Code 1: Host, Code 3: Port unreachable).\n- Type 11, Code 0: Time-to-Live Exceeded in Transit.\nHow Traceroute Works:\n1. Sends packet with TTL = 1 -> First router decrements to 0, drops packet, returns ICMP Type 11 (Hop 1 discovered!).\n2. Sends packet with TTL = 2 -> Second router drops, returns ICMP Type 11 (Hop 2 discovered!).\n3. Repeats incrementally until reaching destination.",
                    "cyberLens": {
                        "offensive": "ICMP Tunneling (e.g. `iodine`, `ptunnel`): Malware encapsulates covert C2 traffic inside the data payload of ICMP Echo Request packets to bypass restrictive outbound firewalls.",
                        "defensive": "Deep packet inspection inspects ICMP payload size and entropy, dropping ICMP packets with abnormal payloads or rate-limiting ICMP."
                    },
                    "keyPoints": [
                        "Ping uses ICMP Type 8 (Request) and Type 0 (Reply).",
                        "Traceroute leverages the TTL Exceeded (Type 11) error mechanism.",
                        "Port unreachable (Type 3 Code 3) indicates closed UDP ports."
                    ],
                    "quiz": {
                        "question": "Which ICMP message type and code are returned by an intermediate router to make Traceroute hop discovery work?",
                        "options": [
                            "Type 8 Code 0 (Echo Request)",
                            "Type 0 Code 0 (Echo Reply)",
                            "Type 11 Code 0 (Time to Live Exceeded in Transit)",
                            "Type 3 Code 3 (Port Unreachable)"
                        ],
                        "answer": 2,
                        "explanation": "Traceroute sends packets with incremental TTLs (1, 2, 3...). When an intermediate router decrements TTL to 0, it discards the packet and sends back ICMP Type 11 Code 0 (TTL Exceeded), revealing its IP."
                    }
                },
                {
                    "screenNumber": 4,
                    "globalSource": 51,
                    "title": "Routing Tables & The Forwarding Engine",
                    "summary": "Longest Prefix Match, Default Gateways, Metric, and Next-Hop resolution.",
                    "concept": "A routing table determines how a router forwards an incoming packet:\n1. Table entries list: Destination Network CIDR, Next-Hop IP, Outgoing Interface, Metric.\n2. Longest Prefix Match Rule: If multiple routes match a destination IP, the router selects the route with the longest (most specific) prefix mask!\nExample:\n- Route A: `10.0.0.0/8` via Interface 1\n- Route B: `10.1.0.0/16` via Interface 2\n- Route C: `10.1.5.0/24` via Interface 3\nFor destination `10.1.5.88`, Route C (/24) is chosen because 24 > 16 > 8.\n3. Default Route (`0.0.0.0/0`): The fallback route used when no specific match exists.",
                    "cyberLens": {
                        "offensive": "BGP Prefix Hijacking: Attackers announce a more specific route (e.g., announcing `/24` when the legitimate owner announces `/22`). Because of the Longest Prefix Match rule, global internet traffic diverts to the attacker's AS!",
                        "defensive": "Route validation with RPKI and strict egress prefix filtering prevents rogue route advertisements."
                    },
                    "keyPoints": [
                        "The Longest Prefix Match always wins, regardless of route metric or protocol.",
                        "0.0.0.0/0 is the 'gateway of last resort'.",
                        "Inspect local host routing table with `route print` (Windows) or `ip route` (Linux)."
                    ],
                    "quiz": {
                        "question": "If a router has matching routes for 192.168.1.0/24 and 192.168.0.0/16, which route will it use to forward a packet addressed to 192.168.1.50?",
                        "options": [
                            "192.168.0.0/16 because it has more addresses.",
                            "192.168.1.0/24 because of the Longest Prefix Match rule.",
                            "It drops the packet due to collision.",
                            "It splits the packet in half between both routes."
                        ],
                        "answer": 1,
                        "explanation": "Routers always prioritize the most specific route (the one with the longest prefix mask length). /24 is more specific than /16."
                    }
                },
                {
                    "screenNumber": 5,
                    "globalSource": 52,
                    "title": "Routing Protocols: Static, OSPF, and BGP",
                    "summary": "Internal Gateway Protocols (IGP) vs External Gateway Protocols (EGP) and BGP security.",
                    "concept": "- Static Routing: Manually configured routes. Secure and predictable, but fails when topology changes.\n- OSPF (Open Shortest Path First): Link-State IGP using Dijkstra's algorithm. Rapid convergence within an enterprise autonomous system.\n- BGP (Border Gateway Protocol): Path-Vector EGP that glues the entire Internet together. Exchanges reachability between independent Autonomous Systems (ASNs).",
                    "cyberLens": {
                        "offensive": "BGP Route Leak / Hijack: By falsely announcing ownership of YouTube's or cryptocurrency services' IP prefixes, rogue state actors or attackers intercept traffic, steal crypto, or cause global blackouts.",
                        "defensive": "BGP Route Filtering, Peer Authentication (MD5/TCP-AO), and RPKI Route Origin Authorization."
                    },
                    "keyPoints": [
                        "OSPF is used INSIDE an organization; BGP is used BETWEEN organizations.",
                        "BGP makes decisions based on policy, AS path length, and business agreements.",
                        "The internet's biggest systemic vulnerability is unauthenticated BGP peering."
                    ],
                    "quiz": {
                        "question": "Which protocol is the primary routing protocol responsible for exchanging routing information between different Autonomous Systems across the global Internet?",
                        "options": [
                            "OSPF",
                            "RIP",
                            "BGP (Border Gateway Protocol)",
                            "ICMP"
                        ],
                        "answer": 2,
                        "explanation": "BGP is the exterior gateway protocol that powers the global Internet, routing traffic across thousands of independent autonomous systems."
                    }
                }
            ]
        },

        # CH 11
        {
            "id": "11",
            "module": "03 / ADDRESSING AND TRANSPORT",
            "title": "L3: NAT, DHCP & IPv6",
            "desc": "Learn how hosts receive addresses and how NAT and IPv6 change the path.",
            "screensCount": 4,
            "sourceRange": "SOURCE 53-56",
            "simulator": "nat-dhcp-simulator",
            "badge": "Address Transition",
            "screens": [
                {
                    "screenNumber": 1,
                    "globalSource": 53,
                    "title": "Network Address Translation (NAT) & PAT",
                    "summary": "Static NAT, Dynamic NAT, and Port Address Translation (NAT Overload).",
                    "concept": "NAT translates private RFC 1918 addresses into public routable IPs:\n- Static NAT (1:1): Maps one private IP to one public IP (used for hosting internal web servers).\n- Dynamic NAT (Many:Many): Maps private hosts to a pool of public IPs.\n- Port Address Translation (PAT / NAT Overload): Maps thousands of internal private IPs to a SINGLE public IP by tracking unique source Layer 4 port numbers in a NAT State Table:\n  - Internal: `192.168.1.50:52140` -> NAT Router translates to -> `203.0.113.1:40001`.\n  - Remote server replies to `203.0.113.1:40001` -> NAT translates back to `192.168.1.50:52140`.",
                    "cyberLens": {
                        "offensive": "NAT Blindness: When a cybercrime or web attack originates from behind a corporate PAT gateway, external server logs only record the single public IP, shielding the specific internal workstation identity.",
                        "defensive": "Correlate internal DHCP and firewall NAT state translation logs with external web server timestamps during digital forensics triage."
                    },
                    "keyPoints": [
                        "PAT is why entire households and offices can browse the web using one public IP.",
                        "NAT provides accidental inbound obscurity, but is NOT a substitute for a firewall.",
                        "NAT alters the IP and Port headers and recalculates checksums on the fly."
                    ],
                    "quiz": {
                        "question": "How does Port Address Translation (PAT / NAT Overload) allow hundreds of internal computers to share a single public IPv4 address simultaneously?",
                        "options": [
                            "By assigning different MAC addresses to each website.",
                            "By tracking unique Layer 4 source port numbers for each outbound connection in a state table.",
                            "By compressing IP packets into binary zip files.",
                            "By turning off TCP."
                        ],
                        "answer": 1,
                        "explanation": "PAT tracks each internal host's session by mapping its internal IP and ephemeral source port to a unique source port on the router's single public IP."
                    }
                },
                {
                    "screenNumber": 2,
                    "globalSource": 54,
                    "title": "Dynamic Host Configuration Protocol (DHCP) & DORA",
                    "summary": "The 4-step DORA process: Discover, Offer, Request, Acknowledge.",
                    "concept": "DHCP automates network configuration (IP, Subnet Mask, Gateway, DNS):\n1. Discover (Client -> Broadcast): 'I need an IP!' (UDP Dst Port 67, Src Port 68).\n2. Offer (Server -> Unicast/Broadcast): 'Here is 192.168.1.50 with a 24-hour lease'.\n3. Request (Client -> Broadcast): 'I accept 192.168.1.50 from DHCP Server 192.168.1.1'.\n4. Acknowledge (Server -> Unicast/Broadcast): 'Confirmed! Here are your DNS and Gateway settings'.",
                    "cyberLens": {
                        "offensive": "Rogue DHCP Server & Starvation: Attackers flood DHCP with fake MACs to exhaust available IP pools (Starvation), then launch a Rogue DHCP server handing out the attacker's IP as Default Gateway and DNS, achieving instant MITM!",
                        "defensive": "DHCP Snooping: Switch drops DHCP Offer/Ack packets arriving on untrusted user ports, permitting them only from designated trusted uplink ports."
                    },
                    "keyPoints": [
                        "Remember DORA: Discover, Offer, Request, Acknowledge.",
                        "DHCP runs over UDP: Server listens on port 67, Client on port 68.",
                        "DHCP Snooping is vital to prevent Rogue DHCP attacks."
                    ],
                    "quiz": {
                        "question": "What attack occurs when a rogue actor introduces an unauthorized DHCP server into a corporate network?",
                        "options": [
                            "The rogue server provides its own IP as the Default Gateway and DNS to connecting clients, allowing total traffic interception.",
                            "All switches physically power off.",
                            "The router deletes its firmware.",
                            "The attacker becomes the CEO."
                        ],
                        "answer": 0,
                        "explanation": "A rogue DHCP server hands out malicious network configurations to unsuspecting clients, pointing their default gateway and DNS to the attacker's machine for full MITM interception."
                    }
                },
                {
                    "screenNumber": 3,
                    "globalSource": 55,
                    "title": "IPv6: Structure & Compression Rules",
                    "summary": "128 bits, hexadecimal representation, zero-compression rules, and address types.",
                    "concept": "IPv6 expands address space to 128 bits (3.4 x 10^38 addresses) written as 8 groups of 4 hex digits:\n`2001:0db8:85a3:0000:0000:8a2e:0370:7334`\nTwo compression rules:\n1. Omit leading zeros in any group: `0000` -> `0`, `0db8` -> `db8`.\n2. Replace consecutive groups of all zeros with `::` (can only be used ONCE per address!).\nCompressed: `2001:db8:85a3::8a2e:370:7334`.\nKey Address Types:\n- Global Unicast (`2000::/3`): Public Internet routable.\n- Link-Local (`fe80::/10`): Mandatory auto-configured for single link communication.\n- Unique Local (`fc00::/7`): Private RFC 1918 equivalent.\n- Loopback (`::1`).",
                    "cyberLens": {
                        "offensive": "IPv6 Shadow Network Exploitation: Many enterprises enable IPv6 in Windows by default while only monitoring IPv4 firewalls. Attackers utilize IPv6 link-local traffic or rogue router advertisements (mitm6) to compromise Windows Active Directory via DHCPv6 and DNS injection!",
                        "defensive": "Either fully secure, monitor, and firewall IPv6 across all enterprise switches and endpoints, or administratively disable IPv6 if unused."
                    },
                    "keyPoints": [
                        "IPv6 has 128 bits; IPv4 has 32 bits.",
                        "No broadcast addresses exist in IPv6; all broadcast functions are replaced by Multicast.",
                        "Every IPv6 interface automatically configures a link-local address starting with fe80::."
                    ],
                    "quiz": {
                        "question": "What is the fully compressed notation of the IPv6 address 2001:0db8:0000:0000:0000:0000:0000:0001?",
                        "options": [
                            "2001:db8:0:0:0:0:0:1",
                            "2001:db8::1",
                            "2001:db8:::1",
                            "2001:db8:0::1"
                        ],
                        "answer": 1,
                        "explanation": "Leading zeros in 0db8 become db8. The contiguous run of five zero groups is replaced by '::', resulting in 2001:db8::1."
                    }
                },
                {
                    "screenNumber": 4,
                    "globalSource": 56,
                    "title": "IPv6 Neighbor Discovery & Autoconfiguration",
                    "summary": "SLAAC, Router Advertisements, and Neighbor Discovery Protocol (NDP).",
                    "concept": "IPv6 replaces ARP with the Neighbor Discovery Protocol (NDP) running over ICMPv6:\n- Neighbor Solicitation (NS) & Neighbor Advertisement (NA): Replaces ARP requests and replies using multicast.\n- Stateless Address Autoconfiguration (SLAAC):\n  1. Client sends Router Solicitation (RS) to all-routers multicast `ff02::2`.\n  2. Router replies with Router Advertisement (RA) containing the network prefix.\n  3. Client generates its own 64-bit interface ID (EUI-64 or privacy extension) and configures its address automatically without needing a DHCP server!",
                    "cyberLens": {
                        "offensive": "Rogue Router Advertisements (RA Flood): Attackers broadcast malicious RAs claiming to be the default IPv6 router. Windows clients automatically prioritize IPv6 over IPv4, redirecting all outbound traffic through the attacker.",
                        "defensive": "Enable IPv6 RA Guard on enterprise switches to block unauthorized Router Advertisement messages on access ports."
                    },
                    "keyPoints": [
                        "NDP runs on ICMPv6 and uses multicast instead of broadcast.",
                        "SLAAC allows zero-configuration plug-and-play address generation.",
                        "RA Guard is essential on Layer 2 switches to stop rogue IPv6 gateways."
                    ],
                    "quiz": {
                        "question": "Which protocol replaces ARP in IPv6 networks for discovering the MAC address of a neighbor on the local link?",
                        "options": [
                            "BGP",
                            "Neighbor Discovery Protocol (NDP) using ICMPv6",
                            "DNSv6",
                            "Reverse ARP (RARP)"
                        ],
                        "answer": 1,
                        "explanation": "IPv6 completely eliminates ARP. Layer 2 address resolution is handled by Neighbor Discovery Protocol (NDP) using ICMPv6 Neighbor Solicitation and Advertisement messages."
                    }
                }
            ]
        },

        # CH 12
        {
            "id": "12",
            "module": "03 / ADDRESSING AND TRANSPORT",
            "title": "L4: ports, sockets & TCP",
            "desc": "Connect addresses to processes through ports, socket pairs, and TCP headers.",
            "screensCount": 6,
            "sourceRange": "SOURCE 57-62",
            "simulator": "tcp-header-dissector",
            "badge": "Transport Foundation",
            "screens": [
                {
                    "screenNumber": 1,
                    "globalSource": 57,
                    "title": "Port Numbers & Process Multiplexing",
                    "summary": "How operating systems direct incoming packets to the correct application.",
                    "concept": "An IP address identifies the device, but a Port Number (16-bit unsigned integer, 0 to 65535) identifies the specific software process running on that device:\n- Well-Known Ports (0 - 1023): Reserved for system services (HTTP: 80, HTTPS: 443, SSH: 22, DNS: 53, FTP: 21, SMTP: 25). Require root/admin privileges to bind.\n- Registered Ports (1024 - 49151): Assigned to specific applications (MySQL: 3306, RDP: 3389, PostgreSQL: 5432, Redis: 6379).\n- Dynamic / Ephemeral Ports (49152 - 65535): Client-side temporary ports randomly chosen by the OS kernel for outbound requests.",
                    "cyberLens": {
                        "offensive": "Port Scanning: Tools like Nmap probe all 65,535 ports to identify running services and unpatched software versions.",
                        "defensive": "Attack Surface Reduction: Disable and close all non-essential listening ports. Block standard management ports (22, 3389) at edge firewalls."
                    },
                    "keyPoints": [
                        "Ports allow a computer to run hundreds of network services simultaneously.",
                        "Port 0 to 1023 require elevated administrative privileges.",
                        "Outgoing connections use temporary ephemeral ports from the high range."
                    ],
                    "quiz": {
                        "question": "Why do operating systems restrict binding to well-known ports (0-1023) to administrative (root) users?",
                        "options": [
                            "To save electricity.",
                            "To prevent unprivileged malicious software or rogue users from hijacking standard services like SSH (22) or HTTP (80).",
                            "Because well-known ports only work with fiber cables.",
                            "Non-admin users cannot access the internet."
                        ],
                        "answer": 1,
                        "explanation": "If non-root users could bind to port 80 or 22, any malicious script running in an unprivileged account could pose as the official web or SSH server and steal credentials."
                    }
                },
                {
                    "screenNumber": 2,
                    "globalSource": 58,
                    "title": "The 5-Tuple & Socket Pair",
                    "summary": "The unique mathematical identity of every network connection in the universe.",
                    "concept": "Every TCP/IP communication is uniquely identified across the world by a 5-Tuple:\n1. Source IP Address\n2. Source Port Number\n3. Destination IP Address\n4. Destination Port Number\n5. Transport Protocol (TCP or UDP)\nA Socket Pair consists of `(SrcIP:SrcPort, DstIP:DstPort)`. This explains how a web server on port 443 can serve 100,000 clients simultaneously without confusion: each client has a distinct IP or ephemeral port!",
                    "cyberLens": {
                        "offensive": "Connection Hijacking: If an attacker can guess or sniff the 5-tuple and the current TCP sequence number, they can inject malicious data or reset packets into an active connection.",
                        "defensive": "Stateful firewalls and NAT devices index connections in their state tables directly using this 5-tuple."
                    },
                    "keyPoints": [
                        "A connection is defined by its 5-tuple, not just destination port.",
                        "Ephemeral ports prevent collisions between multiple tabs connecting to the same server.",
                        "Inspect active 5-tuples using `netstat -an` or `ss -tuna`."
                    ],
                    "quiz": {
                        "question": "How can a web server with one IP address and listening on one port (443) maintain simultaneous independent connections to 10,000 different browser clients?",
                        "options": [
                            "By assigning each client a different website.",
                            "Because each connection is distinguished by a unique 5-tuple combination of client IP, client ephemeral port, server IP, server port, and protocol.",
                            "The server responds to all clients at the exact same millisecond.",
                            "Web browsers do not use ports."
                        ],
                        "answer": 1,
                        "explanation": "Even though server IP, server port (443), and protocol (TCP) are identical, each client has a distinct IP address and/or a unique ephemeral source port, creating a distinct 5-tuple socket pair."
                    }
                },
                {
                    "screenNumber": 3,
                    "globalSource": 59,
                    "title": "The TCP Header Anatomy",
                    "summary": "Ports, Sequence Numbers, Acknowledgment Numbers, Data Offset, Flags, and Window Size.",
                    "concept": "The standard TCP header is 20 bytes (up to 60 with options):\n1. Source Port (16 bits) & Destination Port (16 bits).\n2. Sequence Number (32 bits): Byte offset of the first byte of payload data.\n3. Acknowledgment Number (32 bits): The next sequence number expected from sender.\n4. Data Offset (4 bits): TCP header length in 32-bit words (default 5 = 20 bytes).\n5. Reserved (3 bits).\n6. Control Flags (9 bits): URG, ACK, PSH, RST, SYN, FIN, ECE, CWR, NS.\n7. Window Size (16 bits): Flow control buffer capacity advertised by receiver.\n8. Checksum (16 bits): Verifies header, payload, and pseudo-header integrity.\n9. Urgent Pointer (16 bits): Points to urgent data when URG flag is set.",
                    "cyberLens": {
                        "offensive": "TCP Flag Scans: Attackers manipulate flag combinations to probe firewalls (SYN Scan, FIN Scan, NULL Scan, Xmas Scan).",
                        "defensive": "Deep packet inspection drops invalid or contradictory flag combinations (e.g., SYN+FIN or packets with all flags set)."
                    },
                    "keyPoints": [
                        "TCP guarantees ordered, byte-stream reliability through sequence numbers.",
                        "Acknowledgment numbers are cumulative: they acknowledge all prior bytes.",
                        "TCP header checksum protects against data corruption in transit."
                    ],
                    "quiz": {
                        "question": "What does the Acknowledgment Number in a TCP segment header signify?",
                        "options": [
                            "The total number of packets sent so far.",
                            "The exact next sequence number byte that the receiver expects to receive.",
                            "The password for the server.",
                            "The size of the router's hard drive."
                        ],
                        "answer": 1,
                        "explanation": "TCP acknowledgment numbers indicate the next sequence byte the receiver expects, confirming receipt of all preceding sequence bytes in the stream."
                    }
                },
                {
                    "screenNumber": 4,
                    "globalSource": 60,
                    "title": "The TCP Control Flags Matrix",
                    "summary": "SYN, ACK, FIN, RST, PSH, and URG: the control switches of the transport layer.",
                    "concept": "- SYN (Synchronize): Initiates connection and synchronizes initial sequence numbers (ISN).\n- ACK (Acknowledgment): Confirms receipt of transmitted data.\n- FIN (Finish): Graceful connection termination (sender has no more data to send).\n- RST (Reset): Abruptly aborts connection due to error, closed port, or security reset.\n- PSH (Push): Tells the receiver to immediately pass data to application without buffering.\n- URG (Urgent): Indicates data pointed to by Urgent Pointer requires immediate processing.",
                    "cyberLens": {
                        "offensive": "RST Packet Injection: An attacker sniffing an unencrypted TCP session crafts a forged RST packet matching the active 5-tuple and sequence number, terminating legitimate connections instantly.",
                        "defensive": "Firewalls generate TCP Resets to actively terminate unauthorized connection attempts."
                    },
                    "keyPoints": [
                        "SYN starts; FIN politely closes; RST abruptly kills.",
                        "Every packet after the initial SYN has the ACK flag enabled.",
                        "PSH is common in interactive protocols like SSH and Telnet."
                    ],
                    "quiz": {
                        "question": "When you attempt to connect to a closed TCP port on a remote server, what TCP flag does the remote server send back to reject the connection?",
                        "options": [
                            "FIN",
                            "SYN",
                            "RST (Reset)",
                            "URG"
                        ],
                        "answer": 2,
                        "explanation": "If a port is closed and not listening, the operating system kernel responds with a TCP packet having the RST (Reset) and ACK flags set to reject the handshake."
                    }
                },
                {
                    "screenNumber": 5,
                    "globalSource": 61,
                    "title": "Nmap Port Scanning Mechanics: SYN, Connect, & Stealth",
                    "summary": "How port scanners determine whether a port is Open, Closed, or Filtered.",
                    "concept": "1. TCP Connect Scan (`-sT`):\n   - Performs full 3-way handshake (SYN -> SYN-ACK -> ACK).\n   - Easy, unprivileged, but heavily logged in target application logs.\n2. SYN Stealth / Half-Open Scan (`-sS`):\n   - Sends SYN.\n   - If Open: Target replies SYN-ACK. Scanner immediately sends RST! Connection is never completed, avoiding application logging.\n   - If Closed: Target replies RST-ACK.\n   - If Filtered: No response or ICMP unreachable (firewall dropped packet).\n3. Inverse Scans (FIN `-sF`, NULL `-sN`, Xmas `-sX`):\n   - Sends non-SYN packets. According to RFC 793, closed ports must reply RST; open ports ignore the packet. Bypasses naive stateless firewalls.",
                    "cyberLens": {
                        "offensive": "SYN scanning is fast and stealthy because kernel connection tables never hand the session to user-space application logs.",
                        "defensive": "Intrusion Detection Systems (Snort, Suricata, Zeek) detect SYN scans by tracking half-open connection spikes from a single source IP."
                    },
                    "keyPoints": [
                        "SYN Scan is the industry standard default in Nmap.",
                        "Open = SYN-ACK received; Closed = RST received; Filtered = Dropped by firewall.",
                        "Modern stateful firewalls defeat FIN/NULL/Xmas scans by dropping out-of-state packets."
                    ],
                    "quiz": {
                        "question": "Why is a TCP SYN scan (-sS) often called a 'Half-Open' scan?",
                        "options": [
                            "Because it only scans half the ports.",
                            "Because the scanner never completes the 3-way handshake, sending an RST immediately upon receiving SYN-ACK.",
                            "Because it runs in half-duplex mode.",
                            "Because it only works on Windows."
                        ],
                        "answer": 1,
                        "explanation": "Instead of completing the handshake with an ACK, the scanner sends an RST packet to tear down the connection before it becomes fully established."
                    }
                },
                {
                    "screenNumber": 6,
                    "globalSource": 62,
                    "title": "Flow Control & The Sliding Window",
                    "summary": "Window Size, TCP Window Scaling, buffer exhaustion, and slow start.",
                    "concept": "TCP ensures a fast sender does not overwhelm a slow receiver through Flow Control:\n- Advertised Window Size: The receiver informs the sender how many bytes of buffer space it currently has available.\n- Sliding Window: The sender can transmit up to the Window Size without waiting for an acknowledgment. As ACKs arrive, the window slides forward.\n- Zero Window: When the receiver buffer is full, it advertises Window = 0. The sender stops transmitting and periodically sends Window Probes until buffer clears.",
                    "cyberLens": {
                        "offensive": "Slowloris & Slow Read Attacks: Attackers slowly send data or advertise tiny window sizes (e.g. 1 byte) to tie up server worker threads and socket buffers indefinitely, exhausting server resources.",
                        "defensive": "Web servers enforce minimum data transfer rate thresholds and socket timeouts to drop slow-reading clients."
                    },
                    "keyPoints": [
                        "Flow control protects the receiver from being flooded by the sender.",
                        "Congestion control protects the intermediate network routers from bufferbloat.",
                        "Window Scaling (RFC 1323) allows window sizes up to 1 GB for high-bandwidth links."
                    ],
                    "quiz": {
                        "question": "What happens when a receiver advertises a TCP Window Size of 0 to the sender?",
                        "options": [
                            "The connection is immediately terminated.",
                            "The sender must halt data transmission until the receiver's buffer empties and a non-zero window is advertised.",
                            "The sender doubles its transmission speed.",
                            "The packet is rerouted through UDP."
                        ],
                        "answer": 1,
                        "explanation": "A Zero Window indicates that the receiver's incoming socket buffer is completely full. The sender must stop sending data until buffer space becomes available."
                    }
                }
            ]
        },

        # CH 13
        {
            "id": "13",
            "module": "03 / ADDRESSING AND TRANSPORT",
            "title": "L4: the TCP lifecycle",
            "desc": "Step through opening, using, and closing a TCP connection.",
            "screensCount": 5,
            "sourceRange": "SOURCE 63-67",
            "simulator": "tcp-lifecycle-stepper",
            "badge": "State Machine",
            "screens": [
                {
                    "screenNumber": 1,
                    "globalSource": 63,
                    "title": "The 3-Way Handshake Step-by-Step",
                    "summary": "SYN, SYN-ACK, ACK, and the negotiation of Initial Sequence Numbers (ISN).",
                    "concept": "Before data transfer begins, client and server synchronize states:\n1. Step 1 (SYN): Client picks random Initial Sequence Number (ISN_c, e.g. 1000) and sends `[SYN] Seq=1000` (Client enters SYN_SENT).\n2. Step 2 (SYN-ACK): Server receives SYN, picks its own random ISN (ISN_s, e.g. 5000), acknowledges client sequence (`Ack=1001`), and sends `[SYN, ACK] Seq=5000, Ack=1001` (Server enters SYN_RCVD).\n3. Step 3 (ACK): Client acknowledges server sequence (`Ack=5001`), sending `[ACK] Seq=1001, Ack=5001` (Both enter ESTABLISHED).",
                    "cyberLens": {
                        "offensive": "Predictable ISN Attacks (Kevin Mitnick IP Spoofing): Historically, operating systems generated sequential or predictable ISNs. Attackers blinded to the server's reply could guess the Ack number and inject commands into trusted rsh/rlogin sessions.",
                        "defensive": "Modern operating systems use cryptographically secure random number generators (CSPRNG) to randomize Initial Sequence Numbers."
                    },
                    "keyPoints": [
                        "The handshake synchronizes starting sequence numbers in both directions.",
                        "SYN consumes 1 sequence number byte.",
                        "Both endpoints must reach the ESTABLISHED state before application data flows."
                    ],
                    "quiz": {
                        "question": "If Client sends SYN with Seq=2000, what will be the ACK number in the Server's SYN-ACK reply?",
                        "options": [
                            "2000",
                            "2001",
                            "0",
                            "1"
                        ],
                        "answer": 1,
                        "explanation": "A SYN packet logically consumes one sequence number. The receiver acknowledges it by incrementing the sequence number by 1, resulting in Ack=2001."
                    }
                },
                {
                    "screenNumber": 2,
                    "globalSource": 64,
                    "title": "SYN Flood Denial of Service & SYN Cookies",
                    "summary": "Exhausting the server backlog queue and the mathematical magic that solves it.",
                    "concept": "The SYN Flood Vulnerability:\n1. Attacker sends thousands of SYN packets per second with spoofed source IPs.\n2. Server allocates memory for Transmission Control Block (TCB) in its SYN Backlog Queue and replies SYN-ACK.\n3. Since source IPs are fake, no ACK ever arrives.\n4. Server backlog queue fills to capacity; all legitimate new connection requests are rejected.\nDefensive Solution: SYN Cookies (RFC 4987):\n- The server DOES NOT allocate memory when receiving a SYN.\n- Instead, it encodes the connection state mathematically into the Initial Sequence Number (ISN = cryptographic hash of SrcIP, SrcPort, DstIP, DstPort, Secret Key).\n- When the client's final ACK arrives, the server recalculates the hash from `Ack - 1`. If valid, it allocates the connection!",
                    "cyberLens": {
                        "offensive": "SYN flooding is the most common transport-layer DDoS attack, capable of taking down unprotected web servers with modest bandwidth.",
                        "defensive": "Enable SYN Cookies in Linux (`sysctl -w net.ipv4.tcp_syncookies=1`) and configure firewall SYN rate limiting."
                    },
                    "keyPoints": [
                        "SYN floods exploit half-open connection memory allocation.",
                        "SYN cookies make the server completely stateless until the 3-way handshake completes.",
                        "Firewalls can proxy handshakes (TCP SYN Proxy) to absorb attacks."
                    ],
                    "quiz": {
                        "question": "How do SYN Cookies protect a server from memory exhaustion during a SYN Flood attack?",
                        "options": [
                            "They store incoming passwords in a cookie file.",
                            "They defer allocating server memory for the connection by encoding state cryptographically into the server's Initial Sequence Number.",
                            "They automatically block all IP addresses ending in zero.",
                            "They convert all TCP traffic into UDP."
                        ],
                        "answer": 1,
                        "explanation": "SYN Cookies eliminate the SYN backlog queue entirely. The server allocates zero memory on receiving a SYN, verifying the connection state mathematically only when the client's ACK arrives."
                    }
                },
                {
                    "screenNumber": 3,
                    "globalSource": 65,
                    "title": "Data Transmission, ACKs, & Retransmission Timers",
                    "summary": "Cumulative acknowledgments, Selective ACK (SACK), and fast retransmit.",
                    "concept": "During data transfer:\n- Data is split into Maximum Segment Size (MSS, typically 1460 bytes).\n- Sender transmits segments; receiver sends ACKs confirming receipt.\n- Cumulative ACK: Acknowledges all bytes up to Ack number.\n- Selective Acknowledgment (SACK, RFC 2018): Receiver specifies exact discontinuous blocks received, avoiding retransmission of already-delivered packets.\n- Retransmission Timeout (RTO): If an ACK is not received before timer expires, sender retransmits segment.",
                    "cyberLens": {
                        "offensive": "Blind In-Window Data Injection: If an attacker can inject a forged packet whose sequence number falls anywhere inside the receiver's current sliding window, the receiver accepts and processes the malicious data.",
                        "defensive": "Randomized ephemeral ports and randomized ISNs make guessing valid in-window sequence numbers statistically impossible."
                    },
                    "keyPoints": [
                        "TCP guarantees zero data loss and ordered delivery.",
                        "SACK dramatically improves throughput during high packet loss.",
                        "Retransmission timers dynamically adapt based on measured Round Trip Time (RTT)."
                    ],
                    "quiz": {
                        "question": "What is the primary benefit of the TCP Selective Acknowledgment (SACK) option?",
                        "options": [
                            "It encrypts passwords inside the TCP header.",
                            "It allows the receiver to inform the sender exactly which non-contiguous blocks of data arrived, preventing unnecessary retransmission of already-received segments.",
                            "It eliminates the need for sequence numbers.",
                            "It speeds up DNS queries."
                        ],
                        "answer": 1,
                        "explanation": "Without SACK, dropping one packet forces the sender to retransmit all subsequent packets. SACK specifies exact missing ranges so only lost segments are retransmitted."
                    }
                },
                {
                    "screenNumber": 4,
                    "globalSource": 66,
                    "title": "The 4-Way Teardown & TIME_WAIT State",
                    "summary": "Graceful connection closure, half-closed sockets, and why TIME_WAIT lasts for 2 MSL.",
                    "concept": "TCP teardown is a polite 4-step exchange:\n1. Client -> Server: `[FIN, ACK]` ('I have no more data to send'). Client enters FIN_WAIT_1.\n2. Server -> Client: `[ACK]` ('Acknowledged, but I may still have data for you'). Client enters FIN_WAIT_2; Server enters CLOSE_WAIT.\n3. Server -> Client: `[FIN, ACK]` ('Now I am also done sending'). Server enters LAST_ACK.\n4. Client -> Server: `[ACK]` ('Goodbye'). Server closes; Client enters TIME_WAIT.\nWhy TIME_WAIT exists:\n- Client waits for 2 Maximum Segment Lifetimes (2 MSL = typically 60-120 seconds).\n- Guarantees server receives final ACK (retransmits ACK if server resends FIN).\n- Ensures lingering delayed duplicate packets from old connection die in network before new connection can reuse the same port pair.",
                    "cyberLens": {
                        "offensive": "TIME_WAIT Port Exhaustion: Opening and closing thousands of outbound connections rapidly traps client ports in TIME_WAIT, causing 'cannot assign requested address' errors.",
                        "defensive": "Enable `tcp_tw_reuse` in Linux kernels for high-traffic web proxies to safely reuse TIME_WAIT sockets."
                    },
                    "keyPoints": [
                        "TCP closure is bidirectional: each side closes its send channel independently.",
                        "CLOSE_WAIT on a server indicates the application forgot to call close().",
                        "TIME_WAIT protects future connections from ghost packets."
                    ],
                    "quiz": {
                        "question": "Why does a client endpoint remain in the TIME_WAIT state for 2 MSL (Maximum Segment Lifetime) after sending its final ACK?",
                        "options": [
                            "To download software updates.",
                            "To ensure the final ACK reached the server and allow any wandering delayed duplicate packets to expire in the network before port reuse.",
                            "Because the operating system crashed.",
                            "To keep the Wi-Fi connection alive."
                        ],
                        "answer": 1,
                        "explanation": "TIME_WAIT ensures that if the server missed the final ACK, it can resend its FIN and the client can re-acknowledge. It also prevents old delayed packets from colliding with a new connection using the same 5-tuple."
                    }
                },
                {
                    "screenNumber": 5,
                    "globalSource": 67,
                    "title": "TCP Reset Attacks & Session Hijacking",
                    "summary": "Injecting spoofed RST packets and hijacking established telnet/SSH sessions.",
                    "concept": "- TCP RST Attack: Sending a forged TCP packet with RST flag set matching the victim's active socket pair and current valid sequence window immediately destroys the connection.\n- The Great Firewall of China (GFW) famously uses out-of-band TCP RST injection to terminate connections containing forbidden keywords.\n- Session Hijacking: Attacker desynchronizes client and server (via packet drop or DoS) and injects commands with the correct sequence numbers directly into an established, authenticated terminal session.",
                    "cyberLens": {
                        "offensive": "Session hijacking turns an unencrypted telnet or HTTP administrative session into an instant root shell without knowing the user's password.",
                        "defensive": "Cryptographic transport protocols (SSH, TLS) render TCP session hijacking harmless because injected plaintext fails cryptographic integrity verification (MAC/HMAC)."
                    },
                    "keyPoints": [
                        "RST packets require no acknowledgment; they take effect immediately.",
                        "RST attacks require knowledge of active sequence numbers.",
                        "TLS and SSH completely eliminate the threat of plaintext session injection."
                    ],
                    "quiz": {
                        "question": "Why is an unencrypted Telnet session vulnerable to TCP session hijacking, whereas an SSH session over the same network is immune?",
                        "options": [
                            "Telnet uses UDP, while SSH uses TCP.",
                            "SSH uses cryptographic session keys and message authentication codes (MAC); any injected packets will fail cryptographic verification and be dropped.",
                            "Telnet cannot be inspected by Wireshark.",
                            "SSH does not use sequence numbers."
                        ],
                        "answer": 1,
                        "explanation": "Even if an attacker injects TCP packets with correct sequence numbers into an SSH stream, the SSH protocol layer verifies an encrypted HMAC on every payload. Forged injected packets fail decryption and are discarded."
                    }
                }
            ]
        },

        # CH 14
        {
            "id": "14",
            "module": "03 / ADDRESSING AND TRANSPORT",
            "title": "L4: reliability & UDP",
            "desc": "Compare TCP reliability with UDP and see how state can become a target.",
            "screensCount": 5,
            "sourceRange": "SOURCE 68-72",
            "simulator": "tcp-vs-udp-race",
            "badge": "Speed & Reflection",
            "screens": [
                {
                    "screenNumber": 1,
                    "globalSource": 68,
                    "title": "The Ultra-Lean UDP Protocol",
                    "summary": "8 bytes of pure minimalism: Source Port, Destination Port, Length, and Checksum.",
                    "concept": "User Datagram Protocol (UDP, RFC 768) provides connectionless, best-effort datagram delivery with zero overhead:\n- Header size: Exactly 8 bytes (compared to TCP's minimum 20 bytes).\n- Header fields:\n  1. Source Port (16 bits)\n  2. Destination Port (16 bits)\n  3. Length (16 bits): Total length of UDP header + data in bytes (min 8).\n  4. Checksum (16 bits): Optional in IPv4, mandatory in IPv6.\n- No handshakes, no acknowledgments, no sequence numbers, no retransmissions, no flow control.",
                    "cyberLens": {
                        "offensive": "Spoofing Simplicity: Because UDP is connectionless and maintains zero state, the source IP in the IP header can be forged trivially without breaking any handshake.",
                        "defensive": "Ingress filtering (BCP 38) at ISP borders drops outbound packets with source IPs outside the customer's allocated CIDR block."
                    },
                    "keyPoints": [
                        "UDP header is fixed at 8 bytes.",
                        "Applications that require speed over guaranteed delivery use UDP (VoIP, DNS, gaming, video streaming).",
                        "If reliability is required, the application layer must implement it (e.g. QUIC)."
                    ],
                    "quiz": {
                        "question": "What is the total fixed size of a standard UDP header?",
                        "options": [
                            "8 bytes",
                            "20 bytes",
                            "32 bytes",
                            "64 bytes"
                        ],
                        "answer": 0,
                        "explanation": "A UDP header contains only 4 fields of 2 bytes each (Source Port, Destination Port, Length, Checksum) for a total of exactly 8 bytes."
                    }
                },
                {
                    "screenNumber": 2,
                    "globalSource": 69,
                    "title": "TCP vs UDP: Comprehensive Architectural Face-Off",
                    "summary": "Connection-oriented vs Connectionless, Byte-stream vs Datagram, Overhead vs Speed.",
                    "concept": "| Feature | TCP | UDP |\n|---|---|---|\n| Connection State | Stateful (3-way handshake) | Stateless (connectionless) |\n| Reliability | Guaranteed delivery & ordering | Best-effort (packets may drop/reorder) |\n| Overhead | 20-60 byte header, ACK traffic | 8 byte header, zero ACK traffic |\n| Flow & Congestion | Built-in sliding window & AIMD | None (blasts as fast as app sends) |\n| Speed / Latency | Higher latency (handshake RTT) | Ultra-low latency (immediate send) |\n| Protocols | HTTP/1.1, HTTPS, SSH, FTP, BGP | DNS, DHCP, SNMP, NTP, VoIP, QUIC/HTTP3 |",
                    "cyberLens": {
                        "offensive": "State Exhaustion: TCP's statefulness makes it vulnerable to state-table exhaustion attacks (SYN floods). UDP's statelessness makes it vulnerable to amplification attacks.",
                        "defensive": "Stateful firewalls must track UDP 'pseudo-sessions' by keeping a temporary translation timer for outbound UDP requests."
                    },
                    "keyPoints": [
                        "Use TCP when data accuracy is critical (file download, bank transaction).",
                        "Use UDP when real-time timeliness matters more than lost frames (voice call, live game).",
                        "HTTP/3 moves the entire web to UDP via the QUIC protocol."
                    ],
                    "quiz": {
                        "question": "Why is UDP preferred over TCP for real-time voice (VoIP) and online multiplayer video games?",
                        "options": [
                            "Because UDP encrypts audio automatically.",
                            "Because waiting for TCP to retransmit a lost packet introduces audio lag/stutter that ruins a live real-time conversation; it is better to simply drop the old millisecond.",
                            "Because TCP cables cannot carry voice signals.",
                            "Because UDP uses fiber optics only."
                        ],
                        "answer": 1,
                        "explanation": "In real-time communications, an audio packet that arrives 500ms late due to TCP retransmissions is useless and causes audio stutter. Discarding the lost packet and continuing live audio produces a far better experience."
                    }
                },
                {
                    "screenNumber": 3,
                    "globalSource": 70,
                    "title": "UDP Reflection & Amplification DDoS Attacks",
                    "summary": "How attackers turn NTP, DNS, and Memcached servers into multi-terabit cyber weapons.",
                    "concept": "Two ingredients enable massive UDP amplification attacks:\n1. IP Source Spoofing: Attacker sends UDP request with the spoofed IP address of the VICTIM.\n2. Amplification Factor: Attacker queries a server with a tiny request that triggers a massive response.\n- NTP Amplification (`monlist` command): 234-byte query -> 48,000-byte reply (~206x amplification!).\n- DNS Amplification (`ANY` query with EDNS0): 60-byte query -> 3,000-byte reply (~50x amplification).\n- Memcached Amplification: 15-byte query -> 750,000-byte reply (~50,000x amplification!).\nResult: 1 Gbps of attacker traffic becomes 50 Gbps to 500 Gbps pounding the victim's connection until it crashes.",
                    "cyberLens": {
                        "offensive": "Booter / Stresser services use pools of thousands of open UDP reflectors to launch multi-hundred gigabit volumetric DDoS attacks.",
                        "defensive": "Response Rate Limiting (RRL) on DNS/NTP servers, disabling debug commands like `monlist`, and closing open Memcached ports to public Internet."
                    },
                    "keyPoints": [
                        "Reflection requires connectionless protocols (UDP); cannot work on TCP.",
                        "Amplification multiplies attacker bandwidth by up to 50,000 times.",
                        "BCP 38 network egress filtering is the only global cure for IP spoofing."
                    ],
                    "quiz": {
                        "question": "Why can an amplification DDoS attack NOT be performed using standard TCP connections?",
                        "options": [
                            "Because TCP packets are too small.",
                            "Because TCP requires a 3-way handshake; if the attacker spoofs the victim's IP, the server's SYN-ACK goes to the victim, so the handshake never completes and no data payload is sent.",
                            "Because TCP does not use ports.",
                            "Because routers block all TCP packets."
                        ],
                        "answer": 1,
                        "explanation": "TCP requires completing a handshake before data is transferred. If the sender's source IP is spoofed, the server's SYN-ACK reply goes to the spoofed IP, who drops it with an RST. The attacker cannot complete the handshake to trigger the response."
                    }
                },
                {
                    "screenNumber": 4,
                    "globalSource": 71,
                    "title": "BCP 38 & The Solution to IP Spoofing",
                    "summary": "Best Current Practice 38: Ingress/Egress packet filtering at the internet edge.",
                    "concept": "Published in May 2000, RFC 2827 / BCP 38 defines the definitive technical solution to spoofed DDoS attacks:\n- Rule: Every Internet Service Provider (ISP) and network operator must verify that any packet leaving a customer network has a source IP address belonging strictly to that customer's assigned address range.\n- Unicast Reverse Path Forwarding (uRPF):\n  - Strict Mode: Router looks up the source IP in its routing table. If the packet arrived on an interface different from the best reverse path to that IP, the packet is DROPPED.\nIf every ISP implemented BCP 38, IP spoofing and reflection DDoS would vanish worldwide overnight.",
                    "cyberLens": {
                        "offensive": "Attackers seek out bulletproof hosters and misconfigured regional ISPs that fail to implement BCP 38 to launch spoofed DDoS campaigns.",
                        "defensive": "Deploying strict uRPF on all border router customer-facing interfaces blocks spoofed packets before they enter the Internet."
                    },
                    "keyPoints": [
                        "BCP 38 drops packets with forged source IPs at the perimeter.",
                        "uRPF automates BCP 38 enforcement via the routing table.",
                        "Volumetric DDoS persists today solely due to non-compliant networks."
                    ],
                    "quiz": {
                        "question": "What does a router using Strict Unicast Reverse Path Forwarding (uRPF) do when it receives an incoming packet?",
                        "options": [
                            "It reverses the payload letters.",
                            "It checks if its routing table has a route back to the source IP on the EXACT SAME interface the packet arrived on; if not, it drops the packet.",
                            "It converts the packet to IPv6.",
                            "It forwards the packet to Google."
                        ],
                        "answer": 1,
                        "explanation": "Strict uRPF looks up the packet's source IP. If the router would not use the receiving interface to route back to that source IP, the source IP is presumed spoofed and the packet is immediately discarded."
                    }
                },
                {
                    "screenNumber": 5,
                    "globalSource": 72,
                    "title": "QUIC: Re-Inventing Transport Over UDP",
                    "summary": "How HTTP/3 and QUIC bring encryption, zero-RTT handshakes, and stream multiplexing to UDP.",
                    "concept": "Traditional web transport stacks multiple layers: IP -> TCP -> TLS -> HTTP/2.\nProblems:\n1. High Latency: TCP handshake (1 RTT) + TLS handshake (1-2 RTT) = 200-300ms before first HTTP byte.\n2. Head-of-Line Blocking: If one TCP packet drops, all multiplexed HTTP streams wait.\nSolution: QUIC (RFC 9000 / HTTP/3):\n- Runs over UDP.\n- Integrates TLS 1.3 encryption directly into the transport layer.\n- 0-RTT Connection Resumption: Returning clients transmit encrypted data on the very first packet.\n- Eliminates Head-of-Line Blocking: Dropping a packet in Stream A has zero impact on Stream B.\n- Connection Migration: Switching from Wi-Fi to 5G does not disconnect your session (uses Connection ID, not IP).",
                    "cyberLens": {
                        "offensive": "Firewall Bypass: Early enterprise firewalls inspected TCP port 443 but ignored UDP port 443, allowing malware or data exfiltration over QUIC without inspection.",
                        "defensive": "Security appliances must decrypt and inspect QUIC/UDP port 443 or block outbound UDP 443 to force browsers to fallback to standard TCP HTTPS."
                    },
                    "keyPoints": [
                        "QUIC is the foundation of HTTP/3 and accounts for >30% of global web traffic.",
                        "QUIC solves TCP head-of-line blocking and connection migration.",
                        "QUIC encrypts transport headers, blinding traditional network monitors."
                    ],
                    "quiz": {
                        "question": "What happens when your smartphone switches from office Wi-Fi to mobile 5G while downloading a large file over QUIC (HTTP/3)?",
                        "options": [
                            "The TCP connection breaks and the download restarts from 0%.",
                            "The download continues seamlessly without interruption because QUIC tracks connections using a 64-bit Connection ID rather than the IP/Port socket pair.",
                            "The phone shuts down.",
                            "The file becomes corrupted."
                        ],
                        "answer": 1,
                        "explanation": "Because traditional TCP binds to the 5-tuple (IP:port), changing IP drops the socket. QUIC uses unique Connection IDs independent of IP addresses, enabling seamless connection migration."
                    }
                }
            ]
        }
    ]

print("Module 3 and part of 2 loaded.")
