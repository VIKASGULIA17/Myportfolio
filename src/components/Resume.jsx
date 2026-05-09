'use client'

import { useState } from 'react'
import {
  Download, Mail, Phone, MapPin, Github, Linkedin, ExternalLink,
  Calendar, Award, Code2, GraduationCap, Trophy, BookOpen,
  User, FileText, Eye, X,
} from 'lucide-react'
import { portfolioData } from '../data/data'

/* ── PDF Viewer Modal ──────────────────────────────────────────────────── */
function PdfViewer({ onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col" style={{ background: 'rgba(0,0,0,.87)', backdropFilter: 'blur(8px)' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 flex-shrink-0"
        style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2.5">
          <FileText size={15} style={{ color: 'var(--accent)' }} />
          <span className="mono text-sm" style={{ color: 'var(--text-2)' }}>vikas_resume.pdf</span>
        </div>
        <div className="flex items-center gap-2.5">
          <a href="/vikas_resume.pdf" download className="btn-primary" style={{ padding: '6px 14px', fontSize: '.8rem' }}>
            <Download size={13} /> Download
          </a>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-lg cursor-pointer border transition-all"
            style={{ background: 'var(--elevated)', border: '1px solid var(--border)', color: 'var(--text-3)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--red)'; e.currentTarget.style.color = 'var(--red)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-3)' }}>
            <X size={16} />
          </button>
        </div>
      </div>
      {/* PDF */}
      <div className="flex-1 p-4 overflow-hidden">
        <iframe src="/vikas_resume.pdf#view=FitH" title="Resume" className="w-full h-full rounded-xl" style={{ border: 'none', background: '#fff' }} />
      </div>
    </div>
  )
}

/* ── Skill bar ─────────────────────────────────────────────────────────── */
function SBar({ skill, color }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-sm" style={{ color: 'var(--text-2)' }}>{skill.icon} {skill.name}</span>
        <span className="mono text-xs font-bold" style={{ color }}>{skill.level}%</span>
      </div>
      <div className="bar-track">
        <div style={{ height: '100%', borderRadius: 3, background: color, width: `${skill.level}%`, boxShadow: `0 0 5px ${color}66` }} />
      </div>
    </div>
  )
}

