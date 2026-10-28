import React, { useState } from 'react';
import { 
  X, 
  Github, 
  Database, 
  CloudCheck, 
  RefreshCw, 
  UploadCloud, 
  Download, 
  Key, 
  ExternalLink, 
  Check, 
  Copy, 
  AlertCircle,
  HelpCircle,
  Terminal,
  Layers
} from 'lucide-react';
import { 
  getGitHubConfig, 
  saveGitHubConfig, 
  saveHomeworkToGitHub, 
  downloadHomeworkJSON,
  GitHubConfig 
} from '../services/githubDatabase';
import { HomeworkItem } from '../types/homework';

interface GitHubSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  homeworkList: HomeworkItem[];
  onRefreshFromGitHub: () => Promise<void>;
  isSyncing: boolean;
}

export const GitHubSyncModal: React.FC<GitHubSyncModalProps> = ({
  isOpen,
  onClose,
  homeworkList,
  onRefreshFromGitHub,
  isSyncing,
}) => {
  const [config, setConfig] = useState<GitHubConfig>(getGitHubConfig);
  const [tokenInput, setTokenInput] = useState(config.githubToken);
  const [gistIdInput, setGistIdInput] = useState(config.gistId);
  const [repoNameInput, setRepoNameInput] = useState(config.repoName || '8d-odev-takip');
  const [repoOwnerInput, setRepoOwnerInput] = useState(config.repoOwner || 'kullanici-adiniz');
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [activeTab, setActiveTab] = useState<'database' | 'deploy'>('database');

  if (!isOpen) return null;

  const handleSaveSettings = () => {
    const updated: GitHubConfig = {
      ...config,
      githubToken: tokenInput.trim(),
      gistId: gistIdInput.trim(),
      repoName: repoNameInput.trim(),
      repoOwner: repoOwnerInput.trim(),
    };
    setConfig(updated);
    saveGitHubConfig(updated);
    setStatusMessage({ text: 'GitHub ayarları yerel olarak kaydedildi.', type: 'info' });
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handlePushToGitHub = async () => {
    handleSaveSettings();
    setIsSaving(true);
    setStatusMessage({ text: 'GitHub NoSQL veritabanına bağlanılıyor...', type: 'info' });

    const result = await saveHomeworkToGitHub(homeworkList);
    setIsSaving(false);

    if (result.success) {
      setGistIdInput(result.gistId);
      setConfig(getGitHubConfig());
      setStatusMessage({ text: result.message, type: 'success' });
    } else {
      setStatusMessage({ text: result.message, type: 'error' });
    }
  };

  const handleDownloadJson = () => {
    downloadHomeworkJSON(homeworkList);
    setStatusMessage({ text: 'homework.json indirildi. public/data/ klasörüne ekleyip commit edebilirsiniz.', type: 'success' });
  };

  const gitCommands = 
`git init
git add .
git commit -m "8/D Ödev ve LGS Takip Portalı"
git branch -M main
git remote add origin https://github.com/${repoOwnerInput || '<kullanici-adiniz>'}/${repoNameInput || '8d-odev-takip'}.git
git push -u origin main`;

  const copyGitCommands = () => {
    navigator.clipboard.writeText(gitCommands);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
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

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 flex items-center justify-center shrink-0 shadow-md">
            <Github className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                GitHub Entegrasyonu & NoSQL Veritabanı
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ücretsiz GitHub Pages yayını ve kalıcı GitHub NoSQL bulut veritabanı
            </p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-5 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('database')}
            className={`flex-1 py-2 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'database'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-blue-500" />
            <span>GitHub NoSQL Veritabanı</span>
          </button>
          <button
            onClick={() => setActiveTab('deploy')}
            className={`flex-1 py-2 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'deploy'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-emerald-500" />
            <span>GitHub Pages ile Canlıya Alma (CI/CD)</span>
          </button>
        </div>

        {/* Feedback message banner */}
        {statusMessage && (
          <div
            className={`p-3 rounded-2xl text-xs mb-4 flex items-center gap-2 font-medium ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300'
                : statusMessage.type === 'error'
                ? 'bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-950/60 dark:text-rose-300'
                : 'bg-blue-50 text-blue-800 border border-blue-200 dark:bg-blue-950/60 dark:text-blue-300'
            }`}
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Tab 1: Database View */}
        {activeTab === 'database' && (
          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40 text-blue-900 dark:text-blue-200 space-y-1.5">
              <span className="font-bold block flex items-center gap-1">
                <Database className="w-3.5 h-3.5 text-blue-600" />
                GitHub NoSQL Bulut Veritabanı Nasıl Çalışır?
              </span>
              <p className="leading-relaxed">
                GitHub Gist API kullanılarak ödevleriniz JSON formatında tamamen ücretsiz bir NoSQL dokümanı olarak GitHub bulutunda saklanır. Farklı dağıtımlarda (re-deploy) verileriniz asla silinmez.
              </p>
            </div>

            {/* Token Input */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <Key className="w-3.5 h-3.5 text-slate-400" />
                  GitHub Personal Access Token (Yazma Yetkisi):
                </label>
                <a
                  href="https://github.com/settings/tokens/new?scopes=gist&description=8D-Odev-Takip"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
                >
                  <span>Token Oluştur (Gist yetkili)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <input
                type="password"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx (GitHub PAT)"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Token sadece tarayıcınızda saklanır. Öğretmen yeni ödev eklediğinde GitHub'a anında yazar.
              </p>
            </div>

            {/* Gist ID */}
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Bağlı GitHub NoSQL Gist ID (Opsiyonel / Otomatik):
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={gistIdInput}
                  onChange={(e) => setGistIdInput(e.target.value)}
                  placeholder="Boş bırakırsanız ilk kaydetmede otomatik oluşturulur"
                  className="flex-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                />
                {gistIdInput && (
                  <a
                    href={`https://gist.github.com/${gistIdInput}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center"
                    title="Gist JSON Sayfasını Aç"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Actions Buttons */}
            <div className="pt-2 flex flex-wrap gap-2.5">
              <button
                onClick={handlePushToGitHub}
                disabled={isSaving}
                className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer disabled:opacity-50 shadow-xs"
              >
                <UploadCloud className="w-4 h-4" />
                <span>{isSaving ? 'Kaydediliyor...' : "GitHub'a Kaydet & Eşitle"}</span>
              </button>

              <button
                onClick={onRefreshFromGitHub}
                disabled={isSyncing}
                className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>GitHub'dan Çek</span>
              </button>

              <button
                onClick={handleDownloadJson}
                className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1.5 transition cursor-pointer"
                title="homework.json indir"
              >
                <Download className="w-4 h-4" />
                <span>JSON İndir</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Deploy & CI/CD View */}
        {activeTab === 'deploy' && (
          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-200 space-y-1">
              <span className="font-bold block flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Otomatik GitHub Actions CI/CD Hazırlandı!
              </span>
              <p className="leading-relaxed">
                Projenize <code>.github/workflows/deploy.yml</code> eklendi. GitHub'a her kod gönderdiğinizde (push) sistem otomatik olarak projeyi derleyip GitHub Pages üzerinde ücretsiz olarak yayına alacaktır.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  GitHub Kullanıcı Adınız:
                </label>
                <input
                  type="text"
                  value={repoOwnerInput}
                  onChange={(e) => setRepoOwnerInput(e.target.value)}
                  placeholder="ibrahimdirik"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  GitHub Depo (Repo) Adı:
                </label>
                <input
                  type="text"
                  value={repoNameInput}
                  onChange={(e) => setRepoNameInput(e.target.value)}
                  placeholder="8d-odev-takip"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5 text-slate-400" />
                  GitHub'a Yükleme Komutları:
                </label>
                <button
                  onClick={copyGitCommands}
                  className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1 cursor-pointer hover:underline"
                >
                  {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCmd ? 'Kopyalandı!' : 'Komutları Kopyala'}</span>
                </button>
              </div>
              <pre className="p-3 bg-slate-900 text-slate-100 rounded-2xl font-mono text-[11px] leading-relaxed overflow-x-auto border border-slate-800 select-all">
                {gitCommands}
              </pre>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="font-bold text-slate-800 dark:text-slate-200 block">
                Son Adım: GitHub Pages'i Aktif Etme
              </span>
              <ol className="list-decimal list-inside space-y-1 text-slate-600 dark:text-slate-300 text-[11px]">
                <li>GitHub'da oluşturduğunuz deponun <strong>Settings</strong> (Ayarlar) sekmesine gidin.</li>
                <li>Sol menüden <strong>Pages</strong> seçeneğine tıklayın.</li>
                <li><strong>Build and deployment &gt; Source</strong> kısmında <strong>"GitHub Actions"</strong> seçeneğini seçin.</li>
                <li>Artık siteniz <code>https://{repoOwnerInput || 'kullanici'}.github.io/{repoNameInput || '8d-odev-takip'}/</code> adresinde ücretsiz ve kesintisiz yayındadır!</li>
              </ol>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold cursor-pointer"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
