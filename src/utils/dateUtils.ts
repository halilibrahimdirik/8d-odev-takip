export type TimelineBucket = 'urgent' | 'monday' | 'later' | 'completed';

export interface TimelineGroupMeta {
  key: TimelineBucket;
  title: string;
  badge: string;
  description: string;
  accentBorder: string;
  badgeColor: string;
}

export const TIMELINE_GROUPS: Record<TimelineBucket, TimelineGroupMeta> = {
  urgent: {
    key: 'urgent',
    title: 'Öncelikli & Acil Teslimler',
    badge: 'Hemen Çöz',
    description: 'Süresi dolmak üzere olan veya teslim tarihi geçmiş görevler',
    accentBorder: 'border-l-rose-500 dark:border-l-rose-500',
    badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 border-rose-300 dark:border-rose-800',
  },
  monday: {
    key: 'monday',
    title: 'Pazartesiye Kadar (Hafta Sonu Görevleri)',
    badge: 'Hafta Sonu',
    description: '19 Ekim Pazartesi sabahı veya akşamına kadar tamamlanacak ödevler',
    accentBorder: 'border-l-amber-500 dark:border-l-amber-500',
    badgeColor: 'bg-amber-100 text-amber-900 dark:bg-amber-950/70 dark:text-amber-200 border-amber-300 dark:border-amber-700',
  },
  later: {
    key: 'later',
    title: 'Gelecek Hafta (22 Ekim ve Sonrası)',
    badge: 'Gelecek Hafta',
    description: '20-22 Ekim tarihleri arasındaki LGS ve Din Kültürü testleri',
    accentBorder: 'border-l-blue-500 dark:border-l-blue-500',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border-blue-300 dark:border-blue-800',
  },
  completed: {
    key: 'completed',
    title: 'Tamamlanan Ödevler',
    badge: 'Bitti',
    description: 'Başarıyla bitirdiğin ve tik attığın tüm ödevler',
    accentBorder: 'border-l-emerald-500 dark:border-l-emerald-500',
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
  },
};

export function getTimelineBucket(dueDateStr: string, isCompleted = false): TimelineBucket {
  if (isCompleted) return 'completed';

  const now = new Date();
  const due = new Date(dueDateStr);
  const diffMs = due.getTime() - now.getTime();

  // If already expired or due within next 24h
  if (diffMs < 0 || diffMs <= 24 * 60 * 60 * 1000) {
    return 'urgent';
  }

  // Check if due by Monday night (day of week 1 or before 20 Oct)
  const dueDay = due.getDate();
  const dueMonth = due.getMonth(); // 9 = October

  if (dueMonth === 9 && dueDay <= 19) {
    return 'monday';
  }

  return 'later';
}

export function getUrgencyInfo(dueDateStr: string): {
  status: 'expired' | 'today' | 'tomorrow' | 'soon' | 'later';
  badgeText: string;
  badgeClass: string;
  hoursRemaining: number;
} {
  const now = new Date();
  const due = new Date(dueDateStr);
  const diffMs = due.getTime() - now.getTime();
  const diffHours = Math.round(diffMs / (1000 * 60 * 60));
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffMs < 0) {
    return {
      status: 'expired',
      badgeText: 'Teslim Tarihi Geçti',
      badgeClass: 'bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 border-rose-300 dark:border-rose-800',
      hoursRemaining: diffHours,
    };
  }

  // Same calendar day check
  const isSameDay =
    now.getFullYear() === due.getFullYear() &&
    now.getMonth() === due.getMonth() &&
    now.getDate() === due.getDate();

  if (isSameDay) {
    return {
      status: 'today',
      badgeText: `Bugün Son Gün! (${formatTime(due)})`,
      badgeClass: 'bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-200 border-amber-300 dark:border-amber-700 animate-pulse',
      hoursRemaining: diffHours,
    };
  }

  // Tomorrow check
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const isTomorrow =
    tomorrow.getFullYear() === due.getFullYear() &&
    tomorrow.getMonth() === due.getMonth() &&
    tomorrow.getDate() === due.getDate();

  if (isTomorrow) {
    return {
      status: 'tomorrow',
      badgeText: `Yarın (${formatTime(due)})`,
      badgeClass: 'bg-orange-100 text-orange-800 dark:bg-orange-950/70 dark:text-orange-300 border-orange-300 dark:border-orange-800',
      hoursRemaining: diffHours,
    };
  }

  if (diffDays <= 3) {
    return {
      status: 'soon',
      badgeText: `${diffDays} gün kaldı`,
      badgeClass: 'bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border-blue-300 dark:border-blue-800',
      hoursRemaining: diffHours,
    };
  }

  return {
    status: 'later',
    badgeText: `${diffDays} gün kaldı`,
    badgeClass: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
    hoursRemaining: diffHours,
  };
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
}

export function formatTurkishDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateStr;
  }
}
