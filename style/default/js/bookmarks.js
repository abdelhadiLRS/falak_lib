/**
 * FALAK BOOKMARKS, FAVORITES & HISTORY MANAGER
 */
(function() {
  'use strict';

  window.FalakStorage = {
    KEYS: {
      HISTORY: 'falak_reading_history',
      BOOKMARKS: 'falak_bookmarks',
      FAVORITES: 'falak_favorites',
      LAST_READ: 'falak_last_read'
    },

    saveLastRead: function(surahId, surahName, ayahNum, url) {
      var item = {
        surah: surahId,
        surahName: surahName,
        ayah: ayahNum || 1,
        url: url || window.location.href,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(this.KEYS.LAST_READ, JSON.stringify(item));
      this.addHistory(item);
    },

    getLastRead: function() {
      var data = localStorage.getItem(this.KEYS.LAST_READ);
      return data ? JSON.parse(data) : null;
    },

    addHistory: function(item) {
      var history = this.getHistory();
      // Remove duplicate if exists
      history = history.filter(function(h) {
        return !(h.surah === item.surah && h.ayah === item.ayah);
      });
      history.unshift(item);
      if (history.length > 20) history.pop();
      localStorage.setItem(this.KEYS.HISTORY, JSON.stringify(history));
    },

    getHistory: function() {
      var data = localStorage.getItem(this.KEYS.HISTORY);
      return data ? JSON.parse(data) : [];
    },

    toggleBookmark: function(surahId, ayahNum, note) {
      var bookmarks = this.getBookmarks();
      var key = surahId + ':' + ayahNum;
      var index = bookmarks.findIndex(function(b) { return b.key === key; });

      if (index > -1) {
        bookmarks.splice(index, 1);
      } else {
        bookmarks.push({
          key: key,
          surah: surahId,
          ayah: ayahNum,
          note: note || '',
          timestamp: new Date().toISOString()
        });
      }
      localStorage.setItem(this.KEYS.BOOKMARKS, JSON.stringify(bookmarks));
      return index === -1; // returns true if added, false if removed
    },

    getBookmarks: function() {
      var data = localStorage.getItem(this.KEYS.BOOKMARKS);
      return data ? JSON.parse(data) : [];
    },

    isBookmarked: function(surahId, ayahNum) {
      var key = surahId + ':' + ayahNum;
      var bookmarks = this.getBookmarks();
      return bookmarks.some(function(b) { return b.key === key; });
    }
  };
})();
