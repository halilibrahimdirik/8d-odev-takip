export type SubjectType = 
  | 'ENGLISH LGS'
  | 'ENGLISH MAIN COURSE'
  | 'DİN KÜLTÜRÜ'
  | 'FEN BİLİMLERİ'
  | 'İNKILAP TARİHİ'
  | 'MATEMATİK'
  | 'TÜRKÇE'
  | 'DİĞER';

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
