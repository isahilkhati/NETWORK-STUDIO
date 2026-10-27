/**
 * DEV. SAHIL - NETWORKING STUDIO
 * TCP 3-Way Handshake, Sequence Tracker & SYN Flood Attack Simulator
 * Features full-width interactive SVG ladder diagram with directional packet flight arrows!
 */
(function() {
  window.TcpHandshakeSimulator = {
    step: 0,
    synFloodActive: false,
    synCookiesEnabled: false,

    render: function(containerEl) {
      if (!containerEl) return;

      this.step = 0;
      this.synFloodActive = false;
      this.synCookiesEnabled = false;

      containerEl.innerHTML = `
        <div class="interactive-lab-wrapper">
          <!-- Controls -->
          <div class="lab-pill-controls">
            <div class="pill-control-group" style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
              <span class="pill-group-label" style="margin-bottom:0;">TCP Handshake Phase Selector:</span>
              <select id="tcp-phase-dropdown" class="calc-input-field" style="background:#0b0c10; border:1px solid #272c34; color:#fff; border-radius:6px; padding:6px 12px; font-size:12.5px; font-weight:600;">
                <option value="closed" selected>Baseline: Client CLOSED, Server LISTEN</option>
                <option value="syn">Step 1: Client -> Server [SYN] Seq=1000 MSS=1460 (SYN_SENT)</option>
                <option value="synack">Step 2: Server -> Client [SYN, ACK] Seq=5000 Ack=1001 (SYN_RCVD)</option>
                <option value="ack">Step 3: Client -> Server [ACK] Seq=1001 Ack=5001 (ESTABLISHED ✓)</option>
                <option value="flood">Cyber Attack: SYN Flood Exhaustion (128/128 Backlog Full 💀)</option>
                <option value="cookies">Blue Team Defense: Cryptographic SYN Cookies (Stateless Handshake ✓)</option>
              </select>
            </div>

            <div class="pill-control-group" style="margin-top:8px;">
              <span class="pill-group-label">Quick Jump Handshake Phases:</span>
              <div class="pill-buttons-row" id="tcp-phase-pills">
                <button class="lab-pill-btn active" data-phase="closed">Baseline (Listen)</button>
                <button class="lab-pill-btn" data-phase="syn">1. [SYN]</button>
                <button class="lab-pill-btn" data-phase="synack">2. [SYN-ACK]</button>
                <button class="lab-pill-btn" data-phase="ack">3. [ACK - Established]</button>
                <button class="lab-pill-btn" data-phase="flood" style="border-color:#ef4444; color:#f87171;">⚠️ SYN Flood Attack</button>
                <button class="lab-pill-btn" data-phase="cookies">🛡️ SYN Cookies</button>
              </div>
            </div>

            <div class="pill-control-group" style="margin-top:8px;">
              <span class="pill-group-label">Step Controls:</span>
              <div class="pill-buttons-row">
                <button id="btn-tcp-step" class="lab-pill-btn">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  Step Handshake (Next Phase) →
                </button>
                <button id="btn-tcp-reset" class="lab-pill-btn">
                  ↺ Reset Baseline
                </button>
              </div>
            </div>
          </div>

          <!-- Network Diagram Canvas (Full-Width SVG Ladder Diagram) -->
          <div class="lab-diagram-card" style="padding:16px 20px 20px 20px; background:#0b0c10; border-radius:12px; border:1px solid #1e222a;">
            <svg id="tcp-ladder-svg" viewBox="0 0 940 300" style="width:100%; height:auto; display:block; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <defs>
                <marker id="arrow-tcp-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
                </marker>
                <marker id="arrow-tcp-cyan" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#00f0ff" />
                </marker>
                <marker id="arrow-tcp-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
                </marker>
                <marker id="arrow-tcp-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#ef4444" />
                </marker>
              </defs>

              <!-- CLIENT LIFELINE -->
              <line x1="220" y1="90" x2="220" y2="280" stroke="#334155" stroke-width="2" stroke-dasharray="4,4" />
              <!-- SERVER LIFELINE -->
              <line x1="720" y1="90" x2="720" y2="280" stroke="#334155" stroke-width="2" stroke-dasharray="4,4" />

              <!-- CLIENT HEADER CARD -->
              <g id="node-tcp-client">
                <rect x="120" y="15" width="200" height="75" rx="8" fill="#13151b" stroke="#38bdf8" stroke-width="2" />
                <text x="220" y="38" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Client (192.168.1.50:54210)</text>
                <text id="tcp-client-state-txt" x="220" y="58" fill="#94a3b8" font-size="11" font-weight="700" font-family="monospace" text-anchor="middle">State: CLOSED</text>
                <text x="220" y="74" fill="#64748b" font-size="9.5" font-family="monospace" text-anchor="middle">ISN: 1000 | NextSeq: 1000</text>
              </g>

              <!-- SERVER HEADER CARD -->
              <g id="node-tcp-server">
                <rect x="620" y="15" width="200" height="75" rx="8" fill="#13151b" stroke="#10b981" stroke-width="2" id="rect-tcp-server" />
                <text x="720" y="38" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Server (93.184.216.34:443)</text>
                <text id="tcp-server-state-txt" x="720" y="58" fill="#10b981" font-size="11" font-weight="700" font-family="monospace" text-anchor="middle">State: LISTEN</text>
                <text id="tcp-backlog-txt" x="720" y="74" fill="#64748b" font-size="9.5" font-family="monospace" text-anchor="middle">Backlog: 0 / 128 (Healthy)</text>
              </g>

              <!-- HANDSHAKE FLIGHT ARROWS -->
              <!-- Step 1: SYN (Client -> Server) -->
              <g id="arrow-group-syn" style="display:none;">
                <line x1="220" y1="120" x2="710" y2="155" stroke="#38bdf8" stroke-width="3" marker-end="url(#arrow-tcp-blue)" />
                <rect x="360" y="115" width="220" height="24" rx="12" fill="#0d1b2a" stroke="#38bdf8" />
                <text x="470" y="131" fill="#38bdf8" font-size="10.5" font-weight="700" font-family="monospace" text-anchor="middle">[SYN] Seq=1000 MSS=1460</text>
              </g>

              <!-- Step 2: SYN-ACK (Server -> Client) -->
              <g id="arrow-group-synack" style="display:none;">
                <line x1="720" y1="170" x2="230" y2="205" stroke="#00f0ff" stroke-width="3" marker-end="url(#arrow-tcp-cyan)" />
                <rect x="340" y="170" width="260" height="24" rx="12" fill="#0c1e28" stroke="#00f0ff" />
                <text x="470" y="186" fill="#00f0ff" font-size="10.5" font-weight="700" font-family="monospace" text-anchor="middle">[SYN, ACK] Seq=5000 Ack=1001</text>
              </g>

              <!-- Step 3: ACK (Client -> Server) -->
              <g id="arrow-group-ack" style="display:none;">
                <line x1="220" y1="220" x2="710" y2="255" stroke="#10b981" stroke-width="3" marker-end="url(#arrow-tcp-green)" />
                <rect x="360" y="222" width="220" height="24" rx="12" fill="#06281e" stroke="#10b981" />
                <text x="470" y="238" fill="#10b981" font-size="10.5" font-weight="700" font-family="monospace" text-anchor="middle">[ACK] Seq=1001 Ack=5001</text>
              </g>

              <!-- SYN FLOOD ATTACK ARROWS -->
              <g id="group-syn-flood-arrows" style="display:none;">
                <line x1="220" y1="110" x2="710" y2="125" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#arrow-tcp-red)" />
                <line x1="220" y1="140" x2="710" y2="155" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#arrow-tcp-red)" />
                <line x1="220" y1="170" x2="710" y2="185" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#arrow-tcp-red)" />
                <line x1="220" y1="200" x2="710" y2="215" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#arrow-tcp-red)" />
                <line x1="220" y1="230" x2="710" y2="245" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#arrow-tcp-red)" />
                <rect x="340" y="160" width="260" height="28" rx="14" fill="#2d1215" stroke="#ef4444" stroke-width="2" />
                <text x="470" y="178" fill="#ef4444" font-size="11" font-weight="700" text-anchor="middle">SYN FLOOD: Spoofed Half-Open Handshakes!</text>
              </g>
            </svg>
          </div>

          <!-- Status Bar -->
          <div style="background:#0c0e14; border:1px solid #1e222a; border-radius:8px; padding:10px 16px; font-family:var(--font-mono); font-size:12px; display:flex; justify-content:space-between; align-items:center;">
            <span id="tcp-step-status" style="color:#94a3b8;">TCP Handshake: Ready. Click 'Step Handshake' to begin 3-way synchronization.</span>
            <span id="tcp-rtt-status" style="color:#00f0ff; font-weight:700;">RTT: -</span>
          </div>

          <!-- Live Log Console -->
          <div class="handshake-log-console" id="tcp-console-log" style="height:115px; margin-top:0;">
            [READY] TCP stack initialized. Server in LISTEN state on port 443. Click 'Step Handshake' to initiate SYN synchronization.
          </div>
        </div>
      `;

      this.attachListeners(containerEl);
    },

    attachListeners: function(containerEl) {
      const btnStep = containerEl.querySelector('#btn-tcp-step');
      const btnReset = containerEl.querySelector('#btn-tcp-reset');
      const phaseDropdown = containerEl.querySelector('#tcp-phase-dropdown');
      const phaseBtns = containerEl.querySelectorAll('#tcp-phase-pills .lab-pill-btn');

      if (btnStep) btnStep.addEventListener('click', () => this.nextStep(containerEl));
      if (btnReset) btnReset.addEventListener('click', () => this.setPhase(containerEl, 'closed'));

      if (phaseDropdown) {
        phaseDropdown.addEventListener('change', (e) => {
          this.setPhase(containerEl, e.target.value);
        });
      }

      phaseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const phase = btn.getAttribute('data-phase');
          this.setPhase(containerEl, phase);
        });
      });
    },

    setPhase: function(containerEl, phase) {
      const phaseDropdown = containerEl.querySelector('#tcp-phase-dropdown');
      const phaseBtns = containerEl.querySelectorAll('#tcp-phase-pills .lab-pill-btn');
      if (phaseDropdown) phaseDropdown.value = phase;
      phaseBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-phase') === phase));

      const synArrow = containerEl.querySelector('#arrow-group-syn');
      const synackArrow = containerEl.querySelector('#arrow-group-synack');
      const ackArrow = containerEl.querySelector('#arrow-group-ack');
      const floodArrows = containerEl.querySelector('#group-syn-flood-arrows');

      const clientStateTxt = containerEl.querySelector('#tcp-client-state-txt');
      const serverStateTxt = containerEl.querySelector('#tcp-server-state-txt');
      const backlogTxt = containerEl.querySelector('#tcp-backlog-txt');
      const serverRect = containerEl.querySelector('#rect-tcp-server');
      const statusEl = containerEl.querySelector('#tcp-step-status');
      const rttEl = containerEl.querySelector('#tcp-rtt-status');

      if (phase === 'closed') {
        this.reset(containerEl);
      } else if (phase === 'syn') {
        this.step = 1;
        this.synFloodActive = false;
        if (synArrow) synArrow.style.display = 'block';
        if (synackArrow) synackArrow.style.display = 'none';
        if (ackArrow) ackArrow.style.display = 'none';
        if (floodArrows) floodArrows.style.display = 'none';
        if (clientStateTxt) { clientStateTxt.textContent = 'State: SYN_SENT'; clientStateTxt.style.color = '#38bdf8'; }
        if (serverStateTxt) { serverStateTxt.textContent = 'State: LISTEN'; serverStateTxt.style.color = '#10b981'; }
        if (backlogTxt) { backlogTxt.textContent = 'Backlog: 1 / 128 (Queueing SYN)'; backlogTxt.style.color = '#38bdf8'; }
        if (serverRect) serverRect.setAttribute('stroke', '#10b981');
        if (statusEl) { statusEl.textContent = 'Step 1: Client -> Server [SYN] Seq=1000 MSS=1460'; statusEl.style.color = '#38bdf8'; }
        if (rttEl) rttEl.textContent = '0.5 RTT';
        this.log("[STEP 1: SYN] Client -> Server: [SYN] Seq=1000, Win=65535, MSS=1460 (ISN=1000 allocated).");
      } else if (phase === 'synack') {
        this.step = 2;
        this.synFloodActive = false;
        if (synArrow) synArrow.style.display = 'block';
        if (synackArrow) synackArrow.style.display = 'block';
        if (ackArrow) ackArrow.style.display = 'none';
        if (floodArrows) floodArrows.style.display = 'none';
        if (clientStateTxt) { clientStateTxt.textContent = 'State: SYN_SENT'; clientStateTxt.style.color = '#38bdf8'; }
        if (serverStateTxt) { serverStateTxt.textContent = 'State: SYN_RCVD'; serverStateTxt.style.color = '#00f0ff'; }
        if (backlogTxt) { backlogTxt.textContent = 'Backlog: 1 / 128 (Half-Open TCB)'; backlogTxt.style.color = '#00f0ff'; }
        if (serverRect) serverRect.setAttribute('stroke', '#00f0ff');
        if (statusEl) { statusEl.textContent = 'Step 2: Server -> Client [SYN, ACK] Seq=5000 Ack=1001'; statusEl.style.color = '#00f0ff'; }
        if (rttEl) rttEl.textContent = '1.0 RTT';
        this.log("[STEP 2: SYN-ACK] Server -> Client: [SYN, ACK] Seq=5000, Ack=1001 (Acked Client ISN + 1).");
      } else if (phase === 'ack') {
        this.step = 3;
        this.synFloodActive = false;
        if (synArrow) synArrow.style.display = 'block';
        if (synackArrow) synackArrow.style.display = 'block';
        if (ackArrow) ackArrow.style.display = 'block';
        if (floodArrows) floodArrows.style.display = 'none';
        if (clientStateTxt) { clientStateTxt.textContent = 'State: ESTABLISHED ✓'; clientStateTxt.style.color = '#10b981'; }
        if (serverStateTxt) { serverStateTxt.textContent = 'State: ESTABLISHED ✓'; serverStateTxt.style.color = '#10b981'; }
        if (backlogTxt) { backlogTxt.textContent = 'Backlog: 0 / 128 (Socket Allocated)'; backlogTxt.style.color = '#10b981'; }
        if (serverRect) serverRect.setAttribute('stroke', '#10b981');
        if (statusEl) { statusEl.textContent = 'Step 3: 3-Way Handshake COMPLETE! Socket ESTABLISHED.'; statusEl.style.color = '#10b981'; }
        if (rttEl) rttEl.textContent = '1.5 RTT (Data Ready)';
        this.log("[STEP 3: ACK] Client -> Server: [ACK] Seq=1001, Ack=5001. Both endpoints are now ESTABLISHED!");
      } else if (phase === 'flood') {
        this.synFloodActive = true;
        this.synCookiesEnabled = false;
        if (synArrow) synArrow.style.display = 'none';
        if (synackArrow) synackArrow.style.display = 'none';
        if (ackArrow) ackArrow.style.display = 'none';
        if (floodArrows) floodArrows.style.display = 'block';
        if (serverStateTxt) { serverStateTxt.textContent = 'State: SYN_RCVD (QUEUE OVERFLOW!)'; serverStateTxt.style.color = '#ef4444'; }
        if (backlogTxt) { backlogTxt.textContent = 'Backlog: 128 / 128 (EXHAUSTED - DROPPING NEW SYNs)'; backlogTxt.style.color = '#ef4444'; }
        if (serverRect) serverRect.setAttribute('stroke', '#ef4444');
        if (statusEl) { statusEl.textContent = 'DoS ATTACK SUCCESSFUL: Server backlog full. Legitimate clients rejected!'; statusEl.style.color = '#ef4444'; }
        if (rttEl) rttEl.textContent = 'TIMEOUT';
        this.log("[ATTACK: SYN FLOOD] Attacker flooding server with fake source IPs. Half-open connection table full (128/128). Legitimate SYNs dropped!", true);
      } else if (phase === 'cookies') {
        this.synFloodActive = true;
        this.synCookiesEnabled = true;
        if (synArrow) synArrow.style.display = 'none';
        if (synackArrow) synackArrow.style.display = 'none';
        if (ackArrow) ackArrow.style.display = 'none';
        if (floodArrows) floodArrows.style.display = 'block';
        if (serverStateTxt) { serverStateTxt.textContent = 'State: SYN COOKIES ENGAGED'; serverStateTxt.style.color = '#10b981'; }
        if (backlogTxt) { backlogTxt.textContent = 'SYN COOKIES ACTIVE: Stateless Verification (0 Queue RAM used)'; backlogTxt.style.color = '#10b981'; }
        if (serverRect) serverRect.setAttribute('stroke', '#10b981');
        if (statusEl) { statusEl.textContent = 'SYN Flood mitigated by Cryptographic SYN Cookies!'; statusEl.style.color = '#10b981'; }
        if (rttEl) rttEl.textContent = '1.5 RTT (Protected)';
        this.log("[SYN FLOOD MITIGATED] Kernel SYN Cookies encode timestamp, MSS & crypto hash into Initial Seq Number (ISN). Zero memory allocated in backlog! Legitimate clients connect unimpeded.", false);
      }
    },

    log: function(msg, isAlert = false) {
      const logBox = document.getElementById('tcp-console-log');
      if (!logBox) return;
      const line = document.createElement('div');
      line.style.color = isAlert ? '#f87171' : '#a3e635';
      line.textContent = `> ${msg}`;
      logBox.appendChild(line);
      logBox.scrollTop = logBox.scrollHeight;
    },

    nextStep: function(containerEl) {
      if (this.synFloodActive) {
        this.setPhase(containerEl, 'closed');
        return;
      }
      if (this.step === 0) {
        this.setPhase(containerEl, 'syn');
      } else if (this.step === 1) {
        this.setPhase(containerEl, 'synack');
      } else if (this.step === 2) {
        this.setPhase(containerEl, 'ack');
      } else {
        this.setPhase(containerEl, 'closed');
      }
    },

    reset: function(containerEl) {
      this.step = 0;
      this.synFloodActive = false;

      const phaseDropdown = containerEl.querySelector('#tcp-phase-dropdown');
      const phaseBtns = containerEl.querySelectorAll('#tcp-phase-pills .lab-pill-btn');
      if (phaseDropdown) phaseDropdown.value = 'closed';
      phaseBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-phase') === 'closed'));

      const synArrow = containerEl.querySelector('#arrow-group-syn');
      const synackArrow = containerEl.querySelector('#arrow-group-synack');
      const ackArrow = containerEl.querySelector('#arrow-group-ack');
      const floodArrows = containerEl.querySelector('#group-syn-flood-arrows');

      const clientStateTxt = containerEl.querySelector('#tcp-client-state-txt');
      const serverStateTxt = containerEl.querySelector('#tcp-server-state-txt');
      const backlogTxt = containerEl.querySelector('#tcp-backlog-txt');
      const serverRect = containerEl.querySelector('#rect-tcp-server');
      const statusEl = containerEl.querySelector('#tcp-step-status');
      const rttEl = containerEl.querySelector('#tcp-rtt-status');

      if (synArrow) synArrow.style.display = 'none';
      if (synackArrow) synackArrow.style.display = 'none';
      if (ackArrow) ackArrow.style.display = 'none';
      if (floodArrows) floodArrows.style.display = 'none';

      if (clientStateTxt) { clientStateTxt.textContent = 'State: CLOSED'; clientStateTxt.style.color = '#94a3b8'; }
      if (serverStateTxt) { serverStateTxt.textContent = 'State: LISTEN'; serverStateTxt.style.color = '#10b981'; }
      if (backlogTxt) { backlogTxt.textContent = 'Backlog: 0 / 128 (Healthy)'; backlogTxt.style.color = '#64748b'; }
      if (serverRect) serverRect.setAttribute('stroke', '#10b981');
      if (statusEl) { statusEl.textContent = 'TCP Handshake: Ready. Click \'Step Handshake\' to begin 3-way synchronization.'; statusEl.style.color = '#94a3b8'; }
      if (rttEl) rttEl.textContent = 'RTT: -';

      this.log("Reset TCP states to initial baseline (Client: CLOSED, Server: LISTEN).");
    },

    toggleSynFlood: function(containerEl) {
      this.synFloodActive = !this.synFloodActive;

      const floodArrows = containerEl.querySelector('#group-syn-flood-arrows');
      const synArrow = containerEl.querySelector('#arrow-group-syn');
      const synackArrow = containerEl.querySelector('#arrow-group-synack');
      const ackArrow = containerEl.querySelector('#arrow-group-ack');

      const serverStateTxt = containerEl.querySelector('#tcp-server-state-txt');
      const backlogTxt = containerEl.querySelector('#tcp-backlog-txt');
      const serverRect = containerEl.querySelector('#rect-tcp-server');
      const statusEl = containerEl.querySelector('#tcp-step-status');

      if (this.synFloodActive) {
        if (synArrow) synArrow.style.display = 'none';
        if (synackArrow) synackArrow.style.display = 'none';
        if (ackArrow) ackArrow.style.display = 'none';
        if (floodArrows) floodArrows.style.display = 'block';

        if (this.synCookiesEnabled) {
          if (backlogTxt) { backlogTxt.textContent = 'SYN COOKIES ACTIVE: Stateless Verification (0 Queue RAM used)'; backlogTxt.style.color = '#10b981'; }
          if (statusEl) { statusEl.textContent = 'SYN Flood mitigated by Cryptographic SYN Cookies!'; statusEl.style.color = '#10b981'; }
          this.log("[SYN FLOOD MITIGATED] Attacker sent 10,000 spoofed SYNs. Kernel SYN Cookies encoded timestamp & MSS into ISN. Zero memory allocated! Legitimate users still connect.", false);
        } else {
          if (serverStateTxt) { serverStateTxt.textContent = 'State: SYN_RCVD (QUEUE OVERFLOW!)'; serverStateTxt.style.color = '#ef4444'; }
          if (backlogTxt) { backlogTxt.textContent = 'Backlog: 128 / 128 (EXHAUSTED - DROPPING NEW SYNs)'; backlogTxt.style.color = '#ef4444'; }
          if (serverRect) serverRect.setAttribute('stroke', '#ef4444');
          if (statusEl) { statusEl.textContent = 'DoS ATTACK SUCCESSFUL: Server backlog full. Legitimate clients rejected!'; statusEl.style.color = '#ef4444'; }
          this.log("[ATTACK: SYN FLOOD] Attacker flooding server with fake source IPs. Half-open connection table full (128/128). Legitimate SYNs dropped!", true);
        }
      } else {
        this.reset(containerEl);
      }
    },

    toggleSynCookies: function(containerEl) {
      this.synCookiesEnabled = !this.synCookiesEnabled;
      const btnCookies = containerEl.querySelector('#btn-tcp-syncookies');
      if (btnCookies) {
        btnCookies.classList.toggle('active', this.synCookiesEnabled);
      }
      this.log(`SYN Cookies setting toggled: ${this.synCookiesEnabled ? 'ENABLED (Stateless cryptographic ISN)' : 'DISABLED (Standard backlog queue)'}`);
      if (this.synFloodActive) {
        this.toggleSynFlood(containerEl);
        this.toggleSynFlood(containerEl);
      }
    }
  };
})();
