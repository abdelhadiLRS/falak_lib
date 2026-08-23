/**
 * FALAK THEME & CORE INTERACTIVE JS
 */
(function() {
  'use strict';

  // Apply saved theme immediately before render
  var savedTheme = localStorage.getItem('falak_theme') || 'light';
  if (savedTheme === 'system') {
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  } else {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  window.Falak = window.Falak || {};

  window.Falak.setTheme = function(theme) {
    localStorage.setItem('falak_theme', theme);
    if (theme === 'system') {
      var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  };

  window.Falak.toggleTheme = function() {
    var current = document.documentElement.getAttribute('data-theme') || 'light';
    var next = current === 'dark' ? 'light' : 'dark';
    window.Falak.setTheme(next);
  };
})();
