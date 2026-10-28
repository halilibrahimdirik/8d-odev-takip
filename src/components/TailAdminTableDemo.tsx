import React, { useState } from 'react';
import { 
  ArrowUpDown, 
  MoreVertical, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  User,
  Download
} from 'lucide-react';

// 1. Tip Güvenliği İçin Güçlü Arayüz (TypeScript Interface)
export interface TableRowData {
  id: string;
  name: string;
  category: string;
  assignedTo: {
    name: string;
    avatarUrl?: string;
    role: string;
  };
  dueDate: string;
  referenceBook: string;
  status: 'active' | 'pending' | 'completed' | 'cancelled';
  progress: number;
}

// 2. Örnek Mock Veriler (Test İçin Doğrudan Hazır)
export const MOCK_TABLE_DATA: TableRowData[] = [
  {
    id: '1',
    name: 'Startfen Kurumsal 5. Hafta Testleri',
    category: 'Matematik',
    assignedTo: {
      name: 'Ülkü Tanrıverdi',
      role: 'Matematik Öğretmeni',
    },
    dueDate: '19 Ekim 2026, 08:00',
    referenceBook: 'Startfen: 5. Hafta sf. 45-52',
    status: 'pending',
    progress: 30,
  },
  {
    id: '2',
    name: 'Çanta Kitapçığı Soru Çözümü',
    category: 'Fen Bilimleri',
    assignedTo: {
      name: 'Hanife Gaye Alay',
      role: 'Fen Bilimleri Öğretmeni',
    },
    dueDate: '19 Ekim 2026, 23:00',
    referenceBook: 'Çanta Soru Bankası: sf. 66-88',
    status: 'active',
    progress: 65,
  },
  {
    id: '3',
    name: 'Team ELT - Unit 3 Vocabulary & Test',
    category: 'İngilizce LGS',
    assignedTo: {
      name: 'Şule Artık',
      role: 'İngilizce Zümresi',
    },
    dueDate: '22 Ekim 2026, 23:00',
    referenceBook: 'English Ahead Test Book sf. 57',
    status: 'completed',
    progress: 100,
  },
  {
    id: '4',
    name: 'Prestij Soru Bankası Testleri (Nartest)',
    category: 'İnkılap Tarihi',
    assignedTo: {
      name: 'Büşra Can',
      role: 'Tarih Öğretmeni',
    },
    dueDate: '19 Ekim 2026, 23:00',
    referenceBook: 'Prestij Yayınları: sf. 39-44',
    status: 'cancelled',
    progress: 0,
  },
  {
    id: '5',
    name: 'Bumerang Haftalık 5. Deneme Çözümü',
    category: 'Fen Bilimleri',
    assignedTo: {
      name: 'Hanife Gaye Alay',
      role: 'Fen Bilimleri Öğretmeni',
    },
    dueDate: '16 Ekim 2026, 23:00',
    referenceBook: 'Bumerang 5. Deneme Kitapçığı',
    status: 'completed',
    progress: 100,
  },
];

