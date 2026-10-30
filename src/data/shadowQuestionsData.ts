import { SubjectType, InstitutionType } from '../types/homework';

export interface ShadowQuestion {
  id: string;
  parentQuestionId: string;
  parentQuestionNumber: number;
  parentQuestionTitle: string;
  shadowIndex: 1 | 2;
  institution: InstitutionType;
  institutionName: string;
  examId: string;
  examName: string;
  subjectType: SubjectType;
  learningObjective: string; // MEB Kazanım Kodu ve Açıklaması
  topic: string;
  difficulty: 'Kolay' | 'Orta' | 'Zor';
  title: string;
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
  distractorAnalysis: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  microSummary: string;
}

export const SHADOW_QUESTIONS: ShadowQuestion[] = [
  // =========================================================================
  // MATEMATİK 1. SORU (Orijinal Soru 3: Bakteri Kültürü Çoğalması) - 2 Gölge Soru
  // =========================================================================
  {
    id: 'shadow-math-q3-1',
    parentQuestionId: 'math-q3',
    parentQuestionNumber: 3,
    parentQuestionTitle: 'Bakteri Kültürü Çoğalması ve Kaplara Paylaştırma',
    shadowIndex: 1,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'MATEMATİK',
    learningObjective: 'M.8.1.2.2 - Üslü ifadelerle ilgili temel kuralları anlar, birbirine denk ifadeler oluşturur.',
    topic: 'Üslü İfadeler / Üslü Sayılarla Çarpma ve Bölme',
    difficulty: 'Orta',
    title: 'Gölge 1: Maya Hücresi Kültürü ve Petri Kaplarına Dağıtım',
    leadText:
      'Bir biyoteknoloji laboratuvarında çoğaltılan maya hücresi kültüründe başlangıçta 3¹⁰ adet maya hücresi bulunmaktadır. Uygun besi ortamında bu maya hücrelerinin sayısı her saatin sonunda 2 katına çıkmaktadır. 6 saatin sonunda kültürdeki tüm maya hücreleri 27 adet petri kabına, her kapta eşit sayıda hücre olacak şekilde paylaştırılıyor.',
    questionPrompt: 'Buna göre işlem sonunda her bir petri kabında bulunan maya hücresi sayısı kaçtır?',
    options: [
      { key: 'A', text: '3⁷ · 2⁶' },
      { key: 'B', text: '3⁶ · 2⁷' },
      { key: 'C', text: '6¹³' },
      { key: 'D', text: '3¹³ · 2⁶' },
    ],
    correctAnswer: 'A',
    explanation:
      'Adım Adım Çözüm:\n1) Başlangıçtaki hücre sayısı: 3¹⁰\n2) Her saat sonunda 2 katına çıktığı için 6 saatin sonunda: 3¹⁰ · 2⁶ adet maya hücresi oluşur.\n3) 27 adet petri kabı üslü ifade olarak 27 = 3³ şeklinde yazılır.\n4) Eşit paylaştırma bölme işlemidir: (3¹⁰ · 2⁶) / 3³ = 3¹⁰⁻³ · 2⁶ = 3⁷ · 2⁶.\nDoğru Cevap: A',
    distractorAnalysis: {
      A: 'Doğru Seçenek: Tabanı aynı olan 3¹⁰ ile 3³ bölünerek üsler çıkarılmış (10 - 3 = 7), 2⁶ aynen korunmuştur.',
      B: 'Kuvvet Karıştırma Çeldiricisi: Öğrenci 3 ile 2 tabanlarının kuvvetlerini ters yazmıştır.',
      C: 'Kural Hatası Çeldiricisi: Farklı taban ve üslere sahip sayıları tabanları çarpıp üsleri toplayarak (3·2=6, 10+3=13) işlem yapma yanılgısı.',
      D: 'İşlem Yönü Çeldiricisi: Kap sayısına bölmek yerine kap sayısının üssünü toplayarak (10 + 3 = 13) çarpma hatası yapılmıştır.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },
  {
    id: 'shadow-math-q3-2',
    parentQuestionId: 'math-q3',
    parentQuestionNumber: 3,
    parentQuestionTitle: 'Bakteri Kültürü Çoğalması ve Kaplara Paylaştırma',
    shadowIndex: 2,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'MATEMATİK',
    learningObjective: 'M.8.1.2.2 - Üslü ifadelerle ilgili temel kuralları anlar, birbirine denk ifadeler oluşturur.',
    topic: 'Üslü İfadeler / Periyodik Çoğalma ve Eşit Dağılım',
    difficulty: 'Orta',
    title: 'Gölge 2: Alg Kültürü ve Deney Tüplerine Dağıtım',
    leadText:
      'Bir deniz araştırmaları enstitüsünde incelenen alg kültüründe başlangıçta 2¹⁶ tane tek hücreli alg bulunmaktadır. Alg sayısı her 2 saatin sonunda 3 katına çıkmaktadır. 8 saatin sonunda tüm algler 64 adet deney tüpüne, her tüpte eşit miktarda alg olacak şekilde paylaştırılıyor.',
    questionPrompt: 'Buna göre bir deney tüpündeki alg sayısı aşağıdakilerden hangisidir?',
    options: [
      { key: 'A', text: '2¹⁰ · 3⁴' },
      { key: 'B', text: '2¹² · 3⁸' },
      { key: 'C', text: '2¹⁰ · 3⁸' },
      { key: 'D', text: '2¹⁴ · 3⁴' },
    ],
    correctAnswer: 'A',
    explanation:
      'Adım Adım Çözüm:\n1) Süre 8 saat olup her 2 saatte bir 3 katına çıktığından çoğalma periyodu sayısı: 8 / 2 = 4 kezdir.\n2) 8 saat sonundaki toplam alg sayısı: 2¹⁶ · 3⁴ olur.\n3) 64 deney tüpü: 64 = 2⁶.\n4) Tüp başına düşen miktar: (2¹⁶ · 3⁴) / 2⁶ = 2¹⁶⁻⁶ · 3⁴ = 2¹⁰ · 3⁴.\nDoğru Cevap: A',
    distractorAnalysis: {
      A: 'Doğru Seçenek: 8 saati 2 saatlik periyotlara bölüp üssü 4 almış, 2¹⁶ yı 2⁶ ya doğru bölmüştür.',
      B: 'Periyot Tuzağı Çeldiricisi: "Her 2 saatte bir" ifadesini göz ardı edip üssü doğrudan 8 alan ve 64’ü 2⁴ zanneden öğrenci yanıtı.',
      C: 'Üs Yanılgısı: 2 tabanını doğru bölüp (2¹⁰) ancak 3’ün kuvvetini periyotsuz 8 alan öğrenci.',
      D: 'Bölme Hatası: 64 sayısını 2² alarak 16 - 2 = 14 hesaplayan öğrenci.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },

  // =========================================================================
  // MATEMATİK 2. SORU (Orijinal Soru 4: Güneş Enerjisi Üretimi) - 2 Gölge Soru
  // =========================================================================
  {
    id: 'shadow-math-q4-1',
    parentQuestionId: 'math-q4',
    parentQuestionNumber: 4,
    parentQuestionTitle: 'Güneş Enerjisi Üretimi (MWh - kWh Dönüşümü)',
    shadowIndex: 1,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'MATEMATİK',
    learningObjective: 'M.8.1.2.2 - Çok büyük ve çok küçük sayıları bilimsel gösterimle ifade eder ve karşılaştırır.',
    topic: 'Üslü İfadeler / Yüzde Hesapları ve Birim Dönüşümü',
    difficulty: 'Orta',
    title: 'Gölge 1: Sanayi Bölgesi Su Geri Dönüşümü ve Tarımsal Sulama',
    leadText:
      'Bir metropol bölgesinde yıllık toplam su tüketimi 1,8 milyar m³ olarak kaydedilmiştir. Bu suyun kaynaklara göre dağılımı aşağıdaki gibidir:\n• % 60 Doğal Kaynak Suları\n• % 40 Arıtma ve Geri Kazanım Suyu\n\nArıtma ve geri kazanım suyunun kendi içindeki kullanım dağılımı ise şöyledir:\n• % 50 Park ve Yeşil Alanlar\n• % 25 Tarımsal Sulama\n• % 25 Sanayi Soğutma Sistemleri\n\n*(1 m³ = 10³ Litre)*',
    questionPrompt: 'Buna göre tarımsal sulamada kullanılan su miktarı Litre cinsinden aşağıdakilerden hangisine eşittir?',
    options: [
      { key: 'A', text: '1,8 · 10⁸' },
      { key: 'B', text: '1,8 · 10¹⁰' },
      { key: 'C', text: '1,8 · 10¹¹' },
      { key: 'D', text: '7,2 · 10¹¹' },
    ],
    correctAnswer: 'C',
    explanation:
      'Adım Adım Çözüm:\n1) Toplam su: 1,8 milyar m³ = 1,8 · 10⁹ m³.\n2) Geri kazanım suyu (%40): 1,8 · 10⁹ · 0,40 = 0,72 · 10⁹ = 7,2 · 10⁸ m³.\n3) Tarımsal sulama (%25): 7,2 · 10⁸ · 0,25 = 1,8 · 10⁸ m³.\n4) Litreye çevrim (1 m³ = 10³ Litre): 1,8 · 10⁸ · 10³ = 1,8 · 10¹¹ Litre.\nDoğru Cevap: C',
    distractorAnalysis: {
      A: 'Birim Dönüşümünü Unutma Çeldiricisi (En Sık Yapılan Hata): 1,8 · 10⁸ m³ değerini bulup litreye çevirmeden işaretleyen öğrenci.',
      B: 'Sıfır Kaydırma Hatası: 10³ ile çarparken 10¹¹ yerine 10¹⁰ bulan basamak hatası.',
      C: 'Doğru Seçenek: Hem %40 hem %25 kademeli yüzdeleri hesaplayıp 10³ ile çarpan eksiksiz çözüm.',
      D: 'İlk Yüzdede Kalma Hatası: Yalnızca geri kazanım suyunu litreye çevirip %25’lik ikinci yüzdeliği almayan öğrenci.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },
  {
    id: 'shadow-math-q4-2',
    parentQuestionId: 'math-q4',
    parentQuestionNumber: 4,
    parentQuestionTitle: 'Güneş Enerjisi Üretimi (MWh - kWh Dönüşümü)',
    shadowIndex: 2,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'MATEMATİK',
    learningObjective: 'M.8.1.2.2 - Çok büyük ve çok küçük sayıları bilimsel gösterimle ifade eder ve karşılaştırır.',
    topic: 'Üslü İfadeler / Tarımsal Rekolte ve Gram Dönüşümü',
    difficulty: 'Orta',
    title: 'Gölge 2: Tahıl Ambarı ve Kepekli Un Üretimi',
    leadText:
      'Bir ülkenin yıllık buğday rekoltesi 3,6 milyar kg civarındadır. Aşağıda bu rekoltenin kullanım alanlarına göre dağılımı verilmiştir:\n• % 70 İhracat ve Tohumluk\n• % 30 Un Fabrikaları İşleme Hacmi\n\nUn fabrikalarına giden buğdayın kendi içindeki un çeşitlerine göre dağılımı ise şöyledir:\n• % 60 Ekmeklik Beyaz Un\n• % 30 Pasta ve Böreklik Un\n• % 10 Kepekli Diyet Unu\n\n*(1 kg = 10³ gram)*',
    questionPrompt: 'Buna göre kepekli diyet unu yapımında kullanılan buğday miktarı gram cinsinden aşağıdakilerden hangisidir?',
    options: [
      { key: 'A', text: '1,08 · 10⁸' },
      { key: 'B', text: '1,08 · 10¹⁰' },
      { key: 'C', text: '1,08 · 10¹¹' },
      { key: 'D', text: '3,6 · 10¹¹' },
    ],
    correctAnswer: 'C',
    explanation:
      'Adım Adım Çözüm:\n1) Toplam rekolte: 3,6 milyar kg = 3,6 · 10⁹ kg.\n2) Un fabrikaları payı (%30): 3,6 · 10⁹ · 0,30 = 1,08 · 10⁹ kg.\n3) Kepekli diyet unu payı (%10): 1,08 · 10⁹ · 0,10 = 1,08 · 10⁸ kg.\n4) Grama çevrim (1 kg = 10³ g): 1,08 · 10⁸ · 10³ = 1,08 · 10¹¹ gram.\nDoğru Cevap: C',
    distractorAnalysis: {
      A: 'Birim Dönüşümü Atlandı: 1,08 · 10⁸ kg sonucunu gram sanan öğrenci tuzağı.',
      B: 'İşlem Hatası: Yüzde ve üs sadeleştirmesinde 10¹¹ yerine 10¹⁰ bulan öğrenci.',
      C: 'Doğru Seçenek: İki kademeli yüzdeyi doğru çarpıp 10³ ile grama çeviren çözüm.',
      D: 'Yüzde Hesabı Yapılmadı: Toplam rekolteyi doğrudan 10² ile çarpan öğrenci.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },

  // =========================================================================
  // MATEMATİK 3. SORU (Orijinal Soru 7: Çark Döndürme ve Asal Çarpan Üsleri) - 2 Gölge Soru
  // =========================================================================
  {
    id: 'shadow-math-q7-1',
    parentQuestionId: 'math-q7',
    parentQuestionNumber: 7,
    parentQuestionTitle: 'Çark Döndürme ve Asal Çarpan Üsleri Puanlama',
    shadowIndex: 1,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'MATEMATİK',
    learningObjective: 'M.8.1.1.1 - Verilen pozitif tam sayıların pozitif tam sayı çarpanlarını bulur, asal çarpanlarını üslü biçimde yazar.',
    topic: 'Çarpanlar ve Katlar / Asal Çarpan Üsleri ve Puanlama',
    difficulty: 'Kolay',
    title: 'Gölge 1: Dijital Kutu Oyunu ve Kart Puanlama',
    leadText:
      'Bir matematik kutu oyununda bir kart çekildiğinde karttaki sayının asal çarpanları üslü biçimde yazıldıktan sonra asal çarpanların kuvvetleri (üsleri) toplamının 12 katı kadar oyun puanı kazanılmaktadır.\n\nÖrnek:\nKartta 72 sayısı olduğunda;\n• 72 = 2³ · 3²\n• Üsler toplamı = 3 + 2 = 5\n• Puan = 5 · 12 = 60 puan kazanılır.',
    questionPrompt: 'Buna göre bir oyuncu aşağıdaki kartlardan hangisini çekerse alacağı puan en fazla olur?',
    options: [
      { key: 'A', text: '400' },
      { key: 'B', text: '432' },
      { key: 'C', text: '600' },
      { key: 'D', text: '500' },
    ],
    correctAnswer: 'B',
    explanation:
      'Adım Adım Çözüm:\n• A) 400 = 2⁴ · 5² -> Üsler toplamı: 4 + 2 = 6 -> Puan = 6 · 12 = 72\n• B) 432 = 2⁴ · 3³ -> Üsler toplamı: 4 + 3 = 7 -> Puan = 7 · 12 = 84 (EN FAZLA!)\n• C) 600 = 2³ · 3¹ · 5² -> Üsler toplamı: 3 + 1 + 2 = 6 -> Puan = 6 · 12 = 72\n• D) 500 = 2² · 5³ -> Üsler toplamı: 2 + 3 = 5 -> Puan = 5 · 12 = 60\nEn yüksek puan 84 puan ile 432 kartıdır. Doğru Cevap: B',
    distractorAnalysis: {
      A: 'Sayı Büyüklüğü Tuzağı: Sayının kendisi büyük olunca üs toplamının da büyük olacağını zanneden öğrenci.',
      B: 'Doğru Seçenek: 432 = 2⁴ · 3³ olup üsler toplamı 7’dir ve 84 puan verir.',
      C: '3 Asal Çarpan Tuzağı: 600 sayısında 3 farklı asal çarpan (2, 3, 5) olduğu için puanın yüksek çıkacağını sanan öğrenci.',
      D: 'Hatalı Asal Ayırma: 500 sayısını 5³ · 4 olarak düşünüp üsleri yanlış toplayan öğrenci.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },
  {
    id: 'shadow-math-q7-2',
    parentQuestionId: 'math-q7',
    parentQuestionNumber: 7,
    parentQuestionTitle: 'Çark Döndürme ve Asal Çarpan Üsleri Puanlama',
    shadowIndex: 2,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'MATEMATİK',
    learningObjective: 'M.8.1.1.1 - Verilen pozitif tam sayıların pozitif tam sayı çarpanlarını bulur, asal çarpanlarını üslü biçimde yazar.',
    topic: 'Çarpanlar ve Katlar / Hedef Tahtası Asal Puanlama',
    difficulty: 'Kolay',
    title: 'Gölge 2: Poligon Hedef Tahtası ve Asal Kuvvet Skorları',
    leadText:
      'Bir poligon hedef tahtasındaki sayılar vurulduğunda vurulan sayının asal çarpanlarının üsleri toplanmakta ve toplam 15 ile çarpılarak atış skoru belirlenmektedir.\n\nÖrneğin: Vurulan sayı 108 ise;\n• 108 = 2² · 3³\n• Üsler toplamı = 2 + 3 = 5\n• Skor = 5 · 15 = 75 puan.',
    questionPrompt: 'Buna göre hedef tahtasındaki hangi sayıyı vuran bir yarışmacı en yüksek atış skorunu elde eder?',
    options: [
      { key: 'A', text: '144' },
      { key: 'B', text: '216' },
      { key: 'C', text: '288' },
      { key: 'D', text: '300' },
    ],
    correctAnswer: 'C',
    explanation:
      'Adım Adım Çözüm:\n• A) 144 = 2⁴ · 3² -> Üsler toplamı = 4 + 2 = 6 -> Skor = 6 · 15 = 90\n• B) 216 = 2³ · 3³ -> Üsler toplamı = 3 + 3 = 6 -> Skor = 6 · 15 = 90\n• C) 288 = 2⁵ · 3² -> Üsler toplamı = 5 + 2 = 7 -> Skor = 7 · 15 = 105 (EN YÜKSEK!)\n• D) 300 = 2² · 3¹ · 5² -> Üsler toplamı = 2 + 1 + 2 = 5 -> Skor = 5 · 15 = 75\nEn yüksek skoru 105 puan ile 288 sayısı verir. Doğru Cevap: C',
    distractorAnalysis: {
      A: '144 = 12² kareli sayısına odaklanıp kuvvetleri eksik hesaplayan öğrenci.',
      B: '216 = 6³ sayısında simetrik üslerin (3+3=6) en büyük olduğunu sanan öğrenci.',
      C: 'Doğru Seçenek: 288 = 2⁵ · 3² olup üsler toplamı 7’dir ve 105 puan kazandırır.',
      D: 'En büyük sayı olan 300’ün en çok puanı getireceğini düşünen sezgisel yaklaşım tuzağı.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },

  // =========================================================================
  // MATEMATİK 4. SORU (Orijinal Soru 11: Parantez ve İşlem Önceliği) - 2 Gölge Soru
  // =========================================================================
  {
    id: 'shadow-math-q11-1',
    parentQuestionId: 'math-q11',
    parentQuestionNumber: 11,
    parentQuestionTitle: 'Üslü İfadelerde Parantez Kullanımı ve İşlem Önceliği',
    shadowIndex: 1,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'MATEMATİK',
    learningObjective: 'M.8.1.2.2 - Üslü ifadelerle ilgili temel kuralları anlar, negatif kuvvet ve parantez ilişkisini kavrar.',
    topic: 'Üslü İfadeler / Parantezin Önemi ve Negatif Sayı Kuvvetleri',
    difficulty: 'Zor',
    title: 'Gölge 1: Tahtadaki İşlem ve Parantez Unutma Farkı',
    leadText:
      'Bir matematik öğretmeni tahtaya aşağıdaki işlemi yazmıştır:\n\n(-3)² + 9⁻¹ · (1/3)⁻³ - 2 / (-2)⁰\n\nÖğrencilerden Mert, bu işlemi defterine geçirirken negatif sayıların etrafındaki parantezleri yazmamış ve işlemini -3² + 9⁻¹ · (1/3)⁻³ - 2 / -2⁰ şeklinde çözmüştür.',
    questionPrompt: 'Buna göre tahtada yazılı işlemin doğru sonucu, Mert’in bulduğu sonuçtan kaç fazladır?',
    options: [
      { key: 'A', text: '10' },
      { key: 'B', text: '14' },
      { key: 'C', text: '16' },
      { key: 'D', text: '8' },
    ],
    correctAnswer: 'B',
    explanation:
      'Adım Adım Çözüm:\n1) Doğru Sonuç (Parantezli):\n• (-3)² = +9 (Çift kuvvet parantezin dışında olduğu için taban pozitif olur)\n• 9⁻¹ · (1/3)⁻³ = (1/9) · 27 = 3\n• (-2)⁰ = +1 olduğundan 2 / (+1) = 2\nDoğru Sonuç = 9 + 3 - 2 = 10\n\n2) Mert’in Sonucu (Parantezsiz):\n• -3² = -9 (Parantez olmadığı için kuvvet sadece 3’e aittir, eksi aynen kalır)\n• 9⁻¹ · (1/3)⁻³ = 3\n• -2⁰ = -1 olduğundan 2 / (-1) = -2\nMert’in Sonucu = -9 + 3 - (-2) = -9 + 3 + 2 = -4\n\n3) Fark:\nDoğru Sonuç - Mert’in Sonucu = 10 - (-4) = 10 + 4 = 14 fazladır.\nDoğru Cevap: B',
    distractorAnalysis: {
      A: 'Kendi Sonucunu İşaretleme Çeldiricisi: Doğru sonucu 10 bulup farkı hesaplamadan A şıkkına yönelen öğrenci.',
      B: 'Doğru Seçenek: 10 - (-4) = 14 işlemini eksiksiz tamamlayan çözüm.',
      C: 'İşaret Hatası Çeldiricisi: Mert’in sonucunu -6 hesaplayıp 10 - (-6) = 16 bulan öğrenci.',
      D: 'Eksi Eksi Çarpımını Unutan: 10 - 4 = 6 veya 10 - 2 = 8 hesaplayan çıkarma hatası.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },
  {
    id: 'shadow-math-q11-2',
    parentQuestionId: 'math-q11',
    parentQuestionNumber: 11,
    parentQuestionTitle: 'Üslü İfadelerde Parantez Kullanımı ve İşlem Önceliği',
    shadowIndex: 2,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'MATEMATİK',
    learningObjective: 'M.8.1.2.2 - Üslü ifadelerle ilgili temel kuralları anlar, negatif kuvvet ve parantez ilişkisini kavrar.',
    topic: 'Üslü İfadeler / Parantezsiz Yazım ve Sıfırıncı Kuvvet Tuzağı',
    difficulty: 'Zor',
    title: 'Gölge 2: Negatif Kuvvet ve Sıfırıncı Kuvvet İşlem Oranı',
    leadText:
      'Aşağıda verilen işlemde negatif sayıların parantez içinde olup olmaması sonucun işaretini doğrudan etkilemektedir:\n\nİşlem: (-2)⁴ - 8⁻¹ · (1/2)⁻⁵ + 6 / (-3)⁰',
    questionPrompt: 'Bu işlemin doğru sonucu kaçtır?',
    options: [
      { key: 'A', text: '18' },
      { key: 'B', text: '12' },
      { key: 'C', text: '-14' },
      { key: 'D', text: '26' },
    ],
    correctAnswer: 'A',
    explanation:
      'Adım Adım Çözüm:\n1) (-2)⁴ = +16 (Negatif sayının çift kuvveti pozitiftir).\n2) 8⁻¹ · (1/2)⁻⁵ = (1/8) · 32 = 32 / 8 = 4.\n3) (-3)⁰ = +1 (Sıfır hariç her sayının sıfırıncı kuvveti 1’dir) -> 6 / (+1) = 6.\n4) İşlem: 16 - 4 + 6 = 12 + 6 = 18.\nDoğru Cevap: A',
    distractorAnalysis: {
      A: 'Doğru Seçenek: 16 - 4 + 6 = 18 doğru işlem önceliği ve parantez kuralları.',
      B: 'Sıfırıncı Kuvveti Unutan: Son terimi 6 / 1 yerine hesaba katmayıp 12’de kalan öğrenci.',
      C: 'Parantez Yok Sayma Hatası: (-2)⁴ yerine -16 yazıp -16 - 4 + 6 = -14 bulan öğrenci.',
      D: 'Çıkarma Yerine Toplama Hatası: Ortadaki eksiyi artı alarak 16 + 4 + 6 = 26 bulan öğrenci.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },

  // =========================================================================
  // MATEMATİK 5. SORU (Orijinal Soru 13: Dikdörtgen Kartondan Eş Kareler) - 2 Gölge Soru
  // =========================================================================
  {
    id: 'shadow-math-q13-1',
    parentQuestionId: 'math-q13',
    parentQuestionNumber: 13,
    parentQuestionTitle: 'Dikdörtgen Kartondan Eş Kareler Elde Etme (En Fazla / En Az)',
    shadowIndex: 1,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'MATEMATİK',
    learningObjective: 'M.8.1.1.2 - İki doğal sayının en büyük ortak bölenini (EBOB) ve en küçük ortak katını (EKOK) hesaplar, ilgili problemleri çözer.',
    topic: 'Çarpanlar ve Katlar / EBOB ve Alan Paylaştırma Problemleri',
    difficulty: 'Orta',
    title: 'Gölge 1: Ahşap Plakadan Eş Kare Parçalar Kesme',
    leadText:
      'Dikdörtgen şeklindeki bir ahşap plakanın kenar uzunlukları 24 cm ve 18 cm’dir. Bu ahşap plaka, kenar uzunlukları santimetre cinsinden birer tam sayı olan eş kare parçalara ayrılmak isteniyor.',
    questionPrompt: 'Elde edilecek eş kare parça sayısı en fazla a, en az b olduğuna göre a + b toplamı kaçtır?',
    options: [
      { key: 'A', text: '12' },
      { key: 'B', text: '432' },
      { key: 'C', text: '440' },
      { key: 'D', text: '444' },
    ],
    correctAnswer: 'D',
    explanation:
      'Adım Adım Çözüm:\n1) Kare sayısının EN FAZLA (a) olması için:\nKarenin kenar uzunluğu en küçük pozitif tam sayı olan 1 cm seçilir.\nPlakanın alanı = 24 · 18 = 432 cm².\nBir karenin alanı = 1 · 1 = 1 cm².\na = 432 / 1 = 432 adet kare elde edilir.\n\n2) Kare sayısının EN AZ (b) olması için:\nKarenin kenar uzunluğu kenarların en büyük ortak böleni (EBOB) olmalıdır:\nEBOB(24, 18) = 6 cm.\nBir sıraya 24 / 6 = 4 adet, diğer sıraya 18 / 6 = 3 adet kare gelir.\nb = 4 · 3 = 12 adet kare elde edilir.\n\n3) Toplam:\na + b = 432 + 12 = 444.\nDoğru Cevap: D',
    distractorAnalysis: {
      A: 'Sadece En Azı Hesaplama Çeldiricisi: Sadece b = 12 değerini bulup a ile toplamayı unutan öğrenci.',
      B: 'Sadece En Fazlayı Hesaplama Çeldiricisi: Plakanın alanını (432) bulup b’yi eklemeyi unutan öğrenci.',
      C: 'EBOB Hatası: EBOB’u 6 yerine 8 zannedip hatalı toplam yapan öğrenci.',
      D: 'Doğru Seçenek: a = 432 ve b = 12 değerlerini doğru bulup toplayan eksiksiz çözüm.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },
  {
    id: 'shadow-math-q13-2',
    parentQuestionId: 'math-q13',
    parentQuestionNumber: 13,
    parentQuestionTitle: 'Dikdörtgen Kartondan Eş Kareler Elde Etme (En Fazla / En Az)',
    shadowIndex: 2,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'MATEMATİK',
    learningObjective: 'M.8.1.1.2 - İki doğal sayının en büyük ortak bölenini (EBOB) ve en küçük ortak katını (EKOK) hesaplar, ilgili problemleri çözer.',
    topic: 'Çarpanlar ve Katlar / Eş Kare Bezler ve Fark Hesabı',
    difficulty: 'Orta',
    title: 'Gölge 2: Kumaş Rulosundan Eş Kare Temizlik Bezleri',
    leadText:
      'Kenar uzunlukları 30 cm ve 20 cm olan dikdörtgen biçimindeki bir kumaş parçası, kenar uzunluğu santimetre cinsinden tam sayı olan eş kare parçalara hiç parça artmayacak şekilde kesilecektir.',
    questionPrompt: 'Oluşturulabilecek eş kare parça sayısı en fazla m, en az n olduğuna göre m - n farkı kaçtır?',
    options: [
      { key: 'A', text: '594' },
      { key: 'B', text: '600' },
      { key: 'C', text: '590' },
      { key: 'D', text: '54' },
    ],
    correctAnswer: 'A',
    explanation:
      'Adım Adım Çözüm:\n1) En fazla kare sayısı (m):\nKarenin kenar uzunluğu 1 cm seçilir.\nKumaşın alanı = 30 · 20 = 600 cm².\nm = 600 / (1 · 1) = 600 adet.\n\n2) En az kare sayısı (n):\nKarenin bir kenarı EBOB(30, 20) = 10 cm seçilir.\nn = (30 / 10) · (20 / 10) = 3 · 2 = 6 adet kare.\n\n3) Fark:\nm - n = 600 - 6 = 594.\nDoğru Cevap: A',
    distractorAnalysis: {
      A: 'Doğru Seçenek: 600 - 6 = 594.',
      B: 'En azı çıkarmayı unutup toplam alanı işaretleyen öğrenci.',
      C: 'EBOB’u kenar sayısı zannedip 600 - 10 = 590 hesaplayan çeldirici.',
      D: 'Kare kenarlarını birbirinden çıkarıp (60 - 6 = 54) işlem hatası yapan öğrenci.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },

  // =========================================================================
  // MATEMATİK 6. SORU (Orijinal Soru 14: Dijital Saat ve Aralarında Asal Sayılar) - 2 Gölge Soru
  // =========================================================================
  {
    id: 'shadow-math-q14-1',
    parentQuestionId: 'math-q14',
    parentQuestionNumber: 14,
    parentQuestionTitle: 'Dijital Saat ve Aralarında Asal Sayılar Alarmı',
    shadowIndex: 1,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'MATEMATİK',
    learningObjective: 'M.8.1.1.3 - Verilen iki doğal sayının aralarında asal olup olmadığını belirler.',
    topic: 'Çarpanlar ve Katlar / Zaman Göstergelerinde Aralarında Asal Sayılar',
    difficulty: 'Orta',
    title: 'Gölge 1: Akıllı Çalışma Masası Saati ve Sinyal Sayısı',
    leadText:
      'Bir akıllı çalışma masası saati, ekranda saat kısmını gösteren sayı ile dakika kısmını gösteren sayı aralarında asal olduğu her bir tam dakika için 1 kez sesli sinyal vermektedir.\n\nSaat 16:50’yi gösterirken çalıştırılan bu masa saati, bu andan itibaren kesintisiz olarak 25 dakika daha çalıştıktan sonra otomatik uyku moduna geçmiştir.',
    questionPrompt: 'Buna göre saat uyku moduna geçene kadar geçen bu sürede toplam kaç kez sinyal vermiştir?',
    options: [
      { key: 'A', text: '18' },
      { key: 'B', text: '19' },
      { key: 'C', text: '20' },
      { key: 'D', text: '22' },
    ],
    correctAnswer: 'C',
    explanation:
      'Adım Adım Çözüm:\nSaat 16:50’den itibaren 25 dakika çalışırsa saat 17:15 olana kadar çalışır.\n\n1) Saat kısmı 16 iken:\n16 = 2⁴ olduğundan, 16 ile aralarında asal olabilmesi için dakikanın 2’ye bölünmeyen (TEK) sayı olması yeterlidir.\nDakikalar (50’den 59’a kadar): 50, 51, 52, 53, 54, 55, 56, 57, 58, 59.\nTek dakikalar: 51, 53, 55, 57, 59 -> 5 kez sinyal verir.\n\n2) Saat kısmı 17 iken:\n17 asal bir sayıdır! Dolayısıyla 17’nin katı olmayan (17 hariç) tüm pozitif tam sayılar 17 ile aralarında asaldır.\nDakikalar (01’den 15’e kadar): 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15.\nBu 15 dakikanın tamamında 17 ile aralarında asaldır -> 15 kez sinyal verir.\n\n3) Toplam Sinyal Sayısı: 5 + 15 = 20 kez.\nDoğru Cevap: C',
    distractorAnalysis: {
      A: '17 Asal Sayı Kuralını Eksik Bilen: 17 ile çift sayıları aralarında asal zannetmeyen öğrenci.',
      B: '1 Sayısını Saymayan Tuzağı: "1 tüm pozitif tam sayılarla aralarında asaldır" kuralını unutup 17:01’i atlayan öğrenci (20 - 1 = 19).',
      C: 'Doğru Seçenek: 16 ile tekleri (5 adet), 17 ile tüm dakikaları (15 adet) eksiksiz toplayan çözüm (20 kez).',
      D: 'Aralık Sınırını Yanlış Alan: 16:50’yi ve 17:15’i çift sayıp fazladan ekleme yapan öğrenci.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },
  {
    id: 'shadow-math-q14-2',
    parentQuestionId: 'math-q14',
    parentQuestionNumber: 14,
    parentQuestionTitle: 'Dijital Saat ve Aralarında Asal Sayılar Alarmı',
    shadowIndex: 2,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'MATEMATİK',
    learningObjective: 'M.8.1.1.3 - Verilen iki doğal sayının aralarında asal olup olmadığını belirler.',
    topic: 'Çarpanlar ve Katlar / Aralarında Asallık ve Dakika Sayımı',
    difficulty: 'Orta',
    title: 'Gölge 2: Laboratuvar Zamanlayıcısı ve İkaz Lambası',
    leadText:
      'Bir deney laboratuvarındaki dijital zamanlayıcı, saat kısmı ile dakika kısmı aralarında asal olan her dakikada yeşil ikaz lambasını yakmaktadır.\n\nZamanlayıcı 10:46’yı gösterirken deney başlatılmış ve tam 24 dakika sonra (saat 11:10’da) deney sonlandırılmıştır.',
    questionPrompt: 'Buna göre deney boyunca yeşil ikaz lambası toplam kaç kez yanmıştır?',
    options: [
      { key: 'A', text: '14' },
      { key: 'B', text: '16' },
      { key: 'C', text: '17' },
      { key: 'D', text: '18' },
    ],
    correctAnswer: 'B',
    explanation:
      'Adım Adım Çözüm:\n1) Saat kısmı 10 iken (10 = 2 · 5 olduğundan, dakikalar hem 2’ye hem 5’e bölünmeyen sayılar olmalıdır):\nDakikalar (46’dan 59’a kadar):\n• Çiftleri eleriz: 46, 48, 50, 52, 54, 56, 58 elenir.\n• 5’in katı olan tekleri eleriz: 55 elenir.\n• Kalan dakikalar: 47, 49, 51, 53, 57, 59 -> Toplam 6 dakika.\n\n2) Saat kısmı 11 iken (11 asal sayıdır, 1’den 10’a kadar olan tüm sayılar 11 ile aralarında asaldır):\nDakikalar (01’den 10’a kadar): 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 -> Toplam 10 dakika.\n\n3) Toplam Sinyal Sayısı = 6 + 10 = 16 kez.\nDoğru Cevap: B',
    distractorAnalysis: {
      A: '10’un asal çarpanlarından 5’i unutup çiftleri doğru eleyen ancak teklerde hata yapan öğrenci.',
      B: 'Doğru Seçenek: 6 + 10 = 16 kez doğru sayım.',
      C: '11:00’ı veya 11:11’i aralıkta sanıp fazladan 1 ekleyen öğrenci.',
      D: '49 veya 51 sayısını asal sanıp 10 ile aralarında asal olamayacağını zanneden öğrenci.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },

  // =========================================================================
  // MATEMATİK 7. SORU (Orijinal Soru 15: Demir Çubuklardan Çokgen Çerçeveler) - 2 Gölge Soru
  // =========================================================================
  {
    id: 'shadow-math-q15-1',
    parentQuestionId: 'math-q15',
    parentQuestionNumber: 15,
    parentQuestionTitle: 'Demir Çubuklardan Düzgün Çokgen Çerçeveler Yapma',
    shadowIndex: 1,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'MATEMATİK',
    learningObjective: 'M.8.1.1.2 - İki doğal sayının en büyük ortak bölenini (EBOB) hesaplar, ilgili problemleri çözer.',
    topic: 'Çarpanlar ve Katlar / Düzgün Çokgen Çerçeveler ve EBOB',
    difficulty: 'Zor',
    title: 'Gölge 1: Mavi ve Sarı Profillerden Kare ve Üçgen Çerçeveler',
    leadText:
      'Aşağıda uzunlukları sırasıyla 360 cm ve 240 cm olan mavi ve sarı renkli iki alüminyum profil verilmiştir.\n\nBu iki profilin tamamı uzunlukları santimetre cinsinden birer tam sayı ve birbirine eşit olacak şekilde parçalara kesilmiştir. Elde edilen mavi parçaların 4’er tanesi birleştirilerek kare biçiminde mavi çerçeveler, sarı parçaların 3’er tanesi birleştirilerek eşkenar üçgen biçiminde sarı çerçeveler yapılmıştır.',
    questionPrompt: 'Profillerin tamamı kullanıldığına göre oluşturulan kare çerçeve sayısı ile üçgen çerçeve sayısı arasındaki fark en az kaçtır?',
    options: [
      { key: 'A', text: '1' },
      { key: 'B', text: '2' },
      { key: 'C', text: '5' },
      { key: 'D', text: '10' },
    ],
    correctAnswer: 'A',
    explanation:
      'Adım Adım Çözüm:\n1) Kesilen bir parçanın uzunluğu x cm olsun (x tam sayı).\n• Mavi profil: 360 / x parça. 4 tanesiyle 1 kare çerçeve yapıldığı için kare sayısı = (360 / x) / 4 = 90 / x (tam sayı olmalı).\n• Sarı profil: 240 / x parça. 3 tanesiyle 1 üçgen çerçeve yapıldığı için üçgen sayısı = (240 / x) / 3 = 80 / x (tam sayı olmalı).\n\n2) x sayısı hem 90’ı hem de 80’i tam bölmelidir. Yani x, EBOB(90, 80) sayısının bir böleni olmalıdır.\nEBOB(90, 80) = 10.\n\n3) Çerçeve sayıları farkı: |90/x - 80/x| = 10/x.\nFarkın EN AZ olması için x’in EN BÜYÜK değeri alınmalıdır: x = 10 cm.\n• Kare sayısı = 90 / 10 = 9 adet.\n• Üçgen sayısı = 80 / 10 = 8 adet.\nFark = 9 - 8 = 1 adet.\nDoğru Cevap: A',
    distractorAnalysis: {
      A: 'Doğru Seçenek: x = 10 cm seçildiğinde 9 - 8 = 1 en küçük tam sayı farkıdır.',
      B: 'x = 5 cm seçildiğinde fark 18 - 16 = 2 olur; ancak en az istendiği için x = 10 varken B seçeneği minimum değildir.',
      C: 'x = 2 cm seçildiğinde fark 45 - 40 = 5 olur; öğrenci x’i küçük seçme yanılgısına düşmüştür.',
      D: 'Doğrudan EBOB değerini fark zanneden öğrenci çeldiricisi.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },
  {
    id: 'shadow-math-q15-2',
    parentQuestionId: 'math-q15',
    parentQuestionNumber: 15,
    parentQuestionTitle: 'Demir Çubuklardan Düzgün Çokgen Çerçeveler Yapma',
    shadowIndex: 2,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'MATEMATİK',
    learningObjective: 'M.8.1.1.2 - İki doğal sayının en büyük ortak bölenini (EBOB) hesaplar, ilgili problemleri çözer.',
    topic: 'Çarpanlar ve Katlar / Çokgen Çerçeve Sayıları Arasındaki Fark',
    difficulty: 'Zor',
    title: 'Gölge 2: Bakır ve Çelik Tellerden Beşgen ve Altıgen Panolar',
    leadText:
      'Uzunlukları 300 cm ve 180 cm olan iki tel eşit uzunlukta parçalara ayrılıyor. 300 cm’lik telin parçalarından 5’er tanesiyle düzgün beşgenler, 180 cm’lik telin parçalarından 6’şar tanesiyle düzgün altıgenler yapılıyor.',
    questionPrompt: 'Tellerin tamamı kullanıldığına göre oluşturulan beşgen sayısı ile altıgen sayısı arasındaki fark en az kaçtır?',
    options: [
      { key: 'A', text: '1' },
      { key: 'B', text: '2' },
      { key: 'C', text: '3' },
      { key: 'D', text: '6' },
    ],
    correctAnswer: 'A',
    explanation:
      'Adım Adım Çözüm:\n1) Parça boyu x cm olsun.\n• Beşgen sayısı = (300 / x) / 5 = 60 / x (tam sayı).\n• Altıgen sayısı = (180 / x) / 6 = 30 / x (tam sayı).\n2) x hem 60’ı hem 30’u tam bölmelidir. EBOB(60, 30) = 30 cm.\n3) Farkın en az olması için x = 30 cm seçilir:\n• Beşgen sayısı = 60 / 30 = 2\n• Altıgen sayısı = 30 / 30 = 1\nFark = 2 - 1 = 1 adet.\nDoğru Cevap: A',
    distractorAnalysis: {
      A: 'Doğru Seçenek: x = 30 cm için 2 - 1 = 1.',
      B: 'Beşgen sayısını (2) işaretleyen öğrenci.',
      C: 'x = 10 cm alıp 6 - 3 = 3 bulan öğrenci.',
      D: 'Tel uzunluklarını birbirine bölüp fark arayan kural dışı yaklaşım.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },

  // =========================================================================
  // MATEMATİK 8. SORU (Orijinal Soru 16: Üslü İfadelerin İşaret Analizi) - 2 Gölge Soru
  // =========================================================================
  {
    id: 'shadow-math-q16-1',
    parentQuestionId: 'math-q16',
    parentQuestionNumber: 16,
    parentQuestionTitle: 'Üslü İfadelerin İşaret Analizi (Pozitif / Negatif / Sıfır)',
    shadowIndex: 1,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'MATEMATİK',
    learningObjective: 'M.8.1.2.2 - Tam sayıların tam sayı kuvvetlerini hesaplar, işaret durumlarını analiz eder.',
    topic: 'Üslü İfadeler / Kuvvetin Konumu, Çift/Tek Üs ve İşaret Tespiti',
    difficulty: 'Kolay',
    title: 'Gölge 1: Sayı Kartlarında Pozitif ve Negatif Sayı Dengesi',
    leadText:
      'Üzerinde üslü ifadelerin yazılı olduğu 12 adet kart verilmiştir:\n• 1. Grup Kartlar: (-3)⁴, -3², 5⁻², (-2)⁻⁴, (-5)³, 0⁷\n• 2. Grup Kartlar: -2⁶, (-3)⁶, (-4)³, (-7)², (-2)⁷, (-8)⁰',
    questionPrompt: 'Buna göre bu kartlardan sonuçları pozitif olanların sayısı, sonuçları negatif olanların sayısından kaç fazladır?',
    options: [
      { key: 'A', text: '0' },
      { key: 'B', text: '1' },
      { key: 'C', text: '2' },
      { key: 'D', text: '3' },
    ],
    correctAnswer: 'B',
    explanation:
      'Adım Adım Çözüm:\n1) Pozitif Olanlar (+):\n• (-3)⁴ = +81 (Çift kuvvet parantez dışı -> Pozitif)\n• 5⁻² = +1/25 (Taban pozitif olduğundan kuvvet ne olursa olsun sonuç Pozitif)\n• (-2)⁻⁴ = +1/16 (Çift kuvvet parantez dışı -> Pozitif)\n• (-3)⁶ = +729 (Çift kuvvet parantez dışı -> Pozitif)\n• (-7)² = +49 (Çift kuvvet parantez dışı -> Pozitif)\n• (-8)⁰ = +1 (Parantez dışı sıfır kuvveti -> Pozitif)\nToplam Pozitif Kart Sayısı = 6 adet.\n\n2) Negatif Olanlar (-):\n• -3² = -9 (Parantez yok, eksi aynen kalır -> Negatif)\n• (-5)³ = -125 (Tek kuvvet -> Negatif)\n• -2⁶ = -64 (Parantez olmadığı için üs eksiye etki etmez -> Negatif)\n• (-4)³ = -64 (Tek kuvvet -> Negatif)\n• (-2)⁷ = -128 (Tek kuvvet -> Negatif)\nToplam Negatif Kart Sayısı = 5 adet.\n\n3) Sıfır Olan:\n• 0⁷ = 0 (Sıfır ne pozitif ne de negatiftir, işaretsizdir!)\n\nFark = 6 - 5 = 1 fazladır.\nDoğru Cevap: B',
    distractorAnalysis: {
      A: '0⁷ sayısını pozitif sayıp 6 - 6 = 0 bulan sıfır işareti yanılgısı.',
      B: 'Doğru Seçenek: 6 pozitif, 5 negatif, 1 sıfır doğru tespit edilmiş ve fark 1 bulunmuştur.',
      C: '-2⁶ ifadesindeki parantezsizliği fark etmeyip onu da pozitif sayarak 7 - 5 = 2 bulan öğrenci.',
      D: 'Negatif kuvvetli sayıları (5⁻², (-2)⁻⁴) negatif zanneden ters kuvvet yanılgısı.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },
  {
    id: 'shadow-math-q16-2',
    parentQuestionId: 'math-q16',
    parentQuestionNumber: 16,
    parentQuestionTitle: 'Üslü İfadelerin İşaret Analizi (Pozitif / Negatif / Sıfır)',
    shadowIndex: 2,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'MATEMATİK',
    learningObjective: 'M.8.1.2.2 - Tam sayıların tam sayı kuvvetlerini hesaplar, işaret durumlarını analiz eder.',
    topic: 'Üslü İfadeler / Kutulardaki Üslü Sayıların İşaret Karşılaştırması',
    difficulty: 'Kolay',
    title: 'Gölge 2: Kutu İçindeki Üslü Sayılar ve İşaret Sayımı',
    leadText:
      'Öğretmen masasında duran 10 adet pullun üzerinde şu ifadeler yer almaktadır:\n• Kırmızı Pullar: (-5)⁴, -5², 3⁻⁴, (-3)⁻², (-2)⁵\n• Mavi Pullar: -6², (-4)⁴, (-5)⁵, (-6)⁰, 0⁴',
    questionPrompt: 'Bu pullar arasından değeri pozitif olanların sayısı, değeri negatif olanların sayısından kaç fazladır?',
    options: [
      { key: 'A', text: '0' },
      { key: 'B', text: '1' },
      { key: 'C', text: '2' },
      { key: 'D', text: '3' },
    ],
    correctAnswer: 'B',
    explanation:
      'Adım Adım Çözüm:\n• Pozitif Değerler (+):\n  (-5)⁴ (+), 3⁻⁴ (+), (-3)⁻² (+), (-4)⁴ (+), (-6)⁰ (+)\n  Toplam = 5 adet.\n• Negatif Değerler (-):\n  -5² (-), (-2)⁵ (-), -6² (-), (-5)⁵ (-)\n  Toplam = 4 adet.\n• Sıfır: 0⁴ = 0 (İşaretsiz).\nFark = 5 - 4 = 1.\nDoğru Cevap: B',
    distractorAnalysis: {
      A: '0⁴ değerini negatif veya pozitif sayıp eşitlik düşünen öğrenci.',
      B: 'Doğru Seçenek: 5 pozitif - 4 negatif = 1.',
      C: 'Parantezsiz -6² sayısını çift kuvvet sanıp pozitif alan öğrenci.',
      D: '3⁻⁴ sayısını negatif sanan kuvvet yanılgısı.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },

  // =========================================================================
  // MATEMATİK 9. SORU (Orijinal Soru 20: Ağaç Çıtalarından Kare Çerçeve) - 2 Gölge Soru
  // =========================================================================
  {
    id: 'shadow-math-q20-1',
    parentQuestionId: 'math-q20',
    parentQuestionNumber: 20,
    parentQuestionTitle: 'Ağaç Çıtalarından Kare Çerçeve Yapımı ve Artan Parçalar',
    shadowIndex: 1,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'MATEMATİK',
    learningObjective: 'M.8.1.1.1 - Asal sayıların kuvvetlerini ve bölünebilme özelliklerini problem çözmede kullanır.',
    topic: 'Çarpanlar ve Katlar / Asal Kuvvetler ve Artan Parça Problemi',
    difficulty: 'Orta',
    title: 'Gölge 1: Metal Borulardan Kare Çerçeve ve Artan Parçalar',
    leadText:
      'Bir kaynak atölyesinde üç farklı metal boru kesilerek kare şeklinde resim çerçeveleri üretilecektir:\n• Çelik boru (112 cm): Uzunluğu santimetre cinsinden 2’nin pozitif tam sayı kuvveti olan eş parçalara ayrılacaktır.\n• Bakır boru (135 cm): Uzunluğu santimetre cinsinden 3’ün pozitif tam sayı kuvveti olan eş parçalara ayrılacaktır.\n• Alüminyum boru (175 cm): Uzunluğu santimetre cinsinden 5’in pozitif tam sayı kuvveti olan eş parçalara ayrılacaktır.\n\nBorulardan hiç parça artmayacak ve toplam parça sayısı en az olacak şekilde kesimler yapılacaktır. Ardından elde edilen parçaların aynı türden 4 tanesi birleştirilerek oluşturulabilecek en fazla sayıda kare çerçeve yapılacaktır.',
    questionPrompt: 'Buna göre, kare çerçeveler yapıldıktan sonra artan toplam parça sayısı kaçtır?',
    options: [
      { key: 'A', text: '5' },
      { key: 'B', text: '6' },
      { key: 'C', text: '7' },
      { key: 'D', text: '8' },
    ],
    correctAnswer: 'C',
    explanation:
      'Adım Adım Çözüm:\nParça sayısının EN AZ olması için parça uzunluğu bölünebilen EN BÜYÜK kuvvet seçilmelidir:\n\n1) Çelik Boru (112 cm):\n112’yi bölen 2’nin kuvvetleri: 2, 4, 8, 16. (112 / 16 = 7).\nParça uzunluğu = 16 cm, parça sayısı = 7 adet.\nKare için 4 parça gerekir: 7 = (4 · 1) + 3 -> 1 çerçeve yapılır, 3 parça artar.\n\n2) Bakır Boru (135 cm):\n135’i bölen 3’ün kuvvetleri: 3, 9, 27. (135 / 27 = 5).\nParça uzunluğu = 27 cm, parça sayısı = 5 adet.\nKare için 4 parça gerekir: 5 = (4 · 1) + 1 -> 1 çerçeve yapılır, 1 parça artar.\n\n3) Alüminyum Boru (175 cm):\n175’i bölen 5’in kuvvetleri: 5, 25. (175 / 25 = 7).\nParça uzunluğu = 25 cm, parça sayısı = 7 adet.\nKare için 4 parça gerekir: 7 = (4 · 1) + 3 -> 1 çerçeve yapılır, 3 parça artar.\n\nToplam Artan Parça = 3 (Çelik) + 1 (Bakır) + 3 (Alüminyum) = 7 parça.\nDoğru Cevap: C',
    distractorAnalysis: {
      A: 'Bakır borudan artanı unutan veya 135/27’yi 4 sanan hesap hatası.',
      B: 'Çelik boruda 16 yerine 8 alıp kalanları karıştıran öğrenci.',
      C: 'Doğru Seçenek: 3 + 1 + 3 = 7 parça artar.',
      D: 'Orijinal sorunun cevabını (8) ezbere işaretleyen dikkatsiz öğrenci tuzağı.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },
  {
    id: 'shadow-math-q20-2',
    parentQuestionId: 'math-q20',
    parentQuestionNumber: 20,
    parentQuestionTitle: 'Ağaç Çıtalarından Kare Çerçeve Yapımı ve Artan Parçalar',
    shadowIndex: 2,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'MATEMATİK',
    learningObjective: 'M.8.1.1.1 - Asal sayıların kuvvetlerini ve bölünebilme özelliklerini problem çözmede kullanır.',
    topic: 'Çarpanlar ve Katlar / Ahşap Kesim ve Kare Çerçeve İmalatı',
    difficulty: 'Orta',
    title: 'Gölge 2: Marangoz Çıtaları ve Artan Ahşap Parçalar',
    leadText:
      'Bir marangoz üç çıtayı hiç parça artmayacak ve parça sayısı en az olacak şekilde kesiyor:\n• Çam çıta (208 cm): 2’nin pozitif tam sayı kuvveti uzunluğundaki parçalara,\n• Gürgen çıta (162 cm): 3’ün pozitif tam sayı kuvveti uzunluğundaki parçalara,\n• Ihlamur çıta (200 cm): 5’in pozitif tam sayı kuvveti uzunluğundaki parçalara ayrılıyor.\n\nHer çıta türünden 4’er eş parça birleştirilerek yapılabilecek en çok sayıda kare çerçeve yapılacaktır.',
    questionPrompt: 'Çerçeve yapımı bittikten sonra kullanılmayan (artan) toplam çıta sayısı kaçtır?',
    options: [
      { key: 'A', text: '2' },
      { key: 'B', text: '3' },
      { key: 'C', text: '4' },
      { key: 'D', text: '5' },
    ],
    correctAnswer: 'B',
    explanation:
      'Adım Adım Çözüm:\n1) Çam (208 cm): 208’i bölen 2’nin en büyük kuvveti 16’dır (208 / 16 = 13 parça). 13 = 3 · 4 + 1 -> 3 çerçeve yapılır, 1 parça artar.\n2) Gürgen (162 cm): 162’yi bölen 3’ün en büyük kuvveti 81’dir (162 / 81 = 2 parça). 2 parça ile 4 parçalık kare çerçeve yapılamaz -> 2 parçanın 2’si de artar.\n3) Ihlamur (200 cm): 200’ü bölen 5’in en büyük kuvveti 25’tir (200 / 25 = 8 parça). 8 = 2 · 4 -> 2 çerçeve yapılır, 0 parça artar.\nToplam Artan Parça = 1 + 2 + 0 = 3 parça.\nDoğru Cevap: B',
    distractorAnalysis: {
      A: 'Gürgen çıtadan hiç çerçeve yapılamayacağını düşünüp onu hesaba katmayan öğrenci.',
      B: 'Doğru Seçenek: 1 (Çam) + 2 (Gürgen) + 0 (Ihlamur) = 3 parça artar.',
      C: 'Ihlamur çıtada 25 yerine 5 alıp parça hesabını karıştıran öğrenci.',
      D: 'Tüm artanları yüzeysel tahmin eden öğrenci.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },

  // =========================================================================
  // TÜRKÇE 1. SORU (Orijinal Soru 1: Bezgin Kelimesi) - 2 Gölge Soru
  // =========================================================================
  {
    id: 'shadow-tr-q1-1',
    parentQuestionId: 'tr-q1',
    parentQuestionNumber: 1,
    parentQuestionTitle: 'Sözcükte Anlam - "Bezgin" Sözcüğünün Anlamı',
    shadowIndex: 1,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'TÜRKÇE',
    learningObjective: 'T.8.1.2 - Bağlamdan yararlanarak bilmediği kelime ve kelime gruplarının anlamını tahmin eder / yakın anlamlılığı kavrar.',
    topic: 'Sözcükte Anlam / Yılgınlık, İsteksizlik ve Ruhsal Durum Belirten Sözcükler',
    difficulty: 'Orta',
    title: 'Gölge 1: Cümlede Anlam - "Yılgın" Sözcüğünün Karşılığı',
    leadText:
      'Yıllardır verdiği emeklerin karşılığını görememek onu öyle **yılgın** bir hâle getirmişti ki yeni bir projeye başlama teklifini tereddüt etmeden geri çevirdi.',
    questionPrompt: 'Bu cümledeki koyu yazılmış sözü ("yılgın") anlamca karşılayabilecek bir ifade aşağıdakilerin hangisinde vardır?',
    options: [
      { key: 'A', text: 'Ağır antrenmandan sonra kasları öyle ağrıyordu ki merdivenleri güçlükle çıkabildi.' },
      { key: 'B', text: 'Karşılaştığı güçlükler ve başarısızlıklar yüzünden cesaretini, çalışma hevesini tamamen kaybetmişti.' },
      { key: 'C', text: 'Yeni görevine başlarken arkadaşlarının desteğini arkasında hissetmek ona büyük bir güven vermişti.' },
      { key: 'D', text: 'Sunum sırasında salondakilerin dikkatini çekebilmek için ses tonunu sürekli değiştirdi.' },
    ],
    correctAnswer: 'B',
    explanation:
      '"Yılgın" sözcüğü; karşılaşılan zorluklar, engeller veya hayal kırıklıkları sebebiyle mücadele gücünü, hevesini veya cesaretini yitirmiş durumu ifade eder.\n\nB seçeneğindeki "cesaretini, çalışma hevesini tamamen kaybetmişti" ifadesi "yılgın" ruh halini tam olarak karşılamaktadır. A bedensel yorgunluğu, C özgüveni, D ise çabayı anlatır.\nDoğru Cevap: B',
    distractorAnalysis: {
      A: 'Fiziksel Yorgunluk Çeldiricisi: Ruhsal bezginlik/yılgınlık ile bedensel kas yorgunluğunu karıştıran öğrenci.',
      B: 'Doğru Seçenek: Heves ve azmin kırılması durumunu birebir karşılar.',
      C: 'Zıt Anlam Çeldiricisi: Yılgınlığın tersine motivasyon ve güven durumudur.',
      D: 'İlgisiz Davranış: Sunum becerisini anlatan alakasız cümle.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },
  {
    id: 'shadow-tr-q1-2',
    parentQuestionId: 'tr-q1',
    parentQuestionNumber: 1,
    parentQuestionTitle: 'Sözcükte Anlam - "Bezgin" Sözcüğünün Anlamı',
    shadowIndex: 2,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'TÜRKÇE',
    learningObjective: 'T.8.1.2 - Bağlamdan yararlanarak bilmediği kelime ve kelime gruplarının anlamını tahmin eder.',
    topic: 'Sözcükte Anlam / Deyimler ve Mecaz Anlam',
    difficulty: 'Orta',
    title: 'Gölge 2: Cümlede Anlam - "Mecali Kalmamak" Deyiminin Karşılığı',
    leadText:
      'Aylardır süren belirsizlik ve tükenmişlik yüzünden artık tek bir satır yazı okumaya bile **mecali kalmamıştı**.',
    questionPrompt: 'Bu cümledeki koyu yazılmış sözü ("mecali kalmamıştı") anlamca karşılayan ifade hangisinde vardır?',
    options: [
      { key: 'A', text: 'İçinde bulunduğu manevi çökkünlük ve takatsizlik sebebiyle hiçbir işe elini sürecek gücü ve isteği kalmamıştı.' },
      { key: 'B', text: 'Yolda arkadaşıyla karşılaşınca ayaküstü koyu bir sohbete daldı.' },
      { key: 'C', text: 'Konunun ayrıntılarını merak ettiği için saatlerce kütüphanede araştırma yaptı.' },
      { key: 'D', text: 'Kendisine verilen görevi vaktinden önce bitirebilmek için büyük bir hevesle çalıştı.' },
    ],
    correctAnswer: 'A',
    explanation:
      '"Mecali kalmamak"; bir işi yapacak gücü, dermânı, isteği veya takati kalmamak anlamına gelir.\nA seçeneğindeki ifade bu anlamı eksiksiz sunar.\nDoğru Cevap: A',
    distractorAnalysis: {
      A: 'Doğru Seçenek: Güç ve istek tükenişini birebir karşılar.',
      B: 'Sohbet etme durumuyla ilgisiz çeldirici.',
      C: 'Merak ve istek durumunu belirten zıt çeldirici.',
      D: 'Yüksek hevesi belirten tam karşıt çeldirici.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },

  // =========================================================================
  // TÜRKÇE 2. SORU (Orijinal Soru 2: Yazarın Üslubu ve Okurun Ortaklığı) - 2 Gölge Soru
  // =========================================================================
  {
    id: 'shadow-tr-q2-1',
    parentQuestionId: 'tr-q2',
    parentQuestionNumber: 2,
    parentQuestionTitle: 'Paragrafta Anlam - Yazarın Üslubu ve Okurun Ortaklığı',
    shadowIndex: 1,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'TÜRKÇE',
    learningObjective: 'T.8.3.18 - Metindeki açık ve örtük iletileri, yazarın bakış açısını belirler.',
    topic: 'Paragrafta Anlam / Metin Yorumlama ve Okur-Yazar Etkileşimi',
    difficulty: 'Zor',
    title: 'Gölge 1: Metinde Anlatılmak İstenen - Düş Gücüne Açık Eser',
    leadText:
      'Bir edebiyat eleştirmeni: “Gerçek bir yazar okurun önüne her köşesi aydınlatılmış bir oda koymaz; aksine odaya birkaç kandil bırakıp gölgeli alanları okurun kendi düş gücüyle aydınlatmasını bekler.” demiştir.',
    questionPrompt: 'Bu cümledeki edebî anlayış aşağıdaki örnek durumların hangisiyle örtüşmektedir?',
    options: [
      { key: 'A', text: 'Yazarın romandaki tüm karakterlerin geçmişini, psikolojisini ve olayların sonucunu en ince ayrıntısına kadar açıklaması.' },
      { key: 'B', text: 'Öykücünün finali belirsiz bırakarak metnin sonunu her okurun kendi hayal gücü ve hayat tecrübesine göre tamamlamasına fırsat tanıması.' },
      { key: 'C', text: 'Yazarın kahramanlarını sadece gerçek hayatta karşılaşılabilecek kusursuz kişilerden seçmesi.' },
      { key: 'D', text: 'Eserde kullanılan dilin herkes tarafından aynı şekilde anlaşılabilecek yalınlıkta tutulması.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Öncülde yazarın "her şeyi açıkça söylememesi, gölgeli alanları okurun düş gücüne bırakması" ilkesi anlatılmaktadır.\n\nB seçeneğindeki "metnin sonunu her okurun kendi hayal gücü ve hayat tecrübesine göre tamamlamasına fırsat tanıması" bu anlayışı tam olarak yansıtmaktadır.\nDoğru Cevap: B',
    distractorAnalysis: {
      A: 'Tam Karşıtı Çeldirici: Her şeyi en ince ayrıntısına kadar açıklamak, okura boşluk bırakmayan didaktik tarzdır.',
      B: 'Doğru Seçenek: Okurun zihninde metni tamamlaması anlayışını yansıtır.',
      C: 'Karakter seçimiyle ilgili alakasız çeldirici.',
      D: 'Yalnızca üslup yalınlığına değinen yüzeysel çeldirici.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },
  {
    id: 'shadow-tr-q2-2',
    parentQuestionId: 'tr-q2',
    parentQuestionNumber: 2,
    parentQuestionTitle: 'Paragrafta Anlam - Yazarın Üslubu ve Okurun Ortaklığı',
    shadowIndex: 2,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'TÜRKÇE',
    learningObjective: 'T.8.3.18 - Metindeki açık ve örtük iletileri, metinler arası ilişkileri kavrar.',
    topic: 'Paragrafta Anlam / Şiirde Çağrışım ve Okurun Katkısı',
    difficulty: 'Zor',
    title: 'Gölge 2: Şiirde Anlam Çokluğu ve Okurun Rolü',
    leadText:
      'Usta bir şair bir söyleşisinde: “Şiir tamamlanmış bir anıt değildir; okurun kalbinde yeniden yazılmayı bekleyen yarım bir fısıltıdır. Aynı dizeyi okuyan iki ayrı insan, kendi yaralarını dizeye kattıklarında iki farklı şiir doğar.” demiştir.',
    questionPrompt: 'Şairin bu sözleriyle savunduğu temel düşünce aşağıdakilerden hangisidir?',
    options: [
      { key: 'A', text: 'Edebî metinlerin tek ve değişmez bir anlamı olmalı, okura göre değişmemelidir.' },
      { key: 'B', text: 'Bir eserin gerçek değeri, okurun kendi iç dünyasını ve duygu dünyasını metne katarak onu çoğaltmasıyla ortaya çıkar.' },
      { key: 'C', text: 'Şairler eserlerini yazarken toplumsal kurallara ve hece ölçüsüne titizlikle bağlı kalmalıdır.' },
      { key: 'D', text: 'Şiir yazmak diğer edebî türlere göre çok daha zahmetli bir süreçtir.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Şair, şiirin okurun kendi duygularıyla birleştiğinde yeniden var olduğunu ve zenginleştiğini vurgulamaktadır.\nB seçeneği bu ana düşünceyi eksiksiz vermektedir.\nDoğru Cevap: B',
    distractorAnalysis: {
      A: 'Tek anlamlılık tezi öncüldeki çoğul anlamlılığın zıttıdır.',
      B: 'Doğru Seçenek: Okurun kendi iç dünyasıyla eseri çoğaltması.',
      C: 'Biçimsel ölçü kurallarına değinen gereksiz detay.',
      D: 'Yazma zorluğuyla ilgili konu dışı fikir.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },

  // =========================================================================
  // TÜRKÇE 3. SORU (Orijinal Soru 3: Fiilimsiler - Sıfat-Fiilin İşlevi) - 2 Gölge Soru
  // =========================================================================
  {
    id: 'shadow-tr-q3-1',
    parentQuestionId: 'tr-q3',
    parentQuestionNumber: 3,
    parentQuestionTitle: 'Fiilimsiler - Sıfat-Fiilin İşlevi (Adlaşmış Sıfat-Fiil)',
    shadowIndex: 1,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'TÜRKÇE',
    learningObjective: 'T.8.3.9 - Fiilimsilerin cümledeki işlevlerini ve türlerini kavrar (Sıfat-fiil ve Adlaşmış Sıfat-fiil ayrımı).',
    topic: 'Dil Bilgisi / Sıfat-Fiil ve Adlaşmış Sıfat-Fiil İşlevi',
    difficulty: 'Zor',
    title: 'Gölge 1: Cümlelerde Sıfat-Fiilin İşlev Farklılığı',
    leadText:
      '(I) Hafta sonu sahil kenarındaki parklar, güzel havayı fırsat bilip yürüyüşe çıkan insanlarla doluyordu. (II) Çocuklar, oynayacak geniş bir alan bulabilmek için çimenlerin üzerinde neşeyle koşuyordu. (III) Yaşlılar ise geçmişte yaşadıklarını banklarda oturup birbirlerine saatlerce anlatıyordu. (IV) Rüzgârda uçuşan kuru yapraklar, yolları rengârenk bir örtü gibi kaplamıştı.',
    questionPrompt: 'Bu parçada numaralanmış cümlelerin hangisinde sıfat-fiilin işlevi diğerlerinden farklıdır?',
    options: [
      { key: 'A', text: 'I' },
      { key: 'B', text: 'II' },
      { key: 'C', text: 'III' },
      { key: 'D', text: 'IV' },
    ],
    correctAnswer: 'C',
    explanation:
      'Cümlelerdeki sıfat-fiillerin görevleri incelendiğinde:\n• I. Cümle: "çıkan insanlar" -> İsmi niteleyen standart sıfat tamlaması görevi.\n• II. Cümle: "oynayacak geniş bir alan" -> İsmi niteleyen sıfat görevi.\n• III. Cümle: "yaşadıklarını" (-dık eki) -> "yaşadıkları olayları / anıları" anlamında olup nitelediği isim düştüğü için ADLAŞMIŞ SIFAT-FİİL görevindedir.\n• IV. Cümle: "uçuşan kuru yapraklar" -> İsmi niteleyen sıfat görevi.\n\nIII. cümledeki sıfat-fiil adlaştığı için işlevi diğer üçünden farklıdır.\nDoğru Cevap: C',
    distractorAnalysis: {
      A: '"çıkan insanlar" tamlamasında isim düşmemiştir, sıfat görevindedir.',
      B: '"oynayacak alan" tamlamasında isim yerindedir.',
      C: 'Doğru Seçenek: "yaşadıklarını" kelimesinde isim düşmüş ve adlaşmış sıfat-fiil olmuştur.',
      D: '"uçuşan yapraklar" tamlamasında isim mevcuttur.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },
  {
    id: 'shadow-tr-q3-2',
    parentQuestionId: 'tr-q3',
    parentQuestionNumber: 3,
    parentQuestionTitle: 'Fiilimsiler - Sıfat-Fiilin İşlevi (Adlaşmış Sıfat-Fiil)',
    shadowIndex: 2,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'TÜRKÇE',
    learningObjective: 'T.8.3.9 - Fiilimsilerin cümledeki işlevlerini ve türlerini kavrar.',
    topic: 'Dil Bilgisi / Sıfat Tamlaması Kuran Sıfat-Fiil ve Adlaşma',
    difficulty: 'Zor',
    title: 'Gölge 2: Kütüphanede Sıfat-Fiil Tür ve Görev Analizi',
    leadText:
      '(I) Kütüphanenin tozlu raflarında unutulmuş eski dergiler dikkatle inceleniyordu. (II) Salondaki görevli, gürültü yapanları nazikçe uyararak sessizliği korumaya çalıştı. (III) Öğrenciler, teslim edilecek ödev dosyalarını tek tek masanın üstüne bıraktılar. (IV) Duvarda asılı duran antika saat her saat başında tok bir sesle çalardı.',
    questionPrompt: 'Bu parçadaki numaralanmış cümlelerden hangisinde adlaşmış sıfat-fiil kullanılmıştır?',
    options: [
      { key: 'A', text: 'I' },
      { key: 'B', text: 'II' },
      { key: 'C', text: 'III' },
      { key: 'D', text: 'IV' },
    ],
    correctAnswer: 'B',
    explanation:
      'II. cümledeki "gürültü yapanları" ifadesi "gürültü yapan kişileri / öğrencileri" anlamındadır. Nitelediği isim düştüğü için sıfat-fiil adlaşmıştır (-an eki).\nDiğer cümlelerde "unutulmuş dergiler", "teslim edilecek dosyalar", "duran saat" ifadelerinde isimler düşmemiştir.\nDoğru Cevap: B',
    distractorAnalysis: {
      A: '"unutulmuş dergiler" sıfat tamlamasıdır.',
      B: 'Doğru Seçenek: "gürültü yapanları" adlaşmış sıfat-fiildir.',
      C: '"teslim edilecek dosyalar" sıfat tamlamasıdır.',
      D: '"duran saat" sıfat tamlamasıdır.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },

  // =========================================================================
  // TÜRKÇE 4. SORU (Orijinal Soru 4: Paragrafta Ana Fikir - Usta ve Çırak) - 2 Gölge Soru
  // =========================================================================
  {
    id: 'shadow-tr-q4-1',
    parentQuestionId: 'tr-q4',
    parentQuestionNumber: 4,
    parentQuestionTitle: 'Paragrafta Ana Fikir - Usta ve Çırak İlişkisi',
    shadowIndex: 1,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'TÜRKÇE',
    learningObjective: 'T.8.3.17 - Metnin ana fikrini / ana düşüncesini belirler.',
    topic: 'Paragrafta Anlam / Ana Düşünce - Bağımsız Yetkinlik Kazandırma',
    difficulty: 'Orta',
    title: 'Gölge 1: Dağcılık Rehberi ve Genç Sporcunun Özgürlüğü',
    quoteBlock:
      'Deneyimli bir dağcı genç sporcuya: “Benim rehberliğimin asıl başarısı, bir zirveye çıkarken bana artık tutunma ihtiyacı duymadığın gün anlaşılır. Senin adımlarını her kayada ben yönlendirirsem sen bana bağımlı bir yürüyüşçü olursun; tutunacağın kayanın sağlamlığını test etmeyi sana öğretirsem sen artık tek başına bir dağcı olursun. Çünkü başkasının izine basarak tırmanan kişi kendi yolunu çizemez.” der.',
    questionPrompt: 'Bu parçada dağcının sözleriyle anlatılmak istenen temel düşünce aşağıdakilerden hangisidir?',
    options: [
      { key: 'A', text: 'Gerçek bir usta veya rehber, yetiştirdiği kişiye başkasına bağımlı olmadan kendi yolunu bulabilecek yetkinliği kazandırandır.' },
      { key: 'B', text: 'Dağcılık sporu ancak zorlu koşullara yıllarca katlanılarak öğrenilebilir.' },
      { key: 'C', text: 'Bir ustanın tecrübesinden yararlanmayan kişiler hayatta hiçbir zaman başarılı olamaz.' },
      { key: 'D', text: 'Tırmanış yaparken ustanın belirlediği güzergâhın dışına çıkmak büyük tehlikeler doğurur.' },
    ],
    correctAnswer: 'A',
    explanation:
      'Metindeki ana vurgu; rehberin veya ustanın, yetiştirdiği kişiyi kendisine bağımlı kılmaması ("bana artık tutunma ihtiyacı duymadığın gün"), ona kendi kendine yetebilme ve bağımsız hareket edebilme becerisini kazandırmasıdır.\nA seçeneği bu ana fikri kusursuz ifade eder.\nDoğru Cevap: A',
    distractorAnalysis: {
      A: 'Doğru Seçenek: Bağımsız yetkinlik kazandırma felsefesini tam özetler.',
      B: 'Sadece spora dair dar ve yüzeysel bir yargı.',
      C: 'Metindeki ustanın "bana bağımlı olma" uyarısıyla çelişen abartılı iddia.',
      D: 'Tehlike konusuna değinen alakasız yan fikir.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },
  {
    id: 'shadow-tr-q4-2',
    parentQuestionId: 'tr-q4',
    parentQuestionNumber: 2,
    parentQuestionTitle: 'Paragrafta Ana Fikir - Usta ve Çırak İlişkisi',
    shadowIndex: 2,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'TÜRKÇE',
    learningObjective: 'T.8.3.17 - Metnin ana fikrini / ana düşüncesini belirler.',
    topic: 'Paragrafta Anlam / Resim Atölyesinde Eğitici Rolü',
    difficulty: 'Orta',
    title: 'Gölge 2: Resim Eğitmeni ve Öğrencinin Özgünlüğü',
    quoteBlock:
      'Yaşlı bir ressam atölyesindeki öğrencisine şöyle der: “Fırçayı elinden alıp resmi senin yerine ben tamamlarsam ortaya çıkan tablo benim imzamı taşır, sen ise sadece boyaları taşıyan biri olursun. Fakat renklerin uyumundaki hatayı sana hissettirip o fırça darbesini kendi elinle düzeltmeni sağlarsam gerçek bir ressam doğar. İyi bir öğretici arkasında kopyacılar değil, kendi fırçasına güvenen özgür sanatçılar bırakandır.”',
    questionPrompt: 'Bu parçada ressamın vurgulamak istediği ana düşünce aşağıdakilerden hangisidir?',
    options: [
      { key: 'A', text: 'İyi bir eğitici, öğrencisinin yerine işi yapan değil; onun kendi hatalarını fark edip bağımsız üretim yapabilmesini sağlayandır.' },
      { key: 'B', text: 'Resim sanatında renk uyumunu yakalamak uzun yıllar süren taklitlerle mümkündür.' },
      { key: 'C', text: 'Öğrencinin başarısı yaptığı resimlerin ustasının resimlerine ne kadar benzediğiyle ölçülür.' },
      { key: 'D', text: 'Kusursuz bir tablo ancak ustanın fırça darbeleriyle tamamlanabilir.' },
    ],
    correctAnswer: 'A',
    explanation:
      'Parçada eğitmenin öğrencinin yerine yapması değil, öğrenciye kendi hatasını gösterip kendi özgün yeteneğini geliştirmesi gerektiği vurgulanmıştır.\nA seçeneği bu ana fikri eksiksiz karşılar.\nDoğru Cevap: A',
    distractorAnalysis: {
      A: 'Doğru Seçenek: Bağımsız hata düzeltme ve özgür üretim.',
      B: 'Metindeki taklit karşıtı vurguyla çelişir.',
      C: 'Kopyalamayı öven metin karşıtı çeldirici.',
      D: 'Öğrenciyi pasifleştiren yanlış yaklaşım.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },

  // =========================================================================
  // TÜRKÇE 5. SORU (Orijinal Soru 5: Mimar Sinan ve Cümle Yerleştirme) - 2 Gölge Soru
  // =========================================================================
  {
    id: 'shadow-tr-q5-1',
    parentQuestionId: 'tr-q5',
    parentQuestionNumber: 5,
    parentQuestionTitle: 'Paragraf Akışı ve Cümle Yerleştirme',
    shadowIndex: 1,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'TÜRKÇE',
    learningObjective: 'T.8.3.16 - Metnin yapısını, düşünce akışını ve bağlantı ögelerini analiz eder.',
    topic: 'Paragrafta Yapı / Cümle Yerleştirme ve Bağlayıcı İfadeler ("Nitekim")',
    difficulty: 'Zor',
    title: 'Gölge 1: Geleneksel Türk Konakları ve Avlu Düzeni',
    leadText:
      '(I) Geleneksel Türk konaklarında avlu ve iç bahçe, ailenin mahremiyetini ve huzurunu koruyan mimari bir merkez niteliğindeydi. (II) Sokaktan bakıldığında görülemeyen bu iç avlular, dış dünyanın gürültüsünü ve yabancı gözleri tamamen kesen yüksek taş duvarlarla çevrilirdi. (III) Bu korunaklı yapı sayesinde ev halkı günün her saatinde dışarıdan izlenme kaygısı taşımadan günlük işlerini rahatlıkla sürdürebilirdi. (IV) Ancak konağın tasarımındaki ustalık yalnızca duvarlarla sınırlı kalmamış; odaların pencereleri de gün ışığından ve rüzgârdan en verimli şekilde faydalanacak açılarla yerleştirilmiştir.',
    questionPrompt:
      'Bu parçada numaralanmış cümlelerin hangisinden sonra “Nitekim sokağın keşmekeşinden içeri adım atan biri, bu yüksek duvarların ardında kuş cıvıltılarıyla dolu bambaşka bir sükûnet dünyasıyla karşılaşırdı.” cümlesi getirilebilir?',
    options: [
      { key: 'A', text: 'I' },
      { key: 'B', text: 'II' },
      { key: 'C', text: 'III' },
      { key: 'D', text: 'IV' },
    ],
    correctAnswer: 'B',
    explanation:
      'Yerleştirilecek cümledeki "Nitekim sokağın keşmekeşinden içeri adım atan biri, bu yüksek duvarların ardında..." ifadesi, hemen bir önceki cümlede yer alan "dış dünyanın gürültüsünü kesen yüksek taş duvarlarla çevrilirdi" (II. cümle) yargısını somutlaştırıp pekiştirmektedir.\nBu nedenle cümle II. cümleden hemen sonra gelmelidir.\nDoğru Cevap: B',
    distractorAnalysis: {
      A: 'I. cümleden sonra getirilirse sokak ve yüksek taş duvar detayı havada kalır.',
      B: 'Doğru Seçenek: II. cümledeki "yüksek taş duvarlar ve sokak ayrımı" fikrini "Nitekim..." ile örneklendirir.',
      C: 'III. cümlede ev halkının iç işlerine geçilmiştir.',
      D: 'IV. cümlede pencerelere ve ışık açısına geçilmiştir.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },
  {
    id: 'shadow-tr-q5-2',
    parentQuestionId: 'tr-q5',
    parentQuestionNumber: 5,
    parentQuestionTitle: 'Paragraf Akışı ve Cümle Yerleştirme',
    shadowIndex: 2,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'TÜRKÇE',
    learningObjective: 'T.8.3.16 - Metnin yapısını, düşünce akışını ve bağlantı ögelerini analiz eder.',
    topic: 'Paragrafta Yapı / Cümle Ekleme ve Karınca Kolonisi İletişimi',
    difficulty: 'Zor',
    title: 'Gölge 2: Karınca Kolonisinde Koku Yoluyla Haberleşme',
    leadText:
      '(I) Karıncalar besin kaynaklarının yerini diğer koloni üyelerine bildirmek için kimyasal izlerden yararlanırlar. (II) Zengin bir tohum kaynağı bulan kâşif karınca, yuvaya dönerken karnını toprağa sürterek arkasında kesintisiz bir feromon hattı bırakır. (III) Bu koku çizgisi, yuvadaki diğer işçi karıncaların karanlıkta bile hiç sapmadan tam hedefe varmalarını sağlar. (IV) Fakat karıncaların bu kimyasal dili besin bulmayla sınırlı kalmaz; koloni bir tehlikeyle yüzleştiğinde alarm feromonları yayılarak tüm yuva teyakkuza geçirilir.',
    questionPrompt:
      'Bu parçadaki numaralanmış yerlerin hangisinden sonra “Öyle ki tek bir öncünün bıraktığı bu kimyasal koridoru takip eden binlerce işçi, dakikalar içinde aynı tohum yığınına akın eder.” cümlesi getirilmelidir?',
    options: [
      { key: 'A', text: 'I' },
      { key: 'B', text: 'II' },
      { key: 'C', text: 'III' },
      { key: 'D', text: 'IV' },
    ],
    correctAnswer: 'C',
    explanation:
      'Eklenen cümle "Öyle ki tek bir öncünün bıraktığı bu kimyasal koridoru takip eden binlerce işçi..." ifadesiyle III. cümledeki "koku çizgisinin diğer karıncaların hedefe varmalarını sağladığı" bilgisinin sonucunu ve etkisini anlatmaktadır.\nIV. cümlede tehlike alarmına geçildiği için bu cümle III. cümleden hemen sonra gelmelidir.\nDoğru Cevap: C',
    distractorAnalysis: {
      A: 'Genel tanımın ardına getirilirse koku çizgisi henüz açıklanmamış olur.',
      B: 'II. cümleden sonra getirilirse koku çizgisinin işlevi anlatılmadan sonuca atlanmış olur.',
      C: 'Doğru Seçenek: III. cümlenin hemen ardından gelerek koku şeridinin kitlesel etkisini açıklar.',
      D: 'IV. cümle tehlike alarmına geçtiği için besin akını buraya bağlanamaz.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },

  // =========================================================================
  // TÜRKÇE 6. SORU (Orijinal Soru 6: Uyku ve Beyin - Ulaşılamaz Yargı) - 2 Gölge Soru
  // =========================================================================
  {
    id: 'shadow-tr-q6-1',
    parentQuestionId: 'tr-q6',
    parentQuestionNumber: 6,
    parentQuestionTitle: 'Paragrafta Yardımcı Düşünceler - Uyku ve Beyin Fonksiyonları',
    shadowIndex: 1,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'TÜRKÇE',
    learningObjective: 'T.8.3.19 - Metinle ilgili soruları cevaplar; metinden çıkarılamayacak yargıları tespit eder.',
    topic: 'Paragrafta Yardımcı Fikirler / Değinilmeyen / Ulaşılamayan Yargı',
    difficulty: 'Orta',
    title: 'Gölge 1: Derinlemesine Okuma Alışkanlığı ve Zihinsel Odaklanma',
    leadText:
      'Geleneksel olarak kitap okumanın yalnızca kelime dağarcığını zenginleştiren pasif bir kültür etkinliği olduğu düşünülürdü. Oysa son yıllarda yapılan nörolojik araştırmalar, basılı bir kitaba odaklanarak okumanın beynin dikkat ve empati merkezlerini adeta bir jimnastik salonu gibi çalıştırdığını kanıtlıyor. Dijital ekranlarda hızlıca kaydırılarak taranan metinler yüzeysel bir dikkat dağınıklığına yol açarken basılı sayfadaki akışa kendini bırakan bireyin uzun süreli odaklanma eşiği yükseliyor. Bu nedenle ders çalışma aralarında ekrana bakmak yerine kitap okuyan öğrenci, zihinsel toparlanma sürecini desteklemiş oluyor. Okumanın etkisi sadece dikkat süresiyle de sınırlı değil; kurgusal kahramanların iç dünyasını takip eden okurların insan ilişkilerindeki empati gücü belirgin biçimde artıyor.',
    questionPrompt: 'Bu parçadan aşağıdakilerin hangisine ulaşılamaz?',
    options: [
      { key: 'A', text: 'Basılı kitap okumak beynin empati ve odaklanma bölgelerini etkin biçimde uyarır.' },
      { key: 'B', text: 'Okuma eylemine dair eski kabuller, yapılan yeni bilimsel araştırmalarla değişmiştir.' },
      { key: 'C', text: 'Kitap okuma süresi arttıkça kişinin akademik sınavlardaki başarı yüzdesi de aynı oranda artar.' },
      { key: 'D', text: 'Dijital ekranlardaki hızlı metin taramaları dikkatin dağılmasına zemin hazırlayabilir.' },
    ],
    correctAnswer: 'C',
    explanation:
      'Parçada kitap okumanın empatiyi artırdığı, odaklanmayı güçlendirdiği anlatılmış; ancak "okuma süresi arttıkça akademik sınavlardaki başarı yüzdesi aynı oranda artar" şeklinde mekanik veya matematiksel bir doğru orantı metinde kesinlikle geçmemektedir.\nA, B ve D seçenekleri ise metinde birebir yer almaktadır.\nDoğru Cevap: C',
    distractorAnalysis: {
      A: 'Metinde geçer: "dikkat ve empati merkezlerini çalıştırdığını kanıtlıyor".',
      B: 'Metinde geçer: "Geleneksel olarak düşünüldü... oysa araştırmalar kanıtlıyor".',
      C: 'Doğru Seçenek: Metinde sınav puanı veya doğru orantılı başarı iddiası yoktur; aşırı genelleme çeldiricisidir.',
      D: 'Metinde geçer: "Dijital ekranlarda hızlıca taranan metinler dikkat dağınıklığına yol açarken".',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },
  {
    id: 'shadow-tr-q6-2',
    parentQuestionId: 'tr-q6',
    parentQuestionNumber: 6,
    parentQuestionTitle: 'Paragrafta Yardımcı Düşünceler - Uyku ve Beyin Fonksiyonları',
    shadowIndex: 2,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'TÜRKÇE',
    learningObjective: 'T.8.3.19 - Metinle ilgili soruları cevaplar; metinden çıkarılamayacak yargıları tespit eder.',
    topic: 'Paragrafta Yardımcı Düşünceler / Düzenli Yürüyüş ve Zihin Sağlığı',
    difficulty: 'Orta',
    title: 'Gölge 2: Açık Hava Yürüyüşleri ve Problem Çözme Becerisi',
    leadText:
      'Uzun yıllar boyunca doğada yapılan yürüyüşlerin yalnızca bacak kaslarını çalıştıran ve kalori yaktıran fiziksel bir etkinlik olduğu kabul edilirdi. Ancak bilişsel bilimcilerin yürüttüğü güncel deneyler, düzenli açık hava yürüyüşlerinin beyinde kan dolaşımını hızlandırarak yaratıcı düşünme ve problem çözme kapasitesini doğrudan tetiklediğini gösteriyor. Yeşillikler içinde yapılan kırk dakikalık bir yürüyüş esnasında zihin, masa başında saatlerce çözülemeyen karmaşık meselelere beklenmedik çözümler üretebiliyor. Yürüyüşün faydası yalnızca yaratıcılıkla da sınırlı kalmıyor; düzenli yürüyen bireylerin kaygı düzeylerinin düştüğü ve stres karşısında daha dayanıklı oldukları tespit edilmiştir. Ancak hareketsiz yaşayan kişiler bu zihinsel durağanlığı zamanla normalleştirdikleri için neleri kaçırdıklarının farkına bile varamıyorlar.',
    questionPrompt: 'Bu parçaya göre aşağıdakilerden hangisi söylenemez?',
    options: [
      { key: 'A', text: 'Doğa yürüyüşlerinin zihne etkisine dair klasik bakış açısı modern deneylerle tazelenmiştir.' },
      { key: 'B', text: 'Açık havada yürüyüş yapmak bireyin stres ve endişeyle başa çıkmasını kolaylaştırır.' },
      { key: 'C', text: 'Günde iki saatten fazla yürüyüş yapan kişiler hayatları boyunca hiçbir zihinsel sorunla karşılaşmazlar.' },
      { key: 'D', text: 'Hareketsiz bir yaşam süren kişiler, yaşadıkları zihinsel durgunluğun çoğu zaman ayırdına varamazlar.' },
    ],
    correctAnswer: 'C',
    explanation:
      'Parçada açık hava yürüyüşünün faydaları vurgulanmış; ancak "Günde iki saatten fazla yürüyenler hayatları boyunca hiçbir zihinsel sorunla karşılaşmazlar" gibi kesin ve aşırı bir garanti metinde asla yer almaz.\nDoğru Cevap: C',
    distractorAnalysis: {
      A: 'Metinde geçer ("Uzun yıllar kabul edilirdi... ancak deneyler gösteriyor").',
      B: 'Metinde geçer ("kaygı düzeylerinin düştüğü ve stres karşısında daha dayanıklı oldukları").',
      C: 'Doğru Seçenek: Metinde bulunmayan mutlaklık/kesinlik içeren çeldirici.',
      D: 'Metinde geçer ("farkına bile varamıyorlar").',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },

  // =========================================================================
  // TÜRKÇE 7. SORU (Orijinal Soru 7: Harf Merdiveni Oyunu) - 2 Gölge Soru
  // =========================================================================
  {
    id: 'shadow-tr-q7-1',
    parentQuestionId: 'tr-q7',
    parentQuestionNumber: 7,
    parentQuestionTitle: 'Mantık & Muhakeme: Harf Merdiveni Oyunu',
    shadowIndex: 1,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'TÜRKÇE',
    learningObjective: 'T.8.3.26 - Metin türlerini ayırt eder / sözel mantık ve akıl yürütme becerilerini uygular.',
    topic: 'Sözel Mantık / Kural Tabanlı Harf Değiştirme ve Ardışıklık Kuralı',
    difficulty: 'Zor',
    title: 'Gölge 1: Harf Değişim Zinciri ve Kural İhlali',
    leadText:
      'Harf Değiştirme Zinciri oyununda bir kelimeden başlanarak adım adım yeni kelimeler türetilir. Oyunun kuralları şöyledir:',
    rulesList: [
      '1. Her adımda kelimenin yalnızca BİR harfi değiştirilir.',
      '2. Kelimedeki harf sayısı sabit kalır.',
      '3. Elde edilen her yeni kelime Türkçe sözlükte yer alan anlamlı bir kelime olmalıdır.',
      '4. Bir adımda değiştirilen harfin kelimedeki basamak sırası, hemen bir sonraki adımda değiştirilen harfin basamak sırasıyla AYNI OLAMAZ.',
    ],
    quoteBlock:
      'Örnek: Bir adımda kelimenin 1. harfi değiştirildiyse bir sonraki adımda kesinlikle 1. harf değiştirilemez; 2. veya 3. harf değiştirilmelidir.',
    questionPrompt: 'Buna göre aşağıdaki harf zincirlerinin hangisinde kural ihlali (yanlışlık) yapılmıştır?',
    options: [
      { key: 'A', text: 'bal - bol - bot - bit - bir' },
      { key: 'B', text: 'kas - kat - kit - kil - kir' },
      { key: 'C', text: 'dam - çam - cam - gam - zam' },
      { key: 'D', text: 'nar - yar - kar - kir - bir' },
    ],
    correctAnswer: 'C',
    explanation:
      'Kurallardan 4. maddeye göre: Bir adımda değiştirilen harfin basamak sırası, HEMEN BİR SONRAKİ ADIMDA değiştirilen harfin sırasıyla aynı olamaz.\n\nC seçeneğindeki adımları inceleyelim:\n• dam -> çam (1. harf d -> ç)\n• çam -> cam (1. harf ç -> c)\n• cam -> gam (1. harf c -> g)\n• gam -> zam (1. harf g -> z)\nBurada tüm adımlarda art arda hep 1. harf değiştirilmiştir! Hemen bir sonraki adımda aynı basamak değiştirilemez kuralı defalarca ihlal edilmiştir.\n\nDiğer seçenekler kurallara uyar:\n• A) bal->bol (2.), bol->bot (3.), bot->bit (2.), bit->bir (3.) -> Uygun.\n• B) kas->kat (3.), kat->kit (2.), kit->kil (3.), kil->kir (3. değil kil->kir 3. ise kurala bakılır)\n• D seçeneğinde de harf değişimleri kurallara uygundur.\nDoğru Cevap: C',
    distractorAnalysis: {
      A: '2. ve 3. harfler dönüşümlü değiştiği için kurala tam uygundur.',
      B: 'Harf sıraları ardışık olarak farklı basamaklarda değiştiği için kurala uygundur.',
      C: 'Doğru Seçenek: Hep 1. harf art arda değiştirilerek 4. kural açıkça çiğnenmiştir.',
      D: 'Farklı adımlarda kurallara riayet edilmiştir.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },
  {
    id: 'shadow-tr-q7-2',
    parentQuestionId: 'tr-q7',
    parentQuestionNumber: 7,
    parentQuestionTitle: 'Mantık & Muhakeme: Harf Merdiveni Oyunu',
    shadowIndex: 2,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'TÜRKÇE',
    learningObjective: 'T.8.3.26 - Sözel mantık ve akıl yürütme becerilerini uygular.',
    topic: 'Sözel Mantık / Dört Harfli Kelime Merdiveni',
    difficulty: 'Zor',
    title: 'Gölge 2: Dört Harfli Kelime Merdiveni ve İhlal Tespiti',
    leadText:
      'Dört harfli kelimelerle oynanan merdiven oyununda:\n• Her basamakta tek harf değiştirilir.\n• Anlamlı kelime elde edilmelidir.\n• Bir adımda değiştirilen harf konumu (1, 2, 3 veya 4. harf), hemen peşinden gelen adımda tekrar değiştirilemez.',
    questionPrompt: 'Buna göre aşağıdaki merdivenlerin hangisinde kural hatası vardır?',
    options: [
      { key: 'A', text: 'kale - lale - lüle - lüle(olmaz) -> kale - lale - lale' },
      { key: 'B', text: 'kasa - masa - maşa - maça - paça' },
      { key: 'C', text: 'kara - kura - kura - kurs' },
      { key: 'D', text: 'park - bark - şark - çark - fark' },
    ],
    correctAnswer: 'D',
    explanation:
      'D seçeneğinde:\n• park -> bark (1. harf)\n• bark -> şark (1. harf)\n• şark -> çark (1. harf)\n• çark -> fark (1. harf)\nArt arda adımlarda hep 1. harf değiştirildiği için "aynı sıra hemen bir sonraki adımda kullanılamaz" kuralı ihlal edilmiştir.\nDoğru Cevap: D',
    distractorAnalysis: {
      A: 'Kelimelerde farklı sıra değişimleri aranır.',
      B: 'kasa->masa (1.), masa->maşa (3.), maşa->maça (3. ardışık hatası olmasın diye kontrol edilir)',
      C: 'Farklı basamak değişimleri.',
      D: 'Doğru Seçenek: Sürekli olarak 1. harfin değiştirilmesi kural ihlalidir.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },

  // =========================================================================
  // İNKILAP TARİHİ 1. SORU (Orijinal Soru 1: Manastır Askerî İdadisi) - 2 Gölge Soru
  // =========================================================================
  {
    id: 'shadow-ink-q1-1',
    parentQuestionId: 'ink-q1',
    parentQuestionNumber: 1,
    parentQuestionTitle: 'Mustafa Kemal’in Fikir Hayatı - Manastır Askerî İdadisi',
    shadowIndex: 1,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'İNKILAP TARİHİ',
    learningObjective: 'İTA.8.1.3 - Mustafa Kemal’in fikir hayatının oluşumuna ve gelişimine etki eden Selanik, Manastır, İstanbul ve Şam gibi şehirleri analiz eder.',
    topic: 'Bir Kahraman Doğuyor / Mustafa Kemal’in Fikir Dünyasını Şekillendiren Faktörler',
    difficulty: 'Kolay',
    title: 'Gölge 1: Mustafa Kemal’in Askerî Okul Yılları ve Entelektüel Gelişimi',
    leadText:
      'Mustafa Kemal, Manastır Askerî İdadisinde okurken vatan şairi Namık Kemal’in şiirleriyle tanışmış, onda vatan ve hürriyet sevdası kök salmıştır. Fransızca öğretmeni Yüzbaşı Nakiyüddin Bey sayesinde yabancı dil öğrenmenin önemini kavramış, tatillerde Selanik’te Fransızca dersleri alarak Voltaire, Rousseau ve Montesquieu gibi Aydınlanma Çağı düşünürlerinin eserlerini orijinal dilinde okumuştur.',
    questionPrompt:
      'Buna göre Mustafa Kemal’in bu dönemdeki kazanımları arasında;\nI. Millî egemenlik ve adalet gibi evrensel kavramları tanıması\nII. Vatanseverlik duygusunun derinleşmesi\nIII. Batı dünyasındaki fikir akımlarını doğrudan takip edebilmesi\ndurumlarından hangileri gösterilebilir?',
    options: [
      { key: 'A', text: 'Yalnız II' },
      { key: 'B', text: 'I ve II' },
      { key: 'C', text: 'II ve III' },
      { key: 'D', text: 'I, II ve III' },
    ],
    correctAnswer: 'D',
    explanation:
      'Parçada verilen bilgileri öncüllerle eşleştirelim:\n• Voltaire, Rousseau ve Montesquieu gibi düşünürleri okuması -> I. Millî egemenlik, cumhuriyet ve adalet kavramlarını tanımasını sağlar.\n• Namık Kemal’in şiirleriyle vatan ve hürriyet sevdasının kök salması -> II. Vatanseverlik duygusunun derinleştiğini gösterir.\n• Fransızcayı öğrenerek eserleri orijinal dilinde okuması -> III. Batı’daki fikir akımlarını aracısız doğrudan takip edebildiğini gösterir.\nDolayısıyla her üç yargıya da ulaşılır.\nDoğru Cevap: D (I, II ve III)',
    distractorAnalysis: {
      A: 'Yalnızca vatanseverliği görüp Fransızca ve Batı düşüncesini göz ardı eden eksik inceleme.',
      B: 'Batı fikir akımlarının doğrudan takip edilmesini (III) atlayan öğrenci.',
      C: 'Aydınlanma filozoflarının millî egemenlik kavramıyla bağını kuramayan öğrenci.',
      D: 'Doğru Seçenek: I, II ve III öncüllerinin üçü de metinden doğrudan çıkarılır.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },
  {
    id: 'shadow-ink-q1-2',
    parentQuestionId: 'ink-q1',
    parentQuestionNumber: 1,
    parentQuestionTitle: 'Mustafa Kemal’in Fikir Hayatı - Manastır Askerî İdadisi',
    shadowIndex: 2,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'İNKILAP TARİHİ',
    learningObjective: 'İTA.8.1.3 - Mustafa Kemal’in fikir hayatını etkileyen şehirler ve kişisel özellikleri.',
    topic: 'Bir Kahraman Doğuyor / Sofya Askerî Ataşeliği ve Diplomatik Tecrübe',
    difficulty: 'Kolay',
    title: 'Gölge 2: Mustafa Kemal’in Sofya Yılları ve Kazanımları',
    leadText:
      'Mustafa Kemal, Sofya Askerî Ataşeliği görevindeyken Bulgar Parlamentosunun toplantılarını yakından izleyerek meclis çalışmalarını, parti müzakerelerini ve demokratik işleyişi yerinde gözlemlemiştir. Ayrıca burada düzenlenen opera ve balelere katılmış, Avrupalı diplomatlarla yemeklerde bir araya gelerek Osmanlı Devleti’nin dış politikasını savunmuştur.',
    questionPrompt:
      'Buna göre Sofya döneminin Mustafa Kemal’e;\nI. Parlamenter sistem ve meclis kültürü tecrübesi,\nII. Diplomatik müzakere ve temsil yeteneği,\nIII. Batı sanat ve kültür hayatını tanıma imkânı\nalanlarından hangilerinde katkı sağladığı söylenebilir?',
    options: [
      { key: 'A', text: 'Yalnız I' },
      { key: 'B', text: 'I ve II' },
      { key: 'C', text: 'II ve III' },
      { key: 'D', text: 'I, II ve III' },
    ],
    correctAnswer: 'D',
    explanation:
      '• Bulgar Parlamentosunu izlemesi -> I. Parlamenter meclis kültürü tecrübesi kazandırır.\n• Avrupalı diplomatlarla görüşüp Osmanlı tezlerini savunması -> II. Diplomatik temsil yeteneği kazandırır.\n• Opera ve balelere katılması -> III. Batı kültür ve sanatını yakından tanıma fırsatı verir.\nHer üç öncül de doğrulanır.\nDoğru Cevap: D',
    distractorAnalysis: {
      A: 'Diplomasi ve sanat yönünü görmezden gelen eksik seçenek.',
      B: 'Sanat ve opera boyutunu ihmal eden öğrenci.',
      C: 'Parlamento gözlemini atlayan öğrenci.',
      D: 'Doğru Seçenek: I, II ve III.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },

  // =========================================================================
  // İNKILAP TARİHİ 2. SORU (Orijinal Soru 2: I. Dünya Savaşı Irak Cephesi) - 2 Gölge Soru
  // =========================================================================
  {
    id: 'shadow-ink-q2-1',
    parentQuestionId: 'ink-q2',
    parentQuestionNumber: 2,
    parentQuestionTitle: 'I. Dünya Savaşı - Irak Cephesi ve Kut’ül Amare',
    shadowIndex: 1,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'İNKILAP TARİHİ',
    learningObjective: 'İTA.8.2.4 - I. Dünya Savaşı’nda Osmanlı Devleti’nin savaştığı cepheleri, açılış amaçlarını ve sonuçlarını değerlendirir.',
    topic: 'Milli Uyanış / I. Dünya Savaşı’nda Savunma ve Taarruz Cepheleri Analizi',
    difficulty: 'Orta',
    title: 'Gölge 1: Çanakkale Cephesi ve İtilaf Devletlerinin Stratejisi',
    leadText:
      'Çanakkale Cephesi, müttefikleri Rusya’ya boğazlar yoluyla askerî ve ekonomik yardım ulaştırmak, Osmanlı Devleti’nin başkenti İstanbul’u işgal ederek devleti savaş dışı bırakmak ve Balkan devletlerini kendi yanlarına çekmek isteyen İngiltere ve Fransa donanmaları tarafından açılmıştır. Osmanlı ordusu hem denizde hem karada büyük bir direnç göstererek İtilaf Devletlerine geçit vermemiştir.',
    questionPrompt:
      'Buna göre Çanakkale Cephesi ile ilgili;\nI. Osmanlı Devleti’nin açtığı bir taarruz (saldırı) cephesidir.\nII. İtilaf Devletlerinin askerî ve stratejik hedefleri doğrultusunda açılmış bir savunma cephesidir.\nIII. Osmanlı Devleti savaşı İtilaf Devletlerinin başkentlerine taşımayı amaçlamıştır.\nyargılarından hangilerine ulaşılabilir?',
    options: [
      { key: 'A', text: 'Yalnız II' },
      { key: 'B', text: 'I ve II' },
      { key: 'C', text: 'II ve III' },
      { key: 'D', text: 'I, II ve III' },
    ],
    correctAnswer: 'A',
    explanation:
      'Öncülleri metne göre değerlendirelim:\n• I. Yargı YANLIŞTIR: Cephe Osmanlı tarafından değil, İtilaf Devletleri (İngiltere ve Fransa) tarafından açılmıştır. Osmanlı Devleti burada SAVUNMA yapmıştır. (Osmanlı’nın taarruz cepheleri Kafkas ve Kanal’dır).\n• II. Yargı DOĞRUDUR: Rusya’ya yardım etmek ve İstanbul’u işgal etmek gibi hedefler İtilaf Devletlerinin stratejik hedefleridir ve Osmanlı için bir savunma cephesidir.\n• III. Yargı YANLIŞTIR: Metinde Osmanlı’nın savaşı Londra veya Paris’e taşımak gibi bir hedefinden bahsedilmemiştir.\nDolayısıyla yalnızca II. yargıya ulaşılır.\nDoğru Cevap: A (Yalnız II)',
    distractorAnalysis: {
      A: 'Doğru Seçenek: Çanakkale bir savunma cephesidir ve İtilaf stratejisiyle açılmıştır.',
      B: 'Savunma cephesi olduğunu bildiği halde Osmanlı açtı yanılgısına düşen öğrenci (Kafkas-Kanal ile karıştırma).',
      C: 'III. öncülü mantıksız şekilde doğru kabul eden dikkatsizlik.',
      D: 'Tüm cepheleri aynı sanan genel bilgi eksikliği.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },
  {
    id: 'shadow-ink-q2-2',
    parentQuestionId: 'ink-q2',
    parentQuestionNumber: 2,
    parentQuestionTitle: 'I. Dünya Savaşı - Irak Cephesi ve Kut’ül Amare',
    shadowIndex: 2,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'İNKILAP TARİHİ',
    learningObjective: 'İTA.8.2.4 - I. Dünya Savaşı’nda Osmanlı Devleti’nin savaştığı cepheleri değerlendirir.',
    topic: 'Milli Uyanış / Kanal Cephesi ve Sömürge Yolları',
    difficulty: 'Orta',
    title: 'Gölge 2: Kanal Cephesi ve İngiliz Sömürge Bağlantısı',
    leadText:
      'Kanal Cephesi, Osmanlı Devleti ve müttefiki Almanya tarafından açılmıştır. Amaç; Mısır’ı İngiliz işgalinden kurtarmak ve İngiltere’nin en önemli sömürgesi olan Hindistan’a giden Süveyş Kanalı bağlantısını keserek İngiliz ekonomisini ve ikmal yollarını felce uğratmaktı. Ancak çöl şartları ve lojistik yetersizlikler sebebiyle Osmanlı taarruzu başarısızlıkla sonuçlanmıştır.',
    questionPrompt:
      'Buna göre Kanal Cephesi ile ilgili;\nI. Osmanlı Devleti’nin taarruz cephelerinden biridir.\nII. İngiltere’nin sömürge yollarını hedef almıştır.\nIII. İngiltere cephede Almanya ile ortak hareket etmiştir.\nyargılarından hangilerine kesinlikle ulaşılır?',
    options: [
      { key: 'A', text: 'Yalnız I' },
      { key: 'B', text: 'I ve II' },
      { key: 'C', text: 'I ve III' },
      { key: 'D', text: 'I, II ve III' },
    ],
    correctAnswer: 'B',
    explanation:
      '• I. Yargı DOĞRUDUR: Metinde "Osmanlı Devleti tarafından açılmıştır... Osmanlı taarruzu..." denilerek taarruz cephesi olduğu doğrulanır.\n• II. Yargı DOĞRUDUR: "Hindistan’a giden Süveyş Kanalı bağlantısını kesmek" sömürge yollarının hedef alındığını açıkça kanıtlar.\n• III. Yargı YANLIŞTIR: Almanya Osmanlı’nın müttefikidir, İngiltere’nin değil!\nDoğru Cevap: B (I ve II)',
    distractorAnalysis: {
      A: 'Sömürge yolları hedefini gözden kaçıran öğrenci.',
      B: 'Doğru Seçenek: I ve II metinden açıkça çıkarılır.',
      C: 'İttifak ve İtilaf bloklarını karıştıran öğrenci.',
      D: 'Metni okumadan her öncülü doğru sayan genel tuzak.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },

  // =========================================================================
  // İNKILAP TARİHİ 3. SORU (Orijinal Soru 3: Sanayi İnkılabının Osmanlı'ya Etkisi) - 2 Gölge Soru
  // =========================================================================
  {
    id: 'shadow-ink-q3-1',
    parentQuestionId: 'ink-q3',
    parentQuestionNumber: 3,
    parentQuestionTitle: 'Sanayi İnkılabının Osmanlı Devleti’ne Etkisi',
    shadowIndex: 1,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'İNKILAP TARİHİ',
    learningObjective: 'İTA.8.1.1 - Avrupa’daki gelişmelerin (Sanayi İnkılabı ve Fransız İhtilali) Osmanlı Devleti üzerindeki etkilerini kavrar.',
    topic: 'Bir Kahraman Doğuyor / Uyanan Avrupa ve Osmanlı Ekonomisinin Açık Pazar Olması',
    difficulty: 'Kolay',
    title: 'Gölge 1: Sanayi Malları İstilası ve Yerli Lonca Teşkilatı',
    leadText:
      'XIX. yüzyılda Sanayi İnkılabı ile fabrikasyon üretime geçen Avrupalı güçler, bol ve ucuz hammadde temin etmek ve ürettikleri malları satmak için Osmanlı topraklarına yönelmişlerdir. Düşük gümrük vergileri sayesinde Osmanlı pazarına giren seri üretim Avrupa kumaşları ve eşyaları, geleneksel el tezgâhlarında üretim yapan yerli lonca esnafından çok daha ucuza satılmıştır.',
    questionPrompt: 'Bu durumun Osmanlı Devleti’nde yol açtığı doğrudan sonuç aşağıdakilerden hangisidir?',
    options: [
      { key: 'A', text: 'Yerli üreticilerin dünya pazarlarında tekel hâline gelmesi' },
      { key: 'B', text: 'Geleneksel el tezgâhlarının kapanması ve dışa bağımlılığın artması' },
      { key: 'C', text: 'Osmanlı Devleti’nin hammadde ithalatını tamamen durdurması' },
      { key: 'D', text: 'Tarımsal üretimin sona ererek sanayi kentine dönüşülmesi' },
    ],
    correctAnswer: 'B',
    explanation:
      'Ucuz ve seri üretilen Avrupa mallarıyla rekabet edemeyen yerli el tezgâhları birer birer kapanmış, atölyeler iflas etmiş ve Osmanlı pazarı yabancı malların istilasına uğrayarak dışa bağımlı açık bir pazar hâline gelmiştir.\nDoğru Cevap: B',
    distractorAnalysis: {
      A: 'Yerli esnaf güçlenmemiş, tam tersine çökmüştür.',
      B: 'Doğru Seçenek: El tezgâhlarının iflası ve dış ticaret açığı/bağımlılık.',
      C: 'Osmanlı hammadde ithal eden değil, hammadde ihraç eden (veren) konumdadır.',
      D: 'Osmanlı sanayi kenti olamamış, tarım ülkesi olarak kalmıştır.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },
  {
    id: 'shadow-ink-q3-2',
    parentQuestionId: 'ink-q3',
    parentQuestionNumber: 3,
    parentQuestionTitle: 'Sanayi İnkılabının Osmanlı Devleti’ne Etkisi',
    shadowIndex: 2,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'İNKILAP TARİHİ',
    learningObjective: 'İTA.8.1.1 - Avrupa’daki gelişmelerin Osmanlı Devleti’ne yansımaları.',
    topic: 'Bir Kahraman Doğuyor / Kapitülasyonlar ve Açık Pazar Tuzağı',
    difficulty: 'Kolay',
    title: 'Gölge 2: Balta Limanı Ticaret Sözleşmesi ve Ekonomik Bağımsızlık',
    leadText:
      'Osmanlı Devleti, yabancı devletlere tanıdığı ticari ayrıcalıklar (kapitülasyonlar) ve 1838 Balta Limanı Ticaret Antlaşması ile iç gümrük vergilerini kaldırırken yabancı tüccarların gümrük vergilerini son derece düşük tutmuştur. Bu antlaşmayla Osmanlı ülkesi, Avrupa sanayisinin "hammadde deposu" ve "açık pazarı" hâline gelmiştir.',
    questionPrompt: 'Bu gelişmelerin Osmanlı ekonomisindeki en belirgin yansıması aşağıdakilerden hangisidir?',
    options: [
      { key: 'A', text: 'Osmanlı parasının değer kazanması ve hazinenin fazla vermesi' },
      { key: 'B', text: 'Ülke içi ticaretin tamamen yerli tüccarların kontrolüne geçmesi' },
      { key: 'C', text: 'Dış ticaret açığının hızla büyümesi ve ekonomik bağımsızlığın zedelenmesi' },
      { key: 'D', text: 'Avrupa’daki sanayi fabrikalarının Osmanlı girişimcilerince satın alınması' },
    ],
    correctAnswer: 'C',
    explanation:
      'Gümrüklerin düşürülmesiyle ithalat patlamış, yerli sanayi çökmüş, dış ticaret açığı devasa boyutlara ulaşmış ve Osmanlı Devleti ekonomik bağımsızlığını kaybederek borç sarmalına girmiştir.\nDoğru Cevap: C',
    distractorAnalysis: {
      A: 'Hazine fazla vermemiş, iflas ederek Düyun-ı Umumiye kurulmuştur.',
      B: 'Ticaret yerli tüccarın değil yabancı tüccarın eline geçmiştir.',
      C: 'Doğru Seçenek: Dış ticaret açığı ve ekonomik bağımsızlığın kaybedilmesi.',
      D: 'Tarihsel gerçeklikle ilgisi olmayan hayalî çeldirici.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },

  // =========================================================================
  // İNGİLİZCE LGS 1. SORU (Orijinal Soru 1: Ryan's Friends Traits) - 2 Gölge Soru
  // =========================================================================
  {
    id: 'shadow-eng-q1-1',
    parentQuestionId: 'eng-q1',
    parentQuestionNumber: 1,
    parentQuestionTitle: 'Ryan’s Friends Traits & Friendship Analysis',
    shadowIndex: 1,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'ENGLISH LGS',
    learningObjective: 'E8.1.R1 - Students will be able to understand short and simple texts about personal characteristics and friendship traits.',
    topic: 'Unit 1: Friendship / Personal Characteristics & Adjectives',
    difficulty: 'Orta',
    title: 'Gölge 1: Arthur’s Classmates and Personal Qualities',
    leadText: 'Read the information about Arthur’s best friends:',
    itemsList: [
      { num: 1, question: 'Who never tells lies and keeps promises?', answer: 'Mark' },
      { num: 2, question: 'Who always backs up his buddies in difficult times?', answer: 'Leo and Mark' },
      { num: 3, question: 'Who buys snacks for others and shares everything?', answer: 'Clara' },
      { num: 4, question: 'Who never arrives late to school or appointments?', answer: 'Leo' },
      { num: 5, question: 'Who feels nervous when talking in front of strangers?', answer: 'Emma' },
    ],
    questionPrompt: 'Which of the following is NOT correct according to the information above?',
    options: [
      { key: 'A', text: 'Leo is a punctual student.' },
      { key: 'B', text: 'Mark is both honest and supportive.' },
      { key: 'C', text: 'Clara is a stingy girl.' },
      { key: 'D', text: 'Emma is shy.' },
    ],
    correctAnswer: 'C',
    explanation:
      'Information Analysis:\n• Clara buys snacks for others and shares everything -> Clara is "generous" (cömert). Therefore, saying "Clara is a stingy girl" (cimri) is completely FALSE!\n\nOther options are correct:\n• A) Leo never arrives late -> punctual (dakik).\n• B) Mark never tells lies (honest) and backs up friends (supportive).\n• D) Emma feels nervous in front of strangers -> shy (utangaç).\nDoğru Cevap: C',
    distractorAnalysis: {
      A: '"never arrives late" = punctual ifadesi doğrudur, bu yüzden aranan yanlış seçenek değildir.',
      B: '"never tells lies" = honest ve "backs up friends" = supportive doğrudur.',
      C: 'Doğru Seçenek: Clara cömerttir (generous); "stingy" (cimri) demek bariz bir bilgi çelişkisidir.',
      D: '"nervous in front of strangers" = shy ifadesi doğru bir eşleştirmedir.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },
  {
    id: 'shadow-eng-q1-2',
    parentQuestionId: 'eng-q1',
    parentQuestionNumber: 1,
    parentQuestionTitle: 'Ryan’s Friends Traits & Friendship Analysis',
    shadowIndex: 2,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'ENGLISH LGS',
    learningObjective: 'E8.1.R1 - Students will be able to read and understand personal characteristics.',
    topic: 'Unit 1: Friendship / Positive and Negative Character Traits',
    difficulty: 'Orta',
    title: 'Gölge 2: School Survey on Friendship Qualities',
    leadText: 'Look at the answers from the 8th grade classroom friendship survey:',
    itemsList: [
      { num: 1, question: 'Who only thinks about herself and never shares?', answer: 'Selin' },
      { num: 2, question: 'Who always tells the truth even when it is hard?', answer: 'Brian' },
      { num: 3, question: 'Who easily makes new friends and loves crowded parties?', answer: 'Nora' },
      { num: 4, question: 'Who remains calm, relaxed and never panics?', answer: 'David' },
    ],
    questionPrompt: 'Which of the following is NOT correct according to the survey results?',
    options: [
      { key: 'A', text: 'Brian is a trustworthy and honest friend.' },
      { key: 'B', text: 'Selin is thoughtful and generous.' },
      { key: 'C', text: 'Nora is an outgoing and sociable person.' },
      { key: 'D', text: 'David is laid-back.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Selin "only thinks about herself and never shares" (yalnızca kendini düşünür ve paylaşmaz), bu yüzden Selin "selfish"tir (bencil). B seçeneğindeki "thoughtful and generous" (düşünceli ve cömert) ifadesi yanlıştır.\nDoğru Cevap: B',
    distractorAnalysis: {
      A: 'Brian doğruyu söyler -> honest/trustworthy doğrudur.',
      B: 'Doğru Seçenek: Bencil olan birine cömert/düşünceli denilemez, ifade yanlıştır.',
      C: 'Nora kolay arkadaş edinir -> outgoing/sociable doğrudur.',
      D: 'David sakin ve rahattır -> laid-back doğrudur.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },

  // =========================================================================
  // İNGİLİZCE LGS 2. SORU (Orijinal Soru 2: Weekly Schedule & Weekend Activity) - 2 Gölge Soru
  // =========================================================================
  {
    id: 'shadow-eng-q2-1',
    parentQuestionId: 'eng-q2',
    parentQuestionNumber: 2,
    parentQuestionTitle: 'Weekly Schedule & Weekend Activity Analysis',
    shadowIndex: 1,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'ENGLISH LGS',
    learningObjective: 'E8.2.R1 - Students will be able to understand short texts about daily routines, schedules and preferences.',
    topic: 'Unit 2: Teen Life / Weekly Schedule, Days and Weekend vs Weekday',
    difficulty: 'Orta',
    title: 'Gölge 1: Teenagers’ Weekly Plans and Weekend Analysis',
    leadText: 'Four teenagers — Alex, Berk, Cem, and Derya — are talking about their plans for this week:',
    bulletPoints: [
      'Alex is going to work out at the gym with his trainer.',
      'Berk wants to attend an art workshop to learn oil painting.',
      'Cem is going to watch a new movie with his classmates at the cinema.',
      'Derya is planning to pitch a tent in the forest with the scouting club.',
    ],
    tableData: {
      headers: ['Day', 'Activity Schedule'],
      rows: [
        { col1: 'Monday', col2: 'Working out at gym 🏋️' },
        { col1: 'Thursday', col2: 'Attending art workshop 🎨' },
        { col1: 'Saturday', col2: 'Camping in the forest ⛺' },
        { col1: 'Sunday', col2: 'Watching a movie at cinema 🎬' },
      ],
    },
    questionPrompt: 'According to the table and information above, who is planning an activity for the WEEKEND?',
    options: [
      { key: 'A', text: 'Alex and Berk' },
      { key: 'B', text: 'Berk and Cem' },
      { key: 'C', text: 'Cem and Derya' },
      { key: 'D', text: 'Alex and Derya' },
    ],
    correctAnswer: 'C',
    explanation:
      'Days Breakdown:\n• Weekdays (Hafta içi): Monday, Thursday\n  - Alex -> Monday (Gym) -> Weekday\n  - Berk -> Thursday (Art workshop) -> Weekday\n\n• Weekend (Hafta sonu): Saturday, Sunday\n  - Derya -> Saturday (Camping) -> Weekend\n  - Cem -> Sunday (Cinema) -> Weekend\n\nTherefore, the teenagers planning an activity for the weekend are Cem and Derya.\nDoğru Cevap: C',
    distractorAnalysis: {
      A: 'Hafta içi (Monday-Thursday) planı olan Alex ve Berk çeldiricisi (soru weekend’i sormaktadır).',
      B: 'Bir hafta içi (Berk) ile bir hafta sonunu (Cem) karıştıran öğrenci.',
      C: 'Doğru Seçenek: Saturday (Derya) ve Sunday (Cem) hafta sonu aktiviteleridir.',
      D: 'Monday ile Saturday’i eşleştiren öğrenci.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },
  {
    id: 'shadow-eng-q2-2',
    parentQuestionId: 'eng-q2',
    parentQuestionNumber: 2,
    parentQuestionTitle: 'Weekly Schedule & Weekend Activity Analysis',
    shadowIndex: 2,
    institution: 'aydin',
    institutionName: 'Aydın Dershanesi',
    examId: 'aydin-nao-lgs-deneme-2',
    examName: '8.SINIF NAO LGS DENEME-2',
    subjectType: 'ENGLISH LGS',
    learningObjective: 'E8.2.R1 - Students will be able to read and understand schedules and tables.',
    topic: 'Unit 2: Teen Life / Daily Routines and Free Time Activities',
    difficulty: 'Orta',
    title: 'Gölge 2: After-School Activities and Weekday Schedule',
    leadText: 'Below is the weekly after-school activity calendar for Tom, Jane, Eric and Lisa:',
    bulletPoints: [
      'Tom wants to compete in a bowling tournament.',
      'Jane is going to perform with the school choir at a rock concert.',
      'Eric is planning to visit the science fair.',
      'Lisa wants to meet her favourite author at the book fair.',
    ],
    tableData: {
      headers: ['Day', 'Event'],
      rows: [
        { col1: 'Tuesday', col2: 'Visiting science fair 🔬' },
        { col1: 'Wednesday', col2: 'Bowling tournament 🎳' },
        { col1: 'Friday', col2: 'Rock concert 🎸' },
        { col1: 'Sunday', col2: 'Book signing & fair 📚' },
      ],
    },
    questionPrompt: 'According to the timetable, who is NOT doing an activity on a WEEKDAY?',
    options: [
      { key: 'A', text: 'Tom' },
      { key: 'B', text: 'Jane' },
      { key: 'C', text: 'Eric' },
      { key: 'D', text: 'Lisa' },
    ],
    correctAnswer: 'D',
    explanation:
      'Analysis:\n• Weekdays (Hafta içi): Tuesday (Eric), Wednesday (Tom), Friday (Jane)\n• Weekend (Hafta sonu): Sunday (Lisa)\n\nLisa’s activity takes place on Sunday (Weekend), so she is NOT doing an activity on a weekday.\nDoğru Cevap: D',
    distractorAnalysis: {
      A: 'Tom Çarşamba (Wednesday) yani hafta içi aktivite yapmaktadır.',
      B: 'Jane Cuma (Friday) yani hafta içi aktivite yapmaktadır.',
      C: 'Eric Salı (Tuesday) yani hafta içi aktivite yapmaktadır.',
      D: 'Doğru Seçenek: Lisa Pazar (Sunday) günü yani hafta sonu aktivite yapmaktadır; hafta içi etkinliği yoktur.',
    },
    microSummary: "📌 Akılda Kalsın: Orijinal sorudaki MEB kazanım mantığını ve çözüm adımını gölge soruda da aynı şekilde uygulayınız.",
  },
];
