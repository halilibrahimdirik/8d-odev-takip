import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Award,
  BookOpen,
  Sparkles,
  Filter,
  ChevronDown,
  ChevronUp,
  Languages,
  ArrowRight,
  Lightbulb,
  Building2,
  Calendar,
  Layers,
  ChevronRight,
  Target,
  FileCheck2,
  BrainCircuit,
  Search
} from 'lucide-react';
import { SHADOW_QUESTIONS, ShadowQuestion } from '../data/shadowQuestionsData';
import { INSTITUTION_EXAMS, ExamInfo } from '../data/practiceQuestionsData';
import { SubjectType } from '../types/homework';

interface ShadowTestViewProps {
  studentName: string;
  initialSubject?: SubjectType | 'ALL';
  initialExamId?: string;
  targetParentQuestionId?: string | null;
  onClearTargetParent?: () => void;
  onNavigateToOriginal?: (parentQuestionId: string) => void;
}

interface UserAnswerState {
  selectedOption?: 'A' | 'B' | 'C' | 'D';
  isSubmitted: boolean;
  isCorrect?: boolean;
}

export const ShadowTestView: React.FC<ShadowTestViewProps> = ({
  studentName,
  initialSubject = 'ALL',
  initialExamId = 'aydin-nao-lgs-deneme-2',
  targetParentQuestionId,
  onClearTargetParent,
  onNavigateToOriginal,
}) => {
  const STORAGE_KEY = `odev_takip_shadow_test_${studentName}`;

  // Store student answers in localStorage
  const [answers, setAnswers] = useState<Record<string, UserAnswerState>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const [selectedExamId, setSelectedExamId] = useState<string>(initialExamId);
  const currentExam = INSTITUTION_EXAMS.find((e) => e.id === selectedExamId) || INSTITUTION_EXAMS[0];

  const [subjectFilter, setSubjectFilter] = useState<SubjectType | 'ALL'>(initialSubject);
  const [shadowIndexFilter, setShadowIndexFilter] = useState<'ALL' | 1 | 2>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'solved' | 'unsolved' | 'wrong'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});
  const [expandedMicroSummaries, setExpandedMicroSummaries] = useState<Record<string, boolean>>({});
  const [activeParentFilter, setActiveParentFilter] = useState<string | null>(targetParentQuestionId || null);

  const toggleMicro = (questionId: string) => {
    setExpandedMicroSummaries((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const saveAnswers = (newAnswers: Record<string, UserAnswerState>) => {
    setAnswers(newAnswers);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newAnswers));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectOption = (questionId: string, optionKey: 'A' | 'B' | 'C' | 'D') => {
    const current = answers[questionId];
    if (current?.isSubmitted) return;

    const updated = {
      ...answers,
      [questionId]: {
        ...current,
        selectedOption: optionKey,
        isSubmitted: false,
      },
    };
    saveAnswers(updated);
  };

  const handleSubmitAnswer = (question: ShadowQuestion) => {
    const current = answers[question.id];
    if (!current?.selectedOption) return;

    const isCorrect = current.selectedOption === question.correctAnswer;
    const updated = {
      ...answers,
      [question.id]: {
        selectedOption: current.selectedOption,
        isSubmitted: true,
        isCorrect,
      },
    };
    saveAnswers(updated);
    setExpandedSolutions((prev) => ({ ...prev, [question.id]: true }));
  };

  const handleResetQuestion = (questionId: string) => {
    const updated = { ...answers };
    delete updated[questionId];
    saveAnswers(updated);
    setExpandedSolutions((prev) => ({ ...prev, [questionId]: false }));
  };

  const handleResetAll = () => {
    if (window.confirm('Gölge testindeki tüm cevaplarınızı sıfırlamak istediğinize emin misiniz?')) {
      saveAnswers({});
      setExpandedSolutions({});
    }
  };

  const toggleSolution = (questionId: string) => {
    setExpandedSolutions((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  // Filter questions for the selected exam
  const filteredQuestions = useMemo(() => {
    return SHADOW_QUESTIONS.filter((q) => {
      if (q.examId !== currentExam.id) return false;
      if (activeParentFilter && q.parentQuestionId !== activeParentFilter) return false;
      if (subjectFilter !== 'ALL' && q.subjectType !== subjectFilter) return false;
      if (shadowIndexFilter !== 'ALL' && q.shadowIndex !== shadowIndexFilter) return false;

      const answer = answers[q.id];
      if (statusFilter === 'solved' && (!answer?.isSubmitted || !answer.isCorrect)) return false;
      if (statusFilter === 'wrong' && (!answer?.isSubmitted || answer.isCorrect)) return false;
      if (statusFilter === 'unsolved' && answer?.isSubmitted) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inTitle = q.title.toLowerCase().includes(query);
        const inLead = q.leadText?.toLowerCase().includes(query) ?? false;
        const inPrompt = q.questionPrompt.toLowerCase().includes(query);
        const inObj = q.learningObjective.toLowerCase().includes(query);
        const inParent = q.parentQuestionTitle.toLowerCase().includes(query);
        if (!inTitle && !inLead && !inPrompt && !inObj && !inParent) return false;
      }

      return true;
    });
  }, [selectedExamId, subjectFilter, shadowIndexFilter, statusFilter, searchQuery, activeParentFilter, answers]);

  // Overall statistics
  const totalQuestions = SHADOW_QUESTIONS.length;
  const submittedAnswers = Object.values(answers).filter((a) => a.isSubmitted);
  const correctCount = submittedAnswers.filter((a) => a.isCorrect).length;
  const wrongCount = submittedAnswers.filter((a) => !a.isCorrect).length;
  const progressPercent = totalQuestions > 0 ? Math.round((submittedAnswers.length / totalQuestions) * 100) : 0;
  const accuracyPercent = submittedAnswers.length > 0 ? Math.round((correctCount / submittedAnswers.length) * 100) : 0;

  // Counts by subject
  const subjectBreakdown = [
    { type: 'MATEMATİK' as SubjectType, label: 'Matematik', count: 18, color: 'blue', icon: '📐' },
    { type: 'TÜRKÇE' as SubjectType, label: 'Türkçe', count: 14, color: 'amber', icon: '📖' },
    { type: 'İNKILAP TARİHİ' as SubjectType, label: 'İnkılap Tarihi', count: 6, color: 'rose', icon: '🏛️' },
    { type: 'ENGLISH LGS' as SubjectType, label: 'İngilizce LGS', count: 4, color: 'indigo', icon: '🇬🇧' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 text-white rounded-2xl p-6 shadow-md border border-purple-500/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-extrabold bg-white/20 text-white uppercase tracking-wider backdrop-blur-sm">
                MEB LGS Ölçme & Değerlendirme Standartları
              </span>
              <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-400 text-gray-900 shadow-xs">
                42 Gölge Soru
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <BrainCircuit className="w-6 h-6 text-amber-300" />
              8.SINIF NAO LGS DENEME-2 · GÖLGE TESTİ
            </h2>
            <p className="text-purple-100 text-xs md:text-sm max-w-3xl leading-relaxed">
              Öğrencinin Aydın Dershanesi Deneme-2 sınavında karşılaştığı 21 sorunun tamamı için oluşturulmuş paralel 
              <strong> 42 adet Gölge Soru</strong>. Birebir aynı MEB kazanımı, eşdeğer mantık kurgusu ve çeldirici analizleri ile hatayı kalıcı olarak telafi edin.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleResetAll}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition flex items-center gap-1.5 cursor-pointer backdrop-blur-sm border border-white/10"
              title="Tüm cevapları sıfırla"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Testi Sıfırla</span>
            </button>
          </div>
        </div>

        {/* Progress & Stat Cards */}
        <div className="mt-6 pt-5 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10">
            <span className="text-[11px] font-medium text-purple-200 block">Tamamlanma Oranı</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-xl font-black text-white">%{progressPercent}</span>
              <span className="text-[11px] text-purple-200 font-medium">({submittedAnswers.length}/{totalQuestions})</span>
            </div>
            <div className="w-full bg-white/20 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-amber-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10">
            <span className="text-[11px] font-medium text-emerald-200 block">Doğru Cevaplar</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-xl font-black text-emerald-300">{correctCount}</span>
              <span className="text-[11px] text-emerald-200 font-medium">Soru</span>
            </div>
            <span className="text-[10px] text-purple-200 block mt-1">Başarı: %{accuracyPercent}</span>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10">
            <span className="text-[11px] font-medium text-rose-200 block">Hatalı / Yanlış</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-xl font-black text-rose-300">{wrongCount}</span>
              <span className="text-[11px] text-rose-200 font-medium">Soru</span>
            </div>
            <span className="text-[10px] text-purple-200 block mt-1">Tekrar incelenmeli</span>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10">
            <span className="text-[11px] font-medium text-amber-200 block">Soru Yapısı</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-xl font-black text-amber-300">21 × 2</span>
              <span className="text-[11px] text-amber-200 font-medium">= 42 Soru</span>
            </div>
            <span className="text-[10px] text-purple-200 block mt-1">Her orijinal soruya 2 paralel</span>
          </div>
        </div>
      </div>

      {/* Parent Filter Callout (If active) */}
      {activeParentFilter && (
        <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/60 rounded-xl p-3.5 flex items-center justify-between gap-3 text-amber-900 dark:text-amber-200">
          <div className="flex items-center gap-2 text-xs">
            <Target className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>
              Şu anda <strong>{SHADOW_QUESTIONS.find(q => q.parentQuestionId === activeParentFilter)?.parentQuestionTitle || 'Seçili Soru'}</strong> için oluşturulan <strong>2 adet Gölge Soru</strong> görüntüleniyor.
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setActiveParentFilter(null);
              onClearTargetParent?.();
            }}
            className="px-2.5 py-1 text-[11px] font-bold bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100 rounded-lg hover:bg-amber-300 transition shrink-0 cursor-pointer"
          >
            Tüm 42 Soruyu Göster
          </button>
        </div>
      )}

      {/* Subject Filter Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        <button
          type="button"
          onClick={() => setSubjectFilter('ALL')}
          className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
            subjectFilter === 'ALL'
              ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
              : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:border-purple-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold">Tüm Dersler</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
              subjectFilter === 'ALL' ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}>
              42 Soru
            </span>
          </div>
          <span className="text-[11px] opacity-80 mt-1">Tüm gölge sorular</span>
        </button>

        {subjectBreakdown.map((sub) => {
          const isSelected = subjectFilter === sub.type;
          const subQuestions = SHADOW_QUESTIONS.filter((q) => q.subjectType === sub.type);
          const solvedInSub = subQuestions.filter((q) => answers[q.id]?.isSubmitted && answers[q.id]?.isCorrect).length;

          return (
            <button
              key={sub.type}
              type="button"
              onClick={() => setSubjectFilter(sub.type)}
              className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white shadow-sm'
                  : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold flex items-center gap-1.5">
                  <span>{sub.icon}</span>
                  <span>{sub.label}</span>
                </span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  isSelected ? 'bg-white/20 dark:bg-gray-900/20' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}>
                  {sub.count} Soru
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] opacity-80 mt-1">
                <span>Başarı:</span>
                <span className="font-semibold">{solvedInSub}/{sub.count}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-gray-900 p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-gray-500 font-medium flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Filtreler:
          </span>

          {/* Gölge 1 / 2 Seçimi */}
          <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-0.5 bg-gray-50 dark:bg-gray-800">
            <button
              type="button"
              onClick={() => setShadowIndexFilter('ALL')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer ${
                shadowIndexFilter === 'ALL'
                  ? 'bg-white dark:bg-gray-900 text-purple-700 dark:text-purple-300 shadow-xs'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Tüm Gölgeler
            </button>
            <button
              type="button"
              onClick={() => setShadowIndexFilter(1)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer ${
                shadowIndexFilter === 1
                  ? 'bg-white dark:bg-gray-900 text-purple-700 dark:text-purple-300 shadow-xs'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Gölge 1 (21 Soru)
            </button>
            <button
              type="button"
              onClick={() => setShadowIndexFilter(2)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer ${
                shadowIndexFilter === 2
                  ? 'bg-white dark:bg-gray-900 text-purple-700 dark:text-purple-300 shadow-xs'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Gölge 2 (21 Soru)
            </button>
          </div>

          {/* Durum Filtresi */}
          <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-0.5 bg-gray-50 dark:bg-gray-800">
            <button
              type="button"
              onClick={() => setStatusFilter('ALL')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer ${
                statusFilter === 'ALL'
                  ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-xs'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Tümü
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('unsolved')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer ${
                statusFilter === 'unsolved'
                  ? 'bg-white dark:bg-gray-900 text-amber-700 dark:text-amber-300 shadow-xs'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Çözülmeyenler
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('solved')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer ${
                statusFilter === 'solved'
                  ? 'bg-white dark:bg-gray-900 text-emerald-700 dark:text-emerald-300 shadow-xs'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Doğrular
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('wrong')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer ${
                statusFilter === 'wrong'
                  ? 'bg-white dark:bg-gray-900 text-rose-700 dark:text-rose-300 shadow-xs'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Yanlışlar
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Soru veya kazanımda ara..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Showing count */}
      <div className="flex items-center justify-between text-xs text-gray-500 px-1">
        <span>
          Toplam <strong>{filteredQuestions.length}</strong> gölge soru listeleniyor.
        </span>
        {activeParentFilter && (
          <span className="text-amber-600 dark:text-amber-400 font-semibold">
            Belirli soru filtresi etkin
          </span>
        )}
      </div>

      {/* Question Cards List */}
      <div className="space-y-6">
        {filteredQuestions.map((q, idx) => {
          const answerState = answers[q.id];
          const isSubmitted = answerState?.isSubmitted;
          const isCorrect = answerState?.isCorrect;
          const isExpanded = expandedSolutions[q.id];

          return (
            <div
              key={q.id}
              className={`bg-white dark:bg-gray-900 rounded-2xl border transition-all duration-200 shadow-xs overflow-hidden ${
                isSubmitted
                  ? isCorrect
                    ? 'border-emerald-300 dark:border-emerald-800/80 ring-1 ring-emerald-500/10'
                    : 'border-rose-300 dark:border-rose-800/80 ring-1 ring-rose-500/10'
                  : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
              }`}
            >
              {/* Question Header Card */}
              <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3 bg-gray-50/60 dark:bg-gray-850/60">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300">
                    GÖLGE {q.shadowIndex}
                  </span>

                  <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    {q.subjectType}
                  </span>

                  <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    Orijinal Soru {q.parentQuestionNumber} Paraleli
                  </span>

                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                    q.difficulty === 'Kolay'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                      : q.difficulty === 'Zor'
                      ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    {q.difficulty}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {onNavigateToOriginal && (
                    <button
                      type="button"
                      onClick={() => onNavigateToOriginal(q.parentQuestionId)}
                      className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Orijinal Soruya Git</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {isSubmitted && (
                    <button
                      type="button"
                      onClick={() => handleResetQuestion(q.id)}
                      className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
                      title="Bu soruyu sıfırla ve yeniden çöz"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Kazanım & Başlık Barı */}
              <div className="px-5 pt-4 pb-2">
                <div className="text-[11px] font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>MEB Kazanımı: {q.learningObjective}</span>
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  {q.title}
                </h3>
              </div>

              {/* Soru İçeriği */}
              <div className="p-5 space-y-4">
                {/* SVG Vector Diagram Card */}
                {q.svgDiagram && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-inner my-2 overflow-x-auto flex flex-col items-center justify-center">
                    <div className="w-full max-w-2xl flex justify-center" dangerouslySetInnerHTML={{ __html: q.svgDiagram }} />
                    <span className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1.5">
                      <span>📐 Vektörel Şekil / Grafik Çizimi (SVG)</span>
                    </span>
                  </div>
                )}

                {/* Lead Text */}
                {q.leadText && (
                  <div className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line bg-gray-50/50 dark:bg-gray-800/40 p-3.5 rounded-xl border border-gray-100 dark:border-gray-800">
                    {q.leadText}
                  </div>
                )}

                {/* Quote Block */}
                {q.quoteBlock && (
                  <blockquote className="border-l-4 border-purple-500 pl-4 py-2 my-2 italic text-sm text-gray-700 dark:text-gray-300 bg-purple-50/50 dark:bg-purple-950/20 rounded-r-xl">
                    {q.quoteBlock}
                  </blockquote>
                )}

                {/* Items List (Soru maddeleri) */}
                {q.itemsList && q.itemsList.length > 0 && (
                  <div className="space-y-1.5 my-2">
                    {q.itemsList.map((item) => (
                      <div
                        key={item.num}
                        className="text-xs sm:text-sm bg-gray-50 dark:bg-gray-800/60 p-2.5 rounded-lg flex items-start gap-2 border border-gray-100 dark:border-gray-800"
                      >
                        <span className="font-bold text-purple-600 dark:text-purple-400 min-w-[20px]">
                          {item.num}.
                        </span>
                        <div className="flex-1">
                          <span className="text-gray-700 dark:text-gray-300 font-medium">
                            {item.question}
                          </span>
                          <span className="font-bold text-gray-900 dark:text-white block mt-0.5">
                            👉 {item.answer}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Rules List (Oyun kuralları) */}
                {q.rulesList && q.rulesList.length > 0 && (
                  <div className="bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-xl p-3.5 space-y-1.5 text-xs sm:text-sm text-gray-800 dark:text-gray-200">
                    <span className="font-bold text-amber-800 dark:text-amber-300 block mb-1">
                      Kural ve Yönergeler:
                    </span>
                    {q.rulesList.map((rule, rIdx) => (
                      <div key={rIdx} className="flex items-start gap-2">
                        <span className="text-amber-600 font-bold">•</span>
                        <span>{rule}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Bullet Points */}
                {q.bulletPoints && q.bulletPoints.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-gray-700 dark:text-gray-300 pl-2">
                    {q.bulletPoints.map((bp, bpIdx) => (
                      <li key={bpIdx} className="leading-relaxed">
                        {bp}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Table Data */}
                {q.tableData && (
                  <div className="overflow-x-auto my-3">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-xs sm:text-sm border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <thead className="bg-gray-100 dark:bg-gray-800">
                        <tr>
                          {q.tableData.headers.map((h, hIdx) => (
                            <th key={hIdx} className="px-3 py-2 text-left font-bold text-gray-700 dark:text-gray-200">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
                        {q.tableData.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-gray-50 dark:hover:bg-gray-850">
                            <td className="px-3 py-2 font-semibold text-gray-900 dark:text-white">
                              {row.col1}
                            </td>
                            <td className="px-3 py-2 text-gray-700 dark:text-gray-300">
                              {row.col2}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Soru Kökü */}
                <div className="text-sm sm:text-base font-extrabold text-gray-900 dark:text-white pt-2 border-t border-gray-100 dark:border-gray-800">
                  {q.questionPrompt}
                </div>

                {/* Seçenekler (Options) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {q.options.map((opt) => {
                    const isSelected = answerState?.selectedOption === opt.key;
                    const isOptionCorrect = q.correctAnswer === opt.key;

                    let btnClass = 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-purple-300 text-gray-800 dark:text-gray-200';
                    let badgeClass = 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';

                    if (isSelected && !isSubmitted) {
                      btnClass = 'border-purple-600 bg-purple-50/70 dark:bg-purple-950/40 text-purple-900 dark:text-purple-100 ring-2 ring-purple-500/20';
                      badgeClass = 'bg-purple-600 text-white';
                    } else if (isSubmitted) {
                      if (isOptionCorrect) {
                        btnClass = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 ring-2 ring-emerald-500/30';
                        badgeClass = 'bg-emerald-600 text-white font-black';
                      } else if (isSelected && !isOptionCorrect) {
                        btnClass = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100 ring-2 ring-rose-500/30';
                        badgeClass = 'bg-rose-600 text-white font-black';
                      } else {
                        btnClass = 'border-gray-200 dark:border-gray-800 opacity-60 bg-gray-50 dark:bg-gray-850 text-gray-500';
                      }
                    }

                    return (
                      <button
                        key={opt.key}
                        type="button"
                        disabled={isSubmitted}
                        onClick={() => handleSelectOption(q.id, opt.key)}
                        className={`p-3 rounded-xl border text-left text-xs sm:text-sm font-medium flex items-start gap-2.5 transition cursor-pointer ${btnClass}`}
                      >
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition ${badgeClass}`}>
                          {opt.key}
                        </span>
                        <span className="flex-1 pt-0.5 leading-snug">{opt.text}</span>
                        {isSubmitted && isOptionCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        )}
                        {isSubmitted && isSelected && !isOptionCorrect && (
                          <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Soru Aksiyon Barı (Cevapla / Sonuç) */}
                <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    {!isSubmitted ? (
                      <button
                        type="button"
                        disabled={!answerState?.selectedOption}
                        onClick={() => handleSubmitAnswer(q)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                          answerState?.selectedOption
                            ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-xs'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <FileCheck2 className="w-4 h-4" />
                        <span>Cevabı Onayla</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        {isCorrect ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold text-xs border border-emerald-300 dark:border-emerald-800">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            Tebrikler! Doğru Cevap
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 font-bold text-xs border border-rose-300 dark:border-rose-800">
                            <XCircle className="w-4 h-4 text-rose-600" />
                            Yanlış! Doğru Şık: {q.correctAnswer}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Çözüm ve Çeldirici Analizi Toggle Butonu */}
                  <button
                    type="button"
                    onClick={() => toggleSolution(q.id)}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/60 transition flex items-center gap-1.5 cursor-pointer border border-purple-200 dark:border-purple-800"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                    <span>{isExpanded ? 'Çözümü & Çeldiricileri Gizle' : 'Çözüm & Çeldirici Analizi'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* 📌 Akılda Kalsın (Mikro Konu Özeti) - Önce kapalı sonra açılabilen */}
                {q.microSummary && (
                  <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                    <button
                      type="button"
                      onClick={() => toggleMicro(q.id)}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 hover:bg-amber-100 transition flex items-center gap-1.5 cursor-pointer border border-amber-200 dark:border-amber-800"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>{expandedMicroSummaries[q.id] ? '📌 Akılda Kalsın (Mikro Konu Özetini Gizle)' : '📌 Akılda Kalsın (Mikro Konu Özeti - Aç/Kapa)'}</span>
                      {expandedMicroSummaries[q.id] ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>

                    {expandedMicroSummaries[q.id] && (
                      <div className="mt-2 p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs sm:text-sm text-amber-950 dark:text-amber-200 font-medium leading-relaxed animate-in fade-in duration-150">
                        {q.microSummary}
                      </div>
                    )}
                  </div>
                )}

                {/* Çözüm & Çeldirici Analizi Paneli (Accordion) */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-dashed border-purple-200 dark:border-purple-800/80 space-y-4">
                    {/* Adım Adım Çözüm */}
                    <div className="bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2 text-xs font-extrabold text-emerald-800 dark:text-emerald-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>DOĞRU CEVAP VE ADIM ADIM ÇÖZÜM ANAHTARI (ŞIK: {q.correctAnswer})</span>
                      </div>
                      <div className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 whitespace-pre-line leading-relaxed font-sans">
                        {q.explanation}
                      </div>
                    </div>

                    {/* Çeldirici Analizi (Ölçme Değerlendirme Uzmanlığı) */}
                    <div className="bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3 text-xs font-extrabold text-amber-800 dark:text-amber-300">
                        <Target className="w-4 h-4 text-amber-600" />
                        <span>ÖLÇME VE DEĞERLENDİRME: ŞIKLARIN ÇELDİRİCİ ANALİZİ</span>
                      </div>
                      <p className="text-[11px] text-amber-900 dark:text-amber-200/90 mb-3">
                        Öğrencilerin bu soruda düşebileceği kavram yanılgıları, işlem hataları ve mantık tuzakları:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className={`p-2.5 rounded-lg border ${
                          q.correctAnswer === 'A' 
                            ? 'bg-emerald-100/70 dark:bg-emerald-900/30 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200' 
                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                        }`}>
                          <span className="font-black text-purple-600 dark:text-purple-400 mr-1.5">[A Şıkkı]:</span>
                          <span>{q.distractorAnalysis.A}</span>
                        </div>

                        <div className={`p-2.5 rounded-lg border ${
                          q.correctAnswer === 'B' 
                            ? 'bg-emerald-100/70 dark:bg-emerald-900/30 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200' 
                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                        }`}>
                          <span className="font-black text-purple-600 dark:text-purple-400 mr-1.5">[B Şıkkı]:</span>
                          <span>{q.distractorAnalysis.B}</span>
                        </div>

                        <div className={`p-2.5 rounded-lg border ${
                          q.correctAnswer === 'C' 
                            ? 'bg-emerald-100/70 dark:bg-emerald-900/30 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200' 
                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                        }`}>
                          <span className="font-black text-purple-600 dark:text-purple-400 mr-1.5">[C Şıkkı]:</span>
                          <span>{q.distractorAnalysis.C}</span>
                        </div>

                        <div className={`p-2.5 rounded-lg border ${
                          q.correctAnswer === 'D' 
                            ? 'bg-emerald-100/70 dark:bg-emerald-900/30 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200' 
                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                        }`}>
                          <span className="font-black text-purple-600 dark:text-purple-400 mr-1.5">[D Şıkkı]:</span>
                          <span>{q.distractorAnalysis.D}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {filteredQuestions.length === 0 && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-12 text-center border border-gray-200 dark:border-gray-800">
            <HelpCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-gray-800 dark:text-white mb-1">
              Kriterlere Uygun Gölge Soru Bulunamadı
            </h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto mb-4">
              Arama kriterlerinizi veya filtreleri temizleyerek 42 gölge sorunun tamamına ulaşabilirsiniz.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubjectFilter('ALL');
                setShadowIndexFilter('ALL');
                setStatusFilter('ALL');
                setSearchQuery('');
                setActiveParentFilter(null);
              }}
              className="px-4 py-2 bg-purple-600 text-white text-xs font-bold rounded-xl hover:bg-purple-700 transition cursor-pointer"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
