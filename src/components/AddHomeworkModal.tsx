import React, { useState } from 'react';
import { X, Plus, PlusCircle, BookOpen, User, Calendar, FileText } from 'lucide-react';
import { HomeworkItem, SubjectType, InstitutionType } from '../types/homework';

interface AddHomeworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddHomework: (item: HomeworkItem) => void;
}

export const AddHomeworkModal: React.FC<AddHomeworkModalProps> = ({
  isOpen,
  onClose,
  onAddHomework,
}) => {
  const [institution, setInstitution] = useState<InstitutionType>('maya');
  const [course, setCourse] = useState('FEN BİLİMLERİ 8/D');
  const [subjectType, setSubjectType] = useState<SubjectType>('FEN BİLİMLERİ');
  const [teacher, setTeacher] = useState('');
  const [topic, setTopic] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('23:00');
  const [books, setBooks] = useState('');
  const [subtasksInput, setSubtasksInput] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const fullDueDate = dueDate ? `${dueDate}T${dueTime}:00` : new Date(Date.now() + 3 * 86400000).toISOString();
    
    // Parse subtasks line by line
    const parsedSubtasks = subtasksInput
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((t, idx) => ({
        id: `custom-st-${Date.now()}-${idx}`,
        title: t.replace(/^[-•*]\s*/, ''),
        completed: false,
      }));

    const parsedBooks = books
      .split(',')
      .map((b) => b.trim())
      .filter(Boolean);

    // Format display date
    let displayDueDate = dueDate;
    try {
      const d = new Date(fullDueDate);
      displayDueDate = d.toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      displayDueDate = `${dueDate} ${dueTime}`;
    }

    const newItem: HomeworkItem = {
      id: `custom-hw-${Date.now()}`,
      institution,
      topic: topic || title,
      title: title.trim(),
      course: course.trim(),
      subjectType,
      teacher: teacher.trim() || 'Ders Öğretmeni',
      description: description.trim() || 'Ödev detayları yukarıda belirtilmiştir.',
      startDate: new Date().toISOString(),
      dueDate: fullDueDate,
      displayDueDate,
      booksAndPages: parsedBooks.length > 0 ? parsedBooks : undefined,
      subtasks: parsedSubtasks,
      completed: false,
      isCustom: true,
    };

    onAddHomework(newItem);
    onClose();
  };

  const handleCourseSelect = (val: string) => {
    setCourse(val);
    if (val.includes('FEN')) setSubjectType('FEN BİLİMLERİ');
    else if (val.includes('MATEMATİK')) setSubjectType('MATEMATİK');
    else if (val.includes('TÜRKÇE')) setSubjectType('TÜRKÇE');
    else if (val.includes('İNKILAP')) setSubjectType('İNKILAP TARİHİ');
    else if (val.includes('DİN')) setSubjectType('DİN KÜLTÜRÜ');
    else if (val.includes('MAIN COURSE')) setSubjectType('ENGLISH MAIN COURSE');
    else if (val.includes('ENGLISH')) setSubjectType('ENGLISH LGS');
    else setSubjectType('DİĞER');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl relative max-h-[90vh] overflow-y-auto"
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
            <PlusCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Yeni Ödev / Görev Ekle
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Listeye yeni bir ders ödevi veya LGS testi ekleyin
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Institution selector */}
          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Kurum / Kaynak:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setInstitution('maya')}
                className={`py-2 px-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  institution === 'maya'
                    ? 'bg-blue-50 dark:bg-blue-950/50 border-blue-500 text-blue-700 dark:text-blue-300 shadow-xs ring-1 ring-blue-400'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <span>🏫 Maya Okulu</span>
              </button>
              <button
                type="button"
                onClick={() => setInstitution('aydin')}
                className={`py-2 px-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  institution === 'aydin'
                    ? 'bg-purple-50 dark:bg-purple-950/50 border-purple-500 text-purple-700 dark:text-purple-300 shadow-xs ring-1 ring-purple-400'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <span>🏛️ Aydın Dershane</span>
              </button>
              <button
                type="button"
                onClick={() => setInstitution('kisisel')}
                className={`py-2 px-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  institution === 'kisisel'
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-700 dark:text-emerald-300 shadow-xs ring-1 ring-emerald-400'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <span>👤 Kişisel</span>
              </button>
            </div>
          </div>

          {/* Course selection */}
          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Ders:
            </label>
            <select
              value={course}
              onChange={(e) => handleCourseSelect(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
            >
              <option value="FEN BİLİMLERİ 8/D">FEN BİLİMLERİ 8/D</option>
              <option value="MATEMATİK 8/D">MATEMATİK 8/D</option>
              <option value="TÜRKÇE 8/D">TÜRKÇE 8/D</option>
              <option value="ENGLISH LGS 8/D">ENGLISH LGS 8/D</option>
              <option value="ENGLISH MAIN COURSE 8/D">ENGLISH MAIN COURSE 8/D</option>
              <option value="T.C. İNKILAP TARİHİ VE ATATÜRKÇÜLÜK 8/D">T.C. İNKILAP TARİHİ VE ATATÜRKÇÜLÜK 8/D</option>
              <option value="DİN KÜLTÜRÜ VE AHLAK BİLGİSİ 8/D">DİN KÜLTÜRÜ VE AHLAK BİLGİSİ 8/D</option>
              <option value="REHBERLİK & DENEME">REHBERLİK & DENEME</option>
            </select>
          </div>

          {/* Teacher and Topic */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Öğretmen (Personel):
              </label>
              <input
                type="text"
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
                placeholder="Örn: Hanife Gaye Alay"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Konu:
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Örn: Hafta sonu ödevi"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Ödev Başlığı: *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Örn: Bumerang 6. Deneme veya Paragraf Çözümü"
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          {/* Due date and time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Son Teslim Tarihi:
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Saat:
              </label>
              <input
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Books and pages */}
          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Kaynak Kitap & Sayfalar (Virgülle ayırın):
            </label>
            <input
              type="text"
              value={books}
              onChange={(e) => setBooks(e.target.value)}
              placeholder="Örn: Soru Bankası sf. 45-60, Deneme 2"
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Öğretmen Açıklaması / Talimat:
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Öğretmenin verdiği talimatı veya çözülmesi gereken soruları buraya yazın..."
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          {/* Subtasks checklist items */}
          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Alt Görevler (Her satıra bir adım):
            </label>
            <textarea
              rows={2}
              value={subtasksInput}
              onChange={(e) => setSubtasksInput(e.target.value)}
              placeholder="Sayfa 45-50 arası çöz&#10;Yanlışları kontrol et&#10;Kitabı çantaya koy"
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          {/* Submit */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold cursor-pointer"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Ödevi Ekle</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
