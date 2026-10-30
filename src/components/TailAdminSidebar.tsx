import React from 'react';
import { 
  Table, 
  LayoutDashboard, 
  Calendar, 
  Clock, 
  Printer, 
  Share2, 
  Plus, 
  GraduationCap, 
  BookOpen, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  X,
  ChevronRight,
  Database,
  Target
} from 'lucide-react';
import { InstitutionType, INSTITUTION_META } from '../types/homework';

export type SidebarTab = 'tables' | 'dashboard' | 'timeline' | 'mistakes';

interface TailAdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: SidebarTab;
  onSelectTab: (tab: SidebarTab) => void;
  institutionFilter: string;
  onInstitutionChange: (institution: string) => void;
  subjectFilter: string;
  onSubjectChange: (subject: string) => void;
  availableSubjects: string[];
  counts: {
    all: number;
    pending: number;
    completed: number;
    maya: number;
    aydin: number;
    kisisel: number;
  };
  onOpenAddModal: () => void;
  onOpenTimerModal: () => void;
  onOpenPrint: () => void;
  onOpenShareModal: () => void;
  onOpenSupabaseModal: () => void;
  isSupabaseConnected: boolean;
}

export const TailAdminSidebar: React.FC<TailAdminSidebarProps> = ({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
  institutionFilter,
  onInstitutionChange,
  subjectFilter,
  onSubjectChange,
  availableSubjects,
  counts,
  onOpenAddModal,
  onOpenTimerModal,
  onOpenPrint,
  onOpenShareModal,
  onOpenSupabaseModal,
  isSupabaseConnected,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Brand / Logo (TailAdmin style) */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            {/* Geometric Modern Logo */}
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M4 4h4v16H4V4zm6 6h4v10h-4V10zm6-4h4v14h-4V6z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                  8/D Portal
                </span>
                <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  LGS
                </span>
              </div>
              <p className="text-[11px] text-gray-400 dark:text-gray-500 font-medium">
                Ödev & Görev Takibi
              </p>
            </div>
          </div>

          {/* Mobile close button */}
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6 text-sm">
          {/* Main Navigation Group */}
          <div>
            <div className="px-3 mb-2 text-[11px] font-semibold tracking-wider uppercase text-gray-400 dark:text-gray-500">
              Menü
            </div>
            <nav className="space-y-1">
              <button
                onClick={() => {
                  onSelectTab('tables');
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-medium transition cursor-pointer text-left ${
                  activeTab === 'tables'
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Table className="w-4 h-4" />
                  <span>Ödev Tablosu</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100/70 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300 font-semibold">
                  {counts.all}
                </span>
              </button>

              <button
                onClick={() => {
                  onSelectTab('timeline');
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-medium transition cursor-pointer text-left ${
                  activeTab === 'timeline'
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4" />
                  <span>Haftalık Takvim</span>
                </div>
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                  Akış
                </span>
              </button>

              <button
                onClick={() => {
                  onSelectTab('mistakes');
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-medium transition cursor-pointer text-left ${
                  activeTab === 'mistakes'
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Target className="w-4 h-4 text-rose-500" />
                  <span className="font-semibold">Yanlış Analizi</span>
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400">
                  LGS Odak
                </span>
              </button>

              <button
                onClick={() => {
                  onOpenTimerModal();
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4" />
                  <span>Çalışma Sayacı</span>
                </div>
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                  Pomodoro
                </span>
              </button>

              <button
                onClick={() => {
                  onOpenPrint();
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <Printer className="w-4 h-4" />
                  <span>Yazdır & Rapor</span>
                </div>
              </button>
            </nav>
          </div>

          {/* Institutions Group (TailAdmin Support style) */}
          <div>
            <div className="px-3 mb-2 flex items-center justify-between text-[11px] font-semibold tracking-wider uppercase text-gray-400 dark:text-gray-500">
              <span>Kurumlar</span>
              {institutionFilter !== 'all' && (
                <button
                  onClick={() => onInstitutionChange('all')}
                  className="text-[10px] text-blue-600 dark:text-blue-400 lowercase font-medium hover:underline cursor-pointer"
                >
                  tümü
                </button>
              )}
            </div>
            <div className="space-y-1">
              <button
                onClick={() => onInstitutionChange('maya')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition cursor-pointer text-left ${
                  institutionFilter === 'maya'
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base leading-none">🏫</span>
                  <span>Maya Okulu</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-semibold">
                  {counts.maya}
                </span>
              </button>

              <button
                onClick={() => onInstitutionChange('aydin')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition cursor-pointer text-left ${
                  institutionFilter === 'aydin'
                    ? 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-semibold'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base leading-none">🏛️</span>
                  <span>Aydın Dershanesi</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 font-semibold">
                  {counts.aydin}
                </span>
              </button>

              <button
                onClick={() => onInstitutionChange('kisisel')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition cursor-pointer text-left ${
                  institutionFilter === 'kisisel'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base leading-none">👤</span>
                  <span>Kişisel Çalışmalar</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 font-semibold">
                  {counts.kisisel}
                </span>
              </button>
            </div>
          </div>

          {/* Quick Subject Filters */}
          <div>
            <div className="px-3 mb-2 flex items-center justify-between text-[11px] font-semibold tracking-wider uppercase text-gray-400 dark:text-gray-500">
              <span>Ders Filtresi</span>
              {subjectFilter !== 'all' && (
                <button
                  onClick={() => onSubjectChange('all')}
                  className="text-[10px] text-blue-600 dark:text-blue-400 lowercase font-medium hover:underline cursor-pointer"
                >
                  sıfırla
                </button>
              )}
            </div>
            <div className="space-y-0.5 max-h-40 overflow-y-auto pr-1">
              {availableSubjects.map((subject) => {
                const isSelected = subjectFilter === subject;
                const shortSubject = subject.replace(' 8/D', '');
                return (
                  <button
                    key={subject}
                    onClick={() => onSubjectChange(isSelected ? 'all' : subject)}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer text-left truncate ${
                      isSelected
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold'
                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/40'
                    }`}
                  >
                    <span className="truncate">{shortSubject}</span>
                    {isSelected && <span className="text-blue-600 font-bold">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Promo Card (TailAdmin style) */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800">
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/60 space-y-3">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900 dark:text-white">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>8/D LGS Başarı Takibi</span>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                {counts.completed} / {counts.all} ödev tamamlandı (%
                {counts.all > 0 ? Math.round((counts.completed / counts.all) * 100) : 0})
              </p>
              {/* Progress bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-blue-600 h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${counts.all > 0 ? Math.round((counts.completed / counts.all) * 100) : 0}%`,
                  }}
                />
              </div>
            </div>

            <button
              onClick={() => {
                onOpenAddModal();
                onClose();
              }}
              className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Yeni Ödev Ekle</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
