'use client'

import { useState, useEffect, useRef } from 'react'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram, CheckCircle, XCircle } from 'lucide-react'
import { portfolioData } from '../data/data'

const TAPI  = 'https://api.telegram.org/bot7556029899:AAG3EogGPdL17WImWlbIT18R5eNU81U9IAA/sendMessage'
const TCHAT = 6974520564

const SOCIALS = [
  { icon: Github,    url: portfolioData.personal.github,    label: 'GitHub',    hc: 'var(--text)' },
  { icon: Linkedin,  url: portfolioData.personal.linkedin,  label: 'LinkedIn',  hc: '#0a66c2'     },
  { icon: Instagram, url: portfolioData.personal.instagram, label: 'Instagram', hc: '#e1306c'     },
]

export default function Contact() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [form,    setForm]    = useState({ name: '', email: '', subject: '', message: '' })
  const [busy,    setBusy]    = useState(false)
  const [status,  setStatus]  = useState(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.05 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async e => {
    e.preventDefault()
    setBusy(true); setStatus(null)
    const { name, email, subject, message } = form
    if (name.length < 2 || !email.includes('@') || message.length < 10) {
      setStatus('error'); setBusy(false); return
    }
    const text = `📬 Portfolio Contact:\n👤 ${name}\n📧 ${email}\n📝 ${subject || 'N/A'}\n💬 ${message}`
    try {
      const r = await fetch(TAPI, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TCHAT, text }),
      })
      if (!r.ok) throw new Error()
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    } finally {
      setBusy(false)
      setTimeout(() => setStatus(null), 5500)
    }
  }

  return (
    <section id="contact" ref={ref} className="py-20" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          className="text-center mb-12 transition-all duration-500"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)' }}
        >
          <span className="section-label">Get In Touch</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold" style={{ color: 'var(--text)' }}>
            Let's <span style={{ color: 'var(--accent)' }}>Connect</span>
          </h2>
          <p className="mt-2 max-w-xl mx-auto text-sm" style={{ color: 'var(--text-3)' }}>
            Ready to discuss your next project or just want to say hello? I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-7">

          {/* Left: info (2/5) */}
          <div
            className="lg:col-span-2 flex flex-col gap-4 transition-all duration-500"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateX(-20px)',
              transitionDelay: '0.1s',
            }}
          >
            {/* Contact details */}
            <div className="card p-6">
              <h3 className="font-semibold mb-4 text-base" style={{ color: 'var(--text)' }}>Let's Talk</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-3)' }}>
                Always open to discussing new opportunities, collaborations, or just connecting with fellow developers.
              </p>

              {[
                { icon: Mail,   label: 'Email',    val: portfolioData.personal.email,    href: `mailto:${portfolioData.personal.email}` },
                { icon: Phone,  label: 'Phone',    val: portfolioData.personal.phone,    href: `tel:${portfolioData.personal.phone}` },
                { icon: MapPin, label: 'Location', val: portfolioData.personal.location, href: null },
              ].map(({ icon: Icon, label, val, href }) => (
                <div key={label} className="flex items-center gap-3 mb-3.5">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{
                    background: 'var(--accent-a)', border: '1px solid rgba(255,161,22,.2)',
                  }}>
                    <Icon size={15} style={{ color: 'var(--accent)' }} />
                  </div>
                  <div>
                    <p className="mono text-xs mb-0.5" style={{ color: 'var(--text-3)' }}>{label}</p>
                    {href ? (
                      <a href={href} style={{ color: 'var(--teal)', fontSize: '.84rem', textDecoration: 'none' }}
                        onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'var(--teal)' }}>
                        {val}
                      </a>
                    ) : (
                      <p className="text-sm" style={{ color: 'var(--text-2)' }}>{val}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="card p-5">
              <p className="mono text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--text-3)' }}>Follow me</p>
              <div className="flex gap-2.5">
                {SOCIALS.map(({ icon: Icon, url, label, hc }) => (
                  <a
                    key={label} href={url} target="_blank" rel="noopener noreferrer" title={label}
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200"
                    style={{
                      background: 'var(--elevated)', border: '1px solid var(--border)',
                      color: 'var(--text-3)', textDecoration: 'none',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = hc
                      e.currentTarget.style.color = hc
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.color = 'var(--text-3)'
                      e.currentTarget.style.transform = 'none'
                    }}
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="rounded-xl px-5 py-4 flex items-center gap-3" style={{
              background: 'var(--surface)', border: '1px solid var(--border)', borderLeft: '3px solid var(--green)',
            }}>
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 anim-pulse-dot" style={{ background: 'var(--green)' }} />
              <div>
                <p className="font-semibold text-sm" style={{ color: 'var(--green)' }}>Available for Projects</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>Accepting freelance & full-time</p>
              </div>
            </div>
          </div>

          {/* Right: form (3/5) */}
          <div
            className="lg:col-span-3 card p-6 sm:p-8 transition-all duration-500"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'translateX(20px)',
              transitionDelay: '0.2s',
            }}
          >
            <h3 className="font-semibold mb-6 text-base" style={{ color: 'var(--text)' }}>Send a Message</h3>

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="mono text-xs mb-1.5 block" style={{ color: 'var(--text-3)' }}>Name *</label>
                  <input className="lc-input" type="text" name="name" value={form.name}
                    onChange={onChange} placeholder="Your name" required />
                </div>
                <div>
                  <label className="mono text-xs mb-1.5 block" style={{ color: 'var(--text-3)' }}>Email *</label>
                  <input className="lc-input" type="email" name="email" value={form.email}
                    onChange={onChange} placeholder="your@email.com" required />
                </div>
              </div>

              <div>
                <label className="mono text-xs mb-1.5 block" style={{ color: 'var(--text-3)' }}>Subject</label>
                <input className="lc-input" type="text" name="subject" value={form.subject}
                  onChange={onChange} placeholder="What's this about?" />
              </div>

              <div>
                <label className="mono text-xs mb-1.5 block" style={{ color: 'var(--text-3)' }}>Message *</label>
                <textarea className="lc-input" name="message" value={form.message}
                  onChange={onChange} placeholder="Tell me about your project..." rows={5}
                  required style={{ resize: 'vertical', minHeight: 110 }} />
              </div>

              <button type="submit" disabled={busy} className="btn-primary w-full justify-center"
                style={{ opacity: busy ? .65 : 1, cursor: busy ? 'not-allowed' : 'pointer' }}>
                {busy ? (
                  <>
                    <span className="w-4 h-4 rounded-full anim-spin border-2 border-black/30 border-t-black flex-shrink-0" />
                    Sending…
                  </>
                ) : (
                  <><Send size={15} /> Send Message</>
                )}
              </button>

              {status === 'success' && (
                <div className="flex items-center gap-2.5 rounded-lg p-3 text-sm" style={{
                  background: 'rgba(74,222,128,.1)', border: '1px solid rgba(74,222,128,.25)', color: 'var(--green)',
                }}>
                  <CheckCircle size={16} /> Message sent! I'll reply soon.
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2.5 rounded-lg p-3 text-sm" style={{
                  background: 'rgba(248,113,113,.1)', border: '1px solid rgba(248,113,113,.25)', color: 'var(--red)',
                }}>
                  <XCircle size={16} /> Failed to send. Please email me directly.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}