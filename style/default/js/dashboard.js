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

      var goals = JSON.parse(localStorage.getItem('falak.goals') || '{"reading": 60, "listening": 40, "memorization": 70, "adhkar": 80}');

      container.innerHTML = `
        <div class="falak-card mb-4 p-4">
          <h4 class="fw-bold mb-3" style="color: var(--falak-primary);">📊 لوحة متابعتك الشخصية والأهداف اليومية</h4>
          <div class="row g-3 mb-4">
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

          <h6 class="fw-bold mb-3 text-muted"><i class="fas fa-bullseye me-1"></i> الأهداف اليومية (Daily Goals)</h6>
          <div class="row g-3">
            <div class="col-12 col-md-6">
              <small class="d-flex justify-content-between mb-1"><span>القراءة</span><span>${goals.reading}%</span></small>
              <div class="progress" style="height: 8px;"><div class="progress-bar bg-success" style="width: ${goals.reading}%;"></div></div>
            </div>
            <div class="col-12 col-md-6">
              <small class="d-flex justify-content-between mb-1"><span>الاستماع</span><span>${goals.listening}%</span></small>
              <div class="progress" style="height: 8px;"><div class="progress-bar bg-info" style="width: ${goals.listening}%;"></div></div>
            </div>
            <div class="col-12 col-md-6">
              <small class="d-flex justify-content-between mb-1"><span>الحفظ والمراجعة</span><span>${goals.memorization}%</span></small>
              <div class="progress" style="height: 8px;"><div class="progress-bar bg-warning" style="width: ${goals.memorization}%;"></div></div>
            </div>
            <div class="col-12 col-md-6">
              <small class="d-flex justify-content-between mb-1"><span>الأذكار</span><span>${goals.adhkar}%</span></small>
              <div class="progress" style="height: 8px;"><div class="progress-bar bg-primary" style="width: ${goals.adhkar}%;"></div></div>
            </div>
          </div>

          <div class="d-flex gap-2 mt-4 pt-2 border-top">
            <button class="btn btn-sm btn-falak-outline" onclick="window.FalakStorage && window.FalakStorage.exportData()"><i class="fas fa-download me-1"></i> تصدير البيانات (Export)</button>
          </div>
        </div>
      `;
    }
  };
})();
