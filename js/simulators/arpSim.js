/**
 * DEV. SAHIL - NETWORKING STUDIO
 * Layer 2 ARP Poisoning & Man-in-the-Middle (MITM) Interactive Lab
 */
(function() {
  window.ArpSimulator = {
    isPoisoned: false,
    daiEnabled: false,

    render: function(containerEl) {
      if (!containerEl) return;

      this.isPoisoned = false;
      this.daiEnabled = false;

      containerEl.innerHTML = `
        <div style="width:100%; display:flex; flex-direction:column; gap:16px;">
          <!-- Action Buttons -->
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button id="btn-arp-normal" class="sim-btn">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Normal ARP Ping
            </button>
            <button id="btn-arp-poison" class="sim-btn primary">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              Execute ARP Poisoning (MITM)
            </button>
            <button id="btn-arp-dai" class="sim-btn">
              Toggle DAI (Dynamic ARP Inspection)
            </button>
          </div>

          <!-- Network Diagram Canvas (Clean Full-Width SVG Layout) -->
          <div class="lab-diagram-card" style="padding:16px 20px 20px 20px; background:#0b0c10; border-radius:12px; border:1px solid #1e222a;">
            <svg id="arp-diagram-svg" viewBox="0 0 920 280" style="width:100%; height:auto; display:block; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <!-- Connecting Cable Lines -->
              <g id="arp-cables-group">
                <!-- Victim <-> Switch -->
                <line id="cable-victim-switch" x1="220" y1="90" x2="390" y2="90" stroke="#10b981" stroke-width="3" />

                <!-- Switch <-> Gateway -->
                <line id="cable-gateway-switch" x1="530" y1="90" x2="700" y2="90" stroke="#10b981" stroke-width="3" />

                <!-- Switch <-> Attacker (Vertical down) -->
                <line id="cable-attacker-switch" x1="460" y1="135" x2="460" y2="195" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="5,4" />
              </g>

              <!-- Break / Attack Cross Indicator -->
              <g id="arp-break-indicator" style="display:none;">
                <circle cx="615" cy="90" r="11" fill="#1f1114" stroke="#ef4444" stroke-width="2" />
                <line x1="611" y1="86" x2="619" y2="94" stroke="#ef4444" stroke-width="2" />
                <line x1="619" y1="86" x2="611" y2="94" stroke="#ef4444" stroke-width="2" />
                <rect x="540" y="45" width="150" height="24" rx="12" fill="#2d1215" stroke="#ef4444" stroke-width="1.5" />
                <text x="615" y="61" fill="#ef4444" font-size="10.5" font-weight="700" text-anchor="middle">Direct Gateway Link Bypassed!</text>
              </g>

              <!-- Node 1: Victim PC -->
              <g id="svg-node-victim">
                <rect id="svg-rect-victim" x="80" y="45" width="140" height="90" rx="10" fill="#13151b" stroke="#272c37" stroke-width="2" />
                <rect x="135" y="60" width="30" height="20" rx="2" fill="none" stroke="#94a3b8" stroke-width="2" />
                <line x1="142" y1="80" x2="158" y2="80" stroke="#94a3b8" stroke-width="2" />
                <text x="150" y="102" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Victim PC</text>
                <text x="150" y="118" fill="#38bdf8" font-size="9.5" font-family="monospace" text-anchor="middle">192.168.1.100</text>
                <text x="150" y="129" fill="#64748b" font-size="8.5" font-family="monospace" text-anchor="middle">aa:bb:cc:11:22:33</text>
              </g>

              <!-- Central Node: Enterprise Switch -->
              <g id="svg-node-switch">
                <rect id="svg-rect-switch" x="390" y="45" width="140" height="90" rx="10" fill="#171922" stroke="#38bdf8" stroke-width="2" />
                <polyline points="450,62 460,70 450,78" fill="none" stroke="#38bdf8" stroke-width="2" />
                <line x1="465" y1="78" x2="475" y2="78" stroke="#38bdf8" stroke-width="2" />
                <text x="460" y="102" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Switch (L2)</text>
                <text id="switch-dai-label" x="460" y="118" fill="#64748b" font-size="10" font-weight="700" text-anchor="middle">DAI: OFF</text>
              </g>

              <!-- Node 2: Gateway Router -->
              <g id="svg-node-gateway">
                <rect id="svg-rect-gateway" x="700" y="45" width="140" height="90" rx="10" fill="#13151b" stroke="#10b981" stroke-width="2" />
                <circle cx="770" cy="70" r="12" fill="none" stroke="#10b981" stroke-width="2" />
                <line x1="758" y1="70" x2="782" y2="70" stroke="#10b981" stroke-width="2" />
                <text x="770" y="102" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Gateway Router</text>
                <text x="770" y="118" fill="#10b981" font-size="9.5" font-family="monospace" text-anchor="middle">192.168.1.1</text>
                <text x="770" y="129" fill="#64748b" font-size="8.5" font-family="monospace" text-anchor="middle">00:aa:bb:44:55:66</text>
              </g>

              <!-- Node 3: Attacker (Kali Linux) - Placed safely below without overlapping! -->
              <g id="svg-node-attacker">
                <rect id="svg-rect-attacker" x="385" y="195" width="150" height="75" rx="10" fill="#1a1215" stroke="#ef4444" stroke-width="2" />
                <text x="460" y="222" fill="#ef4444" font-size="12" font-weight="700" text-anchor="middle">Attacker (Kali MITM)</text>
                <text x="460" y="240" fill="#f87171" font-size="9.5" font-family="monospace" text-anchor="middle">192.168.1.66</text>
                <text x="460" y="254" fill="#64748b" font-size="8.5" font-family="monospace" text-anchor="middle">de:ad:be:ef:66:66</text>
              </g>
            </svg>
          </div>

          <!-- Real-Time ARP Table & Log Box -->
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div style="background:#101216; border:1px solid #1e222a; border-radius:6px; padding:12px; font-size:11px;">
              <div style="font-weight:700; color:#9ca3af; margin-bottom:6px; text-transform:uppercase;">
                Victim's ARP Cache (<span class="mono">arp -a</span>)
              </div>
              <table style="width:100%; border-collapse:collapse; font-family:var(--font-mono); font-size:11px;">
                <thead>
                  <tr style="color:#64748b; border-bottom:1px solid #272c34; text-align:left;">
                    <th style="padding:4px 0;">Internet Address</th>
                    <th style="padding:4px 0;">Physical Address</th>
                    <th style="padding:4px 0;">Type</th>
                  </tr>
                </thead>
                <tbody id="victim-arp-tbody">
                  <tr>
                    <td style="color:#38bdf8;">192.168.1.1</td>
                    <td id="victim-gw-mac" style="color:#10b981;">00:aa:bb:44:55:66</td>
                    <td style="color:#64748b;">dynamic</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="handshake-log-console" id="arp-console-log" style="height:110px;">
              [SYSTEM] Local LAN Segment 192.168.1.0/24 initialized.
              [INFO] Switch CAM table populated with legitimate MAC bindings.
            </div>
          </div>
        </div>
      `;

      this.attachListeners(containerEl);
    },

    attachListeners: function(containerEl) {
      const btnNormal = containerEl.querySelector('#btn-arp-normal');
      const btnPoison = containerEl.querySelector('#btn-arp-poison');
      const btnDai = containerEl.querySelector('#btn-arp-dai');

      if (btnNormal) btnNormal.addEventListener('click', () => this.sendNormalTraffic());
      if (btnPoison) btnPoison.addEventListener('click', () => this.executePoisoning());
      if (btnDai) btnDai.addEventListener('click', () => this.toggleDAI());
    },

    log: function(msg, isAlert = false) {
      const logBox = document.getElementById('arp-console-log');
      if (!logBox) return;
      const line = document.createElement('div');
      line.style.color = isAlert ? '#ef4444' : '#a3e635';
      line.textContent = `> ${msg}`;
      logBox.appendChild(line);
      logBox.scrollTop = logBox.scrollHeight;
    },

    sendNormalTraffic: function() {
      const stage = document.getElementById('arp-stage');
      const victim = document.getElementById('icon-victim');
      const gateway = document.getElementById('icon-gateway');
      const switchNode = document.getElementById('node-switch');

      if (!stage || !victim || !gateway || !switchNode) return;

      if (!this.isPoisoned) {
        this.log("Victim sending ICMP Ping to 192.168.1.1 (Gateway MAC: 00:aa:bb:44:55:66)");
        window.PacketEngine.animatePacket(victim, switchNode, stage, {
          duration: 600,
          onComplete: () => {
            window.PacketEngine.animatePacket(switchNode, gateway, stage, {
              duration: 600,
              onComplete: () => this.log("Ping reply received safely from genuine Gateway.")
            });
          }
        });
      } else {
        const attacker = document.getElementById('icon-attacker');
        this.log("[INTERCEPTED!] Traffic routed to Attacker de:ad:be:ef:66:66 instead of genuine Gateway!", true);
        window.PacketEngine.animatePacket(victim, attacker, stage, {
          malicious: true,
          duration: 700,
          onComplete: () => {
            this.log("[MITM SNIFFER] Attacker captured HTTP credentials: user=admin, pass=Secret2026", true);
            window.PacketEngine.animatePacket(attacker, gateway, stage, {
              duration: 700,
              onComplete: () => this.log("Attacker silently forwarded packet to gateway (stealth preserved).")
            });
          }
        });
      }
    },

    executePoisoning: function() {
      const stage = document.getElementById('arp-stage');
      const attacker = document.getElementById('icon-attacker');
      const victim = document.getElementById('icon-victim');
      const macCell = document.getElementById('victim-gw-mac');

      if (this.daiEnabled) {
        this.log("[DAI BLOCKED] Switch detected forged gratuitous ARP from port 3 (de:ad:be:ef:66:66 claiming 192.168.1.1). Dropped packet!", true);
        return;
      }

      this.isPoisoned = true;
      this.log("[ATTACK] Attacker sending unsolicited Gratuitous ARP: '192.168.1.1 is at de:ad:be:ef:66:66'", true);

      if (attacker && victim && stage) {
        window.PacketEngine.animatePacket(attacker, victim, stage, {
          malicious: true,
          duration: 800,
          onComplete: () => {
            if (macCell) {
              macCell.textContent = 'de:ad:be:ef:66:66 (POISONED)';
              macCell.style.color = '#ef4444';
            }
            this.log("[SUCCESS] Victim ARP cache poisoned! All outbound internet traffic now flows through Kali.", true);
            const breakInd = document.getElementById('arp-break-indicator');
            if (breakInd) breakInd.style.display = 'inline';
            const vLine = document.getElementById('cable-victim-switch');
            const aLine = document.getElementById('cable-attacker-switch');
            if (vLine) vLine.setAttribute('stroke', '#ef4444');
            if (aLine) aLine.setAttribute('stroke', '#ef4444');
          }
        });
      }
    },

    toggleDAI: function() {
      this.daiEnabled = !this.daiEnabled;
      const label = document.getElementById('switch-dai-label');
      const btn = document.getElementById('btn-arp-dai');
      const macCell = document.getElementById('victim-gw-mac');
      const breakInd = document.getElementById('arp-break-indicator');
      const vLine = document.getElementById('cable-victim-switch');
      const aLine = document.getElementById('cable-attacker-switch');

      if (this.daiEnabled) {
        if (label) {
          label.textContent = 'DAI: ACTIVE (Snooping ON)';
          label.style.color = '#10b981';
        }
        if (btn) btn.classList.add('active-state');
        this.isPoisoned = false;
        if (macCell) {
          macCell.textContent = '00:aa:bb:44:55:66';
          macCell.style.color = '#10b981';
        }
        if (breakInd) breakInd.style.display = 'none';
        if (vLine) vLine.setAttribute('stroke', '#10b981');
        if (aLine) aLine.setAttribute('stroke', '#64748b');
        this.log("[DEFENSE] Dynamic ARP Inspection enabled. Invalid ARP replies rejected against DHCP snooping DB.");
      } else {
        if (label) {
          label.textContent = 'DAI: OFF';
          label.style.color = '#64748b';
        }
        if (btn) btn.classList.remove('active-state');
        this.log("[DEFENSE] Dynamic ARP Inspection disabled.");
      }
    }
  };
})();
