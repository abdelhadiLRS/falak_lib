/**
 * FALAK ADHKAR & COUNTER MODULE
 */
(function() {
  'use strict';

  window.FalakAdhkar = {
    KEY: 'falak_adhkar_counts',

    getCounts: function() {
      var data = localStorage.getItem(this.KEY);
      return data ? JSON.parse(data) : {};
    },

    increment: function(dhikrId) {
      var counts = this.getCounts();
      counts[dhikrId] = (counts[dhikrId] || 0) + 1;
      localStorage.setItem(this.KEY, JSON.stringify(counts));
      return counts[dhikrId];
    },

    reset: function(dhikrId) {
      var counts = this.getCounts();
      counts[dhikrId] = 0;
      localStorage.setItem(this.KEY, JSON.stringify(counts));
      return 0;
    }
  };
})();
