'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BookOpen, 
  Compass, 
  Sparkles, 
  Tv, 
  Mic, 
  ShieldCheck,
  TrendingUp,
  Clock,
  Wrench,
  Cpu,
  Activity,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Calendar,
  Tag,
  BookOpenCheck,
  ArrowLeft
} from 'lucide-react'
import { knowledgeGardenData } from '../data/knowledgeData'
import { portfolioData } from '../data/data'

// Map icon string name to Lucide components
const iconMap = {
  BookOpen,
  Compass,
  Sparkles,
  Tv,
  Mic,
  ShieldCheck,
  TrendingUp,
  Clock,
  Wrench,
  Cpu,
  Activity
}

// ── CUSTOM CSS BOOK COVER GENERATOR ──────────────────────────────────────────
function BookCover({ title, author, theme }) {
  let coverStyle = {}
  let decoration = null

  if (theme === 'monk') {
    coverStyle = {
      background: 'linear-gradient(135deg, #431407 0%, #7c2d12 50%, #ea580c 100%)',
      color: '#fef3c7',
      borderColor: '#b45309',
    }
    decoration = (
      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-amber-500/20 border border-amber-500/30 my-3">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 text-amber-400" strokeWidth="1.5">
          <path d="M12 3c-1.2 2-3 4-6 5 2 1 4 2 6 5 2-3 4-4 6-5-3-1-4.8-3-6-5z" />
          <path d="M12 13c-1.2 2-3 3-6 4 2 1 4 1 6 3 2-2 4-2 6-3-3-1-4.8-2-6-4z" />
          <circle cx="12" cy="12" r="1" className="fill-amber-400" />
        </svg>
      </div>
    )
  } else if (theme === 'ikigai') {
    coverStyle = {
      background: '#fbfbf9',
      color: '#111827',
      border: '1px solid #d1d5db',
    }
    decoration = (
      <div className="my-5 flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-[#ef4444] shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
        <span className="text-[7.5px] uppercase tracking-widest text-gray-500 mt-2.5 font-bold mono">Ikigai</span>
      </div>
    )
  } else if (theme === 'finance') {
    coverStyle = {
      background: 'linear-gradient(135deg, #1e1b4b 0%, #311042 100%)',
      color: '#f3f4f6',
      borderColor: '#4338ca',
    }
    decoration = (
      <div className="my-4 p-2.5 rounded-lg border border-purple-500/20 bg-purple-950/40 text-center">
        <div className="text-lg font-bold text-emerald-400 mono tracking-wider">$ → 💰</div>
        <div className="text-[7.5px] uppercase tracking-widest text-purple-300 mt-1 font-semibold mono">Wealth Column</div>
      </div>
    )
  } else if (theme === 'gita') {
    coverStyle = {
      background: 'linear-gradient(135deg, #78350f 0%, #b45309 50%, #7c2d12 100%)',
      color: '#fef3c7',
      borderColor: '#f59e0b',
    }
    decoration = (
      <div className="my-3 flex flex-col items-center">
        <div className="w-9 h-9 rounded-full border border-amber-400/40 flex items-center justify-center relative bg-amber-500/10">
          <div className="absolute inset-0.5 rounded-full border border-dashed border-amber-400/50 animate-spin" style={{ animationDuration: '25s' }} />
          <span className="text-amber-400 text-xs font-bold font-serif">ॐ</span>
        </div>
        <span className="text-[7px] uppercase tracking-wider text-amber-300/80 mt-1.5 font-serif">Nishkama Karma</span>
      </div>
    )
  } else {
    coverStyle = {
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      color: '#f8fafc',
      borderColor: '#334155',
    }
    decoration = <BookOpen className="w-8 h-8 text-slate-400 my-4" />
  }

  return (
    <div 
      className="relative w-[130px] h-[190px] sm:w-[140px] sm:h-[205px] rounded-r-lg shadow-xl overflow-hidden flex flex-col items-center justify-between p-3.5 flex-shrink-0 select-none border-l-[5px] border-l-black/40"
      style={{ ...coverStyle }}
    >
      {/* 3D spine shadow */}
      <div className="absolute top-0 bottom-0 left-0 w-2.5 bg-gradient-to-r from-black/30 via-black/15 to-transparent pointer-events-none" />
      <div className="absolute top-0 bottom-0 left-[2px] w-[0.5px] bg-white/10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-[3px] bg-black/10 pointer-events-none" />

      {/* Pages edge representation */}
      <div className="absolute right-0 top-0.5 bottom-0.5 w-[1.5px] bg-slate-300/20 rounded-l-sm" />

      {/* Title */}
      <div className="text-center w-full mt-1.5">
        <h4 className="font-bold text-[10px] sm:text-[11px] leading-tight font-serif tracking-wide uppercase line-clamp-3 px-0.5" style={{ color: coverStyle.color }}>
          {title}
        </h4>
        <div className="w-6 h-[1px] bg-current opacity-30 mx-auto mt-1.5" />
      </div>

      {decoration}

      {/* Author */}
      <div className="text-center w-full mb-1">
        <p className="text-[8px] uppercase tracking-wider font-semibold opacity-80 line-clamp-1" style={{ color: coverStyle.color }}>
          {author}
        </p>
      </div>
    </div>
  )
}

