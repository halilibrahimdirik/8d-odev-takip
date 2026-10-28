import { HomeworkItem } from '../types/homework';
import { INITIAL_HOMEWORK } from '../data/initialHomework';

export interface GitHubConfig {
  gistId: string;
  githubToken: string;
  repoOwner: string;
  repoName: string;
  autoSync: boolean;
  lastSyncedAt?: string;
}

const GITHUB_CONFIG_KEY = 'odev_takip_github_config';

export function getGitHubConfig(): GitHubConfig {
  if (typeof window === 'undefined') {
    return { gistId: '', githubToken: '', repoOwner: '', repoName: '', autoSync: false };
  }
  try {
    const raw = localStorage.getItem(GITHUB_CONFIG_KEY);
    if (!raw) {
      return { gistId: '', githubToken: '', repoOwner: '', repoName: '', autoSync: false };
    }
    return JSON.parse(raw);
  } catch {
    return { gistId: '', githubToken: '', repoOwner: '', repoName: '', autoSync: false };
  }
}

export function saveGitHubConfig(config: GitHubConfig): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(GITHUB_CONFIG_KEY, JSON.stringify(config));
}

/**
 * Loads homework list from GitHub NoSQL (Gist) or static repo data
 */
export async function loadHomeworkFromGitHub(): Promise<{ items: HomeworkItem[]; source: 'gist' | 'repo' | 'fallback' }> {
  const config = getGitHubConfig();

  // 1. Try GitHub Gist (NoSQL live cloud document)
  if (config.gistId) {
    try {
      const headers: Record<string, string> = {
        'Accept': 'application/vnd.github.v3+json',
      };
      if (config.githubToken) {
        headers['Authorization'] = `token ${config.githubToken}`;
      }

      const res = await fetch(`https://api.github.com/gists/${config.gistId}`, {
        headers,
        cache: 'no-store',
      });

      if (res.ok) {
        const gistData = await res.json();
        const file = gistData.files && (gistData.files['homework.json'] || Object.values(gistData.files)[0]);
        if (file && file.content) {
          const parsed = JSON.parse(file.content);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return { items: parsed, source: 'gist' };
          }
        }
      }
    } catch (err) {
      console.warn('Gist fetch failed, falling back to repository data', err);
    }
  }

  // 2. Try static public/data/homework.json
  try {
    const res = await fetch('./data/homework.json', { cache: 'no-cache' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return { items: data, source: 'repo' };
      }
    }
  } catch (err) {
    console.warn('Local homework.json fetch failed', err);
  }

  // 3. Fallback to hardcoded initial homework
  return { items: INITIAL_HOMEWORK, source: 'fallback' };
}

/**
 * Saves homework document to GitHub Gist (NoSQL persistence)
 */
export async function saveHomeworkToGitHub(
  items: HomeworkItem[]
): Promise<{ success: boolean; gistId: string; message: string }> {
  const config = getGitHubConfig();

  if (!config.githubToken) {
    return {
      success: false,
      gistId: config.gistId,
      message: 'GitHub Token gerekli. Ayarlardan Personal Access Token ekleyin.',
    };
  }

  const payload = {
    description: '8/D Sınıfı Ödev & LGS Takip Portalı - Canlı NoSQL Veritabanı',
    public: true,
    files: {
      'homework.json': {
        content: JSON.stringify(items, null, 2),
      },
    },
  };

  try {
    if (config.gistId) {
      // Update existing Gist
      const res = await fetch(`https://api.github.com/gists/${config.gistId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `token ${config.githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `Gist güncellenemedi (${res.status})`);
      }

      const updated = {
        ...config,
        lastSyncedAt: new Date().toISOString(),
      };
      saveGitHubConfig(updated);

      return {
        success: true,
        gistId: config.gistId,
        message: 'Ödevler GitHub NoSQL (Gist) veritabanına başarıyla kaydedildi!',
      };
    } else {
      // Create new Gist
      const res = await fetch('https://api.github.com/gists', {
        method: 'POST',
        headers: {
          'Authorization': `token ${config.githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `Gist oluşturulamadı (${res.status})`);
      }

      const createdGist = await res.json();
      const newGistId = createdGist.id;

      const updated = {
        ...config,
        gistId: newGistId,
        lastSyncedAt: new Date().toISOString(),
      };
      saveGitHubConfig(updated);

      return {
        success: true,
        gistId: newGistId,
        message: 'Yeni GitHub NoSQL Gist oluşturuldu ve veriler kaydedildi!',
      };
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Bilinmeyen bir hata oluştu';
    return {
      success: false,
      gistId: config.gistId,
      message: `GitHub kaydetme hatası: ${errorMsg}`,
    };
  }
}

/**
 * Generates downloadable homework.json file
 */
export function downloadHomeworkJSON(items: HomeworkItem[]): void {
  const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'homework.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
