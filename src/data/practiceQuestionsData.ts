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
    description: 'Aydın Dershanesi 8. Sınıf NAO LGS Deneme-2 sınavında yanlış yapılan, boş bırakılan ve tekrar edilmesi gereken sorular.',
    date: 'Ekim 2026',
    totalQuestions: 12,
    subjectBreakdown: [
      { subjectType: 'TÜRKÇE', label: 'Türkçe', icon: '📖', count: 7, color: 'amber' },
      { subjectType: 'İNKILAP TARİHİ', label: 'İnkılap Tarihi', icon: '🏛️', count: 3, color: 'rose' },
      { subjectType: 'ENGLISH LGS', label: 'İngilizce LGS', icon: '🇬🇧', count: 2, color: 'indigo' },
    ],
  },
];

export const PRACTICE_QUESTIONS: PracticeQuestion[] = [
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
