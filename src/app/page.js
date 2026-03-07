'use client'

import { Suspense, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import Header from '../components/Header'
import Hero from '../components/Hero'
import About from '../components/About'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import Education from '../components/Education'
import Blog from '../components/Blog'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

function ScrollToSection() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const section = searchParams.get('section')
    if (section) {
      // Use a small timeout to ensure the elements are mounted before scrolling
      setTimeout(() => {
        const element = document.getElementById(section)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }, [searchParams])

  return null
}





export default function HomePage() {
  return (
    <div className="App">
      <Suspense fallback={null}>
        <ScrollToSection />
      </Suspense>
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Education />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
