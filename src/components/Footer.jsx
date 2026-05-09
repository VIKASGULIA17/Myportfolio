'use client'

import { Code2, Github, Linkedin, Instagram, ArrowUp, Heart, Mail } from 'lucide-react'
import { portfolioData } from '../data/data'

const LINKS = [
  { name: 'About',    href: '#about'    },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills',   href: '#skills'   },
  { name: 'Blog',     href: '#blog'     },
  { name: 'Contact',  href: '#contact'  },
]

const SOCIALS = [
  { icon: Github,    url: portfolioData.personal.github,    label: 'GitHub'    },
  { icon: Linkedin,  url: portfolioData.personal.linkedin,  label: 'LinkedIn'  },
  { icon: Instagram, url: portfolioData.personal.instagram, label: 'Instagram' },
]

const scroll = (h) => document.querySelector(h)?.scrollIntoView({ behavior: 'smooth' })

export default function Footer() {
  return (
    <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'var(--accent)' }}>
                <Code2 size={15} color="#111" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-base mono" style={{ color: 'var(--text)' }}>
                vikas<span style={{ color: 'var(--accent)' }}>.dev</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-5 max-w-xs" style={{ color: 'var(--text-3)' }}>
              {portfolioData.personal.tagline}
            </p>
            <div className="flex gap-2.5">
              {SOCIALS.map(({ icon: Icon, url, label }) => (
                <a
                  key={label} href={url} target="_blank" rel="noopener noreferrer" title={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{ background: 'var(--elevated)', border: '1px solid var(--border)', color: 'var(--text-3)', textDecoration: 'none' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--accent)'
                    e.currentTarget.style.color = 'var(--accent)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.color = 'var(--text-3)'
                    e.currentTarget.style.transform = 'none'
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mono text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--text-3)' }}>Navigation</h4>
            <ul className="space-y-2.5">
              {LINKS.map(l => (
                <li key={l.name}>
                  <button
                    onClick={() => scroll(l.href)}
                    className="text-sm cursor-pointer border-none bg-transparent p-0 transition-colors duration-200"
                    style={{ color: 'var(--text-3)' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-3)' }}
                  >
                    {l.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mono text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--text-3)' }}>Contact</h4>
            <div className="space-y-3">
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="flex items-center gap-2 text-sm no-underline transition-colors duration-200"
                style={{ color: 'var(--text-3)' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--teal)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-3)' }}
              >
                <Mail size={13} /> {portfolioData.personal.email}
              </a>
              <p className="text-sm" style={{ color: 'var(--text-3)' }}>📍 {portfolioData.personal.location}</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full anim-pulse-dot" style={{ background: 'var(--green)' }} />
                <span className="text-sm font-medium" style={{ color: 'var(--green)' }}>Open to work</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between flex-wrap gap-3">
          <p className="mono text-xs flex items-center gap-1.5" style={{ color: 'var(--text-3)' }}>
            © {new Date().getFullYear()} {portfolioData.personal.name} · Made with
            <Heart size={11} color="var(--red)" fill="var(--red)" />
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1.5 mono text-xs px-3 py-1.5 rounded-lg cursor-pointer border transition-all duration-200 bg-transparent"
            style={{ color: 'var(--text-3)', borderColor: 'var(--border)' }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.color = 'var(--accent)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-3)'
            }}
          >
            <ArrowUp size={12} /> Back to top
          </button>
        </div>
      </div>
    </footer>
  )
}