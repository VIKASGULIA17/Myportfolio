'use client'
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    Trophy, Target, Calendar, TrendingUp,
    Code, Award, RefreshCw, CheckCircle, Clock, ExternalLink
} from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import leetcodeApi from './leetcodeApi';

// ─── Theme tokens ────────────────────────────────────────────────────────────
const T = {
    bg: '#0d0d0f',
    surface: 'rgba(255,255,255,0.04)',
    surfaceHover: 'rgba(255,161,22,0.08)',
    border: 'rgba(255,255,255,0.07)',
    borderAccent: 'rgba(255,161,22,0.35)',
    orange: '#ffa116',
    orangeGlow: 'rgba(255,161,22,0.25)',
    green: '#00b8a3',
    yellow: '#ffc01e',
    red: '#ef4743',
    text: '#e8e8e8',
    muted: '#8a8a9f',
};

// ─── Difficulty colours ───────────────────────────────────────────────────────
const DC = { Easy: T.green, Medium: T.yellow, Hard: T.red };

// ─── Helper: format unix timestamp ───────────────────────────────────────────
function fmtTime(ts) {
    if (!ts) return '—';
    const d = new Date(Number(ts) * 1000);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' });
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Card({ children, style, className = '', ...props }) {
    return (
        <motion.div
            style={{
                background: T.surface,
                border: `1px solid ${T.border}`,
                borderRadius: 16,
                padding: '1.5rem',
                backdropFilter: 'blur(12px)',
                ...style,
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

function SectionTitle({ icon: Icon, children }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}>
            <Icon size={18} style={{ color: T.orange }} />
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: T.text, letterSpacing: 0.3 }}>
                {children}
            </h3>
        </div>
    );
}

function KPICard({ icon: Icon, value, label, color = T.orange, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.45, ease: 'easeOut' }}
            whileHover={{ scale: 1.03, borderColor: T.borderAccent }}
            style={{
                background: T.surface,
                border: `1px solid ${T.border}`,
                borderRadius: 16,
                padding: '1.5rem',
                textAlign: 'center',
                cursor: 'default',
                transition: 'border-color 0.2s',
            }}
        >
            <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: `${color}22`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 0.75rem',
            }}>
                <Icon size={20} style={{ color }} />
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: T.text, lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: '0.8rem', color: T.muted, marginTop: 6 }}>{label}</div>
        </motion.div>
    );
}

