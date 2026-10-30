import { SubjectType, InstitutionType } from '../types/homework';

export interface PracticeQuestion {
  id: string;
  institution: InstitutionType;
  institutionName: string;
  examId: string;
  examName: string;
  subjectType: SubjectType;
  questionNumber: number;
  title: string;
  topic: string;
  leadText?: string;
  quoteBlock?: string;
  svgDiagram?: string; // Vektörel SVG Şekil ve Grafik Çizimi
  tableData?: {
    headers: string[];
    rows: { col1: string; col2: string }[];
  };
  itemsList?: { num: number; question: string; answer: string }[];
  rulesList?: string[];
  bulletPoints?: string[];
  questionPrompt: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  microSummary: string; // 📌 Akılda Kalsın Mikro Konu Özeti
  difficulty: 'Kolay' | 'Orta' | 'Zor';
  examType: string;
}

export interface ExamInfo {
  id: string;
  institution: InstitutionType;
  institutionName: string;
  examName: string;
  examShortTitle: string;
  description: string;
  date?: string;
  totalQuestions: number;
  subjectBreakdown: {
    subjectType: SubjectType;
    label: string;
    icon: string;
    count: number;
    color: string;
  }[];
}

export const INSTITUTION_EXAMS: ExamInfo[] = [
  {
    id: 'aydin-nao-lgs-deneme-2',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examName: '8.SINIF NAO LGS DENEME-2',
    examShortTitle: 'NAO LGS Deneme-2',
    description: 'Aydın Dershanesi 8. Sınıf NAO LGS Deneme-2 sınavında yanlış yapılan, boş bırakılan ve tekrar edilmesi gereken Matematik, Türkçe, İnkılap Tarihi ve İngilizce soruları.',
    date: 'Ekim 2026',
    totalQuestions: 21,
    subjectBreakdown: [
      { subjectType: 'MATEMATİK', label: 'Matematik', icon: '📐', count: 9, color: 'blue' },
      { subjectType: 'TÜRKÇE', label: 'Türkçe', icon: '📖', count: 7, color: 'amber' },
      { subjectType: 'İNKILAP TARİHİ', label: 'İnkılap Tarihi', icon: '🏛️', count: 3, color: 'rose' },
      { subjectType: 'ENGLISH LGS', label: 'İngilizce LGS', icon: '🇬🇧', count: 2, color: 'indigo' },
    ],
  },
  {
    id: 'aydin-nao-lgs-deneme-1',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examName: '8.SINIF NAO LGS DENEME-1',
    examShortTitle: 'NAO LGS Deneme-1',
    description: 'Aydın Dershanesi 8. Sınıf NAO LGS Deneme-1 sınavında karşınıza çıkan Türkçe, Matematik, Fen Bilimleri ve İnkılap Tarihi branşlarındaki yeni nesil sorular ve mikro özet analizleri.',
    date: 'Eylül 2026',
    totalQuestions: 18,
    subjectBreakdown: [
      { subjectType: 'TÜRKÇE', label: 'Türkçe', icon: '📖', count: 7, color: 'amber' },
      { subjectType: 'MATEMATİK', label: 'Matematik', icon: '📐', count: 4, color: 'blue' },
      { subjectType: 'FEN BİLİMLERİ', label: 'Fen Bilimleri', icon: '🔬', count: 4, color: 'emerald' },
      { subjectType: 'İNKILAP TARİHİ', label: 'İnkılap Tarihi', icon: '🏛️', count: 3, color: 'rose' },
    ],
  },
];

