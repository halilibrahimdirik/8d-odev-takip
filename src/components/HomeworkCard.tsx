import React, { useState } from 'react';
import { 
  Check, 
  Share2, 
  Trash2, 
  Edit3, 
  MessageSquare,
  BookOpen
} from 'lucide-react';
import { HomeworkItem } from '../types/homework';
import { COURSE_THEMES } from '../data/initialHomework';
import { getUrgencyInfo } from '../utils/dateUtils';

interface HomeworkCardProps {
  homework: HomeworkItem;
  onToggleComplete: (id: string) => void;
  onToggleSubtask: (homeworkId: string, subtaskId: string) => void;
  onUpdateNote: (homeworkId: string, note: string) => void;
  onDeleteCustom?: (id: string) => void;
}

export const HomeworkCard: React.FC<HomeworkCardProps> = ({
  homework,
  onToggleComplete,
  onToggleSubtask,
  onUpdateNote,
  onDeleteCustom,
}) => {
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [noteText, setNoteText] = useState(homework.notes || '');
  const [copied, setCopied] = useState(false);

  const urgency = getUrgencyInfo(homework.dueDate);
  const theme = COURSE_THEMES[homework.subjectType] || COURSE_THEMES['DİĞER'];

  const completedSubtasksCount = homework.subtasks.filter((s) => s.completed).length;
  const totalSubtasks = homework.subtasks.length;

  const handleSaveNote = () => {
    onUpdateNote(homework.id, noteText);
    setShowNoteInput(false);
  };

  const handleShareSingle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `📌 *${homework.course}*\n` +
      `📖 ${homework.title}\n` +
      `👤 Öğretmen: ${homework.teacher}\n` +
      `⏰ Son Teslim: ${homework.displayDueDate}\n` +
      (homework.booksAndPages?.length ? `📚 Kaynak: ${homework.booksAndPages.join(', ')}\n` : '') +
      `\n🔗 Ödev Takip: ${window.location.origin}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`group rounded-2xl p-4 sm:p-5 border transition-all duration-200 relative ${
        homework.completed
          ? 'bg-slate-50/70 dark:bg-slate-900/40 border-emerald-300/50 dark:border-emerald-900/30 opacity-80'
          : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs'
      }`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        
        {/* Large Tactile Checkbox Button */}
        <button
          type="button"
          onClick={() => onToggleComplete(homework.id)}
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200 cursor-pointer ${
            homework.completed
              ? 'bg-emerald-600 text-white shadow-xs scale-102 ring-2 ring-emerald-100 dark:ring-emerald-950'
              : 'border-2 border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 bg-white dark:bg-slate-800'
          }`}
          title={homework.completed ? 'Tamamlandı (Geri al)' : 'Ödevi tamamlandı olarak işaretle'}
        >
          {homework.completed ? (
            <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
          ) : (
            <div className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-blue-400 transition" />
          )}
        </button>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          
          {/* Top Unboxed Metadata Line (Zero-Pill) */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {homework.course.replace(/ 8\/D/, '')}
              </span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <span className="truncate max-w-[140px] sm:max-w-none">{homework.teacher}</span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <span className={`font-medium ${
                urgency.status === 'today'
                  ? 'text-amber-600 dark:text-amber-400 font-bold'
                  : urgency.status === 'expired'
                  ? 'text-rose-600 dark:text-rose-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400'
              }`}>
                {homework.displayDueDate}
              </span>
            </div>

            {/* Quick Actions (Share / Delete) */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={handleShareSingle}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition cursor-pointer"
                title="Ödevi kopyala"
              >
                {copied ? (
                  <span className="text-[10px] text-emerald-600 font-bold">Kopyalandı</span>
                ) : (
                  <Share2 className="w-3.5 h-3.5" />
                )}
              </button>

              {homework.isCustom && onDeleteCustom && (
                <button
                  type="button"
                  onClick={() => onDeleteCustom(homework.id)}
                  className="p-1 rounded-lg text-slate-400 hover:text-rose-600 transition cursor-pointer"
                  title="Ödevi sil"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Homework Title */}
          <h3
            className={`text-base font-bold transition-all ${
              homework.completed
                ? 'line-through text-slate-400 dark:text-slate-500 font-medium'
                : 'text-slate-900 dark:text-white'
            }`}
          >
            {homework.title}
          </h3>

          {/* Books & Pages: Dedicated High-Contrast Callout for 13-Year-Old Desk Study */}
          {homework.booksAndPages && homework.booksAndPages.length > 0 && (
            <div className="mt-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 flex items-start gap-2 text-xs">
              <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div className="font-semibold text-slate-800 dark:text-slate-200 flex-1">
                <span>Kitap & Sayfalar: </span>
                <span className="text-blue-700 dark:text-blue-300 font-bold">
                  {homework.booksAndPages.join(' · ')}
                </span>
              </div>
            </div>
          )}

          {/* Teacher's Note Description */}
          {homework.description && (
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
              {homework.description}
            </p>
          )}

          {/* Subtasks Checklist */}
          {homework.subtasks.length > 0 && (
            <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Soru ve Test Adımları ({completedSubtasksCount}/{totalSubtasks})
              </div>
              {homework.subtasks.map((st) => (
                <label
                  key={st.id}
                  onClick={() => onToggleSubtask(homework.id, st.id)}
                  className={`flex items-start gap-2.5 p-1.5 rounded-lg text-xs font-medium cursor-pointer transition select-none ${
                    st.completed
                      ? 'text-slate-400 line-through'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={st.completed}
                    onChange={() => {}}
                    className="mt-0.5 rounded-xs text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span>{st.title}</span>
                </label>
              ))}
            </div>
          )}

          {/* Personal Note */}
          <div className="mt-2.5 pt-1">
            {!showNoteInput && homework.notes && (
              <div
                onClick={() => setShowNoteInput(true)}
                className="text-xs text-amber-900 dark:text-amber-200 bg-amber-50/70 dark:bg-amber-950/30 p-2 rounded-xl flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
                  <span>{homework.notes}</span>
                </div>
                <Edit3 className="w-3 h-3 text-amber-500" />
              </div>
            )}

            {!showNoteInput && !homework.notes && (
              <button
                type="button"
                onClick={() => setShowNoteInput(true)}
                className="text-[11px] text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3 h-3" />
                <span>Not ekle</span>
              </button>
            )}

            {showNoteInput && (
              <div className="mt-1.5 flex gap-1.5">
                <input
                  type="text"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Kişisel notun..."
                  className="flex-1 text-xs px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={handleSaveNote}
                  className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg cursor-pointer"
                >
                  Kaydet
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
