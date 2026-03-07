'use client'

import React, { useEffect, useRef, useState } from 'react'
import { portfolioData } from '../data/data'

/* ─── Colour palettes per category ────────────────────────────────────────── */
const CATEGORIES = [
  {
    key: 'languages',
    title: 'Languages',
    icon: '💻',
    from: '#6366f1',
    to: '#a855f7',
    glow: 'rgba(99,102,241,0.25)',
  },
  {
    key: 'frameworks',
    title: 'Frameworks & Libs',
    icon: '🔧',
    from: '#a855f7',
    to: '#ec4899',
    glow: 'rgba(168,85,247,0.25)',
  },
  {
    key: 'dataScience',
    title: 'Data Science & ML',
    icon: '🧠',
    from: '#ec4899',
    to: '#f43f5e',
    glow: 'rgba(236,72,153,0.25)',
  },
  {
    key: 'tools',
    title: 'Tools & Databases',
    icon: '🛠️',
    from: '#10b981',
    to: '#06b6d4',
    glow: 'rgba(16,185,129,0.25)',
  },
]

/* ─── Individual skill row with animated bar ─────────────────────────────── */
function SkillRow({ skill, from, to, delay, visible }) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => setWidth(skill.level), delay)
    return () => clearTimeout(t)
  }, [visible, delay, skill.level])

  const levelLabel =
    skill.level >= 90 ? 'Expert' :
      skill.level >= 75 ? 'Advanced' :
        skill.level >= 60 ? 'Proficient' : 'Familiar'

  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '1.1rem' }}>{skill.icon}</span>
          <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--sk-text)' }}>
            {skill.name}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            fontSize: '0.7rem', fontWeight: 500, color: 'var(--sk-muted)',
            background: 'rgba(255,255,255,0.06)', borderRadius: 20, padding: '2px 8px'
          }}>
            {levelLabel}
          </span>
          <span style={{
            fontSize: '0.8rem', fontWeight: 700,
            background: `linear-gradient(135deg,${from},${to})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            {skill.level}%
          </span>
        </div>
      </div>

      {/* Track */}
      <div style={{
        height: 6, borderRadius: 3, overflow: 'hidden',
        background: 'rgba(255,255,255,0.07)',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)',
      }}>
        <div style={{
          height: '100%', borderRadius: 3,
          background: `linear-gradient(90deg,${from},${to})`,
          width: `${width}%`,
          transition: 'width 1s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: `0 0 8px ${from}80`,
        }} />
      </div>
    </div>
  )
}

/* ─── Category card ──────────────────────────────────────────────────────── */
function SkillCard({ category, skills, visible, cardDelay }) {
  return (
    <div
      style={{
        borderRadius: 18,
        padding: '1.5rem',
        background: 'var(--sk-card-bg)',
        border: '1px solid var(--sk-card-border)',
        backdropFilter: 'blur(12px)',
        boxShadow: `0 8px 32px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.04)`,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transitionDelay: `${cardDelay}ms`,
        transitionProperty: 'opacity, transform',
        transitionDuration: '0.5s',
        transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = `0 16px 48px rgba(0,0,0,0.2), 0 0 24px ${category.glow}`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = `0 8px 32px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.04)`
      }}
    >
      {/* Card header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.25rem' }}>
        <div style={{
          width: 42, height: 42, borderRadius: 12,
          background: `linear-gradient(135deg,${category.from},${category.to})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.25rem', flexShrink: 0,
          boxShadow: `0 4px 14px ${category.glow}`,
        }}>
          {category.icon}
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--sk-text)' }}>
            {category.title}
          </h3>
          <span style={{ fontSize: '0.72rem', color: 'var(--sk-muted)' }}>
            {skills.length} skills
          </span>
        </div>
      </div>

      {/* Divider */}
      <div style={{
        height: 1, marginBottom: '1.25rem',
        background: `linear-gradient(90deg,${category.from}40,transparent)`,
      }} />

      {skills.map((skill, i) => (
        <SkillRow
          key={skill.name}
          skill={skill}
          from={category.from}
          to={category.to}
          delay={i * 80}
          visible={visible}
        />
      ))}
    </div>
  )
}

/* ─── Soft‑skill badges ─────────────────────────────────────────────────── */
const SOFT_SKILLS = [
  { icon: '🧩', label: 'Problem Solving' },
  { icon: '🤝', label: 'Team Player' },
  { icon: '📚', label: 'Fast Learner' },
  { icon: '🚀', label: 'Self-Driven' },
  { icon: '🔍', label: 'Attention to Detail' },
  { icon: '🗣️', label: 'Communication' },
]

/* ─── Main component ─────────────────────────────────────────────────────── */
export default function Skills() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.08 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  const { skills } = portfolioData

  return (
    <section id="skills" ref={sectionRef}
      className="py-24 bg-gray-50 dark:bg-gray-900"
    >
      {/* CSS variables scoped to this section */}
      <style>{`
        #skills {
          --sk-text:         #0f172a;
          --sk-muted:        #64748b;
          --sk-card-bg:      rgba(255,255,255,0.7);
          --sk-card-border:  rgba(0,0,0,0.07);
        }
        .dark #skills {
          --sk-text:         #e2e8f0;
          --sk-muted:        #94a3b8;
          --sk-card-bg:      rgba(255,255,255,0.04);
          --sk-card-border:  rgba(255,255,255,0.07);
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ─────────────────────────────────────────────── */}
        <div style={{
          textAlign: 'center', marginBottom: '3.5rem',
          opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ height: 2, width: 40, background: 'linear-gradient(90deg,transparent,#a855f7)', borderRadius: 1 }} />
            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-widest">
              Skills & Expertise
            </span>
            <div style={{ height: 2, width: 40, background: 'linear-gradient(90deg,#a855f7,transparent)', borderRadius: 1 }} />
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Technical{' '}
            <span style={{
              background: 'linear-gradient(135deg,#6366f1,#a855f7,#ec4899)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Proficiency
            </span>
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Technologies I work with every day — from frontend to AI/ML pipelines.
          </p>
        </div>

        {/* ── Skills grid ─────────────────────────────────────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(500px, 100%), 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}>
          {CATEGORIES.map((cat, i) => (
            <SkillCard
              key={cat.key}
              category={cat}
              skills={skills[cat.key] ?? []}
              visible={visible}
              cardDelay={i * 100}
            />
          ))}
        </div>

        {/* ── Soft skills ─────────────────────────────────────────────────── */}
        <div style={{
          textAlign: 'center',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s 0.4s ease, transform 0.6s 0.4s ease',
        }}>
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-5">
            Beyond the Stack
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
            {SOFT_SKILLS.map((s, i) => (
              <div key={i}
                style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  padding: '8px 18px', borderRadius: 50,
                  background: 'var(--sk-card-bg)',
                  border: '1px solid var(--sk-card-border)',
                  backdropFilter: 'blur(8px)',
                  fontSize: '0.84rem', fontWeight: 500,
                  color: 'var(--sk-text)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'default',
                  opacity: visible ? 1 : 0,
                  transitionDelay: `${500 + i * 60}ms`,
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(168,85,247,0.2)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <span>{s.icon}</span> {s.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}