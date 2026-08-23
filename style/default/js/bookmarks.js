/**
 * FALAK UNIFIED STORAGE & BACKUP MANAGER
 * Schema Version 1.0.0
 */
(function() {
  'use strict';

  window.FalakStorage = {
    schemaVersion: '1.0.0',

    NAMESPACES: {
      SETTINGS: 'falak.settings',
      BOOKMARKS: 'falak.bookmarks',
      FAVORITES: 'falak.favorites',
      HISTORY: 'falak.history',
      MEMORIZATION: 'falak.memorization',
      GOALS: 'falak.goals',
      AUDIO: 'falak.audio',
      LAST_READ: 'falak_last_read'
    },

    // Backward compatibility alias for legacy components
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
      localStorage.setItem(this.NAMESPACES.LAST_READ, JSON.stringify(item));
      this.addHistory(item);
    },

    getLastRead: function() {
      var data = localStorage.getItem(this.NAMESPACES.LAST_READ);
      return data ? JSON.parse(data) : null;
    },

    addHistory: function(item) {
      var history = this.getHistory();
      history = history.filter(function(h) {
        return !(h.surah === item.surah && h.ayah === item.ayah);
      });
      history.unshift(item);
      if (history.length > 30) history.pop();
      localStorage.setItem(this.NAMESPACES.HISTORY, JSON.stringify(history));
    },

    getHistory: function() {
      var data = localStorage.getItem(this.NAMESPACES.HISTORY);
      return data ? JSON.parse(data) : [];
    },

    toggleBookmark: function(data) {
      var bookmarks = this.getBookmarks();
      var isObj = data && typeof data === 'object';
      var key = isObj ? (data.surah + ':' + data.ayah) : arguments[0] + ':' + arguments[1];
      var index = bookmarks.findIndex(function(b) { return b.key === key; });

      if (index > -1) {
        bookmarks.splice(index, 1);
      } else {
        var item = isObj ? data : { surah: arguments[0], ayah: arguments[1] };
        item.key = key;
        item.timestamp = item.timestamp || new Date().toISOString();
        bookmarks.push(item);
      }
      localStorage.setItem(this.NAMESPACES.BOOKMARKS, JSON.stringify(bookmarks));
      return index === -1;
    },

    getBookmarks: function() {
      var data = localStorage.getItem(this.NAMESPACES.BOOKMARKS);
      return data ? JSON.parse(data) : [];
    },

    toggleFavorite: function(data) {
      var favorites = this.getFavorites();
      var isObj = data && typeof data === 'object';
      var key = isObj ? (data.surah + ':' + data.ayah) : arguments[0] + ':' + arguments[1];
      var index = favorites.findIndex(function(f) { return f.key === key; });

      if (index > -1) {
        favorites.splice(index, 1);
      } else {
        var item = isObj ? data : { surah: arguments[0], ayah: arguments[1] };
        item.key = key;
        item.timestamp = item.timestamp || new Date().toISOString();
        favorites.push(item);
      }
      localStorage.setItem(this.NAMESPACES.FAVORITES, JSON.stringify(favorites));
      return index === -1;
    },

    getFavorites: function() {
      var data = localStorage.getItem(this.NAMESPACES.FAVORITES);
      return data ? JSON.parse(data) : [];
    },

    exportData: function() {
      var backup = {
        schemaVersion: this.schemaVersion,
        createdAt: new Date().toISOString(),
        settings: JSON.parse(localStorage.getItem(this.NAMESPACES.SETTINGS) || '{}'),
        bookmarks: this.getBookmarks(),
        favorites: this.getFavorites(),
        history: this.getHistory(),
        memorization: JSON.parse(localStorage.getItem(this.NAMESPACES.MEMORIZATION) || '{}'),
        goals: JSON.parse(localStorage.getItem(this.NAMESPACES.GOALS) || '{}'),
        audioPreferences: JSON.parse(localStorage.getItem(this.NAMESPACES.AUDIO) || '{}')
      };

      var jsonStr = JSON.stringify(backup, null, 2);
      var blob = new Blob([jsonStr], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      var dateStr = new Date().toISOString().split('T')[0];
      a.href = url;
      a.download = 'falak-backup-' + dateStr + '.json';
      a.click();
      URL.revokeObjectURL(url);
    },

    importData: function(jsonContent) {
      try {
        var parsed = typeof jsonContent === 'string' ? JSON.parse(jsonContent) : jsonContent;
        if (!parsed.schemaVersion) {
          throw new Error('ملف النسخة الاحتياطية غير صالحة');
        }

        if (parsed.settings) localStorage.setItem(this.NAMESPACES.SETTINGS, JSON.stringify(parsed.settings));
        if (parsed.bookmarks) localStorage.setItem(this.NAMESPACES.BOOKMARKS, JSON.stringify(parsed.bookmarks));
        if (parsed.favorites) localStorage.setItem(this.NAMESPACES.FAVORITES, JSON.stringify(parsed.favorites));
        if (parsed.history) localStorage.setItem(this.NAMESPACES.HISTORY, JSON.stringify(parsed.history));
        if (parsed.memorization) localStorage.setItem(this.NAMESPACES.MEMORIZATION, JSON.stringify(parsed.memorization));
        if (parsed.goals) localStorage.setItem(this.NAMESPACES.GOALS, JSON.stringify(parsed.goals));
        if (parsed.audioPreferences) localStorage.setItem(this.NAMESPACES.AUDIO, JSON.stringify(parsed.audioPreferences));

        return { success: true, message: 'تمت استعادة البيانات بنجاح' };
      } catch(err) {
        return { success: false, message: err.message };
      }
    }
  };
})();
