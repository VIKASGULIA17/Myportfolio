'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    GitBranch, Star, Users, BookOpen,
    ExternalLink, RefreshCw, Calendar, Code, GitFork, Eye
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Cell
} from 'recharts';
import { useTheme } from '../contexts/ThemeContext';

const GH_USERNAME = 'VIKASGULIA17';
const GH_API = 'https://api.github.com';
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

function cache(key) { return `gh_cache_${key}`; }
function getCache(key) {
    try {
        const raw = localStorage.getItem(cache(key));
        if (!raw) return null;
        const { data, ts } = JSON.parse(raw);
        if (Date.now() - ts < CACHE_TTL) return data;
    } catch { }
    return null;
}
function setCache(key, data) {
    try { localStorage.setItem(cache(key), JSON.stringify({ data, ts: Date.now() })); } catch { }
}

async function ghFetch(path) {
    const cached = getCache(path);
    if (cached) return cached;
    const res = await fetch(`${GH_API}${path}`, {
        headers: { Accept: 'application/vnd.github.v3+json' },
        signal: AbortSignal.timeout(12000),
    });
    if (!res.ok) throw new Error(`GitHub API ${path} → ${res.status}`);
    const data = await res.json();
    setCache(path, data);
    return data;
}

// ── Language colours (subset) ──────────────────────────────────────────────
const LANG_COLORS = {
    JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3572A5',
    Java: '#b07219', 'C++': '#f34b7d', CSS: '#563d7c', HTML: '#e34c26',
    'Jupyter Notebook': '#DA5B0B', Shell: '#89e051', Go: '#00add8',
    Rust: '#dea584', 'C#': '#178600',
};

function getTheme(isDark) {
    return isDark ? {
        bg: '#0d1117',
        surface: 'rgba(255,255,255,0.04)',
        border: 'rgba(255,255,255,0.07)',
        accent: '#238636',
        accentHover: '#2ea043',
        blue: '#58a6ff',
        text: '#e6edf3',
        muted: '#8b949e',
        tooltipBg: '#161b22',
        gridStroke: 'rgba(255,255,255,0.05)',
        ambientGlow: 'rgba(35,134,54,0.15)',
    } : {
        bg: '#f6f8fa',
        surface: 'rgba(0,0,0,0.03)',
        border: 'rgba(0,0,0,0.1)',
        accent: '#1a7f37',
        accentHover: '#218843',
        blue: '#0969da',
        text: '#1f2328',
        muted: '#656d76',
        tooltipBg: '#ffffff',
        gridStroke: 'rgba(0,0,0,0.06)',
        ambientGlow: 'rgba(35,134,54,0.08)',
    };
}

function Card({ T, children, style, ...rest }) {
    return (
        <motion.div style={{
            background: T.surface,
            border: `1px solid ${T.border}`,
            borderRadius: 12, padding: '1.25rem',
            backdropFilter: 'blur(8px)', ...style
        }} {...rest}>
            {children}
        </motion.div>
    );
}
function STitle({ T, icon: Icon, children }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1rem' }}>
            <Icon size={16} style={{ color: T.accent }} />
            <h3 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 700, color: T.text }}>{children}</h3>
        </div>
    );
}

const LangBar = ({ T, name, pct, color }) => (
    <div style={{ marginBottom: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: '0.8rem', color: T.text, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: color || T.blue, display: 'inline-block' }} />
                {name}
            </span>
            <span style={{ fontSize: '0.75rem', color: T.muted }}>{pct.toFixed(1)}%</span>
        </div>
        <div style={{ height: 4, borderRadius: 2, background: T.border }}>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                style={{ height: '100%', borderRadius: 2, background: color || T.blue }}
            />
        </div>
    </div>
);

