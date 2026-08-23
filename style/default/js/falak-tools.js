/**
 * FALAK MODULAR ISLAMIC TOOLS HOOK
 * Loose-coupled module manager for Prayer Times, Qibla, Hijri Calendar & Tasbeeh
 */
(function() {
  'use strict';

  window.FalakTools = {
    modules: {},

    register: function(name, moduleObj) {
      if (!name || typeof moduleObj !== 'object') return;
      this.modules[name] = moduleObj;
    },

    get: function(name) {
      return this.modules[name] || null;
    },

    list: function() {
      return Object.keys(this.modules);
    }
  };
})();
