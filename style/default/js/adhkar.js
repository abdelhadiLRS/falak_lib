/**
 * FALAK ADHKAR & COUNTER MODULE
 */
(function() {
  'use strict';

  window.FalakAdhkar = {
    KEY: 'falak_adhkar_counts',

    categories: [
      { id: 'morning', title: 'أذكار الصباح' },
      { id: 'evening', title: 'أذكار المساء' },
      { id: 'sleep', title: 'أذكار النوم' },
      { id: 'prayer', title: 'أذكار الصلاة' },
      { id: 'general', title: 'أدعية وأذكار متنوعة' }
    ],

    items: {
      morning: [
        { id: 'm1', text: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ', count: 1 },
        { id: 'm2', text: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ', count: 1 },
        { id: 'm3', text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ: عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ', count: 3 }
      ],
      evening: [
        { id: 'e1', text: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ', count: 1 },
        { id: 'e2', text: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ', count: 1 }
      ]
    },

    getCounts: function() {
      var data = localStorage.getItem(this.KEY);
      return data ? JSON.parse(data) : {};
    },

    increment: function(dhikrId, maxTarget) {
      var counts = this.getCounts();
      var current = (counts[dhikrId] || 0) + 1;
      counts[dhikrId] = current;
      localStorage.setItem(this.KEY, JSON.stringify(counts));
      return current;
    },

    reset: function(dhikrId) {
      var counts = this.getCounts();
      counts[dhikrId] = 0;
      localStorage.setItem(this.KEY, JSON.stringify(counts));
      return 0;
    }
  };
})();
