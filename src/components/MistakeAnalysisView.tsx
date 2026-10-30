import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  BookOpen, 
  Search, 
  FileText, 
  Sparkles,
  ChevronRight,
  Filter,
  Check,
  X,
  Target
} from 'lucide-react';
import { MistakeItem, SubjectType, MistakeStatus } from '../types/homework';

interface MistakeAnalysisViewProps {
  studentName: string;
  mistakes: MistakeItem[];
  onAddMistake: (mistake: MistakeItem) => void;
  onUpdateMistakeStatus: (id: string, status: MistakeStatus) => void;
  onDeleteMistake: (id: string) => void;
}

const SUBJECT_OPTIONS: { type: SubjectType; label: string; icon: string; color: string }[] = [
  { type: 'MATEMATİK', label: 'Matematik', icon: '📐', color: 'blue' },
  { type: 'FEN BİLİMLERİ', label: 'Fen Bilimleri', icon: '🔬', color: 'emerald' },
  { type: 'TÜRKÇE', label: 'Türkçe', icon: '📖', color: 'amber' },
  { type: 'İNKILAP TARİHİ', label: 'İnkılap Tarihi', icon: '🏛️', color: 'rose' },
  { type: 'DİN KÜLTÜRÜ', label: 'Din Kültürü', icon: '🕌', color: 'teal' },
  { type: 'ENGLISH LGS', label: 'İngilizce LGS', icon: '🇬🇧', color: 'indigo' },
];