export default function GitHub() {
    const [user, setUser] = useState(null);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { theme } = useTheme();
    const T = getTheme(theme === 'dark');

    useEffect(() => { load(); }, []);

    async function load() {
        try {
            setLoading(true); setError(null);
            const [u, r] = await Promise.all([
                ghFetch(`/users/${GH_USERNAME}`),
                ghFetch(`/users/${GH_USERNAME}/repos?per_page=100&sort=updated`),
            ]);
            setUser(u);
            setRepos(r);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }

    function handleRefresh() {
        Object.keys(localStorage).filter(k => k.startsWith('gh_cache_')).forEach(k => localStorage.removeItem(k));
        load();
    }

    // ── Derived ──────────────────────────────────────────────────────────────
    const ownRepos = repos.filter(r => !r.fork);
    const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);

    // Language breakdown (by repo count & size)
    const langMap = {};
    for (const r of ownRepos) {
        if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1;
    }
    const totalLangRepos = Object.values(langMap).reduce((a, b) => a + b, 0);
    const langList = Object.entries(langMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([name, cnt]) => ({
            name, count: cnt,
            pct: totalLangRepos > 0 ? (cnt / totalLangRepos) * 100 : 0,
            color: LANG_COLORS[name] ?? '#8b949e',
        }));

    // Top 6 repos by stars, then by recency
    const topRepos = [...ownRepos]
        .sort((a, b) => (b.stargazers_count - a.stargazers_count) || (new Date(b.pushed_at) - new Date(a.pushed_at)))
        .slice(0, 6);

    const joinedYear = user ? new Date(user.created_at).getFullYear() : '—';

    if (loading) return (
        <div style={{ minHeight: '100vh', background: T.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, transition: 'background 0.35s ease' }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                style={{ width: 48, height: 48, borderRadius: '50%', border: `3px solid ${T.border}`, borderTop: `3px solid ${T.accent}` }} />
            <p style={{ color: T.muted, fontSize: '0.9rem' }}>Fetching GitHub stats…</p>
        </div>
    );

    if (error && !user) return (
        <div style={{ minHeight: '100vh', background: T.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.35s ease' }}>
            <div style={{ textAlign: 'center' }}>
                <p style={{ color: '#f85149', marginBottom: 16 }}>{error}</p>
                <button onClick={load} style={{ background: T.accent, color: '#fff', border: 'none', borderRadius: 8, padding: '8px 20px', cursor: 'pointer', fontWeight: 700 }}>Retry</button>
            </div>
        </div>
    );

    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingTop: 96, paddingBottom: 60, transition: 'background 0.35s ease' }}>
            {/* Ambient */}
            <div style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', width: 700, height: 350, borderRadius: '50%', background: `radial-gradient(ellipse, ${T.ambientGlow} 0%, transparent 70%)`, pointerEvents: 'none', zIndex: 0 }} />

            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>
                {/* ── Header ── */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 8 }}>
                        <svg height="32" viewBox="0 0 16 16" width="32" fill={T.text}>
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                        </svg>
                        <h1 style={{ margin: 0, fontSize: 'clamp(1.75rem,4vw,2.4rem)', fontWeight: 800, color: T.text }}>
                            GitHub <span style={{ color: T.accent }}>Stats</span>
                        </h1>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
                        <a href={`https://github.com/${GH_USERNAME}`} target="_blank" rel="noreferrer"
                            style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 20, padding: '4px 14px', fontSize: '0.82rem', color: T.blue, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                            @{GH_USERNAME} <ExternalLink size={11} />
                        </a>
                        <button onClick={handleRefresh} style={{ background: 'transparent', border: `1px solid ${T.border}`, borderRadius: 8, padding: '4px 10px', cursor: 'pointer', color: T.muted, display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem' }}>
                            <RefreshCw size={13} /> Refresh
                        </button>
                    </div>
                </motion.div>

                {/* ── Profile card ── */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                    style={{ background: `linear-gradient(135deg, ${T.ambientGlow} 0%, ${T.surface} 100%)`, border: `1px solid rgba(35,134,54,0.3)`, borderRadius: 16, padding: '1.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', transition: 'background 0.35s ease' }}>
                    <img src={user?.avatar_url} alt="avatar" style={{ width: 80, height: 80, borderRadius: '50%', border: '3px solid rgba(35,134,54,0.5)' }} />
                    <div style={{ flex: 1, minWidth: 200 }}>
                        <h2 style={{ margin: '0 0 4px', fontSize: '1.4rem', fontWeight: 800, color: T.text }}>{user?.name ?? GH_USERNAME}</h2>
                        <p style={{ margin: '0 0 10px', fontSize: '0.85rem', color: T.muted }}>
                            <Calendar size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                            Joined {joinedYear}
                            {user?.location && <> · 📍 {user.location}</>}
                        </p>
                        {user?.bio && <p style={{ margin: 0, fontSize: '0.82rem', color: T.muted, maxWidth: 500 }}>{user.bio}</p>}
                    </div>
                </motion.div>

                {/* ── KPIs ── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                    {[
                        { icon: BookOpen, label: 'Public Repos', value: user?.public_repos ?? '—', color: T.accent },
                        { icon: Star, label: 'Total Stars', value: totalStars, color: '#e3b341' },
                        { icon: Users, label: 'Followers', value: user?.followers ?? '—', color: T.blue },
                        { icon: GitBranch, label: 'Own Repos', value: ownRepos.length, color: '#a371f7' },
                    ].map((k, i) => (
                        <motion.div key={k.label}
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.07 }}
                            whileHover={{ scale: 1.03 }}
                            style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
                            <div style={{ width: 40, height: 40, borderRadius: 10, background: `${k.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.6rem' }}>
                                <k.icon size={18} style={{ color: k.color }} />
                            </div>
                            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: T.text }}>{k.value}</div>
                            <div style={{ fontSize: '0.75rem', color: T.muted, marginTop: 4 }}>{k.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* ── Language breakdown + Bar chart ── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                    <Card T={T} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <STitle T={T} icon={Code}>Language Breakdown</STitle>
                        {langList.map(l => <LangBar T={T} key={l.name} {...l} />)}
                    </Card>

                    <Card T={T} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                        <STitle T={T} icon={GitBranch}>Repos by Language</STitle>
                        <ResponsiveContainer width="100%" height={240}>
                            <BarChart data={langList} margin={{ top: 0, right: 10, bottom: 40, left: -20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke={T.gridStroke} />
                                <XAxis dataKey="name" tick={{ fill: T.muted, fontSize: 10 }} angle={-35} textAnchor="end" interval={0} />
                                <YAxis tick={{ fill: T.muted, fontSize: 11 }} />
                                <Tooltip
                                    contentStyle={{ background: T.tooltipBg, border: `1px solid ${T.border}`, borderRadius: 8 }}
                                    labelStyle={{ color: T.text }} itemStyle={{ color: T.muted }}
                                />
                                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                    {langList.map((l, i) => <Cell key={i} fill={l.color} />)}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </div>

                {/* ── GitHub contribution image ── */}
                <Card T={T} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }} style={{ marginBottom: '1.5rem' }}>
                    <STitle T={T} icon={Calendar}>Contribution Activity</STitle>
                    <img
                        src={`https://ghchart.rshah.org/238636/${GH_USERNAME}`}
                        alt="Contribution chart"
                        style={{ width: '100%', borderRadius: 8, filter: theme === 'dark' ? 'brightness(0.9)' : 'brightness(1)' }}
                        onError={e => { e.target.style.display = 'none'; }}
                    />
                </Card>

                {/* ── Top Repos ── */}
                <Card T={T} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}>
                    <STitle T={T} icon={Star}>Top Repositories</STitle>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '0.75rem' }}>
                        {topRepos.map((repo, i) => (
                            <motion.a
                                key={repo.id}
                                href={repo.html_url} target="_blank" rel="noreferrer"
                                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.05 * i }}
                                whileHover={{ scale: 1.02, borderColor: 'rgba(35,134,54,0.4)' }}
                                style={{
                                    display: 'block', padding: '1rem', borderRadius: 10,
                                    background: T.surface, border: `1px solid ${T.border}`,
                                    textDecoration: 'none', transition: 'border-color 0.2s, background 0.35s ease',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: T.blue }}>
                                        {repo.name}
                                    </span>
                                    <ExternalLink size={12} style={{ color: T.muted }} />
                                </div>
                                {repo.description && (
                                    <p style={{ margin: '0 0 8px', fontSize: '0.78rem', color: T.muted, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {repo.description}
                                    </p>
                                )}
                                <div style={{ display: 'flex', gap: 12, fontSize: '0.72rem', color: T.muted, flexWrap: 'wrap' }}>
                                    {repo.language && (
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: LANG_COLORS[repo.language] ?? T.muted }} />
                                            {repo.language}
                                        </span>
                                    )}
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Star size={10} />{repo.stargazers_count}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><GitFork size={10} />{repo.forks_count}</span>
                                    {repo.homepage && <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Eye size={10} />Live</span>}
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
