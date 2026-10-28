export type SubjectType = 
  | 'ENGLISH LGS'
  | 'ENGLISH MAIN COURSE'
  | 'DİN KÜLTÜRÜ'
  | 'FEN BİLİMLERİ'
  | 'İNKILAP TARİHİ'
  | 'MATEMATİK'
  | 'TÜRKÇE'
  | 'DİĞER';

export type InstitutionType = 'maya' | 'aydin' | 'kisisel';

export const INSTITUTION_META: Record<InstitutionType, { name: string; shortName: string; icon: string; badgeClass: string; dotColor: string }> = {
  maya: {
    name: 'Maya Okulları',
    shortName: 'Maya Okulu',
    icon: '🏫',
    badgeClass: 'bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 border-blue-200/80 dark:border-blue-800/60',
    dotColor: 'bg-blue-500',
  },
  aydin: {
    name: 'Aydın Dershanesi',
    shortName: 'Aydın Dershane',
    icon: '🏛️',
    badgeClass: 'bg-purple-50 text-purple-700 dark:bg-purple-950/70 dark:text-purple-300 border-purple-200/80 dark:border-purple-800/60',
    dotColor: 'bg-purple-500',
  },
  kisisel: {
    name: 'Kişisel Çalışma',
    shortName: 'Kişisel',
    icon: '👤',
    badgeClass: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/60',
    dotColor: 'bg-emerald-500',
  },
};

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface HomeworkItem {
  id: string;
  topic: string; // Konu (e.g. LGS-W5, Hafta sonu ödevi)
  title: string; // Başlık
  course: string; // Ders (e.g. FEN BİLİMLERİ 8/D)
  subjectType: SubjectType;
  institution?: InstitutionType; // 'maya' | 'aydin' | 'kisisel'
  teacher: string; // Personel (e.g. HANİFE GAYE ALAY)
  description: string; // Açıklama
  startDate: string; // ISO string or readable
  dueDate: string; // ISO string
  displayDueDate: string; // e.g. "22 Ekim 2026 Perşembe, 23:00"
  booksAndPages?: string[]; // Quick tag e.g. ["Çanta Soru Bankası: 66-88"]
  subtasks: Subtask[];
  completed: boolean;
  notes?: string; // Student's personal notes on this homework
  isCustom?: boolean;
}

export interface StudentProgress {
  studentName: string;
  completedTasks: Record<string, boolean>; // homeworkId -> boolean
  completedSubtasks: Record<string, boolean>; // subtaskId -> boolean
  personalNotes: Record<string, string>; // homeworkId -> note
  lastUpdated: string;
}
