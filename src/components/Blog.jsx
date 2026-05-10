'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight, Tag, ExternalLink } from 'lucide-react'
import { portfolioData } from '../data/data'
import { motion } from 'framer-motion'

const CAT_COLOR = {
  'Python':             'var(--teal)',
  'Webscraping':        'var(--accent)',
  'Data Cleaning':      '#a78bfa',
  'EDA':                '#fb923c',
  'Machine Learning':   'var(--green)',
  'Data Science':       '#38bdf8',
}

export default function Blog() {
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
    <section id="blog" ref={ref} className="py-20" style={{ background: 'var(--surface)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <span className="section-label">Blog & Insights</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold" style={{ color: 'var(--text)' }}>
            Latest <span style={{ color: 'var(--accent)' }}>Articles</span>
          </h2>
          <p className="mt-2 max-w-xl mx-auto text-sm" style={{ color: 'var(--text-3)' }}>
            Sharing insights, tutorials, and experiences from my journey in data science and development.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.blogs.map((post, i) => {
            const cc = CAT_COLOR[post.category] || 'var(--accent)'
            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8, boxShadow: '0 12px 30px rgba(0,0,0,0.1)' }}
                className="rounded-2xl overflow-hidden cursor-pointer flex flex-col group relative"
                style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                }}
                onClick={() => window.open(post.slug, '_blank', 'noopener,noreferrer')}
              >
                {/* Highlight bar on top */}
                <div className="absolute top-0 left-0 right-0 h-1 z-10 transition-transform origin-left scale-x-0 group-hover:scale-x-100 duration-500" style={{ background: cc }} />
                
                {/* Image */}
                <div className="relative overflow-hidden flex-shrink-0" style={{ height: 180 }}>
                  <Image
                    src={post.image} alt={post.title} fill
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-700 group-hover:scale-110"
                    priority={i < 3}
                  />
                  <div className="absolute inset-0 transition-opacity duration-500 opacity-70 group-hover:opacity-40" style={{ background: 'linear-gradient(to top, rgba(0,0,0,.8) 0%, transparent 60%)' }} />
                  
                  <div className="absolute top-3 left-3">
                    <span className="badge" style={{ background: `${cc}33`, color: '#fff', borderColor: 'transparent', backdropFilter: 'blur(4px)' }}>
                      <Tag size={10} /> {post.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg" style={{
                      background: 'var(--accent)', color: '#111',
                    }}>
                      <ExternalLink size={14} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex items-center gap-1.5 mono font-medium" style={{ fontSize: '.7rem', color: 'var(--text-3)' }}>
                      <Calendar size={11} />
                      {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1.5 mono font-medium" style={{ fontSize: '.7rem', color: 'var(--text-3)' }}>
                      <Clock size={11} /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg mb-3 leading-snug group-hover:text-orange-500 transition-colors"
                    style={{
                      color: 'var(--text)',
                      display: '-webkit-box', WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>
                    {post.title}
                  </h3>

                  <p style={{
                    fontSize: '.85rem', color: 'var(--text-3)', lineHeight: 1.6,
                    display: '-webkit-box', WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '1rem',
                  }}>
                    {post.excerpt}
                  </p>

                  <div className="mt-auto pt-4 border-t flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 2).map(t => (
                        <span key={t} className="badge transition-colors duration-300 group-hover:bg-orange-500/10 group-hover:text-orange-500" style={{ fontSize: '.65rem', background: 'var(--elevated)', color: 'var(--text-2)', border: 'none' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 mono font-bold group-hover:translate-x-1 transition-transform duration-300" style={{ fontSize: '.75rem', color: 'var(--teal)' }}>
                      Read <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => window.open('https://dev.to/vikas_gulia', '_blank', 'noopener,noreferrer')}
            className="btn-outline group inline-flex items-center gap-2"
          >
            <ExternalLink size={16} className="group-hover:text-teal-500 transition-colors" /> 
            <span>Visit my Dev.to blog</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