/* ── Main ──────────────────────────────────────────────────────────────── */
export default function Resume() {
  const [pdfOpen, setPdfOpen] = useState(false)
  const { personal, about, projects, skills, education } = portfolioData

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', paddingTop: 80 }}>
      {pdfOpen && <PdfViewer onClose={() => setPdfOpen(false)} />}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="mb-8">
          <span className="section-label">Resume / CV</span>
          <div className="flex items-center justify-between flex-wrap gap-4 mt-3">
            <h1 className="text-3xl font-bold" style={{ color: 'var(--text)' }}>{personal.name}</h1>
            <div className="flex gap-3">
              <button onClick={() => setPdfOpen(true)} className="btn-primary">
                <Eye size={15} /> View PDF
              </button>
              <a href="/vikas_resume.pdf" download className="btn-outline">
                <Download size={15} /> Download
              </a>
            </div>
          </div>
        </div>

        {/* Profile */}
        <div className="card p-6 mb-6 flex items-start gap-5 flex-wrap">
          <img src="/image.png" alt={personal.name} className="w-20 h-20 rounded-full object-cover flex-shrink-0"
            style={{ border: '3px solid var(--accent)', boxShadow: '0 0 0 4px var(--accent-a)' }} />
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold mb-1" style={{ color: 'var(--text)' }}>{personal.title}</h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-3)' }}>{about.description}</p>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: Mail,   val: personal.email,    href: `mailto:${personal.email}` },
                { icon: Phone,  val: personal.phone,    href: `tel:${personal.phone}` },
                { icon: MapPin, val: personal.location, href: null },
                { icon: Github, val: 'GitHub',          href: personal.github },
              ].map(({ icon: Icon, val, href }) => (
                <div key={val} className="flex items-center gap-1.5">
                  <Icon size={12} style={{ color: 'var(--accent)' }} />
                  {href ? (
                    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                      className="text-sm no-underline" style={{ color: 'var(--teal)' }}>{val}</a>
                  ) : (
                    <span className="text-sm" style={{ color: 'var(--text-3)' }}>{val}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Two-col layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left (2/3) */}
          <div className="lg:col-span-2 space-y-5">

            {/* Highlights */}
            <div className="card p-6">
              <div className="flex items-center gap-2.5 mb-4">
                <User size={15} style={{ color: 'var(--accent)' }} />
                <h3 className="font-semibold" style={{ color: 'var(--text)' }}>Highlights</h3>
              </div>
              <div className="space-y-2.5">
                {about.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-sm flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }}>▸</span>
                    <span className="text-sm" style={{ color: 'var(--text-2)' }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="card p-6">
              <div className="flex items-center gap-2.5 mb-5">
                <GraduationCap size={15} style={{ color: 'var(--teal)' }} />
                <h3 className="font-semibold" style={{ color: 'var(--text)' }}>Education</h3>
              </div>
              <div className="pl-4" style={{ borderLeft: '2px solid var(--accent)' }}>
                <h4 className="font-semibold mb-1" style={{ color: 'var(--text)' }}>{education.degree}</h4>
                <p className="font-semibold text-sm mb-2" style={{ color: 'var(--accent)' }}>{education.institution}</p>
                <div className="flex flex-wrap gap-4 mb-3">
                  <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-3)' }}>
                    <Calendar size={10} /> {education.year}
                  </span>
                  <span className="mono text-xs font-bold" style={{ color: 'var(--green)' }}>GPA: {education.gpa}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {education.achievements.map((a, i) => (
                    <span key={i} className="badge badge-teal"><Trophy size={9} /> {a}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Featured Projects */}
            <div className="card p-6">
              <div className="flex items-center gap-2.5 mb-5">
                <Code2 size={15} style={{ color: 'var(--green)' }} />
                <h3 className="font-semibold" style={{ color: 'var(--text)' }}>Featured Projects</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projects.filter(p => p.featured).slice(0, 4).map(p => (
                  <div key={p.id} className="rounded-xl p-4 transition-all duration-200"
                    style={{ background: 'var(--elevated)', border: '1px solid var(--border)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)' }}>
                    <h4 className="font-semibold text-sm mb-1.5" style={{ color: 'var(--text)' }}>{p.title}</h4>
                    <p className="text-xs leading-relaxed mb-2.5" style={{
                      color: 'var(--text-3)',
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>{p.description}</p>
                    <div className="flex flex-wrap gap-1 mb-2.5">
                      {p.tech.slice(0, 3).map(t => <span key={t} className="badge badge-orange" style={{ fontSize: '.6rem' }}>{t}</span>)}
                    </div>
                    <div className="flex gap-3">
                      <a href={p.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 no-underline text-xs font-semibold" style={{ color: 'var(--accent)' }}>
                        <ExternalLink size={10} /> Live
                      </a>
                      <a href={p.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 no-underline text-xs" style={{ color: 'var(--text-3)' }}>
                        <Github size={10} /> Code
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="card p-6">
              <div className="flex items-center gap-2.5 mb-4">
                <Award size={15} style={{ color: 'var(--yellow)' }} />
                <h3 className="font-semibold" style={{ color: 'var(--text)' }}>Certifications</h3>
              </div>
              <div className="space-y-3">
                {education.certifications.map((c, i) => (
                  <div key={i} className="rounded-xl p-4" style={{ background: 'var(--elevated)', border: '1px solid var(--border)' }}>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-semibold text-sm leading-snug" style={{ color: 'var(--text)' }}>{c.name}</h4>
                      <span className="badge badge-green mono flex-shrink-0">{c.year}</span>
                    </div>
                    <p className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>{c.issuer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right (1/3) */}
          <div className="space-y-5">

            {/* Stats */}
            <div className="card p-5">
              <p className="mono text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--text-3)' }}>At a Glance</p>
              <div className="grid grid-cols-2 gap-2.5">
                {about.stats.map((s, i) => (
                  <div key={i} className="rounded-xl p-3 text-center"
                    style={{ background: 'var(--elevated)', border: '1px solid var(--border)' }}>
                    <div className="mono font-bold text-xl leading-none" style={{ color: i % 2 ? 'var(--teal)' : 'var(--accent)' }}>{s.value}</div>
                    <div className="text-xs mt-1.5" style={{ color: 'var(--text-3)', fontSize: '.62rem' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="card p-5">
              <p className="mono text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--text-3)' }}>Languages</p>
              {skills.languages.map(s => <SBar key={s.name} skill={s} color="#818cf8" />)}
            </div>

            {/* Frameworks */}
            <div className="card p-5">
              <p className="mono text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--text-3)' }}>Frameworks</p>
              {skills.frameworks.map(s => <SBar key={s.name} skill={s} color="var(--green)" />)}
            </div>

            {/* Data Science */}
            <div className="card p-5">
              <p className="mono text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--text-3)' }}>Data Science & ML</p>
              {skills.dataScience.map(s => <SBar key={s.name} skill={s} color="var(--teal)" />)}
            </div>

            {/* Coursework */}
            <div className="card p-5">
              <p className="mono text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--text-3)' }}>Coursework</p>
              <div className="flex flex-wrap gap-1.5">
                {education.coursework.map((c, i) => <span key={i} className="badge badge-gray" style={{ fontSize: '.62rem' }}>{c}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}