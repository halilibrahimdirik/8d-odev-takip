import React, { useState } from 'react';
import { BookOpen, Copy, Check, ChevronDown, ChevronUp, Sparkles, Backpack } from 'lucide-react';

export const BookQuickGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const guideItems = [
    {
      course: 'Türkçe',
      books: ['ZOOM Paragraf: Sayfa 51 - 56', 'SUPER 8A: Sayfa 84 - 90'],
      color: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-300/40',
      badge: 'bg-amber-500',
    },
    {
      course: 'Matematik',
      books: ['Startfen Kurumsal: 5. Hafta Çalışmaları'],
      color: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-300/40',
      badge: 'bg-blue-500',
    },
    {
      course: 'Fen Bilimleri',
      books: [
        'Çanta Soru Bankası / Kitapçığı: Sayfa 66 - 88',
        'Bumerang Haftalık Deneme: 5. Deneme',
      ],
      color: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-300/40',
      badge: 'bg-emerald-500',
    },
    {
      course: 'İngilizce',
      books: [
        'Team ELT English Ahead: Unit 3 Vocab Test & Practice Test 1-2 (sf. 57)',
        'MLJ Workbook: Pages 18 - 21',
      ],
      color: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-300/40',
      badge: 'bg-purple-500',
    },
    {
      course: 'İnkılap Tarihi',
      books: ['Prestij Yayınları (Nartest): Sayfa 39 - 44'],
      color: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-300/40',
      badge: 'bg-rose-500',
    },
    {
      course: 'Din Kültürü',
      books: [
        'Yaprak Test: Sayfa 15\'e kadar',
        'Bumerang: Sayfa 55\'e kadar',
        'Din Soru Bankası: Sayfa 25 - 36',
        'LGS Çıkmış Sorular Kitabı (Ders için çantada bulunmalı)',
      ],
      color: 'bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-300/40',
      badge: 'bg-teal-500',
    },
  ];

  const handleCopySummary = () => {
    const text = `📚 *8/D SINIFI HAFTALIK ÖDEV VE KİTAP LİSTESİ* 📚\n\n` +
      `📖 *Türkçe*: ZOOM PARAGRAF 51-56 | SUPER 8A 84-90\n` +
      `📐 *Matematik*: Startfen Kurumsal 5. Hafta\n` +
      `🔬 *Fen Bilimleri*: Çanta Soru Bankası 66-88 | Bumerang 5. Deneme\n` +
      `🇬🇧 *İngilizce*: Team ELT Unit 3 & sf 57 | MLJ Pages 18-21\n` +
      `🏛️ *İnkılap Tarihi*: Prestij Yayınları (Nartest) 39-44\n` +
      `🕌 *Din Kültürü*: Yaprak test sf 15 | Bumerang sf 55 | Soru bankası sf 25-36 | LGS Çıkmış Sorular\n\n` +
      `✅ Ödev takip linki: ${window.location.origin}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-linear-to-r from-blue-50/70 via-indigo-50/50 to-slate-50/70 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-900 rounded-3xl border border-blue-200/60 dark:border-slate-800 p-4 sm:p-5 transition-all shadow-xs">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 text-left font-bold text-slate-900 dark:text-white text-sm sm:text-base cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          <div className="w-8 h-8 rounded-xl bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Backpack className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span>Hızlı Kaynak & Sayfa Rehberi</span>
              <span className="text-[10px] font-bold uppercase bg-blue-600 text-white px-2 py-0.5 rounded-full">
                Özet
              </span>
            </div>
            <p className="text-xs font-normal text-slate-500 dark:text-slate-400">
              Hangi kitap, hangi sayfa? Çantana koyulacak tüm testler tek bakışta.
            </p>
          </div>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopySummary}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-750 transition cursor-pointer shadow-2xs"
            title="Özet kitap listesini WhatsApp için kopyala"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600 font-semibold">Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Kitap Özetini Kopyala</span>
              </>
            )}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
          >
            {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expanded Quick Guide Details */}
      {isOpen && (
        <div className="mt-4 pt-4 border-t border-blue-200/40 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {guideItems.map((item, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-2xl border ${item.color} bg-white/70 dark:bg-slate-800/60 shadow-2xs`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-2.5 h-2.5 rounded-full ${item.badge}`} />
                <span className="font-bold text-xs uppercase tracking-wide">
                  {item.course}
                </span>
              </div>
              <ul className="space-y-1.5">
                {item.books.map((book, bIdx) => (
                  <li
                    key={bIdx}
                    className="text-xs font-medium text-slate-800 dark:text-slate-200 flex items-start gap-1.5"
                  >
                    <span className="text-blue-500 font-bold">•</span>
                    <span>{book}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
