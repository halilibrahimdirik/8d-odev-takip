import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Share2, 
  QrCode, 
  ExternalLink, 
  MessageCircle, 
  FileText,
  Sparkles
} from 'lucide-react';
import { HomeworkItem } from '../types/homework';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  completedCount: number;
  totalCount: number;
  homeworkList: HomeworkItem[];
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  studentName,
  completedCount,
  totalCount,
  homeworkList,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [showQR, setShowQR] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href.split('?')[0] : '';
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Formatted WhatsApp message for general sharing
  const generalShareText = 
    `📚 *8/D SINIFI ÖDEV VE LGS TAKİP PORTALI*\n\n` +
    `Arkadaşlar bu haftaki tüm ödevlerimiz ve test sayfaları bu sayfada toplandı. Linke tıklayıp bitirdiğin ödevleri işaretleyebilirsin:\n\n` +
    `🔗 *Bağlantı:* ${currentUrl}\n\n` +
    `✅ Türkçe (Zoom & Super 8A)\n` +
    `✅ Matematik (Startfen Kurumsal 5. Hafta)\n` +
    `✅ Fen Bilimleri (Çanta 66-88 & Bumerang 5. Deneme)\n` +
    `✅ İngilizce (Team ELT sf. 57 & MLJ sf. 18-21)\n` +
    `✅ Din Kültürü (Yaprak Test, Bumerang sf. 55 & Din Soru Bankası)\n` +
    `✅ İnkılap Tarihi (Prestij Yayınları sf. 39-44)\n\n` +
    `Kolay gelsin herkese! 💪`;

  // Formatted personal progress message
  const personalProgressText = 
    `🎯 *8/D Ödev Takip Durumum:*\n` +
    `Öğrenci: ${studentName}\n` +
    `Tamamlanan: ${completedCount} / ${totalCount} ödev (%${percent})\n\n` +
    `Sen de kendi ödevlerini kontrol et: ${currentUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyFullText = () => {
    navigator.clipboard.writeText(generalShareText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleOpenWhatsAppGeneral = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(generalShareText)}`;
    window.open(url, '_blank');
  };

  const handleOpenWhatsAppPersonal = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(personalProgressText)}`;
    window.open(url, '_blank');
  };

  // QR Code URL via Google Chart API / quick SVG qr generator
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(currentUrl)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Share2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Ödev Listesini Paylaş
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Sınıf arkadaşlarınla, velilerle veya WhatsApp grubunda paylaş
            </p>
          </div>
        </div>

        {/* Option 1: Direct Link Copy */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Sayfa Bağlantı Linki (Paylaşılabilir URL):
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 dark:text-slate-300 font-mono select-all focus:outline-hidden"
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shrink-0 shadow-xs"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Kopyalandı</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Kopyala</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Her öğrenci bu linke kendi cihazından girip kendi adıyla ödevlerini işaretleyebilir.
            </p>
          </div>

          {/* Option 2: WhatsApp Share Buttons */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              WhatsApp Hızlı Paylaşım:
            </h4>

            <button
              onClick={handleOpenWhatsAppGeneral}
              className="w-full py-3 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition cursor-pointer active:scale-98"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Sınıf WhatsApp Grubunda Paylaş (Tüm Liste)</span>
            </button>

            <button
              onClick={handleOpenWhatsAppPersonal}
              className="w-full py-2.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>İlerlememi WhatsApp'ta Paylaş (%{percent} Bitti)</span>
            </button>
          </div>

          {/* Option 3: Full text copy for SMS / WhatsApp notice */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handleCopyFullText}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 text-xs font-medium flex items-center justify-center gap-2 cursor-pointer transition"
            >
              <FileText className="w-3.5 h-3.5 text-blue-500" />
              <span>{copiedText ? 'Metin Kopyalandı! ✅' : 'Tüm Ödev Listesini Metin Olarak Kopyala'}</span>
            </button>
          </div>

          {/* Option 4: Smartboard / Classroom QR Code */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setShowQR(!showQR)}
              className="w-full py-2 px-3 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <QrCode className="w-4 h-4 text-slate-500" />
              <span>{showQR ? 'QR Kodunu Gizle' : 'Akıllı Tahta İçin QR Kodunu Göster'}</span>
            </button>

            {showQR && (
              <div className="mt-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
                <img
                  src={qrCodeUrl}
                  alt="8/D Ödev Portalı QR Kodu"
                  className="w-44 h-44 rounded-xl bg-white p-2 shadow-xs border border-slate-200"
                />
                <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-2.5">
                  Öğrenciler telefon kamerasını tutarak doğrudan listeye ulaşabilir.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
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
