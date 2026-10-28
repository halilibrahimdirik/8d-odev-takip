const https = require('https');

const items = [
  {
    id: "hw-11",
    topic: "8. Sınıf Din Kültürü Ödevi",
    title: "8.sınıf Din Kültürü Ödevi",
    course: "DİN KÜLTÜRÜ VE AHLAK BİLGİSİ 8/D",
    subject_type: "DİN KÜLTÜRÜ",
    teacher: "MERVE DUMAN GÜNGÖR",
    description: "Merhaba sevgili çocuklar , bu haftaki ödeviniz sözel çalışma kitabından sayfa 102-124 arasıdır . kolaylıklar dilerim",
    start_date: "2026-10-27T08:00:00",
    due_date: "2026-11-06T23:00:00",
    display_due_date: "6 Kasım 2026 Cuma, 23:00",
    books_and_pages: ["Sözel Çalışma Kitabı: Sayfa 102-124"],
    subtasks: [{"id": "hw-11-1", "title": "Sözel Çalışma Kitabı sf. 102-124 arası testleri çöz", "completed": false}]
  },
  {
    id: "hw-12",
    topic: "Hafta sonu ödevi",
    title: "Hafta sonu ödevi (Ankara Yayıncılık)",
    course: "FEN BİLİMLERİ 8/D",
    subject_type: "FEN BİLİMLERİ",
    teacher: "HANİFE GAYE ALAY",
    description: "Merhaba çocuklar hafta sonu ödeviniz Ankara yayıncılık güçlendiren 51-78\nKolay gelsin",
    start_date: "2026-10-27T08:00:00",
    due_date: "2026-11-02T23:00:00",
    display_due_date: "2 Kasım 2026 Pazartesi, 23:00",
    books_and_pages: ["Ankara Yayıncılık Güçlendiren: Sayfa 51-78"],
    subtasks: [{"id": "hw-12-1", "title": "Ankara Yayıncılık Güçlendiren sf. 51-78 arası soruları çöz", "completed": false}]
  },
  {
    id: "hw-13",
    topic: "Hafta içi ödevi",
    title: "Hafta içi ödevi (Bumerang 7. Deneme)",
    course: "FEN BİLİMLERİ 8/D",
    subject_type: "FEN BİLİMLERİ",
    teacher: "HANİFE GAYE ALAY",
    description: "Merhaba çocuklar hafta içi ödeviniz bumerang haftalık deneme kitabından 7. haftalık deneme\nKolay gelsin🌺",
    start_date: "2026-10-27T08:00:00",
    due_date: "2026-11-06T23:00:00",
    display_due_date: "6 Kasım 2026 Cuma, 23:00",
    books_and_pages: ["Bumerang Haftalık Deneme: 7. Deneme"],
    subtasks: [{"id": "hw-13-1", "title": "Bumerang 7. Haftalık Deneme Sınavını çöz", "completed": false}]
  },
  {
    id: "hw-14",
    topic: "Matematik ödevi",
    title: "Matematik ödevi (Hız Yayınları)",
    course: "MATEMATİK 8/D",
    subject_type: "MATEMATİK",
    teacher: "ÜLKÜ TANRIVERDİ GÜVEN",
    description: "Hiz yayinlari 46-61 odevinizdir. Odeviniz pazartesi gunu kontrol edilecektir.",
    start_date: "2026-10-26T08:00:00",
    due_date: "2026-11-02T08:00:00",
    display_due_date: "2 Kasım 2026 Pazartesi, 08:00",
    books_and_pages: ["Hız Yayınları: Sayfa 46-61"],
    subtasks: [{"id": "hw-14-1", "title": "Hız Yayınları sf. 46-61 testlerini tamamla", "completed": false}]
  },
  {
    id: "hw-15",
    topic: "İnkılap tarihi haftaiçi ödevi",
    title: "İnkilap tarihi haftaiçi ödevi (Hız Yayınları)",
    course: "T.C. İNKILAP TARİHİ VE ATATÜRKÇÜLÜK 8/D",
    subject_type: "İNKILAP TARİHİ",
    teacher: "BÜŞRA CAN",
    description: "Sevgili öğrencim, hız yayınları soru bankası 42-43-44-45 sayfaları ödevinizdir.İyi çalışmalar dilerim",
    start_date: "2026-10-26T08:00:00",
    due_date: "2026-10-30T23:00:00",
    display_due_date: "30 Ekim 2026 Cuma, 23:00",
    books_and_pages: ["Hız Yayınları Soru Bankası: Sayfa 42-45"],
    subtasks: [{"id": "hw-15-1", "title": "Hız Yayınları sf. 42-45 arası testleri çöz", "completed": false}]
  },
  {
    id: "hw-16",
    topic: "MLJ HOMEWORK WEEK 6",
    title: "MLJ HOMEWORK WEEK 6",
    course: "ENGLISH MAIN COURSE 8/D",
    subject_type: "ENGLISH MAIN COURSE",
    teacher: "ŞENNUR DURSUN",
    description: "Hi there :)\n\nYour weekend mission is here! Please complete your homework before Monday- MLJ Pages 22-25.\n\n“I forgot” is NOT an acceptable answer! :)\n\nHave a great weekend, enjoy yourselves,\n\nSee you on Monday!",
    start_date: "2026-10-23T08:00:00",
    due_date: "2026-10-26T08:00:00",
    display_due_date: "26 Ekim 2026 Pazartesi, 08:00",
    books_and_pages: ["MLJ Workbook: Pages 22-25"],
    subtasks: [{"id": "hw-16-1", "title": "MLJ Book Pages 22-25", "completed": false}]
  },
  {
    id: "hw-17",
    topic: "LGS- W6",
    title: "LGS- W6 İngilizce Testleri",
    course: "ENGLISH LGS 8/D",
    subject_type: "ENGLISH LGS",
    teacher: "ŞULE ARTIK",
    description: "Dear students, the upcoming tests will have been completed.\n\nTeam ELT - English Ahead Test Book: Unit 3 Practice Test 3-4 (up to pg 66)\n\nHave a nice week!",
    start_date: "2026-10-23T08:00:00",
    due_date: "2026-10-29T23:00:00",
    display_due_date: "29 Ekim 2026 Perşembe, 23:00",
    books_and_pages: ["Team ELT - English Ahead Test Book: Unit 3 sf. 66'ya kadar"],
    subtasks: [
      {"id": "hw-17-1", "title": "English Ahead Practice Test 3", "completed": false},
      {"id": "hw-17-2", "title": "English Ahead Practice Test 4 (sf. 66'ya kadar)", "completed": false}
    ]
  }
];

const payload = JSON.stringify(items);
const req = https.request("https://pzwdxnokmpsgisnwgnbt.supabase.co/rest/v1/homework", {
  method: "POST",
  headers: {
    "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6d2R4bm9rbXBzZ2lzbndnbmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMxMDAzODYsImV4cCI6MjEwODY3NjM4Nn0.LG17M8ljDbbIxRPyTLe0Ot1jbtPSNq-YQjhnqz5xEcQ",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6d2R4bm9rbXBzZ2lzbndnbmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMxMDAzODYsImV4cCI6MjEwODY3NjM4Nn0.LG17M8ljDbbIxRPyTLe0Ot1jbtPSNq-YQjhnqz5xEcQ",
    "Content-Type": "application/json",
    "Prefer": "resolution=merge-duplicates",
    "Content-Length": Buffer.byteLength(payload)
  }
}, (res) => {
  let body = "";
  res.on("data", chunk => body += chunk);
  res.on("end", () => {
    console.log("STATUS:" + res.statusCode);
    console.log("BODY:" + body);
  });
});
req.write(payload);
req.end();
