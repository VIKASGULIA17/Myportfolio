'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowDown, Download, ExternalLink, MapPin, Mail, Terminal } from 'lucide-react'
import { portfolioData } from '../data/data'

const TITLES = ['Data Scientist', 'ML Engineer', 'Full Stack Developer', 'Problem Solver']

export default function Hero() {
  const [visible,  setVisible]  = useState(false)
  const [typed,    setTyped]    = useState('')
  const [deleting, setDeleting] = useState(false)
  const [idx,      setIdx]      = useState(0)
  const [particles, setParticles] = useState([])
  const ref = useRef(null)

  // Reveal on mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  // Typewriter
  useEffect(() => {
    const full = TITLES[idx]
    let timer
    if (!deleting && typed === full) {
      timer = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && typed === '') {
      setDeleting(false)
      setIdx(p => (p + 1) % TITLES.length)
    } else {
      timer = setTimeout(() => {
        setTyped(p => deleting ? p.slice(0, -1) : full.slice(0, p.length + 1))
      }, deleting ? 45 : 85)
    }
    return () => clearTimeout(timer)
  }, [typed, deleting, idx])

  // Particles (client only)
  useEffect(() => {
    setParticles([...Array(20)].map((_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 6,
      dur: 6 + Math.random() * 10,
      size: 2 + Math.random() * 3,
      type: i % 3,
    })))
  }, [])

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      style={{ background: 'var(--bg)' }}
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute" style={{
          top: '-5%', right: '-5%', width: 500, height: 500,
          background: 'radial-gradient(circle, var(--glow-orange) 0%, transparent 70%)',
          animation: 'orb 16s ease-in-out infinite',
        }} />
        <div className="absolute" style={{
          bottom: '-5%', left: '-5%', width: 450, height: 450,
          background: 'radial-gradient(circle, var(--glow-teal) 0%, transparent 70%)',
          animation: 'orb 20s ease-in-out infinite reverse',
        }} />
        {/* Grid/Dots */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(var(--border) 1.5px, transparent 1.5px)',
          backgroundSize: '40px 40px',
          opacity: 0.6,
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)',
        }} />
        {/* Particles */}
        {particles.map((p, i) => (
          <div key={i} className="absolute rounded-full anim-float" style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            background: p.type === 0 ? 'var(--accent)' : p.type === 1 ? 'var(--teal)' : 'var(--text-3)',
            opacity: 0.2,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
          }} />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── Left: Text ──────────────────────────────────────────── */}
          <div
            className="space-y-6 transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)' }}
          >
            {/* Terminal chip */}
            <div
              className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs mono"
              style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                color: 'var(--text-3)',
              }}
            >
              <Terminal size={11} style={{ color: 'var(--accent)' }} />
              ~/vikas/portfolio
              <span className="anim-blink font-bold" style={{ color: 'var(--green)' }}>●</span>
            </div>

            {/* Name */}
            <div>
              <h1 className="font-bold leading-tight" style={{
                fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                color: 'var(--text)',
              }}>
                Hi, I'm{' '}
                <span style={{ color: 'var(--accent)', fontFamily: "'JetBrains Mono', monospace" }}>
                  {portfolioData.personal.name}
                </span>
              </h1>

              {/* Typewriter */}
              <div className="flex items-center gap-1 mt-2">
                <span className="font-medium mono" style={{
                  fontSize: 'clamp(.95rem, 2.5vw, 1.2rem)',
                  color: 'var(--text-2)',
                }}>
                  {typed}
                </span>
                <span className="anim-blink inline-block rounded-sm" style={{
                  width: 2, height: 'clamp(1rem, 2.5vw, 1.25rem)',
                  background: 'var(--accent)', flexShrink: 0,
                }} />
              </div>
            </div>

            {/* Bio */}
            <p style={{ color: 'var(--text-3)', maxWidth: 520, fontSize: '1rem' }}>
              {portfolioData.personal.tagline}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap gap-4">
              <span className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--text-3)' }}>
                <MapPin size={13} style={{ color: 'var(--accent)' }} />
                {portfolioData.personal.location}
              </span>
              <span className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--text-3)' }}>
                <Mail size={13} style={{ color: 'var(--teal)' }} />
                {portfolioData.personal.email}
              </span>
              <span className="flex items-center gap-1.5 text-sm">
                <span className="w-2 h-2 rounded-full anim-pulse-dot flex-shrink-0" style={{ background: 'var(--green)' }} />
                <span className="font-medium" style={{ color: 'var(--green)' }}>Open to opportunities</span>
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                <ExternalLink size={15} /> View Projects
              </button>
              <a href="/vikas_resume.pdf" download className="btn-outline">
                <Download size={15} /> Download Resume
              </a>
            </div>
          </div>

          {/* ── Right: Avatar + stats ──────────────────────────────── */}
          <div
            className="flex flex-col items-center gap-6 transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateY(24px)',
              transitionDelay: '0.18s',
            }}
          >
            {/* Avatar */}
            <div className="relative">
              <div className="rounded-full p-[3px]" style={{
                background: 'conic-gradient(var(--accent) 0deg, var(--teal) 120deg, var(--accent) 240deg, var(--teal) 360deg)',
                width: 220, height: 220,
              }}>
                <div className="w-full h-full rounded-full overflow-hidden" style={{ border: '4px solid var(--bg)' }}>
                  <Image src="/image.png" alt={portfolioData.personal.name} width={220} height={220}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} priority />
                </div>
              </div>

              {/* Badge: LeetCode */}
              <div className="absolute -top-2 -right-2 anim-float rounded-md px-2.5 py-1 text-xs font-bold mono"
                style={{
                  background: 'var(--accent)', color: '#111',
                  boxShadow: '0 4px 14px rgba(255,161,22,.4)',
                  animationDelay: '0s',
                }}>
                550+ LC
              </div>

              {/* Badge: ML */}
              <div className="absolute -bottom-2 -left-2 anim-float rounded-md px-2.5 py-1 text-xs font-semibold mono"
                style={{
                  background: 'var(--surface)', border: '1px solid var(--teal)',
                  color: 'var(--teal)',
                  animationDelay: '1s',
                }}>
                ML / AI
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
              {portfolioData.about.stats.map((s, i) => (
                <div
                  key={i}
                  className="card rounded-xl p-4 text-center cursor-default"
                  style={{ transition: 'none' }}
                >
                  <div className="font-bold mono text-2xl leading-none" style={{
                    color: i % 2 === 0 ? 'var(--accent)' : 'var(--teal)',
                  }}>
                    {s.value}
                  </div>
                  <div className="text-xs mt-1.5" style={{ color: 'var(--text-3)' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full flex items-center justify-center anim-float cursor-pointer border-none transition-all"
        style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          color: 'var(--text-3)',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-3)' }}
      >
        <ArrowDown size={16} />
      </button>
    </section>
  )
}
