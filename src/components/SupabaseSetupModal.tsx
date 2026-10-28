import React, { useState } from 'react';
import { X, Database, Check, Copy, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';

interface SupabaseSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  isConnected: boolean;
}

export const SupabaseSetupModal: React.FC<SupabaseSetupModalProps> = ({
  isOpen,
  onClose,
  isConnected,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const sqlScript = `-- 1. Ödev tablosunu oluştur
CREATE TABLE IF NOT EXISTS public.homework (
  id TEXT PRIMARY KEY,
  topic TEXT NOT NULL,
  title TEXT NOT NULL,
  course TEXT NOT NULL,
  subject_type TEXT NOT NULL,
  teacher TEXT NOT NULL,
  description TEXT,
  start_date TEXT,
  due_date TEXT NOT NULL,
  display_due_date TEXT,
  books_and_pages JSONB DEFAULT '[]'::jsonb,
  subtasks JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Güvenlik İzinleri (RLS)
ALTER TABLE public.homework ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow Public Read" ON public.homework;
CREATE POLICY "Allow Public Read" ON public.homework FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow Public Insert" ON public.homework;
CREATE POLICY "Allow Public Insert" ON public.homework FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow Public Update" ON public.homework;
CREATE POLICY "Allow Public Update" ON public.homework FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow Public Delete" ON public.homework;
CREATE POLICY "Allow Public Delete" ON public.homework FOR DELETE USING (true);

-- 3. Canlı Yayın (Realtime) Aboneliği Aç
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'homework'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.homework;
  END IF;
END $$;`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Supabase Bulut NoSQL Veritabanı
              </h3>
              {isConnected ? (
                <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Bağlı & Canlı
                </span>
              ) : (
                <span className="text-[11px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded-full">
                  Tablo Kurulumu Bekleniyor
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Proje URL: <code className="font-mono text-emerald-600">pzwdxnokmpsgisnwgnbt.supabase.co</code>
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 leading-relaxed text-slate-700 dark:text-slate-300">
            <p className="font-semibold text-slate-900 dark:text-white mb-1">
              🎉 Supabase bağlantınız kod seviyesinde tamamlandı!
            </p>
            <p>
              Veritabanı tablosunu (`homework`) 1 saniyede oluşturmak için aşağıdaki SQL kodunu kopyalayıp Supabase Dashboard'daki <strong>SQL Editor</strong> alanına yapıştırıp <strong>RUN</strong> butonuna basmanız yeterlidir:
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                1-Tık Kurulum SQL Kodu:
              </span>
              <button
                onClick={handleCopy}
                className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 cursor-pointer hover:underline"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Kopyalandı!' : 'SQL Kodunu Kopyala'}</span>
              </button>
            </div>
            <pre className="p-3 bg-slate-900 text-slate-100 rounded-2xl font-mono text-[11px] leading-relaxed max-h-48 overflow-y-auto border border-slate-800 select-all">
              {sqlScript}
            </pre>
          </div>

          <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200/60 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-200 space-y-1">
            <span className="font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              SQL'i Nereye Yapıştıracaksınız?
            </span>
            <ol className="list-decimal list-inside space-y-1 text-[11px]">
              <li><a href="https://supabase.com/dashboard/project/pzwdxnokmpsgisnwgnbt/sql" target="_blank" rel="noreferrer" className="underline font-bold inline-flex items-center gap-0.5">Supabase SQL Editor'ı Açın <ExternalLink className="w-3 h-3" /></a></li>
              <li>"New Query" butonuna basın.</li>
              <li>Yukarıdaki kodu yapıştırıp sağ alttaki yeşil <strong>"Run"</strong> butonuna tıklayın.</li>
            </ol>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold cursor-pointer"
          >
            Tamam
          </button>
        </div>
      </div>
    </div>
  );
};