export default function KnowledgeGarden() {
  const [expandedBook, setExpandedBook] = useState(null)
  const [activePhilosophy, setActivePhilosophy] = useState(0)
  const [visible, setVisible] = useState(false)
  const pageRef = useRef(null)

  useEffect(() => {
    setVisible(true)
  }, [])

  const CAT_COLOR = {
    'Python':             'var(--teal)',
    'Webscraping':        'var(--accent)',
    'Data Cleaning':      '#a78bfa',
    'EDA':                '#fb923c',
    'Machine Learning':   'var(--green)',
    'Data Science':       '#38bdf8',
    'Data Preprocessing': '#fb7185',
  }

  return (
    <div ref={pageRef} className="pt-24 pb-20 overflow-x-hidden min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── SECTION 1 — HERO SECTION ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20 relative py-12"
        >
          {/* Abstract background blobs for visual wow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
            style={{ background: 'radial-gradient(circle, var(--accent) 0%, var(--teal) 100%)' }} />
          
          <span className="section-label mb-4">My Knowledge Ecosystem</span>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mt-4 leading-none" style={{ color: 'var(--text)' }}>
            Knowledge <span style={{ color: 'var(--accent)' }}>Garden</span>
          </h1>
          
          <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-2)' }}>
            A collection of lessons, ideas, books, technologies, and experiences that are shaping my journey as a developer and lifelong learner.
          </p>

          <div className="mt-8 flex justify-center gap-3">
            <span className="badge badge-orange px-3.5 py-1 text-xs">Roadmaps</span>
            <span className="badge badge-teal px-3.5 py-1 text-xs">Book Notes</span>
            <span className="badge badge-green px-3.5 py-1 text-xs">Philosophies</span>
          </div>
        </motion.div>


        {/* ── SECTION 2 — CURRENT FOCUS ─────────────────────────────────────── */}
        <section className="mb-24">
          <div className="mb-10 text-center sm:text-left">
            <span className="section-label">Roadmap to Mastery</span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text)' }}>
              Current <span style={{ color: 'var(--accent)' }}>Focus Areas</span>
            </h2>
            <p className="text-sm mt-1" style={{ color: 'var(--text-3)' }}>
              Topics I am actively learning, building on, and refining.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {knowledgeGardenData.currentFocus.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="card p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="mono text-xs font-semibold px-2 py-1 rounded bg-[var(--elevated)] border border-[var(--border)] text-[var(--text-2)]">
                      Focus Area 0{i + 1}
                    </span>
                    <span className="badge badge-orange font-bold text-[10px]">{item.progress}%</span>
                  </div>

                  <h3 className="text-lg font-bold mb-2.5" style={{ color: 'var(--text)' }}>
                    {item.topic}
                  </h3>
                  
                  <p className="text-xs sm:text-sm mb-5 leading-relaxed" style={{ color: 'var(--text-3)' }}>
                    {item.why}
                  </p>

                  {/* Custom animated progress bar */}
                  <div className="w-full bg-[var(--elevated)] h-1.5 rounded-full overflow-hidden mb-6 border border-[var(--border)]">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={visible ? { width: `${item.progress}%` } : {}}
                      transition={{ duration: 1, delay: i * 0.1 + 0.3 }}
                      className="h-full rounded-full" 
                      style={{ background: 'var(--accent)' }} 
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold mb-2.5 mono" style={{ color: 'var(--text-2)' }}>
                    🎯 Future Objectives
                  </h4>
                  <ul className="space-y-1.5">
                    {item.goals.map((g, gi) => (
                      <li key={gi} className="text-xs flex items-start gap-2" style={{ color: 'var(--text-2)' }}>
                        <span className="text-[var(--accent)] mt-0.5">▪</span>
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>


        {/* ── SECTION 3 — BOOKS & NOTES LIBRARY ──────────────────────────────── */}
        <section className="mb-24">
          <div className="mb-10 text-center sm:text-left">
            <span className="section-label">The Digital Library</span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text)' }}>
              Books That <span style={{ color: 'var(--accent)' }}>Shaped My Thinking</span>
            </h2>
            <p className="text-sm mt-1" style={{ color: 'var(--text-3)' }}>
              Expand any card to read key summaries, lessons, and personal notes.
            </p>
          </div>

          <div className="space-y-6">
            {knowledgeGardenData.books.map((book, i) => {
              const isExpanded = expandedBook === book.id
              const isReading = book.status === 'Currently Reading'

              return (
                <motion.div
                  key={book.id}
                  layout="position"
                  initial={{ opacity: 0, y: 20 }}
                  animate={visible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="card overflow-hidden transition-all duration-300"
                  style={{
                    borderColor: isExpanded ? 'var(--accent)' : 'var(--border)',
                    boxShadow: isExpanded ? '0 10px 30px rgba(0,0,0,0.15)' : 'none'
                  }}
                >
                  <div 
                    className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row gap-6 items-center sm:items-start"
                    onClick={() => setExpandedBook(isExpanded ? null : book.id)}
                  >
                    {/* Book Cover */}
                    <div className="flex-shrink-0">
                      <BookCover title={book.title} author={book.author} theme={book.theme} />
                    </div>

                    {/* Quick Specs */}
                    <div className="flex-1 w-full text-center sm:text-left flex flex-col justify-between min-h-[190px]">
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 justify-center sm:justify-start mb-3">
                          <h3 className="text-xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>
                            {book.title}
                          </h3>
                          <span className={`badge self-center sm:self-auto ${isReading ? 'badge-orange' : 'badge-green'}`}>
                            {isReading ? 'Reading' : 'Read'}
                          </span>
                        </div>
                        
                        <p className="text-xs mono font-semibold mb-4" style={{ color: 'var(--text-3)' }}>
                          by {book.author}
                        </p>

                        <div className="mb-4">
                          <h4 className="text-xs uppercase tracking-wider font-bold mono mb-2 text-left" style={{ color: 'var(--text-2)' }}>
                            🔑 Core Insights
                          </h4>
                          <ul className="space-y-2 text-left">
                            {book.keyLessons.map((l, li) => (
                              <li key={li} className="text-xs sm:text-sm flex items-start gap-2.5" style={{ color: 'var(--text-2)' }}>
                                <span className="text-[var(--teal)] font-bold mt-0.5">✓</span>
                                <span>{l}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-[var(--border)] mt-4">
                        <span className="text-xs text-[var(--text-3)] flex items-center gap-1.5 mono">
                          <BookOpenCheck size={14} className="text-[var(--accent)]" /> 
                          Progress: {book.progress}%
                        </span>
                        <button 
                          className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider mono text-[var(--accent)] hover:underline border-none bg-transparent cursor-pointer"
                        >
                          {isExpanded ? 'Collapse notes' : 'Expand notes'}
                          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Details Container */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="border-t border-[var(--border)] bg-[var(--elevated)]"
                      >
                        <div className="p-6 space-y-6">
                          {/* Takeaway */}
                          <div className="p-4 sm:p-5 rounded-xl border border-dashed border-[var(--accent)] bg-[var(--accent-a)] relative">
                            <span className="absolute -top-3 left-4 px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase mono" style={{ background: 'var(--bg)', color: 'var(--accent)', borderRadius: '4px', border: '1px solid var(--accent)' }}>
                              Mindset & Application
                            </span>
                            <p className="text-sm italic leading-relaxed pt-1" style={{ color: 'var(--text)' }}>
                              &ldquo;{book.takeaways}&rdquo;
                            </p>
                          </div>

                          {/* Notes */}
                          <div>
                            <h4 className="text-xs uppercase tracking-widest font-bold mono mb-2 text-[var(--text-2)]">
                              📋 Reading Summary
                            </h4>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
                              {book.notes}
                            </p>
                          </div>

                          {/* Chapters summaries */}
                          <div>
                            <h4 className="text-xs uppercase tracking-widest font-bold mono mb-3 text-[var(--text-2)]">
                              📖 Chapter Notes & Summaries
                            </h4>
                            <div className="space-y-3">
                              {book.chapters.map((ch, ci) => (
                                <div 
                                  key={ci} 
                                  className="p-4 rounded-lg border border-[var(--border)] transition-colors duration-200" 
                                  style={{ background: 'var(--surface)' }}
                                >
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                                    <span className="mono text-[10px] uppercase font-bold px-1.5 py-0.5 rounded" style={{ background: 'var(--elevated)', color: 'var(--accent)' }}>
                                      {ch.chapter}
                                    </span>
                                    <h5 className="text-sm font-bold text-left flex-1 sm:pl-3" style={{ color: 'var(--text)' }}>
                                      {ch.title}
                                    </h5>
                                  </div>
                                  <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-3)' }}>
                                    {ch.summary}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </section>


        {/* ── SECTION 4 — INTERESTS BEYOND CODE ──────────────────────────────── */}
        <section className="mb-24">
          <div className="mb-10 text-center sm:text-left">
            <span className="section-label">Human First, Engineer Second</span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text)' }}>
              Beyond the <span style={{ color: 'var(--accent)' }}>Terminal</span>
            </h2>
            <p className="text-sm mt-1" style={{ color: 'var(--text-3)' }}>
              Authentic hobbies and subjects that fuel my curiosity, keep me balanced, and reshape my worldview.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {knowledgeGardenData.interests.map((interest, i) => {
              const IconComponent = iconMap[interest.icon] || BookOpen

              return (
                <motion.div
                  key={interest.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={visible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="card p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all bg-[var(--elevated)] border border-[var(--border)] text-[var(--accent)]">
                        <IconComponent size={20} />
                      </div>
                      <h3 className="text-lg font-bold" style={{ color: 'var(--text)' }}>
                        {interest.label}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-2)' }}>
                      {interest.description}
                    </p>

                    <div className="p-3.5 rounded-lg bg-[var(--elevated)] border border-[var(--border)] mb-4 text-xs">
                      <span className="font-bold block uppercase tracking-wider text-[9px] mb-1 text-[var(--text-3)] mono">Why it matters:</span>
                      <p style={{ color: 'var(--text-2)' }}>{interest.why}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[var(--border)] text-xs italic" style={{ color: 'var(--text-3)' }}>
                    <span className="font-semibold not-italic block uppercase tracking-wider text-[9px] mb-1 text-[var(--teal)] mono">Mindset Influence:</span>
                    &ldquo;{interest.influence}&rdquo;
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>


        {/* ── SECTION 5 — LEARNING PHILOSOPHY ────────────────────────────────── */}
        <section className="mb-24">
          <div className="mb-10 text-center sm:text-left">
            <span className="section-label">Growth Mechanics</span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text)' }}>
              Learning <span style={{ color: 'var(--accent)' }}>Philosophy</span>
            </h2>
            <p className="text-sm mt-1" style={{ color: 'var(--text-3)' }}>
              My operational rules for personal progression and technical evolution.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Philosophy quote card */}
            <div className="lg:col-span-5 flex flex-col justify-center p-8 sm:p-10 rounded-2xl border bg-gradient-to-br from-[var(--surface)] to-[var(--elevated)] relative overflow-hidden"
              style={{ borderColor: 'var(--border)' }}>
              <div className="absolute top-4 left-6 text-6xl font-serif text-[var(--accent)] opacity-20 pointer-events-none">&ldquo;</div>
              <p className="text-lg sm:text-xl font-bold leading-relaxed relative z-10 font-serif italic text-center lg:text-left" style={{ color: 'var(--text)' }}>
                {knowledgeGardenData.learningPhilosophy.quote}
              </p>
              <div className="w-16 h-1 bg-[var(--accent)] rounded-full mt-6 mx-auto lg:mx-0" />
              <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-[var(--text-3)] mono text-center lg:text-left">My Daily Mantra</p>
            </div>

            {/* Principles list */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-4">
              {knowledgeGardenData.learningPhilosophy.principles.map((pr, idx) => {
                const IconComp = iconMap[pr.icon] || Activity
                const isSelected = activePhilosophy === idx

                return (
                  <div 
                    key={idx}
                    className="p-4 sm:p-5 rounded-xl border cursor-pointer transition-all duration-300 flex items-start gap-4"
                    style={{
                      background: isSelected ? 'var(--surface)' : 'transparent',
                      borderColor: isSelected ? pr.color : 'var(--border)',
                      boxShadow: isSelected ? '0 4px 20px rgba(0,0,0,0.06)' : 'none'
                    }}
                    onClick={() => setActivePhilosophy(idx)}
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ 
                        background: isSelected ? `${pr.color}22` : 'var(--elevated)', 
                        color: isSelected ? pr.color : 'var(--text-3)' 
                      }}>
                      <IconComp size={18} />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base mb-1" style={{ color: isSelected ? pr.color : 'var(--text)' }}>
                        {pr.title}
                      </h3>
                      {isSelected ? (
                        <motion.p 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-xs sm:text-sm leading-relaxed" 
                          style={{ color: 'var(--text-2)' }}
                        >
                          {pr.description}
                        </motion.p>
                      ) : (
                        <p className="text-xs sm:text-sm leading-relaxed line-clamp-1" style={{ color: 'var(--text-3)' }}>
                          {pr.description}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>


        {/* ── SECTION 6 — WHAT I'M EXPLORING ─────────────────────────────────── */}
        <section className="mb-24">
          <div className="mb-10 text-center sm:text-left">
            <span className="section-label">Future Horizons</span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text)' }}>
              What I&apos;m <span style={{ color: 'var(--accent)' }}>Exploring</span>
            </h2>
            <p className="text-sm mt-1" style={{ color: 'var(--text-3)' }}>
              Research topics and paradigms currently in the sandbox.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {knowledgeGardenData.exploring.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ scale: 1.02 }}
                className="card p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4.5">
                    <span className="badge badge-gray font-bold text-[10px]">{exp.status}</span>
                    <span className="text-xs mono font-bold" style={{ color: 'var(--teal)' }}>{exp.progress}%</span>
                  </div>

                  <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>
                    {exp.topic}
                  </h3>

                  <p className="text-xs leading-relaxed mb-5 p-3 rounded-lg border border-[var(--border)] bg-[var(--elevated)]" style={{ color: 'var(--text-2)' }}>
                    <span className="font-bold block uppercase tracking-wider text-[8px] mb-1 text-[var(--text-3)] mono">Sandbox Note:</span>
                    {exp.notes}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold mb-2 mono" style={{ color: 'var(--text-2)' }}>
                    🚀 Next on the List
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.futureTopics.map((top, ti) => (
                      <span 
                        key={ti} 
                        className="badge transition-colors duration-200" 
                        style={{ fontSize: '.68rem', background: 'var(--elevated)', color: 'var(--text-2)', border: 'none' }}
                      >
                        {top}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>


        {/* ── SECTION 7 — ARTICLES & WRITING (BLOG ARCHIVE) ──────────────────── */}
        <section className="border-t pt-20" style={{ borderColor: 'var(--border)' }}>
          <div className="mb-12 text-center">
            <span className="section-label">The Written Word</span>
            <h2 className="mt-3 text-3xl font-bold" style={{ color: 'var(--text)' }}>
              Articles & <span style={{ color: 'var(--accent)' }}>Writing</span>
            </h2>
            <p className="mt-2 max-w-xl mx-auto text-sm" style={{ color: 'var(--text-3)' }}>
              Documented guides, tutorials, and insights published to my dev.to repository.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioData.blogs.map((post, i) => {
              const cc = CAT_COLOR[post.category] || 'var(--accent)'
              return (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={visible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -6, boxShadow: '0 12px 30px rgba(0,0,0,0.1)' }}
                  className="rounded-2xl overflow-hidden cursor-pointer flex flex-col group relative"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                  }}
                  onClick={() => window.open(post.slug, '_blank', 'noopener,noreferrer')}
                >
                  <div className="absolute top-0 left-0 right-0 h-1 z-10 transition-transform origin-left scale-x-0 group-hover:scale-x-100 duration-500" style={{ background: cc }} />
                  
                  {/* Article Thumbnail */}
                  <div className="relative overflow-hidden flex-shrink-0" style={{ height: 170 }}>
                    <Image
                      src={post.image} alt={post.title} fill
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-700 group-hover:scale-108"
                      priority={false}
                    />
                    <div className="absolute inset-0 transition-opacity duration-500 opacity-70 group-hover:opacity-40" style={{ background: 'linear-gradient(to top, rgba(0,0,0,.8) 0%, transparent 60%)' }} />
                    
                    <div className="absolute top-3 left-3">
                      <span className="badge" style={{ background: `${cc}33`, color: '#fff', borderColor: 'transparent', backdropFilter: 'blur(4px)' }}>
                        <Tag size={10} /> {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-2.5">
                      <span className="flex items-center gap-1.5 mono font-medium" style={{ fontSize: '.68rem', color: 'var(--text-3)' }}>
                        <Calendar size={11} />
                        {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1.5 mono font-medium" style={{ fontSize: '.68rem', color: 'var(--text-3)' }}>
                        <Clock size={11} /> {post.readTime}
                      </span>
                    </div>

                    <h3 className="font-bold text-base mb-2.5 leading-snug group-hover:text-orange-500 transition-colors"
                      style={{
                        color: 'var(--text)',
                        display: '-webkit-box', WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical', overflow: 'hidden',
                      }}>
                      {post.title}
                    </h3>

                    <p style={{
                      fontSize: '.8rem', color: 'var(--text-3)', lineHeight: 1.5,
                      display: '-webkit-box', WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '1rem',
                    }}>
                      {post.excerpt}
                    </p>

                    <div className="mt-auto pt-3 border-t flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map(t => (
                          <span key={t} className="badge transition-colors duration-300 group-hover:bg-orange-500/10 group-hover:text-orange-500" style={{ fontSize: '.6rem', background: 'var(--elevated)', color: 'var(--text-2)', border: 'none' }}>
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 mono font-bold group-hover:translate-x-1 transition-transform duration-300" style={{ fontSize: '.7rem', color: 'var(--teal)' }}>
                        Read <ArrowRight size={12} />
                      </div>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => window.open('https://dev.to/vikas_gulia', '_blank', 'noopener,noreferrer')}
              className="btn-outline group inline-flex items-center gap-2"
            >
              <ExternalLink size={15} className="group-hover:text-teal-500 transition-colors" /> 
              <span>Visit my Dev.to blog</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </section>

      </div>
    </div>
  )
}
