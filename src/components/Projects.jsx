'use client'

import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Github, Star, Tag, ChevronRight } from 'lucide-react'
import { portfolioData } from '../data/data'
import { motion, AnimatePresence } from 'framer-motion'

const CATS = ['All', 'Full Stack', 'AI/ML', 'Data Science', 'Web Development', 'Front end']

const CAT_COLOR = {
  'Full Stack':      'var(--accent)',
  'AI/ML':          'var(--teal)',
  'Data Science':   '#a78bfa',
  'Web Development':'var(--green)',
  'Front end':      '#fb923c',
}

export default function Projects() {
  const ref = useRef(null)
  const [visible,  setVisible]  = useState(false)
  const [filter,   setFilter]   = useState('All')

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.04 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const filtered = filter === 'All'
    ? portfolioData.projects
    : portfolioData.projects.filter(p => p.category === filter)

  return (
    <section id="projects" ref={ref} className="py-20" style={{ background: 'var(--surface)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <span className="section-label">My Work</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold" style={{ color: 'var(--text)' }}>
            Featured <span style={{ color: 'var(--accent)' }}>Projects</span>
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-sm leading-relaxed" style={{ color: 'var(--text-3)' }}>
            A curated collection of my latest work spanning full-stack development, machine learning, and data science.
          </p>
        </motion.div>

        {/* Filter chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          {CATS.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="px-4 py-1.5 rounded-full text-xs font-semibold mono cursor-pointer border transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: filter === cat ? 'var(--accent-a)' : 'transparent',
                color: filter === cat ? 'var(--accent)' : 'var(--text-3)',
                borderColor: filter === cat ? 'var(--accent)' : 'var(--border)',
                boxShadow: filter === cat ? '0 4px 12px var(--accent-a)' : 'none'
              }}
            >
              {cat === 'All' ? 'All Projects' : cat}
            </button>
          ))}
        </motion.div>

        {/* Grid layout */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((p, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={p.id}
                className="group rounded-2xl overflow-hidden flex flex-col relative"
                style={{ 
                  background: 'var(--bg)', 
                  border: '1px solid var(--border)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                }}
                whileHover={{ y: -8, boxShadow: '0 12px 30px rgba(0,0,0,0.1)' }}
              >
                {/* Highlight bar on top */}
                <div className="absolute top-0 left-0 right-0 h-1 z-10 transition-transform origin-left scale-x-0 group-hover:scale-x-100 duration-500" style={{ background: CAT_COLOR[p.category] || 'var(--accent)' }} />
                
                {/* Image */}
                <div className="relative overflow-hidden flex-shrink-0" style={{ height: 200 }}>
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 transition-opacity duration-500 opacity-60 group-hover:opacity-40" style={{ background: 'linear-gradient(to top, rgba(0,0,0,.9) 0%, transparent 70%)' }} />

                  {/* Top badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="badge" style={{
                      background: `rgba(0,0,0,0.5)`,
                      color: CAT_COLOR[p.category] || 'var(--accent)',
                      border: `1px solid ${CAT_COLOR[p.category] || 'var(--accent)'}`,
                      backdropFilter: 'blur(8px)'
                    }}>
                      <Tag size={10} /> {p.category}
                    </span>
                  </div>
                  {p.featured && (
                    <div className="absolute top-3 right-3">
                      <span className="badge" style={{ background: 'var(--yellow)', color: '#111', border: 'none', fontWeight: 700 }}>
                        <Star size={10} fill="#111" /> Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-xl font-bold transition-colors group-hover:text-orange-500 line-clamp-1" style={{ color: 'var(--text)' }}>
                      {p.title}
                    </h3>
                    <div className="flex gap-2 flex-shrink-0">
                      <a
                        href={p.github} target="_blank" rel="noopener noreferrer"
                        className="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                        style={{
                          background: 'var(--elevated)', border: '1px solid var(--border)',
                          color: 'var(--text-3)', textDecoration: 'none',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--text)'; e.currentTarget.style.color = 'var(--text)' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-3)' }}
                      >
                        <Github size={14} />
                      </a>
                      <a 
                        href={p.live} target="_blank" rel="noopener noreferrer" 
                        className="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                        style={{
                          background: 'var(--accent)', color: '#111', textDecoration: 'none',
                        }}
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                  
                  <p className="text-sm leading-relaxed mb-5 line-clamp-3" style={{ color: 'var(--text-3)', minHeight: 60 }}>
                    {p.description}
                  </p>

                  <div className="mt-auto pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tech.slice(0, 4).map((t, i) => (
                        <span key={i} className="text-[0.65rem] font-semibold mono px-2 py-1 rounded-md transition-colors group-hover:bg-orange-500/10 group-hover:text-orange-500" style={{
                          background: 'var(--elevated)', color: 'var(--text-2)'
                        }}>
                          {t}
                        </span>
                      ))}
                      {p.tech.length > 4 && (
                        <span className="text-[0.65rem] font-semibold mono px-2 py-1 rounded-md" style={{
                          background: 'var(--elevated)', color: 'var(--text-2)'
                        }}>
                          +{p.tech.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer" className="btn-outline group inline-flex items-center gap-2">
            <Github size={16} className="group-hover:text-teal-500 transition-colors" /> 
            <span>Explore more on GitHub</span>
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}