import { createClient } from '@supabase/supabase-js';
import { HomeworkItem, SubjectType } from '../types/homework';
import { INITIAL_HOMEWORK } from '../data/initialHomework';

export const SUPABASE_URL = 'https://pzwdxnokmpsgisnwgnbt.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6d2R4bm9rbXBzZ2lzbndnbmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMxMDAzODYsImV4cCI6MjEwODY3NjM4Nn0.LG17M8ljDbbIxRPyTLe0Ot1jbtPSNq-YQjhnqz5xEcQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface DbHomework {
  id: string;
  topic: string;
  title: string;
  course: string;
  subject_type: string;
  teacher: string;
  description: string;
  start_date: string;
  due_date: string;
  display_due_date: string;
  books_and_pages: string[];
  subtasks: { id: string; title: string; completed: boolean }[];
  created_at?: string;
}

function mapFromDb(db: DbHomework): HomeworkItem {
  return {
    id: db.id,
    topic: db.topic,
    title: db.title,
    course: db.course,
    subjectType: (db.subject_type || 'DİĞER') as SubjectType,
    teacher: db.teacher,
    description: db.description,
    startDate: db.start_date,
    dueDate: db.due_date,
    displayDueDate: db.display_due_date,
    booksAndPages: Array.isArray(db.books_and_pages) ? db.books_and_pages : [],
    subtasks: Array.isArray(db.subtasks) ? db.subtasks : [],
    completed: false,
  };
}

function mapToDb(item: HomeworkItem): DbHomework {
  return {
    id: item.id,
    topic: item.topic,
    title: item.title,
    course: item.course,
    subject_type: item.subjectType,
    teacher: item.teacher,
    description: item.description,
    start_date: item.startDate,
    due_date: item.dueDate,
    display_due_date: item.displayDueDate,
    books_and_pages: item.booksAndPages || [],
    subtasks: item.subtasks || [],
  };
}

/**
 * Fetch all homework from Supabase with fallback to local JSON
 */
export async function fetchHomeworkFromSupabase(): Promise<{
  items: HomeworkItem[];
  fromSupabase: boolean;
  error?: string;
}> {
  try {
    const { data, error } = await supabase
      .from('homework')
      .select('*')
      .order('due_date', { ascending: true });

    if (error) {
      console.warn('Supabase fetch error, falling back:', error.message);
      return { items: INITIAL_HOMEWORK, fromSupabase: false, error: error.message };
    }

    if (data && data.length > 0) {
      const items = (data as DbHomework[]).map(mapFromDb);
      return { items, fromSupabase: true };
    }

    return { items: INITIAL_HOMEWORK, fromSupabase: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Bilinmeyen hata';
    return { items: INITIAL_HOMEWORK, fromSupabase: false, error: msg };
  }
}

/**
 * Insert new homework into Supabase
 */
export async function addHomeworkToSupabase(item: HomeworkItem): Promise<boolean> {
  try {
    const dbItem = mapToDb(item);
    const { error } = await supabase.from('homework').insert([dbItem]);
    if (error) {
      console.error('Failed to add homework to Supabase:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error adding to Supabase:', err);
    return false;
  }
}

/**
 * Delete homework from Supabase
 */
export async function deleteHomeworkFromSupabase(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from('homework').delete().eq('id', id);
    if (error) {
      console.error('Failed to delete from Supabase:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error deleting from Supabase:', err);
    return false;
  }
}

/**
 * Real-time subscription to homework changes
 */
export function subscribeToHomeworkChanges(onChange: () => void) {
  const channel = supabase
    .channel('public:homework')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'homework' },
      () => {
        onChange();
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
