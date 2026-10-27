/**
 * DEV. SAHIL - NETWORKING STUDIO
 * Interactive Cyber Command Terminal Simulator
 * Fully clickable chips, auto-focus, and authentic networking command emulation
 */
(function() {
  window.TerminalSimulator = {
    history: [],
    historyIndex: -1,

    render: function(containerEl) {
      if (!containerEl) return;

      containerEl.innerHTML = `
        <div class="terminal-widget" id="main-terminal-widget" style="cursor:text;">
          <div class="terminal-header">
            <div class="terminal-dots">
              <span class="terminal-dot red"></span>
              <span class="terminal-dot yellow"></span>
              <span class="terminal-dot green"></span>
            </div>
            <span class="terminal-title">bash — kali@dev-sahil-studio:~ (Live Simulated Network Shell)</span>
            <span style="font-size:10px; color:#64748b; font-family:var(--font-mono);">Interactive Terminal Ready</span>
          </div>

          <!-- Quick Clickable Command Chips -->
          <div style="background:#111318; border-bottom:1px solid #1f232b; padding:8px 12px; display:flex; gap:6px; flex-wrap:wrap; align-items:center;">
            <span style="font-size:10px; font-weight:700; color:#64748b; text-transform:uppercase; font-family:var(--font-mono);">Quick Run:</span>
            <button class="lab-pill-btn" style="padding:3px 8px; font-size:11px;" data-run="ping 8.8.8.8">ping 8.8.8.8</button>
            <button class="lab-pill-btn" style="padding:3px 8px; font-size:11px;" data-run="traceroute 93.184.216.34">traceroute target.com</button>
            <button class="lab-pill-btn" style="padding:3px 8px; font-size:11px;" data-run="nmap -sS 192.168.1.1">nmap -sS (SYN Scan)</button>
            <button class="lab-pill-btn" style="padding:3px 8px; font-size:11px;" data-run="arp -a">arp -a (Cache)</button>
            <button class="lab-pill-btn" style="padding:3px 8px; font-size:11px;" data-run="netstat -ano">netstat -ano (Ports)</button>
            <button class="lab-pill-btn" style="padding:3px 8px; font-size:11px;" data-run="dig google.com A">dig google.com</button>
            <button class="lab-pill-btn" style="padding:3px 8px; font-size:11px;" data-run="curl -v http://example.com">curl -v (HTTP)</button>
            <button class="lab-pill-btn" style="padding:3px 8px; font-size:11px; color:#ef4444;" data-run="clear">clear</button>
          </div>

          <div class="terminal-body" id="term-body" style="height:340px;">
            <div class="terminal-line" style="color:#00f0ff; font-weight:700;">
              ╔════════════════════════════════════════════════════════════════╗
              ║ DEV. SAHIL NETWORKING STUDIO — INTERACTIVE CYBER SANDBOX       ║
              ║ Type commands or click the Quick Run buttons above!            ║
              ╚════════════════════════════════════════════════════════════════╝
            </div>
            <div class="terminal-line" style="color:#94a3b8;">
              System: Linux 6.5.0-kali3-amd64 #1 SMP PREEMPT_DYNAMIC x86_64
              Default Gateway: 192.168.1.1 | Local Interface: eth0 (192.168.1.50)
              Type 'help' for full command manual.
            </div>
            <div class="terminal-input-row">
              <span class="terminal-prompt">kali@dev-sahil:~$</span>
              <input type="text" id="term-input" class="terminal-input" autocomplete="off" spellcheck="false">
            </div>
          </div>
        </div>
      `;

      this.attachListeners(containerEl);
      const input = containerEl.querySelector('#term-input');
      if (input) setTimeout(() => input.focus(), 100);
    },

    attachListeners: function(containerEl) {
      const widget = containerEl.querySelector('#main-terminal-widget');
      const input = containerEl.querySelector('#term-input');
      if (!input) return;

      if (widget) {
        widget.addEventListener('click', () => {
          input.focus();
        });
      }

      // Quick Run buttons
      containerEl.querySelectorAll('button[data-run]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const cmd = btn.getAttribute('data-run');
          this.executeCommand(cmd);
          input.focus();
        });
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const cmd = input.value.trim();
          input.value = '';
          if (cmd) {
            this.history.push(cmd);
            this.historyIndex = this.history.length;
            this.executeCommand(cmd);
          }
        } else if (e.key === 'ArrowUp') {
          if (this.history.length > 0 && this.historyIndex > 0) {
            this.historyIndex--;
            input.value = this.history[this.historyIndex];
          }
        } else if (e.key === 'ArrowDown') {
          if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            input.value = this.history[this.historyIndex];
          } else {
            this.historyIndex = this.history.length;
            input.value = '';
          }
        }
      });
    },

    writeLine: function(text, cssClass = 'output') {
      const body = document.getElementById('term-body');
      const inputRow = body ? body.querySelector('.terminal-input-row') : null;
      if (!body || !inputRow) return;

      const div = document.createElement('div');
      div.className = `terminal-line ${cssClass}`;
      div.textContent = text;
      body.insertBefore(div, inputRow);
      body.scrollTop = body.scrollHeight;
    },

    executeCommand: function(rawCmd) {
      this.writeLine(`kali@dev-sahil:~$ ${rawCmd}`, 'prompt');
      const parts = rawCmd.trim().split(/\s+/);
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);

      switch (cmd) {
        case 'help':
          this.writeLine("Available networking commands:", 'success');
          this.writeLine("  ping <host>           - Test ICMP reachability and round-trip time");
          this.writeLine("  traceroute <host>     - Trace hop-by-hop router path via TTL expiration");
          this.writeLine("  arp -a                - Inspect local Layer 2 MAC-to-IP binding table");
          this.writeLine("  netstat -ano          - Display listening sockets, connections and PIDs");
          this.writeLine("  dig <domain> [type]   - Query DNS records (A, MX, TXT, NS)");
          this.writeLine("  curl -v <url>         - Display raw HTTP request and response headers");
          this.writeLine("  nmap -sS <ip>         - Perform stealth TCP SYN port scan");
          this.writeLine("  clear                 - Clear the terminal screen");
          break;

        case 'clear':
          const body = document.getElementById('term-body');
          if (body) {
            const inputRow = body.querySelector('.terminal-input-row');
            body.innerHTML = '';
            body.appendChild(inputRow);
          }
          break;

        case 'ping':
          const target = args[0] || '8.8.8.8';
          this.writeLine(`PING ${target} (56 data bytes):`);
          for (let i = 1; i <= 4; i++) {
            setTimeout(() => {
              const rtt = (Math.random() * 8 + 14).toFixed(1);
              this.writeLine(`64 bytes from ${target}: icmp_seq=${i} ttl=64 time=${rtt} ms`);
            }, i * 200);
          }
          break;

        case 'traceroute':
        case 'tracert':
          const host = args[0] || 'target.com';
          this.writeLine(`traceroute to ${host} (93.184.216.34), 30 hops max, 60 byte packets`);
          const hops = [
            " 1  192.168.1.1 (default-gateway.home)  1.120 ms  0.980 ms",
            " 2  10.240.0.1 (isp-aggregation.wan)   7.450 ms  7.120 ms",
            " 3  172.16.100.5 (core-router.transit) 12.650 ms 12.410 ms",
            " 4  142.250.160.1 (tier1-backbone.net) 18.310 ms 18.180 ms",
            ` 5  93.184.216.34 (${host})  21.120 ms 20.850 ms`
          ];
          hops.forEach((line, idx) => {
            setTimeout(() => this.writeLine(line), (idx + 1) * 250);
          });
          break;

        case 'arp':
          this.writeLine("Interface: 192.168.1.50 --- 0x2 [eth0]");
          this.writeLine("  Internet Address      Physical Address      Type");
          this.writeLine("  192.168.1.1           00-aa-bb-44-55-66     dynamic (Gateway)");
          this.writeLine("  192.168.1.100         aa-bb-cc-11-22-33     dynamic (Workstation)");
          this.writeLine("  192.168.1.255         ff-ff-ff-ff-ff-ff     static (Broadcast)");
          break;

        case 'netstat':
          this.writeLine("Active Internet connections (servers and established sockets)");
          this.writeLine("Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program");
          this.writeLine("tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      892/sshd");
          this.writeLine("tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      1044/nginx");
          this.writeLine("tcp        0      0 0.0.0.0:443             0.0.0.0:*               LISTEN      1044/nginx");
          this.writeLine("tcp        0      0 127.0.0.1:3306          0.0.0.0:*               LISTEN      912/mysqld");
          this.writeLine("tcp        0      0 192.168.1.50:54210      93.184.216.34:443       ESTABLISHED 3410/browser");
          this.writeLine("udp        0      0 0.0.0.0:68              0.0.0.0:*                           520/dhclient");
          break;

        case 'dig':
          const dHost = args[0] || 'google.com';
          this.writeLine(`; <<>> DiG 9.18.1 <<>> ${dHost}`);
          this.writeLine(";; Got answer: HEADER: opcode: QUERY, status: NOERROR, id: 48212");
          this.writeLine(";; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1");
          this.writeLine(`;; QUESTION SECTION:\n;${dHost}.            IN      A`);
          this.writeLine(`;; ANSWER SECTION:\n${dHost}.     300     IN      A       142.250.190.46`);
          this.writeLine(";; Query time: 14 msec\n;; SERVER: 8.8.8.8#53(8.8.8.8) (UDP)");
          break;

        case 'curl':
          const cUrl = args[1] || args[0] || 'http://example.com';
          this.writeLine(`* Connecting to 93.184.216.34:80...`);
          this.writeLine(`* Connected to ${cUrl}`);
          this.writeLine(`> GET / HTTP/1.1\n> Host: example.com\n> User-Agent: curl/8.2.1\n> Accept: */*`);
          this.writeLine(`< HTTP/1.1 200 OK\n< Content-Type: text/html; charset=UTF-8\n< Strict-Transport-Security: max-age=31536000\n< Content-Length: 1256`);
          this.writeLine(`<!doctype html><html><body><h1>Example Domain</h1></body></html>`, 'success');
          break;

        case 'nmap':
          const targetIp = args[1] || args[0] || '192.168.1.1';
          this.writeLine(`Starting Nmap 7.94 ( https://nmap.org )`);
          this.writeLine(`Initiating SYN Stealth Scan (-sS) against ${targetIp}...`);
          setTimeout(() => {
            this.writeLine(`Nmap scan report for ${targetIp}`);
            this.writeLine("Host is up (0.00085s latency).");
            this.writeLine("Not shown: 996 closed tcp ports (reset responses)");
            this.writeLine("PORT     STATE SERVICE       REASON");
            this.writeLine("22/tcp   open  ssh           syn-ack");
            this.writeLine("80/tcp   open  http          syn-ack");
            this.writeLine("443/tcp  open  https         syn-ack");
            this.writeLine("3389/tcp filtered ms-wbt-server no-response");
            this.writeLine("\nNmap done: 1 IP address (1 host up) scanned in 0.82 seconds", 'success');
          }, 500);
          break;

        default:
          this.writeLine(`bash: command not found: ${cmd}. Type 'help' to see supported commands.`, 'error');
      }
    }
  };
})();
