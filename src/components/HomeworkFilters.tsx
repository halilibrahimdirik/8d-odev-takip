import React from 'react';
import { 
  Search, 
  ArrowUpDown, 
  X, 
  CalendarRange, 
  ListOrdered,
  Table,
  Clock,
  CheckCircle2
} from 'lucide-react';

export type StatusFilter = 'all' | 'pending' | 'completed' | 'urgent';
export type SortOption = 'dueDateAsc' | 'dueDateDesc' | 'courseAsc' | 'status';
export type ViewMode = 'timeline' | 'table' | 'list';

interface HomeworkFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  statusFilter: StatusFilter;
  onStatusFilterChange: (s: StatusFilter) => void;
  subjectFilter: string;
  onSubjectFilterChange: (subj: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (m: ViewMode) => void;
  availableSubjects: string[];
  counts: {
    all: number;
    pending: number;
    completed: number;
    urgent: number;
  };
}

export const HomeworkFilters: React.FC<HomeworkFiltersProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  counts,
}) => {
  return (
    <div className="space-y-2.5">
      {/* Search Bar + Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Ödev, kitap veya öğretmen ara..."
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-blue-500 shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* View Mode & Sort */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0 flex-wrap">
          {/* View Mode Switcher: Timeline | Table | List */}
          <div className="flex items-center p-0.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs">
            <button
              type="button"
              onClick={() => onViewModeChange('timeline')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
                viewMode === 'timeline'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
              title="Zaman Çizelgesi"
            >
              <CalendarRange className="w-3.5 h-3.5" />
              <span>Çizelge</span>
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('table')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
              title="Notion / shadcn Veri Tablosu"
            >
              <Table className="w-3.5 h-3.5" />
              <span>Tablo</span>
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('list')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-2xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
              title="Liste Görünümü"
            >
              <ListOrdered className="w-3.5 h-3.5" />
              <span>Liste</span>
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1 px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl shadow-2xs text-xs">
            <ArrowUpDown className="w-3 h-3 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="bg-transparent border-none text-xs text-slate-700 dark:text-slate-300 focus:outline-hidden cursor-pointer"
            >
              <option value="dueDateAsc">En Yakın Tarih</option>
              <option value="status">Bekleyenler Önce</option>
              <option value="courseAsc">Ders Adı</option>
            </select>
          </div>
        </div>

      </div>

      {/* Primary 3-Segmented Tabs: Bekleyenler (Default) | Tümü | Bitenler */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onStatusFilterChange('pending')}
          className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1.5 ${
            statusFilter === 'pending'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Bekleyenler</span>
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${statusFilter === 'pending' ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold'}`}>
            {counts.pending}
          </span>
        </button>

        <button
          onClick={() => onStatusFilterChange('all')}
          className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1.5 ${
            statusFilter === 'all'
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
          }`}
        >
          <span>Tüm Liste</span>
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${statusFilter === 'all' ? 'bg-white/20 dark:bg-slate-900/20 text-white dark:text-slate-900' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold'}`}>
            {counts.all}
          </span>
        </button>

        <button
          onClick={() => onStatusFilterChange('completed')}
          className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1.5 ${
            statusFilter === 'completed'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Tamamlananlar</span>
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${statusFilter === 'completed' ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold'}`}>
            {counts.completed}
          </span>
        </button>
      </div>
    </div>
  );
};
