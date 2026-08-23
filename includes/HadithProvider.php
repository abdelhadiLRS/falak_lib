<?php
/**
 * FALAK HADITH PROVIDER
 * Modular local Hadith dataset provider
 */
class HadithProvider {
    private static $hadiths = [
        [
            'id' => 1,
            'book' => 'صحيح البخاري',
            'chapter' => 'كتاب بدء الوحي',
            'narrator' => 'عمر بن الخطاب رضي الله عنه',
            'text' => 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا، أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا، فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ.',
            'source' => 'صحيح البخاري — رقم 1',
            'reference' => 'البخاري (1)، مسلم (1907)'
        ],
        [
            'id' => 2,
            'book' => 'صحيح مسلم',
            'chapter' => 'كتاب الإيمان',
            'narrator' => 'عمر بن الخطاب رضي الله عنه',
            'text' => 'فَأَخْبِرْنِي عَنِ الإِيمَانِ، قَالَ: أَنْ تُؤْمِنَ بِاللَّهِ، وَمَلاَئِكَتِهِ، وَكُتُبِهِ، وَرُسُلِهِ، وَالْيَوْمِ الآخِرِ، وَتُؤْمِنَ بِالْقَدَرِ خَيْرِهِ وَشَرِّهِ.',
            'source' => 'صحيح مسلم — رقم 8',
            'reference' => 'مسلم (8)'
        ],
        [
            'id' => 3,
            'book' => 'صحيح البخاري',
            'chapter' => 'كتاب العلم',
            'narrator' => 'معاوية بن أبي سفيان رضي الله عنهما',
            'text' => 'مَنْ يُرِدِ اللَّهُ بِهِ خَيْرًا يُفَقِّهْهُ فِي الدِّينِ.',
            'source' => 'صحيح البخاري — رقم 71',
            'reference' => 'البخاري (71)، مسلم (1037)'
        ]
    ];

    public static function getAll() {
        return self::$hadiths;
    }

    public static function getById($id) {
        foreach (self::$hadiths as $h) {
            if ($h['id'] == $id) return $h;
        }
        return null;
    }

    public static function getRandom() {
        $idx = array_rand(self::$hadiths);
        return self::$hadiths[$idx];
    }
}
?>