export const MistakeAnalysisView: React.FC<MistakeAnalysisViewProps> = ({
  studentName,
  mistakes,
  onAddMistake,
  onUpdateMistakeStatus,
  onDeleteMistake,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectType | 'ALL'>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | MistakeStatus>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  // Form states for new mistake
  const [subjectType, setSubjectType] = useState<SubjectType>('MATEMATİK');
  const [examName, setExamName] = useState('');
  const [topic, setTopic] = useState('');
  const [questionNo, setQuestionNo] = useState('');
  const [mistakeReason, setMistakeReason] = useState('');
  const [recommendedStudy, setRecommendedStudy] = useState('');
  const [recommendedBooks, setRecommendedBooks] = useState('');
  const [notes, setNotes] = useState('');

  // Filtered mistakes
  const filteredMistakes = mistakes.filter((item) => {
    if (selectedSubject !== 'ALL' && item.subjectType !== selectedSubject) return false;
    if (statusFilter !== 'ALL' && item.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTopic = item.topic.toLowerCase().includes(q);
      const matchExam = item.examName.toLowerCase().includes(q);
      const matchReason = item.mistakeReason.toLowerCase().includes(q);
      const matchStudy = item.recommendedStudy.toLowerCase().includes(q);
      if (!matchTopic && !matchExam && !matchReason && !matchStudy) return false;
    }
    return true;
  });

  // Per-subject statistics
  const subjectStats = SUBJECT_OPTIONS.map((sub) => {
    const list = mistakes.filter((m) => m.subjectType === sub.type);
    const resolved = list.filter((m) => m.status === 'resolved').length;
    const active = list.length - resolved;
    return {
      ...sub,
      total: list.length,
      resolved,
      active,
    };
  });

  const totalMistakes = mistakes.length;
  const resolvedMistakes = mistakes.filter((m) => m.status === 'resolved').length;
  const activeMistakes = totalMistakes - resolvedMistakes;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || !recommendedStudy.trim()) return;

    const newItem: MistakeItem = {
      id: `mst-${Date.now()}`,
      studentName,
      subjectType,
      examName: examName.trim() || 'LGS Deneme Sınavı',
      topic: topic.trim(),
      questionNo: questionNo.trim() || undefined,
      mistakeReason: mistakeReason.trim() || 'Kavram yanılgısı / Dikkatsizlik',
      recommendedStudy: recommendedStudy.trim(),
      recommendedBooks: recommendedBooks.trim() || undefined,
      status: 'needs_work',
      date: new Date().toISOString(),
      notes: notes.trim() || undefined,
    };

    onAddMistake(newItem);
    setModalOpen(false);

    // Reset fields
    setTopic('');
    setExamName('');
    setQuestionNo('');
    setMistakeReason('');
    setRecommendedStudy('');
    setRecommendedBooks('');
    setNotes('');
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Header Banner & Action Button */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center text-lg">
                🎯
              </span>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                LGS Sınav Yanlış Analizi & Özel Çalışma Planı
              </h2>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-2xl">
              Öğrencinin ({studentName}) girdiği deneme ve tarama sınavlarında boş veya yanlış yaptığı soruları ders bazında kaydedip, tekrar etmesi gereken konu, test ve özel çalışma adımlarını buradan takip edin.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="self-start md:self-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-2 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Yeni Yanlış / Hedef Ekle</span>
          </button>
        </div>

        {/* 3 Overview Quick Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              {totalMistakes}
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900 dark:text-white">Toplam Kayıtlı Yanlış</p>
              <p className="text-[11px] text-gray-500">Deneme ve taramalardan</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40">
            <div className="w-10 h-10 rounded-lg bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
              {activeMistakes}
            </div>
            <div>
              <p className="text-xs font-bold text-rose-700 dark:text-rose-300">Çalışılması Gereken</p>
              <p className="text-[11px] text-rose-600/80 dark:text-rose-400/80">Kavranması beklenen konular</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              {resolvedMistakes}
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">Kavrandı / Tamamlandı</p>
              <p className="text-[11px] text-emerald-600/80 dark:text-emerald-400/80">Eksikleri giderilen konular</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Ders Bazlı Kartlar (Her Ders İçin Ayrı Bölüm) */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            Derslere Göre Yanlış & Eksik Dağılımı
          </h3>
          <span className="text-xs text-gray-400">
            Ders kartına tıklayarak o derse ait eksikleri filtreleyin
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Tümü Butonu */}
          <button
            type="button"
            onClick={() => setSelectedSubject('ALL')}
            className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
              selectedSubject === 'ALL'
                ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-950/60 ring-2 ring-blue-500/10'
                : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300'
            }`}
          >
            <div className="text-xl mb-1">📚</div>
            <p className="text-xs font-bold text-gray-900 dark:text-white">Tüm Dersler</p>
            <p className="text-[11px] text-gray-500 mt-1">
              <span className="font-semibold text-rose-600">{activeMistakes}</span> aktif / {totalMistakes}
            </p>
          </button>

          {/* 6 Ana LGS Dersi */}
          {subjectStats.map((sub) => {
            const isSelected = selectedSubject === sub.type;
            return (
              <button
                key={sub.type}
                type="button"
                onClick={() => setSelectedSubject(sub.type)}
                className={`p-3.5 rounded-xl border text-left transition cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-950/60 ring-2 ring-blue-500/10'
                    : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl">{sub.icon}</span>
                  {sub.active > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
                      {sub.active} eksik
                    </span>
                  )}
                </div>
                <p className="text-xs font-bold text-gray-900 dark:text-white mt-1 truncate">
                  {sub.label}
                </p>
                <div className="flex items-center justify-between text-[11px] text-gray-400 mt-1">
                  <span>{sub.total} soru</span>
                  <span className="text-emerald-600 font-semibold">{sub.resolved} bitti</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Yanlış Listesi & İlgili Çalışmalar Tablosu */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xs overflow-hidden">
        
        {/* Table Filters & Search */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-gray-50/50 dark:bg-gray-800/30">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-900 dark:text-white">
              {selectedSubject === 'ALL' ? 'Tüm Derslerin Yanlışları' : `${selectedSubject} Yanlış Analizi`}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              {filteredMistakes.length} kayıt
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Status Segmented Buttons */}
            <div className="flex items-center p-0.5 bg-gray-200/70 dark:bg-gray-800 rounded-lg text-xs">
              <button
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
                onClick={() => setStatusFilter('needs_work')}
                className={`px-2.5 py-1 rounded-md transition cursor-pointer font-medium ${
                  statusFilter === 'needs_work'
                    ? 'bg-white dark:bg-gray-900 text-rose-600 dark:text-rose-400 shadow-2xs'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Çalışılacak
              </button>
              <button
                onClick={() => setStatusFilter('resolved')}
                className={`px-2.5 py-1 rounded-md transition cursor-pointer font-medium ${
                  statusFilter === 'resolved'
                    ? 'bg-white dark:bg-gray-900 text-emerald-600 dark:text-emerald-400 shadow-2xs'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Kavrandı
              </button>
            </div>

            {/* Quick Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Konu, sınav veya kitap ara..."
                className="pl-8 pr-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs text-gray-900 dark:text-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Mistake Items Grid / List */}
        <div className="divide-y divide-gray-100 dark:divide-gray-800/80">
          {filteredMistakes.map((item) => {
            const isResolved = item.status === 'resolved';
            const subMeta = SUBJECT_OPTIONS.find((s) => s.type === item.subjectType) || {
              label: item.subjectType,
              icon: '📝',
              color: 'gray',
            };

            return (
              <div 
                key={item.id}
                className={`p-5 transition hover:bg-gray-50/60 dark:hover:bg-gray-800/30 ${
                  isResolved ? 'bg-emerald-50/20 dark:bg-emerald-950/10 opacity-75' : ''
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  
                  {/* Left: Subject Icon, Exam & Topic */}
                  <div className="flex items-start gap-3.5 flex-1">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xl shrink-0 border border-gray-200 dark:border-gray-700">
                      {subMeta.icon}
                    </div>

                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">
                          {subMeta.label}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                          {item.examName}
                        </span>
                        {item.questionNo && (
                          <span className="text-[11px] px-2 py-0.2 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-medium">
                            {item.questionNo}
                          </span>
                        )}
                        <span className="text-gray-300 dark:text-gray-700">·</span>
                        <span className="text-[11px] text-gray-400">
                          {new Date(item.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
                        </span>
                      </div>

                      {/* Main Topic */}
                      <h4 className={`text-sm font-bold text-gray-900 dark:text-white ${isResolved ? 'line-through text-gray-500' : ''}`}>
                        {item.topic}
                      </h4>

                      {/* Mistake Reason */}
                      <div className="text-xs text-rose-600 dark:text-rose-400 font-medium flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>Hata Nedeni: {item.mistakeReason}</span>
                      </div>

                      {/* Recommended Study & Action (Öğrencinin Çalışması Gerekenler) */}
                      <div className="mt-2.5 p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700 dark:text-blue-300">
                          <Target className="w-3.5 h-3.5 text-blue-600" />
                          <span>Öğrencinin Yapması Gereken Çalışma:</span>
                        </div>
                        <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-medium pl-5">
                          {item.recommendedStudy}
                        </p>
                        {item.recommendedBooks && (
                          <div className="flex items-center gap-1.5 text-[11px] text-blue-800 dark:text-blue-200 font-semibold pl-5 pt-1">
                            <BookOpen className="w-3 h-3 opacity-70" />
                            <span>Önerilen Kaynak & Sayfalar: {item.recommendedBooks}</span>
                          </div>
                        )}
                      </div>

                      {item.notes && (
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 italic pt-1">
                          Not: "{item.notes}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right: Actions & Status Toggle */}
                  <div className="flex items-center lg:flex-col lg:items-end justify-between gap-2.5 shrink-0 pt-2 lg:pt-0">
                    {/* Status Button */}
                    <button
                      type="button"
                      onClick={() => onUpdateMistakeStatus(item.id, isResolved ? 'needs_work' : 'resolved')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer border ${
                        isResolved
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:border-emerald-500 hover:text-emerald-600'
                      }`}
                    >
                      {isResolved ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Kavrandı (Tamam)</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-3.5 h-3.5 text-amber-500" />
                          <span>Çalışılacak (Eksik)</span>
                        </>
                      )}
                    </button>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={() => onDeleteMistake(item.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition cursor-pointer"
                      title="Analiz kaydını sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}

          {filteredMistakes.length === 0 && (
            <div className="p-12 text-center text-gray-400 space-y-2">
              <Sparkles className="w-8 h-8 text-blue-500 mx-auto opacity-70" />
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Bu filtrede kayıtlı sınav yanlışı bulunamadı.
              </p>
              <p className="text-xs text-gray-400">
                Yukarıdaki "Yeni Yanlış / Hedef Ekle" butonunu kullanarak deneme sınavı hatalarını ve çalışma adımlarını ekleyebilirsiniz.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 4. Add Mistake Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="bg-white dark:bg-gray-900 rounded-2xl max-w-lg w-full p-6 border border-gray-200 dark:border-gray-800 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute right-4 top-4 p-2 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center text-xl">
                🎯
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Yeni Sınav Yanlışı & Çalışma Hedefi
                </h3>
                <p className="text-xs text-gray-500">
                  Öğrencinin boş veya yanlış bıraktığı soruyu ve eksik giderme planını kaydedin
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Subject Selection */}
              <div>
                <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                  Ders:
                </label>
                <select
                  value={subjectType}
                  onChange={(e) => setSubjectType(e.target.value as SubjectType)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium"
                >
                  {SUBJECT_OPTIONS.map((sub) => (
                    <option key={sub.type} value={sub.type}>
                      {sub.icon} {sub.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Exam Name & Question No */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                    Sınav / Deneme Adı:
                  </label>
                  <input
                    type="text"
                    value={examName}
                    onChange={(e) => setExamName(e.target.value)}
                    placeholder="Örn: Maya Kurumsal Deneme 2"
                    className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                    Soru No / Test:
                  </label>
                  <input
                    type="text"
                    value={questionNo}
                    onChange={(e) => setQuestionNo(e.target.value)}
                    placeholder="Örn: Soru 8 veya Test 3 Soru 14"
                    className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Topic */}
              <div>
                <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                  Yanlış Yapılan Konu / Başlık: *
                </label>
                <input
                  type="text"
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Örn: Üslü İfadeler - Negatif Üs ve İşaret Kuralı"
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium"
                />
              </div>

              {/* Mistake Reason */}
              <div>
                <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                  Hata Nedeni / Yanılgı:
                </label>
                <input
                  type="text"
                  value={mistakeReason}
                  onChange={(e) => setMistakeReason(e.target.value)}
                  placeholder="Örn: Parantezsiz eksi işaretini unuttu, formülü karıştırdı"
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>

              {/* Recommended Study (Öğrencinin Çalışması Gerekenler) */}
              <div>
                <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                  Öğrencinin Yapması Gereken Çalışma & Soru Hedefi: *
                </label>
                <textarea
                  required
                  rows={2}
                  value={recommendedStudy}
                  onChange={(e) => setRecommendedStudy(e.target.value)}
                  placeholder="Örn: Modül 1 sayfa 22-26 özetini çıkar, kuralları tekrar et ve 20 soru çöz."
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>

              {/* Recommended Books */}
              <div>
                <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                  Çözülmesi Gereken Kaynak Kitap & Testler:
                </label>
                <input
                  type="text"
                  value={recommendedBooks}
                  onChange={(e) => setRecommendedBooks(e.target.value)}
                  placeholder="Örn: 3 Adım Test 16-17, Startfen sf. 45-50"
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>

              {/* Personal Notes */}
              <div>
                <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                  Ek Not / Hatırlatıcı:
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Örn: Pazar gününe kadar tekrar kontrol edilecek"
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-semibold cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Hedefi Kaydet</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
