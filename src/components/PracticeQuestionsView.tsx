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
  Lightbulb
} from 'lucide-react';
import { PRACTICE_QUESTIONS, PracticeQuestion } from '../data/practiceQuestionsData';
import { SubjectType } from '../types/homework';

interface PracticeQuestionsViewProps {
  studentName: string;
  initialSubject?: SubjectType | 'ALL';
}

interface UserAnswerState {
  selectedOption?: 'A' | 'B' | 'C' | 'D';
  isSubmitted: boolean;
  isCorrect?: boolean;
}

export const PracticeQuestionsView: React.FC<PracticeQuestionsViewProps> = ({
  studentName,
  initialSubject = 'ALL',
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

  const [subjectFilter, setSubjectFilter] = useState<SubjectType | 'ALL'>(initialSubject);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'solved' | 'unsolved'>('ALL');
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});

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
    if (current?.isSubmitted) return; // Prevent changing after submission without resetting

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

    // Auto expand solution on submit
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

  // Filter questions
  const filteredQuestions = PRACTICE_QUESTIONS.filter((q) => {
    if (subjectFilter !== 'ALL' && q.subjectType !== subjectFilter) return false;
    const answer = answers[q.id];
    if (statusFilter === 'solved' && (!answer?.isSubmitted || !answer.isCorrect)) return false;
    if (statusFilter === 'unsolved' && answer?.isSubmitted && answer.isCorrect) return false;
    return true;
  });

  // Stats calculation
  const totalQuestions = PRACTICE_QUESTIONS.length;
  const englishTotal = PRACTICE_QUESTIONS.filter((q) => q.subjectType === 'ENGLISH LGS').length;
  const turkishTotal = PRACTICE_QUESTIONS.filter((q) => q.subjectType === 'TÜRKÇE').length;
  const inkilapTotal = PRACTICE_QUESTIONS.filter((q) => q.subjectType === 'İNKILAP TARİHİ').length;

  const correctAnswersCount = Object.values(answers).filter((a) => a.isSubmitted && a.isCorrect).length;
  const progressPercent = totalQuestions > 0 ? Math.round((correctAnswersCount / totalQuestions) * 100) : 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* 1. Header Card */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-lg">
                📝
              </span>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                Sınav Hata Analizi: Çözülecek Sorular Havuzu
              </h2>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-2xl">
              Öğrencinin ({studentName}) denemelerde yanlış yaptığı ya da eksik kaldığı soruları buradan doğrudan çözebilir, şıkları işaretleyerek doğru/yanlış analizini ve detaylı çözüm açıklamalarını inceleyebilirsiniz.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800/60 p-3 rounded-xl border border-gray-100 dark:border-gray-800">
            <div className="text-right">
              <p className="text-xs font-bold text-gray-900 dark:text-white">
                {correctAnswersCount} / {totalQuestions} Tamamlandı
              </p>
              <p className="text-[11px] text-gray-500">%{progressPercent} Başarı Oranı</p>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-indigo-100 dark:border-indigo-950 flex items-center justify-center font-bold text-xs text-indigo-600 dark:text-indigo-400 relative">
              %{progressPercent}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full mt-5 overflow-hidden">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Filter Bar */}
        <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Subject Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setSubjectFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                subjectFilter === 'ALL'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              Tüm Sorular ({totalQuestions})
            </button>
            <button
              type="button"
              onClick={() => setSubjectFilter('ENGLISH LGS')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                subjectFilter === 'ENGLISH LGS'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              <span>🇬🇧 İngilizce LGS</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">{englishTotal} Soru</span>
            </button>
            <button
              type="button"
              onClick={() => setSubjectFilter('TÜRKÇE')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                subjectFilter === 'TÜRKÇE'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              <span>📖 Türkçe</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">{turkishTotal} Soru</span>
            </button>
            <button
              type="button"
              onClick={() => setSubjectFilter('İNKILAP TARİHİ')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                subjectFilter === 'İNKILAP TARİHİ'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              <span>🏛️ İnkılap Tarihi</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">{inkilapTotal} Soru</span>
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

      {/* 2. Questions List */}
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
                        q.subjectType === 'ENGLISH LGS'
                          ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200/60'
                          : q.subjectType === 'TÜRKÇE'
                          ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/60'
                          : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200/60'
                      }`}>
                        {q.subjectType === 'ENGLISH LGS'
                          ? '🇬🇧 İngilizce LGS'
                          : q.subjectType === 'TÜRKÇE'
                          ? '📖 Türkçe'
                          : '🏛️ İnkılap Tarihi'}
                      </span>
                      <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                        {q.topic}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-0.5">{q.examType}</p>
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
                <div className="p-3.5 rounded-xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40">
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
                      optionClass = 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/60 ring-2 ring-indigo-500/20';
                      keyBadgeClass = 'bg-indigo-600 text-white font-bold';
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
                          ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/10'
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

                {/* Solution & Explanation Box */}
                {isSubmitted && isExpanded && (
                  <div className="mt-4 p-4 sm:p-5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 space-y-2 animate-in fade-in duration-150">
                    <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-bold text-xs">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      <span>Detaylı Soru Çözümü & Hata Analizi</span>
                    </div>
                    <div className="text-xs sm:text-[13px] text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line pl-6">
                      {q.explanation}
                    </div>
                  </div>
                )}

              </div>
            </div>
          );
        })}

        {filteredQuestions.length === 0 && (
          <div className="p-12 text-center text-gray-400 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <Sparkles className="w-8 h-8 text-indigo-500 mx-auto opacity-70 mb-2" />
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Seçilen filtreye uygun soru bulunamadı.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Filtreleri sıfırlayarak tüm soruları görebilirsiniz.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
