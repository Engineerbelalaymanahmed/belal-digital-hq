# دليل إدارة المحتوى (بدون لمس الكود)

كل التعديلات بتتم في ملفات `data/*.json` ومجلد `assets/`. من الموبايل: افتح الملف في GitHub، اضغط علامة القلم، عدّل، ثم Commit changes. بعد الحفظ بدقيقة الموقع يتحدث.
**انتبه:** كل عنصر في القائمة يتفصل عن اللي بعده بفاصلة `,` وآخر عنصر من غير فاصلة. أي غلطة فاصلة بتخلي الصفحة فاضية، والتحقق متاح بتشغيل `node scripts/validate.mjs`.

## 1) إضافة صورة
ارفعها على GitHub (Add file > Upload files) جوه المجلد المناسب، مثلًا `assets/certificates/cybersecurity/` أو `assets/projects/`. الأفضل تحويلها WebP وعرضها حوالي 1200px. بعدها اكتب مسارها في الملف، مثلًا `"image": "assets/certificates/cybersecurity/ceh.webp"`.

## 2) إضافة شهادة (`data/certificates.json`)
أضف جوه القوس `[ ]` (أي حقل تسيبه فاضي عادي، بس `id` و`title` لازم):
```json
{"id":"ceh","title":"اسم الشهادة","issuer":"الجهة","date":"2025-03","category":"Cybersecurity","credentialId":"","credentialUrl":"https://...","image":"assets/certificates/cybersecurity/ceh.webp","description":"","skills":["OSINT"],"featured":true}
```
التصنيفات والفلتر بيظهروا تلقائيًا من قيمة `category`. `featured:true` بتظهرها أولًا. لو فوق 24 شهادة بيظهر زر "عرض المزيد".

## 3) إضافة مشروع (`data/projects.json`)
```json
{"id":"p1","title":"اسم المشروع","slug":"project-one","category":"Research","shortDescription":"سطر واحد","fullDescription":"","thumbnail":"assets/projects/p1.webp","technologies":["Linux"],"year":"2025","featured":true}
```
`slug` لازم يكون إنجليزي بدون مسافات ومش متكرر. المشاريع المميزة بتظهر في الرئيسية.

## 4) إضافة دراسة حالة (Case Study)
جوه نفس المشروع أضف `caseStudy` وكل مرحلة اختيارية:
`"caseStudy":{"problem":"","research":"","strategy":"","planning":"","execution":"","technology":"","result":"","lessons":""}`

## 5) حساب سوشيال جديد (`data/social-links.json`)
```json
{"id":"medium","platform":"Medium","url":"https://medium.com/@name","username":"@name","category":"Content","type":"professional","icon":"M"}
```
`type` إما `professional` أو `personal`. `featured:true` بتظهره في الرئيسية والفوتر. أي `category` جديدة بتظهر كقسم لوحدها.

## 6) تغيير النبذة، البريد، الهاتف، الشعار (`data/profile.json`)
- النبذة: `bio.short` / `official` / `medium` / `long`، وفي كل واحدة `en` و`ar`.
- البريد والهاتف والواتساب: جوه `contact.professional` و`contact.personal`.
- الشعار (Tagline): `tagline.en` و`tagline.ar`، كل واحد من جزئين (سطر أول وسطر تاني).
- خبرات ومسيرة: `experience` و`journey` (قائمة عناصر `{"title","period","text"}`)، وهما مخفيين وهما فاضيين.

## 7) إضافة خدمة (`data/services.json`)
`{"id":"x","title":{"en":"Title","ar":"العنوان"},"text":{"en":"Description","ar":"الوصف"}}`

## 8) المهارات (`data/skills.json`) واللغة
أضف مهارة جوه `items` بصيغة `{"en":"..","ar":".."}`. أي نص ناقص عربي بيظهر بالإنجليزي. نصوص الواجهة (الأزرار والعناوين) في `data/i18n.json`.