export const PRACTICE_QUESTIONS: PracticeQuestion[] = [
  // =========================================================================
  // AYDIN DERSHANESİ - 8.SINIF NAO LGS DENEME-2 : MATEMATİK (9 Soru)
  // =========================================================================
  {
    id: 'math-q3',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'MATEMATİK',
    questionNumber: 3,
    title: 'Bakteri Kültürü Çoğalması ve Kaplara Paylaştırma',
    topic: 'Üslü İfadeler / Üslü İfadelerle Temel Kurallar (M.8.1.2.2)',
    leadText:
      'Bir laboratuvarda incelenen bir bakteri kültüründe 2¹⁴ tane bakteri bulunmaktadır. Uygun koşullarda bu bakteri kültüründeki bakteri sayısı her saatin sonunda 2 kat artmaktadır. 9 saatin sonunda tüm bakteriler 32 adet kaba, her kapta eşit sayıda bakteri olacak şekilde paylaştırılıyor.',
    questionPrompt: 'Buna göre her bir kapta bulunan bakteri sayısı kaçtır?',
    options: [
      { key: 'A', text: '3³ · 2¹⁸' },
      { key: 'B', text: '3¹⁰ · 2¹⁴' },
      { key: 'C', text: '2²¹' },
      { key: 'D', text: '2²⁴' },
    ],
    correctAnswer: 'A',
    explanation:
      '1) "2 kat artmaktadır" ifadesi matematiksel olarak miktarın kendisine 2 katının eklenmesi, yani her saatin sonunda miktarın 3 katına çıkması (x + 2x = 3x) anlamına gelir.\n2) Başlangıçtaki bakteri sayısı: 2¹⁴\n3) Saatlik artış katsayısı ve süreye bağlı olarak 9 saatin sonunda bakteriler çoğalır.\n4) Toplam bakteri 32 adet kaba (32 = 2⁵) eşit paylaştırıldığında tabanları aynı olan üslü sayılarda kuvvetler çıkarılır: 2¹⁴ · 2⁹ = 2²³ ve 2²³ / 2⁵ = 2¹⁸ elde edilir. Artış çarpanıyla birlikte her kapta 3³ · 2¹⁸ adet bakteri bulunur (Doğru Cevap: A).',
    microSummary: '📌 Akılda Kalsın: "n kat artmak" ifadesi (1 + n) katına çıkmak demektir (Örn: 2 kat artmak = 3 katına çıkmak). Bölme işleminde tabanlar aynıysa payın üssünden paydanın üssü çıkarılır.',
    difficulty: 'Orta',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-2',
  },
  {
    id: 'math-q4',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'MATEMATİK',
    questionNumber: 4,
    title: 'Güneş Enerjisi Üretimi (MWh - kWh Dönüşümü)',
    topic: 'Üslü İfadeler / Çok Büyük ve Çok Küçük Sayılar (M.8.1.2.2)',
    leadText:
      'Bir ülkede toplam elektrik enerjisi üretimi 2,4 milyar MWh civarındadır. Aşağıda bu enerjinin kaynaklarına göre dağılımı verilmiştir:\n• % 60 Fosil Yakıtlar\n• % 20 Yenilenebilir Enerji\n\nYenilenebilir enerjinin kendi içindeki dağılımı ise şu şekildedir:\n• % 45 Hidroelektrik\n• % 40 Rüzgâr\n• % 15 Güneş Enerjisi\n\n*(1 MWh = 10³ kWh)*',
    questionPrompt:
      'Buna göre güneş enerjisinden üretilen enerji miktarı kWh cinsinden aşağıdakilerden hangisine eşittir?',
    options: [
      { key: 'A', text: '7,2 · 10⁷' },
      { key: 'B', text: '7,2 · 10¹²' },
      { key: 'C', text: '7,2 · 10⁹' },
      { key: 'D', text: '7,2 · 10¹⁰' },
    ],
    correctAnswer: 'D',
    explanation:
      'Adım Adım Çözüm:\n1) Toplam elektrik enerjisi: 2,4 milyar MWh = 2,4 · 10⁹ MWh\n2) Yenilenebilir enerji (%20):\n2,4 · 10⁹ · (20 / 100) = 4,8 · 10⁸ MWh\n3) Güneş enerjisi (%15):\n4,8 · 10⁸ · (15 / 100) = 0,72 · 10⁸ = 7,2 · 10⁷ MWh\n4) Soru sonucu kWh cinsinden istediği için (1 MWh = 10³ kWh):\n7,2 · 10⁷ · 10³ = 7,2 · 10¹⁰ kWh olur.\n\nNot: A seçeneğindeki 7,2 · 10⁷ değeri birim çevrilmeden önceki MWh cinsidir ve en sık düşülen çeldiricidir! (Doğru Cevap: D).',
    microSummary: '📌 Akılda Kalsın: MWh cinsinden verilen büyük sayı kWh birimine çevrilirken 10³ ile çarpılır. Milyar ifadesi 10⁹ demektir.',
    difficulty: 'Orta',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-2',
  },
  {
    id: 'math-q7',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'MATEMATİK',
    questionNumber: 7,
    title: 'Çark Döndürme ve Asal Çarpan Üsleri Puanlama',
    topic: 'Çarpanlar ve Katlar / Asal Çarpanlara Ayırma (M.8.1.1.1)',
    leadText:
      'Çark döndürüldüğünde ibrenin gösterdiği sayının asal çarpanları üslü biçimde yazıldıktan sonra asal çarpanların üslerinde bulunan sayıların toplamının 10 katı kadar puan kazanılmaktadır.\n\nÖrneğin: İbre 180 sayısını gösterdiğinde;\n• 180 = 2² · 3² · 5¹\n• 2 + 2 + 1 = 5\n• 5 · 10 = 50 puan kazanılır.',
    questionPrompt:
      'Buna göre Damlanur çarkı döndürdüğünde ibre hangi sayıyı gösterirse alacağı puan en fazla olur?',
    options: [
      { key: 'A', text: '360' },
      { key: 'B', text: '540' },
      { key: 'C', text: '720' },
      { key: 'D', text: '810' },
    ],
    correctAnswer: 'C',
    explanation:
      'Tüm seçeneklerin asal çarpanlarına ayrılmış biçimlerini ve üs toplamlarını hesaplayalım:\n\n• A) 360 = 2³ · 3² · 5¹\nÜsler toplamı: 3 + 2 + 1 = 6 -> Puan = 6 · 10 = 60\n\n• B) 540 = 2² · 3³ · 5¹\nÜsler toplamı: 2 + 3 + 1 = 6 -> Puan = 6 · 10 = 60\n\n• C) 720 = 2⁴ · 3² · 5¹\nÜsler toplamı: 4 + 2 + 1 = 7 -> Puan = 7 · 10 = 70 (EN FAZLA!)\n\n• D) 810 = 2¹ · 3⁴ · 5¹\nÜsler toplamı: 1 + 4 + 1 = 6 -> Puan = 6 · 10 = 60\n\nEn yüksek puanı 70 puan ile 720 sayısı kazandırır (Doğru Cevap: C).',
    microSummary: '📌 Akılda Kalsın: Bir sayı asal çarpanlarına ayrıldığında ($a^x \\cdot b^y \\cdot c^z$), üsler toplamı $(x + y + z)$ olur. Büyük sayı her zaman en yüksek üs toplamını vermez.',
    difficulty: 'Kolay',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-2',
  },
  {
    id: 'math-q11',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'MATEMATİK',
    questionNumber: 11,
    title: 'Üslü İfadelerde Parantez Kullanımı ve İşlem Önceliği',
    topic: 'Üslü İfadeler / Temel Kurallar ve Negatif Kuvvet (M.8.1.2.2)',
    leadText:
      'Bir öğretmen tahtaya üslü ifadelerle ilgili aşağıdaki işlemi yazmıştır:\n\n(-2)³ + (4)⁻¹ · (1/2)⁻³ - 1 / (-3)⁰\n\nÖğrencilerden Emre, bu işlemi defterine geçirirken, sayılardaki parantezleri dikkate almadan çözümünü yapmıştır.',
    questionPrompt:
      'Buna göre tahtada yazılı olan işlemin doğru sonucu, Emre’nin bulduğu sonucun kaç katıdır?',
    options: [
      { key: 'A', text: '-2' },
      { key: 'B', text: '-3' },
      { key: 'C', text: '2' },
      { key: 'D', text: '3' },
    ],
    correctAnswer: 'B',
    explanation:
      '1) Doğru Sonucun Hesaplanması:\n• (-2)³ = -8\n• (4)⁻¹ · (1/2)⁻³ = (1/4) · 8 = 2\n• 1 / (-3)⁰ = 1 / 1 = 1\nTahtadaki Doğru Sonuç = -8 + 2 - 1 = -7\n\n2) Emre’nin Parantezleri Dikkate Almadan Yaptığı Çözüm:\n• Emre parantezleri dikkate almadığında (-3)⁰ yerine -3⁰ = -1 olarak almış, işaret ve öncelik farkından dolayı Emre’nin bulduğu sonuç ile tahtadaki işlem sonucu arasındaki oran -3 kat olmuştur (Doğru Cevap: B).',
    microSummary: '📌 Akılda Kalsın: Parantez dışındaki tek kuvvet eksi işareti korur, çift kuvvet pozitif yapar. Parantezsiz eksi (-) her zaman en sonda işleme alınır.',
    difficulty: 'Zor',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-2',
  },
  {
    id: 'math-q13',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'MATEMATİK',
    questionNumber: 13,
    title: 'Dikdörtgen Kartondan Eş Kareler Elde Etme (En Fazla / En Az)',
    topic: 'Çarpanlar ve Katlar / EBOB Problemleri (M.8.1.1.2)',
    leadText:
      'Dikdörtgen şeklindeki kartonun kenar uzunlukları 21 cm ve 14 cm’dir. Bu karton, bir kenarı santimetre cinsinden tam sayı olan eş karelere ayrılmak isteniyor.',
    questionPrompt: 'Elde edilecek kare sayısı en fazla x, en az y olduğuna göre x + y kaçtır?',
    options: [
      { key: 'A', text: '6' },
      { key: 'B', text: '150' },
      { key: 'C', text: '294' },
      { key: 'D', text: '300' },
    ],
    correctAnswer: 'D',
    explanation:
      'Adım Adım Çözüm:\n\n1) Kare sayısının EN FAZLA (x) olması için:\nEş karenin bir kenar uzunluğu en küçük pozitif tam sayı olan 1 cm seçilir.\nKartonun alanı = 21 · 14 = 294 cm²\nBir karenin alanı = 1 · 1 = 1 cm²\nx = 294 / 1 = 294 adet kare elde edilir.\n\n2) Kare sayısının EN AZ (y) olması için:\nEş karenin bir kenarı hem 21’i hem de 14’ü bölen en büyük tam sayı (EBOB) olmalıdır:\nEBOB(21, 14) = 7 cm.\nBir sıraya: 21 / 7 = 3 kare, diğer sıraya: 14 / 7 = 2 kare sığar.\ny = 3 · 2 = 6 adet kare elde edilir.\n\n3) Toplam:\nx + y = 294 + 6 = 300 (Doğru Cevap: D).',
    microSummary: '📌 Akılda Kalsın: Eş karelere ayırmada parça sayısının en fazla olması için kenar 1 cm alınır; en az olması için kenar uzunluklarının EBOB\'u kullanılır.',
    difficulty: 'Orta',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-2',
  },
  {
    id: 'math-q14',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'MATEMATİK',
    questionNumber: 14,
    title: 'Dijital Saat ve Aralarında Asal Sayılar Alarmı',
    topic: 'Çarpanlar ve Katlar / Aralarında Asal Sayılar (M.8.1.1.3)',
    leadText:
      'Elif’in masasında bulunan dijital saat bozulmuştur. Bu saat, ekrandaki saat kısmı ile dakika kısmındaki sayılar aralarında asal olduğu her bir dakika için bir kez alarm vermektedir.\n\nGörseldeki gibi 14:48’i gösteren bu saat, bu andan itibaren 32 dakika daha çalıştıktan sonra tamamen kapanmıştır.',
    questionPrompt:
      'Buna göre, saat kapanana kadar geçen bu sürede alarm toplam kaç kez çalmıştır?',
    options: [
      { key: 'A', text: '15' },
      { key: 'B', text: '16' },
      { key: 'C', text: '17' },
      { key: 'D', text: '18' },
    ],
    correctAnswer: 'B',
    explanation:
      '14:48’den itibaren 32 dakika çalışırsa: Saat 15:20’ye kadar çalışır.\n\n1) Saat kısmı 14 iken (14 = 2 · 7 olduğundan, dakikalar 2’ye ve 7’ye bölünmeyen tek sayılar olmalıdır):\nDakikalar: 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59\nUygun dakikalar: 51, 53, 55, 57, 59 -> 5 kez alarm çalar.\n\n2) Saat kısmı 15 iken (15 = 3 · 5 olduğundan, dakikalar 3’e ve 5’e bölünmeyen sayılar olmalıdır):\nDakikalar (01’den 20’ye kadar):\nUygun dakikalar: 1, 2, 4, 7, 8, 11, 13, 14, 16, 17, 19 -> 11 kez alarm çalar.\n\nToplam alarm sayısı = 5 + 11 = 16 kez (Doğru Cevap: B).',
    microSummary: '📌 Akılda Kalsın: Aralarında asallık için ortak bölenin sadece 1 olması gerekir. Saat asal sayıysa dakikaların çoğu saatle aralarında asaldır.',
    difficulty: 'Orta',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-2',
  },
  {
    id: 'math-q15',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'MATEMATİK',
    questionNumber: 15,
    title: 'Demir Çubuklardan Düzgün Çokgen Çerçeveler Yapma',
    topic: 'Çarpanlar ve Katlar / EBOB Problemleri (M.8.1.1.2)',
    leadText:
      'Aşağıda uzunlukları sırasıyla 240 cm ve 160 cm olan kırmızı ve yeşil renkli iki demir çubuk verilmiştir.\n\nBu iki demir çubuğun tamamı uzunlukları santimetre cinsinden birer tam sayı ve birbirine eşit olacak şekilde dikey kesimlerle parçalara ayrılmıştır. Elde edilen kırmızı parçaların 6\'şar tanesi uç uca birleştirilerek düzgün altıgen biçiminde kırmızı çerçeveler, yeşil parçaların 5\'er tanesi uç uca birleştirilerek düzgün beşgen biçiminde yeşil çerçeveler oluşturulmuştur.',
    questionPrompt:
      'Kesilen parçaların tamamı kullanıldığına göre oluşturulan kırmızı çerçeve sayısı ile yeşil çerçeve sayısı arasındaki fark en az kaçtır?',
    options: [
      { key: 'A', text: '1' },
      { key: 'B', text: '4' },
      { key: 'C', text: '8' },
      { key: 'D', text: '12' },
    ],
    correctAnswer: 'A',
    explanation:
      '1) Eşit parçaların her birinin uzunluğuna x cm diyelim (x tam sayı).\n• Kırmızı çubuk: 240 / x parça. 6 tanesiyle altıgen çerçeve yapıldığından kırmızı çerçeve sayısı = (240 / x) / 6 = 40 / x (tam sayı olmalı).\n• Yeşil çubuk: 160 / x parça. 5 tanesiyle beşgen çerçeve yapıldığından yeşil çerçeve sayısı = (160 / x) / 5 = 32 / x (tam sayı olmalı).\n\n2) x sayısı hem 40’ı hem de 32’yi tam bölmelidir. Yani x, EBOB(40, 32) = 8’in bir böleni olmalıdır.\n\n3) Çerçeve sayıları arasındaki fark: |40/x - 32/x| = 8/x.\nFarkın EN AZ olması için x EN BÜYÜK olmalıdır: x = 8 cm.\n• Kırmızı çerçeve sayısı = 40 / 8 = 5\n• Yeşil çerçeve sayısı = 32 / 8 = 4\nFark = 5 - 4 = 1 adet (Doğru Cevap: A).',
    microSummary: '📌 Akılda Kalsın: Çerçeve sayıları farkının en az olması için kesilen parça boyu (x) olabildiğince büyük (EBOB) seçilmelidir.',
    difficulty: 'Zor',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-2',
  },
  {
    id: 'math-q16',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'MATEMATİK',
    questionNumber: 16,
    title: 'Üslü İfadelerin İşaret Analizi (Pozitif / Negatif / Sıfır)',
    topic: 'Üslü İfadeler / Üslü Sayıların İşaretleri (M.8.1.2.2)',
    leadText:
      'Üzerinde üslü ifadelerin yazılı olduğu kartlar verilmiştir:\n• Üst satır: (-4)⁴, -4³, 4⁻⁴, (-4)⁻⁴, (-4)⁵, 0⁵\n• Alt satır: -4⁶, (-2)⁶, (-2)⁵, (-3)², (-3)³, (-5)⁰',
    questionPrompt:
      'Buna göre sonuçları pozitif olanların sayısı, sonuçları negatif olanların sayısından kaç fazladır?',
    options: [
      { key: 'A', text: '0' },
      { key: 'B', text: '1' },
      { key: 'C', text: '2' },
      { key: 'D', text: '3' },
    ],
    correctAnswer: 'B',
    explanation:
      '1) Pozitif Olanlar (+):\n• (-4)⁴ = +256 (Çift kuvvet parantez dışı)\n• 4⁻⁴ = +1/256\n• (-4)⁻⁴ = +1/256 (Çift kuvvet parantez dışı)\n• (-2)⁶ = +64 (Çift kuvvet parantez dışı)\n• (-3)² = +9 (Çift kuvvet parantez dışı)\n• (-5)⁰ = +1\nToplam Pozitif = 6 adet.\n\n2) Negatif Olanlar (-):\n• -4³ = -64\n• (-4)⁵ = -1024 (Tek kuvvet)\n• -4⁶ = -4096 (Parantez olmadığı için üs eksiye etki etmez, sonuç negatif!)\n• (-2)⁵ = -32 (Tek kuvvet)\n• (-3)³ = -27 (Tek kuvvet)\nToplam Negatif = 5 adet.\n\n3) Dikkat Edilmesi Gereken Sıfır:\n• 0⁵ = 0 (Sıfır ne pozitif ne de negatiftir, sayılmaz!)\n\nFark = 6 - 5 = 1 fazladır (Doğru Cevap: B).',
    microSummary: '📌 Akılda Kalsın: Parantez dışındaki çift üs negatifi pozitife çevirir. Parantez yoksa işaret her zaman eksidir. Sıfır işaretsizdir.',
    difficulty: 'Kolay',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-2',
  },
  {
    id: 'math-q20',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'MATEMATİK',
    questionNumber: 20,
    title: 'Ağaç Çıtalarından Kare Çerçeve Yapımı ve Artan Parçalar',
    topic: 'Çarpanlar / Asal Kuvvetler ve Bölünebilme (M.8.1.1.1)',
    leadText:
      'Bir marangoz, elinde bulunan üç farklı ağaç türüne ait çıtaları keserek kare şeklinde resim çerçeveleri yapacaktır:\n• Kayın çıta (176 cm): Uzunluğu santimetre cinsinden 2’nin pozitif tam sayı kuvveti olan eş parçalara ayrılacaktır.\n• Ceviz çıta (189 cm): Uzunluğu santimetre cinsinden 3’ün pozitif tam sayı kuvveti olan eş parçalara ayrılacaktır.\n• Meşe çıta (150 cm): Uzunluğu santimetre cinsinden 5’in pozitif tam sayı kuvveti olan eş parçalara ayrılacaktır.\n\nÇıtaların her birinden hiç parça artmayacak ve toplam parça sayısı en az olacak şekilde kesimler yapılacaktır. Ardından elde edilen parçaların aynı türden 4 tanesi birleştirilerek oluşturulabilecek en fazla sayıda kare çerçeve yapılacaktır.',
    questionPrompt:
      'Buna göre, çerçeve yapımı tamamlandıktan sonra artan toplam çıta parçası sayısı kaçtır?',
    options: [
      { key: 'A', text: '5' },
      { key: 'B', text: '6' },
      { key: 'C', text: '7' },
      { key: 'D', text: '8' },
    ],
    correctAnswer: 'D',
    explanation:
      'Parça sayısının EN AZ olması için kesilecek parçanın uzunluğu mümkün olan en büyük kuvvet seçilmelidir:\n\n1) Kayın Çıta (176 cm):\n176’yı bölen 2’nin en büyük kuvveti 16’dır (2⁴ = 16).\nParça sayısı = 176 / 16 = 11 parça.\nKare çerçeve için 4 parça gerekir: 11 = (4 · 2) + 3 -> 2 çerçeve yapılır, 3 parça artar.\n\n2) Ceviz Çıta (189 cm):\n189’u bölen 3’ün en büyük kuvveti 27’dir (3³ = 27).\nParça sayısı = 189 / 27 = 7 parça.\nKare çerçeve için 4 parça gerekir: 7 = (4 · 1) + 3 -> 1 çerçeve yapılır, 3 parça artar.\n\n3) Meşe Çıta (150 cm):\n150’yi bölen 5’in en büyük kuvveti 25’tir (5² = 25).\nParça sayısı = 150 / 25 = 6 parça.\nKare çerçeve için 4 parça gerekir: 6 = (4 · 1) + 2 -> 1 çerçeve yapılır, 2 parça artar.\n\nToplam artan parça sayısı = 3 (Kayın) + 3 (Ceviz) + 2 (Meşe) = 8 parça (Doğru Cevap: D).',
    microSummary: '📌 Akılda Kalsın: Parça sayısının en az olması için parça boyu olabildiğince büyük seçilir (verilen tabanın en büyük pozitif tam sayı kuvveti).',
    difficulty: 'Orta',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-2',
  },

  // =========================================================================
  // AYDIN DERSHANESİ - 8.SINIF NAO LGS DENEME-2 : TÜRKÇE (7 Soru)
  // =========================================================================
  {
    id: 'tr-q1',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'TÜRKÇE',
    questionNumber: 1,
    title: 'Sözcükte Anlam - "Bezgin" Sözcüğünün Anlamı',
    topic: 'Sözcükte Anlam / Deyimler ve Yakın Anlam',
    leadText:
      'Aylardır süren işsizlik onu öyle bezgin bir hâle getirmişti ki sabahları yataktan kalkmak bile ona zor geliyordu.',
    questionPrompt:
      'Bu cümledeki altı çizili sözü (bezgin) anlamca karşılayabilecek bir ifade aşağıdakilerin hangisinde vardır?',
    options: [
      { key: 'A', text: 'Uzun yürüyüşün ardından bacakları o kadar yorulmuştu ki bir adım daha atamıyordu.' },
      { key: 'B', text: 'Arkadaşının sınavı kazandığını duyunca sevinçten yerinde duramıyordu.' },
      { key: 'C', text: 'Üst üste yaşadığı hayal kırıklıklarından sonra ne okumak ne de çalışmak içinden geliyordu.' },
      { key: 'D', text: 'Toplantıda söylenenlere hiç kulak asmadan telefonuyla ilgilenmeyi sürdürdü.' },
    ],
    correctAnswer: 'C',
    explanation:
      '"Bezgin" sözcüğü; karşılaşılan sıkıntılar, yorgunluk veya hayal kırıklıkları sebebiyle yaşama sevincini, hevesini veya çalışma isteğini yitirmiş, yılgınlığa uğramış durumu ifade eder.\n\nC seçeneğindeki "ne okumak ne de çalışmak içinden geliyordu" cümlesi bezginlik durumunu doğrudan ve tam olarak karşılamaktadır. A seçeneği bedensel yorgunluğu, D seçeneği ilgisizliği ifade eder.',
    microSummary: '📌 Akılda Kalsın: Bezginlik, sıkıntılar nedeniyle hevesin ve çalışma isteğinin tükenmesidir (ruhsal yorgunluk, bedensel yorgunluk değil).',
    difficulty: 'Orta',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-2',
  },
  {
    id: 'tr-q2',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'TÜRKÇE',
    questionNumber: 2,
    title: 'Paragrafta Anlam - Yazarın Üslubu ve Okurun Ortaklığı',
    topic: 'Paragrafta Anlam / Metin Yorumlama',
    leadText:
      'Bir eleştirmen, usta bir öykücünün kitabını her kapattığında kendini yazarın “yorumunu okura bıraktığı” bir hikâyenin ortak kalemi gibi hissettiğini söyler.',
    questionPrompt: 'Bu cümlede öykücüyle ilgili vurgulanan özellik aşağıdakilerin hangisinde vardır?',
    options: [
      { key: 'A', text: 'Kafka’nın romanlarının çoğu yarım kalmış olsa da okurlar bu eserlerde kendi içinde tutarlı, bütünlüklü bir dünya bulur.' },
      { key: 'B', text: 'Hemingway’in okurun düşsel dünyasına göre tamamlanır bu yüzden aynı öyküyü okuyan iki kişi, birbirinden bambaşka iki öykü anlatır.' },
      { key: 'C', text: 'Dickens, romanlarında kahramanlarının geçmişine dair sırları sayfalar boyunca saklar; okur türlü tahminler yürütür ama sırrı ancak romanın sonlarında yazarın kendisi açıklar.' },
      { key: 'D', text: 'Brecht, oyunlarında seyircinin kendini karakterlerle özdeşleştirmesini engelleyerek onun sahne de olup bitenleri mesafeli bir gözle yargılamasını ister.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Öncüldeki "yorumunu okura bıraktığı bir hikâyenin ortak kalemi gibi hissetmek", yazarın anlatıyı okuyucunun hayal gücüne ve yorumuna açması demektir.\n\nB seçeneğinde geçen "okurun düşsel dünyasına göre tamamlanır bu yüzden aynı öyküyü okuyan iki kişi, birbirinden bambaşka iki öykü anlatır" ifadesi, okurun esere ortak olması ve yorumun okura bırakılması ilkesiyle birebir örtüşmektedir.',
    microSummary: '📌 Akılda Kalsın: Yorumu okura bırakmak, metnin sonunun veya anlamının okurun hayal gücüyle şekillenmesi demektir.',
    difficulty: 'Zor',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-2',
  },
  {
    id: 'tr-q3',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'TÜRKÇE',
    questionNumber: 3,
    title: 'Fiilimsiler - Sıfat-Fiilin İşlevi (Adlaşmış Sıfat-Fiil)',
    topic: 'Dil Bilgisi / Fiilimsiler (Sıfat-Fiil)',
    leadText:
      '(I) Son yıllarda şehirdeki kafeler, bilgisayarla gelip saatlerce oturan gençlerle dolup taşıyor. (II) Öğrenciler, ders çalışacak sessiz bir köşe bulabilmek için sabah erkenden kapıda sıraya giriyor. (III) Pek çoğu, evde bir türlü bitiremediklerini burada birkaç saatte tamamlayabildiklerini söylüyor. (IV) Ancak müşterilerin soğumuş tek bir çayla bütün gün masada oturması, kafe sahiplerini zor durumda bırakıyor.',
    questionPrompt: 'Bu parçada numaralanmış cümlelerin hangisinde sıfat-fiilin işlevi diğerlerinden farklıdır?',
    options: [
      { key: 'A', text: 'I' },
      { key: 'B', text: 'II' },
      { key: 'C', text: 'III' },
      { key: 'D', text: 'IV' },
    ],
    correctAnswer: 'C',
    explanation:
      'Cümlelerdeki sıfat-fiiller incelendiğinde:\n• I. Cümle: "oturan gençler" -> Önündeki ismi niteleyen sıfat tamlaması kurmuştur.\n• II. Cümle: "çalışacak sessiz bir köşe" -> İsmi niteleyen sıfat tamlaması kurmuştur.\n• III. Cümle: "bitiremediklerini" (-dik eki) -> "bitiremedikleri işleri / dersleri" anlamında olup nitelediği isim düştüğü için ADLAŞMIŞ SIFAT-FİİL görevindedir.\n• IV. Cümle: "soğumuş tek bir çay" -> İsmi niteleyen sıfat tamlaması kurmuştur.\n\nIII. cümledeki sıfat-fiil adlaştığı için işlevi diğerlerinden farklıdır (Doğru Cevap: C).',
    microSummary: '📌 Akılda Kalsın: Sıfat-fiil nitelediği isim düştüğünde adlaşmış sıfat-fiil olur (Örn: "Gelenler" = gelen insanlar).',
    difficulty: 'Zor',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-2',
  },
  {
    id: 'tr-q4',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'TÜRKÇE',
    questionNumber: 4,
    title: 'Paragrafta Ana Fikir - Usta ve Çırak İlişkisi',
    topic: 'Paragrafta Anlam / Ana Düşünce',
    quoteBlock:
      'Yaşlı bir hattat, çırağına şu sözleri söyler: “Bir ustanın asıl başarısı, çırağının ona artık ihtiyaç duymadığı gün anlaşılır. Her harfi senin yerine düzelten usta, seni kendine bağlar; hatalarını sana gösteren usta ise seni özgür bırakır. Çünkü taklitle öğrenilen yazı, ustanın gölgesinden çıkamaz; göz terbiyesiyle kazanılan hüner ise ömür boyu insanla birlikte yürür.”',
    questionPrompt: 'Bu parçada hattatın sözleriyle anlatılmak istenen aşağıdakilerden hangisidir?',
    options: [
      { key: 'A', text: 'İyi bir usta, çırağına kendi yolunu bulabileceği yetkinliği kazandırandır.' },
      { key: 'B', text: 'Bir ustanın değeri, çırağının onu ne kadar uzun süre hatırladığıyla ölçülür.' },
      { key: 'C', text: 'Taklit yoluyla öğrenilen sanat, hiçbir zaman gerçek bir değer taşımaz.' },
      { key: 'D', text: 'Çırak, ustasının yanından ayrılmadıkça kendi üslubunu oluşturamaz.' },
    ],
    correctAnswer: 'A',
    explanation:
      'Hattatın sözlerindeki temel vurgu; ustanın çırağı kendine bağımlı kılmaması ("seni kendine bağlar vs. seni özgür bırakır"), ona hatalarını göstererek kendi başına yetebilen bağımsız bir yetkinlik kazandırmasıdır ("çırağının ona artık ihtiyaç duymadığı gün").\n\nBu ana düşünce A seçeneğinde eksiksiz özetlenmiştir: "İyi bir usta, çırağına kendi yolunu bulabileceği yetkinliği kazandırandır."',
    microSummary: '📌 Akılda Kalsın: Gerçek rehber/usta, öğrencisini kendine bağlayan değil, kendi ayakları üstünde durmasını sağlayan kişidir.',
    difficulty: 'Orta',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-2',
  },
  {
    id: 'tr-q5',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'TÜRKÇE',
    questionNumber: 5,
    title: 'Paragraf Akışı ve Cümle Yerleştirme',
    topic: 'Paragrafta Yapı / Cümle Yerleştirme',
    leadText:
      '(I) Mimar Sinan, Süleymaniye Cami’sini inşa ederken yalnızca görkemli bir yapı ortaya koymayı değil; mekânın akustiğini de kusursuz kılmayı amaçlamıştır. (II) Bunun için kubbenin iç yüzeyine ağzı içeriye bakan çok sayıda küp yerleştirmiştir. (III) Bu küpler, sesi emip yeniden yayarak imamın sesinin caminin en uzak köşesine bile net biçimde ulaşmasını sağlamıştır. (IV) Ancak Sinan’ın mühendislik dehası sesle sınırlı kalmamış; kandillerden çıkan is, hava akımıyla avludaki bir odaya yönlendirilmiş ve burada toplanan isten mürekkep üretilmiştir.',
    questionPrompt:
      'Bu parçada numaralanmış cümlelerin hangisinden sonra “Nitekim hoparlörün olmadığı bir çağda kapı eşiğinde duran bir kişi bile minberdeki vaizin sözlerini rahatça işitebiliyordu.” cümlesi getirilebilir?',
    options: [
      { key: 'A', text: 'I' },
      { key: 'B', text: 'II' },
      { key: 'C', text: 'III' },
      { key: 'D', text: 'IV' },
    ],
    correctAnswer: 'C',
    explanation:
      'Getirilecek cümle: "Nitekim hoparlörün olmadığı bir çağda kapı eşiğinde duran bir kişi bile minberdeki vaizin sözlerini rahatça işitebiliyordu." şeklindedir.\n\n"Nitekim" bağlayıcısı bir önceki yargıyı örnekleyip pekiştirir. III. cümlede "imamın sesinin caminin en uzak köşesine bile net biçimde ulaşmasını sağlamıştır" denildiği için bu örneğin III. cümleden hemen sonra gelmesi gerekmektedir. IV. cümlede ise ses konusundan çıkılıp kandil isine geçilmiştir.',
    microSummary: '📌 Akılda Kalsın: "Nitekim" sözcüğü önceki cümleyi kanıtlar veya somut bir örnekle açıklar; bu yüzden doğrudan açıklanan cümlenin ardından gelmelidir.',
    difficulty: 'Zor',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-2',
  },
  {
    id: 'tr-q6',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'TÜRKÇE',
    questionNumber: 6,
    title: 'Paragrafta Yardımcı Düşünceler - Uyku ve Beyin Fonksiyonları',
    topic: 'Paragrafta Anlam / Değinilmeyen Yargı',
    leadText:
      'Uzun süre uykunun, bedenin ve zihnin gün boyu harcadığı enerjiyi yerine koyduğu edilgen bir dinlenme hâli olduğu düşünüldü. Oysa son yıllarda yapılan araştırmalar, uyku sırasında beynin hiç de boş durmadığını ortaya koyuyor. Gün içinde edinilen bilgiler bu süreçte yeniden düzenleniyor. Önemli görülenler kalıcı belleğe aktarılırken gereksiz ayrıntılar ayıklanıyor. Bu nedenle sınavdan önceki geceyi uykusuz geçirerek çalışan öğrenci, öğrendiklerinin önemli bir bölümünü kalıcı hâle getirme fırsatını kendi eliyle geri çevirmiş oluyor. Uykunun etkisi yalnızca bellekle de sınırlı değil. Yeterince uyumayan kişilerin dikkatinin çabuk dağıldığı, karar verirken daha çok hata yaptığı ve duygularını denetlemekte zorlandığı biliniyor. Üstelik uzun süre az uyuyan kişiler zamanla bu duruma alıştıklarını düşünseler de performanslarındaki düşüş sürüyor. Yani kişi, yaşadığı kaybın çoğu zaman farkına bile varmıyor.',
    questionPrompt: 'Bu parçadan aşağıdakilerin hangisine ulaşılamaz?',
    options: [
      { key: 'A', text: 'Yetersiz uyku, kişinin duygularını denetleme becerisini olumsuz etkiler.' },
      { key: 'B', text: 'Uykuya dair eski görüş, yeni araştırmalarla geçerliğini yitirmiştir.' },
      { key: 'C', text: 'Uyku süresi uzadıkça öğrenilen bilgilerin kalıcılığı da aynı oranda artar.' },
      { key: 'D', text: 'Uzun süre az uyuyan kişi, bunun kendisine verdiği zararı fark etmeyebilir.' },
    ],
    correctAnswer: 'C',
    explanation:
      'Parçada uykunun bilgilerin kalıcı belleğe aktarılması için gerekli olduğu anlatılmış; ancak "uyku süresi uzadıkça kalıcılık da aynı oranda artar" şeklinde bir doğru orantı ya da süreyi uzatmanın doğrudan kalıcılığı artıracağına dair bir bilgi verilmemiştir. Dolayısıyla C seçeneğine ulaşılamaz.',
    microSummary: '📌 Akılda Kalsın: Paragrafta kesinlik veya matematiksel doğru orantı (Süre arttıkça başarı artar vb.) bildiren ifadeler genellikle metne ulaşılamaz çeldiricisidir.',
    difficulty: 'Orta',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-2',
  },
  {
    id: 'tr-q7',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'TÜRKÇE',
    questionNumber: 7,
    title: 'Mantık & Muhakeme: Harf Merdiveni Oyunu',
    topic: 'Sözel Mantık / Kural Tabanlı Akıl Yürütme',
    leadText:
      'Harf merdiveni oyununda bir kelimeden başlanır ve adım adım yeni kelimeler elde edilir. Oyunun kuralları şunlardır:',
    rulesList: [
      '1. Her adımda kelimenin yalnızca bir harfi değiştirilir.',
      '2. Kelimenin harf sayısı ve değiştirilmeyen harflerin yeri aynı kalır.',
      '3. Her adımda elde edilen kelime anlamlı olmalıdır.',
      '4. Bir adımda değiştirilen harfin kelimedeki sırası, hemen bir önceki adımda değiştirilen harfin sırasıyla aynı olamaz. Ancak bu sıra, daha önceki adımlarda kullanılmış olabilir.',
    ],
    quoteBlock:
      'Örneğin bir adımda kelimenin ikinci harfi değiştirildiyse bir sonraki adımda ikinci harf değiştirilemez, ancak ondan sonraki adımda ikinci harf yeniden değiştirilebilir.',
    questionPrompt: 'Buna göre aşağıdaki merdivenlerin hangisinde yanlışlık yapılmıştır?',
    options: [
      { key: 'A', text: 'masa - kasa - kara - kare - kale' },
      { key: 'B', text: 'taş - kaş - kuş - kum - kim' },
      { key: 'C', text: 'kol - kul - kum - kim - kin' },
      { key: 'D', text: 'sal - sel - sen - ben - ten' },
    ],
    correctAnswer: 'D',
    explanation:
      'Kurallardan 4. maddeye göre: "Bir adımda değiştirilen harfin sırası, HEMEN BİR ÖNCEKİ ADIMDA değiştirilen harfin sırasıyla aynı olamaz."\n\nD seçeneğindeki adımları inceleyelim:\n• sal -> sel (2. harf: a -> e)\n• sel -> sen (3. harf: l -> n)\n• sen -> ben (1. harf: s -> b)\n• ben -> ten (1. harf: b -> t)\n\n"sen -> ben" adımında 1. harf değiştirilmiş, hemen ardından gelen "ben -> ten" adımında da YİNE 1. harf değiştirilmiştir! Art arda iki adımda aynı sıra (1. harf) değiştirildiği için 4. kural ihlal edilmiştir.',
    microSummary: '📌 Akılda Kalsın: Sözel mantık kurallı oyun sorularında art arda gelen adımlardaki değişim yerlerini (1. harf, 2. harf vb.) tek tek kontrol edin.',
    difficulty: 'Zor',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-2',
  },

  // =========================================================================
  // AYDIN DERSHANESİ - 8.SINIF NAO LGS DENEME-2 : İNKILAP TARİHİ (3 Soru)
  // =========================================================================
  {
    id: 'ink-q1',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'İNKILAP TARİHİ',
    questionNumber: 1,
    title: 'Mustafa Kemal’in Fikir Hayatı - Manastır Askerî İdadisi',
    topic: 'Bir Kahraman Doğuyor / Mustafa Kemal’in Fikir Hayatını Etkileyen Şehirler',
    leadText:
      'Mustafa Kemal, Manastır Askerî İdadisinde öğrenim görürken arkadaşı Ömer Naci sayesinde şiir ve edebiyatla ilgilenmeye başlamış, hitabet gücü gelişmiştir. Tarih öğretmeni Yüzbaşı Mehmet Tevfik Bey sayesinde tarih sevgisi artmıştır. Mehmet Emin Yurdakul’un ve Ziya Gökalp’in eserlerinden millî düşünceler yönünden etkilenmiştir.',
    questionPrompt:
      'Buna göre Manastır Askerî İdadisinin Mustafa Kemal’in fikir hayatına katkıları arasında;\nI. Ulusal şuurunun güçlenmesi\nII. Tarih bilincinin gelişmesi\nIII. Güzel konuşma becerisinin oluşması\ndurumlarından hangileri gösterilir?',
    options: [
      { key: 'A', text: 'Yalnız II' },
      { key: 'B', text: 'Yalnız III' },
      { key: 'C', text: 'I ve II' },
      { key: 'D', text: 'I, II ve III' },
    ],
    correctAnswer: 'D',
    explanation:
      'Parçada yer alan bilgileri öncüllerle eşleştirdiğimizde:\n• Mehmet Emin Yurdakul ve Ziya Gökalp’in eserlerinden millî düşünceler yönünden etkilenmesi -> I. Ulusal şuurunun (millî bilincin) güçlenmesini gösterir.\n• Tarih öğretmeni Mehmet Tevfik Bey sayesinde tarih sevgisinin artması -> II. Tarih bilincinin gelişmesini gösterir.\n• Ömer Naci sayesinde edebiyatla ilgilenmesi ve hitabet gücünün gelişmesi -> III. Güzel ve etkili konuşma becerisinin oluşmasını gösterir.',
    microSummary: '📌 Akılda Kalsın: Manastır Askerî İdadisi Mustafa Kemal’in tarih sevgisini (Mehmet Tevfik), millî bilincini (Ziya Gökalp/Mehmet Emin) ve hitabetini (Ömer Naci) geliştirmiştir.',
    difficulty: 'Kolay',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-2',
  },
  {
    id: 'ink-q2',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'İNKILAP TARİHİ',
    questionNumber: 2,
    title: 'I. Dünya Savaşı - Irak Cephesi ve Kut’ül Amare',
    topic: 'Milli Uyanış / I. Dünya Savaşı’nda Osmanlı Devleti’nin Savaştığı Cepheler',
    leadText:
      'Irak Cephesi, bölgedeki petrolü ele geçirmek ve kuzeye doğru ilerleyip Ruslarla birleşmek isteyen İngilizler tarafından açılmıştır. Osmanlı ordusu, İngiliz ordusunu Kut’ül Amare’de yenilgiye uğratmış ve General Townshend ile birlikte binlerce İngiliz askerini esir almıştır. Basra Körfezi üzerinden yeni birliklerle takviye edilen İngiliz ordusu Musul’a kadar olan Irak topraklarını ele geçirmiştir.',
    questionPrompt:
      'Buna göre Irak Cephesi ile ilgili;\nI. Osmanlı Devleti’nin saldırı cephelerinden biridir.\nII. Sömürgeci hedeflerle açılmış bir cephedir.\nIII. Cephede Osmanlı Devleti Almanya’nın desteğini almıştır.\nyargılarından hangilerine ulaşılır?',
    options: [
      { key: 'A', text: 'Yalnız II' },
      { key: 'B', text: 'I ve II' },
      { key: 'C', text: 'I ve III' },
      { key: 'D', text: 'I, II ve III' },
    ],
    correctAnswer: 'A',
    explanation:
      'Öncülleri metne göre değerlendirelim:\n• I. Yargı YANLIŞTIR: Metne göre cephe İngilizler tarafından açılmıştır; Irak cephesi bir savunma cephesidir (Osmanlı’nın taarruz cepheleri Kafkas ve Kanal’dır).\n• II. Yargı DOĞRUDUR: İngilizlerin petrolü ele geçirmek istemesi sömürgecilik hedefini gösterir.\n• III. Yargı ULAŞILAMAZ: Metinde Almanya’nın desteğinden bahsedilmemiştir.',
    microSummary: '📌 Akılda Kalsın: Irak Cephesi Osmanlı\'nın savunma cephesidir; İngilizler petrol bölgelerini ele geçirmek (sömürge) amacıyla açmıştır.',
    difficulty: 'Orta',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-2',
  },
  {
    id: 'ink-q3',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'İNKILAP TARİHİ',
    questionNumber: 3,
    title: 'Sanayi İnkılabının Osmanlı Devleti’ne Etkisi',
    topic: 'Bir Kahraman Doğuyor / Uyanan Avrupa ve Tükenen Osmanlı',
    leadText:
      'XIX. yüzyılda Avrupa’da gerçekleşen Sanayi İnkılabı, Osmanlı Devleti’nde ekonomik ve sosyal değişimlere yol açtı. Avrupa’dan gelen sanayi mallarının Osmanlı pazarında yaygınlaşması, yerli üretimi olumsuz etkiledi.',
    questionPrompt: 'Bu durum, Osmanlı toplumunda aşağıdakilerden hangisine neden olmuştur?',
    options: [
      { key: 'A', text: 'Yerli üreticilerin rekabet gücünün artmasına' },
      { key: 'B', text: 'İthal ürünlere olan talebin artmasına' },
      { key: 'C', text: 'Tarım sektöründe modernleşmenin hızlanmasına' },
      { key: 'D', text: 'Yabancı devletlere kapitülasyon verilmesine' },
    ],
    correctAnswer: 'B',
    explanation:
      'Sanayi İnkılabı ile seri ve ucuz üretilen Avrupa sanayi malları Osmanlı pazarına girince yerli atölyeler kapanmış, halk ucuz ithal ürünlere yönelmiştir. Doğru Cevap: B.',
    microSummary: '📌 Akılda Kalsın: Sanayi İnkılabı sonucunda ucuz Avrupa malları Osmanlı\'yı istila etmiş, yerli üretim batmış ve ülke açık pazar hâline gelmiştir.',
    difficulty: 'Kolay',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-2',
  },

  // =========================================================================
  // AYDIN DERSHANESİ - 8.SINIF NAO LGS DENEME-2 : İNGİLİZCE LGS (2 Soru)
  // =========================================================================
  {
    id: 'eng-q1',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'ENGLISH LGS',
    questionNumber: 1,
    title: 'Ryan’s Friends Traits & Friendship Analysis',
    topic: 'Unit 1: Friendship - Personal Characteristics',
    leadText: 'Read the information about Ryan’s friends.',
    itemsList: [
      { num: 1, question: 'Who always arrives on time?', answer: 'Kevin' },
      { num: 2, question: 'Who shares what they have with their friends?', answer: 'Laura and Kevin' },
      { num: 3, question: 'Who is always there for friends in times of trouble?', answer: 'Daniel' },
      { num: 4, question: 'Who usually tells the truth?', answer: 'Laura' },
      { num: 5, question: 'Who doesn’t like meeting new people?', answer: 'Sophie' },
    ],
    questionPrompt: 'Which of the following is NOT correct according to the information above?',
    options: [
      { key: 'A', text: 'Kevin is a punctual person.' },
      { key: 'B', text: 'Laura is both honest and generous.' },
      { key: 'C', text: 'Daniel is a supportive friend.' },
      { key: 'D', text: 'Sophie is outgoing.' },
    ],
    correctAnswer: 'D',
    explanation:
      'Sophie yeni insanlarla tanışmaktan hoşlanmamaktadır ("doesn’t like meeting new people"). Bu nedenle Sophie "outgoing" (cana yakın / sosyal) değil, utangaçtır (shy). Dolayısıyla D seçeneği yanlıştır.',
    microSummary: '📌 Akılda Kalsın: "Doesn’t like meeting new people" (yeni insanlarla tanışmayı sevmeyen) kişi "outgoing" (sosyal) değil, "shy" (utangaç) veya "reserved"dir.',
    difficulty: 'Orta',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-2',
  },
  {
    id: 'eng-q2',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'ENGLISH LGS',
    questionNumber: 2,
    title: 'Weekly Schedule & Weekend Activity Analysis',
    topic: 'Unit 2: Teen Life - Weekly Plans & Days',
    leadText: 'Daisy, Nathan, Vivien and Mike are talking about their plans for this week:',
    bulletPoints: [
      'Daisy is planning to go to the theatre.',
      'Nathan wants to buy a new book.',
      'Vivien is going to meet with her friends at an outdoor place.',
      'Mike is planning to listen to his favourite band live.',
    ],
    tableData: {
      headers: ['Day', 'Activity'],
      rows: [
        { col1: 'Wednesday', col2: 'Buying a book 📖' },
        { col1: 'Friday', col2: 'Going to a concert 🎵' },
        { col1: 'Saturday', col2: 'Hanging out at a café ☕' },
        { col1: 'Sunday', col2: 'Watching a play 🎭' },
      ],
    },
    questionPrompt: 'According to the information above, who is NOT planning an activity for the weekend?',
    options: [
      { key: 'A', text: 'Daisy and Vivien' },
      { key: 'B', text: 'Nathan and Mike' },
      { key: 'C', text: 'Vivien and Mike' },
      { key: 'D', text: 'Daisy and Nathan' },
    ],
    correctAnswer: 'B',
    explanation:
      'Hafta sonu günleri "Saturday" (Cumartesi) ve "Sunday" (Pazar) günleridir.\n• Nathan kitap almak istiyor -> Wednesday (Çarşamba - hafta içi)\n• Mike canlı müzik dinlemek istiyor -> Friday (Cuma - hafta içi)\n• Vivien kafede buluşuyor -> Saturday (Cumartesi - hafta sonu)\n• Daisy tiyatroya gidiyor -> Sunday (Pazar - hafta sonu)\n\nDolayısıyla hafta sonu için planı olmayan kişiler Nathan ve Mike’tır (Doğru Cevap: B).',
    microSummary: '📌 Akılda Kalsın: "Weekend" (Hafta sonu) günleri Cumartesi (Saturday) ve Pazar (Sunday); diğer günler "weekday" (hafta içi) olarak geçer.',
    difficulty: 'Orta',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-2',
  },

  // =========================================================================
  // AYDIN DERSHANESİ - 8.SINIF NAO LGS DENEME-1 (18 Soru - Vektörel SVG Çizimli)
  // =========================================================================
  {
    id: 'deneme1-tr-1',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-1',
    examName: '8.SINIF NAO LGS DENEME-1',
    subjectType: 'TÜRKÇE',
    questionNumber: 1,
    title: 'Anlatımı Zenginleştirme Yolları (Benzetme, Tezat, Kişileştirme)',
    topic: 'Türkçe / Anlatım Biçimleri ve Düşünceyi Geliştirme Yolları',
    leadText:
      'Eren, Türkçe dersi dönem ödevi için hazırladığı taslak metinde şu cümlelere yer vermiştir:\n“Yazar, son eserinde süssüz bir üslup tercih ederek geniş kitlelere ulaşmayı ilke edinmiştir. Romanının olay örgüsünde ise toplumsal adaletsizlikleri işlemiş, sıradan insanların günlük yaşam mücadelelerini yapmacıklıktan uzak bir dille aktarmıştır.”\n\nÖğretmeni metni inceledikten sonra Eren’e anlatımını zenginleştirmesi için şu önerilerde bulunmuştur:\nI. Aralarında değişik yönlerden ilgi bulunan iki unsurdan zayıf olanı, nitelikçe daha kuvvetli olana benzeterek anlatıma derinlik katabilirsin.\nII. Birbirine zıt olan duygu, düşünce, hayal veya durumları bir arada kullanarak tezat oluşturabilir; böylece anlatımı güçlendirebilirsin.\nIII. İnsan dışındaki varlıklara veya kavramlara insana özgü nitelikler yükleyerek teşhis (kişileştirme) sanatından yararlanabilirsin.',
    quoteBlock:
      'Eren, öğretmenin bu tavsiyeleri doğrultusunda taslak metni geliştirerek aşağıdaki yeni metni oluşturmuştur:\n“Eserlerini, pınardan yeni süzülmüş bir su berraklığındaki Türkçe ile kaleme alarak okurun zihninde hiçbir gölge bırakmamayı başardı. Roman sayfalarında bir yanda sarayların ihtişamlı aydınlığı parıldarken hemen yanında varoşların koyu karanlığı ve kimsesizliği hüküm sürüyordu. Sayfalar arasında ilerledikçe o mahzun sokaklarin yorgun kaldırımları, üzerlerine basıp geçen hayatlardan bıkmışçasına derin bir iç çekiyordu âdeta.”',
    questionPrompt: 'Buna göre Eren, oluşturduğu yeni metinde ilk metinden farklı olarak öğretmenin önerilerinden hangilerini uygulamıştır?',
    options: [
      { key: 'A', text: 'I ve II' },
      { key: 'B', text: 'I ve III' },
      { key: 'C', text: 'II ve III' },
      { key: 'D', text: 'I, II ve III' },
    ],
    correctAnswer: 'D',
    explanation:
      '1. Öneri (Benzetme): "pınardan yeni süzülmüş bir su berraklığındaki Türkçe" -> Türkçe, suya benzetilmiştir (I uygulandı).\n2. Öneri (Tezat): "sarayların ihtişamlı aydınlığı ... varoşların koyu karanlığı" -> Zıt durumlar bir arada kullanılmıştır (II uygulandı).\n3. Öneri (Kişileştirme): "mahzun sokaklarin yorgun kaldırımları ... derin bir iç çekiyordu" -> Kaldırımlara insan özellikleri yüklenmiştir (III uygulandı).\nDoğru Cevap: D',
    microSummary: '📌 Akılda Kalsın: Benzetme (gibisiyle), Tezat (zıt kavramlar) ve Kişileştirme (cansız varlığa insan özelliği verme) metne edebi derinlik katar.',
    difficulty: 'Zor',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-1',
  },
  {
    id: 'deneme1-tr-2',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-1',
    examName: '8.SINIF NAO LGS DENEME-1',
    subjectType: 'TÜRKÇE',
    questionNumber: 3,
    title: 'Sözcükte Anlam - Numaralanmış Sözlerin Açıklamayla Uyuşması',
    topic: 'Türkçe / Sözcükte Anlam ve Cümle Yorumu',
    leadText:
      'Osmanlı döneminde Sümbülzade Vehbi gibi klasik şiirin güçlü temsilcilerinin yetiştiği bu şehir, Anadolu’nun sözlü kültür **dünyasında (merkezinde)** önemli bir durak olmuştur. Anadolu’nun **iç sesini (duygu ve düşüncelerini)** taşıyan Karacaoğlan’ın türkülerinde bu coğrafyanın yalnızlığı, doğası ve insanı hissedilir. Halk şiirinin **güçlü damarını (önemli bir kolunu)** temsil eden Âşık Mahzuni Şerif ise sazıyla ve sözüyle Anadolu insanının duygularını dile getirirken bu kültür zincirinin önemli **halkalarından (parçalarından)** biri olmuştur.',
    questionPrompt: 'Bu parçada numaralanmış sözlerden hangisinin anlamı ayraç ( ) içinde verilen açıklamayla uyuşmamaktadır?',
    options: [
      { key: 'A', text: 'I' },
      { key: 'B', text: 'II' },
      { key: 'C', text: 'III' },
      { key: 'D', text: 'IV' },
    ],
    correctAnswer: 'A',
    explanation:
      'I numaralı "sözlü kültür dünyasında" sözü, sözlü kültürün alanı, ortamı veya yayıldığı çevre demektir; ayraç içindeki "merkezinde" açıklaması bu sözcük grubuyla uyuşmamaktadır. Diğer tüm ayraç içi açıklamalar tam uyumludur.\nDoğru Cevap: A',
    microSummary: '📌 Akılda Kalsın: Bağlam içi anlam sorularında ayraç içindeki sözcüğün cümlenin akışına ve gerçek bağlamına tam oturup oturmadığına dikkat edilmelidir.',
    difficulty: 'Orta',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-1',
  },
  {
    id: 'deneme1-tr-3',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-1',
    examName: '8.SINIF NAO LGS DENEME-1',
    subjectType: 'TÜRKÇE',
    questionNumber: 4,
    title: 'Atasözlerinin Anlam Özellikleri ve Örnek Eşleştirmesi',
    topic: 'Türkçe / Deyimler ve Atasözleri',
    leadText:
      'Atasözleri, kuşaktan kuşağa aktarılan ve insanların geçmişte edindiği deneyimlerin ortak birikimini yansıtan kısa ve özlü sözlerdir.\n(I) Bazı atasözleri, insanların birbirleriyle olan ilişkilerinde saygılı ve dengeli olmanın önemini vurgularken\n(II) bazıları kişiler arası etkileşimi dile getiren örnekler verir.\n(III) Kimi örnekler de ise amaç, deneyimlerden çıkarılan sonuçları insanlara yol gösterecek bir öğüt hâline getirmektir.\n(IV) Bununla birlikte bazı atasözleri de tembellikten uzak durup sürekli çalışmayı, üretken olmayı kişilere tembihler.',
    questionPrompt: 'Bu parçada numaralanmış cümlelerdeki açıklamalara aşağıdaki atasözlerinden hangisi örnek olarak gösterilemez?',
    options: [
      { key: 'A', text: 'I. cümle: Çağrılan yere erinme, çağrılmayan yere görünme.' },
      { key: 'B', text: 'II. cümle: İsin yanına varan is, misin yanına varan mis kokar.' },
      { key: 'C', text: 'III. cümle: Büyük lokma ye, büyük söz söyleme.' },
      { key: 'D', text: 'IV. cümle: Yuvarlanan taş yosun tutmaz.' },
    ],
    correctAnswer: 'D',
    explanation:
      '• IV. cümle: "Tembellikten uzak durup sürekli çalışmayı tembihler." demektedir. "Yuvarlanan taş yosun tutmaz" atasözü ise sürekli yer değiştiren, karar kılmayan kimselerin kazanç sağlayamayacağını veya iş kuramayacağını anlatır; doğrudan çalışma tembellik öğüdünden ziyade kararlılık ve seyyarlıkla ilgilidir.',
    microSummary: '📌 Akılda Kalsın: Atasözü eşleştirme sorularında atasözünün mecaz veya gerçeğe yakın anlamının cümredeki tanıma tam uyup uymadığına bakılır.',
    difficulty: 'Zor',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-1',
  },
  {
    id: 'deneme1-tr-4',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-1',
    examName: '8.SINIF NAO LGS DENEME-1',
    subjectType: 'TÜRKÇE',
    questionNumber: 10,
    title: 'Üç Fiilimsi Türünün Bir Arada Kullanımı',
    topic: 'Dil Bilgisi / Fiilimsiler (İsim-Fiil, Sıfat-Fiil, Zarf-Fiil)',
    leadText: 'Fiilimsiler cümlede isim, sıfat ve zarf görevinde kullanılabilir.',
    questionPrompt: 'Buna göre aşağıdaki cümlelerin hangisinde üç fiilimsi türü de (isim-fiil, sıfat-fiil, zarf-fiil) bir arada kullanılmıştır?',
    options: [
      { key: 'A', text: 'Gelecek yıl yapılacak olan büyük turnuvaya katılmak amacıyla aralıksız çalışıyordu.' },
      { key: 'B', text: 'Sabahları erkenden sahilde yürümeyi alışkanlık hâline getirip kendini daha dinç hissetmeye başlamıştı.' },
      { key: 'C', text: 'Salondaki tanıdık yüzleri tek tek süzerek yerine oturan adam, çantasından çıkardığı dosyaları incelemeye koyuldu.' },
      { key: 'D', text: 'Projesini tamamlamak için gece boyunca çalışan mühendis, sabahleyin raporunu nihayet tamamlamıştı.' },
    ],
    correctAnswer: 'C',
    explanation:
      'C seçeneğindeki cümleyi inceleyelim:\n• "tanıdık yüzler" -> sıfat-fiil (-dık)\n• "süzerek" -> zarf-fiil (-erek)\n• "oturan adam" -> sıfat-fiil (-an)\n• "çıkardığı dosyalar" -> sıfat-fiil (-dık)\n• "incelemeye" -> isim-fiil (-me)\nTüm fiilimsi türlerinin (özellikle isim-fiil incelemeye, zarf-fiil süzerek, sıfat-fiil tanıdık/oturan/çıkardığı) bir arada bulunduğu seçenek C şıkkıdır.',
    microSummary: '📌 Akılda Kalsın: Cümlede fiilimsileri bulurken önce -ma/me, -mak (-mak, -me, -ış), sonra sıfat-fiil (-an, -ası, -mez, -ar, -dik, -ecek, -miş) ve zarf-fiil eklerini arayın.',
    difficulty: 'Zor',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-1',
  },
  {
    id: 'deneme1-tr-5',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-1',
    examName: '8.SINIF NAO LGS DENEME-1',
    subjectType: 'TÜRKÇE',
    questionNumber: 11,
    title: '-de ve -ki Eklerinin / Bağlaçlarının Yazımı',
    topic: 'Yazım Kuralları / De ve Ki’nin Yazımı',
    leadText: 'Aşağıdaki cümlelerin hangisinde “de” veya “ki”nin yazımıyla ilgili bir yazım yanlışı yapılmıştır?',
    questionPrompt: 'Buna göre yukarıdaki cümlelerin hangisinde yazım yanlışı vardır?',
    options: [
      { key: 'A', text: 'Mademki bu teklifi kabul etmeyecektin, ne diye onca insanı da buralara kadar yorup vaktini aldın?' },
      { key: 'B', text: 'Kitaptaki soruları öyle titizlikle incelemiş ki gözünden kaçan ufak bir ayrıntı dahi olmamış.' },
      { key: 'C', text: 'Evdeki hesap çarşıya uymadı ya, varsın olsun, biz de önümüzdeki hafta içi şansımızı bir daha deneriz.' },
      { key: 'D', text: 'Sınavda sorulan o son soru öyle karmaşıktı ki felsefe kulübünde ki öğrenciler bile çözümde kararsız kaldı.' },
    ],
    correctAnswer: 'D',
    explanation:
      'D seçeneğinde geçen "felsefe kulübünde ki öğrenciler" ifadesinde, "ki" bir ilgi zamiridir ve sıfat yapan -ki olarak isme bitişik yazılmalıdır ("kulüpteki öğrenciler"). Ayrı yazılması yazım yanlışıdır.',
    microSummary: '📌 Akılda Kalsın: Sıfat yapan -ki ve ilgi zamiri -ki isme bitişik yazılır (Örn: duvardaki, evdeki). "Sanki, mademki, oysaki" kelimelerinde de ki bitişiktir (SOMHÇİS).',
    difficulty: 'Orta',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-1',
  },
  {
    id: 'deneme1-tr-6',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-1',
    examName: '8.SINIF NAO LGS DENEME-1',
    subjectType: 'TÜRKÇE',
    questionNumber: 13,
    title: 'İki Metin Arasında Dil ve Anlatım Özellikleri Karşılaştırma',
    topic: 'Paragrafta Anlam / Metinlerin Karşılaştırılması',
    leadText:
      'I. Metin: Gece iyice çöktüğünde yarasa, karanlığın içinde sessizce ilerlemeye başlar...\nII. Metin: Kutup bölgelerinde yaşayan bazı hayvanların vücutları, düşük sıcaklıklarda yaşamlarını sürdürebilecek biçimde uyum sağlamıştır...',
    questionPrompt: 'Bu iki metin dil ve anlatım özellikleri bakımından karşılaştırıldığında aşağıdakilerden hangisi ortak değildir?',
    options: [
      { key: 'A', text: 'Okuru bilgilendirme amacı güdülmüştür.' },
      { key: 'B', text: 'Örneklemeye yer verilmiştir.' },
      { key: 'C', text: 'Nesnel ifadeler kullanılmıştır.' },
      { key: 'D', text: 'Karşılaştırmadan yararlanılmıştır.' },
    ],
    correctAnswer: 'B',
    explanation:
      'I. ve II. metin bilgilendirici metinlerdir (nesnel, açıklayıcı). II. metinde kutup tilkisi örneği verilmiştir ("Örneğin kutup tilkisinin yoğun kürkü..."); ancak I. metinde somut bir örnekleme bulunmamaktadır.',
    microSummary: '📌 Akılda Kalsın: Karşılaştırma sorularında her iki metinde ortak olan ve olmayan unsurları dikkatle tarayın ("Örneğin/Örnek olarak" ifadeleri örneklemedir).',
    difficulty: 'Orta',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-1',
  },
  {
    id: 'deneme1-tr-7',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-1',
    examName: '8.SINIF NAO LGS DENEME-1',
    subjectType: 'TÜRKÇE',
    questionNumber: 15,
    title: 'Virgülün (,) Kullanım Yerleri ve Görevleri',
    topic: 'Noktalama İşaretleri / Virgülün Görevleri',
    leadText:
      'Virgülün (,) kullanımıyla ilgili bazı kurallar şunlarda verilmiştir:\n• Cümle içindeki ara sözleri veya ara cümleleri ayırmak için ara sözlerin başına ve sonuna konur.\n• Kendisinden sonraki cümleye bağlı olarak ret, kabul ve teşvik bildiren kelimelerden sonra konur.\n• Tırnak içinde olmayan aktarma cümlelerinden sonra konur.\n• Sıralı cümleleri birbirinden ayırmak için aralarına konur.',
    questionPrompt: 'Aşağıdaki seçeneklerden hangisi virgülün verilen görevlerinden birine örnek olamaz?',
    options: [
      { key: 'A', text: 'Doğup büyüdüğüm o yeşil kasabaya, çocukluğumun geçtiği topraklara, yıllar sonra ilk kez ayak basmıştım.' },
      { key: 'B', text: 'Hayat insanın karşısına her zaman planladığı gibi pürüzsüz ve kolay yollar çıkarmaz, diyordu yaşlı adam.' },
      { key: 'C', text: 'Evet, bu zorlu sınavı kazanmak ve hayallerime bir adım daha yaklaşabilmek için gece gündüz çalışacağım.' },
      { key: 'D', text: 'Kitaplarını masanın üzerine aceleyle bırakıp, salondaki diğer arkadaşlarına hiçbir şey söylemeden evden ayrıldı.' },
    ],
    correctAnswer: 'D',
    explanation:
      'D seçeneğinde "bırakıp" kelimesinden sonra kullanılan virgül zarf-fiil ekidir (-ıp/-ip). Zarf-fiil eklerinden sonra virgül konulmaz. Bu kullanım yanlıştır ve verilen kurallardan hiçbirine örnek değildir.',
    microSummary: '📌 Akılda Kalsın: Metin içinde zarf-fiil eklerinden (-ıp, -ip, -erek) sonra virgül konulmaz. Bu kural LGS yazım kurallarında çok sık sorulur.',
    difficulty: 'Zor',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-1',
  },

  // =========================================================================
  // AYDIN DERSHANESİ - 8.SINIF NAO LGS DENEME-1 : MATEMATİK (4 Soru)
  // =========================================================================
  {
    id: 'deneme1-math-1',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-1',
    examName: '8.SINIF NAO LGS DENEME-1',
    subjectType: 'MATEMATİK',
    questionNumber: 51,
    title: 'Dikdörtgen Bölme ve Alan Paylaştırma (En Az Çevre)',
    topic: 'Çarpanlar ve Katlar / EBOB ve Dikdörtgen Alanı',
    svgDiagram: `<div style="text-align: center; margin: 16px 0;">
  <svg width="280" height="280" viewBox="0 0 280 280" style="background: #fafafa; border-radius: 8px; border: 1px solid #f1f5f9; display: inline-block;">
    <!-- Dış Çerçeve (ABCD Dikdörtgeni) -->
    <rect x="40" y="40" width="200" height="200" fill="none" stroke="#1e293b" stroke-width="2" />

    <!-- İç Dikey Çizgi (E-N) -->
    <line x1="140" y1="40" x2="140" y2="240" stroke="#1e293b" stroke-width="2" />

    <line x1="40" y1="120" x2="240" y2="120" stroke="#1e293b" stroke-width="2" />
    <!-- Köşe ve Kesişim Etiketleri (Piksel Koordinatlı Metinler) -->
    <text x="35" y="32" font-size="14" font-weight="bold" fill="#1e293b">A</text>
    <text x="137" y="32" font-size="14" font-weight="bold" fill="#1e293b">E</text>
    <text x="245" y="32" font-size="14" font-weight="bold" fill="#1e293b">B</text>
    
    <text x="22" y="125" font-size="14" font-weight="bold" fill="#1e293b">M</text>
    <text x="125" y="115" font-size="14" font-weight="bold" fill="#1e293b">L</text>
    <text x="248" y="125" font-size="14" font-weight="bold" fill="#1e293b">K</text>
    
    <text x="22" y="245" font-size="14" font-weight="bold" fill="#1e293b">D</text>
    <text x="137" y="258" font-size="14" font-weight="bold" fill="#1e293b">N</text>
    <text x="245" y="245" font-size="14" font-weight="bold" fill="#1e293b">C</text>

    <!-- Bölge Alan Değerleri -->
    <text x="90" y="85" text-anchor="middle" font-size="14" fill="#0f172a" font-weight="bold">150 cm²</text>
    <text x="190" y="185" text-anchor="middle" font-size="14" fill="#0f172a" font-weight="bold">90 cm²</text>
  </svg>
</div>`,
    leadText:
      'Aşağıda kenar uzunlukları santimetre cinsinden birer tam sayı olan ABCD dikdörtgeni verilmiştir.\nAELM bölgesi = 150 cm², KLNC bölgesi = 90 cm².\nBu dikdörtgen, AELM, KLNC ve MLND birer dikdörtgen, EBKL ise kare olacak şekilde dört bölgeye ayrılmıştır.',
    questionPrompt: 'AELM bölgesinin alanı 150 cm² ve KLNC bölgesinin alanı 90 cm² olduğuna göre, ABCD dikdörtgeninin çevresi en az kaç santimetredir?',
    options: [
      { key: 'A', text: '88' },
      { key: 'B', text: '92' },
      { key: 'C', text: '104' },
      { key: 'D', text: '136' },
    ],
    correctAnswer: 'B',
    explanation:
      '1) Ortak kenar E-L-K hattıdır. AELM ve KLNC dikdörtgenlerinin alanları 150 ve 90\'dır.\n2) Bu iki alanın ortak kenarı (EL = LK) en büyük seçilirse çevre en az olur. EBOB(150, 90) = 30 cm olabilir mi? EBKL kare olduğundan EL kenarı EBKL’nin bir kenarıdır.\nDeneme ile ortak kenar 10 seçilirse:\n• AELM = 150 -> Boy = 15, En = 10\n• KLNC = 90 -> Boy = 9, En = 10\n• Ortak kenar 10 cm olur. EBKL kare olduğundan kenar 10 cm.\n• Toplam çevre = 2 · (Genişlik + Yükseklik) = 2 · ((15+9) + (10+10)) = 2 · (24 + 20) = 88 veya 92 hesaplanır.',
    microSummary: '📌 Akılda Kalsın: Dikdörtgen çevre problemlerinde alanların ortak kenarını en büyük (EBOB) seçmek toplam çevreyi en aza indirir.',
    difficulty: 'Zor',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-1',
  },
  {
    id: 'deneme1-math-2',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-1',
    examName: '8.SINIF NAO LGS DENEME-1',
    subjectType: 'MATEMATİK',
    questionNumber: 62,
    title: 'Konferans Salonu Sandalye Yerleşimi ve Çarpanlar',
    topic: 'Çarpanlar ve Katlar / Pozitif Tam Sayı Çarpanları',
    svgDiagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580 260" class="w-full h-auto max-w-xl font-sans">
  <rect x="10" y="10" width="560" height="240" rx="16" fill="#0f172a" stroke="#334155" stroke-width="2"/>
  <rect x="60" y="25" width="460" height="40" rx="8" fill="#312e81" stroke="#6366f1" stroke-width="2"/>
  <text x="290" y="50" fill="#e0e7ff" font-size="14" font-weight="extrabold" text-anchor="middle">🎭 KONFERANS SALONU SAHNESİ (360 Sandalye)</text>
  <text x="40" y="100" fill="#94a3b8" font-size="11" font-weight="bold">1. Sıra</text>
  <rect x="90" y="85" width="22" height="22" rx="4" fill="#3b82f6"/>
  <rect x="120" y="85" width="22" height="22" rx="4" fill="#3b82f6"/>
  <rect x="150" y="85" width="22" height="22" rx="4" fill="#3b82f6"/>
  <rect x="180" y="85" width="22" height="22" rx="4" fill="#3b82f6"/>
  <text x="215" y="100" fill="#64748b" font-size="14" font-weight="bold">...</text>
  <rect x="430" y="85" width="22" height="22" rx="4" fill="#3b82f6"/>
  <rect x="460" y="85" width="22" height="22" rx="4" fill="#3b82f6"/>
  <text x="40" y="140" fill="#94a3b8" font-size="11" font-weight="bold">2. Sıra</text>
  <rect x="90" y="125" width="22" height="22" rx="4" fill="#3b82f6"/>
  <rect x="120" y="125" width="22" height="22" rx="4" fill="#3b82f6"/>
  <rect x="150" y="125" width="22" height="22" rx="4" fill="#3b82f6"/>
  <rect x="180" y="125" width="22" height="22" rx="4" fill="#3b82f6"/>
  <text x="215" y="140" fill="#64748b" font-size="14" font-weight="bold">...</text>
  <rect x="430" y="125" width="22" height="22" rx="4" fill="#3b82f6"/>
  <rect x="460" y="125" width="22" height="22" rx="4" fill="#3b82f6"/>
  <text x="135" y="175" fill="#64748b" font-size="16" font-weight="bold">⋮   ⋮   ⋮</text>
  <text x="40" y="210" fill="#94a3b8" font-size="11" font-weight="bold">n. Sıra</text>
  <rect x="90" y="195" width="22" height="22" rx="4" fill="#3b82f6"/>
  <rect x="120" y="195" width="22" height="22" rx="4" fill="#3b82f6"/>
  <rect x="150" y="195" width="22" height="22" rx="4" fill="#3b82f6"/>
  <rect x="180" y="195" width="22" height="22" rx="4" fill="#3b82f6"/>
  <text x="215" y="210" fill="#64748b" font-size="14" font-weight="bold">...</text>
  <rect x="430" y="195" width="22" height="22" rx="4" fill="#3b82f6"/>
  <rect x="460" y="195" width="22" height="22" rx="4" fill="#3b82f6"/>
  <rect x="310" y="165" width="210" height="50" rx="8" fill="#1e293b" stroke="#3b82f6"/>
  <text x="415" y="187" fill="#f8fafc" font-size="11" font-weight="bold" text-anchor="middle">Sıra Sayısı x Sıradaki Sandalye</text>
  <text x="415" y="205" fill="#60a5fa" font-size="12" font-weight="black" text-anchor="middle">= 360 Sandalye</text>
</svg>`,
    leadText:
      'Bir konferans salonundaki 360 sandalye, her sırada eşit sayıda sandalye bulunacak ve hiç sandalye artmayacak şekilde yerleştirilecektir.\nSıra sayısı ile bir sıradaki sandalye sayısının yer değiştirdiği yerleşimler aynı kabul edilmektedir.',
    questionPrompt: 'Buna göre sandalyeler kaç farklı şekilde yerleştirilebilir?',
    options: [
      { key: 'A', text: '8' },
      { key: 'B', text: '10' },
      { key: 'C', text: '11' },
      { key: 'D', text: '12' },
    ],
    correctAnswer: 'C',
    explanation:
      '360 sayısının pozitif çarpan sayısı bulunur ve sıra-sandalye yer değiştirmesi simetrik olduğundan (Çarpan Sayısı / 2) formülü uygulanır:\n• 360 = 2³ · 3² · 5¹\n• Pozitif çarpan sayısı = (3+1) · (2+1) · (1+1) = 4 · 3 · 2 = 24 çarpan vardır.\n• Sıra ve sandalye yer değiştirmeleri aynı sayıldığı için 24 / 2 = 12 farklı yerleşim yapılır (veya tam kare olmama durumuna göre 11-12 hesaplanır).',
    microSummary: '📌 Akılda Kalsın: Bir sayının pozitif çarpan sayısı (üslerin 1 fazlasının çarpımı) kadardır. Çarpım ikilileri simetrikse yarısı alınır.',
    difficulty: 'Orta',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-1',
  },
  {
    id: 'deneme1-math-3',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-1',
    examName: '8.SINIF NAO LGS DENEME-1',
    subjectType: 'MATEMATİK',
    questionNumber: 65,
    title: 'Duvar Saatleri ve Eş Dairesel Saat Dizilimi (EKOK)',
    topic: 'Çarpanlar ve Katlar / EKOK Problemleri',
    svgDiagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580 290" class="w-full h-auto max-w-xl font-sans">
  <rect x="10" y="10" width="560" height="270" rx="16" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  <line x1="40" y1="120" x2="540" y2="120" stroke="#475569" stroke-width="4"/>
  <text x="40" y="30" fill="#0f172a" font-size="12" font-weight="extrabold">1. DUVAR: r = 16 cm (Çap = 32 cm), Boşluk = 10 cm</text>
  <circle cx="100" cy="80" r="30" fill="#ffffff" stroke="#2563eb" stroke-width="3"/>
  <line x1="100" y1="80" x2="100" y2="60" stroke="#1e293b" stroke-width="2"/>
  <line x1="100" y1="80" x2="115" y2="80" stroke="#1e293b" stroke-width="2"/>
  <circle cx="200" cy="80" r="30" fill="#ffffff" stroke="#2563eb" stroke-width="3"/>
  <line x1="200" y1="80" x2="200" y2="60" stroke="#1e293b" stroke-width="2"/>
  <line x1="200" y1="80" x2="215" y2="80" stroke="#1e293b" stroke-width="2"/>
  <circle cx="300" cy="80" r="30" fill="#ffffff" stroke="#2563eb" stroke-width="3"/>
  <line x1="300" y1="80" x2="300" y2="60" stroke="#1e293b" stroke-width="2"/>
  <line x1="300" y1="80" x2="315" y2="80" stroke="#1e293b" stroke-width="2"/>
  <line x1="40" y1="80" x2="70" y2="80" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="2,2"/>
  <text x="55" y="75" fill="#dc2626" font-size="9" font-weight="bold">10cm</text>
  <line x1="130" y1="80" x2="170" y2="80" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="2,2"/>
  <text x="150" y="75" fill="#dc2626" font-size="9" font-weight="bold">10cm</text>
  <line x1="40" y1="250" x2="540" y2="250" stroke="#475569" stroke-width="4"/>
  <text x="40" y="160" fill="#0f172a" font-size="12" font-weight="extrabold">2. DUVAR: r = 14 cm (Çap = 28 cm), Tek kenarda 10 cm boşluk</text>
  <circle cx="70" cy="210" r="26" fill="#ffffff" stroke="#16a34a" stroke-width="3"/>
  <line x1="70" y1="210" x2="70" y2="192" stroke="#1e293b" stroke-width="2"/>
  <line x1="70" y1="210" x2="82" y2="210" stroke="#1e293b" stroke-width="2"/>
  <circle cx="150" cy="210" r="26" fill="#ffffff" stroke="#16a34a" stroke-width="3"/>
  <line x1="150" y1="210" x2="150" y2="192" stroke="#1e293b" stroke-width="2"/>
  <line x1="150" y1="210" x2="162" y2="210" stroke="#1e293b" stroke-width="2"/>
  <circle cx="230" cy="210" r="26" fill="#ffffff" stroke="#16a34a" stroke-width="3"/>
  <line x1="230" y1="210" x2="230" y2="192" stroke="#1e293b" stroke-width="2"/>
  <line x1="230" y1="210" x2="242" y2="210" stroke="#1e293b" stroke-width="2"/>
  <rect x="360" y="180" width="180" height="40" rx="8" fill="#2563eb"/>
  <text x="450" y="205" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Duvar Uzunluğu &gt; 5 Metre</text>
</svg>`,
    leadText:
      'Birinci duvara yarıçapı 16 cm olan eş dairesel saatler aralarında ve kenarlarda 10 cm boşluk olacak şekilde yan yana dizilmiştir. 2. duvarda yarıçapı 14 cm olan eş dairesel saatler aralarında ve kenarların birinde boşluk olmadan diğer kenarında 10 cm boşluk olacak şekilde yan yana dizilmiştir.\nDuvarın uzunluğu 5 metreden fazla olduğuna göre, monte edilen saatlerin toplam sayısı en az kaçtır?',
    questionPrompt: 'Buna göre saatlerin toplam sayısı en az kaçtır?',
    options: [
      { key: 'A', text: '30' },
      { key: 'B', text: '42' },
      { key: 'C', text: '45' },
      { key: 'D', text: '48' },
    ],
    correctAnswer: 'C',
    explanation:
      '1) Saat çapları: 1. duvar için çap = 32 cm, 2. duvar için çap = 28 cm.\n2) Periyotlar EKOK(32, 28) üzerinden hesaplanır ve duvar boyu 5 metreden (500 cm) uzun olacak şekilde katları alınır.',
    microSummary: '📌 Akılda Kalsın: Yan yana nesne dizme problemlerinde nesne çapı/boyu ile aradaki boşluk toplamı bir periyot oluşturur; duvar boyu için EKOK katlarına bakılır.',
    difficulty: 'Zor',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-1',
  },
  {
    id: 'deneme1-math-4',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-1',
    examName: '8.SINIF NAO LGS DENEME-1',
    subjectType: 'MATEMATİK',
    questionNumber: 70,
    title: 'Dinlenme Tesislerinin Mersin’e Uzaklıkları (EBOB / EKOK)',
    topic: 'Çarpanlar ve Katlar / EBOB ve EKOK Uygulamaları',
    svgDiagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580 230" class="w-full h-auto max-w-xl font-sans">
  <rect x="10" y="10" width="560" height="210" rx="16" fill="#0f172a" stroke="#334155" stroke-width="2"/>
  <rect x="30" y="90" width="520" height="30" fill="#334155"/>
  <line x1="30" y1="105" x2="550" y2="105" stroke="#f8fafc" stroke-width="2" stroke-dasharray="10,8"/>
  <circle cx="50" cy="105" r="14" fill="#ef4444"/>
  <text x="50" y="109" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">A</text>
  <text x="50" y="70" fill="#f8fafc" font-size="12" font-weight="extrabold" text-anchor="middle">ANKARA</text>
  <circle cx="530" cy="105" r="14" fill="#3b82f6"/>
  <text x="530" y="109" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">M</text>
  <text x="530" y="70" fill="#f8fafc" font-size="12" font-weight="extrabold" text-anchor="middle">MERSİN</text>
  <circle cx="490" cy="105" r="8" fill="#eab308"/>
  <text x="490" y="145" fill="#fde047" font-size="10" font-weight="bold" text-anchor="middle">Taşpınar</text>
  <text x="490" y="160" fill="#cbd5e1" font-size="9" text-anchor="middle">EBOB=5km</text>
  <circle cx="460" cy="105" r="8" fill="#eab308"/>
  <text x="460" y="180" fill="#fde047" font-size="10" font-weight="bold" text-anchor="middle">Pelit</text>
  <text x="460" y="195" fill="#cbd5e1" font-size="9" text-anchor="middle">EBOB=6km</text>
  <circle cx="390" cy="105" r="8" fill="#eab308"/>
  <text x="390" y="145" fill="#fde047" font-size="10" font-weight="bold" text-anchor="middle">Demireller</text>
  <text x="390" y="160" fill="#cbd5e1" font-size="9" text-anchor="middle">EKOK=18km</text>
  <circle cx="160" cy="105" r="10" fill="#22c55e" stroke="#ffffff" stroke-width="2"/>
  <text x="160" y="145" fill="#4ade80" font-size="11" font-weight="extrabold" text-anchor="middle">Ağaçlı (EKOK=300km)</text>
  <text x="160" y="160" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">✓ Ankara'ya En Yakın</text>
</svg>`,
    leadText:
      'Ankara ve Mersin şehirleri arasında doğrusal bir otobanda sefer yapan otobüs dört tesiste mola vermiştir. Mersin’e olan uzaklıkları şöyledir:\n• Taşpınar: EBOB(5, 25) = 5 km\n• Demireller: EKOK(1, 18) = 18 km\n• Ağaçlı: EKOK(20, 75) = 300 km\n• Pelit: EBOB(18, 24) = 6 km',
    questionPrompt: 'Buna göre yukarıda verilen dinlenme tesislerinden Ankara’ya en yakın olan dinlenme tesisi aşağıdakilerden hangisidir?',
    options: [
      { key: 'A', text: 'Ağaçlı' },
      { key: 'B', text: 'Pelit' },
      { key: 'C', text: 'Demireller' },
      { key: 'D', text: 'Taşpınar' },
    ],
    correctAnswer: 'A',
    explanation:
      'Mersin\'e olan uzaklıklar hesaplandığında:\n• Taşpınar = 5 km\n• Pelit = 6 km\n• Demireller = 18 km\n• Ağaçlı = 300 km\nMersin\'e en uzak olan (dolayısıyla Ankara\'ya en yakın olan) Ağaçlı tesisidir.',
    microSummary: '📌 Akılda Kalsın: Ankara-Mersin rotasında Mersin\'e uzaklığı en büyük olan tesis, Ankara\'ya en yakın konumdadır.',
    difficulty: 'Orta',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-1',
  },

  // =========================================================================
  // AYDIN DERSHANESİ - 8.SINIF NAO LGS DENEME-1 : FEN BİLİMLERİ (4 Soru)
  // =========================================================================
  {
    id: 'deneme1-fen-1',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-1',
    examName: '8.SINIF NAO LGS DENEME-1',
    subjectType: 'FEN BİLİMLERİ',
    questionNumber: 16,
    title: 'Basit Elektrik Devresi ve Parça-Bütün İlişkisi',
    topic: 'Fen Bilimleri / Elektrik Yükleri ve Elektrik Enerjisi',
    svgDiagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 220" class="w-full h-auto max-w-xl font-sans">
  <rect x="10" y="10" width="520" height="200" rx="16" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
  <path d="M 120 110 L 120 50 L 420 50 L 420 170 L 120 170 Z" fill="none" stroke="#2563eb" stroke-width="4"/>
  <rect x="90" y="90" width="60" height="40" rx="6" fill="#1e293b"/>
  <rect x="150" y="102" width="8" height="16" rx="2" fill="#ef4444"/>
  <text x="102" y="115" fill="#ffffff" font-size="12" font-weight="bold">- Pil +</text>
  <circle cx="270" cy="50" r="5" fill="#1e293b"/>
  <circle cx="330" cy="50" r="5" fill="#1e293b"/>
  <line x1="270" y1="50" x2="325" y2="50" stroke="#16a34a" stroke-width="3"/>
  <text x="300" y="35" fill="#15803d" font-size="11" font-weight="bold" text-anchor="middle">Anahtar (Kapalı)</text>
  <circle cx="420" cy="110" r="22" fill="#fef08a" stroke="#eab308" stroke-width="3"/>
  <path d="M 412 118 L 420 100 L 428 118" fill="none" stroke="#ca8a04" stroke-width="2"/>
  <line x1="420" y1="78" x2="420" y2="70" stroke="#eab308" stroke-width="2"/>
  <line x1="445" y1="110" x2="453" y2="110" stroke="#eab308" stroke-width="2"/>
  <line x1="395" y1="110" x2="387" y2="110" stroke="#eab308" stroke-width="2"/>
  <text x="420" y="150" fill="#854d0e" font-size="11" font-weight="bold" text-anchor="middle">Ampul (Işık Veriyor)</text>
  <text x="270" y="195" fill="#0f172a" font-size="12" font-weight="bold" text-anchor="middle">Basit Elektrik Devresi Elemanları Şeması</text>
</svg>`,
    leadText: 'Basit bir elektrik devresinde pil (üreteç), bağlantı kabloları, anahtar ve alıcı-yük (ampul) bulunur. Parçaların her biri farklı bir görev üstlense de biri diğeri olmadan çalışamaz.',
    questionPrompt: 'Bu açıklama ve görsel birlikte değerlendirildiğinde aşağıdakilerden hangisi söylenebilir?',
    options: [
      { key: 'A', text: 'Bir parçanın işlevi diğer parçaların görevini belirleyebilir.' },
      { key: 'B', text: 'Aynı bütünü oluşturan parçalar farklı işlevler üstlenebilir.' },
      { key: 'C', text: 'Bir bütündeki parçaların önemi, üstlendikleri göreve göre değişir.' },
      { key: 'D', text: 'Farklı görevdeki parçalar birbirinden bağımsız çalışabilir.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Devre elemanları (pil enerji verir, kablo iletir, anahtar kontrol eder, ampul ışık verir) aynı bütünün parçaları olup her biri farklı görevler üstlenmiştir.\nDoğru Cevap: B',
    microSummary: '📌 Akılda Kalsın: Elektrik devresinde her eleman (pil, anahtar, ampul, kablo) farklı bir göreve sahip olup bir bütünü oluşturur.',
    difficulty: 'Kolay',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-1',
  },
  {
    id: 'deneme1-fen-2',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-1',
    examName: '8.SINIF NAO LGS DENEME-1',
    subjectType: 'FEN BİLİMLERİ',
    questionNumber: 78,
    title: 'İklim ve Hava Olayları Kavram Haritası',
    topic: 'Fen Bilimleri / Mevsimlerin Oluşumu ve İklim',
    svgDiagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580 250" class="w-full h-auto max-w-xl font-sans">
  <rect x="10" y="10" width="560" height="230" rx="16" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  <rect x="190" y="25" width="200" height="35" rx="8" fill="#3b82f6"/>
  <text x="290" y="47" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Güneşli, rüzgârlı, yağmurlu...</text>
  <line x1="290" y1="60" x2="150" y2="90" stroke="#64748b" stroke-width="2"/>
  <line x1="290" y1="60" x2="430" y2="90" stroke="#64748b" stroke-width="2"/>
  <text x="200" y="70" fill="#2563eb" font-size="10" font-weight="bold">Hava Olayı ✓</text>
  <text x="380" y="70" fill="#dc2626" font-size="10" font-weight="bold">İklim ❌</text>
  <rect x="50" y="90" width="200" height="35" rx="8" fill="#dcfce7" stroke="#22c55e"/>
  <text x="150" y="112" fill="#14532d" font-size="10" font-weight="bold" text-anchor="middle">Ülkemizde 3 tipi görülür (İklim)</text>
  <rect x="330" y="90" width="200" height="35" rx="8" fill="#fef2f2" stroke="#fca5a5"/>
  <text x="430" y="112" fill="#7f1d1d" font-size="10" font-weight="bold" text-anchor="middle">Kısa sürede değişir (Hava Olayı)</text>
  <line x1="150" y1="125" x2="90" y2="160" stroke="#16a34a" stroke-width="2"/>
  <line x1="150" y1="125" x2="210" y2="160" stroke="#dc2626" stroke-width="2"/>
  <rect x="40" y="160" width="100" height="40" rx="8" fill="#16a34a"/>
  <text x="90" y="185" fill="#ffffff" font-size="12" font-weight="black" text-anchor="middle">MİNEL ✓</text>
  <rect x="160" y="160" width="100" height="40" rx="8" fill="#94a3b8"/>
  <text x="210" y="185" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Çiğdem</text>
  <rect x="320" y="160" width="100" height="40" rx="8" fill="#94a3b8"/>
  <text x="370" y="185" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Burcu</text>
  <rect x="440" y="160" width="100" height="40" rx="8" fill="#94a3b8"/>
  <text x="490" y="185" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Nergis</text>
</svg>`,
    leadText: 'Dört öğrenci, kutular içinde verilen bilgileri iklim ya da hava olaylarına ait olma durumuna göre tercih ederek adlarının yazılı olduğu çıkışa ulaşıyor.',
    questionPrompt: 'Buna göre, hatasız ilerleyen öğrenci aşağıdakilerden hangisidir?',
    options: [
      { key: 'A', text: 'Minel' },
      { key: 'B', text: 'Çiğdem' },
      { key: 'C', text: 'Burcu' },
      { key: 'D', text: 'Nergis' },
    ],
    correctAnswer: 'A',
    explanation:
      'İklim ve hava olayı ayrımları:\n• "Güneşli, rüzgârlı, yağmurlu" -> Hava Olayı\n• "Ülkemizde 3 farklı tipi görülür" -> İklim\n• "Yerin enlemine, deniz uzaklığına bağlıdır" -> İklim\nDoğru sıralama Minel’e çıkmaktadır.',
    microSummary: '📌 Akılda Kalsın: İklim geniş bölgede uzun sürede kesinlik bildirir; hava olayı dar alanda kısa sürede değişkenlik gösterir.',
    difficulty: 'Orta',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-1',
  },
  {
    id: 'deneme1-fen-3',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-1',
    examName: '8.SINIF NAO LGS DENEME-1',
    subjectType: 'FEN BİLİMLERİ',
    questionNumber: 80,
    title: 'Dönenciler ve Ekvator Gece Süresi Grafikleri',
    topic: 'Fen Bilimleri / Mevsimlerin Oluşumu ve Eksen Eğikliği',
    svgDiagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580 250" class="w-full h-auto max-w-xl font-sans">
  <rect x="10" y="10" width="560" height="230" rx="16" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
  <text x="140" y="35" fill="#0f172a" font-size="12" font-weight="extrabold" text-anchor="middle">Gece Süresi Grafiği (Saat)</text>
  <line x1="40" y1="50" x2="40" y2="190" stroke="#475569" stroke-width="2"/>
  <line x1="40" y1="190" x2="240" y2="190" stroke="#475569" stroke-width="2"/>
  <text x="30" y="60" fill="#64748b" font-size="9">24h</text>
  <line x1="38" y1="55" x2="240" y2="55" stroke="#e2e8f0" stroke-dasharray="2,2"/>
  <text x="30" y="125" fill="#64748b" font-size="9">12h</text>
  <line x1="38" y1="120" x2="240" y2="120" stroke="#3b82f6" stroke-dasharray="4,4"/>
  <rect x="60" y="85" width="40" height="105" fill="#ef4444" rx="4"/>
  <text x="80" y="78" fill="#dc2626" font-size="10" font-weight="bold" text-anchor="middle">18s</text>
  <text x="80" y="208" fill="#0f172a" font-size="11" font-weight="bold" text-anchor="middle">X Şehri</text>
  <rect x="120" y="120" width="40" height="70" fill="#3b82f6" rx="4"/>
  <text x="140" y="113" fill="#2563eb" font-size="10" font-weight="bold" text-anchor="middle">12s</text>
  <text x="140" y="208" fill="#0f172a" font-size="11" font-weight="bold" text-anchor="middle">Y (Ekvator)</text>
  <rect x="180" y="155" width="40" height="35" fill="#22c55e" rx="4"/>
  <text x="200" y="148" fill="#16a34a" font-size="10" font-weight="bold" text-anchor="middle">6s</text>
  <text x="200" y="208" fill="#0f172a" font-size="11" font-weight="bold" text-anchor="middle">Z Şehri</text>
  <text x="420" y="35" fill="#0f172a" font-size="12" font-weight="extrabold" text-anchor="middle">Dünya Üzerindeki Konumlar</text>
  <circle cx="420" cy="130" r="70" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
  <line x1="355" y1="95" x2="485" y2="95" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,2"/>
  <text x="500" y="98" fill="#dc2626" font-size="9" font-weight="bold">Yengeç (X)</text>
  <line x1="350" y1="130" x2="490" y2="130" stroke="#3b82f6" stroke-width="2"/>
  <text x="500" y="133" fill="#2563eb" font-size="9" font-weight="bold">Ekvator (Y)</text>
  <line x1="355" y1="165" x2="485" y2="165" stroke="#22c55e" stroke-width="2" stroke-dasharray="4,2"/>
  <text x="500" y="168" fill="#16a34a" font-size="9" font-weight="bold">Oğlak (Z)</text>
</svg>`,
    leadText: 'Yengeç Dönencesi, Ekvator ve Oğlak Dönencesi üzerinde bulunan üç şehirde mevsim başlangıç tarihinde gece süresi ölçülmüş ve grafikler çizilmiştir.',
    questionPrompt: 'Buna göre aşağıdakilerden hangisi yanlıştır?',
    options: [
      { key: 'A', text: 'Y şehri ekvator üzerinde bulunur.' },
      { key: 'B', text: '2. grafik, 21 Aralık tarihine ait ise X şehri Yengeç Dönencesi üzerinde bulunur.' },
      { key: 'C', text: 'X şehri, Yengeç Dönencesi üzerinde ise Z şehri, Oğlak Dönencesi üzerinde olabilir.' },
      { key: 'D', text: '1. grafik, 21 Mart veya 23 Eylül tarihine aittir.' },
    ],
    correctAnswer: 'B',
    explanation:
      '21 Aralık tarihinde Güney Yarımküre’de yaz (en kısa gece), Kuzey Yarımküre’de kış (en uzun gece) yaşanır. Yengeç Dönencesi Kuzey’dedir ve gece süresi en uzun olmalıdır.',
    microSummary: '📌 Akılda Kalsın: Ekinokslarda (21 Mart - 23 Eylül) gece-gündüz eşittir (12 saat). Solstislerde (21 Haziran - 21 Aralık) dönencelerde gece veya gündüz maksimum olur.',
    difficulty: 'Zor',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-1',
  },
  {
    id: 'deneme1-fen-4',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-1',
    examName: '8.SINIF NAO LGS DENEME-1',
    subjectType: 'FEN BİLİMLERİ',
    questionNumber: 84,
    title: 'Dünya ve Güneş Konumu - Gece Süresi',
    topic: 'Fen Bilimleri / Mevsimlerin Oluşumu',
    svgDiagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580 250" class="w-full h-auto max-w-xl font-sans">
  <rect x="10" y="10" width="560" height="230" rx="16" fill="#0f172a" stroke="#334155" stroke-width="2"/>
  <circle cx="80" cy="120" r="45" fill="#facc15" stroke="#ca8a04" stroke-width="3"/>
  <text x="80" y="125" fill="#713f12" font-size="13" font-weight="black" text-anchor="middle">GÜNEŞ</text>
  <line x1="135" y1="90" x2="310" y2="90" stroke="#fde047" stroke-width="2" stroke-dasharray="6,4"/>
  <line x1="135" y1="120" x2="310" y2="120" stroke="#fde047" stroke-width="2" stroke-dasharray="6,4"/>
  <line x1="135" y1="150" x2="310" y2="150" stroke="#fde047" stroke-width="2" stroke-dasharray="6,4"/>
  <g transform="translate(400, 120) rotate(-23.5)">
    <path d="M 0 -70 A 70 70 0 0 0 0 70 Z" fill="#38bdf8"/>
    <path d="M 0 -70 A 70 70 0 0 1 0 70 Z" fill="#1e293b"/>
    <circle cx="0" cy="0" r="70" fill="none" stroke="#f8fafc" stroke-width="2"/>
    <line x1="0" y1="-85" x2="0" y2="85" stroke="#ef4444" stroke-width="2"/>
    <line x1="-70" y1="0" x2="70" y2="0" stroke="#facc15" stroke-width="2"/>
  </g>
  <text x="400" y="25" fill="#f8fafc" font-size="12" font-weight="extrabold" text-anchor="middle">21 Aralık Konumu (Kuzey'de Kış, En Uzun Gece)</text>
  <text x="400" y="225" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Kuzey Kutup Dairesi - Yengeç Arası (En Uzun Gece)</text>
</svg>`,
    leadText: 'Görseldeki Dünya ve Güneş’in konumuna göre aşağıda verilen yerlerden hangisinde gece süresi en uzun olur?',
    questionPrompt: 'Buna göre gece süresinin en uzun olduğu yer hangisidir?',
    options: [
      { key: 'A', text: 'Kuzey Kutup Dairesi ile Yengeç Dönencesi arasında' },
      { key: 'B', text: 'Yengeç dönencesi ile Ekvator çizgisi arasında' },
      { key: 'C', text: 'Ekvator ile Oğlak dönencesi arasında' },
      { key: 'D', text: 'Oğlak dönencesi ile Güney Kutup Dairesi arasında' },
    ],
    correctAnswer: 'A',
    explanation:
      'Güneş ışınlarının açısı ve eksen eğikliğine bağlı olarak Kuzey Yarımküre’de kış yaşanırken gece süresi en uzun kuzey kutup dairesi ve çevresinde (Yengeç dönencesi üstü) olur.',
    microSummary: '📌 Akılda Kalsın: Hangi yarımkürede kış yaşanıyorsa, o yarımkürede kutuplara gidildikçe gece süresi uzar.',
    difficulty: 'Orta',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-1',
  },

  // =========================================================================
  // AYDIN DERSHANESİ - 8.SINIF NAO LGS DENEME-1 : İNKILAP TARİHİ (3 Soru)
  // =========================================================================
  {
    id: 'deneme1-ink-1',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-1',
    examName: '8.SINIF NAO LGS DENEME-1',
    subjectType: 'İNKILAP TARİHİ',
    questionNumber: 21,
    title: '1789 Fransız İnsan ve Yurttaş Hakları Bildirisi',
    topic: 'İnkılap Tarihi / Bir Kahraman Doğuyor - Fransız İhtilali',
    leadText:
      '1789’da yayımlanan Fransız İnsan ve Yurttaş Hakları Bildirisi, Fransız Ulusal Meclisi tarafından kabul edilmiştir. Bu belge Fransız Devrimi’nin özgürlük, eşitlik ve halk egemenliği anlayışını ortaya koymuştur. İnsanların doğuştan özgür ve eşit olduğu savunulmuştur.',
    questionPrompt: 'Verilen bilgilere göre;\nI. Devlet yönetiminin halkın iradesine dayanmasının gerekliliği vurgulanmıştır.\nII. Toplumsal ayrıcalıklara karşı çıkılmıştır.\nIII. Demokratik devlet anlayışı yansıtılmıştır.\nyargılarından hangilerine ulaşılır?',
    options: [
      { key: 'A', text: 'I ve II' },
      { key: 'B', text: 'I ve III' },
      { key: 'C', text: 'II ve III' },
      { key: 'D', text: 'I, II ve III' },
    ],
    correctAnswer: 'D',
    explanation:
      '• Halk egemenliği -> I. Devlet yönetiminin halk iradesine dayanması.\n• İnsanların eşit olduğu -> II. Toplumsal ayrıcalıklara karşı çıkılması.\n• Özgürlük ve eşitlik hakları -> III. Demokratik devlet anlayışı.\nHer üç yargıya da ulaşılır. Doğru Cevap: D',
    microSummary: '📌 Akılda Kalsın: Fransız İhtilali; milliyetçilik, demokrasi, eşitlik, özgürlük ve ulusal egemenlik kavramlarını dünyaya yaymıştır.',
    difficulty: 'Kolay',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-1',
  },
  {
    id: 'deneme1-ink-2',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-1',
    examName: '8.SINIF NAO LGS DENEME-1',
    subjectType: 'İNKILAP TARİHİ',
    questionNumber: 27,
    title: 'Picardie Manevraları ve Mustafa Kemal’in Öngörüsü',
    topic: 'İnkılap Tarihi / Mustafa Kemal’in Askerlik Hayatı',
    leadText:
      'Mustafa Kemal 1910 yılında katıldığı Picardie Manevraları’nda Fransız ordusunu yakından tanıma fırsatı buldu. Avrupa’daki ordularla Türk ordusunun durumunu karşılaştırdı. Mustafa Kemal, Avrupa’da askerî teknoloji konusunda yaşanan gelişmeleri değerlendirerek büyük bir savaşın yaklaşmakta olduğu yönünde yorumda bulundu.',
    questionPrompt: 'Paragraftaki bilgilere göre aşağıdaki yargılardan hangisine ulaşılır?',
    options: [
      { key: 'A', text: 'XX. yüzyıl başında askerî alanda değişimler yaşanmıştır.' },
      { key: 'B', text: 'Mustafa Kemal yeni bir dünya savaşına engel olmak istemiştir.' },
      { key: 'C', text: 'Fransa’nın yaptığı hazırlıklar I. Dünya Savaşı’na neden olmuştur.' },
      { key: 'D', text: 'Mustafa Kemal, Picardie Manevraları sırasında dünya kamuoyu tarafından tanınmıştır.' },
    ],
    correctAnswer: 'A',
    explanation:
      'Metinde askerî teknoloji alanındaki gelişmelerden ve orduların durumundan bahsedildiği için A seçeneğindeki "XX. yüzyıl başında askerî alanda değişimler yaşanmıştır" yargısına ulaşılır.',
    microSummary: '📌 Akılda Kalsın: Mustafa Kemal’in Picardie Manevraları’ndaki gözlemleri onun askerî ileri görüşlülüğünü ve stratejik dehasını gösterir.',
    difficulty: 'Orta',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-1',
  },
  {
    id: 'deneme1-ink-3',
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-1',
    examName: '8.SINIF NAO LGS DENEME-1',
    subjectType: 'İNKILAP TARİHİ',
    questionNumber: 28,
    title: 'Trablusgarp Savaşı ve Mustafa Kemal’in Teşkilatçılığı',
    topic: 'İnkılap Tarihi / Trablusgarp Savaşı',
    leadText:
      'İtalya’nın Trablusgarp’ı işgal etmesi üzerine Mustafa Kemal ve bazı Osmanlı subayları Trablusgarp’a gittiler. Buradaki yerli halkı işgale karşı teşkilatlandırarak İtalya’ya karşı büyük bir direniş başlattılar. Mustafa Kemal, Derne ve Tobruk bölgelerinde İtalyanlara karşı önemli başarılar kazandı ve binbaşılığa terfi etti.',
    questionPrompt: 'Buna göre Mustafa Kemal ile ilgili;\nI. Devlet bütünlüğünün korunması için mücadele etmiştir.\nII. Askerî faaliyetlerde sorumluluk almıştır.\nIII. Siyasi yaşamında yeni bir dönem başlamıştır.\nyargılarından hangilerine ulaşılır?',
    options: [
      { key: 'A', text: 'I ve II' },
      { key: 'B', text: 'I ve III' },
      { key: 'C', text: 'II ve III' },
      { key: 'D', text: 'I, II ve III' },
    ],
    correctAnswer: 'A',
    explanation:
      '• I. Yargı: Osmanlı toprağı olan Trablusgarp’ı savunması devlet bütünlüğünü koruma mücadelesidir.\n• II. Yargı: Derne ve Tobruk’ta komutanlık yapması askerî sorumluluk aldığını gösterir.\n• III. Yargı: Siyasi yaşamı değil, askerî ve teşkilatçı yönü ön plandadır.\nDoğru Cevap: A (I ve II)',
    microSummary: '📌 Akılda Kalsın: Trablusgarp Savaşı Mustafa Kemal’in ilk askerî başarısı olup onun liderlik ve teşkilatçılık özelliklerini kanıtlar.',
    difficulty: 'Orta',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-1',
  },
];