// ─── Custom tooltip for contest chart ────────────────────────────────────────
function ContestTooltip({ active, payload }) {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
        <div style={{
            background: '#1a1a2a', border: `1px solid ${T.borderAccent}`,
            borderRadius: 10, padding: '0.6rem 1rem', fontSize: '0.8rem', color: T.text
        }}>
            <div style={{ fontWeight: 700, color: T.orange, marginBottom: 4 }}>{d.title}</div>
            <div>Rating: <b style={{ color: T.orange }}>{Math.round(d.rating)}</b></div>
            <div>Rank: #{d.ranking?.toLocaleString()}</div>
            <div>Solved: {d.problemsSolved}/{d.totalProblems}</div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const LeetCode = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [dataSource, setDataSource] = useState('loading');

    const username = 'vikas_gulia';

    useEffect(() => { load(); }, []);

    async function load() {
        try {
            setLoading(true);
            setError(null);
            setDataSource('loading');
            const d = await leetcodeApi.getAllUserData(username);
            setData(d);
            setDataSource(d.profile ? 'real' : 'error');
        } catch (e) {
            setError(e.message);
            setDataSource('error');
        } finally {
            setLoading(false);
        }
    }

    async function handleRefresh() {
        // Clear 7-day localStorage cache for this user so fresh data is fetched
        leetcodeApi.clearCache(username);
        setRefreshing(true);
        await load();
        setRefreshing(false);
    }

    // ── Derived data ──────────────────────────────────────────────────────────

    const profile = data?.profile ?? {};
    const solved = data?.solved ?? {};
    const badgesData = data?.badges ?? {};
    const contestData = data?.contest ?? {};
    const submissions = data?.submissions?.submission ?? [];
    const calendarData = data?.calendar ?? {};

    const kpis = [
        {
            icon: Target, label: 'Problems Solved',
            value: solved.solvedProblem?.toLocaleString() ?? '—',
            color: T.green, delay: 0.1
        },
        {
            icon: Calendar, label: 'Active Days',
            value: calendarData.totalActiveDays?.toString() ?? '—',
            color: T.orange, delay: 0.2
        },
        {
            icon: Trophy, label: 'Global Ranking',
            value: profile.ranking ? `#${profile.ranking.toLocaleString()}` : '—',
            color: T.yellow, delay: 0.3
        },
        {
            icon: TrendingUp, label: 'Contest Rating',
            value: contestData.contestRating ? Math.round(contestData.contestRating).toString() : '—',
            color: T.red, delay: 0.4
        },
    ];

    const pieData = [
        { name: 'Easy', value: solved.easySolved ?? 0, color: T.green },
        { name: 'Medium', value: solved.mediumSolved ?? 0, color: T.yellow },
        { name: 'Hard', value: solved.hardSolved ?? 0, color: T.red },
    ].filter(d => d.value > 0);

    const contestHistory = (contestData.contestParticipation ?? [])
        .filter(c => c.attended)
        .map(c => ({
            title: c.contest?.title ?? '',
            rating: c.rating,
            ranking: c.ranking,
            problemsSolved: c.problemsSolved,
            totalProblems: c.totalProblems,
            date: c.contest?.startTime,
        }));

    const badges = badgesData.badges ?? [];
    const totalSolved = solved.solvedProblem ?? 0;

    // ── Loading ───────────────────────────────────────────────────────────────
    if (loading) {
        return (
            <div style={{
                minHeight: '100vh', background: T.bg,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 16
            }}>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    style={{
                        width: 52, height: 52, borderRadius: '50%',
                        border: `3px solid ${T.border}`,
                        borderTop: `3px solid ${T.orange}`,
                    }}
                />
                <p style={{ color: T.muted, fontSize: '0.9rem' }}>Fetching your LeetCode stats…</p>
            </div>
        );
    }

    if (error && !data) {
        return (
            <div style={{
                minHeight: '100vh', background: T.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ color: T.red, marginBottom: 16 }}>{error}</p>
                    <button
                        onClick={load}
                        style={{
                            background: T.orange, color: '#000', border: 'none',
                            borderRadius: 8, padding: '8px 20px', cursor: 'pointer', fontWeight: 700
                        }}
                    >Retry</button>
                </div>
            </div>
        );
    }

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <div style={{ minHeight: '100vh', background: T.bg, paddingTop: 96, paddingBottom: 60 }}>
            {/* Ambient glow */}
            <div style={{
                position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)',
                width: 800, height: 400, borderRadius: '50%',
                background: `radial-gradient(ellipse, ${T.orangeGlow} 0%, transparent 70%)`,
                pointerEvents: 'none', zIndex: 0,
            }} />

            <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>

                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: 'center', marginBottom: '2.5rem' }}
                >
                    {/* LeetCode wordmark */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 8 }}>
                        <svg width="32" height="32" viewBox="0 0 95 111" fill="none">
                            <path d="M68.8 83.1a5.8 5.8 0 0 1 0 8.2l-7.8 7.8a28 28 0 0 1-39.6 0L5.8 83.4a28 28 0 0 1 0-39.6l28-28A28 28 0 0 1 73 15.5l-9 9a5.8 5.8 0 0 1-8.2 0 16.3 16.3 0 0 0-23.1 0l-28 28a16.3 16.3 0 0 0 0 23l15.7 15.7a16.3 16.3 0 0 0 23 0l7.8-7.8a5.8 5.8 0 0 1 8.2 0 5.8 5.8 0 0 1 .4.7z" fill={T.orange} />
                            <path d="M89.1 27.7 73.4 12a28 28 0 0 0-39.6 0l-7.8 7.8a5.8 5.8 0 0 0 8.2 8.2l7.8-7.8a16.3 16.3 0 0 1 23.1 0l15.7 15.7a16.3 16.3 0 0 1 0 23l-28 28a16.3 16.3 0 0 1-23 0 5.8 5.8 0 0 0-8.2 8.2 28 28 0 0 0 39.6 0l28-28a28 28 0 0 0 0-39.4z" fill="#B3B3B3" />
                        </svg>
                        <h1 style={{
                            margin: 0, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                            fontWeight: 800, color: T.text, letterSpacing: -0.5
                        }}>
                            LeetCode <span style={{ color: T.orange }}>Stats</span>
                        </h1>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
                        <span style={{
                            background: 'rgba(255,255,255,0.06)', border: `1px solid ${T.border}`,
                            borderRadius: 20, padding: '4px 14px', fontSize: '0.82rem', color: T.muted
                        }}>@{profile.username ?? username}</span>

                        {dataSource === 'real' && (
                            <span style={{
                                display: 'flex', alignItems: 'center', gap: 6,
                                background: 'rgba(0,184,163,0.12)', border: '1px solid rgba(0,184,163,0.3)',
                                borderRadius: 20, padding: '4px 12px', fontSize: '0.78rem', color: T.green
                            }}>
                                <span style={{
                                    width: 6, height: 6, borderRadius: '50%',
                                    background: T.green, display: 'inline-block',
                                    boxShadow: `0 0 6px ${T.green}`,
                                    animation: 'pulse 2s infinite'
                                }} />
                                Live Data
                            </span>
                        )}

                        <button
                            onClick={handleRefresh}
                            disabled={refreshing}
                            title="Refresh (clears cache)"
                            style={{
                                background: 'transparent', border: `1px solid ${T.border}`,
                                borderRadius: 8, padding: '4px 10px', cursor: 'pointer',
                                color: T.muted, display: 'flex', alignItems: 'center', gap: 4,
                                fontSize: '0.78rem', transition: 'border-color 0.2s',
                            }}
                        >
                            <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} />
                            Refresh
                        </button>
                    </div>
                </motion.div>

                {/* ── Profile Card ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    style={{
                        background: `linear-gradient(135deg, rgba(255,161,22,0.08) 0%, rgba(255,255,255,0.03) 100%)`,
                        border: `1px solid ${T.borderAccent}`,
                        borderRadius: 20, padding: '1.75rem', marginBottom: '1.75rem',
                        display: 'flex', alignItems: 'center', gap: '1.5rem',
                        flexWrap: 'wrap',
                    }}
                >
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                        <div style={{
                            width: 80, height: 80, borderRadius: '50%',
                            background: `linear-gradient(135deg, ${T.orange}, #ff6b35)`,
                            padding: 3,
                        }}>
                            <img
                                src={profile.avatar || `https://ui-avatars.com/api/?name=${username}&background=ffa116&color=000&size=96`}
                                alt="avatar"
                                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', background: '#1a1a2e' }}
                                onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${username}&background=ffa116&color=000&size=96`; }}
                            />
                        </div>
                        {contestData.contestBadges?.name && (
                            <span style={{
                                position: 'absolute', bottom: -4, right: -4,
                                background: '#2a1800', border: `1px solid ${T.orange}`,
                                borderRadius: 6, padding: '1px 6px', fontSize: '0.6rem',
                                color: T.orange, fontWeight: 700,
                            }}>{contestData.contestBadges.name}</span>
                        )}
                    </div>

                    <div style={{ flex: 1, minWidth: 200 }}>
                        <h2 style={{ margin: '0 0 4px', fontSize: '1.4rem', fontWeight: 800, color: T.text }}>
                            {profile.name ?? 'LeetCoder'}
                        </h2>
                        <p style={{ margin: '0 0 10px', fontSize: '0.85rem', color: T.muted }}>
                            {profile.school && <><Code size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />{profile.school}&nbsp;·&nbsp;</>}
                            {profile.country ?? 'India'}
                        </p>
                        {profile.about && (
                            <p style={{
                                margin: 0, fontSize: '0.82rem', color: T.muted,
                                lineHeight: 1.55, maxWidth: 520,
                                display: '-webkit-box', WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical', overflow: 'hidden'
                            }}>
                                {profile.about}
                            </p>
                        )}
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        {profile.gitHub && (
                            <a href={profile.gitHub} target="_blank" rel="noreferrer"
                                style={{ color: T.muted, fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}>
                                <ExternalLink size={13} />GitHub
                            </a>
                        )}
                        {profile.linkedIN && (
                            <a href={profile.linkedIN} target="_blank" rel="noreferrer"
                                style={{ color: T.muted, fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}>
                                <ExternalLink size={13} />LinkedIn
                            </a>
                        )}
                    </div>
                </motion.div>

                {/* ── KPI Cards ── */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem', marginBottom: '1.75rem'
                }}>
                    {kpis.map(k => (
                        <KPICard key={k.label} {...k} />
                    ))}
                </div>

                {/* ── Problem Distribution + Contest Chart ── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>

                    {/* Pie chart */}
                    <Card initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <SectionTitle icon={Target}>Problem Distribution</SectionTitle>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                            <ResponsiveContainer width={190} height={190}>
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%" cy="50%"
                                        innerRadius={55} outerRadius={85}
                                        paddingAngle={3}
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, i) => (
                                            <Cell key={i} fill={entry.color} stroke="none" />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ background: '#1a1a2a', border: `1px solid ${T.border}`, borderRadius: 8 }}
                                        itemStyle={{ color: T.text }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>

                            <div style={{ flex: 1, minWidth: 130 }}>
                                {[
                                    { label: 'Easy', val: solved.easySolved ?? 0, color: T.green },
                                    { label: 'Medium', val: solved.mediumSolved ?? 0, color: T.yellow },
                                    { label: 'Hard', val: solved.hardSolved ?? 0, color: T.red },
                                ].map(({ label, val, color }) => (
                                    <div key={label} style={{ marginBottom: 14 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                                            <span style={{ fontSize: '0.82rem', color, fontWeight: 600 }}>{label}</span>
                                            <span style={{ fontSize: '0.82rem', color: T.text, fontWeight: 700 }}>{val}</span>
                                        </div>
                                        <div style={{ height: 6, borderRadius: 4, background: 'rgba(255,255,255,0.06)' }}>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${totalSolved > 0 ? (val / totalSolved) * 100 : 0}%` }}
                                                transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
                                                style={{ height: '100%', borderRadius: 4, background: color }}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <div style={{
                                    marginTop: 18, borderTop: `1px solid ${T.border}`, paddingTop: 12,
                                    display: 'flex', justifyContent: 'space-between',
                                }}>
                                    <span style={{ fontSize: '0.8rem', color: T.muted }}>Total</span>
                                    <span style={{ fontSize: '1rem', fontWeight: 800, color: T.orange }}>
                                        {solved.solvedProblem?.toLocaleString() ?? '—'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Contest rating line chart */}
                    <Card initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                        <SectionTitle icon={TrendingUp}>
                            Contest Rating
                            {contestData.contestRating && (
                                <span style={{ marginLeft: 8, color: T.orange, fontSize: '0.95rem', fontWeight: 800 }}>
                                    {Math.round(contestData.contestRating)}
                                </span>
                            )}
                        </SectionTitle>

                        <div style={{ fontSize: '0.78rem', color: T.muted, marginBottom: 12, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                            {contestData.contestAttend !== undefined && (
                                <span>🎯 Contests: <b style={{ color: T.text }}>{contestData.contestAttend}</b></span>
                            )}
                            {contestData.contestGlobalRanking && (
                                <span>🌍 Global: <b style={{ color: T.text }}>#{contestData.contestGlobalRanking?.toLocaleString()}</b></span>
                            )}
                            {contestData.contestTopPercentage && (
                                <span>📊 Top <b style={{ color: T.orange }}>{contestData.contestTopPercentage}%</b></span>
                            )}
                        </div>

                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={contestHistory} margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="title" hide />
                                <YAxis
                                    domain={['auto', 'auto']}
                                    tick={{ fill: T.muted, fontSize: 11 }}
                                    width={45}
                                />
                                <Tooltip content={<ContestTooltip />} />
                                <Line
                                    type="monotone"
                                    dataKey="rating"
                                    stroke={T.orange}
                                    strokeWidth={2}
                                    dot={false}
                                    activeDot={{ r: 5, fill: T.orange, stroke: '#000', strokeWidth: 2 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>
                </div>

                {/* ── Badges ── */}
                {badges.length > 0 && (
                    <Card
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        style={{ marginBottom: '1.75rem' }}
                    >
                        <SectionTitle icon={Award}>
                            Badges ({badgesData.badgesCount ?? badges.length})
                        </SectionTitle>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                            gap: '0.75rem',
                            maxHeight: 340,
                            overflowY: 'auto',
                            paddingRight: 4,
                        }}>
                            {badges.map((badge, i) => (
                                <motion.div
                                    key={badge.id}
                                    initial={{ opacity: 0, scale: 0.85 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.05 * Math.min(i, 10) }}
                                    whileHover={{ scale: 1.06 }}
                                    style={{
                                        background: 'rgba(255,161,22,0.06)',
                                        border: `1px solid ${T.border}`,
                                        borderRadius: 12, padding: '0.75rem 0.5rem',
                                        textAlign: 'center', cursor: 'default',
                                    }}
                                >
                                    <img
                                        src={
                                            badge.icon?.startsWith('http')
                                                ? badge.icon
                                                : `https://leetcode.com${badge.icon}`
                                        }
                                        alt={badge.displayName}
                                        style={{ width: 44, height: 44, objectFit: 'contain', marginBottom: 6 }}
                                        onError={e => { e.target.style.display = 'none'; }}
                                    />
                                    <div style={{ fontSize: '0.65rem', fontWeight: 600, color: T.text, lineHeight: 1.3, marginBottom: 3 }}>
                                        {badge.displayName}
                                    </div>
                                    <div style={{ fontSize: '0.58rem', color: T.muted }}>
                                        {badge.creationDate}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </Card>
                )}

                {/* ── Last 10 Submissions ── */}
                <Card
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                >
                    <SectionTitle icon={Clock}>Last 10 Submissions</SectionTitle>

                    {submissions.length === 0 ? (
                        <p style={{ color: T.muted, fontSize: '0.85rem' }}>No submission data available.</p>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
                                <thead>
                                    <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                                        {['#', 'Problem', 'Status', 'Language', 'Date'].map(h => (
                                            <th key={h} style={{
                                                padding: '8px 10px', textAlign: 'left',
                                                color: T.muted, fontWeight: 600, fontSize: '0.75rem',
                                                whiteSpace: 'nowrap',
                                            }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {submissions.map((s, i) => (
                                        <motion.tr
                                            key={s.id ?? i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.04 * i }}
                                            style={{ borderBottom: `1px solid rgba(255,255,255,0.04)` }}
                                        >
                                            <td style={{ padding: '10px 10px', color: T.muted, fontWeight: 600 }}>{i + 1}</td>
                                            <td style={{ padding: '10px 10px' }}>
                                                <a
                                                    href={`https://leetcode.com/problems/${s.titleSlug ?? ''}`}
                                                    target="_blank" rel="noreferrer"
                                                    style={{
                                                        color: T.text, textDecoration: 'none', fontWeight: 600,
                                                        display: 'flex', alignItems: 'center', gap: 5,
                                                    }}
                                                    onMouseEnter={e => e.currentTarget.style.color = T.orange}
                                                    onMouseLeave={e => e.currentTarget.style.color = T.text}
                                                >
                                                    {s.title ?? s.titleSlug}
                                                    <ExternalLink size={11} style={{ opacity: 0.5 }} />
                                                </a>
                                            </td>
                                            <td style={{ padding: '10px 10px' }}>
                                                <span style={{
                                                    display: 'inline-flex', alignItems: 'center', gap: 4,
                                                    padding: '2px 8px', borderRadius: 6,
                                                    background: s.statusDisplay === 'Accepted'
                                                        ? 'rgba(0,184,163,0.15)' : 'rgba(239,71,67,0.15)',
                                                    color: s.statusDisplay === 'Accepted' ? T.green : T.red,
                                                    fontSize: '0.75rem', fontWeight: 600,
                                                }}>
                                                    {s.statusDisplay === 'Accepted'
                                                        ? <CheckCircle size={11} />
                                                        : null}
                                                    {s.statusDisplay ?? 'Submitted'}
                                                </span>
                                            </td>
                                            <td style={{ padding: '10px 10px', color: T.muted, fontSize: '0.78rem' }}>
                                                {s.lang ?? s.langName ?? '—'}
                                            </td>
                                            <td style={{ padding: '10px 10px', color: T.muted, fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                                                {fmtTime(s.timestamp)}
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Card>

            </div>
        </div>
    );
};

export default LeetCode;