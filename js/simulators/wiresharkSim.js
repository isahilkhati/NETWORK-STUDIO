/**
 * DEV. SAHIL - NETWORKING STUDIO
 * Authentic 3-Pane Wireshark Packet Analyzer Simulator
 * Features Display Filter Engine, Hex Dump Highlighting, and Follow TCP Stream
 */
(function() {
  const SCENARIOS = {
    http: {
      name: "Scenario: HTTP Plaintext Login & Credential Theft",
      stream: {
        client: "POST /login.php HTTP/1.1\r\nHost: intranet.bankcorp.local\r\nUser-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)\r\nContent-Type: application/x-www-form-urlencoded\r\nContent-Length: 47\r\n\r\nusername=finance_admin&password=BankSecret2026!\r\n",
        server: "HTTP/1.1 200 OK\r\nDate: Sun, 25 Oct 2026 12:00:00 GMT\r\nServer: Apache/2.4.52\r\nSet-Cookie: session_token=e4a8b79c02d18471; path=/; HttpOnly\r\nContent-Type: text/html\r\nContent-Length: 54\r\n\r\n<html><body>Welcome finance_admin to Core Portal</body></html>\r\n"
      },
      packets: [
        {
          no: 1, time: "0.000000", src: "10.10.5.42", dst: "10.10.1.1", proto: "DNS", len: 74,
          info: "Standard query 0x2b4c A intranet.bankcorp.local",
          cssClass: "ws-row-dns",
          tree: {
            "Frame 1": "74 bytes on wire (592 bits), 74 bytes captured on interface eth0",
            "Ethernet II": "Src: 00:1a:2b:3c:4d:5e, Dst: 00:50:56:c0:00:01",
            "Internet Protocol Version 4": "Src: 10.10.5.42, Dst: 10.10.1.1, TTL: 64, Protocol: UDP (17)",
            "User Datagram Protocol": "Src Port: 54128, Dst Port: 53, Len: 40",
            "Domain Name System (query)": "Transaction ID: 0x2b4c, Questions: 1, Name: intranet.bankcorp.local"
          },
          hex: "005056c00001001a2b3c4d5e08004500003c4a2b00004011e86b0a0a052a0a0a0101d370003500287f3a2b4c0100000100000000000008696e7472616e65740862616e6b636f7270056c6f63616c0000010001"
        },
        {
          no: 2, time: "0.002410", src: "10.10.1.1", dst: "10.10.5.42", proto: "DNS", len: 90,
          info: "Standard query response 0x2b4c A intranet.bankcorp.local A 10.10.2.88",
          cssClass: "ws-row-dns",
          tree: {
            "Frame 2": "90 bytes on wire (720 bits), 90 bytes captured",
            "Ethernet II": "Src: 00:50:56:c0:00:01, Dst: 00:1a:2b:3c:4d:5e",
            "Internet Protocol Version 4": "Src: 10.10.1.1, Dst: 10.10.5.42, TTL: 64",
            "User Datagram Protocol": "Src Port: 53, Dst Port: 54128",
            "Domain Name System (response)": "Answers: 1, intranet.bankcorp.local: type A, class IN, addr 10.10.2.88"
          },
          hex: "001a2b3c4d5e005056c0000108004500004c8f1200004011a3840a0a01010a0a052a0035d37000388a1c2b4c8180000100010000000008696e7472616e65740862616e6b636f7270056c6f63616c0000010001c00c000100010000012c00040a0a0258"
        },
        {
          no: 3, time: "0.015200", src: "10.10.5.42", dst: "10.10.2.88", proto: "TCP", len: 66,
          info: "54220 → 80 [SYN] Seq=0 Win=64240 Len=0 MSS=1460 SACK_PERM",
          cssClass: "ws-row-tcp",
          tree: {
            "Frame 3": "66 bytes on wire (528 bits)",
            "Ethernet II": "Src: 00:1a:2b:3c:4d:5e, Dst: 00:50:56:c0:00:01",
            "Internet Protocol Version 4": "Src: 10.10.5.42, Dst: 10.10.2.88, TTL: 128",
            "Transmission Control Protocol": "Src Port: 54220, Dst Port: 80, Seq: 0, Header Len: 32 bytes, Flags: 0x002 (SYN)"
          },
          hex: "005056c00001001a2b3c4d5e080045000034a1b2400080066a2b0a0a052a0a0a0258d3cc0050e4a19b00000000008002faf0541c0000020405b40103030801010402"
        },
        {
          no: 4, time: "0.016100", src: "10.10.2.88", dst: "10.10.5.42", proto: "TCP", len: 66,
          info: "80 → 54220 [SYN, ACK] Seq=0 Ack=1 Win=65535 Len=0 MSS=1460",
          cssClass: "ws-row-tcp",
          tree: {
            "Frame 4": "66 bytes on wire",
            "Ethernet II": "Src: 00:50:56:c0:00:01, Dst: 00:1a:2b:3c:4d:5e",
            "Internet Protocol Version 4": "Src: 10.10.2.88, Dst: 10.10.5.42, TTL: 64",
            "Transmission Control Protocol": "Src Port: 80, Dst Port: 54220, Seq: 0, Ack: 1, Flags: 0x012 (SYN, ACK)"
          },
          hex: "001a2b3c4d5e005056c000010800450000344f1940004006fcb40a0a02580a0a052a0050d3cc128a3f90e4a19b018012ffff2c0d0000020405b40101040201030307"
        },
        {
          no: 5, time: "0.016250", src: "10.10.5.42", dst: "10.10.2.88", proto: "TCP", len: 54,
          info: "54220 → 80 [ACK] Seq=1 Ack=1 Win=64240 Len=0",
          cssClass: "ws-row-tcp",
          tree: {
            "Frame 5": "54 bytes on wire (Handshake Complete)",
            "Ethernet II": "Src: 00:1a:2b:3c:4d:5e, Dst: 00:50:56:c0:00:01",
            "Internet Protocol Version 4": "Src: 10.10.5.42, Dst: 10.10.2.88, TTL: 128",
            "Transmission Control Protocol": "Src Port: 54220, Dst Port: 80, Seq: 1, Ack: 1, Flags: 0x010 (ACK)"
          },
          hex: "005056c00001001a2b3c4d5e080045000028a1b3400080066a360a0a052a0a0a0258d3cc0050e4a19b01128a3f915010faf0158a0000"
        },
        {
          no: 6, time: "0.025100", src: "10.10.5.42", dst: "10.10.2.88", proto: "HTTP", len: 265,
          info: "POST /login.php HTTP/1.1 (application/x-www-form-urlencoded)",
          cssClass: "ws-row-http",
          tree: {
            "Frame 6": "265 bytes on wire (Plaintext Credentials Transmitted!)",
            "Ethernet II": "Src: 00:1a:2b:3c:4d:5e, Dst: 00:50:56:c0:00:01",
            "Internet Protocol Version 4": "Src: 10.10.5.42, Dst: 10.10.2.88, TTL: 128",
            "Transmission Control Protocol": "Src Port: 54220, Dst Port: 80, Seq: 1, Ack: 1, PSH, ACK",
            "Hypertext Transfer Protocol": "POST /login.php HTTP/1.1\\r\\nHost: intranet.bankcorp.local",
            "HTML Form URL Encoded": "username: finance_admin, password: BankSecret2026!"
          },
          hex: "504f5354202f6c6f67696e2e70687020485454502f312e310d0a486f73743a20696e7472616e65742e62616e6b636f72702e6c6f63616c0d0a436f6e74656e742d547970653a206170706c69636174696f6e2f782d7777772d666f726d2d75726c656e636f6465640d0a0d0a757365726e616d653d66696e616e63655f61646d696e2670617373776f72643d42616e6b5365637265743230323621"
        },
        {
          no: 7, time: "0.041000", src: "10.10.2.88", dst: "10.10.5.42", proto: "HTTP", len: 218,
          info: "HTTP/1.1 200 OK (text/html)",
          cssClass: "ws-row-http",
          tree: {
            "Frame 7": "218 bytes on wire",
            "Ethernet II": "Src: 00:50:56:c0:00:01, Dst: 00:1a:2b:3c:4d:5e",
            "Internet Protocol Version 4": "Src: 10.10.2.88, Dst: 10.10.5.42",
            "Transmission Control Protocol": "Src Port: 80, Dst Port: 54220",
            "Hypertext Transfer Protocol": "HTTP/1.1 200 OK\\r\\nSet-Cookie: session_token=e4a8b79c02d18471"
          },
          hex: "485454502f312e3120323030204f4b0d0a5365742d436f6f6b69653a2073657373696f6e5f746f6b656e3d653461386237396330326431383437313b20706174683d2f0d0a436f6e74656e742d547970653a20746578742f68746d6c0d0a0d0a3c68746d6c3e3c626f64793e57656c636f6d652066696e616e63655f61646d696e3c2f626f64793e3c2f68746d6c3e"
        }
      ]
    },
    arp: {
      name: "Scenario: ARP Cache Poisoning (MITM) Flood",
      stream: { client: "ARP Attack Traffic", server: "Duplicated Gratuitous ARPs" },
      packets: [
        {
          no: 1, time: "0.000000", src: "00:1a:2b:3c:4d:5e", dst: "ff:ff:ff:ff:ff:ff", proto: "ARP", len: 42,
          info: "Who has 192.168.1.1? Tell 192.168.1.50",
          cssClass: "ws-row-arp",
          tree: {
            "Frame 1": "42 bytes broadcast",
            "Ethernet II": "Src: 00:1a:2b:3c:4d:5e, Dst: ff:ff:ff:ff:ff:ff",
            "Address Resolution Protocol": "Hardware type: Ethernet (1), Protocol type: IPv4 (0x0800), Opcode: request (1), Sender MAC: 00:1a:2b:3c:4d:5e, Sender IP: 192.168.1.50, Target IP: 192.168.1.1"
          },
          hex: "ffffffffffff001a2b3c4d5e08060001080006040001001a2b3c4d5ec0a80132000000000000c0a80101"
        },
        {
          no: 2, time: "0.000850", src: "de:ad:be:ef:66:66", dst: "00:1a:2b:3c:4d:5e", proto: "ARP", len: 42,
          info: "192.168.1.1 is at de:ad:be:ef:66:66 (POISON INJECTION)",
          cssClass: "ws-row-arp",
          tree: {
            "Frame 2 (MALICIOUS)": "Forged ARP reply from Attacker",
            "Ethernet II": "Src: de:ad:be:ef:66:66, Dst: 00:1a:2b:3c:4d:5e",
            "Address Resolution Protocol": "Opcode: reply (2), Sender MAC: de:ad:be:ef:66:66, Sender IP: 192.168.1.1 (SPOOFED!)"
          },
          hex: "001a2b3c4d5edeadbeef666608060001080006040002deadbeef6666c0a80101001a2b3c4d5ec0a80132"
        }
      ]
    }
  };

  window.WiresharkSimulator = {
    currentScenario: 'http',
    selectedPacketIndex: 0,
    activeFilter: '',

    render: function(containerEl) {
      if (!containerEl) return;

      containerEl.innerHTML = `
        <div class="wireshark-workbench">
          <!-- Toolbar & Filter Bar -->
          <div class="ws-toolbar">
            <select id="ws-scenario-select" class="ws-pcap-select">
              <option value="http">PCAP: HTTP Plaintext Credential Theft</option>
              <option value="arp">PCAP: ARP Poisoning / MITM Attack</option>
            </select>

            <div class="ws-filter-form">
              <div class="ws-filter-input-wrap">
                <input type="text" id="ws-filter-input" class="ws-filter-input valid" placeholder="Apply a display filter ... e.g. http, dns, tcp.flags.syn == 1, ip.addr">
              </div>
              <button id="ws-btn-apply" class="ws-btn primary">Apply</button>
              <button id="ws-btn-clear" class="ws-btn">Clear</button>
            </div>

            <button id="ws-btn-follow" class="ws-btn" style="border-color:#38bdf8; color:#7dd3fc;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
              Follow TCP Stream
            </button>
          </div>

          <!-- 3-Pane Split View -->
          <div class="ws-panes-split">
            <!-- PANE 1: PACKET LIST -->
            <div class="ws-packet-list-pane">
              <table class="ws-packet-table">
                <thead>
                  <tr>
                    <th style="width: 50px;">No.</th>
                    <th style="width: 90px;">Time</th>
                    <th style="width: 130px;">Source</th>
                    <th style="width: 130px;">Destination</th>
                    <th style="width: 75px;">Protocol</th>
                    <th style="width: 65px;">Length</th>
                    <th>Info</th>
                  </tr>
                </thead>
                <tbody id="ws-packet-tbody"></tbody>
              </table>
            </div>

            <!-- PANE 2: PACKET DETAILS TREE -->
            <div class="ws-packet-details-pane" id="ws-details-container"></div>

            <!-- PANE 3: HEX DUMP -->
            <div class="ws-hex-dump-pane" id="ws-hexdump-container"></div>
          </div>
        </div>

        <!-- Follow Stream Modal -->
        <div class="modal-overlay" id="ws-stream-modal">
          <div class="modal-card">
            <div class="modal-header">
              <span class="modal-title">Follow TCP Stream (Reconstructed Conversational Payload)</span>
              <button class="modal-close-btn" id="ws-modal-close">&times;</button>
            </div>
            <div class="modal-body">
              <div style="margin-bottom:10px; font-size:11.5px; color:#94a3b8;">
                <span style="color:#f87171;">■ Red: Client Request</span> &nbsp;|&nbsp; <span style="color:#60a5fa;">■ Blue: Server Response</span>
              </div>
              <div class="stream-dialog-body" id="ws-stream-content"></div>
            </div>
          </div>
        </div>
      `;

      this.attachListeners(containerEl);
      this.loadScenario('http');
    },

    attachListeners: function(containerEl) {
      const select = containerEl.querySelector('#ws-scenario-select');
      const filterInput = containerEl.querySelector('#ws-filter-input');
      const btnApply = containerEl.querySelector('#ws-btn-apply');
      const btnClear = containerEl.querySelector('#ws-btn-clear');
      const btnFollow = containerEl.querySelector('#ws-btn-follow');
      const modalClose = containerEl.querySelector('#ws-modal-close');
      const modal = containerEl.querySelector('#ws-stream-modal');

      if (select) {
        select.addEventListener('change', (e) => this.loadScenario(e.target.value));
      }
      if (btnApply) {
        btnApply.addEventListener('click', () => {
          this.activeFilter = (filterInput.value || '').trim();
          this.renderPacketList();
        });
      }
      if (btnClear) {
        btnClear.addEventListener('click', () => {
          if (filterInput) filterInput.value = '';
          this.activeFilter = '';
          this.renderPacketList();
        });
      }
      if (btnFollow) {
        btnFollow.addEventListener('click', () => this.openFollowStream());
      }
      if (modalClose && modal) {
        modalClose.addEventListener('click', () => modal.classList.remove('active'));
      }
    },

    loadScenario: function(key) {
      this.currentScenario = key;
      this.selectedPacketIndex = 0;
      this.activeFilter = '';
      this.renderPacketList();
    },

    renderPacketList: function() {
      const tbody = document.getElementById('ws-packet-tbody');
      if (!tbody) return;

      const scenario = SCENARIOS[this.currentScenario] || SCENARIOS.http;
      let packets = scenario.packets;

      if (this.activeFilter) {
        const query = this.activeFilter.toLowerCase();
        packets = packets.filter(p => {
          return p.proto.toLowerCase().includes(query) ||
                 p.info.toLowerCase().includes(query) ||
                 p.src.toLowerCase().includes(query) ||
                 p.dst.toLowerCase().includes(query);
        });
      }

      tbody.innerHTML = '';
      packets.forEach((p, idx) => {
        const tr = document.createElement('tr');
        tr.className = `ws-packet-row ${p.cssClass || ''} ${idx === this.selectedPacketIndex ? 'selected' : ''}`;
        tr.innerHTML = `
          <td>${p.no}</td>
          <td>${p.time}</td>
          <td>${p.src}</td>
          <td>${p.dst}</td>
          <td><strong>${p.proto}</strong></td>
          <td>${p.len}</td>
          <td>${p.info}</td>
        `;
        tr.addEventListener('click', () => {
          this.selectedPacketIndex = idx;
          this.renderPacketList();
          this.renderDetails(p);
          this.renderHexDump(p.hex || '');
        });
        tbody.appendChild(tr);
      });

      if (packets[this.selectedPacketIndex]) {
        this.renderDetails(packets[this.selectedPacketIndex]);
        this.renderHexDump(packets[this.selectedPacketIndex].hex || '');
      }
    },

    renderDetails: function(packet) {
      const container = document.getElementById('ws-details-container');
      if (!container || !packet || !packet.tree) return;

      let html = '';
      for (const [layer, info] of Object.entries(packet.tree)) {
        html += `
          <div class="ws-tree-item open">
            <div class="ws-tree-header" onclick="this.parentElement.classList.toggle('open')">
              <span class="ws-tree-icon">▶</span>
              <span>${layer}: ${info.substring(0, 70)}...</span>
            </div>
            <div class="ws-tree-children">
              <div class="ws-leaf-field">${info}</div>
            </div>
          </div>
        `;
      }
      container.innerHTML = html;
    },

    renderHexDump: function(hexStr) {
      const container = document.getElementById('ws-hexdump-container');
      if (!container) return;

      if (!hexStr) {
        container.innerHTML = '<div style="color:#64748b;">No raw payload bytes available.</div>';
        return;
      }

      const cleanHex = hexStr.replace(/\s+/g, '');
      let html = '';
      let offset = 0;

      for (let i = 0; i < cleanHex.length; i += 32) {
        const chunk = cleanHex.substring(i, i + 32);
        const offsetStr = offset.toString(16).padStart(4, '0');

        let hexDisplay = '';
        let asciiDisplay = '';

        for (let j = 0; j < chunk.length; j += 2) {
          const byteHex = chunk.substring(j, j + 2);
          const byteVal = parseInt(byteHex, 16);
          hexDisplay += byteHex + ' ';
          if (j === 14) hexDisplay += ' '; // middle divider

          if (byteVal >= 32 && byteVal <= 126) {
            asciiDisplay += String.fromCharCode(byteVal);
          } else {
            asciiDisplay += '.';
          }
        }

        html += `
          <div class="hex-line">
            <span class="hex-offset">${offsetStr}</span>
            <span class="hex-bytes">${hexDisplay.padEnd(50, ' ')}</span>
            <span class="hex-ascii">${asciiDisplay}</span>
          </div>
        `;
        offset += 16;
      }

      container.innerHTML = html;
    },

    openFollowStream: function() {
      const modal = document.getElementById('ws-stream-modal');
      const content = document.getElementById('ws-stream-content');
      if (!modal || !content) return;

      const scenario = SCENARIOS[this.currentScenario] || SCENARIOS.http;
      const client = scenario.stream.client || '';
      const server = scenario.stream.server || '';

      content.innerHTML = `
        <span class="stream-client-text">${this.escapeHtml(client)}</span>
        <span class="stream-server-text">${this.escapeHtml(server)}</span>
      `;

      modal.classList.add('active');
    },

    escapeHtml: function(str) {
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
  };
})();
