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
import { useTheme } from '../contexts/ThemeContext';

// ─── Theme tokens ──────────────────────────────────────────────────────────────────────────────
function getTheme(isDark) {
    return isDark ? {
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
        tooltipBg: '#1a1a2a',
        gridStroke: 'rgba(255,255,255,0.05)',
    } : {
        bg: '#fafafa',
        surface: 'rgba(0,0,0,0.03)',
        surfaceHover: 'rgba(255,161,22,0.06)',
        border: 'rgba(0,0,0,0.09)',
        borderAccent: 'rgba(255,161,22,0.4)',
        orange: '#e08800',
        orangeGlow: 'rgba(255,161,22,0.12)',
        green: '#007a6e',
        yellow: '#b8860b',
        red: '#cc2828',
        text: '#111111',
        muted: '#6b7280',
        tooltipBg: '#ffffff',
        gridStroke: 'rgba(0,0,0,0.06)',
    };
}

// ─── Difficulty colours ───────────────────────────────────────────────────────
// This will be defined inside the component where T is available
// const DC = { Easy: T.green, Medium: T.yellow, Hard: T.red };

// ─── Helper: format unix timestamp ───────────────────────────────────────────
function fmtTime(ts) {
    if (!ts) return '—';
    const d = new Date(Number(ts) * 1000);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' });
}

// ─── Sub-components ─────────────────────────────────────────────────────────────────────────────

function Card({ T, children, style, className = '', ...props }) {
    return (
        <motion.div
            style={{
                background: T.surface,
                border: `1px solid ${T.border}`,
                borderRadius: 16,
                padding: '1.5rem',
                backdropFilter: 'blur(12px)',
                transition: 'background 0.35s ease, border-color 0.35s ease',
                ...style,
            }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

function SectionTitle({ T, icon: Icon, children }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}>
            <Icon size={18} style={{ color: T.orange }} />
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: T.text, letterSpacing: 0.3 }}>
                {children}
            </h3>
        </div>
    );
}

function KPICard({ T, icon: Icon, value, label, color, delay = 0 }) {
    const c = color ?? T.orange;
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
                transition: 'border-color 0.2s, background 0.35s ease',
            }}
        >
            <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: `${c}22`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 0.75rem',
            }}>
                <Icon size={20} style={{ color: c }} />
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: T.text, lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: '0.8rem', color: T.muted, marginTop: 6 }}>{label}</div>
        </motion.div>
    );
}

// ─── Custom tooltip for contest chart ─────────────────────────────────────────────────────────────────────────────
function ContestTooltip({ T, active, payload }) {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
        <div style={{
            background: T.tooltipBg, border: `1px solid ${T.borderAccent}`,
            borderRadius: 10, padding: '0.6rem 1rem', fontSize: '0.8rem', color: T.text
        }}>
            <div style={{ fontWeight: 700, color: T.orange, marginBottom: 4 }}>{d.title}</div>
            <div>Rating: <b style={{ color: T.orange }}>{Math.round(d.rating)}</b></div>
            <div>Rank: #{d.ranking?.toLocaleString()}</div>
            <div>Solved: {d.problemsSolved}/{d.totalProblems}</div>
        </div>
    );
}

