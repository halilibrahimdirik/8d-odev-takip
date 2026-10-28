import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Flame, 
  Calendar, 
  Clock, 
  Sparkles 
} from 'lucide-react';
import { HomeworkItem } from '../types/homework';
import { TimelineBucket, TIMELINE_GROUPS } from '../utils/dateUtils';
import { HomeworkCard } from './HomeworkCard';

interface TimelineSectionProps {
  bucket: TimelineBucket;
  items: HomeworkItem[];
  onToggleComplete: (id: string) => void;
  onToggleSubtask: (homeworkId: string, subtaskId: string) => void;
  onUpdateNote: (homeworkId: string, note: string) => void;
  onDeleteCustom?: (id: string) => void;
  defaultExpanded?: boolean;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({
  bucket,
  items,
  onToggleComplete,
  onToggleSubtask,
  onUpdateNote,
  onDeleteCustom,
  defaultExpanded = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const meta = TIMELINE_GROUPS[bucket];

  if (!meta) return null;

  const totalCount = items.length;
  const completedCount = items.filter((i) => i.completed).length;
  const pendingCount = totalCount - completedCount;

  const renderIcon = () => {
    switch (bucket) {
      case 'urgent':
        return <Flame className="w-4 h-4 text-rose-500" />;
      case 'monday':
        return <Calendar className="w-4 h-4 text-amber-500" />;
      case 'later':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <section className="space-y-2.5">
      {/* Quiet, Unboxed Section Header */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between py-2 px-1 text-slate-800 dark:text-slate-200 transition cursor-pointer select-none"
      >
        <div className="flex items-center gap-2">
          {renderIcon()}
          <h2 className="text-sm font-bold tracking-tight">
            {meta.title}
          </h2>
          <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {bucket !== 'completed'
              ? pendingCount === 0
                ? 'Tamamı bitti'
                : `${pendingCount} ödev bekliyor`
              : `${completedCount} tamamlandı`}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
          <span className="font-mono text-[11px] font-bold">
            {completedCount}/{totalCount}
          </span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </div>

      {/* Expanded Cards Area */}
      {isExpanded && (
        <div className="space-y-2.5">
          {items.length > 0 ? (
            items.map((hw) => (
              <HomeworkCard
                key={hw.id}
                homework={hw}
                onToggleComplete={onToggleComplete}
                onToggleSubtask={onToggleSubtask}
                onUpdateNote={onUpdateNote}
                onDeleteCustom={onDeleteCustom}
              />
            ))
          ) : (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 text-center text-xs text-slate-400">
              Bu grupta bekleyen ödevin yok! 🎉
            </div>
          )}
        </div>
      )}
    </section>
  );
};
