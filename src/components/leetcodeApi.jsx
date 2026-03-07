/**
 * LeetCode API client using alfa-leetcode-api.onrender.com
 * Session-cached with a 10-minute TTL to avoid rate limits.
 */

const BASE_URL = 'https://alfa-leetcode-api.onrender.com';
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

function cacheKey(path) {
  return `lc_cache_${path}`;
}

function getFromCache(path) {
  try {
    const raw = sessionStorage.getItem(cacheKey(path));
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts < CACHE_TTL_MS) {
      console.log(`📦 Cache hit: ${path}`);
      return data;
    }
  } catch {
    // ignore
  }
  return null;
}

function saveToCache(path, data) {
  try {
    sessionStorage.setItem(cacheKey(path), JSON.stringify({ data, ts: Date.now() }));
  } catch {
    // ignore quota errors
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
        const key = results[results.indexOf(r)] // fallback key
        console.warn('❌ Failed endpoint:', r.reason?.message);
        out.errors[r.reason?.message ?? 'unknown'] = r.reason?.message;
      }
    }

    // Attach fulfilled flags
    for (const [key] of Object.entries(paths)) {
      if (!out[key]) out[key] = null;
    }

    console.log('📊 LeetCode data loaded:', Object.keys(out).filter(k => k !== 'errors' && out[k]));
    return out;
  }
}

export default new LeetCodeAPI();