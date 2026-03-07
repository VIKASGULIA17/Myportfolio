'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import {
  Menu, X, Sun, Moon,
  Home, User, FolderGit2, BookOpen,
  FileText, Code2, Github, MessageCircle
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { portfolioData } from '../data/data'

// Navigation items — trimmed to the essentials
const NAV_ITEMS = [
  { name: 'Home', href: '#home', icon: Home, isSection: true },
  { name: 'About', href: '#about', icon: User, isSection: true },
  { name: 'Projects', href: '#projects', icon: FolderGit2, isSection: true },
  { name: 'Skills', href: '#skills', icon: Code2, isSection: true },
  { name: 'Blog', href: '#blog', icon: BookOpen, isSection: true },
  { name: 'Resume', href: '/resume', icon: FileText, isSection: false, accent: '#a78bfa' },
  { name: 'LeetCode', href: '/leetcode', icon: Code2, isSection: false, accent: '#ffa116' },
  { name: 'GitHub', href: '/github', icon: Github, isSection: false, accent: '#4ade80' },
  { name: 'Contact', href: '#contact', icon: MessageCircle, isSection: true },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { theme, toggleTheme, mounted } = useTheme()

  const dark = theme === 'dark'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = async (item) => {
    setMenuOpen(false)
    if (item.isSection) {
      if (pathname === '/') {
        document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' })
      } else {
        await router.push(`/?section=${item.href.slice(1)}`)
      }
    } else {
      router.push(item.href)
    }
  }

  const isActive = (item) => !item.isSection && pathname === item.href

  /* ─── colour tokens that work in both light and dark ─────────────────── */
  const bgScrolled = dark
    ? 'rgba(10,10,18,0.88)'
    : 'rgba(255,255,255,0.88)'
  const borderClr = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)'
  const textMain = dark ? '#e2e8f0' : '#1e293b'
  const textMuted = dark ? '#94a3b8' : '#64748b'

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? bgScrolled : 'transparent',
      backdropFilter: scrolled ? 'blur(18px) saturate(180%)' : 'none',
      borderBottom: scrolled ? `1px solid ${borderClr}` : '1px solid transparent',
      transition: 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 62 }}>

          {/* ── Logo ──────────────────────────────────────────────────────── */}
          <Link href="/" onClick={() => setMenuOpen(false)}
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 9, flexShrink: 0 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 9,
              background: 'linear-gradient(135deg,#a78bfa 0%,#ec4899 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Code2 size={15} color="#fff" strokeWidth={2.5} />
            </div>
            <span style={{
              fontWeight: 800, fontSize: '1rem', letterSpacing: -0.4,
              background: 'linear-gradient(135deg,#a78bfa,#ec4899)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Vikas
            </span>
          </Link>

          {/* ── Desktop Nav ───────────────────────────────────────────────── */}
          <NavItems
            items={NAV_ITEMS}
            isActive={isActive}
            handleNav={handleNav}
            textMain={textMain}
            dark={dark}
            isMobile={false}
          />

          {/* ── Right controls ────────────────────────────────────────────── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {/* Social icon — GitHub */}
            <a href={portfolioData.personal.github} target="_blank" rel="noreferrer"
              title="GitHub"
              style={{
                color: textMuted, padding: 7, borderRadius: 8, display: 'flex',
                transition: 'color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#4ade80'; e.currentTarget.style.background = 'rgba(74,222,128,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.color = textMuted; e.currentTarget.style.background = 'transparent' }}
            >
              <Github size={18} />
            </a>

            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 36, height: 36, borderRadius: 10, cursor: 'pointer', border: 'none',
                  background: dark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.07)',
                  color: dark ? '#fbbf24' : '#475569',
                  transition: 'transform 0.3s, background 0.2s, color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'rotate(20deg) scale(1.1)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'rotate(0deg) scale(1)' }}
              >
                {dark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            )}

            {/* Hamburger – mobile only */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              style={{
                display: 'none', /* shown by media query below */
                background: 'transparent', border: 'none', cursor: 'pointer',
                color: textMain, padding: 4, borderRadius: 8,
              }}
              className="nav-burger"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile drawer ──────────────────────────────────────────────────── */}
      {menuOpen && (
        <div style={{
          background: dark ? 'rgba(9,9,18,0.97)' : 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(20px)',
          borderTop: `1px solid ${borderClr}`,
          padding: '0.75rem 1.25rem 1.5rem',
        }}>
          <NavItems
            items={NAV_ITEMS}
            isActive={isActive}
            handleNav={handleNav}
            textMain={textMain}
            dark={dark}
            isMobile={true}
          />
        </div>
      )}

      <style>{`
        @media (max-width: 767px) {
          .nav-desktop { display: none !important; }
          .nav-burger  { display: flex !important; }
        }
        @media (min-width: 768px) {
          .nav-desktop { display: flex !important; }
          .nav-burger  { display: none !important; }
        }
      `}</style>
    </header>
  )
}

