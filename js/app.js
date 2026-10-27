/**
 * DEV. SAHIL - NETWORKING STUDIO
 * Main Application Orchestrator & View Controller
 * Fully dynamic: every chapter has its own unique interactive lab and tailored reading content!
 */
(function() {
  const App = {
    chapters: [],
    currentView: 'overview', // 'overview' | 'chapter' | 'wireshark' | 'terminal'
    currentChapterId: '01',
    currentScreenIndex: 0,

    init: function() {
      this.chapters = window.NETWORKING_STUDIO_CHAPTERS || [];
      console.log(`[Dev. Sahil Studio] Loaded ${this.chapters.length} chapters.`);

      this.renderSidebar();
      this.attachGlobalListeners();
      this.showOverview();
    },

    // -----------------------------------------------------------------
    // SIDEBAR RENDERING
    // -----------------------------------------------------------------
    renderSidebar: function() {
      const scrollEl = document.getElementById('sidebar-scroll-list');
      const labelEl = document.getElementById('sidebar-curriculum-label');
      const countEl = document.getElementById('sidebar-curriculum-count');
      if (!scrollEl) return;

      if (this.currentView === 'chapter') {
        const ch = this.chapters.find(c => c.id === this.currentChapterId) || this.chapters[0];
        if (labelEl) labelEl.textContent = `CH ${ch.id} SCREENS`;
        if (countEl) countEl.textContent = ch.screens.length;

        let html = '';
        ch.screens.forEach((sc, idx) => {
          const isActive = idx === this.currentScreenIndex;
          html += `
            <button class="chapter-item-btn ${isActive ? 'active' : ''}" data-screen-idx="${idx}">
              <span class="chapter-item-num">${String(idx + 1).padStart(2, '0')}</span>
              <span class="chapter-item-title">${sc.title}</span>
            </button>
          `;
        });

        html += `
          <div style="margin-top: 14px; padding-top: 10px; border-top: 1px solid var(--border-subtle); display:flex; flex-direction:column; gap:6px;">
            <button class="nav-link-btn" onclick="window.StudioApp.showOverview()">
              <span>← Browse all chapters</span>
            </button>
          </div>
        `;

        scrollEl.innerHTML = html;

        scrollEl.querySelectorAll('.chapter-item-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const sIdx = parseInt(btn.getAttribute('data-screen-idx'), 10);
            this.openChapter(this.currentChapterId, sIdx);
          });
        });

      } else {
        if (labelEl) labelEl.textContent = 'COURSE CHAPTERS';
        if (countEl) countEl.textContent = this.chapters.length;

        const modules = {};
        this.chapters.forEach(ch => {
          const modName = ch.module || '01 / FOUNDATIONS';
          if (!modules[modName]) modules[modName] = [];
          modules[modName].push(ch);
        });

        let html = '';
        for (const [modTitle, chList] of Object.entries(modules)) {
          html += `
            <div class="module-group">
              <div class="module-header">${modTitle}</div>
          `;
          chList.forEach(ch => {
            html += `
              <button class="chapter-item-btn" data-ch-id="${ch.id}">
                <span class="chapter-item-num">${ch.id}</span>
                <span class="chapter-item-title">${ch.title}</span>
              </button>
            `;
          });
          html += `</div>`;
        }

        scrollEl.innerHTML = html;

        scrollEl.querySelectorAll('.chapter-item-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const chId = btn.getAttribute('data-ch-id');
            this.openChapter(chId, 0);
          });
        });
      }
    },

    // -----------------------------------------------------------------
    // COURSE OVERVIEW VIEW (WITH 5-STAGE ROADMAP FROM IMAGE 2)
    // -----------------------------------------------------------------
    showOverview: function() {
      this.currentView = 'overview';
      const container = document.getElementById('content-container');
      const headline = document.getElementById('topbar-headline');
      if (headline) {
        headline.innerHTML = '<span class="headline-root-badge">DEV. SAHIL</span> <span class="headline-title">NETWORKING STUDIO // CYBERSECURITY FOUNDATION</span> <span class="headline-status-badge">ONLINE</span>';
      }

      this.renderSidebar();
      const overviewBtn = document.getElementById('btn-nav-overview');
      if (overviewBtn) overviewBtn.classList.add('active');

      const stages = [
        { num: 1, title: 'Build the map', range: 'Chapters 1 to 6', topics: 'Networks<br>layers<br>devices', startId: '01' },
        { num: 2, title: 'Find the destination', range: 'Chapters 7 to 11', topics: 'MAC<br>IP<br>subnetting<br>routes', startId: '07' },
        { num: 3, title: 'Make a connection', range: 'Chapters 12 to 15', topics: 'Ports<br>TCP<br>UDP<br>TLS', startId: '12' },
        { num: 4, title: 'Speak the protocols', range: 'Chapters 16 to 20', topics: 'DNS<br>HTTP<br>mail<br>access', startId: '16' },
        { num: 5, title: 'Observe and defend', range: 'Chapters 21 to 23', topics: 'Policy<br>tunnels<br>Wireshark', startId: '21' }
      ];

      let stagesHtml = '';
      stages.forEach(st => {
        stagesHtml += `
          <div class="roadmap-stage-card" data-start="${st.startId}">
            <div class="stage-number-circle">${st.num}</div>
            <div class="stage-title">${st.title}</div>
            <div class="stage-chapters-tag">${st.range}</div>
            <div class="stage-topics-list">${st.topics}</div>
          </div>
        `;
      });

      let gridHtml = '';
      this.chapters.forEach(ch => {
        gridHtml += `
          <div class="chapter-card" data-ch-id="${ch.id}">
            <div>
              <div class="chapter-card-top">
                <div class="chapter-card-heading">
                  <span class="chapter-num">${ch.id}</span>
                  <span class="chapter-title">${ch.title}</span>
                </div>
                <span class="chapter-arrow">↗</span>
              </div>
              <div class="chapter-desc">${ch.desc}</div>
            </div>
            <div class="chapter-meta">
              <span>${ch.screensCount} LESSON SCREENS</span>
              <span>${ch.sourceRange}</span>
            </div>
          </div>
        `;
      });

      container.innerHTML = `
        <div class="overview-container">
          <!-- 5-STAGE ROADMAP BOX (IMAGE 2) -->
          <div class="roadmap-section-box">
            <div class="roadmap-eyebrow-row">
              <span class="roadmap-eyebrow">— YOUR ROUTE THROUGH THE STACK</span>
              <span class="roadmap-badge-cyber">CYBERSECURITY FOCUSED</span>
            </div>
            <h1 class="roadmap-main-title">One connected learning path</h1>
            <div class="roadmap-subhead">From first packet to practical evidence • 23 chapters. Five connected stages.</div>
            
            <div class="roadmap-stages-row">
              ${stagesHtml}
            </div>

            <div class="roadmap-footer-caption">
              The sequence builds the background needed to explain your own packet capture.
            </div>
          </div>

          <!-- THE CHAPTERS HEADING -->
          <div class="overview-header">
            <div class="overview-header-left">
              <h2 class="overview-title">The chapters</h2>
              <p class="overview-subtitle">A complete sequence for learning and recording. Start anywhere, or follow it in order.</p>
            </div>
            <button class="jump-packet-inspection-link" id="btn-jump-wireshark">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              Jump to packet inspection
            </button>
          </div>

          <div class="chapters-grid">
            ${gridHtml}
          </div>
        </div>
      `;

      container.querySelectorAll('.roadmap-stage-card').forEach(card => {
        card.addEventListener('click', () => {
          const startId = card.getAttribute('data-start');
          this.openChapter(startId, 0);
        });
      });

      container.querySelectorAll('.chapter-card').forEach(card => {
        card.addEventListener('click', () => {
          const chId = card.getAttribute('data-ch-id');
          this.openChapter(chId, 0);
        });
      });

      const jumpBtn = container.querySelector('#btn-jump-wireshark');
      if (jumpBtn) {
        jumpBtn.addEventListener('click', () => this.openWireshark());
      }
    },

    // -----------------------------------------------------------------
    // DYNAMIC 3-CARDS CONTENT GENERATOR FOR EVERY TOPIC
    // -----------------------------------------------------------------
    getThreeCards: function(chId, screen) {
      const num = parseInt(chId, 10);
      const title = (screen.title || '').toLowerCase();

      // Custom tailored cards per chapter
      if (num === 1) {
        return {
          familiar: "Aap apne phone me YouTube ya Instagram open karte ho. Phone Wi-Fi se ghar ke router tak data bhejta hai.",
          foundation: "Chahe phone ho, smart TV ya bank server — sabhi ek hi fundamental communication model (IP addresses, Packets, Protocols) use karte hain.",
          security: "Agar aapke Wi-Fi pe koi anjaan laptop connected hai, toh kya vo aapka data dekh sakta hai? (Sniffing, ARP Poisoning, Cleartext protocols!)."
        };
      } else if (num === 2) {
        return {
          familiar: "WhatsApp pe kisi ek dost ko message bhejna (Unicast), group me message dalna (Multicast), ya TV radio broadcast sunna (Broadcast).",
          foundation: "Network hardware packets ko target IP aur MAC ke hisab se route karta hai ki packet ek device ko jana hai ya pure subnet ko.",
          security: "Attackers broadcast storms aur rogue broadcast responses (jaise LLMNR poisoning) se pure network ke Windows credentials capture kar lete hain."
        };
      } else if (num === 3) {
        return {
          familiar: "Office me saare computers ek central switch se star pattern me jude hote hain. Agar ek cable cut ho jaye, toh baki computers chalte rehte hain.",
          foundation: "Topologies decide karti hain ki data cables ke physical layout me failure aane par traffic kaise reroute hoga (Mesh vs Star vs Bus).",
          security: "Single Point of Failure (SPOF) dhoondh kar attackers targeted DoS attack karte hain ya physical tap lagakar traffic intercept karte hain."
        };
      } else if (num === 4) {
        return {
          familiar: "Cat6 copper cable ko laptop me plug karna, ya fiber optic cable se high-speed internet aana.",
          foundation: "Hubs har port par data repeat karte hain (dumb), Switches MAC address seekh kar unicast bhejte hain, Routers IP inspect karke subnet route karte hain.",
          security: "Hub par Wireshark lagane se sabka data dikhta hai. Managed switch par Port Security enable karke MAC flooding roki ja sakti hai."
        };
      } else if (num === 5 || num === 6) {
        return {
          familiar: "Post office se letter bhejna: pehle message likha, fir envelope me dala, fir address stamp lagaya. Destination par ek-ek envelope khula.",
          foundation: "OSI 7 Layers me data Layer 7 se L1 tak headers me wrap (Encapsulate) hota hai, aur destination par unwrap (Decapsulate) hota hai.",
          security: "Hackers alag-alag layers par attack karte hain: L2 ARP spoofing, L3 IP spoofing, L4 SYN flood, aur L7 SQL injection!"
        };
      } else if (num === 7) {
        return {
          familiar: "Office me computer ko printer ka IP pata hota hai, par switch frame deliver karne ke liye hardware MAC address mangta hai (ARP Request).",
          foundation: "Address Resolution Protocol (ARP) IP ko 48-bit MAC address me translate karta hai aur local ARP cache table me store karta hai.",
          security: "ARP unauthenticated hota hai! Attacker fake ARP reply bhej kar gateway ka MAC apna bata deta hai (ARP Poisoning / MITM Attack)."
        };
      } else if (num === 8) {
        return {
          familiar: "Duniya ke har ghar ka postal pin code aur address hota hai, waise hi har device ka 32-bit IPv4 address hota hai (e.g. 192.168.1.1).",
          foundation: "Computers IP ko 32 binary bits (0 aur 1) ke roop me process karte hain. RFC 1918 private ranges (10.x, 172.16.x, 192.168.x) internet par route nahi hote.",
          security: "Cloud me instance metadata IP (169.254.169.254) par query bhej kar hackers SSRF vulnerability se AWS IAM credentials chura lete hain."
        };
      } else if (num === 9) {
        return {
          familiar: "Ek building me 4 departments (Finance, HR, IT, Guest) ke liye alag-alag Wi-Fi aur IP ranges banana.",
          foundation: "CIDR notation (/24, /26) network bits aur host bits ko divide karta hai. Bitwise ANDing se computer check karta hai destination local hai ya gateway jayega.",
          security: "Security zoning: DMZ aur Database ko alag subnets me rakh kar firewall ACLs se isolate kiya jata hai taaki web server hack hone par DB bachi rahe."
        };
      } else if (num === 10) {
        return {
          familiar: "Jab aap terminal me ping google.com karte ho, toh packet har router se cross hota hai aur time in milliseconds dikhata hai.",
          foundation: "IPv4 header me TTL (Time To Live) field har router par 1 se ghat-ti hai. TTL = 0 hone par router packet drop karke ICMP error bhejta hai (Traceroute!).",
          security: "Malware firewalls ko bypass karne ke liye ICMP tunneling use karta hai ya IP fragmentation offset manipulation se IDS signatures ko evade karta hai."
        };
      } else if (num === 11) {
        return {
          familiar: "Ghar me 5 phones aur 2 laptops connected hain, par sabhi internet par ek hi public broadband IP se browse karte hain (PAT/NAT).",
          foundation: "Router NAT state table me har internal device ke session ke liye unique source port number map karta hai. DHCP se automatic IP milti hai (DORA).",
          security: "Rogue DHCP Server attack: Attacker network me fake DHCP server chala kar sabhi clients ko apna IP gateway de deta hai!"
        };
      } else if (num === 12 || num === 13) {
        return {
          familiar: "Aapke laptop me ek hi waqt me Chrome (web), Zoom call (voice), aur Spotify bina kisi gadbad ke aapas me alag chalte hain.",
          foundation: "Port numbers (0 to 65535) operating system ko batate hain ki packet kis app ka hai. TCP 3-way handshake (SYN, SYN-ACK, ACK) se reliable connection banta hai.",
          security: "SYN Flood Attack: Attacker hazaron fake SYN packets bhej kar server ke backlog queue ko full kar deta hai, jise SYN Cookies se defend kiya jata hai."
        };
      } else if (num === 14) {
        return {
          familiar: "Online multiplayer game ya live video call me 1 packet late ho jaye toh drop kar dena behtar hai (UDP), par bank login me exact delivery chahiye (TCP).",
          foundation: "UDP connectionless aur lightweight (8-byte header) hota hai jisme zero handshake hota hai. TCP stateful aur ordered byte stream deta hai.",
          security: "UDP stateless hone ke karan source IP spoof karna aasan hota hai, jisse attacker DNS/NTP servers ko 500 Gbps amplification DDoS weapon bana lete hain."
        };
      } else if (num === 15) {
        return {
          familiar: "Browser me bank website kholne par green lock icon (HTTPS) dikhta hai.",
          foundation: "TLS 1.3 Ephemeral Diffie-Hellman (ECDHE) se client aur server dono secret symmetric key calculate karte hain bina key ko wire par bheje.",
          security: "SSLstrip attack: Attacker HTTPS ko unencrypted HTTP me downgrade kar deta hai. Defense: HSTS (HTTP Strict Transport Security) header."
        };
      } else if (num === 16) {
        return {
          familiar: "Aapko Google ka IP yaad rakhne ki zaroorat nahi hoti; aap sirf `google.com` likhte ho aur DNS usse IP me convert karta hai.",
          foundation: "Hierarchical DNS resolution: Client -> Recursive Resolver -> Root Server (.) -> TLD (.com) -> Authoritative Name Server.",
          security: "Kaminsky DNS Cache Poisoning: Attacker resolver me fake IP inject karta hai. Ya DNS queries me base64 data daal kar covert data exfiltrate karta hai."
        };
      } else if (num === 17 || num === 18) {
        return {
          familiar: "Website par username/password daal kar login button click karna, aur agle page par login bane rehna.",
          foundation: "HTTP stateless hai, isliye server `Set-Cookie: session_id=...` bhejta hai jo browser har request me saath jod kar bhejta hai.",
          security: "HttpOnly flag na hone par Cross-Site Scripting (XSS) se hacker aapka session cookie chura kar direct account me login kar sakta hai bina password ke!"
        };
      } else if (num === 19) {
        return {
          familiar: "Office me email aana jisme sender name 'CEO' likha hai, par andar hacker ki phishing link hai.",
          foundation: "SMTP me sender address easily forge ho jata hai. Isliye SPF (IP verification), DKIM (Cryptographic signature), aur DMARC (Policy reject) use hote hain.",
          security: "Agar domain ka DMARC `p=reject` na ho, toh koi bhi hacker us company ke official email ID se direct inbox phishing mail bhej sakta hai."
        };
      } else if (num === 20) {
        return {
          familiar: "Ghar baithe cloud server par command chalana ya secure file transfer karna (SSH / SFTP).",
          foundation: "Telnet aur FTP passwords ko plain text me bhejte hain; SSH public key cryptography se port 22 par encrypted channel banata hai aur port forwarding support karta hai.",
          security: "Port 3389 (RDP) ko public internet par open chhodne par BlueKeep exploit ya brute force se ransomware install ho jata hai."
        };
      } else if (num === 21 || num === 22) {
        return {
          familiar: "Company ke internal network me enter hone ke liye pehle corporate VPN connect karna aur MFA verify karna.",
          foundation: "Next-Gen Firewalls (NGFW) sirf port nahi balki application payload (App-ID) check karte hain. IDS alert karta hai aur IPS inline block karta hai.",
          security: "Honeypots: Decoy vulnerable servers jinki koi legitimate business use nahi hoti; unhe touch karte hi SOC team ko hacker hone ka 100% sure alert jata hai."
        };
      } else {
        return {
          familiar: "Computer par chal rahe saare software ke network packets ko wire se live capture karke padhna (Wireshark).",
          foundation: "Wireshark packet ke 3 panes dikhata hai: Packet List, Layer Details Tree, aur Hex Dump bytes. Follow TCP Stream se pura conversation padha jata hai.",
          security: "Digital Forensics me raw PCAP packet captures hi ultimate legal ground truth hote hain jise hacker endpoint se delete nahi kar sakta."
        };
      }
    },

    // -----------------------------------------------------------------
    // LESSON VIEW: DYNAMIC PICTORIAL SIMULATOR + DEEP CONTENT
    // -----------------------------------------------------------------
    openChapter: function(chId, screenIdx = 0) {
      this.currentView = 'chapter';
      this.currentChapterId = chId;
      this.currentScreenIndex = screenIdx;

      const chapter = this.chapters.find(c => c.id === chId) || this.chapters[0];
      const screens = chapter.screens || [];
      const currentScreen = screens[screenIdx] || screens[0];

      const headline = document.getElementById('topbar-headline');
      if (headline) {
        headline.innerHTML = `<span class="headline-root-badge">DEV. SAHIL</span> <span class="headline-title">CHAPTER ${chapter.id}: ${chapter.title.toUpperCase()}</span> <span class="headline-status-badge">LESSON ${screenIdx + 1}/${screens.length}</span>`;
      }

      this.renderSidebar();
      const overviewBtn = document.getElementById('btn-nav-overview');
      if (overviewBtn) overviewBtn.classList.remove('active');

      const container = document.getElementById('content-container');

      // Generate Stepper Dots
      let dotsHtml = '';
      screens.forEach((sc, idx) => {
        dotsHtml += `
          <button class="screen-dot-btn ${idx === screenIdx ? 'active' : ''}" data-idx="${idx}" title="Screen ${sc.screenNumber}: ${sc.title}">
            ${sc.screenNumber}
          </button>
        `;
      });

      const currentChIdx = this.chapters.findIndex(c => c.id === chId);
      const nextChapter = (currentChIdx >= 0 && currentChIdx < this.chapters.length - 1)
        ? this.chapters[currentChIdx + 1]
        : null;
      const isLastScreen = screenIdx === screens.length - 1;

      // Key Takeaways List
      let takeawaysHtml = '';
      (currentScreen.keyPoints || []).forEach(pt => {
        takeawaysHtml += `<li>${pt}</li>`;
      });

      // Quiz options
      const quiz = currentScreen.quiz || { question: "Verify knowledge", options: ["Option A", "Option B"], answer: 0, explanation: "" };
      let quizOptionsHtml = '';
      quiz.options.forEach((opt, optIdx) => {
        quizOptionsHtml += `
          <button class="quiz-option-btn" data-opt="${optIdx}">
            <span class="quiz-option-index">${String.fromCharCode(65 + optIdx)}</span>
            <span class="quiz-option-text">${opt}</span>
            <span class="quiz-option-status-icon"></span>
          </button>
        `;
      });

      // Tailored 3 Cards for this specific screen
      const cards = this.getThreeCards(chapter.id, currentScreen);

      // Render the Full-Width Beautiful Lesson Layout
      container.innerHTML = `
        <div class="studio-container">
          <!-- Top Sticky Nav -->
          <div class="studio-top-nav">
            <div class="studio-breadcrumbs">
              <span class="breadcrumb-back" id="btn-studio-back">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Overview
              </span>
              <span class="breadcrumb-sep">/</span>
              <span>Chapter ${chapter.id}</span>
              <span class="breadcrumb-sep">/</span>
              <span class="breadcrumb-current">Screen ${currentScreen.screenNumber} of ${screens.length}</span>
            </div>

            <div class="screen-stepper" id="studio-stepper-dots">
              ${dotsHtml}
            </div>
          </div>

          <!-- Main Lesson Content -->
          <div class="lesson-full-content">
            <!-- 1. Dedicated Interactive Visual Simulator for this Chapter (Shown on Lesson 1) -->
            ${screenIdx === 0 ? `
              <div id="lesson-interactive-lab-mount" style="display:block; margin-bottom:16px;"></div>
            ` : `
              <div class="lesson-concept-banner" style="background:#0c0e14; border:1px solid #1f242d; border-radius:10px; padding:16px 20px; margin-bottom:16px; display:flex; justify-content:space-between; align-items:center;">
                <div style="display:flex; align-items:center; gap:14px;">
                  <div style="width:36px; height:36px; border-radius:8px; background:rgba(230,57,70,0.15); border:1px solid rgba(230,57,70,0.4); display:flex; align-items:center; justify-content:center; color:#ef4444; font-family:var(--font-mono); font-weight:700; font-size:13px;">
                    ${screenIdx + 1}
                  </div>
                  <div>
                    <div style="font-size:10.5px; font-family:var(--font-mono); color:#94a3b8; text-transform:uppercase; letter-spacing:0.08em;">LESSON ${screenIdx + 1} FOCUS</div>
                    <div style="font-size:15px; font-weight:700; color:#fff;">${currentScreen.title}</div>
                  </div>
                </div>
                <button class="action-pill-btn" id="btn-toggle-lab-view" style="font-size:11px; padding:5px 12px; display:flex; align-items:center; gap:6px;">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  <span id="txt-toggle-lab">Show Chapter ${chapter.id} Lab</span>
                </button>
              </div>
              <div id="lesson-interactive-lab-mount" style="display:none; margin-bottom:16px;"></div>
            `}

            <!-- 2. BEGINNER-FRIENDLY CORE READING: THE IDEA & 3 CARDS -->
            <div class="idea-section-box">
              <div class="idea-badge">THE IDEA: ${currentScreen.title.toUpperCase()}</div>
              <h2 class="idea-headline">${currentScreen.title}</h2>
              <div class="idea-description-lead">
                ${currentScreen.summary}
              </div>

              <!-- Tailored 3 Cards: Familiar action, Same foundation, Security question -->
              <div class="idea-three-cards-row">
                <div class="idea-card">
                  <div class="idea-card-header">Familiar action (Real Life)</div>
                  <div class="idea-card-content">
                    ${cards.familiar}
                  </div>
                </div>

                <div class="idea-card">
                  <div class="idea-card-header">Same foundation (Engineering Core)</div>
                  <div class="idea-card-content">
                    ${cards.foundation}
                  </div>
                </div>

                <div class="idea-card">
                  <div class="idea-card-header" style="color:var(--accent-red-bright);">Security question (Cyber Threat)</div>
                  <div class="idea-card-content">
                    ${cards.security}
                  </div>
                </div>
              </div>

              <!-- Comprehensive In-Depth Theory -->
              <div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:8px; padding:20px; margin-top:8px;">
                <h3 style="font-size:16px; color:#fff; margin-bottom:10px;">Deep Engineering Concept & How It Works</h3>
                <div style="font-size:13.5px; line-height:1.75; color:#cbd5e1; white-space:pre-line;">
                  ${currentScreen.concept}
                </div>
              </div>

              <!-- Red Team (Offensive) vs Blue Team (Defensive) Cyber Lens -->
              <div class="cyber-lens-grid" style="margin-top:10px;">
                <div class="cyber-card offensive">
                  <div class="cyber-card-header">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                      <polyline points="2 17 12 22 22 17"></polyline>
                      <polyline points="2 12 12 17 22 12"></polyline>
                    </svg>
                    Offensive Lens (Red Team Hacker Perspective)
                  </div>
                  <div class="cyber-card-content">
                    ${currentScreen.cyberLens.offensive}
                  </div>
                </div>

                <div class="cyber-card defensive">
                  <div class="cyber-card-header">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    Defensive Lens (Blue Team Security Analyst Perspective)
                  </div>
                  <div class="cyber-card-content">
                    ${currentScreen.cyberLens.defensive}
                  </div>
                </div>
              </div>

              <!-- Key Takeaways -->
              <div class="takeaways-card" style="margin-top:8px;">
                <div class="takeaways-title">What Every Cybersecurity Student Must Remember</div>
                <ul class="takeaways-list">
                  ${takeawaysHtml}
                </ul>
              </div>
            </div>

            <!-- 3. Interactive Knowledge Verification Question (With Step-by-Step Explanation) -->
            <div class="quiz-card" style="margin-top:10px;">
              <div class="quiz-header">
                <span class="quiz-badge">Practical Certification & Interview Question</span>
                <span style="font-size:11px; color:#64748b; font-family:var(--font-mono);">CompTIA Network+ / Security+ / CEH Question</span>
              </div>
              <div class="quiz-question">${quiz.question}</div>
              <div class="quiz-options" id="studio-quiz-options">
                ${quizOptionsHtml}
              </div>
              <div class="quiz-explanation-box" id="studio-quiz-explanation"></div>
            </div>

            <!-- 4. Seamless Curriculum Progression: Advance to Next Chapter Card -->
            ${nextChapter ? `
              <div class="advance-chapter-card" id="card-advance-next-ch">
                <div class="advance-card-left">
                  <div class="advance-card-badge">
                    <span>Up Next in Curriculum</span>
                    <span>•</span>
                    <span>Chapter ${nextChapter.id}</span>
                  </div>
                  <div class="advance-card-title">${nextChapter.title}</div>
                  <div class="advance-card-desc">${nextChapter.desc}</div>
                </div>
                <button class="advance-card-action-btn" id="btn-advance-card-trigger">
                  <span>Start Chapter ${nextChapter.id}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            ` : `
              <div class="advance-chapter-card" id="card-advance-next-ch">
                <div class="advance-card-left">
                  <div class="advance-card-badge" style="color:#10b981;">
                    <span>Course Complete</span>
                    <span>•</span>
                    <span>Capstone Dissector</span>
                  </div>
                  <div class="advance-card-title">Live Wireshark Dissector & Packet Inspector</div>
                  <div class="advance-card-desc">Inspect real PCAP packets across L2 Ethernet, L3 IPv4, L4 TCP/UDP, and L7 Application layers.</div>
                </div>
                <button class="advance-card-action-btn" id="btn-advance-card-trigger" style="background:#10b981;">
                  <span>Launch Wireshark →</span>
                </button>
              </div>
            `}
          </div>

          <!-- Bottom Sticky Screen Navigation Controls -->
          <div class="studio-bottom-nav">
            <button class="action-pill-btn" id="btn-screen-prev" ${screenIdx === 0 ? 'disabled style="opacity:0.4"' : ''}>
              ← Previous Screen [←]
            </button>
            <span class="screen-counter-text">Screen ${screenIdx + 1} of ${screens.length} • Global Source ${currentScreen.globalSource} of 114</span>
            ${isLastScreen ? (
              nextChapter ? `
                <button class="action-pill-btn primary" id="btn-screen-next">
                  Next Chapter: Ch ${nextChapter.id} →
                </button>
              ` : `
                <button class="action-pill-btn primary" id="btn-screen-next" style="background:#10b981;">
                  Launch Wireshark →
                </button>
              `
            ) : `
              <button class="action-pill-btn primary" id="btn-screen-next">
                Next Screen [→] →
              </button>
            `}
          </div>
        </div>
      `;

      // 1. Mount the simulator on Screen 1, or wire toggle button on subsequent screens
      if (screenIdx === 0) {
        this.mountChapterSimulator(chapter.id, 0);
      } else {
        const toggleLabBtn = container.querySelector('#btn-toggle-lab-view');
        const labMount = container.querySelector('#lesson-interactive-lab-mount');
        const txtToggle = container.querySelector('#txt-toggle-lab');
        if (toggleLabBtn && labMount) {
          let isLabOpen = false;
          toggleLabBtn.addEventListener('click', () => {
            isLabOpen = !isLabOpen;
            if (isLabOpen) {
              labMount.style.display = 'block';
              if (txtToggle) txtToggle.textContent = `Hide Chapter ${chapter.id} Lab`;
              toggleLabBtn.classList.add('active');
              this.mountChapterSimulator(chapter.id, screenIdx);
            } else {
              labMount.style.display = 'none';
              if (txtToggle) txtToggle.textContent = `Show Chapter ${chapter.id} Lab`;
              toggleLabBtn.classList.remove('active');
            }
          });
        }
      }

      // Attach Listeners
      const backBtn = container.querySelector('#btn-studio-back');
      if (backBtn) backBtn.addEventListener('click', () => this.showOverview());

      container.querySelectorAll('.screen-dot-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const targetIdx = parseInt(btn.getAttribute('data-idx'), 10);
          this.openChapter(chId, targetIdx);
        });
      });

      const prevBtn = container.querySelector('#btn-screen-prev');
      const nextBtn = container.querySelector('#btn-screen-next');
      if (prevBtn && screenIdx > 0) {
        prevBtn.addEventListener('click', () => this.openChapter(chId, screenIdx - 1));
      }
      if (nextBtn) {
        if (!isLastScreen) {
          nextBtn.addEventListener('click', () => this.openChapter(chId, screenIdx + 1));
        } else if (nextChapter) {
          nextBtn.addEventListener('click', () => this.openChapter(nextChapter.id, 0));
        } else {
          nextBtn.addEventListener('click', () => this.openWireshark());
        }
      }

      const advanceCardBtn = container.querySelector('#btn-advance-card-trigger');
      if (advanceCardBtn) {
        if (nextChapter) {
          advanceCardBtn.addEventListener('click', () => this.openChapter(nextChapter.id, 0));
        } else {
          advanceCardBtn.addEventListener('click', () => this.openWireshark());
        }
      }

      // Interactive Quiz Answer Handling with Instant Red/Green and Retry
      const optBtns = container.querySelectorAll('.quiz-option-btn');
      const expBox = container.querySelector('#studio-quiz-explanation');

      const resetQuiz = () => {
        optBtns.forEach(b => {
          b.classList.remove('correct', 'wrong', 'disabled', 'dimmed');
        });
        if (expBox) {
          expBox.className = 'quiz-explanation-box';
          expBox.innerHTML = '';
        }
      };

      optBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const selected = parseInt(btn.getAttribute('data-opt'), 10);
          const isCorrect = selected === quiz.answer;

          // Disable and dim all options
          optBtns.forEach((b, idx) => {
            b.classList.add('disabled');
            if (idx !== selected && idx !== quiz.answer) {
              b.classList.add('dimmed');
            }
          });

          if (isCorrect) {
            btn.classList.add('correct');
            if (expBox) {
              expBox.className = 'quiz-explanation-box show correct';
              expBox.innerHTML = `
                <div style="font-weight:700; font-size:14px; color:#10b981; margin-bottom:6px; display:flex; align-items:center; gap:6px;">
                  <span>✓</span> Correct Answer!
                </div>
                <div style="color:#e2e8f0; line-height:1.6;">${quiz.explanation}</div>
                <button class="quiz-reset-btn" id="btn-reset-quiz">↺ Retry Question</button>
              `;
              const resetBtn = expBox.querySelector('#btn-reset-quiz');
              if (resetBtn) resetBtn.addEventListener('click', resetQuiz);
            }
          } else {
            btn.classList.add('wrong');
            // Highlight the true correct option in green
            if (optBtns[quiz.answer]) {
              optBtns[quiz.answer].classList.add('correct');
            }
            if (expBox) {
              expBox.className = 'quiz-explanation-box show wrong';
              expBox.innerHTML = `
                <div style="font-weight:700; font-size:14px; color:#ef4444; margin-bottom:6px; display:flex; align-items:center; gap:6px;">
                  <span>✕</span> Incorrect Answer
                </div>
                <div style="color:#e2e8f0; line-height:1.6;">
                  <strong style="color:#10b981;">Correct Option was:</strong> ${String.fromCharCode(65 + quiz.answer)}. ${quiz.options[quiz.answer]}<br>
                  <span style="display:inline-block; margin-top:6px;">${quiz.explanation}</span>
                </div>
                <button class="quiz-reset-btn" id="btn-reset-quiz">↺ Try Again</button>
              `;
              const resetBtn = expBox.querySelector('#btn-reset-quiz');
              if (resetBtn) resetBtn.addEventListener('click', resetQuiz);
            }
          }
        });
      });
    },

    // -----------------------------------------------------------------
    // MOUNT CUSTOM DEDICATED SIMULATOR FOR EACH CHAPTER
    // -----------------------------------------------------------------
    mountChapterSimulator: function(chId, screenIdx) {
      const mount = document.getElementById('lesson-interactive-lab-mount');
      if (!mount) return;

      const num = parseInt(chId, 10);

      if (num === 1) {
        // Chapter 1: Home Network Lab & Port/Bandwidth Experimenter (Images 1, 2, 3)
        if (window.InteractiveNetworkLab) {
          window.InteractiveNetworkLab.render(mount);
        }
      } else if (num === 2) {
        // Chapter 2: Addressing Modes (Unicast, Broadcast, Multicast, Anycast)
        window.ChapterSimulators.renderAddressingModes(mount);
      } else if (num === 3) {
        // Chapter 3: Topologies Sandbox
        window.ChapterSimulators.renderTopologiesSandbox(mount);
      } else if (num === 4) {
        // Chapter 4: How connection reaches your home (Fibre OLT, Splitter, ONT, Router - Image 4)
        window.ChapterSimulators.renderConnectionToHomeLab(mount);
      } else if (num === 5) {
        // Chapter 5: 7-Layer OSI Encapsulation & Decapsulation Engine
        window.ChapterSimulators.renderEncapsulationEngine(mount);
      } else if (num === 6) {
        // Chapter 6: How data crosses countries and oceans (Submarine Cables Lab - Image 5)
        window.ChapterSimulators.renderSubmarineCablesLab(mount);
      } else if (num === 7) {
        // Chapter 7: L1 & L2 Wire, ARP Poisoning & Dynamic ARP Inspection
        window.ArpSimulator.render(mount);
      } else if (num === 8) {
        // Chapter 8: 32-Bit IPv4 Binary Converter & Classes
        window.ChapterSimulators.renderIpBinaryConverter(mount);
      } else if (num === 9) {
        // Chapter 9: 32-Bit CIDR Subnet Calculator & Bit Matrix
        window.SubnetCalculator.render(mount);
      } else if (num === 10) {
        // Chapter 10: IPv4 Header Dissector & Traceroute TTL
        window.ChapterSimulators.renderHeaderDissector(mount);
      } else if (num === 11) {
        // Chapter 11: NAT, PAT & DHCP DORA Translation
        window.ChapterSimulators.renderNatDhcpLab(mount);
      } else if (num === 12 || num === 13) {
        // Chapter 12 & 13: TCP 3-Way Handshake & SYN Flood
        window.TcpHandshakeSimulator.render(mount);
      } else if (num === 14) {
        // Chapter 14: TCP vs UDP Reliability & Packet Loss
        window.ChapterSimulators.renderTcpUdpLab(mount);
      } else if (num === 15) {
        // Chapter 15: TLS 1.3 Cryptographic Handshake & PFS
        window.ChapterSimulators.renderTlsHandshake(mount);
      } else if (num === 16) {
        // Chapter 16: Hierarchical DNS Resolution & Tunneling
        window.DnsSimulator.render(mount);
      } else if (num === 17 || num === 18) {
        // Chapter 17 & 18: HTTP Headers & Cookie Security Lab
        window.ChapterSimulators.renderHttpCookieLab(mount);
      } else if (num === 19) {
        // Chapter 19: Email Security, SPF, DKIM & DMARC Defense
        window.ChapterSimulators.renderEmailSecurityLab(mount);
      } else if (num === 20) {
        // Chapter 20: Secure Remote Access (SSH vs Telnet Wire Sniffer)
        window.ChapterSimulators.renderRemoteAccessLab(mount);
      } else if (num === 21 || num === 22) {
        // Chapter 21 & 22: Next-Gen Firewall, IDS & IPS Network Defense
        window.ChapterSimulators.renderFirewallDefenseLab(mount);
      } else if (num === 23) {
        // Chapter 23: Wireshark 3-Pane Dissector
        window.WiresharkSimulator.render(mount);
      } else {
        // Fallback
        window.ChapterSimulators.renderDeviceWorkingLab(mount);
      }
    },

    // -----------------------------------------------------------------
    // DEDICATED FULL-SCREEN TERMINAL & WIRESHARK VIEWS
    // -----------------------------------------------------------------
    openWireshark: function() {
      this.currentView = 'wireshark';
      const container = document.getElementById('content-container');
      const headline = document.getElementById('topbar-headline');
      if (headline) {
        headline.innerHTML = '<span class="headline-root-badge">DEV. SAHIL</span> <span class="headline-title">WIRESHARK 3-PANE PCAP PACKET DISSECTOR</span> <span class="headline-status-badge">LIVE LAB</span>';
      }

      this.renderSidebar();
      document.querySelectorAll('.chapter-item-btn').forEach(b => b.classList.remove('active'));
      const wsBtn = document.getElementById('btn-nav-wireshark');
      if (wsBtn) wsBtn.classList.add('active');

      window.WiresharkSimulator.render(container);
    },

    openTerminal: function() {
      this.currentView = 'terminal';
      const container = document.getElementById('content-container');
      const headline = document.getElementById('topbar-headline');
      if (headline) {
        headline.innerHTML = '<span class="headline-root-badge">DEV. SAHIL</span> <span class="headline-title">CYBER DIAGNOSTIC COMMAND TERMINAL</span> <span class="headline-status-badge">TERMINAL</span>';
      }

      this.renderSidebar();
      document.querySelectorAll('.chapter-item-btn').forEach(b => b.classList.remove('active'));
      const termBtn = document.getElementById('btn-nav-terminal');
      if (termBtn) termBtn.classList.add('active');

      container.innerHTML = `
        <div style="padding: 30px; max-width: 1100px; margin: 0 auto; height: 100%; display: flex; flex-direction: column;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 12px;">
            <div>
              <h2 style="font-size:22px; color:#fff;">Cyber Network Command Terminal</h2>
              <p style="color: var(--text-muted); font-size:13px;">Execute live simulated diagnostic commands: ping, traceroute, nmap, netstat, arp, dig, curl.</p>
            </div>
            <button class="action-pill-btn" onclick="window.StudioApp.showOverview()">
              Back to Course
            </button>
          </div>
          <div style="flex: 1; min-height: 420px;" id="terminal-view-mount"></div>
        </div>
      `;

      window.TerminalSimulator.render(document.getElementById('terminal-view-mount'));
    },

    // -----------------------------------------------------------------
    // GLOBAL LISTENERS & SHORTCUTS
    // -----------------------------------------------------------------
    attachGlobalListeners: function() {
      const btnToggle = document.getElementById('btn-toggle-sidebar');
      if (btnToggle) {
        btnToggle.addEventListener('click', () => {
          document.getElementById('app').classList.toggle('focus-mode');
        });
      }

      const btnFocus = document.getElementById('btn-focus-mode');
      if (btnFocus) {
        btnFocus.addEventListener('click', () => {
          document.getElementById('app').classList.toggle('focus-mode');
        });
      }

      const btnPause = document.getElementById('btn-pause-motion');
      if (btnPause) {
        btnPause.addEventListener('click', () => {
          window.PacketEngine.togglePause();
        });
      }

      const btnGuide = document.getElementById('btn-recording-guide');
      const guideModal = document.getElementById('recording-guide-modal');
      const guideClose = document.getElementById('guide-modal-close');
      if (btnGuide && guideModal) {
        btnGuide.addEventListener('click', () => guideModal.classList.add('active'));
      }
      if (guideClose && guideModal) {
        guideClose.addEventListener('click', () => guideModal.classList.remove('active'));
      }

      const overviewBtn = document.getElementById('btn-nav-overview');
      if (overviewBtn) {
        overviewBtn.addEventListener('click', () => this.showOverview());
      }

      const searchTrigger = document.getElementById('search-trigger-btn');
      const searchModal = document.getElementById('search-modal');
      const searchClose = document.getElementById('search-modal-close');
      const searchInput = document.getElementById('global-search-input');

      const openSearch = () => {
        if (searchModal) {
          searchModal.classList.add('active');
          if (searchInput) {
            searchInput.value = '';
            searchInput.focus();
            this.handleSearch('');
          }
        }
      };

      if (searchTrigger) searchTrigger.addEventListener('click', openSearch);
      if (searchClose && searchModal) {
        searchClose.addEventListener('click', () => searchModal.classList.remove('active'));
      }

      if (searchInput) {
        searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
      }

      window.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
          e.preventDefault();
          openSearch();
        }
        if ((e.key === 'f' || e.key === 'F') && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
          document.getElementById('app').classList.toggle('focus-mode');
        }
        if (e.key === 'Escape') {
          document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
        }
        if (this.currentView === 'chapter' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
          const chIdx = this.chapters.findIndex(c => c.id === this.currentChapterId);
          const ch = chIdx >= 0 ? this.chapters[chIdx] : null;
          if (ch && ch.screens) {
            if (e.key === 'ArrowLeft' && this.currentScreenIndex > 0) {
              this.openChapter(this.currentChapterId, this.currentScreenIndex - 1);
            } else if (e.key === 'ArrowRight') {
              if (this.currentScreenIndex < ch.screens.length - 1) {
                this.openChapter(this.currentChapterId, this.currentScreenIndex + 1);
              } else if (chIdx < this.chapters.length - 1) {
                this.openChapter(this.chapters[chIdx + 1].id, 0);
              }
            }
          }
        }
      });
    },

    handleSearch: function(query) {
      const resultsContainer = document.getElementById('search-results-list');
      if (!resultsContainer) return;

      const q = query.trim().toLowerCase();
      if (!q) {
        resultsContainer.innerHTML = '<div style="color:var(--text-muted); font-size:12px; padding:10px 0;">Type any networking term, protocol, or attack (e.g. TCP, ARP, DNS, CIDR, SYN, MITM)...</div>';
        return;
      }

      const matches = [];
      this.chapters.forEach(ch => {
        if (ch.title.toLowerCase().includes(q) || ch.desc.toLowerCase().includes(q)) {
          matches.push({ type: 'Chapter', chId: ch.id, title: `Chapter ${ch.id}: ${ch.title}`, desc: ch.desc, screenIdx: 0 });
        }
        (ch.screens || []).forEach((sc, sIdx) => {
          if (sc.title.toLowerCase().includes(q) || sc.summary.toLowerCase().includes(q) || sc.concept.toLowerCase().includes(q)) {
            matches.push({ type: 'Screen', chId: ch.id, title: `[Ch ${ch.id}] ${sc.title}`, desc: sc.summary, screenIdx: sIdx });
          }
        });
      });

      if (matches.length === 0) {
        resultsContainer.innerHTML = `<div style="color:var(--text-muted); font-size:12px; padding:10px 0;">No results matching "${query}".</div>`;
        return;
      }

      let html = '';
      matches.slice(0, 10).forEach(m => {
        html += `
          <div class="search-result-row" data-chid="${m.chId}" data-sidx="${m.screenIdx}" style="padding:10px; border-bottom:1px solid var(--border-subtle); cursor:pointer; border-radius:6px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-weight:600; color:#fff; font-size:13px;">${m.title}</span>
              <span style="font-size:10px; font-family:var(--font-mono); color:var(--accent-red);">${m.type}</span>
            </div>
            <div style="font-size:11.5px; color:var(--text-muted); margin-top:2px;">${m.desc.substring(0, 90)}...</div>
          </div>
        `;
      });

      resultsContainer.innerHTML = html;

      resultsContainer.querySelectorAll('.search-result-row').forEach(row => {
        row.addEventListener('click', () => {
          const chId = row.getAttribute('data-chid');
          const sIdx = parseInt(row.getAttribute('data-sidx'), 10);
          document.getElementById('search-modal').classList.remove('active');
          this.openChapter(chId, sIdx);
        });
      });
    }
  };

  window.addEventListener('DOMContentLoaded', () => App.init());
  window.StudioApp = App;
})();
