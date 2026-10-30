import { HomeworkItem, StudentProgress } from '../types/homework';
import { INITIAL_HOMEWORK } from '../data/initialHomework';

const PROGRESS_PREFIX = 'odev_takip_progress_';
const CUSTOM_HOMEWORK_KEY = 'odev_takip_custom_homework';
const ACTIVE_STUDENT_KEY = 'odev_takip_active_student';
const RECENT_STUDENTS_KEY = 'odev_takip_recent_students';
const SOUND_KEY = 'odev_takip_sound_enabled';

export function getActiveStudentName(): string {
  if (typeof window === 'undefined') return '8/D Öğrencisi';
  return localStorage.getItem(ACTIVE_STUDENT_KEY) || '8/D Öğrencisi';
}

export function setActiveStudentName(name: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACTIVE_STUDENT_KEY, name.trim());
  addRecentStudent(name.trim());
}

export function getRecentStudents(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(RECENT_STUDENTS_KEY);
    if (!raw) return ['8/D Öğrencisi'];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : ['8/D Öğrencisi'];
  } catch {
    return ['8/D Öğrencisi'];
  }
}

export function addRecentStudent(name: string): void {
  if (!name.trim()) return;
  const list = getRecentStudents().filter((n) => n.toLowerCase() !== name.toLowerCase());
  list.unshift(name.trim());
  localStorage.setItem(RECENT_STUDENTS_KEY, JSON.stringify(list.slice(0, 8)));
}

export function loadStudentProgress(studentName: string): StudentProgress {
  const defaultProgress: StudentProgress = {
    studentName,
    completedTasks: {},
    completedSubtasks: {},
    personalNotes: {},
    lastUpdated: new Date().toISOString(),
  };

  if (typeof window === 'undefined') return defaultProgress;

  try {
    const raw = localStorage.getItem(`${PROGRESS_PREFIX}${studentName}`);
    if (!raw) return defaultProgress;
    const parsed = JSON.parse(raw);
    return {
      ...defaultProgress,
      ...parsed,
      studentName,
    };
  } catch {
    return defaultProgress;
  }
}

export function saveStudentProgress(progress: StudentProgress): void {
  if (typeof window === 'undefined') return;
  try {
    const dataToSave = {
      ...progress,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(`${PROGRESS_PREFIX}${progress.studentName}`, JSON.stringify(dataToSave));
  } catch (err) {
    console.error('Failed to save student progress', err);
  }
}

export function loadCustomHomework(): HomeworkItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CUSTOM_HOMEWORK_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveCustomHomework(items: HomeworkItem[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CUSTOM_HOMEWORK_KEY, JSON.stringify(items));
}

export function getSoundPreference(): boolean {
  if (typeof window === 'undefined') return true;
  const val = localStorage.getItem(SOUND_KEY);
  return val === null ? true : val === 'true';
}

export function setSoundPreference(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SOUND_KEY, String(enabled));
}

import { MistakeItem } from '../types/homework';

const MISTAKES_PREFIX = 'odev_takip_mistakes_';

