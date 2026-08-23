/**
 * FALAK COMMAND PALETTE & UNIFIED SEARCH ENGINE
 */
(function() {
  'use strict';

  function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, function(m) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }[m];
    });
  }

  function normalizeArabic(text) {
    if (!text) return '';
    return text
      .replace(/[أإآ]/g, 'ا')
      .replace(/ة/g, 'ه')
      .replace(/ى/g, 'ي');
  }

  window.FalakSearch = {
    surahs: [],

    init: function() {
      this.createModal();
      this.bindShortcuts();
      this.loadSurahs();
    },

    loadSurahs: function() {
      var surahList = [
        "الفاتحة", "البقرة", "آل عمران", "النساء", "المائدة", "الأنعام", "الأعراف", "الأنفال", "التوبة", "يونس",
        "هود", "يوسف", "الرعد", "إبراهيم", "الحجر", "النحل", "الإسراء", "الكهف", "مريم", "طه",
        "الأنبياء", "الحج", "المؤمنون", "النور", "الفرقان", "الشعراء", "النمل", "القصص", "العنكبوت", "الروم",
        "لقمان", "السجدة", "الأحزاب", "سبأ", "فاطر", "يس", "الصافات", "ص", "الزمر", "غافر",
        "فصلت", "الشورى", "الزخرف", "الدخان", "الجاثية", "الأحقاف", "محمد", "الفتح", "الحجرات", "ق",
        "الذاريات", "الطور", "النجم", "القمر", "الرحمن", "الواقعة", "الحديد", "المجادلة", "الحشر", "الممتحنة",
        "الصف", "الجمعة", "المنافقون", "التغابن", "الطلاق", "التحريم", "الملك", "القلم", "الحاقة", "المعارج",
        "نوح", "الجن", "المزمل", "المدثر", "القيامة", "الإنسان", "المرسلات", "النبأ", "النازعات", "عبس",
        "التكوير", "الانفطار", "المطففين", "الانشقاق", "البروج", "الطارق", "الأعلى", "الغاشية", "الفجر", "البلد",
        "الشمس", "الليل", "الضحى", "الشرح", "التين", "العلق", "القدر", "البينة", "الزلزلة", "العاديات",
        "القارعة", "التكاثر", "العصر", "الهمزة", "الفيل", "قريش", "المعون", "الكوثر", "الكافرون", "النصر",
        "المسد", "الإخلاص", "الفلق", "الناس"
      ];

      this.surahs = surahList.map(function(name, index) {
        return { id: index + 1, name: name, normalizedName: normalizeArabic(name) };
      });
    },

    bindShortcuts: function() {
      var self = this;
      document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          self.openCommandPalette();
        }
      });
    },

    createModal: function() {
      if (document.getElementById('falak-command-palette-modal')) return;

      var modalHTML = `
        <div class="modal fade" id="falak-command-palette-modal" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content border-0 shadow-lg rounded-4 overflow-hidden" style="background-color: var(--falak-surface); color: var(--falak-text);">
              <div class="modal-header border-0 pb-0">
                <div class="input-group input-group-lg border-bottom pb-2">
                  <span class="input-group-text bg-transparent border-0 fs-4">🔍</span>
                  <input type="text" id="falak-search-input" class="form-control bg-transparent border-0 fs-5 shadow-none" placeholder="ابحث عن اسم سورة أو تفسير..." oninput="window.FalakSearch.handleSearch(this.value)" autofocus>
                </div>
              </div>
              <div class="modal-body p-4" style="max-height: 400px; overflow-y: auto;" id="falak-search-results">
                <div class="text-center text-muted py-4">
                  <p class="mb-1">اكتب اسم سورة أو كلمة للبحث المباشر</p>
                  <small class="opacity-75">مثال: الفاتحة، الكهف، يس، الملك</small>
                </div>
              </div>
              <div class="modal-footer border-0 bg-light bg-opacity-25 py-2 px-3 justify-content-between text-muted small">
                <span>تصفح باستخدام أسهم المفاتيح</span>
                <span>اضغط <kbd>ESC</kbd> للإغلاق</span>
              </div>
            </div>
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', modalHTML);
    },

    openCommandPalette: function() {
      var modalElem = document.getElementById('falak-command-palette-modal');
      if (!modalElem || typeof bootstrap === 'undefined') return;
      var bsModal = bootstrap.Modal.getOrCreateInstance(modalElem);
      bsModal.show();
      setTimeout(function() {
        var input = document.getElementById('falak-search-input');
        if (input) input.focus();
      }, 300);
    },

    handleSearch: function(query) {
      var resultsContainer = document.getElementById('falak-search-results');
      if (!query || query.trim() === '') {
        resultsContainer.innerHTML = `
          <div class="text-center text-muted py-4">
            <p class="mb-1">اكتب اسم سورة أو كلمة للبحث المباشر</p>
          </div>
        `;
        return;
      }

      var qRaw = query.trim();
      var qNorm = normalizeArabic(qRaw);

      var filtered = this.surahs.filter(function(s) {
        return s.normalizedName.indexOf(qNorm) > -1 || s.id.toString() === qRaw;
      });

      if (filtered.length === 0) {
        resultsContainer.innerHTML = `
          <div class="text-center text-muted py-4">
            <p class="mb-0">لم يتم العثور على نتائج مطابقة لـ "${escapeHTML(qRaw)}"</p>
          </div>
        `;
        return;
      }

      var html = '<div class="list-group list-group-flush">';
      filtered.forEach(function(s) {
        var safeName = escapeHTML(s.name);
        html += `
          <a href="index.php?surah=${s.id}" class="list-group-item list-group-item-action bg-transparent border-0 d-flex justify-content-between align-items-center py-3">
            <div>
              <h6 class="mb-0 fw-bold">سورة ${safeName}</h6>
              <small class="text-muted">السورة رقم ${s.id} في القرآن الكريم</small>
            </div>
            <span class="badge bg-success bg-opacity-10 text-success">قراءة السورة</span>
          </a>
          <a href="index.php?action=tafseer&type=5&surah=${s.id}" class="list-group-item list-group-item-action bg-transparent border-0 d-flex justify-content-between align-items-center py-3">
            <div>
              <h6 class="mb-0 fw-bold">تفسير سورة ${safeName}</h6>
              <small class="text-muted">التفسير الميسر</small>
            </div>
            <span class="badge bg-primary bg-opacity-10 text-primary">التفسير</span>
          </a>
        `;
      });
      html += '</div>';

      resultsContainer.innerHTML = html;
    }
  };

  document.addEventListener('DOMContentLoaded', function() {
    window.FalakSearch.init();
  });
})();
