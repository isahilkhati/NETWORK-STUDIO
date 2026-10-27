/**
 * DEV. SAHIL - NETWORKING STUDIO
 * Interactive Pictorial Network Lab & Port/Bandwidth Dynamic Experimenter
 * Rebuilt to match the authentic course diagram (Images 1, 2, 3) with full orthogonal SVG connecting lines!
 */
(function() {
  window.InteractiveNetworkLab = {
    selectedDevice: 'phone', // 'phone' | 'laptop' | 'printer' | 'smart-tv' | 'tablet'
    scenario: 'connected',   // 'connected' | 'cable-unplugged' | 'wifi-off' | 'guest-isolated'
    connectedDevicesCount: 5,
    totalBandwidthMbps: 100,
    selectedPort: 443,

    devices: {
      phone: { name: 'Your phone', type: 'wireless', desc: 'Wi-Fi' },
      tablet: { name: 'Tablet', type: 'wireless', desc: 'Wi-Fi' },
      'smart-tv': { name: 'Smart TV', type: 'wireless', desc: 'Wi-Fi in this example' },
      laptop: { name: 'Laptop', type: 'wired', desc: 'Ethernet cable' },
      printer: { name: 'Printer', type: 'wired', desc: 'Ethernet cable' }
    },

    portProtocols: {
      80: { name: 'HTTP (Cleartext Web)', secure: false, overhead: 'Low', use: 'Unencrypted web pages (sniffable in plain text)' },
      443: { name: 'HTTPS (Encrypted TLS Web)', secure: true, overhead: 'Medium', use: 'Secure encrypted banking, social media, shopping' },
      22: { name: 'SSH (Secure Remote Shell)', secure: true, overhead: 'Low', use: 'Admin command-line access to Linux servers' },
      53: { name: 'DNS (Domain Lookup)', secure: false, overhead: 'Very Low', use: 'Translating google.com to IP addresses over UDP' },
      21: { name: 'FTP (Cleartext File Transfer)', secure: false, overhead: 'Low', use: 'Sending files and passwords in raw cleartext' },
      3389: { name: 'RDP (Windows Remote Desktop)', secure: true, overhead: 'High', use: 'Streaming full graphical desktop across network' }
    },

    render: function(containerEl) {
      if (!containerEl) return;

      containerEl.innerHTML = `
        <div class="interactive-lab-wrapper">
          <!-- Top Controls: Choose Device & Scenario (Images 1, 2, 3) -->
          <div class="lab-pill-controls">
            <div class="pill-control-group">
              <span class="pill-group-label">Choose something you already use</span>
              <div class="pill-buttons-row" id="lab-device-pills">
                <button class="lab-pill-btn active" data-device="phone">Phone</button>
                <button class="lab-pill-btn" data-device="laptop">Laptop</button>
                <button class="lab-pill-btn" data-device="printer">Printer</button>
                <button class="lab-pill-btn" data-device="smart-tv">Smart TV</button>
                <button class="lab-pill-btn" data-device="tablet">Tablet</button>
              </div>
            </div>

            <div class="pill-control-group">
              <span class="pill-group-label">Change one thing</span>
              <div class="pill-buttons-row" id="lab-scenario-pills">
                <button class="lab-pill-btn active" data-scenario="connected">Everything is connected</button>
                <button class="lab-pill-btn" data-scenario="cable-unplugged">Internet cable unplugged</button>
                <button class="lab-pill-btn" data-scenario="wifi-off">Wi-Fi turned off</button>
                <button class="lab-pill-btn" data-scenario="guest-isolated">Guest Wi-Fi isolation enabled</button>
              </div>
            </div>
          </div>

          <!-- Dynamic Visual Network Diagram Canvas (Authentic SVG Layout) -->
          <div class="lab-diagram-card" style="padding:16px 20px 20px 20px; background:#0b0c10; border-radius:12px; border:1px solid #1e222a;">
            <svg id="home-network-svg" viewBox="0 0 940 370" style="width:100%; height:auto; display:block; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <defs>
                <filter id="glow-red" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              <!-- 1. LEFT BOUNDARY: YOUR HOME NETWORK -->
              <rect x="15" y="15" width="590" height="315" rx="14" fill="#0d0e13" stroke="#262b35" stroke-width="1.5" />
              <text x="35" y="44" fill="#717886" font-size="11" font-weight="700" letter-spacing="1.2">YOUR HOME NETWORK</text>

              <!-- 2. RIGHT BOUNDARY: OUTSIDE YOUR HOME -->
              <rect x="625" y="15" width="300" height="315" rx="14" fill="#0d0e13" stroke="#262b35" stroke-width="1.5" />
              <text x="645" y="44" fill="#717886" font-size="11" font-weight="700" letter-spacing="1.2">OUTSIDE YOUR HOME</text>

              <!-- =========================================================== -->
              <!-- ORTHOGONAL CONNECTING LINES BETWEEN DEVICES                 -->
              <!-- =========================================================== -->
              <g id="svg-network-lines">
                <!-- Phone -> Wi-Fi box (Wireless dashed - routes cleanly outside Tablet) -->
                <path id="svg-line-phone" d="M 140 105 L 152 105 L 152 165 L 300 165" stroke="#94a3b8" stroke-width="2.5" stroke-dasharray="6,5" fill="none" />

                <!-- Tablet -> Wi-Fi box (Wireless dashed) -->
                <path id="svg-line-tablet" d="M 265 105 L 282 105 L 282 140 L 300 140" stroke="#64748b" stroke-width="2" stroke-dasharray="6,5" fill="none" />

                <!-- Smart TV -> Wi-Fi box (Wireless dashed) -->
                <path id="svg-line-tv" d="M 140 260 L 152 260 L 152 185 L 300 185" stroke="#64748b" stroke-width="2" stroke-dasharray="6,5" fill="none" />

                <!-- Laptop -> Wi-Fi box (Wired solid) -->
                <path id="svg-line-laptop" d="M 265 260 L 282 260 L 282 195 L 300 195" stroke="#64748b" stroke-width="2.5" fill="none" />

                <!-- Wi-Fi box -> Printer (Wired solid) -->
                <path id="svg-line-printer" d="M 420 175 L 452 175 L 452 260 L 485 260" stroke="#64748b" stroke-width="2.5" fill="none" />

                <!-- Wi-Fi box -> Internet (Wired solid crossing boundary) -->
                <path id="svg-line-internet" d="M 420 135 L 500 135 L 500 92 L 685 92" stroke="#94a3b8" stroke-width="2.5" fill="none" />

                <!-- Internet -> Website or App (Wired solid down) -->
                <path id="svg-line-webapp" d="M 775 130 L 775 195" stroke="#94a3b8" stroke-width="2.5" fill="none" />
              </g>

              <!-- =========================================================== -->
              <!-- HARDWARE NODES (CARDS)                                      -->
              <!-- =========================================================== -->
              <!-- 1. YOUR PHONE -->
              <g id="svg-node-phone" class="svg-clickable-node" style="cursor:pointer;">
                <rect id="svg-rect-phone" x="35" y="60" width="105" height="90" rx="10" fill="#13151b" stroke="#ef4444" stroke-width="2" />
                <!-- Phone Icon -->
                <rect x="77" y="74" width="20" height="32" rx="3" fill="none" stroke="#ef4444" stroke-width="2" id="svg-icon-phone" />
                <line x1="84" y1="99" x2="90" y2="99" stroke="#ef4444" stroke-width="2" />
                <text x="87" y="122" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle" id="svg-title-phone">Your phone</text>
                <text x="87" y="138" fill="#94a3b8" font-size="10" text-anchor="middle" id="svg-sub-phone">Wi-Fi</text>
              </g>

              <!-- 2. TABLET -->
              <g id="svg-node-tablet" class="svg-clickable-node" style="cursor:pointer;">
                <rect id="svg-rect-tablet" x="165" y="60" width="100" height="90" rx="10" fill="#13151b" stroke="#272c37" stroke-width="1.5" />
                <!-- Tablet Icon -->
                <rect x="204" y="74" width="22" height="30" rx="2" fill="none" stroke="#94a3b8" stroke-width="2" />
                <circle cx="215" cy="98" r="1.5" fill="#94a3b8" />
                <text x="215" y="122" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Tablet</text>
                <text x="215" y="138" fill="#94a3b8" font-size="10" text-anchor="middle" id="svg-sub-tablet">Wi-Fi</text>
              </g>

              <!-- 3. WI-FI BOX (CENTRAL ROUTER) -->
              <g id="svg-node-router">
                <rect x="300" y="110" width="120" height="95" rx="10" fill="#171922" stroke="#ef4444" stroke-width="2" />
                <!-- Router Antenna & Body Icon -->
                <rect x="340" y="136" width="40" height="20" rx="3" fill="none" stroke="#ef4444" stroke-width="2" />
                <line x1="346" y1="128" x2="346" y2="136" stroke="#ef4444" stroke-width="2" />
                <line x1="374" y1="128" x2="374" y2="136" stroke="#ef4444" stroke-width="2" />
                <!-- Arrow Icon <--> inside router -->
                <path d="M 353 146 L 348 146 M 350 144 L 348 146 L 350 148" stroke="#ffffff" stroke-width="1.5" fill="none" />
                <path d="M 367 146 L 372 146 M 370 144 L 372 146 L 370 148" stroke="#ffffff" stroke-width="1.5" fill="none" />
                <line x1="350" y1="146" x2="370" y2="146" stroke="#ffffff" stroke-width="1.5" />
                <text x="360" y="174" fill="#ffffff" font-size="13" font-weight="700" text-anchor="middle">Wi-Fi box</text>
                <text x="360" y="190" fill="#94a3b8" font-size="10" text-anchor="middle">Connects your devices</text>
              </g>

              <!-- 4. SMART TV -->
              <g id="svg-node-smart-tv" class="svg-clickable-node" style="cursor:pointer;">
                <rect id="svg-rect-smart-tv" x="35" y="215" width="105" height="90" rx="10" fill="#13151b" stroke="#272c37" stroke-width="1.5" />
                <!-- TV Icon -->
                <rect x="72" y="228" width="30" height="20" rx="2" fill="none" stroke="#94a3b8" stroke-width="2" />
                <polygon points="85,234 91,238 85,242" fill="#94a3b8" />
                <line x1="87" y1="248" x2="87" y2="252" stroke="#94a3b8" stroke-width="2" />
                <line x1="80" y1="252" x2="94" y2="252" stroke="#94a3b8" stroke-width="2" />
                <text x="87" y="276" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Smart TV</text>
                <text x="87" y="292" fill="#94a3b8" font-size="9.5" text-anchor="middle" id="svg-sub-tv">Wi-Fi in this example</text>
              </g>

              <!-- 5. LAPTOP -->
              <g id="svg-node-laptop" class="svg-clickable-node" style="cursor:pointer;">
                <rect id="svg-rect-laptop" x="165" y="215" width="100" height="90" rx="10" fill="#13151b" stroke="#272c37" stroke-width="1.5" />
                <!-- Laptop Icon -->
                <rect x="201" y="228" width="28" height="18" rx="2" fill="none" stroke="#94a3b8" stroke-width="2" />
                <line x1="195" y1="246" x2="235" y2="246" stroke="#94a3b8" stroke-width="2" />
                <text x="215" y="276" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Laptop</text>
                <text x="215" y="292" fill="#94a3b8" font-size="9.5" text-anchor="middle">Ethernet cable</text>
              </g>

              <!-- 6. PRINTER -->
              <g id="svg-node-printer" class="svg-clickable-node" style="cursor:pointer;">
                <rect id="svg-rect-printer" x="485" y="215" width="105" height="90" rx="10" fill="#13151b" stroke="#272c37" stroke-width="1.5" />
                <!-- Printer Icon -->
                <path d="M 526 230 L 550 230 L 550 237 L 526 237 Z" fill="none" stroke="#94a3b8" stroke-width="1.5" />
                <rect x="522" y="237" width="32" height="15" rx="2" fill="none" stroke="#94a3b8" stroke-width="2" />
                <rect x="528" y="244" width="20" height="8" fill="none" stroke="#94a3b8" stroke-width="1.5" />
                <text x="537" y="276" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Printer</text>
                <text x="537" y="292" fill="#94a3b8" font-size="9.5" text-anchor="middle">Ethernet cable</text>
              </g>

              <!-- =========================================================== -->
              <!-- OUTSIDE NODES: INTERNET & WEBSITE/APP                       -->
              <!-- =========================================================== -->
              <!-- 7. INTERNET CLOUD -->
              <g id="svg-node-internet">
                <rect x="685" y="55" width="180" height="75" rx="10" fill="#13151b" stroke="#272c37" stroke-width="1.5" />
                <!-- Cloud Icon -->
                <path d="M 760 78 A 12 12 0 0 1 784 75 A 10 10 0 0 1 794 88 L 750 88 A 8 8 0 0 1 760 78 Z" fill="none" stroke="#94a3b8" stroke-width="2" />
                <line x1="765" y1="83" x2="780" y2="83" stroke="#94a3b8" stroke-width="1.5" />
                <text x="775" y="108" fill="#ffffff" font-size="13" font-weight="700" text-anchor="middle">Internet</text>
              </g>

              <!-- 8. WEBSITE OR APP -->
              <g id="svg-node-webapp">
                <rect id="svg-rect-webapp" x="685" y="195" width="180" height="92" rx="10" fill="#13151b" stroke="#272c37" stroke-width="1.5" />
                <!-- Browser window icon -->
                <rect x="757" y="212" width="36" height="24" rx="2" fill="none" stroke="#94a3b8" stroke-width="2" id="svg-icon-webapp" />
                <line x1="757" y1="219" x2="793" y2="219" stroke="#94a3b8" stroke-width="1.5" />
                <circle cx="762" cy="216" r="1" fill="#94a3b8" />
                <circle cx="766" cy="216" r="1" fill="#94a3b8" />
                <circle cx="770" cy="216" r="1" fill="#94a3b8" />
                <text x="775" y="254" fill="#ffffff" font-size="12.5" font-weight="700" text-anchor="middle" id="svg-title-webapp">Website or app</text>
                <text x="775" y="270" fill="#94a3b8" font-size="10" text-anchor="middle">Beyond your home</text>
              </g>

              <!-- =========================================================== -->
              <!-- CONDITION BADGES & DISCONNECT CROSSES (RENDERED ON TOP!)    -->
              <!-- =========================================================== -->
              <!-- 1. Internet Cable Unplugged Indicators -->
              <g id="svg-badge-cable-down" style="display:none;">
                <!-- Cross on wire -->
                <circle cx="595" cy="92" r="11" fill="#1f1114" stroke="#ef4444" stroke-width="2" />
                <line x1="591" y1="88" x2="599" y2="96" stroke="#ef4444" stroke-width="2" />
                <line x1="599" y1="88" x2="591" y2="96" stroke="#ef4444" stroke-width="2" />
                <!-- Pill label -->
                <rect x="525" y="52" width="140" height="26" rx="13" fill="#2d1215" stroke="#ef4444" stroke-width="1.5" />
                <text x="595" y="69" fill="#ef4444" font-size="11" font-weight="700" text-anchor="middle">Internet link down</text>
                <line x1="595" y1="78" x2="595" y2="81" stroke="#ef4444" stroke-width="1.5" />
              </g>

              <!-- 2. Wi-Fi Turned Off Indicators -->
              <g id="svg-badge-wifi-off" style="display:none;">
                <!-- Cross on wireless trunk -->
                <circle cx="225" cy="165" r="11" fill="#1f1114" stroke="#ef4444" stroke-width="2" />
                <line x1="221" y1="161" x2="229" y2="169" stroke="#ef4444" stroke-width="2" />
                <line x1="229" y1="161" x2="221" y2="169" stroke="#ef4444" stroke-width="2" />
                <!-- Pill label -->
                <rect x="165" y="125" width="120" height="26" rx="13" fill="#2d1215" stroke="#ef4444" stroke-width="1.5" />
                <text x="225" y="142" fill="#ef4444" font-size="11" font-weight="700" text-anchor="middle">Wi-Fi radio off</text>
                <line x1="225" y1="151" x2="225" y2="154" stroke="#ef4444" stroke-width="1.5" />
              </g>

              <!-- 3. Guest Isolation Indicators (Positioned cleanly in open area under router, ZERO overlap with Printer) -->
              <g id="svg-badge-guest-isolated" style="display:none;">
                <!-- Cross on local line to printer/laptop -->
                <circle cx="452" cy="205" r="11" fill="#1f1114" stroke="#ef4444" stroke-width="2" />
                <line x1="448" y1="201" x2="456" y2="209" stroke="#ef4444" stroke-width="2" />
                <line x1="456" y1="201" x2="448" y2="209" stroke="#ef4444" stroke-width="2" />
                <!-- Pill label: Completely clear of Printer (ends at 441, Printer starts at 485) -->
                <rect x="295" y="228" width="146" height="26" rx="13" fill="#2d1215" stroke="#ef4444" stroke-width="1.5" />
                <text x="368" y="245" fill="#ef4444" font-size="11" font-weight="700" text-anchor="middle">Guest phone isolated</text>
                <!-- Dotted connector from pill to cross on wire -->
                <line x1="441" y1="234" x2="447" y2="216" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="2,2" />
              </g>

              <!-- =========================================================== -->
              <!-- DIAGRAM FOOTER: LEGEND & LIVE STATUS NOTICE                 -->
              <!-- =========================================================== -->
              <!-- Legend on Left -->
              <line x1="35" y1="350" x2="70" y2="350" stroke="#cbd5e1" stroke-width="2.5" />
              <text x="78" y="354" fill="#94a3b8" font-size="11">Wired link</text>

              <line x1="155" y1="350" x2="190" y2="350" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="5,4" />
              <text x="198" y="354" fill="#94a3b8" font-size="11">Wireless link</text>

              <!-- Live Status on Right (Image 1, 2, 3) -->
              <text id="svg-live-status-text" x="900" y="354" fill="#10b981" font-size="12" font-weight="700" text-anchor="end">
                All local and internet links are active
              </text>
            </svg>
          </div>

          <!-- Explanatory Caption -->
          <div class="lab-caption-text" id="lab-caption-dynamic" style="margin-top:12px; font-size:12.5px; color:#9da3af; line-height:1.6;">
            The combined home box is a common design. A real home may use separate access points, switches and a router. Wireless and wired devices can share the same local network.
          </div>

          <!-- ========================================================= -->
          <!-- DYNAMIC PORT & BANDWIDTH EXPERIMENTER (SCROLL & PLAYGROUND) -->
          <!-- ========================================================= -->
          <div class="bandwidth-experimenter-box" style="margin-top:20px; background:#0f1117; border:1px solid #1e222a; border-radius:12px; padding:22px;">
            <div class="experimenter-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
              <div class="experimenter-title" style="display:flex; align-items:center; gap:8px; font-size:15px; font-weight:700; color:#fff;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                Dynamic Port & Bandwidth Experimenter
              </div>
              <span class="experimenter-badge" style="font-size:10px; font-family:monospace; background:rgba(230,57,70,0.15); border:1px solid rgba(230,57,70,0.4); color:#ef4444; padding:3px 8px; border-radius:4px;">Interactive Playground</span>
            </div>
            <p style="color:#9da3af; font-size:12.5px; margin-bottom:18px;">
              Change connected device count, allocate ISP bandwidth, or swap network ports to see how congestion and security encryption react in real time.
            </p>

            <div class="experimenter-grid" style="display:grid; grid-template-columns: repeat(3, 1fr); gap:16px;">
              <!-- Slider 1: Active Devices Count -->
              <div class="exp-control-card" style="background:#13151c; border:1px solid #232732; border-radius:8px; padding:16px;">
                <div class="exp-label-row" style="display:flex; justify-content:space-between; font-size:12px; color:#cbd5e1; margin-bottom:8px;">
                  <span>Connected Devices:</span>
                  <span class="exp-val-highlight mono" id="val-devices-count" style="color:#ef4444; font-weight:700;">5 devices</span>
                </div>
                <input type="range" id="slider-devices-count" class="exp-range-slider" min="1" max="50" value="5" style="width:100%; cursor:pointer;">
                <div class="exp-sub-hint" style="font-size:11px; color:#64748b; margin-top:6px;">Add up to 50 active clients</div>
              </div>

              <!-- Slider 2: Home Bandwidth -->
              <div class="exp-control-card" style="background:#13151c; border:1px solid #232732; border-radius:8px; padding:16px;">
                <div class="exp-label-row" style="display:flex; justify-content:space-between; font-size:12px; color:#cbd5e1; margin-bottom:8px;">
                  <span>ISP Total Bandwidth:</span>
                  <span class="exp-val-highlight mono" id="val-total-bandwidth" style="color:#ef4444; font-weight:700;">100 Mbps</span>
                </div>
                <input type="range" id="slider-bandwidth" class="exp-range-slider" min="10" max="1000" step="10" value="100" style="width:100%; cursor:pointer;">
                <div class="exp-sub-hint" style="font-size:11px; color:#64748b; margin-top:6px;">10 Mbps (DSL) to 1000 Mbps (Fiber)</div>
              </div>

              <!-- Selector 3: Port Selector -->
              <div class="exp-control-card" style="background:#13151c; border:1px solid #232732; border-radius:8px; padding:16px;">
                <div class="exp-label-row" style="display:flex; justify-content:space-between; font-size:12px; color:#cbd5e1; margin-bottom:8px;">
                  <span>Protocol Port:</span>
                  <span class="exp-val-highlight mono" id="val-port-selection" style="color:#10b981; font-weight:700;">Port 443 (HTTPS)</span>
                </div>
                <select id="select-network-port" class="exp-select-field" style="width:100%; background:#090a0d; color:#fff; border:1px solid #2d333f; padding:6px 8px; border-radius:4px; font-size:12px;">
                  <option value="443" selected>Port 443 — HTTPS (TLS Encrypted Web)</option>
                  <option value="80">Port 80 — HTTP (Plaintext Sniffable)</option>
                  <option value="22">Port 22 — SSH (Encrypted Admin Shell)</option>
                  <option value="53">Port 53 — DNS (UDP Name Resolution)</option>
                  <option value="21">Port 21 — FTP (Plaintext Password Hazard)</option>
                  <option value="3389">Port 3389 — RDP (Windows Remote Desktop)</option>
                </select>
                <div class="exp-sub-hint" id="hint-port-desc" style="font-size:11px; color:#10b981; margin-top:6px;">Encrypted: Eavesdroppers cannot read packets</div>
              </div>
            </div>

            <!-- Real-Time Metrics Row -->
            <div class="metrics-grid" style="display:grid; grid-template-columns: repeat(4, 1fr); gap:12px; margin-top:16px;">
              <div class="metric-card" style="background:#13151c; border:1px solid #232732; border-radius:8px; padding:12px;">
                <span class="metric-title" style="font-size:11px; color:#94a3b8; display:block;">Bandwidth Per Device</span>
                <span class="metric-number" id="metric-bandwidth-per-device" style="font-size:18px; font-weight:700; color:#38bdf8; display:block; margin:4px 0;">20.0 Mbps</span>
                <span class="metric-formula" id="metric-formula-text" style="font-size:10px; color:#64748b;">100 Mbps ÷ 5 devices</span>
              </div>

              <div class="metric-card" style="background:#13151c; border:1px solid #232732; border-radius:8px; padding:12px;">
                <span class="metric-title" style="font-size:11px; color:#94a3b8; display:block;">Estimated Latency (Ping)</span>
                <span class="metric-number" id="metric-latency-ms" style="font-size:18px; font-weight:700; color:#10b981; display:block; margin:4px 0;">28 ms</span>
                <div class="metric-gauge-bar" style="background:#1e222a; height:4px; border-radius:2px; overflow:hidden;">
                  <div class="gauge-fill" id="metric-latency-gauge" style="width: 25%; height:100%; background:#10b981;"></div>
                </div>
              </div>

              <div class="metric-card" style="background:#13151c; border:1px solid #232732; border-radius:8px; padding:12px;">
                <span class="metric-title" style="font-size:11px; color:#94a3b8; display:block;">Channel Congestion</span>
                <span class="metric-number" id="metric-congestion-status" style="font-size:14px; font-weight:700; color:#10b981; display:block; margin:4px 0;">Low (Clean Airwaves)</span>
                <div class="metric-gauge-bar" style="background:#1e222a; height:4px; border-radius:2px; overflow:hidden;">
                  <div class="gauge-fill" id="metric-congestion-gauge" style="width: 15%; height:100%; background:#10b981;"></div>
                </div>
              </div>

              <div class="metric-card" style="background:#13151c; border:1px solid #232732; border-radius:8px; padding:12px;">
                <span class="metric-title" style="font-size:11px; color:#94a3b8; display:block;">Wire Security Status</span>
                <span class="metric-number" id="metric-security-status" style="font-size:14px; font-weight:700; color:#10b981; display:block; margin:4px 0;">Payload Encrypted</span>
                <span class="metric-formula" id="metric-security-desc" style="font-size:10px; color:#64748b;">TLS protects passwords from Wireshark</span>
              </div>
            </div>
          </div>
        </div>
      `;

      this.attachListeners(containerEl);
      this.updateVisualState(containerEl);
      this.recalculateMetrics(containerEl);
    },

    attachListeners: function(containerEl) {
      // Device pill buttons
      const deviceBtns = containerEl.querySelectorAll('#lab-device-pills .lab-pill-btn');
      deviceBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          deviceBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.selectedDevice = btn.getAttribute('data-device');
          this.updateVisualState(containerEl);
        });
      });

      // Direct SVG node clicks
      const nodePhone = containerEl.querySelector('#svg-node-phone');
      const nodeTablet = containerEl.querySelector('#svg-node-tablet');
      const nodeSmartTv = containerEl.querySelector('#svg-node-smart-tv');
      const nodeLaptop = containerEl.querySelector('#svg-node-laptop');
      const nodePrinter = containerEl.querySelector('#svg-node-printer');

      const triggerDevice = (dev) => {
        deviceBtns.forEach(b => {
          if (b.getAttribute('data-device') === dev) b.click();
        });
      };

      if (nodePhone) nodePhone.addEventListener('click', () => triggerDevice('phone'));
      if (nodeTablet) nodeTablet.addEventListener('click', () => triggerDevice('tablet'));
      if (nodeSmartTv) nodeSmartTv.addEventListener('click', () => triggerDevice('smart-tv'));
      if (nodeLaptop) nodeLaptop.addEventListener('click', () => triggerDevice('laptop'));
      if (nodePrinter) nodePrinter.addEventListener('click', () => triggerDevice('printer'));

      // Scenario selection buttons
      const scenarioBtns = containerEl.querySelectorAll('#lab-scenario-pills .lab-pill-btn');
      scenarioBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          scenarioBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.scenario = btn.getAttribute('data-scenario');
          this.updateVisualState(containerEl);
        });
      });

      // Sliders & port selector
      const sliderDevs = containerEl.querySelector('#slider-devices-count');
      if (sliderDevs) {
        sliderDevs.addEventListener('input', (e) => {
          this.connectedDevicesCount = parseInt(e.target.value, 10);
          const valEl = containerEl.querySelector('#val-devices-count');
          if (valEl) valEl.textContent = `${this.connectedDevicesCount} devices`;
          this.recalculateMetrics(containerEl);
        });
      }

      const sliderBw = containerEl.querySelector('#slider-bandwidth');
      if (sliderBw) {
        sliderBw.addEventListener('input', (e) => {
          this.totalBandwidthMbps = parseInt(e.target.value, 10);
          const valEl = containerEl.querySelector('#val-total-bandwidth');
          if (valEl) valEl.textContent = `${this.totalBandwidthMbps} Mbps`;
          this.recalculateMetrics(containerEl);
        });
      }

      const portSel = containerEl.querySelector('#select-network-port');
      if (portSel) {
        portSel.addEventListener('change', (e) => {
          this.selectedPort = parseInt(e.target.value, 10);
          this.recalculateMetrics(containerEl);
        });
      }
    },

    updateVisualState: function(containerEl) {
      if (!containerEl) return;

      // Reset all rect strokes & opacities
      const rects = {
        phone: containerEl.querySelector('#svg-rect-phone'),
        tablet: containerEl.querySelector('#svg-rect-tablet'),
        'smart-tv': containerEl.querySelector('#svg-rect-smart-tv'),
        laptop: containerEl.querySelector('#svg-rect-laptop'),
        printer: containerEl.querySelector('#svg-rect-printer'),
        webapp: containerEl.querySelector('#svg-rect-webapp')
      };

      const nodes = {
        phone: containerEl.querySelector('#svg-node-phone'),
        tablet: containerEl.querySelector('#svg-node-tablet'),
        'smart-tv': containerEl.querySelector('#svg-node-smart-tv'),
        laptop: containerEl.querySelector('#svg-node-laptop'),
        printer: containerEl.querySelector('#svg-node-printer'),
        internet: containerEl.querySelector('#svg-node-internet'),
        webapp: containerEl.querySelector('#svg-node-webapp')
      };

      const lines = {
        phone: containerEl.querySelector('#svg-line-phone'),
        tablet: containerEl.querySelector('#svg-line-tablet'),
        tv: containerEl.querySelector('#svg-line-tv'),
        laptop: containerEl.querySelector('#svg-line-laptop'),
        printer: containerEl.querySelector('#svg-line-printer'),
        internet: containerEl.querySelector('#svg-line-internet'),
        webapp: containerEl.querySelector('#svg-line-webapp')
      };

      const badges = {
        cableDown: containerEl.querySelector('#svg-badge-cable-down'),
        wifiOff: containerEl.querySelector('#svg-badge-wifi-off'),
        guestIsolated: containerEl.querySelector('#svg-badge-guest-isolated')
      };

      const liveStatus = containerEl.querySelector('#svg-live-status-text');
      const caption = containerEl.querySelector('#lab-caption-dynamic');
      const subPhone = containerEl.querySelector('#svg-sub-phone');
      const iconPhone = containerEl.querySelector('#svg-icon-phone');

      // Default state reset
      Object.values(rects).forEach(r => { if (r) { r.setAttribute('stroke', '#272c37'); r.setAttribute('stroke-width', '1.5'); } });
      Object.values(nodes).forEach(n => { if (n) { n.style.opacity = '1'; } });
      Object.values(lines).forEach(l => { if (l) { l.setAttribute('stroke', '#64748b'); } });
      Object.values(badges).forEach(b => { if (b) { b.style.display = 'none'; } });

      if (subPhone) subPhone.textContent = 'Wi-Fi';
      if (iconPhone) iconPhone.setAttribute('stroke', '#94a3b8');

      // Highlight selected device
      const selRect = rects[this.selectedDevice];
      if (selRect) {
        selRect.setAttribute('stroke', '#ef4444');
        selRect.setAttribute('stroke-width', '2');
      }

      // Highlight line of selected device
      if (this.selectedDevice === 'phone' && lines.phone) lines.phone.setAttribute('stroke', '#ef4444');
      if (this.selectedDevice === 'tablet' && lines.tablet) lines.tablet.setAttribute('stroke', '#ef4444');
      if (this.selectedDevice === 'smart-tv' && lines.tv) lines.tv.setAttribute('stroke', '#ef4444');
      if (this.selectedDevice === 'laptop' && lines.laptop) lines.laptop.setAttribute('stroke', '#ef4444');
      if (this.selectedDevice === 'printer' && lines.printer) lines.printer.setAttribute('stroke', '#ef4444');

      // ==============================================================
      // SCENARIO 1: EVERYTHING IS CONNECTED (Image normal)
      // ==============================================================
      if (this.scenario === 'connected') {
        if (lines.internet) lines.internet.setAttribute('stroke', '#94a3b8');
        if (lines.webapp) lines.webapp.setAttribute('stroke', '#94a3b8');
        if (liveStatus) {
          liveStatus.textContent = 'All local and internet links are active';
          liveStatus.setAttribute('fill', '#10b981');
        }
        if (caption) {
          caption.textContent = 'The combined home box is a common design. A real home may use separate access points, switches and a router. Wireless and wired devices can share the same local network.';
        }
      }

      // ==============================================================
      // SCENARIO 2: INTERNET CABLE UNPLUGGED (Image 1)
      // ==============================================================
      else if (this.scenario === 'cable-unplugged') {
        if (badges.cableDown) badges.cableDown.style.display = 'inline';
        if (lines.internet) lines.internet.setAttribute('stroke', '#ef4444');
        if (lines.webapp) lines.webapp.setAttribute('stroke', '#334155');
        if (nodes.internet) nodes.internet.style.opacity = '0.4';
        if (nodes.webapp) nodes.webapp.style.opacity = '0.4';

        if (liveStatus) {
          liveStatus.textContent = 'Local devices can still communicate';
          liveStatus.setAttribute('fill', '#ef4444');
        }
        if (caption) {
          caption.innerHTML = '<strong style="color:#ef4444;">Internet cable unplugged:</strong> The link between your home router and the ISP is down. However, the internal switch and Wi-Fi access point remain fully operational! Your laptop can still send print jobs to your local printer, and phones can cast to your Smart TV.';
        }
      }

      // ==============================================================
      // SCENARIO 3: WI-FI TURNED OFF (Image 2)
      // ==============================================================
      else if (this.scenario === 'wifi-off') {
        if (badges.wifiOff) badges.wifiOff.style.display = 'inline';
        if (lines.phone) lines.phone.setAttribute('stroke', '#ef4444');
        if (lines.tablet) lines.tablet.setAttribute('stroke', '#ef4444');
        if (lines.tv) lines.tv.setAttribute('stroke', '#ef4444');

        // Dim wireless devices
        if (nodes.phone) nodes.phone.style.opacity = '0.35';
        if (nodes.tablet) nodes.tablet.style.opacity = '0.35';
        if (nodes['smart-tv']) nodes['smart-tv'].style.opacity = '0.35';

        // Keep wired line active
        if (lines.laptop) lines.laptop.setAttribute('stroke', '#10b981');
        if (lines.printer) lines.printer.setAttribute('stroke', '#10b981');
        if (lines.internet) lines.internet.setAttribute('stroke', '#10b981');
        if (lines.webapp) lines.webapp.setAttribute('stroke', '#10b981');

        if (liveStatus) {
          liveStatus.textContent = 'Wired devices can still communicate';
          liveStatus.setAttribute('fill', '#ef4444');
        }
        if (caption) {
          caption.innerHTML = '<strong style="color:#ef4444;">Wi-Fi turned off:</strong> All wireless radio links are down. Phone, Tablet, and Smart TV have lost their local connection. But because the Ethernet switch ports are physical copper wires, your Laptop and Printer still communicate and browse the web uninterrupted!';
        }
      }

      // ==============================================================
      // SCENARIO 4: GUEST WI-FI ISOLATION ENABLED (Image 3)
      // ==============================================================
      else if (this.scenario === 'guest-isolated') {
        if (badges.guestIsolated) badges.guestIsolated.style.display = 'inline';
        if (subPhone) subPhone.textContent = 'Guest Wi-Fi';
        if (rects.phone) {
          rects.phone.setAttribute('stroke', '#ef4444');
          rects.phone.setAttribute('stroke-width', '2');
        }
        if (rects.webapp) {
          rects.webapp.setAttribute('stroke', '#ef4444');
          rects.webapp.setAttribute('stroke-width', '2');
        }

        // Highlight line from Phone -> Wi-Fi box -> Internet -> Website/App in RED
        if (lines.phone) lines.phone.setAttribute('stroke', '#ef4444');
        if (lines.internet) lines.internet.setAttribute('stroke', '#ef4444');
        if (lines.webapp) lines.webapp.setAttribute('stroke', '#ef4444');

        // Block local line
        if (lines.printer) lines.printer.setAttribute('stroke', '#334155');
        if (nodes.printer) nodes.printer.style.opacity = '0.45';

        if (liveStatus) {
          liveStatus.textContent = 'Guest isolation is a configured policy';
          liveStatus.setAttribute('fill', '#ef4444');
        }
        if (caption) {
          caption.innerHTML = '<strong style="color:#ef4444;">Guest Wi-Fi isolation enabled:</strong> Configured security policy creates a separate VLAN/firewall boundary. The guest phone can route outward to the Internet, but router firewall rules strictly drop packets attempting to reach your internal Laptop, Printer, or Smart TV. Local sniffing and lateral movement are completely blocked!';
        }
      }
    },

    recalculateMetrics: function(containerEl) {
      if (!containerEl) return;

      const perDeviceBw = (this.totalBandwidthMbps / Math.max(1, this.connectedDevicesCount)).toFixed(1);
      const metricBw = containerEl.querySelector('#metric-bandwidth-per-device');
      const metricFormula = containerEl.querySelector('#metric-formula-text');
      if (metricBw) metricBw.textContent = `${perDeviceBw} Mbps`;
      if (metricFormula) metricFormula.textContent = `${this.totalBandwidthMbps} Mbps ÷ ${this.connectedDevicesCount} devices`;

      let latency = Math.round(14 + (this.connectedDevicesCount * 3.5) - (this.totalBandwidthMbps * 0.015));
      latency = Math.max(8, Math.min(650, latency));

      const metricLatency = containerEl.querySelector('#metric-latency-ms');
      const gaugeLatency = containerEl.querySelector('#metric-latency-gauge');
      if (metricLatency) {
        metricLatency.textContent = `${latency} ms`;
        metricLatency.style.color = latency < 40 ? '#10b981' : (latency < 120 ? '#f59e0b' : '#ef4444');
      }
      if (gaugeLatency) {
        const percent = Math.min(100, Math.round((latency / 300) * 100));
        gaugeLatency.style.width = `${percent}%`;
        gaugeLatency.style.backgroundColor = latency < 40 ? '#10b981' : (latency < 120 ? '#f59e0b' : '#ef4444');
      }

      const metricCongest = containerEl.querySelector('#metric-congestion-status');
      const gaugeCongest = containerEl.querySelector('#metric-congestion-gauge');
      const congestionPct = Math.min(100, Math.round((this.connectedDevicesCount / 50) * 100));
      if (metricCongest) {
        if (congestionPct < 30) {
          metricCongest.textContent = 'Low (Clean Airwaves)';
          metricCongest.style.color = '#10b981';
        } else if (congestionPct < 70) {
          metricCongest.textContent = 'Moderate (Collisions)';
          metricCongest.style.color = '#f59e0b';
        } else {
          metricCongest.textContent = 'Severe (Packet Drops!)';
          metricCongest.style.color = '#ef4444';
        }
      }
      if (gaugeCongest) {
        gaugeCongest.style.width = `${congestionPct}%`;
        gaugeCongest.style.backgroundColor = congestionPct < 30 ? '#10b981' : (congestionPct < 70 ? '#f59e0b' : '#ef4444');
      }

      const proto = this.portProtocols[this.selectedPort] || this.portProtocols[443];
      const portVal = containerEl.querySelector('#val-port-selection');
      const portHint = containerEl.querySelector('#hint-port-desc');
      const secStatus = containerEl.querySelector('#metric-security-status');
      const secDesc = containerEl.querySelector('#metric-security-desc');

      if (portVal) {
        portVal.textContent = `Port ${this.selectedPort} (${proto.name.split(' ')[0]})`;
        portVal.style.color = proto.secure ? '#10b981' : '#ef4444';
      }
      if (portHint) {
        portHint.textContent = proto.use;
        portHint.style.color = proto.secure ? '#10b981' : '#ef4444';
      }

      if (secStatus) {
        if (proto.secure) {
          secStatus.textContent = 'Payload Encrypted';
          secStatus.style.color = '#10b981';
          if (secDesc) secDesc.textContent = 'Cryptographic TLS/SSH protects data from Wi-Fi sniffers';
        } else {
          secStatus.textContent = 'CLEARTEXT VULNERABLE!';
          secStatus.style.color = '#ef4444';
          if (secDesc) secDesc.textContent = 'Anyone on your Wi-Fi can steal passwords with Wireshark!';
        }
      }
    }
  };
})();