// ─── Heatmap Calendar ─────────────────────────────────────────────────────────────────────────────
function SubmissionCalendar({ T, calendarData }) {
    if (!calendarData || !calendarData.submissionCalendar) return null;

    let parsed = {};
    try {
        parsed = typeof calendarData.submissionCalendar === 'string'
            ? JSON.parse(calendarData.submissionCalendar)
            : calendarData.submissionCalendar;
    } catch { return null; }

    // Generate last 365 days
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const days = [];
    for (let i = 364; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        days.push(d);
    }

    // Map timestamps to days
    const counts = {};
    for (const [ts, count] of Object.entries(parsed)) {
        const d = new Date(Number(ts) * 1000);
        d.setHours(0, 0, 0, 0);
        counts[d.getTime()] = count;
    }

    // Colors for intensity
    const getIntensityColor = (count) => {
        if (!count) return T.surfaceHover;
        if (count < 2) return `rgba(255,161,22, 0.3)`;
        if (count < 4) return `rgba(255,161,22, 0.6)`;
        if (count < 6) return `rgba(255,161,22, 0.8)`;
        return T.orange;
    };

    // Prepare month labels
    const monthLabels = [];
    let lastMonth = -1;
    for (let w = 0; w < 53; w++) {
        const dIdx = w * 7;
        if (dIdx < days.length) {
            const m = days[dIdx].getMonth();
            if (m !== lastMonth) {
                monthLabels.push({ label: days[dIdx].toLocaleDateString('en-US', { month: 'short' }), weekIdx: w });
                lastMonth = m;
            }
        }
    }

    return (
        <Card T={T} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ marginTop: '1.75rem', overflowX: 'auto' }}>
            <SectionTitle T={T} icon={Calendar}>Activity Calendar</SectionTitle>
            <div style={{ minWidth: 700 }}>
                {/* Month labels */}
                <div style={{ position: 'relative', height: 20, marginBottom: 4 }}>
                    {monthLabels.map((m, i) => (
                        <span key={i} style={{
                            position: 'absolute',
                            left: m.weekIdx * 16,
                            fontSize: '0.75rem',
                            color: T.muted,
                            fontWeight: 600
                        }}>
                            {m.label}
                        </span>
                    ))}
                </div>
                {/* The Grid */}
                <div style={{ display: 'flex', gap: 4 }}>
                    {/* Divide 365 days into columns of 7 (weeks) */}
                    {Array.from({ length: 53 }).map((_, weekIdx) => (
                        <div key={weekIdx} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            {Array.from({ length: 7 }).map((_, dayIdx) => {
                                const dateIdx = weekIdx * 7 + dayIdx;
                                if (dateIdx >= days.length) return <div key={dayIdx} style={{ width: 12, height: 12 }} />;
                                const date = days[dateIdx];
                                const count = counts[date.getTime()] || 0;
                                return (
                                    <div
                                        key={dayIdx}
                                        title={`${date.toDateString()}: ${count} submissions`}
                                        style={{
                                            width: 12, height: 12, borderRadius: 2,
                                            background: getIntensityColor(count),
                                            border: `1px solid ${T.surfaceHover}`,
                                            cursor: 'pointer', transition: 'transform 0.2s'
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'}
                                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 6, marginTop: 12, fontSize: '0.75rem', color: T.muted }}>
                <span>Less</span>
                {[0, 1, 3, 5, 7].map(c => (
                    <div key={c} style={{ width: 12, height: 12, borderRadius: 2, background: getIntensityColor(c) }} />
                ))}
                <span>More</span>
            </div>
        </Card>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const LeetCode = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [dataSource, setDataSource] = useState('loading');
    const { theme } = useTheme();
    const T = getTheme(theme === 'dark');
    const DC = { Easy: T.green, Medium: T.yellow, Hard: T.red };

    const username = 'vikas_gulia';

    useEffect(() => { load(); }, []);

    async function load() {
        try {
            setLoading(true);
            setError(null);
            setDataSource('loading');
            const d = await leetcodeApi.getAllUserData(username);
            if (d && d.profile) {
                setData(d);
                setDataSource('real');
            } else {
                throw new Error("Invalid profile data");
            }
        } catch (e) {
            console.warn("LeetCode API error, using fallback data:", e.message);
            const fallbackData = {
                profile: {
                    username: 'vikas_gulia',
                    name: 'Vikas Gulia',
                    about: 'utwlMDel',
                    country: 'India',
                    ranking: 91646,
                    avatar: 'https://assets.leetcode.com/users/vikas_gulia/avatar_1753686431.png',
                    gitHub: 'https://github.com/VIKASGULIA17',
                    linkedIN: 'https://linkedin.com/in/vikas-gulia-b28255298',
                    school: 'Guru goving singh indraprasth university'
                },
                solved: {
                    solvedProblem: 704,
                    easySolved: 228,
                    mediumSolved: 392,
                    hardSolved: 84,
                },
                badges: { badgesCount: 0, badges: [] },
                contest: {
                    contestRating: 1521.47,
                    contestAttend: 10,
                    contestGlobalRanking: 335528,
                    contestTopPercentage: 38.7,
                    contestBadges: null,
                    contestParticipation: [
                        {"attended":true,"rating":1463.302,"ranking":18780,"trendDirection":"DOWN","problemsSolved":1,"totalProblems":4,"finishTimeInSeconds":1164,"contest":{"title":"Weekly Contest 410","startTime":1723343400}},
                        {"attended":true,"rating":1512.114,"ranking":8046,"trendDirection":"UP","problemsSolved":2,"totalProblems":4,"finishTimeInSeconds":2454,"contest":{"title":"Weekly Contest 411","startTime":1723948200}},
                        {"attended":true,"rating":1487.579,"ranking":20269,"trendDirection":"DOWN","problemsSolved":2,"totalProblems":4,"finishTimeInSeconds":3935,"contest":{"title":"Biweekly Contest 138","startTime":1725114600}},
                        {"attended":true,"rating":1531.709,"ranking":7103,"trendDirection":"UP","problemsSolved":2,"totalProblems":4,"finishTimeInSeconds":3174,"contest":{"title":"Weekly Contest 414","startTime":1725762600}},
                        {"attended":true,"rating":1493.232,"ranking":24233,"trendDirection":"DOWN","problemsSolved":1,"totalProblems":4,"finishTimeInSeconds":3301,"contest":{"title":"Biweekly Contest 139","startTime":1726324200}},
                        {"attended":true,"rating":1522.648,"ranking":8438,"trendDirection":"UP","problemsSolved":2,"totalProblems":4,"finishTimeInSeconds":4066,"contest":{"title":"Weekly Contest 415","startTime":1726367400}},
                        {"attended":true,"rating":1504.887,"ranking":16936,"trendDirection":"DOWN","problemsSolved":1,"totalProblems":4,"finishTimeInSeconds":609,"contest":{"title":"Biweekly Contest 148","startTime":1737210600}},
                        {"attended":true,"rating":1492.966,"ranking":16681,"trendDirection":"DOWN","problemsSolved":1,"totalProblems":4,"finishTimeInSeconds":1829,"contest":{"title":"Biweekly Contest 149","startTime":1738420200}},
                        {"attended":true,"rating":1514.46,"ranking":8328,"trendDirection":"UP","problemsSolved":2,"totalProblems":4,"finishTimeInSeconds":3087,"contest":{"title":"Biweekly Contest 151","startTime":1740839400}},
                        {"attended":true,"rating":1521.47,"ranking":12280,"trendDirection":"UP","problemsSolved":2,"totalProblems":4,"finishTimeInSeconds":3417,"contest":{"title":"Biweekly Contest 177","startTime":1772289000}}
                    ]
                },
                submissions: { submission: [] },
                calendar: {
                    totalActiveDays: 257,
                    streak: 103,
                    submissionCalendar: "{\"1767225600\": 4, \"1767312000\": 2, \"1767657600\": 3, \"1767744000\": 2, \"1767830400\": 1, \"1767916800\": 3, \"1768003200\": 4, \"1768176000\": 2, \"1768262400\": 4, \"1768435200\": 1, \"1768521600\": 1, \"1769040000\": 2, \"1769212800\": 1, \"1769299200\": 3, \"1769472000\": 6, \"1769558400\": 3, \"1769644800\": 2, \"1769817600\": 1, \"1769904000\": 1, \"1770249600\": 3, \"1770768000\": 4, \"1771027200\": 3, \"1771113600\": 12, \"1771200000\": 1, \"1771286400\": 2, \"1771372800\": 9, \"1771459200\": 2, \"1771545600\": 8, \"1771632000\": 9, \"1771718400\": 9, \"1771804800\": 19, \"1771891200\": 11, \"1771977600\": 2, \"1772064000\": 9, \"1772150400\": 7, \"1772236800\": 10, \"1772323200\": 8, \"1772409600\": 1, \"1772496000\": 9, \"1772582400\": 7, \"1772668800\": 2, \"1772755200\": 2, \"1772841600\": 6, \"1772928000\": 1, \"1773014400\": 4, \"1773100800\": 10, \"1773360000\": 6, \"1773446400\": 2, \"1773619200\": 4, \"1773705600\": 1, \"1773792000\": 5, \"1773878400\": 2, \"1773964800\": 10, \"1774051200\": 14, \"1774137600\": 4, \"1774224000\": 6, \"1774483200\": 6, \"1774569600\": 1, \"1774656000\": 9, \"1774742400\": 9, \"1774828800\": 6, \"1775001600\": 8, \"1775174400\": 1, \"1775260800\": 3, \"1775347200\": 2, \"1775520000\": 8, \"1775606400\": 8, \"1775692800\": 6, \"1775779200\": 8, \"1775865600\": 8, \"1775952000\": 9, \"1776038400\": 2, \"1776211200\": 6, \"1776384000\": 3, \"1776470400\": 4, \"1776643200\": 2, \"1776729600\": 2, \"1776816000\": 5, \"1776902400\": 4, \"1776988800\": 2, \"1777075200\": 11, \"1777248000\": 2, \"1777593600\": 9, \"1777680000\": 5, \"1777766400\": 5, \"1777939200\": 5, \"1778025600\": 3, \"1778112000\": 6, \"1778284800\": 6, \"1778457600\": 1, \"1778544000\": 12, \"1778716800\": 3, \"1778803200\": 1, \"1779062400\": 4, \"1779148800\": 13, \"1779321600\": 8, \"1779408000\": 9, \"1779840000\": 7, \"1780012800\": 6, \"1780099200\": 1, \"1780444800\": 4, \"1780617600\": 2, \"1780704000\": 4, \"1780876800\": 7, \"1781049600\": 7, \"1781136000\": 2, \"1781222400\": 6, \"1781395200\": 3, \"1781481600\": 2, \"1781568000\": 8, \"1781740800\": 6, \"1782172800\": 6, \"1782259200\": 8, \"1782345600\": 12, \"1782432000\": 12, \"1782518400\": 14, \"1782604800\": 3, \"1782691200\": 15, \"1782777600\": 2, \"1782864000\": 1, \"1782950400\": 6, \"1783123200\": 2, \"1783296000\": 6, \"1783382400\": 6, \"1783468800\": 5, \"1783814400\": 4, \"1783900800\": 7, \"1783987200\": 6, \"1784073600\": 8, \"1784246400\": 4, \"1784332800\": 12, \"1784419200\": 3, \"1784505600\": 11, \"1784592000\": 8, \"1784678400\": 7, \"1784764800\": 10, \"1784937600\": 2, \"1785024000\": 3, \"1785110400\": 4, \"1785196800\": 7, \"1785283200\": 8, \"1753920000\": 4, \"1754006400\": 1, \"1754352000\": 2, \"1756252800\": 6, \"1756857600\": 5, \"1757030400\": 3, \"1757116800\": 3, \"1757203200\": 4, \"1757289600\": 4, \"1757635200\": 4, \"1757721600\": 1, \"1757808000\": 6, \"1757894400\": 3, \"1757980800\": 2, \"1758067200\": 8, \"1758499200\": 5, \"1758585600\": 2, \"1758672000\": 6, \"1758758400\": 3, \"1758844800\": 1, \"1758931200\": 2, \"1759017600\": 1, \"1759104000\": 1, \"1759190400\": 3, \"1759276800\": 1, \"1759363200\": 2, \"1759449600\": 1, \"1759536000\": 1, \"1759622400\": 3, \"1759708800\": 1, \"1759795200\": 5, \"1759881600\": 4, \"1759968000\": 3, \"1760054400\": 2, \"1760140800\": 5, \"1760227200\": 3, \"1760313600\": 3, \"1760400000\": 6, \"1760486400\": 4, \"1760572800\": 4, \"1760659200\": 4, \"1760745600\": 4, \"1760832000\": 4, \"1760918400\": 2, \"1761004800\": 5, \"1761091200\": 6, \"1761177600\": 1, \"1761264000\": 5, \"1761350400\": 1, \"1761436800\": 7, \"1761523200\": 6, \"1761609600\": 3, \"1761696000\": 2, \"1761782400\": 1, \"1761868800\": 1, \"1761955200\": 2, \"1762041600\": 3, \"1762128000\": 2, \"1762214400\": 2, \"1762300800\": 4, \"1762387200\": 5, \"1762473600\": 2, \"1762560000\": 3, \"1762646400\": 2, \"1762732800\": 2, \"1762819200\": 3, \"1762905600\": 4, \"1762992000\": 2, \"1763078400\": 2, \"1763164800\": 4, \"1763251200\": 3, \"1763337600\": 4, \"1763424000\": 4, \"1763510400\": 2, \"1763596800\": 2, \"1763683200\": 6, \"1763769600\": 3, \"1763856000\": 9, \"1763942400\": 3, \"1764028800\": 4, \"1764115200\": 3, \"1764201600\": 5, \"1764288000\": 2, \"1764374400\": 1, \"1764460800\": 3, \"1764547200\": 6, \"1764633600\": 3, \"1764720000\": 6, \"1764806400\": 10, \"1764892800\": 2, \"1764979200\": 1, \"1765065600\": 2, \"1765152000\": 5, \"1765238400\": 7, \"1765324800\": 4, \"1765411200\": 4, \"1765497600\": 3, \"1765584000\": 1, \"1765670400\": 4, \"1765756800\": 2, \"1765843200\": 2, \"1765929600\": 1, \"1766016000\": 3, \"1766102400\": 5, \"1766188800\": 4, \"1766275200\": 1, \"1766361600\": 1, \"1766448000\": 1, \"1766534400\": 1, \"1766620800\": 2, \"1766707200\": 3, \"1766793600\": 3, \"1766880000\": 1, \"1766966400\": 4, \"1767052800\": 6, \"1767139200\": 1}"
                }
            };
            setData(fallbackData);
            setError("Live data unavailable. Showing recent cached stats.");
            setDataSource('fallback');
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
    const rawSubmissions = data?.submissions?.submission ?? [];
    const seen = new Set();
    const submissions = rawSubmissions.filter(s => {
        const slug = s.titleSlug || s.title;
        if (!slug || seen.has(slug)) return false;
        seen.add(slug);
        return true;
    }).slice(0, 15);
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

    if (error && !data && dataSource === 'error') {
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
        <div style={{ minHeight: '100vh', background: T.bg, paddingTop: 96, paddingBottom: 60, transition: 'background 0.35s ease' }}>
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
                            background: T.surface, border: `1px solid ${T.border}`,
                            borderRadius: 20, padding: '4px 14px', fontSize: '0.82rem', color: T.muted
                        }}>@{profile.username ?? username}</span>

                        {dataSource === 'real' ? (
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
                        ) : dataSource === 'fallback' && (
                            <span style={{
                                display: 'flex', alignItems: 'center', gap: 6,
                                background: 'rgba(239,114,21,0.12)', border: '1px solid rgba(239,114,21,0.3)',
                                borderRadius: 20, padding: '4px 12px', fontSize: '0.78rem', color: T.orange
                            }}>
                                <span style={{
                                    width: 6, height: 6, borderRadius: '50%',
                                    background: T.orange, display: 'inline-block',
                                    boxShadow: `0 0 6px ${T.orange}`
                                }} />
                                Cached Data
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
                        <KPICard T={T} key={k.label} {...k} />
                    ))}
                </div>

                {/* ── Problem Distribution + Contest Chart ── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>

                    {/* Pie chart */}
                    <Card T={T} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <SectionTitle T={T} icon={Target}>Problem Distribution</SectionTitle>

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
                                        contentStyle={{ background: T.tooltipBg, border: `1px solid ${T.border}`, borderRadius: 8 }}
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
                                        <div style={{ height: 6, borderRadius: 4, background: T.border }}>
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
                    <Card T={T} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                        <SectionTitle T={T} icon={TrendingUp}>
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
                                <CartesianGrid strokeDasharray="3 3" stroke={T.gridStroke} />
                                <XAxis dataKey="title" hide />
                                <YAxis
                                    domain={['auto', 'auto']}
                                    tick={{ fill: T.muted, fontSize: 11 }}
                                    width={45}
                                />
                                <Tooltip content={<ContestTooltip T={T} />} />
                                <Line
                                    type="monotone"
                                    dataKey="rating"
                                    stroke={T.orange}
                                    strokeWidth={2}
                                    dot={false}
                                    activeDot={{ r: 5, fill: T.orange, stroke: T.bg, strokeWidth: 2 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>
                </div>

                {/* ── Badges ── */}
                {badges.length > 0 && (
                    <Card
                        T={T}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        style={{ marginBottom: '1.75rem' }}
                    >
                        <SectionTitle T={T} icon={Award}>
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
                                        background: T.surfaceHover,
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

                {/* ── Recent Submissions ── */}
                <Card
                    T={T}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                >
                    <SectionTitle T={T} icon={Clock}>Recent Submissions</SectionTitle>

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
                                            style={{ borderBottom: `1px solid ${T.border}` }}
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
                                                        ? `${T.green}25` : `${T.red}25`,
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

                {/* ── Activity Calendar ── */}
                <SubmissionCalendar T={T} calendarData={calendarData} />

            </div>
        </div>
    );
};

export default LeetCode;