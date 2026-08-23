/**
 * FALAK GLOBAL AUDIO PLAYER
 */
(function() {
  'use strict';

  window.FalakAudio = {
    audio: new Audio(),
    isPlaying: false,
    currentTrack: null,

    init: function() {
      var self = this;
      this.createDOM();

      this.audio.addEventListener('timeupdate', function() {
        self.updateProgress();
      });

      this.audio.addEventListener('ended', function() {
        self.isPlaying = false;
        self.updatePlayButton();
      });
    },

    createDOM: function() {
      if (document.getElementById('falak-global-audio-player')) return;

      var playerHTML = `
        <div id="falak-global-audio-player" class="fixed-bottom shadow-lg p-3 rounded-top-4 d-none" style="background-color: var(--falak-surface); border-top: 2px solid var(--falak-primary); z-index: 1050;">
          <div class="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
            <div class="d-flex align-items-center gap-3">
              <span class="fs-2 text-success">🎧</span>
              <div>
                <h6 class="mb-0 fw-bold" id="falak-audio-title">التلاوة الصوتية</h6>
                <small class="text-muted" id="falak-audio-reciter">فلك — القارئ</small>
              </div>
            </div>

            <div class="d-flex align-items-center gap-2 flex-grow-1 mx-md-3 w-100 max-w-md">
              <button class="btn btn-sm btn-outline-secondary rounded-circle" onclick="window.FalakAudio.toggleRepeat()" id="falak-audio-repeat-btn" title="تكرار">
                🔁
              </button>
              <button class="btn btn-sm btn-falak-primary rounded-circle px-3 py-1" onclick="window.FalakAudio.togglePlay()" id="falak-audio-play-btn">
                ▶
              </button>
              <div class="progress flex-grow-1" style="height: 8px; cursor: pointer;" id="falak-audio-progress-bar" onclick="window.FalakAudio.seek(event)">
                <div class="progress-bar bg-success" id="falak-audio-progress" style="width: 0%;"></div>
              </div>
              <small class="text-muted" id="falak-audio-time">00:00</small>
              <select class="form-select form-select-sm w-auto border-0 bg-light" id="falak-audio-speed" onchange="window.FalakAudio.setSpeed(this.value)">
                <option value="0.75">0.75x</option>
                <option value="1" selected>1x</option>
                <option value="1.25">1.25x</option>
                <option value="1.5">1.5x</option>
                <option value="2">2x</option>
              </select>
            </div>

            <button class="btn-close ms-auto" onclick="window.FalakAudio.hide()"></button>
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', playerHTML);
    },

    playbackRate: 1.0,
    repeatMode: 'none',

    setSpeed: function(speed) {
      this.playbackRate = parseFloat(speed) || 1.0;
      this.audio.playbackRate = this.playbackRate;
    },

    toggleRepeat: function() {
      this.repeatMode = (this.repeatMode === 'none' ? 'surah' : 'none');
      this.audio.loop = (this.repeatMode === 'surah');
      var btn = document.getElementById('falak-audio-repeat-btn');
      if (btn) {
        btn.classList.toggle('btn-success', this.repeatMode === 'surah');
        btn.classList.toggle('text-white', this.repeatMode === 'surah');
      }
    },

    play: function(url, title, reciter) {
      if (!url) return;
      this.currentTrack = { url: url, title: title, reciter: reciter };
      this.audio.src = url;
      this.audio.playbackRate = this.playbackRate;
      this.audio.play();
      this.isPlaying = true;

      document.getElementById('falak-audio-title').textContent = title || 'تلاوة مباركة';
      document.getElementById('falak-audio-reciter').textContent = reciter || 'فلك';
      document.getElementById('falak-global-audio-player').classList.remove('d-none');

      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: title || 'تلاوة مباركة',
          artist: reciter || 'فلك',
          album: 'القرآن الكريم — فلك'
        });
      }

      this.updatePlayButton();
    },

    togglePlay: function() {
      if (this.isPlaying) {
        this.audio.pause();
        this.isPlaying = false;
      } else {
        this.audio.play();
        this.isPlaying = true;
      }
      this.updatePlayButton();
    },

    updatePlayButton: function() {
      var btn = document.getElementById('falak-audio-play-btn');
      if (btn) {
        btn.innerHTML = this.isPlaying ? '⏸' : '▶';
      }
    },

    updateProgress: function() {
      if (!this.audio.duration) return;
      var pct = (this.audio.currentTime / this.audio.duration) * 100;
      var progressBar = document.getElementById('falak-audio-progress');
      var timeDisplay = document.getElementById('falak-audio-time');

      if (progressBar) progressBar.style.width = pct + '%';
      if (timeDisplay) {
        var mins = Math.floor(this.audio.currentTime / 60);
        var secs = Math.floor(this.audio.currentTime % 60);
        timeDisplay.textContent = (mins < 10 ? '0' + mins : mins) + ':' + (secs < 10 ? '0' + secs : secs);
      }
    },

    seek: function(e) {
      var bar = document.getElementById('falak-audio-progress-bar');
      var rect = bar.getBoundingClientRect();
      var clickX = e.clientX - rect.left;
      var pct = clickX / rect.width;
      this.audio.currentTime = pct * this.audio.duration;
    },

    hide: function() {
      this.audio.pause();
      this.isPlaying = false;
      document.getElementById('falak-global-audio-player').classList.add('d-none');
    }
  };

  document.addEventListener('DOMContentLoaded', function() {
    window.FalakAudio.init();
  });
})();
