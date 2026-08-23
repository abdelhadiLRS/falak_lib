# FALAK | فلك — Phase 1 Complete Audit Report

## 1. خريطة المعمارية (Architectural Map)
مشروع **Falak (فلك)** يعتمد على بنية مسبقة احترافية وخفيفة بلغة **PHP Monolithic** بنظام القوالب الخاصة ومحرك واجهات متكامل بدون الاعتماد على أطر عمل ثقيلة مثل Node.js / Next.js / React:
- **الصفحة الرئيسية والراوتر (Entrypoint & Routing):**
  - `index.php` يمثل المدخل الرئيسي الذي يتصل بـ `includes/function.php` والـ Class الرئيسي `QuranForAll` الموجود في `includes/class.php`.
  - `.htaccess` يدير قواعد إعادة كتابة العناوين (URL Rewriting / Clean URLs) لصفحات السور، القراء، التفاسير، الترجمات والكتب.
- **طبقة البيانات وواجهات البرمجة (Data & API Layer):**
  - `api/quran/` يحتوي على محرك القرأن الكريم، بيانات السور، التفاسير (`includes/tafseer/`) والترجمات (`includes/translate/`) والـ Uthmani text (`includes/uthmani/`).
  - `api/books/` يحتوي على محرك المكتبة الإسلامية، التصنيفات والكتب (`includes/categories.php`, `includes/books-1.php`, الخ).
- **طبقة العرض والقوالب (Presentation & Templates Layer):**
  - `style/default/` و `style/blue/` يحتويا على قوالب HTML (`header.htm`, `content.htm`, `hero.htm`, `footer.htm`).
  - `style/default/js/` يحتوي على ملفات JavaScript الموديلية الخفيفة (`adhkar.js`, `audio-player.js`, `bookmarks.js`, `command-palette.js`, `dashboard.js`, `memorization.js`, `quran.js`, `falak-theme.js`).

---

## 2. الملفات الأساسية (Core Files)
- `index.php`: النقطة المباشرة لعرض الواجهة الرئيسية.
- `.htaccess`: قواعد توجيه العناوين وإعدادات التخزين الموقت (Expires Caching).
- `includes/config.php`: المتغيرات والإعدادات الثابتة (SITE_NAME, THEME, LANGUAGE, CACHE, الخ).
- `includes/function.php`: إعداد البيئة الشاملة، تهيئة اللغات، التعامل مع MobileDetect، ووظائف التصفح والتصفح المرقّم (Pagination).
- `includes/class.php`: المحرك الرئيسي `QuranForAll` الذي يدير عرض السور، القراءات، التفاسير، الترجمات والكتب واستدعاء القوالب.
- `includes/MobileDetect.php`: مكتبة اكتشاف نوع الجهاز (الهاتف/اللوحي/الحاسوب).
- `api/quran/quran-api.php`: الكلاس `QuranForAll_API` الخاص بواجهة القرآن وجميع بيانات القراء والسور والتفاسير واللغات ومخطط صفحات المصحف الشريف (604 صفحة).
- `api/books/book-api.php`: الكلاس `MUSLIM_LIBRARY` الخاص بالمكتبة الإسلامية والبحث والكتب والتصنيفات.

---

## 3. واجهات البرمجة (APIs)
- `/api/quran/index.php`:
  - `action=surah`: قائمة كافة سور القرآن الكريم والبيانات الخاصة بكل سورة.
  - `action=languages`: قائمة اللغات المتاحة للترجمة والبيانات التابعة لها.
  - `action=readers`: قائمة قراء السور الكاملة صوتياً (37 قارئ).
  - `action=ayah_readers`: قائمة قراء الآية آية (16 قارئ).
  - `action=surah_loop`: نص السورة بالرسم العثماني مع الترجمات المحددة.
  - `action=tafseer`: قائمة كتب التفاسير المتاحة (ابن كثير، الجلالين، الطبري، القرطبي، السعدي).
  - `action=tafseer_view`: نص التفسير لآية وسورة معينة.
- `/api/books/index.php`:
  - `action=languages`: اللغات المتاحة للمكتبة الإسلامية.
  - `action=categories`: التصنيفات والتصنيفات الفرعية.
  - `action=category`: تفاصيل تصنيف معين والكتب التابعة له.
  - `action=books`: استرجاع بيانات كتب محددة بالـ IDs.
  - `action=book`: تفاصيل كتاب محدد.
  - `action=rand`: كتب عشوائية لتصنيف معين.
  - `action=search`: محرك البحث في عناوين وملخصات ومؤلفي الناشرين للكتب.

