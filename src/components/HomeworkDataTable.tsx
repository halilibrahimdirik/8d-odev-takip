import React, { useState } from 'react';
import { 
  Check, 
  ChevronDown, 
  ChevronUp, 
  ArrowUpDown, 
  BookOpen, 
  User, 
  Clock, 
  Share2, 
  Trash2, 
  Edit3, 
  CheckCircle2,
  AlertCircle,
  FileText
} from 'lucide-react';
import { HomeworkItem } from '../types/homework';
import { getUrgencyInfo } from '../utils/dateUtils';
import { cn } from '../lib/utils';

export interface HomeworkDataTableProps {
  items: HomeworkItem[];
  onToggleComplete: (id: string) => void;
  onToggleSubtask: (homeworkId: string, subtaskId: string) => void;
  onUpdateNote: (homeworkId: string, note: string) => void;
  onDeleteCustom?: (id: string) => void;
}

export const HomeworkDataTable: React.FC<HomeworkDataTableProps> = ({
  items,
  onToggleComplete,
  onToggleSubtask,
  onUpdateNote,
  onDeleteCustom,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sortField, setSortField] = useState<'course' | 'dueDate' | 'completed'>('dueDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSort = (field: 'course' | 'dueDate' | 'completed') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedItems = [...items].sort((a, b) => {
    if (sortField === 'completed') {
      const aVal = a.completed ? 1 : 0;
      const bVal = b.completed ? 1 : 0;
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    }
    if (sortField === 'course') {
      return sortOrder === 'asc' 
        ? a.course.localeCompare(b.course, 'tr') 
        : b.course.localeCompare(a.course, 'tr');
    }
    if (sortField === 'dueDate') {
      const aTime = new Date(a.dueDate).getTime();
      const bTime = new Date(b.dueDate).getTime();
      return sortOrder === 'asc' ? aTime - bTime : bTime - aTime;
    }
    return 0;
  });

  const toggleRow = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleShare = (e: React.MouseEvent, hw: HomeworkItem) => {
    e.stopPropagation();
    const text = `📌 *${hw.course} - ${hw.title}*\n` +
      `👤 Öğretmen: ${hw.teacher}\n` +
      `⏰ Teslim: ${hw.displayDueDate}\n` +
      (hw.booksAndPages?.length ? `📚 Kitap: ${hw.booksAndPages.join(', ')}\n` : '') +
      `\n🔗 Ödev Portalı: ${window.location.origin}`;
    navigator.clipboard.writeText(text);
    setCopiedId(hw.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const completedCount = items.filter((i) => i.completed).length;

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xs overflow-hidden transition-all">
      {/* TailAdmin Card Header */}
      <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white dark:bg-gray-900">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white tracking-tight">
            Ödev ve Görev Tablosu
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Dersler, test kitapçıkları, teslim tarihleri ve durumları
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
            {completedCount} / {items.length} Tamamlandı
          </span>
        </div>
      </div>

      {/* TailAdmin Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          {/* Table Header */}
          <thead className="bg-gray-50/80 dark:bg-gray-800/60 text-gray-500 dark:text-gray-400 font-semibold border-b border-gray-200 dark:border-gray-800 select-none">
            <tr>
              <th className="py-3.5 px-4 w-12 text-center">
                <button 
                  onClick={() => handleSort('completed')}
                  className="hover:text-gray-900 dark:hover:text-white transition cursor-pointer flex items-center justify-center mx-auto"
                  title="Duruma göre sırala"
                >
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </button>
              </th>
              <th 
                className="py-3.5 px-4 text-xs font-semibold uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white" 
                onClick={() => handleSort('course')}
              >
                <div className="flex items-center gap-1.5">
                  <span>Ders & Konu</span>
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </div>
              </th>
              <th className="py-3.5 px-4 text-xs font-semibold uppercase tracking-wider min-w-[170px]">
                Kitap & Sayfa
              </th>
              <th className="py-3.5 px-4 text-xs font-semibold uppercase tracking-wider hidden md:table-cell">
                Öğretmen
              </th>
              <th 
                className="py-3.5 px-4 text-xs font-semibold uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white" 
                onClick={() => handleSort('dueDate')}
              >
                <div className="flex items-center gap-1.5">
                  <span>Son Teslim</span>
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </div>
              </th>
              <th className="py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-center">
                Durum
              </th>
              <th className="py-3.5 px-3 w-10 text-center"></th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800/80">
            {sortedItems.map((hw) => {
              const urgency = getUrgencyInfo(hw.dueDate);
              const isExpanded = expandedId === hw.id;
              const subtasksDone = hw.subtasks.filter((s) => s.completed).length;

              return (
                <React.Fragment key={hw.id}>
                  <tr
                    onClick={() => toggleRow(hw.id)}
                    className={cn(
                      'group transition-colors cursor-pointer select-none',
                      hw.completed
                        ? 'bg-gray-50/40 dark:bg-gray-900/30 text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/30'
                        : isExpanded
                        ? 'bg-blue-50/30 dark:bg-blue-950/20 hover:bg-blue-50/50'
                        : 'hover:bg-gray-50/80 dark:hover:bg-gray-800/40 text-gray-700 dark:text-gray-200'
                    )}
                  >
                    {/* Checkbox */}
                    <td className="py-4 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => onToggleComplete(hw.id)}
                        className={cn(
                          'w-5 h-5 rounded-md flex items-center justify-center transition-all cursor-pointer mx-auto',
                          hw.completed
                            ? 'bg-emerald-600 text-white shadow-2xs'
                            : 'border border-gray-300 dark:border-gray-600 hover:border-blue-500 bg-white dark:bg-gray-800'
                        )}
                      >
                        {hw.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>
                    </td>

                    {/* Course & Topic with TailAdmin avatar/letter badge */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          'w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0',
                          hw.completed
                            ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500'
                            : 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/50'
                        )}>
                          {hw.course.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <span className={cn(
                            'font-bold text-xs block truncate',
                            hw.completed ? 'text-gray-400' : 'text-gray-900 dark:text-white'
                          )}>
                            {hw.course.replace(/ 8\/D/, '')}
                          </span>
                          <span className={cn(
                            'text-[11px] block truncate',
                            hw.completed ? 'line-through text-gray-400' : 'text-gray-500 dark:text-gray-400'
                          )}>
                            {hw.title}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Book & Pages */}
                    <td className="py-4 px-4">
                      {hw.booksAndPages && hw.booksAndPages.length > 0 ? (
                        <span className={cn(
                          'font-mono text-[11px] font-medium block truncate max-w-[220px]',
                          hw.completed ? 'text-gray-400' : 'text-gray-800 dark:text-gray-200'
                        )}>
                          {hw.booksAndPages.join(' · ')}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>

                    {/* Teacher */}
                    <td className="py-4 px-4 whitespace-nowrap text-gray-600 dark:text-gray-400 hidden md:table-cell">
                      {hw.teacher}
                    </td>

                    {/* Due Date */}
                    <td className="py-4 px-4 whitespace-nowrap font-medium text-gray-600 dark:text-gray-400">
                      {hw.displayDueDate.split(',')[0]}
                    </td>

                    {/* TailAdmin Style Pill Status Badges */}
                    <td className="py-4 px-4 whitespace-nowrap text-center">
                      {hw.completed ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Tamamlandı
                        </span>
                      ) : urgency.status === 'today' ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200/80 dark:border-amber-800/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                          Bugün Teslim
                        </span>
                      ) : urgency.status === 'expired' ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200/80 dark:border-rose-800/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          Gecikti
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200/80 dark:border-blue-800/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          Bekliyor
                        </span>
                      )}
                    </td>

                    {/* Expand Chevron */}
                    <td className="py-4 px-3 text-center text-gray-400">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </td>
                  </tr>

                  {/* Expanded Row Detail (Accordion) */}
                  {isExpanded && (
                    <tr className="bg-gray-50/60 dark:bg-gray-800/40 border-y border-gray-200/70 dark:border-gray-800">
                      <td colSpan={7} className="p-4 sm:p-5">
                        <div className="max-w-3xl space-y-3">
                          
                          {/* Teacher Note */}
                          {hw.description && (
                            <div className="text-xs text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed bg-white dark:bg-gray-900 p-3.5 rounded-xl border border-gray-200 dark:border-gray-800">
                              <span className="font-bold text-gray-900 dark:text-white block mb-1">
                                Öğretmen Açıklaması:
                              </span>
                              {hw.description}
                            </div>
                          )}

                          {/* Subtasks */}
                          {hw.subtasks.length > 0 && (
                            <div className="bg-white dark:bg-gray-900 p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 space-y-1.5">
                              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                                Test Adımları ({subtasksDone}/{hw.subtasks.length})
                              </span>
                              {hw.subtasks.map((st) => (
                                <label
                                  key={st.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onToggleSubtask(hw.id, st.id);
                                  }}
                                  className={cn(
                                    'flex items-center gap-2.5 p-1.5 text-xs cursor-pointer select-none rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50',
                                    st.completed ? 'line-through text-gray-400' : 'text-gray-700 dark:text-gray-200'
                                  )}
                                >
                                  <input
                                    type="checkbox"
                                    checked={st.completed}
                                    onChange={() => {}}
                                    className="rounded-xs text-blue-600 focus:ring-blue-500 cursor-pointer"
                                  />
                                  <span>{st.title}</span>
                                </label>
                              ))}
                            </div>
                          )}

                          {/* Note & Share Footer */}
                          <div className="flex items-center justify-between pt-1">
                            <div className="flex-1 mr-2">
                              {editingNoteId === hw.id ? (
                                <div className="flex gap-1.5">
                                  <input
                                    type="text"
                                    value={noteText}
                                    onChange={(e) => setNoteText(e.target.value)}
                                    placeholder="Kişisel çalışma notun..."
                                    className="text-xs px-3 py-1.5 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white flex-1"
                                  />
                                  <button
                                    onClick={() => {
                                      onUpdateNote(hw.id, noteText);
                                      setEditingNoteId(null);
                                    }}
                                    className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold cursor-pointer"
                                  >
                                    Kaydet
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => {
                                    setEditingNoteId(hw.id);
                                    setNoteText(hw.notes || '');
                                  }}
                                  className="text-xs text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 flex items-center gap-1.5 cursor-pointer"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                  <span>{hw.notes ? `Not: "${hw.notes}"` : 'Kişisel not ekle'}</span>
                                </button>
                              )}
                            </div>

                            <button
                              onClick={(e) => handleShare(e, hw)}
                              className="px-3 py-1.5 text-xs font-semibold bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-1.5 cursor-pointer"
                            >
                              <Share2 className="w-3.5 h-3.5" />
                              <span>{copiedId === hw.id ? 'Kopyalandı!' : 'Ödevi Paylaş'}</span>
                            </button>
                          </div>

                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* TailAdmin Card Footer */}
      <div className="px-5 py-3 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-850/30 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>Toplam {items.length} ödev listeleniyor</span>
        <span>{completedCount} tamamlandı</span>
      </div>
    </div>
  );
};
