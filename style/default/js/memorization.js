/**
 * FALAK MEMORIZATION & PROGRESS TRACKER
 */
(function() {
  'use strict';

  window.FalakMemorization = {
    KEY: 'falak_memorization_progress',

    getProgress: function() {
      var data = localStorage.getItem(this.KEY);
      return data ? JSON.parse(data) : { memorizedSurahs: [], dailyGoal: 10, reviewedToday: 0 };
    },

    toggleSurahMemorized: function(surahId) {
      var prog = this.getProgress();
      var idx = prog.memorizedSurahs.indexOf(surahId);
      if (idx > -1) {
        prog.memorizedSurahs.splice(idx, 1);
      } else {
        prog.memorizedSurahs.push(surahId);
      }
      localStorage.setItem(this.KEY, JSON.stringify(prog));
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
