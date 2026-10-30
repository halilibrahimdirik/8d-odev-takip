import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Check, 
  BookOpen, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  Volume2, 
  Filter,
  ArrowUpDown,
  Download
} from 'lucide-react';
import { TEEN_LIFE_VOCABULARY, VocabularyWord } from '../data/vocabularyData';

interface VocabularyStudyTableProps {
  studentName: string;
}

export const VocabularyStudyTable: React.FC<VocabularyStudyTableProps> = ({ studentName }) => {
  const STORAGE_KEY = `odev_takip_vocab_learned_${studentName}`;

  // Load learned words from localStorage
  const [learnedMap, setLearnedMap] = useState<Record<string, boolean>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'learned' | 'unlearned'>('ALL');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Toggle word learned state
  const toggleLearned = (id: string) => {
    setLearnedMap((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });
  };

  // Pronounce word using browser speech synthesis
  const speakWord = (word: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    TEEN_LIFE_VOCABULARY.forEach((w) => {
      if (w.category) set.add(w.category);
    });
    return Array.from(set).sort();
  }, []);

  // Filtered & sorted words
  const filteredWords = useMemo(() => {
    let list = TEEN_LIFE_VOCABULARY.filter((w) => {
      const isLearned = !!learnedMap[w.id];
      if (statusFilter === 'learned' && !isLearned) return false;
      if (statusFilter === 'unlearned' && isLearned) return false;
      if (categoryFilter !== 'ALL' && w.category !== categoryFilter) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const mEng = w.english.toLowerCase().includes(q);
        const mTr = w.turkish.toLowerCase().includes(q);
        const mCat = (w.category || '').toLowerCase().includes(q);
        if (!mEng && !mTr && !mCat) return false;
      }
      return true;
    });

    list.sort((a, b) => {
      return sortOrder === 'asc' 
        ? a.english.localeCompare(b.english, 'en') 
        : b.english.localeCompare(a.english, 'en');
    });

    return list;
  }, [learnedMap, statusFilter, categoryFilter, searchQuery, sortOrder]);

  const totalCount = TEEN_LIFE_VOCABULARY.length;
  const learnedCount = Object.values(learnedMap).filter(Boolean).length;
  const percentage = Math.round((learnedCount / totalCount) * 100);

  return (
    <div className="space-y-4">
      
      {/* Top Banner & Progress */}
      <div className="p-5 rounded-2xl border border-indigo-100 dark:border-indigo-950/80 bg-linear-to-r from-indigo-50/70 via-blue-50/40 to-white dark:from-indigo-950/30 dark:via-gray-900 dark:to-gray-900 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                🇬🇧
              </span>
              <h3 className="text-base font-bold text-gray-900 dark:text-white tracking-tight">
                8. Sınıf İngilizce 2. Ünite (Teen Life) Eksik Kelime Çalışma Listesi
              </h3>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              LGS sınavında ve denemelerde en çok çıkan 115+ hedef kelime ve kalıp ifade. Yanlış yapılan kelimeleri ezberleyip işaretleyin.
            </p>
          </div>

          {/* Progress Pill / Stats */}
          <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-3 rounded-xl border border-indigo-100 dark:border-gray-700 shadow-2xs">
            <div className="text-right">
              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">Ezber Durumu</div>
              <div className="text-base font-bold text-indigo-600 dark:text-indigo-400">
                {learnedCount} / {totalCount} Kelime (%{percentage})
              </div>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-indigo-100 dark:border-indigo-950 flex items-center justify-center relative">
              <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-300">
                %{percentage}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls (TailAdmin Style) */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="İngilizce kelime veya Türkçe karşılığını ara..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/60 text-xs text-gray-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          {/* Quick Filter Buttons: Tümü | Çalışılacaklar | Öğrenildi */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center p-0.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs">
              <button
                onClick={() => setStatusFilter('ALL')}
                className={`px-3 py-1.5 rounded-md transition cursor-pointer font-medium ${
                  statusFilter === 'ALL'
                    ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-2xs'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Tümü ({totalCount})
              </button>
              <button
                onClick={() => setStatusFilter('unlearned')}
                className={`px-3 py-1.5 rounded-md transition cursor-pointer font-medium ${
                  statusFilter === 'unlearned'
                    ? 'bg-white dark:bg-gray-900 text-rose-600 dark:text-rose-400 shadow-2xs'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Eksik / Çalışılacak ({totalCount - learnedCount})
              </button>
              <button
                onClick={() => setStatusFilter('learned')}
                className={`px-3 py-1.5 rounded-md transition cursor-pointer font-medium ${
                  statusFilter === 'learned'
                    ? 'bg-white dark:bg-gray-900 text-emerald-600 dark:text-emerald-400 shadow-2xs'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                Öğrenildi ({learnedCount})
              </button>
            </div>

            {/* Category Select */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-200 cursor-pointer"
            >
              <option value="ALL">Tüm Kategoriler</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Vocabulary Table (TailAdmin Basic Table Style) */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            
            {/* Table Header */}
            <thead className="bg-gray-50/70 dark:bg-gray-800/40 text-gray-500 dark:text-gray-400 font-medium border-b border-gray-200 dark:border-gray-800 select-none">
              <tr>
                <th className="py-3.5 px-4 w-12 text-center">
                  <span>Öğrenildi</span>
                </th>
                <th 
                  className="py-3.5 px-5 text-xs font-medium uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                >
                  <div className="flex items-center gap-1.5">
                    <span>İngilizce Kelime / İfade</span>
                    <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
                  </div>
                </th>
                <th className="py-3.5 px-5 text-xs font-medium uppercase tracking-wider">
                  <span>Türkçe Anlamı</span>
                </th>
                <th className="py-3.5 px-4 text-xs font-medium uppercase tracking-wider hidden sm:table-cell">
                  <span>Kategori / Tür</span>
                </th>
                <th className="py-3.5 px-4 text-xs font-medium uppercase tracking-wider hidden md:table-cell">
                  <span>Ünite</span>
                </th>
                <th className="py-3.5 px-4 w-14 text-center">
                  <span>Ses</span>
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/80">
              {filteredWords.map((item, idx) => {
                const isLearned = !!learnedMap[item.id];
                return (
                  <tr
                    key={item.id}
                    className={`transition-colors select-none ${
                      isLearned
                        ? 'bg-emerald-50/20 dark:bg-emerald-950/10 text-gray-400'
                        : 'hover:bg-gray-50/80 dark:hover:bg-gray-800/40 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => toggleLearned(item.id)}
                        className={`w-5 h-5 rounded-md flex items-center justify-center transition-all cursor-pointer mx-auto ${
                          isLearned
                            ? 'bg-emerald-600 text-white shadow-2xs'
                            : 'border border-gray-300 dark:border-gray-600 hover:border-indigo-500 bg-white dark:bg-gray-800'
                        }`}
                        title={isLearned ? 'Öğrenildi olarak işaretlendi' : 'Öğrenildi olarak işaretle'}
                      >
                        {isLearned && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>
                    </td>

                    {/* English Word */}
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-[10px] w-5 font-mono">{idx + 1}.</span>
                        <span className={`font-bold text-xs sm:text-sm tracking-tight ${
                          isLearned ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-white font-semibold'
                        }`}>
                          {item.english}
                        </span>
                      </div>
                    </td>

                    {/* Turkish Meaning */}
                    <td className="py-3.5 px-5">
                      <span className={`text-xs sm:text-sm ${
                        isLearned ? 'text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300 font-medium'
                      }`}>
                        {item.turkish}
                      </span>
                    </td>

                    {/* Category Tag */}
                    <td className="py-3.5 px-4 hidden sm:table-cell">
                      {item.category && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/50">
                          {item.category}
                        </span>
                      )}
                    </td>

                    {/* Unit Tag */}
                    <td className="py-3.5 px-4 hidden md:table-cell">
                      <span className="text-[11px] text-gray-500 dark:text-gray-400">
                        {item.unit}
                      </span>
                    </td>

                    {/* Pronounce Button */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => speakWord(item.english)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition cursor-pointer"
                        title="Telaffuzu Dinle"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </td>

                  </tr>
                );
              })}

              {filteredWords.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50 text-indigo-500" />
                    <p className="text-sm font-semibold">Arama kriterine uygun kelime bulunamadı.</p>
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
