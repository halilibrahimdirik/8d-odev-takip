import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  Search, 
  Moon, 
  Sun, 
  Bell, 
  User, 
  ChevronDown, 
  Volume2, 
  VolumeX, 
  Plus, 
  Database,
  Share2,
  Calendar,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { HomeworkItem } from '../types/homework';

interface TailAdminHeaderProps {
  onToggleSidebar: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  studentName: string;
  onOpenStudentModal: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  isSupabaseConnected: boolean;
  onOpenSupabaseModal: () => void;
  onOpenAddModal: () => void;
  onOpenShareModal: () => void;
  pendingItems: HomeworkItem[];
  urgentCount: number;
}

export const TailAdminHeader: React.FC<TailAdminHeaderProps> = ({
  onToggleSidebar,
  searchQuery,
  onSearchChange,
  studentName,
  onOpenStudentModal,
  darkMode,
  onToggleDarkMode,
  soundEnabled,
  onToggleSound,
  isSupabaseConnected,
  onOpenSupabaseModal,
  onOpenAddModal,
  onOpenShareModal,
  pendingItems,
  urgentCount,
}) => {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-colors">
      {/* Left Area: Toggle Sidebar & Search Input */}
      <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-xl">
        {/* Hamburger Toggle */}
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer"
          title="Menüyü Aç/Kapat"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Input (TailAdmin Style) */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Ödev, ders veya öğretmen ara..."
            className="w-full pl-9 pr-14 py-2 text-xs sm:text-sm bg-gray-50/70 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/80 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
          />
          <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
            <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-gray-400 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded shadow-2xs">
              ⌘ K
            </span>
          </div>
        </div>
      </div>

      {/* Right Area: Status, Dark Mode, Notifications, User Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Supabase status badge */}
        <button
          onClick={onOpenSupabaseModal}
          className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
            isSupabaseConnected
              ? 'border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400'
              : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
          }`}
          title="Veritabanı durumu"
        >
          <span className={`w-2 h-2 rounded-full ${isSupabaseConnected ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`} />
          <span className="text-[11px] font-semibold">
            {isSupabaseConnected ? 'Supabase Canlı' : 'Yerel Veri'}
          </span>
        </button>

        {/* Quick Add Button */}
        <button
          onClick={onOpenAddModal}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Yeni Ödev</span>
        </button>

        {/* Sound toggle */}
        <button
          onClick={onToggleSound}
          className="p-2 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer"
          title={soundEnabled ? 'Ses Açık' : 'Ses Kapalı'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-blue-600" /> : <VolumeX className="w-4 h-4 text-gray-400" />}
        </button>

        {/* Dark Mode toggle (Circle like TailAdmin) */}
        <button
          onClick={onToggleDarkMode}
          className="p-2 rounded-full border border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer"
          title={darkMode ? 'Açık Mod' : 'Karanlık Mod'}
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-gray-600" />}
        </button>

        {/* Notification Bell with indicator */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="p-2 rounded-full border border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition relative cursor-pointer"
            title="Bildirimler"
          >
            <Bell className="w-4 h-4" />
            {urgentCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-gray-900" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 py-3 z-50 text-xs">
              <div className="px-4 pb-2 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <span className="font-bold text-gray-900 dark:text-white">Bekleyen Ödevler</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 text-[10px] font-semibold">
                  {pendingItems.length} ödev
                </span>
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-gray-50 dark:divide-gray-800/60">
                {pendingItems.slice(0, 5).map((hw) => (
                  <div key={hw.id} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition">
                    <p className="font-semibold text-gray-800 dark:text-gray-200 truncate">{hw.title}</p>
                    <div className="flex items-center justify-between mt-1 text-[11px] text-gray-400">
                      <span>{hw.course.replace(' 8/D', '')}</span>
                      <span className="text-amber-600 dark:text-amber-400 font-medium">{hw.displayDueDate.split(',')[0]}</span>
                    </div>
                  </div>
                ))}
                {pendingItems.length === 0 && (
                  <div className="p-6 text-center text-gray-400">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-1 opacity-70" />
                    <p>Harika! Bekleyen ödevin kalmadı.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Area (TailAdmin avatar + name + chevron) */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/70 border border-transparent hover:border-gray-200 dark:hover:border-gray-800 transition cursor-pointer"
          >
            {/* Avatar Photo / Initial */}
            <div className="w-8 h-8 rounded-full bg-linear-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              {studentName.charAt(0).toUpperCase()}
            </div>
            <div className="hidden sm:block text-left">
              <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 block leading-tight">
                {studentName}
              </span>
              <span className="text-[10px] text-gray-400 dark:text-gray-500 block leading-none">
                8/D Sınıfı
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
          </button>

          {/* Profile Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 py-2 z-50 text-xs">
              <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-800">
                <p className="font-bold text-gray-900 dark:text-white truncate">{studentName}</p>
                <p className="text-[11px] text-gray-400">Aktif Öğrenci Profili</p>
              </div>
              <button
                onClick={() => {
                  onOpenStudentModal();
                  setProfileOpen(false);
                }}
                className="w-full px-3 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2 transition"
              >
                <User className="w-3.5 h-3.5" />
                <span>Öğrenci Değiştir</span>
              </button>
              <button
                onClick={() => {
                  onOpenShareModal();
                  setProfileOpen(false);
                }}
                className="w-full px-3 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2 transition"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>İlerlemeyi Paylaş</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
