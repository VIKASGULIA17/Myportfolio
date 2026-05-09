'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Menu, X, Sun, Moon, Code2, Github, Mail, Linkedin, Twitter } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { portfolioData } from '../data/data'
import { motion, AnimatePresence } from 'framer-motion'

const NAV = [
  { label: 'About',    href: '#about',    section: true  },
  { label: 'Projects', href: '#projects', section: true  },
  { label: 'Skills',   href: '#skills',   section: true  },
  { label: 'Blog',     href: '#blog',     section: true  },
  { label: 'Resume',   href: '/resume',   section: false },
  { label: 'LeetCode', href: '/leetcode', section: false },
  { label: 'Contact',  href: '#contact',  section: true  },
]

export default function Header() {
  const [open,     setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router   = useRouter()
  const pathname = usePathname()
  const { theme, toggleTheme, mounted } = useTheme()
  const dark = theme === 'dark'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close menu on resize to desktop, and lock body scroll when open
  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setOpen(false) }
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [open])

  const go = async (item) => {
    setOpen(false)
    if (item.section) {
      if (pathname === '/') {
        document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' })
      } else {
        await router.push(`/?section=${item.href.slice(1)}`)
      }
    } else {
      router.push(item.href)
    }
  }

  const isActive = (item) => !item.section && pathname === item.href

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300"
        style={{
          background: scrolled
            ? dark ? 'rgba(26,26,26,0.85)' : 'rgba(250,250,250,0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* ── Logo ──────────────────────────────────────────── */}
            <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5 no-underline flex-shrink-0 group">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                style={{ background: 'var(--accent)', boxShadow: '0 4px 14px rgba(255,161,22,.4)' }}
              >
                <Code2 size={18} color="#111" strokeWidth={2.5} />
              </div>
              <span
                className="font-bold text-lg mono tracking-tight"
                style={{ color: 'var(--text)' }}
              >
                vikas<span style={{ color: 'var(--accent)' }}>.dev</span>
              </span>
            </Link>

            {/* ── Desktop nav ─────────────────────────────────── */}
            <nav className="hidden md:flex items-center gap-1.5 bg-surface/50 px-2 py-1.5 rounded-2xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              {NAV.map((item) => {
                const active = isActive(item)
                return item.section ? (
                  <button
                    key={item.label}
                    onClick={() => go(item)}
                    className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer border-none"
                    style={{ background: 'transparent', color: 'var(--text-3)' }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = 'var(--text)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'var(--text-3)'
                    }}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 no-underline"
                    style={{
                      color: active ? 'var(--accent)' : 'var(--text-3)',
                      background: active ? 'var(--accent-a)' : 'transparent',
                    }}
                    onMouseEnter={e => {
                      if (!active) {
                        e.currentTarget.style.color = 'var(--text)'
                      }
                    }}
                    onMouseLeave={e => {
                      if (!active) {
                        e.currentTarget.style.color = 'var(--text-3)'
                      }
                    }}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            {/* ── Right controls ───────────────────────────────── */}
            <div className="flex items-center gap-3">
              {/* Theme toggle */}
              {mounted && (
                <button
                  onClick={toggleTheme}
                  aria-label={dark ? 'Switch to light' : 'Switch to dark'}
                  className="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 cursor-pointer border-none"
                  style={{
                    background: dark ? 'rgba(255,255,255,.05)' : 'rgba(0,0,0,.04)',
                    color: dark ? 'var(--accent)' : 'var(--text-2)',
                  }}
                  onMouseEnter={e => { 
                    e.currentTarget.style.transform = 'rotate(15deg) scale(1.05)'
                    e.currentTarget.style.background = dark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.08)'
                  }}
                  onMouseLeave={e => { 
                    e.currentTarget.style.transform = 'none'
                    e.currentTarget.style.background = dark ? 'rgba(255,255,255,.05)' : 'rgba(0,0,0,.04)'
                  }}
                >
                  {dark ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              )}

              {/* Hamburger — mobile only */}
              <button
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
                className="flex md:hidden items-center justify-center w-10 h-10 rounded-xl cursor-pointer border-none transition-all relative z-[110]"
                style={{ 
                  background: open ? 'var(--accent-a)' : 'transparent', 
                  color: open ? 'var(--accent)' : 'var(--text)' 
                }}
              >
                {open ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Fullscreen Menu ──────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(24px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[90] flex flex-col pt-24 px-6 pb-8 md:hidden"
            style={{ background: dark ? 'rgba(26,26,26,.95)' : 'rgba(250,250,250,.95)' }}
          >
            <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
              {NAV.map((item, i) => {
                const active = isActive(item)
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, ease: 'easeOut' }}
                  >
                    {item.section ? (
                      <button
                        onClick={() => go(item)}
                        className="w-full text-left py-4 text-2xl font-bold cursor-pointer border-none transition-colors flex items-center justify-between group"
                        style={{ background: 'transparent', color: 'var(--text)' }}
                      >
                        <span className="group-hover:translate-x-2 transition-transform duration-300">{item.label}</span>
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="w-full py-4 text-2xl font-bold no-underline transition-colors flex items-center justify-between group"
                        style={{ color: active ? 'var(--accent)' : 'var(--text)' }}
                      >
                        <span className="group-hover:translate-x-2 transition-transform duration-300">{item.label}</span>
                        {active && <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_#ea580c]" />}
                      </Link>
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* Social Links Footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-auto pt-6 flex items-center justify-between border-t"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="text-sm font-semibold mono" style={{ color: 'var(--text-3)' }}>
                Say hello
              </div>
              <div className="flex gap-4">
                <a href={portfolioData.personal.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors p-2 rounded-full bg-white/5">
                  <Github size={20} />
                </a>
                <a href={portfolioData.personal.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors p-2 rounded-full bg-white/5">
                  <Linkedin size={20} />
                </a>
                <a href={`mailto:${portfolioData.personal.email}`} className="text-gray-400 hover:text-white transition-colors p-2 rounded-full bg-white/5">
                  <Mail size={20} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
