import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  Header 
} from './components/Header';
import { 
  ProgressBar 
} from './components/ProgressBar';
import { 
  HomeworkFilters, 
  StatusFilter, 
  SortOption,
  ViewMode 
} from './components/HomeworkFilters';
import { 
  HomeworkCard 
} from './components/HomeworkCard';
import { 
  HomeworkDataTable 
} from './components/HomeworkDataTable';
import { 
  TimelineSection 
} from './components/TimelineSection';
import { 
  ShareModal 
} from './components/ShareModal';
import { 
  AddHomeworkModal 
} from './components/AddHomeworkModal';
import { 
  StudentSelectModal 
} from './components/StudentSelectModal';
import { 
  StudyTimerModal 
} from './components/StudyTimerModal';
import { 
  GitHubSyncModal 
} from './components/GitHubSyncModal';
import { 
  SupabaseSetupModal 
} from './components/SupabaseSetupModal';
import { 
  PrintView 
} from './components/PrintView';
import { INITIAL_HOMEWORK } from './data/initialHomework';
import { 
  loadHomeworkFromGitHub, 
  getGitHubConfig, 
  saveHomeworkToGitHub 
} from './services/githubDatabase';
import { 
  fetchHomeworkFromSupabase, 
  addHomeworkToSupabase, 
  deleteHomeworkFromSupabase, 
  subscribeToHomeworkChanges 
} from './services/supabaseClient';
import { HomeworkItem, SubjectType, StudentProgress } from './types/homework';
import { 
  getActiveStudentName, 
  setActiveStudentName, 
  getRecentStudents, 
  loadStudentProgress, 
  saveStudentProgress,
  loadCustomHomework,
  saveCustomHomework,
  getSoundPreference,
  setSoundPreference
} from './utils/storage';
import { playCompleteSound, playCelebrationSound } from './utils/sound';
import { getUrgencyInfo, getTimelineBucket } from './utils/dateUtils';
import { CheckCircle2, Inbox, Sparkles, AlertTriangle } from 'lucide-react';

