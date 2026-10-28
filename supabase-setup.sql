-- ========================================================
-- 8/D SINIFI ÖDEV PORTALI - SUPABASE VERİTABANI KURULUMU
-- Bu SQL kodunu Supabase Dashboard > SQL Editor alanına
-- yapıştırıp "RUN" butonuna basarak 1 saniyede çalıştırabilirsiniz.
-- ========================================================

-- 1. Ödev tablosunu oluştur
CREATE TABLE IF NOT EXISTS public.homework (
  id TEXT PRIMARY KEY,
  topic TEXT NOT NULL,
  title TEXT NOT NULL,
  course TEXT NOT NULL,
  subject_type TEXT NOT NULL,
  teacher TEXT NOT NULL,
  description TEXT,
  start_date TEXT,
  due_date TEXT NOT NULL,
  display_due_date TEXT,
  books_and_pages JSONB DEFAULT '[]'::jsonb,
  subtasks JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Güvenlik İzinleri (RLS)
ALTER TABLE public.homework ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow Public Read" ON public.homework;
CREATE POLICY "Allow Public Read" ON public.homework 
FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow Public Insert" ON public.homework;
CREATE POLICY "Allow Public Insert" ON public.homework 
FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow Public Update" ON public.homework;
CREATE POLICY "Allow Public Update" ON public.homework 
FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow Public Delete" ON public.homework;
CREATE POLICY "Allow Public Delete" ON public.homework 
FOR DELETE USING (true);

-- 3. Canlı Yayın (Realtime) Aboneliği Aç
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'homework'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.homework;
  END IF;
END $$;

-- 4. 8/D Sınıfı Mevcut Tüm Ödevlerini Tabloya Yükle
INSERT INTO public.homework (
  id, topic, title, course, subject_type, teacher, description, 
  start_date, due_date, display_due_date, books_and_pages, subtasks
) VALUES 
(
  'hw-1',
  'LGS-W5',
  'LGS-W5 İngilizce Testleri',
  'ENGLISH LGS 8/D',
  'ENGLISH LGS',
  'ŞULE ARTIK',
  'Dear students, the upcoming tests will have been completed.\n\n- Team ELT - English Ahead Test Book: Unit 3 Vocabulary Test + Practice Test 1-2 (up to pg 57)\n\nHave a nice week!',
  '2026-10-16T08:00:00',
  '2026-10-22T23:00:00',
  '22 Ekim 2026 Perşembe, 23:00',
  '["Team ELT - English Ahead Test Book: Unit 3 & sf. 57''ye kadar"]'::jsonb,
  '[{"id":"hw-1-1","title":"Team ELT - Unit 3 Vocabulary Test","completed":false},{"id":"hw-1-2","title":"English Ahead Practice Test 1","completed":false},{"id":"hw-1-3","title":"English Ahead Practice Test 2 (sf. 57''ye kadar)","completed":false}]'::jsonb
),
(
  'hw-2',
  '8. Sınıf Din Kültürü Ödevi',
  'Yaprak Test & Bumerang Ödevi',
  'DİN KÜLTÜRÜ VE AHLAK BİLGİSİ 8/D',
  'DİN KÜLTÜRÜ',
  'MERVE DUMAN GÜNGÖR',
  'Merhaba sevgili çocuklar, bu haftaki ödeviniz Yaprak testinizden sayfa 15 e kadar ve Bumerang sayfa 55 e kadar çözünüz. Kolaylıklar dilerim.',
  '2026-10-15T08:00:00',
  '2026-10-22T23:00:00',
  '22 Ekim 2026 Perşembe, 23:00',
  '["Yaprak Test: sf. 15''e kadar", "Bumerang: sf. 55''e kadar"]'::jsonb,
  '[{"id":"hw-2-1","title":"Yaprak Test (Sayfa 15''e kadar tamamla)","completed":false},{"id":"hw-2-2","title":"Bumerang (Sayfa 55''e kadar tamamla)","completed":false}]'::jsonb
),
(
  'hw-3',
  'Hafta sonu ödevi',
  'Çanta Kitapçığı Soru Çözümü',
  'FEN BİLİMLERİ 8/D',
  'FEN BİLİMLERİ',
  'HANİFE GAYE ALAY',
  'Merhaba çocuklar hafta sonu ödeviniz çanta kitapçığından 68-88 (66-88) arası. Kolay gelsin.',
  '2026-10-14T08:00:00',
  '2026-10-19T23:00:00',
  '19 Ekim 2026 Pazartesi, 23:00',
  '["Çanta Soru Bankası: Sayfa 66-88 arası"]'::jsonb,
  '[{"id":"hw-3-1","title":"Çanta Kitapçığı / Soru Bankası sf. 66-76","completed":false},{"id":"hw-3-2","title":"Çanta Kitapçığı / Soru Bankası sf. 77-88","completed":false}]'::jsonb
),
(
  'hw-4',
  'İnkilap tarihi Prestij soru bankası ödevi(Nartest)',
  'Prestij Soru Bankası (Nartest)',
  'T.C. İNKILAP TARİHİ VE ATATÜRKÇÜLÜK 8/D',
  'İNKILAP TARİHİ',
  'BÜŞRA CAN',
  'Sevgili öğrencim prestij yayınları 39-44 arası ödevinizdir. İyi çalışmalar dilerim.',
  '2026-10-15T08:00:00',
  '2026-10-19T23:00:00',
  '19 Ekim 2026 Pazartesi, 23:00',
  '["Prestij Yayınları (Nartest): Sayfa 39-44"]'::jsonb,
  '[{"id":"hw-4-1","title":"Prestij Yayınları sayfa 39-44 arası testleri çöz","completed":false}]'::jsonb
),
(
  'hw-5',
  'MLJ HOMEWORK WEEK 5',
  'MLJ Weekend Mission (Week 5)',
  'ENGLISH MAIN COURSE 8/D',
  'ENGLISH MAIN COURSE',
  'ŞENNUR DURSUN',
  'Hi there :)\nYour weekend mission is here! Please complete your homework before Monday - MLJ Pages 18-21.\n“I forgot” is NOT an acceptable answer! :)\nHave a great weekend, enjoy yourselves,\nSee you on Monday!',
  '2026-10-16T08:00:00',
  '2026-10-19T08:00:00',
  '19 Ekim 2026 Pazartesi, 08:00 (Sabah)',
  '["MLJ Workbook: Pages 18-21"]'::jsonb,
  '[{"id":"hw-5-1","title":"MLJ Book Page 18-19","completed":false},{"id":"hw-5-2","title":"MLJ Book Page 20-21","completed":false}]'::jsonb
),
(
  'hw-6',
  'Matematik ödevi',
  'Startfen Kurumsal 5. Hafta Çalışmaları',
  'MATEMATİK 8/D',
  'MATEMATİK',
  'ÜLKÜ TANRIVERDİ GÜVEN',
  'Ödeviniz startfen kurumsal 5. Hafta çalışmalarıdır. Pazartesi sabahına kadar hazır ediniz.',
  '2026-10-16T08:00:00',
  '2026-10-19T08:00:00',
  '19 Ekim 2026 Pazartesi, 08:00 (Sabah)',
  '["Startfen Kurumsal: 5. Hafta"]'::jsonb,
  '[{"id":"hw-6-1","title":"Startfen Kurumsal 5. Hafta Testleri ve Etkinlikleri","completed":false}]'::jsonb
),
(
  'hw-7',
  '8.sınıflar Din Ödevi',
  'Soru Bankası & LGS Çıkmış Sorular',
  'DİN KÜLTÜRÜ VE AHLAK BİLGİSİ 8/D',
  'DİN KÜLTÜRÜ',
  'MERVE DUMAN GÜNGÖR',
  'Merhaba sevgili çocuklar bu haftaki din ödeviniz soru bankası sayfa 25 -36 arasıdır. Dersimize Lgs çalışma kitabı çıkmış sorular kitabını getirmeyi unutmayınız.',
  '2026-10-10T08:00:00',
  '2026-10-17T23:00:00',
  '17 Ekim 2026 Cumartesi, 23:00 (Bugün!)',
  '["Din Soru Bankası: Sayfa 25-36", "LGS Çıkmış Sorular Kitabı"]'::jsonb,
  '[{"id":"hw-7-1","title":"Din Soru Bankası sayfa 25-36 arası çözümü","completed":false},{"id":"hw-7-2","title":"LGS çalışma kitabı çıkmış sorular kitabını çantaya koy","completed":false}]'::jsonb
),
(
  'hw-8',
  'Hafta içi ödevi',
  'Bumerang Haftalık 5. Deneme',
  'FEN BİLİMLERİ 8/D',
  'FEN BİLİMLERİ',
  'HANİFE GAYE ALAY',
  'Merhaba çocuklar Hafta içi ödeviniz Bumerang haftalık deneme kitabı, 5. Deneme. Kolay gelsin ❤️',
  '2026-10-12T08:00:00',
  '2026-10-16T23:00:00',
  '16 Ekim 2026 Cuma, 23:00',
  '["Bumerang Haftalık Deneme: 5. Deneme"]'::jsonb,
  '[{"id":"hw-8-1","title":"Bumerang 5. Deneme Sınavını çöz ve yanlışlarını kontrol et","completed":false}]'::jsonb
),
(
  'hw-9',
  'Türkçe Paragraf & Soru Bankası',
  'ZOOM Paragraf & SUPER 8A Testleri',
  'TÜRKÇE 8/D',
  'TÜRKÇE',
  'TÜRKÇE ZÜMRESİ 8/D',
  'ZOOM PARAGRAF sayfa 51-56 ve SUPER 8A sayfa 84-90 testleri tamamlanacak.',
  '2026-10-15T08:00:00',
  '2026-10-19T23:00:00',
  '19 Ekim 2026 Pazartesi, 23:00',
  '["ZOOM Paragraf: sf. 51-56", "SUPER 8A: sf. 84-90"]'::jsonb,
  '[{"id":"hw-9-1","title":"ZOOM Paragraf sf. 51-56 (Soruları süre tutarak çöz)","completed":false},{"id":"hw-9-2","title":"SUPER 8A sf. 84-90 (Testleri tamamla)","completed":false}]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  topic = EXCLUDED.topic,
  description = EXCLUDED.description,
  due_date = EXCLUDED.due_date,
  display_due_date = EXCLUDED.display_due_date,
  books_and_pages = EXCLUDED.books_and_pages,
  subtasks = EXCLUDED.subtasks;
