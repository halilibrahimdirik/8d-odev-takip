import React from 'react';
import { CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { SubjectType } from '../types/homework';

interface ProgressBarProps {
  completedCount: number;
  totalCount: number;
  subjectBreakdown: Record<SubjectType, { completed: number; total: number }>;
  onResetProgress: () => void;
  onCompleteAll: () => void;
  studentName: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  completedCount,
  totalCount,
  onResetProgress,
  studentName,
}) => {
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const remainingCount = totalCount - completedCount;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
      <div className="flex items-center justify-between gap-3 mb-2.5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              {percent === 100 ? (
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Harikasın {studentName}! Tüm ödevler bitti!
                </span>
              ) : remainingCount === 1 ? (
                `Son 1 ödevin kaldı, gayret et ${studentName}!`
              ) : (
                `Tamamlanmamış ${remainingCount} ödevin var`
              )}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {completedCount} / {totalCount} ödev tamamlandı (%{percent})
          </p>
        </div>

        {/* Small Action */}
        {completedCount > 0 && (
          <button
            onClick={onResetProgress}
            className="text-xs text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1 transition cursor-pointer p-1"
            title="İşaretlemeleri sıfırla"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sıfırla</span>
          </button>
        )}
      </div>

      {/* Sleek Line Progress Bar */}
      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            percent === 100
              ? 'bg-emerald-500'
              : percent > 50
              ? 'bg-blue-600'
              : 'bg-amber-500'
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};