---

## 4. مصادر البيانات (Data Sources)
- **النص القرآني**: ملفات PHP تحتوي على أراي `$q` بالرسم العثماني في `api/quran/includes/uthmani/` (من `1.php` إلى `114.php`).
- **التفاسير**: ملفات التفاسير المقسمة لكل سورة وآية في `api/quran/includes/tafseer/` (التفاسير الخمسة المعتمدة).
- **الترجمات**: ترجمات معتمدة لأكثر من 40 لغة عالمية في `api/quran/includes/translate/`.
- **الصوتيات**: مصادر الصوتيات تعتمد على خوادم موثوقة مثل EveryAyah و Mp3Quran و QuranicAudio و TVQuran.
- **الكتب الإسلامية**: بيانات موثوقة ومفهرسة محلياً بملفات PHP متكاملة (`books-1.php`, `books-2.php`, `books-3.php`, `categories.php`).

---

## 5. جميع الصفحات (Pages & Routes)
- **الرئيسية (`action=home` / `/`)**: تعرض المحرك العام للقرآن والتفسير والترجمات والكتب المختارة.
- **فهرس القرآن الكريم (`action=quran` / `quran.html`)**: عرض السور وإمكانية الوصول السريع.
- **صفحة السورة (`surah-{id}.html` / `index.php?surah={id}`)**: القارئ التفاعلي للسورة.
- **صفحة الآيات المحددة (`view-{surah},from-{f},to-{t}.html`)**: عرض نطاق معين من الآيات.
- **صفحة القارئ والمحاكة الصوتية (`reader-{surah}-{reader_id}.html`)**: الاستماع للسورة بصوت قارئ محدد.
- **صفحة الترجمات واللغات (`action=translate`, `action=languages`)**: تصفح القرآن مترجماً للغات العالم.
- **صفحة التفسير (`action=tafseer`)**: تصفح التفسير المباشر للسور والآيات.
- **المكتبة الإسلامية والكتب (`action=books`, `action=book`, `action=books_category`)**: تصفح الكتب والتحميل والقراءة.

---

## 6. وظائف JavaScript (JS Functions & Modules)
- `style/default/js/falak-theme.js`: إدارة Dark Mode وتطبيق متغيرات الألوان والتصميم والتفضيلات المخزنة.
- `style/default/js/quran.js`: التفاعل مع قارئ القرآن وإعدادات الخطوط وعرض التفاسير والترجمات.
- `style/default/js/audio-player.js`: مشغل الصوت العالمي (Global Audio Player) مع التحكم بالسرعات، الإيقاف والتكرار وتظليل الآية الحالية.
- `style/default/js/command-palette.js`: البحث السريع عبر الاختصار `Ctrl + K`.
- `style/default/js/bookmarks.js`: حفظ العلامات المرجعية للآيات والكتب والصفحات محلياً via LocalStorage.
- `style/default/js/memorization.js`: متابعة وتتبع نسبة الحفظ والمراجعة اليومية.
- `style/default/js/adhkar.js`: الأذكار التفاعلية مع العداد والتنقل وإعادة التكرار.
- `style/default/js/dashboard.js`: إدارة "فلك اليوم" والتقدم في الأهداف اليومية والشريط التفصيلي.

---

## 7. نظام القوالب (Template System)
يعتمد المشروع على نظام قوالب خفيف ومرن ومباشر بدون تعقيد:
- `header.htm`: ترويسة الصفحة والهيدر المتجاوب والشعار والوسوم وروابط CSS وإعدادات RTL.
- `hero.htm`: الهيرو الرئيسي للبحث السريع والانتقال المباشر.
- `content.htm`: متن المحتوى الرئيسي التفاعلي الذي يستبدل الديناميكيات بناءً على الـ Action.
- `footer.htm`: التذييل، المشغل الصوتي العائم، المودالات ومكتنزات JavaScript.

---

## 8. نظام CSS (CSS System & Design System)
- المشروع يعتمد حالياً على Bootstrap المتجاوب مدعوماً بمتغيرات CSS الحديثة (CSS Variables) المخصصة ببادئة `--falak-*`:
  - `--falak-primary`, `--falak-secondary`, `--falak-background`, `--falak-surface`, `--falak-text`, `--falak-muted`, `--falak-border`, `--falak-radius`, `--falak-shadow`.
- يدعم الوضع الداكن (Dark Mode) والوضع الفاتح (Light Mode) بشكل سلس ومنظم عبر الخاصية `data-theme="dark"`.

---

