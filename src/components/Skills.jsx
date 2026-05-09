'use client'

import { useEffect, useRef, useState } from 'react'
import { portfolioData } from '../data/data'

const CATS = [
  { key: 'languages',  title: 'Languages',           emoji: '💻', barColor: '#818cf8', badgeCls: 'sk-lang' },
  { key: 'frameworks', title: 'Frameworks & Libs',   emoji: '🔧', barColor: '#4ade80', badgeCls: 'sk-fw'   },
  { key: 'dataScience',title: 'Data Science & ML',   emoji: '🧠', barColor: 'var(--teal)', badgeCls: 'sk-ds' },
  { key: 'tools',      title: 'Tools & Databases',   emoji: '🛠️', barColor: '#fb923c', badgeCls: 'sk-tool' },
]

function SkillBar({ skill, color, visible, delay }) {
  const [w, setW] = useState(0)
  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => setW(skill.level), delay)
    return () => clearTimeout(t)
  }, [visible, delay, skill.level])

  const label = skill.level >= 90 ? 'Expert' : skill.level >= 75 ? 'Advanced' : skill.level >= 60 ? 'Proficient' : 'Familiar'

  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-base">{skill.icon}</span>
          <span className="text-sm font-medium" style={{ color: 'var(--text-2)' }}>{skill.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="mono text-xs px-2 py-0.5 rounded-full" style={{
            background: 'var(--elevated)', color: 'var(--text-3)',
            border: '1px solid var(--border)', fontSize: '.65rem',
          }}>{label}</span>
          <span className="mono text-xs font-bold" style={{ color, minWidth: 32, textAlign: 'right' }}>{skill.level}%</span>
        </div>
      </div>
      <div className="bar-track">
        <div style={{
          height: '100%', borderRadius: 3,
          background: color, width: `${w}%`,
          transition: 'width 1s cubic-bezier(.4,0,.2,1)',
          boxShadow: `0 0 6px ${color}66`,
        }} />
      </div>
    </div>
  )
}

const SOFT = ['🧩 Problem Solving', '🤝 Team Player', '📚 Fast Learner', '🚀 Self-Driven', '🔍 Detail-Oriented', '🗣️ Communication']

export default function Skills() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.05 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="skills" ref={ref} className="py-20" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          className="text-center mb-12 transition-all duration-500"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)' }}
        >
          <span className="section-label">Skills & Expertise</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold" style={{ color: 'var(--text)' }}>
            Technical <span style={{ color: 'var(--accent)' }}>Proficiency</span>
          </h2>
          <p className="mt-2 max-w-lg mx-auto text-sm" style={{ color: 'var(--text-3)' }}>
            Technologies I work with daily — from frontend to AI/ML pipelines.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-10">
          {CATS.map((cat, ci) => {
            const skillList = portfolioData.skills[cat.key] ?? []
            return (
              <div
                key={cat.key}
                className="card p-6 transition-all duration-500"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'none' : 'translateY(24px)',
                  transitionDelay: `${ci * 80}ms`,
                }}
              >
                {/* Card header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background: 'var(--elevated)', border: '1px solid var(--border)' }}>
                    {cat.emoji}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm" style={{ color: 'var(--text)' }}>{cat.title}</h3>
                    <span className="mono text-xs" style={{ color: 'var(--text-3)' }}>{skillList.length} skills</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="mb-4" style={{ height: 1, background: 'var(--border)' }} />

                {/* Pill tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {skillList.map(s => (
                    <span key={s.name} className={`badge ${cat.badgeCls}`}>{s.icon} {s.name}</span>
                  ))}
                </div>

                {/* Bars */}
                <div>
                  {skillList.map((s, si) => (
                    <SkillBar key={s.name} skill={s} color={cat.barColor} visible={visible} delay={si * 70} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Soft skills */}
        <div
          className="text-center transition-all duration-500"
          style={{ opacity: visible ? 1 : 0, transitionDelay: '0.35s' }}
        >
          <p className="mono text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--text-3)' }}>Beyond the Stack</p>
          <div className="flex flex-wrap justify-center gap-2">
            {SOFT.map(s => (
              <span key={s} className="badge badge-gray text-xs">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}