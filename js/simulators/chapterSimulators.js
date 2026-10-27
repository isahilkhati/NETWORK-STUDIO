/**
 * DEV. SAHIL - NETWORKING STUDIO
 * Dedicated Interactive Pictorial Simulators for Every Networking Chapter
 * Features full-width, high-contrast SVG diagrams with thick connecting lines and directional flow arrows!
 */
(function() {
  window.ChapterSimulators = {

    // =========================================================================
    // CH 02: ADDRESSING MODES (Unicast, Broadcast, Multicast, Anycast)
    // =========================================================================
    renderAddressingModes: function(containerEl) {
      if (!containerEl) return;
      containerEl.innerHTML = `
        <div class="interactive-lab-wrapper">
          <div class="lab-pill-controls">
            <div class="pill-control-group" style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
              <span class="pill-group-label" style="margin-bottom:0;">Transmission Mode:</span>
              <select id="addr-mode-dropdown" class="calc-input-field" style="background:#0b0c10; border:1px solid #272c34; color:#fff; border-radius:6px; padding:6px 12px; font-size:12.5px; font-weight:600;">
                <option value="unicast" selected>1. Unicast (One-to-One Delivery)</option>
                <option value="broadcast">2. Broadcast (One-to-All Flood to FF:FF:FF:FF:FF:FF)</option>
                <option value="multicast">3. Multicast (One-to-Group 224.0.0.0/4 IGMP)</option>
                <option value="anycast">4. Anycast (One-to-Nearest BGP Route e.g. 1.1.1.1)</option>
              </select>
            </div>
            <div class="pill-control-group" style="margin-top:8px;">
              <span class="pill-group-label">Quick Jump Mode Pills:</span>
              <div class="pill-buttons-row" id="addressing-mode-pills">
                <button class="lab-pill-btn active" data-mode="unicast">1. Unicast (One-to-One)</button>
                <button class="lab-pill-btn" data-mode="broadcast">2. Broadcast (One-to-All)</button>
                <button class="lab-pill-btn" data-mode="multicast">3. Multicast (One-to-Group)</button>
                <button class="lab-pill-btn" data-mode="anycast">4. Anycast (One-to-Nearest)</button>
              </div>
            </div>
          </div>

          <div class="lab-diagram-card" style="padding:16px 20px 20px 20px; background:#0b0c10; border-radius:12px; border:1px solid #1e222a;">
            <svg id="addr-svg" viewBox="0 0 920 300" style="width:100%; height:auto; display:block; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <defs>
                <marker id="arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
                </marker>
                <marker id="arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#ef4444" />
                </marker>
                <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
                </marker>
                <marker id="arrow-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b" />
                </marker>
              </defs>

              <!-- Connecting Cable Lines with Thick Visibility -->
              <g id="addr-lines-group">
                <!-- Line: Sender -> Switch -->
                <line id="line-src-switch" x1="180" y1="150" x2="380" y2="150" stroke="#ef4444" stroke-width="3.5" marker-end="url(#arrow-red)" />

                <!-- Line: Switch -> Host A -->
                <path id="line-switch-hostA" d="M 520 150 L 590 150 L 590 65 L 680 65" stroke="#10b981" stroke-width="3.5" fill="none" marker-end="url(#arrow-green)" />

                <!-- Line: Switch -> Host B -->
                <path id="line-switch-hostB" d="M 520 150 L 680 150" stroke="#334155" stroke-width="2.5" fill="none" />

                <!-- Line: Switch -> Host C -->
                <path id="line-switch-hostC" d="M 520 150 L 590 150 L 590 235 L 680 235" stroke="#334155" stroke-width="2.5" fill="none" />
              </g>

              <!-- Sender Host -->
              <g id="node-addr-src">
                <rect x="40" y="105" width="140" height="90" rx="10" fill="#13151b" stroke="#ef4444" stroke-width="2" />
                <rect x="95" y="120" width="30" height="20" rx="2" fill="none" stroke="#ef4444" stroke-width="2" />
                <line x1="102" y1="140" x2="118" y2="140" stroke="#ef4444" stroke-width="2" />
                <text x="110" y="162" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Sender Host</text>
                <text x="110" y="178" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">192.168.1.10</text>
              </g>

              <!-- Central Switch / Router -->
              <g id="node-addr-switch">
                <rect x="380" y="105" width="140" height="90" rx="10" fill="#171922" stroke="#38bdf8" stroke-width="2" />
                <circle cx="450" cy="132" r="14" fill="none" stroke="#38bdf8" stroke-width="2" />
                <line x1="436" y1="132" x2="464" y2="132" stroke="#38bdf8" stroke-width="2" />
                <text x="450" y="162" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Switch / Router</text>
                <text id="addr-switch-status-text" x="450" y="178" fill="#38bdf8" font-size="10" font-weight="600" text-anchor="middle">Unicast Forwarding</text>
              </g>

              <!-- Destination Host A -->
              <g id="node-addr-dstA">
                <rect id="rect-dstA" x="680" y="25" width="180" height="80" rx="10" fill="#13151b" stroke="#10b981" stroke-width="2" />
                <text x="770" y="52" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Host A (192.168.1.50)</text>
                <text id="status-dstA" x="770" y="72" fill="#10b981" font-size="10.5" font-weight="600" text-anchor="middle">Target (Receives Packet) ✓</text>
              </g>

              <!-- Destination Host B -->
              <g id="node-addr-dstB">
                <rect id="rect-dstB" x="680" y="110" width="180" height="80" rx="10" fill="#13151b" stroke="#272c37" stroke-width="1.5" />
                <text x="770" y="137" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Host B (192.168.1.51)</text>
                <text id="status-dstB" x="770" y="157" fill="#64748b" font-size="10.5" text-anchor="middle">Ignored (Dropped)</text>
              </g>

              <!-- Destination Host C -->
              <g id="node-addr-dstC">
                <rect id="rect-dstC" x="680" y="195" width="180" height="80" rx="10" fill="#13151b" stroke="#272c37" stroke-width="1.5" />
                <text x="770" y="222" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Host C (192.168.1.52)</text>
                <text id="status-dstC" x="770" y="242" fill="#64748b" font-size="10.5" text-anchor="middle">Ignored (Dropped)</text>
              </g>
            </svg>
          </div>

          <div class="lab-caption-text" id="addr-explanation-text" style="margin-top:12px; font-size:12.5px; color:#9da3af; line-height:1.6;">
            <strong>Unicast (One-to-One):</strong> Data packet travels exclusively from a single sender to a single recipient (e.g. standard HTTPS web request). The switch consults its CAM table and delivers the frame only to Host A's port. Other computers on the switch ignore the frame.
          </div>
        </div>
      `;

      const dropdown = containerEl.querySelector('#addr-mode-dropdown');
      const pills = containerEl.querySelectorAll('#addressing-mode-pills .lab-pill-btn');

      if (dropdown) {
        dropdown.addEventListener('change', (e) => {
          const mode = e.target.value;
          pills.forEach(b => b.classList.toggle('active', b.getAttribute('data-mode') === mode));
          this.updateAddressingMode(containerEl, mode);
        });
      }

      pills.forEach(btn => {
        btn.addEventListener('click', () => {
          const mode = btn.getAttribute('data-mode');
          if (dropdown) dropdown.value = mode;
          pills.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.updateAddressingMode(containerEl, mode);
        });
      });
    },

    updateAddressingMode: function(containerEl, mode) {
      const switchStatus = containerEl.querySelector('#addr-switch-status-text');
      const lineA = containerEl.querySelector('#line-switch-hostA');
      const lineB = containerEl.querySelector('#line-switch-hostB');
      const lineC = containerEl.querySelector('#line-switch-hostC');
      const rectA = containerEl.querySelector('#rect-dstA');
      const rectB = containerEl.querySelector('#rect-dstB');
      const rectC = containerEl.querySelector('#rect-dstC');
      const statA = containerEl.querySelector('#status-dstA');
      const statB = containerEl.querySelector('#status-dstB');
      const statC = containerEl.querySelector('#status-dstC');
      const exp = containerEl.querySelector('#addr-explanation-text');

      // Reset
      [rectA, rectB, rectC].forEach(r => { if (r) { r.setAttribute('stroke', '#272c37'); r.setAttribute('stroke-width', '1.5'); } });
      [lineA, lineB, lineC].forEach(l => { if (l) { l.setAttribute('stroke', '#334155'); l.setAttribute('stroke-width', '2.5'); l.removeAttribute('marker-end'); } });
      if (statA) { statA.textContent = 'Ignored (Dropped)'; statA.setAttribute('fill', '#64748b'); }
      if (statB) { statB.textContent = 'Ignored (Dropped)'; statB.setAttribute('fill', '#64748b'); }
      if (statC) { statC.textContent = 'Ignored (Dropped)'; statC.setAttribute('fill', '#64748b'); }

      if (mode === 'unicast') {
        switchStatus.textContent = 'Unicast Forwarding';
        rectA.setAttribute('stroke', '#10b981'); rectA.setAttribute('stroke-width', '2');
        lineA.setAttribute('stroke', '#10b981'); lineA.setAttribute('stroke-width', '3.5'); lineA.setAttribute('marker-end', 'url(#arrow-green)');
        statA.textContent = 'Target (Receives Packet) ✓'; statA.setAttribute('fill', '#10b981');
        exp.innerHTML = `<strong>Unicast (One-to-One):</strong> Packet is addressed to a single specific MAC/IP (Host A). The switch looks up the destination in its CAM table and forwards it exclusively to Host A's port. Network bandwidth is conserved and Hosts B and C do not see the traffic.`;
      } else if (mode === 'broadcast') {
        switchStatus.textContent = 'Flooding to All Ports!';
        [rectA, rectB, rectC].forEach(r => { if (r) { r.setAttribute('stroke', '#ef4444'); r.setAttribute('stroke-width', '2'); } });
        [lineA, lineB, lineC].forEach(l => { if (l) { l.setAttribute('stroke', '#ef4444'); l.setAttribute('stroke-width', '3.5'); l.setAttribute('marker-end', 'url(#arrow-red)'); } });
        [statA, statB, statC].forEach(s => { if (s) { s.textContent = 'Broadcast Received! (Processed)'; s.setAttribute('fill', '#ef4444'); } });
        exp.innerHTML = `<strong style="color:#ef4444;">Broadcast (One-to-All):</strong> Sent to <code class="mono">FF:FF:FF:FF:FF:FF</code> (L2) or <code class="mono">255.255.255.255</code> (L3). The switch MUST flood the packet out of every single port! Every single computer is forced to interrupt its CPU to process the frame. Used by ARP requests and DHCP discoveries. Attack risk: Broadcast storms.`;
      } else if (mode === 'multicast') {
        switchStatus.textContent = 'IGMP Group Filtering';
        rectA.setAttribute('stroke', '#f59e0b'); rectA.setAttribute('stroke-width', '2');
        rectB.setAttribute('stroke', '#f59e0b'); rectB.setAttribute('stroke-width', '2');
        lineA.setAttribute('stroke', '#f59e0b'); lineA.setAttribute('stroke-width', '3.5'); lineA.setAttribute('marker-end', 'url(#arrow-amber)');
        lineB.setAttribute('stroke', '#f59e0b'); lineB.setAttribute('stroke-width', '3.5'); lineB.setAttribute('marker-end', 'url(#arrow-amber)');
        statA.textContent = 'Group Member (Receives Stream) ✓'; statA.setAttribute('fill', '#f59e0b');
        statB.textContent = 'Group Member (Receives Stream) ✓'; statB.setAttribute('fill', '#f59e0b');
        exp.innerHTML = `<strong style="color:#f59e0b;">Multicast (One-to-Group):</strong> Sent to Class D range (<code class="mono">224.0.0.0/4</code>). Only hosts that joined the multicast group via IGMP (Hosts A and B) receive the packet. Host C never subscribed, so the switch prunes its port. Ideal for IPTV streams, video conferencing, and routing protocols (OSPF: <code class="mono">224.0.0.5</code>).`;
      } else if (mode === 'anycast') {
        switchStatus.textContent = 'BGP Shortest Route (Nearest)';
        rectA.setAttribute('stroke', '#38bdf8'); rectA.setAttribute('stroke-width', '2');
        lineA.setAttribute('stroke', '#38bdf8'); lineA.setAttribute('stroke-width', '3.5'); lineA.setAttribute('marker-end', 'url(#arrow-blue)');
        statA.textContent = 'Nearest Instance (Serviced) ✓'; statA.setAttribute('fill', '#38bdf8');
        statB.textContent = 'Distant Replica (Standby)'; statB.setAttribute('fill', '#64748b');
        statC.textContent = 'Distant Replica (Standby)'; statC.setAttribute('fill', '#64748b');
        exp.innerHTML = `<strong style="color:#38bdf8;">Anycast (One-to-Nearest):</strong> Multiple geographically distributed servers advertise the EXACT same IP address over BGP (e.g. Cloudflare <code class="mono">1.1.1.1</code> or Google <code class="mono">8.8.8.8</code>). Internet routers route the user's packet to the topologically nearest datacenter. If one site fails, BGP automatically redirects packets to the next closest healthy server!`;
      }
    },

    // =========================================================================
    // CH 03: TOPOLOGIES SANDBOX (Star, Bus, Ring, Mesh with Fault Testing)
    // =========================================================================
    renderTopologiesSandbox: function(containerEl) {
      if (!containerEl) return;
      containerEl.innerHTML = `
        <div class="interactive-lab-wrapper">
          <div class="lab-pill-controls">
            <div class="pill-control-group" style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
              <span class="pill-group-label" style="margin-bottom:0;">Network Topology:</span>
              <select id="topo-dropdown" class="calc-input-field" style="background:#0b0c10; border:1px solid #272c34; color:#fff; border-radius:6px; padding:6px 12px; font-size:12.5px; font-weight:600;">
                <option value="star" selected>1. Star Topology (Modern Ethernet Switch)</option>
                <option value="bus">2. Bus Topology (Shared Coaxial Trunk)</option>
                <option value="ring">3. Ring Topology (Deterministic Token Passing)</option>
                <option value="mesh">4. Mesh Topology (Full Redundancy)</option>
              </select>
            </div>
            <div class="pill-control-group" style="margin-top:8px;">
              <span class="pill-group-label">Quick Jump Architecture Pills:</span>
              <div class="pill-buttons-row" id="topo-pills">
                <button class="lab-pill-btn active" data-topo="star">1. Star</button>
                <button class="lab-pill-btn" data-topo="bus">2. Bus</button>
                <button class="lab-pill-btn" data-topo="ring">3. Ring</button>
                <button class="lab-pill-btn" data-topo="mesh">4. Mesh</button>
              </div>
            </div>
            <div style="margin-top:8px;">
              <button class="lab-pill-btn" id="btn-toggle-cable-break" style="border-color:#ef4444; color:#f87171;">
                ✂ Cut / Sever Physical Cable
              </button>
            </div>
          </div>

          <div class="lab-diagram-card" style="padding:16px 20px 20px 20px; background:#0b0c10; border-radius:12px; border:1px solid #1e222a;">
            <div id="topo-svg-mount" style="width:100%;"></div>
          </div>

          <div class="lab-caption-text" id="topo-explanation" style="margin-top:12px; font-size:12.5px; color:#9da3af; line-height:1.6;"></div>
        </div>
      `;

      let currentTopo = 'star';
      let isBroken = false;

      const mount = containerEl.querySelector('#topo-svg-mount');
      const exp = containerEl.querySelector('#topo-explanation');
      const breakBtn = containerEl.querySelector('#btn-toggle-cable-break');

      const renderTopo = () => {
        if (currentTopo === 'star') {
          mount.innerHTML = `
            <svg viewBox="0 0 920 300" style="width:100%; height:auto; display:block;">
              <!-- Radial Lines -->
              <line x1="460" y1="150" x2="200" y2="70" stroke="${isBroken ? '#ef4444' : '#10b981'}" stroke-width="3.5" stroke-dasharray="${isBroken ? '6,6' : 'none'}" />
              <line x1="460" y1="150" x2="720" y2="70" stroke="#10b981" stroke-width="3.5" />
              <line x1="460" y1="150" x2="200" y2="230" stroke="#10b981" stroke-width="3.5" />
              <line x1="460" y1="150" x2="720" y2="230" stroke="#10b981" stroke-width="3.5" />

              ${isBroken ? `
                <circle cx="330" cy="110" r="12" fill="#1f1114" stroke="#ef4444" stroke-width="2" />
                <line x1="326" y1="106" x2="334" y2="114" stroke="#ef4444" stroke-width="2" />
                <line x1="334" y1="106" x2="326" y2="114" stroke="#ef4444" stroke-width="2" />
                <rect x="250" y="45" width="130" height="24" rx="12" fill="#2d1215" stroke="#ef4444" />
                <text x="315" y="61" fill="#ef4444" font-size="10.5" font-weight="700" text-anchor="middle">Cable A Severed!</text>
              ` : ''}

              <!-- Central Switch -->
              <rect x="390" y="115" width="140" height="70" rx="10" fill="#171922" stroke="#38bdf8" stroke-width="2" />
              <text x="460" y="145" fill="#ffffff" font-size="13" font-weight="700" text-anchor="middle">Central Switch</text>
              <text x="460" y="165" fill="#38bdf8" font-size="10" text-anchor="middle">Multiport Hub / Switch</text>

              <!-- Node A -->
              <rect x="130" y="35" width="140" height="70" rx="8" fill="#13151b" stroke="${isBroken ? '#ef4444' : '#272c37'}" stroke-width="${isBroken ? '2' : '1.5'}" />
              <text x="200" y="65" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Workstation A</text>
              <text x="200" y="85" fill="${isBroken ? '#ef4444' : '#10b981'}" font-size="10" text-anchor="middle">${isBroken ? 'DISCONNECTED ✕' : 'Port 1 (Online) ✓'}</text>

              <!-- Node B -->
              <rect x="650" y="35" width="140" height="70" rx="8" fill="#13151b" stroke="#10b981" stroke-width="1.5" />
              <text x="720" y="65" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Workstation B</text>
              <text x="720" y="85" fill="#10b981" font-size="10" text-anchor="middle">Port 2 (Online) ✓</text>

              <!-- Node C -->
              <rect x="130" y="195" width="140" height="70" rx="8" fill="#13151b" stroke="#10b981" stroke-width="1.5" />
              <text x="200" y="225" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Workstation C</text>
              <text x="200" y="245" fill="#10b981" font-size="10" text-anchor="middle">Port 3 (Online) ✓</text>

              <!-- Node D -->
              <rect x="650" y="195" width="140" height="70" rx="8" fill="#13151b" stroke="#10b981" stroke-width="1.5" />
              <text x="720" y="225" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Workstation D</text>
              <text x="720" y="245" fill="#10b981" font-size="10" text-anchor="middle">Port 4 (Online) ✓</text>
            </svg>
          `;
          exp.innerHTML = isBroken 
            ? `<strong style="color:#10b981;">Fault Isolation Demonstrated:</strong> Even though Cable A was severed and Workstation A disconnected, Workstations B, C, and D remain 100% online through their independent switch ports!`
            : `<strong>Star Topology:</strong> Universal standard in modern enterprise LANs. Independent point-to-point links isolate physical cable faults. If one cable is damaged, other users experience zero downtime.`;
        } else if (currentTopo === 'bus') {
          mount.innerHTML = `
            <svg viewBox="0 0 920 300" style="width:100%; height:auto; display:block;">
              <!-- Main Shared Trunk Cable (Coaxial) -->
              <line x1="80" y1="100" x2="840" y2="100" stroke="${isBroken ? '#ef4444' : '#eab308'}" stroke-width="5" stroke-dasharray="${isBroken ? '8,8' : 'none'}" />

              <!-- Terminators at both ends -->
              <rect x="30" y="80" width="50" height="40" rx="4" fill="#1e293b" stroke="#64748b" />
              <text x="55" y="105" fill="#cbd5e1" font-size="9" text-anchor="middle">50Ω Term</text>

              <rect x="840" y="80" width="50" height="40" rx="4" fill="#1e293b" stroke="#64748b" />
              <text x="865" y="105" fill="#cbd5e1" font-size="9" text-anchor="middle">50Ω Term</text>

              <!-- 4 Drop Lines -->
              <line x1="160" y1="100" x2="160" y2="180" stroke="${isBroken ? '#ef4444' : '#eab308'}" stroke-width="3" />
              <line x1="360" y1="100" x2="360" y2="180" stroke="${isBroken ? '#ef4444' : '#eab308'}" stroke-width="3" />
              <line x1="560" y1="100" x2="560" y2="180" stroke="${isBroken ? '#ef4444' : '#eab308'}" stroke-width="3" />
              <line x1="760" y1="100" x2="760" y2="180" stroke="${isBroken ? '#ef4444' : '#eab308'}" stroke-width="3" />

              ${isBroken ? `
                <circle cx="460" cy="100" r="14" fill="#1f1114" stroke="#ef4444" stroke-width="2.5" />
                <line x1="454" y1="94" x2="466" y2="106" stroke="#ef4444" stroke-width="2.5" />
                <line x1="466" y1="94" x2="454" y2="106" stroke="#ef4444" stroke-width="2.5" />
                <rect x="390" y="45" width="140" height="24" rx="12" fill="#2d1215" stroke="#ef4444" />
                <text x="460" y="61" fill="#ef4444" font-size="10.5" font-weight="700" text-anchor="middle">Backbone Severed!</text>
              ` : ''}

              <!-- 4 Workstations -->
              <g transform="translate(90, 180)"><rect width="140" height="70" rx="8" fill="#13151b" stroke="${isBroken ? '#ef4444' : '#272c37'}" /><text x="70" y="35" fill="#fff" font-size="12" font-weight="700" text-anchor="middle">Node 1</text><text x="70" y="55" fill="${isBroken ? '#ef4444' : '#94a3b8'}" font-size="10" text-anchor="middle">${isBroken ? 'Signal Lost ✕' : 'Shared Coax Tap'}</text></g>
              <g transform="translate(290, 180)"><rect width="140" height="70" rx="8" fill="#13151b" stroke="${isBroken ? '#ef4444' : '#272c37'}" /><text x="70" y="35" fill="#fff" font-size="12" font-weight="700" text-anchor="middle">Node 2</text><text x="70" y="55" fill="${isBroken ? '#ef4444' : '#94a3b8'}" font-size="10" text-anchor="middle">${isBroken ? 'Signal Lost ✕' : 'Shared Coax Tap'}</text></g>
              <g transform="translate(490, 180)"><rect width="140" height="70" rx="8" fill="#13151b" stroke="${isBroken ? '#ef4444' : '#272c37'}" /><text x="70" y="35" fill="#fff" font-size="12" font-weight="700" text-anchor="middle">Node 3</text><text x="70" y="55" fill="${isBroken ? '#ef4444' : '#94a3b8'}" font-size="10" text-anchor="middle">${isBroken ? 'Signal Lost ✕' : 'Shared Coax Tap'}</text></g>
              <g transform="translate(690, 180)"><rect width="140" height="70" rx="8" fill="#13151b" stroke="${isBroken ? '#ef4444' : '#272c37'}" /><text x="70" y="35" fill="#fff" font-size="12" font-weight="700" text-anchor="middle">Node 4</text><text x="70" y="55" fill="${isBroken ? '#ef4444' : '#94a3b8'}" font-size="10" text-anchor="middle">${isBroken ? 'Signal Lost ✕' : 'Shared Coax Tap'}</text></g>
            </svg>
          `;
          exp.innerHTML = isBroken
            ? `<strong style="color:#ef4444;">Catastrophic Failure:</strong> In a Bus topology, a single physical break causes signal reflection across the entire wire. All 4 nodes immediately lose network connectivity simultaneously!`
            : `<strong>Bus Topology:</strong> All devices share a single backbone coaxial wire (10BASE2/5). Requires 50-ohm terminating resistors at both ends. Security: Any node can promiscuously sniff all packets on the entire wire!`;
        } else if (currentTopo === 'ring') {
          mount.innerHTML = `
            <svg viewBox="0 0 920 300" style="width:100%; height:auto; display:block;">
              <rect x="250" y="60" width="420" height="170" rx="40" fill="none" stroke="${isBroken ? '#ef4444' : '#38bdf8'}" stroke-width="3.5" stroke-dasharray="${isBroken ? '6,6' : 'none'}" />
              <polygon points="460,55 470,60 460,65" fill="#38bdf8" />
              <polygon points="675,140 670,150 665,140" fill="#38bdf8" />
              <polygon points="470,225 460,230 470,235" fill="#38bdf8" />
              <polygon points="245,150 250,140 255,150" fill="#38bdf8" />

              ${isBroken ? `
                <circle cx="560" cy="60" r="12" fill="#1f1114" stroke="#ef4444" stroke-width="2" />
                <line x1="556" y1="56" x2="564" y2="64" stroke="#ef4444" stroke-width="2" />
                <line x1="564" y1="56" x2="556" y2="64" stroke="#ef4444" stroke-width="2" />
                <text x="560" y="40" fill="#ef4444" font-size="10.5" font-weight="700" text-anchor="middle">Ring Broken!</text>
              ` : ''}

              <!-- 4 Nodes on the Ring -->
              <g transform="translate(180, 110)"><rect width="130" height="70" rx="8" fill="#13151b" stroke="#38bdf8" stroke-width="2" /><text x="65" y="35" fill="#fff" font-size="12" font-weight="700" text-anchor="middle">Node 1</text><text x="65" y="55" fill="#38bdf8" font-size="10" text-anchor="middle">Token RX/TX</text></g>
              <g transform="translate(395, 20)"><rect width="130" height="70" rx="8" fill="#13151b" stroke="#38bdf8" stroke-width="2" /><text x="65" y="35" fill="#fff" font-size="12" font-weight="700" text-anchor="middle">Node 2</text><text x="65" y="55" fill="#38bdf8" font-size="10" text-anchor="middle">Token Holder</text></g>
              <g transform="translate(610, 110)"><rect width="130" height="70" rx="8" fill="#13151b" stroke="#38bdf8" stroke-width="2" /><text x="65" y="35" fill="#fff" font-size="12" font-weight="700" text-anchor="middle">Node 3</text><text x="65" y="55" fill="#38bdf8" font-size="10" text-anchor="middle">Token RX/TX</text></g>
              <g transform="translate(395, 200)"><rect width="130" height="70" rx="8" fill="#13151b" stroke="#38bdf8" stroke-width="2" /><text x="65" y="35" fill="#fff" font-size="12" font-weight="700" text-anchor="middle">Node 4</text><text x="65" y="55" fill="#38bdf8" font-size="10" text-anchor="middle">Token RX/TX</text></g>
            </svg>
          `;
          exp.innerHTML = isBroken
            ? `<strong style="color:#ef4444;">Token Ring Interruption:</strong> Because token passing requires an unbroken closed loop, a single cable break halts transmission around the entire ring unless dual counter-rotating fiber rings (FDDI) are deployed!`
            : `<strong>Ring Topology:</strong> Nodes form a closed circular loop. A 3-byte token frame passes sequentially. No collisions can occur, giving predictable deterministic transmission latency.`;
        } else if (currentTopo === 'mesh') {
          mount.innerHTML = `
            <svg viewBox="0 0 920 300" style="width:100%; height:auto; display:block;">
              <!-- All 6 Interconnecting Links -->
              <line x1="260" y1="75" x2="660" y2="75" stroke="${isBroken ? '#ef4444' : '#10b981'}" stroke-width="${isBroken ? '2.5' : '3.5'}" stroke-dasharray="${isBroken ? '5,5' : 'none'}" />
              <line x1="260" y1="225" x2="660" y2="225" stroke="#10b981" stroke-width="3.5" />
              <line x1="260" y1="75" x2="260" y2="225" stroke="#10b981" stroke-width="3.5" />
              <line x1="660" y1="75" x2="660" y2="225" stroke="#10b981" stroke-width="3.5" />
              <line x1="260" y1="75" x2="660" y2="225" stroke="${isBroken ? '#10b981' : '#64748b'}" stroke-width="${isBroken ? '4' : '2.5'}" />
              <line x1="260" y1="225" x2="660" y2="75" stroke="${isBroken ? '#10b981' : '#64748b'}" stroke-width="${isBroken ? '4' : '2.5'}" />

              ${isBroken ? `
                <circle cx="460" cy="75" r="12" fill="#1f1114" stroke="#ef4444" stroke-width="2" />
                <line x1="456" y1="71" x2="464" y2="79" stroke="#ef4444" stroke-width="2" />
                <line x1="464" y1="71" x2="456" y2="79" stroke="#ef4444" stroke-width="2" />
                <text x="460" y="55" fill="#ef4444" font-size="10.5" font-weight="700" text-anchor="middle">Link 1-2 Cut (Rerouted Diagonal!)</text>
              ` : ''}

              <!-- 4 Routers -->
              <g transform="translate(190, 40)"><rect width="140" height="70" rx="10" fill="#13151b" stroke="#10b981" stroke-width="2" /><text x="70" y="35" fill="#fff" font-size="12" font-weight="700" text-anchor="middle">Core Router 1</text><text x="70" y="55" fill="#10b981" font-size="10" text-anchor="middle">3 Redundant Paths</text></g>
              <g transform="translate(590, 40)"><rect width="140" height="70" rx="10" fill="#13151b" stroke="#10b981" stroke-width="2" /><text x="70" y="35" fill="#fff" font-size="12" font-weight="700" text-anchor="middle">Core Router 2</text><text x="70" y="55" fill="#10b981" font-size="10" text-anchor="middle">3 Redundant Paths</text></g>
              <g transform="translate(190, 190)"><rect width="140" height="70" rx="10" fill="#13151b" stroke="#10b981" stroke-width="2" /><text x="70" y="35" fill="#fff" font-size="12" font-weight="700" text-anchor="middle">Core Router 3</text><text x="70" y="55" fill="#10b981" font-size="10" text-anchor="middle">3 Redundant Paths</text></g>
              <g transform="translate(590, 190)"><rect width="140" height="70" rx="10" fill="#13151b" stroke="#10b981" stroke-width="2" /><text x="70" y="35" fill="#fff" font-size="12" font-weight="700" text-anchor="middle">Core Router 4</text><text x="70" y="55" fill="#10b981" font-size="10" text-anchor="middle">3 Redundant Paths</text></g>
            </svg>
          `;
          exp.innerHTML = isBroken
            ? `<strong style="color:#10b981;">Dynamic Rerouting:</strong> Direct link between Router 1 and Router 2 was severed! OSPF/BGP routing instantly shifted packets across the diagonal mesh path through Router 4. Zero downtime!`
            : `<strong>Full Mesh Topology:</strong> Every single node has a direct point-to-point link to every other node ($N(N-1)/2$). Standard in internet backbones and critical data centers where zero downtime is tolerated.`;
        }
      };

      const topoDropdown = containerEl.querySelector('#topo-dropdown');
      const topoBtns = containerEl.querySelectorAll('#topo-pills .lab-pill-btn');

      if (topoDropdown) {
        topoDropdown.addEventListener('change', (e) => {
          currentTopo = e.target.value;
          topoBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-topo') === currentTopo));
          isBroken = false;
          if (breakBtn) {
            breakBtn.textContent = '✂ Cut / Sever Physical Cable';
            breakBtn.classList.remove('active');
          }
          renderTopo();
        });
      }

      topoBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          topoBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          currentTopo = btn.getAttribute('data-topo');
          if (topoDropdown) topoDropdown.value = currentTopo;
          isBroken = false;
          if (breakBtn) {
            breakBtn.textContent = '✂ Cut / Sever Physical Cable';
            breakBtn.classList.remove('active');
          }
          renderTopo();
        });
      });

      breakBtn.addEventListener('click', () => {
        isBroken = !isBroken;
        breakBtn.textContent = isBroken ? '↺ Reconnect Cable' : '✂ Cut / Sever Physical Cable';
        breakBtn.classList.toggle('active', isBroken);
        renderTopo();
      });

      renderTopo();
    },

    // =========================================================================
    // CH 04: TRANSMISSION & DEVICE WORKING (Hub vs Switch vs Router vs Firewall)
    // Full-Width SVG with explicit packet flow lines and port indicators!
    // =========================================================================
    renderDeviceWorkingLab: function(containerEl) {
      if (!containerEl) return;
      containerEl.innerHTML = `
        <div class="interactive-lab-wrapper">
          <div class="lab-pill-controls">
            <span class="pill-group-label">Select Network Hardware Device to Test Frame Forwarding & Sniffing:</span>
            <div class="pill-buttons-row" id="dev-type-pills">
              <button class="lab-pill-btn active" data-dev="hub">1. Layer 1: Hub (Dumb Repeater)</button>
              <button class="lab-pill-btn" data-dev="switch">2. Layer 2: Switch (MAC Learning)</button>
              <button class="lab-pill-btn" data-dev="router">3. Layer 3: Router (IP Routing)</button>
              <button class="lab-pill-btn" data-dev="firewall">4. Layer 4-7: Stateful Firewall</button>
            </div>
          </div>

          <div class="lab-diagram-card" style="padding:16px 20px 20px 20px; background:#0b0c10; border-radius:12px; border:1px solid #1e222a;">
            <svg id="dev-working-svg" viewBox="0 0 920 300" style="width:100%; height:auto; display:block; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <defs>
                <marker id="dev-arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
                </marker>
                <marker id="dev-arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#ef4444" />
                </marker>
                <marker id="dev-arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
                </marker>
              </defs>

              <!-- CONNECTING LINES -->
              <g id="dev-cables-group">
                <!-- Alice -> Device (Input) -->
                <line id="cable-alice-dev" x1="200" y1="150" x2="380" y2="150" stroke="#38bdf8" stroke-width="3.5" marker-end="url(#dev-arrow-blue)" />
                <text x="290" y="140" fill="#38bdf8" font-size="10" font-family="monospace" text-anchor="middle">Port 1 (Input Frame)</text>

                <!-- Device -> Bob (Target) -->
                <path id="cable-dev-bob" d="M 540 150 L 610 150 L 610 70 L 690 70" stroke="#10b981" stroke-width="3.5" fill="none" marker-end="url(#dev-arrow-green)" />
                <text id="cable-bob-label" x="610" y="55" fill="#10b981" font-size="10" font-family="monospace" text-anchor="middle">Port 2 (Intended Destination)</text>

                <!-- Device -> Eve (Sniffer / Eavesdropper) -->
                <path id="cable-dev-eve" d="M 540 150 L 610 150 L 610 230 L 690 230" stroke="#ef4444" stroke-width="3.5" fill="none" marker-end="url(#dev-arrow-red)" />
                <text id="cable-eve-label" x="610" y="245" fill="#ef4444" font-size="10" font-family="monospace" text-anchor="middle">Port 3: FLOODED COPY!</text>
              </g>

              <!-- Alice Workstation -->
              <g id="node-alice">
                <rect x="40" y="105" width="160" height="90" rx="10" fill="#13151b" stroke="#38bdf8" stroke-width="2" />
                <text x="120" y="138" fill="#ffffff" font-size="13" font-weight="700" text-anchor="middle">Alice (Port 1)</text>
                <text x="120" y="156" fill="#38bdf8" font-size="10" font-family="monospace" text-anchor="middle">192.168.1.10</text>
                <text x="120" y="172" fill="#94a3b8" font-size="9.5" text-anchor="middle">Sends Credit Card</text>
              </g>

              <!-- Central Device Box -->
              <g id="node-central-device">
                <rect id="rect-central-dev" x="380" y="100" width="160" height="100" rx="10" fill="#171922" stroke="#ef4444" stroke-width="2.5" />
                <text id="txt-dev-title" x="460" y="132" fill="#ffffff" font-size="13" font-weight="700" text-anchor="middle">Hub (Layer 1)</text>
                <text id="txt-dev-mechanism" x="460" y="152" fill="#ef4444" font-size="10.5" font-weight="600" text-anchor="middle">Dumb Repeater</text>
                <text id="txt-dev-action" x="460" y="172" fill="#94a3b8" font-size="9" text-anchor="middle">Floods to All Ports</text>
              </g>

              <!-- Bob (Intended Recipient) -->
              <g id="node-bob">
                <rect id="rect-bob" x="690" y="25" width="190" height="90" rx="10" fill="#13151b" stroke="#10b981" stroke-width="2" />
                <text x="785" y="55" fill="#ffffff" font-size="13" font-weight="700" text-anchor="middle">Bob (Port 2)</text>
                <text x="785" y="73" fill="#10b981" font-size="10" font-family="monospace" text-anchor="middle">192.168.1.20</text>
                <text id="txt-bob-status" x="785" y="91" fill="#10b981" font-size="10" text-anchor="middle">Receives Data ✓</text>
              </g>

              <!-- Eve (Sniffer / Kali) -->
              <g id="node-eve">
                <rect id="rect-eve" x="690" y="185" width="190" height="90" rx="10" fill="#191114" stroke="#ef4444" stroke-width="2" />
                <text x="785" y="215" fill="#ef4444" font-size="13" font-weight="700" text-anchor="middle">Eve (Port 3 - Sniffer)</text>
                <text x="785" y="233" fill="#f87171" font-size="10" font-family="monospace" text-anchor="middle">192.168.1.66 (Promiscuous)</text>
                <text id="txt-eve-status" x="785" y="251" fill="#ef4444" font-size="10" font-weight="700" text-anchor="middle">EAVESDROPS CARD! 💀</text>
              </g>
            </svg>
          </div>

          <div class="lab-caption-text" id="dev-explanation" style="margin-top:12px; font-size:12.5px; color:#9da3af; line-height:1.6;">
            <strong>Layer 1 Hub:</strong> A hub has zero intelligence. Electrical signals received on Port 1 are repeated out to EVERY other port. Eve passively captures Alice's credit card without needing any exploit!
          </div>
        </div>
      `;

      const pills = containerEl.querySelectorAll('#dev-type-pills .lab-pill-btn');
      pills.forEach(btn => {
        btn.addEventListener('click', () => {
          pills.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const dev = btn.getAttribute('data-dev');
          this.updateDeviceWorking(containerEl, dev);
        });
      });
    },

    updateDeviceWorking: function(containerEl, dev) {
      const title = containerEl.querySelector('#txt-dev-title');
      const mech = containerEl.querySelector('#txt-dev-mechanism');
      const act = containerEl.querySelector('#txt-dev-action');
      const devRect = containerEl.querySelector('#rect-central-dev');
      const cableEve = containerEl.querySelector('#cable-dev-eve');
      const labelEve = containerEl.querySelector('#cable-eve-label');
      const rectEve = containerEl.querySelector('#rect-eve');
      const statusEve = containerEl.querySelector('#txt-eve-status');
      const exp = containerEl.querySelector('#dev-explanation');

      if (dev === 'hub') {
        title.textContent = 'Hub (Layer 1)';
        mech.textContent = 'Dumb Repeater'; mech.style.fill = '#ef4444';
        act.textContent = 'Floods to All Ports';
        devRect.setAttribute('stroke', '#ef4444');
        cableEve.setAttribute('stroke', '#ef4444'); cableEve.setAttribute('stroke-width', '3.5');
        cableEve.setAttribute('stroke-dasharray', 'none');
        labelEve.textContent = 'Port 3: FLOODED COPY!'; labelEve.setAttribute('fill', '#ef4444');
        rectEve.setAttribute('stroke', '#ef4444');
        statusEve.textContent = 'EAVESDROPS CARD! 💀'; statusEve.setAttribute('fill', '#ef4444');
        exp.innerHTML = `<strong style="color:#ef4444;">Layer 1 Hub Hazard:</strong> Zero logic. Incoming bits on Port 1 are regenerated and broadcast out of every port. Anyone plugged into any wall jack running Wireshark can promiscuously read all plaintext passwords and sessions across the whole floor!`;
      } else if (dev === 'switch') {
        title.textContent = 'Switch (Layer 2)';
        mech.textContent = 'CAM Table Forwarding'; mech.style.fill = '#38bdf8';
        act.textContent = 'Unicast by Target MAC';
        devRect.setAttribute('stroke', '#38bdf8');
        cableEve.setAttribute('stroke', '#334155'); cableEve.setAttribute('stroke-width', '2');
        cableEve.setAttribute('stroke-dasharray', '5,5');
        labelEve.textContent = 'Port 3: Isolated (No Frame)'; labelEve.setAttribute('fill', '#64748b');
        rectEve.setAttribute('stroke', '#334155');
        statusEve.textContent = 'Port Isolated (Zero Data) ✓'; statusEve.setAttribute('fill', '#64748b');
        exp.innerHTML = `<strong style="color:#10b981;">Layer 2 Switch Microsegmentation:</strong> The switch reads the destination MAC address. It inspects its Content Addressable Memory (CAM) table and directs the frame exclusively to Port 2. Eve's port is kept isolated and receives nothing!`;
      } else if (dev === 'router') {
        title.textContent = 'Router (Layer 3)';
        mech.textContent = 'IP Routing & TTL Check'; mech.style.fill = '#38bdf8';
        act.textContent = 'Broadcast Boundary';
        devRect.setAttribute('stroke', '#38bdf8');
        cableEve.setAttribute('stroke', '#334155'); cableEve.setAttribute('stroke-width', '2');
        cableEve.setAttribute('stroke-dasharray', '5,5');
        labelEve.textContent = 'Broadcast Dropped at Boundary'; labelEve.setAttribute('fill', '#64748b');
        rectEve.setAttribute('stroke', '#334155');
        statusEve.textContent = 'Broadcast Blocked'; statusEve.setAttribute('fill', '#64748b');
        exp.innerHTML = `<strong>Layer 3 Router:</strong> Terminates broadcast domains. Strips Layer 2 frame, inspects Layer 3 IPv4 header, decrements TTL by 1, and routes across subnets. Eve cannot sniff packets across different IP subnets.`;
      } else if (dev === 'firewall') {
        title.textContent = 'Firewall (L4-L7)';
        mech.textContent = 'Stateful Inspection & DPI'; mech.style.fill = '#10b981';
        act.textContent = 'Deep Packet Analysis';
        devRect.setAttribute('stroke', '#10b981');
        cableEve.setAttribute('stroke', '#ef4444'); cableEve.setAttribute('stroke-width', '2');
        cableEve.setAttribute('stroke-dasharray', '4,4');
        labelEve.textContent = 'Port 3: Intrusion Blocked ⊗'; labelEve.setAttribute('fill', '#ef4444');
        rectEve.setAttribute('stroke', '#ef4444');
        statusEve.textContent = 'BLOCKED BY FIREWALL RULE ⊗'; statusEve.setAttribute('fill', '#ef4444');
        exp.innerHTML = `<strong>Stateful Firewall + IPS:</strong> Tracks bidirectional socket connection states. Drops unauthorized port scans, malicious shellcode payloads, and rogue ARP/DNS spoofing attempts before they enter the internal network.`;
      }
    },

    // =========================================================================
    // CH 05: 7-LAYER OSI ENCAPSULATION & DECAPSULATION ENGINE
    // Full-Width SVG with direct layer dropdown & step-by-step header wrapping!
    // =========================================================================
    renderEncapsulationEngine: function(containerEl) {
      if (!containerEl) return;
      containerEl.innerHTML = `
        <div class="interactive-lab-wrapper">
          <div class="lab-pill-controls">
            <div class="pill-control-group" style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
              <span class="pill-group-label" style="margin-bottom:0;">Select Layer to Inspect Encapsulation:</span>
              <select id="encap-layer-dropdown" class="calc-input-field" style="background:#0b0c10; border:1px solid #272c34; color:#fff; border-radius:6px; padding:6px 12px; font-size:12.5px; font-weight:600;">
                <option value="all" selected>Full Stack: All 7 Layers Encapsulated (L7 down to L1)</option>
                <option value="l7">Layer 7: Application (HTTP GET Request Data Payload)</option>
                <option value="l4">Layer 4: Transport (TCP Segment - Ports 52140 → 443 Added)</option>
                <option value="l3">Layer 3: Network (IP Packet - IP 192.168.1.50 → 93.184.216.34 Added)</option>
                <option value="l2">Layer 2: Data Link (Ethernet Frame - MAC Addresses + CRC32 Trailer)</option>
                <option value="l1">Layer 1: Physical (Bits on Wire - 01001000 Transceiver Bitstream)</option>
              </select>
            </div>

            <div class="pill-control-group" style="margin-top:8px;">
              <span class="pill-group-label">Quick Jump Direct Layer Pills:</span>
              <div class="pill-buttons-row" id="encap-direct-pills">
                <button class="lab-pill-btn active" data-layer="all">Full Stack</button>
                <button class="lab-pill-btn" data-layer="l7">L7 Data</button>
                <button class="lab-pill-btn" data-layer="l4">L4 Segment</button>
                <button class="lab-pill-btn" data-layer="l3">L3 Packet</button>
                <button class="lab-pill-btn" data-layer="l2">L2 Frame</button>
                <button class="lab-pill-btn" data-layer="l1">L1 Bits</button>
              </div>
            </div>

            <div class="pill-control-group" style="margin-top:8px;">
              <span class="pill-group-label">Directional Stack Stepper:</span>
              <div class="pill-buttons-row">
                <button class="lab-pill-btn" id="btn-encap-down">↓ Step Down (Encapsulate)</button>
                <button class="lab-pill-btn" id="btn-encap-up">↑ Step Up (Decapsulate)</button>
                <button class="lab-pill-btn" id="btn-encap-reset">↺ Reset to L7</button>
              </div>
            </div>
          </div>

          <div class="lab-diagram-card" style="padding:16px 20px 20px 20px; background:#0b0c10; border-radius:12px; border:1px solid #1e222a;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
              <div style="font-size:15px; font-weight:700; color:#fff;">
                OSI & TCP/IP Protocol Data Unit (PDU) Header Wrapping
              </div>
              <div id="encap-pdu-badge" style="background:#1e1022; border:1px solid #a855f7; border-radius:6px; padding:4px 10px; font-family:var(--font-mono); font-size:11.5px; color:#c084fc; font-weight:700;">
                ACTIVE PDU: ALL LAYERS VISIBLE
              </div>
            </div>

            <svg id="encap-svg" viewBox="0 0 920 300" style="width:100%; height:auto; display:block; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <defs>
                <marker id="encap-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
                </marker>
              </defs>

              <!-- DOWNWARD STACK FLOW GUIDE -->
              <line x1="120" y1="40" x2="120" y2="260" stroke="#38bdf8" stroke-width="3" stroke-dasharray="4,4" marker-end="url(#encap-arrow)" />
              <text x="75" y="150" fill="#38bdf8" font-size="11" font-weight="700" transform="rotate(-90 75 150)" text-anchor="middle">ENCAPSULATION ↓</text>

              <!-- 5 LAYER ROWS (Clickable) -->
              <!-- Layer 7: Data -->
              <g id="row-l7" style="cursor:pointer;">
                <rect id="rect-row-l7" x="180" y="25" width="700" height="45" rx="8" fill="#881337" stroke="#f43f5e" stroke-width="2" />
                <text x="210" y="52" fill="#ffffff" font-size="12" font-weight="700">Layer 7 (Application Data)</text>
                <text x="860" y="52" fill="#fecdd3" font-size="11" font-family="monospace" text-anchor="end">Payload: "GET /login.html HTTP/1.1"</text>
              </g>

              <!-- Layer 4: Segment -->
              <g id="row-l4" style="cursor:pointer;">
                <rect id="rect-row-l4-hdr" x="180" y="80" width="180" height="45" rx="6" fill="#581c87" stroke="#a855f7" stroke-width="2" />
                <text x="270" y="108" fill="#ffffff" font-size="11" font-weight="700" text-anchor="middle">[TCP: Src 52140 Dst 443]</text>
                <rect x="370" y="80" width="510" height="45" rx="6" fill="#881337" stroke="#f43f5e" stroke-width="1.5" />
                <text x="625" y="108" fill="#fecdd3" font-size="11" font-family="monospace" text-anchor="middle">Application Payload</text>
              </g>

              <!-- Layer 3: Packet -->
              <g id="row-l3" style="cursor:pointer;">
                <rect id="rect-row-l3-hdr" x="180" y="135" width="160" height="45" rx="6" fill="#1e3a8a" stroke="#3b82f6" stroke-width="2" />
                <text x="260" y="163" fill="#ffffff" font-size="9" font-weight="700" text-anchor="middle">[IP: 192.168.1.50 -&gt; 93.184.216.34]</text>
                <rect x="350" y="135" width="130" height="45" rx="6" fill="#581c87" stroke="#a855f7" stroke-width="1.5" />
                <text x="415" y="163" fill="#ffffff" font-size="11" text-anchor="middle">[TCP]</text>
                <rect x="490" y="135" width="390" height="45" rx="6" fill="#881337" stroke="#f43f5e" stroke-width="1.5" />
                <text x="685" y="163" fill="#fecdd3" font-size="11" font-family="monospace" text-anchor="middle">Data Payload</text>
              </g>

              <!-- Layer 2: Frame -->
              <g id="row-l2" style="cursor:pointer;">
                <rect id="rect-row-l2-hdr" x="180" y="190" width="140" height="45" rx="6" fill="#14532d" stroke="#22c55e" stroke-width="2" />
                <text x="250" y="218" fill="#ffffff" font-size="11" font-weight="700" text-anchor="middle">[L2 MAC Header]</text>
                <rect x="330" y="190" width="100" height="45" rx="6" fill="#1e3a8a" stroke="#3b82f6" stroke-width="1.5" />
                <text x="380" y="218" fill="#ffffff" font-size="11" text-anchor="middle">[IP]</text>
                <rect x="440" y="190" width="80" height="45" rx="6" fill="#581c87" stroke="#a855f7" stroke-width="1.5" />
                <text x="480" y="218" fill="#ffffff" font-size="11" text-anchor="middle">[TCP]</text>
                <rect x="530" y="190" width="260" height="45" rx="6" fill="#881337" stroke="#f43f5e" stroke-width="1.5" />
                <text x="660" y="218" fill="#fecdd3" font-size="11" font-family="monospace" text-anchor="middle">Data</text>
                <rect x="800" y="190" width="80" height="45" rx="6" fill="#14532d" stroke="#22c55e" stroke-width="2" />
                <text x="840" y="218" fill="#ffffff" font-size="11" font-weight="700" text-anchor="middle">[CRC32 FCS]</text>
              </g>

              <!-- Layer 1: Bits on Wire -->
              <g id="row-l1" style="cursor:pointer;">
                <rect id="rect-row-l1-hdr" x="180" y="245" width="700" height="45" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="2" />
                <text x="210" y="272" fill="#38bdf8" font-size="12" font-weight="700">Layer 1 (Physical Bits)</text>
                <text x="860" y="272" fill="#00f0ff" font-size="11" font-family="monospace" text-anchor="end">01001000 01100101 01101100 01101100 01101111 (Copper Voltage / Fiber Laser)</text>
              </g>
            </svg>
          </div>

          <!-- Live Layer Deep Breakdown Card -->
          <div id="encap-inspector-box" style="margin-top:12px; background:#0c0e14; border:1px solid #1e222a; border-radius:8px; padding:14px 18px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <div id="encap-inspector-title" style="font-size:14px; font-weight:700; color:#fff; margin-bottom:6px;">
              Protocol Stack Overview: End-to-End PDU Wrapping
            </div>
            <div id="encap-explanation" style="font-size:12.5px; color:#cbd5e1; line-height:1.65;">
              Select any layer from the dropdown above or click any layer row in the diagram to inspect its exact headers, protocol data unit (PDU) name, and cyber security attack vector!
            </div>
          </div>
        </div>
      `;

      let currentLayer = 'all'; // 'all' | 'l7' | 'l4' | 'l3' | 'l2' | 'l1'
      const layerOrder = ['l7', 'l4', 'l3', 'l2', 'l1'];

      const dropdown = containerEl.querySelector('#encap-layer-dropdown');
      const directBtns = containerEl.querySelectorAll('#encap-direct-pills .lab-pill-btn');
      const btnDown = containerEl.querySelector('#btn-encap-down');
      const btnUp = containerEl.querySelector('#btn-encap-up');
      const btnReset = containerEl.querySelector('#btn-encap-reset');

      const pduBadge = containerEl.querySelector('#encap-pdu-badge');
      const inspectorTitle = containerEl.querySelector('#encap-inspector-title');
      const exp = containerEl.querySelector('#encap-explanation');

      const rows = {
        l7: containerEl.querySelector('#row-l7'),
        l4: containerEl.querySelector('#row-l4'),
        l3: containerEl.querySelector('#row-l3'),
        l2: containerEl.querySelector('#row-l2'),
        l1: containerEl.querySelector('#row-l1')
      };

      function updateLayerState() {
        if (dropdown) dropdown.value = currentLayer;
        directBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-layer') === currentLayer));

        if (currentLayer === 'all') {
          Object.values(rows).forEach(r => { if (r) r.style.opacity = '1'; });
          if (pduBadge) {
            pduBadge.textContent = 'ACTIVE PDU: ALL LAYERS VISIBLE';
            pduBadge.style.borderColor = '#38bdf8';
            pduBadge.style.color = '#38bdf8';
          }
          if (inspectorTitle) inspectorTitle.textContent = 'OSI 7-Layer Encapsulation Complete Pipeline';
          exp.innerHTML = `<strong>Top-to-Bottom Flow:</strong> As data leaves your application (Browser), each operating system layer adds its own control header. Layer 4 adds ports (TCP), Layer 3 adds IP routing (IPv4), Layer 2 adds physical delivery MAC addresses + CRC32 trailer, and Layer 1 converts the whole package into electrical or optical bits on the wire!`;
        } else if (currentLayer === 'l7') {
          Object.entries(rows).forEach(([k, r]) => { if (r) r.style.opacity = (k === 'l7') ? '1' : '0.25'; });
          if (pduBadge) {
            pduBadge.textContent = 'LAYER 7 PDU: DATA (APPLICATION PAYLOAD)';
            pduBadge.style.borderColor = '#f43f5e';
            pduBadge.style.color = '#f43f5e';
          }
          if (inspectorTitle) inspectorTitle.textContent = 'Layer 7: Application Layer (HTTP / DNS / TLS)';
          exp.innerHTML = `
            <strong>PDU:</strong> Application Data &bull; <strong>Header:</strong> HTTP GET / POST headers<br>
            <strong>Addressing:</strong> URLs, URIs, Domain Names (e.g. <code class="mono">https://bank.com/login</code>)<br>
            <span style="color:#ef4444;"><strong>Red Team Exploit:</strong></span> SQL Injection, Cross-Site Scripting (XSS), Command Injection inside HTTP parameters.<br>
            <span style="color:#10b981;"><strong>Blue Team Defense:</strong></span> Web Application Firewall (WAF), input validation, parameterized queries, and Content Security Policy (CSP).
          `;
        } else if (currentLayer === 'l4') {
          Object.entries(rows).forEach(([k, r]) => { if (r) r.style.opacity = (k === 'l4' || k === 'l7') ? '1' : '0.25'; });
          if (pduBadge) {
            pduBadge.textContent = 'LAYER 4 PDU: SEGMENT (TCP) / DATAGRAM (UDP)';
            pduBadge.style.borderColor = '#a855f7';
            pduBadge.style.color = '#a855f7';
          }
          if (inspectorTitle) inspectorTitle.textContent = 'Layer 4: Transport Layer (TCP Ports & Flow Control)';
          exp.innerHTML = `
            <strong>PDU:</strong> TCP Segment (20-byte header added) &bull; <strong>Fields:</strong> Source Port (52140), Destination Port (443), Sequence Number, ACK Number, Window Size.<br>
            <strong>Addressing:</strong> 16-bit Port numbers (0 to 65535) directing packets to the exact running process.<br>
            <span style="color:#ef4444;"><strong>Red Team Exploit:</strong></span> TCP SYN Flood, port scanning (Nmap SYN scan), session hijacking via sequence prediction.<br>
            <span style="color:#10b981;"><strong>Blue Team Defense:</strong></span> Stateful inspection firewalls, SYN Cookies, TCP window scale limits.
          `;
        } else if (currentLayer === 'l3') {
          Object.entries(rows).forEach(([k, r]) => { if (r) r.style.opacity = (k === 'l3' || k === 'l4' || k === 'l7') ? '1' : '0.25'; });
          if (pduBadge) {
            pduBadge.textContent = 'LAYER 3 PDU: PACKET (IPv4 / IPv6)';
            pduBadge.style.borderColor = '#3b82f6';
            pduBadge.style.color = '#3b82f6';
          }
          if (inspectorTitle) inspectorTitle.textContent = 'Layer 3: Network Layer (Logical IP Addressing & Routing)';
          exp.innerHTML = `
            <strong>PDU:</strong> IP Packet (20-byte IPv4 header added) &bull; <strong>Fields:</strong> Source IP (192.168.1.50), Destination IP (93.184.216.34), TTL (Time to Live), Protocol (6=TCP).<br>
            <strong>Addressing:</strong> 32-bit Logical IPv4 or 128-bit IPv6 addresses traversing global internet routers.<br>
            <span style="color:#ef4444;"><strong>Red Team Exploit:</strong></span> IP Address Spoofing, IP Fragmentation evasion, ICMP Smurf amplification attacks.<br>
            <span style="color:#10b981;"><strong>Blue Team Defense:</strong></span> Router Access Control Lists (ACLs), BCP 38 anti-spoofing ingress filters, uRPF (Unicast Reverse Path Forwarding).
          `;
        } else if (currentLayer === 'l2') {
          Object.entries(rows).forEach(([k, r]) => { if (r) r.style.opacity = (k === 'l2' || k === 'l3' || k === 'l4' || k === 'l7') ? '1' : '0.25'; });
          if (pduBadge) {
            pduBadge.textContent = 'LAYER 2 PDU: FRAME (ETHERNET 802.3 / 802.11)';
            pduBadge.style.borderColor = '#22c55e';
            pduBadge.style.color = '#22c55e';
          }
          if (inspectorTitle) inspectorTitle.textContent = 'Layer 2: Data Link Layer (Hardware MAC & Error Detection)';
          exp.innerHTML = `
            <strong>PDU:</strong> Ethernet Frame (14-byte MAC header + 4-byte CRC32 trailer appended) &bull; <strong>Fields:</strong> Source MAC, Dest MAC, EtherType (0x0800), FCS.<br>
            <strong>Addressing:</strong> 48-bit Burned-In Hardware MAC address (<code class="mono">aa:bb:cc:dd:ee:ff</code>).<br>
            <span style="color:#ef4444;"><strong>Red Team Exploit:</strong></span> ARP Cache Poisoning (MITM), MAC Flooding (CAM table overflow), VLAN Hopping.<br>
            <span style="color:#10b981;"><strong>Blue Team Defense:</strong></span> Dynamic ARP Inspection (DAI), Port Security (MAC limiting), DHCP Snooping, 802.1X Network Access Control.
          `;
        } else if (currentLayer === 'l1') {
          Object.values(rows).forEach(r => { if (r) r.style.opacity = '1'; });
          if (pduBadge) {
            pduBadge.textContent = 'LAYER 1 PDU: BITS / VOLTAGE / OPTICAL PULSES';
            pduBadge.style.borderColor = '#00f0ff';
            pduBadge.style.color = '#00f0ff';
          }
          if (inspectorTitle) inspectorTitle.textContent = 'Layer 1: Physical Layer (Transceivers & Signaling)';
          exp.innerHTML = `
            <strong>PDU:</strong> Raw Bitstream (0s and 1s) &bull; <strong>Medium:</strong> Copper Cat6 voltage transitions (+/- 2.5V), optical laser pulses (1310nm/1550nm), or Wi-Fi RF carrier waves.<br>
            <span style="color:#ef4444;"><strong>Red Team Exploit:</strong></span> Physical cable tapping, fiber macrobend light leak sniffer, radio jamming (RF deauth).<br>
            <span style="color:#10b981;"><strong>Blue Team Defense:</strong></span> Optical Time-Domain Reflectometry (OTDR alarms for fiber taps), locked server rack cages, shielded Cat6A STP cables.
          `;
        }
      }

      if (dropdown) {
        dropdown.addEventListener('change', (e) => {
          currentLayer = e.target.value;
          updateLayerState();
        });
      }

      directBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          currentLayer = btn.getAttribute('data-layer');
          updateLayerState();
        });
      });

      if (btnDown) {
        btnDown.addEventListener('click', () => {
          if (currentLayer === 'all' || currentLayer === 'l1') {
            currentLayer = 'l7';
          } else {
            const idx = layerOrder.indexOf(currentLayer);
            if (idx >= 0 && idx < layerOrder.length - 1) {
              currentLayer = layerOrder[idx + 1];
            } else {
              currentLayer = 'all';
            }
          }
          updateLayerState();
        });
      }

      if (btnUp) {
        btnUp.addEventListener('click', () => {
          if (currentLayer === 'all' || currentLayer === 'l7') {
            currentLayer = 'l1';
          } else {
            const idx = layerOrder.indexOf(currentLayer);
            if (idx > 0) {
              currentLayer = layerOrder[idx - 1];
            } else {
              currentLayer = 'all';
            }
          }
          updateLayerState();
        });
      }

      if (btnReset) {
        btnReset.addEventListener('click', () => {
          currentLayer = 'l7';
          updateLayerState();
        });
      }

      // Make SVG rows directly clickable
      Object.entries(rows).forEach(([k, rowEl]) => {
        if (rowEl) {
          rowEl.addEventListener('click', () => {
            currentLayer = k;
            updateLayerState();
          });
        }
      });

      updateLayerState();
    },

    // =========================================================================
    // CH 08: IPv4 BINARY OCTET CONVERTER & ROUTING DECISION TREE
    // Full-Width SVG with explicit subnet comparison and gateway decision flow!
    // =========================================================================
    renderIpBinaryConverter: function(containerEl) {
      if (!containerEl) return;
      containerEl.innerHTML = `
        <div class="interactive-lab-wrapper">
          <div class="lab-pill-controls">
            <span class="pill-group-label">Interactive IPv4 Binary Octet Flipper & Routing Logic Tree:</span>
            <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
              <input type="text" id="ip-class-input" class="calc-input-field" value="192.168.1.50" style="width:180px; padding:6px 12px; background:#0b0c10; border:1px solid #272c34; color:#fff; border-radius:6px; font-family:monospace;">
              <button class="lab-pill-btn active" id="btn-analyze-ip">Analyze Route & Binary</button>
            </div>
          </div>

          <div class="lab-diagram-card" style="padding:16px 20px 20px 20px; background:#0b0c10; border-radius:12px; border:1px solid #1e222a;">
            <svg id="ip-route-svg" viewBox="0 0 920 300" style="width:100%; height:auto; display:block; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <defs>
                <marker id="route-arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
                </marker>
                <marker id="route-arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
                </marker>
              </defs>

              <!-- Node 1: Sender -->
              <g id="node-ip-src">
                <rect x="30" y="105" width="170" height="90" rx="10" fill="#13151b" stroke="#38bdf8" stroke-width="2" />
                <text x="115" y="135" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Local Host (Sender)</text>
                <text x="115" y="153" fill="#38bdf8" font-size="10" font-family="monospace" text-anchor="middle">IP: 192.168.1.10/24</text>
                <text x="115" y="172" fill="#94a3b8" font-size="9.5" text-anchor="middle">Mask: 255.255.255.0</text>
              </g>

              <!-- Connecting Line: Sender -> Comparator -->
              <line x1="200" y1="150" x2="330" y2="150" stroke="#38bdf8" stroke-width="3" marker-end="url(#route-arrow-blue)" />
              <text x="265" y="140" fill="#38bdf8" font-size="9.5" font-family="monospace" text-anchor="middle">Destination IP</text>

              <!-- Node 2: Bitwise AND Comparator -->
              <g id="node-ip-compare">
                <rect x="330" y="95" width="220" height="110" rx="10" fill="#171922" stroke="#eab308" stroke-width="2" />
                <text x="440" y="125" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Bitwise AND Comparison</text>
                <text x="440" y="145" fill="#eab308" font-size="10" font-family="monospace" text-anchor="middle">Dest IP & Subnet Mask</text>
                <text id="txt-calc-netid" x="440" y="165" fill="#10b981" font-size="10" font-family="monospace" text-anchor="middle">NetID: 192.168.1.0</text>
                <text id="txt-calc-verdict" x="440" y="185" fill="#38bdf8" font-size="9.5" font-weight="700" text-anchor="middle">Match! Same Subnet ✓</text>
              </g>

              <!-- Path A: Local Delivery (Top Branch) -->
              <path id="path-local-route" d="M 550 130 L 630 130 L 630 65 L 700 65" stroke="#10b981" stroke-width="3.5" fill="none" marker-end="url(#route-arrow-green)" />
              <rect id="rect-dst-local" x="700" y="25" width="190" height="80" rx="10" fill="#13151b" stroke="#10b981" stroke-width="2" />
              <text x="795" y="52" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Local Delivery via ARP</text>
              <text x="795" y="70" fill="#10b981" font-size="10" font-family="monospace" text-anchor="middle">Direct MAC Delivery ✓</text>
              <text x="795" y="86" fill="#94a3b8" font-size="9" text-anchor="middle">Zero Router Hops Required</text>

              <!-- Path B: Remote Delivery to Gateway (Bottom Branch) -->
              <path id="path-gw-route" d="M 550 170 L 630 170 L 630 235 L 700 235" stroke="#334155" stroke-width="2" fill="none" />
              <rect id="rect-dst-gw" x="700" y="195" width="190" height="80" rx="10" fill="#13151b" stroke="#334155" stroke-width="1.5" />
              <text x="795" y="222" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Default Gateway Router</text>
              <text x="795" y="240" fill="#64748b" font-size="10" font-family="monospace" text-anchor="middle">Next Hop: 192.168.1.1</text>
              <text x="795" y="256" fill="#64748b" font-size="9" text-anchor="middle">For Remote Internet IPs</text>
            </svg>
          </div>

          <div class="lab-caption-text" id="ip-analysis-exp" style="margin-top:12px; font-size:12.5px; color:#9da3af; line-height:1.6;">
            <strong>Routing Decision Logic:</strong> Computer performs bitwise AND between destination IP (192.168.1.50) and its own subnet mask (255.255.255.0). The resulting Network ID (192.168.1.0) matches its local network, so it broadcasts an ARP request directly for Host A's MAC address without touching the router!
          </div>
        </div>
      `;

      const input = containerEl.querySelector('#ip-class-input');
      const btn = containerEl.querySelector('#btn-analyze-ip');
      const netIdTxt = containerEl.querySelector('#txt-calc-netid');
      const verdictTxt = containerEl.querySelector('#txt-calc-verdict');
      const pathLocal = containerEl.querySelector('#path-local-route');
      const pathGw = containerEl.querySelector('#path-gw-route');
      const rectLocal = containerEl.querySelector('#rect-dst-local');
      const rectGw = containerEl.querySelector('#rect-dst-gw');
      const exp = containerEl.querySelector('#ip-analysis-exp');

      const analyze = () => {
        const val = input.value.trim();
        const isLocal = val.startsWith('192.168.1.');

        if (isLocal) {
          netIdTxt.textContent = 'NetID: 192.168.1.0';
          verdictTxt.textContent = 'Match! Same Subnet ✓'; verdictTxt.style.fill = '#10b981';
          pathLocal.setAttribute('stroke', '#10b981'); pathLocal.setAttribute('stroke-width', '3.5');
          pathGw.setAttribute('stroke', '#334155'); pathGw.setAttribute('stroke-width', '2');
          rectLocal.setAttribute('stroke', '#10b981');
          rectGw.setAttribute('stroke', '#334155');
          exp.innerHTML = `<strong>Local Delivery (${val}):</strong> NetID matches local interface. Host transmits an ARP query (<code class="mono">Who has ${val}? Tell 192.168.1.10</code>). Frames travel directly through the switch with zero routing hops!`;
        } else {
          netIdTxt.textContent = `Remote NetID: ${val.split('.').slice(0,3).join('.')}.0`;
          verdictTxt.textContent = 'Mismatch! Remote Destination ➔'; verdictTxt.style.fill = '#38bdf8';
          pathLocal.setAttribute('stroke', '#334155'); pathLocal.setAttribute('stroke-width', '2');
          pathGw.setAttribute('stroke', '#38bdf8'); pathGw.setAttribute('stroke-width', '3.5');
          rectLocal.setAttribute('stroke', '#334155');
          rectGw.setAttribute('stroke', '#38bdf8');
          exp.innerHTML = `<strong>Remote Routing (${val}):</strong> NetID does NOT match local interface. Host cannot deliver directly. It wraps the IP packet into an Ethernet frame addressed to the <strong>Default Gateway's MAC</strong> (<code class="mono">192.168.1.1</code>) so the router can forward it to the Internet!`;
        }
      };

      btn.addEventListener('click', analyze);
      input.addEventListener('input', analyze);
    },

    // =========================================================================
    // CH 10: IPv4 HEADER DISSECTOR & HOP-BY-HOP TRACEROUTE TOPOLOGY
    // Full-Width SVG with direct hop dropdown, explicit router hops, and TTL flow!
    // =========================================================================
    renderHeaderDissector: function(containerEl) {
      if (!containerEl) return;
      containerEl.innerHTML = `
        <div class="interactive-lab-wrapper">
          <div class="lab-pill-controls">
            <div class="pill-control-group" style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
              <span class="pill-group-label" style="margin-bottom:0;">Traceroute Hop Selector:</span>
              <select id="ttl-hop-dropdown" class="calc-input-field" style="background:#0b0c10; border:1px solid #272c34; color:#fff; border-radius:6px; padding:6px 12px; font-size:12.5px; font-weight:600;">
                <option value="hop0" selected>Hop 0: Packet Origin (Sender Host - TTL = 3 Initial)</option>
                <option value="hop1">Hop 1: Default Gateway 192.168.1.1 (TTL decrements to 2)</option>
                <option value="hop2">Hop 2: Core ISP Backbone Router 10.240.1.1 (TTL decrements to 1)</option>
                <option value="hop3">Hop 3: Expiry at ISP Router (TTL drops to 0 -> ICMP Type 11 Exceeded!)</option>
                <option value="target">Destination: Web Server 93.184.216.34 (TTL = 64 Echo Reply ✓)</option>
              </select>
            </div>

            <div class="pill-control-group" style="margin-top:8px;">
              <span class="pill-group-label">Quick Jump Hop Pills:</span>
              <div class="pill-buttons-row" id="ttl-hop-pills">
                <button class="lab-pill-btn active" data-hop="hop0">Hop 0 (Host)</button>
                <button class="lab-pill-btn" data-hop="hop1">Hop 1 (Gateway)</button>
                <button class="lab-pill-btn" data-hop="hop2">Hop 2 (ISP Core)</button>
                <button class="lab-pill-btn" data-hop="hop3" style="border-color:#ef4444; color:#f87171;">Hop 3 (TTL=0 Drop!)</button>
                <button class="lab-pill-btn" data-hop="target">Destination Server</button>
              </div>
            </div>

            <div class="pill-control-group" style="margin-top:8px;">
              <span class="pill-group-label">Step-by-Step Flow:</span>
              <div class="pill-buttons-row">
                <button class="lab-pill-btn" id="btn-ttl-next">Next Hop Forward →</button>
                <button class="lab-pill-btn" id="btn-ttl-prev">← Previous Hop</button>
                <button class="lab-pill-btn" id="btn-ttl-reset">↺ Reset TTL = 3</button>
              </div>
            </div>
          </div>

          <div class="lab-diagram-card" style="padding:16px 20px 20px 20px; background:#0b0c10; border-radius:12px; border:1px solid #1e222a;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
              <div style="font-size:15px; font-weight:700; color:#fff;">
                IPv4 Header Time-to-Live (TTL) & ICMP Time Exceeded Diagnostic
              </div>
              <div id="ttl-metric-badge" style="background:#0d1b2a; border:1px solid #38bdf8; border-radius:6px; padding:4px 10px; font-family:var(--font-mono); font-size:11.5px; color:#38bdf8; font-weight:700;">
                ACTIVE TTL = 3 • HOP 0 (ORIGIN)
              </div>
            </div>

            <svg id="traceroute-svg" viewBox="0 0 920 280" style="width:100%; height:auto; display:block; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <defs>
                <marker id="ttl-arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
                </marker>
                <marker id="ttl-arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
                </marker>
                <marker id="ttl-arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#ef4444" />
                </marker>
              </defs>

              <!-- CONNECTING HOPS LINES -->
              <line id="line-hop-1" x1="170" y1="120" x2="280" y2="120" stroke="#334155" stroke-width="2.5" />
              <line id="line-hop-2" x1="420" y1="120" x2="530" y2="120" stroke="#334155" stroke-width="2.5" />
              <line id="line-hop-3" x1="670" y1="120" x2="760" y2="120" stroke="#334155" stroke-width="2.5" />

              <!-- Sender Node -->
              <g id="tr-node-sender" style="cursor:pointer;">
                <rect id="rect-sender" x="30" y="75" width="140" height="90" rx="10" fill="#13151b" stroke="#38bdf8" stroke-width="2" />
                <text x="100" y="105" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Your Host</text>
                <text x="100" y="123" fill="#38bdf8" font-size="10" font-family="monospace" text-anchor="middle">192.168.1.50</text>
                <text id="txt-ttl-badge" x="100" y="145" fill="#ef4444" font-size="11" font-weight="800" font-family="monospace" text-anchor="middle">TTL = 3</text>
              </g>

              <!-- Hop 1 Router -->
              <g id="tr-node-hop1" style="cursor:pointer;">
                <rect id="rect-hop1" x="280" y="75" width="140" height="90" rx="10" fill="#171922" stroke="#272c37" stroke-width="1.5" />
                <circle cx="350" cy="105" r="12" fill="none" stroke="#64748b" stroke-width="2" id="circle-hop1" />
                <text x="350" y="132" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Hop 1 Router</text>
                <text x="350" y="150" fill="#94a3b8" font-size="9.5" font-family="monospace" text-anchor="middle">192.168.1.1 (GW)</text>
              </g>

              <!-- Hop 2 Router -->
              <g id="tr-node-hop2" style="cursor:pointer;">
                <rect id="rect-hop2" x="530" y="75" width="140" height="90" rx="10" fill="#171922" stroke="#272c37" stroke-width="1.5" />
                <circle cx="600" cy="105" r="12" fill="none" stroke="#64748b" stroke-width="2" id="circle-hop2" />
                <text x="600" y="132" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Hop 2 ISP Core</text>
                <text x="600" y="150" fill="#64748b" font-size="9.5" font-family="monospace" text-anchor="middle">10.240.1.1</text>
              </g>

              <!-- Hop 3 Target Server -->
              <g id="tr-node-hop3" style="cursor:pointer;">
                <rect id="rect-hop3" x="760" y="75" width="130" height="90" rx="10" fill="#171922" stroke="#272c37" stroke-width="1.5" />
                <text x="825" y="110" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Target Server</text>
                <text x="825" y="130" fill="#64748b" font-size="9.5" font-family="monospace" text-anchor="middle">93.184.216.34</text>
                <text id="txt-hop3-status" x="825" y="150" fill="#64748b" font-size="9" text-anchor="middle">Awaiting Packet</text>
              </g>

              <!-- Drop / Return ICMP Indicator -->
              <g id="icmp-exceeded-group" style="display:none;">
                <circle cx="600" cy="120" r="14" fill="#1f1114" stroke="#ef4444" stroke-width="2.5" />
                <line x1="595" y1="115" x2="605" y2="125" stroke="#ef4444" stroke-width="2.5" />
                <line x1="605" y1="115" x2="595" y2="125" stroke="#ef4444" stroke-width="2.5" />
                <path d="M 600 135 L 600 220 L 100 220 L 100 165" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="4,4" fill="none" marker-end="url(#ttl-arrow-red)" />
                <rect x="230" y="205" width="350" height="26" rx="13" fill="#2d1215" stroke="#ef4444" stroke-width="1.5" />
                <text x="405" y="222" fill="#ef4444" font-size="10.5" font-weight="700" text-anchor="middle">ICMP Type 11 Code 0 (Time to Live Exceeded in Transit) Return Path</text>
              </g>
            </svg>
          </div>

          <div class="lab-caption-text" id="header-explanation" style="margin-top:12px; font-size:12.5px; color:#9da3af; line-height:1.6;">
            <strong>Time To Live (TTL):</strong> Decremented by 1 at every router hop. When TTL reaches 0, the router discards the packet and sends back ICMP Type 11 (TTL Exceeded), which is how Traceroute maps every router between you and the server!
          </div>
        </div>
      `;

      let activeHop = 'hop0'; // 'hop0' | 'hop1' | 'hop2' | 'hop3' | 'target'
      const hopList = ['hop0', 'hop1', 'hop2', 'hop3', 'target'];

      const dropdown = containerEl.querySelector('#ttl-hop-dropdown');
      const hopBtns = containerEl.querySelectorAll('#ttl-hop-pills .lab-pill-btn');
      const btnNext = containerEl.querySelector('#btn-ttl-next');
      const btnPrev = containerEl.querySelector('#btn-ttl-prev');
      const btnReset = containerEl.querySelector('#btn-ttl-reset');

      const ttlBadge = containerEl.querySelector('#txt-ttl-badge');
      const metricBadge = containerEl.querySelector('#ttl-metric-badge');
      const lineHop1 = containerEl.querySelector('#line-hop-1');
      const lineHop2 = containerEl.querySelector('#line-hop-2');
      const lineHop3 = containerEl.querySelector('#line-hop-3');
      const rectSender = containerEl.querySelector('#rect-sender');
      const rectHop1 = containerEl.querySelector('#rect-hop1');
      const circleHop1 = containerEl.querySelector('#circle-hop1');
      const rectHop2 = containerEl.querySelector('#rect-hop2');
      const circleHop2 = containerEl.querySelector('#circle-hop2');
      const rectHop3 = containerEl.querySelector('#rect-hop3');
      const hop3Status = containerEl.querySelector('#txt-hop3-status');
      const icmpGroup = containerEl.querySelector('#icmp-exceeded-group');
      const exp = containerEl.querySelector('#header-explanation');

      function updateTracerouteLab() {
        if (dropdown) dropdown.value = activeHop;
        hopBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-hop') === activeHop));

        // Reset elements
        [lineHop1, lineHop2, lineHop3].forEach(l => { if (l) { l.setAttribute('stroke', '#334155'); l.setAttribute('stroke-width', '2.5'); l.removeAttribute('marker-end'); } });
        [rectSender, rectHop1, rectHop2, rectHop3].forEach(r => { if (r) { r.setAttribute('stroke', '#272c37'); r.setAttribute('stroke-width', '1.5'); } });
        if (circleHop1) circleHop1.setAttribute('stroke', '#64748b');
        if (circleHop2) circleHop2.setAttribute('stroke', '#64748b');
        if (icmpGroup) icmpGroup.style.display = 'none';
        if (hop3Status) { hop3Status.textContent = 'Awaiting Packet'; hop3Status.setAttribute('fill', '#64748b'); }

        if (activeHop === 'hop0') {
          rectSender.setAttribute('stroke', '#38bdf8'); rectSender.setAttribute('stroke-width', '2.5');
          ttlBadge.textContent = 'TTL = 3'; ttlBadge.style.fill = '#ef4444';
          if (metricBadge) {
            metricBadge.textContent = 'ACTIVE TTL = 3 • HOP 0 (ORIGIN HOST)';
            metricBadge.style.borderColor = '#38bdf8'; metricBadge.style.color = '#38bdf8';
          }
          exp.innerHTML = `<strong>Hop 0 (Packet Generated):</strong> Your workstation builds an IPv4 packet destined for <code class="mono">93.184.216.34</code>. The operating system writes <code class="mono">TTL = 3</code> into the 8-bit TTL field in the IP header. Packet enters the Default Gateway link.`;
        } else if (activeHop === 'hop1') {
          lineHop1.setAttribute('stroke', '#38bdf8'); lineHop1.setAttribute('stroke-width', '3.5'); lineHop1.setAttribute('marker-end', 'url(#ttl-arrow-blue)');
          rectHop1.setAttribute('stroke', '#38bdf8'); rectHop1.setAttribute('stroke-width', '2.5');
          if (circleHop1) circleHop1.setAttribute('stroke', '#38bdf8');
          ttlBadge.textContent = 'TTL = 2'; ttlBadge.style.fill = '#f59e0b';
          if (metricBadge) {
            metricBadge.textContent = 'ACTIVE TTL = 2 • HOP 1 (GATEWAY 192.168.1.1)';
            metricBadge.style.borderColor = '#38bdf8'; metricBadge.style.color = '#38bdf8';
          }
          exp.innerHTML = `<strong>Hop 1 (Default Gateway 192.168.1.1):</strong> The local router receives the IP packet, decrements the TTL field from 3 to 2, recalculates the IP Header Checksum, and forwards it to the ISP backbone.`;
        } else if (activeHop === 'hop2') {
          lineHop1.setAttribute('stroke', '#38bdf8'); lineHop1.setAttribute('stroke-width', '3.5');
          lineHop2.setAttribute('stroke', '#38bdf8'); lineHop2.setAttribute('stroke-width', '3.5'); lineHop2.setAttribute('marker-end', 'url(#ttl-arrow-blue)');
          rectHop2.setAttribute('stroke', '#38bdf8'); rectHop2.setAttribute('stroke-width', '2.5');
          if (circleHop2) circleHop2.setAttribute('stroke', '#38bdf8');
          ttlBadge.textContent = 'TTL = 1'; ttlBadge.style.fill = '#f59e0b';
          if (metricBadge) {
            metricBadge.textContent = 'ACTIVE TTL = 1 • HOP 2 (ISP CORE 10.240.1.1)';
            metricBadge.style.borderColor = '#38bdf8'; metricBadge.style.color = '#38bdf8';
          }
          exp.innerHTML = `<strong>Hop 2 (ISP Core Router 10.240.1.1):</strong> The transit router receives the packet, decrements TTL from 2 to 1, and routes it to the next peering link.`;
        } else if (activeHop === 'hop3') {
          lineHop1.setAttribute('stroke', '#38bdf8'); lineHop1.setAttribute('stroke-width', '2.5');
          lineHop2.setAttribute('stroke', '#ef4444'); lineHop2.setAttribute('stroke-width', '3.5');
          rectHop2.setAttribute('stroke', '#ef4444'); rectHop2.setAttribute('stroke-width', '2.5');
          if (circleHop2) circleHop2.setAttribute('stroke', '#ef4444');
          if (icmpGroup) icmpGroup.style.display = 'block';
          ttlBadge.textContent = 'TTL = 0 (EXPIRED!)'; ttlBadge.style.fill = '#ef4444';
          if (metricBadge) {
            metricBadge.textContent = 'ACTIVE TTL = 0 • DROPPED! ICMP TIME EXCEEDED RETURNED';
            metricBadge.style.borderColor = '#ef4444'; metricBadge.style.color = '#ef4444';
          }
          exp.innerHTML = `<strong style="color:#ef4444;">TTL EXPIRED AT HOP 2:</strong> Router detected TTL decremented from 1 to 0. Per RFC 792, the packet is discarded to prevent infinite routing loops, and an <strong>ICMP Type 11 Code 0 (Time Exceeded)</strong> datagram is sent back to sender. This response tells Traceroute the router's IP and round-trip ping latency!`;
        } else if (activeHop === 'target') {
          lineHop1.setAttribute('stroke', '#10b981'); lineHop1.setAttribute('stroke-width', '3.5');
          lineHop2.setAttribute('stroke', '#10b981'); lineHop2.setAttribute('stroke-width', '3.5');
          lineHop3.setAttribute('stroke', '#10b981'); lineHop3.setAttribute('stroke-width', '3.5'); lineHop3.setAttribute('marker-end', 'url(#ttl-arrow-green)');
          rectHop3.setAttribute('stroke', '#10b981'); rectHop3.setAttribute('stroke-width', '2.5');
          if (hop3Status) { hop3Status.textContent = 'Packet Delivered ✓'; hop3Status.setAttribute('fill', '#10b981'); }
          ttlBadge.textContent = 'TTL = 64 (Delivered)'; ttlBadge.style.fill = '#10b981';
          if (metricBadge) {
            metricBadge.textContent = 'DESTINATION REACHED • TTL = 64 • 0% PACKET LOSS';
            metricBadge.style.borderColor = '#10b981'; metricBadge.style.color = '#10b981';
          }
          exp.innerHTML = `<strong>Destination Reached (93.184.216.34):</strong> When sending with full standard TTL (e.g. 64 or 128), the packet reaches the target server safely with TTL remaining. Server returns an ICMP Echo Reply (Type 0) or completes TCP handshake!`;
        }
      }

      if (dropdown) {
        dropdown.addEventListener('change', (e) => {
          activeHop = e.target.value;
          updateTracerouteLab();
        });
      }

      hopBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          activeHop = btn.getAttribute('data-hop');
          updateTracerouteLab();
        });
      });

      if (btnNext) {
        btnNext.addEventListener('click', () => {
          const idx = hopList.indexOf(activeHop);
          if (idx >= 0 && idx < hopList.length - 1) {
            activeHop = hopList[idx + 1];
          } else {
            activeHop = 'hop0';
          }
          updateTracerouteLab();
        });
      }

      if (btnPrev) {
        btnPrev.addEventListener('click', () => {
          const idx = hopList.indexOf(activeHop);
          if (idx > 0) {
            activeHop = hopList[idx - 1];
          } else {
            activeHop = hopList[hopList.length - 1];
          }
          updateTracerouteLab();
        });
      }

      if (btnReset) {
        btnReset.addEventListener('click', () => {
          activeHop = 'hop0';
          updateTracerouteLab();
        });
      }

      // SVG Clickable Router / Host Nodes
      const nodeSender = containerEl.querySelector('#tr-node-sender');
      const nodeHop1 = containerEl.querySelector('#tr-node-hop1');
      const nodeHop2 = containerEl.querySelector('#tr-node-hop2');
      const nodeHop3 = containerEl.querySelector('#tr-node-hop3');

      if (nodeSender) nodeSender.addEventListener('click', () => { activeHop = 'hop0'; updateTracerouteLab(); });
      if (nodeHop1) nodeHop1.addEventListener('click', () => { activeHop = 'hop1'; updateTracerouteLab(); });
      if (nodeHop2) nodeHop2.addEventListener('click', () => { activeHop = 'hop3'; updateTracerouteLab(); });
      if (nodeHop3) nodeHop3.addEventListener('click', () => { activeHop = 'target'; updateTracerouteLab(); });

      updateTracerouteLab();
    },

    // =========================================================================
    // CH 11: NAT, PAT & DHCP DORA TRANSLATION LAB
    // Full-Width SVG with explicit inside/outside translation lines!
    // =========================================================================
    renderNatDhcpLab: function(containerEl) {
      if (!containerEl) return;
      containerEl.innerHTML = `
        <div class="interactive-lab-wrapper">
          <div class="lab-pill-controls">
            <span class="pill-group-label">Interactive NAT/PAT & DHCP Translation Lab:</span>
            <div class="pill-buttons-row" id="nat-test-pills">
              <button class="lab-pill-btn active" data-action="phone">1. Phone HTTP Request</button>
              <button class="lab-pill-btn" data-action="laptop">2. Laptop SSH Request</button>
              <button class="lab-pill-btn" data-action="dhcp">3. Simulate DHCP DORA Exchange</button>
            </div>
          </div>

          <div class="lab-diagram-card" style="padding:16px 20px 20px 20px; background:#0b0c10; border-radius:12px; border:1px solid #1e222a;">
            <svg id="nat-svg" viewBox="0 0 920 300" style="width:100%; height:auto; display:block; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <defs>
                <marker id="nat-arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
                </marker>
                <marker id="nat-arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
                </marker>
              </defs>

              <!-- LAN BOUNDARY -->
              <rect x="20" y="25" width="310" height="250" rx="12" fill="#0d0f14" stroke="#262b35" stroke-width="1.5" stroke-dasharray="4,4" />
              <text x="40" y="50" fill="#64748b" font-size="10.5" font-weight="700" letter-spacing="1">HOME LAN (RFC 1918 PRIVATE)</text>

              <!-- CONNECTING LINES -->
              <!-- Internal Host -> NAT Router -->
              <line id="line-nat-internal" x1="180" y1="150" x2="380" y2="150" stroke="#38bdf8" stroke-width="3.5" marker-end="url(#nat-arrow-blue)" />
              <rect x="210" y="125" width="140" height="20" rx="4" fill="#0d1b2a" stroke="#38bdf8" />
              <text id="lbl-nat-inside" x="280" y="139" fill="#38bdf8" font-size="9" font-family="monospace" text-anchor="middle">Src: 192.168.1.105:51234</text>

              <!-- NAT Router -> Internet Server -->
              <line id="line-nat-external" x1="560" y1="150" x2="720" y2="150" stroke="#10b981" stroke-width="3.5" marker-end="url(#nat-arrow-green)" />
              <rect x="580" y="125" width="120" height="20" rx="4" fill="#06281e" stroke="#10b981" />
              <text id="lbl-nat-outside" x="640" y="139" fill="#10b981" font-size="9" font-family="monospace" text-anchor="middle">Src: 203.0.113.88:49152</text>

              <!-- Host Device -->
              <g id="node-nat-host">
                <rect x="40" y="95" width="140" height="110" rx="10" fill="#13151b" stroke="#38bdf8" stroke-width="2" />
                <text id="txt-nat-devname" x="110" y="130" fill="#ffffff" font-size="13" font-weight="700" text-anchor="middle">Phone</text>
                <text id="txt-nat-privip" x="110" y="150" fill="#38bdf8" font-size="10" font-family="monospace" text-anchor="middle">192.168.1.105</text>
                <text x="110" y="170" fill="#94a3b8" font-size="9.5" text-anchor="middle">Non-Routable IP</text>
              </g>

              <!-- Central NAT / PAT Router with Live Table -->
              <g id="node-nat-router">
                <rect x="380" y="70" width="180" height="160" rx="10" fill="#171922" stroke="#ef4444" stroke-width="2" />
                <text x="470" y="95" fill="#ffffff" font-size="13" font-weight="700" text-anchor="middle">NAT / PAT Gateway</text>
                <text x="470" y="112" fill="#ef4444" font-size="9.5" font-family="monospace" text-anchor="middle">WAN: 203.0.113.88</text>
                <!-- NAT State Table Inside Router -->
                <rect x="390" y="125" width="160" height="90" rx="6" fill="#0b0c10" stroke="#272c34" />
                <text x="470" y="142" fill="#94a3b8" font-size="8.5" font-weight="700" text-anchor="middle">NAT STATE TABLE</text>
                <text id="txt-tbl-inside" x="400" y="160" fill="#38bdf8" font-size="8.5" font-family="monospace">In: 192.168.1.105:51234</text>
                <text id="txt-tbl-outside" x="400" y="178" fill="#10b981" font-size="8.5" font-family="monospace">Out: 203.0.113.88:49152</text>
                <text id="txt-tbl-dest" x="400" y="196" fill="#cbd5e1" font-size="8.5" font-family="monospace">Dst: 142.250.190.46:443</text>
              </g>

              <!-- Internet Server -->
              <g id="node-nat-server">
                <rect x="720" y="95" width="160" height="110" rx="10" fill="#13151b" stroke="#10b981" stroke-width="2" />
                <text x="800" y="130" fill="#ffffff" font-size="13" font-weight="700" text-anchor="middle">Google Web Server</text>
                <text x="800" y="150" fill="#10b981" font-size="10" font-family="monospace" text-anchor="middle">142.250.190.46:443</text>
                <text x="800" y="170" fill="#94a3b8" font-size="9" text-anchor="middle">Sees Source 203.0.113.88!</text>
              </g>
            </svg>
          </div>

          <div class="lab-caption-text" id="nat-explanation-text" style="margin-top:12px; font-size:12.5px; color:#9da3af; line-height:1.6;">
            <strong>Port Address Translation (PAT):</strong> Router replaces the private source IP (192.168.1.105) with its own public IP (203.0.113.88) and assigns a unique temporary external port (49152). When Google replies, the router looks up 49152 in its NAT table and forwards the packet back to the Phone!
          </div>
        </div>
      `;

      const pills = containerEl.querySelectorAll('#nat-test-pills .lab-pill-btn');
      const devName = containerEl.querySelector('#txt-nat-devname');
      const privIp = containerEl.querySelector('#txt-nat-privip');
      const lblInside = containerEl.querySelector('#lbl-nat-inside');
      const lblOutside = containerEl.querySelector('#lbl-nat-outside');
      const tblInside = containerEl.querySelector('#txt-tbl-inside');
      const tblOutside = containerEl.querySelector('#txt-tbl-outside');
      const tblDest = containerEl.querySelector('#txt-tbl-dest');
      const exp = containerEl.querySelector('#nat-explanation-text');

      pills.forEach(btn => {
        btn.addEventListener('click', () => {
          pills.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const act = btn.getAttribute('data-action');

          if (act === 'phone') {
            devName.textContent = 'Phone';
            privIp.textContent = '192.168.1.105';
            lblInside.textContent = 'Src: 192.168.1.105:51234';
            lblOutside.textContent = 'Src: 203.0.113.88:49152';
            tblInside.textContent = 'In: 192.168.1.105:51234';
            tblOutside.textContent = 'Out: 203.0.113.88:49152';
            tblDest.textContent = 'Dst: 142.250.190.46:443';
            exp.innerHTML = `<strong>PAT Web Request:</strong> Phone connects to HTTPS (Port 443). Router rewrites private IP 192.168.1.105 to WAN IP 203.0.113.88:49152. Google server has no idea the internal phone even exists!`;
          } else if (act === 'laptop') {
            devName.textContent = 'Laptop';
            privIp.textContent = '192.168.1.110';
            lblInside.textContent = 'Src: 192.168.1.110:60122';
            lblOutside.textContent = 'Src: 203.0.113.88:49153';
            tblInside.textContent = 'In: 192.168.1.110:60122';
            tblOutside.textContent = 'Out: 203.0.113.88:49153';
            tblDest.textContent = 'Dst: 20.50.100.15:22';
            exp.innerHTML = `<strong>Concurrent Session:</strong> Even though both Phone and Laptop share the single WAN IP (203.0.113.88), the router assigns port 49153 to the Laptop. The unique port mapping prevents session crossover!`;
          } else if (act === 'dhcp') {
            devName.textContent = 'New Client';
            privIp.textContent = '0.0.0.0 (Unassigned)';
            lblInside.textContent = 'DHCP DISCOVER (Port 67)';
            lblOutside.textContent = 'DHCP OFFER (Lease 192.168.1.115)';
            tblInside.textContent = 'DORA 1: DISCOVER';
            tblOutside.textContent = 'DORA 2: OFFER';
            tblDest.textContent = 'DORA 3: REQ / 4: ACK';
            exp.innerHTML = `<strong>DHCP DORA Sequence:</strong> Client broadcasts UDP Discover on port 67. DHCP server replies with IP lease, Subnet Mask (/24), Default Gateway, and DNS servers. Security Threat: Rogue DHCP server can hijack entire network traffic!`;
          }
        });
      });
    },

    // =========================================================================
    // CH 14: TCP VS UDP RELIABILITY & PACKET LOSS SIMULATOR
    // Full-Width SVG with explicit forward data wire and return ACK wire!
    // =========================================================================
    renderTcpUdpLab: function(containerEl) {
      if (!containerEl) return;
      containerEl.innerHTML = `
        <div class="interactive-lab-wrapper">
          <div class="lab-pill-controls">
            <span class="pill-group-label">Protocol Reliability vs Speed Comparison:</span>
            <div class="pill-buttons-row" id="proto-toggle-pills">
              <button class="lab-pill-btn active" data-proto="tcp">TCP (Reliable Byte Stream)</button>
              <button class="lab-pill-btn" data-proto="udp">UDP (Low Latency Datagram)</button>
              <button class="lab-pill-btn" id="btn-fire-packets" style="border-color:#38bdf8; color:#38bdf8;">Transmit 5 Packets</button>
            </div>
          </div>

          <div class="lab-diagram-card" style="padding:16px 20px 20px 20px; background:#0b0c10; border-radius:12px; border:1px solid #1e222a;">
            <svg id="tcp-udp-svg" viewBox="0 0 920 280" style="width:100%; height:auto; display:block; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <defs>
                <marker id="wire-arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
                </marker>
                <marker id="wire-arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
                </marker>
              </defs>

              <!-- FORWARD DATA WIRE (Top, Left -> Right) -->
              <line x1="180" y1="90" x2="720" y2="90" stroke="#38bdf8" stroke-width="3.5" marker-end="url(#wire-arrow-blue)" />
              <text x="450" y="75" fill="#38bdf8" font-size="10.5" font-family="monospace" text-anchor="middle">Forward Data Wire: [Pkt 1] [Pkt 2] [Pkt 3] [Pkt 4] [Pkt 5]</text>

              <!-- RETURN ACK WIRE (Bottom, Right -> Left) -->
              <line id="wire-ack-line" x1="720" y1="190" x2="190" y2="190" stroke="#10b981" stroke-width="3.5" marker-end="url(#wire-arrow-green)" />
              <text id="wire-ack-txt" x="450" y="210" fill="#10b981" font-size="10.5" font-family="monospace" text-anchor="middle">Return Acknowledgement Wire: [ACK 1001] [Dup-ACK] [Retransmission Verified]</text>

              <!-- DROP CROSS OVER PACKET 3 -->
              <g id="grp-dropped-pkt">
                <circle cx="450" cy="90" r="14" fill="#1f1114" stroke="#ef4444" stroke-width="2" />
                <line x1="444" y1="84" x2="456" y2="96" stroke="#ef4444" stroke-width="2" />
                <line x1="456" y1="84" x2="444" y2="96" stroke="#ef4444" stroke-width="2" />
                <rect x="380" y="115" width="140" height="22" rx="11" fill="#2d1215" stroke="#ef4444" />
                <text id="lbl-drop-status" x="450" y="130" fill="#ef4444" font-size="10" font-weight="700" text-anchor="middle">Pkt 3 Dropped!</text>
              </g>

              <!-- Sender Node -->
              <g id="node-proto-sender">
                <rect x="30" y="65" width="150" height="150" rx="10" fill="#13151b" stroke="#38bdf8" stroke-width="2" />
                <text x="105" y="105" fill="#ffffff" font-size="13" font-weight="700" text-anchor="middle">Sender Host</text>
                <text x="105" y="125" fill="#38bdf8" font-size="10" font-family="monospace" text-anchor="middle">192.168.1.20</text>
                <text id="lbl-sender-state" x="105" y="165" fill="#10b981" font-size="10" font-weight="600" text-anchor="middle">Sliding Window: 64KB</text>
                <text x="105" y="185" fill="#94a3b8" font-size="9" text-anchor="middle">Retransmit Buffer: Active</text>
              </g>

              <!-- Receiver Node -->
              <g id="node-proto-receiver">
                <rect x="730" y="65" width="160" height="150" rx="10" fill="#13151b" stroke="#10b981" stroke-width="2" />
                <text x="810" y="105" fill="#ffffff" font-size="13" font-weight="700" text-anchor="middle">Receiver Host</text>
                <text x="810" y="125" fill="#10b981" font-size="10" font-family="monospace" text-anchor="middle">192.168.1.30</text>
                <text id="lbl-receiver-state" x="810" y="165" fill="#10b981" font-size="10" font-weight="600" text-anchor="middle">Buffer: 5/5 Intact</text>
                <text x="810" y="185" fill="#94a3b8" font-size="9" text-anchor="middle">Reorders Out-of-Sequence</text>
              </g>
            </svg>
          </div>

          <div class="lab-caption-text" id="proto-explanation-text" style="margin-top:12px; font-size:12.5px; color:#9da3af; line-height:1.6;">
            <strong>TCP Mode:</strong> If Packet 3 is dropped by router congestion, Receiver stops advancing ACK number and issues Dup-ACKs. Sender performs Fast Retransmission. Data is 100% intact, but latency increases.
          </div>
        </div>
      `;

      let currentProto = 'tcp';
      const pills = containerEl.querySelectorAll('#proto-toggle-pills .lab-pill-btn');
      const fireBtn = containerEl.querySelector('#btn-fire-packets');
      const ackLine = containerEl.querySelector('#wire-ack-line');
      const ackTxt = containerEl.querySelector('#wire-ack-txt');
      const dropStatus = containerEl.querySelector('#lbl-drop-status');
      const senderState = containerEl.querySelector('#lbl-sender-state');
      const rxState = containerEl.querySelector('#lbl-receiver-state');
      const exp = containerEl.querySelector('#proto-explanation-text');

      pills.forEach(btn => {
        if (btn.id === 'btn-fire-packets') return;
        btn.addEventListener('click', () => {
          pills.forEach(b => { if (b.id !== 'btn-fire-packets') b.classList.remove('active'); });
          btn.classList.add('active');
          currentProto = btn.getAttribute('data-proto');

          if (currentProto === 'tcp') {
            ackLine.style.display = 'inline';
            ackTxt.style.display = 'inline';
            dropStatus.textContent = 'Pkt 3 [Retransmitted] ✓'; dropStatus.style.fill = '#10b981';
            senderState.textContent = 'Sliding Window: 64KB';
            rxState.textContent = 'Buffer: 5/5 Intact'; rxState.style.fill = '#10b981';
            exp.innerHTML = `<strong>TCP Guarantee:</strong> Stateful, sequenced byte stream with sliding window flow control. Perfect for file downloads, databases, and banking where 0% packet loss is mandatory.`;
          } else {
            ackLine.style.display = 'none';
            ackTxt.style.display = 'none';
            dropStatus.textContent = 'Pkt 3 Dropped! (Ignored)'; dropStatus.style.fill = '#ef4444';
            senderState.textContent = 'Zero Handshake (Stateless)';
            rxState.textContent = 'Buffer: 4/5 (Pkt 3 Lost)'; rxState.style.fill = '#ef4444';
            exp.innerHTML = `<strong>UDP Lightweight Speed:</strong> No handshake, no ACKs, 8-byte header vs 20-byte TCP. When Packet 3 is lost, it is permanently ignored. Perfect for live Zoom calls and multiplayer gaming!`;
          }
        });
      });

      fireBtn.addEventListener('click', () => {
        if (currentProto === 'tcp') {
          exp.innerHTML = `<span style="color:#10b981;"><strong>TCP Transmission Complete:</strong></span> Packet 3 dropped on wire ➔ Receiver fired 3 Duplicate ACKs ➔ Sender triggered Fast Retransmission ➔ 100% data delivered intact! (Latency: 48ms).`;
        } else {
          exp.innerHTML = `<span style="color:#ef4444;"><strong>UDP Datagram Blast:</strong></span> Packets 1, 2, 4, 5 delivered instantly. Packet 3 was dropped with zero retransmission. Stream never paused! (Latency: 4ms).`;
        }
      });
    },

    // =========================================================================
    // CH 15: TLS 1.3 CRYPTOGRAPHIC HANDSHAKE
    // Full-Width SVG with direct stage dropdown, Diffie-Hellman Key Shares & Encrypted Tunnel!
    // =========================================================================
    renderTlsHandshake: function(containerEl) {
      if (!containerEl) return;
      containerEl.innerHTML = `
        <div class="interactive-lab-wrapper">
          <div class="lab-pill-controls">
            <div class="pill-control-group" style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
              <span class="pill-group-label" style="margin-bottom:0;">TLS 1.3 Stage Selector:</span>
              <select id="tls-stage-dropdown" class="calc-input-field" style="background:#0b0c10; border:1px solid #272c34; color:#fff; border-radius:6px; padding:6px 12px; font-size:12.5px; font-weight:600;">
                <option value="all" selected>Full Overview: Complete TLS 1.3 Handshake & Encrypted Pipe</option>
                <option value="flight1">Flight 1: Client Hello + Key Share (g^a Diffie-Hellman)</option>
                <option value="flight2">Flight 2: Server Hello + Key Share (g^b) + X.509 Certificate</option>
                <option value="encrypted">Tunnel Established: AES-256-GCM Session (Perfect Forward Secrecy)</option>
                <option value="sslstrip">Cyber Attack: SSLstrip MITM Downgrade to Unencrypted Port 80</option>
              </select>
            </div>

            <div class="pill-control-group" style="margin-top:8px;">
              <span class="pill-group-label">Quick Jump Stage Pills:</span>
              <div class="pill-buttons-row" id="tls-stage-pills">
                <button class="lab-pill-btn active" data-stage="all">Full Overview</button>
                <button class="lab-pill-btn" data-stage="flight1">Flight 1 (Client Hello)</button>
                <button class="lab-pill-btn" data-stage="flight2">Flight 2 (Server Hello)</button>
                <button class="lab-pill-btn" data-stage="encrypted">🔒 Encrypted Tunnel</button>
                <button class="lab-pill-btn" data-stage="sslstrip" style="border-color:#ef4444; color:#f87171;">⚠️ SSLstrip Attack</button>
              </div>
            </div>

            <div class="pill-control-group" style="margin-top:8px;">
              <span class="pill-group-label">Step Controls:</span>
              <div class="pill-buttons-row">
                <button class="lab-pill-btn" id="btn-tls-step">Step TLS 1.3 Handshake (1-RTT) →</button>
                <button class="lab-pill-btn" id="btn-tls-reset">↺ Reset States</button>
              </div>
            </div>
          </div>

          <div class="lab-diagram-card" style="padding:16px 20px 20px 20px; background:#0b0c10; border-radius:12px; border:1px solid #1e222a;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
              <div style="font-size:15px; font-weight:700; color:#fff;">
                TLS 1.3 Ephemeral Diffie-Hellman Handshake & Perfect Forward Secrecy (1-RTT)
              </div>
              <div id="tls-metric-badge" style="background:#06281e; border:1px solid #10b981; border-radius:6px; padding:4px 10px; font-family:var(--font-mono); font-size:11.5px; color:#10b981; font-weight:700;">
                CIPHER: TLS_AES_256_GCM_SHA384 • PFS: ACTIVE
              </div>
            </div>

            <svg id="tls-svg" viewBox="0 0 920 280" style="width:100%; height:auto; display:block; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <defs>
                <marker id="tls-arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
                </marker>
                <marker id="tls-arrow-cyan" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#00f0ff" />
                </marker>
                <marker id="tls-arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
                </marker>
              </defs>

              <!-- Client Lifeline -->
              <line x1="200" y1="80" x2="200" y2="260" stroke="#334155" stroke-width="2" stroke-dasharray="4,4" />
              <!-- Server Lifeline -->
              <line x1="720" y1="80" x2="720" y2="260" stroke="#334155" stroke-width="2" stroke-dasharray="4,4" />

              <!-- Step 1: Client Hello + g^a -->
              <g id="grp-tls-flight1">
                <line x1="200" y1="110" x2="710" y2="135" stroke="#38bdf8" stroke-width="3" marker-end="url(#tls-arrow-blue)" />
                <rect x="320" y="105" width="280" height="24" rx="12" fill="#0d1b2a" stroke="#38bdf8" />
                <text x="460" y="121" fill="#38bdf8" font-size="10.5" font-weight="700" text-anchor="middle">1. Client Hello + Key Share (g^a)</text>
              </g>

              <!-- Step 2: Server Hello + g^b + Cert -->
              <g id="grp-tls-flight2">
                <line x1="720" y1="150" x2="210" y2="175" stroke="#00f0ff" stroke-width="3" marker-end="url(#tls-arrow-cyan)" />
                <rect x="300" y="150" width="320" height="24" rx="12" fill="#0c1e28" stroke="#00f0ff" />
                <text x="460" y="166" fill="#00f0ff" font-size="10.5" font-weight="700" text-anchor="middle">2. Server Hello + Key Share (g^b) + X.509 Cert</text>
              </g>

              <!-- Step 3: Encrypted Session Pipe -->
              <g id="grp-tls-encrypted">
                <rect x="220" y="200" width="480" height="34" rx="6" fill="#06281e" stroke="#10b981" stroke-width="2" />
                <text x="460" y="222" fill="#10b981" font-size="12" font-weight="700" text-anchor="middle">🔒 AES-256-GCM Encrypted Application Tunnel (PFS Active)</text>
              </g>

              <!-- SSLstrip Warning Banner -->
              <g id="grp-sslstrip-banner" style="display:none;">
                <rect x="220" y="200" width="480" height="34" rx="6" fill="#2d1215" stroke="#ef4444" stroke-width="2" />
                <text x="460" y="222" fill="#ef4444" font-size="12" font-weight="700" text-anchor="middle">⚠️ SSLSTRIP: DOWNGRADED TO UNENCRYPTED HTTP PORT 80 (CLEARTEXT!)</text>
              </g>

              <!-- Client Node -->
              <g id="node-tls-client" style="cursor:pointer;">
                <rect x="110" y="15" width="180" height="65" rx="8" fill="#13151b" stroke="#38bdf8" stroke-width="2" />
                <text x="200" y="40" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Client Browser</text>
                <text id="txt-client-secret" x="200" y="60" fill="#38bdf8" font-size="10" font-family="monospace" text-anchor="middle">Private a, Public g^a</text>
              </g>

              <!-- Server Node -->
              <g id="node-tls-server" style="cursor:pointer;">
                <rect x="630" y="15" width="180" height="65" rx="8" fill="#13151b" stroke="#10b981" stroke-width="2" />
                <text x="720" y="40" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Bank Web Server</text>
                <text id="txt-server-secret" x="720" y="60" fill="#10b981" font-size="10" font-family="monospace" text-anchor="middle">Private b, Public g^b</text>
              </g>
            </svg>
          </div>

          <div class="lab-caption-text" id="tls-explanation" style="margin-top:12px; font-size:12.5px; color:#9da3af; line-height:1.6;">
            <strong>TLS 1.3 ECDHE:</strong> Both client and server exchange temporary public keys (g^a and g^b). Both compute the identical master symmetric encryption key (g^ab) without ever transmitting the secret key over the wire!
          </div>
        </div>
      `;

      let currentStage = 'all'; // 'all' | 'flight1' | 'flight2' | 'encrypted' | 'sslstrip'
      const stageList = ['flight1', 'flight2', 'encrypted'];

      const dropdown = containerEl.querySelector('#tls-stage-dropdown');
      const stageBtns = containerEl.querySelectorAll('#tls-stage-pills .lab-pill-btn');
      const btnStep = containerEl.querySelector('#btn-tls-step');
      const btnReset = containerEl.querySelector('#btn-tls-reset');

      const flight1 = containerEl.querySelector('#grp-tls-flight1');
      const flight2 = containerEl.querySelector('#grp-tls-flight2');
      const pipe = containerEl.querySelector('#grp-tls-encrypted');
      const sslstripBanner = containerEl.querySelector('#grp-sslstrip-banner');
      const metricBadge = containerEl.querySelector('#tls-metric-badge');
      const exp = containerEl.querySelector('#tls-explanation');

      function updateTlsLab() {
        if (dropdown) dropdown.value = currentStage;
        stageBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-stage') === currentStage));

        if (sslstripBanner) sslstripBanner.style.display = 'none';

        if (currentStage === 'all') {
          if (flight1) flight1.style.display = 'block';
          if (flight2) flight2.style.display = 'block';
          if (pipe) pipe.style.display = 'block';
          if (metricBadge) {
            metricBadge.textContent = 'CIPHER: TLS_AES_256_GCM_SHA384 • PFS: ACTIVE';
            metricBadge.style.borderColor = '#10b981'; metricBadge.style.color = '#10b981';
          }
          exp.innerHTML = `<strong>TLS 1.3 Complete Session (1-RTT):</strong> The browser and server negotiate elliptic curve parameters in a single round-trip. Session data is encrypted with AES-256-GCM. Because ephemeral Diffie-Hellman keys are discarded after the session, <strong>Perfect Forward Secrecy (PFS)</strong> guarantees that past recorded traffic can NEVER be decrypted even if the server's private RSA key is compromised in the future!`;
        } else if (currentStage === 'flight1') {
          if (flight1) flight1.style.display = 'block';
          if (flight2) flight2.style.display = 'none';
          if (pipe) pipe.style.display = 'none';
          if (metricBadge) {
            metricBadge.textContent = 'STAGE: CLIENT HELLO • KEY SHARE: g^a (x25519)';
            metricBadge.style.borderColor = '#38bdf8'; metricBadge.style.color = '#38bdf8';
          }
          exp.innerHTML = `<strong>Flight 1 (Client Hello):</strong> Browser generates a private random exponent <code class="mono">a</code>, computes public key share <code class="mono">g^a</code>, and sends it immediately with supported TLS 1.3 cipher suites. Zero wasted round-trips!`;
        } else if (currentStage === 'flight2') {
          if (flight1) flight1.style.display = 'block';
          if (flight2) flight2.style.display = 'block';
          if (pipe) pipe.style.display = 'none';
          if (metricBadge) {
            metricBadge.textContent = 'STAGE: SERVER HELLO • KEY SHARE: g^b + X.509';
            metricBadge.style.borderColor = '#00f0ff'; metricBadge.style.color = '#00f0ff';
          }
          exp.innerHTML = `<strong>Flight 2 (Server Hello + Finished):</strong> Bank server generates private <code class="mono">b</code>, computes public <code class="mono">g^b</code>, presents its CA-signed X.509 certificate, and finishes. Both parties independently compute symmetric session key <code class="mono">K = (g^a)^b = (g^b)^a = g^(ab)</code>!`;
        } else if (currentStage === 'encrypted') {
          if (flight1) flight1.style.display = 'block';
          if (flight2) flight2.style.display = 'block';
          if (pipe) pipe.style.display = 'block';
          if (metricBadge) {
            metricBadge.textContent = 'STATUS: TUNNEL ACTIVE • AES-256-GCM ENCRYPTED';
            metricBadge.style.borderColor = '#10b981'; metricBadge.style.color = '#10b981';
          }
          exp.innerHTML = `<strong>Encrypted Application Tunnel:</strong> All HTTP requests, passwords, and session cookies are now encrypted using AES-GCM authenticated encryption. Any packet capture tool (Wireshark) on the local switch sees only random ciphertext!`;
        } else if (currentStage === 'sslstrip') {
          if (flight1) flight1.style.display = 'none';
          if (flight2) flight2.style.display = 'none';
          if (pipe) pipe.style.display = 'none';
          if (sslstripBanner) sslstripBanner.style.display = 'block';
          if (metricBadge) {
            metricBadge.textContent = 'ATTACK: SSLSTRIP DOWNGRADE • PORT 80 CLEARTEXT 💀';
            metricBadge.style.borderColor = '#ef4444'; metricBadge.style.color = '#ef4444';
          }
          exp.innerHTML = `<span style="color:#ef4444;"><strong>SSLSTRIP MITM EXPLOIT:</strong></span> An attacker running ARP poisoning intercepted the client's initial cleartext HTTP request and blocked the 301 HTTPS redirect! The victim communicates with the bank via unencrypted HTTP Port 80, allowing the attacker to passively steal credit cards and session tokens in raw plaintext. <strong>Defense:</strong> HSTS (HTTP Strict Transport Security) Preload in browser firmware!`;
        }
      }

      if (dropdown) {
        dropdown.addEventListener('change', (e) => {
          currentStage = e.target.value;
          updateTlsLab();
        });
      }

      stageBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          currentStage = btn.getAttribute('data-stage');
          updateTlsLab();
        });
      });

      if (btnStep) {
        btnStep.addEventListener('click', () => {
          if (currentStage === 'all' || currentStage === 'encrypted' || currentStage === 'sslstrip') {
            currentStage = 'flight1';
          } else {
            const idx = stageList.indexOf(currentStage);
            if (idx >= 0 && idx < stageList.length - 1) {
              currentStage = stageList[idx + 1];
            } else {
              currentStage = 'all';
            }
          }
          updateTlsLab();
        });
      }

      if (btnReset) {
        btnReset.addEventListener('click', () => {
          currentStage = 'flight1';
          updateTlsLab();
        });
      }

      updateTlsLab();
    },

    // =========================================================================
    // CH 17 & 18: HTTP RAW BUILDER & COOKIE SECURITY LAB
    // =========================================================================
    renderHttpCookieLab: function(containerEl) {
      if (!containerEl) return;
      containerEl.innerHTML = `
        <div class="interactive-lab-wrapper">
          <div class="lab-pill-controls">
            <span class="pill-group-label">HTTP Response Security Headers & Cookie Flags Lab:</span>
            <div class="pill-buttons-row">
              <button class="lab-pill-btn active" id="btn-toggle-httponly">Toggle HttpOnly Flag</button>
              <button class="lab-pill-btn active" id="btn-toggle-secure">Toggle Secure Flag</button>
              <button class="lab-pill-btn" id="btn-test-xss" style="border-color:#ef4444; color:#f87171;">Simulate XSS Attack (Steal Cookie)</button>
            </div>
          </div>

          <div class="lab-diagram-card" style="padding:16px 20px 20px 20px; background:#0b0c10; border-radius:12px; border:1px solid #1e222a;">
            <div style="background:#090a0f; border:1px solid #1e222a; border-radius:6px; padding:16px; font-family:var(--font-mono); font-size:12px; line-height:1.6;" id="http-raw-box">
              <span style="color:#60a5fa;">HTTP/1.1 200 OK</span><br>
              Content-Type: text/html; charset=UTF-8<br>
              <span id="cookie-header-line" style="color:#fcd34d;">Set-Cookie: session_id=xyz987654; Path=/; HttpOnly; Secure; SameSite=Strict</span><br>
              Strict-Transport-Security: max-age=31536000; includeSubDomains<br>
              X-Frame-Options: DENY<br>
              Content-Security-Policy: default-src 'self'
            </div>
          </div>

          <div class="lab-caption-text" id="cookie-explanation" style="margin-top:12px; font-size:12.5px; color:#9da3af; line-height:1.6;">
            <strong>HttpOnly Flag:</strong> When enabled, client-side JavaScript (<code class="mono">document.cookie</code>) is strictly forbidden from reading this session cookie. Even if a website has an XSS bug, the attacker cannot steal your session!
          </div>
        </div>
      `;

      let httpOnly = true;
      let secure = true;
      const hBtn = containerEl.querySelector('#btn-toggle-httponly');
      const sBtn = containerEl.querySelector('#btn-toggle-secure');
      const xssBtn = containerEl.querySelector('#btn-test-xss');
      const cookieLine = containerEl.querySelector('#cookie-header-line');
      const exp = containerEl.querySelector('#cookie-explanation');

      const updateCookie = () => {
        let flags = 'Path=/';
        if (httpOnly) flags += '; HttpOnly';
        if (secure) flags += '; Secure';
        flags += '; SameSite=Strict';
        cookieLine.textContent = `Set-Cookie: session_id=xyz987654; ${flags}`;
      };

      hBtn.addEventListener('click', () => {
        httpOnly = !httpOnly;
        hBtn.classList.toggle('active', httpOnly);
        updateCookie();
      });

      sBtn.addEventListener('click', () => {
        secure = !secure;
        sBtn.classList.toggle('active', secure);
        updateCookie();
      });

      xssBtn.addEventListener('click', () => {
        if (httpOnly) {
          exp.innerHTML = `<span style="color:#10b981;"><strong>XSS ATTEMPT BLOCKED:</strong></span> Attacker executed <code class="mono">alert(document.cookie)</code>, but browser refused to disclose the HttpOnly session token! Account protected.`;
        } else {
          exp.innerHTML = `<span style="color:#ef4444;"><strong>SESSION HIJACKED!</strong></span> Without HttpOnly, attacker's XSS payload successfully extracted <code class="mono">session_id=xyz987654</code> and uploaded it to attacker server!`;
        }
      });
    },

    // =========================================================================
    // CH 19: EMAIL SECURITY, SPF, DKIM & DMARC DEFENSE LAB
    // Full-Width SVG with explicit Mail flow lines and DNS validation checks!
    // =========================================================================
    renderEmailSecurityLab: function(containerEl) {
      if (!containerEl) return;
      containerEl.innerHTML = `
        <div class="interactive-lab-wrapper">
          <div class="lab-pill-controls">
            <span class="pill-group-label">Test Email Spoofing & Domain Protection Policies:</span>
            <div class="pill-buttons-row" id="email-test-pills">
              <button class="lab-pill-btn active" data-type="legit">1. Legitimate CEO Email</button>
              <button class="lab-pill-btn" data-type="spoofed">2. Attacker Spoofed Email</button>
            </div>
            <div class="pill-buttons-row" style="margin-top:6px;" id="dmarc-policy-pills">
              <span style="font-size:11px; color:#94a3b8; align-self:center;">DMARC Policy:</span>
              <button class="lab-pill-btn" data-policy="none">p=none (Monitor)</button>
              <button class="lab-pill-btn active" data-policy="reject">p=reject (Block)</button>
            </div>
          </div>

          <div class="lab-diagram-card" style="padding:16px 20px 20px 20px; background:#0b0c10; border-radius:12px; border:1px solid #1e222a;">
            <svg id="email-svg" viewBox="0 0 920 280" style="width:100%; height:auto; display:block; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <defs>
                <marker id="email-arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
                </marker>
                <marker id="email-arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#ef4444" />
                </marker>
              </defs>

              <!-- Lines -->
              <!-- Sender -> MX Gateway -->
              <line id="line-mail-inbound" x1="190" y1="140" x2="380" y2="140" stroke="#10b981" stroke-width="3.5" marker-end="url(#email-arrow-green)" />
              <text id="lbl-mail-wire" x="285" y="130" fill="#10b981" font-size="10" font-family="monospace" text-anchor="middle">SMTP: From ceo@company.com</text>

              <!-- MX Gateway -> User Inbox -->
              <line id="line-mail-outbound" x1="560" y1="140" x2="720" y2="140" stroke="#10b981" stroke-width="3.5" marker-end="url(#email-arrow-green)" />
              <text id="lbl-mail-status" x="640" y="130" fill="#10b981" font-size="10" font-family="monospace" text-anchor="middle">Delivered ✓</text>

              <!-- Sender Node -->
              <g id="node-mail-sender">
                <rect id="rect-mail-sender" x="30" y="85" width="160" height="110" rx="10" fill="#13151b" stroke="#10b981" stroke-width="2" />
                <text id="txt-mail-sender-title" x="110" y="118" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Authorized Mail Server</text>
                <text id="txt-mail-sender-ip" x="110" y="138" fill="#10b981" font-size="10" font-family="monospace" text-anchor="middle">IP: 198.51.100.25</text>
                <text x="110" y="160" fill="#cbd5e1" font-size="9" text-anchor="middle">DKIM Signed with RSA</text>
              </g>

              <!-- Recipient MX Gateway & Security Verifier -->
              <g id="node-mail-mx">
                <rect id="rect-mail-mx" x="380" y="65" width="180" height="150" rx="10" fill="#171922" stroke="#38bdf8" stroke-width="2" />
                <text x="470" y="95" fill="#ffffff" font-size="13" font-weight="700" text-anchor="middle">Recipient Gateway (MX)</text>
                <!-- Verification status box -->
                <rect x="390" y="110" width="160" height="90" rx="6" fill="#0b0c10" stroke="#272c34" />
                <text id="txt-spf-status" x="400" y="132" fill="#10b981" font-size="9" font-family="monospace">SPF: PASS (IP Valid)</text>
                <text id="txt-dkim-status" x="400" y="152" fill="#10b981" font-size="9" font-family="monospace">DKIM: VALID (Signature)</text>
                <text id="txt-dmarc-status" x="400" y="172" fill="#10b981" font-size="9" font-family="monospace">DMARC: PASS (Aligned)</text>
                <text id="txt-action-status" x="400" y="190" fill="#38bdf8" font-size="8.5" font-weight="700">Action: DELIVER INBOX</text>
              </g>

              <!-- User Inbox Node -->
              <g id="node-mail-inbox">
                <rect id="rect-mail-inbox" x="720" y="85" width="160" height="110" rx="10" fill="#13151b" stroke="#10b981" stroke-width="2" />
                <text x="800" y="125" fill="#ffffff" font-size="13" font-weight="700" text-anchor="middle">Employee Inbox</text>
                <text id="txt-inbox-result" x="800" y="148" fill="#10b981" font-size="10.5" font-weight="700" text-anchor="middle">Message Received ✓</text>
                <text x="800" y="168" fill="#94a3b8" font-size="9" text-anchor="middle">Protected Domain</text>
              </g>
            </svg>
          </div>

          <div class="lab-caption-text" id="email-explanation-text" style="margin-top:12px; font-size:12.5px; color:#9da3af; line-height:1.6;">
            <strong>Legitimate Email:</strong> Sending IP matches company.com SPF TXT record, cryptographic DKIM signature matches the public key in DNS, and DMARC policy allows delivery.
          </div>
        </div>
      `;

      let isSpoofed = false;
      let dmarcPolicy = 'reject';

      const typePills = containerEl.querySelectorAll('#email-test-pills .lab-pill-btn');
      const policyPills = containerEl.querySelectorAll('#dmarc-policy-pills .lab-pill-btn');
      const lineIn = containerEl.querySelector('#line-mail-inbound');
      const lineOut = containerEl.querySelector('#line-mail-outbound');
      const lblWire = containerEl.querySelector('#lbl-mail-wire');
      const lblStatus = containerEl.querySelector('#lbl-mail-status');
      const rectSender = containerEl.querySelector('#rect-mail-sender');
      const titleSender = containerEl.querySelector('#txt-mail-sender-title');
      const ipSender = containerEl.querySelector('#txt-mail-sender-ip');
      const spfTxt = containerEl.querySelector('#txt-spf-status');
      const dkimTxt = containerEl.querySelector('#txt-dkim-status');
      const dmarcTxt = containerEl.querySelector('#txt-dmarc-status');
      const actTxt = containerEl.querySelector('#txt-action-status');
      const rectInbox = containerEl.querySelector('#rect-mail-inbox');
      const inboxResult = containerEl.querySelector('#txt-inbox-result');
      const exp = containerEl.querySelector('#email-explanation-text');

      function updateEmailState() {
        if (!isSpoofed) {
          lineIn.setAttribute('stroke', '#10b981');
          lineOut.setAttribute('stroke', '#10b981');
          lblWire.textContent = 'SMTP: From ceo@company.com (Legit)'; lblWire.setAttribute('fill', '#10b981');
          lblStatus.textContent = 'Delivered ✓'; lblStatus.setAttribute('fill', '#10b981');
          rectSender.setAttribute('stroke', '#10b981');
          titleSender.textContent = 'Authorized Mail Server';
          ipSender.textContent = 'IP: 198.51.100.25 (Legit)'; ipSender.setAttribute('fill', '#10b981');
          spfTxt.textContent = 'SPF: PASS (IP Valid)'; spfTxt.setAttribute('fill', '#10b981');
          dkimTxt.textContent = 'DKIM: VALID (Signature)'; dkimTxt.setAttribute('fill', '#10b981');
          dmarcTxt.textContent = 'DMARC: PASS (Aligned)'; dmarcTxt.setAttribute('fill', '#10b981');
          actTxt.textContent = 'Action: DELIVER INBOX'; actTxt.setAttribute('fill', '#10b981');
          rectInbox.setAttribute('stroke', '#10b981');
          inboxResult.textContent = 'Message Received ✓'; inboxResult.setAttribute('fill', '#10b981');
          exp.innerHTML = `<strong>Legitimate Transmission:</strong> Both SPF and DKIM pass alignment. Email lands safely in employee inbox.`;
        } else {
          lineIn.setAttribute('stroke', '#ef4444');
          lblWire.textContent = 'SPOOFED SMTP: Attacker IP 185.220.101.5'; lblWire.setAttribute('fill', '#ef4444');
          rectSender.setAttribute('stroke', '#ef4444');
          titleSender.textContent = 'Attacker Server (Fake)';
          ipSender.textContent = 'IP: 185.220.101.5 (Rogue)'; ipSender.setAttribute('fill', '#ef4444');
          spfTxt.textContent = 'SPF: FAIL (Not in SPF)'; spfTxt.setAttribute('fill', '#ef4444');
          dkimTxt.textContent = 'DKIM: FAIL (Invalid RSA)'; dkimTxt.setAttribute('fill', '#ef4444');

          if (dmarcPolicy === 'reject') {
            lineOut.setAttribute('stroke', '#334155');
            lblStatus.textContent = '550 5.7.1 REJECTED ⊗'; lblStatus.setAttribute('fill', '#ef4444');
            dmarcTxt.textContent = 'DMARC: FAIL (p=reject)'; dmarcTxt.setAttribute('fill', '#ef4444');
            actTxt.textContent = 'Action: DROP AT GATEWAY'; actTxt.setAttribute('fill', '#ef4444');
            rectInbox.setAttribute('stroke', '#ef4444');
            inboxResult.textContent = 'BLOCKED BY DMARC ⊗'; inboxResult.setAttribute('fill', '#ef4444');
            exp.innerHTML = `<strong>DMARC Defense Activated:</strong> Because company.com published <code class="mono">p=reject</code>, the mail gateway drops the spoofed CEO phishing mail immediately. The victim never even sees it!`;
          } else {
            lineOut.setAttribute('stroke', '#eab308');
            lblStatus.textContent = 'Phishing Delivered! ⚠'; lblStatus.setAttribute('fill', '#eab308');
            dmarcTxt.textContent = 'DMARC: FAIL (p=none)'; dmarcTxt.setAttribute('fill', '#eab308');
            actTxt.textContent = 'Action: DELIVERED (VULN)'; actTxt.setAttribute('fill', '#eab308');
            rectInbox.setAttribute('stroke', '#eab308');
            inboxResult.textContent = 'PHISHING DELIVERED! 💀'; inboxResult.setAttribute('fill', '#eab308');
            exp.innerHTML = `<strong>Security Flaw (p=none):</strong> Without a strict DMARC rejection policy, the spoofed email is delivered anyway, leading to credential theft or wire fraud!`;
          }
        }
      }

      typePills.forEach(btn => {
        btn.addEventListener('click', () => {
          typePills.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          isSpoofed = btn.getAttribute('data-type') === 'spoofed';
          updateEmailState();
        });
      });

      policyPills.forEach(btn => {
        btn.addEventListener('click', () => {
          policyPills.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          dmarcPolicy = btn.getAttribute('data-policy');
          updateEmailState();
        });
      });
    },

    // =========================================================================
    // CH 20: SECURE REMOTE ACCESS (SSH VS TELNET PLAINTEXT SNIFFING)
    // Full-Width SVG with explicit wire tap and cleartext sniffing capture!
    // =========================================================================
    renderRemoteAccessLab: function(containerEl) {
      if (!containerEl) return;
      containerEl.innerHTML = `
        <div class="interactive-lab-wrapper">
          <div class="lab-pill-controls">
            <span class="pill-group-label">Remote Protocol Keystroke Wire Inspector:</span>
            <div class="pill-buttons-row" id="remote-proto-pills">
              <button class="lab-pill-btn active" data-proto="ssh">SSH (Port 22 - Encrypted)</button>
              <button class="lab-pill-btn" data-proto="telnet">Telnet (Port 23 - Plaintext Hazard)</button>
            </div>
          </div>

          <div class="lab-diagram-card" style="padding:16px 20px 20px 20px; background:#0b0c10; border-radius:12px; border:1px solid #1e222a;">
            <svg id="remote-svg" viewBox="0 0 920 280" style="width:100%; height:auto; display:block; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <defs>
                <marker id="rem-arrow-cyan" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#00f0ff" />
                </marker>
                <marker id="rem-arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#ef4444" />
                </marker>
              </defs>

              <!-- Cable Line -->
              <line id="line-remote-wire" x1="180" y1="130" x2="720" y2="130" stroke="#00f0ff" stroke-width="3.5" marker-end="url(#rem-arrow-cyan)" />

              <!-- Wire Tap Box / Wireshark Sniffer -->
              <g id="grp-wire-tap">
                <rect id="rect-wire-tap" x="340" y="80" width="240" height="95" rx="8" fill="#0b0c10" stroke="#00f0ff" stroke-width="2" />
                <text x="460" y="105" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Wire Tap (Wireshark Sniffer)</text>
                <rect x="350" y="115" width="220" height="48" rx="4" fill="#050b14" />
                <text id="txt-wire-payload" x="460" y="144" fill="#00f0ff" font-size="11" font-family="monospace" font-weight="700" text-anchor="middle">0x8F3A2B1C9D4E... (Encrypted)</text>
              </g>

              <!-- Admin Client -->
              <g id="node-rem-client">
                <rect x="30" y="85" width="150" height="90" rx="10" fill="#13151b" stroke="#38bdf8" stroke-width="2" />
                <text x="105" y="118" fill="#ffffff" font-size="13" font-weight="700" text-anchor="middle">Admin Laptop</text>
                <text x="105" y="138" fill="#38bdf8" font-size="10" font-family="monospace" text-anchor="middle">192.168.1.10</text>
                <text x="105" y="156" fill="#94a3b8" font-size="9" text-anchor="middle">Types root:P@ss123</text>
              </g>

              <!-- Remote Linux Server -->
              <g id="node-rem-server">
                <rect x="720" y="85" width="160" height="90" rx="10" fill="#13151b" stroke="#10b981" stroke-width="2" />
                <text x="800" y="118" fill="#ffffff" font-size="13" font-weight="700" text-anchor="middle">Linux Server</text>
                <text x="800" y="138" fill="#10b981" font-size="10" font-family="monospace" text-anchor="middle">192.168.1.50</text>
                <text id="txt-rem-port" x="800" y="156" fill="#00f0ff" font-size="9.5" font-family="monospace" text-anchor="middle">Port 22 (SSH)</text>
              </g>
            </svg>
          </div>

          <div class="lab-caption-text" id="remote-explanation-text" style="margin-top:12px; font-size:12.5px; color:#9da3af; line-height:1.6;">
            <strong>SSH (Port 22):</strong> Secure Shell creates an encrypted asymmetric tunnel. Even with physical access or ARP poisoning on the same switch, an attacker capturing packets with Wireshark only sees undecryptable ciphertext.
          </div>
        </div>
      `;

      const pills = containerEl.querySelectorAll('#remote-proto-pills .lab-pill-btn');
      const wire = containerEl.querySelector('#line-remote-wire');
      const rectTap = containerEl.querySelector('#rect-wire-tap');
      const txtPayload = containerEl.querySelector('#txt-wire-payload');
      const txtPort = containerEl.querySelector('#txt-rem-port');
      const exp = containerEl.querySelector('#remote-explanation-text');

      pills.forEach(btn => {
        btn.addEventListener('click', () => {
          pills.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const proto = btn.getAttribute('data-proto');

          if (proto === 'ssh') {
            wire.setAttribute('stroke', '#00f0ff');
            rectTap.setAttribute('stroke', '#00f0ff');
            txtPayload.textContent = '0x8F3A2B1C9D4E... (Encrypted)'; txtPayload.setAttribute('fill', '#00f0ff');
            txtPort.textContent = 'Port 22 (SSH)'; txtPort.setAttribute('fill', '#00f0ff');
            exp.innerHTML = `<strong>SSH Security:</strong> Credentials and keystrokes are protected by AES-GCM and HMAC verification. Safe against eavesdropping.`;
          } else {
            wire.setAttribute('stroke', '#ef4444');
            rectTap.setAttribute('stroke', '#ef4444');
            txtPayload.textContent = 'CLEARTEXT: "root:P@ss123"'; txtPayload.setAttribute('fill', '#ef4444');
            txtPort.textContent = 'Port 23 (Telnet)'; txtPort.setAttribute('fill', '#ef4444');
            exp.innerHTML = `<span style="color:#ef4444;"><strong>TELNET DISASTER:</strong></span> Telnet transmits every keystroke completely unencrypted over the wire. Anyone running Wireshark or ARP poisoning on the subnet instantly reads root credentials in plain text!`;
          }
        });
      });
    },

    // =========================================================================
    // CH 21 & 22: FIREWALL, IDS & IPS NETWORK DEFENSE LAB
    // Full-Width SVG with explicit perimeter barrier and inline drop visualization!
    // =========================================================================
    renderFirewallDefenseLab: function(containerEl) {
      if (!containerEl) return;
      containerEl.innerHTML = `
        <div class="interactive-lab-wrapper">
          <div class="lab-pill-controls">
            <span class="pill-group-label">Test Perimeter Defense Against Network Attacks:</span>
            <div class="pill-buttons-row" id="defense-traffic-pills">
              <button class="lab-pill-btn active" data-type="legit">1. Normal Web Browsing</button>
              <button class="lab-pill-btn" data-type="scan">2. Nmap SYN Port Scan</button>
              <button class="lab-pill-btn" data-type="exploit">3. Malicious Exploit Payload</button>
            </div>
            <div class="pill-buttons-row" style="margin-top:6px;" id="defense-mode-pills">
              <span style="font-size:11px; color:#94a3b8; align-self:center;">Defense Engine:</span>
              <button class="lab-pill-btn active" data-engine="ips">IPS (Inline Prevention - Auto Drop)</button>
              <button class="lab-pill-btn" data-engine="ids">IDS (Detection Only - Passive Alert)</button>
            </div>
          </div>

          <div class="lab-diagram-card" style="padding:16px 20px 20px 20px; background:#0b0c10; border-radius:12px; border:1px solid #1e222a;">
            <svg id="defense-svg" viewBox="0 0 920 280" style="width:100%; height:auto; display:block; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <defs>
                <marker id="def-arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
                </marker>
                <marker id="def-arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#ef4444" />
                </marker>
              </defs>

              <!-- Inbound Traffic Wire -->
              <line id="line-def-inbound" x1="190" y1="130" x2="380" y2="130" stroke="#10b981" stroke-width="3.5" marker-end="url(#def-arrow-green)" />
              <text id="lbl-def-wire" x="285" y="118" fill="#10b981" font-size="10" font-family="monospace" text-anchor="middle">HTTPS GET /dashboard</text>

              <!-- Outbound to Server Wire -->
              <line id="line-def-outbound" x1="560" y1="130" x2="720" y2="130" stroke="#10b981" stroke-width="3.5" marker-end="url(#def-arrow-green)" />
              <text id="lbl-def-outbound" x="640" y="118" fill="#10b981" font-size="10" font-family="monospace" text-anchor="middle">Forward Clean ✓</text>

              <!-- Drop Cross Indicator on Barrier -->
              <g id="grp-def-barrier-block" style="display:none;">
                <circle cx="380" cy="130" r="14" fill="#1f1114" stroke="#ef4444" stroke-width="2.5" />
                <line x1="374" y1="124" x2="386" y2="136" stroke="#ef4444" stroke-width="2.5" />
                <line x1="386" y1="124" x2="374" y2="136" stroke="#ef4444" stroke-width="2.5" />
                <rect x="310" y="150" width="140" height="22" rx="11" fill="#2d1215" stroke="#ef4444" />
                <text x="380" y="165" fill="#ef4444" font-size="9.5" font-weight="700" text-anchor="middle">INLINE DROP ⊗</text>
              </g>

              <!-- Traffic Source -->
              <g id="node-def-src">
                <rect id="rect-def-src" x="30" y="75" width="160" height="110" rx="10" fill="#13151b" stroke="#10b981" stroke-width="2" />
                <text id="txt-def-src-title" x="110" y="112" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Legitimate Client</text>
                <text id="txt-def-src-ip" x="110" y="132" fill="#10b981" font-size="10" font-family="monospace" text-anchor="middle">198.51.100.12</text>
                <text x="110" y="152" fill="#94a3b8" font-size="9" text-anchor="middle">Standard Browser</text>
              </g>

              <!-- Next-Gen Firewall / IPS Barrier -->
              <g id="node-def-firewall">
                <rect id="rect-def-firewall" x="380" y="60" width="180" height="150" rx="10" fill="#171922" stroke="#ef4444" stroke-width="2.5" />
                <text x="470" y="90" fill="#ffffff" font-size="13" font-weight="700" text-anchor="middle">NGFW + IPS Engine</text>
                <!-- Firewall logs -->
                <rect x="390" y="105" width="160" height="90" rx="6" fill="#0b0c10" stroke="#272c34" />
                <text id="txt-fw-rule" x="400" y="125" fill="#10b981" font-size="9" font-family="monospace">Rule: ALLOW Port 443</text>
                <text id="txt-fw-state" x="400" y="145" fill="#10b981" font-size="9" font-family="monospace">State: ESTABLISHED</text>
                <text id="txt-fw-dpi" x="400" y="165" fill="#10b981" font-size="9" font-family="monospace">DPI: Payload Clean</text>
                <text id="txt-fw-action" x="400" y="185" fill="#38bdf8" font-size="8.5" font-weight="700">Action: PERMIT PACKET</text>
              </g>

              <!-- Protected Corporate Server -->
              <g id="node-def-dst">
                <rect id="rect-def-dst" x="720" y="75" width="160" height="110" rx="10" fill="#13151b" stroke="#10b981" stroke-width="2" />
                <text x="800" y="115" fill="#ffffff" font-size="13" font-weight="700" text-anchor="middle">Corporate Web DB</text>
                <text id="txt-def-dst-status" x="800" y="138" fill="#10b981" font-size="10.5" font-weight="700" text-anchor="middle">Server Healthy ✓</text>
                <text x="800" y="158" fill="#94a3b8" font-size="9" text-anchor="middle">Port 443 Only</text>
              </g>
            </svg>
          </div>

          <div class="lab-caption-text" id="defense-explanation-text" style="margin-top:12px; font-size:12.5px; color:#9da3af; line-height:1.6;">
            <strong>Stateful Firewall Inspection:</strong> The firewall maintains a connection state table. Inbound packets matching an existing outbound TCP connection are allowed, while unsolicited incoming probes are rejected.
          </div>
        </div>
      `;

      let trafficType = 'legit';
      let engine = 'ips';

      const trafficPills = containerEl.querySelectorAll('#defense-traffic-pills .lab-pill-btn');
      const enginePills = containerEl.querySelectorAll('#defense-mode-pills .lab-pill-btn');
      const lineIn = containerEl.querySelector('#line-def-inbound');
      const lineOut = containerEl.querySelector('#line-def-outbound');
      const lblWire = containerEl.querySelector('#lbl-def-wire');
      const lblOut = containerEl.querySelector('#lbl-def-outbound');
      const barrier = containerEl.querySelector('#grp-def-barrier-block');
      const rectSrc = containerEl.querySelector('#rect-def-src');
      const titleSrc = containerEl.querySelector('#txt-def-src-title');
      const ipSrc = containerEl.querySelector('#txt-def-src-ip');
      const fwRule = containerEl.querySelector('#txt-fw-rule');
      const fwState = containerEl.querySelector('#txt-fw-state');
      const fwDpi = containerEl.querySelector('#txt-fw-dpi');
      const fwAction = containerEl.querySelector('#txt-fw-action');
      const rectDst = containerEl.querySelector('#rect-def-dst');
      const statusDst = containerEl.querySelector('#txt-def-dst-status');
      const exp = containerEl.querySelector('#defense-explanation-text');

      function updateDefenseState() {
        if (trafficType === 'legit') {
          barrier.style.display = 'none';
          lineIn.setAttribute('stroke', '#10b981');
          lineOut.setAttribute('stroke', '#10b981');
          lblWire.textContent = 'HTTPS GET /dashboard'; lblWire.setAttribute('fill', '#10b981');
          lblOut.textContent = 'Forward Clean ✓'; lblOut.setAttribute('fill', '#10b981');
          rectSrc.setAttribute('stroke', '#10b981');
          titleSrc.textContent = 'Legitimate Client';
          ipSrc.textContent = '198.51.100.12'; ipSrc.setAttribute('fill', '#10b981');
          fwRule.textContent = 'Rule: ALLOW Port 443'; fwRule.setAttribute('fill', '#10b981');
          fwState.textContent = 'State: ESTABLISHED'; fwState.setAttribute('fill', '#10b981');
          fwDpi.textContent = 'DPI: Payload Clean'; fwDpi.setAttribute('fill', '#10b981');
          fwAction.textContent = 'Action: PERMIT PACKET'; fwAction.setAttribute('fill', '#10b981');
          rectDst.setAttribute('stroke', '#10b981');
          statusDst.textContent = 'Server Healthy ✓'; statusDst.setAttribute('fill', '#10b981');
          exp.innerHTML = `<strong>Legitimate Traffic:</strong> Firewall verifies valid TLS traffic on port 443 and passes it directly to the protected server.`;
        } else if (trafficType === 'scan') {
          rectSrc.setAttribute('stroke', '#ef4444');
          titleSrc.textContent = 'Attacker (Nmap Scan)';
          ipSrc.textContent = '185.220.101.44'; ipSrc.setAttribute('fill', '#ef4444');
          lblWire.textContent = 'SYN Sweep (Ports 1-1000)'; lblWire.setAttribute('fill', '#ef4444');
          lineIn.setAttribute('stroke', '#ef4444');

          if (engine === 'ips') {
            barrier.style.display = 'block';
            lineOut.setAttribute('stroke', '#334155');
            lblOut.textContent = 'Dropped (0 packets)'; lblOut.setAttribute('fill', '#64748b');
            fwRule.textContent = 'Threat: Port Sweep'; fwRule.setAttribute('fill', '#ef4444');
            fwState.textContent = 'State: DROP SYN'; fwState.setAttribute('fill', '#ef4444');
            fwDpi.textContent = 'Rate Limit: Exceeded'; fwDpi.setAttribute('fill', '#ef4444');
            fwAction.textContent = 'Action: INLINE DROP + IP BAN'; fwAction.setAttribute('fill', '#ef4444');
            rectDst.setAttribute('stroke', '#10b981');
            statusDst.textContent = 'Server Protected ✓'; statusDst.setAttribute('fill', '#10b981');
            exp.innerHTML = `<strong>IPS Active Defense:</strong> The IPS detects 200 SYN packets per second to closed ports, resets the TCP sockets, and dynamically adds the attacker's IP to the temporary firewall drop list.`;
          } else {
            barrier.style.display = 'none';
            lineOut.setAttribute('stroke', '#eab308');
            lblOut.textContent = 'Server Scanned! ⚠'; lblOut.setAttribute('fill', '#eab308');
            fwRule.textContent = 'Mode: IDS Passive SPAN'; fwRule.setAttribute('fill', '#eab308');
            fwState.textContent = 'Threat: Port Scan Alert'; fwState.setAttribute('fill', '#eab308');
            fwDpi.textContent = 'Alert Logged to SOC'; fwDpi.setAttribute('fill', '#eab308');
            fwAction.textContent = 'Action: PASS + ALERT'; fwAction.setAttribute('fill', '#eab308');
            rectDst.setAttribute('stroke', '#eab308');
            statusDst.textContent = 'Ports Scanned! ⚠'; statusDst.setAttribute('fill', '#eab308');
            exp.innerHTML = `<strong>IDS Passive Limitation:</strong> An IDS sits on a mirrored SPAN port. It fires an alert to the SOC dashboard, but CANNOT physically stop the packets from hitting the server!`;
          }
        } else if (trafficType === 'exploit') {
          rectSrc.setAttribute('stroke', '#ef4444');
          titleSrc.textContent = 'Attacker (Log4j / SQLi)';
          ipSrc.textContent = '185.220.101.44'; ipSrc.setAttribute('fill', '#ef4444');
          lblWire.textContent = 'Payload: jndi:ldap://...'; lblWire.setAttribute('fill', '#ef4444');
          lineIn.setAttribute('stroke', '#ef4444');

          if (engine === 'ips') {
            barrier.style.display = 'block';
            lineOut.setAttribute('stroke', '#334155');
            lblOut.textContent = 'Blocked at Boundary'; lblOut.setAttribute('fill', '#64748b');
            fwRule.textContent = 'Signature: CVE-2021-44228'; fwRule.setAttribute('fill', '#ef4444');
            fwState.textContent = 'State: RESET SENT'; fwState.setAttribute('fill', '#ef4444');
            fwDpi.textContent = 'Match: Malicious String'; fwDpi.setAttribute('fill', '#ef4444');
            fwAction.textContent = 'Action: TCP RST + DROP'; fwAction.setAttribute('fill', '#ef4444');
            rectDst.setAttribute('stroke', '#10b981');
            statusDst.textContent = 'Server Protected ✓'; statusDst.setAttribute('fill', '#10b981');
            exp.innerHTML = `<strong>Deep Packet Inspection (DPI):</strong> The IPS inspects L7 payloads. Even on standard port 80/443, it matches the malicious Log4j exploit signature and terminates the connection before the server executes it.`;
          } else {
            barrier.style.display = 'none';
            lineOut.setAttribute('stroke', '#ef4444');
            lblOut.textContent = 'EXPLOITED! 💀'; lblOut.setAttribute('fill', '#ef4444');
            fwRule.textContent = 'Signature: CVE-2021-44228'; fwRule.setAttribute('fill', '#ef4444');
            fwState.textContent = 'Mode: IDS Alert Only'; fwState.setAttribute('fill', '#ef4444');
            fwDpi.textContent = 'Critical CVE Detected'; fwDpi.setAttribute('fill', '#ef4444');
            fwAction.textContent = 'Action: LOGGED BUT PASSED'; fwAction.setAttribute('fill', '#ef4444');
            rectDst.setAttribute('stroke', '#ef4444');
            statusDst.textContent = 'EXPLOITED! 💀'; statusDst.setAttribute('fill', '#ef4444');
            exp.innerHTML = `<strong>Passive IDS Failure:</strong> The IDS logs a high-severity alert, but because it is out-of-band, the exploit packet already reached the web server and triggered remote code execution!`;
          }
        }
      }

      trafficPills.forEach(btn => {
        btn.addEventListener('click', () => {
          trafficPills.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          trafficType = btn.getAttribute('data-type');
          updateDefenseState();
        });
      });

      enginePills.forEach(btn => {
        btn.addEventListener('click', () => {
          enginePills.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          engine = btn.getAttribute('data-engine');
          updateDefenseState();
        });
      });
    },

    // =========================================================================
    // CH 04: HOW THE CONNECTION REACHES YOUR HOME (IMAGE 4)
    // =========================================================================
    renderConnectionToHomeLab: function(containerEl) {
      if (!containerEl) return;
      containerEl.innerHTML = `
        <div class="interactive-lab-wrapper">
          <div class="lab-pill-controls">
            <div class="pill-control-group" style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
              <span class="pill-group-label" style="margin-bottom:0;">What kind of connection enters the home?</span>
              <select id="conn-type-dropdown" class="calc-input-field" style="background:#0b0c10; border:1px solid #272c34; color:#fff; border-radius:6px; padding:6px 12px; font-size:12.5px; font-weight:600;">
                <option value="fibre" selected>1. Fibre to the home (FTTH / GPON) - 1,000 Mbps Laser Light</option>
                <option value="dsl">2. Telephone wire: DSL (VDSL2) - 40 Mbps Copper Twisted Pair</option>
                <option value="cable">3. Cable broadband (DOCSIS 3.1) - 500 Mbps Coaxial Shared Bus</option>
                <option value="wireless">4. Outdoor wireless link (5G Fixed Wireless) - 200 Mbps Radio Wave</option>
                <option value="satellite">5. Satellite access (Starlink / LEO) - 150 Mbps Orbital Beam</option>
              </select>
            </div>

            <div class="pill-control-group" style="margin-top:8px;">
              <span class="pill-group-label">Quick Jump Connection Medium:</span>
              <div class="pill-buttons-row" id="conn-type-pills">
                <button class="lab-pill-btn active" data-type="fibre">⚡ Fibre to the home</button>
                <button class="lab-pill-btn" data-type="dsl">📞 Telephone wire: DSL</button>
                <button class="lab-pill-btn" data-type="cable">📺 Cable broadband</button>
                <button class="lab-pill-btn" data-type="wireless">📡 Outdoor wireless link</button>
                <button class="lab-pill-btn" data-type="satellite">🛰️ Satellite access</button>
              </div>
            </div>

            <div class="pill-control-group" style="margin-top:8px;">
              <span class="pill-group-label">Inspect Hardware Stages along the Line:</span>
              <div class="pill-buttons-row" id="conn-stage-pills">
                <button class="lab-pill-btn" data-stage="router">5. Home router</button>
                <button class="lab-pill-btn" data-stage="ont">4. Home connection box</button>
                <button class="lab-pill-btn active" data-stage="splitter">3. Street splitter / Distribution</button>
                <button class="lab-pill-btn" data-stage="olt">2. ISP aggregation equipment</button>
                <button class="lab-pill-btn" data-stage="provider">1. Provider core network</button>
              </div>
            </div>

            <div class="pill-control-group" style="margin-top:8px;">
              <span class="pill-group-label">Physical Last-Mile Link Integrity:</span>
              <div class="pill-buttons-row" id="conn-health-pills">
                <button class="lab-pill-btn active" data-health="working">✓ Outside connection working</button>
                <button class="lab-pill-btn" data-health="broken" style="border-color:#ef4444; color:#f87171;">✂ Outside connection broken (Dig cut / line down)</button>
              </div>
            </div>
          </div>

          <div class="lab-diagram-card" style="padding:18px 20px 22px 20px; background:#0b0c10; border-radius:12px; border:1px solid #1e222a;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:8px;">
              <div style="font-size:15px; font-weight:700; color:#fff;">
                From the Provider's Infrastructure to Your Home Network
              </div>
              <div id="conn-metric-badge" style="background:#0d1b2a; border:1px solid #eab308; border-radius:6px; padding:4px 10px; font-family:var(--font-mono); font-size:11.5px; color:#eab308; font-weight:700;">
                SPEED: 1,000 Mbps • LATENCY: 2ms • MEDIUM: Single-Mode Optical Fiber
              </div>
            </div>

            <svg id="conn-home-svg" viewBox="0 0 920 310" style="width:100%; height:auto; display:block; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <rect x="610" y="25" width="295" height="155" rx="12" fill="none" stroke="#334155" stroke-dasharray="4,4" stroke-width="1.5" />
              <text x="757" y="44" fill="#64748b" font-size="10.5" font-weight="700" text-anchor="middle" letter-spacing="1">AT YOUR HOME</text>

              <!-- Connection Lines -->
              <g id="conn-lines-group">
                <line id="line-prov-olt" x1="150" y1="105" x2="215" y2="105" stroke="#94a3b8" stroke-width="2.5" />
                <line id="line-olt-split" x1="335" y1="105" x2="400" y2="105" stroke="#94a3b8" stroke-width="2.5" />
                <line id="line-split-ont" x1="520" y1="105" x2="630" y2="105" stroke="#94a3b8" stroke-width="2.5" />
                <line id="line-ont-router" x1="745" y1="105" x2="775" y2="105" stroke="#94a3b8" stroke-width="2.5" />
                <path d="M 460 145 L 460 185 M 345 185 L 575 185 M 345 185 L 345 210 M 575 185 L 575 210" stroke="#475569" stroke-width="2" stroke-dasharray="4,4" fill="none" />
              </g>

              <!-- Break Indicator Badge -->
              <g id="conn-break-badge" style="display:none;">
                <circle cx="182" cy="105" r="12" fill="#1f1114" stroke="#ef4444" stroke-width="2" />
                <line x1="178" y1="101" x2="186" y2="109" stroke="#ef4444" stroke-width="2" />
                <line x1="186" y1="101" x2="178" y2="109" stroke="#ef4444" stroke-width="2" />
                <rect x="110" y="60" width="145" height="24" rx="12" fill="#2d1215" stroke="#ef4444" stroke-width="1.5" />
                <text x="182" y="76" fill="#ef4444" font-size="10.5" font-weight="700" text-anchor="middle">Outside connection broken</text>
              </g>

              <!-- Node 1: Provider network -->
              <g id="box-provider" style="cursor:pointer;">
                <rect x="30" y="65" width="120" height="80" rx="8" fill="#13151b" stroke="#272c37" stroke-width="1.5" id="rect-provider" />
                <rect x="75" y="78" width="30" height="18" rx="2" fill="none" stroke="#94a3b8" stroke-width="1.5" />
                <line x1="82" y1="87" x2="98" y2="87" stroke="#94a3b8" stroke-width="1.5" />
                <text x="90" y="112" fill="#ffffff" font-size="11.5" font-weight="700" text-anchor="middle">Provider network</text>
                <text x="90" y="128" fill="#94a3b8" font-size="9.5" text-anchor="middle">Carries data to area</text>
              </g>

              <!-- Node 2: Fibre equipment (OLT) -->
              <g id="box-olt" style="cursor:pointer;">
                <rect x="215" y="65" width="120" height="80" rx="8" fill="#13151b" stroke="#272c37" stroke-width="1.5" id="rect-olt" />
                <rect x="257" y="78" width="36" height="18" rx="2" fill="none" stroke="#94a3b8" stroke-width="1.5" />
                <circle cx="264" cy="87" r="1.5" fill="#94a3b8" />
                <circle cx="271" cy="87" r="1.5" fill="#94a3b8" />
                <circle cx="278" cy="87" r="1.5" fill="#94a3b8" />
                <text x="275" y="112" fill="#ffffff" font-size="11.5" font-weight="700" text-anchor="middle">Fibre equipment</text>
                <text x="275" y="128" fill="#94a3b8" font-size="9.5" text-anchor="middle">OLT: provider end</text>
              </g>

              <!-- Node 3: Fibre splitter (PON) -->
              <g id="box-splitter" style="cursor:pointer;">
                <rect x="400" y="65" width="120" height="80" rx="8" fill="#13151b" stroke="#ef4444" stroke-width="2" id="rect-splitter" />
                <polygon points="450,87 470,78 470,96" fill="none" stroke="#ef4444" stroke-width="1.5" />
                <line x1="442" y1="87" x2="450" y2="87" stroke="#ef4444" stroke-width="1.5" />
                <text x="460" y="112" fill="#ffffff" font-size="11.5" font-weight="700" text-anchor="middle">Fibre splitter</text>
                <text x="460" y="128" fill="#94a3b8" font-size="9.5" text-anchor="middle">PON: branches to homes</text>
              </g>

              <!-- Branch Node A: Another home's ONT -->
              <g>
                <rect x="280" y="210" width="130" height="60" rx="6" fill="#0f1116" stroke="#262b35" stroke-width="1" />
                <text x="345" y="235" fill="#cbd5e1" font-size="11" font-weight="600" text-anchor="middle">Another home's ONT</text>
                <text x="345" y="252" fill="#64748b" font-size="9" text-anchor="middle">Another fibre branch</text>
              </g>

              <!-- Branch Node B: Another home's ONT -->
              <g>
                <rect x="510" y="210" width="130" height="60" rx="6" fill="#0f1116" stroke="#262b35" stroke-width="1" />
                <text x="575" y="235" fill="#cbd5e1" font-size="11" font-weight="600" text-anchor="middle">Another home's ONT</text>
                <text x="575" y="252" fill="#64748b" font-size="9" text-anchor="middle">Equipment for that home</text>
              </g>

              <!-- Node 4: Fibre connection box (ONT) inside Home -->
              <g id="box-ont" style="cursor:pointer;">
                <rect x="630" y="65" width="115" height="80" rx="8" fill="#13151b" stroke="#272c37" stroke-width="1.5" id="rect-ont" />
                <rect x="672" y="78" width="30" height="18" rx="2" fill="none" stroke="#94a3b8" stroke-width="1.5" />
                <polyline points="682,83 688,87 682,91" fill="none" stroke="#94a3b8" stroke-width="1.5" />
                <text x="687" y="112" fill="#ffffff" font-size="11.5" font-weight="700" text-anchor="middle">Fibre conn. box</text>
                <text x="687" y="128" fill="#94a3b8" font-size="9.5" text-anchor="middle">ONT: home end</text>
              </g>

              <!-- Node 5: Home router inside Home -->
              <g id="box-router" style="cursor:pointer;">
                <rect x="775" y="65" width="115" height="80" rx="8" fill="#13151b" stroke="#272c37" stroke-width="1.5" id="rect-router" />
                <rect x="817" y="78" width="30" height="18" rx="2" fill="none" stroke="#94a3b8" stroke-width="1.5" />
                <line x1="823" y1="87" x2="841" y2="87" stroke="#94a3b8" stroke-width="1.5" />
                <text x="832" y="112" fill="#ffffff" font-size="11.5" font-weight="700" text-anchor="middle">Home router</text>
                <text x="832" y="128" fill="#94a3b8" font-size="9" text-anchor="middle">Joins home & outside</text>
              </g>

              <!-- Status Text Bottom Right -->
              <text id="conn-status-text" x="890" y="295" fill="#10b981" font-size="11.5" font-weight="700" text-anchor="end">
                Local and outside networks connected via Optical Fiber (GPON)
              </text>
            </svg>
          </div>

          <div class="lab-caption-text" id="conn-caption-text" style="margin-top:12px; font-size:12.5px; color:#9da3af; line-height:1.6;">
            These are example home connections. One box may combine several jobs. The fibre example uses PON (Passive Optical Network), one way of branching single fiber strands from an ISP OLT to multiple neighborhood homes without needing powered amplifiers along the street!
          </div>
        </div>
      `;

      let currentType = 'fibre';
      let currentStage = 'splitter';
      let currentHealth = 'working';

      const typeDropdown = containerEl.querySelector('#conn-type-dropdown');
      const typeBtns = containerEl.querySelectorAll('#conn-type-pills .lab-pill-btn');
      const stageBtns = containerEl.querySelectorAll('#conn-stage-pills .lab-pill-btn');
      const healthBtns = containerEl.querySelectorAll('#conn-health-pills .lab-pill-btn');
      const breakBadge = containerEl.querySelector('#conn-break-badge');
      const statusText = containerEl.querySelector('#conn-status-text');
      const captionText = containerEl.querySelector('#conn-caption-text');
      const metricBadge = containerEl.querySelector('#conn-metric-badge');

      const lineProvOlt = containerEl.querySelector('#line-prov-olt');
      const lineOltSplit = containerEl.querySelector('#line-olt-split');
      const lineSplitOnt = containerEl.querySelector('#line-split-ont');

      const rects = {
        router: containerEl.querySelector('#rect-router'),
        ont: containerEl.querySelector('#rect-ont'),
        splitter: containerEl.querySelector('#rect-splitter'),
        olt: containerEl.querySelector('#rect-olt'),
        provider: containerEl.querySelector('#rect-provider')
      };

      function updateConnectionLab() {
        if (typeDropdown) typeDropdown.value = currentType;
        typeBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-type') === currentType));
        stageBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-stage') === currentStage));
        healthBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-health') === currentHealth));

        // Highlight selected stage rect
        Object.values(rects).forEach(r => { if (r) { r.setAttribute('stroke', '#272c37'); r.setAttribute('stroke-width', '1.5'); } });
        if (rects[currentStage]) {
          rects[currentStage].setAttribute('stroke', '#ef4444');
          rects[currentStage].setAttribute('stroke-width', '2.5');
        }

        // Color palette based on connection type
        let wireColor = '#eab308';
        if (currentType === 'fibre') wireColor = '#eab308';
        else if (currentType === 'dsl') wireColor = '#f97316';
        else if (currentType === 'cable') wireColor = '#38bdf8';
        else if (currentType === 'wireless') wireColor = '#00f0ff';
        else if (currentType === 'satellite') wireColor = '#c084fc';

        if (currentHealth === 'broken') {
          if (breakBadge) breakBadge.style.display = 'inline';
          if (lineProvOlt) lineProvOlt.setAttribute('stroke', '#ef4444');
          if (lineOltSplit) lineOltSplit.setAttribute('stroke', '#334155');
          if (lineSplitOnt) lineSplitOnt.setAttribute('stroke', '#334155');
          statusText.textContent = 'Outside connection broken (Local devices can still communicate locally) ✕';
          statusText.setAttribute('fill', '#ef4444');
        } else {
          if (breakBadge) breakBadge.style.display = 'none';
          if (lineProvOlt) lineProvOlt.setAttribute('stroke', wireColor);
          if (lineOltSplit) lineOltSplit.setAttribute('stroke', wireColor);
          if (lineSplitOnt) lineSplitOnt.setAttribute('stroke', wireColor);
          statusText.setAttribute('fill', '#10b981');
        }

        if (currentType === 'fibre') {
          if (metricBadge) {
            metricBadge.textContent = 'SPEED: 1,000 Mbps • LATENCY: 2ms • MEDIUM: Single-Mode Optical Fiber';
            metricBadge.style.borderColor = '#eab308';
            metricBadge.style.color = '#eab308';
          }
          if (currentHealth === 'working') {
            statusText.textContent = 'Local and outside networks connected via Optical Fiber (GPON 1 Gbps) ✓';
            captionText.innerHTML = '<strong>Fibre-to-the-Home (FTTH / GPON):</strong> Optical fibers carry infrared laser pulses at the speed of light in glass. A Passive Optical Network (PON) uses an unpowered prism splitter to share one feeder fiber among 32 to 64 neighborhood homes. Extremely low latency and completely immune to electromagnetic interference (EMI)!';
          } else {
            captionText.innerHTML = '<strong style="color:#ef4444;">Fibre Cut Alert:</strong> Street construction severed the incoming fiber optic cable. Because light cannot bridge physical glass breaks, outside internet halts. However, your home Wi-Fi and router remain operational locally for wireless file sharing and printer access!';
          }
        } else if (currentType === 'dsl') {
          if (metricBadge) {
            metricBadge.textContent = 'SPEED: 40 Mbps • LATENCY: 22ms • MEDIUM: Copper Twisted Pair (RJ-11)';
            metricBadge.style.borderColor = '#f97316';
            metricBadge.style.color = '#f97316';
          }
          if (currentHealth === 'working') {
            statusText.textContent = 'Connected via Legacy Copper Telephone Line (VDSL2 40 Mbps) ✓';
            captionText.innerHTML = '<strong>Digital Subscriber Line (DSL):</strong> Reuses old twisted-pair copper telephone wires installed decades ago. High frequencies carry data alongside voice. Speed drops sharply with distance from the street cabinet due to signal attenuation and copper crosstalk.';
          } else {
            captionText.innerHTML = '<strong style="color:#ef4444;">Copper Wire Fault:</strong> Telephone pole wire snapped or corroded by moisture. DSL modem loses synchronization (flashing DSL light). Local home network still works.';
          }
        } else if (currentType === 'cable') {
          if (metricBadge) {
            metricBadge.textContent = 'SPEED: 500 Mbps • LATENCY: 14ms • MEDIUM: Coaxial RG-6 (DOCSIS 3.1)';
            metricBadge.style.borderColor = '#38bdf8';
            metricBadge.style.color = '#38bdf8';
          }
          if (currentHealth === 'working') {
            statusText.textContent = 'Connected via Coaxial Cable Broadband (DOCSIS 3.1 500 Mbps) ✓';
            captionText.innerHTML = '<strong>Cable Broadband (DOCSIS):</strong> Uses the same copper coaxial cables originally run for cable television. Neighborhood taps form a shared RF bus medium. Security note: All neighbors receive all RF signals; DOCSIS relies on Baseline Privacy Plus (BPI+) encryption to protect against neighbor snooping!';
          } else {
            captionText.innerHTML = '<strong style="color:#ef4444;">Coaxial Line Failure:</strong> Main distribution trunk severed or powered amplifier in neighborhood lost electricity. Outside link down.';
          }
        } else if (currentType === 'wireless') {
          if (metricBadge) {
            metricBadge.textContent = 'SPEED: 200 Mbps • LATENCY: 26ms • MEDIUM: Fixed Wireless 5G Radio Frequency';
            metricBadge.style.borderColor = '#00f0ff';
            metricBadge.style.color = '#00f0ff';
          }
          if (currentHealth === 'working') {
            statusText.textContent = 'Connected via 5G Fixed Wireless Outdoor Antenna (200 Mbps) ✓';
            captionText.innerHTML = '<strong>Fixed Wireless Access (FWA):</strong> A directional dish or panel antenna on your roof points directly at an ISP cell tower across line-of-sight. Replaces underground cables in rural or suburban areas. Vulnerable to heavy rain fade and physical obstacles (trees, construction).';
          } else {
            captionText.innerHTML = '<strong style="color:#ef4444;">Wireless Link Blocked:</strong> Extreme weather or physical obstruction broke line-of-sight radio link to the cell tower.';
          }
        } else if (currentType === 'satellite') {
          if (metricBadge) {
            metricBadge.textContent = 'SPEED: 150 Mbps • LATENCY: 42ms • MEDIUM: Low Earth Orbit Space RF Link';
            metricBadge.style.borderColor = '#c084fc';
            metricBadge.style.color = '#c084fc';
          }
          if (currentHealth === 'working') {
            statusText.textContent = 'Connected via Low Earth Orbit Satellite Constellation (Starlink 150 Mbps) ✓';
            captionText.innerHTML = '<strong>Satellite Internet (LEO):</strong> Motorized phased-array antenna communicates with satellites moving at 27,000 km/h in Low Earth Orbit (550 km). Latency is ~40ms (vastly superior to legacy geostationary satellites at 36,000 km which suffered 600ms latency).';
          } else {
            captionText.innerHTML = '<strong style="color:#ef4444;">Satellite Downlink Lost:</strong> Heavy storm cloud cover or sky obstruction disconnected dish from satellite constellation.';
          }
        }
      }

      if (typeDropdown) {
        typeDropdown.addEventListener('change', (e) => {
          currentType = e.target.value;
          updateConnectionLab();
        });
      }

      typeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          currentType = btn.getAttribute('data-type');
          updateConnectionLab();
        });
      });

      stageBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          currentStage = btn.getAttribute('data-stage');
          updateConnectionLab();
        });
      });

      healthBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          currentHealth = btn.getAttribute('data-health');
          updateConnectionLab();
        });
      });

      // SVG Clickable Hardware Nodes
      Object.entries(rects).forEach(([stageKey, rectEl]) => {
        if (rectEl && rectEl.parentElement) {
          rectEl.parentElement.addEventListener('click', () => {
            currentStage = stageKey;
            updateConnectionLab();
          });
        }
      });

      updateConnectionLab();
    },

    // =========================================================================
    // CH 06: HOW DATA CROSSES COUNTRIES & OCEANS (IMAGE 5)
    // =========================================================================
    renderSubmarineCablesLab: function(containerEl) {
      if (!containerEl) return;
      containerEl.innerHTML = `
        <div class="interactive-lab-wrapper">
          <div class="lab-pill-controls">
            <div class="pill-control-group" style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
              <span class="pill-group-label" style="margin-bottom:0;">Select Data Origin / Cache Source:</span>
              <select id="ocean-src-dropdown" class="calc-input-field" style="background:#0b0c10; border:1px solid #272c34; color:#fff; border-radius:6px; padding:6px 12px; font-size:12.5px; font-weight:600;">
                <option value="nearby">1. Nearby content (Local CDN Edge Cache - Mumbai)</option>
                <option value="europe">2. Europe (London / Frankfurt PoP via Red Sea)</option>
                <option value="na" selected>3. North America (US East Datacenter via Atlantic)</option>
              </select>
            </div>

            <div class="pill-control-group" style="margin-top:8px;">
              <span class="pill-group-label">Quick Jump Origin Pills:</span>
              <div class="pill-buttons-row" id="ocean-src-pills">
                <button class="lab-pill-btn" data-src="nearby">⚡ Nearby content (CDN Edge)</button>
                <button class="lab-pill-btn" data-src="europe">🌍 Europe (Red Sea Path)</button>
                <button class="lab-pill-btn active" data-src="na">🌐 North America (Atlantic)</button>
              </div>
            </div>

            <div class="pill-control-group" style="margin-top:8px;">
              <span class="pill-group-label">Physical Undersea Cable Integrity:</span>
              <div class="pill-buttons-row" id="ocean-route-pills">
                <button class="lab-pill-btn active" data-route="working">✓ Main subsea route working</button>
                <button class="lab-pill-btn" data-route="cut" style="border-color:#ef4444; color:#f87171;">✂ Main route cut (Ship Anchor / Earthquake)</button>
              </div>
            </div>

            <div class="pill-control-group" style="margin-top:8px;">
              <span class="pill-group-label">Autonomous System (BGP) Redundancy:</span>
              <div class="pill-buttons-row" id="ocean-backup-pills">
                <button class="lab-pill-btn active" data-backup="available">Separate backup cable available</button>
                <button class="lab-pill-btn" data-backup="none">No backup cable (Single Point of Failure)</button>
              </div>
            </div>
          </div>

          <div class="lab-diagram-card" style="padding:18px 20px 22px 20px; background:#0b0c10; border-radius:12px; border:1px solid #1e222a;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:8px;">
              <div style="font-size:15px; font-weight:700; color:#fff;">
                Global Undersea Optical Fiber Infrastructure & CDN Architecture
              </div>
              <div id="ocean-metric-badge" style="background:#0d1b2a; border:1px solid #38bdf8; border-radius:6px; padding:4px 10px; font-family:var(--font-mono); font-size:11.5px; color:#38bdf8; font-weight:700;">
                LATENCY: 110ms • HOP: Transatlantic Subsea
              </div>
            </div>

            <svg id="ocean-cables-svg" viewBox="0 0 920 320" style="width:100%; height:auto; display:block; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <!-- Background Map Continents -->
              <g fill="#171a22" stroke="#232732" stroke-width="1">
                <!-- North America -->
                <path d="M 120 70 Q 180 60 260 80 Q 280 120 230 150 Q 190 180 170 210 Q 140 180 120 130 Z" />
                <!-- South America -->
                <path d="M 210 210 Q 260 220 280 260 Q 250 300 230 310 Q 210 260 210 210 Z" />
                <!-- Eurasia -->
                <path d="M 430 70 Q 520 60 620 70 Q 750 80 840 110 Q 820 160 740 180 Q 660 170 600 190 Q 530 140 470 140 Q 440 110 430 70 Z" />
                <!-- Africa -->
                <path d="M 460 150 Q 530 150 550 200 Q 530 270 490 290 Q 450 240 450 190 Z" />
                <!-- India Subcontinent -->
                <path d="M 640 140 Q 680 140 685 180 Q 660 200 640 170 Z" fill="#1e222d" />
              </g>

              <!-- Main Subsea Cable (Transatlantic to Europe to Mumbai) -->
              <path id="path-main-cable" d="M 240 120 Q 360 80 490 100 Q 580 115 670 150" fill="none" stroke="#ef4444" stroke-width="3.5" />

              <!-- Europe-to-Mumbai Segment Highlight Path -->
              <path id="path-europe-segment" d="M 490 100 Q 580 115 670 150" fill="none" stroke="#38bdf8" stroke-width="3.5" style="display:none;" />

              <!-- Backup Subsea Cable (Southern Loop around Africa) -->
              <path id="path-backup-cable" d="M 490 100 Q 470 260 580 270 Q 740 270 670 150" fill="none" stroke="#64748b" stroke-width="2" stroke-dasharray="4,4" />

              <!-- Local CDN Edge Direct Fiber Link in Mumbai -->
              <line id="path-nearby-fiber" x1="640" y1="210" x2="670" y2="150" stroke="#10b981" stroke-width="4" stroke-dasharray="4,4" style="display:none;" />

              <!-- Break Indicator on Main Cable -->
              <g id="ocean-cut-indicator" style="display:none;">
                <circle cx="365" cy="88" r="13" fill="#1f1114" stroke="#ef4444" stroke-width="2.5" />
                <line x1="360" y1="83" x2="370" y2="93" stroke="#ef4444" stroke-width="2.5" />
                <line x1="370" y1="83" x2="360" y2="93" stroke="#ef4444" stroke-width="2.5" />
                <rect x="285" y="45" width="160" height="24" rx="12" fill="#2d1215" stroke="#ef4444" stroke-width="1.5" />
                <text x="365" y="61" fill="#ef4444" font-size="10.5" font-weight="700" text-anchor="middle">Atlantic Cable Severed!</text>
              </g>

              <!-- Node 1: North America Marker -->
              <g id="marker-na" style="cursor:pointer;">
                <circle id="circle-na" cx="240" cy="120" r="7" fill="#ef4444" />
                <circle id="ring-na" cx="240" cy="120" r="14" fill="none" stroke="#ef4444" stroke-width="2" opacity="0.8" />
                <rect x="170" y="80" width="140" height="26" rx="6" fill="#13151b" stroke="#ef4444" stroke-width="1.5" />
                <text x="240" y="97" fill="#ffffff" font-size="11.5" font-weight="700" text-anchor="middle">North America (US East)</text>
              </g>

              <!-- Node 2: Europe Marker -->
              <g id="marker-europe" style="cursor:pointer;">
                <circle id="circle-europe" cx="490" cy="100" r="7" fill="#64748b" />
                <circle id="ring-europe" cx="490" cy="100" r="13" fill="none" stroke="#64748b" stroke-width="1.5" opacity="0.4" />
                <rect x="420" y="62" width="140" height="26" rx="6" fill="#13151b" stroke="#272c37" stroke-width="1.5" id="rect-europe-lbl" />
                <text x="490" y="79" fill="#ffffff" font-size="11.5" font-weight="700" text-anchor="middle">Europe (Frankfurt PoP)</text>
              </g>

              <!-- Node 3: Nearby CDN Edge Cache Marker (Local in Mumbai) -->
              <g id="marker-nearby" style="cursor:pointer;">
                <circle id="circle-nearby" cx="640" cy="210" r="7" fill="#10b981" />
                <circle id="ring-nearby" cx="640" cy="210" r="14" fill="none" stroke="#10b981" stroke-width="2" stroke-dasharray="3,3" opacity="0.8" />
                <rect x="560" y="230" width="160" height="26" rx="6" fill="#06281e" stroke="#10b981" stroke-width="1.5" id="rect-nearby-lbl" />
                <text x="640" y="247" fill="#10b981" font-size="11" font-weight="700" text-anchor="middle">⚡ Nearby CDN Edge (Mumbai)</text>
              </g>

              <!-- Node 4: Mumbai User Endpoint Marker -->
              <g id="marker-mumbai" style="cursor:pointer;">
                <circle cx="670" cy="150" r="7" fill="#38bdf8" />
                <circle cx="670" cy="150" r="13" fill="none" stroke="#38bdf8" stroke-width="1.5" opacity="0.6" />
                <rect x="615" y="115" width="110" height="24" rx="6" fill="#13151b" stroke="#38bdf8" stroke-width="1.5" />
                <text x="670" y="131" fill="#38bdf8" font-size="11" font-weight="700" text-anchor="middle">Mumbai User</text>
              </g>

              <!-- Dynamic Status Text Bottom -->
              <text id="ocean-status-text" x="890" y="295" fill="#10b981" font-size="11.5" font-weight="700" text-anchor="end">
                Data crossing trans-Atlantic subsea optical fiber (Latency: 110ms)
              </text>
            </svg>
          </div>

          <div class="lab-caption-text" id="ocean-caption-text" style="margin-top:12px; font-size:12.5px; color:#9da3af; line-height:1.6;">
            Over 99% of international internet traffic travels through fiber-optic cables on the ocean floor, not satellites. When an underwater earthquake or ship anchor cuts a main submarine cable, autonomous systems use BGP (Border Gateway Protocol) to dynamically reroute traffic across alternative subsea paths!
          </div>
        </div>
      `;

      let srcState = 'na';
      let routeState = 'working';
      let backupState = 'available';

      const srcDropdown = containerEl.querySelector('#ocean-src-dropdown');
      const srcBtns = containerEl.querySelectorAll('#ocean-src-pills .lab-pill-btn');
      const routeBtns = containerEl.querySelectorAll('#ocean-route-pills .lab-pill-btn');
      const backupBtns = containerEl.querySelectorAll('#ocean-backup-pills .lab-pill-btn');
      const cutBadge = containerEl.querySelector('#ocean-cut-indicator');
      const mainCable = containerEl.querySelector('#path-main-cable');
      const europeSegment = containerEl.querySelector('#path-europe-segment');
      const backupCable = containerEl.querySelector('#path-backup-cable');
      const nearbyFiber = containerEl.querySelector('#path-nearby-fiber');
      const statusText = containerEl.querySelector('#ocean-status-text');
      const captionText = containerEl.querySelector('#ocean-caption-text');
      const metricBadge = containerEl.querySelector('#ocean-metric-badge');

      const circleNa = containerEl.querySelector('#circle-na');
      const ringNa = containerEl.querySelector('#ring-na');
      const circleEurope = containerEl.querySelector('#circle-europe');
      const ringEurope = containerEl.querySelector('#ring-europe');
      const rectEuropeLbl = containerEl.querySelector('#rect-europe-lbl');
      const circleNearby = containerEl.querySelector('#circle-nearby');
      const ringNearby = containerEl.querySelector('#ring-nearby');
      const rectNearbyLbl = containerEl.querySelector('#rect-nearby-lbl');

      function updateOceanLab() {
        // Synchronize pills and dropdown
        if (srcDropdown) srcDropdown.value = srcState;
        srcBtns.forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-src') === srcState);
        });

        // Reset visual node states
        if (circleNa) circleNa.setAttribute('fill', '#64748b');
        if (ringNa) ringNa.setAttribute('stroke', '#64748b');
        if (circleEurope) circleEurope.setAttribute('fill', '#64748b');
        if (ringEurope) ringEurope.setAttribute('stroke', '#64748b');
        if (rectEuropeLbl) rectEuropeLbl.setAttribute('stroke', '#272c37');
        if (circleNearby) circleNearby.setAttribute('fill', '#64748b');
        if (ringNearby) ringNearby.setAttribute('stroke', '#64748b');
        if (rectNearbyLbl) rectNearbyLbl.setAttribute('stroke', '#272c37');

        if (srcState === 'nearby') {
          // NEARBY CDN EDGE CACHE
          if (circleNearby) circleNearby.setAttribute('fill', '#10b981');
          if (ringNearby) { ringNearby.setAttribute('stroke', '#10b981'); ringNearby.style.opacity = '1'; }
          if (rectNearbyLbl) rectNearbyLbl.setAttribute('stroke', '#10b981');

          if (nearbyFiber) nearbyFiber.style.display = 'inline';
          if (europeSegment) europeSegment.style.display = 'none';
          if (mainCable) { mainCable.setAttribute('stroke', '#334155'); mainCable.setAttribute('stroke-width', '1.5'); }
          if (backupCable) { backupCable.setAttribute('stroke', '#1e222d'); }
          if (cutBadge) cutBadge.style.display = (routeState === 'cut') ? 'inline' : 'none';

          if (metricBadge) {
            metricBadge.textContent = 'LATENCY: 4ms • HOP: Local Metro Fiber (CDN Edge)';
            metricBadge.style.borderColor = '#10b981';
            metricBadge.style.color = '#10b981';
          }

          if (routeState === 'cut') {
            statusText.textContent = 'CDN Edge Shield Active! Subsea cable broken, but local cache serves at 4ms ✓';
            statusText.setAttribute('fill', '#10b981');
            captionText.innerHTML = '<strong style="color:#10b981;">CDN Resiliency in Action:</strong> Even though the Atlantic submarine fiber cable is cut, Mumbai users watching YouTube or Netflix experience zero downtime! Over 90% of popular static video files are cached right inside Mumbai data centers, completely bypassing international ocean cables.';
          } else {
            statusText.textContent = 'Data served from local CDN Edge Cache in Mumbai (Undersea cables bypassed, 4ms latency) ✓';
            statusText.setAttribute('fill', '#10b981');
            captionText.innerHTML = '<strong style="color:#10b981;">Nearby Edge Cache (CDN):</strong> Edge servers (Cloudflare, Akamai, Google Global Cache) store static media inside the user\'s local metro network. Round-trip time drops from 120ms to under 4ms with zero ocean crossing.';
          }
        } else if (srcState === 'europe') {
          // EUROPE DATA ORIGIN
          if (circleEurope) circleEurope.setAttribute('fill', '#38bdf8');
          if (ringEurope) { ringEurope.setAttribute('stroke', '#38bdf8'); ringEurope.style.opacity = '1'; }
          if (rectEuropeLbl) rectEuropeLbl.setAttribute('stroke', '#38bdf8');

          if (nearbyFiber) nearbyFiber.style.display = 'none';
          if (europeSegment) europeSegment.style.display = 'inline';
          if (mainCable) { mainCable.setAttribute('stroke', '#334155'); mainCable.setAttribute('stroke-width', '1.5'); }

          if (routeState === 'working') {
            if (cutBadge) cutBadge.style.display = 'none';
            if (europeSegment) { europeSegment.setAttribute('stroke', '#38bdf8'); europeSegment.setAttribute('stroke-width', '3.5'); }
            if (backupCable) backupCable.setAttribute('stroke', '#64748b');

            if (metricBadge) {
              metricBadge.textContent = 'LATENCY: 65ms • HOP: Europe -> Mumbai (Red Sea Subsea Cable)';
              metricBadge.style.borderColor = '#38bdf8';
              metricBadge.style.color = '#38bdf8';
            }
            statusText.textContent = 'Data crossing Europe-Asia submarine cable via Red Sea route (Latency: 65ms) ✓';
            statusText.setAttribute('fill', '#10b981');
            captionText.innerHTML = 'Data travels through the Mediterranean Sea and Red Sea subsea cable corridor (SMW4 / AAE-1) directly connecting Europe with India in approximately 65 milliseconds.';
          } else {
            // Cut
            if (cutBadge) cutBadge.style.display = 'inline';
            if (europeSegment) europeSegment.setAttribute('stroke', '#475569');

            if (backupState === 'available') {
              if (backupCable) { backupCable.setAttribute('stroke', '#38bdf8'); backupCable.setAttribute('stroke-width', '3'); }
              if (metricBadge) {
                metricBadge.textContent = 'LATENCY: 185ms • HOP: BGP Rerouted via Southern Africa Loop';
                metricBadge.style.borderColor = '#f59e0b';
                metricBadge.style.color = '#f59e0b';
              }
              statusText.textContent = 'BGP Rerouted via Backup Cable around Southern Africa (Latency: 185ms) ✓';
              statusText.setAttribute('fill', '#f59e0b');
              captionText.innerHTML = '<strong style="color:#f59e0b;">BGP Redundancy:</strong> The direct Red Sea corridor cable was damaged, but BGP dynamic routing automatically shifted the packets around the southern tip of Africa (WACS/SAT-3). Packets arrive intact, but latency jumps from 65ms to 185ms.';
            } else {
              if (backupCable) backupCable.setAttribute('stroke', '#1e222d');
              if (metricBadge) {
                metricBadge.textContent = 'LATENCY: ∞ (TIMEOUT) • 100% PACKET LOSS';
                metricBadge.style.borderColor = '#ef4444';
                metricBadge.style.color = '#ef4444';
              }
              statusText.textContent = 'Connection Severed! 100% Packet Loss (Destination Unreachable) 💀';
              statusText.setAttribute('fill', '#ef4444');
              captionText.innerHTML = '<strong style="color:#ef4444;">Single Point of Failure:</strong> Without a redundant subsea cable path, a physical break completely severs communications between Europe and India!';
            }
          }
        } else {
          // NORTH AMERICA DATA ORIGIN
          if (circleNa) circleNa.setAttribute('fill', '#ef4444');
          if (ringNa) { ringNa.setAttribute('stroke', '#ef4444'); ringNa.style.opacity = '1'; }

          if (nearbyFiber) nearbyFiber.style.display = 'none';
          if (europeSegment) europeSegment.style.display = 'none';

          if (routeState === 'working') {
            if (cutBadge) cutBadge.style.display = 'none';
            if (mainCable) { mainCable.setAttribute('stroke', '#ef4444'); mainCable.setAttribute('stroke-width', '3.5'); }
            if (backupCable) backupCable.setAttribute('stroke', '#64748b');

            if (metricBadge) {
              metricBadge.textContent = 'LATENCY: 110ms • HOP: Transatlantic Subsea (US East -> EU -> Mumbai)';
              metricBadge.style.borderColor = '#ef4444';
              metricBadge.style.color = '#ef4444';
            }
            statusText.textContent = 'Data crossing trans-Atlantic subsea optical fiber (Latency: 110ms) ✓';
            statusText.setAttribute('fill', '#10b981');
            captionText.innerHTML = 'Over 99% of trans-oceanic traffic travels through fiber-optic cables on the ocean floor, not satellites. Optical amplifiers boost laser pulses every 60-100km to push terabits per second across the Atlantic and Indian Oceans.';
          } else {
            // Cut
            if (cutBadge) cutBadge.style.display = 'inline';
            if (mainCable) { mainCable.setAttribute('stroke', '#475569'); mainCable.setAttribute('stroke-width', '1.5'); }

            if (backupState === 'available') {
              if (backupCable) { backupCable.setAttribute('stroke', '#ef4444'); backupCable.setAttribute('stroke-width', '3'); }
              if (metricBadge) {
                metricBadge.textContent = 'LATENCY: 240ms • HOP: BGP Pacific / Southern Reroute';
                metricBadge.style.borderColor = '#f59e0b';
                metricBadge.style.color = '#f59e0b';
              }
              statusText.textContent = 'BGP Rerouted via Backup Subsea Cable (Latency: 240ms, 0% Packet Loss)';
              statusText.setAttribute('fill', '#10b981');
              captionText.innerHTML = '<strong style="color:#10b981;">BGP Failover Active:</strong> The Atlantic cable was severed, but because transit providers purchased multi-homed redundant capacity, BGP converged within 3 seconds to redirect traffic around the southern loop!';
            } else {
              if (backupCable) backupCable.setAttribute('stroke', '#1e222d');
              if (metricBadge) {
                metricBadge.textContent = 'LATENCY: ∞ (TIMEOUT) • 100% PACKET LOSS';
                metricBadge.style.borderColor = '#ef4444';
                metricBadge.style.color = '#ef4444';
              }
              statusText.textContent = 'Connection Severed! 100% Packet Loss (Destination Unreachable) 💀';
              statusText.setAttribute('fill', '#ef4444');
              captionText.innerHTML = '<strong style="color:#ef4444;">Single Point of Failure (SPOF):</strong> Without redundant submarine cables, a physical cable cut causes a complete regional internet blackout until specialized cable repair ships reach the coordinates.';
            }
          }
        }
      }

      // Dropdown listener
      if (srcDropdown) {
        srcDropdown.addEventListener('change', (e) => {
          srcState = e.target.value;
          updateOceanLab();
        });
      }

      // Pills listeners
      srcBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          srcState = btn.getAttribute('data-src');
          updateOceanLab();
        });
      });

      routeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          routeBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          routeState = btn.getAttribute('data-route');
          updateOceanLab();
        });
      });

      backupBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          backupBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          backupState = btn.getAttribute('data-backup');
          updateOceanLab();
        });
      });

      // SVG Clickable Node Markers
      const markerNearby = containerEl.querySelector('#marker-nearby');
      const markerEurope = containerEl.querySelector('#marker-europe');
      const markerNa = containerEl.querySelector('#marker-na');
      const markerMumbai = containerEl.querySelector('#marker-mumbai');

      if (markerNearby) {
        markerNearby.addEventListener('click', () => {
          srcState = 'nearby';
          updateOceanLab();
        });
      }
      if (markerEurope) {
        markerEurope.addEventListener('click', () => {
          srcState = 'europe';
          updateOceanLab();
        });
      }
      if (markerNa) {
        markerNa.addEventListener('click', () => {
          srcState = 'na';
          updateOceanLab();
        });
      }
      if (markerMumbai) {
        markerMumbai.addEventListener('click', () => {
          srcState = 'nearby';
          updateOceanLab();
        });
      }

      updateOceanLab();
    }
  };
})();
