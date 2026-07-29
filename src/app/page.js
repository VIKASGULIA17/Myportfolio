'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

import Header from '../components/Header'
import Hero from '../components/Hero'
import About from '../components/About'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import Education from '../components/Education'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

function useHashScroll() {
  const pathname = usePathname()

  useEffect(() => {
    // Check for hash on initial load and on navigation
    const hash = window.location.hash
    if (hash) {
      const id = hash.slice(1) // remove the #
      // Wait a tick for the section to render, then scroll
      const timer = setTimeout(() => {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [pathname])
}

export default function HomePage() {
  useHashScroll()

  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
