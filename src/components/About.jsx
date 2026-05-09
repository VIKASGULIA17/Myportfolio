'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronRight, Code, Database, Lightbulb, Trophy } from 'lucide-react'
import { portfolioData } from '../data/data'

export default function About() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.08 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const ICONS = [
    { icon: Code,      label: 'Development', color: 'var(--teal)'   },
    { icon: Database,  label: 'Data Science', color: 'var(--accent)' },
    { icon: Lightbulb, label: 'Innovation',   color: 'var(--yellow)' },
    { icon: Trophy,    label: 'Excellence',   color: 'var(--green)'  },
  ]

  return (
    <section id="about" ref={ref} className="py-20" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          className="text-center mb-12 transition-all duration-500"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)' }}
        >
          <span className="section-label">About Me</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold" style={{ color: 'var(--text)' }}>
            Crafting Solutions with{' '}
            <span style={{ color: 'var(--accent)' }}>Data-Driven Insights</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left: description + highlights */}
          <div
            className="card p-6 sm:p-8 transition-all duration-500"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateX(-20px)',
              transitionDelay: '0.1s',
            }}
          >
            <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-2)' }}>
              {portfolioData.about.description}
            </p>

            <div className="space-y-3 mb-8">
              {portfolioData.about.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <ChevronRight size={15} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }} />
                  <span className="text-sm" style={{ color: 'var(--text-2)' }}>{h}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2.5">
              {ICONS.map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium cursor-default transition-all duration-200"
                  style={{
                    background: 'var(--elevated)', border: '1px solid var(--border)',
                    color: 'var(--text-2)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = color
                    e.currentTarget.style.color = color
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.color = 'var(--text-2)'
                  }}
                >
                  <Icon size={13} color={color} />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Right: stats + cards */}
          <div
            className="flex flex-col gap-4 transition-all duration-500"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateX(20px)',
              transitionDelay: '0.2s',
            }}
          >
            {/* Stats */}
            <div className="card p-6">
              <p className="mono text-xs mb-5 uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>
                by the numbers
              </p>
              <div className="grid grid-cols-2 gap-4">
                {portfolioData.about.stats.map((s, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-4 text-center"
                    style={{ background: 'var(--elevated)', border: '1px solid var(--border)' }}
                  >
                    <div className="mono font-bold text-2xl leading-none" style={{
                      color: i % 2 === 0 ? 'var(--accent)' : 'var(--teal)',
                    }}>
                      {s.value}
                    </div>
                    <div className="text-xs mt-2" style={{ color: 'var(--text-3)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div
              className="rounded-xl px-5 py-4 flex items-center gap-3"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderLeft: '3px solid var(--green)',
              }}
            >
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 anim-pulse-dot" style={{ background: 'var(--green)' }} />
              <div>
                <p className="font-semibold text-sm" style={{ color: 'var(--green)' }}>Available for Opportunities</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>Actively exploring roles, freelance & collaborations</p>
              </div>
            </div>

            {/* Education snippet */}
            <div className="card p-5">
              <p className="mono text-xs mb-2 uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>🎓 Education</p>
              <p className="font-semibold" style={{ color: 'var(--text)' }}>{portfolioData.education.degree}</p>
              <p className="text-sm mt-0.5" style={{ color: 'var(--accent)' }}>
                {portfolioData.education.institution} · {portfolioData.education.year}
              </p>
              <p className="mono text-sm mt-1 font-semibold" style={{ color: 'var(--green)' }}>
                GPA: {portfolioData.education.gpa}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}