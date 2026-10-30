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
      'Adım Adım Çözüm:\n\n1) Kare sayısının EN FAZLA (x) olması için:\nEş karenin bir kenar uzunluğu en küçük pozitif tam sayı olan 1 cm seçilir.\nKartonun alanı = 21 · 14 = 294 cm²\nBir karenin alanı = 1 · 1 = 1 cm²\nx = 294 / 1 = 294 adet kare elde edilir.\n\n2) Kare sayısının EN AZ (y) olması için:\nEş karenin bir kenarı hem 21’i hem 14’ü bölen en büyük tam sayı (EBOB) olmalıdır:\nEBOB(21, 14) = 7 cm.\nBir sıraya: 21 / 7 = 3 kare, diğer sıraya: 14 / 7 = 2 kare sığar.\ny = 3 · 2 = 6 adet kare elde edilir.\n\n3) Toplam:\nx + y = 294 + 6 = 300 (Doğru Cevap: D).',
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
    topic: 'Çarpanlar ve Katlar / Asal Kuvvetler ve Bölünebilme (M.8.1.1.1)',
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
      'Parça sayısının EN AZ olması için kesilecek parçaların uzunluğu mümkün olan en büyük kuvvet seçilmelidir:\n\n1) Kayın Çıta (176 cm):\n176’yı bölen 2’nin en büyük kuvveti 16’dır (2⁴ = 16).\nParça sayısı = 176 / 16 = 11 parça.\nKare çerçeve için 4 parça gerekir: 11 = (4 · 2) + 3 -> 2 çerçeve yapılır, 3 parça artar.\n\n2) Ceviz Çıta (189 cm):\n189’u bölen 3’ün en büyük kuvveti 27’dir (3³ = 27).\nParça sayısı = 189 / 27 = 7 parça.\nKare çerçeve için 4 parça gerekir: 7 = (4 · 1) + 3 -> 1 çerçeve yapılır, 3 parça artar.\n\n3) Meşe Çıta (150 cm):\n150’yi bölen 5’in en büyük kuvveti 25’tir (5² = 25).\nParça sayısı = 150 / 25 = 6 parça.\nKare çerçeve için 4 parça gerekir: 6 = (4 · 1) + 2 -> 1 çerçeve yapılır, 2 parça artar.\n\nToplam artan parça sayısı = 3 (Kayın) + 3 (Ceviz) + 2 (Meşe) = 8 parça (Doğru Cevap: D).',
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
      'Parçada uykunun bilgilerin kalıcı belleğe aktarılması için gerekli olduğu anlatılmış; ancak "uyku süresi uzadıkça kalıcılık da aynı oranda artar" şeklinde bir doğru orantı ya da süreyi uzatmanın doğrudan kalıcılığı artıracağına dair bir bilgi verilmemiştir. Dolayısıyla C seçeneğine ulaşılamaz.\n\nDiğer seçenekler metinde açıkça geçer:\n• A: "duygularını denetlemekte zorlandığı biliniyor"\n• B: "edilgen dinlenme olduğu düşünüldü, oysa araştırmalar hiç de boş durmadığını ortaya koyuyor"\n• D: "kişi, yaşadığı kaybın çoğu zaman farkına bile varmıyor"',
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
      'Kurallardan 4. maddeye göre: "Bir adımda değiştirilen harfin sırası, HEMEN BİR ÖNCEKİ ADIMDA değiştirilen harfin sırasıyla aynı olamaz."\n\nD seçeneğindeki adımları inceleyelim:\n• sal -> sel (2. harf: a -> e)\n• sel -> sen (3. harf: l -> n)\n• sen -> ben (1. harf: s -> b)\n• ben -> ten (1. harf: b -> t)\n\n"sen -> ben" adımında 1. harf değiştirilmiş, hemen ardından gelen "ben -> ten" adımında da YİNE 1. harf değiştirilmiştir! Art arda iki adımda aynı sıra (1. harf) değiştirildiği için 4. kural ihlal edilmiştir.\n\nDiğer seçenekler kurallara uygundur:\n• A: masa->kasa (1.), kasa->kara (3.), kara->kare (4.), kare->kale (3.) -> Kurala uygun.\n• B: taş->kaş (1.), kaş->kuş (2.), kuş->kum (3.), kum->kim (2.) -> Kurala uygun.\n• C: kol->kul (2.), kul->kum (3.), kum->kim (2.), kim->kin (3.) -> Kurala uygun.\n\nDoğru Cevap: D',
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
      'Parçada yer alan bilgileri öncüllerle eşleştirdiğimizde:\n• Mehmet Emin Yurdakul ve Ziya Gökalp’in eserlerinden millî düşünceler yönünden etkilenmesi -> I. Ulusal şuurunun (millî bilincin) güçlenmesini gösterir.\n• Tarih öğretmeni Mehmet Tevfik Bey sayesinde tarih sevgisinin artması -> II. Tarih bilincinin gelişmesini gösterir.\n• Ömer Naci sayesinde edebiyatla ilgilenmesi ve hitabet gücünün gelişmesi -> III. Güzel ve etkili konuşma becerisinin oluşmasını gösterir.\n\nDolayısıyla her üç durum da çıkarılabilir (Doğru Cevap: D - I, II ve III).',
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
      'Öncülleri metne göre değerlendirelim:\n• I. Yargı YANLIŞTIR: Metinde cephenin "İngilizler tarafından açıldığı" belirtilmiştir. Irak Cephesi Osmanlı’nın taarruz (saldırı) değil, SAVUNMA cephesidir (Osmanlı’nın taarruz cepheleri Kafkas ve Kanal’dır).\n• II. Yargı DOĞRUDUR: İngilizlerin "bölgedeki petrolü ele geçirmek istemesi" sömürgeci hedefleri kanıtlar.\n• III. Yargı ULAŞILAMAZ: Metinde Almanya’nın desteğine dair hiçbir ifade veya bilgi yer almamaktadır.\n\nDolayısıyla yalnızca II. yargıya ulaşılır (Doğru Cevap: A - Yalnız II).',
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
      'Sanayi İnkılabı ile seri ve ucuz üretilen Avrupa sanayi malları Osmanlı pazarına girince yerli lonca ve atölyeler rekabet edemeyerek çökmüştür. Osmanlı pazarı ucuz dış mallarla dolmuş ve toplumda ithal (dışarıdan gelen) ürünlere olan talep artmıştır.\n\n• A yanlıştır çünkü rekabet gücü artmamış, tam aksine yok olmuştur.\n• C ve D yanlıştır; kapitülasyonlar Sanayi İnkılabı’ndan yüzyıllar önce ticareti canlandırmak için verilmişti, bu durumun sonucu değildir.\n\nDoğru Cevap: B (İthal ürünlere olan talebin artmasına).',
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
      'Sophie yeni insanlarla tanışmaktan hoşlanmamaktadır ("doesn’t like meeting new people"). Bu nedenle Sophie "outgoing" (cana yakın / sosyal) değil, utangaçtır (shy / unsociable). Dolayısıyla D seçeneğindeki ifade yanlıştır.\n\nDiğer seçenekler doğrudur:\n• Kevin her zaman zamanında geldiği için "punctual" (dakik).\n• Laura doğruyu söylediği ("tells the truth") için dürüst (honest), paylaştığı ("shares") için cömerttir (generous).\n• Daniel zor zamanlarda arkadaşlarının yanında olduğu için destekleyicidir (supportive).',
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
      'Hafta sonu günleri "Saturday" (Cumartesi) ve "Sunday" (Pazar) günleridir.\n• Nathan kitap almak istiyor -> Wednesday (Çarşamba - hafta içi)\n• Mike canlı müzik dinlemek istiyor -> Friday (Cuma - hafta içi)\n• Vivien açık havada kafede arkadaşlarıyla buluşuyor -> Saturday (Cumartesi - hafta sonu)\n• Daisy tiyatroya / oyuna gidiyor -> Sunday (Pazar - hafta sonu)\n\nDolayısıyla hafta sonu için planı olmayan kişiler Nathan ve Mike’tır (Doğru Cevap: B).',
    difficulty: 'Orta',
    examType: 'Aydın Dershanesi · 8.SINIF NAO LGS DENEME-2',
  },
];
