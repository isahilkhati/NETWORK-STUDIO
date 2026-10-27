# -*- coding: utf-8 -*-
"""
Full dataset compiler for all 23 chapters of Dev. Sahil Networking Studio.
Generates 114 detailed lesson screens with complete cyber context, diagrams,
protocols, labs, and interactive quizzes.
"""
import json
import os

def get_module_1_2():
    # Chapters 01 to 06
    return [
        {
            "id": "01",
            "module": "01 / FOUNDATIONS",
            "title": "Why networking matters",
            "desc": "Start with the path that connects every later security topic.",
            "screensCount": 5,
            "sourceRange": "SOURCE 1-5",
            "simulator": "attack-surface",
            "badge": "Core Foundation",
            "screens": [
                {
                    "screenNumber": 1,
                    "globalSource": 1,
                    "title": "The Invisible Backbone of Computing",
                    "summary": "Every digital asset lives on a network. Without networking, isolated computers cannot communicate or be exploited remotely.",
                    "concept": "A network is simply interconnected computing devices capable of exchanging data using established protocols. In cybersecurity, the network is the primary medium through which remote adversaries identify vulnerabilities, establish command and control (C2), pivot laterally, and exfiltrate confidential data.",
                    "cyberLens": {
                        "offensive": "Initial access almost always traverses network protocols (exposed SSH/RDP, vulnerable web services, misconfigured firewalls). Network reconnaissance maps out the entire target landscape.",
                        "defensive": "You cannot defend what you cannot see. Network telemetry (NetFlow, PCAP, IDS logs) provides definitive ground-truth evidence that attackers cannot tamper with as easily as local host logs."
                    },
                    "keyPoints": [
                        "Networks break computing silos through standard communication rules (protocols).",
                        "Red teams exploit network misconfigurations and trust boundaries.",
                        "Blue teams rely on network packet capture (PCAP) as the ultimate source of truth."
                    ],
                    "quiz": {
                        "question": "Why is network-level monitoring often harder for an attacker to evade than local host log tampering?",
                        "options": [
                            "Network packets can never be encrypted.",
                            "Network taps and mirrored traffic exist out-of-band and cannot be disabled from a compromised endpoint.",
                            "Network devices are immune to security bugs.",
                            "Routers automatically block all malicious payloads."
                        ],
                        "answer": 1,
                        "explanation": "Out-of-band network taps, SPAN ports, and central IDS systems capture raw packets over the wire, completely independent of the compromised host's kernel or administrator permissions."
                    }
                },
                {
                    "screenNumber": 2,
                    "globalSource": 2,
                    "title": "The Fundamental Communication Model",
                    "summary": "From Shannon's communication theory to digital packets: Sender, Receiver, Medium, Message, and Protocol.",
                    "concept": "All digital network communication requires five elements:\n1. Sender (Source host)\n2. Receiver (Destination host)\n3. Medium (Copper wires, fiber-optic light, or radio waves)\n4. Message (Data serialized into bits)\n5. Protocol (Mutually agreed syntax, semantics, and timing rules).\nIf protocol rules are violated or out of sync, packets are dropped or misparsed.",
                    "cyberLens": {
                        "offensive": "Protocol Fuzzing: Attackers send malformed messages deliberately breaking protocol specifications to trigger buffer overflows, parser crashes, or memory leaks.",
                        "defensive": "Strict protocol validation at the gateway (Deep Packet Inspection) drops non-RFC compliant payloads before they reach application parsers."
                    },
                    "keyPoints": [
                        "A protocol defines message format, order of exchanges, and required actions.",
                        "Attackers exploit protocol ambiguities to achieve evasion and bypass firewalls.",
                        "Standardization bodies like IETF publish Requests for Comments (RFCs) defining these rules."
                    ],
                    "quiz": {
                        "question": "What happens when an endpoint receives a packet with corrupted bits that fail its checksum calculation?",
                        "options": [
                            "The packet is fixed automatically using AI.",
                            "The packet is discarded at the lower layers to prevent data corruption.",
                            "The operating system executes the packet anyway.",
                            "The sender is automatically blocked by the firewall."
                        ],
                        "answer": 1,
                        "explanation": "At L2 (CRC) and L3/L4 (checksums), corrupt frames or packets that do not match the expected mathematical integrity check are dropped immediately."
                    }
                },
                {
                    "screenNumber": 3,
                    "globalSource": 3,
                    "title": "The Threat Landscape: Network Attack Vectors",
                    "summary": "Mapping network attacks to the CIA triad: Confidentiality, Integrity, and Availability.",
                    "concept": "Network attacks target the fundamental pillars of security:\n- Confidentiality: Eavesdropping, packet sniffing, credential harvesting.\n- Integrity: Man-in-the-Middle (MITM), packet injection, ARP/DNS cache poisoning.\n- Availability: Distributed Denial of Service (DDoS), SYN flooding, bandwidth exhaustion.",
                    "cyberLens": {
                        "offensive": "Adversaries chain network vulnerabilities: an ARP spoof enables cleartext credential sniffing, which grants SSH access, allowing lateral movement.",
                        "defensive": "Defense-in-Depth: Combining encrypted transport (TLS/IPsec), network segmentation (VLANs/firewalls), and continuous anomaly detection."
                    },
                    "keyPoints": [
                        "Passive Attacks: Eavesdropping without modifying traffic (harder to detect).",
                        "Active Attacks: Tampering, replaying, or injecting traffic (easier to detect).",
                        "Encryption defends confidentiality, but metadata (source/dest, timing) remains visible."
                    ],
                    "quiz": {
                        "question": "Which attack type directly violates the 'Integrity' pillar by altering data in transit?",
                        "options": [
                            "Passive Wireshark packet capture",
                            "Man-in-the-Middle (MITM) packet tampering",
                            "SYN Flood DoS attack",
                            "Port scanning with Nmap"
                        ],
                        "answer": 1,
                        "explanation": "A MITM attack intercepts communications between two parties and alters the data payloads or headers before relaying them, violating data integrity."
                    }
                },
                {
                    "screenNumber": 4,
                    "globalSource": 4,
                    "title": "Trust Boundaries & Perimeter Dissolution",
                    "summary": "Why the traditional 'castle-and-moat' security model failed and gave rise to Zero Trust Architecture.",
                    "concept": "Traditional enterprise networks relied on a strong perimeter (firewall) separating the 'trusted' internal network from the 'untrusted' Internet. Once an attacker breached the perimeter (via phishing or VPN exploit), they had unrestricted lateral access to internal servers. Zero Trust enforces 'Never Trust, Always Verify' across all internal and external network flows.",
                    "cyberLens": {
                        "offensive": "In legacy perimeter networks, red teams focus heavily on perimeter breach; once inside, internal servers rarely authenticate intra-VLAN traffic.",
                        "defensive": "Microsegmentation, mutual TLS (mTLS), and continuous identity/context verification prevent lateral movement even if an internal node is compromised."
                    },
                    "keyPoints": [
                        "Perimeters are dissolved by cloud services, remote work, and mobile devices.",
                        "Zero Trust assumes the internal network is already hostile.",
                        "Every request must be authenticated, authorized, and encrypted."
                    ],
                    "quiz": {
                        "question": "What core principle differentiates Zero Trust Architecture from traditional perimeter security?",
                        "options": [
                            "Zero Trust eliminates all firewalls completely.",
                            "Zero Trust assumes internal hosts cannot be trusted and validates every transaction.",
                            "Zero Trust only uses passwords instead of certificates.",
                            "Zero Trust allows all employees full administrative rights."
                        ],
                        "answer": 1,
                        "explanation": "Zero Trust operates on the principle of least privilege and assumes breach, authenticating every user, device, and packet regardless of network location."
                    }
                },
                {
                    "screenNumber": 5,
                    "globalSource": 5,
                    "title": "The Security Analyst's Network Toolkit",
                    "summary": "Essential tools every security professional uses to analyze, audit, and troubleshoot networks.",
                    "concept": "A security engineer must master command-line network inspection utilities:\n- `ping`: ICMP reachability and round-trip time.\n- `traceroute`/`tracert`: Path discovery and hop-by-hop latency via TTL expiration.\n- `netstat`/`ss`: Active listening ports, socket states, and associated process IDs.\n- `arp -a`: Local Layer 2 MAC-to-IP binding cache.\n- `tcpdump`/`wireshark`: Packet capture and deep protocol dissection.",
                    "cyberLens": {
                        "offensive": "Living-off-the-land: Attackers use built-in tools like `arp -a`, `netstat`, and `route print` to perform silent internal host discovery without dropping malware.",
                        "defensive": "Endpoint Detection and Response (EDR) monitors anomalous execution of these native network utilities by non-admin processes."
                    },
                    "keyPoints": [
                        "Mastering network diagnostic tools is non-negotiable for triage and forensics.",
                        "Packet captures (PCAPs) constitute legal evidence in digital incident response.",
                        "Understanding native OS tools reveals what attackers can see once inside."
                    ],
                    "quiz": {
                        "question": "Which command-line tool allows you to view all listening TCP/UDP sockets and their owning process PIDs on a machine?",
                        "options": [
                            "ping -t 127.0.0.1",
                            "netstat -ano (or ss -tulnp)",
                            "ipconfig /flushdns",
                            "traceroute 8.8.8.8"
                        ],
                        "answer": 1,
                        "explanation": "`netstat -ano` (Windows) or `ss -tulnp` (Linux) displays active connections, listening ports, and the Process ID (PID) owning each socket."
                    }
                }
            ]
        },
        {
            "id": "02",
            "module": "01 / FOUNDATIONS",
            "title": "What a network is",
            "desc": "Meet network sizes, client-server systems, and the four ways to address an audience.",
            "screensCount": 4,
            "sourceRange": "SOURCE 6-9",
            "simulator": "addressing-modes",
            "badge": "Architecture",
            "screens": [
                {
                    "screenNumber": 1,
                    "globalSource": 6,
                    "title": "Network Scale & Classifications",
                    "summary": "From personal body-area devices to global autonomous systems: PAN, LAN, CAN, MAN, and WAN.",
                    "concept": "- PAN (Personal Area Network): Bluetooth, Zigbee (~1-10 meters).\n- LAN (Local Area Network): High-speed, low latency within an office or home (Ethernet, Wi-Fi).\n- CAN (Campus Area Network): Interconnected LANs across a university or corporate campus.\n- MAN (Metropolitan Area Network): City-wide connectivity (cable TV networks, municipal fiber).\n- WAN (Wide Area Network): Global Internet, spanning countries via submarine cables and satellite constellations.",
                    "cyberLens": {
                        "offensive": "War-driving targets exposed corporate Wi-Fi (LANs) from the parking lot. WAN edges (exposed VPN portals) are prime targets for initial access brokers.",
                        "defensive": "Network boundary segmentation prevents compromised remote WAN devices from accessing sensitive campus core LAN databases."
                    },
                    "keyPoints": [
                        "LANs feature high bandwidth (1-100 Gbps) and low latency (<1ms).",
                        "WANs cross public telecommunications and untrusted service provider transit lines.",
                        "Traffic traversing WAN boundaries must always be encrypted."
                    ],
                    "quiz": {
                        "question": "What is the primary security distinction between a corporate LAN and a WAN connection?",
                        "options": [
                            "LANs never use IP addresses.",
                            "WAN traffic crosses untrusted public infrastructure and requires cryptographic protection like IPsec.",
                            "WANs are completely immune to physical wiretapping.",
                            "LANs do not require passwords."
                        ],
                        "answer": 1,
                        "explanation": "Because WAN circuits pass through public telecommunication providers and submarine/underground cables, unencrypted WAN traffic is subject to state-level wiretapping and ISP surveillance."
                    }
                },
                {
                    "screenNumber": 2,
                    "globalSource": 7,
                    "title": "Architectural Paradigms: Client-Server vs P2P",
                    "summary": "Centralized authority versus decentralized nodes: operational resilience and attack vectors.",
                    "concept": "- Client-Server: Central servers host resources and provide services (web, database, auth); clients request resources. Centralized security enforcement, but server is a single point of failure (SPOF).\n- Peer-to-Peer (P2P): Every node acts as both client and server (BitTorrent, blockchain, Tor). Highly resilient against censorship and single-node take-downs, but decentralized trust makes content moderation and malicious peer injection challenging.",
                    "cyberLens": {
                        "offensive": "Botnets (e.g. Mirai, Emotet) historically used central C2 servers (easy to take down via domain sinkholing). Advanced botnets use P2P topologies (like Conficker or Necurs) to resist takedowns.",
                        "defensive": "Client-server traffic can be inspected at central egress firewalls; P2P traffic often requires application-layer heuristics to block rogue data transfers."
                    },
                    "keyPoints": [
                        "Client-server enables centralized identity, logging, and access control.",
                        "P2P distributes storage and bandwidth across decentralized swarms.",
                        "Modern advanced malware utilizes P2P protocols for resilient Command & Control."
                    ],
                    "quiz": {
                        "question": "Why did modern botnet operators transition from centralized IRC servers to P2P C2 networks?",
                        "options": [
                            "P2P networks make internet connection faster.",
                            "Centralized IRC servers can be easily seized or sinkholed by law enforcement and security researchers.",
                            "P2P requires no computer code to run.",
                            "Centralized servers cannot use DNS."
                        ],
                        "answer": 1,
                        "explanation": "Centralized C2 servers have a single IP/domain that defenders can block or sinkhole. In P2P botnets, every infected peer relays commands, eliminating any single point of failure."
                    }
                },
                {
                    "screenNumber": 3,
                    "globalSource": 8,
                    "title": "The Four Addressing Modes",
                    "summary": "How packets find their target: Unicast, Broadcast, Multicast, and Anycast.",
                    "concept": "1. Unicast (One-to-One): Direct transmission between a specific source and destination (e.g., standard HTTPS web browsing).\n2. Broadcast (One-to-All): Transmission to every host on the local broadcast domain (e.g., ARP Request FF:FF:FF:FF:FF:FF, DHCP Discover).\n3. Multicast (One-to-Many): Packets sent to a designated group address, received only by subscribed members (e.g., OSPF routing updates 224.0.0.5, video streaming).\n4. Anycast (One-to-Nearest): The same IP address is advertised by multiple geographically distributed servers; BGP routes the client to the topologically closest server (e.g., Cloudflare 1.1.1.1, Google 8.8.8.8, Root DNS servers).",
                    "cyberLens": {
                        "offensive": "Broadcast Storms & Smurf Attacks: Attackers exploit broadcast addresses to amplify traffic. Rogue broadcast responses (e.g. Responder poisoning LLMNR/NBT-NS) harvest Windows hashes.",
                        "defensive": "Anycast is the primary architecture used to absorb massive multi-terabit DDoS attacks by distributing attack traffic across dozens of global scrubbing centers."
                    },
                    "keyPoints": [
                        "Unicast is the foundation of point-to-point web and API traffic.",
                        "Broadcast does not cross Layer 3 routers; it stays confined to the local subnet.",
                        "Anycast provides automatic high availability and DDoS mitigation for major DNS and CDN providers."
                    ],
                    "quiz": {
                        "question": "When you query Google Public DNS at 8.8.8.8, how does the internet ensure you reach a datacenter near you rather than one on the other side of the planet?",
                        "options": [
                            "Through broadcast packets forwarded across the globe.",
                            "Through Anycast routing, where multiple global edge servers advertise 8.8.8.8 via BGP.",
                            "Through peer-to-peer torrenting of DNS records.",
                            "Through a single giant supercomputer located in California."
                        ],
                        "answer": 1,
                        "explanation": "Anycast allows hundreds of edge datacenters around the world to announce the exact same IP (8.8.8.8) using BGP. Internet routers naturally send each user's query to the nearest BGP path."
                    }
                },
                {
                    "screenNumber": 4,
                    "globalSource": 9,
                    "title": "Broadcast Domains & Collision Domains",
                    "summary": "The two fundamental boundaries governing local traffic propagation and security isolation.",
                    "concept": "- Collision Domain: The physical network area where packet transmissions can collide on a shared medium (e.g. devices connected to a legacy Hub or half-duplex Wi-Fi). Each port on a switch creates its own isolated collision domain.\n- Broadcast Domain: The logical boundary where all devices receive Layer 2 broadcast frames. Switches forward broadcasts out all ports. Only Layer 3 routers and VLANs break up broadcast domains.",
                    "cyberLens": {
                        "offensive": "In a shared collision domain or large broadcast domain, any host can sniff local unencrypted traffic or poison ARP caches for all peers in the subnet.",
                        "defensive": "Subdividing large networks into small VLANs shrinks the broadcast domain, containing malware propagation, ransomware worms, and credential sniffing."
                    },
                    "keyPoints": [
                        "Switches eliminate collision domains on full-duplex links.",
                        "Routers terminate broadcast domains; broadcast packets are never routed across the internet.",
                        "VLANs (Virtual LANs) allow a single physical switch to host multiple isolated broadcast domains."
                    ],
                    "quiz": {
                        "question": "Which networking device separates broadcast domains by default?",
                        "options": [
                            "Layer 1 Hub",
                            "Unmanaged Layer 2 Switch",
                            "Layer 3 Router",
                            "Ethernet Patch Cable"
                        ],
                        "answer": 2,
                        "explanation": "Routers operate at Layer 3 and do not forward Layer 2 broadcast frames, effectively isolating broadcast traffic to the local network segment."
                    }
                }
            ]
        },
        {
            "id": "03",
            "module": "01 / FOUNDATIONS",
            "title": "Topologies",
            "desc": "See how network shape affects reliability and traffic visibility.",
            "screensCount": 3,
            "sourceRange": "SOURCE 10-12",
            "simulator": "topology-sandbox",
            "badge": "Design",
            "screens": [
                {
                    "screenNumber": 1,
                    "globalSource": 10,
                    "title": "Physical vs Logical Topologies",
                    "summary": "How cables are wired versus how data actually flows across the network medium.",
                    "concept": "- Physical Topology: The physical layout of cables, nodes, and devices in space (e.g., physical Star topology where all devices plug into a central switch).\n- Logical Topology: The path data packets follow across the network regardless of physical appearance (e.g. legacy Token Ring physically wired as a star into a MAU, but passing a logical token in a ring; or Wi-Fi physically looking like a star to an AP, but logically behaving like a shared bus medium).",
                    "cyberLens": {
                        "offensive": "Attackers exploit logical shared mediums (like wireless radio frequencies) to intercept frames even when physical premises are locked.",
                        "defensive": "Security teams document both physical cable plants (for tamper detection) and logical data flow diagrams (for firewall rule verification)."
                    },
                    "keyPoints": [
                        "Physical star with logical bus/star is standard in modern Ethernet LANs.",
                        "Logical topology dictates who can physically overhear packets on the wire.",
                        "Wi-Fi is logically a shared bus: anyone within radio range can capture raw frames."
                    ],
                    "quiz": {
                        "question": "Why is Wi-Fi logically considered a shared bus medium, even if all devices connect to one central Access Point?",
                        "options": [
                            "Because it uses fiber optic cables.",
                            "Because all devices share the exact same radio frequency spectrum and can detect collisions.",
                            "Because Wi-Fi does not use IP addresses.",
                            "Because switches are used in wireless antennas."
                        ],
                        "answer": 1,
                        "explanation": "Radio waves propagate through open air on shared channels. All wireless cards tuned to that channel receive the raw RF energy, requiring collision avoidance (CSMA/CA) just like a shared bus."
                    }
                },
                {
                    "screenNumber": 2,
                    "globalSource": 11,
                    "title": "The Classic Topologies: Bus, Ring, Star, Mesh",
                    "summary": "Analyzing resilience, single points of failure (SPOF), and scaling trade-offs.",
                    "concept": "1. Bus: Single central backbone cable with terminators. Cheap, but cable break takes down entire network; shared collision domain.\n2. Ring: Nodes connected in a closed loop with token passing. Predictable latency, but single link break interrupts the ring.\n3. Star: All nodes connect to a central hub/switch. Easy to install and troubleshoot; if one cable breaks, only that node goes down; switch is the SPOF.\n4. Mesh (Full & Partial): Nodes have redundant point-to-point links. Full mesh requires N(N-1)/2 links. Extremely fault-tolerant, used in core ISP backbones and critical data centers.",
                    "cyberLens": {
                        "offensive": "Red teams identify Single Points of Failure (SPOF) to execute targeted denial of service or locate the best choke-point for passive network sniffing.",
                        "defensive": "High Availability (HA) designs use redundant dual-homed star topologies with protocols like VRRP/HSRP and Spanning Tree Protocol (STP) to prevent bridge loops."
                    },
                    "keyPoints": [
                        "Star topology is universal for access layers due to isolation of cable faults.",
                        "Full mesh provides maximum fault tolerance at highest cabling cost.",
                        "ISP tier-1 backbones utilize partial/full mesh for continuous packet rerouting."
                    ],
                    "quiz": {
                        "question": "How many point-to-point connections are required to build a fully meshed network of 6 core routers?",
                        "options": [
                            "6 links",
                            "12 links",
                            "15 links",
                            "36 links"
                        ],
                        "answer": 2,
                        "explanation": "The formula for full mesh is N(N-1)/2. For 6 nodes: 6 × 5 / 2 = 15 direct links."
                    }
                },
                {
                    "screenNumber": 3,
                    "globalSource": 12,
                    "title": "Enterprise Hybrid & Spine-Leaf Architectures",
                    "summary": "Modern cloud and datacenter network design: predictable east-west latency and zero oversubscription.",
                    "concept": "Modern enterprise data centers have moved away from the traditional 3-tier (Core-Aggregation-Access) tree topology to a modern Spine-Leaf (Clos) architecture:\n- Every Leaf switch connects to every Spine switch.\n- Any server can reach any other server in exactly two hops (Leaf -> Spine -> Leaf).\n- East-West traffic (server-to-server microservices and DB replication) travels with ultra-low, deterministic latency compared to traditional north-south internet traffic.",
                    "cyberLens": {
                        "offensive": "Attackers moving laterally in modern datacenters rely on east-west server communication paths which are frequently less scrutinized than north-south internet gateways.",
                        "defensive": "Microsegmentation and East-West firewall inspection (East-West IDS/IPS) inspect internal server-to-server traffic inside the spine-leaf fabric."
                    },
                    "keyPoints": [
                        "Spine-Leaf eliminates Spanning Tree blocking by using Equal-Cost Multi-Path (ECMP) routing.",
                        "East-West traffic (datacenter internal) now accounts for >80% of enterprise packets.",
                        "Segmentation must be enforced at the Leaf layer via VXLAN and distributed firewalls."
                    ],
                    "quiz": {
                        "question": "In a Spine-Leaf datacenter topology, how many switch hops are required for two servers on different leaf switches to communicate?",
                        "options": [
                            "1 hop",
                            "2 hops (Leaf -> Spine -> Leaf)",
                            "5 to 7 hops depending on spanning tree",
                            "Spine switches do not forward packets"
                        ],
                        "answer": 1,
                        "explanation": "In a 2-tier Spine-Leaf architecture, every leaf is connected to every spine. Traffic from Leaf A goes up to any Spine, and directly down to Leaf B — exactly 2 switch hops."
                    }
                }
            ]
        },
        {
            "id": "04",
            "module": "01 / FOUNDATIONS",
            "title": "Transmission, media & devices",
            "desc": "Trace bits through cables, radio, switches, routers, and firewalls.",
            "screensCount": 6,
            "sourceRange": "SOURCE 13-18",
            "simulator": "device-working-sim",
            "badge": "Hardware & L1/L2",
            "screens": [
                {
                    "screenNumber": 1,
                    "globalSource": 13,
                    "title": "Physical Media: Copper & Twisted Pair",
                    "summary": "Unshielded (UTP) vs Shielded (STP), categories, cancellation, and electromagnetic interference.",
                    "concept": "Twisted pair copper cables (Cat5e, Cat6, Cat6a, Cat7) are the standard for LAN drops:\n- Pairs of copper wires are twisted around each other at specific twist rates to cancel out Electromagnetic Interference (EMI) and crosstalk via differential signaling.\n- Maximum standard Ethernet run distance is 100 meters (328 feet).\n- Pinouts: T568A and T568B. Straight-through cables connect dissimilar devices; crossover cables connect similar devices (largely automated today by Auto-MDIX).",
                    "cyberLens": {
                        "offensive": "Physical Wiretapping: Unshielded twisted pair cables emit weak electromagnetic radiation (TEMPEST). In high-security environments, adversaries can use inductive amplifier probes to eavesdrop without splicing the cable.",
                        "defensive": "High-security facilities use Shielded Twisted Pair (STP), shielded metal conduits, or switch port security to detect cable disconnects."
                    },
                    "keyPoints": [
                        "Cat6 supports 10 Gbps up to 55m; Cat6a supports 10 Gbps up to full 100m.",
                        "Twisting wires cancels external noise through differential signaling.",
                        "Maximum certified length for standard twisted-pair Ethernet is 100 meters."
                    ],
                    "quiz": {
                        "question": "What physical phenomenon allows twisted-pair cables to reject external electromagnetic noise without heavy shielding?",
                        "options": [
                            "Superconductivity",
                            "Differential signaling and magnetic cancellation across opposing twists",
                            "Fiber optic reflection",
                            "Radio frequency amplification"
                        ],
                        "answer": 1,
                        "explanation": "Because signals are sent as equal and opposite polarities on twisted wires, external noise couples equally onto both wires and is cancelled out at the differential receiver."
                    }
                },
                {
                    "screenNumber": 2,
                    "globalSource": 14,
                    "title": "Physical Media: Fiber Optics & Wireless RF",
                    "summary": "Photons through glass cores and electromagnetic waves through free space.",
                    "concept": "- Fiber Optics: Transmits data as pulses of light using Total Internal Reflection through a pure glass/silica core.\n  - Single-Mode Fiber (SMF): Tiny 9-micron core, laser light source, supports long distances (tens of kilometers) with near-zero modal dispersion. Used for WAN and campus backbones.\n  - Multi-Mode Fiber (MMF): Larger 50/62.5-micron core, LED/VCSEL light source, for short distances (up to 550m) in datacenters.\n- Wireless (RF): 2.4 GHz (longer range, high wall penetration, crowded) vs 5 GHz/6 GHz (higher throughput, wider channels, lower range).",
                    "cyberLens": {
                        "offensive": "Fiber Bending Clamps: Attackers can micro-bend a fiber cable to leak light onto a photodiode to sniff data without breaking the link. Wi-Fi allows unauthenticated frame sniffing from miles away using high-gain directional antennas.",
                        "defensive": "Fiber networks are immune to EMI and lightning strikes. Critical fiber links use Optical Time-Domain Reflectometry (OTDR) to detect tap insertion in milliseconds."
                    },
                    "keyPoints": [
                        "Fiber is immune to electromagnetic interference, radio jamming, and electrical ground loops.",
                        "Single-mode fiber is the backbone of global undersea cables and long-haul telecommunications.",
                        "Wi-Fi signals penetrate physical walls, requiring strong WPA3 encryption."
                    ],
                    "quiz": {
                        "question": "Why is fiber-optic cabling preferred over copper for connecting separate buildings across a corporate campus?",
                        "options": [
                            "Fiber is much cheaper than copper wire.",
                            "Fiber is immune to electrical ground loops, lightning surges, and EMI.",
                            "Fiber does not require any transceivers.",
                            "Fiber works without electricity anywhere in the building."
                        ],
                        "answer": 1,
                        "explanation": "Different buildings often have differing electrical ground potentials. Connecting them with copper can cause destructive ground loops and attract lightning strikes. Glass fiber carries light and is completely non-conductive."
                    }
                },
                {
                    "screenNumber": 3,
                    "globalSource": 15,
                    "title": "Layer 1 Devices: Repeaters and Hubs",
                    "summary": "Dumb signal re-amplifiers and the nightmare of shared collision domains.",
                    "concept": "- Repeater: Pure Layer 1 device that receives an electrical signal, cleans noise, regenerates it at original strength, and sends it out to extend cable distance.\n- Hub (Multi-port repeater): Receives an electrical bit on one port and blindly repeats (floods) it out to EVERY other port. Hubs operate purely in half-duplex. All connected devices share a single collision domain and broadcast domain.",
                    "cyberLens": {
                        "offensive": "Eavesdropping Paradise: Connecting a laptop to a hub allows Wireshark to capture every packet from every computer connected to that hub without any hacking tools or ARP poisoning.",
                        "defensive": "Legacy hubs are banned in modern secure networks. Network engineers replace hubs with switches to enforce traffic isolation."
                    },
                    "keyPoints": [
                        "Hubs do not read MAC addresses, IP addresses, or packet headers.",
                        "Only one device can transmit at a time on a hub; others must wait (CSMA/CD).",
                        "Security monitoring taps sometimes intentionally mimic hub behavior to copy traffic."
                    ],
                    "quiz": {
                        "question": "What happens when Host A sends a private credit card packet to Host B on an unmanaged Ethernet Hub?",
                        "options": [
                            "The hub encrypts the packet before delivery.",
                            "The hub reads Host B's MAC address and delivers it only to Host B.",
                            "The hub repeats the packet electrical signal out of every single port, allowing all connected hosts to sniff it.",
                            "The hub drops the packet if it contains sensitive data."
                        ],
                        "answer": 2,
                        "explanation": "Hubs have zero intelligence; they operate at Layer 1 (bits). An incoming signal on one port is blindly repeated to all other ports, exposing data to any eavesdropper."
                    }
                },
                {
                    "screenNumber": 4,
                    "globalSource": 16,
                    "title": "Layer 2 Devices: Bridges and Switches",
                    "summary": "Intelligent frame forwarding, MAC learning, and CAM table mechanics.",
                    "concept": "A Switch is an intelligent multiport bridge operating at Layer 2:\n1. Learning: Reads the Source MAC address of every incoming frame and records it in its Content Addressable Memory (CAM) table along with the ingress port and VLAN.\n2. Forwarding / Filtering: Looks up the Destination MAC address in the CAM table.\n   - If found: Forwards frame ONLY to that specific destination port (microsegmentation).\n   - If unknown (or broadcast FF:FF:FF:FF:FF:FF): Floods frame out all ports except the receiving port (Unknown Unicast Flooding).\n3. Full Duplex: Enables simultaneous sending and receiving, eliminating collisions completely.",
                    "cyberLens": {
                        "offensive": "CAM Table Overflow Attack (macof): Attackers flood the switch with thousands of bogus random MAC addresses. Once the CAM table memory is exhausted, the switch fails open and behaves like a hub, broadcasting all traffic to all ports!",
                        "defensive": "Port Security: Restricts the maximum number of learned MAC addresses per switch port, shutting down the port or dropping packets if violation occurs."
                    },
                    "keyPoints": [
                        "Switches break up collision domains per port; broadcast domain remains shared.",
                        "CAM table maps MAC address -> physical switch port.",
                        "Port Security with sticky MAC addresses prevents CAM overflow attacks."
                    ],
                    "quiz": {
                        "question": "How does an enterprise switch react during a successful CAM Table Overflow attack when its MAC address memory is completely full?",
                        "options": [
                            "It crashes and reboots into safe mode.",
                            "It enters 'fail-open' mode, flooding all unknown unicast frames out all ports like a hub.",
                            "It automatically blocks the attacker's IP address.",
                            "It begins encrypting all packets with AES-256."
                        ],
                        "answer": 1,
                        "explanation": "When the CAM table overflows, the switch cannot learn new MACs and cannot find existing destinations in its table. It defaults to 'unknown unicast flooding', broadcasting all packets out all ports, allowing the attacker to sniff traffic."
                    }
                },
                {
                    "screenNumber": 5,
                    "globalSource": 17,
                    "title": "Layer 3 Devices: Routers and Layer 3 Switches",
                    "summary": "Interconnecting subnets, routing tables, and the boundary of the local link.",
                    "concept": "Routers operate at Layer 3 (Network layer):\n- They strip the Layer 2 Ethernet frame (decapsulation), read the destination IP in the Layer 3 header, look up the best matching route in the Routing Table (longest prefix match), decrement the Time to Live (TTL), calculate a new checksum, and re-encapsulate the packet into a new L2 frame for the next hop.\n- Routers do NOT forward Layer 2 broadcasts; they terminate broadcast domains.",
                    "cyberLens": {
                        "offensive": "Routing Table Poisoning: Attackers inject malicious BGP or OSPF route advertisements to divert global or enterprise traffic through attacker-controlled systems (BGP Hijacking).",
                        "defensive": "Access Control Lists (ACLs) on routers filter traffic at network perimeters based on source IP, destination IP, and protocol ports."
                    },
                    "keyPoints": [
                        "Routers connect different networks (subnets) and choose the best path.",
                        "Layer 2 MAC addresses change hop-by-hop; Layer 3 IP addresses stay constant end-to-end.",
                        "Routers isolate broadcast traffic to their local interfaces."
                    ],
                    "quiz": {
                        "question": "As a packet travels across 4 different routers from your laptop to a remote web server, what changes at each router hop?",
                        "options": [
                            "The Source and Destination IP addresses change completely.",
                            "The Layer 2 Source and Destination MAC addresses are rewritten for each physical link, while IPs remain intact.",
                            "The payload data is converted from binary to text.",
                            "The TCP port numbers change at every router."
                        ],
                        "answer": 1,
                        "explanation": "MAC addresses are only locally significant to the current physical data link. Routers strip the old L2 frame and generate a new L2 frame with new MAC addresses for the next hop, while the L3 IP addresses stay unchanged (unless NAT is applied)."
                    }
                },
                {
                    "screenNumber": 6,
                    "globalSource": 18,
                    "title": "Security Enforcers: Firewalls, IDS & IPS",
                    "summary": "Packet filtering, stateful connection tracking, and deep inline inspection.",
                    "concept": "- Stateless Packet Filters: Inspect headers (Src/Dst IP, Port) in isolation against static ACL rules without memory of previous packets.\n- Stateful Inspection Firewalls: Maintain a State Table tracking connection handshakes (e.g. TCP SYN, SYN-ACK, ACK). Outbound connection replies are automatically permitted back through.\n- Next-Generation Firewalls (NGFW) & IPS: Reassemble full streams, perform Deep Packet Inspection (DPI) up to Layer 7, decode TLS, inspect application payloads, and block malware signatures in real-time.",
                    "cyberLens": {
                        "offensive": "Firewall Evasion: Fragmentation attacks, non-standard port tunneling (e.g., DNS or HTTPS tunneling), and encrypted payloads hide malicious traffic from basic packet filters.",
                        "defensive": "SSL/TLS Decryption Inspection at enterprise firewalls inspects inside encrypted HTTPS streams to block command-and-control traffic and data exfiltration."
                    },
                    "keyPoints": [
                        "Stateful firewalls track TCP connection states (ESTABLISHED, NEW, RELATED).",
                        "IDS alerts passively; IPS sits inline and actively drops malicious packets.",
                        "NGFWs inspect application-layer context (e.g. distinguishing corporate Slack from file download)."
                    ],
                    "quiz": {
                        "question": "What critical advantage does a Stateful Inspection firewall have over a traditional Stateless Packet Filter?",
                        "options": [
                            "Stateful firewalls do not use IP addresses.",
                            "Stateful firewalls track established connection states, automatically allowing legitimate return traffic without needing static open inbound ports.",
                            "Stateful firewalls never drop packets.",
                            "Stateful firewalls replace all operating system updates."
                        ],
                        "answer": 1,
                        "explanation": "Stateful firewalls remember outbound connection requests in an internal state table. When the remote server replies, the firewall recognizes it as part of an ESTABLISHED session and permits it through."
                    }
                }
            ]
        },
        {
            "id": "05",
            "module": "02 / MODELS AND THE LOCAL LINK",
            "title": "The OSI model",
            "desc": "Use seven layers to describe a packet and find the source of a problem.",
            "screensCount": 6,
            "sourceRange": "SOURCE 19-24",
            "simulator": "encapsulation-sim",
            "badge": "Standard Model",
            "screens": [
                {
                    "screenNumber": 1,
                    "globalSource": 19,
                    "title": "The 7-Layer Conceptual Framework",
                    "summary": "Why the ISO created the 7 layers and how network modularity simplifies troubleshooting.",
                    "concept": "The Open Systems Interconnection (OSI) reference model divides network communications into 7 standardized layers:\nLayer 7: Application (User interface, HTTP, DNS, SSH)\nLayer 6: Presentation (Encoding, ASCII, JPEG, Encryption, Compression)\nLayer 5: Session (Dialog control, RPC, session establishment)\nLayer 4: Transport (End-to-end reliability, TCP/UDP, Ports)\nLayer 3: Network (Logical addressing, IP, Routing, ICMP)\nLayer 2: Data Link (Physical addressing, MAC, Frames, Switches)\nLayer 1: Physical (Bits, electrical signals, light, radio waves, cables)\nMnemonic: 'All People Seem To Need Data Processing' (top-down) or 'Please Do Not Throw Sausage Pizza Away' (bottom-up).",
                    "cyberLens": {
                        "offensive": "Red teams categorize attack techniques by OSI layer: L2 MAC spoofing, L3 IP spoofing, L4 SYN flood, L7 SQL injection.",
                        "defensive": "Structured troubleshooting: Security analysts isolate whether a security incident is a physical cable issue (L1), switch loop (L2), bad route (L3), blocked port (L4), or web application bug (L7)."
                    },
                    "keyPoints": [
                        "Each layer only talks to the layer directly above and below it.",
                        "Standardization ensures hardware and software from different vendors interoperate.",
                        "The OSI model is a theoretical reference; the real internet runs on TCP/IP."
                    ],
                    "quiz": {
                        "question": "Which OSI layer is responsible for converting character encoding, data compression, and initial data formatting?",
                        "options": [
                            "Layer 2 - Data Link",
                            "Layer 4 - Transport",
                            "Layer 6 - Presentation",
                            "Layer 3 - Network"
                        ],
                        "answer": 2,
                        "explanation": "Layer 6 (Presentation) formats, translates, serializes, compresses, and encodes/decodes data so that applications on different systems can interpret it."
                    }
                },
                {
                    "screenNumber": 2,
                    "globalSource": 20,
                    "title": "Protocol Data Units (PDUs)",
                    "summary": "Bits, Frames, Packets, Segments, and Data: the anatomy of data as it transitions between layers.",
                    "concept": "Each layer packages data into a specific Protocol Data Unit (PDU):\n- Layer 1: Bits (0s and 1s transmitted as voltage, light, or RF pulses)\n- Layer 2: Frame (Ethernet frame with MAC header + payload + FCS trailer)\n- Layer 3: Packet / Datagram (IP packet with IP header + transport payload)\n- Layer 4: Segment (TCP segment) / Datagram (UDP datagram) with port header\n- Layer 5-7: Data / Message (Application payload, HTTP request/response).",
                    "cyberLens": {
                        "offensive": "Protocol header manipulation: Attackers forge specific PDU headers (e.g. setting custom TCP flags or fake source IP addresses) to bypass security filters.",
                        "defensive": "Packet capture tools (Wireshark, tcpdump) decode PDUs layer-by-layer, allowing analysts to correlate lower-layer transport anomalies with upper-layer application exploits."
                    },
                    "keyPoints": [
                        "Memorize PDU names: Bits -> Frames -> Packets -> Segments -> Data.",
                        "Headers contain control metadata; trailers usually contain checksums (CRC).",
                        "A packet is encapsulated inside a frame; a segment is encapsulated inside a packet."
                    ],
                    "quiz": {
                        "question": "What is the correct PDU term for data encapsulated at the Network layer (Layer 3)?",
                        "options": [
                            "Frame",
                            "Packet (or Datagram)",
                            "Segment",
                            "Bitstream"
                        ],
                        "answer": 1,
                        "explanation": "At Layer 3 (Network Layer, e.g. IPv4/IPv6), the PDU is formally known as a Packet or Datagram."
                    }
                },
                {
                    "screenNumber": 3,
                    "globalSource": 21,
                    "title": "Encapsulation & Decapsulation",
                    "summary": "How data is wrapped in headers going down the stack and unwrapped coming up.",
                    "concept": "- Encapsulation (Sender): Application data is handed down the stack. Each layer prepends its own header (and L2 appends a trailer). Layer 7 Data -> L4 adds Port Header -> L3 adds IP Header -> L2 adds MAC Header and CRC -> L1 transmits Bits.\n- Decapsulation (Receiver): Incoming bits are received at L1. L2 checks CRC and strips MAC header -> L3 reads IP and strips IP header -> L4 checks Port and strips TCP header -> L7 application processes the raw data.",
                    "cyberLens": {
                        "offensive": "Tunneling / C2 Over Encapsulation: Malware encapsulates forbidden protocol traffic inside permitted protocols (e.g., DNS Tunneling, ICMP Tunneling, WebSocket C2) to evade firewalls.",
                        "defensive": "Firewall Deep Packet Inspection (DPI) decapsulates nested protocols to expose hidden payloads and verify payload conformity."
                    },
                    "keyPoints": [
                        "Encapsulation is like placing a letter inside multiple nested envelopes.",
                        "Each layer header contains a protocol identifier field indicating what comes next (e.g. EtherType, IP Protocol field).",
                        "Decapsulation occurs at the receiving host and at intermediate routers/switches."
                    ],
                    "quiz": {
                        "question": "How does an Ethernet Frame header inform the operating system which Layer 3 protocol (IPv4, IPv6, or ARP) is encapsulated inside it?",
                        "options": [
                            "By scanning the entire payload with AI",
                            "Through the 2-byte EtherType field (e.g., 0x0800 for IPv4, 0x0806 for ARP)",
                            "Through the MAC address",
                            "Ethernet frames cannot contain IPv6"
                        ],
                        "answer": 1,
                        "explanation": "The EtherType field in the Ethernet II header explicitly identifies the encapsulated protocol: 0x0800 for IPv4, 0x86DD for IPv6, and 0x0806 for ARP."
                    }
                },
                {
                    "screenNumber": 4,
                    "globalSource": 22,
                    "title": "The Lower Layers: L1, L2, and L3",
                    "summary": "From physical bits to local frame switching and global IP routing.",
                    "concept": "- Layer 1 (Physical): Voltage levels, fiber wavelengths, RF frequencies, pinouts. Device: Repeater, Hub, Cable, Transceiver.\n- Layer 2 (Data Link): Framing, physical addressing (MAC), error detection (CRC), flow control, media access (CSMA/CD). Device: Switch, Bridge, NIC.\n- Layer 3 (Network): Logical addressing (IPv4/IPv6), path selection, routing between subnets, packet fragmentation, TTL management. Device: Router, Layer 3 Switch.",
                    "cyberLens": {
                        "offensive": "Layer 2 attacks bypass traditional firewalls because they occur inside the local broadcast domain (e.g., ARP poisoning, DHCP starvation).",
                        "defensive": "Dynamic ARP Inspection (DAI), DHCP Snooping, and 802.1X Port Authentication secure Layer 2 before packets reach Layer 3 routing."
                    },
                    "keyPoints": [
                        "L1 handles physical transmission of raw bits.",
                        "L2 guarantees error-free frame delivery on the single local link.",
                        "L3 enables packet delivery across disparate, heterogeneous networks worldwide."
                    ],
                    "quiz": {
                        "question": "Which layer is responsible for determining the optimal path across multiple intermediate networks to reach a destination host on another continent?",
                        "options": [
                            "Layer 1 Physical",
                            "Layer 2 Data Link",
                            "Layer 3 Network",
                            "Layer 5 Session"
                        ],
                        "answer": 2,
                        "explanation": "Layer 3 (Network) handles global logical addressing and path determination (routing) across interconnected autonomous systems."
                    }
                },
                {
                    "screenNumber": 5,
                    "globalSource": 23,
                    "title": "The Upper Layers: L4, L5, L6, and L7",
                    "summary": "End-to-end transport reliability, session continuity, syntax translation, and application logic.",
                    "concept": "- Layer 4 (Transport): Process-to-process communication via Port numbers, connection management (TCP 3-way handshake), flow control, reliability.\n- Layer 5 (Session): Establishes, manages, and terminates dialogs between local and remote applications (RPC, NetBIOS, SIP).\n- Layer 6 (Presentation): Formatting, character serialization, compression (gzip), and cryptographic presentation.\n- Layer 7 (Application): Protocols directly interacting with software (HTTP/HTTPS, DNS, SMTP, FTP, SSH).",
                    "cyberLens": {
                        "offensive": "Layer 7 attacks (SQL Injection, Cross-Site Scripting, Deserialization) bypass network firewalls because the packet headers (IP and Port 443) are completely legitimate.",
                        "defensive": "Web Application Firewalls (WAF) inspect Layer 7 HTTP payloads and decode encoded malicious characters before application execution."
                    },
                    "keyPoints": [
                        "L4 multiplexes traffic to specific running processes using port numbers.",
                        "L5-L7 are merged into the Application layer in the TCP/IP model.",
                        "Modern exploits increasingly target Layer 7 because lower layers are well-standardized."
                    ],
                    "quiz": {
                        "question": "Why do standard network firewalls operating at Layer 3/4 fail to detect an SQL injection attack in an HTTP POST request?",
                        "options": [
                            "SQL queries do not use electricity.",
                            "Layer 3/4 firewalls only inspect IP addresses and port numbers, ignoring the application payload where the SQL query resides.",
                            "SQL queries can only be detected by routers.",
                            "HTTP cannot be blocked by any firewall."
                        ],
                        "answer": 1,
                        "explanation": "Layer 3/4 firewalls only examine IP headers and TCP/UDP ports. Since port 443 (HTTPS) is permitted, the malicious SQL payload passes right through unless an L7 WAF inspects it."
                    }
                },
                {
                    "screenNumber": 6,
                    "globalSource": 24,
                    "title": "Mapping Attacks Across the 7 Layers",
                    "summary": "A comprehensive cybersecurity matrix of attacks and defensive controls for each OSI layer.",
                    "concept": "- L1: Cable tapping, RF jamming, physical port tampering -> Control: Physical access security, conduit piping, Faraday cages.\n- L2: ARP Poisoning, MAC flooding, VLAN hopping, STP manipulation -> Control: Port security, Dynamic ARP Inspection, DHCP Snooping, 802.1X.\n- L3: IP spoofing, ICMP floods, BGP hijacking -> Control: Ingress/egress ACLs, RPKI, Unicast Reverse Path Forwarding (uRPF).\n- L4: SYN flood DoS, TCP reset attacks, port scanning -> Control: SYN cookies, stateful inspection, rate limiting.\n- L5-L6: Session hijacking, SSL stripping, downgrade attacks -> Control: TLS 1.3, HSTS, Secure cookies.\n- L7: SQLi, XSS, CSRF, DNS tunneling, credential stuffing -> Control: WAF, input sanitization, mTLS, API gateways.",
                    "cyberLens": {
                        "offensive": "A skilled penetration tester chooses the lowest possible layer necessary to accomplish the objective with minimal logging.",
                        "defensive": "Defense-in-depth requires active security controls deployed at every single layer of the stack."
                    },
                    "keyPoints": [
                        "Security is not a single point; vulnerabilities exist at every OSI tier.",
                        "If a lower layer is compromised, all layers above it are implicitly untrusted.",
                        "Mastering layer mapping allows you to pass CompTIA Security+, CEH, and CISSP exams."
                    ],
                    "quiz": {
                        "question": "If an attacker succeeds in executing an ARP Poisoning attack at Layer 2, what happens to the security of all upper layers (L3-L7) transmitting unencrypted data?",
                        "options": [
                            "Upper layers are completely unaffected because they are higher up.",
                            "All unencrypted upper-layer traffic is intercepted, read, and modified by the attacker.",
                            "The router automatically disables Layer 2.",
                            "The attacker is blocked by the DNS server."
                        ],
                        "answer": 1,
                        "explanation": "Networking is hierarchical: if the underlying Layer 2 foundation is compromised, the attacker becomes the Man-in-the-Middle and controls all packets flowing through it."
                    }
                }
            ]
        },
        {
            "id": "06",
            "module": "02 / MODELS AND THE LOCAL LINK",
            "title": "The TCP/IP model",
            "desc": "Map the teaching model onto the protocol suite used on real networks.",
            "screensCount": 5,
            "sourceRange": "SOURCE 25-29",
            "simulator": "model-comparator",
            "badge": "Real-World Standard",
            "screens": [
                {
                    "screenNumber": 1,
                    "globalSource": 25,
                    "title": "The DoD Model: The Architecture of the Internet",
                    "summary": "Why the pragmatic 4-layer TCP/IP model won the protocol wars against the 7-layer OSI model.",
                    "concept": "Developed by the Department of Defense (DARPA) in the 1970s, the TCP/IP suite was designed for survivable, decentralized packet networks. Instead of 7 theoretical layers, TCP/IP consolidates functionality into 4 pragmatic layers:\n1. Network Access / Link Layer (OSI L1 + L2): Ethernet, Wi-Fi, ARP, physical transmission.\n2. Internet Layer (OSI L3): IPv4, IPv6, ICMP, IGMP. Handles routing across networks.\n3. Transport Layer (OSI L4): TCP, UDP. End-to-end communication and port multiplexing.\n4. Application Layer (OSI L5 + L6 + L7): HTTP, DNS, SSH, TLS, SMTP, FTP.",
                    "cyberLens": {
                        "offensive": "The early TCP/IP architecture was built on academic trust without built-in authentication or encryption. Cyber attackers exploit these foundational design flaws (IP spoofing, unauthenticated ARP, cleartext protocols).",
                        "defensive": "Modern protocols wrap security extensions around legacy TCP/IP foundations (e.g. IPsec for Internet layer, TLS for Transport/Application, DNSSEC for DNS)."
                    },
                    "keyPoints": [
                        "OSI was designed by committee; TCP/IP was designed by working code (RFCs).",
                        "TCP/IP collapsed Presentation and Session into the Application layer.",
                        "Every host connected to the Internet runs an implementation of the TCP/IP stack in its kernel."
                    ],
                    "quiz": {
                        "question": "Which layers of the 7-layer OSI model are combined into the Application Layer of the TCP/IP model?",
                        "options": [
                            "Network and Transport",
                            "Application, Presentation, and Session",
                            "Data Link and Physical",
                            "Transport and Session"
                        ],
                        "answer": 1,
                        "explanation": "The TCP/IP model combines OSI Layers 5 (Session), 6 (Presentation), and 7 (Application) into a single unified Application layer."
                    }
                },
                {
                    "screenNumber": 2,
                    "globalSource": 26,
                    "title": "The Core Protocol Suite Breakdown",
                    "summary": "Examining the key protocols that make up each tier of the TCP/IP architecture.",
                    "concept": "- Application: HTTP/HTTPS (Web), DNS (Name resolution), SSH (Secure management), SMTP/IMAP (Email), DHCP (Configuration).\n- Transport: TCP (Reliable, stateful, ordered), UDP (Unreliable, fast, stateless).\n- Internet: IP (Packet addressing and routing), ICMP (Diagnostic and error reporting), ARP (L3 to L2 address mapping).\n- Link: Ethernet (IEEE 802.3), Wi-Fi (IEEE 802.11), PPP.",
                    "cyberLens": {
                        "offensive": "Protocol Abuse: Attackers use ICMP for covert exfiltration (ICMP tunneling), ARP for traffic redirection, and UDP for reflected amplification DDoS.",
                        "defensive": "Protocol whitelisting: Blocking unnecessary protocols at perimeter firewalls (e.g. dropping inbound ICMP Echo Request or disabling NetBIOS/SMB across WAN edges)."
                    },
                    "keyPoints": [
                        "IP is the central hourglass waist of the internet: everything runs over IP, and IP runs over everything.",
                        "TCP provides reliable byte streams; UDP provides lightweight datagrams.",
                        "Diagnostics rely on companion protocols like ICMP and ARP."
                    ],
                    "quiz": {
                        "question": "Why is the IP protocol often referred to as the 'waist of the hourglass' in the Internet protocol architecture?",
                        "options": [
                            "Because IP packets can only be 100 bytes long.",
                            "Because diverse applications above and diverse physical media below all converge on IP as the single universal routing standard.",
                            "Because IP was invented in the middle of the 20th century.",
                            "Because IP slows down fast network traffic."
                        ],
                        "answer": 1,
                        "explanation": "Dozens of application protocols (HTTP, SSH, DNS, etc.) sit at the top, and diverse physical links (Ethernet, Wi-Fi, 5G, fiber) sit at the bottom. They all converge through the single common protocol: IP."
                    }
                },
                {
                    "screenNumber": 3,
                    "globalSource": 27,
                    "title": "OSI vs TCP/IP: Direct Head-to-Head Comparison",
                    "summary": "Comparing boundaries, terminology, and practical packet parsing.",
                    "concept": "While OSI strictly separates concepts from implementations, TCP/IP merges functional layers:\n- OSI Layer 5/6/7 vs TCP/IP Layer 4 (Application): In TCP/IP, the application developer implements data formatting, encryption (TLS), and session tokens in userspace software, rather than relying on OS kernel layers.\n- OSI Layer 1/2 vs TCP/IP Layer 1 (Link): TCP/IP treats the local network driver and physical wire as an integrated hardware link layer handled by the Network Interface Card (NIC).",
                    "cyberLens": {
                        "offensive": "User-space vulnerability exploitation: Because TLS and session management reside in user-space application code, memory corruption bugs like OpenSSL Heartbleed expose private keys without touching the kernel network stack.",
                        "defensive": "Kernel-level firewalls (iptables, eBPF, Windows Filtering Platform) hook packets at the TCP/IP stack layers for maximum performance."
                    },
                    "keyPoints": [
                        "OSI is best for structured conceptual learning and troubleshooting.",
                        "TCP/IP is what software developers, socket APIs, and network operating systems actually run.",
                        "In Wireshark, dissecting a packet shows both OSI layer names and TCP/IP protocol headers."
                    ],
                    "quiz": {
                        "question": "Where does TLS/SSL encryption occur in the TCP/IP model compared to the OSI model?",
                        "options": [
                            "In TCP/IP it operates in the Application/Transport boundary; in OSI it sits primarily at the Presentation layer (Layer 6).",
                            "In both models it sits at Layer 1 Physical.",
                            "TLS operates only at Layer 2 Data Link.",
                            "TLS is not part of either model."
                        ],
                        "answer": 0,
                        "explanation": "In OSI, encryption is a classic Layer 6 (Presentation) function. In TCP/IP, TLS is implemented as an application-level security library sitting directly on top of Transport Layer TCP."
                    }
                },
                {
                    "screenNumber": 4,
                    "globalSource": 28,
                    "title": "The Socket API & The Transport-Application Boundary",
                    "summary": "How applications talk to the operating system's networking kernel: Sockets, file descriptors, and system calls.",
                    "concept": "In modern operating systems (Linux, Windows, macOS), the network stack lives inside the OS Kernel. User-space programs (browsers, web servers, malware) communicate with the kernel stack via the Berkeley Sockets API:\n- `socket()`: Creates an endpoint for communication (returns a file descriptor).\n- `bind()`: Associates the socket with a local IP and Port.\n- `listen()`: Puts a TCP socket into passive listening mode.\n- `accept()`: Accepts an incoming connection request.\n- `connect()`: Initiates a 3-way handshake to a remote host.\n- `send()` / `recv()`: Writes and reads data bytes over the network.",
                    "cyberLens": {
                        "offensive": "Raw Sockets: Elevated root/admin processes can create `SOCK_RAW` sockets to bypass OS TCP/IP formatting, forging arbitrary packet headers for stealth scans (SYN scans) or IP spoofing.",
                        "defensive": "Restricting raw socket creation privileges prevents unprivileged users from crafting spoofed network packets or sniffing raw interfaces."
                    },
                    "keyPoints": [
                        "A network socket is an abstraction: an IP address + Port number + Protocol.",
                        "Standard sockets let the kernel handle TCP handshakes and retransmissions.",
                        "Raw sockets allow manual bit-level control over every header field."
                    ],
                    "quiz": {
                        "question": "Why does a port scanner like Nmap require root or administrator privileges to perform a SYN stealth scan (-sS)?",
                        "options": [
                            "Because non-admin users cannot access the keyboard.",
                            "Because crafting custom raw TCP SYN packets without letting the OS automatically complete the 3-way handshake requires raw socket (SOCK_RAW) privileges.",
                            "Because administrator privileges make internet connections faster.",
                            "Because Windows blocks all scanning."
                        ],
                        "answer": 1,
                        "explanation": "Standard OS socket APIs automatically complete the handshake by sending an ACK or RST. To send a raw SYN and sniff the reply without the OS interfering, Nmap must use raw sockets requiring root/admin rights."
                    }
                },
                {
                    "screenNumber": 5,
                    "globalSource": 29,
                    "title": "Packet Life Cycle: From User Click to Wire",
                    "summary": "Tracing a complete HTTP request from application memory down to physical photons/electrons.",
                    "concept": "1. User types `https://example.com` into browser.\n2. Browser issues a DNS query system call to resolve IP.\n3. Browser creates TCP socket and calls `connect(93.184.216.34:443)`.\n4. Kernel builds TCP SYN segment (L4), wraps it in IP packet (L3).\n5. Kernel looks up ARP cache for Gateway MAC, wraps in Ethernet Frame (L2).\n6. NIC serializes frame into electrical voltages or optical laser pulses (L1).\n7. Packets traverse switches, routers, and undersea fiber cables.\n8. Server receives, decapsulates, completes handshake, and returns web page.",
                    "cyberLens": {
                        "offensive": "An attacker can intercept or hijack traffic at any step: DNS spoofing (Step 2), TCP SYN hijacking (Step 4), ARP poisoning (Step 5), or physical tap (Step 6).",
                        "defensive": "End-to-end encryption (TLS 1.3) protects the payload data even if intermediate nodes at Steps 5-7 are untrusted or compromised."
                    },
                    "keyPoints": [
                        "Networking is an orchestrated symphony of multiple protocols working in microseconds.",
                        "Understanding the exact sequence is critical for isolating latency and network failures.",
                        "Security controls must protect every stage of the lifecycle."
                    ],
                    "quiz": {
                        "question": "Before your computer can send an IP packet to a remote web server on the Internet, what Layer 2 destination address must it put on the Ethernet frame?",
                        "options": [
                            "The web server's MAC address",
                            "The local Default Gateway (router) MAC address",
                            "FF:FF:FF:FF:FF:FF",
                            "00:00:00:00:00:00"
                        ],
                        "answer": 1,
                        "explanation": "Ethernet frames can only travel within the local subnet. To reach the Internet, the host places the remote server's IP in the L3 packet, but addresses the L2 frame to the MAC address of its local default gateway router."
                    }
                }
            ]
        }
    ]

print("Module 1 and 2 ready.")
