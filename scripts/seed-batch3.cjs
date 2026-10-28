const https = require('https');

const SUPABASE_URL = 'pzwdxnokmpsgisnwgnbt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6d2R4bm9rbXBzZ2lzbndnbmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMxMDAzODYsImV4cCI6MjEwODY3NjM4Nn0.LG17M8ljDbbIxRPyTLe0Ot1jbtPSNq-YQjhnqz5xEcQ';

const newHomework = [
  {
    id: 'hw-23',
    topic: '[Aydın Dershanesi] ÜSLÜ İFADELER',
    title: 'Matematik Modül 1 Karma Test 1-2 ve Yeni Nesil Test',
    course: 'MATEMATİK 8/D',
    subject_type: 'MATEMATİK',
    teacher: 'MEHMET SADIK CAN',
    description: 'Matematik Modül 1 Karma test 1-2 ve Yeni Nesil Test',
    start_date: '2026-10-24T08:00:00',
    due_date: '2026-10-31T23:00:00',
    display_due_date: '31 Ekim 2026 Cumartesi, 23:00',
    books_and_pages: ['Matematik Modül 1: Karma Test 1-2', 'Yeni Nesil Test'],
    subtasks: [
      { id: 'hw-23-1', title: 'Matematik Modül 1 Karma Test 1 çöz', completed: false },
      { id: 'hw-23-2', title: 'Matematik Modül 1 Karma Test 2 çöz', completed: false },
      { id: 'hw-23-3', title: 'Yeni Nesil Test çöz ve kontrol et', completed: false }
    ]
  },
  {
    id: 'hw-24',
    topic: '[Aydın Dershanesi] KADER İNANCI',
    title: 'Dinlendiren Defter Sayfa 24-35',
    course: 'DİN KÜLTÜRÜ VE AHLAK BİLGİSİ 8/D',
    subject_type: 'DİN KÜLTÜRÜ',
    teacher: 'ZÜLEYHA EKER YANIK',
    description: 'Sevgili öğrencilerim bu haftaki ödeviniz Dinlendiren defterden 24- 35 arasıdır . Eksikleri olan öğrencilerimin bir an önce tamamlaması gerekmektedir.🌸',
    start_date: '2026-10-26T08:00:00',
    due_date: '2026-10-31T23:00:00',
    display_due_date: '31 Ekim 2026 Cumartesi, 23:00',
    books_and_pages: ['Dinlendiren Defter: Sayfa 24-35'],
    subtasks: [
      { id: 'hw-24-1', title: 'Dinlendiren Defter sayfa 24-35 arasını çöz', completed: false },
      { id: 'hw-24-2', title: 'Eksik din kültürü ödevlerini tamamla', completed: false }
    ]
  },
  {
    id: 'hw-25',
    topic: '[Aydın Dershanesi] KADER İNANCI',
    title: '1. Ünite Tekrarı & Yazılıya Hazırlık',
    course: 'DİN KÜLTÜRÜ VE AHLAK BİLGİSİ 8/D',
    subject_type: 'DİN KÜLTÜRÜ',
    teacher: 'ZÜLEYHA EKER YANIK',
    description: 'Sevgili öğrencilerim bu hafta din kültürü dersinde yazılıya hazırlık çalışması yapacağız. Eksik ödevleri olanların tamamlamasını istiyorum.Derse hazırlıklı bir şekilde 1. Uniteyi tekrar etmis olarak gelmenizi istiyorum.',
    start_date: '2026-10-19T08:00:00',
    due_date: '2026-10-24T23:00:00',
    display_due_date: '24 Ekim 2026 Cumartesi, 23:00',
    books_and_pages: ['1. Ünite Konu Tekrarı', 'Yazılıya Hazırlık'],
    subtasks: [
      { id: 'hw-25-1', title: '1. Üniteyi baştan tekrar et', completed: false },
      { id: 'hw-25-2', title: 'Eksik din kültürü çalışmalarını bitir', completed: false }
    ]
  },
  {
    id: 'hw-26',
    topic: '[Aydın Dershanesi] ÜSLÜ İFADELER',
    title: 'Üç Adım Soru Bankası Test 15-19',
    course: 'MATEMATİK 8/D',
    subject_type: 'MATEMATİK',
    teacher: 'MEHMET SADIK CAN',
    description: 'Üç Adım Soru Bankası Test 15-19',
    start_date: '2026-10-12T08:00:00',
    due_date: '2026-10-17T23:00:00',
    display_due_date: '17 Ekim 2026 Cumartesi, 23:00',
    books_and_pages: ['Üç Adım Soru Bankası: Test 15-19'],
    subtasks: [
      { id: 'hw-26-1', title: 'Üç Adım Soru Bankası Test 15-19 arası soruları çöz', completed: false }
    ]
  },
  {
    id: 'hw-27',
    topic: '[Aydın Dershanesi] Kader ve Kaza İnancı',
    title: 'Din Kültürü Üç Adım Sayfa 56-61',
    course: 'DİN KÜLTÜRÜ VE AHLAK BİLGİSİ 8/D',
    subject_type: 'DİN KÜLTÜRÜ',
    teacher: 'ZÜLEYHA EKER YANIK',
    description: 'Din kültürü Üç adım sayfa 56- 61 arası sorular çözülecektir.',
    start_date: '2026-10-12T08:00:00',
    due_date: '2026-10-17T23:00:00',
    display_due_date: '17 Ekim 2026 Cumartesi, 23:00',
    books_and_pages: ['Üç Adım Soru Bankası: Sayfa 56-61'],
    subtasks: [
      { id: 'hw-27-1', title: 'Üç Adım sayfa 56-61 arası soruları çöz', completed: false }
    ]
  },
  {
    id: 'hw-28',
    topic: '[Aydın Dershanesi] ADAPTASYON VE ÖNCEKİ KONULAR',
    title: 'Ders İşleyiş Modülü, 3 Adım & Beceri Temelli (Adaptasyona Kadar)',
    course: 'FEN BİLİMLERİ 8/D',
    subject_type: 'FEN BİLİMLERİ',
    teacher: 'Aydın Dershanesi Fen Zümresi',
    description: 'Değerli velilerim, Fen Bilimleri ödevlerimiz aşağıdaki kaynaklardan, adaptasyon konusuna kadar olan bölümlerdir: 1. Fen Bilimleri Ders İşleyiş Modülü 2. 3 Adım Soru Bankası 3. Beceri Temelli Soru Bankası. Ödev kontrolü 1 Kasım’da yapılacaktır.',
    start_date: '2026-10-24T08:00:00',
    due_date: '2026-11-01T23:00:00',
    display_due_date: '1 Kasım 2026 Pazar, 23:00',
    books_and_pages: ['Fen İşleyiş Modülü (Adaptasyona kadar)', '3 Adım Soru Bankası', 'Beceri Temelli Soru Bankası'],
    subtasks: [
      { id: 'hw-28-1', title: 'Fen Bilimleri Ders İşleyiş Modülü adaptasyona kadar çöz', completed: false },
      { id: 'hw-28-2', title: '3 Adım Soru Bankası adaptasyona kadar çöz', completed: false },
      { id: 'hw-28-3', title: 'Beceri Temelli Soru Bankası adaptasyona kadar çöz', completed: false }
    ]
  },
  {
    id: 'hw-29',
    topic: '[Aydın Dershanesi] Fiilimsiler, Sözcükte Anlam, Söz Sanatları',
    title: 'Modül 1 Bitirme, 3 Adım sf. 26 & Miray sf. 48',
    course: 'TÜRKÇE 8/D',
    subject_type: 'TÜRKÇE',
    teacher: 'Aydın Dershanesi Türkçe Zümresi',
    description: 'Öğrencilerimizin Türkçe dersinden ödevi Modül 1\'deki testler bitirilecektir. 3 Adım soru bankası sayfa 26\'ya kadar olan kısım ve Miray soru bankasından sayfa 48\'e kadar olan kısım çözülecektir. Fiilimsiler, sözcükte anlam, sözcükler arası anlam ilişkileri, söz sanatları ve söz öbeklerinde anlam konularımız bitmiş olup 2. modüle geçmiş bulunuyoruz. Kontrol haftaya pazar günüdür.',
    start_date: '2026-10-25T08:00:00',
    due_date: '2026-11-01T23:00:00',
    display_due_date: '1 Kasım 2026 Pazar, 23:00',
    books_and_pages: ['Türkçe Modül 1 (Kalan testler)', '3 Adım Soru Bankası: sf. 26\'ya kadar', 'Miray Soru Bankası: sf. 48\'e kadar'],
    subtasks: [
      { id: 'hw-29-1', title: 'Modül 1\'deki kalan testleri bitir', completed: false },
      { id: 'hw-29-2', title: '3 Adım soru bankası sayfa 26\'ya kadar çöz', completed: false },
      { id: 'hw-29-3', title: 'Miray soru bankası sayfa 48\'e kadar çöz', completed: false }
    ]
  }
];

const postData = JSON.stringify(newHomework);

const options = {
  hostname: SUPABASE_URL,
  port: 443,
  path: '/rest/v1/homework',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Prefer': 'resolution=merge-duplicates',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  res.on('data', (d) => process.stdout.write(d));
});

req.on('error', (e) => {
  console.error(e);
});

req.write(postData);
req.end();