export const INITIAL_SAMPLE_MISTAKES: MistakeItem[] = [
  {
    id: 'mst-1',
    studentName: '8/D Öğrencisi',
    subjectType: 'MATEMATİK',
    examName: 'Maya Kurumsal LGS Deneme 1',
    topic: 'Üslü İfadeler - Negatif Üs ve Taban İşaretleri',
    questionNo: 'Soru 8',
    mistakeReason: 'Parantez dışındaki çift kuvvet ile parantez içindeki negatif işaret karıştırıldı (İşlem hatası).',
    recommendedStudy: 'Matematik Modül 1 sf. 22-26 Negatif Üs kuralları konu tekrarı + 15 yeni nesil soru çöz.',
    recommendedBooks: 'Startfen 5. Hafta sf. 48 & 3 Adım Test 16',
    status: 'needs_work',
    date: '2026-10-24T14:30:00.000Z',
    notes: 'Üs çift olsa bile taban parantezsizse işaret eksi kalır, dikkat et!',
  },
  {
    id: 'mst-2',
    studentName: '8/D Öğrencisi',
    subjectType: 'FEN BİLİMLERİ',
    examName: 'Aydın Dershanesi Tarama Sınavı 2',
    topic: 'Mevsimler ve İklim - Eksen Eğikliği ve Güneş Açıları',
    questionNo: 'Soru 12',
    mistakeReason: '21 Aralık tarihinde Güney Yarımküreye dik gelme durumu Kuzey Yarımküre ile karıştırıldı.',
    recommendedStudy: 'Ders İşleyiş Modülü Ünite 1 sf. 14-19 dönenceler haritasını incele ve özet çıkar.',
    recommendedBooks: '3 Adım Soru Bankası sf. 35-38 & Çanta sf. 72',
    status: 'reviewing',
    date: '2026-10-22T11:00:00.000Z',
    notes: 'Tarihler ve yarımküreleri zihin haritası olarak çiz.',
  },
  {
    id: 'mst-3',
    studentName: '8/D Öğrencisi',
    subjectType: 'TÜRKÇE',
    examName: 'Haftalık Bumerang Deneme 6',
    topic: 'Fiilimsiler - Sıfat-Fiil ve Kalıcı İsim Ayrımı',
    questionNo: 'Soru 4',
    mistakeReason: '"Dolmuş" ve "yakacak" kelimeleri kalıcı isim olmasına rağmen sıfat-fiil olarak işaretlendi.',
    recommendedStudy: 'Fiilimsiler ek tablosu (an-ası-mez-ar-dik-ecek-miş) ve kalıcı isim istisnalarını deftere yaz.',
    recommendedBooks: 'Miray Soru Bankası sf. 32-35',
    status: 'needs_work',
    date: '2026-10-21T09:15:00.000Z',
  },
  {
    id: 'mst-4',
    studentName: '8/D Öğrencisi',
    subjectType: 'İNKILAP TARİHİ',
    examName: 'Prestij Deneme Sınavı',
    topic: 'Bir Kahraman Doğuyor - Mustafa Kemal\'in Fikir Hayatını Etkileyen Şehirler',
    questionNo: 'Soru 15',
    mistakeReason: 'Manastır ve Şam görevleri kronolojik sırası unutuldu.',
    recommendedStudy: 'MEB Ders Kitabı sf. 28-34 şehirler tablosunu tekrar oku.',
    recommendedBooks: 'Hız Yayınları sf. 38',
    status: 'resolved',
    date: '2026-10-18T10:00:00.000Z',
    resolvedAt: '2026-10-25T16:00:00.000Z',
    notes: 'Kavrandı: Selanik -> Manastır -> İstanbul -> Şam.',
  },
  {
    id: 'mst-5',
    studentName: '8/D Öğrencisi',
    subjectType: 'DİN KÜLTÜRÜ',
    examName: 'Aydın Dershanesi Din Kültürü Sınavı',
    topic: 'Kader İnancı - Evrensel Yasalar (Biyolojik & Toplumsal Yasalar)',
    questionNo: 'Soru 6',
    mistakeReason: 'Adalet ve toplumsal düzen ile ilgili ayet biyolojik yasa sanıldı.',
    recommendedStudy: 'Dinlendiren Defter sf. 26-28 evrensel yasalar eşleştirme testini çöz.',
    recommendedBooks: 'Dinlendiren Defter sf. 29 & Üç Adım sf. 58',
    status: 'needs_work',
    date: '2026-10-25T13:00:00.000Z',
  },
  {
    id: 'mst-6',
    studentName: '8/D Öğrencisi',
    subjectType: 'ENGLISH LGS',
    examName: 'Team ELT Practice Test 3',
    topic: 'Unit 2: Teen Life - Expressing Preferences (prefer / would rather)',
    questionNo: 'Question 14',
    mistakeReason: '"Prefer X to Y" kalıbında "to" yerine yanlışlıkla "than" arandı.',
    recommendedStudy: 'English Ahead Test Book Unit 2 grammar notes sf. 44 tekrarı.',
    recommendedBooks: 'MLJ Pages 24-25',
    status: 'resolved',
    date: '2026-10-19T15:00:00.000Z',
    resolvedAt: '2026-10-26T17:30:00.000Z',
  },
];

export function loadStudentMistakes(studentName: string): MistakeItem[] {
  if (typeof window === 'undefined') return INITIAL_SAMPLE_MISTAKES;
  try {
    const raw = localStorage.getItem(`${MISTAKES_PREFIX}${studentName}`);
    if (!raw) {
      // First time initialization for student
      return INITIAL_SAMPLE_MISTAKES.map((item) => ({
        ...item,
        studentName,
      }));
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return INITIAL_SAMPLE_MISTAKES;
  }
}

export function saveStudentMistakes(studentName: string, items: MistakeItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${MISTAKES_PREFIX}${studentName}`, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to save student mistakes', err);
  }
}
