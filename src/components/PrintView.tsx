import React from 'react';
import { HomeworkItem } from '../types/homework';

interface PrintViewProps {
  homeworkList: HomeworkItem[];
  studentName: string;
}

export const PrintView: React.FC<PrintViewProps> = ({ homeworkList, studentName }) => {
  return (
    <div className="hidden print:block p-8 text-black bg-white max-w-4xl mx-auto font-sans">
      <div className="border-b-2 border-black pb-4 mb-6">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-black">8/D SINIFI HAFTALIK ÖDEV ÇİZELGESİ</h1>
            <p className="text-sm text-gray-700">LGS Hazırlık & Test Kitapçıkları Kontrol Listesi</p>
          </div>
          <div className="text-right text-xs">
            <p className="font-bold">Öğrenci: {studentName}</p>
            <p className="text-gray-500">Tarih: {new Date().toLocaleDateString('tr-TR')}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {homeworkList.map((hw, idx) => (
          <div key={hw.id} className="border border-gray-300 rounded-lg p-3 page-break-inside-avoid">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 border-2 border-gray-600 rounded mt-0.5" />
                <div>
                  <h3 className="font-bold text-sm">
                    {idx + 1}. {hw.course} — {hw.title}
                  </h3>
                  <p className="text-xs text-gray-600">
                    Öğretmen: {hw.teacher} | Son Teslim: {hw.displayDueDate}
                  </p>
                </div>
              </div>
              {hw.booksAndPages && (
                <div className="text-xs font-semibold text-gray-800 text-right">
                  {hw.booksAndPages.join(' | ')}
                </div>
              )}
            </div>

            <div className="mt-2 pl-7 text-xs text-gray-700 whitespace-pre-line">
              {hw.description}
            </div>

            {hw.subtasks.length > 0 && (
              <div className="mt-2 pl-7 space-y-1">
                {hw.subtasks.map((st) => (
                  <div key={st.id} className="flex items-center gap-2 text-xs text-gray-600">
                    <div className="w-3.5 h-3.5 border border-gray-400 rounded-xs" />
                    <span>{st.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 pt-4 border-t border-gray-400 flex justify-between text-xs text-gray-500">
        <p>Veli İmzası: ___________________</p>
        <p>Öğrenci İmzası: ___________________</p>
      </div>
    </div>
  );
};