## 9. نظام اللغات (Language System)
- يدعم النظام تعدد اللغات بشكل كامل مع التركيز على اللغة العربية كلغة أساسية (`ar.php`) والإنجليزية (`en.php`) وغيرهما.
- يحتوي على مصفوفة الترجمات `$Q_W` واستدعاء وظيفة `word('key')` ديناميكياً لتوفير النصوص المترجمة للواجهات.

---

## 10. الوظائف الحالية (Current Functionalities)
- عرض القرآن الكريم بالرسم العثماني المقسم آية بآية وصفحة بصفحة وسورة بسورة.
- الاستماع والتلاوات الصوتية للسور والآيات مع قائمة من أشهر القراء.
- عرض التفاسير المعتمدة الخمسة والترجمات لأكثر من 40 لغة.
- تصفح المكتبة الإسلامية والبحث بالكتب والتحميل والتصنيف.
- محرك أذكار تفاعلي مع العداد المباشر.
- نظام العلامات المرجعية والبحث السريع Ctrl+K والمظهر الداكن وتتبع الحفظ.

---

## 11. نقاط الضعف (Weaknesses)
- عدم وجود وحدات مستقلة (Data Providers) مخصصة لقسم الحديث النبوي والتيم لاين التفاعلي للسيرة النبوية بصيغ structured local datasets (JSON).
- غياب خيارات الاستيراد والتصدير (Export/Import JSON) للعلامات المرجعية وسجل الحفظ والأهداف اليومية محلياً.

---

## 12. نقاط القوة (Strengths)
- خفة استثنائية وسرعة فائقة في التحميل الأول (Fast First Load).
- عدم وجود الاعتماديات الثقيلة (No Heavy Node Modules / No Build Overhead).
- معمارية PHP نظيفة ومستقرة تماماً متوافقة مع PHP 8.x.
- محرك APIs محلي متكامل ودقيق للقرآن والمكتبة.

---

## 13. التعارضات (Conflicts)
- تم التحقق من الكود ولا توجد أخطاء PHP Warnings أو أخطاء Syntax أو تعارضات كودية في النظام الحالي.

---

## 14. فرص التطوير (Evolution Opportunities)
- إضافة طبقة Data Provider محلي للحديث الشريف والسيرة النبوية الشريفة بنفس مرونة ونقاء الكود الحالي.
- إمكانية إضافة وظيفة استيراد وتصدير النسخ الاحتياطية للبيانات المحلية للـ LocalStorage.

---

## 15. الميزات التي يمكن إضافتها دون تغيير البنية (Zero-Architectural-Change Features)
- تحسين واجهة القارئ وإعدادات الخط والتباعد والتظليل التفاعلي للآيات.
- إضافة ميزة التصدير والاستيراد للنسخ الاحتياطية في LocalStorage.
- إضافة أدوات تفاعلية (Daily Goals / Gamification البسيط).

---

## 16. الميزات التي تحتاج تعديلات Backend (Backend Required Features)
- إضافة Data Provider و Endpoint للحديث والسيرة والجدول الزمني (Timeline) بصيغة JSON خفيفة وموثوقة ببيئة PHP المحلية.

---

## 17. الميزات التي تحتاج JavaScript فقط (Pure JS Features)
- تحسين تجربة الـ Audio Player وإدارة سرعات التشغيل وتتبع تقدم الاستماع.
- تحسين خيارات القارئ والتخصيص الفوري للخطوط والتكبير والتصغير.
- محرك الأذكار والتسبيح والعداد التفاعلي.

---

## 18. خطة التطوير المرحلية الموصى بها (Phased Roadmap)
- **Phase 1 (مكتملة الآن)**: التقرير الشامل وAudit المعمارية والكود.
- **Phase 2 — Stabilization & Fine-tuning**: التحقق الشامل وإصلاح أي ملاحظات طفيفة.
- **Phase 3 — Falak Design System**: صقل متغيرات CSS والتصميم.
- **Phase 4-5 — Navigation & Homepage**: صقل وتنسيق الواجهة الرئيسية والملاحة التفاعلية.
- **Phase 6-10 — Reader, Audio, Search & Tafsir**: تعزيز تجربة القارئ والمشغل والبحث الشامل والتدبر.
- **Phase 11-16 — Memorization, Hadith, Seerah, Adhkar & Daily Goals**: تزويد وحدات الحديث والسيرة والأذكار والأهداف بشكل خفيف ومستقل.
- **Phase 17-21 — Tools, PWA, SEO & Final QA**: تجهيز الـ PWA، تعزيز الـ Accessibility، واختبارات الأداء الشاملة.
