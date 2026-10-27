/**
 * DEV. SAHIL - NETWORKING STUDIO
 * CIDR Subnet Calculator with Live 32-Bit Matrix & Subnet Topology SVG
 * Features full-width network boundary diagram with connecting lines to Gateway, Hosts, and Broadcast!
 */
(function() {
  window.SubnetCalculator = {
    render: function(containerEl) {
      if (!containerEl) return;

      containerEl.innerHTML = `
        <div class="subnet-calc-widget">
          <div class="subnet-inputs-row">
            <div class="calc-input-group">
              <label class="calc-input-label">IPv4 Address</label>
              <input type="text" id="calc-ip-input" class="calc-input-field" value="192.168.1.75">
            </div>
            <div class="calc-input-group">
              <label class="calc-input-label">Prefix: <span id="calc-cidr-label" class="mono text-red">/26</span></label>
              <div class="cidr-slider-box">
                <input type="range" id="calc-cidr-slider" class="cidr-slider" min="1" max="32" value="26">
              </div>
            </div>
          </div>

          <div class="bit-matrix-container">
            <div class="bit-matrix-title">
              <span>32-Bit Binary Allocation</span>
              <span><span style="color:#93c5fd">■ Network Bits</span> &nbsp;|&nbsp; <span style="color:#fecdd3">■ Host Bits</span></span>
            </div>
            <div class="bit-octets-row" id="calc-bit-matrix"></div>
          </div>

          <div class="subnet-stats-grid">
            <div class="stat-item">
              <span class="stat-label">Subnet Mask</span>
              <span class="stat-value" id="calc-stat-mask">255.255.255.192</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Network ID</span>
              <span class="stat-value highlight" id="calc-stat-net">192.168.1.64</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Usable Host Range</span>
              <span class="stat-value" id="calc-stat-range">192.168.1.65 - 192.168.1.126</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Broadcast IP</span>
              <span class="stat-value highlight" id="calc-stat-bcast">192.168.1.127</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Total / Usable Hosts</span>
              <span class="stat-value" id="calc-stat-hosts">64 total / 62 usable</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Wildcard Mask</span>
              <span class="stat-value" id="calc-stat-wildcard">0.0.0.63</span>
            </div>
          </div>

          <!-- Subnet Topology SVG with Connecting Lines -->
          <div class="lab-diagram-card" style="padding:16px 20px 20px 20px; background:#0b0c10; border-radius:12px; border:1px solid #1e222a; margin-top:14px;">
            <svg id="subnet-svg" viewBox="0 0 920 220" style="width:100%; height:auto; display:block; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <!-- Subnet Enclosing Box -->
              <rect x="20" y="15" width="880" height="190" rx="12" fill="#0c0e14" stroke="#272c34" stroke-width="1.5" stroke-dasharray="5,5" />
              <text id="svg-subnet-boundary-lbl" x="40" y="38" fill="#64748b" font-size="11" font-weight="700">SUBNET BROADCAST DOMAIN: 192.168.1.64/26</text>

              <!-- Central Switch Trunk Line -->
              <line x1="120" y1="125" x2="800" y2="125" stroke="#38bdf8" stroke-width="3" />
              <!-- Drop Lines to Nodes -->
              <line x1="180" y1="85" x2="180" y2="125" stroke="#38bdf8" stroke-width="2.5" />
              <line x1="380" y1="85" x2="380" y2="125" stroke="#10b981" stroke-width="2.5" />
              <line x1="560" y1="85" x2="560" y2="125" stroke="#10b981" stroke-width="2.5" />
              <line x1="740" y1="85" x2="740" y2="125" stroke="#ef4444" stroke-width="2.5" />

              <!-- Gateway Router Node -->
              <g id="svg-node-gw">
                <rect x="110" y="48" width="140" height="52" rx="8" fill="#13151b" stroke="#38bdf8" stroke-width="2" />
                <text x="180" y="68" fill="#ffffff" font-size="11" font-weight="700" text-anchor="middle">Default Gateway</text>
                <text id="svg-txt-gw" x="180" y="86" fill="#38bdf8" font-size="9.5" font-family="monospace" text-anchor="middle">192.168.1.65</text>
              </g>

              <!-- Usable Host Min Node -->
              <g id="svg-node-hmin">
                <rect x="310" y="48" width="140" height="52" rx="8" fill="#13151b" stroke="#10b981" stroke-width="1.5" />
                <text x="380" y="68" fill="#ffffff" font-size="11" font-weight="700" text-anchor="middle">First Usable Host</text>
                <text id="svg-txt-hmin" x="380" y="86" fill="#10b981" font-size="9.5" font-family="monospace" text-anchor="middle">192.168.1.65</text>
              </g>

              <!-- Usable Host Max Node -->
              <g id="svg-node-hmax">
                <rect x="490" y="48" width="140" height="52" rx="8" fill="#13151b" stroke="#10b981" stroke-width="1.5" />
                <text x="560" y="68" fill="#ffffff" font-size="11" font-weight="700" text-anchor="middle">Last Usable Host</text>
                <text id="svg-txt-hmax" x="560" y="86" fill="#10b981" font-size="9.5" font-family="monospace" text-anchor="middle">192.168.1.126</text>
              </g>

              <!-- Broadcast Node -->
              <g id="svg-node-bcast">
                <rect x="670" y="48" width="140" height="52" rx="8" fill="#13151b" stroke="#ef4444" stroke-width="2" />
                <text x="740" y="68" fill="#ffffff" font-size="11" font-weight="700" text-anchor="middle">Broadcast Address</text>
                <text id="svg-txt-bcast" x="740" y="86" fill="#ef4444" font-size="9.5" font-family="monospace" text-anchor="middle">192.168.1.127</text>
              </g>

              <!-- Bottom Subnet Summary Text -->
              <text id="svg-txt-summary" x="460" y="175" fill="#94a3b8" font-size="11" text-anchor="middle">
                Subnet Network ID: 192.168.1.64 • Total Addresses: 64 • 62 Usable Devices Isolated in this Subnet Domain
              </text>
            </svg>
          </div>

          <div style="background:#12141a; border:1px solid #1e222a; border-radius:6px; padding:10px 12px; font-size:11.5px; margin-top:14px;">
            <div style="font-weight:700; text-transform:uppercase; color:#9ca3af; margin-bottom:6px; display:flex; justify-content:space-between;">
              <span>Bitwise ANDing Diagnostic</span>
              <span id="calc-anding-verdict" style="color:#00e676; font-weight:700;">LOCAL SUBNET</span>
            </div>
            <div class="mono" style="color:#cbd5e1; font-size:11px; line-height:1.4;">
              Host IP: &nbsp;&nbsp;&nbsp;<span id="anding-ip-bin">11000000.10101000.00000001.01001011</span><br>
              Subnet Mask: <span id="anding-mask-bin">11111111.11111111.11111111.11000000</span><br>
              Result (Net): <span id="anding-net-bin" style="color:#00f0ff">11000000.10101000.00000001.01000000</span>
            </div>
          </div>
        </div>
      `;

      this.attachListeners(containerEl);
      this.recalculate();
    },

    attachListeners: function(containerEl) {
      const ipInput = containerEl.querySelector('#calc-ip-input');
      const cidrSlider = containerEl.querySelector('#calc-cidr-slider');

      if (ipInput) {
        ipInput.addEventListener('input', () => this.recalculate());
      }
      if (cidrSlider) {
        cidrSlider.addEventListener('input', (e) => {
          const cidrLabel = containerEl.querySelector('#calc-cidr-label');
          if (cidrLabel) cidrLabel.textContent = `/${e.target.value}`;
          this.recalculate();
        });
      }
    },

    ipToLong: function(ipStr) {
      const parts = ipStr.trim().split('.');
      if (parts.length !== 4) return 0;
      let long = 0;
      for (let i = 0; i < 4; i++) {
        const octet = parseInt(parts[i], 10);
        if (isNaN(octet) || octet < 0 || octet > 255) return 0;
        long = (long << 8) + octet;
      }
      return (long >>> 0);
    },

    longToIp: function(long) {
      return [
        (long >>> 24) & 255,
        (long >>> 16) & 255,
        (long >>> 8) & 255,
        long & 255
      ].join('.');
    },

    longToBin: function(long) {
      const octets = [];
      for (let i = 3; i >= 0; i--) {
        const byte = (long >>> (i * 8)) & 255;
        octets.push(byte.toString(2).padStart(8, '0'));
      }
      return octets.join('.');
    },

    recalculate: function() {
      const ipInput = document.getElementById('calc-ip-input');
      const cidrSlider = document.getElementById('calc-cidr-slider');
      if (!ipInput || !cidrSlider) return;

      const ipStr = ipInput.value.trim();
      const cidr = parseInt(cidrSlider.value, 10);
      const ipLong = this.ipToLong(ipStr);

      const maskLong = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
      const wildcardLong = ~maskLong >>> 0;
      const netLong = (ipLong & maskLong) >>> 0;
      const bcastLong = (netLong | wildcardLong) >>> 0;

      const totalHosts = Math.pow(2, 32 - cidr);
      const usableHosts = cidr >= 31 ? (cidr === 31 ? 2 : 1) : Math.max(0, totalHosts - 2);

      let firstUsableLong = cidr >= 31 ? netLong : netLong + 1;
      let lastUsableLong = cidr >= 31 ? bcastLong : bcastLong - 1;
      if (usableHosts <= 0) {
        firstUsableLong = netLong;
        lastUsableLong = netLong;
      }

      // Update UI stats
      const maskEl = document.getElementById('calc-stat-mask');
      const netEl = document.getElementById('calc-stat-net');
      const rangeEl = document.getElementById('calc-stat-range');
      const bcastEl = document.getElementById('calc-stat-bcast');
      const hostsEl = document.getElementById('calc-stat-hosts');
      const wildcardEl = document.getElementById('calc-stat-wildcard');

      if (maskEl) maskEl.textContent = this.longToIp(maskLong);
      if (netEl) netEl.textContent = this.longToIp(netLong);
      if (rangeEl) rangeEl.textContent = `${this.longToIp(firstUsableLong)} - ${this.longToIp(lastUsableLong)}`;
      if (bcastEl) bcastEl.textContent = this.longToIp(bcastLong);
      if (hostsEl) hostsEl.textContent = `${totalHosts.toLocaleString()} total / ${usableHosts.toLocaleString()} usable`;
      if (wildcardEl) wildcardEl.textContent = this.longToIp(wildcardLong);

      // Render 32-bit visual cells
      const matrixEl = document.getElementById('calc-bit-matrix');
      if (matrixEl) {
        let html = '';
        for (let oct = 0; oct < 4; oct++) {
          html += '<div class="bit-octet-box">';
          for (let bit = 0; bit < 8; bit++) {
            const overallBitIndex = oct * 8 + bit;
            const isNet = overallBitIndex < cidr;
            const bitValue = (ipLong >>> (31 - overallBitIndex)) & 1;
            html += `<div class="bit-cell ${isNet ? 'network-bit' : 'host-bit'}">${bitValue}</div>`;
          }
          html += '</div>';
        }
        matrixEl.innerHTML = html;
      }

      // Update ANDing diagnostic lines
      const andingIpBin = document.getElementById('anding-ip-bin');
      const andingMaskBin = document.getElementById('anding-mask-bin');
      const andingNetBin = document.getElementById('anding-net-bin');
      if (andingIpBin) andingIpBin.textContent = this.longToBin(ipLong);
      if (andingMaskBin) andingMaskBin.textContent = this.longToBin(maskLong);
      if (andingNetBin) andingNetBin.textContent = this.longToBin(netLong);

      // Update SVG Subnet Diagram
      const svgBoundary = document.getElementById('svg-subnet-boundary-lbl');
      const svgGw = document.getElementById('svg-txt-gw');
      const svgHmin = document.getElementById('svg-txt-hmin');
      const svgHmax = document.getElementById('svg-txt-hmax');
      const svgBcast = document.getElementById('svg-txt-bcast');
      const svgSummary = document.getElementById('svg-txt-summary');

      const netStr = this.longToIp(netLong);
      const bcastStr = this.longToIp(bcastLong);
      const firstStr = this.longToIp(firstUsableLong);
      const lastStr = this.longToIp(lastUsableLong);

      if (svgBoundary) svgBoundary.textContent = `SUBNET BROADCAST DOMAIN: ${netStr}/${cidr}`;
      if (svgGw) svgGw.textContent = firstStr;
      if (svgHmin) svgHmin.textContent = firstStr;
      if (svgHmax) svgHmax.textContent = lastStr;
      if (svgBcast) svgBcast.textContent = bcastStr;
      if (svgSummary) {
        svgSummary.textContent = `Subnet Network ID: ${netStr} • Total Addresses: ${totalHosts.toLocaleString()} • ${usableHosts.toLocaleString()} Usable Devices Isolated in this Subnet Domain`;
      }
    }
  };
})();
