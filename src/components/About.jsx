'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Code, Database, Lightbulb, Trophy } from 'lucide-react'
import { portfolioData } from '../data/data'


const About = () => {
  const aboutRef = useRef(null)
  const statsRef = useRef(null)
  const [showHeroText, setShowHeroText] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up')
            setShowHeroText(true);
          }
        })
      },
      { threshold: 0.1 }
    )

    if (aboutRef.current) observer.observe(aboutRef.current)
    if (statsRef.current) observer.observe(statsRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div
      ref={aboutRef}
      className={`space-y-8 transition-all duration-1000 ${
        showHeroText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                <h2 className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide">
                  About Me
                </h2>
              </div>
              
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                Crafting Digital Solutions with
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Data-Driven Insights</span>
              </h3>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {portfolioData.about.description}
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-4">
              {portfolioData.about.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{highlight}</p>
                </div>
              ))}
            </div>

            {/* Skills Icons */}
            <div className="flex space-x-8 pt-6">
              {[
                { icon: Code, label: 'Development', color: 'from-blue-500 to-purple-500' },
                { icon: Database, label: 'Data Science', color: 'from-purple-500 to-pink-500' },
                { icon: Lightbulb, label: 'Innovation', color: 'from-pink-500 to-red-500' },
                { icon: Trophy, label: 'Excellence', color: 'from-yellow-500 to-orange-500' }
              ].map(({ icon: Icon, label, color }, index) => (
                <div key={index} className="text-center group">
                  <div className={`w-16 h-16 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div
      ref={statsRef}
      className={`transition-all duration-1000 ${
        showHeroText
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      }`}
    >
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl">
              <div className="grid grid-cols-2 gap-8">
                {portfolioData.about.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="relative mt-8">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-20"></div>
              <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">🚀</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Always Learning</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Exploring new technologies and methodologies</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About