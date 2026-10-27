/**
 * DEV. SAHIL - NETWORKING STUDIO
 * Global Motion & Animated Packet Engine
 */
(function() {
  window.PacketEngine = {
    isPaused: false,
    speed: 1.0,
    activePackets: [],

    togglePause: function() {
      this.isPaused = !this.isPaused;
      const appEl = document.getElementById('app');
      const pauseBtn = document.getElementById('btn-pause-motion');
      
      if (this.isPaused) {
        appEl.classList.add('motion-paused');
        if (pauseBtn) {
          pauseBtn.classList.add('active-state');
          pauseBtn.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            Resume motion
          `;
        }
      } else {
        appEl.classList.remove('motion-paused');
        if (pauseBtn) {
          pauseBtn.classList.remove('active-state');
          pauseBtn.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
            Pause motion
          `;
        }
      }
      return this.isPaused;
    },

    /**
     * Spawns an animated packet flying between two DOM elements
     */
    animatePacket: function(sourceEl, targetEl, containerEl, options = {}) {
      if (!sourceEl || !targetEl || !containerEl || this.isPaused) return;

      const sourceRect = sourceEl.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();
      const containerRect = containerEl.getBoundingClientRect();

      const startX = sourceRect.left + sourceRect.width / 2 - containerRect.left;
      const startY = sourceRect.top + sourceRect.height / 2 - containerRect.top;
      const endX = targetRect.left + targetRect.width / 2 - containerRect.left;
      const endY = targetRect.top + targetRect.height / 2 - containerRect.top;

      const packet = document.createElement('div');
      packet.className = 'flying-packet' + (options.malicious ? ' malicious' : '');
      if (options.label) {
        packet.title = options.label;
      }
      packet.style.left = `${startX}px`;
      packet.style.top = `${startY}px`;

      containerEl.appendChild(packet);

      const duration = (options.duration || 1000) / this.speed;
      const startTime = performance.now();

      const animate = (currentTime) => {
        if (this.isPaused) {
          requestAnimationFrame(animate);
          return;
        }

        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1.0);

        const currentX = startX + (endX - startX) * progress;
        const currentY = startY + (endY - startY) * progress;

        packet.style.left = `${currentX}px`;
        packet.style.top = `${currentY}px`;

        if (progress < 1.0) {
          requestAnimationFrame(animate);
        } else {
          packet.remove();
          if (typeof options.onComplete === 'function') {
            options.onComplete();
          }
        }
      };

      requestAnimationFrame(animate);
    }
  };
})();
