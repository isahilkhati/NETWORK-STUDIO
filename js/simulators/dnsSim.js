/**
 * DEV. SAHIL - NETWORKING STUDIO
 * Hierarchical DNS Resolution, Kaminsky Cache Poisoning & DNS Tunneling Visual Lab
 * Features full-width high-contrast SVG diagram with bidirectional query/response connecting lines!
 */
(function() {
  window.DnsSimulator = {
    render: function(containerEl) {
      if (!containerEl) return;

      containerEl.innerHTML = `
        <div class="interactive-lab-wrapper">
          <!-- Controls -->
          <div class="lab-pill-controls">
            <span class="pill-group-label">Hierarchical Name Resolution & Attack Vectors:</span>
            <div class="pill-buttons-row" style="align-items:center;">
              <input type="text" id="dns-target-input" class="calc-input-field" value="www.cybertarget.com" style="width:200px; padding:6px 12px; font-size:12px; background:#0b0c10; border:1px solid #272c34; color:#fff; border-radius:6px; font-family:monospace;">
              <button id="btn-dns-resolve" class="lab-pill-btn active">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                1. Resolve Domain (Iterative)
              </button>
              <button id="btn-dns-poison" class="lab-pill-btn" style="border-color:#ef4444; color:#f87171;">
                2. Test Cache Poisoning
              </button>
              <button id="btn-dns-tunnel" class="lab-pill-btn">
                3. Test DNS Tunneling (C2 Exfil)
              </button>
            </div>
          </div>

          <!-- Network Diagram Canvas (Full-Width SVG with explicit flow lines) -->
          <div class="lab-diagram-card" style="padding:16px 20px 20px 20px; background:#0b0c10; border-radius:12px; border:1px solid #1e222a;">
            <svg id="dns-diagram-svg" viewBox="0 0 940 320" style="width:100%; height:auto; display:block; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <defs>
                <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
                </marker>
                <marker id="arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
                </marker>
                <marker id="arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#ef4444" />
                </marker>
                <marker id="arrow-purple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#c084fc" />
                </marker>
                <marker id="arrow-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b" />
                </marker>
              </defs>

              <!-- CONNECTING LINES (THICK & CLEAR) -->
              <g id="dns-lines-group">
                <!-- 1. Client <-> Recursive Resolver -->
                <line id="line-client-resolver" x1="160" y1="160" x2="260" y2="160" stroke="#38bdf8" stroke-width="3" marker-end="url(#arrow-blue)" />
                <text x="210" y="148" fill="#38bdf8" font-size="9" font-family="monospace" text-anchor="middle">1. Query / 8. Resp</text>

                <!-- 2. Resolver <-> Root Server -->
                <path id="line-resolver-root" d="M 370 140 L 440 140 L 440 60 L 510 60" fill="none" stroke="#64748b" stroke-width="2.5" marker-end="url(#arrow-purple)" />
                <text x="440" y="48" fill="#c084fc" font-size="9" font-family="monospace" text-anchor="middle">2. Query . / 3. Ref</text>

                <!-- 3. Resolver <-> TLD Server -->
                <line id="line-resolver-tld" x1="370" y1="160" x2="510" y2="160" stroke="#64748b" stroke-width="2.5" marker-end="url(#arrow-amber)" />
                <text x="440" y="178" fill="#f59e0b" font-size="9" font-family="monospace" text-anchor="middle">4. Query .com / 5. Ref</text>

                <!-- 4. Resolver <-> Authoritative Server -->
                <path id="line-resolver-auth" d="M 370 180 L 440 180 L 440 260 L 510 260" fill="none" stroke="#64748b" stroke-width="2.5" marker-end="url(#arrow-green)" />
                <text x="440" y="278" fill="#10b981" font-size="9" font-family="monospace" text-anchor="middle">6. Query A / 7. IP</text>

                <!-- 5. Attacker -> Resolver Injection Line -->
                <path id="line-attacker-resolver" d="M 750 160 L 680 160 L 680 200 L 370 200" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="5,5" marker-end="url(#arrow-red)" style="display:none;" />
              </g>

              <!-- HARDWARE NODES -->
              <!-- 1. Client Stub -->
              <g id="node-dns-client">
                <rect x="30" y="115" width="130" height="90" rx="10" fill="#13151b" stroke="#38bdf8" stroke-width="2" />
                <rect x="80" y="130" width="30" height="20" rx="2" fill="none" stroke="#38bdf8" stroke-width="1.5" />
                <line x1="87" y1="150" x2="103" y2="150" stroke="#38bdf8" stroke-width="1.5" />
                <text x="95" y="172" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Client Host</text>
                <text x="95" y="190" fill="#94a3b8" font-size="9.5" font-family="monospace" text-anchor="middle">192.168.1.10</text>
              </g>

              <!-- 2. Recursive Resolver -->
              <g id="node-dns-resolver">
                <rect id="rect-dns-resolver" x="260" y="115" width="130" height="90" rx="10" fill="#171922" stroke="#38bdf8" stroke-width="2" />
                <circle cx="325" cy="142" r="14" fill="none" stroke="#38bdf8" stroke-width="2" />
                <polyline points="320,142 325,147 332,139" fill="none" stroke="#38bdf8" stroke-width="2" />
                <text x="325" y="172" fill="#ffffff" font-size="12" font-weight="700" text-anchor="middle">Recursive DNS</text>
                <text x="325" y="190" fill="#38bdf8" font-size="9.5" font-family="monospace" text-anchor="middle">8.8.8.8 (Resolver)</text>
              </g>

              <!-- 3. Root DNS Server -->
              <g id="node-dns-root">
                <rect id="rect-dns-root" x="510" y="15" width="160" height="85" rx="10" fill="#13151b" stroke="#c084fc" stroke-width="2" />
                <text x="590" y="45" fill="#c084fc" font-size="18" font-weight="800" text-anchor="middle">. (Root Zone)</text>
                <text x="590" y="66" fill="#ffffff" font-size="11.5" font-weight="700" text-anchor="middle">Root Name Server</text>
                <text x="590" y="84" fill="#94a3b8" font-size="9.5" font-family="monospace" text-anchor="middle">198.41.0.4 [A-Root]</text>
              </g>

              <!-- 4. TLD DNS Server -->
              <g id="node-dns-tld">
                <rect id="rect-dns-tld" x="510" y="115" width="160" height="85" rx="10" fill="#13151b" stroke="#f59e0b" stroke-width="2" />
                <text x="590" y="145" fill="#f59e0b" font-size="15" font-weight="800" text-anchor="middle">.COM Registry</text>
                <text x="590" y="166" fill="#ffffff" font-size="11.5" font-weight="700" text-anchor="middle">TLD Name Server</text>
                <text x="590" y="184" fill="#94a3b8" font-size="9.5" font-family="monospace" text-anchor="middle">192.5.6.30 (Verisign)</text>
              </g>

              <!-- 5. Authoritative Server -->
              <g id="node-dns-auth">
                <rect id="rect-dns-auth" x="510" y="215" width="160" height="85" rx="10" fill="#13151b" stroke="#10b981" stroke-width="2" />
                <text x="590" y="245" fill="#10b981" font-size="13" font-weight="800" text-anchor="middle">cybertarget.com</text>
                <text x="590" y="266" fill="#ffffff" font-size="11.5" font-weight="700" text-anchor="middle">Authoritative NS</text>
                <text x="590" y="284" fill="#94a3b8" font-size="9.5" font-family="monospace" text-anchor="middle">ns1.cybertarget.com</text>
              </g>

              <!-- 6. Attacker (Kaminsky Poisoner / C2) -->
              <g id="node-dns-attacker">
                <rect id="rect-dns-attacker" x="750" y="115" width="160" height="90" rx="10" fill="#191114" stroke="#ef4444" stroke-width="2" />
                <text x="830" y="145" fill="#ef4444" font-size="12" font-weight="800" text-anchor="middle">Attacker (Kali C2)</text>
                <text x="830" y="165" fill="#ffffff" font-size="11" font-weight="600" text-anchor="middle">Spoofed DNS Responses</text>
                <text x="830" y="184" fill="#f87171" font-size="9" font-family="monospace" text-anchor="middle">198.51.100.66</text>
              </g>
            </svg>
          </div>

          <!-- Status Bar -->
          <div style="background:#0c0e14; border:1px solid #1e222a; border-radius:8px; padding:10px 16px; font-family:var(--font-mono); font-size:12px; display:flex; justify-content:space-between; align-items:center;">
            <span id="dns-step-status" style="color:#94a3b8;">Resolver Cache: READY. Click 'Resolve Domain' to trace iterative resolution.</span>
            <span id="dns-resolved-ip" style="color:#00f0ff; font-weight:700;">-</span>
          </div>

          <!-- DNS Log Console -->
          <div class="handshake-log-console" id="dns-console-log" style="height:115px; margin-top:0;">
            [DNS SUBSYSTEM] UDP Port 53 listening. Ready for iterative or recursive name resolution.
          </div>
        </div>
      `;

      this.attachListeners(containerEl);
    },

    attachListeners: function(containerEl) {
      const btnResolve = containerEl.querySelector('#btn-dns-resolve');
      const btnPoison = containerEl.querySelector('#btn-dns-poison');
      const btnTunnel = containerEl.querySelector('#btn-dns-tunnel');

      if (btnResolve) btnResolve.addEventListener('click', () => this.resolveDomain(containerEl));
      if (btnPoison) btnPoison.addEventListener('click', () => this.simulatePoisoning(containerEl));
      if (btnTunnel) btnTunnel.addEventListener('click', () => this.simulateTunneling(containerEl));
    },

    log: function(msg, isAlert = false) {
      const logBox = document.getElementById('dns-console-log');
      if (!logBox) return;
      const line = document.createElement('div');
      line.style.color = isAlert ? '#f87171' : '#a3e635';
      line.textContent = `> ${msg}`;
      logBox.appendChild(line);
      logBox.scrollTop = logBox.scrollHeight;
    },

    resolveDomain: function(containerEl) {
      const input = containerEl.querySelector('#dns-target-input');
      const domain = input ? input.value.trim() : 'www.cybertarget.com';
      const statusEl = containerEl.querySelector('#dns-step-status');
      const ipEl = containerEl.querySelector('#dns-resolved-ip');

      const lineRoot = containerEl.querySelector('#line-resolver-root');
      const lineTld = containerEl.querySelector('#line-resolver-tld');
      const lineAuth = containerEl.querySelector('#line-resolver-auth');
      const lineAttacker = containerEl.querySelector('#line-attacker-resolver');
      const rectResolver = containerEl.querySelector('#rect-dns-resolver');

      if (lineAttacker) lineAttacker.style.display = 'none';
      if (rectResolver) { rectResolver.setAttribute('stroke', '#38bdf8'); }

      this.log(`1. [CLIENT -> RESOLVER] Query: "What is IPv4 A record for ${domain}?"`);
      if (statusEl) { statusEl.style.color = '#38bdf8'; statusEl.textContent = '1. Client asking Recursive Resolver (8.8.8.8)...'; }

      setTimeout(() => {
        if (lineRoot) { lineRoot.setAttribute('stroke', '#c084fc'); lineRoot.setAttribute('stroke-width', '3.5'); }
        this.log(`2. [RESOLVER -> ROOT] Cache miss! Querying Root Server (.) for .com TLD delegation.`);
        if (statusEl) statusEl.textContent = '2. Querying Root Server [.] -> Referral to .COM TLD Registry';

        setTimeout(() => {
          if (lineRoot) { lineRoot.setAttribute('stroke', '#64748b'); lineRoot.setAttribute('stroke-width', '2.5'); }
          if (lineTld) { lineTld.setAttribute('stroke', '#f59e0b'); lineTld.setAttribute('stroke-width', '3.5'); }
          this.log(`3. [RESOLVER -> TLD] Root refers to .COM TLD (192.5.6.30). Querying TLD for ${domain}...`);
          if (statusEl) statusEl.textContent = '3. Querying .COM TLD -> Referral to Authoritative Nameserver';

          setTimeout(() => {
            if (lineTld) { lineTld.setAttribute('stroke', '#64748b'); lineTld.setAttribute('stroke-width', '2.5'); }
            if (lineAuth) { lineAuth.setAttribute('stroke', '#10b981'); lineAuth.setAttribute('stroke-width', '3.5'); }
            this.log(`4. [RESOLVER -> AUTH] .COM TLD returns Authoritative NS: ns1.${domain} (203.0.113.88). Querying Auth NS...`);
            if (statusEl) statusEl.textContent = '4. Querying Authoritative Server -> Answer: 104.26.10.42';

            setTimeout(() => {
              this.log(`5. [AUTH -> RESOLVER] SUCCESS: Authoritative answered ${domain} IN A 104.26.10.42 (TTL=300s). Cached!`);
              this.log(`6. [RESOLVER -> CLIENT] Returning resolved IP 104.26.10.42 to Client browser.`);
              if (statusEl) { statusEl.style.color = '#10b981'; statusEl.textContent = `Resolution Complete! Answer cached (TTL 300s).`; }
              if (ipEl) { ipEl.textContent = `A -> 104.26.10.42`; ipEl.style.color = '#10b981'; }
            }, 600);
          }, 600);
        }, 600);
      }, 500);
    },

    simulatePoisoning: function(containerEl) {
      const statusEl = containerEl.querySelector('#dns-step-status');
      const ipEl = containerEl.querySelector('#dns-resolved-ip');
      const lineAttacker = containerEl.querySelector('#line-attacker-resolver');
      const rectResolver = containerEl.querySelector('#rect-dns-resolver');

      if (lineAttacker) lineAttacker.style.display = 'block';

      this.log("[ATTACK: KAMINSKY CACHE POISONING] Attacker flooding resolver with 50,000 forged responses guessing 16-bit TXID...", true);
      if (statusEl) { statusEl.style.color = '#ef4444'; statusEl.textContent = 'ATTACK: Flooding spoofed TXID answers claiming malicious NS...'; }

      setTimeout(() => {
        if (rectResolver) rectResolver.setAttribute('stroke', '#ef4444');
        this.log("[POISONED!] Attacker won race condition! Injected fraudulent NS: ns1.target.com -> 198.51.100.66 (Attacker IP)", true);
        this.log("All future user lookups for *.cybertarget.com redirected to phishing server!", true);
        if (statusEl) {
          statusEl.textContent = 'RESOLVER CACHE POISONED! (Compromised by Attacker)';
          statusEl.style.color = '#ef4444';
        }
        if (ipEl) {
          ipEl.textContent = 'POISONED -> 198.51.100.66';
          ipEl.style.color = '#ef4444';
        }
      }, 900);
    },

    simulateTunneling: function(containerEl) {
      const secret = "cGFzc3dvcmQxMjM=";
      const statusEl = containerEl.querySelector('#dns-step-status');
      const lineAttacker = containerEl.querySelector('#line-attacker-resolver');

      if (lineAttacker) lineAttacker.style.display = 'block';

      this.log("[MALWARE C2] Outbound HTTP is blocked by firewall! Encapsulating exfiltration payload in DNS query...", true);
      this.log(`Query generated: ${secret}.c2.attacker.com (IN A)`, true);
      if (statusEl) { statusEl.style.color = '#eab308'; statusEl.textContent = `DNS Tunneling: Sending ${secret}.c2.attacker.com...`; }

      setTimeout(() => {
        this.log(`Internal corporate resolver recursively forwarded query out to Attacker Authoritative NS!`);
        this.log(`Attacker NS extracted base64 subdomain: "${secret}" -> Decoded: "password123"!`, true);
        this.log(`Attacker returned command in DNS TXT record: "whoami; net user"`);
        if (statusEl) {
          statusEl.style.color = '#ef4444';
          statusEl.textContent = 'Data exfiltrated via Port 53 covert channel! (Detected by SOC)';
        }
      }, 900);
    }
  };
})();
