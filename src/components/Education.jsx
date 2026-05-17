'use client'

import { useEffect, useRef, useState } from 'react'
import { Calendar, MapPin, Award, BookOpen, Trophy, Star, CheckCircle } from 'lucide-react'
import { portfolioData } from '../data/data'

export default function Education() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [barW, setBarW] = useState(0)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          setTimeout(() => setBarW(98), 500)
          obs.disconnect()
        }
      },
      { threshold: 0.06 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const { education } = portfolioData

  return (
    <section id="education" ref={ref} className="py-20" style={{ background: 'var(--surface)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          className="text-center mb-12 transition-all duration-500"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)' }}
        >
          <span className="section-label">Education & Learning</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold" style={{ color: 'var(--text)' }}>
            Academic <span style={{ color: 'var(--accent)' }}>Journey</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          {/* Degree card */}
          <div
            className="card p-6 transition-all duration-500"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateX(-20px)',
              transitionDelay: '0.1s',
            }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'var(--accent-a)', border: '1px solid rgba(255,161,22,.2)' }}>
                <BookOpen size={20} style={{ color: 'var(--accent)' }} />
              </div>
              <div>
                <h3 className="font-bold text-base" style={{ color: 'var(--text)' }}>{education.degree}</h3>
                <span className="badge badge-green mt-1">{education.status}</span>
              </div>
            </div>

            <div className="space-y-2.5 mb-5">
              {[
                { icon: Calendar, text: education.year },
                { icon: MapPin,   text: education.institution },
                { icon: Star,     text: `GPA: ${education.gpa}` },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5">
                  <Icon size={13} style={{ color: 'var(--accent)' }} />
                  <span className="text-sm" style={{ color: 'var(--text-2)' }}>{text}</span>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mb-5">
              <div className="flex justify-between mb-1.5">
                <span className="text-xs" style={{ color: 'var(--text-3)' }}>Academic Progress</span>
                <span className="mono text-xs font-bold" style={{ color: 'var(--accent)' }}>98%</span>
              </div>
              <div className="bar-track">
                <div style={{
                  height: '100%', borderRadius: 3,
                  background: 'var(--accent)', width: `${barW}%`,
                  transition: 'width 1.3s ease',
                  boxShadow: '0 0 8px rgba(255,161,22,.4)',
                }} />
              </div>
            </div>

            {/* Achievements */}
            <div>
              <p className="mono text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--text-3)' }}>Achievements</p>
              <div className="space-y-2">
                {education.achievements.map((a, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Trophy size={12} style={{ color: 'var(--yellow)', flexShrink: 0 }} />
                    <span className="text-sm" style={{ color: 'var(--text-2)' }}>{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Coursework */}
          <div
            className="card p-6 transition-all duration-500"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateY(20px)',
              transitionDelay: '0.2s',
            }}
          >
            <div className="flex items-center gap-2.5 mb-5">
              <BookOpen size={17} style={{ color: 'var(--teal)' }} />
              <h3 className="font-semibold text-base" style={{ color: 'var(--text)' }}>Key Coursework</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {education.coursework.map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle size={12} style={{ color: 'var(--teal)', flexShrink: 0 }} />
                  <span className="text-sm" style={{ color: 'var(--text-2)' }}>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div
          className="transition-all duration-500"
          style={{ opacity: visible ? 1 : 0, transitionDelay: '0.3s' }}
        >
          <div className="flex items-center gap-2.5 mb-5">
            <Award size={17} style={{ color: 'var(--accent)' }} />
            <h3 className="font-semibold text-base" style={{ color: 'var(--text)' }}>Professional Certifications</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {education.certifications.map((c, i) => (
              <div key={i} className="card p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-semibold text-sm leading-snug" style={{ color: 'var(--text)' }}>{c.name}</h4>
                  <span className="badge badge-green flex-shrink-0 mono">{c.year}</span>
                </div>
                <p className="font-semibold text-xs mb-2" style={{ color: 'var(--accent)' }}>{c.issuer}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}