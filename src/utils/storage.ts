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
