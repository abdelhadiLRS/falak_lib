/* FALAK QURAN READER ENHANCED CONTROLS */

(function() {
  window.FalakReader = {
    settings: {
      fontSize: 28,
      fontFamily: 'quran',
      lineHeight: 2.2,
      showTafseer: true,
      showTranslation: true,
      showAyahNumbers: true
    },

    init: function() {
      this.loadSettings();
      this.applySettings();
      this.bindEvents();
    },

    loadSettings: function() {
      var saved = localStorage.getItem('falak.settings.reader');
      if (saved) {
        try {
          this.settings = Object.assign({}, this.settings, JSON.parse(saved));
        } catch(e) {}
      }
    },

    saveSettings: function() {
      localStorage.setItem('falak.settings.reader', JSON.stringify(this.settings));
      this.applySettings();
    },

    applySettings: function() {
      var ayat = document.querySelectorAll('.ayat, .quran-ayah-text, .surah-text');
      var self = this;
      ayat.forEach(function(el) {
        el.style.fontSize = self.settings.fontSize + 'px';
        el.style.lineHeight = self.settings.lineHeight;
      });
    },

    setFontSize: function(size) {
      this.settings.fontSize = Math.max(16, Math.min(60, size));
      this.saveSettings();
    },

    increaseFontSize: function() {
      this.setFontSize(this.settings.fontSize + 2);
    },

    decreaseFontSize: function() {
      this.setFontSize(this.settings.fontSize - 2);
    },

    toggleBookmark: function(surah, ayah, ayahText) {
      if (window.FalakStorage) {
        window.FalakStorage.toggleBookmark({
          surah: surah,
          ayah: ayah,
          text: ayahText,
          timestamp: Date.now()
        });
      }
    },

    toggleFavorite: function(surah, ayah, ayahText) {
      if (window.FalakStorage) {
        window.FalakStorage.toggleFavorite({
          surah: surah,
          ayah: ayah,
          text: ayahText,
          timestamp: Date.now()
        });
      }
    },

    bindEvents: function() {}
  };

  document.addEventListener('DOMContentLoaded', function() {
    window.FalakReader.init();
  });
})();

// Backward compatibility helpers
function changeSurah(surah) { location = '' + surah; }
function changeurl(id) { location = id; }
function changesound(ID) {
  var sound_id = document.getElementById("sound");
  if (sound_id) {
    sound_id.innerHTML = '<audio controls autoplay><source src="'+ID+'" type="audio/mpeg"></audio><p><a href="'+ID+'">download</a></p>';
  }
}

function playAudio(id, file) {
  var x = document.getElementById(id);
  var b = document.getElementById('b_' + id);

  if (!x) return;

  if (x.style.display === "block") {
    x.style.display = "none";
    if (b) b.innerHTML = '<i class="fas fa-play"></i>';
    x.innerHTML = '';
  } else {
    x.style.display = "block";
    if (b) b.innerHTML = '<i class="fas fa-stop"></i>';
    x.innerHTML = '<audio id="player" class="mt-2" controls="controls" src="' + file + '" autoplay></audio>';
  }
}