// 3. TailAdmin Tarzı Minimalist & Modern Tablo Bileşeni
export const TailAdminTableDemo: React.FC = () => {
  const [data, setData] = useState<TableRowData[]>(MOCK_TABLE_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof TableRowData>('dueDate');
  const [sortAsc, setSortAsc] = useState(true);

  // Filtreleme & Arama Mantığı
  const filteredData = data.filter((row) => {
    const matchesSearch =
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.assignedTo.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === 'all' ? true : row.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Sıralama
  const sortedData = [...filteredData].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    if (typeof valA === 'string' && typeof valB === 'string') {
      return sortAsc ? valA.localeCompare(valB, 'tr') : valB.localeCompare(valA, 'tr');
    }
    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortAsc ? valA - valB : valB - valA;
    }
    return 0;
  });

  const toggleSort = (field: keyof TableRowData) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  // TailAdmin Standart Status Rozetleri (Badges)
  const renderStatusBadge = (status: TableRowData['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Tamamlandı
          </span>
        );
      case 'active':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200/80 dark:border-blue-800/60">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Devam Ediyor
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200/80 dark:border-amber-800/60">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Beklemede
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200/80 dark:border-rose-800/60">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            İptal Edildi
          </span>
        );
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xs overflow-hidden transition-all font-sans">
      
      {/* 1. Üst Bar: Başlık, Arama ve Filtre Butonları (TailAdmin Style) */}
      <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white tracking-tight">
            Görev & Ödev Tablosu
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            TailAdmin tasarım sistemine uygun veri listeleme ve durum takibi
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Arama Kutusu */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tabloda ara..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Durum Filtresi */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs px-2.5 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 cursor-pointer focus:outline-hidden"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="completed">Tamamlandı</option>
            <option value="active">Devam Ediyor</option>
            <option value="pending">Beklemede</option>
            <option value="cancelled">İptal Edildi</option>
          </select>
        </div>
      </div>

      {/* 2. Yatay Kaydırılabilir Tablo Sarmalayıcısı */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          {/* Tablo Başlıkları (TableHeader) */}
          <thead className="bg-gray-50/80 dark:bg-gray-800/60 text-gray-500 dark:text-gray-400 font-semibold border-b border-gray-200 dark:border-gray-800 select-none">
            <tr>
              <th 
                className="py-3.5 px-4 text-xs font-semibold uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white transition"
                onClick={() => toggleSort('name')}
              >
                <div className="flex items-center gap-1.5">
                  <span>Görev / Ders</span>
                  <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
                </div>
              </th>
              <th className="py-3.5 px-4 text-xs font-semibold uppercase tracking-wider">
                Kaynak & Kitap
              </th>
              <th className="py-3.5 px-4 text-xs font-semibold uppercase tracking-wider">
                Atanan / Öğretmen
              </th>
              <th 
                className="py-3.5 px-4 text-xs font-semibold uppercase tracking-wider cursor-pointer hover:text-gray-900 dark:hover:text-white transition"
                onClick={() => toggleSort('dueDate')}
              >
                <div className="flex items-center gap-1.5">
                  <span>Son Teslim</span>
                  <ArrowUpDown className="w-3.5 h-3.5 opacity-60" />
                </div>
              </th>
              <th className="py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-center">
                İlerleme
              </th>
              <th className="py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-center">
                Durum
              </th>
              <th className="py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-center w-12">
                İşlem
              </th>
            </tr>
          </thead>

          {/* Tablo Satırları (TableRows) */}
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800/80">
            {sortedData.length > 0 ? (
              sortedData.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors"
                >
                  {/* Görev & Ders Adı */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center shrink-0 border border-blue-200/60 dark:border-blue-800/50">
                        {row.category.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <span className="font-semibold text-gray-900 dark:text-white block truncate">
                          {row.name}
                        </span>
                        <span className="text-[11px] text-gray-500 dark:text-gray-400 block truncate">
                          {row.category}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Kaynak & Sayfa */}
                  <td className="py-4 px-4 font-mono text-gray-700 dark:text-gray-300">
                    {row.referenceBook}
                  </td>

                  {/* Atanan Öğretmen */}
                  <td className="py-4 px-4 text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-[10px] font-bold text-gray-700 dark:text-gray-300">
                        {row.assignedTo.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <span className="font-medium block truncate">{row.assignedTo.name}</span>
                        <span className="text-[10px] text-gray-400 block truncate">{row.assignedTo.role}</span>
                      </div>
                    </div>
                  </td>

                  {/* Teslim Tarihi */}
                  <td className="py-4 px-4 font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    {row.dueDate}
                  </td>

                  {/* İlerleme Çubuğu */}
                  <td className="py-4 px-4 text-center">
                    <div className="w-24 mx-auto">
                      <div className="flex items-center justify-between text-[10px] text-gray-500 mb-1">
                        <span>%{row.progress}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            row.progress === 100
                              ? 'bg-emerald-500'
                              : row.progress > 50
                              ? 'bg-blue-600'
                              : 'bg-amber-500'
                          }`}
                          style={{ width: `${row.progress}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* TailAdmin Durum Rozeti */}
                  <td className="py-4 px-4 whitespace-nowrap text-center">
                    {renderStatusBadge(row.status)}
                  </td>

                  {/* İşlem Menüsü */}
                  <td className="py-4 px-4 text-center">
                    <button
                      className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
                      title="İşlemler"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-400">
                  Aramanızla eşleşen veri bulunamadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 3. Alt Bar: Sayfalama ve Kayıt Sayısı (TailAdmin Card Footer) */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-850/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 dark:text-gray-400">
        <div>
          Toplam <span className="font-semibold text-gray-700 dark:text-gray-200">{filteredData.length}</span> kayıttan{' '}
          <span className="font-semibold text-gray-700 dark:text-gray-200">1-{filteredData.length}</span> arası gösteriliyor
        </div>

        <div className="flex items-center gap-1.5">
          <button
            disabled
            className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-400 opacity-50 cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-3 py-1 rounded-lg bg-blue-600 text-white font-semibold">1</span>
          <button
            disabled
            className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-400 opacity-50 cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
export default TailAdminTableDemo;
