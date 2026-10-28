import React from 'react';
import { BookOpen, Clock, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';

interface TailAdminKpiCardsProps {
  totalCount: number;
  pendingCount: number;
  completedCount: number;
  urgentCount: number;
  onFilterStatus?: (status: 'all' | 'pending' | 'completed' | 'urgent') => void;
  activeStatus?: string;
}

export const TailAdminKpiCards: React.FC<TailAdminKpiCardsProps> = ({
  totalCount,
  pendingCount,
  completedCount,
  urgentCount,
  onFilterStatus,
  activeStatus = 'all',
}) => {
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {/* 1. Toplam Ödev */}
      <div 
        onClick={() => onFilterStatus && onFilterStatus('all')}
        className={`p-5 rounded-xl border bg-white dark:bg-gray-900 transition shadow-2xs cursor-pointer ${
          activeStatus === 'all'
            ? 'border-blue-500 ring-2 ring-blue-500/10'
            : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            Tüm Liste
          </span>
        </div>
        <div className="mt-4">
          <div className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            {totalCount}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            8/D Sınıfı Toplam Ödev
          </p>
        </div>
      </div>

      {/* 2. Bekleyen Ödevler */}
      <div 
        onClick={() => onFilterStatus && onFilterStatus('pending')}
        className={`p-5 rounded-xl border bg-white dark:bg-gray-900 transition shadow-2xs cursor-pointer ${
          activeStatus === 'pending'
            ? 'border-amber-500 ring-2 ring-amber-500/10'
            : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          {urgentCount > 0 ? (
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
              {urgentCount} Yaklaşan
            </span>
          ) : (
            <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Bekleyen
            </span>
          )}
        </div>
        <div className="mt-4">
          <div className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            {pendingCount}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Yapılması Gereken Ödev
          </p>
        </div>
      </div>

      {/* 3. Tamamlanan Ödevler */}
      <div 
        onClick={() => onFilterStatus && onFilterStatus('completed')}
        className={`p-5 rounded-xl border bg-white dark:bg-gray-900 transition shadow-2xs cursor-pointer ${
          activeStatus === 'completed'
            ? 'border-emerald-500 ring-2 ring-emerald-500/10'
            : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            Tamamlandı
          </span>
        </div>
        <div className="mt-4">
          <div className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            {completedCount}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Biten Görev & Test
          </p>
        </div>
      </div>

      {/* 4. Başarı Oranı & LGS Hedefi */}
      <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="w-11 h-11 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400">
            Hedef %100
          </span>
        </div>
        <div className="mt-4">
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              %{percentage}
            </div>
            <span className="text-[11px] text-gray-400">Genel İlerleme</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full mt-2 overflow-hidden">
            <div 
              className="bg-linear-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
