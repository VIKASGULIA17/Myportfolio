/**
 * LeetCode API client using alfa-leetcode-api.onrender.com
 * localStorage cache with 7-day TTL so API is only called once a week.
 */

const BASE_URL = 'https://alfa-leetcode-api.onrender.com';
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function cacheKey(path) {
  return `lc_v2_${path}`;
}

function getFromCache(path) {
  try {
    const raw = localStorage.getItem(cacheKey(path));
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts < CACHE_TTL_MS) {
      console.log(`📦 LC cache hit (${Math.round((Date.now() - ts) / 3600000)}h old): ${path}`);
      return data;
    }
    // expired — remove stale entry
    localStorage.removeItem(cacheKey(path));
  } catch {
    // ignore parse errors or quota issues
  }
  return null;
}

function saveToCache(path, data) {
  try {
    localStorage.setItem(cacheKey(path), JSON.stringify({ data, ts: Date.now() }));
  } catch (e) {
    // LocalStorage quota exceeded — silently ignore
    console.warn('LC cache write failed:', e.message);
  }
}

async function fetchEndpoint(path) {
  const cached = getFromCache(path);
  if (cached) return cached;

  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(15000),
  });

  if (!res.ok) throw new Error(`${path} → HTTP ${res.status}`);
  const data = await res.json();
  saveToCache(path, data);
  return data;
}

class LeetCodeAPI {
  /**
   * Clears all locally-cached LeetCode data for a given username.
   * Call this before re-fetching on manual refresh.
   */
  clearCache(username) {
    const paths = ['', '/solved', '/badges', '/contest', '/submission?limit=10', '/calendar'];
    paths.forEach(p => {
      try { localStorage.removeItem(cacheKey(`/${username}${p}`)); } catch { }
    });
  }

  async getAllUserData(username) {
    const paths = {
      profile: `/${username}`,
      solved: `/${username}/solved`,
      badges: `/${username}/badges`,
      contest: `/${username}/contest`,
      submissions: `/${username}/submission?limit=10`,
      calendar: `/${username}/calendar`,
    };

    const results = await Promise.allSettled(
      Object.entries(paths).map(([key, path]) =>
        fetchEndpoint(path).then(data => ({ key, data }))
      )
    );

    const out = { errors: {} };
    for (const r of results) {
      if (r.status === 'fulfilled') {
        out[r.value.key] = r.value.data;
        out.errors[r.value.key] = null;
      } else {
        console.warn('❌ LeetCode endpoint failed:', r.reason?.message);
        out.errors[r.reason?.message ?? 'unknown'] = r.reason?.message;
      }
    }

    // Ensure all keys exist (null if missing)
    for (const key of Object.keys(paths)) {
      if (!(key in out)) out[key] = null;
    }

    console.log('📊 LeetCode data loaded:', Object.keys(out).filter(k => k !== 'errors' && out[k]));
    return out;
  }
}

export default new LeetCodeAPI();