/* ─── Shared nav item list ──────────────────────────────────────────────── */
function NavItems({ items, isActive, handleNav, textMain, dark, isMobile }) {
  const [hov, setHov] = useState(null)

  if (isMobile) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map(item => {
          const active = isActive(item)
          const accent = item.accent ?? (dark ? '#c084fc' : '#7c3aed')
          const color = active || hov === item.name ? accent : textMain
          const Icon = item.icon
          return item.isSection ? (
            <button key={item.name} onClick={() => handleNav(item)}
              onMouseEnter={() => setHov(item.name)} onMouseLeave={() => setHov(null)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, width: '100%', textAlign: 'left',
                background: 'transparent', border: 'none', cursor: 'pointer',
                padding: '10px 12px', borderRadius: 9, fontSize: '0.88rem', fontWeight: 500,
                color, transition: 'color 0.2s',
              }}>
              <Icon size={15} /> {item.name}
            </button>
          ) : (
            <Link key={item.name} href={item.href} onClick={() => handleNav(item)}
              onMouseEnter={() => setHov(item.name)} onMouseLeave={() => setHov(null)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                textDecoration: 'none', padding: '10px 12px', borderRadius: 9,
                fontSize: '0.88rem', fontWeight: 600,
                color,
                background: active ? `${accent}18` : 'transparent',
                transition: 'color 0.2s, background 0.2s',
              }}>
              <Icon size={15} /> {item.name}
            </Link>
          )
        })}
      </div>
    )
  }

  // Desktop
  return (
    <nav className="nav-desktop" style={{ alignItems: 'center', gap: 2 }}>
      {items.map(item => {
        const active = isActive(item)
        const accent = item.accent ?? (dark ? '#c084fc' : '#7c3aed')
        const color = active || hov === item.name ? accent : (dark ? '#cbd5e1' : '#475569')
        const Icon = item.icon
        const isHov = hov === item.name

        return item.isSection ? (
          <button key={item.name} onClick={() => handleNav(item)}
            onMouseEnter={() => setHov(item.name)} onMouseLeave={() => setHov(null)}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              background: isHov ? (dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)') : 'transparent',
              border: 'none', cursor: 'pointer', padding: '6px 11px', borderRadius: 8,
              fontSize: '0.82rem', fontWeight: 500, color, transition: 'color 0.2s, background 0.15s',
            }}>
            <Icon size={13} strokeWidth={2} /> {item.name}
          </button>
        ) : (
          <Link key={item.name} href={item.href} onClick={() => setHov(null)}
            onMouseEnter={() => setHov(item.name)} onMouseLeave={() => setHov(null)}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              textDecoration: 'none', padding: '6px 11px', borderRadius: 8,
              fontSize: '0.82rem', fontWeight: 600, color,
              background: active
                ? `${accent}20`
                : isHov
                  ? (dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)')
                  : 'transparent',
              boxShadow: active ? `0 0 10px ${accent}40` : 'none',
              transition: 'color 0.2s, background 0.15s, box-shadow 0.2s',
            }}>
            <Icon size={13} strokeWidth={2} /> {item.name}
          </Link>
        )
      })}
    </nav>
  )
}
