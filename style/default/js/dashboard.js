/**
 * FALAK USER DASHBOARD COMPONENT
 */
(function() {
  'use strict';

  window.FalakDashboard = {
    render: function(containerId) {
      var container = document.getElementById(containerId);
      if (!container) return;

      var lastRead = window.FalakStorage ? window.FalakStorage.getLastRead() : null;
      var bookmarks = window.FalakStorage ? window.FalakStorage.getBookmarks() : [];
      var memPercentage = window.FalakMemorization ? window.FalakMemorization.getOverallPercentage() : 0;

      container.innerHTML = `
        <div class="falak-card mb-4 p-4">
          <h4 class="fw-bold mb-3" style="color: var(--falak-primary);">📊 لوحة متابعتك الشخصية</h4>
          <div class="row g-3">
            <div class="col-12 col-md-4">
              <div class="p-3 bg-light rounded-3">
                <small class="text-muted d-block mb-1">آخر موضع قراءة</small>
                <h6 class="fw-bold mb-0">${lastRead ? (lastRead.surahName || 'سورة ' + lastRead.surah) : 'لم تبدأ القراءة بعد'}</h6>
              </div>
            </div>
            <div class="col-12 col-md-4">
              <div class="p-3 bg-light rounded-3">
                <small class="text-muted d-block mb-1">إجمالي المرجعيات (Bookmarks)</small>
                <h6 class="fw-bold mb-0">${bookmarks.length} مرجعية</h6>
              </div>
            </div>
            <div class="col-12 col-md-4">
              <div class="p-3 bg-light rounded-3">
                <small class="text-muted d-block mb-1">نسبة حفظ القرآن</small>
                <h6 class="fw-bold mb-0">${memPercentage}% من القرآن الكريم</h6>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  };
})();
