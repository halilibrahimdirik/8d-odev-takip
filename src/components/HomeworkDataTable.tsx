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
  FileText,
  Filter,
  Eye
} from 'lucide-react';
import { HomeworkItem, INSTITUTION_META, InstitutionType } from '../types/homework';
import { getUrgencyInfo } from '../utils/dateUtils';
import { cn } from '../lib/utils';

export interface HomeworkDataTableProps {
  items: HomeworkItem[];
  onToggleComplete: (id: string) => void;
  onToggleSubtask: (homeworkId: string, subtaskId: string) => void;
  onUpdateNote: (homeworkId: string, note: string) => void;
  onDeleteCustom?: (id: string) => void;
  onOpenAddModal?: () => void;
}

export const HomeworkDataTable: React.FC<HomeworkDataTableProps> = ({
  items,
  onToggleComplete,
  onToggleSubtask,
  onUpdateNote,
  onDeleteCustom,
  onOpenAddModal,
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

  // Course initials helper for avatar
  const getSubjectInitials = (course: string) => {
    if (course.includes('FEN')) return { text: 'FEN', bg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/70 dark:text-emerald-400 border-emerald-200/50' };
    if (course.includes('MATEMATİK')) return { text: 'MAT', bg: 'bg-blue-50 text-blue-600 dark:bg-blue-950/70 dark:text-blue-400 border-blue-200/50' };
    if (course.includes('TÜRKÇE')) return { text: 'TRK', bg: 'bg-amber-50 text-amber-600 dark:bg-amber-950/70 dark:text-amber-400 border-amber-200/50' };
    if (course.includes('İNKILAP')) return { text: 'İNK', bg: 'bg-rose-50 text-rose-600 dark:bg-rose-950/70 dark:text-rose-400 border-rose-200/50' };
    if (course.includes('DİN')) return { text: 'DİN', bg: 'bg-teal-50 text-teal-600 dark:bg-teal-950/70 dark:text-teal-400 border-teal-200/50' };
    if (course.includes('ENGLISH')) return { text: 'ENG', bg: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/70 dark:text-indigo-400 border-indigo-200/50' };
    return { text: '8/D', bg: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 border-gray-200/50' };
  };

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xs overflow-hidden transition-all">
      {/* TailAdmin Card Header (matches Basic Table 1 in screenshot) */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-gray-900">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white tracking-tight">
            Ödev ve Görev Tablosu
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            8/D sınıfı haftalık ödevleri, test kitapçıkları ve teslim tarihleri
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
            {completedCount} / {items.length} Tamamlandı
          </span>
          {onOpenAddModal && (
            <button
              onClick={onOpenAddModal}
              className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer"
            >
              + Yeni Ekle
            </button>
          )}
        </div>
      </div>

      {/* TailAdmin Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          {/* Table Header (Small, uppercase, bold, subtle border) */}
          <thead className="bg-gray-50/70 dark:bg-gray-800/40 text-gray-500 dark:text-gray-400 font-medium border-b border-gray-200 dark:border-gray-800 select-none">
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
                className="py-3.5 px-5 text-xs font-medium uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white" 
                onClick={() => handleSort('course')}
              >
                <div className="flex items-center gap-1.5">
                  <span>Ders & Ödev Başlığı</span>
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </div>
              </th>
              <th className="py-3.5 px-4 text-xs font-medium uppercase tracking-wider text-center">
                Durum
              </th>
              <th className="py-3.5 px-4 text-xs font-medium uppercase tracking-wider whitespace-nowrap">
                Kurum / Kaynak
              </th>
              <th className="py-3.5 px-5 text-xs font-medium uppercase tracking-wider min-w-[170px]">
                Kitap & Sayfa
              </th>
              <th 
                className="py-3.5 px-5 text-xs font-medium uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white" 
                onClick={() => handleSort('dueDate')}
              >
                <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold">
                  <span>Son Teslim</span>
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </div>
              </th>
              <th className="py-3.5 px-4 w-12 text-center"></th>
            </tr>
          </thead>

          {/* Table Body (Clean rows with soft hover) */}
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800/80">
            {sortedItems.map((hw) => {
              const urgency = getUrgencyInfo(hw.dueDate);
              const isExpanded = expandedId === hw.id;
              const subtasksDone = hw.subtasks.filter((s) => s.completed).length;
              const badgeMeta = getSubjectInitials(hw.course);

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
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          'w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 border',
                          hw.completed
                            ? 'bg-gray-100 text-gray-400 border-gray-200 dark:bg-gray-800 dark:text-gray-500 dark:border-gray-700'
                            : badgeMeta.bg
                        )}>
                          {badgeMeta.text}
                        </div>
                        <div className="min-w-0">
                          <p className={cn(
                            'text-sm font-semibold truncate max-w-xs sm:max-w-md',
                            hw.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-white'
                          )}>
                            {hw.title}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[11px] text-gray-400 dark:text-gray-500 font-medium truncate">
                              {hw.course.replace(' 8/D', '')}
                            </span>
                            {hw.topic && hw.topic !== hw.title && (
                              <>
                                <span className="text-gray-300 dark:text-gray-700">·</span>
                                <span className="text-[11px] text-gray-400 dark:text-gray-500 truncate">
                                  {hw.topic}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Status Pill Badge (TailAdmin Style: Active, Pending, Cancel) */}
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      {hw.completed ? (
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
                          Active (Tamam)
                        </span>
                      ) : urgency.status === 'expired' ? (
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200/60 dark:border-rose-800/60">
                          Cancel (Gecikti)
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60">
                          Pending (Bekliyor)
                        </span>
                      )}
                    </td>

                    {/* Kurum / Kaynak Column */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      {(() => {
                        const inst = hw.institution || 'maya';
                        const meta = INSTITUTION_META[inst] || INSTITUTION_META.maya;
                        return (
                          <span className={cn(
                            'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border',
                            meta.badgeClass
                          )}>
                            <span className="text-xs leading-none">{meta.icon}</span>
                            <span>{meta.shortName}</span>
                          </span>
                        );
                      })()}
                    </td>

                    {/* Kitap & Sayfa */}
                    <td className="py-4 px-5">
                      {hw.booksAndPages && hw.booksAndPages.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {hw.booksAndPages.map((b, i) => (
                            <span
                              key={i}
                              className={cn(
                                'inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border max-w-xs truncate',
                                hw.completed
                                  ? 'bg-gray-100 text-gray-400 border-gray-200 dark:bg-gray-800 dark:text-gray-500 dark:border-gray-700'
                                  : 'bg-gray-50 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
                              )}
                            >
                              <BookOpen className="w-3 h-3 shrink-0 opacity-60" />
                              <span className="truncate">{b}</span>
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs italic">Belirtilmedi</span>
                      )}
                    </td>

                    {/* Due Date */}
                    <td className="py-4 px-5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Clock className={cn(
                          'w-3.5 h-3.5 shrink-0',
                          urgency.status === 'expired' 
                            ? 'text-rose-600 dark:text-rose-400' 
                            : urgency.status === 'today' || urgency.status === 'tomorrow'
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-gray-500 dark:text-gray-400'
                        )} />
                        <span className={cn(
                          'text-xs font-medium',
                          urgency.status === 'expired' 
                            ? 'text-rose-600 dark:text-rose-400 font-semibold' 
                            : urgency.status === 'today' || urgency.status === 'tomorrow'
                            ? 'text-amber-600 dark:text-amber-400 font-semibold'
                            : 'text-gray-700 dark:text-gray-300'
                        )}>
                          {hw.displayDueDate.split(',')[0]}
                        </span>
                      </div>
                      <div className="text-[10px] text-gray-400 dark:text-gray-500 pl-5">
                        {hw.displayDueDate.split(',')[1] || ''}
                      </div>
                    </td>

                    {/* Action Chevron */}
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition" />
                        )}
                      </div>
                    </td>
                  </tr>

                  {/* Expanded Row Detail (Subtasks, notes, description) */}
                  {isExpanded && (
                    <tr className="bg-gray-50/50 dark:bg-gray-800/30">
                      <td colSpan={7} className="p-0 border-b border-gray-200 dark:border-gray-800">
                        <div className="px-6 py-5 space-y-4">
                          
                          {/* Teacher Instruction Text */}
                          <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                                <FileText className="w-3.5 h-3.5 text-blue-500" />
                                Öğretmen Açıklaması & Talimatı
                              </span>
                              <span className="text-[11px] text-gray-400">
                                {hw.teacher}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                              {hw.description}
                            </p>
                          </div>

                          {/* Subtasks Checklist */}
                          {hw.subtasks && hw.subtasks.length > 0 && (
                            <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
                              <div className="flex items-center justify-between mb-2.5">
                                <span className="text-xs font-bold text-gray-900 dark:text-white">
                                  Adım Adım Alt Görevler
                                </span>
                                <span className="text-[11px] text-gray-400">
                                  {subtasksDone} / {hw.subtasks.length} tamamlandı
                                </span>
                              </div>
                              <div className="space-y-1.5">
                                {hw.subtasks.map((st) => (
                                  <label
                                    key={st.id}
                                    className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer select-none text-xs"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={st.completed}
                                      onChange={() => onToggleSubtask(hw.id, st.id)}
                                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                                    />
                                    <span className={cn(
                                      st.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'
                                    )}>
                                      {st.title}
                                    </span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Actions & Personal Notes */}
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={(e) => handleShare(e, hw)}
                                className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center gap-1.5 cursor-pointer"
                              >
                                <Share2 className="w-3.5 h-3.5 text-blue-600" />
                                <span>{copiedId === hw.id ? 'Kopyalandı!' : 'WhatsApp İçin Kopyala'}</span>
                              </button>

                              {hw.isCustom && onDeleteCustom && (
                                <button
                                  type="button"
                                  onClick={() => onDeleteCustom(hw.id)}
                                  className="px-3 py-1.5 rounded-lg border border-rose-200 dark:border-rose-900/60 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition flex items-center gap-1.5 cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>Ödevi Sil</span>
                                </button>
                              )}
                            </div>

                            {/* Personal Note */}
                            <div className="flex-1 max-w-sm">
                              {editingNoteId === hw.id ? (
                                <div className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={noteText}
                                    onChange={(e) => setNoteText(e.target.value)}
                                    placeholder="Kişisel notunuzu yazın..."
                                    className="flex-1 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs text-gray-900 dark:text-white"
                                  />
                                  <button
                                    onClick={() => {
                                      onUpdateNote(hw.id, noteText);
                                      setEditingNoteId(null);
                                    }}
                                    className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 cursor-pointer"
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
                                  className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-1.5 cursor-pointer"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                  <span>{hw.notes ? `Not: "${hw.notes}"` : '+ Kişisel Not Ekle'}</span>
                                </button>
                              )}
                            </div>
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
    </div>
  );
};
