/**
 * FALAK MEMORIZATION & PROGRESS TRACKER
 */
(function() {
  'use strict';

  window.FalakMemorization = {
    KEY: 'falak_memorization_progress',

    getProgress: function() {
      var data = localStorage.getItem(this.KEY);
      return data ? JSON.parse(data) : {
        memorizedSurahs: [],
        ayahLevels: {},
        dailyGoalAyat: 10,
        reviewedToday: 0,
        streak: 1,
        lastReviewDate: new Date().toISOString().split('T')[0]
      };
    },

    saveProgress: function(prog) {
      localStorage.setItem(this.KEY, JSON.stringify(prog));
      if (window.FalakStorage) {
        localStorage.setItem(window.FalakStorage.NAMESPACES.MEMORIZATION, JSON.stringify(prog));
      }
    },

    setAyahLevel: function(surahId, ayahNum, level) {
      var prog = this.getProgress();
      var key = surahId + ':' + ayahNum;
      prog.ayahLevels[key] = {
        level: level, // 1: Weak, 2: Good, 3: Excellent
        lastReviewed: new Date().toISOString()
      };
      this.saveProgress(prog);
    },

    toggleSurahMemorized: function(surahId) {
      var prog = this.getProgress();
      var idx = prog.memorizedSurahs.indexOf(surahId);
      if (idx > -1) {
        prog.memorizedSurahs.splice(idx, 1);
      } else {
        prog.memorizedSurahs.push(surahId);
      }
      this.saveProgress(prog);
      return idx === -1;
    },

    isSurahMemorized: function(surahId) {
      var prog = this.getProgress();
      return prog.memorizedSurahs.indexOf(surahId) > -1;
    },

    getOverallPercentage: function() {
      var prog = this.getProgress();
      return Math.round((prog.memorizedSurahs.length / 114) * 100);
    }
  };
})();
