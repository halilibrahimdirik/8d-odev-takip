import React, { useState, useRef, useEffect } from 'react';
import { 
  Share2, 
  Timer, 
  Printer, 
  Volume2, 
  VolumeX, 
  Moon, 
  Sun, 
  GraduationCap, 
  MoreVertical, 
  PlusCircle, 
  Github, 
  Database,
  User,
  Check
} from 'lucide-react';

interface HeaderProps {
  studentName: string;
  onOpenStudentModal: () => void;
  onOpenShareModal: () => void;
  onOpenAddModal: () => void;
  onOpenTimerModal: () => void;
  onOpenGitHubModal: () => void;
  hasGitHubGist: boolean;
  onOpenSupabaseModal: () => void;
  isSupabaseConnected: boolean;
  onPrint: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  completedCount: number;
  totalCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  studentName,
  onOpenStudentModal,
  onOpenShareModal,
  onOpenAddModal,
  onOpenTimerModal,
  onOpenGitHubModal,
  onOpenSupabaseModal,
  isSupabaseConnected,
  onPrint,
  soundEnabled,
  onToggleSound,
  darkMode,
  onToggleDarkMode,
  completedCount,
  totalCount,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        
        {/* Left: Branding */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-slate-900 dark:text-white tracking-tight">
                8/D Ödev Takip
              </span>
              <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 hidden sm:inline">
                LGS 2026-2027
              </span>
            </div>
          </div>
        </div>

        {/* Right: Key student actions + quiet tools menu */}
        <div className="flex items-center gap-2">
          
          {/* Student Profile Pill */}
          <button
            onClick={onOpenStudentModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 text-xs font-semibold transition cursor-pointer active:scale-95"
            title="Öğrenci adını değiştir"
          >
            <User className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="max-w-[100px] truncate">{studentName}</span>
          </button>

          {/* Pomodoro Focus Button */}
          <button
            onClick={onOpenTimerModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-50 hover:bg-violet-100 dark:bg-violet-950/40 dark:hover:bg-violet-900/50 text-violet-700 dark:text-violet-300 text-xs font-semibold transition cursor-pointer"
            title="25 dk LGS Odaklanma Sayacı"
          >
            <Timer className="w-3.5 h-3.5 text-violet-600" />
            <span className="hidden sm:inline">Odaklan</span>
          </button>

          {/* WhatsApp Share Button (Main CTA) */}
          <button
            onClick={onOpenShareModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition cursor-pointer active:scale-95"
            title="WhatsApp ile Paylaş"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Paylaş</span>
          </button>

          {/* Dark Mode Quick Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            title={darkMode ? 'Açık Mod' : 'Karanlık Mod'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Quiet "More / Settings" Dropdown Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              title="Daha fazla seçenek ve ayarlar"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-1.5 text-xs z-50 animate-in fade-in zoom-in-95 duration-150">
                <button
                  onClick={() => {
                    onOpenAddModal();
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer font-medium"
                >
                  <PlusCircle className="w-4 h-4 text-blue-600" />
                  <span>Yeni Ödev Ekle</span>
                </button>

                <button
                  onClick={() => {
                    onOpenSupabaseModal();
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer font-medium"
                >
                  <div className="flex items-center gap-2.5">
                    <Database className="w-4 h-4 text-emerald-600" />
                    <span>Supabase Veritabanı</span>
                  </div>
                  <span className={`w-2 h-2 rounded-full ${isSupabaseConnected ? 'bg-emerald-500' : 'bg-amber-400'}`} />
                </button>

                <button
                  onClick={() => {
                    onOpenGitHubModal();
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer font-medium"
                >
                  <Github className="w-4 h-4 text-slate-800 dark:text-white" />
                  <span>GitHub Ayarları</span>
                </button>

                <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                <button
                  onClick={() => {
                    onPrint();
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer font-medium"
                >
                  <Printer className="w-4 h-4 text-slate-500" />
                  <span>Yazdır / PDF Kaydet</span>
                </button>

                <button
                  onClick={() => {
                    onToggleSound();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer font-medium"
                >
                  <div className="flex items-center gap-2.5">
                    {soundEnabled ? (
                      <Volume2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <VolumeX className="w-4 h-4 text-slate-400" />
                    )}
                    <span>Tamamlama Sesi</span>
                  </div>
                  {soundEnabled && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
