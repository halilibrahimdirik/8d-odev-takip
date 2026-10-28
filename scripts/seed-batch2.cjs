const https = require('https');

const items = [
  {
    id: "hw-18",
    topic: "Hız yayınları haftasonu ödevi",
    title: "Hız yayınları haftasonu ödevi",
    course: "T.C. İNKILAP TARİHİ VE ATATÜRKÇÜLÜK 8/D",
    subject_type: "İNKILAP TARİHİ",
        teacher: "BÜŞRA CAN",
    description: "Sevgili öğrencim hız yayınları soru bankası 35-42 ödevinizdir.İyi çalışmalar dilerim",
    start_date: "2026-10-22T08:00:00",
    due_date: "2026-10-26T23:00:00",
    display_due_date: "26 Ekim 2026 Pazartesi, 23:00",
    books_and_pages: ["Hız Yayınları Soru Bankası: Sayfa 35-42"],
    subtasks: [{"id": "hw-18-1", "title": "Hız Yayınları sf. 35-42 arası testleri çöz", "completed": false}]
  },
  {
    id: "hw-19",
    topic: "hafta sonu ödevi",
    title: "hafta sonu ödevi (MEB Kitabı)",
    course: "FEN BİLİMLERİ 8/D",
    subject_type: "FEN BİLİMLERİ",
        teacher: "HANİFE GAYE ALAY",
    description: "Merhaba Çocuklar hafta sonu ödeviniz MEB kitabımızdandır. (MEB kitabı önemli, kitapta verilen örnekler, kavramlar çok değerli, eğer ödevi yaparken bilmediğinizi soru ya da kavramlarla karşılaşırsanız kitabın anlatım kısmından tekrarlarınızı yapınız.)\n\nİyi tatiller çocuklar\n\nMEB ders kitabı: 35-36-37-38-39-40-41-61-66-67-72-73",
    start_date: "2026-10-22T08:00:00",
    due_date: "2026-10-26T23:00:00",
    display_due_date: "26 Ekim 2026 Pazartesi, 23:00",
    books_and_pages: ["MEB Ders Kitabı: Sayfa 35-41, 61, 66-67, 72-73"],
    subtasks: [{"id": "hw-19-1", "title": "MEB Ders Kitabı sf. 35-41, 61, 66-67, 72-73 test ve etkinlikleri tamamla", "completed": false}]
  },
  {
    id: "hw-20",
    topic: "Hafta içi ödevi",
    title: "Hafta içi ödevi (Bumerang 6. Deneme)",
    course: "FEN BİLİMLERİ 8/D",
    subject_type: "FEN BİLİMLERİ",
        teacher: "HANİFE GAYE ALAY",
    description: "Merhaba çocuklar hafta içi ödeviniz bumerang deneme kitabı altıncı deneme",
    start_date: "2026-10-21T08:00:00",
    due_date: "2026-10-23T23:00:00",
    display_due_date: "23 Ekim 2026 Cuma, 23:00",
    books_and_pages: ["Bumerang Deneme Kitabı: 6. Deneme"],
    subtasks: [{"id": "hw-20-1", "title": "Bumerang 6. Deneme Sınavını çöz ve yanlışlarını kontrol et", "completed": false}]
  },
  {
    id: "hw-21",
    topic: "Prestij yayınları haftaiçi ödevi",
    title: "Prestij yayınları haftaiçi ödevi",
    course: "T.C. İNKILAP TARİHİ VE ATATÜRKÇÜLÜK 8/D",
    subject_type: "İNKILAP TARİHİ",
        teacher: "BÜŞRA CAN",
    description: "Sevgili öğrencim prestij yayınları 45-50 sayfaları ödevinizdir.İyi çalışmalar diliyorum",
    start_date: "2026-10-19T08:00:00",
    due_date: "2026-10-23T23:00:00",
    display_due_date: "23 Ekim 2026 Cuma, 23:00",
    books_and_pages: ["Prestij Yayınları: Sayfa 45-50"],
    subtasks: [{"id": "hw-21-1", "title": "Prestij Yayınları sf. 45-50 arası testleri çöz", "completed": false}]
  },
  {
    id: "hw-22",
    topic: "Matematik ödevi",
    title: "Matematik ödevi (Startfen 5. Hafta)",
    course: "MATEMATİK 8/D",
    subject_type: "MATEMATİK",
        teacher: "ÜLKÜ TANRIVERDİ GÜVEN",
    description: "Odeviniz startfen kurumsal 5. Hafta calismalaridir.",
    start_date: "2026-10-16T08:00:00",
    due_date: "2026-10-19T08:00:00",
    display_due_date: "19 Ekim 2026 Pazartesi, 08:00",
    books_and_pages: ["Startfen Kurumsal: 5. Hafta"],
    subtasks: [{"id": "hw-22-1", "title": "Startfen Kurumsal 5. Hafta test ve çalışmalarını yap", "completed": false}]
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
