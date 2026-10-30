import React, { useState } from 'react';
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
  BrainCircuit
} from 'lucide-react';
import { 
  PRACTICE_QUESTIONS, 
  PracticeQuestion, 
  INSTITUTION_EXAMS,
  ExamInfo 
} from '../data/practiceQuestionsData';
import { SubjectType, InstitutionType } from '../types/homework';

interface PracticeQuestionsViewProps {
  studentName: string;
  initialSubject?: SubjectType | 'ALL';
  initialInstitution?: InstitutionType | 'aydin';
  initialExamId?: string;
  onOpenShadowTest?: (parentQuestionId?: string) => void;
}

interface UserAnswerState {
  selectedOption?: 'A' | 'B' | 'C' | 'D';
  isSubmitted: boolean;
  isCorrect?: boolean;
}

export const PracticeQuestionsView: React.FC<PracticeQuestionsViewProps> = ({
  studentName,
  initialSubject = 'ALL',
  initialInstitution = 'aydin',
  initialExamId = 'aydin-nao-lgs-deneme-2',
  onOpenShadowTest,
}) => {
  const STORAGE_KEY = `odev_takip_practice_questions_${studentName}`;

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

  // Hierarchy Navigation States
  const [selectedInstitution, setSelectedInstitution] = useState<InstitutionType>(initialInstitution);
  const [selectedExamId, setSelectedExamId] = useState<string>(initialExamId);
  const [subjectFilter, setSubjectFilter] = useState<SubjectType | 'ALL'>(initialSubject);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'solved' | 'unsolved'>('ALL');
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});
  const [expandedMicroSummaries, setExpandedMicroSummaries] = useState<Record<string, boolean>>({});

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

  const handleSubmitAnswer = (question: PracticeQuestion) => {
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

    // Auto expand solution explanation
    setExpandedSolutions((prev) => ({ ...prev, [question.id]: true }));
  };

  const handleResetQuestion = (questionId: string) => {
    const updated = { ...answers };
    delete updated[questionId];
    saveAnswers(updated);
    setExpandedSolutions((prev) => ({ ...prev, [questionId]: false }));
  };

  const toggleSolution = (questionId: string) => {
    setExpandedSolutions((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  // Current Exam Data
  const currentExam = INSTITUTION_EXAMS.find((e) => e.id === selectedExamId) || INSTITUTION_EXAMS[0];

  // Filter questions for the selected exam
  const examQuestions = PRACTICE_QUESTIONS.filter((q) => q.examId === currentExam.id);

  // Filter by subject and status
  const filteredQuestions = examQuestions.filter((q) => {
    if (subjectFilter !== 'ALL' && q.subjectType !== subjectFilter) return false;
    const answer = answers[q.id];
    if (statusFilter === 'solved' && (!answer?.isSubmitted || !answer.isCorrect)) return false;
    if (statusFilter === 'unsolved' && answer?.isSubmitted && answer.isCorrect) return false;
    return true;
  });

  // Stats calculation
  const totalInExam = examQuestions.length;
  const solvedInExam = examQuestions.filter((q) => answers[q.id]?.isSubmitted && answers[q.id]?.isCorrect).length;
  const examProgressPercent = totalInExam > 0 ? Math.round((solvedInExam / totalInExam) * 100) : 0;

  // Counts by subject in this exam
  const mathQuestions = examQuestions.filter((q) => q.subjectType === 'MATEMATİK');
  const turkishQuestions = examQuestions.filter((q) => q.subjectType === 'TÜRKÇE');
  const inkilapQuestions = examQuestions.filter((q) => q.subjectType === 'İNKILAP TARİHİ');
  const englishQuestions = examQuestions.filter((q) => q.subjectType === 'ENGLISH LGS');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* 1. Breadcrumb Hierarchy Navigator */}
      <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
        <span>Yanlış Analizi</span>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-purple-600 dark:text-purple-400 font-bold flex items-center gap-1">
          <span>🏛️</span>
          <span>Aydın Dershanesi</span>
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-gray-900 dark:text-white font-bold bg-purple-50 dark:bg-purple-950/60 px-2.5 py-0.5 rounded-full border border-purple-200/60 dark:border-purple-800/60">
          {currentExam.examName}
        </span>
      </div>

      {/* 2. Kurum Bölümü (Aydın Dershanesi) */}
      <div className="rounded-2xl border border-purple-200 dark:border-purple-900/60 bg-linear-to-r from-purple-50/70 via-white to-purple-50/30 dark:from-purple-950/40 dark:via-gray-900 dark:to-gray-900 p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <span className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center text-xl shadow-xs shadow-purple-600/20">
                🏛️
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                    Aydın Dershanesi Deneme & Hata Analizleri
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                    Kurum Bölümü
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Öğrencinin Aydın Dershanesi bünyesinde girdiği LGS deneme sınavlarının soru bazlı analizleri ve ders ders çalışma havuzu.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <div className="p-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center gap-1 text-xs">
              <button
                type="button"
                onClick={() => setSelectedInstitution('aydin')}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  selectedInstitution === 'aydin'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                }`}
              >
                <span>🏛️ Aydın Dershanesi</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">1 Sınav</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedInstitution('maya')}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  selectedInstitution === 'maya'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                }`}
              >
                <span>🏫 Maya Okulları</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sınav Seçim Sekmeleri (Deneme-1 vs Deneme-2) */}
        <div className="mt-5 pt-4 border-t border-purple-100 dark:border-purple-900/40 flex items-center gap-2 flex-wrap">
          {INSTITUTION_EXAMS.map((exam) => (
            <button
              key={exam.id}
              type="button"
              onClick={() => setSelectedExamId(exam.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                selectedExamId === exam.id
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-purple-300'
              }`}
            >
              <span>🎯 {exam.examShortTitle}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                selectedExamId === exam.id ? 'bg-white/20 text-white' : 'bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300'
              }`}>
                {exam.totalQuestions} Soru
              </span>
            </button>
          ))}
        </div>

        {/* 3. Sınav Bölümü Kartı */}
        <div className="mt-3">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-5 border border-purple-200/80 dark:border-purple-800/80 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-purple-600 text-white">
                  Sınav
                </span>
                <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
                  {currentExam.examName}
                </h3>
                <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{currentExam.date || 'Ekim 2026'}</span>
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 max-w-2xl">
                {currentExam.description}
              </p>

              {/* Subject Badges */}
              <div className="flex items-center gap-2 pt-1 flex-wrap">
                {currentExam.subjectBreakdown.map((sb) => (
                  <span
                    key={sb.subjectType}
                    className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                  >
                    <span>{sb.icon}</span>
                    <span>{sb.label}:</span>
                    <span className="text-purple-600 dark:text-purple-400 font-extrabold">{sb.count} Soru</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Exam Completion Metric */}
            <div className="flex items-center gap-3 shrink-0 bg-purple-50/60 dark:bg-purple-950/40 p-3 rounded-xl border border-purple-100 dark:border-purple-900/50">
              <div className="text-right">
                <p className="text-xs font-bold text-gray-900 dark:text-white">
                  {solvedInExam} / {totalInExam} Doğru Çözüldü
                </p>
                <p className="text-[11px] text-purple-700 dark:text-purple-300 font-medium">
                  %{examProgressPercent} Başarı Oranı
                </p>
              </div>
              <div className="w-11 h-11 rounded-full border-4 border-purple-200 dark:border-purple-900 flex items-center justify-center font-bold text-xs text-purple-600 dark:text-purple-400">
                %{examProgressPercent}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* 4. Sınav İçi Ders Ders Sekmeler & Filtreler */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-2xs space-y-3">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Subject Pills for this Exam */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-gray-400 mr-1 uppercase tracking-wider">
              Dersler:
            </span>
            
            <button
              type="button"
              onClick={() => setSubjectFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                subjectFilter === 'ALL'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              <span>📚 Tüm Dersler</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">{totalInExam} Soru</span>
            </button>

            <button
              type="button"
              onClick={() => setSubjectFilter('MATEMATİK')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                subjectFilter === 'MATEMATİK'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 hover:bg-blue-100 border border-blue-200/60'
              }`}
            >
              <span>📐 Matematik</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 font-bold">{mathQuestions.length} Soru</span>
            </button>

            <button
              type="button"
              onClick={() => setSubjectFilter('TÜRKÇE')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                subjectFilter === 'TÜRKÇE'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 hover:bg-amber-100 border border-amber-200/60'
              }`}
            >
              <span>📖 Türkçe</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 font-bold">{turkishQuestions.length} Soru</span>
            </button>

            <button
              type="button"
              onClick={() => setSubjectFilter('İNKILAP TARİHİ')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                subjectFilter === 'İNKILAP TARİHİ'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 hover:bg-rose-100 border border-rose-200/60'
              }`}
            >
              <span>🏛️ İnkılap Tarihi</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 font-bold">{inkilapQuestions.length} Soru</span>
            </button>

            <button
              type="button"
              onClick={() => setSubjectFilter('ENGLISH LGS')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                subjectFilter === 'ENGLISH LGS'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 hover:bg-indigo-100 border border-indigo-200/60'
              }`}
            >
              <span>🇬🇧 İngilizce LGS</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 font-bold">{englishQuestions.length} Soru</span>
            </button>
          </div>

          {/* Status Filter */}
          <div className="flex items-center p-0.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setStatusFilter('ALL')}
              className={`px-2.5 py-1 rounded-md transition cursor-pointer font-medium ${
                statusFilter === 'ALL'
                  ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-2xs'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Tümü
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('unsolved')}
              className={`px-2.5 py-1 rounded-md transition cursor-pointer font-medium ${
                statusFilter === 'unsolved'
                  ? 'bg-white dark:bg-gray-900 text-amber-600 dark:text-amber-400 shadow-2xs'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Çözülmeyi Bekleyen
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('solved')}
              className={`px-2.5 py-1 rounded-md transition cursor-pointer font-medium ${
                statusFilter === 'solved'
                  ? 'bg-white dark:bg-gray-900 text-emerald-600 dark:text-emerald-400 shadow-2xs'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Doğru Çözülenler
            </button>
          </div>

        </div>

      </div>

      {/* 5. Sorular Listesi */}
      <div className="space-y-6">
        {filteredQuestions.map((q) => {
          const answerState = answers[q.id];
          const isSubmitted = answerState?.isSubmitted;
          const isCorrect = answerState?.isCorrect;
          const isExpanded = expandedSolutions[q.id];

          return (
            <div
              key={q.id}
              className={`rounded-2xl border transition bg-white dark:bg-gray-900 shadow-2xs overflow-hidden ${
                isSubmitted
                  ? isCorrect
                    ? 'border-emerald-300 dark:border-emerald-800 ring-1 ring-emerald-500/10'
                    : 'border-rose-300 dark:border-rose-800 ring-1 ring-rose-500/10'
                  : 'border-gray-200 dark:border-gray-800'
              }`}
            >
              {/* Question Header */}
              <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50/40 dark:bg-gray-800/20">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-bold text-xs flex items-center justify-center border border-gray-200 dark:border-gray-700">
                    #{q.questionNumber}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        q.subjectType === 'MATEMATİK'
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/60'
                          : q.subjectType === 'ENGLISH LGS'
                          ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200/60'
                          : q.subjectType === 'TÜRKÇE'
                          ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/60'
                          : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200/60'
                      }`}>
                        {q.subjectType === 'MATEMATİK'
                          ? '📐 Matematik'
                          : q.subjectType === 'ENGLISH LGS'
                          ? '🇬🇧 İngilizce LGS'
                          : q.subjectType === 'TÜRKÇE'
                          ? '📖 Türkçe'
                          : '🏛️ İnkılap Tarihi'}
                      </span>
                      <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                        {q.topic}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      🏛️ {q.institutionName} · {q.examName}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  {isSubmitted ? (
                    isCorrect ? (
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Doğru Çözüldü</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                        <XCircle className="w-4 h-4 text-rose-600" />
                        <span>Tekrar İncele</span>
                      </span>
                    )
                  ) : (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Çözülmedi</span>
                    </span>
                  )}

                  {isSubmitted && (
                    <button
                      type="button"
                      onClick={() => handleResetQuestion(q.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
                      title="Sıfırla ve Yeniden Çöz"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Question Body */}
              <div className="p-5 sm:p-6 space-y-4">
                
                {/* SVG Vector Diagram Card */}
                {q.svgDiagram && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-inner my-2 overflow-x-auto flex flex-col items-center justify-center">
                    <div className="w-full max-w-2xl flex justify-center" dangerouslySetInnerHTML={{ __html: q.svgDiagram }} />
                    <span className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1.5">
                      <span>📐 Vektörel Şekil / Grafik Çizimi (SVG)</span>
                    </span>
                  </div>
                )}

                {/* Lead Text / Paragraph */}
                {q.leadText && (
                  <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                    {q.leadText}
                  </p>
                )}

                {/* Rules List (e.g. Harf Merdiveni) */}
                {q.rulesList && q.rulesList.length > 0 && (
                  <div className="bg-amber-50/50 dark:bg-amber-950/20 rounded-xl p-4 border border-amber-200/60 dark:border-amber-800/40 space-y-2">
                    <p className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wide">
                      Oyun / Kural Şartları:
                    </p>
                    <div className="space-y-1.5">
                      {q.rulesList.map((rule, idx) => (
                        <p key={idx} className="text-xs text-amber-950 dark:text-amber-200 leading-relaxed font-medium">
                          {rule}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Numbered Items List (e.g. Ryan's friends) */}
                {q.itemsList && q.itemsList.length > 0 && (
                  <div className="bg-gray-50/80 dark:bg-gray-800/40 rounded-xl p-4 border border-gray-100 dark:border-gray-800 space-y-2.5">
                    {q.itemsList.map((item) => (
                      <div key={item.num} className="text-xs flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-bold flex items-center justify-center shrink-0 text-[10px]">
                          {item.num}
                        </span>
                        <div>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {item.question}
                          </span>
                          <span className="ml-2 font-bold text-indigo-600 dark:text-indigo-400">
                            → {item.answer}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Bullet Points */}
                {q.bulletPoints && q.bulletPoints.length > 0 && (
                  <div className="bg-gray-50/80 dark:bg-gray-800/40 rounded-xl p-4 border border-gray-100 dark:border-gray-800 space-y-2">
                    {q.bulletPoints.map((pt, idx) => (
                      <div key={idx} className="text-xs flex items-start gap-2 text-gray-800 dark:text-gray-200">
                        <span className="text-indigo-600 font-bold mt-0.5">•</span>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Table Data (e.g. Day / Activity) */}
                {q.tableData && (
                  <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold uppercase tracking-wider">
                        <tr>
                          {q.tableData.headers.map((h, i) => (
                            <th key={i} className="py-2.5 px-4">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
                        {q.tableData.rows.map((r, i) => (
                          <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                            <td className="py-2.5 px-4 font-bold text-gray-900 dark:text-white">{r.col1}</td>
                            <td className="py-2.5 px-4 text-gray-700 dark:text-gray-300">{r.col2}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Quote Block (e.g. Hattat parçası) */}
                {q.quoteBlock && (
                  <blockquote className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 text-xs sm:text-sm text-gray-800 dark:text-gray-200 italic leading-relaxed">
                    “{q.quoteBlock}”
                  </blockquote>
                )}

                {/* Question Prompt (Bold root question) */}
                <div className="p-3.5 rounded-xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40">
                  <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white leading-relaxed">
                    {q.questionPrompt}
                  </p>
                </div>

                {/* Options List */}
                <div className="grid grid-cols-1 gap-2.5 pt-2">
                  {q.options.map((opt) => {
                    const isSelected = answerState?.selectedOption === opt.key;
                    const isCorrectAnswer = opt.key === q.correctAnswer;

                    // Option styling based on state
                    let optionClass = 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700';
                    let keyBadgeClass = 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';

                    if (isSubmitted) {
                      if (isCorrectAnswer) {
                        optionClass = 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 ring-1 ring-emerald-500';
                        keyBadgeClass = 'bg-emerald-600 text-white font-bold';
                      } else if (isSelected && !isCorrect) {
                        optionClass = 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100 ring-1 ring-rose-500';
                        keyBadgeClass = 'bg-rose-600 text-white font-bold';
                      } else {
                        optionClass = 'border-gray-200 dark:border-gray-800 opacity-60';
                      }
                    } else if (isSelected) {
                      optionClass = 'border-purple-600 bg-purple-50/70 dark:bg-purple-950/60 ring-2 ring-purple-500/20';
                      keyBadgeClass = 'bg-purple-600 text-white font-bold';
                    }

                    return (
                      <button
                        key={opt.key}
                        type="button"
                        disabled={isSubmitted}
                        onClick={() => handleSelectOption(q.id, opt.key)}
                        className={`w-full p-3 sm:p-3.5 rounded-xl border text-left flex items-start gap-3 transition cursor-pointer disabled:cursor-default ${optionClass}`}
                      >
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${keyBadgeClass}`}>
                          {opt.key}
                        </span>
                        <span className="text-xs sm:text-sm font-medium leading-relaxed pt-0.5">
                          {opt.text}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Action Buttons & Feedback */}
                <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {!isSubmitted ? (
                    <button
                      type="button"
                      disabled={!answerState?.selectedOption}
                      onClick={() => handleSubmitAnswer(q)}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                        answerState?.selectedOption
                          ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/10'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <span>Cevabı Kontrol Et</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleSolution(q.id)}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition cursor-pointer flex items-center gap-1.5"
                      >
                        <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                        <span>{isExpanded ? 'Açıklamayı Gizle' : 'Çözüm Açıklamasını Göster'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleResetQuestion(q.id)}
                        className="px-3 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition cursor-pointer"
                      >
                        Yeniden Çöz
                      </button>
                    </div>
                  )}

                  {isSubmitted && (
                    <div className="text-xs font-bold">
                      {isCorrect ? (
                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Tebrikler! Doğru Seçenek: {q.correctAnswer}</span>
                        </span>
                      ) : (
                        <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
                          <XCircle className="w-4 h-4" />
                          <span>Yanıtınız: {answerState?.selectedOption} · Doğru Seçenek: {q.correctAnswer}</span>
                        </span>
                      )}
                    </div>
                  )}
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

                {/* Solution & Explanation Box */}
                {isSubmitted && isExpanded && (
                  <div className="mt-4 p-4 sm:p-5 rounded-xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50 space-y-2 animate-in fade-in duration-150">
                    <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300 font-bold text-xs">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      <span>Detaylı Soru Çözümü & Hata Analizi</span>
                    </div>
                    <div className="text-xs sm:text-[13px] text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line pl-6">
                      {q.explanation}
                    </div>
                  </div>
                )}

                {/* Parallel Shadow Questions Callout */}
                {onOpenShadowTest && (
                  <div className="mt-4 pt-3.5 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-purple-50/50 dark:bg-purple-950/20 p-3.5 rounded-xl border border-purple-100 dark:border-purple-900/40">
                    <div className="flex items-center gap-2 text-xs text-purple-900 dark:text-purple-200">
                      <BrainCircuit className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                      <span>
                        Bu sorunun MEB kazanımını pekiştirmek için <strong>2 adet Gölge Soru</strong> hazırlandı.
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenShadowTest(q.id)}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs shrink-0"
                    >
                      <span>2 Gölge Soruyu Çöz</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

              </div>
            </div>
          );
        })}

        {filteredQuestions.length === 0 && (
          <div className="p-12 text-center text-gray-400 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <Sparkles className="w-8 h-8 text-purple-500 mx-auto opacity-70 mb-2" />
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Seçilen derste soru bulunamadı.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              "Tüm Dersler" sekmesine tıklayarak tüm soruları görebilirsiniz.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