export default function App() {
  // Student state
  const [studentName, setStudentName] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlStudent = params.get('ogrenci') || params.get('student');
      if (urlStudent) {
        setActiveStudentName(urlStudent);
        return urlStudent;
      }
    }
    return getActiveStudentName();
  });

  const [recentStudents, setRecentStudents] = useState<string[]>(getRecentStudents);

  // Homework state: base items (from GitHub or initial) + custom items
  const [baseHomework, setBaseHomework] = useState<HomeworkItem[]>(INITIAL_HOMEWORK);
  const [customHomework, setCustomHomework] = useState<HomeworkItem[]>(loadCustomHomework);
  const [isSyncingGitHub, setIsSyncingGitHub] = useState(false);

  // Student progress state
  const [progress, setProgress] = useState<StudentProgress>(() =>
    loadStudentProgress(studentName)
  );

  // UI preferences
  const [soundEnabled, setSoundEnabled] = useState<boolean>(getSoundPreference);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('odev_takip_dark_mode');
      if (saved !== null) return saved === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Modals
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [timerModalOpen, setTimerModalOpen] = useState(false);
  const [gitHubModalOpen, setGitHubModalOpen] = useState(false);
  const [supabaseModalOpen, setSupabaseModalOpen] = useState(false);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);

  // Load homework: First check Supabase Realtime DB, fallback to GitHub/local
  useEffect(() => {
    fetchHomeworkFromSupabase().then((res) => {
      if (res.fromSupabase && res.items.length > 0) {
        setBaseHomework(res.items);
        setIsSupabaseConnected(true);
      } else {
        setIsSupabaseConnected(false);
        loadHomeworkFromGitHub().then((result) => {
          if (result.items && result.items.length > 0) {
            setBaseHomework(result.items);
          }
        });
      }
    });

    // Real-time subscription to Supabase changes
    const unsubscribe = subscribeToHomeworkChanges(() => {
      fetchHomeworkFromSupabase().then((res) => {
        if (res.fromSupabase && res.items.length > 0) {
          setBaseHomework(res.items);
        }
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleRefreshFromGitHub = async () => {
    setIsSyncingGitHub(true);
    try {
      const res = await fetchHomeworkFromSupabase();
      if (res.fromSupabase && res.items.length > 0) {
        setBaseHomework(res.items);
        setIsSupabaseConnected(true);
      } else {
        const result = await loadHomeworkFromGitHub();
        if (result.items && result.items.length > 0) {
          setBaseHomework(result.items);
        }
      }
    } finally {
      setIsSyncingGitHub(false);
    }
  };

  // Filters, Sorting & View Mode
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('pending');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('dueDateAsc');
  const [viewMode, setViewMode] = useState<ViewMode>('timeline');

  // Synchronize dark mode class on document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('odev_takip_dark_mode', String(darkMode));
  }, [darkMode]);

  // When studentName changes, load their progress
  useEffect(() => {
    const loaded = loadStudentProgress(studentName);
    setProgress(loaded);
    setRecentStudents(getRecentStudents());
  }, [studentName]);

  // Save progress on change
  useEffect(() => {
    saveStudentProgress(progress);
  }, [progress]);

  // Save custom homework on change
  useEffect(() => {
    saveCustomHomework(customHomework);
  }, [customHomework]);

  // Merge base homework with custom homework and progress
  const allHomeworkList: HomeworkItem[] = useMemo(() => {
    const baseList = [...baseHomework, ...customHomework];
    return baseList.map((item) => {
      const isCompleted = !!progress.completedTasks[item.id];
      const note = progress.personalNotes[item.id] || '';
      const updatedSubtasks = item.subtasks.map((st) => ({
        ...st,
        completed: !!progress.completedSubtasks[st.id],
      }));
      return {
        ...item,
        completed: isCompleted,
        notes: note,
        subtasks: updatedSubtasks,
      };
    });
  }, [customHomework, progress]);

  // Available unique courses for filter
  const availableSubjects = useMemo(() => {
    const subjects = new Set<string>();
    allHomeworkList.forEach((hw) => subjects.add(hw.course));
    return Array.from(subjects);
  }, [allHomeworkList]);

  // Completed & Total stats
  const completedCount = useMemo(() => {
    return allHomeworkList.filter((hw) => hw.completed).length;
  }, [allHomeworkList]);

  const totalCount = allHomeworkList.length;

  // Breakdown by Subject
  const subjectBreakdown = useMemo(() => {
    const map: Record<SubjectType, { completed: number; total: number }> = {
      'ENGLISH LGS': { completed: 0, total: 0 },
      'ENGLISH MAIN COURSE': { completed: 0, total: 0 },
      'DİN KÜLTÜRÜ': { completed: 0, total: 0 },
      'FEN BİLİMLERİ': { completed: 0, total: 0 },
      'İNKILAP TARİHİ': { completed: 0, total: 0 },
      'MATEMATİK': { completed: 0, total: 0 },
      'TÜRKÇE': { completed: 0, total: 0 },
      'DİĞER': { completed: 0, total: 0 },
    };

    allHomeworkList.forEach((hw) => {
      const type = hw.subjectType || 'DİĞER';
      if (!map[type]) map[type] = { completed: 0, total: 0 };
      map[type].total += 1;
      if (hw.completed) map[type].completed += 1;
    });

    return map;
  }, [allHomeworkList]);

  // Trigger confetti effect
  const triggerCelebration = (all = false) => {
    if (all) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 250);
    } else {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
      });
    }
  };

  // Toggle single homework completion
  const handleToggleComplete = (homeworkId: string) => {
    const isCurrentlyDone = !!progress.completedTasks[homeworkId];
    const newStatus = !isCurrentlyDone;

    // Find target homework to check if subtasks exist
    const hw = allHomeworkList.find((h) => h.id === homeworkId);
    const updatedSubtasks = { ...progress.completedSubtasks };
    if (hw) {
      hw.subtasks.forEach((st) => {
        updatedSubtasks[st.id] = newStatus;
      });
    }

    const updatedTasks = {
      ...progress.completedTasks,
      [homeworkId]: newStatus,
    };

    setProgress((prev) => ({
      ...prev,
      completedTasks: updatedTasks,
      completedSubtasks: updatedSubtasks,
    }));

    if (newStatus) {
      playCompleteSound(soundEnabled);
      // Check if all are now done
      const currentCompletedCount = Object.values(updatedTasks).filter(Boolean).length;
      if (currentCompletedCount === totalCount) {
        playCelebrationSound(soundEnabled);
        triggerCelebration(true);
      } else {
        triggerCelebration(false);
      }
    }
  };

  // Toggle subtask completion
  const handleToggleSubtask = (homeworkId: string, subtaskId: string) => {
    const currentSubStatus = !progress.completedSubtasks[subtaskId];
    const newCompletedSubtasks = {
      ...progress.completedSubtasks,
      [subtaskId]: currentSubStatus,
    };

    // Check if all subtasks of this homework are completed
    const hw = allHomeworkList.find((h) => h.id === homeworkId);
    let allSubDone = true;
    if (hw) {
      for (const st of hw.subtasks) {
        const isDone = st.id === subtaskId ? currentSubStatus : !!newCompletedSubtasks[st.id];
        if (!isDone) {
          allSubDone = false;
          break;
        }
      }
    }

    const newCompletedTasks = {
      ...progress.completedTasks,
      [homeworkId]: allSubDone,
    };

    setProgress((prev) => ({
      ...prev,
      completedSubtasks: newCompletedSubtasks,
      completedTasks: newCompletedTasks,
    }));

    if (currentSubStatus) {
      playCompleteSound(soundEnabled);
      if (allSubDone) {
        triggerCelebration(false);
      }
    }
  };

  // Update personal note
  const handleUpdateNote = (homeworkId: string, note: string) => {
    setProgress((prev) => ({
      ...prev,
      personalNotes: {
        ...prev.personalNotes,
        [homeworkId]: note,
      },
    }));
  };

  // Add custom homework (saved to Supabase & local)
  const handleAddHomework = (newItem: HomeworkItem) => {
    setCustomHomework((prev) => [newItem, ...prev]);
    // Sync with Supabase
    addHomeworkToSupabase(newItem).catch((err) =>
      console.warn('Supabase insert fallback:', err)
    );
  };

  // Delete custom homework
  const handleDeleteCustom = (id: string) => {
    if (window.confirm('Bu ödevi listeden silmek istediğinize emin misiniz?')) {
      setCustomHomework((prev) => prev.filter((h) => h.id !== id));
      // Sync with Supabase
      deleteHomeworkFromSupabase(id).catch((err) =>
        console.warn('Supabase delete fallback:', err)
      );
      setProgress((prev) => {
        const copyTasks = { ...prev.completedTasks };
        delete copyTasks[id];
        return { ...prev, completedTasks: copyTasks };
      });
    }
  };

  // Reset all progress
  const handleResetProgress = () => {
    if (window.confirm(`${studentName} profili için tüm işaretlemeleri sıfırlamak istiyor musunuz?`)) {
      setProgress({
        studentName,
        completedTasks: {},
        completedSubtasks: {},
        personalNotes: {},
        lastUpdated: new Date().toISOString(),
      });
    }
  };

  // Complete all homeworks
  const handleCompleteAll = () => {
    const allTasks: Record<string, boolean> = {};
    const allSubs: Record<string, boolean> = {};

    allHomeworkList.forEach((hw) => {
      allTasks[hw.id] = true;
      hw.subtasks.forEach((st) => {
        allSubs[st.id] = true;
      });
    });

    setProgress((prev) => ({
      ...prev,
      completedTasks: allTasks,
      completedSubtasks: allSubs,
    }));

    playCelebrationSound(soundEnabled);
    triggerCelebration(true);
  };

  // Switch student profile
  const handleSelectStudent = (name: string) => {
    setActiveStudentName(name);
    setStudentName(name);
  };

  // Sound toggle
  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    setSoundPreference(next);
  };

  // Filter & Sort computation
  const filteredAndSortedList = useMemo(() => {
    let list = [...allHomeworkList];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((hw) => {
        return (
          hw.title.toLowerCase().includes(q) ||
          hw.topic.toLowerCase().includes(q) ||
          hw.course.toLowerCase().includes(q) ||
          hw.teacher.toLowerCase().includes(q) ||
          hw.description.toLowerCase().includes(q) ||
          (hw.booksAndPages && hw.booksAndPages.some((b) => b.toLowerCase().includes(q))) ||
          hw.subtasks.some((st) => st.title.toLowerCase().includes(q))
        );
      });
    }

    // Status filter
    if (statusFilter === 'pending') {
      list = list.filter((hw) => !hw.completed);
    } else if (statusFilter === 'completed') {
      list = list.filter((hw) => hw.completed);
    } else if (statusFilter === 'urgent') {
      list = list.filter((hw) => {
        const u = getUrgencyInfo(hw.dueDate);
        return u.status === 'today' || u.status === 'tomorrow' || u.status === 'expired';
      });
    }

    // Subject filter
    if (subjectFilter !== 'all') {
      list = list.filter((hw) => hw.course === subjectFilter);
    }

    // Sorting
    list.sort((a, b) => {
      if (sortBy === 'dueDateAsc') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      if (sortBy === 'dueDateDesc') {
        return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      }
      if (sortBy === 'status') {
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1;
        }
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      if (sortBy === 'courseAsc') {
        return a.course.localeCompare(b.course, 'tr');
      }
      return 0;
    });

    return list;
  }, [allHomeworkList, searchQuery, statusFilter, subjectFilter, sortBy]);

  // Filter counts
  const counts = useMemo(() => {
    let pending = 0;
    let completed = 0;
    let urgent = 0;

    allHomeworkList.forEach((hw) => {
      if (hw.completed) completed++;
      else pending++;

      const u = getUrgencyInfo(hw.dueDate);
      if (u.status === 'today' || u.status === 'tomorrow' || u.status === 'expired') {
        urgent++;
      }
    });

    return {
      all: allHomeworkList.length,
      pending,
      completed,
      urgent,
    };
  }, [allHomeworkList]);

  // Timeline Buckets grouping from filteredAndSortedList
  const timelineBuckets = useMemo(() => {
    const urgent: HomeworkItem[] = [];
    const monday: HomeworkItem[] = [];
    const later: HomeworkItem[] = [];
    const completed: HomeworkItem[] = [];

    filteredAndSortedList.forEach((hw) => {
      if (hw.completed) {
        completed.push(hw);
      } else {
        const bucket = getTimelineBucket(hw.dueDate, false);
        if (bucket === 'urgent') urgent.push(hw);
        else if (bucket === 'monday') monday.push(hw);
        else later.push(hw);
      }
    });

    return { urgent, monday, later, completed };
  }, [filteredAndSortedList]);

  return (
    <div className="min-h-screen bg-slate-100/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors font-sans antialiased selection:bg-blue-500 selection:text-white">
      {/* Top Header */}
      <Header
        studentName={studentName}
        onOpenStudentModal={() => setStudentModalOpen(true)}
        onOpenShareModal={() => setShareModalOpen(true)}
        onOpenAddModal={() => setAddModalOpen(true)}
        onOpenTimerModal={() => setTimerModalOpen(true)}
        onOpenGitHubModal={() => setGitHubModalOpen(true)}
        hasGitHubGist={!!getGitHubConfig().gistId}
        onOpenSupabaseModal={() => setSupabaseModalOpen(true)}
        isSupabaseConnected={isSupabaseConnected}
        onPrint={() => window.print()}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        completedCount={completedCount}
        totalCount={totalCount}
      />

      {/* Main Container - Focused 3xl column */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4">
        
        {/* Progress Bar & Motivation card */}
        <ProgressBar
          completedCount={completedCount}
          totalCount={totalCount}
          subjectBreakdown={subjectBreakdown}
          onResetProgress={handleResetProgress}
          onCompleteAll={handleCompleteAll}
          studentName={studentName}
        />

        {/* Filters & Search */}
        <HomeworkFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          subjectFilter={subjectFilter}
          onSubjectFilterChange={setSubjectFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          availableSubjects={availableSubjects}
          counts={counts}
        />

        {/* Homework Items: Timeline View or Flat List View */}
        {filteredAndSortedList.length > 0 ? (
          viewMode === 'timeline' ? (
            <div className="space-y-4">
              {/* 1. Urgent / Today */}
              {timelineBuckets.urgent.length > 0 && (
                <TimelineSection
                  bucket="urgent"
                  items={timelineBuckets.urgent}
                  onToggleComplete={handleToggleComplete}
                  onToggleSubtask={handleToggleSubtask}
                  onUpdateNote={handleUpdateNote}
                  onDeleteCustom={handleDeleteCustom}
                />
              )}

              {/* 2. Weekend / Monday */}
              {timelineBuckets.monday.length > 0 && (
                <TimelineSection
                  bucket="monday"
                  items={timelineBuckets.monday}
                  onToggleComplete={handleToggleComplete}
                  onToggleSubtask={handleToggleSubtask}
                  onUpdateNote={handleUpdateNote}
                  onDeleteCustom={handleDeleteCustom}
                />
              )}

              {/* 3. Later next week */}
              {timelineBuckets.later.length > 0 && (
                <TimelineSection
                  bucket="later"
                  items={timelineBuckets.later}
                  onToggleComplete={handleToggleComplete}
                  onToggleSubtask={handleToggleSubtask}
                  onUpdateNote={handleUpdateNote}
                  onDeleteCustom={handleDeleteCustom}
                />
              )}

              {/* 4. Completed Section (Collapsible) */}
              {timelineBuckets.completed.length > 0 && (
                <TimelineSection
                  bucket="completed"
                  items={timelineBuckets.completed}
                  onToggleComplete={handleToggleComplete}
                  onToggleSubtask={handleToggleSubtask}
                  onUpdateNote={handleUpdateNote}
                  onDeleteCustom={handleDeleteCustom}
                  defaultExpanded={statusFilter === 'completed' || (timelineBuckets.urgent.length === 0 && timelineBuckets.monday.length === 0 && timelineBuckets.later.length === 0)}
                />
              )}
            </div>
          ) : viewMode === 'table' ? (
            <HomeworkDataTable
              items={filteredAndSortedList}
              onToggleComplete={handleToggleComplete}
              onToggleSubtask={handleToggleSubtask}
              onUpdateNote={handleUpdateNote}
              onDeleteCustom={handleDeleteCustom}
            />
          ) : (
            <div className="space-y-3">
              {filteredAndSortedList.map((hw) => (
                <HomeworkCard
                  key={hw.id}
                  homework={hw}
                  onToggleComplete={handleToggleComplete}
                  onToggleSubtask={handleToggleSubtask}
                  onUpdateNote={handleUpdateNote}
                  onDeleteCustom={hw.isCustom ? handleDeleteCustom : undefined}
                />
              ))}
            </div>
          )
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 text-center border border-slate-200 dark:border-slate-800 shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center mb-2.5">
              <Inbox className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Bu filtrede ödev bulunamadı
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 max-w-xs mx-auto">
              Filtreleri değiştirerek veya "Tüm Liste" sekmesini seçerek ödevlerini görebilirsin.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setSubjectFilter('all');
              }}
              className="mt-3.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl cursor-pointer shadow-xs transition"
            >
              Tüm Ödevleri Göster
            </button>
          </div>
        )}

      </main>

      {/* Hidden Print Document (Rendered only on print) */}
      <PrintView homeworkList={allHomeworkList} studentName={studentName} />

      {/* Modals */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        studentName={studentName}
        completedCount={completedCount}
        totalCount={totalCount}
        homeworkList={allHomeworkList}
      />

      <AddHomeworkModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAddHomework={handleAddHomework}
      />

      <StudentSelectModal
        isOpen={studentModalOpen}
        onClose={() => setStudentModalOpen(false)}
        currentStudent={studentName}
        onSelectStudent={handleSelectStudent}
        recentStudents={recentStudents}
      />

      <StudyTimerModal
        isOpen={timerModalOpen}
        onClose={() => setTimerModalOpen(false)}
        soundEnabled={soundEnabled}
      />

      <GitHubSyncModal
        isOpen={gitHubModalOpen}
        onClose={() => setGitHubModalOpen(false)}
        homeworkList={allHomeworkList}
        onRefreshFromGitHub={handleRefreshFromGitHub}
        isSyncing={isSyncingGitHub}
      />

      <SupabaseSetupModal
        isOpen={supabaseModalOpen}
        onClose={() => setSupabaseModalOpen(false)}
        isConnected={isSupabaseConnected}
      />
    </div>
  );
}
