import React, { useState } from 'react';
import { X, User, Check, Plus, Users } from 'lucide-react';

interface StudentSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStudent: string;
  onSelectStudent: (name: string) => void;
  recentStudents: string[];
}

export const StudentSelectModal: React.FC<StudentSelectModalProps> = ({
  isOpen,
  onClose,
  currentStudent,
  onSelectStudent,
  recentStudents,
}) => {
  const [nameInput, setNameInput] = useState('');

  if (!isOpen) return null;

  const handleSaveCustomName = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    onSelectStudent(nameInput.trim());
    setNameInput('');
    onClose();
  };

  const handleQuickPick = (name: string) => {
    onSelectStudent(name);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Öğrenci Profili
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Kişisel ödev takibin kendi tarayıcında saklanır
            </p>
          </div>
        </div>

        {/* Input new student name */}
        <form onSubmit={handleSaveCustomName} className="mb-5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
            Öğrenci Adı / Takma Ad:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              required
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Örn: Ahmet, Zeynep Demir..."
              className="flex-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Kaydet</span>
            </button>
          </div>
        </form>

        {/* Saved student profiles list */}
        <div>
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-2">
            Son Kullanılan Öğrenci Profilleri:
          </label>
          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {recentStudents.map((stName) => {
              const isActive = stName.toLowerCase() === currentStudent.toLowerCase();
              return (
                <button
                  key={stName}
                  onClick={() => handleQuickPick(stName)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-750 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[11px] font-bold">
                      {stName.charAt(0).toUpperCase()}
                    </div>
                    <span>{stName}</span>
                  </div>
                  {isActive && <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-[11px] text-slate-400">
            Aynı bilgisayardan veya tabletten giren kardeşler/arkadaşlar buradan kendi isimlerini seçerek ödevlerini bağımsız olarak işaretleyebilir.
          </p>
        </div>
      </div>
    </div>
  );
};
